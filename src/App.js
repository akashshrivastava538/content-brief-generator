// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';  // Correctly import the store
import SearchBar from './components/SearchBar';
import ContentDisplay from './components/ContentDisplay';
import './styles.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Content Brief Generator</h1>
        <SearchBar />
        <ContentDisplay />
      </div>
    </Provider>
  );
};

export default App;





