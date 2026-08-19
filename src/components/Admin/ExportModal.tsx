import React, { useState } from 'react';
import { FiX, FiCopy, FiDownload, FiCheck, FiFolder, FiFileText, FiEye, FiChevronLeft } from 'react-icons/fi';
import {
  type ModelData,
  generateIphoneFile,
  generateAppleWatchFile,
  generateGoogleFile,
  generateSamsungFile,
  generateXiaomiFile,
  generateIpadFile,
  downloadFile,
} from './fileGenerators';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  models: ModelData[];
}

interface ExportItem {
  id: string;
  title: string;
  path: string;
  modelCount: number;
  filename: string;
  getContent: () => string;
}

export const ExportModal: React.FC<Props> = ({ isOpen, onClose, models }) => {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingAll, setDownloadingAll] = useState<boolean>(false);

  if (!isOpen) return null;

  // Group models by brand & category
  const iphoneModels = models.filter((m) => m.brandSlug === 'apple/' && m.categorySlug === 'iphone/');
  const appleWatchModels = models.filter((m) => m.brandSlug === 'apple/' && m.categorySlug === 'apple-watch/');
  const googleModels = models.filter((m) => m.brandSlug === 'google/');

  const samsungMap: Record<string, ModelData[]> = {};
  models
    .filter((m) => m.brandSlug === 'samsung/')
    .forEach((m) => {
      const cat = m.categorySlug || 'default';
      if (!samsungMap[cat]) samsungMap[cat] = [];
      samsungMap[cat].push(m);
    });

  const xiaomiMap: Record<string, ModelData[]> = {};
  models
    .filter((m) => m.brandSlug === 'xiaomi/')
    .forEach((m) => {
      const cat = m.categorySlug || 'default';
      if (!xiaomiMap[cat]) xiaomiMap[cat] = [];
      xiaomiMap[cat].push(m);
    });

  const ipadMap: Record<string, ModelData[]> = {};
  models
    .filter((m) => m.brandSlug === 'apple-ipad/' || m.categorySlug === 'ipad/' || m.brandSlug === 'apple/')
    .forEach((m) => {
      const cat = m.categorySlug || 'default';
      if (['10.2/', 'mini/', 'air/', 'pro/'].includes(cat)) {
        if (!ipadMap[cat]) ipadMap[cat] = [];
        ipadMap[cat].push(m);
      }
    });

  const exportItems: ExportItem[] = [
    {
      id: 'iphone',
      title: 'Apple iPhone',
      path: 'src/data/iphone/models.ts',
      filename: 'iphone-models.ts',
      modelCount: iphoneModels.length,
      getContent: () => generateIphoneFile(iphoneModels),
    },
    {
      id: 'samsung',
      title: 'Samsung Galaxy (S, A, M, J, Note)',
      path: 'src/data/samsung/models.ts',
      filename: 'samsung-models.ts',
      modelCount: Object.values(samsungMap).reduce((acc, arr) => acc + arr.length, 0),
      getContent: () => generateSamsungFile(samsungMap),
    },
    {
      id: 'google',
      title: 'Google Pixel',
      path: 'src/data/google/models.ts',
      filename: 'google-models.ts',
      modelCount: googleModels.length,
      getContent: () => generateGoogleFile(googleModels),
    },
    {
      id: 'xiaomi',
      title: 'Xiaomi (Poco, Mi, Redmi)',
      path: 'src/data/xiaomi/models.ts',
      filename: 'xiaomi-models.ts',
      modelCount: Object.values(xiaomiMap).reduce((acc, arr) => acc + arr.length, 0),
      getContent: () => generateXiaomiFile(xiaomiMap),
    },
    {
      id: 'ipad',
      title: 'Apple iPad (Podstawowy, Mini, Air, Pro)',
      path: 'src/data/iPad/models.ts',
      filename: 'ipad-models.ts',
      modelCount: Object.values(ipadMap).reduce((acc, arr) => acc + arr.length, 0),
      getContent: () => generateIpadFile(ipadMap),
    },
    {
      id: 'appleWatch',
      title: 'Apple Watch',
      path: 'src/data/appleWatch/models.ts',
      filename: 'appleWatch-models.ts',
      modelCount: appleWatchModels.length,
      getContent: () => generateAppleWatchFile(appleWatchModels),
    },
    {
      id: 'json',
      title: 'Kompletny cennik wszystkich marek (JSON)',
      path: 'cennik-spacefix.json',
      filename: 'cennik-spacefix.json',
      modelCount: models.length,
      getContent: () => JSON.stringify(models, null, 2),
    },
  ];

  const handleCopyItem = (item: ExportItem) => {
    try {
      const content = item.getContent();
      navigator.clipboard.writeText(content);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      console.error('Copy error:', err);
    }
  };

  const handleDownloadItem = (item: ExportItem) => {
    try {
      const content = item.getContent();
      downloadFile(item.filename, content, item.id === 'json' ? 'application/json' : 'text/plain');
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  const handleDownloadAll = () => {
    setDownloadingAll(true);
    exportItems.forEach((item, idx) => {
      setTimeout(() => {
        handleDownloadItem(item);
        if (idx === exportItems.length - 1) {
          setTimeout(() => setDownloadingAll(false), 500);
        }
      }, idx * 300);
    });
  };

  const previewItem = previewId ? exportItems.find((i) => i.id === previewId) : null;
  const previewContent = previewItem ? previewItem.getContent() : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Eksport zaktualizowanego cennika</h2>
            <p className="text-xs text-slate-500">
              Pobierz zaktualizowane pliki kodu lub skopiuj ich treść do projektu
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 transition"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        {previewItem ? (
          /* Preview View */
          <div className="flex flex-1 flex-col overflow-hidden bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-slate-400">
              <button
                onClick={() => setPreviewId(null)}
                className="flex items-center gap-1 font-semibold text-slate-200 hover:text-white transition"
              >
                <FiChevronLeft className="h-4 w-4" /> Wróć do listy plików
              </button>
              <span>{previewItem.path}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyItem(previewItem)}
                  className="rounded bg-slate-800 px-2.5 py-1 text-slate-200 hover:bg-slate-700"
                >
                  {copiedId === previewItem.id ? '✓ Skopiowano!' : 'Kopiuj całość'}
                </button>
                <button
                  onClick={() => handleDownloadItem(previewItem)}
                  className="rounded bg-[#1c1d11] border border-white/20 px-2.5 py-1 text-white hover:bg-black"
                >
                  Pobierz plik
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-200">
              <textarea
                readOnly
                value={previewContent}
                className="h-full w-full bg-transparent font-mono text-xs text-slate-200 focus:outline-none resize-none"
              />
            </div>
          </div>
        ) : (
          /* Card list View */
          <div className="flex-1 overflow-auto p-6 bg-slate-50/60 space-y-4">
            {/* Download all banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-[#1c1d11] p-5 text-white shadow-md">
              <div>
                <h3 className="font-bold text-base">Pobierz wszystkie pliki</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Automatycznie pobierze zestaw plików dla wszystkich marek ({models.length} modeli)
                </p>
              </div>
              <button
                onClick={handleDownloadAll}
                disabled={downloadingAll}
                className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-[#1c1d11] shadow hover:bg-slate-100 transition active:scale-[0.98] disabled:opacity-50"
              >
                <FiFolder className="h-4 w-4" />
                {downloadingAll ? 'Pobieranie plików...' : 'Pobierz wszystkie pliki'}
              </button>
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 pt-2">
              Pliki poszczególnych marek:
            </div>

            <div className="grid gap-3">
              {exportItems.map((item) => {
                const isCopied = copiedId === item.id;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <FiFileText className="h-4 w-4 text-slate-500 shrink-0" />
                        <h4 className="font-bold text-sm text-slate-900 truncate">{item.title}</h4>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                          {item.modelCount} modeli
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400 font-mono">
                        Docelowo: <span className="text-slate-600">{item.path}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        onClick={() => setPreviewId(item.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                        title="Podgląd kodu"
                      >
                        <FiEye className="h-3.5 w-3.5" /> Podgląd
                      </button>

                      <button
                        onClick={() => handleCopyItem(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                        title="Kopiuj do schowka"
                      >
                        {isCopied ? (
                          <FiCheck className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <FiCopy className="h-3.5 w-3.5" />
                        )}
                        {isCopied ? 'Skopiowano!' : 'Kopiuj kod'}
                      </button>

                      <button
                        onClick={() => handleDownloadItem(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#1c1d11] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#2a2b1a] transition"
                        title="Pobierz plik"
                      >
                        <FiDownload className="h-3.5 w-3.5" /> Pobierz
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-3.5 text-xs text-slate-500">
          <span>Wszystkie dane generowane w locie z Twoich zmian</span>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};
