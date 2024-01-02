import React from 'react';
import ModelsSection from '../ModelsSection/ModelsSection.tsx';

const GalaxyM = () => {
  const samsungGalaxyMSeries = [
    'Galaxy M54 5G',
    'Galaxy M34 5G',
    'Galaxy M14 5G',
    'Galaxy M04',
    'Galaxy M53 5G',
    'Galaxy M33 5G',
    'Galaxy M23',
    'Galaxy M13 5G',
    'Galaxy M13',
    'Galaxy M62',
    'Galaxy M52 5G',
    'Galaxy M42 5G',
    'Galaxy M32 5G',
    'Galaxy M32',
    'Galaxy M22',
    'Galaxy M12',
    'Galaxy M02s',
    'Galaxy M02',
    'Galaxy M01s',
    'Galaxy M01',
    'Galaxy M51',
    'Galaxy M31s',
    'Galaxy M31',
    'Galaxy M21s',
    'Galaxy M21',
    'Galaxy M11',
    'Galaxy M10s',
    'Galaxy M30s',
    'Galaxy M40',
    'Galaxy M30',
    'Galaxy M20',
    'Galaxy M10',
  ];

  return <ModelsSection headerContent="Wybierz model z serii Samsung Galaxy M" models={samsungGalaxyMSeries} />;
};

export default GalaxyM;
