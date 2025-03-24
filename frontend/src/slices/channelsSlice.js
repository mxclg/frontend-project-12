import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { fetchChannels, renameChannel, removeChannel } from './fetchData';
import axios from 'axios';

export const addChannel = createAsyncThunk('channels/addChannel', async (channel) => {
  const token = localStorage.getItem('userId');
  const parsedToken = JSON.parse(token).token;

  const response = await axios.post('/api/v1/channels', channel, {
    headers: { Authorization: `Bearer ${parsedToken}` },
  });

  return response.data;
});

export const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  loading: false,
  error: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.setAll,
    addChannelDirectly: channelsAdapter.addOne,
    renameChannelDirectly: channelsAdapter.updateOne,
    removeChannelDirectly: channelsAdapter.removeOne,
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = state.ids.length > 0 ? state.ids[0] : null;
      }
      channelsAdapter.removeOne(state, payload);
    },
    changeChannel: (state, action) => {
      state.currentChannelId = action.payload;
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
        channelsAdapter.setAll(state, action.payload);
        state.currentChannelId = state.ids.length > 0 ? state.ids[0] : null;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        channelsAdapter.addOne(state, action.payload);
      })
      .addCase(renameChannel.fulfilled, (state, { payload }) => {
        channelsAdapter.updateOne(state, { id: payload.id, changes: { name: payload.name } });
      })
      .addCase(removeChannel.fulfilled, (state, { payload }) => {
        if (state.currentChannelId === payload) {
          state.currentChannelId = "1";
        }
        channelsAdapter.removeOne(state, payload);
      });
  },
});

export const { setChannels, changeChannel } = channelsSlice.actions;
export const actions = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;

export const customSelectors = {
  allChannels: selectors.selectAll,
  channelsNames: createSelector(
    selectors.selectAll,
    (allChannels) => allChannels.map(({ name }) => name),
  ),
  currentChannel: (state) => {
    const { currentChannelId } = state.channels;
    return selectors.selectById(state, currentChannelId);
  },
};
