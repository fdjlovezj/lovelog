import React, { useState, useRef, useEffect } from 'react';
import { MoodType } from '../types';
import { polishMessage, suggestDailyTopic } from '../services/geminiService';
import { compressImage } from '../utils/imageHelpers';
import { X, Sparkles, Wand2, Send, Lightbulb, Image as ImageIcon, Loader2, Trash2 } from 'lucide-react';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string, mood: MoodType, aiEnhanced: boolean, images: string[]) => void;
  initialContent?: string;
}

const ComposeModal: React.FC<ComposeModalProps> = ({ isOpen, onClose, onSave, initialContent = '' }) => {
  const [content, setContent] = useState(initialContent);
  const [mood, setMood] = useState<MoodType>(MoodType.HAPPY);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [aiEnhanced, setAiEnhanced] = useState(false);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update content when initialContent changes (e.g., from AI generation in parent)
  useEffect(() => {
    if (isOpen && initialContent) {
      setContent(initialContent);
      setMood(MoodType.ROMANTIC); // Default to romantic for love notes
    }
  }, [initialContent, isOpen]);

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > 4) {
      alert("You can only attach up to 4 images per note.");
      return;
    }

    setIsProcessingImage(true);
    try {
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const compressed = await compressImage(files[i]);
        newImages.push(compressed);
      }
      setImages(prev => [...prev, ...newImages]);
    } catch (error) {
      console.error("Error processing image", error);
      alert("Failed to process image. Please try again.");
    } finally {
      setIsProcessingImage(false);
      // Reset input so same file can be selected again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && images.length === 0) return;
    
    onSave(content, mood, aiEnhanced, images);
    
    // Reset state
    setContent('');
    setMood(MoodType.HAPPY);
    setAiEnhanced(false);
    setImages([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white/90 backdrop-blur-xl w-full max-w-lg rounded-3xl shadow-2xl p-6 border border-white flex flex-col max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-script font-bold text-gray-800 mb-4 shrink-0">Write a Note for zhaojin</h3>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-y-auto scrollbar-hide">
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
              className="w-full h-32 p-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all resize-none text-gray-700 placeholder-gray-400"
              placeholder="What's on your mind today? How much do you miss zhaojin?"
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

          {/* Image Upload Section */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Photos ({images.length}/4)</label>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={images.length >= 4 || isProcessingImage}
                className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessingImage ? <Loader2 className="w-3 h-3 animate-spin"/> : <ImageIcon className="w-3 h-3" />}
                Add Photo
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                multiple 
                className="hidden" 
              />
            </div>
            
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square group rounded-lg overflow-hidden border border-gray-200">
                    <img src={img} alt="Upload preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Current Mood</label>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {(Object.values(MoodType) as MoodType[]).map((m) => (
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
            disabled={(!content.trim() && images.length === 0)}
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-rose-200 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
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