import React, { Dispatch, ChangeEvent } from 'react';
import './by-name-filter-controls.styl';

import { FilterAction } from '../../../../hooks/use-filter-products';

type Props = {
  nameFilter: string,
  dispatchFilterAction: Dispatch<FilterAction>
}

const ByNameFilterControls = ({ nameFilter, dispatchFilterAction }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if(nameFilter !== inputValue) {dispatchFilterAction({type: 'changeNameToFilterBy', payload: inputValue})}
  };

  return (
    <fieldset className="filter-controls__name name-filter__container">
      <input className="name-filter__input" type="text" name="name" placeholder="Filter by name" value={nameFilter} pattern="^[A-Za-zА-Яа-яЁё]+$" onChange={handleChange} required />
    </fieldset>
  );
};

export default ByNameFilterControls;