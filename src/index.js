import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import dotenv from 'dotenv';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import App from './containers/App';
import './stylesheets/Index.scss';

dotenv.config({ silent: process.env.NODE_ENV === 'production' });
const composedEnhancer = applyMiddleware(thunkMiddleware);
// const composedEnhancer = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, composedEnhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
