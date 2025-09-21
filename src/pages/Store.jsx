import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { mysql, mysqlEnabled } from '../lib/mysql';
import { Link } from 'react-router-dom';

export default function Store() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      if (mysqlEnabled) {
        const { data, error } = await mysql.getProducts();
        if (!error && data && active) {
          setProducts(data.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description || '',
            price: Number(p.price),
            image: p.image_url || '🧻',
            category: p.category || 'General',
            inStock: typeof p.stock === 'number' ? p.stock > 0 : true,
          })));
        }
      }
      if (active) setLoading(false);
    }
    load();
    return () => { active = false; };
  }, []);

  return (
    <section className="store section-padding bg-white">
      <div className="container">
        <div className="section-header text-center">
          <h2>Store - All Products</h2>
          <p>Browse our full range of toilet products and supplies.</p>
        </div>
        {loading && <p className="text-center">Loading products…</p>}
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {(() => {
                  const val = product.image;
                  const isUrl = typeof val === 'string' && /^(https?:\/\/|data:image)/i.test(val);
                  return isUrl ? (
                    <img className="product-photo" src={val} alt={product.name} />
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
                  <div className="product-price">${product.price}</div>
                  <Link to="/" className="btn btn-secondary">Home</Link>
                  {product.inStock && (
                    <button className="btn btn-primary">
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}