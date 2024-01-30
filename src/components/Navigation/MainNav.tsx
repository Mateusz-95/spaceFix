import React, { useEffect, useRef, useState } from 'react';
import HamburgerButton from './hamburger-button.tsx';
import MobileMenu from './mobile-menu.tsx';

const MainNav = () => {
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const activeHamburger = () => setIsHamburgerActive(!isHamburgerActive);

  return (
    <div className="w-full lg:w-max grid grid-cols-[max-content_1fr_max-content] grid-rows-[100%] items-center text-lg xl:text-xl lg:gap-10 xl:gap-24">
      <img alt="spaceFix logo" src="/images/logo.png" className="h-full" />
      <HamburgerButton onClick={activeHamburger} className={`[grid-column:3] ${isHamburgerActive ? 'expanded' : ''}`} />

      <div className="max-lg:hidden w-full flex items-center justify-between gap-10">
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
        <ul className="flex gap-4">
          <li>
            <a
              className="hidden md:flex mr-2"
              href="https://www.instagram.com/spacefiix/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="instagram icon" src="/images/instagram.png" className="w-10 h-10 " />
            </a>
          </li>
          <li>
            <a
              className="mr-2 hidden md:flex"
              href="https://www.facebook.com/profile.php?id=100094392695973"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="facebook icon" src="/images/facebook.png" className="w-10 h-10" />
            </a>
          </li>
        </ul>
      </div>
      <a href="tel:+48730889759" className="max-lg:hidden text-blue-500 hover:text-blue-700 text-center leading-1">
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
