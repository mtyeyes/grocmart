import React from 'react';
import './hero-slider-item.styl';

import LinkAsButton from '../../link-as-button/link-as-button';

type Props = {
  title: string,
  topParagraph: string,
  bottomParagraph: string,
}

const HeroSliderItem: React.FC<Props> = ({ title, topParagraph, bottomParagraph}) => {
  const style = {backgroundImage: `url(/images/hero-slider-${title.replace(/\s/g, '').toLowerCase()}.jpg)`};

  return (
    <li className="hero-slider__item hero-slider-item" style={style}>
      <div className="hero-slider-item__container">
        <p className="hero-slider-item__paragraph">{topParagraph}</p>
        <h2 className="hero-slider-item__title">{title}</h2>
        <p className="hero-slider-item__paragraph">{bottomParagraph}</p>
        <LinkAsButton className="hero-slider-item__link" to="/shop" subtype="rectangular-red">Shop now</LinkAsButton>
      </div>
    </li>
  );
};

export default HeroSliderItem;