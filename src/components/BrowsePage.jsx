import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, Package, Heart, Settings, List, BarChart2, PlusCircle, X, HelpCircle, RefreshCw, Loader } from 'lucide-react';
import { db } from '../firebase'; // Ensure this path is correct
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'; //
import UploadModal from './UploadModal';

const BrowsePage = ({ setCurrentPage, setSelectedItem }) => {
  // --- STATE ---
  const [items, setItems] = useState([]); // State to hold Firestore data
  const [loading, setLoading] = useState(true); // Loading state for UX
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef(null);
  
  const [userRole, setUserRole] = useState('Seller');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // 3D Config
  const RADIUS_Y = 350; 
  const CURVE_INTENSITY = 200; 
  const accentColor = "#CFB997";

  // --- FETCH DATA FROM FIREBASE ---
  useEffect(() => {
    // Reference the 'dresses' collection and order by newest first
    const q = query(collection(db, 'dresses'), orderBy('createdAt', 'desc'));

    // onSnapshot provides real-time updates when new items are uploaded
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(fetchedItems); // Update state with live data
      setLoading(false);
    }, (error) => {
      console.error("Error fetching dresses: ", error);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // --- SCROLL LOGIC ---
  useEffect(() => {
    const handleWheel = (e) => {
      if (containerRef.current && containerRef.current.contains(e.target)) {
        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        setRotation((prev) => prev + direction * 0.05);
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // --- SNAKE CURVE MATH ---
  const getItemStyle = (index, totalItems) => {
    const angleStep = (2 * Math.PI) / totalItems;
    let itemAngle = (index * angleStep) + rotation;
    const normalizedAngle = itemAngle % (2 * Math.PI);
    
    const y = Math.sin(normalizedAngle) * RADIUS_Y;
    const z = Math.cos(normalizedAngle); 
    const x = Math.cos(normalizedAngle) * CURVE_INTENSITY - (CURVE_INTENSITY / 2);

    const scale = (z + 2) / 3; 
    const opacity = (z + 1.5) / 2.5;
    const zIndex = Math.floor(z * 100);

    return {
      transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      zIndex: zIndex,
      opacity: Math.max(0, opacity), 
      display: z > -0.8 ? 'block' : 'none'
    };
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] overflow-hidden flex flex-col items-center justify-center relative">
      
      {isUploadModalOpen && <UploadModal onClose={() => setIsUploadModalOpen(false)} />}

      {/* --- TOP NAVIGATION (Condensed for brevity) --- */}
      <div className="absolute top-0 right-0 p-8 z-50 flex items-center gap-6">
           <button className="text-gray-600 hover:text-black transition-colors relative">
             <ShoppingCart size={26} strokeWidth={1.5} />
             <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full text-[10px] flex items-center justify-center font-bold text-white border-2 border-[#FDFCF8]">0</span>
           </button>

           <div className="relative">
             <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="text-gray-600">
               <User size={28} />
             </button>

             {isProfileOpen && (
               <div className="absolute right-0 top-14 w-80 bg-white border rounded-xl shadow-2xl z-50">
                 <div className="p-2">
                   {userRole === 'Seller' && (
                     <button 
                       onClick={() => { setIsProfileOpen(false); setIsUploadModalOpen(true); }}
                       className="w-full py-3 border rounded-lg font-bold"
                       style={{ borderColor: accentColor, color: accentColor }}
                     >
                       Upload New Item
                     </button>
                   )}
                 </div>
                 <div className="bg-gray-50 p-4">
                   <button onClick={() => setUserRole(userRole === 'Buyer' ? 'Seller' : 'Buyer')} className="text-xs font-bold text-gray-500">
                     SWITCH TO {userRole === 'Buyer' ? 'SELLER' : 'BUYER'}
                   </button>
                 </div>
               </div>
             )}
           </div>
      </div>

      {/* --- HEADER --- */}
      <div className="absolute top-16 z-0 text-center w-full">
        <h2 className="text-6xl md:text-8xl font-serif tracking-tighter">
          <span className="text-gray-900">New</span> <span className="italic" style={{ color: accentColor }}>Arrivals</span>
        </h2>
      </div>

      {/* --- 3D WHEEL --- */}
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin text-gray-400" size={40} />
          <p className="text-gray-400 font-serif italic">Loading your closet...</p>
        </div>
      ) : (
        <div 
          ref={containerRef}
          className="relative w-full h-[800px] flex items-center justify-center perspective-1000 z-10 mt-32" 
          style={{ perspective: '1000px' }} 
        >
          {items.map((item, index) => {
            const style = getItemStyle(index, items.length);
            
            // Map Firestore image fields
            // UploadModal saves images as an object {image1: url}, 
            // but your screenshot (image_b52f12.png) shows a field 'imageUrl'
            const displayImage = item.imageUrl || (item.images && item.images.image1);

            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setCurrentPage('avatar');
                }}
                className="absolute cursor-pointer transition-all duration-300 ease-out group"
                style={{
                  ...style,
                  top: '50%',
                  marginTop: '-160px', 
                  marginLeft: '-112px', 
                }}
              >
                <div className="w-56 h-80 relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group-hover:shadow-2xl transition-all">
                  <div className="w-full h-full p-6 flex items-center justify-center">
                    <img src={displayImage} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white to-transparent pt-12 flex justify-between items-end">
                     <div>
                       <p className="text-gray-900 font-medium text-xs truncate w-32">{item.name}</p>
                       <p className="text-xs font-bold" style={{ color: accentColor }}>₹{item.price}</p>
                     </div>
                     <div className="bg-black p-1.5 rounded-full text-white">
                        <ShoppingCart size={12} />
                     </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BrowsePage;