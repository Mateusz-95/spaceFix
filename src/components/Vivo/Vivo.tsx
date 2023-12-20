import React from 'react';

const Vivo = () => {
  const vivoSmartphones = [
    'Vivo X90 Pro',
    'Vivo V23 5G',
    'Vivo Y22s',
    'Vivo Y16',
    'Vivo Y35',
    'Vivo Y01',
    'Vivo Y76 5G',
    'Vivo X60 Pro',
    'Vivo Y21',
    'Vivo Y21s',
    'Vivo Y20s',
    'Vivo Y15s',
    'Vivo Y12s',
    'Vivo Y11s',
    'Vivo Y11',
    'Vivo Y70',
    'Vivo Y20s [G]',
    'Vivo Y72 5G',
  ];

  return (
    <section>
      <h2 className="text-center text-3xl font-bold m-5">Modele Smartfonów Vivo</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {vivoSmartphones.map((model, index) => (
          <div key={index} className="p-4 bg-gray-200 rounded-md">
            <p className="text-center font-bold">{model}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Vivo;
