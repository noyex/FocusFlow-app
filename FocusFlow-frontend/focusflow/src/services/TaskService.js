import axios from 'axios';
import { API_ENDPOINTS, getAuthHeaders } from './ApiConfig';

/**
 * Service for handling tasks in the application
 */
const TaskService = {
  /**
   * Fetches tasks for a specific project
   * @param {number} projectId - Project ID
   * @returns {Promise} Promise containing list of tasks
   */
  getTasksByProjectId: async (projectId) => {
    try {
      const response = await axios.get(API_ENDPOINTS.TASKS.BY_PROJECT(projectId), {
        headers: getAuthHeaders()
      });
      
      // Response can be either a single object or an array of objects
      const tasks = Array.isArray(response.data) ? response.data : [response.data];
      return tasks;
    } catch (error) {
      console.error(`Error while fetching tasks for project with ID ${projectId}:`, error);
      throw error;
    }
  },

  /**
   * Fetches details of a single task
   * @param {number} taskId - Task ID
   * @returns {Promise} Promise containing task details
   */
  getTaskById: async (taskId) => {
    try {
      const response = await axios.get(API_ENDPOINTS.TASKS.GET(taskId), {
        headers: getAuthHeaders()
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error while fetching task with ID ${taskId}:`, error);
      throw error;
    }
  },

  /**
   * Creates a new task
   * @param {number} projectId - Project ID
   * @param {Object} taskData - New task data
   * @returns {Promise} Promise containing created task
   */
  createTask: async (taskData) => {
    try {
      const response = await fetch(API_ENDPOINTS.TASKS.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(taskData)
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  /**
   * Updates existing task
   * @param {number} taskId - Task ID
   * @param {Object} taskData - New task data
   * @returns {Promise} Promise containing updated task
   */
  updateTask: async (taskId, taskData) => {
    try {
      const response = await axios.put(API_ENDPOINTS.TASKS.UPDATE(taskId), taskData, {
        headers: getAuthHeaders()
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error while updating task with ID ${taskId}:`, error);
      throw error;
    }
  },

  /**
   * Marks task as completed/uncompleted
   * @param {number} taskId - Task ID
   * @param {boolean} isCompleted - Whether the task is completed
   * @returns {Promise} Promise containing updated task
   */
  markTaskAsCompleted: async (taskId, isCompleted) => {
    console.log(`Oznaczam zadanie ${taskId} jako ${isCompleted ? 'wykonane' : 'niewykonane'}`);
    
    try {
      // Jeśli zadanie ma być oznaczone jako wykonane, używamy nowego endpointu
      if (isCompleted) {
        console.log(`Używam endpointu: ${API_ENDPOINTS.TASKS.STATUS_DONE(taskId)}`);
        const response = await axios.put(API_ENDPOINTS.TASKS.STATUS_DONE(taskId), {}, {
          headers: getAuthHeaders()
        });
        console.log('Odpowiedź z API:', response.data);
        return response.data || { completed: true };
      } else {
        console.log(`Używam endpointu: ${API_ENDPOINTS.TASKS.COMPLETE(taskId)}`);
        // Dla cofnięcia oznaczenia jako wykonane, używamy starego endpointu
        const response = await axios.patch(API_ENDPOINTS.TASKS.COMPLETE(taskId), { completed: false }, {
          headers: getAuthHeaders()
        });
        console.log('Odpowiedź z API:', response.data);
        return response.data || { completed: false };
      }
    } catch (error) {
      console.error(`Error while marking task with ID ${taskId} as ${isCompleted ? 'completed' : 'incomplete'}:`, error);
      console.error('Pełna informacja o błędzie:', error.response ? error.response.data : 'No response data');
      // Zamiast rzucać wyjątek, zwróć obiekt z informacją o błędzie
      return { error: true, message: error.message };
    }
  },

  /**
   * Deletes a task
   * @param {number} taskId - ID of task to delete
   * @returns {Promise} Promise containing operation result
   */
  deleteTask: async (taskId) => {
    try {
      const response = await axios.delete(API_ENDPOINTS.TASKS.DELETE(taskId), {
        headers: getAuthHeaders()
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error while deleting task with ID ${taskId}:`, error);
      throw error;
    }
  }
};

export default TaskService; 