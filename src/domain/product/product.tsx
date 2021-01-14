import React from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/header/header';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Badges from '../../components/badges/badges';
import ProductInfo from '../../components/product-info/product-info';

type ParamTypes = {
  productId: string
}

const Product: React.FC = () => {
  const { productId } = useParams<ParamTypes>();

  return (
    <>
      <Header />
      <Breadcrumbs />
      <ProductInfo productId={productId}/>
      <Badges isBrightBackground={true} />
      <Footer />
    </>
  );
};

export default Product;