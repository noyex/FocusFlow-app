import React from 'react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import withPageAnimation from '../components/hoc/withPageAnimation';
import { motion } from 'framer-motion';
import '../styles/pages/HowItWorksPage.css';

const HowItWorksPage = ({ animateElement }) => {
  return (
    <div className="how-it-works-page">
      <Navbar navType="how-it-works" />
      
      <div className="how-it-works-content">
        <motion.div 
          className="how-it-works-header"
          {...animateElement(0)}
        >
          <h1>How Focus Flow Works</h1>
          <p className="subtitle">A step-by-step guide to optimizing your productivity with Focus Flow.</p>
        </motion.div>
        
        <motion.section 
          className="coming-soon-section"
          {...animateElement(1, { 
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.6 }
          })}
        >
          <motion.div 
            className="coming-soon-card"
            whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="icon"
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1] 
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "loop" 
              }}
            >
              🚧
            </motion.div>
            <h2>Page Under Construction</h2>
            <p>
              We're building a comprehensive guide to help you get the most out of Focus Flow.
              Check back soon for detailed tutorials and workflow examples!
            </p>
            <Link to="/">
              <Button variant="secondary">Back to Home</Button>
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default withPageAnimation(HowItWorksPage); 