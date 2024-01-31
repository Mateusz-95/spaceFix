import iphoneModels from './iphone/models.ts';
import samsungCategories from './samsung/categories.ts';
import categories from './xiaomi/categories.ts';
import ipadCategories from './iPad/categories.ts';
import { appleWatchModels } from './appleWatch/models.ts';

const data = [
  {
    name: 'iPhone',
    slug: 'iphones/',
    imgSrc: '/images/iphone-photo.png',
    phones: iphoneModels,
  },
  {
    name: 'iPad',
    slug: 'ipad/',
    imgSrc: '/images/ipad-photo.png',
    categories: ipadCategories,
    categoryTitle: 'Wybierz serię iPada',
  },
  {
    name: 'Apple Watch',
    slug: 'apple-watch/',
    imgSrc: '/images/applewatch-photo.png',
    phones: appleWatchModels,
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
    categories: categories,
    categoryTitle: 'Wybierz serię Xiaomi',
  },
] as const;

export type DataType = typeof data;

export default data;
