import React from 'react';
import './social.styl';
import SocialLink, { Props as SocialLinkType } from './social-link/social-link';

const Social: React.FC = () => {
  const socialLinks: SocialLinkType[] = [
    {
      linkTitle: 'Facebook',
      link: 'https://www.facebook.com',
      iconId: 'facebook',
    },
    {
      linkTitle: 'Twitter',
      link: 'https://twitter.com',
      iconId: 'twitter',
    },
    {
      linkTitle: 'Instagram',
      link: 'https://www.instagram.com',
      iconId: 'instagram',
    },
    {
      linkTitle: 'Google Plus',
      link: 'https://www.google.com',
      iconId: 'gplus',
    }
  ];

  const socialLinksMapCallback = ({linkTitle, link, iconId}: SocialLinkType) => {
    return <SocialLink linkTitle={linkTitle} key={iconId} link={link} iconId={iconId} />;
  };

  return (
    <div className="social-link__container">
      <h4 className="social-link__heading">Get social</h4>
      <ul className="social-link__list">
        {socialLinks.map(socialLinksMapCallback as typeof socialLinksMapCallback)}
      </ul>
    </div>
  );
};

export default Social;