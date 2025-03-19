import React from 'react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import withPageAnimation from '../components/hoc/withPageAnimation';
import { motion } from 'framer-motion';
import '../styles/pages/VisionMissionPage.css';

const VisionMissionPage = ({ animateElement }) => {
  return (
    <div className="vision-mission-page">
      <Navbar navType="vision-mission" />
      
      <div className="vision-mission-content">
        <motion.div 
          className="vision-mission-header"
          {...animateElement(0)}
        >
          <h1>Our Vision & Mission</h1>
          <p className="subtitle">We believe in a world where technology empowers focus, not distracts from it.</p>
        </motion.div>
        
        <motion.section 
          className="mission-section"
          {...animateElement(1, { 
            initial: { opacity: 0, x: -30 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6 }
          })}
        >
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
            <motion.div 
              className="mission-card"
              whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="card-icon"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ✨
              </motion.div>
              <h3>Why We Exist</h3>
              <p>
                To transform how people work by providing tools that protect their most valuable resource—their attention.
              </p>
            </motion.div>
          </div>
        </motion.section>
        
        <motion.section 
          className="vision-section"
          {...animateElement(2, { 
            initial: { opacity: 0, x: 30 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 }
          })}
        >
          <h2>Our Vision</h2>
          <div className="vision-content">
            <motion.div 
              className="vision-card"
              whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="card-icon"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                🔮
              </motion.div>
              <h3>Where We're Headed</h3>
              <p>
                A world where technology serves human creativity and wellbeing, rather than competing for attention.
              </p>
            </motion.div>
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
        </motion.section>
        
        <motion.section 
          className="values-section"
          {...animateElement(3, { 
            initial: { opacity: 0, y: 40 },
            transition: { duration: 0.7, delay: 0.3 }
          })}
        >
          <h2>Our Core Values</h2>
          <div className="values-grid">
            {[
              { 
                icon: "🎯", 
                title: "Intentionality", 
                description: "We believe in purposeful design and mindful technology use." 
              },
              { 
                icon: "🔍", 
                title: "Simplicity", 
                description: "We remove complexity to create tools that feel intuitive and natural." 
              },
              { 
                icon: "🌱", 
                title: "Growth", 
                description: "We support continuous improvement in our tools and for our users." 
              },
              { 
                icon: "🤝", 
                title: "Community", 
                description: "We believe productivity thrives when knowledge is shared." 
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
              >
                <motion.div 
                  className="value-icon"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  {value.icon}
                </motion.div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        <motion.section 
          className="cta-section"
          {...animateElement(4, { 
            initial: { opacity: 0, y: 30 },
            transition: { duration: 0.7, delay: 0.4 }
          })}
        >
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
        </motion.section>
      </div>
    </div>
  );
};

export default withPageAnimation(VisionMissionPage); 