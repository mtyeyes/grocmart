import React, { useRef, useEffect, useState } from 'react';
import './search.styl';

import SearchControls from './search-controls/search-controls';
import SearchResults from './search-results/search-results';

type Props = {
  switchModalVisibility?: () => void,
}

type EventKeyup = {
  key: string,
}

const Search: React.FC<Props> = ({ switchModalVisibility }) => {
  const [searchQuery, setSearchQuery] = useState(null as string | null);

  const closeModalByEsc = (e: EventKeyup) => { if (e.key === 'Escape' && switchModalVisibility) { switchModalVisibility() } };
  const closeModalByClick = (e: React.MouseEvent<HTMLDivElement>) => { if (e.target === screenblockEl.current && switchModalVisibility) { switchModalVisibility() } };

  const screenblockEl = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    document.addEventListener('keyup', closeModalByEsc);
    return () => {
      document.removeEventListener('keyup', closeModalByEsc);
    };
  }, []);

  return (
    <div className="modal-search__screenblock" ref={screenblockEl} role="button" onClick={closeModalByClick} tabIndex={0}>
      {searchQuery ? <SearchResults closeModal={(switchModalVisibility) ? switchModalVisibility : undefined} searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> : <SearchControls setSearchQuery={setSearchQuery} />}
    </div>
  );
};

export default Search;
