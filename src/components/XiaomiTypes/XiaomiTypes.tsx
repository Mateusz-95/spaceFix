import React from 'react';

const XiaomiTypes = () => {
  return (
    <section className="mt-5">
      <h2 className="text-center text-3xl font-bold mb-4">Wybierz serię Xiaomi</h2>
      <div className="flex">
        <div className="p-4">
          <a href="/xiaomiMi" className="block relative group">
            <p className="text-center text-xl font-bold mb-2">Xiaomi Mi</p>
            <img
              className="rounded-lg object-cover transition duration-300 transform group-hover:scale-105"
              alt="iphone-photo"
              src="../../../public/images/galaxys-photo.png"
            />
          </a>
        </div>

        <div className=" p-4">
          <a href="/xiaomiRedmi" className="block relative group">
            <p className="text-center text-xl font-bold mb-2">Redmi</p>
            <img
              className="rounded-lg object-cover transition duration-300 transform group-hover:scale-105"
              alt="iphone-photo"
              src="../../../public/images/galaxynote-photo.png"
            />
          </a>
        </div>

        <div className=" p-4">
          <a href="/xiaomiPoco" className="block relative group">
            <p className="text-center text-xl font-bold mb-2">POCO</p>
            <img
              className="rounded-lg object-cover transition duration-300 transform group-hover:scale-105"
              alt="iphone-photo"
              src="../../../public/images/galaxya-photo.png"
            />
          </a>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-8">Nie znalazłeś swojego modelu?</h3>
        <a href="tel:+48730889759">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Zadzwoń, chętnie pomożemy: +48 730 889 759
          </button>
        </a>
      </div>
    </section>
  );
};

export default XiaomiTypes;
