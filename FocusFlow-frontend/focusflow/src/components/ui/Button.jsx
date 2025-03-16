import React from 'react';
import '../../styles/components/Button.css';

const Button = ({ children, variant = 'primary', onClick }) => {
  return (
    <button 
      className={`button ${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button; 