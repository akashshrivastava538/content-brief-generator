import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContent } from '../store/contentSlice';

const SearchBar = () => {
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (inputText) {
      dispatch(fetchContent(inputText));  // Dispatching the fetchContent action
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter a topic"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;



