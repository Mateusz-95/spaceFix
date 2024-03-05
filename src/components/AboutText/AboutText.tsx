import React from 'react';

const AboutText = () => {
  return (
    <section>
      <div className="text-center pl-10 pr-10 mt-10">
        <h1 className="text-3xl font-bold mb-4">Profesjonalny serwis naprawy smartfonów SpaceFix - Ursus Warszawa</h1>
        <p className="text-lg mt-10 mb-10">
          Pasjonujemy się najnowszymi rozwiązaniami mobilnymi, dostarczając mieszkańcom <b>Warszawy</b> usługi
          najwyższej klasy.
        </p>
        <p className="mb-10 text-lg">
          Nasz <b>serwis smartfonów w Ursusie</b> skupia się na detalu, od drobnych poprawek estetycznych po
          skomplikowane naprawy techniczne, aby Twoje smartfony i tablety działały jak nowe. Nasz{' '}
          <b>serwis telefonów</b> stawia na precyzję i najwyższą jakość obsługi, przekraczając Twoje oczekiwania przy
          każdej wizycie.
        </p>
        <p className="text-lg">
          Damy <b>Twojemu smartfonowi</b> drugie życie. Z nami <b>Twoje smartfony i tablety</b> znów będą mogły działać
          pełną mocą. W <b>SpaceFix</b>, każda naprawa to krok w stronę długotrwałych relacji z naszymi klientami z{' '}
          <b>Ursusa</b> i okolic.
        </p>
        <p className="mb-10 text-lg">
          Doświadcz jakości usług, które przywrócą <b>Twoje urządzenia do życia</b>. Odwiedź nas w{' '}
          <b>Warszawie (dzielnica Ursus)</b> i pozwól nam zadbać o Twoje urządzenie.
        </p>

        <h2 className="text-2xl font-bold mb-8">Potrzebujesz naprawy?</h2>
        <a href="/offer/">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Zobacz naszą pełną ofertę
          </button>
        </a>
      </div>
    </section>
  );
};

export default AboutText;
