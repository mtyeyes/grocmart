import React from 'react';
import './social-link.styl';

import HiddenText from '../../hidden-text/hidden-text';
import Icon, { IconId } from '../../icon/icon';

export type Props = {
  linkTitle: string;
  link: string;
  iconId: IconId;
};

const SocialLink = ({ linkTitle, link, iconId }: Props) => {
  return (
    <li className="social-link__item">
      <a
        target="_blank"
        rel="noreferrer"
        className="social-link__link"
        href={link}
      >
        <Icon className="social-link__icon" iconId={iconId}></Icon>
        <HiddenText>{linkTitle}</HiddenText>
      </a>
    </li>
  );
};

export default SocialLink;
