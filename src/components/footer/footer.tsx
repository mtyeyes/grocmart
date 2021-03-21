import React from 'react';
import './footer.styl';

import Logo from '../logo/logo';
import WorkingHours from './working-hours/working-hours';
import SocialLinks from '../social-links/social-links';
import Contacts from './contacts/contacts';
import Newsletter from './newsletter/newsletter';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__container">
          <Logo className="footer__logo" />
          <WorkingHours />
          <SocialLinks>Get social</SocialLinks>
        </div>
        <div className="footer__container">
          <Contacts />
        </div>
        <div className="footer__container">
          <Newsletter />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
