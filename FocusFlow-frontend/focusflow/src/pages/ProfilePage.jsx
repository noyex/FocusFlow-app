import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/AuthService';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import '../styles/pages/ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  
  // Form states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Form errors
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const userData = await getUserProfile();
        setUserProfile(userData);
        setUsername(userData.username);
        setEmail(userData.email);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    // Placeholder for API call
    alert('Username update functionality would be implemented here');
    setIsUsernameModalOpen(false);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Placeholder for API call
    alert('Email update functionality would be implemented here');
    setIsEmailModalOpen(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Placeholder for API call
    alert('Password update functionality would be implemented here');
    setIsPasswordModalOpen(false);
  };

  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="nav-container">
          <nav className="nav dynamic-island">
            <div className="nav-left">
              <div className="logo">Focus Flow</div>
              <div className="nav-links">
                <Link to="/dashboard">Dashboard</Link>
                <a href="#projects">Projects</a>
                <a href="#focus-tools">Focus Tools</a>
                <Link to="/profile" className="active">Profile</Link>
              </div>
            </div>
          </nav>
        </div>
        <main className="dashboard-content">
          <div className="profile-container">
            <div className="profile-loading">
              Loading your profile...
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="nav-container">
          <nav className="nav dynamic-island">
            <div className="nav-left">
              <div className="logo">Focus Flow</div>
              <div className="nav-links">
                <Link to="/dashboard">Dashboard</Link>
                <a href="#projects">Projects</a>
                <a href="#focus-tools">Focus Tools</a>
                <Link to="/profile" className="active">Profile</Link>
              </div>
            </div>
          </nav>
        </div>
        <main className="dashboard-content">
          <div className="profile-container">
            <div className="profile-error">
              {error}
              <Button 
                variant="primary" 
                onClick={() => window.location.reload()}
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="nav-container">
        <nav className="nav dynamic-island">
          <div className="nav-left">
            <div className="logo">Focus Flow</div>
            <div className="nav-links">
              <Link to="/dashboard">Dashboard</Link>
              <a href="#projects">Projects</a>
              <a href="#focus-tools">Focus Tools</a>
              <Link to="/profile" className="active">Profile</Link>
            </div>
          </div>
          <div className="nav-buttons">
            <Link to="/profile" className="profile-link">Profile</Link>
            <Button variant="secondary" onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
            }}>
              Log Out
            </Button>
          </div>
        </nav>
      </div>

      <main className="dashboard-content">
        <div className="profile-container">
          <div className="profile-header">
            <h1>Your Profile</h1>
            <p>View and manage your account information</p>
          </div>

          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                {getFirstLetter(userProfile?.username)}
              </div>
            </div>

            <div className="profile-info">
              <div className="info-row centered-info">
                <div className="info-label">Username</div>
                <div className="info-value">{userProfile?.username}</div>
                <Button 
                  variant="secondary" 
                  size="small"
                  className="small-button"
                  onClick={() => setIsUsernameModalOpen(true)}
                >
                  Edit
                </Button>
              </div>

              <div className="info-row centered-info">
                <div className="info-label">Email</div>
                <div className="info-value">{userProfile?.email}</div>
                <Button 
                  variant="secondary" 
                  size="small"
                  className="small-button"
                  onClick={() => setIsEmailModalOpen(true)}
                >
                  Edit
                </Button>
              </div>

              <div className="info-row centered-info">
                <div className="info-label">Role</div>
                <div className="info-value">{userProfile?.role || 'User'}</div>
              </div>
            </div>

            <div className="profile-actions">
              <Button 
                variant="primary"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Username Edit Modal */}
      <Modal
        isOpen={isUsernameModalOpen}
        onClose={() => setIsUsernameModalOpen(false)}
        title="Edit Username"
        footer={
          <>
            <Button 
              variant="secondary" 
              onClick={() => setIsUsernameModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleUsernameSubmit}
            >
              Save Changes
            </Button>
          </>
        }
      >
        <form onSubmit={handleUsernameSubmit}>
          <Input
            label="New Username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter new username"
            error={usernameError}
          />
        </form>
      </Modal>

      {/* Email Edit Modal */}
      <Modal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title="Edit Email"
        footer={
          <>
            <Button 
              variant="secondary" 
              onClick={() => setIsEmailModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleEmailSubmit}
            >
              Save Changes
            </Button>
          </>
        }
      >
        <form onSubmit={handleEmailSubmit}>
          <Input
            label="New Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter new email"
            error={emailError}
          />
        </form>
      </Modal>

      {/* Password Change Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Change Password"
        footer={
          <>
            <Button 
              variant="secondary" 
              onClick={() => setIsPasswordModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handlePasswordSubmit}
            >
              Update Password
            </Button>
          </>
        }
      >
        <form onSubmit={handlePasswordSubmit}>
          <Input
            label="Current Password"
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <Input
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            error={passwordError}
          />
        </form>
      </Modal>
    </div>
  );
};

export default ProfilePage; 