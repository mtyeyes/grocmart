import React, { useState, useEffect, useCallback, SetStateAction } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import './embla-carousel.styl';

import EmblaButton from './embla-button/embla-button';
import useRecursiveTimeout from '../../hooks/use-recursive-timeout';
import EmblaDotButton from './embla-dot-btn/embla-dot-btn';

type Props = {
  uniqueClassName: string,
  nextPrevBtnsEnabled: boolean,
  dotsBtnEnabled: boolean,
  options?: Parameters<typeof useEmblaCarousel>[0]
}

const EmblaCarousel: React.FC<Props> = ({ uniqueClassName, options, nextPrevBtnsEnabled, dotsBtnEnabled, children }) => {
  const [viewportRef, embla] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const autoplay = useCallback(() => {
    if (!embla) return;
    if (embla.canScrollNext()) {
      embla.scrollNext();
    } else {
      embla.scrollTo(0);
    }
  }, [embla]);

  const { play, stop } = useRecursiveTimeout(autoplay, 4000);

  useEffect(() => {
    play();
  }, [play]);

  const scrollNext = useCallback(() => {
    if (!embla) return;
    embla.scrollNext();
    stop();
  }, [embla, stop]);

  const scrollPrev = useCallback(() => {
    if (!embla) return;
    embla.scrollPrev();
    stop();
  }, [embla, stop]);

  const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [
    embla
  ]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
    stop();
  }, [embla, setSelectedIndex, stop]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList() as SetStateAction<never[]>);
    embla.on('select', onSelect);
    embla.on('pointerDown', stop);
  }, [embla, setScrollSnaps, onSelect, stop]);

  return (
    <>
      <div className={`embla__viewport ${uniqueClassName}__carousel`} ref={viewportRef}>
        <ul className={`embla__container ${uniqueClassName}__container`}>
          { children }
        </ul>
      </div>
      {nextPrevBtnsEnabled &&
        <EmblaButton uniqueClassName={uniqueClassName} enabled={prevBtnEnabled} nextOrPrevious="previous" onClick={scrollPrev}>Prev</EmblaButton>
      }
      {nextPrevBtnsEnabled &&
        <EmblaButton uniqueClassName={uniqueClassName} enabled={nextBtnEnabled} nextOrPrevious="next" onClick={scrollNext}>Next</EmblaButton>
      }
      {dotsBtnEnabled &&
        <div className={`embla__dots-container ${uniqueClassName}__dots-container`}>
          {scrollSnaps.map((_, index) => (
            <EmblaDotButton key={index} uniqueClassName={uniqueClassName} selected={index === selectedIndex} onClick={() => scrollTo(index)} />
          ))}
        </div>
      }
    </>
  );
};

export default EmblaCarousel;