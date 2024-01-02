import React from 'react';
import ModelsSection from '../ModelsSection/ModelsSection.tsx';

const GalaxyNote = () => {
  const samsungGalaxyNoteSeries = ['Note 20 Ultra', 'Note 20', 'Note 10 Plus', 'Note 9', 'Note 8'];

  return <ModelsSection headerContent="Wybierz model z serii Samsung Galaxy Note" models={samsungGalaxyNoteSeries} />;
};

export default GalaxyNote;
