import React from 'react';

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

  return (
    <section>
      <h2 className="text-center text-3xl font-bold m-5">Wybierz model z serii Samsung Galaxy M</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 relative group">
        {samsungGalaxyMSeries.map((model, index) => (
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

export default GalaxyM;
