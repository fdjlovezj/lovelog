import React, { useState } from 'react';
import { MoodType } from '../types';
import { polishMessage, suggestDailyTopic } from '../services/geminiService';
import { X, Sparkles, Wand2, Send, Lightbulb } from 'lucide-react';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string, mood: MoodType, aiEnhanced: boolean) => void;
}

const ComposeModal: React.FC<ComposeModalProps> = ({ isOpen, onClose, onSave }) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodType>(MoodType.HAPPY);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [aiEnhanced, setAiEnhanced] = useState(false);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  if (!isOpen) return null;

  const handleEnhance = async (style: 'romantic' | 'poetic' | 'funny') => {
    if (!content.trim()) return;
    setIsEnhancing(true);
    const newText = await polishMessage(content, style);
    setContent(newText);
    setAiEnhanced(true);
    setIsEnhancing(false);
  };

  const handleSuggestion = async () => {
    setLoadingSuggestion(true);
    const prompt = await suggestDailyTopic();
    setContent(prev => (prev ? prev + "\n\n" : "") + "Prompt: " + prompt + "\n");
    setLoadingSuggestion(false);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSave(content, mood, aiEnhanced);
    setContent('');
    setMood(MoodType.HAPPY);
    setAiEnhanced(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white/90 backdrop-blur-xl w-full max-w-lg rounded-3xl shadow-2xl p-6 border border-white">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-script font-bold text-gray-800 mb-4">Write a Note for Her</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
             <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</label>
                <button
                    type="button"
                    onClick={handleSuggestion}
                    disabled={loadingSuggestion}
                    className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 transition-colors"
                >
                    <Lightbulb className="w-3 h-3" />
                    {loadingSuggestion ? "Thinking..." : "Inspire Me"}
                </button>
             </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-40 p-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all resize-none text-gray-700 placeholder-gray-400"
              placeholder="What's on your mind today? How much do you miss her?"
            />
            
            <div className="flex gap-2 mt-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                type="button"
                onClick={() => handleEnhance('romantic')}
                disabled={isEnhancing || !content}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 text-xs font-medium hover:bg-purple-100 transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3 h-3" /> Make Romantic
              </button>
              <button
                type="button"
                onClick={() => handleEnhance('poetic')}
                disabled={isEnhancing || !content}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium hover:bg-indigo-100 transition-colors whitespace-nowrap"
              >
                <Wand2 className="w-3 h-3" /> Make Poetic
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Current Mood</label>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {Object.values(MoodType).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    mood === m
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {m === MoodType.MISSING_YOU ? 'Missing You' : m.charAt(0) + m.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!content.trim()}
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-rose-200 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            Send Love
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComposeModal;
