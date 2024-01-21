import React, { useEffect, useRef, useState } from 'react';

const MainNav = () => {
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const menuRef = useRef();
  const activeHamburger = () => setIsHamburgerActive(!isHamburgerActive);

  useEffect(() => {
    console.log(isHamburgerActive);
  }, [isHamburgerActive]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsHamburgerActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="flex md:justify-between mx-auto text-xl gap-8">
      <img alt="spaceFix logo" src="/images/logo.png" className="w-1/2 md:w-1/4 md:h-auto" />
      <button
        onClick={() => {
          activeHamburger();
        }}
        className={`justify-around md:hidden ${isHamburgerActive ? 'hidden' : 'flex'} h-10 w-1/2`}
      >
        <img alt="hamburger-icon" src="../../../public/images/hamburger-icon.png" className="w-10 h-10 md:hidden" />
      </button>
      <div className={`md:w-3/4 md:block md:relative`}>
        <ul
          ref={menuRef}
          className={`md:gap-8 md:p-3 gap-4 p-2 rounded-lg md:mt-10 bg-gray-100 fixed md:relative md:w-auto mr-4 ${
            isHamburgerActive ? 'flex flex-col ' : 'hidden'
          } md:flex`}
        >
          <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
            <a href="/">Strona główna</a>
          </li>
          <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
            <a href="/offer/">Oferta</a>
          </li>
          <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
            <a href="/about/">O nas</a>
          </li>
          <li>
            <a href="tel:+48730889759" className="text-blue-500 hover:text-blue-700">
              <span className="text-lg font-bold">{isHamburgerActive ? 'Zadzwoń' : 'Zadzwoń teraz'}</span>
            </a>
          </li>
        </ul>
        <div className="flex justify-end m-3">
          <a
            className="hidden md:flex mr-2"
            href="https://www.instagram.com/spacefiix/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="instagram icon" src="/public/images/instagram.png" className="w-10 h-10 " />
          </a>
          <a
            className="mr-2 hidden md:flex"
            href="https://www.facebook.com/profile.php?id=100094392695973"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="facebook icon" src="/public/images/facebook.png" className="w-10 h-10" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
