import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Bins from './components/Bins';
import Products from './components/Products';
import Store from './components/Store';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Layout from './admin-v2/Layout';
import Dashboard from './admin-v2/Dashboard';
import AdminProductsPage from './admin-v2/Products';
import AdminCategoriesPage from './admin-v2/Categories';
import AdminMessagesPage from './admin-v2/Messages';
import AdminOrdersPage from './admin-v2/Orders';
import AdminLogin from './admin/AdminLogin';
import ProtectedRoute from './admin/ProtectedRoute';
import { AdminProvider } from './admin/AdminContext';

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
                <Services />
                <Bins />
                <Products addToCart={addToCart} />
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

        <Route
          path="/store"
          element={
            <>
              <Navbar 
                cartItemCount={getCartItemCount()} 
                onCartToggle={() => setIsCartOpen(!isCartOpen)} 
              />
              <Store addToCart={addToCart} />
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
        {/* New admin panel */}
        <Route path="/admin/*" element={
          <AdminProvider>
            <Routes>
              <Route path="login" element={<AdminLogin />} />
              <Route path="*" element={
                <Layout>
                  <Routes>
                    <Route path="" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="products" element={<ProtectedRoute><AdminProductsPage /></ProtectedRoute>} />
                    <Route path="categories" element={<ProtectedRoute><AdminCategoriesPage /></ProtectedRoute>} />
                    <Route path="messages" element={<ProtectedRoute><AdminMessagesPage /></ProtectedRoute>} />
                    <Route path="orders" element={<ProtectedRoute><AdminOrdersPage /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/admin" replace />} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </AdminProvider>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
