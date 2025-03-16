import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import ProjectService from '../services/ProjectService';
import TaskService from '../services/TaskService';
import '../styles/pages/WorkspacePage.css';

const WorkspacePage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isProjectListCollapsed, setIsProjectListCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const projectsData = await ProjectService.getAllProjects();
        setProjects(projectsData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error while fetching projects:', err);
        setError('Failed to fetch projects. Please check your server connection.');
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Fetch tasks for selected project
  useEffect(() => {
    const fetchTasks = async () => {
      if (!selectedProject) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const tasksData = await TaskService.getTasksByProjectId(selectedProject.id);
        setTasks(tasksData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error while fetching tasks:', err);
        setError('Failed to fetch tasks for the selected project.');
        setIsLoading(false);
      }
    };

    if (selectedProject) {
      fetchTasks();
    }
  }, [selectedProject]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsProjectListCollapsed(true);
  };

  const toggleProjectList = () => {
    setIsProjectListCollapsed(!isProjectListCollapsed);
  };

  const renderCompletionPercentage = (completedTasks, totalTasks) => {
    const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    return Math.round(percentage);
  };

  const markTaskAsCompleted = (taskId) => {
    // For now, just UI simulation without API call
    console.log(`Marking task ${taskId} as completed - functionality not yet implemented`);
    
    // Simulate change in UI
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    
    // Code below can be uncommented when API is ready
    /* 
    const toggleTaskCompletion = async () => {
      try {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;
        
        const updatedTask = await TaskService.markTaskAsCompleted(taskId, !task.completed);
        
        // Update tasks state after successful API call
        setTasks(tasks.map(t => 
          t.id === taskId ? updatedTask : t
        ));
      } catch (err) {
        console.error('Error while marking task as completed:', err);
        // Error handling can be added here, e.g., displaying a message
      }
    };
    
    toggleTaskCompletion();
    */
  };

  return (
    <div className="workspace-page">
      <Navbar navType="dashboard" />
      
      <div className="workspace-content">
        <div className="workspace-header">
          <h1>Your Workspace</h1>
          <p>Manage your projects and tasks in one place</p>
        </div>
        
        <div className="workspace-container">
          {/* Projects panel */}
          <div className={`projects-panel ${isProjectListCollapsed ? 'collapsed' : ''}`}>
            {isProjectListCollapsed ? (
              <button className="expand-btn" onClick={toggleProjectList}>
                &raquo;
              </button>
            ) : (
              <>
                <h2>Your Projects</h2>
                {isLoading && !error && <p className="loading">Loading projects...</p>}
                {error && <p className="error">{error}</p>}
                
                <div className="projects-list">
                  {projects.map(project => (
                    <div 
                      key={project.id} 
                      className="project-item"
                      onClick={() => handleProjectClick(project)}
                    >
                      <h3>{project.name}</h3>
                      <p>Tasks: {project.completedTasks} / {project.totalTasks}</p>
                      <div className="project-progress">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${renderCompletionPercentage(project.completedTasks, project.totalTasks)}%` }}
                        ></div>
                        <span>{renderCompletionPercentage(project.completedTasks, project.totalTasks)}%</span>
                      </div>
                    </div>
                  ))}
                  
                  {projects.length === 0 && !isLoading && !error && (
                    <p className="no-data">You don't have any projects yet.</p>
                  )}
                </div>
              </>
            )}
          </div>
          
          {/* Tasks panel */}
          <div className={`tasks-panel ${selectedProject ? 'active' : ''}`}>
            {selectedProject ? (
              <>
                <div className="panel-header">
                  <h2>Tasks: {selectedProject.name}</h2>
                  {isProjectListCollapsed && (
                    <button className="back-btn" onClick={toggleProjectList}>
                      Back to Projects List
                    </button>
                  )}
                </div>
                
                {isLoading && <p className="loading">Loading tasks...</p>}
                {error && <p className="error">{error}</p>}
                
                <div className="tasks-list">
                  {tasks.map(task => (
                    <div key={task.id} className="task-item">
                      <div className="task-info">
                        <h3>{task.name}</h3>
                        <div className="task-details">
                          <span className={`task-status ${task.status.toLowerCase()}`}>
                            {task.status}
                          </span>
                          <span className="task-time">
                            Estimated time: {task.estimatedTime} min
                          </span>
                        </div>
                      </div>
                      <div className="task-actions">
                        <button 
                          className={`complete-btn ${task.completed ? 'completed' : ''}`}
                          onClick={() => markTaskAsCompleted(task.id)}
                        >
                          {task.completed ? 'Completed' : 'Mark as completed'}
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {tasks.length === 0 && !isLoading && (
                    <p className="no-data">This project doesn't have any tasks yet.</p>
                  )}
                </div>
              </>
            ) : (
              <div className="select-project-message">
                <p>Select a project from the list to view tasks</p>
              </div>
            )}
          </div>
          
          {/* Pomodoro timer panel */}
          <div className="timer-panel">
            {/* Empty for now, as instructed */}
            <h2>Pomodoro Timer</h2>
            <div className="empty-panel">
              <p>Timer functionality coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage; 