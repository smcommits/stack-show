import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/index';

const composedEnhancer = applyMiddleware(thunkMiddleware);

const render = (ui, preloadedState = {}, renderOptions = {}) => {
  const store = createStore(rootReducer, preloadedState, composedEnhancer);
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
