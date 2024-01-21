import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-black mt-5 p-10">
      <div className="text-center text-white font-bold">
        <div className="text-lg">
          Poniedziałek - Piątek <span className="ml-2">9:00-19:00</span>
        </div>
        <div className="text-lg">
          Sobota <span className="ml-2">10:00-16:00</span>
        </div>
        <div className="text-lg">
          Niedziela <span className="ml-2">Nieczynne</span>
        </div>
      </div>
      <div className="text-white flex justify-around gap-2 mt-10">
        <a href="tel:+48730889759">
          <span className="flex items-center">
            <img alt="phone-icon" src="../../../public/images/phone.png" className="mr-2" />
            <span className="hidden md:block">730 889 759</span>
          </span>
        </a>

        <a
          href="https://www.google.com/maps/place/SpaceFix+-+Serwis+Apple+,+Samsung+,+Xiaomi/@52.1931235,20.8805978,17z/data=!3m1!4b1!4m6!3m5!1s0x4719357b16c39af7:0x93bd1b1e77aeba83!8m2!3d52.1931235!4d20.8831727!16s%2Fg%2F11krq7k76m?entry=ttu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="flex items-counter">
            <img alt="location-icon" src="../../../public/images/location.png" className="mr-2" />
            <span className="hidden md:block">Ul.Malinowa 16/U1 Warszawa</span>
          </span>
        </a>
        <a href="mailto:biurospacefix@gmail.com">
          <span className="flex items-center">
            <img alt="location-icon" src="../../../public/images/mail.png" className="mr-2" />
            <span className="hidden md:block">biurospacefix@gmail.com</span>
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
