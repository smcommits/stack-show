import { combineReducers } from 'redux';
import { sessionReducer } from './sessionReducer';
import loaderReducer from './loader';

const rootReducer = combineReducers({
  currentUser: sessionReducer,
  loading: loaderReducer,
});

export default rootReducer;
