import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import thunk from 'redux-thunk';

import App from './App';

import i18n from './i18n';

import reducers from './reducers';


const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_SIGN_IN_CLIENT_ID}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
