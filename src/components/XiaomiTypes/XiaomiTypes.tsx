import React from 'react';
import ImgCard from '../ImgCard/ImgCard.tsx';

const XiaomiData = [
  {
    slug: '/xiaomiMi',
    title: 'Xiaomi Mi',
    imgSrc: '../../../public/images/xiaomiMi.png',
  },
  {
    slug: '/xiaomiRedmi',
    title: 'Redmi',
    imgSrc: '../../../public/images/xiaomiRedmi.png',
  },
  {
    slug: '/xiaomiPoco',
    title: 'POCO',
    imgSrc: '../../../public/images/xiaomiPoco.png',
  },
];

const XiaomiTypes = () => {
  return (
    <section className="mt-5">
      <h2 className="text-center text-3xl font-bold mb-4">Wybierz serię Xiaomi</h2>
      <div className="flex h-[300px] mb-10">
        {XiaomiData.map(({ slug, title, imgSrc }) => (
          <ImgCard key={slug} slug={slug} title={title} imgSrc={imgSrc} />
        ))}
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
