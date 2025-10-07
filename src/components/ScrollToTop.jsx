import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}

      <style jsx>{`
        .scroll-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 56px;
          height: 56px;
          background: var(--gradient-primary);
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-lg);
          z-index: 1000;
          transition: all var(--transition-normal) var(--ease-out-cubic);
          animation: fadeIn 0.3s ease-in-out;
        }

        .scroll-to-top:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl), var(--shadow-glow);
        }

        .scroll-to-top:active {
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .scroll-to-top {
            bottom: 1.5rem;
            right: 1.5rem;
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </>
  );
};

export default ScrollToTop;
