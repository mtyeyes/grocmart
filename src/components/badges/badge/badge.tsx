import React from 'react';
import './badge.styl';

import { PATH } from '../../../app';

type Props = {
  badgeId: string,
  badgeDescription: string,
  isBrightBackground: boolean,
}

const Badge: React.FC<Props> = ({ badgeId, badgeDescription, isBrightBackground }) => {
  return (
    <li className="badge">
      <img alt={badgeDescription} src={`${PATH}images/badge-${badgeId}-${(isBrightBackground) ? 'bright' : 'dark'}.png`} className="badge__img" />
    </li>
  );
};

export default Badge;