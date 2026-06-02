'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sampleMemories, MemoryType } from '../../lib/data';

const memoryTypes: MemoryType[] = [
  'Place',
  'Link',
  'Photo',
  'Note',
  'Product',
  'Article',
  'Podcast',
  'Book',
  'Idea',
  'Screenshot',
  'Voice note',
  'Video',
];

export default function AddMemoryPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [type, setType] = useState<MemoryType>('Place');
  const [source, setSource] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [reminder, setReminder] = useState('');
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      if (!location) {
        setLocation('Current location');
      }
    });
  }, [location]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMemory = {
      id: `memory-${Date.now()}`,
      title: title || 'Quick memory',
      type,
      collection: 'Quick capture',
      notes,
      source: source || undefined,
      imageUrl: imageUrl || undefined,
      location: location || (coords ? 'Current location' : undefined),
      coords: coords ?? undefined,
      reminder: reminder || undefined,
      savedAt: new Date().toISOString(),
    };

    const existing = window.localStorage.getItem('breadcrumbs-memories');
    const list = existing ? JSON.parse(existing) : sampleMemories;
    window.localStorage.setItem('breadcrumbs-memories', JSON.stringify([newMemory, ...list]));
    setSaved(true);
    window.setTimeout(() => {
      router.push('/');
    }, 700);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-soft">Quick capture</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">Capture the thing before it slips away.</h1>
        <p className="mt-4 text-sm leading-7 text-soft">Minimal fields, fast save, and location attached when available.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 rounded-[2rem] border border-slate-200/80 bg-white p-8">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">Title</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Café with the blue door"
            className="w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink outline-none"
          />
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-ink">Type</span>
            <select
              value={type}
              onChange={(event) => setType(event.target.value as MemoryType)}
              className="w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink outline-none"
            >
              {memoryTypes.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-ink">Reminder</span>
            <input
              type="date"
              value={reminder}
              onChange={(event) => setReminder(event.target.value)}
              className="w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink outline-none"
            />
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-ink">Source link</span>
            <input
              value={source}
              onChange={(event) => setSource(event.target.value)}
              placeholder="https://"
              className="w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink outline-none"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-ink">Image URL</span>
            <input
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="Optional image URL"
              className="w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink outline-none"
            />
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">Notes</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={5}
            placeholder="Add the details you want to remember later."
            className="w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink outline-none"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">Location</span>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Lisbon, Portugal"
            className="w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink outline-none"
          />
          {coords ? <p className="text-xs text-soft">Location auto-captured from your device.</p> : null}
        </label>

        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
          >
            Save memory
          </button>
          {saved ? <p className="text-sm text-amber-700">Saved! Redirecting…</p> : null}
        </div>
      </form>
    </div>
  );
}
