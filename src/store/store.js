// src/store/index.js
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './contentSlice';  // Import the reducer from contentSlice

const store = configureStore({
  reducer: {
    content: contentReducer,  // Set up the reducer in the store
  },
});

export default store;



