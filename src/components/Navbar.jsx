import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Navbar = ({ cartItemCount, onCartToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <div className="nav-brand">
            <h3 style={{ color: 'var(--primary-blue)', margin: 0 }}>
              Vedder Sanitary Services
            </h3>
          </div>

          {/* Desktop Menu */}
          <div className="nav-menu desktop-menu">
            <button onClick={() => scrollToSection('home')} className="nav-link">
              Home
            </button>
            <button onClick={() => scrollToSection('bins')} className="nav-link">
              Our Bins
            </button>
            <button onClick={() => scrollToSection('products')} className="nav-link">
              Products
            </button>
            <button onClick={() => scrollToSection('services')} className="nav-link">
              Services
            </button>
            <button onClick={() => scrollToSection('about')} className="nav-link">
              About
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">
              Contact
            </button>
          </div>

          <div className="nav-actions">
            <button className="cart-btn" onClick={onCartToggle}>
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
            
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <button onClick={() => scrollToSection('home')} className="mobile-nav-link">
              Home
            </button>
            <button onClick={() => scrollToSection('bins')} className="mobile-nav-link">
              Our Bins
            </button>
            <button onClick={() => scrollToSection('products')} className="mobile-nav-link">
              Products
            </button>
            <button onClick={() => scrollToSection('services')} className="mobile-nav-link">
              Services
            </button>
            <button onClick={() => scrollToSection('about')} className="mobile-nav-link">
              About
            </button>
            <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">
              Contact
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--neutral-200);
          transition: all 0.3s ease;
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
        }

        .desktop-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          background: none;
          border: none;
          color: var(--neutral-700);
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s ease;
          font-size: 1rem;
        }

        .nav-link:hover {
          color: var(--primary-blue);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .cart-btn {
          position: relative;
          background: none;
          border: none;
          color: var(--neutral-700);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }

        .cart-btn:hover {
          background: var(--neutral-100);
          color: var(--primary-blue);
        }

        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--primary-blue);
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--neutral-700);
          cursor: pointer;
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          padding: 1rem 0;
          border-top: 1px solid var(--neutral-200);
          background: white;
        }

        .mobile-nav-link {
          background: none;
          border: none;
          color: var(--neutral-700);
          font-weight: 500;
          cursor: pointer;
          padding: 1rem 0;
          text-align: left;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .mobile-nav-link:hover {
          color: var(--primary-blue);
        }

        @media (max-width: 768px) {
          .desktop-menu {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .mobile-menu {
            display: flex;
          }

          .nav-brand h3 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
