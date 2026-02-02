import React from 'react';

const WelcomeSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="relative w-full overflow-hidden rounded-xl min-h-[420px] md:min-h-[480px] lg:min-h-[520px]">
          <img
            alt="Profesjonalny serwis smartfonów w Warszawie, Ursus - SpaceFix"
            src="/images/unsplash-image.png"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
          <div className="relative z-10 flex h-full min-h-[420px] md:min-h-[480px] lg:min-h-[520px] flex-col justify-center items-center px-6 py-12 md:px-10 md:py-16 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 drop-shadow-sm">
              Witaj w SpaceFix
            </h1>
            <p className="text-lg md:text-xl text-white/95 font-medium mb-3">
              Profesjonalny serwis naprawy smartfonów - Warszawa Ursus
            </p>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6">
              Pasjonaci technologii mobilnych, którzy zapewniają najwyższą jakość{' '}
              <strong className="text-white">naprawy telefonów</strong>. W Ursusie, Warszawa, nasz serwis SpaceFix
              jest Twoim zaufanym partnerem w naprawie Twojego smartfona.
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
              Zmagasz się z usterką telefonu lub tableta?
            </h2>
            <a
              href="/offer/"
              className="inline-flex items-center gap-2 rounded-full bg-white text-gray-900 font-semibold py-3.5 px-8 text-base shadow-lg hover:shadow-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Odkryj nasze usługi
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
