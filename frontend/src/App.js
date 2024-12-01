import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ContentDisplay from './components/ContentDisplay';
import './App.css';

const ENDPOINT = "https://content-brief-generator-8wem.onrender.com";

const App = () => {
  const [brief, setBrief] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedBrief = localStorage.getItem('brief');
    if (savedBrief) {
      setBrief(savedBrief); // Load the saved brief from localStorage
    }
  }, []);

  const fetchContent = async (topic) => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(`${ENDPOINT}/generate-brief`,{
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

        // Store the result in localStorage
        localStorage.setItem('brief', data.brief);

        // Schedule the removal of the result from localStorage after 1 minute
        const expiryTime = Date.now() + 60000; // Current time + 1 minute
        localStorage.setItem('briefExpiry', expiryTime);

        // Remove the item from both localStorage and state after 1 minute
        setTimeout(() => {
          const currentExpiry = localStorage.getItem('briefExpiry');
          if (currentExpiry && Date.now() > currentExpiry) {
            localStorage.removeItem('brief');
            localStorage.removeItem('briefExpiry');
            setBrief(''); // Clear the state
          }
        }, 60000); // 60,000ms = 1 minute
      } else {
        setBrief('');
        setError(data.error || 'Failed to generate content');
      }
    } catch (err) {
      setError('Error connecting to the backend');
      setBrief('');
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Check and clear expired brief data on component mount
  useEffect(() => {
    const expiryTime = localStorage.getItem('briefExpiry');
    if (expiryTime && Date.now() > expiryTime) {
      localStorage.removeItem('brief');
      localStorage.removeItem('briefExpiry');
      setBrief(''); // Clear state if data has expired
    }
  }, []);

  return (
    <div className="App">
      <header className="header">
        <div className="brand">TECHIMAX</div>
        <div className="profile">Ankit Singh | AI_ML</div>
      </header>
      <h1>Content Brief Generator</h1>
      <SearchBar onSearch={fetchContent} />
      {isLoading ? (
        <p>Loading...</p> // Show Loading indicator
      ) : brief || error ? (
        <ContentDisplay brief={brief} error={error} />
      ) : (
        <p>Enter a topic to generate content.</p>
      )}
    </div>
  );
};

export default App;
