import React from 'react';
import './error.styl';
import Logo from '../../components/logo/logo';
import LinkAsButton from '../../components/link-as-button/link-as-button';

const Error = () => {
  return (
    <section className="error__wrapper">
      <Logo className="logo--centered" />
      <h1 className="error__title">404</h1>
      <p className="error__description">Page not found</p>
      <LinkAsButton className="error__link" to="/" subtype="rectangular-red">
        Go to home page
      </LinkAsButton>
    </section>
  );
};

export default Error;
