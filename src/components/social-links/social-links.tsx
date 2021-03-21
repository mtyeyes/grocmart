import React, { ReactNode } from 'react';
import './social-links.styl';

import SocialLink, { Props as SocialLinkType } from './social-link/social-link';

type Props = {
  children: ReactNode;
};

const SocialLinks = ({ children }: Props) => {
  const links: SocialLinkType[] = [
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
    },
  ];

  const linksMapCallback = ({ linkTitle, link, iconId }: SocialLinkType) => {
    return (
      <SocialLink
        linkTitle={linkTitle}
        key={iconId}
        link={link}
        iconId={iconId}
      />
    );
  };

  return (
    <div className="social-link__container">
      <h4 className="social-link__heading">{children}</h4>
      <ul className="social-link__list">{links.map(linksMapCallback)}</ul>
    </div>
  );
};

export default SocialLinks;
