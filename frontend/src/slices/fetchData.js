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

export const renameChannel = createAsyncThunk('channels/renameChannel', async ({ id, name }) => {
  const token = JSON.parse(localStorage.getItem('userId')).token;
  const response = await axios.patch(`/api/v1/channels/${id}`, { name }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const removeChannel = createAsyncThunk('channels/removeChannel', async (id) => {
  const token = JSON.parse(localStorage.getItem('userId')).token;
  await axios.delete(`/api/v1/channels/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id;
});

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
  const token = localStorage.getItem('userId');
  const parsedToken = JSON.parse(token).token;

  const response = await axios.get('/api/v1/messages', {
    headers: { Authorization: `Bearer ${parsedToken}` },
  });

  console.log("Fetched messages:", response.data); // Логируем ответ сервера

  return response.data;
});