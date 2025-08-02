import React from 'react';
import { FileText } from 'lucide-react';

const Bins = () => {
  const bins = [
    {
      id: 1,
      name: 'Feminine Hygiene Bin',
      image: '🗑️'
    },
    {
      id: 2,
      name: 'Baby Changing Bin',
      image: '👶'
    },
    {
      id: 3,
      name: 'General Washroom Bin',
      image: '🚽'
    },
    {
      id: 4,
      name: 'Medical Waste Bin',
      image: '🏥'
    },
    {
      id: 5,
      name: 'High-Capacity Office Bin',
      image: '🏢'
    },
    {
      id: 6,
      name: 'Compact Powder Room Bin',
      image: '🚿'
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

        <div className="bins-row">
          {bins.map((bin) => (
            <div key={bin.id} className="bin-item">
              <div className="bin-image">
                <span className="bin-emoji">{bin.image}</span>
              </div>
              <h3 className="bin-name">{bin.name}</h3>
            </div>
          ))}
        </div>

        <div className="bins-cta">
          <button
            className="btn btn-primary get-quote-btn"
            onClick={scrollToContact}
          >
            <FileText size={16} />
            Get Quote for All Bin Types
          </button>
        </div>
      </div>
    </section>
  );
};

export default Bins;
