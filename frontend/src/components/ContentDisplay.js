import React from 'react';

const ContentDisplay = ({ brief, error, isLoading, sources = [] }) => {
  // Function to remove special characters (like ***, ###, etc.) from the text
  const cleanText = (text) => {
    const cleanedText = text.replace(/[*#`_]+/g, '').trim();
    return cleanedText;
  };

  // Function to generate a summary from the brief
  const generateSummary = (content) => {
    if (!content) return [];
    const processedContent = content.split(' ').slice(680).join(' ');
    const summary = [
      `At its heart, the summary is that ${processedContent} is crafted to resonate with a diverse audience, regardless of their expertise level.`,
      `To encapsulate, the summary is that this exploration of ${processedContent} delivers a focused, engaging, and easily digestible narrative.`,
      `In essence, the summary is that key advantages and challenges of ${processedContent} are highlighted to provide a well-rounded perspective.`,
      `To summarize concisely, it is that credible external references related to ${processedContent} are included, enriching the discussion and encouraging further exploration.`,
      `Ultimately, the summary reveals that the narrative structure of ${processedContent} ensures clarity, logical flow, and sustained reader engagement.`,
    ];
    return summary;
  };

  // Function to extract URLs that start with 'https' and end with '/' and are the 3rd occurrence
  const extractUrlsWithThirdSlash = (text) => {
    // Updated regex to match URLs starting with 'https' or 'www'
    const regex = /(https:\/\/|www\.)[^\s]+?\//g;
    const matches = text.match(regex);

    if (matches && matches.length >= 3) {
      // Return every third URL from the matches
      return matches.filter((url, index) => (index + 1) % 3 === 0);
    }
    return [];
  };

  const matchedUrls = extractUrlsWithThirdSlash(brief);
  const summary = generateSummary(brief);

  return (
    <div
      className="content-display"
      style={{
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        maxWidth: '800px',
        margin: '20px auto',
        backgroundColor: '#f9f9f9',
        textAlign: 'left',
      }}
    >
      {isLoading ? (
        <p>Loading...</p> // Display "Loading..." while the brief is being generated
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h2>Generated Brief</h2>
          <h3>{brief ? cleanText(brief) : ''}</h3>

          <h3>Summary:</h3>
          <ul style={{ paddingLeft: '20px' }}>
            {summary.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          {matchedUrls.length > 0 && (
            <div>
              <h3>Source Links:</h3>
              <ul style={{ paddingLeft: '20px' }}>
                {matchedUrls.map((url, index) => (
                  <li key={index}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;
