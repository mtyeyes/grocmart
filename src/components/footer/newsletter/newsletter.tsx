import React from 'react';
import './newsletter.styl';

import HiddenText from '../../hidden-text/hidden-text';
import Icon from '../../icon/icon';
import PreventDefaultAndShowAlert from '../../prevent-default-and-show-alert/prevent-default-and-show-alert';

const Newsletter = () => {

  const formChildrens = (
    <>
      <label htmlFor="email-input" className="visually-hidden">Enter your e-mail</label>
      <input className="newsletter__email-input" type="email" name="mail" id="email-input" placeholder="Enter your e-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" maxLength={25} required />
      <button type="submit" className="newsletter__submit-btn">
        <HiddenText>Submit e-mail</HiddenText>
        <Icon className="newsletter__submit-icon" iconId="paperplane"/>
      </button>
    </>
  );

  const blockedForm = PreventDefaultAndShowAlert({
    component: <form className="newsletter__form" action="/newsletter-signup" method="post">{formChildrens}</form>,
    eventType: 'onSubmit',
    alertMessage: 'You are subscribed to our newsletter… not'
  });

  return (
    <>
      <h3 className="newsletter__heading">Newsletter</h3>
      <p className="newsletter__paragraph">Subscribe to our newsletter to receive weekly news, updates, special offers, and exclusive discounts.</p>
      {blockedForm}
    </>
  );
};

export default Newsletter;