import React from 'react';
const MainNav = () => {
  return (
    <div className="flex justify-between mx-auto text-xl gap-8">
      <img alt="spaceFix logo" src="../../../public/images/logo.png" className="w-64 h-56" />
      <div>
        <ul className="flex gap-8 p-3 rounded-lg mt-10 bg-gray-100">
          <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
            <a href="/">Strona główna</a>
          </li>
          <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
            <a href="/oferta">Oferta</a>
          </li>
          <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
            <a href="/about">O nas</a>
          </li>
          <li className="text-zinc-800 hover:text-zinc-600 active:text-zinc-400">
            <a href="/kontakt">Kontakt</a>
          </li>
          <li>
            <a href="tel:+48730889759" className="text-blue-500 hover:text-blue-700">
              <span className="text-lg font-bold">Zadzwoń teraz:</span> +48 730 889 759
            </a>
          </li>
        </ul>
        <div className="flex justify-end m-3">
          <a className="mr-2" href="https://www.instagram.com/spacefiix/" target="_blank" rel="noopener noreferrer">
            <img alt="instagram icon" src="../../../public/images/instagram.png" className="w-10 h-10 " />
          </a>
          <a
            className="mr-2"
            href="https://www.facebook.com/profile.php?id=100094392695973"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="facebook icon" src="../../../public/images/facebook.png" className="w-10 h-10" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
