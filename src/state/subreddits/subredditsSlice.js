import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  subreddits: [],
  error: null,
  status: 'idle',
};

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.subreddits = action.payload.data.children;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        const message = action.error.message;

        if (message !== 'Aborted') {
          state.status = 'failed';
          state.error = message;
        }
      });
  },
});

export const fetchSubreddits = createAsyncThunk(
  'subreddits/fetchSubreddits',
  async () => {
    const response = await axios.get('https://www.reddit.com/subreddits.json');
    return response.data;
  }
);

export default subredditsSlice.reducer;
