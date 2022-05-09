import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './style/main.css'

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="text-4xl font-bold">hello world</div>
      <App />
    </Provider>
  </React.StrictMode>
);

