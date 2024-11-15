import samsungCategories from './samsung/categories.ts';
import categories from './xiaomi/categories.ts';
import ipadCategories from './iPad/categories.ts';
import appleCategories from './iphone/categories.ts';
import googleCategories from './google/categories';

const data = [
  {
    name: 'Apple',
    slug: 'apple/',
    imgSrc: '/images/iphone-photo.png',
    categories: appleCategories,
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
  {
    name: 'Google',
    slug: 'google/',
    imgSrc: '/images/googlePixel.png',
    categories: googleCategories,
    categoryTitle: 'Wybierz serię Google',
  },
  {
    name: 'iPad',
    slug: 'apple-ipad/',
    imgSrc: '/images/ipad-photo.png',
    categories: ipadCategories,
    categoryTitle: 'Wybierz serię iPada',
    ignore: 'list',
  },
] as const;

export type DataType = typeof data;

export default data;
