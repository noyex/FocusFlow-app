import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { isAuthenticated, logout } from '../../services/AuthService';
import '../../styles/components/Navbar.css';
import '../../styles/components/Logo.css';

const Navbar = ({ navType = 'public' }) => {
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    // Sprawdź autoryzację przy montowaniu i zmianie ścieżki
    setAuthenticated(isAuthenticated());
  }, [location.pathname]);
  
  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };
  
  // Zdefiniuj linki nawigacyjne dla dwóch przypadków - z autoryzacją i bez
  const navLinks = {
    // Linki dla użytkowników niezalogowanych (strony publiczne)
    unauthenticated: [
      { path: '/features', label: 'Features', isHashLink: false },
      { path: '/pricing', label: 'Pricing', isHashLink: false },
      { path: '/how-it-works', label: 'How It Works', isHashLink: false },
      { path: '/vision-mission', label: 'Our Mission', isHashLink: false },
      { path: '/articles', label: 'Articles', isHashLink: false }
    ],
    // Linki dla użytkowników zalogowanych (strony wymagające autoryzacji)
    authenticated: [
      { path: '/dashboard', label: 'Dashboard', isHashLink: false },
      { path: '/workspace', label: 'Workspace', isHashLink: false },
      { path: '/projects', label: 'Projects', isHashLink: false },
      { path: '/focus-tools', label: 'Focus Tools', isHashLink: false },
      { path: '/profile', label: 'Profile', isHashLink: false }
    ]
  };
  
  // Wybierz odpowiedni zestaw linków w zależności od statusu autoryzacji
  const currentNavLinks = authenticated ? navLinks.authenticated : navLinks.unauthenticated;
  
  // Funkcja pomocnicza do sprawdzania, czy link jest aktywny
  const isActive = (path, isHashLink) => {
    if (isHashLink) {
      // Dla linków z hashami sprawdź, czy pasują do aktualnego hasha
      return location.hash === path.substring(1);
    } else {
      // Dla normalnych linków sprawdź, czy ścieżka pasuje do aktualnej
      return location.pathname === path;
    }
  };

  return (
    <div className="nav-container">
      <nav className="nav dynamic-island">
        <div className="nav-left">
          <Link to={authenticated ? "/dashboard" : "/"} className="logo">Focus Flow</Link>
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
          {authenticated ? (
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