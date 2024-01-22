import React from 'react';
import MainNav from './MainNav.tsx';

interface NavigationProps {
  className?: string;
}
const Navigation = ({ className }: NavigationProps) => {
  return (
    <header className="flex justify-center top-0 left-0 w-full z-50 h-[var(--header-height)] fixed bg-white shadow-md px-10">
      <MainNav></MainNav>
    </header>
  );
};

export default Navigation;
