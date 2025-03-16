import React from 'react';
import '../../styles/components/Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick, 
  className = '',
  ...props 
}) => {
  return (
    <button 
      className={`button ${variant} ${size} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 