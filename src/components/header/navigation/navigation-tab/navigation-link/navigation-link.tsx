import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation-link.styl';

type Props = {
  linkTitle: string,
  linkPath: string
}

const NavigationLink: React.FC<Props> = ({ linkTitle, linkPath }) => {
  return (
    <li className="navigation__item">
      <NavLink className="navigation__link" exact activeClassName="navigation__link--selected" to={linkPath}>{linkTitle}</NavLink>
    </li>
  );
};

export default NavigationLink;