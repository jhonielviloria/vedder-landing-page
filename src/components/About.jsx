import React, { useEffect } from 'react';
import { Users, Award, Shield, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Reliable Service Guarantee',
      description: 'We promise consistent, on-time service — and we\'ll reimburse you for any missed visits.'
    },
    {
      icon: Award,
      title: 'Cost-Effective Solutions',
      description: 'Our pricing is transparent and fair, designed to provide regular service at competitive rates for the long term.'
    },
    {
      icon: Heart,
      title: 'Environmentally Responsible Practices',
      description: 'Our advanced washing systems use built-in water reservoirs with filtration and sanitisation technology, allowing water to be reused for up to six weeks — helping reduce waste and conserve resources.'
    }
  ];

  useEffect(() => {
    const elements = document.querySelectorAll('.about .reveal');
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all if IO not supported
      elements.forEach(el => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about section-padding">
      <div className="container">
        <div className="about-content reveal">
          <div className="about-text">
            <div className="section-badge">
              <Users size={16} />
              About Vedder Sanitary Services
            </div>
            
            <h2>About Us</h2>
            
            <p className="lead-text">
              Founded in 1971 in Melbourne's south-eastern suburbs, Vedder Sanitary Services has grown to become a trusted name in hygiene solutions across Victoria. Now based in the industrial north-west, we proudly service both metropolitan Melbourne and regional areas throughout the state.
            </p>
            
            <p>
              At Vedder, we recognise the critical role washroom hygiene plays in maintaining a healthy and safe business environment. That's why we go beyond the basics — with a commitment to setting the highest standards in the industry.
            </p>
            
            <p>
              We stand by three core promises that set us apart:
            </p>

            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Years of Excellence</div>
              </div>
              <div className="stat">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Satisfied Clients</div>
              </div>
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Customer Support</div>
              </div>
            </div>
          </div>
        </div>

        <div className="values-section">
          <div className="values-header text-center reveal">
            <h3>Our Core Promises</h3>
            <p>The three guarantees that set us apart</p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="value-card reveal"
                  style={{ '--i': index }}
                >
                  <div className="value-icon">
                    <IconComponent size={24} />
                  </div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
          
          <div className="closing-statement text-center reveal" style={{ '--i': 3 }}>
            <p className="lead-text">
              When you choose Vedder, you're not just choosing a supplier — you're partnering with a team that's committed to quality, efficiency, and sustainability in everything we do.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about {
          background: white;
        }

        /* Reveal on scroll */
        .reveal {
          opacity: 0;
          transform: translateY(16px);
          filter: blur(4px);
          transition: opacity 1400ms ease, transform 1400ms ease, filter 1400ms ease;
          will-change: opacity, transform, filter;
        }
        .reveal.in-view {
          opacity: 1;
          transform: none;
          filter: none;
        }
        /* Stagger for cards using CSS var --i set inline */
        .values-grid .value-card {
          transition-delay: calc(var(--i, 0) * 220ms);
        }
        .closing-statement.reveal { transition-delay: calc(var(--i, 0) * 220ms); }

        .about-content {
          max-width: 800px;
          margin: 0 auto 5rem;
          text-align: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal { transition: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(59, 130, 246, 0.1);
          color: var(--primary-blue);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
        }

        .about-text h2 {
          color: var(--neutral-900);
          margin-bottom: 1.5rem;
          font-size: 2.25rem;
        }

        .lead-text {
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--neutral-700);
          margin-bottom: 1.5rem;
          line-height: 1.7;
        }

        .about-text p {
          color: var(--neutral-600);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .about-stats {
          display: flex;
          gap: 2rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--neutral-200);
          justify-content: center;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-blue);
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--neutral-600);
          font-weight: 500;
        }

        .values-section {
          margin-top: 3rem;
        }

        .values-header {
          margin-bottom: 3rem;
        }

        .values-header h3 {
          color: var(--neutral-900);
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .values-header p {
          color: var(--neutral-600);
          font-size: 1.1rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .value-card {
          text-align: center;
          padding: 2rem 1rem;
          border-radius: 1rem;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .value-card:hover {
          background: var(--light-blue);
          border-color: var(--primary-blue);
          transform: translateY(-5px);
        }

        .value-icon {
          width: 64px;
          height: 64px;
          background: var(--primary-blue);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 1.5rem;
          transition: all 0.3s ease;
        }

        .value-card:hover .value-icon {
          background: var(--dark-blue);
          transform: scale(1.1);
        }

        .value-card h4 {
          color: var(--neutral-900);
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .value-card p {
          color: var(--neutral-600);
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .about-text h2 {
            font-size: 2rem;
          }

          .about-stats {
            justify-content: center;
            gap: 1.5rem;
            flex-wrap: wrap;
          }

          .values-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default About;
