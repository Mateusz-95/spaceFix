import React, { useEffect, useState } from 'react';
import StepChooseRepair from './StepChooseRepair';
import StepChooseDevice from './StepChooseDevice';
import StepChooseSeries from './StepChooseSeries';
import StepChooseModel from './StepChooseModel';
import StepSummary from './StepSummary';
import StepFillForm from './StepFillForm';
import StepForm from './StepForm';
import { emptyShippingFormData, type ShippingFormData } from './shipping-form-data';
import {
  brands,
  getSelectableCategories,
  ipadLineBrand,
  modelSupportsRepair,
  repairTypes,
  findModelSelection,
  type RepairType,
} from './configurator-data';
import {
  DEVICE_QUERY_PARAM,
  ENTRY_QUERY_PARAM,
  MODEL_ENTRY,
  MODEL_QUERY_PARAM,
  getFindModelHref,
  getModelRepairHref,
  getModelSelectionSlugs,
  openOfferPage,
  parseModelParam,
  resolveInitialRepairId,
  syncBrowserUrl,
  type DeviceKind,
  type ModelSelectionSlugs,
} from './konfigurator-url';
import type { ModelHit } from './configurator-data';
import { withBase } from '../../utils/withBase';
import type { Brand, Category, Phone, Step } from './types';

const stepBackgrounds: Record<Step, string | null> = {
  1: withBase('/images/assets/naprawy-screen-1.webp'),
  2: withBase('/images/assets/naprawy-screen-2.webp'),
  3: withBase('/images/assets/naprawy-screen-3.webp'),
  4: null,
  5: withBase('/images/assets/naprawy-screen-5-6.webp'),
  6: withBase('/images/assets/naprawy-screen-5-6.webp'),
  7: withBase('/images/assets/naprawy-screen-5-6.webp'),
};

function resolveInitialFromRepairId(repairId?: string | null): { step: Step; repair?: RepairType } {
  if (!repairId) return { step: 1 };
  const preselected = repairTypes.find((r) => r.id === repairId);
  if (preselected) return { step: 2, repair: preselected };
  return { step: 1 };
}

function isDeviceKind(value: string | null): value is DeviceKind {
  return value === 'telefon' || value === 'tablet' || value === 'zegarek';
}

function resolveInitialState(
  initialRepairIdProp?: string | null,
  initialModelSlugs?: ModelSelectionSlugs | null,
): {
  step: Step;
  repair?: RepairType;
  brand?: Brand;
  category?: Category;
  model?: Phone;
  modelFirst?: boolean;
  deviceKind?: DeviceKind | null;
} {
  const repairId = resolveInitialRepairId(initialRepairIdProp);

  if (initialModelSlugs) {
    const selection = findModelSelection(
      initialModelSlugs.brandSlug,
      initialModelSlugs.categorySlug,
      initialModelSlugs.modelSlug,
    );
    if (selection) {
      const repair =
        (repairId ? repairTypes.find((r) => r.id === repairId) : undefined) ?? repairTypes[0];
      return {
        step: 5,
        repair,
        brand: selection.brand,
        category: selection.category,
        model: selection.model,
      };
    }
  }

  const search = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search);
  const fromUrl = parseModelParam(search?.get(MODEL_QUERY_PARAM));
  if (fromUrl) {
    const selection = findModelSelection(fromUrl.brandSlug, fromUrl.categorySlug, fromUrl.modelSlug);
    if (selection) {
      const repair = repairId ? repairTypes.find((item) => item.id === repairId) : undefined;
      return {
        step: repair ? 5 : 1,
        repair,
        brand: selection.brand,
        category: selection.category,
        model: selection.model,
        modelFirst: !repair,
      };
    }
  }

  if (search?.get(ENTRY_QUERY_PARAM) === MODEL_ENTRY) {
    const kindParam = search.get(DEVICE_QUERY_PARAM);
    const deviceKind = isDeviceKind(kindParam) ? kindParam : null;
    const presetRepair = repairId ? repairTypes.find((item) => item.id === repairId) : undefined;
    if (deviceKind === 'tablet' && ipadLineBrand) {
      return { step: 3, modelFirst: true, deviceKind, brand: ipadLineBrand, repair: presetRepair };
    }
    if (deviceKind === 'zegarek') {
      const apple = brands.find((item: any) => String(item.slug).replace(/^\/+|\/+$/g, '') === 'apple');
      const watch = getSelectableCategories(apple, presetRepair, 'zegarek')[0];
      if (apple && watch) {
        return { step: 4, modelFirst: true, deviceKind, brand: apple, category: watch, repair: presetRepair };
      }
    }
    return {
      step: 2,
      modelFirst: true,
      deviceKind: deviceKind === 'telefon' ? 'telefon' : null,
      repair: presetRepair,
    };
  }

  const fromRepair = resolveInitialFromRepairId(repairId);
  return { ...fromRepair, brand: undefined, category: undefined, model: undefined };
}

