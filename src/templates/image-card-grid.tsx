import React from 'react';
import ImgCard from '../components/ImgCard/ImgCard.tsx';

interface ImageCardGridProps {
  headerContent: string;
  data: {
    name: string;
    imgSrc: string;
    slug: string;
  }[];
}

const ImageCardGrid: React.FC<ImageCardGridProps> = ({ headerContent, data }) => {
  return (
    <section className="mt-5">
      <h2 className="text-center text-3xl font-bold mb-4">{headerContent}</h2>
      <div className="max-md:flex md:h-[250px] mb-10 xl:flex xl:h-[250px] md:grid md:grid-cols-3 max-md:flex-col justify-center gap-6 md:gap-0">
        {data
          .filter((item) => item.ignore !== 'list')
          .map(({ slug, name, imgSrc }) => {
            return <ImgCard key={slug} slug={slug} title={name} imgSrc={imgSrc} />;
          })}
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-8">Nie znalazłeś swojego modelu?</h3>
        <a href="tel:+48730889759">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Zadzwoń, chętnie pomożemy:
            <br className="md:hidden block" />
            +48 730 889 759
          </button>
        </a>
      </div>
    </section>
  );
};

export default ImageCardGrid;
