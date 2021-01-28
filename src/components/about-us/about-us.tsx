import React from 'react';
import './about-us.styl';

import image from '../../resources/images/about.webp';
import signatureImage from '../../resources/images/about-signature.png';

const AboutUs: React.FC = () => {
  return (
    <section className="about-us">
      <img className="about-us__image" src={image} alt="Juicy fruits and crunchy vegetables" />
      <div className="about-us__container">
        <p className="about-us__hand-written">A few words about our store</p>
        <h2 className="about-us__title">About us</h2>
        <p className="about-us__paragraph">Grocmart is a family-owned grocery store that has been offering quality products for your everyday life since 1999, while also providing superior service and competitive prices.</p>
        <div className="about-us__bottom-wrapper">
          <p className="about-us__name">Sam Williams</p>
          <p className="about-us__position">CEO, Founder</p>
          <img className="about-us__signature" src={signatureImage} alt="Signature" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;