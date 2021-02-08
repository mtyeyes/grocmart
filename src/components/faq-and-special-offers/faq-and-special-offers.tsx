import React from 'react';
import './faq-and-special-offers.styl';

import SpecialOffers from './special-offers/special-offers';
import Faq from './faq/faq';

const FaqAndSpecialOffers = () => {

  return (
    <section className="faq-and-specials">
      <SpecialOffers />
      <Faq />
    </section>
  );
};

export default FaqAndSpecialOffers;