import React from 'react';
import '../../styles/components/Input.css';

const Input = ({ 
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`input-container ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={error ? 'error' : ''}
        {...props}
      />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default Input; 