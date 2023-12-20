import React from 'react';

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

  return (
    <section>
      <h2 className="text-center text-3xl font-bold m-5">Wybierz model Xiaomi Redmi</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 relative group">
        {xiaomiRedmiSeries.map((model, index) => (
          <div
            key={index}
            className="p-4 bg-gray-200 rounded-md transition-transform duration-300 transform hover:scale-105 hover:bg-gray-300 "
          >
            <p className="text-center mt-2 font-bold">{model}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-8 mt-8">Nie znalazłeś swojego modelu?</h3>
        <a href="tel:+48730889759">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Zadzwoń, chętnie pomożemy: +48 730 889 759
          </button>
        </a>
      </div>
    </section>
  );
};

export default XiaomiRedmi;
