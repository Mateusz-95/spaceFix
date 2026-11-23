export interface RepairItem {
  key: string;
  title: string;
  shortTitle: string;
  price: string;
  description: string | string[];
  duration: string;
}

export interface ModelData {
  name: string;
  slug: string;
  image?: string;
  repairs: RepairItem[];
  // Metadata for grouping
  brandSlug?: string;
  categorySlug?: string;
  categoryName?: string;
}

function formatModel(model: ModelData): string {
  const repairsStr = (model.repairs || [])
    .map((r) => {
      const descStr = Array.isArray(r.description)
        ? `[\n${r.description.map((d) => `          ${JSON.stringify(d)}`).join(',\n')},\n        ]`
        : JSON.stringify(r.description || '');

      return `      {
        key: ${JSON.stringify(r.key)},
        title: ${JSON.stringify(r.title)},
        shortTitle: ${JSON.stringify(r.shortTitle)},
        price: ${JSON.stringify(r.price)},
        description: ${descStr},
        duration: ${JSON.stringify(r.duration)},
      }`;
    })
    .join(',\n');

  return `  {
    name: ${JSON.stringify(model.name)},
    slug: ${JSON.stringify(model.slug)},
    repairs: [
${repairsStr}
    ],
  }`;
}

export function formatArray(models: ModelData[]): string {
  return `[\n${models.map(formatModel).join(',\n')}\n]`;
}

export function generateIphoneFile(models: ModelData[]): string {
  return `const iPhoneModels = ${formatArray(models)};\n\nexport default iPhoneModels;\n`;
}

export function generateAppleWatchFile(models: ModelData[]): string {
  return `export const appleWatchModels = ${formatArray(models)};\n`;
}

export function generateGoogleFile(models: ModelData[]): string {
  return `const googleModels = ${formatArray(models)};\n\nexport default googleModels;\n`;
}

function pickCategory(categoriesMap: Record<string, ModelData[]>, ...keys: string[]): ModelData[] {
  for (const key of keys) {
    if (Array.isArray(categoriesMap[key])) return categoriesMap[key];
  }
  return [];
}

export function generateSamsungFile(categoriesMap: Record<string, ModelData[]>): string {
  const s = pickCategory(categoriesMap, 'galaxy-s/', 'galaxy-s');
  const a = pickCategory(categoriesMap, 'galaxy-a/', 'galaxy-a');
  const m = pickCategory(categoriesMap, 'galaxy-m/', 'galaxy-m');
  const j = pickCategory(categoriesMap, 'galaxy-j/', 'galaxy-j');
  const note = pickCategory(categoriesMap, 'galaxy-note/', 'galaxy-note');
  const tab = pickCategory(categoriesMap, 'galaxy-tab/', 'galaxy-tab');
  const watch = pickCategory(categoriesMap, 'galaxy-watch/', 'galaxy-watch');
  const z = pickCategory(categoriesMap, 'galaxy-z/', 'galaxy-z');
  const xcover = pickCategory(categoriesMap, 'galaxy-xcover/', 'galaxy-xcover');

  return `export const galaxyS = ${formatArray(s)};\n\nexport const galaxyA = ${formatArray(
    a,
  )};\n\nexport const galaxyM = ${formatArray(m)};\n\nexport const galaxyJ = ${formatArray(
    j,
  )};\n\nexport const galaxyNote = ${formatArray(note)};\n\nexport const galaxyTab = ${formatArray(
    tab,
  )};\n\nexport const galaxyWatch = ${formatArray(watch)};\n\nexport const galaxyZ = ${formatArray(
    z,
  )};\n\nexport const galaxyXcover = ${formatArray(xcover)};\n`;
}

export function generateXiaomiFile(categoriesMap: Record<string, ModelData[]>): string {
  const poco = categoriesMap['poco/'] || categoriesMap['poco'] || [];
  const mi = categoriesMap['xiaomiMi/'] || categoriesMap['xiaomiMi'] || [];
  const redmi = categoriesMap['xiaomiRedmi/'] || categoriesMap['xiaomiRedmi'] || [];

  return `export const poco = ${formatArray(poco)};\n\nexport const xiaomiMi = ${formatArray(
    mi,
  )};\n\nexport const xiaomiRedmi = ${formatArray(redmi)};\n`;
}

export function generateIpadFile(categoriesMap: Record<string, ModelData[]>): string {
  const standard = categoriesMap['10.2/'] || categoriesMap['10.2'] || categoriesMap['ipad/'] || [];
  const mini = categoriesMap['mini/'] || categoriesMap['mini'] || [];
  const air = categoriesMap['air/'] || categoriesMap['air'] || [];
  const pro = categoriesMap['pro/'] || categoriesMap['pro'] || [];

  return `export const ipadStandard = ${formatArray(standard)};\n\nexport const ipadMini = ${formatArray(
    mini,
  )};\n\nexport const ipadAir = ${formatArray(air)};\n\nexport const ipadPro = ${formatArray(pro)};\n`;
}

export function downloadFile(filename: string, content: string, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
