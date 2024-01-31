import React from 'react';
import { motion } from 'framer-motion';

const TrustUsSection = () => {
  return (
    <section className="m-10 mt-20">
      <h4 className="text-2xl font-bold text-center">Dlaczego warto nam zaufać?</h4>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" rounded-md text-white md:grid md:grid-cols-2 md:gap-4 text-center mt-10 bg-[url('/images/space.jpg')]"
      >
        <div className=" p-4 md:mr-14">
          <h4 className="text-lg mb-5 text-black bg-white rounded-md">Doświadczenie i wiedza</h4>
          <p>
            Nasz zespół w SpaceFix to zbiorowisko doświadczenia i wiedzy w dziedzinie technologii mobilnych. Długie lata
            pracy w branży pozwoliły nam doskonalić nasze umiejętności i poznać najmniejsze detale każdego smartfona.
            Dzięki temu jesteśmy w stanie zidentyfikować i rozwiązać różnorodne problemy, zarówno te oczywiste, jak i te
            ukryte.
          </p>
        </div>
        <div className=" p-4">
          <h4 className="text-lg mb-5 text-black bg-white rounded-md">Punktualność i terminowość</h4>
          <p>
            Rozumiemy jak cenny jest Twój czas , dlatego w SpaceFix kładziemy ogromny nacisk na punktualność i
            terminowość. Dążymy do tego, aby Twoje smartfony były naprawione i zwrócone w umówionym terminie.
          </p>
        </div>
        <div className=" p-4 md:mr-14">
          <h4 className="text-lg mb-5 text-black bg-white rounded-md">Dbałość o detale i estetykę</h4>
          <p>
            Estetyka i jakość detali są dla nas niezwykle ważne. Niezależnie od tego, czy chodzi o wymianę ekranu czy
            też drobne poprawki, zawsze pracujemy z najwyższą starannością.
          </p>
        </div>
        <div className=" p-4">
          <h4 className="text-lg mb-5 text-black bg-white rounded-md">Referencje i opinie klientów</h4>
          <p>
            Nasze dotychczasowe osiągnięcia oraz satysfakcja klientów są najlepszym dowodem na naszą wiarygodność. Wielu
            klientów powierzyło nam swoje urządzenia, a ich zadowolenie i opinie potwierdzają nasze wysokie standardy
            obsługi.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default TrustUsSection;
