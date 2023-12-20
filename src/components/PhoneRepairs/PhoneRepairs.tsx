import React from 'react';
import ImgCard from '../ImgCard/ImgCard.tsx';
import imgCard from '../ImgCard/ImgCard.tsx';

const IphoneRepairData = [
  {
    slug: '/iphones',
    title: 'Przednia szybka',
    imgSrc: '../../../public/images/crashed-front-phone.png',
  },
  {
    slug: '/iphones',
    title: 'Tylna szybka',
    imgSrc: '../../../public/images/crashed-back-phone.png',
  },
  {
    slug: '/iphones',
    title: 'Wymiana baterii',
    imgSrc: '../../../public/images/low-battery-phone.png',
  },
  {
    slug: '/iphones',
    title: 'Port ładowania',
    imgSrc: '../../../public/images/charging-port-phone.png',
  },
  {
    slug: '/iphones',
    title: 'Wymiana głośnika',
    imgSrc: '../../../public/images/speaker-phone.png',
  },
  {
    slug: '/iphones',
    title: 'Naprawa aparatu',
    imgSrc: '../../../public/images/camera-crashed-phone.png',
  },
];

const PhoneRepairs = () => {
  return (
    <section>
      <h2 className="text-center text-3xl font-bold m-4">Wybierz rodzaj naprawy</h2>
      <div className="flex justify-center">
        <div className="flex max-w-2xl">
          {IphoneRepairData.map(({ slug, imgSrc, title }) => {
            return <ImgCard key={imgSrc} slug={slug} title={title} imgSrc={imgSrc} imgClassName="w-[64px]" />;
          })}
        </div>
      </div>

      <div className="flex justify-center items-center text-center m-10 ">
        <div className="flex max-w-4xl border-2 border-black p-8 gap-4 ">
          <div className="flex-grow-0">
            <img className="px-14" src="../../../public/images/crashed-front-phone.png" />
            <p className="text-2xl font-bold ">Iphone 15 pro wymiana szybki</p>
            <p className="text-3xl font-bold text-green-500 m-5">249 zł</p>
            <a href="tel:+48730889759">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                Zadzwoń i zamów naprawę: +48 730 889 759
              </button>
            </a>
          </div>
          <div className="flex-grow flex  ">
            <div className="">
              <h3 className="text-2xl mb-5 text-blue-400">Opis naprawy:</h3>
              <p className="text-lg">
                {' '}
                Oferujemy profesjonalną wymianę szyby w Twoim smartfonie. Nasza precyzyjna praca i zaawansowany sprzęt
                gwarantują bezpieczną i efektywną operację.
              </p>
              <h3 className="text-2xl mt-5 text-blue-400">Gwarancja:</h3>
              <p className="text-lg">3 miesiące</p>
              <h3 className="text-2xl mt-5 text-blue-400">Czas naprawy:</h3>
              <p className="text-lg">do 2 dni roboczych</p>
              <p className="text-sm mt-12">
                Prosimy o dokonanie rezerwacji telefonicznie przed przybyciem, abyśmy mogli upewnić się, że potrzebna
                część jest na miejscu i gotowa do naprawy.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold mb-8">Jest to inna naprawa?</h3>
        <a href="tel:+48730889759">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Zadzwoń, chętnie pomożemy: +48 730 889 759
          </button>
        </a>
      </div>
    </section>
  );
};

export default PhoneRepairs;
