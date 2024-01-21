import React from 'react';

interface HamburgerButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function HamburgerButton({ className = '', onClick }: HamburgerButtonProps) {
  return (
    <button
      className={`lg:hidden flex flex-col h-12 w-12 rounded justify-center items-center cursor-pointer group ${className}`}
      aria-label="Przełącz menu"
      onClick={onClick}
    >
      <span
        aria-hidden="true"
        className="h-0.5 w-6 my-1 rounded-full bg-black transition ease transform duration-200 opacity-80 group-[.expanded]:rotate-45 group-[.expanded]:translate-y-2.5"
      ></span>
      <span
        aria-hidden="true"
        className="h-0.5 w-6 my-1 rounded-full bg-black transition ease transform duration-200 opacity-80 group-[.expanded]:opacity-0"
      ></span>
      <span
        aria-hidden="true"
        className="h-0.5 w-6 my-1 rounded-full bg-black  transition ease transform duration-200 opacity-80 group-[.expanded]:-rotate-45 group-[.expanded]:-translate-y-2.5"
      ></span>
    </button>
  );
}
