import React, { useState } from 'react';
import { X, Upload, Loader, CheckCircle } from 'lucide-react';
import { supabase } from '../services/supabaseClient'; // Your Supabase client
import { db } from '../firebase'; // Your Firebase config
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const UploadModal = ({ onClose }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    material: '',
    size: '',
    brand: '',
    age: '',
    condition: '',
    name: '',
    price: '',
  });

  const accentColor = '#CFB997';

  const handleFileChange = (e) => {
    setFiles([...e.target.files] || []);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please choose at least one image');
      return;
    }

    if (!form.name || !form.price || !form.size || !form.material || !form.condition) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const userId = 'demo-user'; // Replace with auth().currentUser.uid later
      const dressId = uuidv4();
      const images = {};

      // 1. Upload Images to Supabase Storage
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageName = `image${i + 1}.jpg`;
        const filePath = `${userId}/${dressId}/${imageName}`;

        console.log('Uploading to Supabase:', filePath);

        // Upload to Supabase
        const { error } = await supabase.storage
          .from('dress-images')
          .upload(filePath, file, { upsert: true });

        if (error) throw error;

        // Get public URL
        const { data } = supabase.storage
          .from('dress-images')
          .getPublicUrl(filePath);

        images[`image${i + 1}`] = data.publicUrl;
        console.log('Image URL:', data.publicUrl);
      }

      // 2. Save Data to Firebase Firestore
      const docRef = await addDoc(collection(db, 'dresses'), {
        dressId,
        name: form.name,
        price: form.price,
        material: form.material,
        size: form.size,
        brand: form.brand,
        condition: form.condition,
        ageInMonths: Number(form.age) || 0,
        images, // Multiple image URLs
        sellerId: userId,
        isAvailable: true,
        createdAt: Timestamp.now(),
      });

      console.log('Document saved to Firestore with ID:', docRef.id);

      setSuccess(true);
      setLoading(false);

      // Reset after 2 seconds
      setTimeout(() => {
        setFiles([]);
        setForm({
          material: '',
          size: '',
          brand: '',
          age: '',
          condition: '',
          name: '',
          price: '',
        });
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Upload Error:', err);
      alert('Upload failed: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FDFCF8] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative border border-gray-100 m-4">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">Upload New Item</h2>
            <p className="text-xs text-gray-500 mt-1">Share sustainable fashion with our community</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          
          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Upload Images *</label>
            <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer bg-gray-50">
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleFileChange} 
                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
              />
              <div className="flex flex-col items-center gap-3">
                <Upload size={40} color={accentColor} strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-bold text-gray-600">
                    {files.length > 0 ? `✓ ${files.length} image${files.length > 1 ? 's' : ''} selected` : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP up to 10MB each</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Previews */}
          {files.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Array.from(files).map((file, idx) => (
                <div key={idx} className="relative">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Item Name */}
            <InputField
              label="Item Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="e.g., Vintage Denim Jacket"
              fullWidth
            />

            {/* Price */}
            <InputField
              label="Price (₹)"
              type="number"
              value={form.price}
              onChange={(v) => setForm({ ...form, price: v })}
              placeholder="1299"
            />

            {/* Material */}
            <InputField
              label="Material"
              value={form.material}
              onChange={(v) => setForm({ ...form, material: v })}
              placeholder="Cotton, Silk, Polyester..."
            />

            {/* Size */}
            <InputField
              label="Size"
              value={form.size}
              onChange={(v) => setForm({ ...form, size: v })}
              placeholder="XS, S, M, L, XL..."
            />

            {/* Brand */}
            <InputField
              label="Brand"
              value={form.brand}
              onChange={(v) => setForm({ ...form, brand: v })}
              placeholder="Zara, H&M, Vintage..."
            />

            {/* Age */}
            <InputField
              label="Age (Months)"
              type="number"
              value={form.age}
              onChange={(v) => setForm({ ...form, age: v })}
              placeholder="0"
            />

            {/* Condition */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Condition *</label>
              <select
                value={form.condition}
                onChange={(e) => setForm({ ...form, condition: e.target.value })}
                className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 transition-all text-gray-900 font-medium"
              >
                <option value="">Select condition</option>
                <option value="like-new">Like New</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="needs-repair">Needs Repair</option>
              </select>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" strokeWidth={1.5} />
              <span className="text-green-700 font-medium text-sm">Item uploaded successfully! Closing...</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3 sticky bottom-0">
          <button 
            onClick={onClose} 
            className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleUpload} 
            disabled={loading || success}
            className="flex-1 py-3 text-black font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: loading || success ? '#E5E7EB' : accentColor }}
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Uploading...
              </>
            ) : success ? (
              <>
                <CheckCircle size={20} />
                Upload Complete!
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Publish Listing
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, value, onChange, type = 'text', placeholder, fullWidth }) => (
  <div className={fullWidth ? 'col-span-2 md:col-span-2' : 'col-span-1'}>
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label} *</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 transition-all text-gray-900 placeholder-gray-400 font-medium text-sm"
    />
  </div>
);

export default UploadModal;