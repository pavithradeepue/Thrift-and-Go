import React from 'react';

const HomePage = () => {
  return (
    <div className="h-screen w-full bg-gray-900 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden animate-fade-in">
      
      {/* Background Glow to give it depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto">
        
        {/* Main Title: THREADSWAP */}
        <h1 className="text-6xl md:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 font-bold tracking-tighter mb-4 animate-slide-down">
          THREADSWAP
        </h1>

        {/* Slogan: Swap, Try, Love */}
        <h2 className="text-3xl md:text-5xl text-amber-500 font-serif italic mb-8 animate-fade-up">
          Swap, Try, Love
        </h2>

        {/* Description Text from Sketch */}
        <div className="max-w-2xl text-center border-t border-gray-700 pt-8 mt-4 animate-fade-up-delay">
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
            Experience clothing before you commit. <br/>
            Browse the virtual closet and shop <br/>
            sustainable fashion that fits perfectly.
          </p>
        </div>

        {/* Visual Loading Indicator (Matches 'stays for a sec') */}
        <div className="mt-16 w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
             <div className="h-full bg-amber-500 animate-[progress_1.5s_linear_forwards]"></div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;