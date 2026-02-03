import React, { useState } from 'react';
import HamburgerButton from './hamburger-button.tsx';
import MobileMenu from './mobile-menu.tsx';

const MainNav = () => {
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const activeHamburger = () => setIsHamburgerActive(!isHamburgerActive);

  return (
    <div className="w-full nav:w-max grid grid-cols-[minmax(auto,max-content)_1fr_minmax(auto,max-content)] grid-rows-[100%] items-center text-base lg:text-lg xl:text-xl nav:gap-2 lg:gap-6 xl:gap-16">
      <a href="/" className="h-full max-w-[120px] nav:max-w-none">
        <img alt="spaceFix logo" src="/images/logo.png" className="h-full w-auto object-contain" />
      </a>
      <HamburgerButton onClick={activeHamburger} className={`[grid-column:3] ${isHamburgerActive ? 'expanded' : ''}`} />

      <div className="max-nav:hidden w-full flex items-center justify-between gap-2 lg:gap-4 xl:gap-8">
        <ul className={`flex gap-2 lg:gap-4 xl:gap-8 p-3 rounded-lg relative w-auto flex-shrink`}>
          <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400 whitespace-nowrap">
            <a href="/">Strona główna</a>
          </li>
          <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400 whitespace-nowrap">
            <a href="/offer/">Oferta</a>
          </li>
          <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400 whitespace-nowrap">
            <a href="/about/">O nas</a>
          </li>
          <li className="relative group text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
            <button type="button" className="flex items-center gap-1 pb-1 whitespace-nowrap" aria-expanded="false" aria-haspopup="true">
              Usługi naprawy
              <svg className="w-4 h-4 flex-shrink-0 transition group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[280px] bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <li>
                <a href="/wymiana-szybki/" className="block px-4 py-2 hover:bg-gray-100 text-zinc-800 whitespace-nowrap">Wymiana szybki</a>
              </li>
              <li>
                <a href="/wymiana-wyswietlacza/" className="block px-4 py-2 hover:bg-gray-100 text-zinc-800 whitespace-nowrap">Wymiana wyświetlacza</a>
              </li>
              <li>
                <a href="/wymiana-baterii/" className="block px-4 py-2 hover:bg-gray-100 text-zinc-800 whitespace-nowrap">Wymiana baterii</a>
              </li>
              <li>
                <a href="/wymiana-tylnej-szyby/" className="block px-4 py-2 hover:bg-gray-100 text-zinc-800 whitespace-nowrap">Wymiana tylnej szyby</a>
              </li>
              <li>
                <a href="/naprawa-po-zalaniu/" className="block px-4 py-2 hover:bg-gray-100 text-zinc-800 whitespace-nowrap">Naprawa po zalaniu</a>
              </li>
            </ul>
          </li>
        </ul>
        <ul className="flex gap-2 lg:gap-4 items-center flex-shrink-0">
          <li className="flex-shrink-0">
            <a
              className="flex"
              href="https://www.instagram.com/spacefiix/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="instagram icon" src="/images/instagram.png" className="w-8 h-8 lg:w-10 lg:h-10 flex-shrink-0" />
            </a>
          </li>
          <li className="flex-shrink-0">
            <a
              className="flex"
              href="https://www.facebook.com/profile.php?id=100094392695973"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="facebook icon" src="/images/facebook.png" className="w-8 h-8 lg:w-10 lg:h-10 flex-shrink-0" />
            </a>
          </li>
          <li className="flex-shrink-0">
            <a
              href="mailto:kontakt@spacefix.pl?subject=Potrzebuję%20naprawy!&body=Potrzebuję%20naprawy!%0D%0APoniżej%20podaję%20jaki%20sprzęt%20potrzebuje%20Waszej%20naprawy%20i%20co%20dokładnie%20mu%20dolega!%20:)%0D%0AZostawiam%20również%20numer%20telefonu%20pod%20który%20zadzwonicie%20z%20wyceną:"
              className="flex items-center justify-center px-2 lg:px-4 py-2 border border-transparent text-sm lg:text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out whitespace-nowrap"
            >
              <img alt="mail icon" src="/images/mail.png" className="mr-1 lg:mr-2 h-5 w-5 lg:h-6 lg:w-6 flex-shrink-0" />
              <span>Poproś o wycenę</span>
            </a>
          </li>
        </ul>
      </div>
      <a href="tel:+48730889759" className="max-nav:hidden text-blue-500 hover:text-blue-700 text-center leading-1 min-w-0">
        <span className="text-xs lg:text-sm xl:text-lg font-bold whitespace-nowrap">
          Zadzwoń teraz
          <br />
          <span className="text-[0.65rem] lg:text-xs xl:text-[1rem]">+48 730 889 759</span>
        </span>
      </a>
      <MobileMenu show={isHamburgerActive} />
    </div>
  );
};

export default MainNav;
