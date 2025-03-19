import React from 'react';
import { Link } from 'react-router-dom';
import VerificationForm from '../components/forms/VerificationForm';
import BackButton from '../components/ui/BackButton';
import withPageAnimation from '../components/hoc/withPageAnimation';
import { motion } from 'framer-motion';
import '../styles/pages/AuthPage.css';

const VerificationPage = ({ animateElement }) => {
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
          <h1>Almost There!</h1>
          <p>Verify your email to activate your account and start using Focus Flow.</p>
        </motion.div>
        <motion.div 
          className="auth-right"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <VerificationForm showBackButton={false} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default withPageAnimation(VerificationPage); 