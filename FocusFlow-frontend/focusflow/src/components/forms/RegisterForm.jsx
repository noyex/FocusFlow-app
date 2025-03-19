import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../ui/Button';
import BackButton from '../ui/BackButton';
import { register } from '../../services/AuthService';
import '../../styles/components/Form.css';

const RegisterForm = ({ showBackButton = true }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setUsernameError('');
    setLoading(true);
    
    try {
      const userData = await register(username, email, password);
      // Store email for verification page
      localStorage.setItem('registeredEmail', email);
      navigate('/verify');
    } catch (error) {
      console.error('Registration error in component:', error);
      
      // Check for specific error messages
      const errorMessage = error.message || '';
      
      if (errorMessage.toLowerCase().includes('email')) {
        setEmailError(errorMessage);
      } else if (errorMessage.toLowerCase().includes('username')) {
        setUsernameError(errorMessage);
      } else {
        setError(errorMessage || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {showBackButton && <BackButton />}
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create your account</h2>
        <p className="form-subtitle">Start managing your time and projects with Focus Flow</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError(''); // Clear username error when user types
            }}
            placeholder="Enter username"
            className={usernameError ? 'error' : ''}
            required
          />
          {usernameError && <div className="input-error">{usernameError}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(''); // Clear email error when user types
            }}
            placeholder="Enter email"
            className={emailError ? 'error' : ''}
            required
          />
          {emailError && <div className="input-error">{emailError}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        
        <Button variant="primary" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Button>
        
        <div className="form-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm; 