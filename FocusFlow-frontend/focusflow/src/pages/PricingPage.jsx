import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { isAuthenticated, logout } from '../services/AuthService';
import '../styles/pages/PricingPage.css';
import '../styles/components/Logo.css';

const PricingPage = () => {
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="pricing-page">
      <div className="nav-container">
        <nav className="nav dynamic-island">
          <div className="nav-left">
            <Link to="/" className="logo">Focus Flow</Link>
            <div className="nav-links">
              <a href="/#features">Features</a>
              <Link to="/pricing" className="active">Pricing</Link>
              <a href="/#about">About</a>
            </div>
          </div>
          <div className="nav-buttons">
            {isAuthenticated() ? (
              <>
                <Link to="/dashboard">
                  <Button variant="primary">Dashboard</Button>
                </Link>
                <Button variant="secondary" onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      
      <main className="pricing-content">
        <div className="pricing-header">
          <h1>Choose Your Plan</h1>
          <p className="subtitle">
            Select the perfect plan to boost your productivity and focus
          </p>
        </div>

        <div className="pricing-plans">
          <div className="pricing-plan">
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
          </div>

          <div className="pricing-plan featured">
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
          </div>
        </div>

        <div className="pricing-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Can I switch plans later?</h3>
              <p>Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.</p>
            </div>
            <div className="faq-item">
              <h3>Is there a free trial for Ultra Focus?</h3>
              <p>Yes, we offer a 14-day free trial of Ultra Focus so you can experience all the premium features before committing.</p>
            </div>
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept all major credit cards, PayPal, and Apple Pay for subscription payments.</p>
            </div>
            <div className="faq-item">
              <h3>Can I cancel my subscription?</h3>
              <p>You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period.</p>
            </div>
          </div>
        </div>

        <div className="pricing-cta-section">
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
        </div>
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

export default PricingPage; 