import React from 'react';
import './contacts.styl';

import ContactItem, { Props as ContactItemInfo } from './contactItem/contactItem';

const Contacts: React.FC = () => {
  const contactsItems: ContactItemInfo[] = [
    {
      contactText: '523 Sylvan Ave, 5th Floor Mountain View, CA 94041 USA',
      contactLink: 'https://goo.gl/maps/YrLW2JWLVZYM4zQw8',
      contactIcon: 'location',
    },
    {
      contactText: '+1 (844) 123 456 78',
      contactLink: 'tel:+1 (844) 123 456 78',
      contactIcon: 'phone',
    },
    {
      contactText: 'demo@example.dev',
      contactLink: 'mailto:demo@example.dev',
      contactIcon: 'mail'
    }
  ];

  const contactsMapCallback = ({contactText, contactLink, contactIcon}: ContactItemInfo) => {
    return <ContactItem contactText={contactText} key={contactIcon} contactLink={contactLink} contactIcon={contactIcon} />;
  };

  return (
    <>
      <h3 className="contacts__heading">Contacts</h3>
      <ul className="contacts__list">
        {contactsItems.map(contactsMapCallback as typeof contactsMapCallback)}
      </ul>
    </>
  );
};

export default Contacts;