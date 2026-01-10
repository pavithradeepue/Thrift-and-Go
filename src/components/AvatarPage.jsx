import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, Share2, ShoppingBag, Truck, ShieldCheck } from 'lucide-react'; 

const AvatarPage = ({ selectedItem, onBack }) => {
  const [mode, setMode] = useState('measurement'); 
  const [selectedSize, setSelectedSize] = useState(null); 
  const accentColor = "#CFB997"; // Beige Accent

  if (!selectedItem) return null;

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];

  return (
    // Light Background
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 flex flex-col animate-slide-up relative z-50">
      
      {/* Navbar / Back Button */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-[#FDFCF8]/95 backdrop-blur-sm z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-bold text-lg text-gray-900">Product Details</h1>
        </div>
        <div className="flex gap-4">
           <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-red-500">
             <Heart size={24} />
           </button>
           <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black">
             <Share2 size={24} />
           </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full flex-grow">
        
        {/* Left Side: Image (Light Gray Background) */}
        <div className="w-full md:w-1/2 p-8 bg-gray-50 flex items-center justify-center relative">
          <img 
            src={selectedItem.image} 
            alt={selectedItem.name} 
            className="max-h-[500px] object-contain drop-shadow-xl mix-blend-multiply" 
          />
          {/* Sale Tag */}
          <span className="absolute top-6 left-6 bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
            {selectedItem.discount || "Sale"}
          </span>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col gap-6 bg-[#FDFCF8] overflow-y-auto">
          
          {/* Header Block */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-2 text-gray-900">{selectedItem.name}</h2>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-4" style={{ color: accentColor }}>
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} className="text-gray-300" />
              <span className="text-gray-400 text-sm ml-2">(124 reviews)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-red-500 text-2xl font-light">{selectedItem.discount}</span>
              <span className="text-4xl font-bold text-gray-900">{selectedItem.price}</span>
              <span className="text-gray-400 line-through text-lg">{selectedItem.originalPrice || "₹2999"}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
          </div>

          <hr className="border-gray-100" />

          {/* DYNAMIC SIZE SECTION */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            
            {/* Header + Toggle Switch */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-800">
                {mode === 'measurement' ? 'Find Your Perfect Fit' : 'Select Size'}
              </h3>
              
              <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                <span className={`text-[10px] font-bold ${mode === 'measurement' ? 'text-black' : 'text-gray-400'}`}>MEASURE</span>
                
                {/* The Toggle Switch */}
                <button 
                  onClick={() => setMode(mode === 'measurement' ? 'standard' : 'measurement')}
                  className="w-10 h-5 rounded-full p-0.5 transition-colors duration-300"
                  style={{ backgroundColor: mode === 'standard' ? accentColor : '#E5E7EB' }}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${mode === 'standard' ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
                
                <span className={`text-[10px] font-bold ${mode === 'standard' ? 'text-black' : 'text-gray-400'}`}>SIZE</span>
              </div>
            </div>

            {/* CONDITIONAL CONTENT */}
            {mode === 'measurement' ? (
              <div className="animate-fade-in">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {['Bust', 'Waist', 'Hip'].map((label) => (
                    <div key={label} className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{label} (in)</label>
                      <input type="number" className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:border-black outline-none text-center font-bold placeholder-gray-300" placeholder="00" />
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 bg-gray-900 border border-gray-900 text-white rounded-lg font-bold hover:bg-black transition-colors uppercase text-sm tracking-wide">
                  Calculate My Size
                </button>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-lg border font-bold text-sm transition-all ${
                        selectedSize === size 
                          ? 'text-white border-transparent shadow-md' 
                          : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
                      }`}
                      style={{ backgroundColor: selectedSize === size ? accentColor : '' }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center">Standard International Sizing</p>
              </div>
            )}
          </div>

          {/* Service Badges */}
          <div className="grid grid-cols-2 gap-4">
             <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Truck className="text-gray-700" size={20} />
                <div>
                  <p className="text-xs font-bold text-gray-900">Free Delivery</p>
                  <p className="text-[10px] text-gray-500">For orders above ₹499</p>
                </div>
             </div>
             <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <ShieldCheck className="text-green-600" size={20} />
                <div>
                  <p className="text-xs font-bold text-gray-900">Secure Payment</p>
                  <p className="text-[10px] text-gray-500">100% Protection</p>
                </div>
             </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto space-y-3 pt-4">
            <p className="text-green-600 font-bold text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> In stock, ready to ship
            </p>
            
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-white border border-gray-300 text-gray-900 font-bold text-lg rounded-full hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button 
                className="flex-1 py-4 text-white font-extrabold text-lg rounded-full shadow-lg hover:scale-[1.02] transition-all"
                style={{ backgroundColor: accentColor }}
              >
                Buy Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AvatarPage;