import iphoneModels from './iphone/models.ts';
import samsungCategories from './samsung/categories.ts';

const data = [
  {
    name: 'iPhone',
    slug: 'iphones/',
    imgSrc: '/images/iphone-photo.png',
    phones: iphoneModels,
  },
  {
    name: 'Samsung',
    slug: 'samsung/',
    imgSrc: '/images/samsung-photo.png',
    categories: samsungCategories,
    categoryTitle: 'Wybierz serię Samsunga',
  },
  {
    name: 'Xiaomi',
    slug: 'xiaomi/',
    imgSrc: '/images/xiaomi-photo.png',
    // todo: do the same like samsung brand
    categories: [{ name: 'Xiaomi 13', slug: 'xiaomi-13/', imgSrc: '/images/galaxys-photo.png', phones: iphoneModels }],
  },
  {
    name: 'iPad',
    slug: 'ipad/',
    imgSrc: '/images/ipad-photo.png',
    // todo: do the same like samsung brand
    categories: [{ name: 'Xiaomi 13', slug: 'xiaomi-13/', imgSrc: '/images/galaxys-photo.png', phones: iphoneModels }],
  },
  {
    name: 'Xiaomi',
    slug: 'xiaomi/',
    imgSrc: '/images/xiaomi-photo.png',
    // todo: do the same like samsung brand
    categories: [{ name: 'Xiaomi 13', slug: 'xiaomi-13/', imgSrc: '/images/galaxys-photo.png', phones: iphoneModels }],
  },
] as const;

export type DataType = typeof data;

export default data;
