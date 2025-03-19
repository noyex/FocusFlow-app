import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import '../styles/pages/ArticlesPage.css';
import { motion, AnimatePresence } from 'framer-motion';
import withPageAnimation from '../components/hoc/withPageAnimation';

const ArticlesPage = ({ animateElement }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Article categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'timemanagement', name: 'Time Management' },
    { id: 'focus', name: 'Focus' },
    { id: 'motivation', name: 'Motivation' }
  ];
  
  // Articles with real information
  const articles = [
    {
      id: 1,
      title: 'The Pomodoro Technique: A Scientific Approach to Maximizing Efficiency',
      excerpt: 'Discover how the 25-minute work interval technique can boost productivity by 40% and reduce procrastination. We present neurological research on the effectiveness of the Pomodoro method along with practical tips to adapt the technique to your specific needs.',
      category: 'productivity',
      image: '🍅',
      readTime: '7 min',
      date: 'May 12, 2023',
      link: 'https://francescocirillio.com/products/the-pomodoro-technique'
    },
    {
      id: 2,
      title: 'Deep Work: Focused Work in an Era of Digital Distractions',
      excerpt: 'Cal Newport defines deep work as "activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit." Learn how to create an environment that supports deep work by eliminating distractions, scheduling time blocks, and regular concentration training.',
      category: 'focus',
      image: '🧠',
      readTime: '10 min',
      date: 'June 3, 2023',
      link: 'https://www.calnewport.com/books/deep-work/'
    },
    {
      id: 3,
      title: 'David Allen\'s GTD Method: From Chaos to Control in 5 Steps',
      excerpt: 'Getting Things Done (GTD) is not just a productivity system but a philosophy for managing cognitive load. Get a detailed guide to the five stages of GTD: capture, clarify, organize, reflect, and engage. Learn how to apply the 2-minute rule and conduct regular weekly reviews.',
      category: 'productivity',
      image: '✓',
      readTime: '12 min',
      date: 'July 18, 2023',
      link: 'https://gettingthingsdone.com/what-is-gtd/'
    },
    {
      id: 4,
      title: 'Time Blocking: How Experts Manage Every Hour of Their Day',
      excerpt: 'Time blocking is a technique used by Elon Musk, Bill Gates, and Cal Newport. By dividing your day into blocks of time assigned to specific tasks, you increase your accountability and reduce context switching. The article includes a 6-week plan to implement time blocking into your daily routine and downloadable templates.',
      category: 'timemanagement',
      image: '📅',
      readTime: '9 min',
      date: 'August 5, 2023',
      link: 'https://todoist.com/productivity-methods/time-blocking'
    },
    {
      id: 5,
      title: 'Neuroplasticity: Brain Training for Better Concentration',
      excerpt: 'Recent research in neurobiology proves that you can train your brain for better concentration. Learn about a training protocol based on mindfulness meditation, cognitive exercises, and breathing techniques that can significantly improve your ability to maintain attention in 30 days. The article includes fMRI study results showing brain changes after regular training.',
      category: 'focus',
      image: '🧘',
      readTime: '11 min',
      date: 'September 22, 2023',
      link: 'https://www.mindful.org/how-to-practice-mindfulness/'
    },
    {
      id: 6,
      title: 'Goal-Based Motivation: The Science of Maintaining Enthusiasm',
      excerpt: 'Why do some people maintain motivation for years, while others lose it after a few days? Research shows the difference lies in how goals are formulated and in the reward system. Learn about the SMART+EW (Specific, Measurable, Achievable, Relevant, Time-bound + Exciting, Worthwhile) method for creating goals that actually motivate and how to use a micro-reward system to build lasting habits.',
      category: 'motivation',
      image: '🔥',
      readTime: '8 min',
      date: 'October 10, 2023',
      link: 'https://jamesclear.com/goals-systems'
    },
    {
      id: 7,
      title: 'The Zeigarnik Effect: Use Unfinished Tasks to Increase Productivity',
      excerpt: 'The Zeigarnik Effect is a psychological phenomenon in which unfinished tasks occupy more cognitive resources than completed tasks. Learn how to strategically leverage this effect to increase your productivity through planned work breaks, the "downhill parking" technique, and project structuring.',
      category: 'productivity',
      image: '🔄',
      readTime: '6 min',
      date: 'November 2, 2023',
      link: 'https://en.wikipedia.org/wiki/Zeigarnik_effect'
    },
    {
      id: 8,
      title: 'The Eisenhower Method: How to Make Better Priority Decisions',
      excerpt: 'The urgent-important matrix, known as the Eisenhower method, is a simple but powerful way to set priorities. Learn about the four quadrants of the matrix and how to distinguish between what is urgent and what is truly important. The article includes practical exercises for immediate application that will help you better manage tasks and reduce stress.',
      category: 'timemanagement',
      image: '📊',
      readTime: '7 min',
      date: 'November 19, 2023',
      link: 'https://todoist.com/productivity-methods/eisenhower-matrix'
    },
    {
      id: 9,
      title: 'Flow States: How to Achieve and Maintain Optimal Performance',
      excerpt: 'The flow state, described by Mihaly Csikszentmihalyi, is a state of complete immersion in a task where time seems to flow differently. Research shows that people in a flow state are up to 500% more productive. Learn about the 8 necessary conditions for achieving a flow state and techniques for sustaining it in different types of work.',
      category: 'focus',
      image: '🌊',
      readTime: '9 min',
      date: 'December 5, 2023',
      link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4939396/'
    },
    {
      id: 10,
      title: 'The Paradox of Choice: How Limiting Options Increases Productivity',
      excerpt: 'Barry Schwartz in his book "The Paradox of Choice" argues that more options often lead to worse decisions and less satisfaction. Learn how to apply decision minimalism in everyday life by limiting the number of daily choices, creating routines, and applying the 80/20 rule to prioritize tasks.',
      category: 'productivity',
      image: '🔍',
      readTime: '8 min',
      date: 'January 15, 2024',
      link: 'https://www.ted.com/talks/barry_schwartz_the_paradox_of_choice'
    },
    {
      id: 11,
      title: 'Chronotypes: How to Adapt Your Work Schedule to Your Biological Clock',
      excerpt: 'Not everyone is productive at the same times of day. Research on chronotypes (owl, lark, bear, wolf) shows that matching your work schedule to your biological rhythm can increase efficiency by 30%. Learn how to determine your chronotype and how to optimize your daily schedule for maximum efficiency.',
      category: 'timemanagement',
      image: '⏰',
      readTime: '10 min',
      date: 'February 3, 2024',
      link: 'https://www.sleepfoundation.org/how-sleep-works/chronotypes'
    },
    {
      id: 12,
      title: 'Lasting Motivation: From Enthusiasm to Habit',
      excerpt: 'Motivation is temporary, but habits are lasting. This article combines the science of motivation with the latest research on habit formation. Learn about the four-stage habit cycle (cue, craving, response, reward) and how to create "habit anchors" and "habit stacks" that will survive even when initial motivation disappears.',
      category: 'motivation',
      image: '⚓',
      readTime: '11 min',
      date: 'February 20, 2024',
      link: 'https://jamesclear.com/atomic-habits'
    }
  ];
  
  // Helper functions
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  // Filtering articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="articles-page">
      <Navbar navType="articles" />
      
      <div className="articles-content ios-style">
        <motion.div 
          className="articles-header"
          {...animateElement(0)}
        >
          <h1>Productivity Articles</h1>
          <p className="subtitle">Tips, techniques, and advice to help you increase your focus and productivity.</p>
          
          <motion.div 
            className="search-container"
            {...animateElement(1)}
          >
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search" 
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="categories-container"
          {...animateElement(2)}
        >
          {categories.map((category, index) => (
            <motion.button 
              key={category.id}
              className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.3 + (index * 0.05) }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
        
        <motion.div 
          className="articles-grid"
          {...animateElement(3)}
        >
          <AnimatePresence>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <motion.div 
                  key={article.id}
                  className="article-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="article-icon">{article.image}</div>
                  <div className="article-content">
                    <h2>{article.title}</h2>
                    <p className="article-excerpt">{article.excerpt}</p>
                    <div className="article-meta">
                      <span className="article-date">{article.date}</span>
                      <span className="article-read-time">{article.readTime} read</span>
                    </div>
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="primary" className="read-more-btn">Read More</Button>
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="icon">🔍</div>
                <h2>No Results</h2>
                <p>No articles found matching your search criteria.</p>
                <Button variant="secondary" onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}>
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default withPageAnimation(ArticlesPage); 