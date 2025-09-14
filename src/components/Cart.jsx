import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, total }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    setCheckoutForm({
      ...checkoutForm,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    // Simulate checkout process
    alert('Order placed successfully! Thank you for your purchase.');
    setIsCheckingOut(false);
    setCheckoutForm({
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zipCode: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-sidebar">
        <div className="cart-header">
          <h3>
            <ShoppingBag size={20} />
            Shopping Cart ({items.length})
          </h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-content">
          {!isCheckingOut ? (
            <>
              {items.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={48} />
                  <p>Your cart is empty</p>
                  <button className="btn btn-primary" onClick={onClose}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {items.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="item-image">
                          {item.image && (item.image.startsWith('http') || item.image.startsWith('data:')) ? (
                            <img src={item.image} alt={item.name} />
                          ) : (
                            <span>{item.image || '📦'}</span>
                          )}
                        </div>
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p>${item.price}</p>
                        </div>
                        <div className="item-controls">
                          <div className="quantity-controls">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="quantity-btn"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="quantity-btn"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="remove-btn"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cart-footer">
                    <div className="cart-total">
                      <div className="total-row">
                        <span>Subtotal:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="total-row">
                        <span>Shipping:</span>
                        <span>Free</span>
                      </div>
                      <div className="total-row total-final">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary checkout-btn"
                      onClick={() => setIsCheckingOut(true)}
                    >
                      <CreditCard size={16} />
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="checkout-form">
              <h4>Checkout</h4>
              <form onSubmit={handleCheckout}>
                <div className="form-section">
                  <h5>Contact Information</h5>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={checkoutForm.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={checkoutForm.firstName}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={checkoutForm.lastName}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h5>Shipping Address</h5>
                  <div className="form-group">
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={checkoutForm.address}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={checkoutForm.city}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="ZIP Code"
                        value={checkoutForm.zipCode}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h5>Payment Information</h5>
                  <div className="form-group">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card number"
                      value={checkoutForm.cardNumber}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={checkoutForm.expiryDate}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={checkoutForm.cvv}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="checkout-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsCheckingOut(false)}
                  >
                    Back to Cart
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Place Order - ${total.toFixed(2)}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 2000;
          display: flex;
          justify-content: flex-end;
        }

        .cart-sidebar {
          width: 100%;
          max-width: 500px;
          background: white;
          height: 100vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid var(--neutral-200);
          position: sticky;
          top: 0;
          background: white;
          z-index: 10;
        }

        .cart-header h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
          color: var(--neutral-800);
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--neutral-600);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.25rem;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: var(--neutral-100);
          color: var(--neutral-800);
        }

        .cart-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .empty-cart {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
          color: var(--neutral-600);
        }

        .empty-cart svg {
          color: var(--neutral-400);
          margin-bottom: 1rem;
        }

        .cart-items {
          flex: 1;
          padding: 1rem;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid var(--neutral-200);
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }

        .item-image {
          width: 60px;
          height: 60px;
          background: var(--light-blue);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          overflow: hidden;
          flex-shrink: 0;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0.5rem;
        }

        .item-image span {
          font-size: 1.5rem;
        }

        .item-details {
          flex: 1;
        }

        .item-details h4 {
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
          color: var(--neutral-800);
        }

        .item-details p {
          margin: 0;
          color: var(--primary-blue);
          font-weight: 600;
        }

        .item-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .quantity-btn {
          width: 28px;
          height: 28px;
          background: var(--neutral-100);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .quantity-btn:hover {
          background: var(--primary-blue);
          color: white;
        }

        .quantity {
          min-width: 20px;
          text-align: center;
          font-weight: 600;
        }

        .remove-btn {
          background: var(--error);
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .remove-btn:hover {
          background: #dc2626;
        }

        .cart-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--neutral-200);
          background: var(--neutral-50);
        }

        .cart-total {
          margin-bottom: 1.5rem;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .total-final {
          font-weight: 700;
          font-size: 1.1rem;
          padding-top: 0.5rem;
          border-top: 1px solid var(--neutral-200);
          color: var(--neutral-800);
        }

        .checkout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .checkout-form {
          padding: 1.5rem;
        }

        .checkout-form h4 {
          margin-bottom: 1.5rem;
          color: var(--neutral-800);
        }

        .form-section {
          margin-bottom: 2rem;
        }

        .form-section h5 {
          margin-bottom: 1rem;
          color: var(--neutral-700);
          font-size: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--neutral-300);
          border-radius: 0.5rem;
          font-size: 0.9rem;
          transition: border-color 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-blue);
        }

        .checkout-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .checkout-actions button {
          flex: 1;
        }

        @media (max-width: 480px) {
          .cart-sidebar {
            max-width: 100%;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .checkout-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;
