import React from 'react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import '../styles/pages/HowItWorksPage.css';

const HowItWorksPage = () => {
  return (
    <div className="how-it-works-page">
      <Navbar navType="how-it-works" />
      
      <div className="how-it-works-content">
        <div className="how-it-works-header">
          <h1>How Focus Flow Works</h1>
          <p className="subtitle">A step-by-step guide to optimizing your productivity with Focus Flow.</p>
        </div>
        
        <section className="coming-soon-section">
          <div className="coming-soon-card">
            <div className="icon">🚧</div>
            <h2>Page Under Construction</h2>
            <p>
              We're building a comprehensive guide to help you get the most out of Focus Flow.
              Check back soon for detailed tutorials and workflow examples!
            </p>
            <Link to="/">
              <Button variant="secondary">Back to Home</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorksPage; 