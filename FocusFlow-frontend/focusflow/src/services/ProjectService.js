import axios from 'axios';
import { API_ENDPOINTS, getAuthHeaders } from './ApiConfig';

/**
 * Service for handling projects in the application
 */
const ProjectService = {
  /**
   * Fetches all user's projects and tasks
   * @returns {Promise} Promise containing list of projects
   */
  getAllProjects: async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.PROJECTS.ALL, {
        headers: getAuthHeaders()
      });
      
      return response.data;
    } catch (error) {
      console.error('Error while fetching projects:', error);
      throw error;
    }
  },

  /**
   * Fetches details of a single project
   * @param {number} projectId - Project ID
   * @returns {Promise} Promise containing project details
   */
  getProjectById: async (projectId) => {
    try {
      const response = await axios.get(API_ENDPOINTS.PROJECTS.GET(projectId), {
        headers: getAuthHeaders()
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error while fetching project with ID ${projectId}:`, error);
      throw error;
    }
  },

  /**
   * Creates a new project
   * @param {Object} projectData - New project data
   * @returns {Promise} Promise containing created project
   */
  createProject: async (projectData) => {
    try {
      const response = await axios.post(API_ENDPOINTS.PROJECTS.CREATE, projectData, {
        headers: getAuthHeaders()
      });
      
      return response.data;
    } catch (error) {
      console.error('Error while creating project:', error);
      throw error;
    }
  },

  /**
   * Updates existing project
   * @param {number} projectId - Project ID
   * @param {Object} projectData - New project data
   * @returns {Promise} Promise containing updated project
   */
  updateProject: async (projectId, projectData) => {
    try {
      const response = await axios.put(API_ENDPOINTS.PROJECTS.UPDATE(projectId), projectData, {
        headers: getAuthHeaders()
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error while updating project with ID ${projectId}:`, error);
      throw error;
    }
  },

  /**
   * Deletes a project
   * @param {number} projectId - ID of project to delete
   * @returns {Promise} Promise containing operation result
   */
  deleteProject: async (projectId) => {
    try {
      const response = await axios.delete(API_ENDPOINTS.PROJECTS.DELETE(projectId), {
        headers: getAuthHeaders()
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error while deleting project with ID ${projectId}:`, error);
      throw error;
    }
  }
};

export default ProjectService; 