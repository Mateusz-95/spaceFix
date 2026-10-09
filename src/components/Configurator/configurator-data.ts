import data from '../../data/data';
import { phoneImages } from '../../data/phone-images';
import { withBase } from '../../utils/withBase';

export type PopularRepairIcon =
  | 'smartphone'
  | 'monitor'
  | 'battery'
  | 'water'
  | 'backGlass'
  | 'chargingPort'
  | 'motherboard'
  | 'camera';

export type RepairKey =
  | 'front-glass'
  | 'display'
  | 'back-glass'
  | 'battery'
  | 'charging-port'
  | 'motherboard'
  | 'camera'
  | 'camera-glass';

export interface RepairType {
  id: string;
  /** Slug samodzielnej podstrony usługi (URL SEO), np. 'wymiana-wyswietlacza'. */
  slug: string;
  title: string;
  description: string;
  /** Nagłówek H1 na samodzielnej podstronie usługi. */
  h1: string;
  /** Krótki akapit pod H1 na podstronie usługi. */
  lead: string;
  /** Tytuł <title> podstrony usługi. */
  metaTitle: string;
  /** Meta description podstrony usługi. */
  metaDescription: string;
  icon: PopularRepairIcon;
  /** Klucz dopasowujący ten typ do konkretnej naprawy modelu. null => brak ceny per-model. */
  repairKey: RepairKey | null;
  /** false => podstrona i menu Usługi, bez pozycji w konfiguratorze. */
  inPriceList?: boolean;
}

