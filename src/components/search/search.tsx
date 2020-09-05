import React, { useRef, useEffect } from 'react';
import './search.styl';

import Icon from '../icon/icon';
import HiddenText from '../hidden-text/hidden-text';

type Props = {
  switchModalVisibility?: () => void
}

type EventKeyup = {
  key: string
}

const Search: React.FC<Props> = ({ switchModalVisibility }) => {
  const closeModalByEsc = (e: EventKeyup) => {
    if (e.key === 'Escape' && switchModalVisibility) { switchModalVisibility() }
  };

  const closeModalByClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === screenblockEl.current && switchModalVisibility) { switchModalVisibility() }
  };

  const inputEl = useRef<HTMLInputElement>(null);
  const screenblockEl = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if (inputEl.current) {inputEl.current.focus()}
  }, [inputEl]);

  useEffect(()=>{
    document.addEventListener('keyup', closeModalByEsc);
    return () => {
      document.removeEventListener('keyup', closeModalByEsc);
    };
  }, [inputEl]);

  return (

    <div className="modal-search__screenblock" ref={screenblockEl} role="button" onClick={closeModalByClick} tabIndex={0}>
      <form className="modal-search__container" action="/search" method="get">
        <label className="modal-search__label visually-hidden" htmlFor="modal-search">Search</label>
        <input className="modal-search__input" placeholder="Search…" ref={inputEl} id="modal-search" name="search-query" type="search" ></input>
        <button type="submit" className="modal-search__btn">
          <HiddenText>Search</HiddenText>
          <Icon iconId="search" />
        </button>
      </form>
    </div>
  );
};

export default Search;
