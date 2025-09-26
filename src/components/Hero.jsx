import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Star, User } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background" />

      <div className="container">
        <div className="hero-grid">
          {/* Left: Heading and CTAs */}
          <div className="hero-left">
            <div className="hero-badge" aria-label="badge">
              <Sparkles size={16} />
              Professional Sanitary Solutions
            </div>

            <h1 className="hero-title">
              Professional Sanitary Bins.
              <br />
              <span className="text-gradient">Hygienic Solutions.</span>
            </h1>

            <p className="hero-description">
              Vedder Sanitary Services specializes in premium sanitary bin solutions for businesses
              and facilities. From feminine hygiene disposal to medical waste management, we deliver
              scheduled service with uncompromising hygiene.
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

          {/* Right: Single image */}
          <div className="hero-right">
            <div className="hero-image">
              <img 
                src="/images/bin_in_toilet.jpg" 
                alt="Sanitary bin in toilet" 
                className="main-image"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          background: url('/background.jpg') center/cover fixed,
                      radial-gradient(1200px 600px at 10% 0%, rgba(59,130,246,0.10), transparent 60%),
                      radial-gradient(1000px 500px at 90% 10%, rgba(16,185,129,0.10), transparent 60%);
          pointer-events: none;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          grid-template-areas: 'left right';
          align-items: center;
          gap: 3rem;
          padding: 4.5rem 0 2.5rem;
          position: relative;
          z-index: 2;
        }

        .hero-left {
          grid-area: left;
          max-width: 720px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: var(--primary-blue);
          background: rgba(59,130,246,0.10);
          padding: 0.4rem 0.75rem;
          border-radius: 999px;
          margin-bottom: 1.25rem;
        }

        .hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-weight: 800;
          margin: 0 0 1rem;
        }

        .text-gradient {
          background: linear-gradient(90deg, var(--primary-blue), #10B981);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-description {
          color: rgba(0,0,0,0.7);
          line-height: 1.7;
          font-size: 1.05rem;
          margin-bottom: 1.75rem;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }

        .hero-social-proof {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .avatars {
          display: flex;
          align-items: center;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 999px;
          background: #0f172a;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
          margin-left: -8px;
          box-shadow: 0 4px 12px rgba(2,6,23,0.15);
        }

        .avatar:first-of-type { margin-left: 0; }
        .avatar.small { width: 24px; height: 24px; border-width: 1.5px; }

        .rating {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #334155;
          font-weight: 500;
        }

        .star { color: #F59E0B; }
        .star.half { opacity: 0.6; }
        .rating-text { margin-left: 0.25rem; font-weight: 600; color: #0f172a; }

  .hero-right { position: relative; justify-self: end; max-width: 520px; width: 100%; grid-area: right; }

        .hero-image {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(2,6,23,0.12);
        }

        .main-image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 24px;
        }

        .success-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.9);
          backdrop-filter: saturate(120%) blur(4px);
          padding: 0.5rem 0.75rem;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(2,6,23,0.12);
        }

        .success-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: #E8FFF2;
          color: #10B981;
          flex-shrink: 0;
        }

        .success-title { font-weight: 700; color: #0f172a; font-size: 0.9rem; }
        .success-date { font-size: 0.75rem; color: #475569; }

        .stat-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(15,23,42,0.92);
          color: #fff;
          padding: 0.6rem 0.9rem;
          border-radius: 14px;
          box-shadow: 0 10px 25px rgba(2,6,23,0.25);
          text-align: left;
        }

        .stat-badge .stat-value { font-size: 1.1rem; font-weight: 800; letter-spacing: -0.02em; }
        .stat-badge .stat-label { font-size: 0.8rem; color: #cbd5e1; }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; grid-template-areas: 'left' 'right'; gap: 2rem; padding: 4rem 0 1.75rem; }
          .hero-right { justify-self: center; max-width: 520px; }
        }

        @media (max-width: 640px) {
          .hero-actions { gap: 0.75rem; }
          .hero-right { max-width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
