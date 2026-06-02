'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { sampleMemories, collections, Memory } from '../lib/data';
import { MemoryCard } from '../components/memory-card';
import { CollectionCard } from '../components/collection-card';
import { fetchWeather, WeatherSummary } from '../lib/weather';
import { generateDayPlan } from '../lib/suggestions';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [memories, setMemories] = useState<Memory[]>(sampleMemories);
  const [weather, setWeather] = useState<WeatherSummary | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locationName, setLocationName] = useState('Your location');

  useEffect(() => {
    const stored = window.localStorage.getItem('breadcrumbs-memories');
    if (stored) {
      try {
        setMemories(JSON.parse(stored));
      } catch {
        setMemories(sampleMemories);
      }
    }
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });

        try {
          const weather = await fetchWeather(lat, lon);
          setWeather(weather);
        } catch {
          // Silently fail, keep default UI
        }
      },
      () => {
        // Geolocation denied, use default UI
      }
    );
  }, []);

  const visibleMemories = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return memories;
    return memories.filter((memory) => {
      return [memory.title, memory.notes, memory.collection, memory.location, ...(memory.tags || [])]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalized));
    });
  }, [memories, query]);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <section className="grid gap-10 rounded-[2rem] border border-slate-200/80 bg-white p-8 md:grid-cols-[1.2fr_0.8fr] lg:p-12">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-soft">Quick capture</p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">Find the thing you almost remembered.</h1>
          <p className="max-w-xl text-base leading-7 text-soft">Save links, photos, places, notes, and ideas before they disappear.</p>
          <div className="relative max-w-xl">
            <label className="sr-only" htmlFor="search">Search by memory, mood, place, person, or clue...</label>
            <input
              id="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by memory, mood, place, person, or clue..."
              className="w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-4 text-base text-ink outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/add-memory" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900">
              Add memory
            </Link>
            <Link href="/collections" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-amber-300">
              Browse collections
            </Link>
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6">
          {weather && location ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-ink">{locationName}</p>
                <p className="text-xs text-soft">{location.lat.toFixed(2)}°N, {location.lon.toFixed(2)}°E</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-semibold text-ink">{Math.round(weather.temperature)}°</p>
                <p className="text-sm text-soft">{weather.description}</p>
              </div>
              <p className="rounded-full bg-white px-4 py-2 text-sm text-ink/80">
                {generateDayPlan(weather)}
              </p>
            </div>
          ) : (
            <div className="space-y-2 text-sm text-soft">
              <p>Enable location to see today's weather and suggestions.</p>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-soft">Recently saved</p>
            <h2 className="text-2xl font-semibold text-ink">Your latest memories</h2>
          </div>
          <p className="text-sm text-soft">Showing {visibleMemories.length} memory{visibleMemories.length === 1 ? '' : 'ies'}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleMemories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-soft">Collections</p>
            <h2 className="text-2xl font-semibold text-ink">Your organized themes</h2>
          </div>
          <Link href="/collections" className="text-sm font-semibold text-ink/80 transition hover:text-ink">
            View all collections
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {collections.map((collection) => {
            const count = memories.filter((item) => item.collection === collection).length;
            return <CollectionCard key={collection} title={collection} count={count} />;
          })}
        </div>
      </section>

      <section className="space-y-6 rounded-[2rem] border border-slate-200/80 bg-white p-6">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-soft">Reminders</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">Things to revisit</h2>
        </div>
        <div className="grid gap-3">
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 text-sm text-soft">Revisit the sleep routine article this weekend.</div>
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 text-sm text-soft">Check the cabin idea before planning the trip.</div>
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 text-sm text-soft">Review the desk lamp before buying.</div>
        </div>
      </section>
    </div>
  );
}
