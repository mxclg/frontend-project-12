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
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find((c) => c.id === id);
      if (channel) {
        channel.name = name;
      }
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((c) => c.id !== action.payload.id);
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

export const { setChannels, addChannel, renameChannel, removeChannel } = channelsSlice.actions;
export const actions = channelsSlice.actions;
export default channelsSlice.reducer;