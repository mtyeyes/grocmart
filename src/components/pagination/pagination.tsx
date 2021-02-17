import React, { Dispatch, useEffect, useState } from 'react';
import './pagination.styl';

import HiddenText from '../hidden-text/hidden-text';
import Icon from '../icon/icon';

type Props = {
  selectedPage: number,
  setSelectedPage: Dispatch<number>,
  itemsPerPage: number,
  numberOfItems: number,
}

const Pagination = ({ selectedPage, setSelectedPage, itemsPerPage, numberOfItems }: Props) => {
  const amountOfPages = Math.ceil(numberOfItems / itemsPerPage);
  const [controls, setControls] = useState([] as (number|string)[]);

  useEffect(() => {
    let controls = [] as (number|string)[];
    const isFirstPage = selectedPage === 1;
    const isLastPage = selectedPage === amountOfPages;
    const isEmpty = amountOfPages <= 0;
    switch(true) {
      case(isEmpty): {
        controls = [];
        break;
      }
      case(isFirstPage): {
        controls = ['«', selectedPage , selectedPage + 1 , selectedPage + 2, '»'];
        break;
      }
      case(isLastPage): {
        controls = ['«', selectedPage - 2, selectedPage - 1, selectedPage, '»'];
        break;
      }
      case(!isFirstPage && !isLastPage): {
        controls = ['«', selectedPage - 1, selectedPage, selectedPage + 1, '»'];
        break;
      }
    }
    setControls(controls.filter(value => typeof value === 'string' || value > 0 && value <= amountOfPages));
  }, [selectedPage, numberOfItems]);

  const controlsMapCallback = (controlValue: number| string) => {
    let targetPage: number;
    if(typeof controlValue !== 'string') {
      targetPage = controlValue;
    } else {
      targetPage = (controlValue === '»') ? selectedPage + 1 : selectedPage - 1;
    }

    const isSelected = targetPage === selectedPage;
    const isLinkActive = !isSelected && targetPage > 0 && targetPage <= amountOfPages;

    const handleClick = () => {
      setSelectedPage(targetPage);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      if(e.key === 'Enter'){
        setSelectedPage(targetPage);
      }
    };

    const linkClassName = `pagination__link ${(isSelected) ? 'pagination__link--selected' : ''} ${(isLinkActive) ? '' : 'pagination__link--disabled'}`;

    return(
      <li className={(typeof controlValue === 'number') ? 'pagination__item pagination__item--number' : 'pagination__item pagination__item--arrow'} key={controlValue}>
        <a
          className={linkClassName}
          onClick={(isLinkActive) ? handleClick : undefined}
          onKeyPress={(isLinkActive) ? handleKeyPress : undefined}
          aria-selected={isSelected}
        >
          {(typeof controlValue !== 'string') && <span><HiddenText>{(isSelected) ? 'Current page number' : 'Switch to page number'}</HiddenText>{targetPage}</span>}
          {(controlValue === '»') && <span><HiddenText>Next page</HiddenText><Icon iconId="right" /></span>}
          {(controlValue === '«') && <span><HiddenText>Previous page</HiddenText><Icon iconId="left" /></span>}
        </a>
      </li>
    );
  };

  if(amountOfPages <= 1) {
    return (null);
  } else {
    return (
      <nav className="pagination" role="navigation" aria-label="Pagination Navigation">
        <ol className="pagination__list">
          {controls.map(controlsMapCallback)}
        </ol>
      </nav>
    );
  }

};

export default Pagination;