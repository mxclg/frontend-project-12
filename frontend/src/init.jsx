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
      const state = store.getState();
      if (!state.channels.entities[payload.id]) {
        store.dispatch(channelsActions.addChannelDirectly(payload));
      } else {
      }
    });

    socket.on('renameChannel', (payload) => {
      store.dispatch(channelsActions.renameChannelDirectly({ id: payload.id, changes: { name: payload.name } }));
    });
    
    socket.on('removeChannel', (payload) => {
      store.dispatch(channelsActions.removeChannelDirectly(payload.id));
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