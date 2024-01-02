import iphoneModels from './iphone.ts';

const data = [
  {
    brand: 'iPhone',
    slug: '/iphones',
    imgSrc: '/images/iphone-photo.png',
    phones: iphoneModels,
  },
  {
    brand: 'Samsung',
    slug: '/samsungTypes',
    imgSrc: '/images/samsung-photo.png',
    // phones: [],
    categories: [],
  },
  {
    brand: 'Xiaomi',
    slug: '/xiaomiTypes',
    imgSrc: '/images/xiaomi-photo.png',
    phones: [],
  },
];

export type DataType = typeof data;

export default data;