interface ConfiguratorProps {
  /** Z ?naprawa=... (Astro) — od razu krok 2, bez migania ekranu 1. */
  initialRepairId?: string | null;
  /** Z /offer/<marka>/<seria>/<model>/ — od razu krok 5 z wybranym modelem. */
  initialModelSlugs?: ModelSelectionSlugs | null;
}

const Configurator: React.FC<ConfiguratorProps> = ({
  initialRepairId: initialRepairIdProp,
  initialModelSlugs,
}) => {
  const [initial] = useState(() => resolveInitialState(initialRepairIdProp, initialModelSlugs));
  const [step, setStep] = useState<Step>(initial.step);
  const [repair, setRepair] = useState<RepairType | undefined>(initial.repair);
  const [brand, setBrand] = useState<Brand | undefined>(initial.brand);
  const [category, setCategory] = useState<Category | undefined>(initial.category);
  const [model, setModel] = useState<Phone | undefined>(initial.model);
  const [modelFirst] = useState(Boolean(initial.modelFirst));
  const [deviceKind, setDeviceKind] = useState<DeviceKind | null>(initial.deviceKind ?? null);
  const [shippingFormData, setShippingFormData] = useState<ShippingFormData>(
    emptyShippingFormData,
  );
  /** Apple → iPad otwiera serie iPad / Air / Pro / mini zamiast jednej listy modeli. */
  const [ipadSeriesOpen, setIpadSeriesOpen] = useState(
    () => (initial.brand?.slug ?? '').replace(/^\/+|\/+$/g, '') === 'apple-ipad',
  );

  const trimSlug = (value?: string) => (value ?? '').replace(/^\/+|\/+$/g, '');
  const appleBrand = brands.find((item: any) => trimSlug(item.slug) === 'apple');

  useEffect(() => {
    document.getElementById('konfigurator')?.setAttribute('data-ready', 'true');
  }, []);

  useEffect(() => {
    const onSelectRepair = (event: Event) => {
      const repairId = (event as CustomEvent<{ repairId?: string }>).detail?.repairId;
      const selected = repairTypes.find((item) => item.id === repairId);
      if (!selected) return;
      setRepair(selected);
      setStep(model ? 5 : 2);
    };
    window.addEventListener('configurator:select-repair', onSelectRepair);
    return () => window.removeEventListener('configurator:select-repair', onSelectRepair);
  }, [model]);

  // Na stronie modelu zjeżdżamy do okna naprawy (cennik zostaje wyżej).
  // W konfiguratorze przewijamy na górę kroku.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (initialModelSlugs) {
      document.getElementById('konfigurator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, initialModelSlugs]);

  // Informujemy stronę (.astro) o aktualnym kroku i wybranej naprawie, aby pod
  // ekranem podsumowania z ceną (krok 5) pokazać sekcje z odpowiedniej strony usługi.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(
      new CustomEvent('configurator:state', {
        detail: { step, repairId: repair?.id ?? null },
      }),
    );
  }, [step, repair]);

  // Po wyborze modelu otwieramy stronę /offer/..., żeby wczytać cennik.
  // Na tej stronie tylko dopisujemy ?naprawa= bez przeładowania.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (step >= 5 && model && brand && category && repair) {
      openOfferPage(getModelSelectionSlugs(brand, category, model), repair.id);
      return;
    }
    if (!initialModelSlugs) {
      if (model && brand && category && !repair) {
        window.history.replaceState(
          window.history.state,
          '',
          getModelRepairHref(getModelSelectionSlugs(brand, category, model)),
        );
        return;
      }
      if (modelFirst && repair && step < 5) {
        window.history.replaceState(
          window.history.state,
          '',
          getFindModelHref(deviceKind ?? undefined, repair.id),
        );
        return;
      }
      if (modelFirst && !repair) {
        window.history.replaceState(window.history.state, '', getFindModelHref(deviceKind ?? undefined));
        return;
      }
      syncBrowserUrl(null, repair?.id ?? null);
    }
  }, [step, model, brand, category, repair, initialModelSlugs, modelFirst, deviceKind]);

  const handleSelectRepair = (selected: RepairType) => {
    setRepair(selected);
    // Po zmianie naprawy (gdy model już wybrany) wracamy od razu do podsumowania.
    setStep(model ? 5 : 2);
  };

  const handleSelectBrand = (selected: Brand) => {
    setBrand(selected);
    setIpadSeriesOpen(false);
    setCategory(undefined);
    setModel(undefined);
    const categories = getSelectableCategories(selected, repair, deviceKind === 'telefon' ? 'telefon' : null);
    if (categories.length === 1) {
      setCategory(categories[0]);
      setStep(4);
    } else {
      setStep(3);
    }
  };

  const handleSelectCategory = (selected: Category) => {
    const openingIpadLine =
      !ipadSeriesOpen &&
      trimSlug(brand?.slug) === 'apple' &&
      trimSlug(selected?.slug) === 'ipad';

    if (openingIpadLine && ipadLineBrand) {
      setIpadSeriesOpen(true);
      setCategory(undefined);
      setModel(undefined);
      setStep(3);
      return;
    }

    if (ipadSeriesOpen && ipadLineBrand) {
      setBrand(ipadLineBrand);
    }
    setCategory(selected);
    setModel(undefined);
    setStep(4);
  };

  const handleSelectModel = (selected: Phone) => {
    setModel(selected);
    setStep(repair ? 5 : 1);
  };

  const chooseKind = (kind: DeviceKind) => {
    setDeviceKind(kind);
    setModel(undefined);
    setCategory(undefined);
    if (kind === 'tablet' && ipadLineBrand) {
      setBrand(ipadLineBrand);
      setIpadSeriesOpen(true);
      setStep(3);
      return;
    }
    if (kind === 'zegarek') {
      const watch = getSelectableCategories(appleBrand, repair, 'zegarek')[0];
      if (appleBrand && watch) {
        setBrand(appleBrand);
        setIpadSeriesOpen(false);
        setCategory(watch);
        setStep(4);
        return;
      }
    }
    setBrand(undefined);
    setIpadSeriesOpen(false);
    setStep(2);
  };

  const chooseFoundModel = (hit: ModelHit) => {
    const keepRepair = Boolean(repair && modelSupportsRepair(hit.model, repair));
    setBrand(hit.brand);
    setCategory(hit.category);
    setModel(hit.model);
    setRepair(keepRepair ? repair : undefined);
    setIpadSeriesOpen(trimSlug(hit.brand?.slug) === 'apple-ipad');
    setStep(keepRepair ? 5 : 1);
  };

  const clearPickedModel = () => {
    setModel(undefined);
    setBrand(undefined);
    setCategory(undefined);
    setIpadSeriesOpen(false);
  };

  const backFromSeries = () => {
    if (ipadSeriesOpen) {
      if (modelFirst && deviceKind === 'tablet') {
        setIpadSeriesOpen(false);
        setBrand(undefined);
        setDeviceKind(null);
        setStep(2);
        return;
      }
      setIpadSeriesOpen(false);
      setBrand(appleBrand);
      setCategory(undefined);
      setStep(3);
      return;
    }
    setStep(2);
  };

  const backFromModel = () => {
    if (modelFirst && deviceKind === 'zegarek') {
      setDeviceKind(null);
      setBrand(undefined);
      setCategory(undefined);
      setStep(2);
      return;
    }
    if (ipadSeriesOpen) {
      setStep(3);
      return;
    }
    const categories = brand
      ? getSelectableCategories(brand, repair, deviceKind === 'telefon' ? 'telefon' : null)
      : [];
    setStep(categories.length <= 1 ? 2 : 3);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepChooseRepair
            model={model}
            onSelect={handleSelectRepair}
            onPickModel={model ? undefined : chooseFoundModel}
            onBack={
              modelFirst && model ? () => setStep(4) : model ? clearPickedModel : undefined
            }
          />
        );
      case 2:
        return (
          <StepChooseDevice
            repair={repair}
            modelFirst={modelFirst}
            deviceKind={deviceKind}
            onSelect={handleSelectBrand}
            onKind={chooseKind}
            onPickModel={chooseFoundModel}
            onBack={
              modelFirst ? (deviceKind ? () => setDeviceKind(null) : undefined) : () => setStep(1)
            }
          />
        );
      case 3:
        return (
          <StepChooseSeries
            brand={ipadSeriesOpen ? ipadLineBrand : brand}
            repair={repair}
            title={ipadSeriesOpen ? 'Wybierz serię iPada' : 'Wybierz serię'}
            onSelect={handleSelectCategory}
            onBack={backFromSeries}
          />
        );
      case 4:
        return (
          <StepChooseModel
            brand={brand}
            category={category}
            repair={repair}
            onSelect={handleSelectModel}
            onBack={backFromModel}
          />
        );
      case 5:
        return (
          <StepSummary
            model={model as Phone}
            repair={repair as RepairType}
            onChangeRepair={() => setStep(1)}
            onDownloadForm={() => setStep(6)}
            onBack={() => setStep(4)}
          />
        );
      case 6:
        return (
          <StepFillForm
            model={model as Phone}
            repair={repair as RepairType}
            initialData={shippingFormData}
            onSubmit={(data) => {
              setShippingFormData(data);
              setStep(7);
            }}
            onBack={() => setStep(5)}
          />
        );
      case 7:
        return (
          <StepForm
            model={model as Phone}
            repair={repair as RepairType}
            formData={shippingFormData}
            onBack={() => setStep(6)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="konfigurator"
      className="relative min-h-[calc(100vh-var(--header-height))] scroll-mt-[var(--header-height)] overflow-hidden bg-[#fbfcfe]"
    >
      {stepBackgrounds[step] && (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-cover bg-center transition-[background-image] duration-300"
            style={{ backgroundImage: `url('${stepBackgrounds[step]}')` }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-[#fbfcfe]/80 via-[#fbfcfe]/85 to-[#fbfcfe]"
            aria-hidden="true"
          />
        </>
      )}

      <div className="section-container relative z-10 py-12 md:py-16 lg:py-20">{renderStep()}</div>
    </section>
  );
};

export default Configurator;
