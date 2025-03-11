import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChannels = createAsyncThunk('channels/fetchChannels', async () => {
 const token = localStorage.getItem('userId');
 const parsedToken = JSON.parse(token).token;

 const response = await axios.get('/api/v1/channels', {
   headers: {
     Authorization: `Bearer ${parsedToken}`, 
   },
 });
 return response.data;
});

const initialState = {
  channels: [],
  messages: [],
  loading: false,
  error: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setChannels, setMessages } = channelsSlice.actions;
export default channelsSlice.reducer;