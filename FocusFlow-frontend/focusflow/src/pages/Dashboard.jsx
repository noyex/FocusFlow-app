import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { isAuthenticated, logout } from '../services/AuthService';
import '../styles/pages/Dashboard.css';
import '../styles/components/Logo.css';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard">
      <div className="nav-container">
        <nav className="nav dynamic-island">
          <div className="nav-left">
            <Link to="/" className="logo">Focus Flow</Link>
            <div className="nav-links">
              <a href="#dashboard" className="active">Dashboard</a>
              <a href="#projects">Projects</a>
              <a href="#focus-tools">Focus Tools</a>
            </div>
          </div>
          <div className="nav-buttons">
            <Link to="/profile" className="profile-link">Profile</Link>
            <Button variant="secondary" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </nav>
      </div>

      <main className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome to your Dashboard</h1>
          <p>Start managing your projects and track your time effectively.</p>
        </div>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div className="card-icon">📋</div>
            <h3>Projects</h3>
            <p>0 active projects</p>
            <Button variant="primary">Create Project</Button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">⏱️</div>
            <h3>Time Tracking</h3>
            <p>0 hours tracked this week</p>
            <Button variant="primary">Start Timer</Button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🎯</div>
            <h3>Focus Tools</h3>
            <p>Try our Pomodoro technique</p>
            <Button variant="primary">Start Pomodoro</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 