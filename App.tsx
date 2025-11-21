import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import EntryList from './components/EntryList';
import WeatherSystem from './components/WeatherSystem';
import MiniGame from './components/MiniGame';
import MemoryGame from './components/MemoryGame';
import { pinnedLetter, dailyUpdates } from './data/entries';
import { DiaryEntry } from './types';

// Start date: September 20, 2023
const START_DATE = '2023-09-20T00:00:00';

const App: React.FC = () => {
  // State for local entries that user adds during session
  const [localEntries, setLocalEntries] = useState<DiaryEntry[]>([]);

  // Load any locally saved entries on mount
  useEffect(() => {
    const saved = localStorage.getItem('local_love_notes');
    if (saved) {
      try {
        setLocalEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local notes");
      }
    }
  }, []);

  // Combine hardcoded updates with local updates
  const allUpdates = [...localEntries, ...dailyUpdates];

  return (
    <div className="min-h-screen font-sans selection:bg-rose-300/50 relative text-stone-800 overflow-x-hidden bg-stone-50">
      
      {/* Warm Gradient Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,228,230,0.6),transparent_70%)]"></div>
      
      {/* Weather & Seasonal Effects (Widget Removed) */}
      <WeatherSystem />

      {/* Heartbeat Mini Game (Bottom Left) */}
      <MiniGame />
      
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        
        {/* Header Section */}
        <header className="text-center mb-12 animate-float">
          <h1 className="text-5xl md:text-7xl font-script text-rose-950 py-2 drop-shadow-sm">
            LoveLog
          </h1>
          <p className="text-rose-800/80 font-serif italic mt-2 tracking-wide text-sm md:text-base">
            Distance means so little when someone means so much.
          </p>
        </header>

        {/* Timer Section */}
        <section className="mb-20 transform hover:scale-[1.02] transition-transform duration-500">
          <div className="bg-white/40 backdrop-blur-md rounded-[3rem] shadow-xl border border-white/60 p-1 relative overflow-hidden ring-1 ring-rose-100">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
            <Timer startDate={START_DATE} />
          </div>
        </section>

        {/* Content Section */}
        <section className="relative">
            <EntryList pinnedLetter={pinnedLetter} dailyUpdates={allUpdates} />
        </section>

        {/* New Mini Game Section */}
        <section className="mt-24 relative">
            <div className="flex items-center gap-4 mb-6 px-8 opacity-60">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-300/50"></div>
                  <span className="text-xs font-serif text-rose-400 tracking-widest uppercase">Game Zone</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-300/50"></div>
            </div>
            <MemoryGame />
        </section>

      </div>
      
      <footer className="text-center py-8 text-rose-900/30 text-xs font-medium relative z-10 mb-16 md:mb-0">
        <p className="tracking-widest uppercase">Forever & Always · fandunjin & zhaojin</p>
      </footer>

    </div>
  );
};

export default App;