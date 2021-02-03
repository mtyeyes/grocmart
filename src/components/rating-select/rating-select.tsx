import React, { useState } from 'react';
import './rating-select.styl';

import HiddenText from '../hidden-text/hidden-text';
import Icon, { IconId } from '../icon/icon';

type Props = {
  selectedRating: null | number | undefined,
  defaultRating?: null | number | undefined,
  setSelectedRating: (rating: null | number) => void
}

type RatingInFocus = {
  byKeyboard: number | null,
  byMouse: number | null,
}

const RatingSelect: React.FC<Props> = ({ selectedRating, defaultRating, setSelectedRating }) => {
  const ratings = ['terrible', 'bad', 'normal', 'good', 'great'];
  const [ratingInFocus, setRatingInFocus] = useState({byKeyboard: null, byMouse: null} as RatingInFocus);

  const unselectIfSelected = (inputValue: number) => {
    if(inputValue === selectedRating) {setSelectedRating(null)}
  };

  const ratingMapCallback = (rating: string, index: number) => {
    const ratingValue = ++index;

    let iconType: IconId;
    let labelClassName: string = 'rating-select__label';

    switch(true) {
    case(selectedRating && selectedRating >= ratingValue): {
      iconType = 'star';
      labelClassName = `${labelClassName} ${labelClassName}--selected`;
      break;
    }
    case(ratingInFocus.byKeyboard! >= ratingValue || ratingInFocus.byMouse! >= ratingValue): {
      iconType = 'star';
      labelClassName = `${labelClassName} ${labelClassName}--hovered`;
      break;
    }
    case(defaultRating && defaultRating >= ratingValue): {
      iconType = 'star';
      break;
    }
    case(defaultRating && defaultRating + 0.6 >= ratingValue): {
      iconType = 'star-half';
      break;
    }
    default: {
      iconType = 'star-empty';
      break;
    }
    }

    return (
      <li
        className="rating-select__item"
        onMouseEnter={()=>{setRatingInFocus(prevState => { return {...prevState, byMouse: ratingValue} })}}
        onMouseLeave={()=>{setRatingInFocus(prevState => { return {...prevState, byMouse: null} })}}
        key={rating}
      >
        <input
          className="rating-select__input visually-hidden"
          type="radio"
          id={`${rating}-rating`}
          name={rating}
          value={rating}
          checked={selectedRating === ratingValue}
          onChange={()=>{setSelectedRating(ratingValue)}}
          onClick={()=>{unselectIfSelected(ratingValue)}}
          onFocus={()=>{setRatingInFocus(prevState => { return {...prevState, byKeyboard: ratingValue} })}}
          onBlur={()=>{setRatingInFocus(prevState => { return {...prevState, byKeyboard: null} })}}
        />
        <label className={labelClassName} htmlFor={`${rating}-rating`}><HiddenText>{rating}</HiddenText><Icon iconId={iconType}/></label>
      </li>
    );
  };

  return (
    <ul className="rating-select__list">
      {ratings.map(ratingMapCallback)}
    </ul>
  );
};

export default RatingSelect;