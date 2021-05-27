import React from 'react';
import { NavLink } from 'react-router-dom';
import './logo.styl';

import logoImage from '../../resources/images/logo.png';

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  const classNames = className ? `logo ${className}` : 'logo';
  return (
    <NavLink to="/" className={classNames} exact activeClassName="logo--selected">
      <img alt="Grocmart logo" width="249" height="52" src={logoImage} loading="lazy" />
    </NavLink>
  );
};

export default Logo;
