import React from 'react';

const QuickRepairSection = () => {
  return (
    <section className="flex justify-between mx-20 mt-10 gap-6">
      <div className="w-1/3  p-4 flex flex-col gap-10 ">
        <div className="flex-1">
          <img
            alt="first unplash img"
            src="../../../public/images/firstUnplash.png"
            className="w-full h-80 object-contain rounded-md"
          />
        </div>
        <div className="flex-1 text-center">
          <h2 className="text-3xl font-bold mb-4">Wymiana szyby</h2>
          <p className="mb-5">Oferujemy profesjonalną wymianę szyby w Twoim smartfonie.</p>
          <p>Nasza precyzyjna praca i zaawansowany sprzęt gwarantują bezpieczną i efektywną operację.</p>
        </div>
      </div>
      <div className="w-1/3  p-4 flex flex-col gap-10 ">
        <div className="flex-1">
          <img
            alt="second unplash img"
            src="../../../public/images/secondUnplash.png"
            className="w-full h-80 object-contain rounded-md"
          />
        </div>
        <div className="flex-1 text-center">
          <h2 className="text-3xl font-bold mb-4">Wymiana wyświetlacza</h2>
          <p>
            Przywracamy świetność Twojego urządzenia dzięki naszej usłudze wymiany wyświetlacza. Nasz zespół
            specjalistów zadba o to, aby Twój smartfon zyskał nowy ekran, przywracając mu intensywne kolory, ostrość i
            jakość obrazu.
          </p>
        </div>
      </div>
      <div className="w-1/3  p-4 flex flex-col gap-10 ">
        <div className="flex-1">
          <img
            alt="third unplash img"
            src="../../../public/images/thirdUnplash.png"
            className="w-full h-80 object-contain rounded-md"
          />
        </div>
        <div className="flex-1 text-center">
          <h2 className="text-3xl font-bold mb-4">Wymiana baterii</h2>
          <p className="mb-5">
            Oferujemy profesjonalną wymianę baterii, by Twój smartfon odzyskał długi czas działania.
          </p>
          <p>Dzięki naszej usłudze, możesz cieszyć się niezawodnym zasilaniem i pełną wydajnością urządzenia.</p>
        </div>
      </div>
    </section>
  );
};

export default QuickRepairSection;
