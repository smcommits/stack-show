import axios from 'axios';

const BackendAPI = (() => {
  axios.defaults.withCredentials = true;

  const endPoints = {
    rootURI: 'http://localhost:5000/api',
    allProjects: '/projects',
    createProject: '/projects',
    projectSearch: '/search/projects',
    projectDetails: '/projects/',
    favoriteProject: '/favorites/',
    allConversations: '/conversations',
    createMessage: '/messages',
    userSearch: '/search/users',
    startConversation: '/conversations',
    userUpdate: '/users/',
  };

  const baseConfig = {
    withCredentials: true,
  };

  const getAllProjects = async (page) => {
    try {
      const res = await axios.get(
        `${endPoints.rootURI + endPoints.allProjects}?page=${page}`,
        baseConfig,
      );
      return res;
    } catch (err) {
      if (err.response) {
        return { ...err.response };
      }

      return err;
    }
  };

  const createProject = async (projectsParams) => {
    try {
      const res = await axios.post(
        endPoints.rootURI + endPoints.createProject,
        projectsParams,
        baseConfig,
      );
      return res;
    } catch (err) {
      if (err.response) {
        return { ...err.response };
      }

      return err;
    }
  };

  const searchProject = async (query) => {
    try {
      const res = await axios.get(
        `${endPoints.rootURI + endPoints.projectSearch}/?query=${query}`,
        { withCredentials: true },
      );
      return res;
    } catch (err) {
      if (err.response) {
        return err.response;
      }
      return err;
    }
  };

  const getProjectDetails = async (id) => {
    try {
      const res = axios.get(endPoints.rootURI + endPoints.projectDetails + id, {
        withCredentials: true,
      });
      return res;
    } catch (err) {
      if (err.response) {
        return err.response;
      }
      return err;
    }
  };

  const favoriteProject = async (id) => {
    try {
      const res = axios.post(endPoints.rootURI + endPoints.favoriteProject, {
        params: {
          project_id: id,
        },

      });
      return res;
    } catch (err) {
      if (err.response) {
        return err.response;
      }
      return err;
    }
  };

  const unFavoriteProject = async (id) => {
    try {
      const res = axios.delete(endPoints.rootURI + endPoints.favoriteProject + id);
      return res;
    } catch (err) {
      if (err.response) {
        return err.response;
      }
      return err;
    }
  };

  const favoriteProjects = async () => {
    try {
      const res = axios.get(endPoints.rootURI + endPoints.favoriteProject);
      return res;
    } catch (err) {
      if (err.response) {
        return err.response;
      }
      return err;
    }
  };

  const allConversations = async () => {
    try {
      const res = axios.get(endPoints.rootURI + endPoints.allConversations);
      return res;
    } catch (err) {
      if (err.response) {
        return err.response;
      }
      return err;
    }
  };

  const createMessage = async (text, conversationId, userId) => {
    try {
      const res = axios.post(endPoints.rootURI + endPoints.createMessage, {
        params: {
          text,
          conversation_id: conversationId,
          user_id: userId,
        },
      });
      return res;
    } catch (err) {
      if (err.response) {
        return err.response;
      }
      return err;
    }
  };

  const searchUsers = async (query) => {
    try {
      const res = await axios.get(
        `${endPoints.rootURI + endPoints.userSearch}/?query=${query}`,
        { withCredentials: true },
      );
      return res;
    } catch (err) {
      if (err.response) {
        return err.response;
      }
      return (err);
    }
  };

  const startConversation = async (title, senderId, recieverId) => {
    try {
      const res = axios.post(endPoints.rootURI + endPoints.startConversation, {
        params: {
          title,
          sender_id: senderId,
          reciever_id: recieverId,
        },
      });
      return res;
    } catch (err) {
      if (err.response) {
        return err.response;
      }
      return err;
    }
  };

  const updateUser = async (id, params) => {
    try {
      const res = axios.put(endPoints.rootURI + endPoints.userUpdate + id, params);
      return res;
    } catch (err) {
      if (err.response) {
        return err.response;
      }
      return err;
    }
  };

  return {
    getAllProjects,
    createProject,
    searchProject,
    getProjectDetails,
    favoriteProject,
    unFavoriteProject,
    favoriteProjects,
    allConversations,
    createMessage,
    searchUsers,
    startConversation,
    updateUser,
  };
})();

export default BackendAPI;
