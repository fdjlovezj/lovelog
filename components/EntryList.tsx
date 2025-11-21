import React from 'react';
import { DiaryEntry, MoodType } from '../types';
import { Calendar, Sparkles } from 'lucide-react';

interface EntryListProps {
  entries: DiaryEntry[];
  onDelete: (id: string) => void;
}

const moodEmojis: Record<MoodType, string> = {
  [MoodType.HAPPY]: '🥰',
  [MoodType.MISSING_YOU]: '🥺',
  [MoodType.EXCITED]: '🤩',
  [MoodType.CALM]: '😌',
  [MoodType.SAD]: '😢',
};

const moodStyles: Record<MoodType, string> = {
  [MoodType.HAPPY]: 'bg-amber-50/80 border-l-amber-400',
  [MoodType.MISSING_YOU]: 'bg-violet-50/80 border-l-violet-400',
  [MoodType.EXCITED]: 'bg-rose-50/80 border-l-rose-500',
  [MoodType.CALM]: 'bg-sky-50/80 border-l-sky-400',
  [MoodType.SAD]: 'bg-slate-50/80 border-l-slate-400',
};

const EntryList: React.FC<EntryListProps> = ({ entries, onDelete }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-light bg-white/40 backdrop-blur-md rounded-3xl border border-white/50 shadow-sm">
        <p>No notes yet. Start writing your story.</p>
      </div>
    );
  }

  // Sort by date descending
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-24">
      {sortedEntries.map((entry) => (
        <div 
          key={entry.id} 
          className={`relative p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-white/50 backdrop-blur-md border-l-[6px] ${moodStyles[entry.mood] || moodStyles[MoodType.HAPPY]}`}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              {new Date(entry.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              <span className="text-xs bg-white/50 px-2 py-0.5 rounded-full ml-2 border border-white/20">
                {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="flex items-center gap-2">
                {entry.aiEnhanced && (
                    <span className="text-xs text-purple-600 flex items-center gap-1 bg-purple-100/50 px-2 py-1 rounded-full border border-purple-200/50">
                        <Sparkles className="w-3 h-3" /> AI
                    </span>
                )}
                <button 
                    onClick={() => onDelete(entry.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors text-xs bg-white/30 hover:bg-white/50 px-2 py-1 rounded-full"
                >
                    Remove
                </button>
            </div>
          </div>
          
          <div className="prose prose-pink max-w-none">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line font-sans">
              {entry.content}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-end">
            <span className="text-2xl drop-shadow-sm filter hover:scale-110 transition-transform cursor-default" title={entry.mood} role="img" aria-label="Mood">
              {moodEmojis[entry.mood]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EntryList;