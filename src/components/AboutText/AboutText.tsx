import React from 'react';

const AboutText = () => {
  return (
    <section>
      <div className="text-center pl-10 pr-10 mt-10">
        <h2 className="text-3xl font-bold mb-4 ">
          Witaj w SpaceFix <div>profesjonalnym serwisie naprawy smartfonów!</div>
        </h2>
        <p className="text-lg mt-10 mb-10">
          Jesteśmy pasjonatami mobilnej technologii, którzy łączą swoją wiedzę z miłością do doskonałości.
        </p>
        <p className="mb-10 text-lg">
          W naszym serwisie skupiamy się na każdym szczególe, aby Twoje smartfony i tablety odzyskały swoją pierwotną
          moc. Nieustannie dążymy do przekraczania oczekiwań, by zapewnić Ci najwyższą jakość obsługi. Nasz zespół,
          pełen entuzjazmu i doświadczenia, podejmuje się zarówno napraw skomplikowanych awarii, jak i subtelnych
          poprawek estetycznych.
        </p>
        <p className="text-lg">
          Dzięki SpaceFix Twoje urządzenia otrzymują nową szansę na wyrażenie ich potencjału. Stawiamy na długotrwałe
          relacje z naszymi klientami, dbając o to, aby każda wizyta w naszym serwisie była wyjątkowym doświadczeniem.
        </p>
        <p className="mb-10 text-lg">
          Dołącz do nas i pozwól swoim smartfonom i tabletom święcić w nowym blasku, by stały się nieodłącznym elementem
          Twojego dynamicznego życia.
        </p>

        <h3 className="text-2xl font-bold mb-8">Potrzebujesz pomocy?</h3>
        <a href="/offer/">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Sprawdź naszą ofertę
          </button>
        </a>
      </div>
    </section>
  );
};

export default AboutText;
