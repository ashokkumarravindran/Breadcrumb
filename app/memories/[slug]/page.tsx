'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { sampleMemories, Memory } from '../../../lib/data';
import { MemoryCard } from '../../../components/memory-card';

export default function MemoryDetailPage() {
  const params = useParams() as { slug?: string };
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const memory = sampleMemories.find((item) => item.id === params.slug) || null;

  const related = useMemo(() => {
    if (!memory) return [];

    return sampleMemories
      .filter((item) => item.collection === memory.collection && item.id !== memory.id)
      .slice(0, 2);
  }, [memory]);

  if (!memory) {
    return (
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-stone-200/80 bg-white p-8">
        <p className="text-sm text-soft">This saved item was not found.</p>
        <button
          className="mt-4 rounded-full border border-stone-200 bg-stone-50 px-5 py-3 text-sm font-semibold text-ink"
          onClick={() => router.push('/')}
        >
          Back to home
        </button>
      </div>
    );
  }

  const contextRows = getContextRows(memory);

  const handleShare = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/memories/${memory.id}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <section className="rounded-[2.5rem] border border-stone-200/80 bg-white p-8 shadow-sm lg:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href="/" className="text-sm font-semibold text-soft transition hover:text-ink">
              ← Back to home
            </Link>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-soft">
              Saved item
            </p>

            <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              {memory.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-8 text-soft">
              A closer look at the capture, insights, connected trail, and next step.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleShare}
              className="rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-amber-300"
            >
              {copied ? 'Copied' : 'Share'}
            </button>

            <button className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900">
              {memory.actionLabel || 'Open'}
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.68fr_0.32fr]">
        <main className="rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-sm">
          {memory.imageUrl ? (
            <div className="mb-6 overflow-hidden rounded-[1.75rem] bg-stone-100">
              <img src={memory.imageUrl} alt={memory.title} className="h-80 w-full object-cover" />
            </div>
          ) : null}

          <div className="divide-y divide-stone-200/80">
            <section className="pb-6">
              <p className="text-xs uppercase tracking-[0.24em] text-soft">Original capture</p>
              <p className="mt-3 text-sm font-semibold text-ink">
                {memory.sourceLabel || memory.capturedFrom || memory.type}
              </p>
              <p className="mt-2 text-sm leading-6 text-soft">
                {memory.preview || memory.location || memory.collection}
              </p>
            </section>

            <section className="py-6">
              <p className="text-xs uppercase tracking-[0.24em] text-soft">Why it mattered</p>
              <p className="mt-3 text-base leading-7 text-ink">{memory.notes}</p>
            </section>

            {memory.aiInsight ? (
              <section className="py-6">
                <p className="text-xs uppercase tracking-[0.24em] text-soft">Insights</p>
                <p className="mt-3 text-lg leading-8 text-ink">{memory.aiInsight}</p>
              </section>
            ) : null}

            <section className="py-6">
              <p className="text-xs uppercase tracking-[0.24em] text-soft">Context</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {contextRows.map((row) => (
                  <div key={row.label} className="rounded-[1.25rem] bg-stone-50 p-4">
                    <p className="text-xs text-soft">{row.label}</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-ink">{row.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {memory.suggestedAction ? (
              <section className="pt-6">
                <p className="text-xs uppercase tracking-[0.24em] text-soft">Next step</p>
                <p className="mt-3 text-lg leading-8 text-ink">{memory.suggestedAction}</p>

                <button className="mt-5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900">
                  {memory.actionLabel || 'Open'}
                </button>
              </section>
            ) : null}
          </div>
        </main>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-soft">Details</p>
            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="text-soft">Type</p>
                <p className="mt-1 font-semibold text-ink">{memory.type}</p>
              </div>
              <div>
                <p className="text-soft">Collection</p>
                <p className="mt-1 font-semibold text-ink">{memory.collection}</p>
              </div>
              {memory.location ? (
                <div>
                  <p className="text-soft">Location</p>
                  <p className="mt-1 font-semibold text-ink">{memory.location}</p>
                </div>
              ) : null}
              {memory.sourceLabel ? (
                <div>
                  <p className="text-soft">From</p>
                  <a
                    href={memory.source}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block font-semibold text-ink underline decoration-stone-300"
                  >
                    {memory.sourceLabel}
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          {memory.connectedTrail && memory.connectedTrail.length > 0 ? (
            <div className="rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-soft">Connected trail</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {memory.connectedTrail.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-ink/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </section>

      {related.length > 0 ? (
        <section className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-soft">Related</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">More from this trail</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {related.map((item) => (
              <MemoryCard key={item.id} memory={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function getContextRows(memory: Memory) {
  const customRows: Record<string, { label: string; value: string }[]> = {
    'metlife-concert': [
      { label: 'Venue', value: 'MetLife Stadium, East Rutherford' },
      { label: 'Timing', value: 'Saturday night' },
      { label: 'Ticket trend', value: 'Prices trending down since saved' },
      { label: 'Availability', value: 'Lower-bowl pairs still available' },
    ],
    'minimal-lamp': [
      { label: 'Store', value: 'IKEA' },
      { label: 'Product fit', value: 'Warm LED, matte black, small footprint' },
      { label: 'Price signal', value: 'Sale ends tonight' },
      { label: 'Matched with', value: 'Desk setup inspiration and warm lighting guide' },
    ],
    'blue-door-cafe': [
      { label: 'Location', value: 'Princeton, NJ' },
      { label: 'Weather', value: 'Clear and good for outdoor seating' },
      { label: 'Distance', value: 'Estimated 14 minutes away' },
      { label: 'Best paired with', value: 'Saved bookstore nearby' },
    ],
    'nyt-soup-recipe': [
      { label: 'Source', value: 'NYT Cooking' },
      { label: 'Cooking intent', value: 'Easy cold-weather dinner' },
      { label: 'Missing items', value: 'Cream and sourdough' },
      { label: 'Pairs with', value: 'Air fryer grilled cheese' },
    ],
    'stem-gift': [
      { label: 'Gift window', value: 'Birthday week coming up' },
      { label: 'Criteria match', value: 'Age 10, educational, under $40' },
      { label: 'Source', value: 'Amazon idea capture' },
      { label: 'Compared with', value: 'Lego robotics set and science museum kit' },
    ],
    'sleep-foundation': [
      { label: 'Source', value: 'Sleep Foundation' },
      { label: 'Pattern noticed', value: 'Saved around late-night browsing twice' },
      { label: 'Routine idea', value: '10:15 PM wind-down reminder' },
      { label: 'Connected with', value: 'Evening tea note and sleep tracker screenshot' },
    ],
    'cabin-weekend': [
      { label: 'Trip type', value: 'Quiet weekend reset' },
      { label: 'Best window', value: 'June 21–22' },
      { label: 'Drive time', value: 'Within 2 hours' },
      { label: 'Matched with', value: 'Lake hike bookmark and dog-friendly stay filter' },
    ],
    'human-ai-podcast': [
      { label: 'Source', value: 'Spotify podcast episode' },
      { label: 'Useful segment', value: 'Minute 18–24' },
      { label: 'Theme', value: 'Human judgment and AI-assisted action' },
      { label: 'Use case', value: 'Protogen case study narrative' },
    ],
  };

  return (
    customRows[memory.id] || [
      { label: 'Captured from', value: memory.capturedFrom || memory.sourceLabel || memory.type },
      { label: 'Collection', value: memory.collection },
    ]
  );
}