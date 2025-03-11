import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
  },
});

export default store;