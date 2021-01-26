import React, { useState } from 'react';
import './feedback-slider.styl';

import Loader from '../loader/loader';
import FeedbackItem, { Props as SlideData } from './feedback-item/feedback-item';
import EmblaCarousel from '../embla-carousel/embla-carousel';

const FeedbackSlider: React.FC = () => {
  const [slides, setSlides] = useState([] as SlideData[]);
  const transferData = (requestResults: { slides: SlideData[] }) => {
    setSlides(requestResults.slides);
  };

  const sliderItemsMapCallback = ({review, userName, userId}: SlideData) => {
    return <FeedbackItem key={userId} review={review} userName={userName} userId={userId} />;
  };

  return (
    <section className="feedback-slider">
      <h2 className="feedback-slider__heading">Latest testimonials</h2>
      <b className="feedback-slider__exclamation">Our clients</b>
      <div className="feedback-slider__wrapper">
        <Loader requests={{'slides': '/mocks/feedback.json'}} transferData={transferData}>
          <EmblaCarousel uniqueClassName="feedback-slider" dotsBtnEnabled={true} nextPrevBtnsEnabled={true} options={{draggable: true, loop: true}}>
            {slides.map(sliderItemsMapCallback)}
          </EmblaCarousel>
        </Loader>
      </div>
    </section>
  );
};

export default FeedbackSlider;