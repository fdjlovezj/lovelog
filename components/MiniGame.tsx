import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const MESSAGES = [
  "Miss You", "Love You", "Thinking of You", "Hug?", "Kiss!", 
  "Zhaojin ❤️", "Forever", "Only You", "My Girl", "Distance Sucks",
  "Can't Wait", "My Everything", "Beautiful", "Sweetheart"
];

const MiniGame: React.FC = () => {
  const [count, setCount] = useState(0);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, text: string}[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const newCount = count + 1;
    setCount(newCount);

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
    <div className="fixed bottom-8 left-8 z-40 flex flex-col items-center gap-2">
       {/* Click Count Badge */}
       <div className="bg-white/80 text-rose-600 px-3 py-1 rounded-full text-xs font-mono border border-rose-200 backdrop-blur-sm shadow-sm">
          Miss You x {count}
       </div>

       {/* Heart Button */}
       <button 
         onClick={handleClick}
         className="group relative w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 shadow-[0_4px_15px_rgba(244,63,94,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white/50"
       >
          <Heart className="w-8 h-8 text-white fill-white animate-pulse-slow group-hover:animate-none" />
          
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
       
       <span className="text-rose-900/30 text-[10px] tracking-wider">TAP ME</span>
    </div>
  );
};

export default MiniGame;