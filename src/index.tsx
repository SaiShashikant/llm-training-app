// src/index.tsx
import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store'; // Import your Redux store
import {Provider} from 'react-redux';

// Use createRoot instead of ReactDOM.render
const rootElement = document.getElementById('root')!;
createRoot(rootElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
