import { useEffect } from 'react';

/**
 * Custom hook to animate elements when they scroll into view
 * @param {string} selector - CSS selector for elements to animate
 * @param {object} options - Intersection Observer options
 */
export const useScrollAnimation = (selector = '.reveal', options = {}) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all if IntersectionObserver not supported
      elements.forEach(el => el.classList.add('in-view'));
      return;
    }

    const defaultOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
      ...options
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Optionally unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    }, defaultOptions);

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, options]);
};

export default useScrollAnimation;