export const repairTypes: RepairType[] = [
  {
    id: 'wymiana-szybki',
    slug: 'wymiana-szybki',
    title: 'Wymiana szybki',
    description: 'Profesjonalna wymiana uszkodzonej szybki',
    h1: 'Wymiana szybki w telefonie – Warszawa',
    lead: 'Szybka i ekonomiczna wymiana rozbitej szybki z zachowaniem oryginalnego wyświetlacza. Naprawa od ręki w Warszawie (Ursus).',
    metaTitle: 'Wymiana szybki w telefonie Warszawa – serwis SpaceFix',
    metaDescription:
      'Ekspresowa wymiana rozbitej szybki w telefonie w Warszawie (Ursus). iPhone, Samsung, Xiaomi i inne. Oryginalny wyświetlacz, gwarancja 6 miesięcy. Wyceń online.',
    icon: 'smartphone',
    repairKey: 'front-glass',
  },
  {
    id: 'wyswietlacz',
    slug: 'wymiana-wyswietlacza',
    title: 'Wyświetlacz',
    description: 'Naprawa i wymiana wyświetlacza',
    h1: 'Wymiana wyświetlacza w telefonie – Warszawa',
    lead: 'Profesjonalna wymiana uszkodzonego wyświetlacza w iPhone, Samsung, Xiaomi i innych. Pełna jakość obrazu i dotyku, gwarancja 6 miesięcy.',
    metaTitle: 'Wymiana wyświetlacza w telefonie Warszawa – serwis SpaceFix',
    metaDescription:
      'Profesjonalna wymiana wyświetlacza w telefonie w Warszawie. iPhone, Samsung, Xiaomi i inne marki. Wysokiej jakości ekrany, gwarancja 6 miesięcy. Wyceń naprawę online.',
    icon: 'monitor',
    repairKey: 'display',
  },
  {
    id: 'bateria',
    slug: 'wymiana-baterii',
    title: 'Bateria',
    description: 'Wymiana baterii - dłuższa żywotność',
    h1: 'Wymiana baterii w telefonie – Warszawa',
    lead: 'Wymiana zużytej baterii przywraca pełną wydajność i dłuższy czas pracy telefonu. Sprawdzone ogniwa, gwarancja 6 miesięcy.',
    metaTitle: 'Wymiana baterii w telefonie Warszawa – serwis SpaceFix',
    metaDescription:
      'Wymiana baterii w telefonie w Warszawie (Ursus). Dłuższy czas pracy, sprawdzone ogniwa, gwarancja 6 miesięcy. iPhone, Samsung, Xiaomi. Wyceń naprawę online.',
    icon: 'battery',
    repairKey: 'battery',
  },
  {
    id: 'naprawa-zalania',
    slug: 'naprawa-zalania',
    title: 'Naprawa zalania',
    description: 'Profesjonalne czyszczenie i naprawa',
    h1: 'Naprawa telefonu po zalaniu – Warszawa',
    lead: 'Diagnostyka, czyszczenie i naprawa telefonu po kontakcie z cieczą. W razie potrzeby odzyskiwanie danych z zalanego urządzenia.',
    metaTitle: 'Naprawa telefonu po zalaniu Warszawa – serwis SpaceFix',
    metaDescription:
      'Naprawa telefonu po zalaniu w Warszawie. Diagnostyka, czyszczenie, naprawa płyty głównej i odzyskiwanie danych. iPhone, Samsung, Xiaomi. Skontaktuj się z serwisem.',
    icon: 'water',
    repairKey: null,
  },
  {
    id: 'wymiana-tylnej-szyby',
    slug: 'wymiana-tylnej-szyby',
    title: 'Wymiana tylnej szyby',
    description: 'Wymiana panelu tylnego w całości',
    h1: 'Wymiana tylnej szyby w telefonie – Warszawa',
    lead: 'Wymiana rozbitego tylnego panelu przywraca estetykę i szczelność obudowy telefonu. iPhone, Samsung, Xiaomi. Gwarancja 6 miesięcy.',
    metaTitle: 'Wymiana tylnej szyby w telefonie Warszawa – serwis SpaceFix',
    metaDescription:
      'Wymiana rozbitej tylnej szyby w telefonie w Warszawie. Przywracamy estetykę i szczelność obudowy. iPhone, Samsung, Xiaomi. Gwarancja 6 miesięcy. Wyceń online.',
    icon: 'backGlass',
    repairKey: 'back-glass',
  },
  {
    id: 'naprawa-zlacza-ladowania',
    slug: 'naprawa-zlacza-ladowania',
    title: 'Naprawa złącza ładowania',
    description: 'Naprawa lub wymiana złącza ładowania',
    h1: 'Naprawa złącza ładowania w telefonie – Warszawa',
    lead: 'Naprawa i wymiana gniazda USB-C / Lightning. Telefon znów ładuje się szybko i stabilnie oraz poprawnie łączy z komputerem.',
    metaTitle: 'Naprawa złącza ładowania w telefonie Warszawa – SpaceFix',
    metaDescription:
      'Naprawa i wymiana złącza ładowania (USB-C / Lightning) w telefonie w Warszawie. Telefon znów ładuje się szybko i stabilnie. Gwarancja 6 miesięcy. Wyceń online.',
    icon: 'chargingPort',
    repairKey: 'charging-port',
  },
  {
    id: 'naprawa-plyty-glownej',
    slug: 'naprawa-plyty-glownej',
    title: 'Naprawa płyty głównej',
    description: 'Profesjonalna naprawa płyty głównej',
    h1: 'Naprawa płyty głównej telefonu – Warszawa',
    lead: 'Zaawansowana naprawa na poziomie mikroelektroniki: reballing BGA, układ zasilania, naprawa po zalaniu i zwarciu. Wycena po diagnostyce.',
    metaTitle: 'Naprawa płyty głównej telefonu Warszawa – serwis SpaceFix',
    metaDescription:
      'Zaawansowana naprawa płyty głównej telefonu w Warszawie – mikroelektronika, reballing BGA, naprawa układu zasilania. iPhone, Samsung, Xiaomi. Bezpłatna wstępna wycena.',
    icon: 'motherboard',
    repairKey: 'motherboard',
  },
  {
    id: 'wymiana-aparatu',
    slug: 'wymiana-aparatu',
    title: 'Wymiana aparatu',
    description: 'Profesjonalna wymiana aparatu',
    h1: 'Wymiana aparatu w telefonie – Warszawa',
    lead: 'Profesjonalna wymiana uszkodzonego aparatu w iPhone, Samsung, Xiaomi i innych. Pełna jakość zdjęć i nagrywania, gwarancja 6 miesięcy.',
    metaTitle: 'Wymiana aparatu w telefonie Warszawa – serwis SpaceFix',
    metaDescription:
      'Profesjonalna wymiana aparatu w telefonie w Warszawie. iPhone, Samsung, Xiaomi i inne marki. Pełna jakość zdjęć, gwarancja 6 miesięcy. Wyceń naprawę online.',
    icon: 'camera',
    repairKey: 'camera',
  },
  {
    id: 'wymiana-szybki-aparatu',
    slug: 'wymiana-szybki-aparatu',
    title: 'Wymiana szybki aparatu',
    description: 'Wymiana pękniętej szybki aparatu',
    h1: 'Wymiana szybki aparatu w telefonie – Warszawa',
    lead: 'Wymiana pękniętej szybki aparatu przywraca pełną jakość zdjęć i wygląd telefonu. iPhone, Samsung, Xiaomi. Gwarancja 6 miesięcy.',
    metaTitle: 'Wymiana szybki aparatu w telefonie Warszawa – serwis SpaceFix',
    metaDescription:
      'Wymiana pękniętej szybki aparatu w telefonie w Warszawie. Przywracamy estetykę i pełną jakość zdjęć. iPhone, Samsung, Xiaomi. Gwarancja 6 miesięcy. Wyceń online.',
    icon: 'camera',
    repairKey: 'camera-glass',
  },
  {
    id: 'naprawa-urzadzenia-po-zalaniu',
    slug: 'naprawa-urzadzenia-po-zalaniu',
    title: 'Naprawa urządzenia po zalaniu',
    description: 'Diagnostyka i naprawa po kontakcie z cieczą',
    h1: 'Naprawa urządzenia po zalaniu – Warszawa',
    lead: 'Diagnostyka i naprawa smartfona, tabletu lub zegarka po kontakcie z wodą. Wycena po telefonie, bez sztywnego cennika.',
    metaTitle: 'Naprawa urządzenia po zalaniu Warszawa – serwis SpaceFix',
    metaDescription:
      'Naprawa urządzenia po zalaniu w Warszawie. Smartfon, tablet i zegarek po kontakcie z cieczą. Diagnostyka, czyszczenie i odzyskiwanie danych. Zadzwoń po wycenę.',
    icon: 'water',
    repairKey: null,
    inPriceList: false,
  },
];

