import React from 'react';

const QuickRepairSection = () => {
  return (
    <section className="flex flex-col justify-between md:mx-20 mt-6 gap-6 md:flex-row md:mt-10">
      <a
        href="/offer/"
        className="px-4 py-6 flex flex-col gap-4 md:w-1/3 md:gap-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow"
      >
        <div className="flex-1">
          <img
            alt="Wymiana szyby smartfona w Warszawie, Ursus - SpaceFix"
            src="/images/firstUnplash.png"
            className="w-full md:h-80 h-60 object-contain rounded-md"
          />
        </div>
        <div className="flex-1 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Wymiana szybki</h2>
          <p className="md:mb-5">
            Oferujemy profesjonalną wymianę szybki w Twoim smartfonie. Jesteśmy jednym z najlepszych serwisów telefonów
            w Warszawie specjalizującym się w wymianie szybek smartfonów i tabletów.
          </p>
          <p>Nasza precyzyjna praca i zaawansowany sprzęt gwarantują bezpieczną i efektywną operację.</p>
        </div>
      </a>
      <a
        href="/offer/"
        className="px-4 py-6 flex flex-col gap-4 md:w-1/3 md:gap-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow"
      >
        <div className="flex-1">
          <img
            alt="Wymiana wyświetlacza smartfona w Ursusie, Warszawa - SpaceFix"
            src="/images/secondUnplash.png"
            className="w-full md:h-80 h-60 object-contain rounded-md"
          />
          <div className="flex-1 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Wymiana wyświetlacza</h2>
            <p>
              Przywracamy świetność Twojego urządzenia dzięki naszej usłudze wymiany wyświetlacza. Nasz zespół
              specjalistów zadba o to, aby Twój smartfon zyskał nowy ekran, przywracając mu intensywne kolory, ostrość i
              jakość obrazu.
            </p>
          </div>
        </div>
      </a>
      <a
        href="/offer/"
        className="px-4 py-6 flex flex-col gap-4 md:w-1/3 md:gap-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow"
      >
        <div className="flex-1">
          <img
            alt="Wymiana baterii smartfona w SpaceFix, Ursus, Warszawa"
            src="/images/thirdUnplash.png"
            className="w-full md:h-80 h-60 object-contain rounded-md"
          />
        </div>
        <div className="flex-1 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Wymiana baterii</h2>
          <p className="mb-5">
            Oferujemy profesjonalną wymianę baterii, by Twój smartfon odzyskał długi czas działania.
          </p>
          <p>Dzięki naszej usłudze, możesz cieszyć się niezawodnym zasilaniem i pełną wydajnością urządzenia.</p>
        </div>
      </a>
    </section>
  );
};

export default QuickRepairSection;
