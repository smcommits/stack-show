import axios from 'axios';

const backendAPI = (() => {
  const endPoints = {
    rootURI: 'http://localhost:5000/api',
    allProjects: '/projects',
    createProject: '/projects',
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

  return {
    getAllProjects,
    createProject,
  };
})();

export default backendAPI;
