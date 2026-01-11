import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, ShoppingBag } from 'lucide-react';

const AvatarPage = ({ selectedItem, onBack, onBuyNow }) => {
  const [mode, setMode] = useState('size'); // 'size' or 'measurement'
  const [selectedSize, setSelectedSize] = useState(null);
  const [measurements, setMeasurements] = useState({ bust: '', waist: '', hip: '' });
  const [calculatedSize, setCalculatedSize] = useState(null);
  const accentColor = "#B19CD9"; // Lavender

  if (!selectedItem) return null;

  // Handle image path (supports both your new Firestore data and old demo data)
  const displayImage = selectedItem.imageUrl || (selectedItem.images && selectedItem.images.image1) || selectedItem.image;

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];

  // Size calculation logic based on measurements
  const calculateSize = () => {
    const bust = parseFloat(measurements.bust);
    const waist = parseFloat(measurements.waist);
    const hip = parseFloat(measurements.hip);

    if (!bust || !waist || !hip) {
      alert('Please enter all measurements');
      return;
    }

    // Size calculation logic (in inches)
    let size = '';
    if (bust <= 32 && waist <= 24 && hip <= 34) {
      size = 'XS';
    } else if (bust <= 34 && waist <= 26 && hip <= 36) {
      size = 'S';
    } else if (bust <= 36 && waist <= 28 && hip <= 38) {
      size = 'M';
    } else if (bust <= 38 && waist <= 30 && hip <= 40) {
      size = 'L';
    } else if (bust <= 40 && waist <= 32 && hip <= 42) {
      size = 'XL';
    } else if (bust <= 42 && waist <= 34 && hip <= 44) {
      size = 'XXL';
    } else if (bust <= 44 && waist <= 36 && hip <= 46) {
      size = '3XL';
    } else if (bust <= 46 && waist <= 38 && hip <= 48) {
      size = '4XL';
    } else {
      size = '5XL';
    }

    setCalculatedSize(size);
  };

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
          {/* Condition Tag */}
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

            {/* Product Specifics Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
              <DetailBox label="Material" value={selectedItem.material} />
              <DetailBox label="Size" value={selectedItem.size} />
              <DetailBox label="Age" value={`${selectedItem.ageInMonths || 0} Months`} />
              <DetailBox label="Condition" value={selectedItem.condition} />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Find Your Perfect Fit Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">

            {/* Header + Toggle Switch */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-800">
                {mode === 'measurement' ? 'Find Your Perfect Fit' : 'Select Size'}
              </h3>

              {/* Toggle Switch */}
              <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                <span className={`text-[10px] font-bold ${mode === 'measurement' ? 'text-black' : 'text-gray-400'}`}>MEASURE</span>

                <button
                  onClick={() => setMode(mode === 'measurement' ? 'size' : 'measurement')}
                  className="w-10 h-5 rounded-full p-0.5 transition-colors duration-300"
                  style={{ backgroundColor: mode === 'size' ? accentColor : '#E5E7EB' }}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${mode === 'size' ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>

                <span className={`text-[10px] font-bold ${mode === 'size' ? 'text-black' : 'text-gray-400'}`}>SIZE</span>
              </div>
            </div>

            {/* CONDITIONAL CONTENT */}
            {mode === 'measurement' ? (
              <div className="animate-fade-in">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {['bust', 'waist', 'hip'].map((label) => (
                    <div key={label} className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{label} (in)</label>
                      <input
                        type="number"
                        value={measurements[label]}
                        onChange={(e) => setMeasurements({ ...measurements, [label]: e.target.value })}
                        className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:border-black outline-none text-center font-bold placeholder-gray-300"
                        placeholder="00"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={calculateSize}
                  className="w-full py-3 bg-gray-900 border border-gray-900 text-white rounded-lg font-bold hover:bg-black transition-colors uppercase text-sm tracking-wide"
                >
                  Calculate My Size
                </button>

                {/* Best Match Result */}
                {calculatedSize && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                      ✓
                    </div>
                    <div>
                      <p className="text-xs font-bold text-green-700 uppercase">Best Match</p>
                      <p className="text-sm text-gray-900">
                        We recommend size <span className="font-bold text-lg" style={{ color: accentColor }}>{calculatedSize}</span> for you.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-lg border font-bold text-sm transition-all ${selectedSize === size
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

          {/* Action Buttons */}
          <div className="mt-auto space-y-3 pt-4">
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-white border border-gray-300 text-gray-900 font-bold text-lg rounded-full hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button
                onClick={onBuyNow}
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