import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Facility Manager',
      company: 'TechCorp Solutions',
      rating: 5,
      review: 'Vedder Sanitary Services has transformed our office cleanliness standards. Their attention to detail and professional approach is unmatched. Our employees love the fresh, clean environment.',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Operations Director',
      company: 'Retail Plus Inc.',
      rating: 5,
      review: 'Outstanding service quality and reliability. They handle all our restroom maintenance and restocking needs seamlessly. Customer satisfaction has improved significantly since we started working with them.',
      avatar: '👨‍💼'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'HR Manager',
      company: 'Creative Studios',
      rating: 5,
      review: 'The team is incredibly professional and their eco-friendly products align perfectly with our company values. The automatic restocking service is a game-changer for our busy office.',
      avatar: '👩‍🎨'
    },
    {
      id: 4,
      name: 'David Thompson',
      position: 'Building Owner',
      company: 'Commercial Properties LLC',
      rating: 4,
      review: 'Reliable, thorough, and cost-effective. Vedder has been maintaining our commercial building for two years now. Tenants consistently praise the cleanliness and hygiene standards.',
      avatar: '👨‍🏢'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'star-filled' : 'star-empty'}
      />
    ));
  };

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

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className={`testimonial-card ${index === 0 ? 'featured' : ''}`}>
              <div className="quote-icon">
                <Quote size={24} />
              </div>
              
              <div className="testimonial-rating">
                <div className="stars">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="rating-text">({testimonial.rating}.0)</span>
              </div>
              
              <blockquote className="testimonial-text">
                "{testimonial.review}"
              </blockquote>
              
              <div className="testimonial-author">
                <div className="author-avatar">
                  <span>{testimonial.avatar}</span>
                </div>
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-position">{testimonial.position}</p>
                  <p className="author-company">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
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

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .testimonial-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
          border: 1px solid var(--neutral-200);
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
        }

        .testimonial-card.featured {
          background: linear-gradient(135deg, var(--light-blue) 0%, rgba(59, 130, 246, 0.05) 100%);
          border-color: var(--primary-blue);
          transform: scale(1.02);
        }

        .testimonial-card.featured::before {
          content: 'Featured Review';
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--primary-blue);
          color: white;
          padding: 0.25rem 1rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .quote-icon {
          position: absolute;
          top: 1rem;
          right: 1rem;
          color: var(--primary-blue);
          opacity: 0.3;
        }

        .testimonial-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .stars {
          display: flex;
          gap: 0.125rem;
        }

        .star-filled {
          color: #fbbf24;
          fill: currentColor;
        }

        .star-empty {
          color: var(--neutral-300);
        }

        .rating-text {
          font-size: 0.9rem;
          color: var(--neutral-600);
          font-weight: 500;
        }

        .testimonial-text {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--neutral-700);
          margin: 0 0 2rem 0;
          font-style: italic;
          position: relative;
          z-index: 1;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .author-avatar {
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

        .author-name {
          font-size: 1rem;
          font-weight: 600;
          color: var(--neutral-900);
          margin: 0 0 0.25rem 0;
        }

        .author-position {
          font-size: 0.9rem;
          color: var(--primary-blue);
          margin: 0 0 0.125rem 0;
          font-weight: 500;
        }

        .author-company {
          font-size: 0.85rem;
          color: var(--neutral-600);
          margin: 0;
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

        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .testimonial-card {
            padding: 1.5rem;
          }

          .testimonial-card.featured {
            transform: none;
          }

          .testimonials-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .stat-number {
            font-size: 2rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
