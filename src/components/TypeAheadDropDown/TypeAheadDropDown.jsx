import React, { useState, useEffect } from 'react';
import { api } from '../../utils';
import useDebounce from '../../hooks/useDebounce';
import ListDropDown from '../ListDropDown/ListDropDown';
import './TypeAheadDropDown.css';

function TypeAheadDropDown() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hide, setHide] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const hideList = (e) => {
    setHide(true);
  };

  const showList = (e) => {
    e.stopPropagation()
    setHide(false);
  };

  // hide list on click
  useEffect(() => {
    window.addEventListener('click', hideList);
    return () => {
      window.removeEventListener('click', hideList);
    };
  }, [hideList]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      api(`/search/users?q=${debouncedSearchTerm}&per_page=10`, {}).then((results) => {
        setIsSearching(false);
        setResults(results.items);
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className='TypeAheadDropDown'>
      <input
        placeholder='Search users'
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={showList}
      />

      {isSearching && <div>Searching ...</div>}

      {!isSearching && <ListDropDown results={results} hide={hide} />}
    </div>
  );
}

export default TypeAheadDropDown;
