import { withBase } from '../../utils/withBase';

export const KONFIGURATOR_PATH = withBase('/konfigurator/');

/** Query param: ?naprawa=<repairType.id> → konfigurator od razu na kroku 2. */
export const REPAIR_QUERY_PARAM = 'naprawa';

/** ?od=model → konfigurator startuje od urządzenia, nie od naprawy. */
export const ENTRY_QUERY_PARAM = 'od';
export const MODEL_ENTRY = 'model';

/** ?typ=telefon|tablet|zegarek zawęża start od modelu. */
export const DEVICE_QUERY_PARAM = 'typ';

/** ?model=marka/seria/model → od razu wybór naprawy dla tego urządzenia. */
export const MODEL_QUERY_PARAM = 'model';

export function getKonfiguratorHref(repairId?: string): string {
  if (!repairId) return KONFIGURATOR_PATH;
  const params = new URLSearchParams({ [REPAIR_QUERY_PARAM]: repairId });
  return `${KONFIGURATOR_PATH}?${params.toString()}`;
}

export type DeviceKind = 'telefon' | 'tablet' | 'zegarek';

export function getFindModelHref(kind?: DeviceKind, repairId?: string): string {
  const params = new URLSearchParams({ [ENTRY_QUERY_PARAM]: MODEL_ENTRY });
  if (kind) params.set(DEVICE_QUERY_PARAM, kind);
  if (repairId) params.set(REPAIR_QUERY_PARAM, repairId);
  return `${KONFIGURATOR_PATH}?${params.toString()}`;
}

const trimSlashes = (value: string): string => value.replace(/^\/+|\/+$/g, '');

/** Slugi identyfikujące model w URL oferty, np. apple / iphone / iPhone-13-pro-max. */
export interface ModelSelectionSlugs {
  brandSlug: string;
  categorySlug: string;
  modelSlug: string;
}

export function encodeModelParam(selection: ModelSelectionSlugs): string {
  return [selection.brandSlug, selection.categorySlug, selection.modelSlug].map(trimSlashes).join('/');
}

export function parseModelParam(value: string | null | undefined): ModelSelectionSlugs | null {
  if (!value) return null;
  const [brandSlug, categorySlug, modelSlug] = value.split('/').filter(Boolean);
  if (!brandSlug || !categorySlug || !modelSlug) return null;
  return { brandSlug, categorySlug, modelSlug };
}

/** Konfigurator otwarty na wyborze naprawy dla konkretnego modelu. */
export function getModelRepairHref(selection: ModelSelectionSlugs): string {
  const params = new URLSearchParams({ [MODEL_QUERY_PARAM]: encodeModelParam(selection) });
  return `${KONFIGURATOR_PATH}?${params.toString()}`;
}

/** URL oferty dla modelu, np. '/offer/apple/iphone/iPhone-13-pro-max/?naprawa=bateria'. */
export function getOfferHref(selection: ModelSelectionSlugs, repairId?: string): string {
  const path = withBase(
    `/offer/${trimSlashes(selection.brandSlug)}/${trimSlashes(selection.categorySlug)}/${trimSlashes(selection.modelSlug)}/`,
  );
  if (!repairId) return path;
  const params = new URLSearchParams({ [REPAIR_QUERY_PARAM]: repairId });
  return `${path}?${params.toString()}`;
}

export function getRepairIdFromSearch(search: URLSearchParams): string | null {
  const id = search.get(REPAIR_QUERY_PARAM)?.trim();
  return id || null;
}

/** Odczyt naprawy z props (SSR/dev) lub z URL (statyczny build + ?naprawa=). */
export function resolveInitialRepairId(propId?: string | null): string | null {
  if (propId) return propId;
  if (typeof window === 'undefined') return null;
  return getRepairIdFromSearch(new URLSearchParams(window.location.search));
}

export function getModelSelectionSlugs(
  brand: { slug: string },
  category: { slug: string },
  model: { slug: string },
): ModelSelectionSlugs {
  return {
    brandSlug: trimSlashes(brand.slug),
    categorySlug: trimSlashes(category.slug),
    modelSlug: trimSlashes(model.slug),
  };
}

/** Aktualizuje pasek adresu bez przeładowania strony. */
export function syncBrowserUrl(selection: ModelSelectionSlugs | null, repairId?: string | null): void {
  if (typeof window === 'undefined') return;
  const href = selection
    ? getOfferHref(selection, repairId ?? undefined)
    : getKonfiguratorHref(repairId ?? undefined);
  window.history.replaceState(window.history.state, '', href);
}

function samePath(left: string, right: string): boolean {
  const normalize = (value: string) => value.replace(/\/+$/, '') || '/';
  return normalize(left) === normalize(right);
}

/**
 * Z konfiguratora przechodzi na prawdziwą stronę modelu (jest na niej cennik).
 * Gdy ta strona jest już otwarta, tylko aktualizuje adres.
 */
export function openOfferPage(selection: ModelSelectionSlugs, repairId?: string | null): void {
  if (typeof window === 'undefined') return;
  const href = getOfferHref(selection, repairId ?? undefined);
  const target = new URL(href, window.location.origin);
  if (!samePath(window.location.pathname, target.pathname)) {
    window.location.assign(`${target.pathname}${target.search}`);
    return;
  }
  syncBrowserUrl(selection, repairId);
}
