import React from 'react';
import { Building, Factory, Store, Users } from 'lucide-react';

const Partners = () => {
  const partners = [
    {
      id: 1,
      name: 'Daniels Health',
      type: 'Supplier Partner (Medical Waste)',
      description: 'Leading provider of reusable sharps and clinical waste systems, reducing sharps injuries and plastics.',
      icon: Factory,
      established: '2020'
    },
    {
      id: 2,
      name: 'Ecomist',
      type: 'Technology Partner (Hygiene Systems)',
      description: 'Natural insect & odour dispensers with broad national coverage and hygiene solutions.',
      icon: Store,
      established: '2019'
    },
    {
      id: 3,
      name: 'Sanokil',
      type: 'Industry Network Partner (Hygiene Services)',
      description: 'Extensive washroom hygiene services and sanitary bin management across Australia.',
      icon: Users,
      established: '2018'
    },
    {
      id: 4,
      name: 'BetterWaste',
      type: 'Supplier Partner (Sustainable Waste)',
      description: 'Sustainability‑focused waste recovery & recycling solutions.',
      icon: Factory,
      established: '2021'
    },
    {
      id: 5,
      name: 'JJ\'s Waste & Recycling',
      type: 'Supplier Partner (General Waste)',
      description: 'Full‑service waste & recycling provider with deep national footprint and industry expertise.',
      icon: Factory,
      established: '2017'
    },
    {
      id: 6,
      name: 'Argo Cleaning',
      type: 'Hygiene / Cleaning Partner',
      description: 'Commercial cleaning and facility hygiene specialists (pending detailed sourcing).',
      icon: Building,
      established: '2022'
    }
  ];

  return (
    <section id="partners" className="partners section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2>Our Trusted Partners</h2>
          <p>
            We collaborate with industry-leading companies and organizations to 
            deliver exceptional sanitary services and products to our clients.
          </p>
        </div>

        <div className="partners-grid">
          {partners.map((partner) => {
            const IconComponent = partner.icon;
            return (
              <div key={partner.id} className="partner-card">
                <div className="partner-header">
                  <div className="partner-icon">
                    <IconComponent size={24} />
                  </div>
                  <div className="partner-type">{partner.type}</div>
                </div>
                
                <div className="partner-content">
                  <h3 className="partner-name">{partner.name}</h3>
                  <p className="partner-description">{partner.description}</p>
                  <div className="partner-established">
                    Partnership since {partner.established}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="partnership-benefits">
          <div className="benefits-header text-center">
            <h3>Why Partner With Us?</h3>
            <p>Discover the advantages of working with Vedder Sanitary Services</p>
          </div>
          
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🤝</div>
              <h4>Reliable Partnership</h4>
              <p>Long-term relationships built on trust and consistent performance</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">💡</div>
              <h4>Innovation Focus</h4>
              <p>Always exploring new technologies and methods to improve service quality</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🌍</div>
              <h4>Sustainability</h4>
              <p>Committed to eco-friendly practices and sustainable business operations</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📈</div>
              <h4>Growth Together</h4>
              <p>We grow with our partners, scaling services to meet evolving needs</p>
            </div>
          </div>
        </div>

        <div className="cta-partnership">
          <div className="cta-content">
            <h3>Interested in Partnering With Us?</h3>
            <p>
              Join our network of trusted partners and discover how we can work 
              together to create cleaner, healthier spaces.
            </p>
            <div className="cta-actions">
              <button className="btn btn-primary">Become a Partner</button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .partners {
          background: var(--neutral-50);
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

        .partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .partner-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid var(--neutral-200);
          position: relative;
          overflow: hidden;
        }

        .partner-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--primary-blue) 0%, var(--dark-blue) 100%);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .partner-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
        }

        .partner-card:hover::before {
          transform: scaleX(1);
        }

        .partner-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .partner-icon {
          width: 48px;
          height: 48px;
          background: var(--light-blue);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-blue);
        }

        .partner-type {
          background: var(--primary-blue);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .partner-name {
          color: var(--neutral-900);
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
        }

        .partner-description {
          color: var(--neutral-600);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .partner-established {
          font-size: 0.9rem;
          color: var(--primary-blue);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .partnership-benefits {
          margin: 4rem 0;
        }

        .benefits-header {
          margin-bottom: 3rem;
        }

        .benefits-header h3 {
          color: var(--neutral-900);
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .benefits-header p {
          color: var(--neutral-600);
          font-size: 1.1rem;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .benefit-item {
          text-align: center;
          padding: 2rem 1rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .benefit-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
        }

        .benefit-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .benefit-item h4 {
          color: var(--neutral-900);
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .benefit-item p {
          color: var(--neutral-600);
          line-height: 1.6;
          margin: 0;
        }

        .cta-partnership {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--dark-blue) 100%);
          border-radius: 2rem;
          padding: 3rem 2rem;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .cta-partnership::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="35" r="3" fill="rgba(255,255,255,0.1)"/><circle cx="45" cy="75" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
          pointer-events: none;
        }

        .cta-content {
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-content h3 {
          color: white;
          margin-bottom: 1rem;
          font-size: 1.75rem;
        }

        .cta-content p {
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
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
          .partners-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .partner-card {
            padding: 1.5rem;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .cta-partnership {
            padding: 2rem 1.5rem;
          }

          .cta-content h3 {
            font-size: 1.5rem;
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
          .partners-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default Partners;
