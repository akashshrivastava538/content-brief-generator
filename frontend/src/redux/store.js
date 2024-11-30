import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage
import briefReducer from './briefSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, briefReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
