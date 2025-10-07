import React, { useEffect } from 'react';
import { Building2, Droplets, Package, Wind, Trash2, ShieldCheck } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Services = () => {
  useScrollAnimation('.services .reveal');

  const services = [
    {
      id: 1,
      title: 'Sanitary & Disposal Services',
      description: 'Comprehensive waste disposal and sanitary management solutions for all types of facilities.',
      icon: Trash2,
      features: [
        'Sanitary Disposal Service',
        'Nappy Disposal Service',
        'Regular collection schedules',
        'Waste management compliance'
      ]
    },
    {
      id: 2,
      title: 'Washroom Hygiene Solutions',
      description: 'Complete washroom hygiene services including sanitizing, cleaning, dispensing systems and maintenance.',
      icon: Droplets,
      features: [
        'WC Sanitizing Service',
        'Urinal Sanitizing Service',
        'Soap Dispensing Service',
        'Feminine Hygiene Dispenser',
        'Nappy Vending Machine',
        'Anti-Bacterial Wipes Service'
      ]
    },
    {
      id: 3,
      title: 'Sharps and Medical Waste Disposal Service',
      description: 'Specialized medical waste disposal services ensuring safe handling and regulatory compliance.',
      icon: ShieldCheck,
      features: [
        'Sharps container supply & collection',
        'Medical waste disposal',
        'Healthcare facility compliance',
        'Safe disposal documentation'
      ]
    }
  ];

  return (
    <section id="services" className="services section-padding">
      <div className="container">
        <div className="section-header text-center reveal">
          <h2>Sanitary & Hygiene Services</h2>
          <p>
            Full-spectrum hygiene programs: disposal, washroom care, dispensing, and compliant waste handling—tailored to your facility.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className={`service-card reveal ${index % 2 === 1 ? 'featured' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="service-icon">
                  <IconComponent size={32} />
                </div>
                
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  
                  <button className="btn btn-secondary service-btn">
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .services {
          background: white;
        }

        .section-header {
          max-width: 600px;
          margin: 0 auto 4rem;
        }

        .section-header h2 {
          color: var(--neutral-900);
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.1rem;
          color: var(--neutral-600);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .service-card {
          background: white;
          border: 1px solid var(--neutral-200);
          border-radius: 1rem;
          padding: 2rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-blue) 0%, var(--dark-blue) 100%);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .service-card:hover::before {
          transform: scaleX(1);
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border-color: var(--primary-blue);
        }

        .service-card.featured {
          background: linear-gradient(135deg, var(--light-blue) 0%, rgba(59, 130, 246, 0.05) 100%);
          border-color: var(--primary-blue);
        }

        .service-card.featured::before {
          transform: scaleX(1);
        }

        .service-icon {
          width: 64px;
          height: 64px;
          background: var(--gradient-primary);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 1.5rem;
          transition: all var(--transition-normal) var(--ease-out-cubic);
          box-shadow: var(--shadow-md);
        }

        .service-card:hover .service-icon {
          transform: scale(1.1) rotate(5deg);
          box-shadow: var(--shadow-lg), var(--shadow-glow);
        }

        .service-content h3 {
          color: var(--neutral-900);
          margin-bottom: 1rem;
          font-size: 1.25rem;
        }

        .service-content p {
          color: var(--neutral-600);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .service-features {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
        }

        .service-features li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-700);
          font-size: 0.95rem;
        }

        .service-features li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--success);
          font-weight: bold;
        }

        .service-btn {
          width: 100%;
          justify-content: center;
        }

        .cta-section {
          margin-top: 4rem;
        }

        .cta-card {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--dark-blue) 100%);
          color: white;
          padding: 3rem 2rem;
          border-radius: 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="3" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
          pointer-events: none;
        }

        .cta-card h3 {
          color: white;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }

        .cta-card p {
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          font-size: 1.1rem;
          position: relative;
          z-index: 1;
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .cta-actions .btn {
          padding: 1rem 2rem;
        }

        .cta-actions .btn-primary {
          background: white;
          color: var(--primary-blue);
        }

        .cta-actions .btn-primary:hover {
          background: var(--neutral-100);
          transform: translateY(-2px);
        }

        .cta-actions .btn-secondary {
          background: transparent;
          color: white;
          border-color: white;
        }

        .cta-actions .btn-secondary:hover {
          background: white;
          color: var(--primary-blue);
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .service-card {
            padding: 1.5rem;
          }

          .cta-card {
            padding: 2rem 1.5rem;
          }

          .cta-actions {
            flex-direction: column;
            align-items: center;
          }

          .cta-actions .btn {
            width: 100%;
            max-width: 250px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
