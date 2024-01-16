import { ipadStandard, ipadMini, ipadAir, ipadPro } from './models.ts';
import { poco } from '../xiaomi/models.ts';

const ipadCategories = [
  { name: 'iPad 10.2', slug: '10.2/', imgSrc: '/images/ipad10.png', phones: ipadStandard },
  { name: 'iPad Mini', slug: 'mini/', imgSrc: '/images/ipadMini.png', phones: ipadMini },
  { name: 'iPad Air', slug: 'air/', imgSrc: '/images/ipadAir.png', phones: ipadAir },
  { name: 'iPad Pro', slug: 'pro/', imgSrc: '/images/ipadPro.png', phones: ipadPro },
];

export default ipadCategories;
