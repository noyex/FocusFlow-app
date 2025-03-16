import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import BackButton from '../ui/BackButton';
import { verifyAccount, resendVerificationCode } from '../../services/AuthService';
import '../../styles/components/Form.css';

const VerificationForm = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from local storage (set during registration)
    const registeredEmail = localStorage.getItem('registeredEmail');
    if (registeredEmail) {
      setEmail(registeredEmail);
    } else {
      // If no email found, redirect to register
      navigate('/register');
    }
  }, [navigate]);

  // Redirect to login page after successful verification with delay
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        localStorage.removeItem('registeredEmail');
        navigate('/login');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  // Add a useEffect to reset resendSuccess after 3 seconds
  useEffect(() => {
    if (resendSuccess) {
      const timer = setTimeout(() => {
        setResendSuccess(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [resendSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);
    
    try {
      // Convert verificationCode to number since API might expect a number
      const numericCode = parseInt(verificationCode, 10);
      
      await verifyAccount(email, numericCode);
      
      // If we reach here, verification was successful
      setSuccess(true);
    } catch (error) {
      // Check for specific error messages
      const errorMsg = error.message || '';
      
      if (errorMsg.includes('already verified') || errorMsg.includes('already active')) {
        setSuccess(true);
        setError('Account is already verified. Redirecting to login...');
      } else if (errorMsg.includes('expired')) {
        setError('Verification code has expired. Please request a new one.');
      } else if (errorMsg.includes('invalid') || errorMsg.includes('incorrect')) {
        setError('Invalid verification code. Please check and try again.');
      } else {
        setError('Verification failed. Please check your code and try again.');
      }
      
      console.error('Verification error details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required to resend verification code');
      return;
    }
    
    setResendLoading(true);
    setError('');
    
    try {
      await resendVerificationCode(email);
      setResendSuccess(true);
    } catch (error) {
      setError('Failed to resend verification code. Please try again.');
      console.error('Resend verification code error:', error);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="form-container">
      <BackButton />
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Verify Your Account</h2>
        <p className="form-subtitle">Enter the 6-digit code sent to your email</p>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Account verified successfully! Redirecting to login...</div>}
        {resendSuccess && <div className="success-message">Verification code resent successfully!</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="disabled-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="verificationCode">Verification Code</label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter 6-digit code"
            maxLength={6}
            pattern="[0-9]{6}"
            required
            disabled={success}
          />
        </div>
        
        <Button variant="primary" disabled={loading || success}>
          {loading ? 'Verifying...' : success ? 'Verified!' : 'Verify Account'}
        </Button>
        
        <div className="form-footer">
          Didn't receive the code? 
          <a 
            href="#" 
            onClick={handleResendCode}
            style={{ pointerEvents: resendLoading ? 'none' : 'auto' }}
          >
            {resendLoading ? 'Sending...' : 'Resend Code'}
          </a>
        </div>
      </form>
    </div>
  );
};

export default VerificationForm; 