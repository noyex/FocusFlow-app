import React from 'react';
import { motion } from 'framer-motion';

const CreateProjectModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  projectData, 
  onProjectDataChange,
  error 
}) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>New project</h2>
          <button 
            className="close-button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="create-project-form">
          <div className="form-group">
            <label htmlFor="projectName">Project name</label>
            <input
              type="text"
              id="projectName"
              value={projectData.name}
              onChange={(e) => onProjectDataChange({ ...projectData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="projectDescription">Description</label>
            <textarea
              id="projectDescription"
              value={projectData.description}
              onChange={(e) => onProjectDataChange({ ...projectData, description: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="projectDueDate">Due date</label>
            <input
              type="date"
              id="projectDueDate"
              value={projectData.due_to}
              onChange={(e) => onProjectDataChange({ ...projectData, due_to: e.target.value })}
              required
            />
          </div>
          
          {error && (
            <div className="error-message">{error}</div>
          )}
          
          <div className="modal-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
            >
              Create project
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateProjectModal; 