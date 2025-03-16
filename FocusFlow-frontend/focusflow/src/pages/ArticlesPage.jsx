import React from 'react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import '../styles/pages/ArticlesPage.css';

const ArticlesPage = () => {
  return (
    <div className="articles-page">
      <Navbar navType="articles" />
      
      <div className="articles-content">
        <div className="articles-header">
          <h1>Productivity Articles</h1>
          <p className="subtitle">Insights, techniques, and advice to enhance your focus and productivity.</p>
        </div>
        
        <section className="coming-soon-section">
          <div className="coming-soon-card">
            <div className="icon">📝</div>
            <h2>Articles Coming Soon</h2>
            <p>
              We're preparing insightful content about productivity techniques, 
              time management, deep work, and more. Stay tuned for updates!
            </p>
            <Link to="/">
              <Button variant="secondary">Back to Home</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArticlesPage; 