import {
  galaxyS,
  galaxyA,
  galaxyM,
  galaxyJ,
  galaxyNote,
  galaxyTab,
  galaxyWatch,
  galaxyZ,
  galaxyXcover,
} from './models.ts';

const samsungCategories = [
  { name: 'Samsung Galaxy S', slug: 'galaxy-s/', imgSrc: '/images/galaxys-photo.png', phones: galaxyS },
  { name: 'Samsung Galaxy A', slug: 'galaxy-a/', imgSrc: '/images/galaxya-photo.png', phones: galaxyA },
  { name: 'Samsung Galaxy Z', slug: 'galaxy-z/', imgSrc: '/images/galaxyz-photo.png', phones: galaxyZ },
  { name: 'Samsung Galaxy Tab', slug: 'galaxy-tab/', imgSrc: '/images/galaxytab-photo.png', phones: galaxyTab },
  { name: 'Samsung Galaxy Watch', slug: 'galaxy-watch/', imgSrc: '/images/galaxywatch-photo.png', phones: galaxyWatch },
  { name: 'Samsung Galaxy M', slug: 'galaxy-m/', imgSrc: '/images/galaxym-photo.png', phones: galaxyM },
  { name: 'Samsung Galaxy Note', slug: 'galaxy-note/', imgSrc: '/images/galaxynote-photo.png', phones: galaxyNote },
  {
    name: 'Samsung Galaxy XCover',
    slug: 'galaxy-xcover/',
    imgSrc: '/images/galaxyxcover-photo.png',
    phones: galaxyXcover,
  },
  { name: 'Samsung Galaxy J', slug: 'galaxy-j/', imgSrc: '/images/galaxyj-photo.png', phones: galaxyJ },
];

export default samsungCategories;
