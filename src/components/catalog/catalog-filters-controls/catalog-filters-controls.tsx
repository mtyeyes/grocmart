import React from 'react';
import './catalog-filters-controls.styl';

import Button from '../../button/button';

type Props = {
  filterProducts: () => void,
  selectedMinPrice: number,
  selectedMaxPrice: number,
}

const CatalogFiltersControls: React.FC<Props> = ({filterProducts, selectedMinPrice, selectedMaxPrice, children}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      filterProducts();
    }
  };

  return (
    <form className="filter-controls" onKeyPress={handleKeyPress}>
      {children}
      <div className="filter-controls__wrapper">
        <Button className="filter-controls__btn" onClick={filterProducts}>Filter</Button>
        <p className="filter-controls__price-range-info">{`Price: ${selectedMinPrice.toLocaleString('en-US', {style:'currency', currency:'USD'})} – ${selectedMaxPrice.toLocaleString('en-US', {style:'currency', currency:'USD'})}`}</p>
      </div>
    </form>
  );
};

export default CatalogFiltersControls;