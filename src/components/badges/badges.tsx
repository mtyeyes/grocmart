import React from 'react';
import './badges.styl';

import Badge from './badge/badge';

type Props = {
  isBrightBackground: boolean,
}

type BadgesList = {
  [key: string]: string,
}

const Badges: React.FC<Props> = ({ isBrightBackground }) => {
  const badgesList: BadgesList = {
    organic: 'Some of our products are organic',
    local: 'All products produced locally',
    product: 'Some products in our store are 100% organic',
  };

  const badgesMapCallback = (badgeId: string) => {
    return(
      <Badge key={badgeId} badgeId={badgeId} badgeDescription={badgesList[badgeId]} isBrightBackground={isBrightBackground}/>
    );
  };


  return (
    <section className={`badges ${(isBrightBackground) ? 'badges--bright' : 'badges--dark'}`}>
      <ul className="badges__list">
        {Object.keys(badgesList).map(badgesMapCallback as typeof badgesMapCallback)}
      </ul>
    </section>
  );
};

export default Badges;