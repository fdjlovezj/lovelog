import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import EntryList from './components/EntryList';
import ComposeModal from './components/ComposeModal';
import PhotoWall from './components/PhotoWall';
import { DiaryEntry, MoodType } from './types';
import { PenTool } from 'lucide-react';

// Start date: September 20, 2023
const START_DATE = '2023-09-20T00:00:00';

const App: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('loveLogEntries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse entries", e);
      }
    }
  }, []);

  // Save to local storage whenever entries change
  useEffect(() => {
    localStorage.setItem('loveLogEntries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (content: string, mood: MoodType, aiEnhanced: boolean) => {
    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content,
      mood,
      aiEnhanced,
    };
    setEntries(prev => [newEntry, ...prev]);
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
        setEntries(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-rose-200 relative">
      <PhotoWall />
      
      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-script text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 py-2 drop-shadow-sm">
            LoveLog
          </h1>
          <p className="text-gray-600 font-medium mt-2 tracking-wide text-sm bg-white/40 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
            For my favorite person, miles away but close at heart.
          </p>
        </header>

        {/* Timer Section */}
        <section className="mb-16">
          <div className="glass-panel rounded-[2rem] shadow-xl shadow-rose-100/50 border border-white/60">
            <Timer startDate={START_DATE} />
          </div>
        </section>

        {/* Floating Action Button for Mobile / Action Bar for Desktop */}
        <div className="fixed bottom-8 right-8 z-40 md:static md:flex md:justify-center md:mb-12 md:bottom-auto md:right-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative flex items-center justify-center gap-2 bg-rose-500 text-white rounded-full p-4 md:px-8 md:py-3 shadow-lg shadow-rose-300 hover:bg-rose-600 hover:scale-110 md:hover:scale-105 transition-all duration-300"
          >
            <PenTool className="w-6 h-6" />
            <span className="hidden md:inline font-medium">Write Today's Note</span>
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping md:hidden"></span>
          </button>
        </div>

        {/* Timeline/Feed Section */}
        <section>
            <div className="flex items-center gap-4 mb-6 px-2">
                <div className="h-px bg-gray-400/30 flex-1"></div>
                <h3 className="text-gray-500 font-script text-2xl drop-shadow-sm">Our Story</h3>
                <div className="h-px bg-gray-400/30 flex-1"></div>
            </div>
            <EntryList entries={entries} onDelete={handleDeleteEntry} />
        </section>

      </div>

      <ComposeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddEntry}
      />
      
      <footer className="text-center py-8 text-gray-500 text-xs font-medium relative z-10">
        <p className="bg-white/40 inline-block px-3 py-1 rounded-full">Made with ❤️ for You</p>
      </footer>
    </div>
  );
};

export default App;