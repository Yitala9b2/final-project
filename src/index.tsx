import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, HashRouter  } from 'react-router-dom';
import App from './app/App';

//process.env.PUBLIC_URL

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
        <HashRouter basename="">
            <Provider store={store}>
                <App />
            </Provider>
        </HashRouter>
);
