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
  };

  const baseConfig = {
    withCredentials: true,
  };

  const getAllProjects = async () => {
    try {
      const res = await axios.get(
        endPoints.rootURI + endPoints.allProjects,
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

  return {
    getAllProjects,
    createProject,
    searchProject,
    getProjectDetails,
    favoriteProject,
    unFavoriteProject,
  };
})();

export default BackendAPI;
