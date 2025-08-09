import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Bins from './components/Bins';
import Products from './components/Products';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
const AdminLayout = React.lazy(() => import('./admin/AdminLayout'));
const AdminLogin = React.lazy(() => import('./admin/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./admin/AdminDashboard'));
const AdminProducts = React.lazy(() => import('./admin/AdminProducts'));
const AdminOrders = React.lazy(() => import('./admin/AdminOrders'));
const ProtectedRoute = React.lazy(() => import('./admin/ProtectedRoute'));

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="App">
  <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar 
                cartItemCount={getCartItemCount()} 
                onCartToggle={() => setIsCartOpen(!isCartOpen)} 
              />
              <main id="main-content" role="main">
                <Hero />
                <Bins />
                <Products addToCart={addToCart} />
                <Services />
                <Testimonials />
                <About />
                <Partners />
                <Contact />
              </main>
              <Footer />
              <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                total={getCartTotal()}
              />
            </>
          }
        />

        {/* Admin routes */}
        <Route path="/admin/login" element={
          <React.Suspense fallback={<div style={{padding:16}}>Loading admin…</div>}> 
            <AdminLogin />
          </React.Suspense>
        } />
        <Route
          path="/admin"
          element={
            <React.Suspense fallback={<div style={{padding:16}}>Loading admin…</div>}> 
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            </React.Suspense>
          }
        >
          <Route index element={<React.Suspense fallback={<div style={{padding:16}}>Loading…</div>}><AdminDashboard /></React.Suspense>} />
          <Route path="products" element={<React.Suspense fallback={<div style={{padding:16}}>Loading…</div>}><AdminProducts /></React.Suspense>} />
          <Route path="orders" element={<React.Suspense fallback={<div style={{padding:16}}>Loading…</div>}><AdminOrders /></React.Suspense>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
