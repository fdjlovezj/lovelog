import React, { useState, useEffect } from 'react';
import { TimeElapsed } from '../types';
import { Heart, UserRound } from 'lucide-react';

interface TimerProps {
  startDate: string; // Format YYYY-MM-DD
}

const Timer: React.FC<TimerProps> = ({ startDate }) => {
  const [elapsed, setElapsed] = useState<TimeElapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const start = new Date(startDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = now - start;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setElapsed({ days, hours, minutes, seconds });
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [startDate]);

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      {/* Boy & Girl Icons */}
      <div className="relative mb-6 flex items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-1">
            <div className="p-3 bg-blue-100/50 rounded-full backdrop-blur-sm border border-blue-200/50 shadow-sm">
                <UserRound className="w-10 h-10 text-blue-400 fill-blue-100" />
            </div>
        </div>
        
        <Heart className="w-8 h-8 text-rose-400 fill-rose-400 animate-pulse-slow filter drop-shadow-sm mt-2" />
        
        <div className="flex flex-col items-center gap-1">
            <div className="p-3 bg-rose-100/50 rounded-full backdrop-blur-sm border border-rose-200/50 shadow-sm">
                <UserRound className="w-10 h-10 text-rose-400 fill-rose-100" />
            </div>
        </div>
      </div>

      <h2 className="text-lg md:text-xl font-light text-stone-600 mb-4 font-sans tracking-widest text-center">
        FANDUNJIN <span className="text-rose-500 text-xs mx-2">❤</span> ZHAOJIN
      </h2>
      <div className="grid grid-cols-4 gap-3 md:gap-6 text-center">
        <TimeUnit value={elapsed.days} label="Days" />
        <TimeUnit value={elapsed.hours} label="Hours" />
        <TimeUnit value={elapsed.minutes} label="Mins" />
        <TimeUnit value={elapsed.seconds} label="Secs" />
      </div>
      <div className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-stone-300/60 to-transparent"></div>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center bg-white/60 p-3 rounded-xl shadow-lg shadow-orange-100/50 backdrop-blur-sm min-w-[60px] md:min-w-[80px] border border-white/50">
    <span className="text-xl md:text-3xl font-bold text-stone-700 tabular-nums font-serif">
      {value}
    </span>
    <span className="text-[10px] text-rose-400 font-medium uppercase mt-1 tracking-wider">{label}</span>
  </div>
);

export default Timer;