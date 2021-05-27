import React from 'react';
import './scroll-to-top.styl';

import Button from '../../button/button';
import Icon from '../../icon/icon';
import HiddenText from '../../hidden-text/hidden-text';

type Props = {
  isShown: boolean;
};

const ScrollToTopBtn = ({ isShown }: Props) => {
  const scrollToTop = () => {
    if (window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Button
      className={isShown ? 'scroll-to-top-btn scroll-to-top-btn--shown' : 'scroll-to-top-btn'}
      onClick={scrollToTop}
      tabIndex={-1}
    >
      <Icon iconId="up" />
      <HiddenText>Scroll to the top of the page</HiddenText>
    </Button>
  );
};

export default ScrollToTopBtn;
