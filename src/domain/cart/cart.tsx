import React from 'react';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import UserCart from '../../components/user-cart/user-cart';

const Cart = () => {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <UserCart />
      <Footer />
    </>
  );
};

export default Cart;
