import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import {
  modelSupportsRepair,
  repairTypes,
  searchModels,
  type ModelHit,
} from '../Configurator/configurator-data';
import { getModelRepairHref, getOfferHref } from '../Configurator/konfigurator-url';
import { withBase } from '../../utils/withBase';

interface Props {
  /** Zamiast przejścia na konfigurator — wybór w już otwartym konfiguratorze. */
  onSelect?: (hit: ModelHit) => void;
  onNavigate?: () => void;
  autoFocus?: boolean;
  /** Na stronie usługi: po wyborze modelu otwiera od razu cenę tej naprawy. */
  repairId?: string;
}

const ModelSearchBox: React.FC<Props> = ({ onSelect, onNavigate, autoFocus = false, repairId }) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const boxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const results = useMemo(() => searchModels(query), [query]);

  useEffect(() => {
    const handlePointer = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointer);
    return () => document.removeEventListener('mousedown', handlePointer);
  }, []);

  const choose = (hit: ModelHit) => {
    setOpen(false);
    setQuery(hit.name);
    onNavigate?.();
    if (onSelect) {
      onSelect(hit);
      return;
    }
    const repair = repairId ? repairTypes.find((item) => item.id === repairId) : undefined;
    if (repair && repair.inPriceList !== false && modelSupportsRepair(hit.model, repair)) {
      window.location.assign(getOfferHref(hit.selection, repair.id));
      return;
    }
    window.location.assign(getModelRepairHref(hit.selection));
  };

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-xl text-left">
      <FiSearch
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748b]"
        aria-hidden="true"
      />
      <input
        type="search"
        value={query}
        autoFocus={autoFocus}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && results[0]) {
            event.preventDefault();
            choose(results[0]);
          }
          if (event.key === 'Escape') setOpen(false);
        }}
        placeholder="np. iPhone 14, Galaxy S25, Apple Watch"
        aria-label="Wyszukaj model"
        aria-controls={boxId}
        aria-expanded={open && results.length > 0}
        role="combobox"
        className="w-full rounded-2xl border border-[#e2e8f0] bg-white py-3.5 pl-12 pr-4 text-base text-[#010101] shadow-contact outline-none transition placeholder:text-[#94a3b8] focus:border-[#1c1d11] focus:ring-2 focus:ring-[#1c1d11]/10"
      />
      {open && query.trim().length >= 2 && (
        <ul
          id={boxId}
          role="listbox"
          className="absolute z-30 mt-2 max-h-80 w-full overflow-auto rounded-2xl border border-[#e2e8f0] bg-white p-2 shadow-card-hover"
        >
          {results.length > 0 ? (
            results.map((hit) => (
              <li key={`${hit.selection.brandSlug}-${hit.selection.categorySlug}-${hit.selection.modelSlug}`}>
                <button
                  type="button"
                  role="option"
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-[#f6f6f4]"
                  onClick={() => choose(hit)}
                >
                  {hit.image ? (
                    <img
                      src={withBase(hit.image)}
                      alt=""
                      className="h-10 w-10 shrink-0 object-contain"
                    />
                  ) : (
                    <span className="h-10 w-10 shrink-0 rounded-lg bg-[#f4f4f2]" aria-hidden="true" />
                  )}
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-[#010101]">{hit.name}</span>
                    <span className="block truncate text-xs text-[#64748b]">
                      {hit.kind === 'telefon' ? `${hit.brandName} · ${hit.categoryName}` : hit.categoryName}
                    </span>
                  </span>
                </button>
              </li>
            ))
          ) : (
            <li className="px-3 py-3 text-sm text-[#64748b]">Brak modelu pasującego do „{query.trim()}”.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ModelSearchBox;
