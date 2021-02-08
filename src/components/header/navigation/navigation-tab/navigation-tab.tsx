import React from 'react';
import './navigation-tab.styl';

import NavigationLink from './navigation-link/navigation-link';
import { Links } from '../navigation';

type Props = {
  links: Links,
  showMobileMenu?: boolean,
}

const NavigationTab = ({ links, showMobileMenu }: Props) => {
  const classNames = (showMobileMenu) ? 'navigation__wrapper navigation__wrapper--show' : 'navigation__wrapper';

  const linksMapCallback = (linkKey: string) => {return <NavigationLink key={linkKey} linkTitle={linkKey} linkPath={links[linkKey]}></NavigationLink>};

  return (
    <nav className={classNames} role="navigation" aria-label="Site Navigation">
      <ul className="navigation__list">
        {Object.keys(links).map(linksMapCallback)}
      </ul>
    </nav>
  );
};

export default NavigationTab;