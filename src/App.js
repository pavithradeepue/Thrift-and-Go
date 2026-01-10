import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import BrowsePage from './components/BrowsePage'; 
import AvatarPage from './components/AvatarPage'; 

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);

  // --- AUTOMATIC TIMER (3 Seconds) ---
  useEffect(() => {
    if (currentView === 'home') {
      const timer = setTimeout(() => {
        setCurrentView('browse');
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  return (
    // Updated background to light cream and text to dark gray
    // Updated selection color to the new beige accent
    <div className="bg-[#FDFCF8] min-h-screen text-gray-900 font-sans selection:bg-[#CFB997] selection:text-white">
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