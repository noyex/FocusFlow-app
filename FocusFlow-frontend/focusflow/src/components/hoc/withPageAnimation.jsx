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

/**
 * Higher-order component that adds page animations
 * Usage:
 * 1. Wrap your page component with withPageAnimation
 * 2. Add animateElement prop to your page component:
 *    <YourPage animateElement={animateElement} />
 */
const withPageAnimation = (Component) => {
  return (props) => {
    const pageVariants = {
      initial: {
        opacity: 0,
        y: 10
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5
        }
      },
      exit: {
        opacity: 0,
        y: -10,
        transition: {
          duration: 0.3
        }
      }
    };

    // Higher-order component that adds animations to the page
    const animateElement = (element, custom = {}) => {
      return (
        <motion.div
          initial={custom.initial || pageVariants.initial}
          animate={custom.animate || pageVariants.animate}
          exit={custom.exit || pageVariants.exit}
          {...custom}
        >
          {element}
        </motion.div>
      );
    };

    return <Component {...props} animateElement={animateElement} />;
  };
};

// Funkcja pomocnicza do uzyskania nazwy komponentu
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withPageAnimation; 