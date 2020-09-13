import React from 'react';
import './navigation-tab.styl';

import NavigationLink from './navigation-link/navigation-link';

type Props = {
  links: object,
  showMobileMenu?: boolean,
}

const NavigationTab: React.FC<Props> = ({ links, showMobileMenu }) => {
  const classNames = (showMobileMenu) ? 'navigation__wrapper navigation__wrapper--show' : 'navigation__wrapper';
  const linksMapCallback = (linkKey: keyof typeof links) => {return <NavigationLink key={linkKey} linkTitle={linkKey} linkPath={links[linkKey]}></NavigationLink>};
  return (
    <nav className={classNames}>
      <ul className="navigation__list">
        {Object.keys(links).map(linksMapCallback as any)}
      </ul>
    </nav>
  );
};

export default NavigationTab;