import React from 'react';
import './icon.styl';

type Props = {
  iconId: IconId;
  className?: string;
};

export type IconId =
  | 'phone'
  | 'location'
  | 'search'
  | 'basket'
  | 'up'
  | 'right'
  | 'left'
  | 'ok'
  | 'right-open'
  | 'twitter'
  | 'facebook'
  | 'gplus'
  | 'mail'
  | 'instagram'
  | 'paperplane'
  | 'thumbs-up'
  | 'clock'
  | 'minus'
  | 'plus'
  | 'truck'
  | 'wallet'
  | 'star'
  | 'star-half'
  | 'star-empty';

const Icon = ({ iconId, className }: Props) => {
  const classNames = className ? `icon-${iconId} icon ${className}` : `icon-${iconId} icon`;

  return <span className={classNames} />;
};

export default Icon;
