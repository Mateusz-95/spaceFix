import React from 'react';
import ModelsSection from '../ModelsSection/ModelsSection.tsx';

const XiaomiMi = () => {
  const xiaomiMiSeries = [
    'Xiaomi 13T Pro',
    'Xiaomi 13T',
    'Xiaomi 13',
    'Xiaomi 13 Pro',
    'Xiaomi 13 Lite',
    'Xiaomi 12T Pro',
    'Xiaomi 12T',
    'Xiaomi 12 Pro',
    'Xiaomi 12X',
    'Xiaomi 12 Lite',
    'Xiaomi 11T',
    'Xiaomi 11T Pro',
    'Xiaomi 11 Lite 5G NE',
  ];

  return <ModelsSection headerContent="Wybierz model Xiaomi" models={xiaomiMiSeries} />;
};

export default XiaomiMi;
