import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CreateTaskModal = ({ isOpen, onClose, onSubmit, taskData, onTaskDataChange, error, projectId }) => {
  const [priorityOpen, setPriorityOpen] = useState(false);

  if (!isOpen) return null;

  const priorityOptions = [
    { value: 'LOW', label: 'Low', color: '#5fa8ee' },
    { value: 'MEDIUM', label: 'Medium', color: '#f08a5d' },
    { value: 'HIGH', label: 'High', color: '#ff6b6b' },
  ];

  const getPriorityColor = (value) => {
    const option = priorityOptions.find(opt => opt.value === value);
    return option ? option.color : '#5fa8ee';
  };

  const togglePriorityDropdown = () => setPriorityOpen(!priorityOpen);

  const handlePrioritySelect = (value) => {
    onTaskDataChange({ ...taskData, priority: value });
    setPriorityOpen(false);
  };

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
            <div className="custom-select-container">
              <div 
                className="custom-select-selected"
                onClick={togglePriorityDropdown}
              >
                <div className="priority-indicator" style={{ backgroundColor: getPriorityColor(taskData.priority) }}></div>
                <span>{priorityOptions.find(opt => opt.value === taskData.priority)?.label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {priorityOpen && (
                <div className="custom-select-options">
                  {priorityOptions.map(option => (
                    <div 
                      key={option.value} 
                      className={`custom-select-option ${taskData.priority === option.value ? 'selected' : ''}`}
                      onClick={() => handlePrioritySelect(option.value)}
                    >
                      <div className="priority-indicator" style={{ backgroundColor: option.color }}></div>
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
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