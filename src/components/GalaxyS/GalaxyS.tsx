import React from 'react';

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

  return (
    <section>
      <h2 className="text-center text-3xl font-bold m-5">Wybierz model z serii Samsung Galaxy S</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 relative group">
        {samsungGalaxySSeries.map((model, index) => (
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

export default GalaxyS;
