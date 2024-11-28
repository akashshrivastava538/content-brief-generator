import React from 'react';
import { useSelector } from 'react-redux';

const ContentDisplay = () => {
  const { brief, sources, loading, error } = useSelector((state) => state.content);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Debug: Log the fetched brief and sources
  console.log('Brief:', brief);
  console.log('Sources:', sources);

  return (
    <div className="content-display">
      <h2>Content Brief</h2>
      {brief && <p>{brief}</p>}
      
      <h3>Sources</h3>
      {sources.length > 0 ? (
        <ul>
          {sources.map((source, index) => (
            <li key={index}>{source}</li>
          ))}
        </ul>
      ) : (
        <p>No sources available</p>
      )}
    </div>
  );
};

export default ContentDisplay;



