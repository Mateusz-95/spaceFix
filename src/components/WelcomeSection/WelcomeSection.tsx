import React from 'react';

const WelcomeSection = () => {
  return (
    <section className="md:flex-row flex flex-col-reverse m-10 gap-6 p-4 md:bg-white md:shadow-lg rounded-lg md:border md:border-gray-200 md:hover:shadow-xl md:transition-shadow">
      <div className="flex-1 md:flex hidden">
        <img
          alt="Profesjonalny serwis smartfonów w Warszawie, Ursus - SpaceFix"
          src="/images/unsplash-image.png"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-1/2 p-4 flex-1 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Witaj w SpaceFix <br />
          profesjonalnym serwisie naprawy smartfonów <br />
          Warszawa Ursus
        </h1>
        <p className="text-lg mt-10 mb-10">
          Pasjonaci technologii mobilnych, którzy zapewniają najwyższą jakość <b> naprawy telefonów</b>. W Ursusie,
          Warszawa, nasz serwis SpaceFix jest Twoim zaufanym partnerem w w naprawie Twojego smartfona.
        </p>
        <h2 className="text-2xl font-bold mb-8">Zmagasz się z usterką telefonu lub tableta?</h2>
        <a href="/offer/">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Odkryj nasze usługi
          </button>
        </a>
      </div>
    </section>
  );
};

export default WelcomeSection;
