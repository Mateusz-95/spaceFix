import React from 'react';
import MainNav from './MainNav.tsx';

interface NavigationProps {
  className?: string;
}
const Navigation = ({ className }: NavigationProps) => {
  return (
    <header className="max-h-48 flex justify-center top-0 left-0 right-0 z-50 p-4 shadow-md overflow-hidden">
      <MainNav></MainNav>
    </header>
  );
};

export default Navigation;
