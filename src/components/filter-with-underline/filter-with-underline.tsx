import React, { Dispatch, SetStateAction, useState } from 'react';
import './filter-with-underline.styl';

import Button from '../button/button';
import Icon from '../icon/icon';

type Props = {
  selectedFilter: string,
  setSelectedFilter: Dispatch<SetStateAction<FilterState>>,
  availableFilters: string[],
}

export type FilterState = {
  selectedFilter: string,
  availableFilters: string[],
}

const FilterWithUnderline: React.FC<Props> = ({ selectedFilter, setSelectedFilter, availableFilters }) => {
  const [filtersVisible, toggleFiltersVisibility] = useState(false);

  const filtersMapCallback = (filterName: string) => {
    return (
      <li className="filter__filters-item" key={filterName}>
        <input className="filter__input" checked={(filterName === selectedFilter) ? true : false} id={`${filterName}-input`} onChange={()=>{setSelectedFilter(prevState => {return {...prevState, selectedFilter: filterName}})}} type="radio" name={availableFilters[0]} />
        <label className="filter__label" htmlFor={`${filterName}-input`}>{filterName}</label>
      </li>
    );
  };

  return (
    <div className="filter__container">
      <Button className={(filtersVisible) ? 'filter__btn filter__btn--toggled' : 'filter__btn'} onClick={()=>{toggleFiltersVisibility(prevState => !prevState)}}>Filter<Icon className="filter__btn-icon" iconId="right-open" /></Button>
      <form className={filtersVisible ? 'filter__form filter__form--visible' : 'filter__form'}>
        <ul className="filter__filters-list">
          {availableFilters.map(filtersMapCallback)}
        </ul>
      </form>
    </div>
  );
};

export default FilterWithUnderline;