import React, { useState, useEffect } from 'react';
import { Season, WeatherData } from '../types';

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

  // 2. Generate Particles
  useEffect(() => {
    const particleCount = 20; // Reduced count for cleaner look
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

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles}
    </div>
  );
};

export default WeatherSystem;