import React, { useState, Dispatch, SetStateAction } from 'react';
import './sorting-select.styl';

import Button from '../../button/button';
import Icon from '../../icon/icon';

type ValuestToSortBy = Readonly<string[]>

type Props = {
  valuesToSortBy: ValuestToSortBy,
  selectedValueToSortBy: string,
  setSelectedValueToSortBy: Dispatch<SetStateAction<any>>,
}

const SortingSelect: React.FC<Props> = ({ valuesToSortBy, selectedValueToSortBy, setSelectedValueToSortBy }) => {
  const [controlsVisible, setControlsVisibility] = useState(false);

  const radioInputChecked = ( valueName: string ) => {
    setControlsVisibility(false);
    setSelectedValueToSortBy(valueName);
  };

  const valuesMapCallback = (valueName: string) => {
    return(
      <li className="sorting-controls__item" key={valueName}>
        <input
          className="sorting-controls__input"
          type="radio"
          id={`${valueName}`}
          name={`${valuesToSortBy[0]}`}
          value={valueName}
          checked={valueName === selectedValueToSortBy}
          onChange={()=>{radioInputChecked(valueName)}}
        />
        <label className="sorting-controls__label" htmlFor={`${valueName}`}>Sort by {valueName}</label>
      </li>
    );
  };

  return (
    <div className="sorting-controls">
      <Button className="sorting-controls__btn" onClick={() => {setControlsVisibility(previousState => !previousState)}}>
        Sort by {selectedValueToSortBy}
        <Icon className={(controlsVisible) ? 'sorting-controls__btn-icon sorting-controls__btn-icon--toggled' : 'sorting-controls__btn-icon'} iconId="right-open"/>
      </Button>
      <ul className={(controlsVisible) ? 'sorting-controls__list sorting-controls__list--toggled' : 'sorting-controls__list'}>
        {valuesToSortBy.map(valuesMapCallback)}
      </ul>
    </div>
  );
};

export default SortingSelect;