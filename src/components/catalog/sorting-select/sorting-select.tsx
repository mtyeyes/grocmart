import React, { useState, Dispatch, SetStateAction } from 'react';
import './sorting-select.styl';

import Button from '../../button/button';
import Icon from '../../icon/icon';

type Props<K> = {
  valuesToSortBy: K[];
  selectedValueToSortBy: K;
  setSelectedValueToSortBy: Dispatch<SetStateAction<K>>;
};

const SortingSelect = <K extends string>({ valuesToSortBy, selectedValueToSortBy, setSelectedValueToSortBy }: Props<K>) => {
  const [controlsVisible, setControlsVisibility] = useState(false);

  const radioInputChecked = (valueName: K) => {
    setControlsVisibility(false);
    setSelectedValueToSortBy(valueName);
  };

  const valuesMapCallback = (valueName: K) => {
    return (
      <li className="sorting-controls__item" key={valueName}>
        <input
          className="sorting-controls__input visually-hidden"
          type="radio"
          id={`${valueName}`}
          name={`${valuesToSortBy[0]}`}
          value={valueName}
          checked={valueName === selectedValueToSortBy}
          onChange={() => {
            radioInputChecked(valueName);
          }}
        />
        <label className="sorting-controls__label" htmlFor={`${valueName}`}>
          Sort by {valueName}
        </label>
      </li>
    );
  };

  return (
    <div className="sorting-controls">
      <Button
        className="sorting-controls__btn"
        onClick={() => {
          setControlsVisibility((previousState) => !previousState);
        }}
      >
        Sort by {selectedValueToSortBy}
        <Icon
          className={
            controlsVisible ? 'sorting-controls__btn-icon sorting-controls__btn-icon--toggled' : 'sorting-controls__btn-icon'
          }
          iconId="right-open"
        />
      </Button>
      <ul className={controlsVisible ? 'sorting-controls__list sorting-controls__list--toggled' : 'sorting-controls__list'}>
        {valuesToSortBy.map(valuesMapCallback)}
      </ul>
    </div>
  );
};

export default SortingSelect;
