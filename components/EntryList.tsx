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

const EntryList: React.FC<EntryListProps> = ({ entries, onDelete }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400 font-light">
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
        <div key={entry.id} className="glass-panel p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-l-rose-300">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              {new Date(entry.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full ml-2">
                {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="flex items-center gap-2">
                {entry.aiEnhanced && (
                    <span className="text-xs text-purple-400 flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-full">
                        <Sparkles className="w-3 h-3" /> AI
                    </span>
                )}
                <button 
                    onClick={() => onDelete(entry.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors text-xs"
                >
                    Remove
                </button>
            </div>
          </div>
          
          <div className="prose prose-pink max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line font-sans">
              {entry.content}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-end">
            <span className="text-2xl" title={entry.mood} role="img" aria-label="Mood">
              {moodEmojis[entry.mood]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EntryList;
