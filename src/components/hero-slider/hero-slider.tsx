import React, { useState } from 'react';
import './hero-slider.styl';

import Loader from '../loader/loader';
import HeroSliderItem from './hero-slider-item/hero-slider-item';
import EmblaCarousel from '../embla-carousel/embla-carousel';

interface SlideData {
  title: string;
  topParagraph: string;
  bottomParagraph: string;
  imageBackgroundColor: string;
}

const HeroSlider = () => {
  const [slides, setSlides] = useState([] as SlideData[]);

  const getLoadedData = (requestResults: { 'hero-slider': SlideData[] }) => {
    setSlides(requestResults['hero-slider']);
  };

  const sliderItemsMapCallback = ({ title, topParagraph, bottomParagraph, imageBackgroundColor }: SlideData) => {
    return (
      <HeroSliderItem
        key={title}
        title={title}
        topParagraph={topParagraph}
        bottomParagraph={bottomParagraph}
        imageBackgroundColor={imageBackgroundColor}
      />
    );
  };

  return (
    <section className="hero-slider">
      <Loader requests={{ resourceRequests: ['hero-slider'] }} transferRequestedResources={getLoadedData}>
        <EmblaCarousel
          uniqueClassName="hero-slider"
          dotsBtnEnabled={true}
          nextPrevBtnsEnabled={true}
          options={{ draggable: false }}
        >
          {slides.map(sliderItemsMapCallback)}
        </EmblaCarousel>
      </Loader>
    </section>
  );
};

export default HeroSlider;
