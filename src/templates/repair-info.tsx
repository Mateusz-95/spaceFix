import React, { useState } from 'react';

import ImgCard from '../components/ImgCard/ImgCard.tsx';

interface RepairInfoProps {
  data: {
    key: string;
    title: string;
    shortTitle: string;
    price: string;
    description: string;
    duration: string;
  }[];
}

const RepairImages = [
  '/images/crashed-front-phone.png',
  '/images/crashed-front-phone.png',
  '/images/crashed-back-phone.png',
  '/images/low-battery-phone.png',
];

const RepairInfo: React.FC<RepairInfoProps> = ({ data }) => {
  // todo: clicking on button in ImgCard changes state and every content which needs to be changed binds into the state
  const [currentRepair, setCurrentRepair] = useState(0);

  return (
    <section>
      <h2 className="text-center text-3xl font-bold m-4">Wybierz rodzaj naprawy</h2>
      <div className="flex justify-center">
        <div className="flex max-w-2xl">
          {data.map(({ shortTitle }, index) => {
            return (
              <ImgCard
                key={index}
                onClick={() => {
                  setCurrentRepair(index);
                }}
                title={shortTitle}
                imgSrc={RepairImages[index]}
                imgClassName="w-[64px]"
                as="button"
              />
            );
          })}
        </div>
      </div>

      <div className="flex justify-center items-center text-center m-10 ">
        <div className="flex max-w-4xl border-2 border-black p-8 gap-4 ">
          <div className="flex-grow-0">
            <img className="px-14" src="../../../public/images/crashed-front-phone.png" />
            <p className="text-2xl font-bold ">{data[currentRepair].title}</p>
            <p className="text-3xl font-bold text-green-500 m-5">{data[currentRepair].price}</p>
            <a href="tel:+48730889759">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                Zadzwoń i zamów naprawę: +48 730 889 759
              </button>
            </a>
          </div>
          <div className="flex-grow flex  ">
            <div className="">
              <h3 className="text-2xl mb-5 text-blue-400">Opis naprawy:</h3>
              <p className="text-lg">{data[currentRepair].description}</p>
              <h3 className="text-2xl mt-5 text-blue-400">Gwarancja:</h3>
              <p className="text-lg">3 miesiące</p>
              <h3 className="text-2xl mt-5 text-blue-400">Czas naprawy:</h3>
              <p className="text-lg">{data[currentRepair].duration}</p>
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

export default RepairInfo;
