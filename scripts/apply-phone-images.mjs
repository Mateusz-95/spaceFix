import fs from 'node:fs';
import path from 'node:path';

/**
 * Dopasowuje zeskrobane (scripts/output/phone-images-*.json) zdjęcia telefonów
 * do modeli z src/data/**, pobiera je lokalnie do public/images/phones/
 * i generuje mapę slug -> ścieżka w src/data/phone-images.ts.
 *
 * Uruchom po `npm run fetch-phone-images <brand>`:
 *   node scripts/apply-phone-images.mjs
 */

const ROOT = path.resolve('.');
const OUTPUT_DIR = path.join(ROOT, 'scripts/output');
const IMAGES_DIR = path.join(ROOT, 'public/images/phones');
const MAP_FILE = path.join(ROOT, 'src/data/phone-images.ts');

/** Pliki z modelami, w których szukamy par name/slug. */
const MODEL_FILES = [
  'src/data/iphone/models.ts',
  'src/data/samsung/models.ts',
  'src/data/xiaomi/models.ts',
  'src/data/google/models.ts',
  'src/data/iPad/models.ts',
];

/**
 * Ręczne korekty błędnych adresów ze źródła (GSMArena/scraper pomylił zdjęcia
 * iPhone 11 Pro i 11 Pro Max). Klucz = znormalizowana nazwa modelu.
 */
const IMAGE_OVERRIDES = {
  iphone11promax: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro-max-.jpg',
  iphone11pro: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro.jpg',
};

/**
 * Literówki w nazwach modeli -> poprawna nazwa do dopasowania ze GSMArena.
 * Nie zmienia danych źródłowych, tylko lookup zdjęcia.
 */
const NAME_ALIASES = {
  'Pixlel 8a': 'Pixel 8a',
  'Pxel 4a': 'Pixel 4a',
  'Pixlel 3': 'Pixel 3',
  'iPad 11gen': 'iPad (2025)',
  'iPad 10gen': 'iPad (2022)',
  'iPad 9gen': 'iPad 10.2 (2021)',
  'iPad 8gen': 'iPad 10.2 (2020)',
  'iPad 7gen': 'iPad 10.2 (2019)',
  'iPad 6gen': 'iPad 9.7 (2018)',
  'iPad 5gen': 'iPad 9.7 (2017)',
  'iPad 4gen': 'iPad 4 Wi-Fi',
  'iPad Mini 7': 'iPad mini (2024)',
  'iPad Mini 6': 'iPad mini (2021)',
  'iPad Mini 5': 'iPad mini (2019)',
  'iPad Mini 4': 'iPad mini 4 (2015)',
  'iPad Mini 3': 'iPad mini 3',
  'iPad Mini 2': 'iPad mini 2',
  'iPad Mini': 'iPad mini Wi-Fi',
  'iPad Air M3 13”': 'iPad Air 13 (2025)',
  'iPad Air M3 11”': 'iPad Air 11 (2025)',
  'iPad Air 6gen.': 'iPad Air 11 (2024)',
  'iPad Air 5gen.': 'iPad Air (2022)',
  'iPad Air 4gen.': 'iPad Air (2020)',
  'iPad Air 3gen.': 'iPad Air (2019)',
  'iPad Pro M5 13"': 'iPad Pro 13 (2025)',
  'iPad Pro M5 11"': 'iPad Pro 11 (2025)',
  'iPad Pro M4 13"': 'iPad Pro 13 (2024)',
  'iPad Pro M4 11"': 'iPad Pro 11 (2024)',
  'iPad Pro 13"': 'iPad Pro 13 (2024)',
  'iPad Pro 12.9" 6gen.': 'iPad Pro 12.9 (2022)',
  'iPad Pro 12.9 5gen.': 'iPad Pro 12.9 (2021)',
  'iPad Pro 12,9" 4gen.': 'iPad Pro 12.9 (2020)',
  'iPad Pro 12,9" 3gen.': 'iPad Pro 12.9 (2018)',
  'iPad Pro 12,9" 2gen.': 'iPad Pro 12.9 (2017)',
  'iPad Pro 12,9" 1gen.': 'iPad Pro 12.9 (2015)',
  'iPad Pro 11" 5gen.': 'iPad Pro 11 (2024)',
  'iPad Pro 11" 4gen.': 'iPad Pro 11 (2022)',
  'iPad Pro 11" 3gen.': 'iPad Pro 11 (2021)',
  'iPad Pro 11" 2gen.': 'iPad Pro 11 (2020)',
  'iPad Pro 11" 1gen.': 'iPad Pro 11 (2018)',
  'iPad Pro 10.5"': 'iPad Pro 10.5 (2017)',
  'iPad Pro 9,7"': 'iPad Pro 9.7 (2016)',
};

/**
 * Normalizuje nazwę do porównań:
 *  - małe litery,
 *  - "+" -> "plus" (np. Galaxy S26+ == Galaxy S26 Plus),
 *  - usuwa prefiksy marek (Samsung/Xiaomi/Google), bo GSMArena ich nie używa
 *    (np. "Samsung Galaxy S25" -> "galaxys25", "Google Pixel 9" -> "pixel9"),
 *  - usuwa wszystkie znaki niealfanumeryczne.
 */
function normalize(name) {
  return String(name)
    .toLowerCase()
    .replace(/\+/g, ' plus ')
    .replace(/\b(samsung|xiaomi|google|apple)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, '');
}

