import React from 'react';
import { Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900/95 border-t border-amber-900/20 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Three Column Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <span className="text-xl font-serif text-white">ThreadSwap</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Revolutionizing sustainable fashion through virtual try-on technology and community-powered clothing swaps.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <button className="p-2 bg-gray-800 rounded-full hover:bg-amber-500 transition-all">
                <Instagram className="w-5 h-5 text-gray-300" />
              </button>
              <button className="p-2 bg-gray-800 rounded-full hover:bg-amber-500 transition-all">
                <Twitter className="w-5 h-5 text-gray-300" />
              </button>
              <button className="p-2 bg-gray-800 rounded-full hover:bg-amber-500 transition-all">
                <Mail className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Browse Items</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Start Swapping</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Create Avatar</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright and Legal Links */}
        <div className="border-t border-amber-900/20 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 sm:mb-0">
            © 2026 ThreadSwap. Sustainable fashion for all.
          </p>
          <div className="flex space-x-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;