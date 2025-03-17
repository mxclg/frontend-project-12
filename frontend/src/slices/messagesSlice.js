import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchMessages } from './fetchData';
import { createSelector } from 'reselect';

export const sendMessage = createAsyncThunk('messages/sendMessage', async ({ message, socket }) => {
  const token = localStorage.getItem('userId');
  const parsedToken = JSON.parse(token).token;

  const response = await axios.post('/api/v1/messages', message, {
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
  });

  socket.emit('newMessage', response.data);

  return response.data;
});

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({
  loading: false,
  error: null,
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    removeMessagesByChannelId: (state, { payload }) => {
      const messagesToRemove = Object.values(state.entities)
        .filter((msg) => msg.channelId === payload)
        .map((msg) => msg.id);
      messagesAdapter.removeMany(state, messagesToRemove);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        messagesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addMessages, addMessage, removeMessagesByChannelId } = messagesSlice.actions;
export const actions = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;

export const customSelectors = {
  allMessages: selectors.selectAll,
  currentChannelMessages: createSelector(
    [selectors.selectAll, (state) => state.channels.currentChannelId],
    (allMessages, currentChannelId) => allMessages.filter(
      ({ channelId }) => channelId === currentChannelId,
    ),
  ),
};