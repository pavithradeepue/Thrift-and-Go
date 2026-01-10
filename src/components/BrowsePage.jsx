import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, Package, Heart, Settings, List, BarChart2, PlusCircle, X, HelpCircle } from 'lucide-react';
import { clothingItems } from '../data/clothingItems';

const BrowsePage = ({ setCurrentPage, setSelectedItem }) => {
  // --- STATE ---
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef(null);
  
  // User Role (Default: Seller)
  const [userRole, setUserRole] = useState('Seller'); 
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // 3D Snake Curve Config
  const RADIUS_Y = 400; 
  const CURVE_INTENSITY = 200; 

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
    <div className="min-h-screen bg-gray-900 overflow-hidden flex flex-col items-center justify-center relative">
      
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 -z-20"></div>

      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="absolute top-0 left-0 right-0 p-6 z-50 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white tracking-tighter cursor-pointer">
          KLICK<span className="text-amber-400">PIN</span>
        </h1>

        {/* Right Icons */}
        <div className="flex items-center gap-6 relative">
           
           {/* Cart Icon */}
           <button className="text-gray-300 hover:text-white transition-colors relative">
             <ShoppingCart size={26} strokeWidth={1.5} />
             <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full text-[10px] flex items-center justify-center font-bold text-white border-2 border-gray-900">2</span>
           </button>

           {/* Profile Button */}
           <div className="relative">
             <button 
               onClick={() => setIsProfileOpen(!isProfileOpen)}
               className={`transition-colors ${isProfileOpen ? 'text-white' : 'text-gray-300 hover:text-white'}`}
             >
               <User size={28} strokeWidth={1.5} />
             </button>

             {/* --- PROFILE DROPDOWN MENU --- */}
             {isProfileOpen && (
               <div className="absolute right-0 top-14 w-80 bg-[#1a1c23] border border-gray-700 rounded-xl shadow-2xl overflow-hidden animate-fade-in z-50">
                 
                 {/* Header: Title + Close Button (X) */}
                 <div className="p-5 flex justify-between items-start border-b border-gray-700 bg-gray-900/50">
                   <div>
                     <h3 className="text-white font-bold text-lg">Profile Details</h3>
                     
                     {/* TOGGLE SWITCH INTEGRATED HERE */}
                     <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Mode:</span>
                        <div 
                          onClick={() => setUserRole(userRole === 'Buyer' ? 'Seller' : 'Buyer')}
                          className="flex items-center gap-2 bg-gray-800 rounded-full p-1 border border-gray-600 cursor-pointer"
                        >
                          <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${userRole === 'Buyer' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}>
                            BUYER
                          </div>
                          <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${userRole === 'Seller' ? 'bg-amber-500 text-black' : 'text-gray-400'}`}>
                            SELLER
                          </div>
                        </div>
                     </div>
                   </div>

                   {/* CLOSE BUTTON (This fixes the 'X is defined but never used' error) */}
                   <button onClick={() => setIsProfileOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                     <X size={20} />
                   </button>
                 </div>

                 {/* Menu Content (Auto-Shifts based on Toggle) */}
                 <div className="p-2">
                   
                   {/* BUYER MODE CONTENT */}
                   {userRole === 'Buyer' && (
                     <div className="space-y-1 animate-fade-in">
                       <MenuLink icon={Package} title="My Orders" sub="Track shipments" color="text-blue-400" />
                       <MenuLink icon={Heart} title="Wishlist" sub="Saved items" color="text-red-400" />
                       <MenuLink icon={Settings} title="Settings" sub="Account preferences" />
                       <MenuLink icon={HelpCircle} title="Help Center" sub="FAQs & Support" />
                     </div>
                   )}

                   {/* SELLER MODE CONTENT */}
                   {userRole === 'Seller' && (
                     <div className="space-y-1 animate-fade-in">
                       <MenuLink icon={List} title="Active Listings" sub="Manage sales" color="text-amber-400" />
                       <MenuLink icon={BarChart2} title="Selling Status" sub="Earnings & Analytics" color="text-green-400" />
                       
                       <div className="mt-4 px-2 pb-2">
                         <button className="w-full flex items-center justify-center gap-2 py-3 border border-amber-600/30 bg-amber-900/20 rounded-lg text-amber-400 font-bold hover:bg-amber-900/40 transition-all">
                           <PlusCircle size={18} />
                           Upload New Item
                         </button>
                       </div>
                     </div>
                   )}
                 </div>

               </div>
             )}
           </div>
        </div>
      </nav>

      {/* Header Text */}
      <div className="absolute top-24 z-40 text-center pointer-events-none">
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
          New <span className="text-amber-400 italic">Arrivals</span>
        </h2>
        <p className="text-gray-400 mt-4 text-sm uppercase tracking-widest">
           {userRole === 'Buyer' ? 'Scroll to shop' : 'Your Virtual Closet'}
        </p>
      </div>

      {/* 3D Wheel Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[800px] flex items-center justify-center perspective-1000"
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
                left: '50%',
                marginTop: '-160px', 
                marginLeft: '-112px', 
              }}
            >
              {/* Card */}
              <div className="w-56 h-80 relative bg-gray-800/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden group-hover:border-amber-400/50 transition-colors">
                <div className="w-full h-full p-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium text-sm truncate">{item.name}</p>
                      <p className="text-amber-400 text-xs font-bold">{item.price}</p>
                    </div>
                    <button className="p-2 bg-white text-black rounded-full hover:bg-amber-400 transition-colors shadow-lg">
                      <ShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- HELPER COMPONENT FOR LINKS ---
const MenuLink = ({ icon: Icon, title, sub, color = "text-gray-400" }) => (
  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group">
    <Icon className={`${color} mt-0.5`} size={20} />
    <div>
      <h4 className="text-white font-bold text-sm group-hover:text-white transition-colors">{title}</h4>
      <p className="text-xs text-gray-500">{sub}</p>
    </div>
  </div>
);

export default BrowsePage;