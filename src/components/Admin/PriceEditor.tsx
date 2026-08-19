import React, { useState, useEffect, useMemo } from 'react';
import data from '../../data/data';
import { phoneImages } from '../../data/phone-images';
import { AuthLock } from './AuthLock';
import { ModelEditCard } from './ModelEditCard';
import { ExportModal } from './ExportModal';
import type { ModelData, RepairItem } from './fileGenerators';
import {
  FiSearch,
  FiDownload,
  FiRefreshCw,
  FiCheck,
  FiLayers,
} from 'react-icons/fi';

interface DataRepair {
  key: string;
  title: string;
  shortTitle: string;
  price: string;
  description: string | string[];
  duration: string;
}

interface DataPhone {
  name: string;
  slug: string;
  image?: string;
  repairs?: DataRepair[];
}

interface DataCategory {
  name: string;
  slug: string;
  phones?: DataPhone[];
}

interface DataBrand {
  name: string;
  slug: string;
  categories?: DataCategory[];
}

const STORAGE_KEY = 'spacefix_price_editor_draft_v1';

export const PriceEditor: React.FC = () => {
  // Flatten initial data from data.ts
  const initialModels: ModelData[] = useMemo(() => {
    const list: ModelData[] = [];
    (data as readonly DataBrand[]).forEach((brand) => {
      brand.categories?.forEach((category) => {
        category.phones?.forEach((phone) => {
          list.push({
            name: phone.name,
            slug: phone.slug,
            image: phone.image || phoneImages[phone.slug],
            repairs: (phone.repairs || []).map((r) => ({ ...r })),
            brandSlug: brand.slug,
            categorySlug: category.slug,
            categoryName: category.name,
          });
        });
      });
    });
    return list;
  }, []);

  const [models, setModels] = useState<ModelData[]>([]);
  const [modifiedSlugs, setModifiedSlugs] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'modified' | 'quotes'>('all');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 20;

  // Load initial / draft data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setModels(parsed);
          // Calculate modified
          const diffs = new Set<string>();
          parsed.forEach((m: ModelData) => {
            const orig = initialModels.find((origM) => origM.slug === m.slug);
            if (orig && JSON.stringify(orig.repairs) !== JSON.stringify(m.repairs)) {
              diffs.add(m.slug);
            }
          });
          setModifiedSlugs(diffs);
          return;
        }
      } catch (err) {
        console.error('Error loading draft prices:', err);
      }
    }
    setModels(initialModels);
  }, [initialModels]);

  // Update a repair
  const handleUpdateRepair = (modelSlug: string, repairIndex: number, updated: Partial<RepairItem>) => {
    setModels((prev) => {
      const next = prev.map((m) => {
        if (m.slug !== modelSlug) return m;
        const newRepairs = [...m.repairs];
        newRepairs[repairIndex] = { ...newRepairs[repairIndex], ...updated };
        return { ...m, repairs: newRepairs };
      });

      // Auto save to local storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      setModifiedSlugs((prevSlugs) => {
        const nextSlugs = new Set(prevSlugs);
        nextSlugs.add(modelSlug);
        return nextSlugs;
      });

      setSaveStatus('Zapisano w pamięci roboczej');
      setTimeout(() => setSaveStatus(''), 2500);

      return next;
    });
  };

  // Reset to original data
  const handleReset = () => {
    if (window.confirm('Czy na pewno chcesz przywrócić domyślne ceny i wyczyścić wersję roboczą?')) {
      localStorage.removeItem(STORAGE_KEY);
      setModels(initialModels);
      setModifiedSlugs(new Set());
      setSaveStatus('Przywrócono domyślne');
      setTimeout(() => setSaveStatus(''), 2500);
    }
  };

  // Get available brands
  const brands = useMemo(() => {
    const unique = new Map<string, string>();
    (data as readonly DataBrand[]).forEach((b) => unique.set(b.slug, b.name));
    return Array.from(unique.entries()).map(([slug, name]) => ({ slug, name }));
  }, []);

  // Get available categories for selected brand
  const categories = useMemo(() => {
    if (selectedBrand === 'all') return [];
    const brand = (data as readonly DataBrand[]).find((b) => b.slug === selectedBrand);
    return brand?.categories || [];
  }, [selectedBrand]);

  // Filtered models
  const filteredModels = useMemo(() => {
    return models.filter((m) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = m.name.toLowerCase().includes(q);
        const matchesCategory = m.categoryName?.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory) return false;
      }

      // Brand
      if (selectedBrand !== 'all' && m.brandSlug !== selectedBrand) return false;

      // Category
      if (selectedCategory !== 'all' && m.categorySlug !== selectedCategory) return false;

      // Filter type
      if (filterType === 'modified' && !modifiedSlugs.has(m.slug)) return false;
      if (filterType === 'quotes') {
        const hasQuote = m.repairs.some(
          (r) => r.price?.toLowerCase().includes('wycena') || r.price?.trim() === '-' || r.price?.trim() === '- zł',
        );
        if (!hasQuote) return false;
      }

      return true;
    });
  }, [models, searchQuery, selectedBrand, selectedCategory, filterType, modifiedSlugs]);

  // Pagination
  const totalPages = Math.ceil(filteredModels.length / itemsPerPage) || 1;
  const paginatedModels = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredModels.slice(start, start + itemsPerPage);
  }, [filteredModels, page]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedBrand, selectedCategory, filterType]);

  return (
    <AuthLock>
      <div className="min-h-screen bg-[#f8f9fa] pb-24">
        {/* Top bar header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c1d11] tracking-tight">
                  Edytor Cennika Serwisu
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Edytuj ceny, opisy i czasy napraw dla wszystkich {models.length} modeli urządzeń
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {saveStatus && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl">
                    <FiCheck className="h-4 w-4" /> {saveStatus}
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
                  title="Przywróć domyślne dane"
                >
                  <FiRefreshCw className="h-4 w-4" />
                  Przywróć domyślne
                </button>

                <button
                  type="button"
                  onClick={() => setIsExportOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1c1d11] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#2a2b1a] transition active:scale-[0.98]"
                >
                  <FiDownload className="h-4 w-4" />
                  Eksportuj / Pobierz pliki ({modifiedSlugs.size} zmian)
                </button>
              </div>
            </div>

            {/* Filter controls */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* Search */}
              <div className="relative">
                <FiSearch className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Szukaj modelu (np. iPhone 15, S24, Pixel)..."
                  className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:border-[#1c1d11] focus:ring-1 focus:ring-[#1c1d11]"
                />
              </div>

              {/* Brand Selector */}
              <div>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setSelectedCategory('all');
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-[#1c1d11] focus:ring-1 focus:ring-[#1c1d11]"
                >
                  <option value="all">Wszystkie marki ({models.length})</option>
                  {brands.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category / Series Selector */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  disabled={selectedBrand === 'all' || categories.length === 0}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-[#1c1d11] focus:ring-1 focus:ring-[#1c1d11] disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="all">Wszystkie serie</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Type */}
              <div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as 'all' | 'modified' | 'quotes')}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-[#1c1d11] focus:ring-1 focus:ring-[#1c1d11]"
                >
                  <option value="all">Wszystkie modele</option>
                  <option value="quotes">Do wyceny (Wycena telefoniczna)</option>
                  <option value="modified">Tylko zmodyfikowane ({modifiedSlugs.size})</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content list */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Znaleziono: <span className="text-slate-900 font-bold">{filteredModels.length}</span> modeli
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                >
                  Poprzednia
                </button>
                <span className="text-xs text-slate-600">
                  Strona {page} z {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                >
                  Następna
                </button>
              </div>
            )}
          </div>

          {filteredModels.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <FiLayers className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-4 text-base font-bold text-slate-800">Brak modeli spełniających kryteria</h3>
              <p className="mt-1 text-xs text-slate-500">Zmień filtry lub wyszukiwane hasło</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedModels.map((model) => (
                <ModelEditCard
                  key={model.slug}
                  model={model}
                  isModified={modifiedSlugs.has(model.slug)}
                  onUpdateRepair={handleUpdateRepair}
                />
              ))}
            </div>
          )}

          {/* Bottom pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                Poprzednia strona
              </button>
              <span className="text-xs font-medium text-slate-600 px-3">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => {
                  setPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                Następna strona
              </button>
            </div>
          )}
        </div>

        {/* Export Modal */}
        <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} models={models} />
      </div>
    </AuthLock>
  );
};
export default PriceEditor;
