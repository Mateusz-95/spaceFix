import iphoneModels from './models.ts';
import { appleWatchModels } from '../appleWatch/models.ts';
import { ipadStandard, ipadMini, ipadAir, ipadPro } from '../iPad/models.ts';

const ipadModels = [...ipadStandard, ...ipadMini, ...ipadAir, ...ipadPro];

const appleCategories = [
  { name: 'iPhone', slug: 'iphone/', imgSrc: '/images/iphone-photo.png', phones: iphoneModels },
  { name: 'iPad', slug: 'ipad/', imgSrc: '/images/ipad-photo.png', phones: ipadModels },
  { name: 'Apple Watch', slug: 'apple-watch/', imgSrc: '/images/applewatch-photo.png', phones: appleWatchModels },
];

export default appleCategories;
