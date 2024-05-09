import { configureStore } from '@reduxjs/toolkit';
import subredditReducer from './subreddits/subredditsSlice';
import redditReducer from './reddits/redditsSlice';
import commentsReducer from './comments/commentsSlice';

export const store = configureStore({
  reducer: {
    subreddits: subredditReducer,
    reddits: redditReducer,
    comments: commentsReducer,
  },
});
