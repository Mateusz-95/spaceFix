import iphoneModels from './iphoneModels.ts';
import { galaxyS } from './samsung.ts';

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
    categories: [{ name: 'Samsung Galaxy S', slug: 'galaxy-s', imgSrc: '/images/galaxys-photo.png', phones: galaxyS }],
    categoryTitle: 'Wybierz serię Samsunga',
  },
  {
    brand: 'Xiaomi',
    slug: 'xiaomi',
    imgSrc: '/images/xiaomi-photo.png',
    categories: [{ name: 'Xiaomi 13', slug: 'xiaomi-13', imgSrc: '/images/galaxys-photo.png', phones: iphoneModels }],
  },
] as const;

export type DataType = typeof data;

export default data;
