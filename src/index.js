import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ActionCable from 'actioncable';
import ActionCableProvider from 'react-actioncable-provider';
import rootReducer from './reducers/index';
import App from './components/App';
import './stylesheets/Index.scss';
import { validateUser } from './reducers/sessionReducer';

const composedEnhancer = applyMiddleware(thunkMiddleware);
// const composedEnhancer = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, composedEnhancer);
const cable = ActionCable.createConsumer('ws://localhost:5000/cable');

ReactDOM.render(
    <ActionCableProvider cable={cable}>
      <Provider store={store}>
        <App />
      </Provider>
    </ActionCableProvider>, 
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
