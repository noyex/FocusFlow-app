import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import ProjectService from '../services/ProjectService';
import TaskService from '../services/TaskService';
import CreateProjectModal from '../components/projects/CreateProjectModal';
import CreateTaskModal from '../components/tasks/CreateTaskModal';
import AddProjectButton from '../components/projects/AddProjectButton';
import '../styles/pages/WorkspacePage.css';
import { motion, AnimatePresence } from 'framer-motion';

const WorkspacePage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectTasks, setSelectedProjectTasks] = useState([]);
  const [isProjectListCollapsed, setIsProjectListCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('tasks'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('name');
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    due_to: ''
  });
  const [createProjectError, setCreateProjectError] = useState(null);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    estimatedTime: '',
    priority: 'MEDIUM'
  });
  const [createTaskError, setCreateTaskError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [completingTaskIds, setCompletingTaskIds] = useState([]);
  const projectsPanelRef = useRef(null);

  // Funkcja do odświeżania danych
  const refreshData = async () => {
    try {
      setIsRefreshing(true);
      setError(null);
      
      console.log('Rozpoczynam odświeżanie danych...');
      const projectsData = await ProjectService.getAllProjects();
      // Upewnij się, że projectsData jest tablicą
      const validProjectsData = Array.isArray(projectsData) ? projectsData : [];
      console.log('Pobrano projekty:', validProjectsData);
      
      // Zaktualizuj stan projektów
      setProjects(validProjectsData);
      
      // Jeśli był wybrany projekt, znajdź go w nowych danych
      if (selectedProject) {
        const updatedSelectedProject = validProjectsData.find(p => p.id === selectedProject.id);
        if (updatedSelectedProject) {
          console.log('Zaktualizowano wybrany projekt:', updatedSelectedProject);
          setSelectedProject(updatedSelectedProject);
          setSelectedProjectTasks(updatedSelectedProject.tasks || []);
        } else {
          console.log('Nie znaleziono wybranego projektu po odświeżeniu danych');
          // Jeśli nie znaleziono projektu, zresetuj stan
          if (validProjectsData.length > 0) {
            setSelectedProject(validProjectsData[0]);
            setSelectedProjectTasks(validProjectsData[0].tasks || []);
          } else {
            setSelectedProject(null);
            setSelectedProjectTasks([]);
          }
        }
      } else if (validProjectsData.length > 0) {
        // Jeśli nie ma wybranego projektu, ale mamy projekty, wybierz pierwszy
        setSelectedProject(validProjectsData[0]);
        setSelectedProjectTasks(validProjectsData[0].tasks || []);
      }
      
      setIsRefreshing(false);
      console.log('Zakończono odświeżanie danych');
    } catch (err) {
      console.error('Error while refreshing data:', err);
      setError('Failed to refresh data. Please try again.');
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchProjectsAndTasks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const projectsData = await ProjectService.getAllProjects();
        // Upewnij się, że projectsData jest tablicą
        const validProjectsData = Array.isArray(projectsData) ? projectsData : [];
        setProjects(validProjectsData);
        
        if (validProjectsData.length > 0 && !selectedProject) {
          setSelectedProject(validProjectsData[0]);
          setSelectedProjectTasks(validProjectsData[0].tasks || []);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error while fetching projects:', err);
        setError('Failed to load projects. Please check your connection.');
        setIsLoading(false);
      }
    };

    fetchProjectsAndTasks();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      setSelectedProjectTasks(selectedProject.tasks || []);
    } else {
      setSelectedProjectTasks([]);
    }
  }, [selectedProject]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setSelectedProjectTasks(project.tasks || []);
  };

  const handleToggleProjectList = () => {
    setIsProjectListCollapsed(!isProjectListCollapsed);
  };

  const markTaskAsCompleted = async (taskId, e) => {
    // e.stopPropagation() i e.preventDefault() są już obsługiwane w miejscu wywołania
    
    // Sprawdź, czy mamy dostęp do wybranego projektu
    if (!selectedProject) {
      console.error('No project selected');
      return;
    }
    
    // Znajdź zadanie, którego status zmieniamy
    const taskToUpdate = selectedProjectTasks.find(t => t.id === taskId);
    
    // Sprawdź, czy zadanie istnieje
    if (!taskToUpdate) {
      console.error(`Task with id ${taskId} not found`);
      return;
    }
    
    // Jeśli zadanie jest już oznaczone jako wykonane lub jest w trakcie oznaczania, nie rób nic
    if (taskToUpdate.completed || completingTaskIds.includes(taskId)) {
      return;
    }
    
    // Dodaj zadanie do listy zadań w trakcie oznaczania jako wykonane
    setCompletingTaskIds(prev => [...prev, taskId]);
    
    // Tymczasowo zaktualizuj UI
    const updatedTasks = selectedProjectTasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    );
    
    setSelectedProjectTasks(updatedTasks);
    
    // Upewnij się, że projects jest tablicą przed użyciem map
    if (!Array.isArray(projects)) {
      console.error('Projects is not an array');
      setCompletingTaskIds(prev => prev.filter(id => id !== taskId));
      return;
    }
    
    const updatedProjects = projects.map(project => 
      project.id === selectedProject.id 
        ? { 
            ...project, 
            tasks: project.tasks?.map(t => 
              t.id === taskId ? { ...t, completed: true } : t
            ),
            completedTasks: (project.completedTasks || 0) + 1 
          } 
        : project
    );
    
    setProjects(updatedProjects);
    
    // Wyślij zapytanie do API
    try {
      const result = await TaskService.markTaskAsCompleted(taskId, true);
      
      // Sprawdź, czy wystąpił błąd
      if (result && result.error) {
        console.error('Error from API:', result.message);
        // Cofnij tymczasowe zmiany w UI
        setSelectedProjectTasks(selectedProjectTasks);
        setProjects(projects);
        // Pokaż komunikat o błędzie
        setError(`Failed to mark task as completed: ${result.message}`);
        return;
      }
      
      console.log('Zadanie zostało oznaczone jako wykonane, odświeżam dane...');
      
      // Pobierz najnowsze projekty
      try {
        const updatedProjects = await ProjectService.getAllProjects();
        if (Array.isArray(updatedProjects)) {
          console.log('Pobrano zaktualizowane projekty:', updatedProjects);
          
          // Aktualizuj projekty
          setProjects(updatedProjects);
          
          // Jeśli był wybrany projekt, znajdź go w nowych danych
          if (selectedProject) {
            const freshSelectedProject = updatedProjects.find(p => p.id === selectedProject.id);
            if (freshSelectedProject) {
              console.log('Aktualizuję wybrany projekt:', freshSelectedProject);
              setSelectedProject(freshSelectedProject);
              setSelectedProjectTasks(freshSelectedProject.tasks || []);
            }
          }
        }
      } catch (refreshErr) {
        console.error('Error while refreshing projects after task completion:', refreshErr);
      }
      
      // Odśwież dane z serwera przez standardową funkcję
      await refreshData();
      
      // Dodatkowo pobierz projekty jeszcze raz po krótkim czasie, aby upewnić się, że mamy aktualne dane
      setTimeout(async () => {
        try {
          console.log('Wykonuję dodatkowe odświeżanie projektów...');
          await refreshData();
        } catch (err) {
          console.error('Error during additional refresh:', err);
        }
      }, 1000);
      
    } catch (err) {
      console.error('Error while marking task as completed:', err);
      // Cofnij tymczasowe zmiany w UI jeśli api call się nie powiódł
      setSelectedProjectTasks(selectedProjectTasks);
      setProjects(projects);
      // Pokaż komunikat o błędzie
      setError('Failed to mark task as completed. Please try again.');
    } finally {
      // Usuń zadanie z listy zadań w trakcie oznaczania jako wykonane
      setCompletingTaskIds(prev => prev.filter(id => id !== taskId));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      setCreateProjectError(null);
      const createdProject = await ProjectService.createProject(newProject);
      
      // Tymczasowo zaktualizuj lokalny stan
      setProjects(prevProjects => [...prevProjects, createdProject]);
      setSelectedProject(createdProject);
      setSelectedProjectTasks(createdProject.tasks || []);
      
      // Odśwież dane z serwera
      await refreshData();
      
      setIsCreateProjectModalOpen(false);
      setNewProject({
        name: '',
        description: '',
        due_to: ''
      });
    } catch (err) {
      console.error('Error while creating project:', err);
      setCreateProjectError('Failed to create project. Please try again.');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      setCreateTaskError(null);
      const taskData = {
        ...newTask,
        projectId: selectedProject.id
      };
      
      const createdTask = await TaskService.createTask(taskData);
      
      // Tymczasowa aktualizacja UI dla lepszego UX
      setSelectedProjectTasks(prevTasks => [...prevTasks, createdTask]);
      
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === selectedProject.id
            ? { ...project, totalTasks: project.totalTasks + 1 }
            : project
        )
      );
      
      // Odśwież dane z serwera
      await refreshData();
      
      setIsCreateTaskModalOpen(false);
      setNewTask({
        name: '',
        estimatedTime: '',
        priority: 'MEDIUM'
      });
    } catch (err) {
      console.error('Error while creating task:', err);
      setCreateTaskError('Failed to create task. Please try again.');
    }
  };

  const filteredProjects = searchTerm 
    ? (Array.isArray(projects) ? projects : []).filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : (Array.isArray(projects) ? projects : []);

  const filteredAndSortedTasks = (() => {
    // Upewnij się, że selectedProjectTasks jest tablicą
    const validTasks = Array.isArray(selectedProjectTasks) ? selectedProjectTasks : [];
    
    let tasksToProcess = searchTerm 
      ? validTasks.filter(task => 
          task.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : validTasks;
    
    // Upewnij się, że mamy tablicę przed sortowaniem
    if (!Array.isArray(tasksToProcess)) {
      return [];
    }
    
    return tasksToProcess.sort((a, b) => {
      switch(sortOption) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'time':
          return a.estimatedTime - b.estimatedTime;
        default:
          return 0;
      }
    });
  })();

  const renderCompletionPercentage = (completedTasks, totalTasks) => {
    const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    return Math.round(percentage);
  };

  const getTaskStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'to_do':
        return '●';
      case 'in_progress':
        return '◐';
      case 'done':
        return '✓';
      default:
        return '○';
    }
  };

  return (
    <div className="workspace-page">
      <Navbar navType="dashboard" />
      
      <div className="workspace-content ios-style">
        <div className="workspace-header">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Workspace
          </motion.h1>
          
          <motion.div 
            className="search-container"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search projects and tasks..." 
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search" 
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </motion.div>
          
          <motion.div
            className="header-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AddProjectButton onClick={() => setIsCreateProjectModalOpen(true)} />
          </motion.div>
        </div>
        
        <div className={`workspace-container ${isProjectListCollapsed ? 'collapsed-projects' : ''}`}>
          <motion.div 
            layout
            ref={projectsPanelRef}
            className={`projects-panel ${isProjectListCollapsed ? 'collapsed' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isProjectListCollapsed ? (
              <button 
                className="expand-btn" 
                onClick={handleToggleProjectList}
                aria-label="Expand projects panel"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            ) : (
              <>
                <div className="panel-header">
                  <h2>Projects</h2>
                  <button 
                    className="collapse-btn" 
                    onClick={handleToggleProjectList}
                    aria-label="Collapse projects panel"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                </div>
                
                {isLoading && !error && <div className="loading-indicator"></div>}
                {error && <p className="error-message">{error}</p>}
                
                <AnimatePresence>
                  <div className="projects-list">
                    {filteredProjects.map((project, index) => (
                      <motion.div 
                        key={project.id} 
                        className={`project-card ${selectedProject && selectedProject.id === project.id ? 'selected' : ''}`}
                        onClick={() => handleProjectClick(project)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="project-card-content">
                          <h3>{project.name}</h3>
                          <div className="project-stats">
                            <div className="project-progress-container">
                              <div className="progress-bar-bg">
                                <div 
                                  className="progress-bar-fill" 
                                  style={{ width: `${renderCompletionPercentage(project.completedTasks, project.totalTasks)}%` }}
                                ></div>
                              </div>
                              <span className="progress-text">{renderCompletionPercentage(project.completedTasks, project.totalTasks)}%</span>
                            </div>
                            <div className="task-count">
                              <span className="task-count-number">{project.completedTasks} / {project.totalTasks}</span>
                              <span className="task-count-label">tasks</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {filteredProjects.length === 0 && !isLoading && !error && (
                      <div className="empty-state">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="8" y1="12" x2="16" y2="12"></line>
                          <line x1="12" y1="8" x2="12" y2="16"></line>
                        </svg>
                        <p>{searchTerm ? 'No search results' : 'No projects'}</p>
                        <AddProjectButton onClick={() => setIsCreateProjectModalOpen(true)} />
                      </div>
                    )}
                  </div>
                </AnimatePresence>
              </>
            )}
          </motion.div>
          
          <motion.div 
            layout
            className="content-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="tabs-container">
              <button 
                className={`tab-button ${activeTab === 'tasks' ? 'active' : ''}`}
                onClick={() => handleTabChange('tasks')}
              >
                Tasks
              </button>
              <button 
                className={`tab-button ${activeTab === 'pomodoro' ? 'active' : ''}`}
                onClick={() => handleTabChange('pomodoro')}
              >
                Pomodoro
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              {activeTab === 'tasks' ? (
                <motion.div 
                  key="tasks"
                  className="tab-content tasks-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedProject ? (
                    <>
                      <div className="content-header">
                        <h2>Tasks: {selectedProject.name}</h2>
                        <div className="tasks-controls">
                          <div className="view-controls">
                            <button 
                              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`} 
                              onClick={() => handleViewModeChange('grid')}
                              aria-label="Grid view"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                              </svg>
                            </button>
                            <button 
                              className={`view-button ${viewMode === 'list' ? 'active' : ''}`} 
                              onClick={() => handleViewModeChange('list')}
                              aria-label="List view"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="8" y1="6" x2="21" y2="6"></line>
                                <line x1="8" y1="12" x2="21" y2="12"></line>
                                <line x1="8" y1="18" x2="21" y2="18"></line>
                                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                <line x1="3" y1="18" x2="3.01" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                          <button 
                            className={`refresh-button ${isRefreshing ? 'refreshing' : ''}`}
                            onClick={refreshData}
                            disabled={isRefreshing}
                            aria-label="Refresh data"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="1 4 1 10 7 10"></polyline>
                              <polyline points="23 20 23 14 17 14"></polyline>
                              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                            </svg>
                          </button>
                          <div className="sort-controls">
                            <select 
                              value={sortOption} 
                              onChange={handleSortChange}
                              className="sort-select"
                            >
                              <option value="name">Sort: Name</option>
                              <option value="status">Sort: Status</option>
                              <option value="time">Sort: Time</option>
                            </select>
                          </div>
                          <button 
                            className="add-task-btn"
                            onClick={() => setIsCreateTaskModalOpen(true)}
                          >
                            <span>+</span> Add task
                          </button>
                        </div>
                      </div>
                      
                      {isLoading && <div className="loading-indicator"></div>}
                      {error && <p className="error-message">{error}</p>}
                      
                      {viewMode === 'grid' ? (
                        <div className="tasks-grid">
                          {filteredAndSortedTasks.map((task, index) => (
                            <motion.div 
                              key={task.id} 
                              className={`task-card ${task.completed ? 'completed' : ''}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              whileHover={{ y: -5 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="task-status-indicator">
                                <span className={`status-icon ${task.status.toLowerCase()}`}>{getTaskStatusIcon(task.status)}</span>
                                <span className="status-text">{task.status.replace('_', ' ')}</span>
                              </div>
                              <h3>{task.name}</h3>
                              <div className="task-meta">
                                <span className="estimated-time">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                  </svg>
                                  {task.estimatedTime} min
                                </span>
                              </div>
                              <div className="task-actions">
                                <button 
                                  className={`complete-task-btn ${task.completed ? 'completed' : ''} ${completingTaskIds.includes(task.id) ? 'loading' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    markTaskAsCompleted(task.id, e);
                                  }}
                                  disabled={task.completed || completingTaskIds.includes(task.id)}
                                >
                                  {task.completed 
                                    ? 'Completed' 
                                    : completingTaskIds.includes(task.id) 
                                      ? 'Completing...' 
                                      : 'Mark as completed'}
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="tasks-list-view">
                          {filteredAndSortedTasks.map((task, index) => (
                            <motion.div 
                              key={task.id} 
                              className={`task-list-item ${task.completed ? 'completed' : ''}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.03 }}
                              whileHover={{ backgroundColor: 'rgba(50, 50, 66, 0.7)' }}
                            >
                              <div className="task-list-checkbox">
                                <button 
                                  className={`task-checkbox ${task.completed ? 'checked' : ''} ${completingTaskIds.includes(task.id) ? 'loading' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    markTaskAsCompleted(task.id, e);
                                  }}
                                  disabled={task.completed || completingTaskIds.includes(task.id)}
                                  aria-label={task.completed ? 'Completed' : 'Mark as completed'}
                                >
                                  {task.completed && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                  )}
                                  {completingTaskIds.includes(task.id) && (
                                    <span className="loading-indicator"></span>
                                  )}
                                </button>
                              </div>
                              <div className="task-list-content">
                                <h3 className={task.completed ? 'completed' : ''}>{task.name}</h3>
                                <div className="task-list-details">
                                  <span className={`status-badge ${task.status.toLowerCase()}`}>
                                    {task.status.replace('_', ' ')}
                                  </span>
                                  <span className="time-badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    {task.estimatedTime} min
                                  </span>
                                </div>
                              </div>
                              <div className="task-list-actions">
                                <button className="task-list-action edit-action">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                  </svg>
                                </button>
                                <button className="task-list-action delete-action">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  </svg>
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                      
                      {filteredAndSortedTasks.length === 0 && !isLoading && (
                        <div className="empty-state">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                          </svg>
                          <p>{searchTerm ? 'No search results' : 'No tasks in this project'}</p>
                          <button className="add-button">Add task</button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="no-selection-state">
                      <div className="empty-state-illustration">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6"></path>
                        </svg>
                      </div>
                      <h3>Select a project</h3>
                      <p>Choose a project from the list on the left to view tasks</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="pomodoro"
                  className="tab-content pomodoro-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pomodoro-container">
                    <div className="pomodoro-timer">
                      <div className="timer-display">
                        <span className="timer-numbers">25:00</span>
                      </div>
                      <div className="timer-controls">
                        <button className="timer-button start-button">
                          Start
                        </button>
                        <button className="timer-button reset-button">
                          Reset
                        </button>
                      </div>
                    </div>
                    <div className="pomodoro-settings">
                      <h3>Settings</h3>
                      <div className="settings-option">
                        <label>Work time (minutes)</label>
                        <div className="settings-control">
                          <button className="settings-button">-</button>
                          <span>25</span>
                          <button className="settings-button">+</button>
                        </div>
                      </div>
                      <div className="settings-option">
                        <label>Break time (minutes)</label>
                        <div className="settings-control">
                          <button className="settings-button">-</button>
                          <span>5</span>
                          <button className="settings-button">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        <CreateProjectModal
          isOpen={isCreateProjectModalOpen}
          onClose={() => setIsCreateProjectModalOpen(false)}
          onSubmit={handleCreateProject}
          projectData={newProject}
          onProjectDataChange={setNewProject}
          error={createProjectError}
        />
      </AnimatePresence>

      <AnimatePresence>
        <CreateTaskModal
          isOpen={isCreateTaskModalOpen}
          onClose={() => setIsCreateTaskModalOpen(false)}
          onSubmit={handleCreateTask}
          taskData={newTask}
          onTaskDataChange={setNewTask}
          error={createTaskError}
          projectId={selectedProject?.id}
        />
      </AnimatePresence>
    </div>
  );
};

export default WorkspacePage; 