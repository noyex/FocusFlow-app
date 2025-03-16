import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/forms/RegisterForm';
import '../styles/pages/AuthPage.css';

const RegisterPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <Link to="/" className="auth-logo">Focus Flow</Link>
          <h1>Master Your Time, Amplify Your Focus</h1>
          <p>Join thousands of users who use Focus Flow to manage their projects and improve productivity.</p>
        </div>
        <div className="auth-right">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 