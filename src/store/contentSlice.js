import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSummaryAndSources } from '../api';

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (topic, thunkAPI) => {
    try {
      const data = await fetchSummaryAndSources(topic);  // Ensure we get the correct data structure
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    brief: '',
    sources: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.brief = action.payload.brief || 'No summary generated'; // Handle case where brief is empty
        state.sources = action.payload.sources || []; // Handle case where sources are empty
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contentSlice.reducer;





