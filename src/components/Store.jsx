import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter, X, ChevronDown, Star, TrendingUp, Package, Shield, Truck, Award } from 'lucide-react';
import { mysql, mysqlEnabled } from '../lib/mysql';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Store = ({ addToCart }) => {
  useScrollAnimation('.store .reveal');
  
  const fallbackProducts = [
    {
      id: 1,
      name: 'Premium Toilet Paper (24-Pack)',
      description: 'Ultra-soft 3-ply toilet paper for commercial and home use. Superior quality with excellent absorbency.',
      price: 32.99,
      image: '🧻',
      category: 'Toilet Paper',
      inStock: true,
      featured: true,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Toilet Paper (12-Pack)',
      description: 'High-quality 2-ply toilet paper, perfect for everyday use in any facility.',
      price: 18.99,
      image: '🧻',
      category: 'Toilet Paper',
      inStock: true,
      rating: 4.5
    },
    {
      id: 3,
      name: 'Eco-Friendly Toilet Paper',
      description: 'Sustainable bamboo toilet paper, environmentally conscious choice for green businesses.',
      price: 24.99,
      image: '🌿',
      category: 'Eco-Friendly',
      inStock: true,
      featured: true,
      rating: 4.9
    },
    {
      id: 4,
      name: 'Toilet Bowl Cleaner',
      description: 'Powerful disinfectant cleaner for toilets and urinals. Removes tough stains and kills 99.9% of germs.',
      price: 8.99,
      image: '🧽',
      category: 'Cleaners',
      inStock: true,
      rating: 4.6
    },
    {
      id: 5,
      name: 'Toilet Seat Sanitizer',
      description: 'Antibacterial spray for toilet seat disinfection. Safe for all surfaces.',
      price: 12.99,
      image: '🧴',
      category: 'Sanitizers',
      inStock: true,
      rating: 4.7
    },
    {
      id: 6,
      name: 'Flushable Wet Wipes',
      description: 'Biodegradable wet wipes safe for septic systems. Gentle and effective.',
      price: 15.99,
      image: '💧',
      category: 'Wipes',
      inStock: true,
      rating: 4.4
    },
    {
      id: 7,
      name: 'Toilet Brush & Holder Set',
      description: 'Durable toilet brush with hygienic storage holder. Modern design meets functionality.',
      price: 19.99,
      image: '🪣',
      category: 'Accessories',
      inStock: true,
      rating: 4.3
    },
    {
      id: 8,
      name: 'Air Freshener Spray',
      description: 'Long-lasting bathroom air freshener with odor eliminator. Fresh scent guaranteed.',
      price: 6.99,
      image: '🌸',
      category: 'Air Care',
      inStock: true,
      rating: 4.5
    },
    {
      id: 9,
      name: 'Toilet Paper Dispenser',
      description: 'Commercial-grade toilet paper dispenser for facilities. Durable and tamper-resistant.',
      price: 45.99,
      image: '📦',
      category: 'Accessories',
      inStock: true,
      featured: true,
      rating: 4.8
    },
    {
      id: 10,
      name: 'Hand Sanitizer',
      description: 'Alcohol-based hand sanitizer, 70% alcohol content. Kills germs instantly.',
      price: 9.99,
      image: '🧴',
      category: 'Sanitizers',
      inStock: true,
      rating: 4.6
    },
    {
      id: 11,
      name: 'Toilet Seat Covers (500-Pack)',
      description: 'Disposable toilet seat covers for public restrooms. Individually wrapped for hygiene.',
      price: 28.99,
      image: '🎯',
      category: 'Accessories',
      inStock: true,
      rating: 4.4
    },
    {
      id: 12,
      name: 'Heavy-Duty Toilet Cleaner',
      description: 'Industrial strength toilet bowl cleaner for tough stains. Professional-grade formula.',
      price: 14.99,
      image: '🧽',
      category: 'Cleaners',
      inStock: true,
      rating: 4.7
    }
  ];

  const [allProducts, setAllProducts] = useState(fallbackProducts);
  const [filteredProducts, setFilteredProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!mysqlEnabled) return;
      setLoading(true);
      const { data, error } = await mysql.getProducts();
      if (!error && data && active) {
        const mapped = data.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description || '',
          price: Number(p.price),
          image: p.image_url || '🧻',
          category: p.category || 'General',
          inStock: (typeof p.stock === 'number' ? p.stock > 0 : true),
          featured: p.featured || false,
          rating: p.rating || 4.5
        }));
        setAllProducts(mapped);
        setFilteredProducts(mapped);
      }
      if (active) setLoading(false);
    };
    load();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [allProducts, searchTerm, selectedCategory, sortBy, priceRange]);

  const categories = ['All', ...new Set(allProducts.map(p => p.category))];
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
  const featuredProducts = allProducts.filter(p => p.featured).slice(0, 3);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('featured');
    setPriceRange([0, 100]);
  };

  return (
    <div className="store">
      {/* Hero Section */}
      <section className="store-hero reveal">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Sanitary Products Store</h1>
            <p className="hero-subtitle">
              Premium quality products for commercial and residential facilities
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search Bar */}
      <section className="store-filters reveal">
        <div className="container">
          <div className="filters-header">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search products by name, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>
                  <X size={18} />
                </button>
              )}
            </div>
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filters
              <ChevronDown size={18} className={showFilters ? 'rotated' : ''} />
            </button>
          </div>

          {/* Filter Panel */}
          <div className={`filter-panel ${showFilters ? 'show' : ''}`}>
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <div className="category-pills">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                    {cat !== 'All' && (
                      <span className="pill-count">
                        {allProducts.filter(p => p.category === cat).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="price-range"
              />
            </div>

            <button className="clear-filters" onClick={clearFilters}>
              <X size={16} />
              Clear All Filters
            </button>
          </div>

          {/* Results Info */}
          <div className="results-info">
            <p>
              Showing <strong>{startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredProducts.length)}</strong> of <strong>{filteredProducts.length}</strong> products
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="store-products">
        <div className="container">
          {loading ? (
            <div className="loading reveal">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="no-results reveal">
              <Package size={64} />
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {paginatedProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="product-card reveal" 
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  <div className="product-image">
                    {(() => {
                      const val = product.image;
                      const isUrl = typeof val === 'string' && /^(https?:\/\/|data:image)/i.test(val);
                      return isUrl ? (
                        <img
                          className="product-photo"
                          src={val}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <span className="product-emoji">{val}</span>
                      );
                    })()}
                    
                    {product.featured && (
                      <div className="product-badge featured">Featured</div>
                    )}
                    <div className="product-category-badge">{product.category}</div>
                    {product.inStock ? (
                      <div className="stock-badge in-stock">In Stock</div>
                    ) : (
                      <div className="stock-badge out-of-stock">Out of Stock</div>
                    )}
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    
                    {product.rating && (
                      <div className="product-rating">
                        <Star size={14} fill="currentColor" />
                        <span>{product.rating}</span>
                        <span className="rating-count">(24 reviews)</span>
                      </div>
                    )}
                    
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-footer">
                      <div className="price-section">
                        <span className="product-price">${product.price.toFixed(2)}</span>
                        <span className="price-unit">per unit</span>
                      </div>
                      <button
                        className="btn btn-primary add-to-cart-btn"
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart size={16} />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="store-pagination reveal">
          <div className="container">
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="pagination-ellipsis">...</span>;
                  }
                  return null;
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Trust Section */}
      <section className="trust-section reveal">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <Shield size={32} />
              <h3>Quality Guaranteed</h3>
              <p>All products meet Australian standards</p>
            </div>
            <div className="trust-item">
              <Truck size={32} />
              <h3>Fast Shipping</h3>
              <p>Delivery within 3-5 business days</p>
            </div>
            <div className="trust-item">
              <Award size={32} />
              <h3>Expert Support</h3>
              <p>Professional guidance available 24/7</p>
            </div>
            <div className="trust-item">
              <Package size={32} />
              <h3>Bulk Orders</h3>
              <p>Special pricing for large quantities</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .store {
          min-height: 100vh;
          background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(236, 253, 245, 0.3) 100%);
        }

        /* Hero Section */
        .store-hero {
          background: var(--gradient-primary);
          color: white;
          padding: 6rem 0 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .store-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="none"/><path d="M0 0L100 100M100 0L0 100" stroke="rgba(255,255,255,0.05)" stroke-width="2"/></svg>');
          opacity: 0.5;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hero-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          line-height: 1.2;
          letter-spacing: -0.01em;
          margin: 0 0 0.5rem;
          font-weight: 700;
        }

        .hero-subtitle {
          font-size: 0.95rem;
          line-height: 1.4;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.95;
        }

        /* Filters Section */
        .store-filters {
          background: white;
          border-bottom: 2px solid var(--neutral-200);
          padding: 2rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .filters-header {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .search-box {
          position: relative;
          flex: 1;
          max-width: 600px;
        }

        .search-box svg {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--neutral-400);
          pointer-events: none;
        }

        .search-box input {
          width: 100%;
          padding: 1rem 3rem 1rem 3rem;
          border: 2px solid var(--neutral-300);
          border-radius: 0.75rem;
          font-size: 1rem;
          transition: all var(--transition-normal);
        }

        .search-box input:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }

        .clear-search {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--neutral-500);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-normal);
        }

        .clear-search:hover {
          color: var(--neutral-900);
        }

        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: var(--neutral-100);
          border: 2px solid var(--neutral-300);
          border-radius: 0.75rem;
          cursor: pointer;
          font-weight: 600;
          transition: all var(--transition-normal);
        }

        .filter-toggle:hover {
          background: var(--neutral-200);
        }

        .filter-toggle svg.rotated {
          transform: rotate(180deg);
        }

        .filter-panel {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr auto;
          gap: 2rem;
          padding: 1.5rem;
          background: var(--neutral-50);
          border-radius: 0.75rem;
          margin-bottom: 1.5rem;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .filter-panel.show {
          max-height: 500px;
          opacity: 1;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .filter-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--neutral-700);
        }

        .category-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .category-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: white;
          border: 2px solid var(--neutral-300);
          border-radius: 999px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all var(--transition-normal);
        }

        .category-pill:hover {
          border-color: var(--primary-blue);
          background: var(--light-blue);
        }

        .category-pill.active {
          background: var(--gradient-primary);
          color: white;
          border-color: transparent;
        }

        .pill-count {
          background: rgba(0, 0, 0, 0.15);
          padding: 0.15rem 0.5rem;
          border-radius: 999px;
          font-size: 0.75rem;
        }

        .category-pill.active .pill-count {
          background: rgba(255, 255, 255, 0.3);
        }

        .sort-select {
          padding: 0.75rem 1rem;
          border: 2px solid var(--neutral-300);
          border-radius: 0.5rem;
          background: white;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .sort-select:focus {
          outline: none;
          border-color: var(--primary-blue);
        }

        .price-range {
          width: 100%;
          cursor: pointer;
        }

        .clear-filters {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: white;
          border: 2px solid var(--neutral-300);
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 600;
          color: var(--neutral-700);
          transition: all var(--transition-normal);
          align-self: flex-end;
        }

        .clear-filters:hover {
          background: var(--error);
          color: white;
          border-color: var(--error);
        }

        .results-info {
          padding: 0.75rem 1rem;
          background: var(--light-blue);
          border-radius: 0.5rem;
          text-align: center;
        }

        .results-info p {
          margin: 0;
          color: var(--neutral-700);
          font-size: 0.95rem;
        }

        .results-info strong {
          color: var(--primary-blue);
          font-weight: 600;
        }

        /* Products Section */
        .store-products {
          padding: 3rem 0;
        }

        .loading {
          text-align: center;
          padding: 4rem 2rem;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid var(--neutral-200);
          border-top-color: var(--primary-blue);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading p {
          color: var(--neutral-600);
          font-size: 1.125rem;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .product-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          border: 2px solid var(--neutral-200);
          transition: all var(--transition-normal);
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
          border-color: var(--primary-blue);
        }

        .product-image {
          position: relative;
          background: linear-gradient(135deg, var(--light-blue) 0%, rgba(16, 185, 129, 0.1) 100%);
          padding: 3rem 2rem;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px;
        }

        .product-emoji {
          font-size: 4rem;
          display: block;
        }

        .product-photo {
          width: 100%;
          height: 180px;
          object-fit: contain;
        }

        .product-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
        }

        .product-badge.featured {
          background: var(--gradient-accent);
        }

        .product-category-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: var(--primary-blue);
          color: white;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .stock-badge {
          position: absolute;
          bottom: 0.75rem;
          left: 0.75rem;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
        }

        .stock-badge.in-stock {
          background: var(--success);
        }

        .stock-badge.out-of-stock {
          background: var(--error);
        }

        .product-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .product-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--neutral-900);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-bottom: 0.75rem;
          color: #FFA500;
          font-size: 0.9rem;
        }

        .rating-count {
          color: var(--neutral-500);
          font-size: 0.85rem;
        }

        .product-description {
          color: var(--neutral-600);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--neutral-200);
        }

        .price-section {
          display: flex;
          flex-direction: column;
        }

        .product-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-blue);
          line-height: 1;
        }

        .price-unit {
          font-size: 0.75rem;
          color: var(--neutral-500);
          margin-top: 0.25rem;
        }

        .add-to-cart-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .add-to-cart-btn:disabled {
          background: var(--neutral-400);
          cursor: not-allowed;
          opacity: 0.6;
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--neutral-600);
        }

        .no-results svg {
          color: var(--neutral-400);
          margin-bottom: 1.5rem;
        }

        .no-results h3 {
          font-size: 1.75rem;
          color: var(--neutral-900);
          margin-bottom: 0.75rem;
        }

        .no-results p {
          font-size: 1.125rem;
          margin-bottom: 2rem;
        }

        .product-photo {
          width: 100%;
          height: 150px;
          object-fit: contain;
          display: block;
          margin: 0 auto;
        }

        .product-category {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--primary-blue);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .stock-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--success);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .product-info {
          padding: 1.5rem;
        }

        .product-name {
          color: var(--neutral-900);
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .product-description {
          color: var(--neutral-600);
          font-size: 0.85rem;
          margin-bottom: 1rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .product-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-blue);
        }

        .add-to-cart-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          white-space: nowrap;
        }

        .add-to-cart-btn:disabled {
          background: var(--neutral-400);
          cursor: not-allowed;
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--neutral-600);
        }

        .no-results h3 {
          margin-bottom: 0.5rem;
          color: var(--neutral-900);
        }

        /* Pagination */
        .store-pagination {
          padding: 2rem 0 3rem;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
        }

        .pagination-btn {
          padding: 0.75rem 1.5rem;
          background: white;
          border: 2px solid var(--neutral-300);
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 600;
          transition: all var(--transition-normal);
        }

        .pagination-btn:hover:not(:disabled) {
          background: var(--primary-blue);
          color: white;
          border-color: var(--primary-blue);
        }

        .pagination-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .pagination-numbers {
          display: flex;
          gap: 0.5rem;
        }

        .pagination-number {
          width: 2.75rem;
          height: 2.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 2px solid var(--neutral-300);
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 600;
          transition: all var(--transition-normal);
        }

        .pagination-number:hover {
          background: var(--light-blue);
          border-color: var(--primary-blue);
        }

        .pagination-number.active {
          background: var(--gradient-primary);
          color: white;
          border-color: transparent;
        }

        .pagination-ellipsis {
          display: flex;
          align-items: center;
          padding: 0 0.5rem;
          color: var(--neutral-500);
        }

        /* Trust Section */
        .trust-section {
          background: white;
          padding: 4rem 0;
          border-top: 2px solid var(--neutral-200);
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
        }

        .trust-item {
          text-align: center;
        }

        .trust-item svg {
          color: var(--primary-blue);
          margin-bottom: 1rem;
        }

        .trust-item h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--neutral-900);
          margin-bottom: 0.5rem;
        }

        .trust-item p {
          color: var(--neutral-600);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* Responsive */
        @media (max-width: 968px) {
          .hero-title {
            font-size: 1.5rem;
          }

          .hero-subtitle {
            font-size: 0.9rem;
          }

          .filters-header {
            flex-direction: column;
          }

          .search-box {
            max-width: none;
          }

          .filter-panel {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          .trust-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }

          .pagination-numbers {
            overflow-x: auto;
          }
        }

        @media (max-width: 640px) {
          .store-hero {
            padding: 5rem 0 1.25rem;
          }

          .hero-title {
            font-size: 1.35rem;
          }

          .hero-subtitle {
            font-size: 0.85rem;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .trust-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .product-footer {
            flex-direction: column;
            align-items: stretch;
          }

          .add-to-cart-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Store;