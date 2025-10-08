import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Article1 = () => {
  useScrollAnimation('.article-page .reveal');

  return (
    <div className="article-page">
      {/* Hero Section */}
      <section className="article-hero">
        <div className="container">
          <Link to="/blog" className="back-link">
            <ArrowLeft size={20} />
            Back to Resources
          </Link>
          
          <div className="article-header reveal">
            <span className="category-badge">Regulations & Compliance</span>
            <h1>Understanding Australian Medical Waste Regulations 2025</h1>
            <p className="article-subtitle">
              A comprehensive guide to current medical waste disposal regulations in Australia, 
              including state-specific requirements and compliance guidelines.
            </p>
            
            <div className="article-meta">
              <div className="meta-item">
                <User size={18} />
                <span>Dr. Sarah Chen</span>
              </div>
              <div className="meta-item">
                <Calendar size={18} />
                <span>September 15, 2025</span>
              </div>
              <div className="meta-item">
                <Clock size={18} />
                <span>8 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="article-content">
        <div className="container">
          <div className="content-wrapper">
            {/* Main Content */}
            <article className="main-content reveal">
              <div className="article-emoji">🏥</div>
              
              <h2>Introduction</h2>
              <p>
                Medical waste management in Australia is governed by a comprehensive framework of federal, 
                state, and territory regulations. As we enter 2025, healthcare facilities must navigate an 
                increasingly complex regulatory landscape to ensure compliance and protect public health.
              </p>

              <h2>Federal Guidelines Overview</h2>
              <p>
                The National Environment Protection (Movement of Controlled Waste between States and 
                Territories) Measure 2025 provides the overarching framework for clinical and related 
                waste management across Australia. This measure classifies medical waste into distinct 
                categories, each with specific handling and disposal requirements.
              </p>

              <h3>Key Classifications</h3>
              <ul>
                <li><strong>Cytotoxic Waste:</strong> Pharmaceuticals used in cancer treatment and their containers</li>
                <li><strong>Sharps:</strong> Needles, scalpels, and other items capable of causing puncture wounds</li>
                <li><strong>Human Tissue:</strong> Pathological specimens and anatomical waste</li>
                <li><strong>Pharmaceutical Waste:</strong> Expired or contaminated medications</li>
                <li><strong>Chemical Waste:</strong> Laboratory chemicals and disinfectants</li>
              </ul>

              <h2>State-Specific Requirements</h2>
              
              <h3>New South Wales</h3>
              <p>
                NSW follows the Clinical and Related Waste Management Guidelines, which require all 
                healthcare facilities to develop comprehensive waste management plans. Key requirements include:
              </p>
              <ul>
                <li>Mandatory segregation at point of generation</li>
                <li>Use of approved color-coded containers (yellow for clinical waste)</li>
                <li>Documentation of waste transport via EPA tracking systems</li>
                <li>Annual waste audits for facilities generating over 500kg/month</li>
              </ul>

              <h3>Victoria</h3>
              <p>
                Victoria's Environmental Protection Amendment Act 2025 introduces stricter requirements for 
                healthcare facilities, including:
              </p>
              <ul>
                <li>Pre-treatment of certain clinical waste categories before disposal</li>
                <li>Mandatory use of licensed waste transporters</li>
                <li>Real-time waste tracking through the WasteTrack portal</li>
                <li>Quarterly compliance reporting to EPA Victoria</li>
              </ul>

              <h3>Queensland</h3>
              <p>
                Queensland's Public Health Regulation 2025 emphasizes risk-based waste classification:
              </p>
              <ul>
                <li>Risk Assessment Matrix for waste categorization</li>
                <li>Specific storage time limits (7 days for clinical waste)</li>
                <li>Temperature-controlled storage requirements (≤8°C)</li>
                <li>Mandatory staff training and certification programs</li>
              </ul>

              <h2>Sharps Container Requirements</h2>
              <p>
                Sharps containers must meet Australian Standard AS 4031:2025. Critical specifications include:
              </p>
              <ul>
                <li>Puncture-resistant construction meeting 350N force rating</li>
                <li>Leak-proof sealing mechanisms</li>
                <li>Clear labeling with biohazard symbols</li>
                <li>Fill-line indicators (containers must not exceed 3/4 capacity)</li>
                <li>Hands-free operation capabilities for high-risk settings</li>
              </ul>

              <h2>Sanitary Bin Compliance</h2>
              <p>
                While sanitary waste is generally classified as general waste, healthcare facilities must 
                ensure proper containment to prevent cross-contamination:
              </p>
              <ul>
                <li>Foot-operated or sensor-activated lids</li>
                <li>Inner liners meeting AS/NZS 1998:2024 standards</li>
                <li>Regular service schedules (minimum fortnightly in healthcare settings)</li>
                <li>Placement in accessible locations meeting disability access requirements</li>
              </ul>

              <h2>Training and Documentation Requirements</h2>
              <p>
                All healthcare facilities must implement comprehensive staff training programs covering:
              </p>
              <ul>
                <li>Waste classification and segregation protocols</li>
                <li>Proper use of personal protective equipment (PPE)</li>
                <li>Spill management procedures</li>
                <li>Emergency response protocols</li>
                <li>Record-keeping and documentation requirements</li>
              </ul>

              <h2>Penalties for Non-Compliance</h2>
              <p>
                Regulatory authorities have significantly increased penalties for non-compliance in 2025:
              </p>
              <ul>
                <li>Individual fines up to $50,000 for serious breaches</li>
                <li>Corporate penalties up to $500,000</li>
                <li>License suspension or revocation for repeat offenders</li>
                <li>Criminal prosecution for gross negligence causing public health risks</li>
              </ul>

              <h2>Best Practice Recommendations</h2>
              <p>
                To ensure ongoing compliance, healthcare facilities should:
              </p>
              <ul>
                <li>Conduct monthly internal audits of waste management practices</li>
                <li>Maintain up-to-date waste management plans reviewed annually</li>
                <li>Engage certified waste management consultants for compliance reviews</li>
                <li>Implement digital tracking systems for waste documentation</li>
                <li>Subscribe to regulatory update services to stay informed of changes</li>
              </ul>

              <h2>Conclusion</h2>
              <p>
                Navigating Australian medical waste regulations requires ongoing vigilance and commitment 
                to best practices. By understanding federal guidelines, state-specific requirements, and 
                implementing robust management systems, healthcare facilities can ensure compliance while 
                protecting staff, patients, and the environment.
              </p>

              <div className="article-footer-content">
                <div className="tags">
                  <span className="tag">Compliance</span>
                  <span className="tag">Healthcare</span>
                  <span className="tag">Regulations</span>
                </div>
                
                <div className="share-section">
                  <h4>Share this article</h4>
                  <div className="share-buttons">
                    <button className="share-btn" aria-label="Share on Facebook">
                      <Facebook size={20} />
                    </button>
                    <button className="share-btn" aria-label="Share on Twitter">
                      <Twitter size={20} />
                    </button>
                    <button className="share-btn" aria-label="Share on LinkedIn">
                      <Linkedin size={20} />
                    </button>
                    <button className="share-btn" aria-label="Share via Email">
                      <Mail size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="sidebar reveal">
              <div className="sidebar-card">
                <h3>About the Author</h3>
                <div className="author-info">
                  <div className="author-avatar">👨‍⚕️</div>
                  <div>
                    <h4>Dr. Sarah Chen</h4>
                    <p>
                      Environmental Health Specialist with 15+ years experience in healthcare 
                      waste management and regulatory compliance across Australia.
                    </p>
                  </div>
                </div>
              </div>

              <div className="sidebar-card">
                <h3>Related Articles</h3>
                <div className="related-links">
                  <Link to="/blog" className="related-link">
                    Clinical Waste Classification in Australia
                  </Link>
                  <Link to="/blog" className="related-link">
                    Victoria's Clinical Waste Management Guidelines 2025
                  </Link>
                  <Link to="/blog" className="related-link">
                    Staff Training: Medical Waste Handling Protocols
                  </Link>
                </div>
              </div>

              <div className="sidebar-card cta-card">
                <h3>Need Expert Guidance?</h3>
                <p>
                  Our team can help ensure your facility meets all regulatory requirements.
                </p>
                <Link to="/#contact" className="btn btn-primary">
                  Contact Us
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

        /* Sidebar */
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

        /* Responsive */
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

export default Article1;
