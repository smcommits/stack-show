import { combineReducers } from 'redux';
import { sessionReducer } from './sessionReducer';
import { projectReducer } from './project';
import loaderReducer from './loader';
import { projectDetailsReducer } from './projectDetails';
import { favoriteProjectsReducer } from './favoriteProjects'
const rootReducer = combineReducers({
  currentUser: sessionReducer,
  loading: loaderReducer,
  projects: projectReducer,
  project: projectDetailsReducer,
  favoriteProjects: favoriteProjectsReducer
});

export default rootReducer;
