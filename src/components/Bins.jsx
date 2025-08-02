import React from 'react';
import { FileText, Phone, Mail } from 'lucide-react';

const Bins = () => {
  const bins = [
    {
      id: 1,
      name: 'Feminine Hygiene Bin',
      description: 'Discrete, hygienic disposal solution for feminine hygiene products with odor control technology.',
      features: [
        'Foot-operated pedal',
        'Odor-sealed design',
        'Easy-clean interior',
        'Wall or floor mounted'
      ],
      capacity: '23 Liters',
      image: '🗑️',
      category: 'Washroom Essential'
    },
    {
      id: 2,
      name: 'Baby Changing Bin',
      description: 'Specialized disposal unit for baby changing facilities with enhanced hygiene features.',
      features: [
        'Antibacterial coating',
        'Hands-free operation',
        'Leak-proof design',
        'Easy maintenance'
      ],
      capacity: '30 Liters',
      image: '👶',
      category: 'Family Facilities'
    },
    {
      id: 3,
      name: 'General Washroom Bin',
      description: 'Versatile sanitary bin suitable for all types of washroom waste with secure lid mechanism.',
      features: [
        'Swing-top lid',
        'Rust-resistant finish',
        'Non-slip base',
        'Multiple size options'
      ],
      capacity: '15-45 Liters',
      image: '🚽',
      category: 'General Purpose'
    },
    {
      id: 4,
      name: 'Medical Waste Bin',
      description: 'Clinical-grade disposal solution for healthcare facilities and medical practices.',
      features: [
        'Biohazard compliant',
        'Secure locking system',
        'Color-coded design',
        'Regulatory approved'
      ],
      capacity: '50 Liters',
      image: '🏥',
      category: 'Healthcare'
    },
    {
      id: 5,
      name: 'High-Capacity Office Bin',
      description: 'Large-capacity sanitary bin designed for busy commercial and office environments.',
      features: [
        'Extra-large capacity',
        'Soft-close lid',
        'Fingerprint-resistant',
        'Professional appearance'
      ],
      capacity: '60 Liters',
      image: '🏢',
      category: 'Commercial'
    },
    {
      id: 6,
      name: 'Compact Powder Room Bin',
      description: 'Space-saving sanitary bin perfect for small washrooms and powder rooms.',
      features: [
        'Compact design',
        'Silent operation',
        'Easy wall mounting',
        'Stylish finish options'
      ],
      capacity: '8 Liters',
      image: '🚿',
      category: 'Space-Saving'
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="bins" className="bins section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2>Our Sanitary Bin Solutions</h2>
          <p>
            Professional sanitary bins designed for every environment. All bins come with 
            regular servicing, maintenance, and waste collection as part of our comprehensive service.
          </p>
        </div>

        <div className="bins-grid">
          {bins.map((bin) => (
            <div key={bin.id} className="bin-card">
              <div className="bin-image">
                <span className="bin-emoji">{bin.image}</span>
                <div className="bin-category">{bin.category}</div>
              </div>
              
              <div className="bin-info">
                <h3 className="bin-name">{bin.name}</h3>
                <p className="bin-description">{bin.description}</p>
                
                <div className="bin-capacity">
                  <strong>Capacity: {bin.capacity}</strong>
                </div>
                
                <div className="bin-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {bin.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bin-actions">
                  <button
                    className="btn btn-primary get-quote-btn"
                    onClick={scrollToContact}
                  >
                    <FileText size={16} />
                    Get Quote
                  </button>
                  <button
                    className="btn btn-secondary contact-btn"
                    onClick={scrollToContact}
                  >
                    <Phone size={16} />
                    Discuss Options
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="service-info">
          <div className="service-card">
            <h3>Complete Service Package</h3>
            <p>
              Every bin rental includes our comprehensive service package to ensure optimal 
              hygiene and hassle-free operation.
            </p>
            <div className="service-features">
              <div className="service-feature">
                <div className="feature-icon">🔄</div>
                <div>
                  <h4>Regular Collection</h4>
                  <p>Scheduled waste collection and disposal</p>
                </div>
              </div>
              <div className="service-feature">
                <div className="feature-icon">🧽</div>
                <div>
                  <h4>Deep Sanitization</h4>
                  <p>Professional cleaning and disinfection</p>
                </div>
              </div>
              <div className="service-feature">
                <div className="feature-icon">🔧</div>
                <div>
                  <h4>Maintenance & Repair</h4>
                  <p>Regular inspections and repairs included</p>
                </div>
              </div>
              <div className="service-feature">
                <div className="feature-icon">📞</div>
                <div>
                  <h4>24/7 Support</h4>
                  <p>Emergency service and support available</p>
                </div>
              </div>
            </div>
            <div className="cta-actions">
              <button className="btn btn-primary" onClick={scrollToContact}>
                <Mail size={16} />
                Request Service Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bins {
          background: var(--neutral-50);
        }

        .section-header {
          max-width: 700px;
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

        .bins-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .bin-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
          border: 1px solid var(--neutral-200);
        }

        .bin-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
        }

        .bin-image {
          position: relative;
          background: linear-gradient(135deg, var(--light-blue) 0%, rgba(16, 185, 129, 0.1) 100%);
          padding: 3rem 2rem;
          text-align: center;
        }

        .bin-emoji {
          font-size: 4rem;
          display: block;
        }

        .bin-category {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--primary-blue);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .bin-info {
          padding: 2rem;
        }

        .bin-name {
          color: var(--neutral-900);
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .bin-description {
          color: var(--neutral-600);
          font-size: 0.95rem;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .bin-capacity {
          background: var(--light-blue);
          color: var(--primary-blue);
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
        }

        .bin-features {
          margin-bottom: 2rem;
        }

        .bin-features h4 {
          color: var(--neutral-800);
          font-size: 1rem;
          margin-bottom: 0.75rem;
        }

        .bin-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .bin-features li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-700);
          font-size: 0.9rem;
        }

        .bin-features li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--primary-blue);
          font-weight: bold;
        }

        .bin-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .get-quote-btn,
        .contact-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          min-width: 140px;
        }

        .service-info {
          margin-top: 4rem;
        }

        .service-card {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--dark-blue) 100%);
          color: white;
          padding: 3rem 2rem;
          border-radius: 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="3" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
          pointer-events: none;
        }

        .service-card h3 {
          color: white;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }

        .service-card > p {
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          font-size: 1.1rem;
          position: relative;
          z-index: 1;
        }

        .service-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .service-feature {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          text-align: left;
        }

        .feature-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .service-feature h4 {
          color: white;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }

        .service-feature p {
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          font-size: 0.9rem;
        }

        .cta-actions {
          position: relative;
          z-index: 1;
        }

        .cta-actions .btn {
          background: white;
          color: var(--primary-blue);
          padding: 1rem 2rem;
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cta-actions .btn:hover {
          background: var(--neutral-100);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .bins-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .bin-card {
            padding: 0;
          }

          .bin-info {
            padding: 1.5rem;
          }

          .bin-actions {
            flex-direction: column;
          }

          .get-quote-btn,
          .contact-btn {
            width: 100%;
            min-width: auto;
          }

          .service-card {
            padding: 2rem 1.5rem;
          }

          .service-features {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .service-feature {
            text-align: center;
            flex-direction: column;
            align-items: center;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .bins-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .service-features {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default Bins;
