import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [topic, setTopic] = useState('');
  const [isClicked, setIsClicked] = useState(false); // State to track button click

  const handleInputChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSearch = () => {
    if (topic.trim()) {
      setIsClicked(true); // Change button state when clicked
      onSearch(topic); // Trigger search when topic is provided

      // Optionally reset the button color after some time
      setTimeout(() => {
        setIsClicked(false);
      }, 500); // Reset after 0.5 seconds
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
      <button
        className={`generate-btn ${isClicked ? 'clicked' : ''}`} // Apply dynamic class
        onClick={handleSearch}
      >
        Generate Brief
      </button>
    </div>
  );
};

export default SearchBar;
