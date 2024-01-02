import React from 'react';
import ModelsSection from '../ModelsSection/ModelsSection.tsx';

const XiaomiPoco = () => {
  const xiaomiPocoSeries = [
    'POCO X5 5G',
    'POCO X5 Pro 5G',
    'POCO F5 Pro',
    'POCO F5',
    'POCO F4 GT',
    'POCO F4',
    'POCO F3',
    'POCO X4 GT',
    'POCO X4 Pro 5G',
    'POCO M4 Pro 5G',
    'POCO M4 Pro 4G',
    'POCO M5',
    'POCO M5s',
    'POCO C65',
  ];

  return <ModelsSection headerContent="Wybierz model Xiaomi Poco" models={xiaomiPocoSeries} />;
};

export default XiaomiPoco;
