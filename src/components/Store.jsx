import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter, X } from 'lucide-react';
import { mysql, mysqlEnabled } from '../lib/mysql';

const Store = ({ addToCart }) => {
  const fallbackProducts = [
    {
      id: 1,
      name: 'Premium Toilet Paper (24-Pack)',
      description: 'Ultra-soft 3-ply toilet paper for commercial and home use',
      price: 32.99,
      image: '🧻',
      category: 'Toilet Paper',
      inStock: true
    },
    {
      id: 2,
      name: 'Toilet Paper (12-Pack)',
      description: 'High-quality 2-ply toilet paper, perfect for everyday use',
      price: 18.99,
      image: '🧻',
      category: 'Toilet Paper',
      inStock: true
    },
    {
      id: 3,
      name: 'Eco-Friendly Toilet Paper',
      description: 'Sustainable bamboo toilet paper, environmentally conscious choice',
      price: 24.99,
      image: '🌿',
      category: 'Eco-Friendly',
      inStock: true
    },
    {
      id: 4,
      name: 'Toilet Bowl Cleaner',
      description: 'Powerful disinfectant cleaner for toilets and urinals',
      price: 8.99,
      image: '🧽',
      category: 'Cleaners',
      inStock: true
    },
    {
      id: 5,
      name: 'Toilet Seat Sanitizer',
      description: 'Antibacterial spray for toilet seat disinfection',
      price: 12.99,
      image: '🧴',
      category: 'Sanitizers',
      inStock: true
    },
    {
      id: 6,
      name: 'Flushable Wet Wipes',
      description: 'Biodegradable wet wipes safe for septic systems',
      price: 15.99,
      image: '💧',
      category: 'Wipes',
      inStock: true
    },
    {
      id: 7,
      name: 'Toilet Brush & Holder Set',
      description: 'Durable toilet brush with hygienic storage holder',
      price: 19.99,
      image: '🪣',
      category: 'Accessories',
      inStock: true
    },
    {
      id: 8,
      name: 'Air Freshener Spray',
      description: 'Long-lasting bathroom air freshener with odor eliminator',
      price: 6.99,
      image: '🌸',
      category: 'Air Care',
      inStock: true
    },
    {
      id: 9,
      name: 'Toilet Paper Dispenser',
      description: 'Commercial-grade toilet paper dispenser for facilities',
      price: 45.99,
      image: '📦',
      category: 'Accessories',
      inStock: true
    },
    {
      id: 10,
      name: 'Hand Sanitizer',
      description: 'Alcohol-based hand sanitizer, 70% alcohol content',
      price: 9.99,
      image: '🧴',
      category: 'Sanitizers',
      inStock: true
    },
    {
      id: 11,
      name: 'Toilet Seat Covers (500-Pack)',
      description: 'Disposable toilet seat covers for public restrooms',
      price: 28.99,
      image: '🎯',
      category: 'Accessories',
      inStock: true
    },
    {
      id: 12,
      name: 'Heavy-Duty Toilet Cleaner',
      description: 'Industrial strength toilet bowl cleaner for tough stains',
      price: 14.99,
      image: '🧽',
      category: 'Cleaners',
      inStock: true
    }
  ];

  const [allProducts, setAllProducts] = useState(fallbackProducts);
  const [filteredProducts, setFilteredProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
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

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [allProducts, searchTerm, selectedCategory, sortBy]);

  const categories = ['All', ...new Set(allProducts.map(p => p.category))];
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="store">
      {/* Hero Section */}
      <section className="store-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Toilet Products Store</h1>
            <p>Your complete source for professional toilet and sanitary products</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{allProducts.length}+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-number">{categories.length - 1}</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="store-filters">
        <div className="container">
          <div className="filters-header">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>
              <button 
                className="clear-filters"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSortBy('name');
                }}
              >
                <X size={16} />
                Clear All
              </button>
            </div>
          )}

          <div className="results-info">
            <span>Showing {paginatedProducts.length} of {filteredProducts.length} products</span>
            {searchTerm && <span className="search-result">for "{searchTerm}"</span>}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="store-products">
        <div className="container">
          {loading && <p className="loading">Loading products...</p>}
          
          <div className="products-grid">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="product-card">
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
                  <div className="product-category">{product.category}</div>
                  {product.inStock && <div className="stock-badge">In Stock</div>}
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-footer">
                    <div className="product-price">
                      ${product.price}
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

          {filteredProducts.length === 0 && !loading && (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .store {
          min-height: 100vh;
          background: var(--neutral-50);
        }

        .store-hero {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
          color: white;
          padding: 6rem 0 4rem;
          text-align: center;
        }

        .hero-content h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .hero-content p {
          font-size: 1.25rem;
          margin-bottom: 3rem;
          opacity: 0.9;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .store-filters {
          background: white;
          border-bottom: 1px solid var(--neutral-200);
          padding: 2rem 0;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .search-box {
          position: relative;
          flex: 1;
          max-width: 400px;
        }

        .search-box svg {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--neutral-400);
        }

        .search-box input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 1px solid var(--neutral-300);
          border-radius: 0.5rem;
          font-size: 1rem;
        }

        .search-box input:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--neutral-100);
          border: 1px solid var(--neutral-300);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-toggle:hover {
          background: var(--neutral-200);
        }

        .filters-panel {
          display: flex;
          gap: 1.5rem;
          align-items: end;
          padding: 1.5rem;
          background: var(--neutral-50);
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-group label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--neutral-700);
        }

        .filter-group select {
          padding: 0.5rem;
          border: 1px solid var(--neutral-300);
          border-radius: 0.25rem;
          background: white;
          min-width: 150px;
        }

        .clear-filters {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid var(--neutral-300);
          border-radius: 0.25rem;
          cursor: pointer;
          color: var(--neutral-600);
          transition: all 0.2s;
        }

        .clear-filters:hover {
          background: var(--neutral-100);
        }

        .results-info {
          display: flex;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--neutral-600);
        }

        .search-result {
          color: var(--primary-blue);
          font-weight: 500;
        }

        .store-products {
          padding: 3rem 0;
        }

        .loading {
          text-align: center;
          padding: 3rem;
          color: var(--neutral-600);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .product-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid var(--neutral-200);
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
        }

        .product-image {
          position: relative;
          background: linear-gradient(135deg, var(--light-blue) 0%, rgba(16, 185, 129, 0.1) 100%);
          padding: 3rem 2rem;
          text-align: center;
        }

        .product-emoji {
          font-size: 3rem;
          display: block;
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

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 3rem;
        }

        .pagination-btn {
          padding: 0.5rem 1rem;
          background: white;
          border: 1px solid var(--neutral-300);
          border-radius: 0.25rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pagination-btn:hover:not(:disabled) {
          background: var(--neutral-50);
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-numbers {
          display: flex;
          gap: 0.25rem;
        }

        .pagination-number {
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 1px solid var(--neutral-300);
          border-radius: 0.25rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pagination-number:hover {
          background: var(--neutral-50);
        }

        .pagination-number.active {
          background: var(--primary-blue);
          color: white;
          border-color: var(--primary-blue);
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-stats {
            gap: 2rem;
          }

          .filters-header {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box {
            max-width: none;
          }

          .filters-panel {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-group {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .filter-group select {
            min-width: auto;
            flex: 1;
            max-width: 200px;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          .pagination-numbers {
            overflow-x: auto;
            max-width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default Store;