/**
 * Luźniejszy klucz — dodatkowo pomija sufiksy łączności (5G/4G/LTE),
 * bo GSMArena dodaje je niespójnie (np. "Galaxy S22 Ultra 5G" vs nasze
 * "Galaxy S22 Ultra", albo nasze "Galaxy A54 5G" vs ich "Galaxy A54").
 */
function looseKey(name) {
  return String(name)
    .toLowerCase()
    .replace(/\+/g, ' plus ')
    .replace(/\b(samsung|xiaomi|google|apple)\b/g, ' ')
    .replace(/\b(5g|4g|lte)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, '');
}

/**
 * Wczytuje wszystkie pliki scripts/output/phone-images-*.json do dwóch map:
 * dokładnej (exact) i luźnej (loose, bez sufiksów 5G/4G).
 */
function loadScrapedImages() {
  const exact = new Map();
  const loose = new Map();
  if (!fs.existsSync(OUTPUT_DIR)) return { exact, loose };

  for (const file of fs.readdirSync(OUTPUT_DIR)) {
    if (!/^phone-images-.*\.json$/.test(file)) continue;
    const items = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, file), 'utf8'));
    for (const item of items) {
      if (!item?.phoneName || !item?.phoneImage) continue;
      const exactKey = normalize(item.phoneName);
      const looseK = looseKey(item.phoneName);
      if (!exact.has(exactKey)) exact.set(exactKey, item.phoneImage);
      // W mapie luźnej preferujemy wpis bazowy (bez sufiksu), gdy klucze kolidują.
      if (!loose.has(looseK) || exactKey === looseK) loose.set(looseK, item.phoneImage);
    }
  }

  for (const [key, url] of Object.entries(IMAGE_OVERRIDES)) {
    exact.set(key, url);
  }

  return { exact, loose };
}

/** Znajduje URL zdjęcia dla nazwy modelu: najpierw exact, potem loose. */
function findImage(maps, modelName) {
  const lookupName = NAME_ALIASES[modelName] ?? modelName;
  return maps.exact.get(normalize(lookupName)) ?? maps.loose.get(looseKey(lookupName)) ?? null;
}

/** Wczytuje istniejącą mapę slug -> ścieżka, żeby nie kasować zdjęć przy częściowym scrapie. */
function loadExistingMap() {
  const map = {};
  if (!fs.existsSync(MAP_FILE)) return map;
  const text = fs.readFileSync(MAP_FILE, 'utf8');
  const regex = /'([^']+)':\s*'([^']+)'/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    map[match[1]] = match[2];
  }
  return map;
}

/** Wyciąga pary { name, slug } z pliku TS modeli (kolejne pola name/slug). */
function extractModels(fileText) {
  const regex = /name:\s*'([^']*)'\s*,\s*slug:\s*'([^']*)'/g;
  const models = [];
  let match;
  while ((match = regex.exec(fileText)) !== null) {
    models.push({ name: match[1].trim(), slug: match[2].trim() });
  }
  return models;
}

/** slug -> nazwa pliku obrazka (bez ścieżki). */
function imageFileName(slug, url) {
  const base = slug.replace(/\/+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const ext = (path.extname(new URL(url).pathname) || '.jpg').toLowerCase();
  return `${base}${ext}`;
}

async function download(url, destPath) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      Referer: 'https://www.gsmarena.com/',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} dla ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
}

async function main() {
  const scraped = loadScrapedImages();
  if (scraped.exact.size === 0) {
    console.error('❌ Brak danych w scripts/output/. Uruchom najpierw `npm run fetch-phone-images <brand>`.');
    process.exit(1);
  }

  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const slugToPath = loadExistingMap();
  const matched = [];
  const unmatched = [];

  for (const relFile of MODEL_FILES) {
    const absFile = path.join(ROOT, relFile);
    if (!fs.existsSync(absFile)) continue;
    const models = extractModels(fs.readFileSync(absFile, 'utf8'));

    for (const model of models) {
      const url = findImage(scraped, model.name);
      if (!url) {
        unmatched.push(model.name);
        continue;
      }
      const fileName = imageFileName(model.slug, url);
      const destPath = path.join(IMAGES_DIR, fileName);
      try {
        if (!fs.existsSync(destPath)) {
          await download(url, destPath);
        }
        slugToPath[model.slug] = `/images/phones/${fileName}`;
        matched.push(model.name);
      } catch (error) {
        console.warn(`⚠ Nie pobrano zdjęcia dla "${model.name}": ${error.message}`);
        unmatched.push(model.name);
      }
    }
  }

  const entries = Object.keys(slugToPath)
    .sort()
    .map((slug) => `  '${slug}': '${slugToPath[slug]}',`)
    .join('\n');

  const fileContent = `/**
 * Mapa slug modelu -> lokalna ścieżka zdjęcia frontu telefonu.
 * Generowane automatycznie przez scripts/apply-phone-images.mjs — nie edytuj ręcznie.
 */
export const phoneImages: Record<string, string> = {
${entries}
};
`;

  fs.writeFileSync(MAP_FILE, fileContent, 'utf8');

  console.log(`✅ Dopasowano i pobrano ${matched.length} zdjęć -> public/images/phones/`);
  console.log(`✅ Zapisano mapę -> ${path.relative(ROOT, MAP_FILE)}`);
  if (unmatched.length > 0) {
    console.log(`\nℹ Bez dopasowania (${unmatched.length}): ${unmatched.join(', ')}`);
  }
}

main().catch((error) => {
  console.error('❌ Nieoczekiwany błąd:', error);
  process.exit(1);
});
