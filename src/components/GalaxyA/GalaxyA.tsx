import React from 'react';
import ModelsSection from '../ModelsSection/ModelsSection.tsx';

const GalaxyA = () => {
  const samsungGalaxyASeries = ['A52 5G', 'A32 4G/5G', 'A71', 'A51', 'A21s', 'A70 (2019)'];

  return <ModelsSection headerContent="Wybierz model z serii Samsung Galaxy A" models={samsungGalaxyASeries} />;
};

export default GalaxyA;
