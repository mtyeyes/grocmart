import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import './header.styl';

import Logo from '../logo/logo';
import Navigation from './navigation/navigation';
import ModalToggler from './modal-toggler/modal-toggler';
import Search from './search/search';
import ModalCart from './modal-cart/modal-cart';
import ScrollToTopBtn from './scroll-to-top/scroll-to-top';
import FloatingText from '../floating-text/floating-text';

import { AppState } from '../../store/index';

const Header = () => {
  const [isSticked, setStick] = useState(false);
  const [scrollToTopVisibility, setScrollToTopVisibility] = useState(false);

  const cartState = useSelector(((state: AppState) => state.cart), shallowEqual);
  const itemsInCart = Object.keys(cartState).length;
  const floatingNumberOfItems = <FloatingText positionStyle={{top: -5, right: -12, width: 20}} valueToTriggerAnimation={itemsInCart} >{(itemsInCart <= 9) ? itemsInCart : '9+'}</FloatingText>;

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
          <ModalToggler parentBlockName="header" childrenBlockName="search" icon="search" render={switchModalVisibility => (
            <Search switchModalVisibility={switchModalVisibility}/>
          )} />
          <ModalToggler parentBlockName="header" childrenBlockName="cart" icon="basket" btnChildrenElement={(itemsInCart) ? floatingNumberOfItems : undefined}
            render={switchModalVisibility => (
              <ModalCart switchModalVisibility={switchModalVisibility} />
            )}
          />
        </div>
      </header>
      <div className="header__phantom" />
      <ScrollToTopBtn isShown={scrollToTopVisibility}/>
    </>
  );
};

export default Header;