/** Usługi widoczne w konfiguratorze (cennik). Pomija pozycje tylko z menu Usługi. */
export const priceListRepairTypes = repairTypes.filter((repair) => repair.inPriceList !== false);

/** URL samodzielnej podstrony usługi (SEO), np. '/wymiana-wyswietlacza/'. */
export const getServiceHref = (slug: string): string => withBase(`/${slug}/`);

/** Zwraca typ naprawy po slugu podstrony usługi. */
export const getRepairBySlug = (slug: string): RepairType | undefined =>
  repairTypes.find((repair) => repair.slug === slug);

/** Marki dostępne w konfiguratorze (pomijamy te oznaczone jako ignore: 'list', np. iPad, Xiaomi). */
export const brands = data.filter((brand: any) => brand.ignore !== 'list');

/** Marka iPada z seriami iPad, Air, Pro i mini. W konfiguratorze wchodzi się do niej z Apple → iPad. */
export const ipadLineBrand = data.find((brand: any) => brand.slug === 'apple-ipad/');

/** Czy model ma w cenniku wybraną naprawę. Usługa bez repairKey pasuje do każdego modelu. */
export const modelSupportsRepair = (
  model: { repairs?: { key?: string }[] } | null | undefined,
  repair?: RepairType | null,
): boolean => {
  if (!repair?.repairKey) return true;
  if (!model) return true;
  return (model.repairs ?? []).some((item) => item.key === repair.repairKey);
};

const categorySupportsRepair = (category: any, repair?: RepairType | null): boolean => {
  if (!repair?.repairKey) return true;
  const ownPhones = category?.phones ?? [];
  if (ownPhones.some((phone: any) => modelSupportsRepair(phone, repair))) return true;
  return (category?.subcategories ?? []).some((child: any) => categorySupportsRepair(child, repair));
};

/** Stałe dotyczące wysyłki telefonu do serwisu (ekran 5 i 6). */
export const shipping = {
  paymentMethod: 'Przelew bankowy',
  repairTime: '3-4 dni robocze',
  warranty: '6 miesięcy',
  returnShippingCost: 15,
};

/** Gwarancja na naprawę stacjonarną (ekran 5). */
export const serviceWarranty = '6 miesięcy';

/** Adres paczkomatu do wysyłki telefonu (ekran 6). */
export const paczkomat = 'Paczkomat WAW312M Tadeusza Kościuszki 44, Warszawa';

/** Plik formularza do pobrania (placeholder - docelowy PDF podstawimy później). */
export const FORM_URL = '/forms/formularz-wysylki.pdf';

/** Serie (kategorie) marki dostępne w konfiguratorze - z modelami i nie kierujące na osobne strony. */
export const getSelectableCategories = (brand: any, repair?: RepairType | null): any[] =>
  (brand?.categories ?? []).filter(
    (category: any) =>
      category?.ignore !== 'pages' &&
      (category?.phones?.length ?? 0) > 0 &&
      categorySupportsRepair(category, repair),
  );

/** Marki, które mają choć jedną serię pasującą do wybranej naprawy. */
export const getSelectableBrands = (repair?: RepairType | null): any[] =>
  brands.filter((brand: any) => getSelectableCategories(brand, repair).length > 0);

/** Modele danej serii (z dołączonym zdjęciem frontu, jeśli dostępne). */
export const getModels = (category: any): any[] =>
  (category?.phones ?? []).map((phone: any) => ({
    ...phone,
    image: phone.image ?? phoneImages[phone.slug],
  }));

const trimSlashes = (value: string): string => value.replace(/^\/+|\/+$/g, '');

/** Znajduje markę, serię i model po slugach z URL oferty. */
export const findModelSelection = (
  brandSlug: string,
  categorySlug: string,
  modelSlug: string,
): { brand: any; category: any; model: any } | null => {
  const brand = data.find((item) => trimSlashes(item.slug) === trimSlashes(brandSlug));
  if (!brand?.categories) return null;

  const category = brand.categories.find((item) => trimSlashes(item.slug) === trimSlashes(categorySlug));
  if (!category) return null;

  const model = getModels(category).find((phone) => trimSlashes(phone.slug) === trimSlashes(modelSlug));
  if (!model) return null;

  return { brand, category, model };
};

/** Wyciąga liczbę złotych z ceny zapisanej jako string, np. "549 zł" => 549. */
export const parsePrice = (price?: string): number | null => {
  if (!price) return null;
  const match = price.replace(/\s/g, '').match(/(\d+)/);
  return match ? Number(match[1]) : null;
};

/** Formatuje liczbę złotych jako "549,00 zł". */
export const formatPln = (value: number): string => `${value.toLocaleString('pl-PL')},00 zł`;
