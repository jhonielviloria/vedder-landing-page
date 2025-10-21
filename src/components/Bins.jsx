import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Bins = () => {
  useScrollAnimation('.bins .reveal');

  const bins = [
    {
      id: 1,
      name: 'Sanitary Bin',
      image: '🗑️'
    },
    {
      id: 2,
      name: 'Sensor Bin',
      image: '�'
    },
    {
      id: 3,
      name: 'Nappy Bin',
      image: '�'
    },
    {
      id: 4,
      name: 'Medical Waste Bin',
      image: '🏥'
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="bins" className="bins section-padding">
      <div className="container">
        <div className="section-header text-center reveal">
          <h2>Our Sanitary Bin Solutions</h2>
          <p>
            Professional sanitary bins designed for every environment. All bins come with 
            regular servicing, maintenance, and waste collection as part of our comprehensive service.
          </p>
        </div>

        <div className="bins-row">
          {bins.map((bin, index) => (
            <div key={bin.id} className="bin-item reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
              <div className="bin-image">
                <span className="bin-emoji">{bin.image}</span>
              </div>
              <h3 className="bin-name">{bin.name}</h3>
              <div className="bin-check">
                <CheckCircle2 size={16} />
                <span>Full Service Included</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bins-cta reveal">
          <button
            className="btn btn-primary btn-large get-quote-btn"
            onClick={scrollToContact}
          >
            <FileText size={16} />
            Get Quote for All Bin Types
          </button>
        </div>
      </div>

      <style jsx>{`
        .bins {
          background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(236, 253, 245, 0.5) 100%);
        }

        .section-header {
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .section-header h2 {
          color: var(--neutral-900);
          margin-bottom: 1rem;
        }

        .bins-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .bin-item {
          background: white;
          border: 2px solid var(--neutral-200);
          border-radius: var(--radius-lg);
          padding: 2rem 1.5rem;
          text-align: center;
          transition: all var(--transition-normal) var(--ease-out-cubic);
          position: relative;
          overflow: hidden;
        }

        .bin-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--gradient-primary);
          opacity: 0;
          transition: opacity var(--transition-normal) var(--ease-out-cubic);
          z-index: 0;
        }

        .bin-item:hover::before {
          opacity: 0.05;
        }

        .bin-item:hover {
          transform: translateY(-8px);
          border-color: var(--primary-blue);
          box-shadow: var(--shadow-lg);
        }

        .bin-image {
          width: 100px;
          height: 100px;
          margin: 0 auto 1rem;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-normal) var(--ease-out-cubic);
          position: relative;
          z-index: 1;
        }

        .bin-item:hover .bin-image {
          transform: scale(1.1) rotate(5deg);
          box-shadow: var(--shadow-glow);
        }

        .bin-emoji {
          font-size: 3rem;
          filter: grayscale(0%);
        }

        .bin-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--neutral-900);
          margin-bottom: 0.75rem;
          position: relative;
          z-index: 1;
        }

        .bin-check {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: var(--primary-blue);
          font-size: 0.9rem;
          font-weight: 500;
          position: relative;
          z-index: 1;
        }

        .bins-cta {
          text-align: center;
          margin-top: 3rem;
        }

        .get-quote-btn {
          min-width: 280px;
        }

        @media (max-width: 768px) {
          .bins-row {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 1.5rem;
          }

          .bin-item {
            padding: 1.5rem 1rem;
          }

          .bin-image {
            width: 80px;
            height: 80px;
          }

          .bin-emoji {
            font-size: 2.5rem;
          }

          .bin-name {
            font-size: 1rem;
          }

          .get-quote-btn {
            width: 100%;
            min-width: auto;
          }
        }
      `}</style>
    </section>
  );
};

export default Bins;
