import React from 'react';

interface ImgCardProps {
  slug: string;
  title: string;
  imgSrc: string;
  imgClassName?: string;
}
const ImgCard = ({ slug, title, imgSrc, imgClassName = '' }: ImgCardProps) => {
  return (
    <div className=" flex-1">
      <a href={slug} className="flex flex-col justify-between items-center relative h-full">
        <p className="text-center text-xl font-bold mb-2">{title}</p>
        <div className={`relative aspect-square h-full ${imgClassName}`}>
          <img
            className="rounded-lg object-cover transition duration-300 transform hover:scale-105 absolute left-0 top-0 w-full h-full"
            alt="iphone-photo"
            src={imgSrc}
          />
        </div>
      </a>
    </div>
  );
};

export default ImgCard;
