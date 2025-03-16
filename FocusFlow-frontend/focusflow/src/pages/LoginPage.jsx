import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import '../styles/pages/AuthPage.css';

const LoginPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-logo">Focus Flow</div>
          <h1>Welcome Back</h1>
          <p>Sign in to access your projects and continue improving your productivity.</p>
        </div>
        <div className="auth-right">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 