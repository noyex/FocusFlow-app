import React from 'react';
import Button from '../components/ui/Button';
import '../styles/pages/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="nav-container">
        <nav className="nav dynamic-island">
          <div className="nav-left">
            <div className="logo">Focus Flow</div>
            <div className="nav-links">
              <a href="#features">Features</a>
              <a href="#about">About</a>
              <a href="#pricing">Pricing</a>
            </div>
          </div>
          <div className="nav-buttons">
            <Button variant="secondary">Sign In</Button>
            <Button variant="primary">Sign Up</Button>
          </div>
        </nav>
      </div>
      
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

        <div className="features" id="features">
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

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#integrations">Integrations</a></li>
              <li><a href="#roadmap">Roadmap</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#guides">Guides</a></li>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#press">Press</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
              <li><a href="#security">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-logo">Focus Flow</div>
          <div className="footer-copyright">© {new Date().getFullYear()} Focus Flow. All rights reserved.</div>
          <div className="social-links">
            <a href="#twitter">🐦</a>
            <a href="#facebook">📘</a>
            <a href="#instagram">📷</a>
            <a href="#linkedin">💼</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 