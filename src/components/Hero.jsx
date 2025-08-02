import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <Sparkles size={16} />
              Professional Sanitary Solutions
            </div>
            
            <h1 className="hero-title">
              Professional Sanitary Bins.<br />
              <span className="text-gradient">Hygienic Solutions.</span>
            </h1>
            
            <p className="hero-description">
              Vedder Sanitary Services specializes in providing premium sanitary bin solutions 
              for businesses and facilities. From feminine hygiene disposal to general waste 
              management, we offer comprehensive bin services with regular maintenance.
            </p>
            
            <div className="hero-actions">
              <button 
                className="btn btn-primary btn-large"
                onClick={() => scrollToSection('bins')}
              >
                View Our Bins
                <ArrowRight size={20} />
              </button>
              <button 
                className="btn btn-secondary btn-large"
                onClick={() => scrollToSection('contact')}
              >
                Get Free Quote
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-icon">
                <Sparkles size={48} />
              </div>
              <h3>Sanitary Bin Experts</h3>
              <p>Professional bin solutions with regular service and maintenance</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px;
          overflow: hidden;
          background: linear-gradient(135deg, var(--white) 0%, var(--light-blue) 100%);
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .hero-shapes {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
        }

        .shape-1 {
          width: 400px;
          height: 400px;
          top: 10%;
          right: -100px;
          animation: float 6s ease-in-out infinite;
        }

        .shape-2 {
          width: 300px;
          height: 300px;
          bottom: 20%;
          left: -50px;
          animation: float 8s ease-in-out infinite reverse;
        }

        .shape-3 {
          width: 200px;
          height: 200px;
          top: 60%;
          right: 20%;
          animation: float 7s ease-in-out infinite;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          min-height: 80vh;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(59, 130, 246, 0.1);
          color: var(--primary-blue);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 2rem;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: var(--neutral-900);
        }

        .text-gradient {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--dark-blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.7;
          color: var(--neutral-600);
          margin-bottom: 3rem;
          max-width: 90%;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-large {
          padding: 1rem 2rem;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-card {
          background: white;
          padding: 3rem 2rem;
          border-radius: 2rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 300px;
          position: relative;
          overflow: hidden;
        }

        .hero-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-blue) 0%, var(--dark-blue) 100%);
        }

        .hero-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--dark-blue) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: white;
        }

        .hero-card h3 {
          color: var(--neutral-900);
          margin-bottom: 1rem;
        }

        .hero-card p {
          color: var(--neutral-600);
          margin: 0;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @media (max-width: 768px) {
          .hero {
            min-height: 90vh;
          }

          .hero-content {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-description {
            max-width: 100%;
          }

          .hero-actions {
            justify-content: center;
          }

          .btn-large {
            width: 100%;
            justify-content: center;
          }

          .shape-1,
          .shape-2,
          .shape-3 {
            display: none;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-title {
            font-size: 3rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
