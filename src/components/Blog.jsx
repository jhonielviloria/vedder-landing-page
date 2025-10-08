import React from 'react';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Blog = () => {
  useScrollAnimation('.blog .reveal');

  const categories = [
    { id: 'regulations', name: 'Regulations & Compliance' },
    { id: 'best-practices', name: 'Best Practices' },
    { id: 'environmental', name: 'Environmental Impact' }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: 'Understanding Australian Medical Waste Regulations 2025',
      excerpt: 'A comprehensive guide to current medical waste disposal regulations in Australia, including state-specific requirements and compliance guidelines.',
      category: 'regulations',
      date: '2025-09-15',
      readTime: '8 min read',
      author: 'Dr. Sarah Chen',
      image: '🏥',
      tags: ['Compliance', 'Healthcare', 'Regulations']
    },
    {
      id: 2,
      title: 'Best Practices for Sanitary Bin Placement in Commercial Facilities',
      excerpt: 'Learn optimal placement strategies for sanitary bins to maximize hygiene, accessibility, and compliance with workplace health standards.',
      category: 'best-practices',
      date: '2025-09-10',
      readTime: '6 min read',
      author: 'Michael Torres',
      image: '🚻',
      tags: ['Workplace', 'Hygiene', 'Design']
    },
    {
      id: 5,
      title: 'Environmental Impact of Sanitary Waste: Sustainable Solutions',
      excerpt: 'Exploring eco-friendly approaches to sanitary waste management and how businesses can reduce their environmental footprint.',
      category: 'environmental',
      date: '2025-08-20',
      readTime: '9 min read',
      author: 'Lisa Green',
      image: '🌱',
      tags: ['Sustainability', 'Environment', 'Innovation']
    }
  ];

  return (
    <section id="blog" className="blog section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center reveal">
          <div className="section-badge">
            <BookOpen size={20} />
            Resources & Insights
          </div>
          <h2>Knowledge Hub</h2>
          <p>
            Expert guidance on sanitary waste management, compliance, and best practices 
            for Australian businesses and healthcare facilities.
          </p>
        </div>

        {/* Featured Articles */}
        <div className="featured-grid">
          {featuredArticles.map((article, index) => (
            <article key={article.id} className="featured-card reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
              <Link to={`/blog/article/${article.id}`} className="article-link-wrapper">
                <div className="featured-image">
                  <span className="article-emoji">{article.image}</span>
                  <div className="featured-badge">Featured</div>
                </div>
                <div className="featured-content">
                  <div className="article-meta">
                    <span className="category-badge">{categories.find(c => c.id === article.category)?.name}</span>
                    <span className="read-time">
                      <Clock size={14} />
                      {article.readTime}
                    </span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="article-footer">
                    <div className="author-info">
                      <span className="author-name">{article.author}</span>
                      <span className="article-date">
                        <Calendar size={14} />
                        {new Date(article.date).toLocaleDateString('en-AU', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <span className="btn btn-secondary btn-sm">
                      Read More
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View All CTA */}
        <div className="view-all-section reveal">
          <Link to="/blog" className="btn btn-primary btn-large">
            View All Articles
            <ArrowRight size={20} />
          </Link>
          <p className="view-all-text">
            Explore our complete collection of 12 articles on waste management, compliance, and industry best practices.
          </p>
        </div>
      </div>

      <style jsx>{`
        .blog {
          background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(236, 253, 245, 0.3) 100%);
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--gradient-primary);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          box-shadow: var(--shadow-md);
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .featured-card {
          background: white;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: all var(--transition-normal) var(--ease-out-cubic);
          border: 2px solid var(--neutral-200);
        }

        .article-link-wrapper {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .featured-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
          border-color: var(--primary-blue);
        }

        .featured-image {
          position: relative;
          height: 200px;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .article-emoji {
          font-size: 5rem;
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.95);
          color: var(--primary-blue);
          padding: 0.4rem 0.875rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.85rem;
          box-shadow: var(--shadow-sm);
        }

        .featured-content {
          padding: 2rem;
        }

        .article-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .category-badge {
          background: var(--light-blue);
          color: var(--primary-blue);
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .read-time {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--neutral-600);
          font-size: 0.9rem;
        }

        .featured-content h3 {
          font-size: 1.5rem;
          color: var(--neutral-900);
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .featured-content p {
          color: var(--neutral-700);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .article-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--neutral-200);
        }

        .author-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .author-name {
          font-weight: 600;
          color: var(--neutral-900);
          font-size: 0.95rem;
        }

        .article-date {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--neutral-600);
          font-size: 0.85rem;
        }

        .btn-sm {
          padding: 0.6rem 1.1rem;
          font-size: 0.9rem;
        }

        /* View All Section */
        .view-all-section {
          text-align: center;
          padding: 3rem 2rem;
          background: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          border: 2px solid var(--neutral-200);
        }

        .view-all-section .btn {
          margin-bottom: 1rem;
        }

        .view-all-text {
          color: var(--neutral-600);
          font-size: 1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }

          .article-footer {
            flex-direction: column;
            align-items: flex-start;
          }

          .view-all-section {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Blog;
