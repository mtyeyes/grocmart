import React from 'react';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Map from '../../components/map/map';
import HeroSlider from '../../components/hero-slider/hero-slider';
import AboutUs from '../../components/about-us/about-us';
import Advantages from '../../components/advantages/advantages';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <HeroSlider />
      <AboutUs />
      <Advantages />
      <Map />
      <Footer />
    </>
  );
};

export default Home;