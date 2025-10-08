import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Search, Filter, BookOpen, FileText, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const BlogPage = () => {
  useScrollAnimation('.blog-page .reveal');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Topics', count: 12 },
    { id: 'regulations', name: 'Regulations & Compliance', count: 4 },
    { id: 'best-practices', name: 'Best Practices', count: 3 },
    { id: 'healthcare', name: 'Healthcare Waste', count: 2 },
    { id: 'environmental', name: 'Environmental Impact', count: 3 }
  ];

  const articles = [
    {
      id: 1,
      title: 'Understanding Australian Medical Waste Regulations 2025',
      excerpt: 'A comprehensive guide to current medical waste disposal regulations in Australia, including state-specific requirements and compliance guidelines.',
      category: 'regulations',
      date: '2025-09-15',
      readTime: '8 min read',
      author: 'Dr. Sarah Chen',
      image: '🏥',
      featured: true,
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
      featured: true,
      tags: ['Workplace', 'Hygiene', 'Design']
    },
    {
      id: 3,
      title: 'Nappy Disposal in Childcare Centers: A Complete Guide',
      excerpt: 'Everything childcare providers need to know about safe, hygienic nappy disposal systems and meeting Australian childcare standards.',
      category: 'best-practices',
      date: '2025-09-05',
      readTime: '7 min read',
      author: 'Emma Wilson',
      image: '👶',
      featured: false,
      tags: ['Childcare', 'Safety', 'Standards']
    },
    {
      id: 4,
      title: 'Sharps Disposal: Preventing Workplace Injuries',
      excerpt: 'Critical safety protocols for sharps containers in healthcare settings, including proper handling, storage, and disposal procedures.',
      category: 'healthcare',
      date: '2025-09-28',
      readTime: '5 min read',
      author: 'Dr. James Park',
      image: '💉',
      featured: false,
      tags: ['Safety', 'Healthcare', 'Prevention']
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
      featured: true,
      tags: ['Sustainability', 'Environment', 'Innovation']
    },
    {
      id: 6,
      title: 'Clinical Waste Classification in Australia',
      excerpt: 'Understanding the different categories of clinical waste and their specific handling requirements under Australian guidelines.',
      category: 'regulations',
      date: '2025-08-15',
      readTime: '7 min read',
      author: 'Dr. Robert Anderson',
      image: '📋',
      featured: false,
      tags: ['Classification', 'Healthcare', 'Standards']
    },
    {
      id: 7,
      title: 'Feminine Hygiene: Creating Dignified Workplace Facilities',
      excerpt: 'How proper sanitary bin services contribute to workplace dignity, employee wellbeing, and gender equality in Australian businesses.',
      category: 'best-practices',
      date: '2025-08-08',
      readTime: '6 min read',
      author: 'Rachel Martinez',
      image: '💼',
      featured: false,
      tags: ['Workplace', 'Wellbeing', 'Equality']
    },
    {
      id: 8,
      title: 'Victoria\'s Clinical Waste Management Guidelines 2025',
      excerpt: 'Latest updates to Victoria\'s clinical and related waste management policy, including new requirements for healthcare facilities.',
      category: 'regulations',
      date: '2025-07-30',
      readTime: '10 min read',
      author: 'Dr. Sarah Chen',
      image: '🏛️',
      featured: false,
      tags: ['Victoria', 'Policy', 'Healthcare']
    },
    {
      id: 9,
      title: 'Infection Control Through Proper Waste Segregation',
      excerpt: 'How correct waste separation at the source reduces cross-contamination risks and protects healthcare workers and patients.',
      category: 'healthcare',
      date: '2025-07-22',
      readTime: '8 min read',
      author: 'Dr. James Park',
      image: '🛡️',
      featured: false,
      tags: ['Infection Control', 'Safety', 'Healthcare']
    },
    {
      id: 10,
      title: 'Reducing Plastic Waste in Sanitary Services',
      excerpt: 'Innovative approaches to minimizing plastic use in sanitary bin systems while maintaining hygiene and safety standards.',
      category: 'environmental',
      date: '2025-07-15',
      readTime: '7 min read',
      author: 'Lisa Green',
      image: '♻️',
      featured: false,
      tags: ['Sustainability', 'Innovation', 'Plastic']
    },
    {
      id: 11,
      title: 'Staff Training: Medical Waste Handling Protocols',
      excerpt: 'Essential training requirements for staff handling medical and sanitary waste in Australian healthcare and commercial settings.',
      category: 'regulations',
      date: '2025-07-08',
      readTime: '6 min read',
      author: 'Michael Torres',
      image: '👨‍🏫',
      featured: false,
      tags: ['Training', 'Compliance', 'Safety']
    },
    {
      id: 12,
      title: 'The Future of Waste Management Technology',
      excerpt: 'Emerging technologies transforming sanitary waste management, from smart bins to automated collection systems.',
      category: 'environmental',
      date: '2025-07-01',
      readTime: '9 min read',
      author: 'Emma Wilson',
      image: '🤖',
      featured: false,
      tags: ['Technology', 'Innovation', 'Future']
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <Link to="/" className="back-link reveal">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <div className="blog-hero-content reveal">
            <div className="section-badge">
              <BookOpen size={20} />
              Resources & Insights
            </div>
            <h1>Knowledge Hub</h1>
            <p className="hero-description">
              Expert guidance on sanitary waste management, compliance, and best practices 
              for Australian businesses and healthcare facilities.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="search-filter-section">
        <div className="container">
          <div className="search-filter-wrapper reveal">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search articles by title, topic, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-categories">
              <Filter size={18} />
              <div className="category-pills">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-pill ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                    <span className="count">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Articles Grid */}
      <section className="articles-section">
        <div className="container">
          <h2 className="section-title reveal">
            {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
            <span className="results-count">({filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'})</span>
          </h2>
          
          {filteredArticles.length === 0 ? (
            <div className="no-results reveal">
              <AlertCircle size={48} />
              <h4>No articles found</h4>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="articles-grid">
              {filteredArticles.map((article, index) => (
                <article key={article.id} className="article-card reveal" style={{ transitionDelay: `${index * 0.05}s` }}>
                  <div className="article-image">
                    <span className="article-emoji">{article.image}</span>
                    {article.featured && <div className="featured-badge">Featured</div>}
                  </div>
                  <div className="article-content">
                    <div className="article-meta">
                      <span className="category-badge">{categories.find(c => c.id === article.category)?.name}</span>
                      <span className="read-time">
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <div className="article-tags">
                      {article.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                    <div className="article-bottom">
                      <div className="author-info">
                        <span className="author-name">{article.author}</span>
                        <span className="separator">•</span>
                        <span className="date">{new Date(article.date).toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <button className="read-more-link">
                        Read Article
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="blog-cta">
        <div className="container">
          <div className="cta-content reveal">
            <FileText size={48} />
            <h3>Need Expert Advice?</h3>
            <p>
              Our team is here to help you navigate regulations, implement best practices, 
              and create a compliant waste management solution for your facility.
            </p>
            <div className="cta-buttons">
              <Link to="/#contact" className="btn btn-primary btn-large">
                Contact Our Experts
              </Link>
              <button className="btn btn-secondary btn-large">
                Download Resources
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .blog-page {
          min-height: 100vh;
          background: var(--neutral-50);
        }

        /* Hero Section */
        .blog-hero {
          background: var(--gradient-primary);
          color: white;
          padding: 8rem 0 6rem;
          position: relative;
          overflow: hidden;
        }

        .blog-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
          opacity: 0.3;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 2rem;
          padding: 0.6rem 1.2rem;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 999px;
          transition: all var(--transition-normal) var(--ease-out-cubic);
          position: relative;
          z-index: 1;
        }

        .back-link:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateX(-4px);
        }

        .blog-hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .blog-hero h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
          color: white;
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.7;
          opacity: 0.95;
          max-width: 700px;
          margin: 0 auto;
        }

        /* Search and Filter */
        .search-filter-section {
          padding: 3rem 0;
          background: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 70px;
          z-index: 100;
        }

        .search-filter-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          background: var(--neutral-50);
          border-radius: var(--radius-md);
          border: 2px solid var(--neutral-200);
          transition: all var(--transition-normal) var(--ease-out-cubic);
        }

        .search-bar:focus-within {
          border-color: var(--primary-blue);
          background: white;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }

        .search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 1rem;
          color: var(--neutral-900);
          outline: none;
        }

        .search-input::placeholder {
          color: var(--neutral-500);
        }

        .filter-categories {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .category-pills {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          flex: 1;
        }

        .category-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.1rem;
          background: var(--neutral-100);
          border: 2px solid var(--neutral-200);
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--neutral-700);
          cursor: pointer;
          transition: all var(--transition-normal) var(--ease-out-cubic);
        }

        .category-pill:hover {
          background: var(--neutral-200);
          transform: translateY(-2px);
        }

        .category-pill.active {
          background: var(--gradient-primary);
          color: white;
          border-color: transparent;
          box-shadow: var(--shadow-md);
        }

        .category-pill .count {
          background: rgba(0, 0, 0, 0.15);
          padding: 0.15rem 0.5rem;
          border-radius: 999px;
          font-size: 0.8rem;
        }

        .category-pill.active .count {
          background: rgba(255, 255, 255, 0.25);
        }

        /* Articles Section */
        .articles-section {
          padding: 4rem 0;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--neutral-900);
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .results-count {
          font-size: 1.1rem;
          font-weight: 400;
          color: var(--neutral-600);
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .article-card {
          background: white;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: all var(--transition-normal) var(--ease-out-cubic);
          border: 2px solid var(--neutral-200);
          display: flex;
          flex-direction: column;
        }

        .article-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
          border-color: var(--primary-blue);
        }

        .article-image {
          position: relative;
          height: 180px;
          background: linear-gradient(135deg, var(--light-blue) 0%, rgba(16, 185, 129, 0.1) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .article-emoji {
          font-size: 4rem;
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

        .article-content {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .article-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .category-badge {
          background: var(--light-blue);
          color: var(--primary-blue);
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .read-time {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: var(--neutral-600);
          font-size: 0.85rem;
        }

        .article-content h3 {
          font-size: 1.25rem;
          color: var(--neutral-900);
          margin-bottom: 0.875rem;
          line-height: 1.4;
        }

        .article-content p {
          color: var(--neutral-700);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          flex: 1;
        }

        .article-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }

        .tag {
          background: var(--neutral-100);
          color: var(--neutral-700);
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .article-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.25rem;
          border-top: 1px solid var(--neutral-200);
          gap: 1rem;
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--neutral-600);
        }

        .author-name {
          color: var(--neutral-900);
          font-weight: 600;
        }

        .separator {
          color: var(--neutral-400);
        }

        .read-more-link {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: none;
          border: none;
          color: var(--primary-blue);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all var(--transition-normal) var(--ease-out-cubic);
          padding: 0;
        }

        .read-more-link:hover {
          gap: 0.6rem;
          color: var(--dark-blue);
        }

        /* No Results */
        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--neutral-600);
        }

        .no-results svg {
          color: var(--neutral-400);
          margin-bottom: 1rem;
        }

        .no-results h4 {
          color: var(--neutral-900);
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }

        /* CTA Section */
        .blog-cta {
          padding: 4rem 0;
          background: var(--neutral-100);
        }

        .cta-content {
          background: var(--gradient-primary);
          color: white;
          padding: 4rem 3rem;
          border-radius: var(--radius-xl);
          text-align: center;
          box-shadow: var(--shadow-xl);
        }

        .cta-content svg {
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .cta-content h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: white;
        }

        .cta-content p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.95;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-buttons .btn-primary {
          background: white;
          color: var(--primary-blue);
        }

        .cta-buttons .btn-primary:hover {
          background: var(--neutral-100);
          transform: translateY(-2px);
        }

        .cta-buttons .btn-secondary {
          background: transparent;
          border-color: white;
          color: white;
        }

        .cta-buttons .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .blog-hero {
            padding: 6rem 0 4rem;
          }

          .blog-hero h1 {
            font-size: 2rem;
          }

          .hero-description {
            font-size: 1.1rem;
          }

          .search-filter-section {
            position: static;
          }

          .articles-grid {
            grid-template-columns: 1fr;
          }

          .filter-categories {
            flex-direction: column;
            align-items: flex-start;
          }

          .cta-content {
            padding: 3rem 2rem;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .cta-buttons .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
