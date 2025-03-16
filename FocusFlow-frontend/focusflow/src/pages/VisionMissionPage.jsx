import React from 'react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import '../styles/pages/VisionMissionPage.css';

const VisionMissionPage = () => {
  return (
    <div className="vision-mission-page">
      <Navbar navType="vision-mission" />
      
      <div className="vision-mission-content">
        <div className="vision-mission-header">
          <h1>Our Vision & Mission</h1>
          <p className="subtitle">We believe in a world where technology empowers focus, not distracts from it.</p>
        </div>
        
        <section className="mission-section">
          <h2>Our Mission</h2>
          <div className="mission-content">
            <div className="mission-text">
              <p>
                At Focus Flow, our mission is to empower individuals to reclaim their time and attention in 
                a world filled with distractions. We are committed to creating tools that enhance deep work, 
                foster productivity, and promote a healthier relationship with technology.
              </p>
              <p>
                We aim to help you create the mental space needed for your most important work 
                through thoughtfully designed features based on proven productivity principles.
              </p>
            </div>
            <div className="mission-card">
              <div className="card-icon">✨</div>
              <h3>Why We Exist</h3>
              <p>
                To transform how people work by providing tools that protect their most valuable resource—their attention.
              </p>
            </div>
          </div>
        </section>
        
        <section className="vision-section">
          <h2>Our Vision</h2>
          <div className="vision-content">
            <div className="vision-card">
              <div className="card-icon">🔮</div>
              <h3>Where We're Headed</h3>
              <p>
                A world where technology serves human creativity and wellbeing, rather than competing for attention.
              </p>
            </div>
            <div className="vision-text">
              <p>
                We envision a future where individuals can harness their full potential by working 
                with intention and purpose. A world where technology enhances human capabilities 
                without the cost of constant distraction.
              </p>
              <p>
                Our vision extends beyond productivity—we're building tools that support 
                a sustainable approach to work, helping you achieve more while maintaining balance.
              </p>
            </div>
          </div>
        </section>
        
        <section className="values-section">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Intentionality</h3>
              <p>We believe in purposeful design and mindful technology use.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔍</div>
              <h3>Simplicity</h3>
              <p>We remove complexity to create tools that feel intuitive and natural.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Growth</h3>
              <p>We support continuous improvement in our tools and for our users.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>We believe productivity thrives when knowledge is shared.</p>
            </div>
          </div>
        </section>
        
        <section className="cta-section">
          <h2>Join Us On This Journey</h2>
          <p>Experience how Focus Flow can transform your approach to work.</p>
          <div className="cta-buttons">
            <Link to="/register">
              <Button variant="primary">Get Started Free</Button>
            </Link>
            <Link to="/features">
              <Button variant="secondary">Explore Features</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VisionMissionPage; 