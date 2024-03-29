import React from 'react';

interface BaseImgCardProps {
  title: string;
  imgSrc: string;
  imgClassName?: string;
}

interface ImgCardAsLink extends BaseImgCardProps {
  as?: 'link';
  slug: string;
  onClick?: never;
}

interface ImgCardAsButton extends BaseImgCardProps {
  as?: 'button';
  slug?: never;
  onClick: React.MouseEventHandler;
}

type ImgCardProps = ImgCardAsLink | ImgCardAsButton;

const ImgCard = ({ slug, title, imgSrc, imgClassName = '', as = 'link', onClick }: ImgCardProps) => {
  const children = (
    <>
      <p className="text-center text-xl font-bold md:mb-2">{title}</p>
      <div className={`relative md:aspect-square aspect-auto md:h-full h-[200px] w-[200px] shadow-lg ${imgClassName}`}>
        <img
          className="rounded-lg object-cover transition duration-300 transform hover:scale-105 md:absolute md:left-0 md:top-0 w-full h-full"
          alt="iphone-photo"
          src={imgSrc}
        />
      </div>
    </>
  );

  return (
    <>
      {as === 'link' ? (
        <a href={slug} className="flex flex-col justify-between items-center relative h-full w-fit">
          {children}
        </a>
      ) : (
        <button onClick={onClick} className="flex flex-col justify-between items-center relative w-fit h-full m-auto">
          {children}
        </button>
      )}
    </>
  );
};

export default ImgCard;
