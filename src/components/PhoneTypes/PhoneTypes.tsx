import React from 'react';
import type { DataType } from '../../data/data.ts';
import ImgCard from '../ImgCard/ImgCard.tsx';

interface PhoneTypeProps {
  data: DataType;
}

const PhoneTypes = ({ data }: PhoneTypeProps) => {
  return (
    <section className="mt-5 ">
      <h2 className="text-center text-3xl font-bold mb-4">Wybierz model telefonu</h2>
      <div className="flex h-[300px] mb-10">
        {data.map(({ slug, brand, imgSrc }) => {
          return <ImgCard key={slug} slug={slug} title={brand} imgSrc={imgSrc} />;
        })}
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

export default PhoneTypes;
