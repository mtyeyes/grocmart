import React from 'react';
import './hero-slider-item.styl';

import LinkAsButton from '../../link-as-button/link-as-button';

import { PATH } from '../../../app';

type Props = {
  title: string;
  topParagraph: string;
  bottomParagraph: string;
  imageBackgroundColor: string;
};

const HeroSliderItem = ({
  title,
  topParagraph,
  bottomParagraph,
  imageBackgroundColor,
}: Props) => {
  const style = {
    backgroundImage: `url(${PATH}images/hero-slider-${title
      .replace(/\s/g, '')
      .toLowerCase()}.jpg)`,
    backgroundColor: imageBackgroundColor,
  };

  return (
    <li className="hero-slider__item hero-slider-item" style={style}>
      <div className="hero-slider-item__container">
        <p className="hero-slider-item__paragraph">{topParagraph}</p>
        <h2 className="hero-slider-item__title">{title}</h2>
        <p className="hero-slider-item__paragraph">{bottomParagraph}</p>
        <LinkAsButton
          className="hero-slider-item__link"
          to="/shop"
          subtype="rectangular-red"
        >
          Shop now
        </LinkAsButton>
      </div>
    </li>
  );
};

export default HeroSliderItem;
