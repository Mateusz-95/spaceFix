const PhoneTypes = () => {
  return (
    <section className="mt-5">
      <h2 className="text-center text-3xl font-bold mb-4">Wybierz model telefonu</h2>
      <div className="flex">
        <div className="p-4">
          <a href="/iphones" className="block relative group">
            <p className="text-center text-xl font-bold mb-2">Iphone</p>
            <img
              className="rounded-lg object-cover transition duration-300 transform group-hover:scale-105"
              alt="iphone-photo"
              src="../../../public/images/iphone-photo.png"
            />
          </a>
        </div>

        <div className=" p-4">
          <a className="block relative group">
            <p className="text-center text-xl font-bold mb-2">Samsung</p>
            <img
              className="rounded-lg object-cover transition duration-300 transform group-hover:scale-105"
              alt="iphone-photo"
              src="../../../public/images/samsung-photo.png"
            />
          </a>
        </div>

        <div className=" p-4">
          <a className="block relative group">
            <p className="text-center text-xl font-bold mb-2">Xiaomi</p>
            <img
              className="rounded-lg object-cover transition duration-300 transform group-hover:scale-105"
              alt="iphone-photo"
              src="../../../public/images/xiaomi-photo.png"
            />
          </a>
        </div>

        <div className=" p-4">
          <a className="block relative group">
            <p className="text-center text-xl font-bold mb-2">Oppo</p>
            <img
              className="rounded-lg object-cover transition duration-300 transform group-hover:scale-105"
              alt="iphone-photo"
              src="../../../public/images/oppo.png"
            />
          </a>
        </div>

        <div className=" p-4">
          <a className="block relative group">
            <p className="text-center text-xl font-bold mb-2">Vivo</p>
            <img
              className="rounded-lg object-cover transition duration-300 transform group-hover:scale-105"
              alt="iphone-photo"
              src="../../../public/images/vivo-phone.png"
            />
          </a>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-8">Nie znalazłeś swojego modelu?</h3>
        <a href="tel:+48730889759">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Zadzwoń, chętnie pomożemy: +48 730 889 759
          </button>
        </a>
      </div>
    </section>
  );
};

export default PhoneTypes;
