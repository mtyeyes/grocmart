import React from 'react';
import './footer.styl';

import Logo from '../logo/logo';
import WorkingHours from './working-hours/working-hours';
import Social from './social/social';
import Contacts from './contacts/contacts';
import Newsletter from './newsletter/newsletter';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__container">
          <Logo className="footer__logo" />
          <WorkingHours />
          <Social />
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