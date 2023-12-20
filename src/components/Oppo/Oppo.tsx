import React from 'react';

const Oppo = () => {
  const oppoSmartphones = [
    'OPPO Find N2 Flip',
    'OPPO Find X5 Pro',
    'OPPO Reno10 5G',
    'OPPO Reno10 Pro 5G',
    'OPPO Reno8 T',
    'OPPO Reno7 Lite',
    'OPPO Reno7 5G',
    'OPPO Reno7',
    'OPPO Reno6 Pro 5G',
    'OPPO Reno6 5G',
    'OPPO A78',
    'OPPO A58',
    'OPPO A38',
    'OPPO A79 5G',
    'OPPO A98 5G',
    'OPPO A96',
    'OPPO A17',
    'OPPO A57s',
  ];

  return (
    <section>
      <h2 className="text-center text-3xl font-bold m-5">Modele Smartfonów OPPO</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {oppoSmartphones.map((model, index) => (
          <div key={index} className="p-4 bg-gray-200 rounded-md">
            <p className="text-center font-bold">{model}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Oppo;
