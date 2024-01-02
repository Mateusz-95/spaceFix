import React from 'react';
import ImgCard from '../ImgCard/ImgCard.tsx';

const SamsungData = [
  {
    slug: '/galaxyS',
    title: 'Galaxy S',
    imgSrc: '../../../public/images/galaxys-photo.png',
  },
  {
    slug: '/galaxyNote',
    title: 'Galaxy Note',
    imgSrc: '../../../public/images/galaxynote-photo.png',
  },
  {
    slug: '/galaxyA',
    title: 'Galaxy A',
    imgSrc: '../../../public/images/galaxya-photo.png',
  },
  {
    slug: '/galaxyM',
    title: 'Galaxy M',
    imgSrc: '../../../public/images/galaxym-photo.png',
  },
];

interface SamsungTypesProps {
  categoryTitle: string;
  data: any;
  prefix: string;
}

const SamsungTypes = ({ categoryTitle, data, prefix }: SamsungTypesProps) => {
  console.log(data);
  return (
    <section className="mt-5">
      <h2 className="text-center text-3xl font-bold mb-4">{categoryTitle}</h2>
      <div className="flex h-[300px] mb-10">
        {data.map(({ slug, title, imgSrc }) => (
          <ImgCard key={slug} slug={`${prefix}/${slug}`} title={title} imgSrc={imgSrc} />
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

export default SamsungTypes;
