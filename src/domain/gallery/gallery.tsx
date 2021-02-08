import React from 'react';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import MasonryGallery from '../../components/masonry-gallery/masonry-gallery';

const Gallery = () => {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <MasonryGallery />
      <Footer />
    </>
  );
};

export default Gallery;