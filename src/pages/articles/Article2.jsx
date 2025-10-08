import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Article2 = () => {
  useScrollAnimation('.article-page .reveal');

  return (
    <div className="article-page">
      <section className="article-hero">
        <div className="container">
          <Link to="/blog" className="back-link">
            <ArrowLeft size={20} />
            Back to Resources
          </Link>
          
          <div className="article-header reveal">
            <span className="category-badge">Best Practices</span>
            <h1>Best Practices for Sanitary Bin Placement in Commercial Facilities</h1>
            <p className="article-subtitle">
              Learn optimal placement strategies for sanitary bins to maximize hygiene, accessibility, 
              and compliance with workplace health standards.
            </p>
            
            <div className="article-meta">
              <div className="meta-item">
                <User size={18} />
                <span>Michael Torres</span>
              </div>
              <div className="meta-item">
                <Calendar size={18} />
                <span>September 10, 2025</span>
              </div>
              <div className="meta-item">
                <Clock size={18} />
                <span>6 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="article-content">
        <div className="container">
          <div className="content-wrapper">
            <article className="main-content reveal">
              <div className="article-emoji">🚻</div>
              
              <h2>Introduction</h2>
              <p>
                Proper placement of sanitary bins is crucial for maintaining workplace hygiene, employee 
                satisfaction, and regulatory compliance. This comprehensive guide outlines best practices 
                for commercial facilities of all sizes.
              </p>

              <h2>Strategic Placement Principles</h2>
              
              <h3>Accessibility Standards</h3>
              <p>
                Sanitary bins must be easily accessible without compromising dignity or privacy. Key considerations include:
              </p>
              <ul>
                <li><strong>Height Requirements:</strong> Install at 800-1000mm from floor level for optimal accessibility</li>
                <li><strong>Clear Access:</strong> Maintain minimum 1200mm clearance for wheelchair accessibility</li>
                <li><strong>Door Swing:</strong> Ensure bin placement doesn't interfere with door operation</li>
                <li><strong>Lighting:</strong> Position in well-lit areas for easy identification and use</li>
              </ul>

              <h3>Privacy Considerations</h3>
              <p>
                Maintaining user dignity is paramount when positioning sanitary waste facilities:
              </p>
              <ul>
                <li>Install bins within individual toilet cubicles, not in common washroom areas</li>
                <li>Position away from direct sightlines when doors are opened</li>
                <li>Use wall-mounted units to maximize privacy and floor space</li>
                <li>Consider sight-screening for open-plan or shared facilities</li>
              </ul>

              <h2>Location-Specific Guidelines</h2>

              <h3>Office Buildings</h3>
              <p>
                In corporate environments, sanitary bin placement should support professional standards:
              </p>
              <ul>
                <li><strong>Minimum Requirements:</strong> One bin per female toilet cubicle</li>
                <li><strong>Accessible Toilets:</strong> Dedicated bins meeting disability access standards</li>
                <li><strong>Multi-floor Buildings:</strong> Consistent placement on all floors</li>
                <li><strong>Gender-Neutral Facilities:</strong> Bins in all individual facilities</li>
              </ul>

              <h3>Healthcare Facilities</h3>
              <p>
                Medical settings require enhanced hygiene protocols:
              </p>
              <ul>
                <li>Hands-free operation (foot pedal or sensor-activated)</li>
                <li>Antimicrobial coating on high-touch surfaces</li>
                <li>Twice-weekly servicing minimum</li>
                <li>Clearly marked with biohazard symbols where applicable</li>
              </ul>

              <h3>Retail and Hospitality</h3>
              <p>
                Customer-facing facilities demand premium presentation:
              </p>
              <ul>
                <li>Aesthetically pleasing units matching washroom décor</li>
                <li>Odor-control systems for high-traffic areas</li>
                <li>More frequent servicing during peak periods</li>
                <li>Signage to promote proper disposal practices</li>
              </ul>

              <h3>Industrial Workplaces</h3>
              <p>
                Manufacturing and warehouse environments require robust solutions:
              </p>
              <ul>
                <li>Heavy-duty construction resistant to harsh environments</li>
                <li>Easy-clean surfaces for rapid maintenance</li>
                <li>Multiple units for large workforce populations</li>
                <li>Clear labeling in multiple languages if needed</li>
              </ul>

              <h2>Quantity Calculations</h2>
              <p>
                Determining the appropriate number of sanitary bins depends on several factors:
              </p>
              <ul>
                <li><strong>Staff Numbers:</strong> Minimum one bin per toilet cubicle</li>
                <li><strong>Customer Traffic:</strong> Add 30% capacity for public-facing facilities</li>
                <li><strong>Operational Hours:</strong> Consider 24-hour operations requiring additional servicing</li>
                <li><strong>Demographic Profile:</strong> Adjust for workforce composition</li>
              </ul>

              <h2>Technical Specifications</h2>

              <h3>Bin Capacity</h3>
              <p>
                Select appropriate sizes based on usage patterns:
              </p>
              <ul>
                <li><strong>Low Traffic (1-10 users/day):</strong> 5-8 liter capacity</li>
                <li><strong>Medium Traffic (10-30 users/day):</strong> 10-15 liter capacity</li>
                <li><strong>High Traffic (30+ users/day):</strong> 20+ liter capacity</li>
              </ul>

              <h3>Installation Methods</h3>
              <p>
                Choose mounting options appropriate for your facility:
              </p>
              <ul>
                <li><strong>Wall-Mounted:</strong> Space-saving, professional appearance, easier cleaning</li>
                <li><strong>Floor-Standing:</strong> No wall penetration required, portable for events</li>
                <li><strong>Recessed:</strong> Premium aesthetic, maximum space efficiency</li>
                <li><strong>Surface-Mounted:</strong> Quick installation, suitable for rentals</li>
              </ul>

              <h2>Maintenance Considerations</h2>

              <h3>Service Frequency</h3>
              <p>
                Establish appropriate servicing schedules:
              </p>
              <ul>
                <li><strong>Standard Office:</strong> Fortnightly servicing adequate for most needs</li>
                <li><strong>Healthcare:</strong> Twice-weekly minimum, daily for high-risk areas</li>
                <li><strong>Retail/Hospitality:</strong> Weekly servicing recommended</li>
                <li><strong>Industrial:</strong> Weekly to fortnightly depending on workforce size</li>
              </ul>

              <h3>Hygiene Features</h3>
              <p>
                Modern sanitary bins should incorporate:
              </p>
              <ul>
                <li>Hands-free operation mechanisms</li>
                <li>Sealed liners preventing odor escape</li>
                <li>Antimicrobial surfaces reducing bacterial growth</li>
                <li>Easy-clean construction for rapid servicing</li>
                <li>Overflow prevention systems</li>
              </ul>

              <h2>Compliance Requirements</h2>
              <p>
                Australian workplace regulations require:
              </p>
              <ul>
                <li>Adequate sanitary disposal facilities in all female and gender-neutral toilets</li>
                <li>Regular servicing by licensed waste management providers</li>
                <li>Documentation of disposal for workplace health audits</li>
                <li>Emergency overflow procedures</li>
                <li>Staff training on proper usage</li>
              </ul>

              <h2>Signage and Education</h2>
              <p>
                Support proper usage through clear communication:
              </p>
              <ul>
                <li>Install discreet instructional signage near bins</li>
                <li>Include proper disposal guidelines (what can/cannot be disposed)</li>
                <li>Provide multilingual instructions in diverse workplaces</li>
                <li>Display service provider contact information for issues</li>
              </ul>

              <h2>Conclusion</h2>
              <p>
                Strategic sanitary bin placement reflects an organization's commitment to employee wellbeing 
                and professional standards. By following these best practices, facilities can ensure hygiene, 
                compliance, and user satisfaction while maintaining a dignified workplace environment.
              </p>

              <div className="article-footer-content">
                <div className="tags">
                  <span className="tag">Workplace</span>
                  <span className="tag">Hygiene</span>
                  <span className="tag">Design</span>
                </div>
                
                <div className="share-section">
                  <h4>Share this article</h4>
                  <div className="share-buttons">
                    <button className="share-btn"><Facebook size={20} /></button>
                    <button className="share-btn"><Twitter size={20} /></button>
                    <button className="share-btn"><Linkedin size={20} /></button>
                    <button className="share-btn"><Mail size={20} /></button>
                  </div>
                </div>
              </div>
            </article>

            <aside className="sidebar reveal">
              <div className="sidebar-card">
                <h3>About the Author</h3>
                <div className="author-info">
                  <div className="author-avatar">👷</div>
                  <div>
                    <h4>Michael Torres</h4>
                    <p>
                      Workplace facilities consultant specializing in hygiene infrastructure 
                      design and regulatory compliance for commercial properties.
                    </p>
                  </div>
                </div>
              </div>

              <div className="sidebar-card">
                <h3>Related Articles</h3>
                <div className="related-links">
                  <Link to="/blog" className="related-link">
                    Feminine Hygiene: Creating Dignified Workplace Facilities
                  </Link>
                  <Link to="/blog" className="related-link">
                    Understanding Australian Medical Waste Regulations 2025
                  </Link>
                </div>
              </div>

              <div className="sidebar-card cta-card">
                <h3>Need a Site Assessment?</h3>
                <p>
                  Our experts can evaluate your facility and recommend optimal bin placement.
                </p>
                <Link to="/#contact" className="btn btn-primary">
                  Schedule Assessment
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style jsx>{`
        .article-page {
          min-height: 100vh;
        }

        .article-hero {
          background: var(--gradient-primary);
          color: white;
          padding: 6rem 0 4rem;
          position: relative;
          overflow: hidden;
        }

        .article-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="none"/><path d="M0 0L100 100M100 0L0 100" stroke="rgba(255,255,255,0.05)" stroke-width="2"/></svg>');
          opacity: 0.5;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          text-decoration: none;
          font-weight: 500;
          margin-bottom: 2rem;
          opacity: 0.9;
          transition: all var(--transition-normal);
        }

        .back-link:hover {
          opacity: 1;
          gap: 0.75rem;
        }

        .article-header {
          max-width: 800px;
        }

        .category-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .article-header h1 {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .article-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          opacity: 0.95;
          margin-bottom: 2rem;
        }

        .article-meta {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          opacity: 0.9;
        }

        .article-content {
          padding: 4rem 0;
          background: white;
        }

        .content-wrapper {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .main-content {
          max-width: 100%;
        }

        .article-emoji {
          font-size: 6rem;
          text-align: center;
          margin-bottom: 3rem;
        }

        .main-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--neutral-900);
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 3px solid var(--primary-blue);
        }

        .main-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--neutral-900);
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .main-content p {
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--neutral-700);
          margin-bottom: 1.5rem;
        }

        .main-content ul {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }

        .main-content li {
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--neutral-700);
          margin-bottom: 0.75rem;
        }

        .main-content li strong {
          color: var(--neutral-900);
          font-weight: 600;
        }

        .article-footer-content {
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 2px solid var(--neutral-200);
        }

        .tags {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .tag {
          background: var(--light-blue);
          color: var(--primary-blue);
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .share-section h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--neutral-900);
          margin-bottom: 1rem;
        }

        .share-buttons {
          display: flex;
          gap: 1rem;
        }

        .share-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid var(--neutral-300);
          background: white;
          color: var(--neutral-600);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .share-btn:hover {
          background: var(--primary-blue);
          color: white;
          border-color: var(--primary-blue);
          transform: translateY(-2px);
        }

        .sidebar {
          position: sticky;
          top: 2rem;
          height: fit-content;
        }

        .sidebar-card {
          background: white;
          border: 2px solid var(--neutral-200);
          border-radius: var(--radius-lg);
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: var(--shadow-sm);
        }

        .sidebar-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--neutral-900);
          margin-bottom: 1.5rem;
        }

        .author-info {
          display: flex;
          gap: 1rem;
        }

        .author-avatar {
          font-size: 3rem;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--light-blue);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .author-info h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--neutral-900);
          margin-bottom: 0.5rem;
        }

        .author-info p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--neutral-600);
        }

        .related-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .related-link {
          color: var(--neutral-700);
          text-decoration: none;
          padding: 1rem;
          border-radius: var(--radius-md);
          background: var(--neutral-50);
          transition: all var(--transition-normal);
          font-weight: 500;
        }

        .related-link:hover {
          background: var(--light-blue);
          color: var(--primary-blue);
          transform: translateX(4px);
        }

        .cta-card {
          background: var(--gradient-primary);
          color: white;
          text-align: center;
        }

        .cta-card h3 {
          color: white;
        }

        .cta-card p {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
        }

        .cta-card .btn {
          background: white;
          color: var(--primary-blue);
          width: 100%;
        }

        .cta-card .btn:hover {
          background: var(--neutral-100);
          transform: translateY(-2px);
        }

        @media (max-width: 968px) {
          .content-wrapper {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .sidebar {
            position: static;
          }

          .article-header h1 {
            font-size: 2.25rem;
          }

          .article-subtitle {
            font-size: 1.125rem;
          }

          .article-meta {
            gap: 1rem;
          }
        }

        @media (max-width: 640px) {
          .article-hero {
            padding: 4rem 0 3rem;
          }

          .article-header h1 {
            font-size: 1.875rem;
          }

          .main-content h2 {
            font-size: 1.5rem;
          }

          .main-content p,
          .main-content li {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Article2;
