import { combineReducers } from 'redux';
import { sessionReducer } from './sessionReducer';
import { projectReducer } from './project';
import loaderReducer from './loader';

const rootReducer = combineReducers({
  currentUser: sessionReducer,
  loading: loaderReducer,
  projects: projectReducer,
});

export default rootReducer;
