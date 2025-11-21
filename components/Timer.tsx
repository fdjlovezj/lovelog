import React, { useState, useEffect } from 'react';
import { TimeElapsed } from '../types';
import { Heart } from 'lucide-react';

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
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="relative mb-6">
        <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-pulse" />
      </div>
      <h2 className="text-xl md:text-2xl font-light text-gray-600 mb-2 font-sans tracking-wide">
        We have been together for
      </h2>
      <div className="grid grid-cols-4 gap-4 text-center">
        <TimeUnit value={elapsed.days} label="Days" />
        <TimeUnit value={elapsed.hours} label="Hours" />
        <TimeUnit value={elapsed.minutes} label="Mins" />
        <TimeUnit value={elapsed.seconds} label="Secs" />
      </div>
      <p className="mt-6 text-sm text-gray-400 font-light tracking-widest uppercase">
        Since September 20, 2023
      </p>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center glass-panel p-3 md:p-4 rounded-2xl shadow-sm min-w-[70px] md:min-w-[90px]">
    <span className="text-2xl md:text-4xl font-bold text-gray-800 tabular-nums">
      {value}
    </span>
    <span className="text-xs text-rose-400 font-medium uppercase mt-1">{label}</span>
  </div>
);

export default Timer;