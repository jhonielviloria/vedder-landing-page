import React from 'react';
import { Users, Award, Shield, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'We maintain the highest standards in all our products and services, ensuring consistent quality and reliability.'
    },
    {
      icon: Heart,
      title: 'Customer Focus',
      description: 'Our clients are at the heart of everything we do. We build lasting relationships through exceptional service.'
    },
    {
      icon: Award,
      title: 'Professional Excellence',
      description: 'Our team consists of trained professionals who take pride in delivering superior sanitary solutions.'
    },
    {
      icon: Users,
      title: 'Community Care',
      description: 'We care about the communities we serve and contribute to healthier, cleaner environments for everyone.'
    }
  ];

  return (
    <section id="about" className="about section-padding">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <div className="section-badge">
              <Users size={16} />
              About Vedder Sanitary Services
            </div>
            
            <h2>Creating Healthier Spaces Since 2019</h2>
            
            <p className="lead-text">
              At Vedder Sanitary Services, we specialize in providing comprehensive sanitary 
              bin solutions for businesses and facilities of all sizes. Founded with a mission 
              to improve hygiene standards through professional bin services, we've become the 
              trusted choice for organizations across the region.
            </p>
            
            <p>
              Our journey began with a recognition that proper waste disposal is fundamental to 
              maintaining hygienic environments. We set out to provide not just bins, but complete 
              sanitary solutions that include regular servicing, maintenance, and professional 
              waste management.
            </p>
            
            <p>
              Today, we service over 500 locations with our range of specialized sanitary bins. 
              From feminine hygiene disposal to medical waste management, our professional team 
              ensures your facilities maintain the highest standards of cleanliness and compliance.
            </p>

            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Satisfied Clients</div>
              </div>
              <div className="stat">
                <div className="stat-number">5+</div>
                <div className="stat-label">Years of Excellence</div>
              </div>
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Customer Support</div>
              </div>
            </div>
          </div>
          
          <div className="about-visual">
            <div className="team-card">
              <div className="team-image">
                <div className="team-avatar">👨‍💼</div>
                <div className="team-avatar">👩‍💼</div>
                <div className="team-avatar">👨‍🔧</div>
              </div>
              <h3>Meet Our Team</h3>
              <p>Experienced professionals dedicated to your satisfaction</p>
            </div>
          </div>
        </div>

        <div className="values-section">
          <div className="values-header text-center">
            <h3>Our Core Values</h3>
            <p>The principles that guide everything we do</p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="value-card">
                  <div className="value-icon">
                    <IconComponent size={24} />
                  </div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .about {
          background: white;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 5rem;
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

        .about-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .team-card {
          background: linear-gradient(135deg, var(--light-blue) 0%, rgba(59, 130, 246, 0.1) 100%);
          padding: 3rem 2rem;
          border-radius: 2rem;
          text-align: center;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .team-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-blue) 0%, var(--dark-blue) 100%);
        }

        .team-image {
          display: flex;
          justify-content: center;
          gap: -10px;
          margin-bottom: 1.5rem;
        }

        .team-avatar {
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin: 0 -10px;
          border: 3px solid white;
        }

        .team-card h3 {
          color: var(--neutral-900);
          margin-bottom: 0.5rem;
        }

        .team-card p {
          color: var(--neutral-600);
          margin: 0;
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
          .about-content {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }

          .about-text h2 {
            font-size: 2rem;
          }

          .about-stats {
            justify-content: center;
            gap: 1.5rem;
          }

          .values-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .team-card {
            padding: 2rem 1.5rem;
          }

          .team-avatar {
            width: 50px;
            height: 50px;
            font-size: 1.25rem;
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
