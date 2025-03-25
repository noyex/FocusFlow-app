import React from 'react';
import { motion } from 'framer-motion';

const CreateTaskModal = ({ isOpen, onClose, onSubmit, taskData, onTaskDataChange, error, projectId }) => {
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
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Add new task</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form className="create-project-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Task name</label>
            <input
              type="text"
              id="name"
              value={taskData.name}
              onChange={(e) => onTaskDataChange({ ...taskData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="estimatedTime">Estimated time (minutes)</label>
            <input
              type="number"
              id="estimatedTime"
              value={taskData.estimatedTime}
              onChange={(e) => onTaskDataChange({ ...taskData, estimatedTime: parseInt(e.target.value) })}
              min="1"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={taskData.priority}
              onChange={(e) => onTaskDataChange({ ...taskData, priority: e.target.value })}
              required
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add task
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateTaskModal; 