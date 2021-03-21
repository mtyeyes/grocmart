import React from 'react';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Map from '../../components/map/map';
import HeroSlider from '../../components/hero-slider/hero-slider';
import AboutUs from '../../components/about-us/about-us';
import Advantages from '../../components/advantages/advantages';
import LatestArrivals from '../../components/latest-arrivals/latest-arrivals';
import FeedbackSlider from '../../components/feedback-slider/feedback-slider';
import Badges from '../../components/badges/badges';
import FaqAndSpecialOffers from '../../components/faq-and-special-offers/faq-and-special-offers';

const Home = () => {
  return (
    <>
      <Header />
      <HeroSlider />
      <AboutUs />
      <Advantages />
      <LatestArrivals />
      <FeedbackSlider />
      <Badges isBrightBackground={false} />
      <FaqAndSpecialOffers />
      <Map />
      <Footer />
    </>
  );
};

export default Home;
