import React from 'react';
import ModelsSection from './ModelsSection/ModelsSection.tsx';

const Iphones = () => {
  const iPhoneModels = [
    'iPhone 15 Pro Max',
    'iPhone 15 Pro',
    'iPhone 15 Plus',
    'iPhone 15',
    'iPhone 14 Pro Max',
    'iPhone 14 Pro',
    'iPhone 14 Plus',
    'iPhone 14',
    'iPhone SE (3.generacji)',
    'iPhone 12 Pro Max',
    'iPhone 12 Pro',
    'iPhone 12 Mini',
    'iPhone 12',
    'iPhone SE (2.generacji)',
    'iPhone 11 Pro Max',
    'iPhone 11 Pro',
    'iPhone 11',
    'iPhone XS Max',
    'iPhone XS',
    'iPhone XR',
    'iPhone X',
    'iPhone 8 Plus',
    'iPhone 8',
    'iPhone 7 Plus',
    'iPhone 7',
    'iPhone 6s Plus',
    'iPhone 6s',
    'iPhone 6 Plus',
    'iPhone 6',
    'iPhone SE (1.generacji)',
  ];

  return (
   <ModelsSection headerContent="Wybierz model iPhone'a" models={iPhoneModels}/>
  );
};

export default Iphones;
