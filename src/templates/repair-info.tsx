import React, { useRef, useState } from 'react';

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
  '/images/display-crashed.png',
  '/images/crashed-back-phone.png',
  '/images/low-battery-phone.png',
];

const RepairInfo: React.FC<RepairInfoProps> = ({ data }) => {
  const [currentRepair, setCurrentRepair] = useState(0);

  const myRef = useRef(null);

  const scrollToRef = () => {
    myRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section>
      <h2 className="text-center text-3xl font-bold m-4 text-blue-400">
        {data.length > 0 && data[currentRepair] && data[currentRepair].title}
      </h2>
      <h3 className="text-center text-3xl m-4">Wybierz rodzaj naprawy</h3>
      <div className="flex justify-center">
        <div className="md:flex md:max-w-2xl grid grid-cols-2 gap-4 m-auto" ref={myRef}>
          {data.map(({ shortTitle }, index) => {
            return (
              <ImgCard
                key={index}
                onClick={() => {
                  setCurrentRepair(index);
                  if (window.innerWidth <= 768) {
                    scrollToRef();
                  }
                }}
                title={shortTitle}
                imgSrc={RepairImages[index]}
                imgClassName="md:w-[64px] md:p-10 md:ml-6 md:mr-6 shadow-none w-[30px] h-[40px]"
                as="button"
              />
            );
          })}
        </div>
      </div>

      <div className="flex justify-center items-center text-center m-10 ">
        <div className="md:flex md:max-w-4xl border-2 border-black md:p-8 md:gap-4 ">
          <div className="md:flex-grow-0 md:w-1/3 ">
            <div className="md:px-14 relative md:aspect-square aspect-auto md:mb-4 md:h-[150px] flex justify-center ">
              <img
                alt="repair-img"
                className="rounded-lg md:object-cover md:absolute md:left-14 md:top-0 md:w-full md:h-full w-[60px] h-[80px] max-md:mt-4 "
                src={RepairImages[currentRepair]}
              />
            </div>
            <p className="md:text-2xl font-bold text-xl ">{data[currentRepair].title}</p>
            <p className="md:text-3xl font-bold text-green-500 md:m-5 m-2 text-xl">{data[currentRepair].price}</p>
            <a href="tel:+48730889759">
              <button className="max-md:h-[60px] max-md:w-[160px] bg-blue-500 text-white md:py-2 md:px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                Zadzwoń i zamów naprawę <div className="md:block hidden">+48 730 889 759</div>
              </button>
            </a>
            <div className="flex justify-center md:mt-4 mt-2">
              <a
                href="mailto:biurospacefix@gmail.com?subject=Potrzebuję%20naprawy!&body=Potrzebuję%20naprawy!%0D%0APoniżej%20podaję%20jaki%20sprzęt%20potrzebuje%20Waszej%20naprawy%20i%20co%20dokładnie%20mu%20dolega!%20:)%0D%0AZostawiam%20również%20numer%20telefonu%20pod%20który%20zadzwonicie%20z%20wyceną:"
                className="md:max-w-[100px] flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-2 md:text-base md:px-4 transition duration-150 ease-in-out"
              >
                <img alt="mail icon" src="/images/mail.png" className="md:mr-2 h-6 w-6" />
                <span className="hidden md:block">Napisz</span>
              </a>
            </div>
          </div>
          <div className="md:flex-grow flex md:w-2/3 max-md: mt-4 ">
            <div className="">
              <h3 className="md:text-2xl text-lg md:mb-5 text-blue-400">Opis naprawy:</h3>
              {Array.isArray(data[currentRepair].description) ? (
                <ul className="md:text-lg text-base max-md:ml-2 max-md:mr-2 list-disc list-inside">
                  {data[currentRepair].description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="md:text-lg text-base max-md:ml-2 max-md:mr-2">{data[currentRepair].description}</p>
              )}

              <h3 className="md:text-2xl md:mt-5 mt-2 text-lg text-blue-400">Gwarancja:</h3>
              <p className="md:text-lg">3 miesiące</p>
              <h3 className="md:text-2xl md:mt-5 mt-2 text-lg text-blue-400">Czas naprawy:</h3>
              <p className="md:text-lg">{data[currentRepair].duration}</p>
              <p className="md:text-sm md:mt-12 text-xs mt-6">
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
