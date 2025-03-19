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
  
  // Przykładowe kategorie artykułów
  const categories = [
    { id: 'all', name: 'Wszystkie' },
    { id: 'productivity', name: 'Produktywność' },
    { id: 'timemanagement', name: 'Zarządzanie czasem' },
    { id: 'focus', name: 'Koncentracja' },
    { id: 'motivation', name: 'Motywacja' }
  ];
  
  // Przykładowe artykuły
  const articles = [
    {
      id: 1,
      title: 'Technika Pomodoro: Klucz do zwiększenia produktywności',
      excerpt: 'Poznaj technikę Pomodoro i dowiedz się, jak efektywnie zarządzać swoim czasem, dzieląc pracę na 25-minutowe interwały.',
      category: 'productivity',
      image: '🍅',
      readTime: '5 min',
      date: '12 maja 2023'
    },
    {
      id: 2,
      title: 'Deep Work: Jak osiągnąć stan głębokiej koncentracji',
      excerpt: 'Odkryj koncepcję Deep Work Cala Newporta i naucz się, jak eliminować rozpraszacze, aby osiągnąć maksymalną wydajność.',
      category: 'focus',
      image: '🧠',
      readTime: '8 min',
      date: '3 czerwca 2023'
    },
    {
      id: 3,
      title: 'Metoda GTD (Getting Things Done) w praktyce',
      excerpt: 'Praktyczne wskazówki, jak wdrożyć metodę GTD Davida Allena do codziennego życia i zwiększyć swoją produktywność.',
      category: 'productivity',
      image: '✓',
      readTime: '7 min',
      date: '18 lipca 2023'
    },
    {
      id: 4,
      title: 'Jak skutecznie planować tydzień pracy',
      excerpt: 'Poznaj sprawdzone metody planowania tygodnia, które pomogą Ci osiągnąć więcej i zmniejszyć poziom stresu.',
      category: 'timemanagement',
      image: '📅',
      readTime: '6 min',
      date: '5 sierpnia 2023'
    },
    {
      id: 5,
      title: 'Mindfulness: Trening uważności dla lepszej koncentracji',
      excerpt: 'Jak praktyka mindfulness może pomóc Ci w zwiększeniu koncentracji i redukcji stresu w codziennym życiu.',
      category: 'focus',
      image: '🧘',
      readTime: '9 min',
      date: '22 września 2023'
    },
    {
      id: 6,
      title: 'Jak znaleźć motywację, gdy jej brakuje',
      excerpt: 'Praktyczne strategie na odzyskanie motywacji i energii do działania, nawet w trudnych momentach.',
      category: 'motivation',
      image: '🔥',
      readTime: '5 min',
      date: '10 października 2023'
    }
  ];
  
  // Funkcje pomocnicze
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  // Filtrowanie artykułów
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
          <h1>Artykuły o produktywności</h1>
          <p className="subtitle">Wskazówki, techniki i porady, które pomogą Ci zwiększyć koncentrację i produktywność.</p>
          
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
              placeholder="Szukaj artykułów..." 
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search" 
                onClick={() => setSearchTerm('')}
                aria-label="Wyczyść wyszukiwanie"
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
                      <span className="article-read-time">{article.readTime} czytania</span>
                    </div>
                    <Button variant="primary" className="read-more-btn">Czytaj więcej</Button>
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
                <h2>Brak wyników</h2>
                <p>Nie znaleziono artykułów pasujących do podanych kryteriów wyszukiwania.</p>
                <Button variant="secondary" onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}>
                  Wyczyść filtry
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