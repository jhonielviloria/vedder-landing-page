import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling past hero section
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className={`floating-contact ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <div className="contact-options">
            <button className="contact-option" onClick={scrollToContact}>
              <Mail size={20} />
              <span>Send Message</span>
            </button>
            <a href="tel:+61393579166" className="contact-option">
              <Phone size={20} />
              <span>Call Us</span>
            </a>
          </div>
        )}
        
        <button
          className="floating-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>

      <style jsx>{`
        .floating-contact {
          position: fixed;
          bottom: 6rem;
          right: 2rem;
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
        }

        .contact-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          animation: slideInRight 0.3s var(--ease-out-cubic);
        }

        .contact-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: white;
          color: var(--neutral-800);
          padding: 0.875rem 1.25rem;
          border-radius: 50px;
          border: 2px solid var(--primary-blue);
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          box-shadow: var(--shadow-lg);
          transition: all var(--transition-normal) var(--ease-out-cubic);
          text-decoration: none;
          white-space: nowrap;
        }

        .contact-option:hover {
          background: var(--gradient-primary);
          color: white;
          transform: translateX(-4px);
          border-color: transparent;
        }

        .floating-button {
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
          transition: all var(--transition-normal) var(--ease-out-cubic);
          animation: fadeIn 0.3s ease-in-out;
        }

        .floating-button:hover {
          transform: scale(1.1);
          box-shadow: var(--shadow-xl), var(--shadow-glow);
        }

        .floating-button:active {
          transform: scale(1.05);
        }

        .floating-contact.open .floating-button {
          background: var(--neutral-800);
        }

        @media (max-width: 768px) {
          .floating-contact {
            bottom: 5rem;
            right: 1.5rem;
          }

          .floating-button {
            width: 52px;
            height: 52px;
          }

          .contact-option {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .contact-options {
            right: 0;
          }

          .contact-option span {
            display: none;
          }

          .contact-option {
            width: 48px;
            height: 48px;
            padding: 0;
            justify-content: center;
            border-radius: 50%;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingContactButton;
