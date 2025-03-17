

import { createAsyncThunk } from '@reduxjs/toolkit';
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