import React, { Dispatch } from 'react';
import ReactSlider from 'react-slider';
import './price-filter-controls.styl';

import { FilterAction } from '../../../../hooks/use-filter-products';

interface Props {
  minPrice: number;
  maxPrice: number;
  selectedMinPrice: number;
  selectedMaxPrice: number;
  dispatchFilterAction: Dispatch<FilterAction>;
}

const PriceFilterControls = ({ minPrice, maxPrice, selectedMinPrice, selectedMaxPrice, dispatchFilterAction }: Props) => {
  const handleChange = (range: number | number[] | null | undefined) => {
    if (Array.isArray(range)) {
      dispatchFilterAction({
        type: 'changePriceToFilterBy',
        payload: { selectedMinPrice: range[0], selectedMaxPrice: range[1] },
      });
    }
  };

  return (
    <fieldset className="filter-controls__price price-filter__container">
      <h4 className="price-filter__heading">Filter by price</h4>
      <ReactSlider
        className="price-filter"
        thumbClassName="price-filter__thumb"
        thumbActiveClassName="price-filter__thumb--active"
        trackClassName="price-filter__track"
        defaultValue={[selectedMinPrice, selectedMaxPrice]}
        pearling={true}
        min={minPrice}
        max={maxPrice}
        minDistance={1}
        onChange={handleChange}
      />
    </fieldset>
  );
};

export default PriceFilterControls;
