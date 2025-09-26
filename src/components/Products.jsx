import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { mysql, mysqlEnabled } from '../lib/mysql';
import { Link } from 'react-router-dom';

const Products = ({ addToCart }) => {
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
  // rating removed
      category: 'Eco-Friendly',
      inStock: true
    },
    {
      id: 4,
      name: 'Toilet Bowl Cleaner',
      description: 'Powerful disinfectant cleaner for toilets and urinals',
      price: 8.99,
      image: '🧽',
  // rating removed
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
  // rating removed
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
  // rating removed
      category: 'Air Care',
      inStock: true
    }
  ];

  const [products, setProducts] = React.useState(fallbackProducts);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    const load = async () => {
      if (!mysqlEnabled) return; // keep fallback
      setLoading(true);
      const { data, error } = await mysql.getProducts();
      if (!error && data && active) {
        const mapped = data
          .filter(p => p.show_on_main_page === 1 || p.show_on_main_page === true) // Only show products marked for main page
          .map(p => ({
            id: p.id,
            name: p.name,
            description: p.description || '',
            price: Number(p.price),
            image: p.image_url || '🧻',
            category: p.category || 'General',
            inStock: (typeof p.stock === 'number' ? p.stock > 0 : true),
          }));
        setProducts(mapped);
      }
      if (active) setLoading(false);
    };
    load();
    return () => { active = false; };
  }, []);

  // ratings removed

  return (
    <section id="products" className="products section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2>Toilet Products Store</h2>
          <p>
            Complete your sanitary solution with our range of premium toilet products. 
            From toilet paper to cleaning supplies, we have everything you need.
          </p>
        </div>

  {loading && <p style={{ textAlign: 'center', marginBottom: '1rem' }}>Loading products…</p>}
  <div className="products-grid">
          {products.slice(0, 8).map((product) => (
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
                
                {/* ratings removed */}
                
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

        {/* View All Products button placed below grid */}
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <Link to="/store" className="btn btn-secondary">View All Products</Link>
        </div>
        <div className="products-cta">
          <div className="cta-card">
            <h3>Need Bulk Orders?</h3>
            <p>
              Contact us for special pricing on bulk orders and commercial accounts. 
              We offer competitive rates for businesses and facilities.
            </p>
            <div className="cta-actions">
              <button className="btn btn-primary">Request Bulk Quote</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .products {
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

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .product-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
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
          font-size: 4rem;
          display: block;
        }

        .product-photo {
          width: 100%;
          height: 180px;
          object-fit: contain;
          display: block;
          margin: 0 auto;
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.08));
        }

        .product-category {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--primary-blue);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
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
          font-size: 0.8rem;
          font-weight: 500;
        }

        .product-info {
          padding: 1.5rem;
        }

        .product-name {
          color: var(--neutral-900);
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .product-description {
          color: var(--neutral-600);
          font-size: 0.9rem;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

  /* ratings styles removed */

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .product-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-blue);
        }

        .add-to-cart-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .add-to-cart-btn:disabled {
          background: var(--neutral-400);
          cursor: not-allowed;
          transform: none;
        }

        .add-to-cart-btn:disabled:hover {
          background: var(--neutral-400);
          transform: none;
        }

        .products-cta {
          margin-top: 4rem;
        }

        .cta-card {
          background: linear-gradient(135deg, var(--neutral-100) 0%, var(--light-blue) 100%);
          padding: 3rem 2rem;
          border-radius: 2rem;
          text-align: center;
          border: 1px solid var(--neutral-200);
        }

        .cta-card h3 {
          color: var(--neutral-900);
          margin-bottom: 1rem;
        }

        .cta-card p {
          color: var(--neutral-600);
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-actions .btn {
          padding: 1rem 2rem;
        }

        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .product-photo {
            height: 160px;
          }

          .product-footer {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .add-to-cart-btn {
            width: 100%;
            justify-content: center;
          }

          .cta-card {
            padding: 2rem 1.5rem;
          }

          .cta-actions {
            flex-direction: column;
            align-items: center;
          }

          .cta-actions .btn {
            width: 100%;
            max-width: 250px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default Products;
