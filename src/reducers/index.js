import { combineReducers } from 'redux';
import { sessionReducer } from './sessionReducer';
import { projectReducer } from './project';
import loaderReducer from './loader';
import { projectDetailsReducer } from './projectDetails';
import { favoriteProjectsReducer } from './favoriteProjects';
import { conversationReducer } from './conversationReducer';
import currentComponent from './currentComponent';

const rootReducer = combineReducers({
  currentUser: sessionReducer,
  loading: loaderReducer,
  projects: projectReducer,
  project: projectDetailsReducer,
  favoriteProjects: favoriteProjectsReducer,
  conversations: conversationReducer,
  currentComp: currentComponent,
});

export default rootReducer;
