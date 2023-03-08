import { generateName } from './generateName';
import { setCurrentUser, validateUser, logOutUser } from './authenticationActions';
import { addConversation, fetchConversations, addMessages } from './conversation';
import { fetchFavorites } from './favorite';
import { fetchProjects, fetchProjectDetails } from './project';
import { updateUserImage } from './user';
import loaderActions from './loader';

export {
  generateName,
  setCurrentUser,
  validateUser,
  logOutUser,
  fetchConversations,
  addMessages,
  fetchFavorites,
  fetchProjects,
  fetchProjectDetails,
  addConversation,
  updateUserImage,
  loaderActions,
};
