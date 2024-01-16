import { poco, xiaomiMi, xiaomiRedmi } from './models.ts';

const xiaomiCategories = [
  { name: 'Poco', slug: 'poco/', imgSrc: '/images/xiaomiPoco.png', phones: poco },
  { name: 'XiaomiMi', slug: 'xiaomiMi/', imgSrc: '/images/xiaomiMi.png', phones: xiaomiMi },
  { name: 'XiaomiRedmi', slug: 'xiaomiRedmi/', imgSrc: '/images/xiaomiRedmi.png', phones: xiaomiRedmi },
];

export default xiaomiCategories;
