import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/BackButton.css';

const BackButton = () => {
  return (
    <Link to="/" className="back-button" aria-label="Back to home page">
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="back-arrow"
      >
        <path 
          d="M19 12H5" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M12 19L5 12L12 5" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      <span className="back-text">Home</span>
    </Link>
  );
};

export default BackButton; 