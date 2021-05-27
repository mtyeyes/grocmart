import React from 'react';
import './badge.styl';

import { PATH } from '../../../app';

type Props = {
  badgeId: string;
  badgeDescription: string;
  isBrightBackground: boolean;
};

const Badge = ({ badgeId, badgeDescription, isBrightBackground }: Props) => {
  return (
    <li className="badge">
      <img
        alt={badgeDescription}
        src={`${PATH}images/badge-${badgeId}-${isBrightBackground ? 'bright' : 'dark'}.png`}
        className="badge__img"
        loading="lazy"
      />
    </li>
  );
};

export default Badge;
