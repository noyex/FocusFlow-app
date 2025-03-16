import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { isAuthenticated, logout } from '../../services/AuthService';
import '../../styles/components/Navbar.css';
import '../../styles/components/Logo.css';

const Navbar = ({ navType = 'public' }) => {
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };
  
  // Define navigation links for different contexts
  const navLinks = {
    public: [
      { path: '/#features', label: 'Features', isHashLink: true },
      { path: '/pricing', label: 'Pricing', isHashLink: false },
      { path: '/#about', label: 'About', isHashLink: true }
    ],
    dashboard: [
      { path: '/dashboard', label: 'Dashboard', isHashLink: false },
      { path: '/projects', label: 'Projects', isHashLink: false },
      { path: '/focus-tools', label: 'Focus Tools', isHashLink: false },
      { path: '/profile', label: 'Profile', isHashLink: false }
    ],
    profile: [
      { path: '/dashboard', label: 'Dashboard', isHashLink: false },
      { path: '/projects', label: 'Projects', isHashLink: false },
      { path: '/focus-tools', label: 'Focus Tools', isHashLink: false },
      { path: '/profile', label: 'Profile', isHashLink: false }
    ],
    pricing: [
      { path: '/#features', label: 'Features', isHashLink: true },
      { path: '/pricing', label: 'Pricing', isHashLink: false },
      { path: '/#about', label: 'About', isHashLink: true }
    ]
  };
  
  // Get the current set of nav links based on navType
  const currentNavLinks = navLinks[navType] || navLinks.public;
  
  // Helper function to check if a link is active
  const isActive = (path, isHashLink) => {
    if (isHashLink) {
      // For hash links, check if they match the current hash
      return location.hash === path.substring(1);
    } else {
      // For normal links, check if the pathname starts with the path (to handle nested routes)
      return location.pathname === path;
    }
  };

  return (
    <div className="nav-container">
      <nav className="nav dynamic-island">
        <div className="nav-left">
          <Link to="/" className="logo">Focus Flow</Link>
          <div className="nav-links">
            {currentNavLinks.map((link, index) => (
              link.isHashLink ? (
                <a 
                  key={index} 
                  href={link.path} 
                  className={isActive(link.path, true) ? 'active' : ''}
                >
                  {link.label}
                </a>
              ) : (
                <Link 
                  key={index} 
                  to={link.path} 
                  className={isActive(link.path, false) ? 'active' : ''}
                >
                  {link.label}
                </Link>
              )
            ))}
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
  );
};

export default Navbar; 