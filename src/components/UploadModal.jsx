import React, { useState } from 'react';
import { X, Upload, Loader, CheckCircle } from 'lucide-react';
// REMOVED Supabase import
import { db, storage } from "../firebase"; // Import 'storage'
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage functions
import { v4 as uuidv4 } from "uuid";

const UploadModal = ({ onClose }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    material: "", size: "", brand: "", age: "", condition: "", price: "", name: ""
  });

  const accentColor = "#CFB997"; 

  const handleUpload = async () => {
    if (files.length === 0) return alert("Please choose at least one image");
    setLoading(true);

    try {
      const userId = "demo-user"; 
      const dressId = uuidv4();
      const images = {};

      // 1. Upload Images to FIREBASE STORAGE
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Create a reference to where the image will be saved
        const fileExt = file.name.split('.').pop();
        const fileName = `image${i + 1}.${fileExt}`;
        const storagePath = `dress-images/${userId}/${dressId}/${fileName}`;
        const storageRef = ref(storage, storagePath);

        // Upload the file
        await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        images[`image${i + 1}`] = downloadURL;
      }

      // 2. Save Data to Firestore (Same as before)
      await addDoc(collection(db, "dresses"), {
        dressId, 
        ...form, 
        ageInMonths: Number(form.age), 
        price: Number(form.price),
        images, 
        sellerId: userId, 
        isAvailable: true, 
        createdAt: Timestamp.now(),
      });

      alert("Dress uploaded successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FDFCF8] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative border border-gray-100 m-4">
        
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-serif font-bold text-gray-900">Upload New Item</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors"><X size={24} /></button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {/* File Input */}
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#CFB997] transition-colors bg-gray-50 cursor-pointer relative">
            <input type="file" multiple onChange={(e) => setFiles([...e.target.files])} className="absolute inset-0 opacity-0 cursor-pointer" />
            <div className="flex flex-col items-center gap-2">
              <Upload size={32} color={accentColor} />
              <p className="text-sm font-bold text-gray-600">{files.length > 0 ? `${files.length} images selected` : "Click to upload images"}</p>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4">
             <InputField label="Item Name" value={form.name} onChange={(v) => setForm({...form, name: v})} placeholder="e.g. Silk Saree" fullWidth />
             <InputField label="Brand" value={form.brand} onChange={(v) => setForm({...form, brand: v})} placeholder="e.g. Zara" />
             <InputField label="Size" value={form.size} onChange={(v) => setForm({...form, size: v})} placeholder="XS, S, M..." />
             <InputField label="Material" value={form.material} onChange={(v) => setForm({...form, material: v})} placeholder="Cotton, Silk..." />
             <InputField label="Condition" value={form.condition} onChange={(v) => setForm({...form, condition: v})} placeholder="New / Used" />
             <InputField label="Age (Months)" type="number" value={form.age} onChange={(v) => setForm({...form, age: v})} placeholder="0" />
             <InputField label="Price (₹)" type="number" value={form.price} onChange={(v) => setForm({...form, price: v})} placeholder="₹" />
          </div>
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
          <button onClick={handleUpload} disabled={loading} className="flex-1 py-3 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]" style={{ backgroundColor: accentColor }}>
            {loading ? <Loader className="animate-spin" size={20} /> : <CheckCircle size={20} />}
            {loading ? "Uploading..." : "Publish Listing"}
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, type = "text", placeholder, fullWidth }) => (
  <div className={fullWidth ? "col-span-2" : "col-span-1"}>
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#CFB997] focus:ring-1 focus:ring-[#CFB997] transition-all text-sm text-gray-900 placeholder-gray-300 font-medium" />
  </div>
);

export default UploadModal;