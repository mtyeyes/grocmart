import React, { useState } from 'react';
import './feedback-slider.styl';

import Loader from '../loader/loader';
import FeedbackItem, {
  Props as SlideData,
} from './feedback-item/feedback-item';
import EmblaCarousel from '../embla-carousel/embla-carousel';
import ScrollAnimation from 'react-animate-on-scroll';

const FeedbackSlider = () => {
  const [slides, setSlides] = useState([] as SlideData[]);

  const getLoadedData = (requestResults: { feedback: SlideData[] }) => {
    setSlides(requestResults.feedback);
  };

  const sliderItemsMapCallback = ({ review, userName, userId }: SlideData) => {
    return (
      <FeedbackItem
        key={userId}
        review={review}
        userName={userName}
        userId={userId}
      />
    );
  };

  return (
    <section className="feedback-slider">
      <Loader
        requests={{ resourceRequests: ['feedback'] }}
        transferRequestedResources={getLoadedData}
      >
        <ScrollAnimation animateIn="fade-in-from-right" animateOnce={true}>
          <h2 className="feedback-slider__heading">Latest testimonials</h2>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fade-in-from-left" animateOnce={true}>
          <b className="feedback-slider__exclamation">Our clients</b>
        </ScrollAnimation>
        <div className="feedback-slider__wrapper">
          <EmblaCarousel
            uniqueClassName="feedback-slider"
            dotsBtnEnabled={true}
            nextPrevBtnsEnabled={true}
            autoplaySpeed={4300}
            options={{ draggable: true, loop: true }}
          >
            {slides.map(sliderItemsMapCallback)}
          </EmblaCarousel>
        </div>
      </Loader>
    </section>
  );
};

export default FeedbackSlider;
