import React, { useState, useEffect } from 'react';
import { Heart, Star, Sun, Moon, Music, Gift, Sparkles, RefreshCw } from 'lucide-react';

// Game configuration
const ICONS = [
  { id: 1, icon: Heart, color: 'text-rose-500' },
  { id: 2, icon: Star, color: 'text-amber-400' },
  { id: 3, icon: Sun, color: 'text-orange-500' },
  { id: 4, icon: Moon, color: 'text-indigo-400' },
  { id: 5, icon: Music, color: 'text-blue-500' },
  { id: 6, icon: Gift, color: 'text-purple-500' },
];

interface Card {
  uniqueId: number;
  iconId: number;
  Icon: React.ElementType;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [moves, setMoves] = useState(0);

  // Initialize game
  const initGame = () => {
    const duplicatedIcons = [...ICONS, ...ICONS];
    const shuffled = duplicatedIcons
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        uniqueId: index,
        iconId: item.id,
        Icon: item.icon,
        color: item.color,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(shuffled);
    setFlippedCards([]);
    setIsWon(false);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (uniqueId: number) => {
    // Prevent clicking if already won, flipping more than 2, or clicking same card
    if (isWon || flippedCards.length >= 2 || cards.find(c => c.uniqueId === uniqueId)?.isFlipped || cards.find(c => c.uniqueId === uniqueId)?.isMatched) {
      return;
    }

    // Flip the card
    const newCards = cards.map(card => 
      card.uniqueId === uniqueId ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
    
    const newFlipped = [...flippedCards, uniqueId];
    setFlippedCards(newFlipped);

    // Check for match
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstId, secondId] = newFlipped;
      const firstCard = newCards.find(c => c.uniqueId === firstId);
      const secondCard = newCards.find(c => c.uniqueId === secondId);

      if (firstCard && secondCard && firstCard.iconId === secondCard.iconId) {
        // Match found
        setCards(prev => prev.map(c => 
          c.uniqueId === firstId || c.uniqueId === secondId 
            ? { ...c, isMatched: true } 
            : c
        ));
        setFlippedCards([]);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.uniqueId === firstId || c.uniqueId === secondId 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Check win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.isMatched)) {
      setIsWon(true);
    }
  }, [cards]);

  return (
    <div className="mt-16 mb-8 p-6 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-xl max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-script text-rose-900 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-400" />
          Love Match
          <Sparkles className="w-5 h-5 text-rose-400" />
        </h3>
        <p className="text-xs text-stone-500 mt-1">Find the matching pairs · Moves: {moves}</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <button
            key={card.uniqueId}
            onClick={() => handleCardClick(card.uniqueId)}
            className={`aspect-square rounded-xl transition-all duration-500 transform perspective-1000 relative ${
              card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front (Hidden) */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl border-2 border-white shadow-sm flex items-center justify-center backface-hidden ${
                card.isFlipped || card.isMatched ? 'opacity-0 rotate-y-180' : 'opacity-100'
              } transition-opacity duration-300`}
            >
              <Heart className="w-5 h-5 text-white/50 fill-white/50" />
            </div>

            {/* Back (Revealed) */}
            <div 
              className={`absolute inset-0 bg-white rounded-xl border-2 border-rose-100 shadow-md flex items-center justify-center backface-hidden ${
                card.isFlipped || card.isMatched ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180'
              } transition-all duration-500`}
            >
              <card.Icon className={`w-6 h-6 ${card.color} ${card.isMatched ? 'animate-bounce' : ''}`} />
            </div>
          </button>
        ))}
      </div>

      {isWon && (
        <div className="mt-6 text-center animate-pop">
          <p className="text-rose-600 font-bold mb-2">Perfect Match! ❤️</p>
          <button 
            onClick={initGame}
            className="px-4 py-2 bg-rose-500 text-white text-xs rounded-full shadow-lg shadow-rose-200 hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-3 h-3" /> Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;