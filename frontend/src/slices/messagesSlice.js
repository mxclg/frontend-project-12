import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async (channelId) => {
  const token = localStorage.getItem('userId');
  const parsedToken = JSON.parse(token).token;

  const response = await axios.get(`/api/v1/messages?channelId=${channelId}`, {
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
  });
  return response.data;
});

export const sendMessage = createAsyncThunk('messages/sendMessage', async ({ message, socket }) => {
  const token = localStorage.getItem('userId');
  const parsedToken = JSON.parse(token).token;

  const response = await axios.post('/api/v1/messages', message, {
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
  });

  // Отправляем сообщение через WebSocket
  socket.emit('newMessage', response.data);

  return response.data;
});

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, action) => {
      state.messages.push(...action.payload);
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeMessagesByChannelId: (state, action) => {
      state.messages = state.messages.filter((m) => m.channelId !== action.payload);
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
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addMessages, addMessage, removeMessagesByChannelId } = messagesSlice.actions;
export const actions = messagesSlice.actions;
export default messagesSlice.reducer;