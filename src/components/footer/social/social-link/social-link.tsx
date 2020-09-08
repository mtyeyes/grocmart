import React from 'react';
import './social-link.styl';

import HiddenText from '../../../hidden-text/hidden-text';
import Icon, {IconId} from '../../../icon/icon';

export type Props = {
  linkTitle: string,
  link: string,
  iconId: IconId
}

const SocialLink: React.FC<Props> = ({ linkTitle, link, iconId }) => {
  return (
    <li className="social-link__item">
      <a target="_blank" rel="noreferrer" href={link}>
        <Icon className="social-link__icon" iconId={iconId}></Icon>
        <HiddenText>{linkTitle}</HiddenText>
      </a>
    </li>
  );
};

export default SocialLink;