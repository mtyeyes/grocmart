import React, { useState } from 'react';
import './hero-slider.styl';

import Loader from '../loader/loader';
import HeroSliderItem from './hero-slider-item/hero-slider-item';
import EmblaCarousel from '../embla-carousel/embla-carousel';

type SlideData = {
  title: string,
  topParagraph: string,
  bottomParagraph: string,
}

const HeroSlider: React.FC = () => {
  const [sliders, setSliders] = useState([]);
  const transferData = (requestResults: { [key: string]: any }) => {
    setSliders(requestResults.sliders);
  };

  const sliderItemsMapCallback = ({title, topParagraph, bottomParagraph}: SlideData) => {
    return <HeroSliderItem key={title} title={title} topParagraph={topParagraph} bottomParagraph={bottomParagraph} />;
  };

  return (
    <section className="hero-slider">
      <Loader requests={{'sliders': '/mocks/hero-slider.json'}} transferData={transferData}>
        <EmblaCarousel uniqueClassName="hero-slider" dotsBtnEnabled={true} nextPrevBtnsEnabled={true} options={{draggable: false}}>
          {sliders.map(sliderItemsMapCallback as typeof sliderItemsMapCallback)}
        </EmblaCarousel>
      </Loader>
    </section>
  );
};

export default HeroSlider;