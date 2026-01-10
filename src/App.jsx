import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import BrowsePage from './components/BrowsePage';
import AvatarPage from './components/AvatarPage';
import LoginPage from './components/LoginPage';
import CheckoutPage from './components/CheckoutPage';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 2-Second Timer
  useEffect(() => {
    if (currentView === 'home') {
      const timer = setTimeout(() => {
        setCurrentView('browse');
      }, 2000); // 2000ms = 2 seconds
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const handleBuyNow = () => {
    if (user) {
      // User is logged in, go to checkout
      setCurrentView('checkout');
    } else {
      // User is not logged in, go to login
      setCurrentView('login');
    }
  };

  const handleLoginSuccess = () => {
    // After successful login, go to checkout
    setCurrentView('checkout');
  };

  return (
    <div className="font-sans">
      {currentView === 'home' && <HomePage />}

      {currentView === 'browse' && (
        <div className="animate-fade-in">
          <BrowsePage
            setCurrentView={setCurrentView}
            setSelectedItem={setSelectedItem}
          />
        </div>
      )}

      {currentView === 'detail' && (
        <AvatarPage
          selectedItem={selectedItem}
          onBack={() => setCurrentView('browse')}
          onBuyNow={handleBuyNow}
        />
      )}

      {currentView === 'login' && (
        <LoginPage
          onBack={() => setCurrentView('detail')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentView === 'checkout' && (
        <CheckoutPage
          selectedItem={selectedItem}
          onBack={() => setCurrentView('detail')}
        />
      )}
    </div>
  );
};

export default App;