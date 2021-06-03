import React, { Dispatch } from 'react';
import './rating-filter-controls.styl';

import { FilterAction } from '../../../../hooks/use-filter-products';
import RatingSelect from '../../../rating-select/rating-select';

interface Props {
  selectedRating: number | null;
  dispatchFilterAction: Dispatch<FilterAction>;
}

const RatingFilterControls = ({ selectedRating, dispatchFilterAction }: Props) => {
  const setSelectedRating = (rating: null | number) => {
    dispatchFilterAction({ type: 'changeRatingToFilterBy', payload: rating });
  };
  return (
    <fieldset className="filter-controls__rating rating-filter__conatainer">
      <h4 className="rating-filter__heading">Rating</h4>
      <RatingSelect selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
    </fieldset>
  );
};

export default RatingFilterControls;
