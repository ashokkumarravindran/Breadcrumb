'use client';

import { useEffect, useState } from 'react';
import { fetchWeather, WeatherSummary } from '../lib/weather';

export function WeatherCard({ title, coords }: { title: string; coords: { lat: number; lon: number } }) {
  const [weather, setWeather] = useState<WeatherSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather(coords.lat, coords.lon)
      .then(setWeather)
      .catch(() => setError('Weather unavailable'));
  }, [coords.lat, coords.lon]);

  return (
    <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-5">
      <div className="mb-4">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="text-xs text-soft">Live weather for your place memory</p>
      </div>
      {error ? (
        <p className="text-sm text-soft">{error}</p>
      ) : weather ? (
        <div className="space-y-4">
          <div className="flex items-baseline gap-3">
            <p className="text-3xl font-semibold text-ink">{Math.round(weather.temperature)}°</p>
            <p className="text-sm uppercase tracking-[0.2em] text-soft">{weather.description}</p>
          </div>
          <p className="rounded-full bg-white px-4 py-2 text-sm text-ink/80">
            {weather.temperature > 18 ? 'Good day to visit' : 'Take a cozy plan if you go'}
          </p>
        </div>
      ) : (
        <p className="text-sm text-soft">Loading weather…</p>
      )}
    </div>
  );
}
