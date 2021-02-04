import React, { useEffect, useRef, Dispatch, SetStateAction, FormEvent } from 'react';
import './search-controls.styl';

import HiddenText from '../../../hidden-text/hidden-text';
import Icon from '../../../icon/icon';

type Props = {
  setSearchQuery: Dispatch<SetStateAction<string | null>>
}

const SearchControls: React.FC<Props> = ({ setSearchQuery }) => {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    if (inputEl.current !== null) {inputEl.current.focus()}
  }, [inputEl]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchQuery = inputEl.current?.value;
    if (searchQuery === undefined || searchQuery.length <= 1) { return } else {setSearchQuery(searchQuery)}
  };

  return (
    <form className="search-controls__form" action="/search" method="get" onSubmit={handleSubmit}>
      <label className="search-controls__label visually-hidden" htmlFor="search-controls">Search</label>
      <input className="search-controls__input" placeholder="Search…" ref={inputEl} id="search-controls" minLength={2} name="search-query" type="search" ></input>
      <button type="submit" className="search-controls__btn">
        <HiddenText>Search</HiddenText>
        <Icon iconId="search" />
      </button>
    </form>
  );
};

export default SearchControls;