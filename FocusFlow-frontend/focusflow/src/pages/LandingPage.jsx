import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Navbar from '../components/layout/Navbar';
import withPageAnimation from '../components/hoc/withPageAnimation';
import { motion } from 'framer-motion';
import '../styles/pages/LandingPage.css';
import '../styles/components/Logo.css';

const LandingPage = ({ animateElement }) => {
  return (
    <div className="landing-page">
      <Navbar navType="public" />
      
      <main className="main-content">
        <motion.div 
          className="hero-section"
          {...animateElement(0)}
        >
          <h1>Master Your Time, Amplify Your Focus</h1>
          <p className="subtitle">
            Transform your workflow with Focus Flow - the ultimate project management 
            and time tracking tool designed for peak productivity.
          </p>
          <motion.div 
            className="cta-buttons"
            {...animateElement(1)}
          >
            <Link to="/register">
              <Button variant="primary">Get Started for Free!</Button>
            </Link>
            <Link to="/features">
              <Button variant="secondary">Learn More</Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="features" 
          id="features"
          {...animateElement(2, { 
            initial: { opacity: 0, y: 30 },
            transition: { duration: 0.6 }
          })}
        >
          {[
            {
              icon: "📋",
              title: "Project Management",
              description: "Organize your projects and tasks with intuitive tools and clear hierarchy."
            },
            {
              icon: "⏱️",
              title: "Time Tracking",
              description: "Monitor your productivity and track time spent on each task effortlessly."
            },
            {
              icon: "🎯",
              title: "Focus Tools",
              description: "Enhance your concentration with built-in Pomodoro timer and focus techniques."
            }
          ].map((feature, index) => (
            <motion.div 
              className="feature-card" 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
            >
              <div className="card-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><a href="#roadmap">Roadmap</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/articles">Articles</Link></li>
              <li><a href="#guides">Guides</a></li>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/vision-mission">Our Mission</Link></li>
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

export default withPageAnimation(LandingPage); 