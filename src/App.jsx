import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import BrowsePage from './components/BrowsePage';
import AvatarPage from './components/AvatarPage';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);

  // 2-Second Timer
  useEffect(() => {
    if (currentView === 'home') {
      const timer = setTimeout(() => {
        setCurrentView('browse');
      }, 2000); // 2000ms = 2 seconds
      return () => clearTimeout(timer);
    }
  }, [currentView]);

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
        />
      )}
    </div>
  );
};

export default App;