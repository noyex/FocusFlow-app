import React from 'react';

const AddProjectButton = ({ onClick, className = '' }) => {
  return (
    <button 
      className={`add-project-btn ${className}`}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      <span>Add project</span>
    </button>
  );
};

export default AddProjectButton; 