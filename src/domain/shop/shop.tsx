import React from 'react';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Catalog from '../../components/catalog/catalog';

const Shop: React.FC = () => {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <Catalog />
      <Footer />
    </>
  );
};

export default Shop;