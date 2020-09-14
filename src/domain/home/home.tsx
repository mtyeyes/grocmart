import React from 'react';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Map from '../../components/map/map';
import HeroSlider from '../../components/hero-slider/hero-slider';
import AboutUs from '../../components/about-us/about-us';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <HeroSlider />
      <AboutUs />
      <Map />
      <Footer />
    </>
  );
};

export default Home;