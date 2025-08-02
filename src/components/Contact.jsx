import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@veddersanitary.com',
      subDetails: 'support@veddersanitary.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      subDetails: '+1 (555) 987-6543'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Business Boulevard',
      subDetails: 'Downtown, ST 12345'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon - Fri: 8:00 AM - 6:00 PM',
      subDetails: 'Sat: 9:00 AM - 4:00 PM'
    }
  ];

  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2>Get In Touch</h2>
          <p>
            Ready to improve your facility's cleanliness? Contact us today for 
            a free consultation and personalized service quote.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-header">
              <h3>Contact Information</h3>
              <p>
                Reach out to us through any of these channels. We're here to help 
                with all your sanitary service needs.
              </p>
            </div>

            <div className="contact-items">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="contact-item">
                    <div className="contact-icon">
                      <IconComponent size={20} />
                    </div>
                    <div className="contact-details">
                      <h4>{item.title}</h4>
                      <p>{item.details}</p>
                      <p className="sub-detail">{item.subDetails}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="quick-actions">
              <h4>Quick Actions</h4>
              <div className="action-buttons">
                <button className="btn btn-primary">
                  <Phone size={16} />
                  Call Now
                </button>
                <button className="btn btn-secondary">
                  <Mail size={16} />
                  Send Email
                </button>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h3>Send Us a Message</h3>
                <p>Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              {isSubmitted && (
                <div className="success-message">
                  <CheckCircle size={20} />
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="bin-quote">Sanitary Bin Quote</option>
                  <option value="bin-rental">Bin Rental Inquiry</option>
                  <option value="service-quote">Service Quote Request</option>
                  <option value="maintenance">Maintenance & Support</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="general-inquiry">General Inquiry</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-input form-textarea"
                  required
                  placeholder="Tell us about your sanitary bin requirements..."
                  rows="5"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact {
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

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        .info-header {
          margin-bottom: 2rem;
        }

        .info-header h3 {
          color: var(--neutral-900);
          margin-bottom: 0.5rem;
        }

        .info-header p {
          color: var(--neutral-600);
          line-height: 1.6;
        }

        .contact-items {
          margin-bottom: 2rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          border-radius: 0.75rem;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .contact-item:hover {
          background: var(--light-blue);
          border-color: var(--primary-blue);
        }

        .contact-icon {
          width: 48px;
          height: 48px;
          background: var(--primary-blue);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .contact-details h4 {
          color: var(--neutral-900);
          margin-bottom: 0.25rem;
          font-size: 1rem;
        }

        .contact-details p {
          color: var(--neutral-700);
          margin: 0.125rem 0;
          font-size: 0.95rem;
        }

        .sub-detail {
          color: var(--neutral-600) !important;
          font-size: 0.9rem !important;
        }

        .quick-actions {
          background: var(--neutral-50);
          padding: 1.5rem;
          border-radius: 1rem;
          border: 1px solid var(--neutral-200);
        }

        .quick-actions h4 {
          color: var(--neutral-900);
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .action-buttons {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .action-buttons .btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          padding: 0.75rem 1rem;
        }

        .contact-form-container {
          background: var(--neutral-50);
          border-radius: 1rem;
          padding: 2rem;
          border: 1px solid var(--neutral-200);
        }

        .form-header {
          margin-bottom: 2rem;
        }

        .form-header h3 {
          color: var(--neutral-900);
          margin-bottom: 0.5rem;
        }

        .form-header p {
          color: var(--neutral-600);
          font-size: 0.95rem;
        }

        .success-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--success);
          color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--neutral-700);
          font-size: 0.95rem;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 1px solid var(--neutral-300);
          border-radius: 0.5rem;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          font-family: inherit;
          background: white;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          font-size: 1rem;
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .contact-form-container {
            padding: 1.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .contact-item {
            padding: 1rem;
          }

          .action-buttons {
            flex-direction: column;
          }

          .action-buttons .btn {
            width: 100%;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .contact-content {
            gap: 3rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
