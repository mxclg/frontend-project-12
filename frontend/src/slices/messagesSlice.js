import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchMessages } from "./fetchData";
import { createSelector } from "reselect";

const messagesAdapter = createEntityAdapter({
  selectId: (message) => message.id, // Явно указываем id
});

const initialState = messagesAdapter.getInitialState({
  loading: false,
  error: null,
});

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    sendMessage: (state, action) => {
      const { socket, ...messageData } = action.payload; // Убираем socket из payload
      messagesAdapter.addOne(state, {
        id: messageData.id || Date.now().toString(), // Генерируем id, если его нет
        ...messageData,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        console.log("Reducer received messages:", action.payload);
        state.loading = false;
        messagesAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addMessages, addMessage, sendMessage } = messagesSlice.actions;
export const actions = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;

export const customSelectors = {
  currentChannelMessages: createSelector(
    [(state) => state.messages.entities, (state) => state.channels.currentChannelId],
    (messages, currentChannelId) => {
      return Object.values(messages).filter((msg) => msg.channelId === currentChannelId);
    }
  ),
};
