import React from 'react';
import { DiaryEntry } from '../types';
import { Quote, Calendar, Pin } from 'lucide-react';

interface EntryListProps {
  pinnedLetter: DiaryEntry;
  dailyUpdates: DiaryEntry[];
}

const EntryCard: React.FC<{ entry: DiaryEntry; isPinned?: boolean }> = ({ entry, isPinned }) => (
  <div 
    className={`relative p-8 md:p-10 rounded-[2rem] shadow-xl backdrop-blur-md overflow-hidden group transition-all hover:shadow-2xl
    ${isPinned 
      ? 'bg-white/80 border border-white shadow-rose-100/50 mb-16 transform hover:scale-[1.01]' 
      : 'bg-white/50 border border-white/60 shadow-orange-50/50 mb-8'
    }`}
  >
    {/* Decoration */}
    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isPinned ? 'from-rose-300 via-rose-400 to-rose-300' : 'from-amber-200 via-orange-300 to-amber-200'}`}></div>
    
    {isPinned ? (
        <Quote className="absolute top-6 left-6 w-10 h-10 text-rose-200 rotate-180" />
    ) : (
        <div className="absolute top-6 left-8 flex items-center gap-2 text-xs font-mono text-stone-400">
            <Calendar className="w-3 h-3" />
            {new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
    )}

    {isPinned && (
        <div className="absolute top-4 right-6">
            <Pin className="w-5 h-5 text-rose-400 fill-rose-100 rotate-45" />
        </div>
    )}
    
    <div className="relative z-10 mt-4">
      {entry.title && (
        <h3 className={`text-2xl md:text-3xl font-serif mb-6 text-center tracking-wide border-b pb-4 mx-auto max-w-xs ${isPinned ? 'text-rose-900 border-rose-100' : 'text-stone-700 border-stone-100'}`}>
          {entry.title}
        </h3>
      )}
      
      <div className="prose prose-stone max-w-none">
        <p className={`leading-relaxed whitespace-pre-line font-serif text-lg tracking-wide text-justify ${isPinned ? 'text-stone-700' : 'text-stone-600'}`}>
          {entry.content}
        </p>
      </div>
    </div>

    {isPinned && (
        <div className="mt-8 flex justify-center">
            <div className="w-16 h-1 bg-rose-200 rounded-full"></div>
        </div>
    )}
  </div>
);

const EntryList: React.FC<EntryListProps> = ({ pinnedLetter, dailyUpdates }) => {
  return (
    <div className="max-w-2xl mx-auto pb-24 px-4">
      
      {/* 每日碎碎念区域 */}
      {dailyUpdates.length > 0 && (
          <div className="mb-16">
              <div className="flex items-center gap-4 mb-6 px-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-stone-300/50"></div>
                  <h2 className="text-stone-400 font-script text-2xl">Daily Notes</h2>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-stone-300/50"></div>
              </div>
              {dailyUpdates.map((entry) => (
                  <EntryCard key={entry.id} entry={entry} />
              ))}
          </div>
      )}

      {/* 置顶的信件 */}
      <div className="relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-white rounded-full border border-rose-100 text-rose-400 text-xs tracking-widest uppercase shadow-md z-20">
              For Zhaojin
          </div>
          <EntryCard entry={pinnedLetter} isPinned={true} />
      </div>
      
    </div>
  );
};

export default EntryList;