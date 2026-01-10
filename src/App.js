import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import BrowsePage from './components/BrowsePage'; 
import AvatarPage from './components/AvatarPage'; 

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);

  // AUTOMATIC TIMER: Switches from Home -> Browse after 5 SECONDS
  useEffect(() => {
    if (currentView === 'home') {
      const timer = setTimeout(() => {
        setCurrentView('browse');
      }, 5000); // 5000ms = 5 seconds

      return () => clearTimeout(timer);
    }
  }, [currentView]);

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans selection:bg-amber-500 selection:text-black">
      <main>
        {currentView === 'home' && <HomePage />}
        
        {currentView === 'browse' && (
          <div className="animate-fade-in">
            <BrowsePage 
              setCurrentPage={setCurrentView} 
              setSelectedItem={setSelectedItem} 
            />
          </div>
        )}
        
        {currentView === 'avatar' && (
          <div className="animate-slide-up">
            <AvatarPage 
              selectedItem={selectedItem} 
              onBack={() => setCurrentView('browse')} 
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;