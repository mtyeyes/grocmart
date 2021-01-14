import React from 'react';
import './rating-select.styl';

import HiddenText from '../hidden-text/hidden-text';
import Icon, { IconId } from '../icon/icon';

type Props = {
  selectedRating: null | number | undefined,
  defaultRating?: null | number | undefined,
  setSelectedRating: (rating: null | number) => void
}

const RatingSelect: React.FC<Props> = ({ selectedRating, defaultRating, setSelectedRating }) => {
  const ratings = ['terrible', 'bad', 'normal', 'good', 'great'];

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
      labelClassName = `${labelClassName} rating-select__label--selected`;
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
      <li className="rating-select__item" key={rating}>
        <input
          className="rating-select__input"
          type="radio"
          id={`${rating}-rating`}
          name={rating}
          value={rating}
          checked={selectedRating === ratingValue}
          onChange={()=>{setSelectedRating(ratingValue)}}
          onClick={()=>{unselectIfSelected(ratingValue)}}
        />
        <label className={labelClassName} htmlFor={`${rating}-rating`}><HiddenText>{rating}</HiddenText><Icon iconId={iconType}/></label>
      </li>
    );
  };

  return (
    <ul className="rating-select__list">
      {ratings.map(ratingMapCallback as typeof ratingMapCallback)}
    </ul>
  );
};

export default RatingSelect;