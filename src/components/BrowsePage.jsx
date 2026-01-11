import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, Package, Heart, Settings, List, BarChart2, PlusCircle, X, HelpCircle, RefreshCw, Loader } from 'lucide-react';
import { db } from '../firebase'; // Ensure this path is correct
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'; //
import UploadModal from './UploadModal';

const BrowsePage = ({ setCurrentView, setSelectedItem }) => {
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
  const accentColor = "#B19CD9"; // Lavender

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
            <div className="absolute right-0 top-14 w-80 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden animate-fade-in z-50">

              {/* Header */}
              <div className="p-5 flex justify-between items-center border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-gray-900 font-bold text-lg">Profile Details</h3>
                <button onClick={() => setIsProfileOpen(false)} className="text-gray-400 hover:text-black">
                  <X size={18} />
                </button>
              </div>

              {/* Menu Content */}
              <div className="p-2">
                {/* SELLER MODE */}
                {userRole === 'Seller' && (
                  <div className="space-y-1 animate-fade-in">
                    <MenuLink icon={List} title="Active Listings" sub="Manage sales" color="text-amber-600" />
                    <MenuLink icon={BarChart2} title="Selling Status" sub="Earnings & Analytics" color="text-green-600" />

                    {/* Upload Button */}
                    <div className="mt-4 px-2 pb-2">
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          setIsUploadModalOpen(true);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3 border rounded-lg font-bold transition-all uppercase text-sm tracking-wide hover:shadow-md"
                        style={{ borderColor: accentColor, color: accentColor, backgroundColor: '#FAF9F6' }}
                      >
                        <PlusCircle size={18} />
                        Upload New Item
                      </button>
                    </div>
                  </div>
                )}

                {/* BUYER MODE */}
                {userRole === 'Buyer' && (
                  <div className="space-y-1 animate-fade-in">
                    <MenuLink icon={Package} title="My Orders" sub="Track shipments" color="text-blue-500" />
                    <MenuLink icon={Heart} title="Wishlist" sub="Saved items" color="text-red-500" />
                    <MenuLink icon={Settings} title="Settings" sub="Account preferences" />
                    <MenuLink icon={HelpCircle} title="Help Center" sub="FAQs & Support" />
                  </div>
                )}
              </div>

              {/* Footer: TOGGLE SWITCH */}
              <div className="bg-gray-50 p-4 border-t border-gray-100">
                <button
                  onClick={() => setUserRole(userRole === 'Buyer' ? 'Seller' : 'Buyer')}
                  className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black hover:bg-white hover:shadow-sm transition-all"
                >
                  <RefreshCw size={12} />
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
                  setCurrentView('detail');
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

// --- HELPER COMPONENT ---
const MenuLink = ({ icon: Icon, title, sub, color = "text-gray-400" }) => (
  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
    <Icon className={`${color} mt-0.5`} size={20} />
    <div>
      <h4 className="text-gray-700 font-bold text-sm group-hover:text-black transition-colors">{title}</h4>
      <p className="text-xs text-gray-400 group-hover:text-gray-500">{sub}</p>
    </div>
  </div>
);

export default BrowsePage;