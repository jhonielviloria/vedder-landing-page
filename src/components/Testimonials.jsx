import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const topRowTestimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Facility Manager',
      company: 'TechCorp Solutions',
      rating: 5,
      quote: 'Vedder has transformed our office cleanliness standards. Their attention to detail is unmatched.',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Operations Director',
      company: 'Retail Plus Inc.',
      rating: 5,
      quote: 'Outstanding service quality and reliability. Customer satisfaction has improved significantly.',
      avatar: '👨‍💼'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'HR Manager',
      company: 'Creative Studios',
      rating: 5,
      quote: 'Professional team with eco-friendly products. The automatic restocking is a game-changer.',
      avatar: '👩‍🎨'
    },
    {
      id: 4,
      name: 'David Thompson',
      position: 'Building Owner',
      company: 'Commercial Properties',
      rating: 5,
      quote: 'Reliable, thorough, and cost-effective. Tenants consistently praise the cleanliness standards.',
      avatar: '👨‍🏢'
    },
    {
      id: 5,
      name: 'Lisa Park',
      position: 'Office Manager',
      company: 'Medical Center',
      rating: 5,
      quote: 'Essential for our healthcare facility. They understand compliance and hygiene requirements perfectly.',
      avatar: '👩‍⚕️'
    },
    {
      id: 6,
      name: 'James Wilson',
      position: 'Restaurant Owner',
      company: 'Wilson\'s Bistro',
      rating: 5,
      quote: 'Critical for food service. Their sanitary solutions keep us compliant and customers happy.',
      avatar: '👨‍�'
    },
    {
      id: 7,
      name: 'Anna Mitchell',
      position: 'School Principal',
      company: 'Greenwood Elementary',
      rating: 5,
      quote: 'Keeping our school clean and safe for children is their priority. Excellent communication.',
      avatar: '👩‍🏫'
    },
    {
      id: 8,
      name: 'Robert Kim',
      position: 'Gym Owner',
      company: 'FitLife Fitness',
      rating: 4,
      quote: 'High-traffic facility requires consistent service. They deliver every time without fail.',
      avatar: '💪'
    },
    {
      id: 9,
      name: 'Maria Santos',
      position: 'Hotel Manager',
      company: 'Grand Plaza Hotel',
      rating: 5,
      quote: 'Guest satisfaction depends on cleanliness. Vedder helps us maintain 5-star standards.',
      avatar: '🏨'
    },
    {
      id: 10,
      name: 'Tom Anderson',
      position: 'Factory Supervisor',
      company: 'Industrial Works',
      rating: 5,
      quote: 'Industrial hygiene is complex. Their expertise in workplace safety standards is invaluable.',
      avatar: '🏭'
    }
  ];

  const bottomRowTestimonials = [
    {
      id: 11,
      name: 'Jennifer Lee',
      position: 'Store Manager',
      company: 'Fashion Retail Co.',
      rating: 5,
      quote: 'Clean retail environment attracts customers. Professional service with flexible scheduling.',
      avatar: '👗'
    },
    {
      id: 12,
      name: 'Kevin O\'Brien',
      position: 'Warehouse Manager',
      company: 'Logistics Plus',
      rating: 4,
      quote: 'Large facility management made easy. Consistent quality across all our locations.',
      avatar: '📦'
    },
    {
      id: 13,
      name: 'Rachel Green',
      position: 'Dental Practice Owner',
      company: 'Smile Dental',
      rating: 5,
      quote: 'Medical-grade cleanliness standards. They understand our infection control needs.',
      avatar: '🦷'
    },
    {
      id: 14,
      name: 'Mark Williams',
      position: 'Office Coordinator',
      company: 'Law Firm Associates',
      rating: 5,
      quote: 'Professional appearance matters to clients. Vedder keeps our offices pristine.',
      avatar: '⚖️'
    },
    {
      id: 15,
      name: 'Susan Taylor',
      position: 'Event Coordinator',
      company: 'Premier Events',
      rating: 5,
      quote: 'Event venues require quick turnarounds. Their rapid response service is exceptional.',
      avatar: '🎉'
    },
    {
      id: 16,
      name: 'Chris Martinez',
      position: 'Tech Startup CEO',
      company: 'InnovateTech',
      rating: 4,
      quote: 'Modern workplace needs modern solutions. Their tech-forward approach fits our culture.',
      avatar: '💻'
    },
    {
      id: 17,
      name: 'Diana Walsh',
      position: 'Salon Owner',
      company: 'Elegance Beauty',
      rating: 5,
      quote: 'Hygiene is everything in beauty services. They help us maintain premium standards.',
      avatar: '💅'
    },
    {
      id: 18,
      name: 'Peter Chang',
      position: 'Manufacturing Manager',
      company: 'Precision Parts',
      rating: 5,
      quote: 'Clean manufacturing environment improves quality. Their industrial expertise shows.',
      avatar: '🔧'
    },
    {
      id: 19,
      name: 'Ashley Brown',
      position: 'Spa Director',
      company: 'Wellness Retreat',
      rating: 5,
      quote: 'Relaxation requires cleanliness. They create the perfect environment for our guests.',
      avatar: '🧘‍♀️'
    },
    {
      id: 20,
      name: 'Daniel Foster',
      position: 'Pharmacy Manager',
      company: 'HealthFirst Pharmacy',
      rating: 5,
      quote: 'Pharmaceutical cleanliness standards are strict. They exceed every requirement.',
      avatar: '💊'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  const TestimonialCard = ({ testimonial }) => (
    <div className="testimonial-card">
      <div className="card-header">
        <div className="avatar">{testimonial.avatar}</div>
        <div className="author-info">
          <h4 className="name">{testimonial.name}</h4>
          <p className="position">{testimonial.position}</p>
          <p className="company">{testimonial.company}</p>
        </div>
      </div>
      <div className="rating">
        {renderStars(testimonial.rating)}
      </div>
      <blockquote className="quote">"{testimonial.quote}"</blockquote>
    </div>
  );

  return (
    <section id="testimonials" className="testimonials section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2>What Our Clients Say</h2>
          <p>
            Don't just take our word for it. Here's what our satisfied clients 
            have to say about our sanitary services and products.
          </p>
        </div>

        <div className="testimonials-marquee">
          {/* Top row - scrolling left */}
          <div className="marquee-row">
            <div className="marquee-track marquee-left">
              {[...topRowTestimonials, ...topRowTestimonials].map((testimonial, index) => (
                <TestimonialCard key={`top-${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Bottom row - scrolling right */}
          <div className="marquee-row">
            <div className="marquee-track marquee-right">
              {[...bottomRowTestimonials, ...bottomRowTestimonials].map((testimonial, index) => (
                <TestimonialCard key={`bottom-${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>

        <div className="testimonials-stats">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support Available</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5+</div>
            <div className="stat-label">Years Experience</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonials {
          background: var(--neutral-50);
          overflow: hidden;
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

        .testimonials-marquee {
          margin-bottom: 4rem;
        }

        .marquee-row {
          margin-bottom: 2rem;
          overflow: hidden;
          white-space: nowrap;
        }

        .marquee-track {
          display: inline-flex;
          gap: 2rem;
          animation-duration: 60s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .marquee-left {
          animation-name: scrollLeft;
        }

        .marquee-right {
          animation-name: scrollRight;
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .testimonial-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--neutral-200);
          width: 320px;
          flex-shrink: 0;
          white-space: normal;
          transition: transform 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .avatar {
          width: 50px;
          height: 50px;
          background: var(--light-blue);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .author-info {
          flex: 1;
        }

        .name {
          font-size: 1rem;
          font-weight: 600;
          color: var(--neutral-900);
          margin: 0 0 0.25rem 0;
        }

        .position {
          font-size: 0.85rem;
          color: var(--primary-blue);
          margin: 0 0 0.125rem 0;
          font-weight: 500;
        }

        .company {
          font-size: 0.8rem;
          color: var(--neutral-600);
          margin: 0;
        }

        .rating {
          display: flex;
          gap: 0.125rem;
          margin-bottom: 1rem;
        }

        .star-filled {
          color: #fbbf24;
          fill: currentColor;
        }

        .star-empty {
          color: var(--neutral-300);
        }

        .quote {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--neutral-700);
          margin: 0;
          font-style: italic;
        }

        .testimonials-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          padding: 3rem 0;
          border-top: 1px solid var(--neutral-200);
          margin-top: 2rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-blue);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          color: var(--neutral-600);
          font-weight: 500;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }

        @media (max-width: 768px) {
          .testimonial-card {
            width: 280px;
            padding: 1.25rem;
          }

          .marquee-track {
            animation-duration: 40s;
          }

          .testimonials-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .stat-number {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
