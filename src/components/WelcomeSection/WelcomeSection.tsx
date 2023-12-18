const WelcomeSection = () => {
  return (
    <section className="flex m-10 gap-6">
      <div className="flex-1">
        <img alt="unplash-image" src="../../../public/images/unsplash-image.png" className="rounded-lg" />
      </div>
      <div className="w-1/2 text-left p-4 flex-1 text-center">
        <h2 className="text-3xl font-bold mb-4 ">
          Witaj w SpaceFix <div>profesjonalnym serwisie naprawy smartfonów!</div>
        </h2>
        <p className="text-lg mt-10 mb-10">
          Jesteśmy pasjonatami mobilnej technologii, a naszym celem jest zapewnienie Ci najwyższej jakości usług
          naprawczych dla Twojego telefonu.
        </p>
        <h3 className="text-2xl font-bold mb-8">Potrzebujesz pomocy?</h3>
        <a href="/offer">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Sprawdź naszą ofertę
          </button>
        </a>
      </div>
    </section>
  );
};

export default WelcomeSection;
