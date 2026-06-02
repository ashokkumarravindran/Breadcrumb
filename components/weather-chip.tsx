'use client';

import { useEffect, useState } from 'react';
import { fetchWeather, WeatherSummary } from '../lib/weather';

export function WeatherChip({ coords }: { coords: { lat: number; lon: number } }) {
  const [weather, setWeather] = useState<WeatherSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather(coords.lat, coords.lon)
      .then(setWeather)
      .catch(() => setError('Weather unavailable'));
  }, [coords.lat, coords.lon]);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-2 text-xs font-medium text-soft">
      {weather ? (
        <>
          <span className="text-ink">{Math.round(weather.temperature)}°</span>
          <span>·</span>
          <span>{weather.description.split(' ')[0]}</span>
        </>
      ) : error ? (
        <span>{error}</span>
      ) : (
        <span>Loading weather...</span>
      )}
    </div>
  );
}
