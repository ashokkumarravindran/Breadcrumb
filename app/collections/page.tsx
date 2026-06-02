'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { sampleMemories, collections, Memory } from '../../lib/data';
import { MemoryCard } from '../../components/memory-card';

export default function CollectionsPage() {
  const [memories, setMemories] = useState<Memory[]>(sampleMemories);
  const [active, setActive] = useState(collections[0]);

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

  const collectionMemories = useMemo(
    () => memories.filter((memory) => memory.collection === active),
    [active, memories]
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200/80 bg-white p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-soft">Collections</p>
            <h1 className="mt-2 text-3xl font-semibold text-ink">Keep your themes calm and easy to scan.</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-ink transition hover:border-amber-300">
              Home
            </Link>
            <Link href="/add-memory" className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900">
              Add memory
            </Link>
          </div>
        </div>
        <p className="text-sm leading-7 text-soft">Select a collection to browse memory cards in a calm, visual layout.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.35fr_0.65fr]">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-5">
          <div className="space-y-3">
            {collections.map((collection) => {
              const count = memories.filter((item) => item.collection === collection).length;
              return (
                <button
                  key={collection}
                  onClick={() => setActive(collection)}
                  className={`w-full rounded-[1.5rem] px-5 py-4 text-left text-sm transition ${
                    active === collection ? 'bg-slate-100 text-ink' : 'bg-slate-50 text-soft hover:bg-slate-100'
                  }`}
                >
                  <div className="font-semibold">{collection}</div>
                  <div className="mt-1 text-xs">{count} item{count === 1 ? '' : 's'}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-5 rounded-[2rem] border border-slate-200/80 bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-soft">Selected collection</p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">{active}</h2>
            </div>
            <Link href="/add-memory" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-ink transition hover:border-amber-300">
              Add memory
            </Link>
          </div>

          <div className="space-y-4">
            {collectionMemories.length > 0 ? (
              collectionMemories.map((memory) => <MemoryCard key={memory.id} memory={memory} />)
            ) : (
              <p className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 px-5 py-6 text-sm text-soft">No memories saved here yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
