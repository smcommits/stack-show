import RequestClients from '../clients/index';

const BackendAPI = (() => {
  const { rootClient } = RequestClients;

  const endPoints = {
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

  const getAllProjects = async (page) => {
    try {
      const res = await rootClient.get(`${endPoints.allProjects}?page=${page}`);
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
      const res = await rootClient.post(
        endPoints.createProject,
        projectsParams,
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
      const res = await rootClient.get(
        `${endPoints.projectSearch}/?query=${query}`,
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
      const res = rootClient.get(endPoints.projectDetails + id);
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
      const res = rootClient.post(endPoints.favoriteProject, {
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
      const res = rootClient.delete(endPoints.favoriteProject + id);
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
      const res = await rootClient.get(endPoints.favoriteProject);
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
      const res = rootClient.get(endPoints.allConversations);
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
      const res = rootClient.post(endPoints.createMessage, {
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
      const res = await rootClient.get(`${endPoints.userSearch}/?query=${query}`);
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
      const res = rootClient.post(endPoints.startConversation, {
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
      const res = rootClient.put(endPoints.userUpdate + id, params);
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
