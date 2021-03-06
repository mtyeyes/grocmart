import React from 'react';
import './badges.styl';

import Badge from './badge/badge';

interface Props {
  isBrightBackground: boolean;
}

interface BadgesList {
  [key: string]: string;
}

const Badges = ({ isBrightBackground }: Props) => {
  const badgesList: BadgesList = {
    organic: 'Some of our products are organic',
    local: 'All products produced locally',
    product: 'Some products in our store are 100% organic',
  };

  const badgesMapCallback = (badgeId: string) => {
    return (
      <Badge key={badgeId} badgeId={badgeId} badgeDescription={badgesList[badgeId]} isBrightBackground={isBrightBackground} />
    );
  };

  return (
    <section className={`badges ${isBrightBackground ? 'badges--bright' : 'badges--dark'}`}>
      <ul className="badges__list">{Object.keys(badgesList).map(badgesMapCallback)}</ul>
    </section>
  );
};

export default Badges;
