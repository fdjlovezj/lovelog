import React, { useState, useEffect } from 'react';
import { Season, WeatherData } from '../types';
import { CloudSun, Snowflake, Sun, CloudRain, Wind, Thermometer } from 'lucide-react';

const WeatherSystem: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({ season: 'spring' });
  const [particles, setParticles] = useState<React.ReactNode[]>([]);

  // 1. Detect Season
  useEffect(() => {
    const month = new Date().getMonth(); // 0-11
    let currentSeason: Season = 'spring';
    if (month >= 2 && month <= 4) currentSeason = 'spring';
    else if (month >= 5 && month <= 7) currentSeason = 'summer';
    else if (month >= 8 && month <= 10) currentSeason = 'autumn';
    else currentSeason = 'winter';

    setWeather(prev => ({ ...prev, season: currentSeason }));
  }, []);

  // 2. Fetch Real Weather (Optional, Fallback to Season)
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code`
          );
          const data = await response.json();
          if (data.current) {
            setWeather(prev => ({
              ...prev,
              temp: Math.round(data.current.temperature_2m),
              isDay: !!data.current.is_day,
              // Map generic codes roughly if needed, simply display temp is enough for now
            }));
          }
        } catch (e) {
          console.log("Could not fetch weather, using seasonal default");
        }
      }, () => console.log("Geolocation denied"));
    }
  }, []);

  // 3. Generate Particles
  useEffect(() => {
    const particleCount = 30; // Limit for performance
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      const style: React.CSSProperties = {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 10}s`,
        opacity: 0.3 + Math.random() * 0.5,
        fontSize: `${10 + Math.random() * 20}px`,
      };

      let content = '';
      let animationClass = '';

      switch (weather.season) {
        case 'spring':
          content = '🌸'; // Cherry blossom
          animationClass = 'animate-float';
          style.color = '#fbcfe8'; // Pink-200
          break;
        case 'summer':
          content = '✨'; // Fireflies/Light
          animationClass = 'animate-float';
          style.animationDuration = '3s';
          style.color = '#fbbf24'; // Amber
          style.textShadow = '0 0 5px #fbbf24';
          break;
        case 'autumn':
          content = '🍁'; // Maple leaf
          animationClass = 'animate-fall';
          style.color = '#fb923c'; // Orange-400
          break;
        case 'winter':
          content = '❄'; // Snow
          animationClass = 'animate-fall';
          style.color = '#bae6fd'; // Sky-200
          break;
      }

      newParticles.push(
        <div key={i} className={`weather-particle absolute ${animationClass}`} style={style}>
          {content}
        </div>
      );
    }
    setParticles(newParticles);
  }, [weather.season]);

  // Render Widget
  const renderIcon = () => {
    if (weather.season === 'winter') return <Snowflake className="w-5 h-5 text-sky-400" />;
    if (weather.season === 'autumn') return <Wind className="w-5 h-5 text-orange-400" />;
    if (weather.season === 'summer') return <Sun className="w-5 h-5 text-amber-400" />;
    return <CloudSun className="w-5 h-5 text-pink-400" />;
  };

  return (
    <>
      {/* Particle Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles}
      </div>

      {/* Weather Widget */}
      <div className="absolute top-6 right-6 z-50 animate-float">
        <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-3 text-stone-600 shadow-lg bg-white/60 border-white/50">
           {renderIcon()}
           <div className="flex flex-col">
             <span className="text-xs font-medium uppercase tracking-wider text-stone-400">
               {weather.season}
             </span>
             {weather.temp !== undefined && (
               <div className="flex items-center gap-1 text-sm font-bold">
                 <Thermometer className="w-3 h-3" />
                 {weather.temp}°C
               </div>
             )}
           </div>
        </div>
      </div>
    </>
  );
};

export default WeatherSystem;