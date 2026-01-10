import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-900/95 to-gray-900/80 backdrop-blur-md border-b border-amber-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
              <svg 
                className="w-7 h-7 text-gray-900" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
            </div>
            <span className="text-2xl font-serif text-white">ThreadSwap</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('browse')}
              className="text-gray-300 hover:text-amber-400 transition-colors"
            >
              Browse
            </button>
            <button 
              onClick={() => setCurrentPage('swap')}
              className="text-gray-300 hover:text-amber-400 transition-colors"
            >
              Swap
            </button>
            <button 
              onClick={() => setCurrentPage('how-it-works')}
              className="text-gray-300 hover:text-amber-400 transition-colors"
            >
              How it Works
            </button>
            <button className="text-gray-300 hover:text-amber-400 transition-colors">
              About
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-300 hover:text-amber-400 transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentPage('avatar')}
              className="p-2 rounded-full border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-gray-900 transition-all"
            >
              <User className="w-5 h-5" />
            </button>
            <button className="px-5 py-2.5 border border-amber-500/50 text-amber-400 rounded hover:bg-amber-500 hover:text-gray-900 transition-all">
              List Item
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900/98 border-t border-amber-900/20">
          <div className="px-4 py-4 space-y-3">
            <button 
              onClick={() => { setCurrentPage('browse'); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-amber-400 hover:bg-gray-800/50 rounded"
            >
              Browse
            </button>
            <button 
              onClick={() => { setCurrentPage('swap'); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-amber-400 hover:bg-gray-800/50 rounded"
            >
              Swap
            </button>
            <button 
              onClick={() => { setCurrentPage('how-it-works'); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-amber-400 hover:bg-gray-800/50 rounded"
            >
              How it Works
            </button>
            <button className="block w-full text-left px-4 py-2 text-gray-300 hover:text-amber-400 hover:bg-gray-800/50 rounded">
              About
            </button>
            <button className="block w-full px-4 py-2 border border-amber-500/50 text-amber-400 rounded hover:bg-amber-500 hover:text-gray-900 transition-all">
              List Item
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;