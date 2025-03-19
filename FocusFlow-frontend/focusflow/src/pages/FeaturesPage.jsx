import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Navbar from '../components/layout/Navbar';
import withPageAnimation from '../components/hoc/withPageAnimation';
import { motion } from 'framer-motion';
import '../styles/pages/FeaturesPage.css';
import '../styles/components/Logo.css';

const FeaturesPage = ({ animateElement }) => {
  // Lista funkcji aplikacji
  const features = [
    {
      title: "Project Management",
      description: "Organize and manage your projects with ease using our intuitive interface.",
      details: [
        "Create and organize multiple projects",
        "Break down projects into manageable tasks",
        "Set priorities and deadlines for each task",
        "Track progress with visual indicators",
        "Easily navigate between different projects"
      ],
      imageName: "Project Management Screenshot"
    },
    {
      title: "Time Tracking",
      description: "Monitor your productivity and track time spent on each task with precision.",
      details: [
        "Start, pause, and stop timers for any task",
        "Automatically log time spent on activities",
        "View detailed time reports by project or task",
        "Analyze your productivity patterns",
        "Export time logs for billing or analysis"
      ],
      imageName: "Time Tracking Screenshot"
    },
    {
      title: "Focus Tools",
      description: "Enhance your concentration with our suite of powerful focus techniques.",
      details: [
        "Customizable Pomodoro timer for focused work sessions",
        "Break reminders to maintain productivity",
        "Focus mode to eliminate distractions",
        "Background noise and ambiance options",
        "Daily focus goals and achievement tracking"
      ],
      imageName: "Focus Tools Screenshot"
    },
    {
      title: "Analytics Dashboard",
      description: "Gain valuable insights into your productivity patterns and work habits.",
      details: [
        "Visual representation of your productivity",
        "Track daily, weekly, and monthly progress",
        "Identify peak productivity times",
        "Compare performance across different projects",
        "Custom reports based on your needs"
      ],
      imageName: "Analytics Dashboard Screenshot"
    },
    {
      title: "Team Collaboration",
      description: "Collaborate seamlessly with your team members on shared projects.",
      details: [
        "Invite team members to collaborate on projects",
        "Assign tasks to different team members",
        "Track team progress and contributions",
        "Comment and provide feedback on tasks",
        "Shared calendar and milestone tracking"
      ],
      imageName: "Team Collaboration Screenshot"
    }
  ];

  return (
    <div className="features-page">
      <Navbar navType="features" />
      
      <main className="features-content">
        <motion.div 
          className="features-header"
          {...animateElement(0)}
        >
          <h1>Discover Our Features</h1>
          <p className="subtitle">
            Explore all the powerful tools Focus Flow offers to maximize your productivity
            and help you stay on top of your projects.
          </p>
        </motion.div>

        <div className="features-list">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={`feature-section ${index % 2 !== 0 ? 'reverse' : ''}`}
              {...animateElement(index + 1, {
                initial: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.6, delay: 0.2 * (index + 1) }
              })}
            >
              <div className="feature-info">
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
                <ul className="feature-details">
                  {feature.details.map((detail, detailIndex) => (
                    <motion.li 
                      key={detailIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + (0.1 * detailIndex) }}
                    >
                      {detail}
                    </motion.li>
                  ))}
                </ul>
                <Link to="/register">
                  <Button variant="primary">Try It Now</Button>
                </Link>
              </div>
              <div className="feature-image">
                <motion.div 
                  className="image-placeholder"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{feature.imageName}</p>
                  <p className="coming-soon">Coming Soon</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="features-cta"
          {...animateElement(features.length + 1, {
            initial: { opacity: 0, y: 40 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7 }
          })}
        >
          <h2>Ready to Supercharge Your Productivity?</h2>
          <p>Join thousands of users who are already experiencing the benefits of Focus Flow.</p>
          <div className="cta-buttons">
            <Link to="/register">
              <Button variant="primary">Get Started for Free</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="secondary">View Pricing</Button>
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
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

export default withPageAnimation(FeaturesPage); 