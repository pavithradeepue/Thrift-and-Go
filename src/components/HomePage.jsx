import React from 'react';

const HomePage = () => {
  // New accent color hex code based on the image
  const accentColor = "#CFB997"; 

  return (
    // Updated background color to light cream
    <div className="h-screen w-full bg-[#FDFCF8] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      
      {/* Background Glow - Made very subtle for light mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-900/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- FLOATING CONTAINER --- */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto animate-float">
        
        {/* Main Title: THREADSWAP - Updated gradient for light background */}
        <h1 className="text-6xl md:text-9xl font-serif font-bold tracking-tighter mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 drop-shadow-sm">
            THREADSWAP
          </span>
        </h1>

        {/* Slogan - Updated to new beige accent color */}
        <h2 className="text-3xl md:text-5xl font-serif italic mb-8 tracking-wide" style={{ color: accentColor }}>
          Swap, Try, Love
        </h2>

        {/* Description Line - Updated border and text color */}
        <div className="w-full max-w-lg border-t border-gray-200 pt-8 mt-4">
          <p className="text-gray-600 text-lg leading-relaxed font-light">
            Experience clothing before you commit.<br/>
            Browse the virtual closet and shop<br/>
            sustainable fashion that fits perfectly.
          </p>
        </div>

        {/* Loading Bar (3 Seconds) - Updated colors */}
        <div className="mt-16 w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
             {/* Using inline style for the exact accent color */}
             <div className="h-full animate-[progress_3s_linear_forwards]" style={{ backgroundColor: accentColor }}></div>
        </div>

      </div>

      {/* Internal CSS for animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;