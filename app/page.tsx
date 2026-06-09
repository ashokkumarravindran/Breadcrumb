'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { sampleMemories, collections, Memory } from '../lib/data';
import { MemoryCard } from '../components/memory-card';
import { CollectionCard } from '../components/collection-card';
import { fetchWeather, WeatherSummary } from '../lib/weather';
import { generateDayPlan } from '../lib/suggestions';

const actionItems = [
  {
    label: 'Ticket window',
    title: 'Taylor Swift concert at MetLife',
    description:
      'Prices dropped 14% since you saved this. Lower-bowl seats in section 126 look like the best value right now.',
    source: 'Ticket listing · saved 3 weeks ago',
    cta: 'Compare tickets',
  },
  {
    label: 'Sale ending',
    title: 'Minimal desk lamp',
    description:
      'Sale ends tonight. AI matched this with your saved desk setup and found two cheaper alternatives.',
    source: 'Product page · Things to Buy',
    cta: 'Review options',
  },
  {
    label: 'Birthday soon',
    title: 'STEM puzzle kit for a 10 year old',
    description:
      'Birthday week is coming up. This fits your saved gift pattern: educational, age 10, under $40.',
    source: 'Quick note · Gift Ideas',
    cta: 'Shortlist gift',
  },
];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [memories, setMemories] = useState<Memory[]>(sampleMemories);
  const [weather, setWeather] = useState<WeatherSummary | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

useEffect(() => {
  window.localStorage.setItem('breadcrumbs-memories', JSON.stringify(sampleMemories));
  setMemories(sampleMemories);
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
          // Keep default UI
        }
      },
      () => {
        // Geolocation denied
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
    <div className="mx-auto max-w-7xl space-y-12">
      <section className="grid gap-10 rounded-[2.5rem] border border-stone-200/80 bg-white p-8 shadow-sm md:grid-cols-[1.15fr_0.85fr] lg:p-12">
        <div className="space-y-7">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-soft">
            Save once. Act later.
          </p>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-ink sm:text-6xl">
              Everything you wanted to come back to.
            </h1>

            <p className="max-w-2xl text-base leading-8 text-soft">
              Breadcrumbs captures links, places, products, notes, events, and ideas, then quietly turns
              them into timely actions when the context becomes useful.
            </p>
          </div>

          <div className="relative max-w-2xl">
            <label className="sr-only" htmlFor="search">
              Search by clue, place, mood, source, or topic
            </label>

            <input
              id="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by clue, place, mood, source, or topic..."
              className="w-full rounded-[1.75rem] border border-stone-200 bg-stone-50 px-5 py-4 text-base text-ink outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/add-memory"
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              Add something
            </Link>

            <Link
              href="/collections"
              className="rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-amber-300"
            >
              Browse collections
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-stone-200/80 bg-stone-50 p-6">
          {weather && location ? (
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold text-ink">Right now near you</p>
                <p className="mt-1 text-xs text-soft">
                  {location.lat.toFixed(2)}°N, {location.lon.toFixed(2)}°E
                </p>
              </div>

              <div>
                <p className="text-4xl font-semibold text-ink">{Math.round(weather.temperature)}°</p>
                <p className="mt-2 text-sm text-soft">{weather.description}</p>
              </div>

              <p className="rounded-full bg-white px-4 py-2 text-sm text-ink/80">
                {generateDayPlan(weather)}
              </p>

              <div className="rounded-[1.5rem] border border-stone-200/80 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-soft">You might like</p>
                <p className="mt-2 text-sm font-semibold text-ink">Try the café you saved nearby</p>
                <p className="mt-2 text-sm leading-6 text-soft">
                  Clear weather, low afternoon crowd patterns, and your saved café list make this a good
                  time to visit. Estimated 14 minutes away.
                </p>
                <button
                  type="button"
                  className="mt-4 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
                >
                  Get directions
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm text-soft">
              <p className="font-semibold text-ink">Right now near you</p>
              <p className="leading-7">
                Enable location to connect saved places and plans with real-world context.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-soft">Needs attention now</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">Time-sensitive things you saved</h2>
          </div>
        </div>

        <div className="divide-y divide-stone-200/80">
          {actionItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-soft">
                  {item.label}
                </p>
                <h3 className="mt-2 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-soft">{item.description}</p>
                <p className="mt-2 text-xs text-soft">{item.source}</p>
              </div>

              <button
                type="button"
                className="w-fit shrink-0 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-semibold text-ink transition hover:border-amber-300"
              >
                {item.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-soft">Saved trail</p>
            <h2 className="text-2xl font-semibold text-ink">Things you wanted to find again</h2>
          </div>

          <p className="text-sm text-soft">
            Showing {visibleMemories.length} saved item{visibleMemories.length === 1 ? '' : 's'}
          </p>
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
            <h2 className="text-2xl font-semibold text-ink">Organized by intent</h2>
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
    </div>
  );
}