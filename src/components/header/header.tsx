import React, { useState, useEffect } from 'react';
import './header.styl';

import Logo from '../logo/logo';
import Navigation from './navigation/navigation';

import ModalToggler from './modal-toggler/modal-toggler';
import Search from './search/search';
import ModalCart from './modal-cart/modal-cart';
import ScrollToTopBtn from './scroll-to-top/scroll-to-top';

const Header: React.FC = () => {
  const [isSticked, setStick] = useState(false);
  const [scrollToTopVisibility, setScrollToTopVisibility] = useState(false);

  const handleScroll = () => {
    (window.pageYOffset > 0) ? setStick(true) : setStick(false);
    (window.pageYOffset > 300) ? setScrollToTopVisibility(true) : setScrollToTopVisibility(false);
  };

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
    return ()=> { window.removeEventListener('scroll', handleScroll) };
  }, []);
  return (
    <>
      <header className={(isSticked) ? 'header header--stick' : 'header'}>
        <div className="header__wrapper">
          <Logo className="header__logo" />
          <Navigation />
          <ModalToggler parentBlockName="header" childrenBlockName="search" icon="search">
            <Search />
          </ModalToggler>
          <ModalToggler parentBlockName="header" childrenBlockName="cart" icon="basket">
            <ModalCart />
          </ModalToggler>
        </div>
      </header>
      <ScrollToTopBtn isShown={scrollToTopVisibility}/>
    </>
  );
};

export default Header;