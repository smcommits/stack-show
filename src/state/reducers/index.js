import { combineReducers } from 'redux';
import conversationReducer from './conversationReducer';
import currentComponent from './currentComponent';
import favoriteProjectsReducer from './favoriteProjects';
import loaderReducer from './loader';
import projectReducer from './project';
import projectDetailsReducer from './projectDetails';
import sessionReducer from './sessionReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  projects: projectReducer,
  project: projectDetailsReducer,
  favoriteProjects: favoriteProjectsReducer,
  conversations: conversationReducer,
  currentComp: currentComponent,
  componentLoading: loaderReducer,

});

export default rootReducer;
