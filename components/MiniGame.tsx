import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const MESSAGES = [
  "Miss You", "Love You", "Thinking of You", "Hug?", "Kiss!", 
  "Zhaojin ❤️", "Forever", "Only You", "My Girl", "Distance Sucks",
  "Can't Wait", "My Everything", "Beautiful", "Sweetheart"
];

const MiniGame: React.FC = () => {
  const [count, setCount] = useState(0);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, text: string}[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    const newCount = count + 1;
    setCount(newCount);

    // Trigger celebration at 52 clicks
    if (newCount === 52) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
      setCount(0); // Reset to play again
    }

    // Create particle
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newParticle = {
      id: Date.now(),
      x: x + (Math.random() * 40 - 20),
      y: y - 20,
      text: MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
    };

    setParticles(prev => [...prev, newParticle]);

    // Remove particle after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };

  return (
    <>
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm animate-appear">
          <div className="text-center">
            <Heart className="w-32 h-32 text-rose-500 fill-rose-500 animate-ping-slow mx-auto mb-4" />
            <h2 className="text-4xl md:text-6xl font-script text-white drop-shadow-lg font-bold">
              I Love You 52 Times!
            </h2>
            <p className="text-white/90 mt-2 font-serif">And a million times more...</p>
          </div>
        </div>
      )}

      <div className="fixed bottom-8 left-8 z-40 flex flex-col items-center gap-2">
         {/* Click Count Badge */}
         <div className="bg-white/80 text-rose-600 px-3 py-1 rounded-full text-xs font-mono border border-rose-200 backdrop-blur-sm shadow-sm transition-all duration-300" style={{ transform: `scale(${1 + count/100})` }}>
            Miss You x {count}
         </div>

         {/* Heart Button */}
         <button 
           onClick={handleClick}
           className="group relative w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 shadow-[0_4px_15px_rgba(244,63,94,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white/50"
         >
            <Heart className={`w-8 h-8 text-white fill-white group-hover:animate-none ${count > 40 ? 'animate-ping' : 'animate-pulse-slow'}`} />
            
            {/* Particles */}
            {particles.map(p => (
               <div 
                 key={p.id}
                 className="absolute pointer-events-none text-rose-600 font-bold text-sm whitespace-nowrap animate-pop"
                 style={{ 
                   left: p.x, 
                   top: p.y,
                   textShadow: '0 2px 0px rgba(255,255,255,1)'
                 }}
               >
                 {p.text}
               </div>
            ))}
            
            <div className="absolute -inset-1 rounded-full bg-rose-300 opacity-0 group-hover:opacity-30 blur transition-opacity"></div>
         </button>
         
         <span className="text-rose-900/30 text-[10px] tracking-wider">tap me</span>
      </div>
    </>
  );
};

export default MiniGame;