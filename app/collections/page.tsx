'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { sampleMemories, collections, Memory } from '../../lib/data';
import { MemoryCard } from '../../components/memory-card';

export default function CollectionsPage() {
  const [memories, setMemories] = useState<Memory[]>(sampleMemories);
  const [active, setActive] = useState('Events and Plans');

  useEffect(() => {
    window.localStorage.setItem('breadcrumbs-memories', JSON.stringify(sampleMemories));
    setMemories(sampleMemories);
  }, []);

  const collectionMemories = useMemo(
    () => memories.filter((memory) => memory.collection === active),
    [active, memories]
  );

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <section className="rounded-[2.5rem] border border-stone-200/80 bg-white p-8 shadow-sm lg:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              href="/"
              className="text-sm font-semibold text-soft transition hover:text-ink"
            >
              ← Back to home
            </Link>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-soft">
              Collections
            </p>

            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Organized by intent.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-8 text-soft">
              Browse the things you saved by what they were meant for — plans, purchases,
              gifts, recipes, health notes, and ideas Breadcrumbs can bring back when useful.
            </p>
          </div>

          <Link
            href="/add-memory"
            className="w-fit rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
          >
            Add something
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.32fr_0.68fr]">
        <aside className="rounded-[2rem] border border-stone-200/80 bg-white p-5 shadow-sm">
          <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-[0.24em] text-soft">
            Your collections
          </p>

          <div className="space-y-3">
            {collections.map((collection) => {
              const count = memories.filter((item) => item.collection === collection).length;
              const selected = active === collection;

              return (
                <button
                  key={collection}
                  onClick={() => setActive(collection)}
                  className={`w-full rounded-[1.5rem] px-5 py-4 text-left transition ${
                    selected
                      ? 'bg-amber-50 text-ink ring-1 ring-amber-200'
                      : 'bg-stone-50 text-ink hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{collection}</p>
                    <p className="text-xs text-soft">
                      {count} item{count === 1 ? '' : 's'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-soft">
                Selected trail
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">{active}</h2>
            </div>

            <p className="text-sm text-soft">
              Showing {collectionMemories.length} saved item
              {collectionMemories.length === 1 ? '' : 's'}
            </p>
          </div>

          {collectionMemories.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {collectionMemories.map((memory) => (
                <MemoryCard key={memory.id} memory={memory} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-stone-200/80 bg-stone-50 p-8">
              <p className="text-sm font-semibold text-ink">Nothing here yet.</p>
              <p className="mt-2 text-sm leading-6 text-soft">
                Once you save something into this collection, Breadcrumbs can enrich it with
                context, connections, and useful next steps.
              </p>
            </div>
          )}
        </main>
      </section>
    </div>
  );
}