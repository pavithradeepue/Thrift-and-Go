import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, Share2, ShoppingBag, Truck, ShieldCheck, Info } from 'lucide-react'; 

const AvatarPage = ({ selectedItem, onBack }) => {
  const [mode, setMode] = useState('measurement'); 
  const [selectedSize, setSelectedSize] = useState(null); 
  const accentColor = "#CFB997"; 

  if (!selectedItem) return null;

  // Handle image path (supports both your new Firestore data and old demo data)
  const displayImage = selectedItem.imageUrl || (selectedItem.images && selectedItem.images.image1) || selectedItem.image;

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 flex flex-col animate-slide-up relative z-50">
      
      {/* Navbar */}
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
        
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 p-8 bg-gray-50 flex items-center justify-center relative">
          <img 
            src={displayImage} 
            alt={selectedItem.name} 
            className="max-h-[500px] object-contain drop-shadow-xl" 
          />
          {/* Condition Tag (New) */}
          <span className="absolute top-6 left-6 bg-gray-900 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
            {selectedItem.condition || "Pre-Loved"}
          </span>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col gap-6 bg-[#FDFCF8] overflow-y-auto">
          
          {/* Header Block */}
          <div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">{selectedItem.brand || "Unknown Brand"}</p>
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-2 text-gray-900">{selectedItem.name}</h2>
              </div>
              <div className="text-right">
                 <span className="text-4xl font-bold text-gray-900">₹{selectedItem.price}</span>
              </div>
            </div>

            {/* Product Specifics Grid (New) */}
            <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
              <DetailBox label="Material" value={selectedItem.material} />
              <DetailBox label="Size" value={selectedItem.size} />
              <DetailBox label="Age" value={`${selectedItem.ageInMonths || 0} Months`} />
              <DetailBox label="Condition" value={selectedItem.condition} />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Sizing Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-800">Select Size</h3>
              <p className="text-xs text-gray-400">Listed Size: <span className="font-bold text-black">{selectedItem.size}</span></p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
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
          </div>

          {/* Action Buttons */}
          <div className="mt-auto space-y-3 pt-4">
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

// Helper Component for Details
const DetailBox = ({ label, value }) => (
  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{label}</p>
    <p className="text-sm font-semibold text-gray-900 capitalize">{value || "N/A"}</p>
  </div>
);

export default AvatarPage;