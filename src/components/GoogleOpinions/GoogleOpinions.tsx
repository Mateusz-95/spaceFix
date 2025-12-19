import React, { useState } from 'react';

interface Review {
  author: string;
  rating: number;
  text: string;
  date: Date | string;
  profilePhoto?: string;
}

const GoogleOpinions: React.FC = () => {
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());
  const MAX_TEXT_LENGTH = 150; // Characters before truncation

  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedReviews(newExpanded);
  };

  const isTextLong = (text: string) => text.length > MAX_TEXT_LENGTH;
  const getTruncatedText = (text: string) => text.substring(0, MAX_TEXT_LENGTH) + '...';
  // Function to calculate days ago from a date
  const getDaysAgo = (date: Date | string): string => {
    const reviewDate = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    reviewDate.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - reviewDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Dzisiaj';
    } else if (diffDays === 1) {
      return '1 dzień temu';
    } else {
      return `${diffDays} dni temu`;
    }
  };

  
  const reviews: Review[] = [
    {
      author: 'Ewa Wagner',
      rating: 5,
      text: 'Bardzo polecam, wykonałam kilka telefonów w poszukiwaniu serwisu do przeniesienia wszystkich danych na nowy telefon. Tylko tutaj Pan rozumiał o co mi chodzi... wspomnę o kosztach, najniższe, zaproponowano mi również dokupienie szybki i etui, bez naciskania za zakup tych najdroższych. Można się umówić na dogodny termin. Jak dla mnie 5/5.',
      date: '2025-10-19', 
    },
    {
      author: 'Anna G',
      rating: 5,
      text: 'To najlepsi fachowcy z jakimi miałam do czynienia. Klika razy już korzystałam z ich usług. Ich cierpliwość, uprzejmość i wiedza  nie ma granic. 5/5 to mało, dałabym więcej.',
      date: '2025-12-12',
    },
    {
      author: 'Karolina Żurkowska',
      rating: 5,
      text: 'Wymiana baterii była bardzo szybka! Pełen profesjonalizm. Miła, kompetenta i rzetelna obsługa! Gorąco polecam! 🙂🙂🙂…',
      date: '2025-12-10', 
    },
    {
      author: 'john doe',
      rating: 5,
      text: 'Nie wierze!!! Czy tacy fachowcy jeszcze gdzieś są? Czy tylko w Ursusie? Wszedłem zapytać czy mógłbym prosić o przeczyszczenie  głośnika/słuchawki w moim kilkuletnim iPhonie ponieważ bardzo słabo było słychać. Niezwykle miły Pan sprawdził co jest nie tak i zasugerował, abym chwilę poczekał. Trwało to naprawdę chwilę. Po tej “chwili” telefon nie tylko miał zdecydowanie poprawiony poziom głośności, ale również mikrofon i gniazdo ładowania. Kiedy zapytałem ile jestem winny, Pan się miło uśmiechnął i stwierdził, że będzie mu miło, kiedy podzielę się opinią o obsłudze na Google. Siedzę zatem na wygodnej kanapie, podziwiam ciekawy wystrój wnętrza i z niekłamaną przyjemnością wystawiam opinie. Co warto jeszcze dodać, Panowie mają czynny swój serwis do 19:00. Polecam całym sercem! 😍',
      date: '2025-09-19', 
    },
    {
      author: 'Grazyna Lipinska',
      rating: 5,
      text: 'Tych 5 gwiazdek to za mało, jestem bardzo  zadowolona z obsługi w dn 27.11.25 poprosiłam Pana o przegląd i doradztwo telefonu , Pan udzielił wyczerpujacych informacji ,naprawił małą usterkę i nie wziął zapłaty za usługę . Jestem bardzo tą sytuacją mile zaskoczona i bardzo  polecam ten serwis, znajomym też będę poleceła.',
      date: '2025-11-25', 
    },
    {
      author: 'Patryk',
      rating: 5,
      text: 'Jeżeli potrzebujecie sprawnej naprawy i pomocy z Waszymi telefonami to na pewno jest to dobre miejsce. Szybka obsługa, w przystępnej cenie. Już 3 razy korzystałem, głównie z wymianą szybki w różnych telefonach i śmiało mogę chłopaków polecić! Raz myślałem, że zepsuło mi się przyłącze ładowania ale chłopaki ogarnęli raz dwa, że to tylko kamień i nawet nic nie policzyli. Dzięki!',
      date: '2025-11-17', 
    },
    {
      author: 'Karolina Jankowska',
      rating: 5,
      text: 'Długo zbierałam się, żeby naprawić mój głośnik w IPhone, aż trafiłam na ten salon. Okazało się, że głośnika nie trzeba było wymieniać, a wystarczyło jedynie go dobrze wyczyścić. Próbowałam to robić wcześniej w domu, ale widocznie ze względu na brak odpowiednich narzędzi czy techniki się nie udało. Za to w tym salonie trwało to dosłownie chwilkę. Miła obsługa i profesjonalne podejście do klienta, w razie problemow z moim telefonem na pewno będę wracać :)',
      date: '2025-11-10', 
    },
    {
      author: 'Agnieszka Kozłowska',
      rating: 5,
      text: 'Przyszedłem z zamiarem wymiany gniazda USB C w smartfonie. Były problemy z połączeniem kablowym z laptopem czy szybkim ładowaniem. Bardzo miły i kompetentny serwisant stwierdził, że to kwestia zabrudzenia gniazda. Gniazdo oczyścił od ręki. Działa bez zarzutu. Usługa została wykonana GRATIS!',
      date: '2025-09-14', 
    },
    {
      author: 'Paweł Jankowski',
      rating: 5,
      text: 'Zdecydowanie polecam usługi tej firmy. Dwa lata temu wymieniałem tam baterię w iPhonie. Usługa wykonana bardzo szybko a cena bardzo przystępna. Bateria działa bez problemów do dziś. Teraz miałem problem z głośnikiem - rozmowy były bardzo słabo słyszalne. Usługa - czyszczenie głośnika - wykonana na miejscu. I nic nie zapłaciłem!',
      date: '2025-08-18', 
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Opinie naszych klientów
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Zobacz, co mówią o nas nasi zadowoleni klienci
          </p>
          <a
            href="https://maps.app.goo.gl/1zJNd1jXk6x6YLeT6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Zobacz wszystkie opinie na Google
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => {
            const isExpanded = expandedReviews.has(index);
            const shouldTruncate = isTextLong(review.text);
            const displayText = shouldTruncate && !isExpanded 
              ? getTruncatedText(review.text) 
              : review.text;

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col"
                style={{ minHeight: '280px', maxHeight: isExpanded ? 'none' : '280px' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-sm">
                        {review.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{review.author}</h3>
                      <p className="text-sm text-gray-500">{getDaysAgo(review.date)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  {renderStars(review.rating)}
                </div>
                
                <div className="flex-grow flex flex-col">
                  <p className="text-gray-700 leading-relaxed mb-2">{displayText}</p>
                  
                  {shouldTruncate && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm mt-auto self-start"
                    >
                      {isExpanded ? 'Czytaj mniej' : 'Czytaj więcej'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GoogleOpinions;

