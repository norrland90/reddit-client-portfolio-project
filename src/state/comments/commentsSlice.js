import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  comments: {
    redditId: [
      { author: 'Text', body: 'This is the comment' },
      { author: 'Text', body: 'This is another comment' },
    ],
    redditId2: [
      { author: 'Text', body: 'This is the comment' },
      { author: 'Text', body: 'This is another comment' },
    ],
  },
  error: null,
  status: 'idle',
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.comments = {
          ...state.comments,
          [action.payload[0].data.parent_id]: action.payload,
        };
      })
      .addCase(fetchComments.rejected, (state, action) => {
        const message = action.error.message;

        if (message !== 'Aborted') {
          state.status = 'failed';
          state.error = message;
        }
      });
  },
});

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (permalink) => {
    const response = await axios.get(
      `https://www.reddit.com/${permalink}.json`
    );
    // console.log(response.data[1].data.children[0].data.parent_id);
    // console.log(response);
    // parent ID = id för reddit kommentaren tillhör
    return response.data[1].data.children;
  }
);

export default commentsSlice.reducer;
