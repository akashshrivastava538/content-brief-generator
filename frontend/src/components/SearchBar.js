import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [topic, setTopic] = useState('');

  const handleInputChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSearch = () => {
    if (topic.trim()) {
      onSearch(topic);  // Trigger search when topic is provided
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={topic}
        onChange={handleInputChange}
        placeholder="Enter topic"
      />
      <button onClick={handleSearch}>Generate Brief</button>
    </div>
  );
};

export default SearchBar;
