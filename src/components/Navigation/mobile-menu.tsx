import React from 'react';

interface MobileMenuProps {
  show?: boolean;
}

export default function MobileMenu({ show }: MobileMenuProps) {
  return (
    <div
      className={`nav:hidden fixed top-[var(--header-height)] w-full h-[calc(100vh-var(--header-height))] transition-all duration-500 bg-white flex flex-col justify-start items-center gap-8 sm:gap-12 text-xl sm:text-2xl py-8 overflow-y-auto ${
        show ? 'left-0' : 'left-full'
      }`}
    >
      <ul className="text-center flex flex-col gap-6 sm:gap-8">
        <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
          <a href="/">Strona główna</a>
        </li>
        <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
          <a href="/offer/">Oferta</a>
        </li>
        <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
          <a href="/about/">O nas</a>
        </li>
        <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
          <a href="/wymiana-szybki/">Wymiana szybki</a>
        </li>
        <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
          <a href="/wymiana-wyswietlacza/">Wymiana wyświetlacza</a>
        </li>
        <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
          <a href="/wymiana-baterii/">Wymiana baterii</a>
        </li>
        <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
          <a href="/wymiana-tylnej-szyby/">Wymiana tylnej szyby</a>
        </li>
        <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
          <a href="/naprawa-po-zalaniu/">Naprawa po zalaniu</a>
        </li>
      </ul>
      <a href="tel:+48730889759" className="text-blue-500 hover:text-blue-700 text-center leading-1">
        <span className="text-lg font-bold">
          Zadzwoń
          <br />
          <span className="text-[1rem]">+48 730 889 759</span>
        </span>
      </a>
      <a
        href="mailto:kontakt@spacefix.pl?subject=Potrzebuję%20naprawy!&body=Potrzebuję%20naprawy!%0D%0APoniżej%20podaję%20jaki%20sprzęt%20potrzebuje%20Waszej%20naprawy%20i%20co%20dokładnie%20mu%20dolega!%20:)%0D%0AZostawiam%20również%20numer%20telefonu%20pod%20który%20zadzwonicie%20z%20wyceną:"
        className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-2 md:text-lg max-md:ml-4 max-md:mr-4 md:px-4 transition duration-150 ease-in-out"
      >
        <img alt="mail icon" src="/images/mail.png" className="mr-2 h-6 w-6" />
        <span className="md:block">Poproś o wycenę</span>
      </a>
      <ul className="flex gap-4 w-full justify-center">
        <li>
          <a href="https://www.instagram.com/spacefix_repair/" target="_blank" rel="noopener noreferrer">
            <img alt="instagram icon" src="/images/instagram.png" className="w-10 h-10 " />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/profile.php?id=100094392695973" target="_blank" rel="noopener noreferrer">
            <img alt="facebook icon" src="/images/facebook.png" className="w-10 h-10" />
          </a>
        </li>
      </ul>
    </div>
  );
}
