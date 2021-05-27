import React, { useState } from 'react';

import SearchControls from './search-controls/search-controls';
import SearchResults from './search-results/search-results';
import ModalWithScreenblock from '../../modal-with-screenblock/modal-with-screenblock';

type Props = {
  switchModalVisibility: () => void;
};

const Search = ({ switchModalVisibility }: Props) => {
  const [searchQuery, setSearchQuery] = useState(null as string | null);

  return (
    <ModalWithScreenblock closeModal={switchModalVisibility} renderInside="component">
      {searchQuery ? (
        <SearchResults closeModal={switchModalVisibility} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      ) : (
        <SearchControls setSearchQuery={setSearchQuery} />
      )}
    </ModalWithScreenblock>
  );
};

export default Search;
