import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reddits: [],
  selectedSubreddit: 'r/Home',
  error: null,
  status: 'idle',
  filterTerm: '',
};

const redditsSlice = createSlice({
  name: 'reddits',
  initialState,
  reducers: {
    selectSubReddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    },
    setFilterTerm: (state, action) => {
      state.filterTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReddits.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReddits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.reddits = action.payload.data.children;
      })
      .addCase(fetchReddits.rejected, (state, action) => {
        const message = action.error.message;

        if (message !== 'Aborted') {
          state.status = 'failed';
          state.error = message;
        }
      });
  },
});

export const fetchReddits = createAsyncThunk(
  'reddits/fetchReddits',
  async (selectedSubReddit = 'Home') => {
    const response = await axios.get(
      `https://www.reddit.com/${selectedSubReddit}.json`
    );
    return response.data;
  }
);

export const getFilteredReddits = (state) => {
  return state.reddits.reddits.filter((reddit) =>
    reddit.data.title
      .toLowerCase()
      .includes(state.reddits.filterTerm.toLowerCase())
  );
};

export const { selectSubReddit, setFilterTerm } = redditsSlice.actions;

export default redditsSlice.reducer;
