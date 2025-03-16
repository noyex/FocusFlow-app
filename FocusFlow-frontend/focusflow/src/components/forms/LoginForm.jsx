import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../ui/Button';
import BackButton from '../ui/BackButton';
import { login } from '../../services/AuthService';
import '../../styles/components/Form.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error in component:', error);
      setError(error.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <BackButton />
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p className="form-subtitle">Sign in to continue to Focus Flow</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
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
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
        
        <div className="form-footer">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm; 