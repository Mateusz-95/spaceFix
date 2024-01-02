import iphoneModels from './iphoneModels.ts';

const data = [
  {
    brand: 'iPhone',
    slug: 'iphones',
    imgSrc: '/images/iphone-photo.png',
    phones: iphoneModels,
  },
  {
    brand: 'Samsung',
    slug: 'samsung',
    imgSrc: '/images/samsung-photo.png',
    // phones: [],
    categories: [
      { name: 'Samsung Galaxy S', slug: 'galaxy-s', imgSrc: '/images/galaxys-photo.png', phones: iphoneModels },
    ],
    categoryTitle: 'Wybierz serię Samsunga',
  },
  {
    brand: 'Xiaomi',
    slug: 'xiaomiTypes',
    imgSrc: '/images/xiaomi-photo.png',
    categories: [],
  },
] as const;

export type DataType = typeof data;

export default data;
