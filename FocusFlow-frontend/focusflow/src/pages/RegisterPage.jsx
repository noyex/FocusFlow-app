import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/forms/RegisterForm';
import BackButton from '../components/ui/BackButton';
import withPageAnimation from '../components/hoc/withPageAnimation';
import { motion } from 'framer-motion';
import '../styles/pages/AuthPage.css';

const RegisterPage = ({ animateElement }) => {
  return (
    <div className="auth-page">
      <BackButton />
      <motion.div 
        className="auth-container"
        {...animateElement(0, {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5 }
        })}
      >
        <motion.div 
          className="auth-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1>Master Your Time, Amplify Your Focus</h1>
          <p>Join thousands of users who use Focus Flow to manage their projects and improve productivity.</p>
        </motion.div>
        <motion.div 
          className="auth-right"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <RegisterForm showBackButton={false} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default withPageAnimation(RegisterPage); 