export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
}

export interface ModifiedFile {
  path: string;
  content: string;
}

export interface PublishProgress {
  step: 'auth' | 'fetching' | 'blobs' | 'tree' | 'commit' | 'push' | 'done' | 'error';
  message: string;
  commitSha?: string;
  commitUrl?: string;
  actionsUrl?: string;
  error?: string;
}

const GITHUB_API_URL = 'https://api.github.com';

export async function checkGitHubAccess(config: GitHubConfig): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${GITHUB_API_URL}/repos/${config.owner}/${config.repo}`, {
      headers: {
        Authorization: `Bearer ${config.token.trim()}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        return { success: false, message: 'Nieprawidłowy token GitHub. Sprawdź wpisany klucz.' };
      }
      if (res.status === 404) {
        return {
          success: false,
          message: `Nie znaleziono repozytorium ${config.owner}/${config.repo} lub token nie ma do niego uprawnień.`,
        };
      }
      return { success: false, message: `Błąd połączenia z GitHub API: ${res.statusText}` };
    }

    const data = await res.json();
    const canPush = data.permissions?.push ?? true;
    if (!canPush) {
      return { success: false, message: 'Token nie ma uprawnień do zapisu (push) w tym repozytorium.' };
    }

    return { success: true, message: `Połączono z repozytorium ${config.owner}/${config.repo}` };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Nieznany błąd sieci podczas łączenia z GitHubem';
    return { success: false, message: errorMsg };
  }
}

export async function publishCommitToGitHub(
  config: GitHubConfig,
  files: ModifiedFile[],
  commitMessage: string,
  onProgress?: (progress: PublishProgress) => void,
): Promise<{ success: boolean; commitSha?: string; commitUrl?: string; error?: string }> {
  const headers = {
    Authorization: `Bearer ${config.token.trim()}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    onProgress?.({ step: 'fetching', message: `Pobieranie stanu gałęzi ${config.branch}...` });

    // 1. Get branch ref to find latest commit SHA
    const refRes = await fetch(
      `${GITHUB_API_URL}/repos/${config.owner}/${config.repo}/git/ref/heads/${config.branch}`,
      { headers },
    );

    if (!refRes.ok) {
      throw new Error(`Nie udało się pobrać gałęzi ${config.branch}: ${refRes.statusText}`);
    }

    const refData = await refRes.json();
    const baseCommitSha = refData.object.sha;

    // 2. Get the base commit to find its tree SHA
    const commitRes = await fetch(
      `${GITHUB_API_URL}/repos/${config.owner}/${config.repo}/git/commits/${baseCommitSha}`,
      { headers },
    );
    if (!commitRes.ok) {
      throw new Error(`Błąd pobierania commita ${baseCommitSha}: ${commitRes.statusText}`);
    }
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree.sha;

    // 3. Create blobs for each modified file
    onProgress?.({ step: 'blobs', message: `Przygotowywanie ${files.length} plików do wysłania...` });
    const treeEntries = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      onProgress?.({
        step: 'blobs',
        message: `Wgrywanie pliku ${i + 1}/${files.length}: ${file.path}...`,
      });

      const blobRes = await fetch(`${GITHUB_API_URL}/repos/${config.owner}/${config.repo}/git/blobs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          content: file.content,
          encoding: 'utf-8',
        }),
      });

      if (!blobRes.ok) {
        throw new Error(`Błąd tworzenia blobu dla ${file.path}: ${blobRes.statusText}`);
      }

      const blobData = await blobRes.json();
      treeEntries.push({
        path: file.path,
        mode: '100644',
        type: 'blob',
        sha: blobData.sha,
      });
    }

    // 4. Create new tree
    onProgress?.({ step: 'tree', message: 'Budowanie drzewa plików na GitHubie...' });
    const treeRes = await fetch(`${GITHUB_API_URL}/repos/${config.owner}/${config.repo}/git/trees`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: treeEntries,
      }),
    });

    if (!treeRes.ok) {
      throw new Error(`Błąd tworzenia drzewa plików: ${treeRes.statusText}`);
    }

    const treeData = await treeRes.json();
    const newTreeSha = treeData.sha;

    // 5. Create new commit
    onProgress?.({ step: 'commit', message: 'Tworzenie commita...' });
    const newCommitRes = await fetch(`${GITHUB_API_URL}/repos/${config.owner}/${config.repo}/git/commits`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message: commitMessage || 'Aktualizacja cennika z panelu SpaceFix',
        tree: newTreeSha,
        parents: [baseCommitSha],
      }),
    });

    if (!newCommitRes.ok) {
      throw new Error(`Błąd tworzenia commita: ${newCommitRes.statusText}`);
    }

    const newCommitData = await newCommitRes.json();
    const newCommitSha = newCommitData.sha;

    // 6. Update branch ref
    onProgress?.({ step: 'push', message: `Publikowanie zmian na gałąź ${config.branch}...` });
    const updateRefRes = await fetch(
      `${GITHUB_API_URL}/repos/${config.owner}/${config.repo}/git/refs/heads/${config.branch}`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          sha: newCommitSha,
          force: false,
        }),
      },
    );

    if (!updateRefRes.ok) {
      throw new Error(`Błąd aktualizacji gałęzi ${config.branch}: ${updateRefRes.statusText}`);
    }

    const commitUrl = `https://github.com/${config.owner}/${config.repo}/commit/${newCommitSha}`;
    const actionsUrl = `https://github.com/${config.owner}/${config.repo}/actions`;

    onProgress?.({
      step: 'done',
      message: 'Zmiany opublikowane pomyślnie! Wdrożenie na serwer wystartowało.',
      commitSha: newCommitSha,
      commitUrl,
      actionsUrl,
    });

    return {
      success: true,
      commitSha: newCommitSha,
      commitUrl,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Wystąpił błąd podczas publikacji na GitHubie';
    onProgress?.({
      step: 'error',
      message: errorMsg,
      error: errorMsg,
    });
    return {
      success: false,
      error: errorMsg,
    };
  }
}
