'use client';

import Link from 'next/link';
import { useState } from 'react';
import { reminderItems } from '../../lib/data';

export default function RemindersPage() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200/80 bg-white p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-soft">Reminders</p>
            <h1 className="mt-2 text-3xl font-semibold text-ink">Gentle follow-ups for your memory vault.</h1>
          </div>
          <Link href="/" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-ink transition hover:border-amber-300">
            Home
          </Link>
        </div>
        <p className="text-sm leading-7 text-soft">Check things off when you’ve revisited them, without making the list feel heavy.</p>
      </div>

      <div className="space-y-3 rounded-[2rem] border border-slate-200/80 bg-white p-6">
        {reminderItems.map((item) => (
          <label key={item.id} className="flex cursor-pointer items-start gap-4 rounded-[1.5rem] border border-slate-200/80 bg-slate-50 px-5 py-4">
            <input
              type="checkbox"
              checked={!!completed[item.id]}
              onChange={() => setCompleted((current) => ({ ...current, [item.id]: !current[item.id] }))}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-ink focus:ring-ink"
            />
            <div className="grid gap-2">
              <p className={`text-sm font-semibold ${completed[item.id] ? 'text-slate-400 line-through' : 'text-ink'}`}>
                {item.label}
              </p>
              <p className="text-xs text-soft">{item.memoryTitle} · {item.dueDate}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
