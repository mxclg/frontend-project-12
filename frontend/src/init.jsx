import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import FilterProvider from './providers/FilterProvider.jsx';
import resources from './locales/index.js';
import store from './slices/store.js';
import { AuthProvider } from './contexts/AuthContext.jsx';
import App from "./components/App.jsx";
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';

const i18n = i18next.createInstance();

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

const init = async () => {
  await i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
  });

  return (
    <Provider store={store}>
  <AuthProvider>
    <FilterProvider>
      <I18nextProvider i18n={i18n}>
        <SocketEventsHandler />
        <App />
      </I18nextProvider>
    </FilterProvider>
  </AuthProvider>
</Provider>
  );
};

export default init;