import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { store } from './slices/index.js';
import { AuthProvider } from './contexts/AuthContext.jsx';
import App from "./components/App.jsx";
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';

const SocketEventsHandler = () => {
  useEffect(() => {
    const socket = io();

    socket.on('newMessage', (payload) => {
      store.dispatch(messagesActions.addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      store.dispatch(channelsActions.addChannel(payload));
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