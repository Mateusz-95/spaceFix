import React, { useState } from 'react';
import {
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
  FiClock,
  FiEdit3,
  FiCheck,
  FiDollarSign,
  FiFileText,
} from 'react-icons/fi';
import type { ModelData, RepairItem } from './fileGenerators';

interface Props {
  model: ModelData;
  isModified: boolean;
  onUpdateRepair: (modelSlug: string, repairIndex: number, updated: Partial<RepairItem>) => void;
}

export const ModelEditCard: React.FC<Props> = ({ model, isModified, onUpdateRepair }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const phoneCount = model.repairs?.length || 0;
  const quoteCount = (model.repairs || []).filter(
    (r) => r.price?.toLowerCase().includes('wycena') || r.price?.trim() === '-' || r.price?.trim() === '- zł',
  ).length;

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 ${
        isModified
          ? 'border-amber-400 bg-amber-50/20 shadow-md'
          : 'border-slate-200/80 bg-white shadow-sm hover:border-slate-300'
      }`}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex cursor-pointer items-center justify-between gap-4 p-4 sm:p-5"
      >
        <div className="flex min-w-0 items-center gap-3.5">
          {model.image ? (
            <img
              src={model.image}
              alt={model.name}
              className="h-12 w-12 shrink-0 rounded-xl object-contain p-1 bg-slate-50 border border-slate-100"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 font-bold text-xs">
              {model.name.slice(0, 3).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-bold text-slate-900 sm:text-lg">{model.name}</h3>
              {isModified && (
                <span className="shrink-0 rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                  Zmieniono
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {model.categoryName ? `${model.categoryName} • ` : ''}
              {phoneCount} napraw(y)
              {quoteCount > 0 ? (
                <span className="ml-1.5 font-medium text-amber-600">({quoteCount} do wyceny)</span>
              ) : (
                <span className="ml-1.5 font-medium text-emerald-600">(komplet cen)</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"
            aria-label={isExpanded ? 'Zwiń' : 'Rozwiń'}
          >
            {isExpanded ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-slate-100 p-4 sm:p-6 space-y-6 bg-slate-50/50 rounded-b-2xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {model.repairs?.map((repair, idx) => (
              <div
                key={repair.key || idx}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-sm text-slate-900">{repair.shortTitle || repair.title}</span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono text-slate-600">
                    {repair.key}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <FiDollarSign className="h-3 w-3 text-emerald-600" /> Cena
                  </label>
                  <input
                    type="text"
                    value={repair.price || ''}
                    onChange={(e) => onUpdateRepair(model.slug, idx, { price: e.target.value })}
                    placeholder="np. 249 zł lub Wycena telefoniczna"
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-900 focus:border-[#1c1d11] focus:ring-1 focus:ring-[#1c1d11]"
                  />
                  <div className="mt-1 flex flex-wrap gap-1">
                    {['Wycena telefoniczna', '199 zł', '249 zł', '299 zł', '349 zł', '399 zł', '499 zł'].map(
                      (preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => onUpdateRepair(model.slug, idx, { price: preset })}
                          className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600 hover:bg-slate-200"
                        >
                          {preset}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <FiClock className="h-3 w-3 text-blue-600" /> Czas naprawy
                  </label>
                  <input
                    type="text"
                    value={repair.duration || ''}
                    onChange={(e) => onUpdateRepair(model.slug, idx, { duration: e.target.value })}
                    placeholder="np. 3-4 godziny"
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900 focus:border-[#1c1d11] focus:ring-1 focus:ring-[#1c1d11]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <FiFileText className="h-3 w-3 text-purple-600" /> Opis
                  </label>
                  <textarea
                    rows={2}
                    value={Array.isArray(repair.description) ? repair.description.join('\n') : repair.description || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      const isMulti = val.includes('\n');
                      onUpdateRepair(model.slug, idx, {
                        description: isMulti ? val.split('\n').filter((l) => l.trim().length > 0) : val,
                      });
                    }}
                    placeholder="Opis naprawy..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700 focus:border-[#1c1d11] focus:ring-1 focus:ring-[#1c1d11]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
