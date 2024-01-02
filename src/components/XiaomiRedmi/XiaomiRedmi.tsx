import React from 'react';
import ModelsSection from '../ModelsSection/ModelsSection.tsx';

const XiaomiRedmi = () => {
  const xiaomiRedmiSeries = [
    'Redmi Note 12 Pro+',
    'Redmi Note 12 Pro',
    'Redmi Note 12S',
    'Redmi Note 12',
    'Redmi Note 11 Pro+ 5G',
    'Redmi Note 11 Pro 5G',
    'Redmi Note 11 Pro',
    'Redmi Note 11S',
    'Redmi Note 11',
    'Redmi Note 10 5G',
    'Redmi Note 10 Pro',
    'Redmi Note 10S',
    'Redmi Note 9T 5G',
    'Redmi Note 9 Pro',
    'Redmi 13C',
    'Redmi 12',
    'Redmi 12C',
    'Redmi 10C',
    'Redmi 10 5G',
    'Redmi 10',
    'Redmi 9C',
    'Redmi 9A',
    'Redmi A1',
    'Redmi A2',
  ];

  return <ModelsSection headerContent="Wybierz model Xiaomi Redmi" models={xiaomiRedmiSeries} />;
};

export default XiaomiRedmi;
