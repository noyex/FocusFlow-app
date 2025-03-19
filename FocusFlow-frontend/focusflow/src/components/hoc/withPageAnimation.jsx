/**
 * withPageAnimation - Komponent wyższego rzędu (HOC) do dodawania animacji do stron
 * 
 * Jak używać:
 * 1. Zaimportuj HOC na stronie:
 *    import withPageAnimation from '../components/hoc/withPageAnimation';
 *    import { motion } from 'framer-motion';
 *
 * 2. Dodaj prop animateElement do komponentu strony:
 *    const YourPage = ({ animateElement }) => { ... }
 *
 * 3. Użyj na elementach, które chcesz animować:
 *    <motion.div {...animateElement(0)}>Zawartość</motion.div>
 *    <motion.div {...animateElement(1)}>Pojawi się później</motion.div>
 *    
 * 4. Możesz również dostosować animację:
 *    <motion.div {...animateElement(2, { 
 *      initial: { opacity: 0, x: -30 },  // Własne początkowe wartości
 *      animate: { opacity: 1, x: 0 },    // Własne docelowe wartości
 *      transition: { duration: 0.7 }     // Własne ustawienia przejścia
 *    })}>
 *      Niestandardowa animacja
 *    </motion.div>
 *
 * 5. Opakuj eksportowany komponent w HOC:
 *    export default withPageAnimation(YourPage);
 */

import React from 'react';
import { motion } from 'framer-motion';

// Komponent wyższego rzędu, który dodaje animacje do strony
const withPageAnimation = (WrappedComponent) => {
  const WithPageAnimation = (props) => {
    // Konfiguracja animacji dla całej strony
    const pageVariants = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    };

    // Domyślne wartości dla animacji elementów strony
    const defaultElementAnimation = {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 }
    };

    // Funkcja do animowania elementów wewnątrz strony
    const animateElement = (index = 0, customAnimation = {}) => {
      return {
        initial: customAnimation.initial || defaultElementAnimation.initial,
        animate: customAnimation.animate || defaultElementAnimation.animate,
        transition: {
          duration: customAnimation.transition?.duration || defaultElementAnimation.transition.duration,
          delay: customAnimation.transition?.delay || (0.2 * index)
        }
      };
    };

    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="animated-page"
      >
        <WrappedComponent 
          {...props} 
          animateElement={animateElement} 
        />
      </motion.div>
    );
  };

  // Kopiujemy nazwę displayName dla lepszej jakości debugowania
  WithPageAnimation.displayName = `WithPageAnimation(${getDisplayName(WrappedComponent)})`;
  
  return WithPageAnimation;
};

// Funkcja pomocnicza do uzyskania nazwy komponentu
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withPageAnimation; 