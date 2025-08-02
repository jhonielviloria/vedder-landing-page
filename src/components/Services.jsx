import React from 'react';
import { Building2, Droplets, Package, Wind } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Office & Commercial Cleaning',
      description: 'Comprehensive cleaning services for offices, retail spaces, and commercial facilities. We ensure your workspace remains spotless and professional.',
      icon: Building2,
      features: [
        'Daily, weekly, or monthly schedules',
        'Eco-friendly cleaning products',
        'Fully insured and bonded staff',
        'Customizable service packages'
      ]
    },
    {
      id: 2,
      title: 'Washroom Hygiene Maintenance',
      description: 'Specialized washroom cleaning and maintenance services to ensure optimal hygiene standards and visitor satisfaction.',
      icon: Droplets,
      features: [
        'Deep sanitization protocols',
        'Supply and maintenance of dispensers',
        'Regular quality inspections',
        'Emergency response available'
      ]
    },
    {
      id: 3,
      title: 'Restocking Services',
      description: 'Keep your facilities fully stocked with essential supplies. We monitor, deliver, and restock all your sanitary products.',
      icon: Package,
      features: [
        'Automated inventory monitoring',
        'Scheduled deliveries',
        'Bulk pricing discounts',
        'Just-in-time restocking'
      ]
    },
    {
      id: 4,
      title: 'Odour Control Solutions',
      description: 'Advanced odour control systems and treatments to maintain fresh, pleasant environments in any commercial space.',
      icon: Wind,
      features: [
        'Professional-grade air fresheners',
        'Odour neutralization technology',
        'Custom scent solutions',
        'Long-lasting effectiveness'
      ]
    }
  ];

  return (
    <section id="services" className="services section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2>Our Services</h2>
          <p>
            Professional sanitary services tailored to your business needs. 
            From regular cleaning to specialized maintenance, we've got you covered.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className={`service-card ${index % 2 === 1 ? 'featured' : ''}`}>
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

        <div className="cta-section">
          <div className="cta-card">
            <h3>Ready to Get Started?</h3>
            <p>Contact us today for a free consultation and customized service quote.</p>
            <div className="cta-actions">
              <button className="btn btn-primary">Get Free Quote</button>
              <button className="btn btn-secondary">Schedule Consultation</button>
            </div>
          </div>
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
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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
          background: var(--primary-blue);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.1);
          background: var(--dark-blue);
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
