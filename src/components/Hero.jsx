import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background"></div>
      
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
    </section>
  );
};

export default Hero;
