import React from 'react';
import ModelsSection from '../ModelsSection/ModelsSection.tsx';

const GalaxyS = () => {
  const samsungGalaxySSeries = [
    'S23 Ultra',
    'S23+',
    'S23',
    'S22 Ultra',
    'S22 Plus',
    'S22',
    'S21 Ultra',
    'S21 Plus',
    'S21',
    'S20 Ultra',
    'S20 Plus',
    'S20 FE 5G',
    'S20',
    'S10 Plus',
    'S10',
    'S9 Plus',
    'S9',
    'S8 Plus',
    'S8',
  ];

  return <ModelsSection headerContent="Wybierz model z serii Samsung Galaxy S" models={samsungGalaxySSeries} />;
};

export default GalaxyS;
