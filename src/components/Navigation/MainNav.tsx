import React, { useState } from 'react';
import HamburgerButton from './hamburger-button.tsx';
import MobileMenu from './mobile-menu.tsx';

const MainNav = () => {
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const activeHamburger = () => setIsHamburgerActive(!isHamburgerActive);

  return (
    <div className="w-full xl:w-max grid grid-cols-[max-content_1fr_max-content] grid-rows-[100%] items-center text-lg xl:text-xl lg:gap-10 xl:gap-24">
      <img alt="spaceFix logo" src="/images/logo.png" className="h-full" />
      <HamburgerButton onClick={activeHamburger} className={`[grid-column:3] ${isHamburgerActive ? 'expanded' : ''}`} />

      <div className="max-xl:hidden w-full flex items-center justify-between gap-10">
        <ul className={`flex gap-8 p-3 rounded-lg relative w-auto mr-4`}>
          <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
            <a href="/">Strona główna</a>
          </li>
          <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
            <a href="/offer/">Oferta</a>
          </li>
          <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
            <a href="/about/">O nas</a>
          </li>
        </ul>
        <ul className="flex gap-4 items-center">
          <li>
            <a
              className="hidden md:flex"
              href="https://www.instagram.com/spacefiix/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="instagram icon" src="/images/instagram.png" className="w-10 h-10 " />
            </a>
          </li>
          <li>
            <a
              className="hidden md:flex"
              href="https://www.facebook.com/profile.php?id=100094392695973"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="facebook icon" src="/images/facebook.png" className="w-10 h-10" />
            </a>
          </li>
          <li>
            <a
              href="mailto:kontakt@spacefix.pl?subject=Potrzebuję%20naprawy!&body=Potrzebuję%20naprawy!%0D%0APoniżej%20podaję%20jaki%20sprzęt%20potrzebuje%20Waszej%20naprawy%20i%20co%20dokładnie%20mu%20dolega!%20:)%0D%0AZostawiam%20również%20numer%20telefonu%20pod%20który%20zadzwonicie%20z%20wyceną:"
              className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-2 md:text-lg md:px-4 transition duration-150 ease-in-out"
            >
              <img alt="mail icon" src="/images/mail.png" className="mr-2 h-6 w-6" />
              <span className="hidden md:block">Poproś o wycenę</span>
            </a>
          </li>
        </ul>
      </div>
      <a href="tel:+48730889759" className="max-xl:hidden text-blue-500 hover:text-blue-700 text-center leading-1">
        <span className="text-lg font-bold">
          Zadzwoń teraz
          <br />
          <span className="text-[1rem]">+48 730 889 759</span>
        </span>
      </a>
      <MobileMenu show={isHamburgerActive} />
    </div>
  );
};

export default MainNav;
