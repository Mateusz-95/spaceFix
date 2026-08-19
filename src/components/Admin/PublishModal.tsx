import React, { useState, useEffect } from 'react';
import {
  FiX,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiKey,
  FiGitBranch,
  FiExternalLink,
  FiLoader,
  FiFileText,
  FiSettings,
} from 'react-icons/fi';
import {
  type GitHubConfig,
  type ModifiedFile,
  type PublishProgress,
  checkGitHubAccess,
  publishCommitToGitHub,
} from './githubService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  modifiedFiles: ModifiedFile[];
  modifiedCount: number;
}

const GITHUB_TOKEN_STORAGE_KEY = 'spacefix_github_token';
const GITHUB_BRANCH_STORAGE_KEY = 'spacefix_github_branch';

export const PublishModal: React.FC<Props> = ({ isOpen, onClose, modifiedFiles, modifiedCount }) => {
  const [token, setToken] = useState<string>('');
  const [branch, setBranch] = useState<string>('prod');
  const [owner] = useState<string>('Mateusz-95');
  const [repo] = useState<string>('spaceFix');
  const [commitMessage, setCommitMessage] = useState<string>('');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [testingAuth, setTestingAuth] = useState<boolean>(false);
  const [authStatus, setAuthStatus] = useState<{ checked: boolean; success: boolean; message: string } | null>(null);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [progress, setProgress] = useState<PublishProgress | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem(GITHUB_TOKEN_STORAGE_KEY);
    const savedBranch = localStorage.getItem(GITHUB_BRANCH_STORAGE_KEY);
    if (savedToken) setToken(savedToken);
    if (savedBranch) setBranch(savedBranch);
    setCommitMessage(`Aktualizacja cennika z panelu SpaceFix (${modifiedCount} zmienionych modeli)`);
  }, [isOpen, modifiedCount]);

  if (!isOpen) return null;

  const handleSaveToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem(GITHUB_TOKEN_STORAGE_KEY, newToken);
    setAuthStatus(null);
  };

  const handleSaveBranch = (newBranch: string) => {
    setBranch(newBranch);
    localStorage.setItem(GITHUB_BRANCH_STORAGE_KEY, newBranch);
  };

  const handleTestConnection = async () => {
    if (!token.trim()) {
      setAuthStatus({ checked: true, success: false, message: 'Wpisz token GitHub przed testem.' });
      return;
    }
    setTestingAuth(true);
    setAuthStatus(null);
    const result = await checkGitHubAccess({ token, owner, repo, branch });
    setTestingAuth(false);
    setAuthStatus({ checked: true, success: result.success, message: result.message });
  };

  const handlePublish = async () => {
    if (!token.trim()) {
      setShowSettings(true);
      setAuthStatus({ checked: true, success: false, message: 'Podaj token GitHub, aby móc publikować.' });
      return;
    }

    setIsPublishing(true);
    setProgress({ step: 'auth', message: 'Rozpoczynanie procesu publikacji...' });

    const config: GitHubConfig = { token, owner, repo, branch };
    const publishRes = await publishCommitToGitHub(
      config,
      modifiedFiles,
      commitMessage || 'Aktualizacja cennika SpaceFix',
      (p) => setProgress(p),
    );

    if (!publishRes.success) {
      setProgress({
        step: 'error',
        message: publishRes.error || 'Wystąpił błąd podczas publikowania na GitHubie.',
      });
    }

    setIsPublishing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1c1d11] text-white">
              <FiSend className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Publikacja zmian na żywo</h2>
              <p className="text-xs text-slate-500">Automatyczne wdrożenie na serwer produkcyjny</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isPublishing}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 transition disabled:opacity-40"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Progress / Success State */}
          {progress && (
            <div
              className={`rounded-2xl p-5 border transition-all ${
                progress.step === 'done'
                  ? 'bg-emerald-50/80 border-emerald-200'
                  : progress.step === 'error'
                    ? 'bg-rose-50 border-rose-200'
                    : 'bg-blue-50/70 border-blue-200'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {progress.step === 'done' ? (
                  <FiCheckCircle className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : progress.step === 'error' ? (
                  <FiAlertCircle className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" />
                ) : (
                  <FiLoader className="h-6 w-6 text-blue-600 animate-spin shrink-0 mt-0.5" />
                )}

                <div className="flex-1">
                  <h4
                    className={`font-bold text-sm ${
                      progress.step === 'done'
                        ? 'text-emerald-900'
                        : progress.step === 'error'
                          ? 'text-rose-900'
                          : 'text-blue-900'
                    }`}
                  >
                    {progress.step === 'done'
                      ? 'Wdrożenie wystartowało pomyślnie! 🚀'
                      : progress.step === 'error'
                        ? 'Błąd publikacji'
                        : 'Publikowanie zmian w toku...'}
                  </h4>
                  <p
                    className={`mt-1 text-xs leading-relaxed ${
                      progress.step === 'done'
                        ? 'text-emerald-700'
                        : progress.step === 'error'
                          ? 'text-rose-700'
                          : 'text-blue-700'
                    }`}
                  >
                    {progress.message}
                  </p>

                  {progress.step === 'done' && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {progress.commitUrl && (
                        <a
                          href={progress.commitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                        >
                          Zobacz commit na GitHubie <FiExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {progress.actionsUrl && (
                        <a
                          href={progress.actionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-50"
                        >
                          Śledź deploy (GitHub Actions) <FiExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Target Branch and Summary */}
          {!progress?.commitSha && (
            <>
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Pliki do zaktualizowania:
                  </span>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-bold text-slate-800">
                    {modifiedFiles.length} plik(ów)
                  </span>
                </div>

                <ul className="space-y-1.5">
                  {modifiedFiles.map((f) => (
                    <li key={f.path} className="flex items-center gap-2 text-xs font-mono text-slate-700">
                      <FiFileText className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-900">{f.path}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Commit message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Opis zmian (opcjonalnie)</label>
                <input
                  type="text"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  placeholder="np. Aktualizacja cennika iPhone"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#1c1d11] focus:ring-1 focus:ring-[#1c1d11]"
                />
              </div>

              {/* GitHub Settings Dropdown / Accordion */}
              <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex w-full items-center justify-between p-4 text-left text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <FiSettings className="h-4 w-4 text-slate-400" />
                    Konfiguracja połączenia z GitHubem ({owner}/{repo} @ {branch})
                  </span>
                  <span className="text-slate-400 font-normal">
                    {token ? '🟢 Token skonfigurowany' : '🟡 Wymaga tokena'}
                  </span>
                </button>

                {showSettings && (
                  <div className="border-t border-slate-100 p-4 space-y-4 bg-slate-50/50">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        GitHub Personal Access Token (PAT)
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="password"
                            value={token}
                            onChange={(e) => handleSaveToken(e.target.value)}
                            placeholder="ghp_... lub github_pat_..."
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-[#1c1d11] focus:ring-1 focus:ring-[#1c1d11]"
                          />
                          <FiKey className="absolute right-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        </div>
                        <button
                          type="button"
                          onClick={handleTestConnection}
                          disabled={testingAuth}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                        >
                          {testingAuth ? 'Sprawdzanie...' : 'Testuj'}
                        </button>
                      </div>
                      <p className="mt-1.5 text-[11px] text-slate-500">
                        Token jest bezpiecznie przechowywany wyłącznie w Twojej przeglądarce. Wymaga uprawnienia{' '}
                        <code className="rounded bg-slate-100 px-1 py-0.5">repo</code> lub{' '}
                        <code className="rounded bg-slate-100 px-1 py-0.5">contents:write</code>.
                      </p>
                    </div>

                    {authStatus && (
                      <div
                        className={`rounded-lg p-2.5 text-xs flex items-center gap-2 ${
                          authStatus.success ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                        }`}
                      >
                        {authStatus.success ? (
                          <FiCheckCircle className="h-4 w-4" />
                        ) : (
                          <FiAlertCircle className="h-4 w-4" />
                        )}
                        {authStatus.message}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                        <FiGitBranch className="h-3.5 w-3.5 text-slate-500" /> Docelowa gałąź (branch)
                      </label>
                      <select
                        value={branch}
                        onChange={(e) => handleSaveBranch(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-900 bg-white"
                      >
                        <option value="prod">prod (Środowisko produkcyjne / serwer na żywo)</option>
                        <option value="main">main (Główna gałąź developerska)</option>
                        <option value="feature/admin-auto-publish">feature/admin-auto-publish (Gałąź testowa)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isPublishing}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
          >
            {progress?.step === 'done' ? 'Zamknij' : 'Anuluj'}
          </button>

          {!progress?.commitSha && (
            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing || modifiedFiles.length === 0}
              className="flex items-center gap-2 rounded-xl bg-[#1c1d11] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#2a2b1a] transition active:scale-[0.98] disabled:opacity-40"
            >
              {isPublishing ? (
                <>
                  <FiLoader className="h-4 w-4 animate-spin" />
                  Wdrażanie na serwer...
                </>
              ) : (
                <>
                  <FiSend className="h-4 w-4" />
                  Opublikuj na żywo ({branch})
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
