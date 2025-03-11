import React from 'react';
import { Provider } from 'react-redux';
import { store } from './slices/index.js';
import { AuthProvider } from './contexts/AuthContext.jsx';
import App from "./App.jsx";

const init = () => (
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);

export default init;