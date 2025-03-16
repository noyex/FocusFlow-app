import React from 'react';
import Button from '../components/ui/Button';
import '../styles/pages/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="nav">
        <div className="logo">Focus Flow</div>
        <div className="nav-buttons">
          <Button variant="secondary">Sign In</Button>
          <Button variant="primary">Sign Up</Button>
        </div>
      </nav>
      
      <main className="main-content">
        <div className="hero-section">
          <h1>Master Your Time, Amplify Your Focus</h1>
          <p className="subtitle">
            Transform your workflow with Focus Flow - the ultimate project management 
            and time tracking tool designed for peak productivity.
          </p>
          <div className="cta-buttons">
            <Button variant="primary">Get Started</Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </div>

        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Project Management</h3>
            <p>Organize your projects and tasks with intuitive tools and clear hierarchy.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Time Tracking</h3>
            <p>Monitor your productivity and track time spent on each task effortlessly.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Focus Tools</h3>
            <p>Enhance your concentration with built-in Pomodoro timer and focus techniques.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage; 