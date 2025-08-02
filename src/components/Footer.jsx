import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <h3>Vedder Sanitary Services</h3>
              <p>Clean Spaces. Healthy Lives.</p>
            </div>
            <p className="footer-description">
              Your trusted partner for professional sanitary bin solutions and toilet products. 
              Creating healthier environments for businesses across the region.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => scrollToSection('home')} className="footer-link">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('bins')} className="footer-link">
                  Our Bins
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('products')} className="footer-link">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="footer-link">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="footer-link">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="footer-link">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Commercial Cleaning</a></li>
              <li><a href="#" className="footer-link">Washroom Maintenance</a></li>
              <li><a href="#" className="footer-link">Restocking Services</a></li>
              <li><a href="#" className="footer-link">Odour Control</a></li>
              <li><a href="#" className="footer-link">Emergency Services</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Bin Solutions</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Feminine Hygiene Bins</a></li>
              <li><a href="#" className="footer-link">Baby Changing Bins</a></li>
              <li><a href="#" className="footer-link">General Washroom Bins</a></li>
              <li><a href="#" className="footer-link">Medical Waste Bins</a></li>
              <li><a href="#" className="footer-link">Commercial Bins</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Products Store</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Toilet Paper</a></li>
              <li><a href="#" className="footer-link">Toilet Cleaners</a></li>
              <li><a href="#" className="footer-link">Sanitizers</a></li>
              <li><a href="#" className="footer-link">Wet Wipes</a></li>
              <li><a href="#" className="footer-link">Air Fresheners</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={16} />
                <span>123 Business Boulevard<br />Downtown, ST 12345</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>info@veddersanitary.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} Vedder Sanitary Services. All rights reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <a href="#" className="footer-bottom-link">Terms of Service</a>
              <a href="#" className="footer-bottom-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
        <ArrowUp size={20} />
      </button>

      <style jsx>{`
        .footer {
          background: var(--neutral-900);
          color: white;
          position: relative;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
          gap: 3rem;
          padding: 4rem 0 2rem;
        }

        .footer-section h3 {
          color: var(--primary-blue);
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }

        .footer-section h4 {
          color: white;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .footer-brand p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.1rem;
          margin-bottom: 1rem;
          font-style: italic;
        }

        .footer-description {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: var(--primary-blue);
          transform: translateY(-2px);
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-family: inherit;
          text-align: left;
          padding: 0;
        }

        .footer-link:hover {
          color: var(--primary-blue);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
        }

        .contact-item svg {
          color: var(--primary-blue);
          margin-top: 0.125rem;
          flex-shrink: 0;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem 0;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .copyright p {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          font-size: 0.9rem;
        }

        .footer-bottom-links {
          display: flex;
          gap: 2rem;
        }

        .footer-bottom-link {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .footer-bottom-link:hover {
          color: var(--primary-blue);
        }

        .scroll-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          background: var(--primary-blue);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .scroll-to-top:hover {
          background: var(--dark-blue);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 3rem 0 2rem;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .footer-bottom-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }

          .scroll-to-top {
            bottom: 1rem;
            right: 1rem;
            width: 45px;
            height: 45px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 2fr 1fr 1fr;
            gap: 2rem;
          }

          .footer-section:nth-child(4),
          .footer-section:nth-child(5) {
            grid-column: span 1;
          }
        }

        @media (max-width: 480px) {
          .footer-content {
            padding: 2rem 0 1.5rem;
          }

          .social-links {
            justify-content: center;
          }

          .contact-info {
            text-align: center;
          }

          .contact-item {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
