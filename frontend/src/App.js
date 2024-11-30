import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ContentDisplay from './components/ContentDisplay';
import './App.css';

const App = () => {
  const [brief, setBrief] = useState('');
  const [error, setError] = useState('');

  const fetchContent = async (topic) => {
    try {
      const response = await fetch('http://localhost:5000/generate-brief', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();

      if (response.ok) {
        setBrief(data.brief);
        setError('');
      } else {
        setBrief('');
        setError(data.error || 'Failed to generate content');
      }
    } catch (err) {
      setError('Error connecting to the backend');
      setBrief('');
    }
  };

  return (
    <div className="App">
      <h1>Content Brief Generator</h1>
      <SearchBar onSearch={fetchContent} />
      <ContentDisplay brief={brief} error={error} />
    </div>
  );
};

export default App;
