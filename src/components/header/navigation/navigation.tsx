import React, { useState } from 'react';
import './navigation.styl';

import BurgerBtn from './burger-btn/burger-btn';
import NavigationTab from './navigation-tab/navigation-tab';

export type Links = {
  [key: string]: string,
}

const Navigation: React.FC = () => {
  const [menuToggled, menuToggle] = useState(false);

  const toggleMenu = () => {
    menuToggle(!menuToggled);
  };

  const links = {
    'Home': '/',
    'About us': '/about-us',
    'Shop': '/shop',
    'Gallery': '/gallery'
  };

  return (
    <>
      <BurgerBtn btnTitle="Menu" className="navigation__menu-toggle" onClick={toggleMenu} />
      <NavigationTab showMobileMenu={menuToggled} links={links} />
    </>
  );
};

export default Navigation;