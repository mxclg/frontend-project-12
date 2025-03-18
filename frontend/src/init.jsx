import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import store from './slices/store.js';
import { AuthProvider } from './contexts/AuthContext.jsx';
import App from "./components/App.jsx";
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';

const SocketEventsHandler = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io();
    }

    const socket = socketRef.current;

    socket.on('newMessage', (payload) => {
      store.dispatch(messagesActions.addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      console.log('WebSocket: newChannel event received:', payload);
      const state = store.getState();
      if (!state.channels.entities[payload.id]) {
        console.log('Adding new channel:', payload.name);
        store.dispatch(channelsActions.addChannelDirectly(payload));
      } else {
        console.log('Channel already exists, skipping:', payload.name);
      }
    });

    socket.on('removeChannel', (payload) => {
      store.dispatch(removeChannel(payload.id));
      store.dispatch(messagesActions.removeMessagesByChannelId(payload.id));
    });

    socket.on('renameChannel', (payload) => {
      store.dispatch(renameChannel({ id: payload.id, changes: { name: payload.name } }));
    });

    return () => {
      socket.off('newChannel');
      socket.off('newMessage');
      socket.off('removeChannel');
      socket.off('renameChannel');
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