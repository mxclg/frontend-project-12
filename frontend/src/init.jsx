import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import store from './slices/store.js';
import { AuthProvider } from './contexts/AuthContext.jsx';
import App from "./components/App.jsx";
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';

const SocketEventsHandler = () => {
  useEffect(() => {
    const socket = io();

    socket.on('newMessage', (payload) => {
      console.log('WebSocket received newMessage:', payload);
      store.dispatch(messagesActions.addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      console.log('WebSocket received newChannel:', payload);
      store.dispatch(channelsActions.addChannel(payload));
    });

    socket.on('removeChannel', (payload) => {
      console.log('WebSocket received removeChannel:', payload);
      store.dispatch(channelsActions.removeChannel(payload.id));
      store.dispatch(messagesActions.removeMessagesByChannelId(payload.id));
    });

    socket.on('renameChannel', (payload) => {
      console.log('WebSocket received renameChannel:', payload);
      store.dispatch(
        channelsActions.renameChannel({
          id: payload.id,
          changes: { name: payload.name },
        })
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

const init = () => (
  <Provider store={store}>
    <AuthProvider>
      <SocketEventsHandler />
      <App />
    </AuthProvider>
  </Provider>
);

export default init;