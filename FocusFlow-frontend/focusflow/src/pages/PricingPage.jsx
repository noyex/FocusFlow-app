import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { logout } from '../services/AuthService';
import Navbar from '../components/layout/Navbar';
import withPageAnimation from '../components/hoc/withPageAnimation';
import { motion } from 'framer-motion';
import '../styles/pages/PricingPage.css';
import '../styles/components/Logo.css';

const PricingPage = ({ animateElement }) => {
  // const handleLogout = () => {
  //   logout();
  //   window.location.reload();
  // };

  return (
    <div className="pricing-page">
      <Navbar navType="pricing" />
      
      <main className="pricing-content">
        <motion.div 
          className="pricing-header"
          {...animateElement(0)}
        >
          <h1>Choose Your Plan</h1>
          <p className="subtitle">
            Select the perfect plan to boost your productivity and focus
          </p>
        </motion.div>

        <motion.div 
          className="pricing-plans"
          {...animateElement(1)}
        >
          <motion.div 
            className="pricing-plan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="plan-header">
              <h2>Free</h2>
              <div className="plan-price">
                <span className="price">$0</span>
                <span className="period">/month</span>
              </div>
              <p className="plan-description">
                Perfect for individuals just getting started with Focus Flow
              </p>
            </div>
            <div className="plan-features">
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Up to 3 projects</div>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Basic time tracking</div>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Simple Pomodoro timer</div>
              </div>
              <div className="feature disabled">
                <div className="feature-icon">✗</div>
                <div className="feature-text">Advanced analytics</div>
              </div>
              <div className="feature disabled">
                <div className="feature-icon">✗</div>
                <div className="feature-text">Productivity insights</div>
              </div>
              <div className="feature disabled">
                <div className="feature-icon">✗</div>
                <div className="feature-text">Team collaboration</div>
              </div>
            </div>
            <div className="plan-cta">
              <Link to="/register">
                <Button variant="secondary" fullWidth>Get Started</Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="pricing-plan featured"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="plan-badge">Most Popular</div>
            <div className="plan-header">
              <h2>Ultra Focus</h2>
              <div className="plan-price">
                <span className="price">$9.99</span>
                <span className="period">/month</span>
              </div>
              <p className="plan-description">
                For professionals who want to maximize their productivity
              </p>
            </div>
            <div className="plan-features">
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Unlimited projects</div>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Advanced time tracking</div>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Customizable Pomodoro techniques</div>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Detailed analytics & reports</div>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Productivity insights & trends</div>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Priority support</div>
              </div>
            </div>
            <div className="plan-cta">
              <Button 
                variant="primary" 
                fullWidth
                onClick={() => alert('Subscription functionality coming soon!')}
              >
                Upgrade Now
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="pricing-faq"
          {...animateElement(2, { initial: { opacity: 0, y: 30 } })}
        >
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {[
              {
                question: "Can I switch plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle."
              },
              {
                question: "Is there a free trial for Ultra Focus?",
                answer: "Yes, we offer a 14-day free trial of Ultra Focus so you can experience all the premium features before committing."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and Apple Pay for subscription payments."
              },
              {
                question: "Can I cancel my subscription?",
                answer: "You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
              >
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="pricing-cta-section"
          {...animateElement(3, { 
            initial: { opacity: 0, y: 40 },
            transition: { duration: 0.7 }
          })}
        >
          <h2>Ready to Boost Your Productivity?</h2>
          <p>Join thousands of users who have transformed their workflow with Focus Flow</p>
          <div className="cta-buttons">
            <Link to="/register">
              <Button variant="primary">Get Started</Button>
            </Link>
            <Button 
              variant="secondary"
              onClick={() => alert('Contact form coming soon!')}
            >
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li><a href="/#features">Features</a></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><a href="/#integrations">Integrations</a></li>
              <li><a href="/#roadmap">Roadmap</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="/#blog">Blog</a></li>
              <li><a href="/#guides">Guides</a></li>
              <li><a href="/#help">Help Center</a></li>
              <li><a href="/#community">Community</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="/#about">About Us</a></li>
              <li><a href="/#careers">Careers</a></li>
              <li><a href="/#contact">Contact</a></li>
              <li><a href="/#press">Press</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="/#terms">Terms of Service</a></li>
              <li><a href="/#privacy">Privacy Policy</a></li>
              <li><a href="/#cookies">Cookie Policy</a></li>
              <li><a href="/#security">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-logo">Focus Flow</div>
          <div className="footer-copyright">© {new Date().getFullYear()} Focus Flow. All rights reserved.</div>
          <div className="social-links">
            <a href="/#twitter">🐦</a>
            <a href="/#facebook">📘</a>
            <a href="/#instagram">📷</a>
            <a href="/#linkedin">💼</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default withPageAnimation(PricingPage); 