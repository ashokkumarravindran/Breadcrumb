'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { sampleMemories, Memory } from '../../../lib/data';
import { WeatherChip } from '../../../components/weather-chip';

export default function MemoryDetailPage() {
  const params = useParams() as { slug?: string };
  const router = useRouter();
  const [memory, setMemory] = useState<Memory | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('breadcrumbs-memories');
    const list: Memory[] = stored ? JSON.parse(stored) : sampleMemories;
    const found = list.find((item) => item.id === params.slug);
    setMemory(found ?? null);
  }, [params.slug]);

  const related = useMemo(() => {
    if (!memory) return [];
    const stored = window.localStorage.getItem('breadcrumbs-memories');
    const list: Memory[] = stored ? (JSON.parse(stored) as Memory[]) : sampleMemories;
    return list.filter((item) => item.collection === memory.collection && item.id !== memory.id).slice(0, 3);
  }, [memory]);

  const handleShare = async () => {
    if (!memory) return;
    await navigator.clipboard.writeText(`${window.location.origin}/memories/${memory.id}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  if (!memory) {
    return (
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200/80 bg-white p-8">
        <p className="text-sm text-soft">Memory not found.</p>
        <button className="mt-4 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-ink" onClick={() => router.push('/')}>
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-6 rounded-[2rem] border border-slate-200/80 bg-white p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-soft">Memory detail</p>
            <h1 className="mt-3 text-3xl font-semibold text-ink">{memory.title}</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full border border-slate-200 px-4 py-2 text-sm text-ink transition hover:border-amber-300">Edit</button>
            <button className="rounded-full border border-slate-200 px-4 py-2 text-sm text-ink transition hover:border-amber-300">Archive</button>
            <button onClick={handleShare} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900">
              {copied ? 'Copied' : 'Share'}
            </button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[1.75rem] bg-slate-50 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-soft">Type</p>
            <p className="mt-2 text-sm font-semibold text-ink">{memory.type}</p>
          </div>
          <div className="rounded-[1.75rem] bg-slate-50 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-soft">Collection</p>
            <p className="mt-2 text-sm font-semibold text-ink">{memory.collection}</p>
          </div>
        </div>

        <div className="space-y-5 rounded-[1.75rem] bg-slate-50 p-6">
          <div>
            <p className="text-sm font-semibold text-ink">Notes</p>
            <p className="mt-2 text-sm leading-7 text-soft">{memory.notes}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-ink">Saved</p>
              <p className="mt-2 text-sm text-soft">{new Date(memory.savedAt).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Collection</p>
              <p className="mt-2 text-sm text-soft">{memory.collection}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {memory.location ? (
            <div className="rounded-[1.75rem] bg-slate-50 p-6">
              <p className="text-sm font-semibold text-ink">Location</p>
              <p className="mt-2 text-sm text-soft">{memory.location}</p>
              {memory.coords ? <div className="mt-4"><WeatherChip coords={memory.coords} /></div> : null}
            </div>
          ) : null}
          {memory.reminder ? (
            <div className="rounded-[1.75rem] bg-slate-50 p-6">
              <p className="text-sm font-semibold text-ink">Reminder</p>
              <p className="mt-2 text-sm text-soft">{memory.reminder}</p>
            </div>
          ) : null}
        </div>

        {memory.source ? (
          <div className="rounded-[1.75rem] bg-slate-50 p-6">
            <p className="text-sm font-semibold text-ink">Source</p>
            <a href={memory.source} target="_blank" rel="noreferrer" className="mt-2 block text-sm text-amber-700 underline">
              {memory.sourceLabel || memory.source}
            </a>
          </div>
        ) : null}
      </section>

      <aside className="space-y-6">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-soft">Related memories</p>
          <div className="mt-4 space-y-3">
            {related.length > 0 ? (
              related.map((item) => (
                <Link
                  key={item.id}
                  href={`/memories/${item.id}`}
                  className="block rounded-[1.5rem] border border-slate-200/80 bg-slate-50 px-4 py-4 text-sm text-ink transition hover:bg-slate-100"
                >
                  {item.title}
                </Link>
              ))
            ) : (
              <p className="text-sm text-soft">No related memories yet.</p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
