import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Navbar from '../components/layout/Navbar';
import '../styles/pages/FeaturesPage.css';
import '../styles/components/Logo.css';

const FeaturesPage = () => {
  return (
    <div className="features-page">
      <Navbar navType="features" />
      
      <main className="features-content">
        <div className="features-header">
          <h1>Discover Our Features</h1>
          <p className="subtitle">
            Explore all the powerful tools Focus Flow offers to maximize your productivity
            and help you stay on top of your projects.
          </p>
        </div>

        <div className="features-list">
          <div className="feature-section">
            <div className="feature-info">
              <h2>Project Management</h2>
              <p>Organize and manage your projects with ease using our intuitive interface.</p>
              <ul className="feature-details">
                <li>Create and organize multiple projects</li>
                <li>Break down projects into manageable tasks</li>
                <li>Set priorities and deadlines for each task</li>
                <li>Track progress with visual indicators</li>
                <li>Easily navigate between different projects</li>
              </ul>
              <Link to="/register">
                <Button variant="primary">Try It Now</Button>
              </Link>
            </div>
            <div className="feature-image">
              <div className="image-placeholder">
                <p>Project Management Screenshot</p>
                <p className="coming-soon">Coming Soon</p>
              </div>
            </div>
          </div>

          <div className="feature-section reverse">
            <div className="feature-info">
              <h2>Time Tracking</h2>
              <p>Monitor your productivity and track time spent on each task with precision.</p>
              <ul className="feature-details">
                <li>Start, pause, and stop timers for any task</li>
                <li>Automatically log time spent on activities</li>
                <li>View detailed time reports by project or task</li>
                <li>Analyze your productivity patterns</li>
                <li>Export time logs for billing or analysis</li>
              </ul>
              <Link to="/register">
                <Button variant="primary">Try It Now</Button>
              </Link>
            </div>
            <div className="feature-image">
              <div className="image-placeholder">
                <p>Time Tracking Screenshot</p>
                <p className="coming-soon">Coming Soon</p>
              </div>
            </div>
          </div>

          <div className="feature-section">
            <div className="feature-info">
              <h2>Focus Tools</h2>
              <p>Enhance your concentration with our suite of powerful focus techniques.</p>
              <ul className="feature-details">
                <li>Customizable Pomodoro timer for focused work sessions</li>
                <li>Break reminders to maintain productivity</li>
                <li>Focus mode to eliminate distractions</li>
                <li>Background noise and ambiance options</li>
                <li>Daily focus goals and achievement tracking</li>
              </ul>
              <Link to="/register">
                <Button variant="primary">Try It Now</Button>
              </Link>
            </div>
            <div className="feature-image">
              <div className="image-placeholder">
                <p>Focus Tools Screenshot</p>
                <p className="coming-soon">Coming Soon</p>
              </div>
            </div>
          </div>

          <div className="feature-section reverse">
            <div className="feature-info">
              <h2>Analytics Dashboard</h2>
              <p>Gain valuable insights into your productivity patterns and work habits.</p>
              <ul className="feature-details">
                <li>Visual representation of your productivity</li>
                <li>Track daily, weekly, and monthly progress</li>
                <li>Identify peak productivity times</li>
                <li>Compare performance across different projects</li>
                <li>Custom reports based on your needs</li>
              </ul>
              <Link to="/register">
                <Button variant="primary">Try It Now</Button>
              </Link>
            </div>
            <div className="feature-image">
              <div className="image-placeholder">
                <p>Analytics Dashboard Screenshot</p>
                <p className="coming-soon">Coming Soon</p>
              </div>
            </div>
          </div>

          <div className="feature-section">
            <div className="feature-info">
              <h2>Team Collaboration</h2>
              <p>Collaborate seamlessly with your team members on shared projects.</p>
              <ul className="feature-details">
                <li>Invite team members to collaborate on projects</li>
                <li>Assign tasks to different team members</li>
                <li>Track team progress and contributions</li>
                <li>Comment and provide feedback on tasks</li>
                <li>Shared calendar and milestone tracking</li>
              </ul>
              <Link to="/register">
                <Button variant="primary">Try It Now</Button>
              </Link>
            </div>
            <div className="feature-image">
              <div className="image-placeholder">
                <p>Team Collaboration Screenshot</p>
                <p className="coming-soon">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>

        <div className="features-cta">
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
        </div>
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

export default FeaturesPage; 