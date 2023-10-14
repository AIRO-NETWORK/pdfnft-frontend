import './index.css';
import './assets/sass/theme.scss';
import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import store from './store';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
