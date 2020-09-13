import React from 'react';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Map from '../../components/map/map';
import HeroSlider from '../../components/hero-slider/hero-slider';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <HeroSlider />
      <div style={{height: '120vh', backgroundColor: '#606060'}}/>
      <Map />
      <Footer />
    </>
  );
};

export default Home;