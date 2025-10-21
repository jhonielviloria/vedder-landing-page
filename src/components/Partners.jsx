import React from 'react';
import { Building, Factory, Store, Users } from 'lucide-react';

const Partners = () => {
  // Auto-import all partner logo images placed in src/assets/partners
  const logos = React.useMemo(() => {
    const modules = import.meta.glob('../assets/partners/*.{png,jpg,jpeg,webp,svg}', { eager: true });
    const items = Object.entries(modules).map(([path, mod]) => {
      const src = mod && mod.default ? mod.default : undefined;
      const name = path.split('/').pop()?.split('.')[0]?.replace(/[-_]/g, ' ') || 'Partner logo';
      return src ? { src, name } : null;
    }).filter(Boolean);
    return items;
  }, []);
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

        {logos.length > 0 && (
          <div className="logos-marquee" aria-label="Partner logos">
            <div className="logos-track">
              {logos.concat(logos).map((logo, idx) => (
                <div className="logo-item" key={`${logo.src}-${idx}`}>
                  <img
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .partners {
          background: var(--neutral-50);
        }

        /* Logos marquee */
        .logos-marquee {
          position: relative;
          overflow: hidden;
          margin: 0 0 2.5rem;
          padding: 0.5rem 0;
          mask-image: linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%);
        }

        .logos-track {
          display: flex;
          align-items: center;
          gap: 3rem;
          width: max-content;
          animation: marquee-scroll 28s linear infinite;
        }

        .logos-marquee:hover .logos-track { animation-play-state: paused; }

        .logo-item { flex: 0 0 auto; opacity: 0.9; transition: opacity .2s ease, transform .2s ease; }
        .logo-item:hover { opacity: 1; transform: translateY(-2px); }
        .logo-item img { height: 40px; width: auto; display: block; filter: grayscale(100%); opacity: 0.9; }
        .logo-item img:hover { filter: grayscale(0%); opacity: 1; }

        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
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
      `}</style>
    </section>
  );
};

export default Partners;
