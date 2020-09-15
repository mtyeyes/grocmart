import React from 'react';
import './icon.styl';

type Props = {
  iconId: IconId
  className?: string;
}

export type IconId = 'phone' | 'location' | 'search' | 'basket' | 'up' | 'right' | 'left' | 'ok' | 'right-open' | 'twitter' | 'facebook' | 'gplus' | 'mail' | 'instagram' | 'paperplane' | 'olive' | 'clock' | 'minus' | 'plus' | 'truck' | 'wallet';

const Icon: React.FC<Props> = ({iconId, className}) => {
  const classNames = (className) ? `icon-${iconId} icon ${className}` : `icon-${iconId} icon`;

  return <span className={classNames} />;
};

export default Icon;