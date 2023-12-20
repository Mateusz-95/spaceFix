import React from 'react';

const Iphones = () => {
  const iPhoneModels = [
    'iPhone 15 Pro Max',
    'iPhone 15 Pro',
    'iPhone 15 Plus',
    'iPhone 15',
    'iPhone 14 Pro Max',
    'iPhone 14 Pro',
    'iPhone 14 Plus',
    'iPhone 14',
    'iPhone SE (3.generacji)',
    'iPhone 12 Pro Max',
    'iPhone 12 Pro',
    'iPhone 12 Mini',
    'iPhone 12',
    'iPhone SE (2.generacji)',
    'iPhone 11 Pro Max',
    'iPhone 11 Pro',
    'iPhone 11',
    'iPhone XS Max',
    'iPhone XS',
    'iPhone XR',
    'iPhone X',
    'iPhone 8 Plus',
    'iPhone 8',
    'iPhone 7 Plus',
    'iPhone 7',
    'iPhone 6s Plus',
    'iPhone 6s',
    'iPhone 6 Plus',
    'iPhone 6',
    'iPhone SE (1.generacji)',
  ];

  return (
    <section>
      <h2 className="text-center text-3xl font-bold m-5">Wybierz model iPhone'a</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 relative group">
        {iPhoneModels.map((model, index) => (
          <div
            key={index}
            className="p-4 bg-gray-200 rounded-md transition-transform duration-300 transform hover:scale-105 hover:bg-gray-300 "
          >
            <a href="/phoneRepairs">
              <p className="text-center mt-2 font-bold">{model}</p>
            </a>
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

export default Iphones;
