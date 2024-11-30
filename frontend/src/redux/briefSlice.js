import { createSlice } from '@reduxjs/toolkit';

const briefSlice = createSlice({
  name: 'brief',
  initialState: {
    brief: '',
    error: '',
  },
  reducers: {
    setBrief: (state, action) => {
      state.brief = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setBrief, setError } = briefSlice.actions;
export default briefSlice.reducer;
