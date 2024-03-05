import React from 'react';
import { motion } from 'framer-motion';

const TrustUsSection = () => {
  return (
    <section className="m-10 mt-20">
      <h2 className="text-2xl font-bold text-center">Profesjonalna Naprawa Smartfonów w Ursusie, Warszawa</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" rounded-md text-white md:grid md:grid-cols-2 md:gap-4 text-center mt-10 bg-[url('/images/space.jpg')]"
      >
        <div className=" p-4 md:mr-14">
          <h4 className="text-lg mb-5 text-black bg-white rounded-md">Doświadczenie i wiedza</h4>
          <p>
            W SpaceFix łączymy doświadczenie i wiedzę ekspercką, by oferować usługi na najwyższym poziomie w dziedzinie
            technologii mobilnych. Jesteśmy specjalistami w <b>naprawie smartfonów i tabletów w Warszawie</b>, z
            długoletnim doświadczeniem, pozwalającym nam na szybkie i efektywne rozwiązywanie problemów technicznych.
          </p>
        </div>
        <div className=" p-4">
          <h4 className="text-lg mb-5 text-black bg-white rounded-md">Punktualność i terminowość</h4>
          <p>
            Cenimy Twój czas, dlatego w SpaceFix, zlokalizowanym w sercu <b>Ursusa</b>, gwarantujemy terminowe usługi
            naprawy telefonów i smartfonów. Nasz zespół dołoży wszelkich starań, aby Twoje urządzenie było gotowe bez
            zbędnej zwłoki, z poszanowaniem Twojego harmonogramu.
          </p>
        </div>
        <div className=" p-4 md:mr-14">
          <h4 className="text-lg mb-5 text-black bg-white rounded-md">Dbałość o detale i estetykę</h4>
          <p>
            Dbamy o każdy szczegół naprawy, od estetyki do funkcjonalności. W <b>SpaceFix</b> nie ma miejsca na
            kompromisy dotyczące jakości - każda <b>wymiana ekranu</b>, <b>baterii</b> czy <b>inne usługi naprawcze</b>
            wykonywane są z precyzją, zachowując wygląd i czyniąc Twoje urządzenie jak nowe, gotowe służyć w dynamicznym
            życiu <b>Warszawy</b>.
          </p>
          <p className="description"></p>
        </div>
        <div className=" p-4">
          <h4 className="text-lg mb-5 text-black bg-white rounded-md">Referencje i opinie klientów</h4>
          <p>
            Poleceni przez mieszkańców <b>Ursusa i Warszawy</b>, jesteśmy dumni z pozytywnych opinii naszych klientów.
            Satysfakcja użytkowników, którzy skorzystali z naszych usług <b>naprawy telefonów i smartfonów</b>, motywuje
            nas do podnoszenia standardów pracy. Zaufaj ekspertom z <b>SpaceFix</b> i dołącz do grona zadowolonych
            klientów, którzy doświadczyli profesjonalizmu na każdym etapie współpracy.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default TrustUsSection;
