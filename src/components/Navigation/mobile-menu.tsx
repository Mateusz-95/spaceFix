import React from 'react';

interface MobileMenuProps {
  show?: boolean;
}

export default function MobileMenu({ show }: MobileMenuProps) {
  return (
    <div
      className={`lg:hidden fixed top-[var(--header-height)] w-full h-[calc(100vh-var(--header-height))] transition-all duration-500 bg-white flex flex-col justify-center gap-20 text-[2rem] ${
        show ? 'left-0' : 'left-full'
      }`}
    >
      <ul className="text-center flex flex-col gap-16">
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
      <a href="tel:+48730889759" className="text-blue-500 hover:text-blue-700 text-center leading-1">
        <span className="text-lg font-bold">
          Zadzwoń
          <br />
          <span className="text-[1rem]">+48 730 889 759</span>
        </span>
      </a>
      <ul className="flex gap-4 w-full justify-center">
        <li>
          <a
            href="https://www.instagram.com/spacefiix/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="instagram icon" src="/public/images/instagram.png" className="w-10 h-10 "/>
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/profile.php?id=100094392695973"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="facebook icon" src="/public/images/facebook.png" className="w-10 h-10"/>
          </a>
        </li>
      </ul>
    </div>
  );
}
