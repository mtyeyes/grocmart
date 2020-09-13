import React from 'react';
import './contactItem.styl';

import Icon, {IconId} from '../../../icon/icon';

export type Props = {
  contactIcon: IconId,
  contactLink: string,
  contactText: string,
}

const ContactItem: React.FC<Props> = ({ contactText, contactLink, contactIcon }) => {
  return (
    <li className="contacts__item contact-item">
      <Icon className="contact-item__icon" iconId={contactIcon}/>
      <a className="contact-item__link" href={contactLink}>{contactText}</a>
    </li>
  );
};

export default ContactItem;