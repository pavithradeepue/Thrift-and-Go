import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, Package, Heart, Settings, List, BarChart2, PlusCircle, X, HelpCircle, RefreshCw } from 'lucide-react';
import { clothingItems } from '../data/clothingItems';
import UploadModal from './UploadModal'; // <--- IMPORT MODAL

const BrowsePage = ({ setCurrentPage, setSelectedItem }) => {
  // --- STATE ---
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef(null);
  
  // User & Modal State
  const [userRole, setUserRole] = useState('Seller'); // Default to Seller to see button
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // <--- MODAL STATE

  // 3D Config
  const RADIUS_Y = 350; 
  const CURVE_INTENSITY = 200; 
  const accentColor = "#CFB997"; // Beige Accent

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
      
      {/* --- MODAL INJECTION --- */}
      {isUploadModalOpen && <UploadModal onClose={() => setIsUploadModalOpen(false)} />}

      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-[#FDFCF8] to-gray-100 -z-20"></div>

      {/* --- TOP NAVIGATION --- */}
      <div className="absolute top-0 right-0 p-8 z-50 flex items-center gap-6">
           
           {/* Cart Icon */}
           <button className="text-gray-600 hover:text-black transition-colors relative">
             <ShoppingCart size={26} strokeWidth={1.5} />
             <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full text-[10px] flex items-center justify-center font-bold text-white border-2 border-[#FDFCF8]">2</span>
           </button>

           {/* Profile Button */}
           <div className="relative">
             <button 
               onClick={() => setIsProfileOpen(!isProfileOpen)}
               className={`transition-colors ${isProfileOpen ? 'text-black' : 'text-gray-600 hover:text-black'}`}
             >
               <User size={28} strokeWidth={1.5} />
             </button>

             {/* --- PROFILE DROPDOWN MENU --- */}
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
                   {/* BUYER MODE */}
                   {userRole === 'Buyer' && (
                     <div className="space-y-1 animate-fade-in">
                       <MenuLink icon={Package} title="My Orders" sub="Track shipments" color="text-blue-500" />
                       <MenuLink icon={Heart} title="Wishlist" sub="Saved items" color="text-red-500" />
                       <MenuLink icon={Settings} title="Settings" sub="Account preferences" />
                       <MenuLink icon={HelpCircle} title="Help Center" sub="FAQs & Support" />
                     </div>
                   )}

                   {/* SELLER MODE */}
                   {userRole === 'Seller' && (
                     <div className="space-y-1 animate-fade-in">
                       <MenuLink icon={List} title="Active Listings" sub="Manage sales" color="text-amber-600" />
                       <MenuLink icon={BarChart2} title="Selling Status" sub="Earnings & Analytics" color="text-green-600" />
                       
                       <div className="mt-4 px-2 pb-2">
                         <button 
                           onClick={() => {
                             setIsProfileOpen(false); // Close menu
                             setIsUploadModalOpen(true); // Open Modal
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

      {/* --- HEADER TEXT --- */}
      <div className="absolute top-16 z-0 text-center pointer-events-none w-full">
        <h2 className="text-6xl md:text-8xl font-serif tracking-tighter select-none">
          <span className="text-gray-900">New</span> <span className="italic" style={{ color: accentColor }}>Arrivals</span>
        </h2>
      </div>

      {/* --- 3D WHEEL CONTAINER --- */}
      <div 
        ref={containerRef}
        className="relative w-full h-[800px] flex items-center justify-center perspective-1000 z-10 mt-32" 
        style={{ perspective: '1000px' }} 
      >
        {clothingItems.map((item, index) => {
          const style = getItemStyle(index, clothingItems.length);
          
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
              {/* Card - Light Mode */}
              <div className="w-56 h-80 relative bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden group-hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)] transition-all duration-300">
                <div className="w-full h-full p-6 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain drop-shadow-lg" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/95 to-transparent pt-12 flex justify-between items-end">
                   <div>
                     <p className="text-gray-900 font-medium text-xs truncate w-32">{item.name}</p>
                     <p className="text-xs font-bold" style={{ color: accentColor }}>{item.price}</p>
                   </div>
                   <div className="bg-black p-1.5 rounded-full text-white">
                      <ShoppingCart size={12} />
                   </div>
                </div>

                 <span className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${item.type === 'Swap' ? 'bg-[#2A9D8F] text-white' : 'bg-gray-900 text-white'}`}>
                  {item.type}
                </span>
              </div>
            </div>
          );
        })}
      </div>
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