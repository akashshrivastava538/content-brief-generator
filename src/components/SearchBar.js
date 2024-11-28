import React, { useState } from 'react';
import { generateText, fetchSummaryAndSources } from '../api';

const SearchComponent = () => {
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt2');  // Default model

  // Handle model selection
  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  // Handle the text generation request
  const handleGenerateText = async () => {
    try {
      const response = await generateText(inputText, selectedModel);
      setGeneratedText(response);
    } catch (error) {
      setGeneratedText('Error generating text');
    }
  };

  return (
    <div>
      <h1>Search and Generate Text</h1>
      
      <label>Select Model:</label>
      <select onChange={handleModelChange} value={selectedModel}>
        <option value="gpt2">GPT-2</option>
        <option value="gpt3">GPT-3.5</option>
        <option value="bart">BART</option>
        <option value="t5">T5</option>
      </select>

      <div>
        <input 
          type="text" 
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
          placeholder="Enter a topic" 
        />
        <button onClick={handleGenerateText}>Generate Text</button>
      </div>

      <div>
        <h3>Generated Text:</h3>
        <p>{generatedText}</p>
      </div>
    </div>
  );
};

export default SearchComponent;


