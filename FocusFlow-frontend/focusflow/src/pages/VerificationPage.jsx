import React from 'react';
import { Link } from 'react-router-dom';
import VerificationForm from '../components/forms/VerificationForm';
import '../styles/pages/AuthPage.css';

const VerificationPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <h1>Almost There!</h1>
          <p>Verify your email to activate your account and start using Focus Flow.</p>
        </div>
        <div className="auth-right">
          <VerificationForm />
        </div>
      </div>
    </div>
  );
};

export default VerificationPage; 