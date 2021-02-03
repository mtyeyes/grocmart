import React, { Dispatch, useEffect, useState, ChangeEvent } from 'react';
import './categories-filter-controls.styl';

import HiddenText from '../../../hidden-text/hidden-text';
import { SelectedCategories, FilterAction } from '../../catalog';

type Props = {
  categoriesData: SelectedCategories,
  dispatchFilterAction: Dispatch<FilterAction>,
  numberOfItems: {[key: string]: number},
}

type SelectAllCheckboxState = {
  isChecked: boolean,
  numberOfItemsTotal: number,
}

const CategoriesFilterControls: React.FC<Props> = ({ categoriesData, dispatchFilterAction, numberOfItems }) => {
  const [selectAllCheckboxState, setSelectAllCheckboxState] = useState({isChecked: true, numberOfItemsTotal: 0} as SelectAllCheckboxState);

  useEffect(() => {
    const numberOfItemsTotal = Object.keys(numberOfItems).reduce((acc, value) =>{return acc + numberOfItems[value]}, 0 as number);
    let isChecked = true;
    if (categoriesData) {
      Object.keys(categoriesData).map(categoryName => {
        if (categoriesData[categoryName] === false) {isChecked = false}
      });
      setSelectAllCheckboxState({numberOfItemsTotal, isChecked});
    }
  }, [categoriesData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectAllCheckboxState(prevState => {return {...prevState, isChecked: e.target.checked}});
    const payload = categoriesData;
    Object.keys(categoriesData).map(categoryName => categoriesData[categoryName] = e.target.checked);
    dispatchFilterAction({type: 'changeCategoriesToFilterBy', payload});
  };

  const categoriesMapCallback = (categoryName: string) => {
    const isSelected = categoriesData[categoryName];
    const amount = numberOfItems[categoryName] ?? 0;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      dispatchFilterAction({type: 'changeCategoriesToFilterBy', payload:{...categoriesData, [categoryName]: e.target.checked}});
    };

    return(
      <li className="categories-filter__item" key={categoryName}>
        <input className="categories-filter__checkbox visually-hidden" type="checkbox" name="categories-filter-controls" id={`${categoryName}-category`} checked={isSelected} onChange={handleChange}/>
        <label className="categories-filter__label" htmlFor={`${categoryName}-category`} >{categoryName}</label>
        <p className="categories-filter__item-counter"><HiddenText>In this category there are</HiddenText> {`(${amount})`} <HiddenText>{(amount === 1) ? 'item' : 'items'}</HiddenText></p>
      </li>
    );
  };

  return (
    <fieldset className="filter-controls__categories categories-filter__container">
      <h4 className="categories-filter__heading">Categories</h4>
      <ul className="categories-filter__list">
        <li className="categories-filter__item">
          <input className="categories-filter__checkbox visually-hidden" type="checkbox" name="categories-filter-controls" id="all-category" checked={selectAllCheckboxState.isChecked} onChange={handleChange}/>
          <label className="categories-filter__label" htmlFor="all-category">all</label>
          <p className="categories-filter__item-counter"><HiddenText>There are</HiddenText> {`(${selectAllCheckboxState.numberOfItemsTotal})`} <HiddenText>{(selectAllCheckboxState.numberOfItemsTotal === 1) ? 'item total' : 'items total'}</HiddenText></p>
        </li>
        {Object.keys(categoriesData).sort().map(categoriesMapCallback)}
      </ul>
    </fieldset>
  );
};

export default CategoriesFilterControls;