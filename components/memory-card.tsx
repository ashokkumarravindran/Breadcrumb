import Link from 'next/link';
import { Memory } from '../lib/data';
import { WeatherChip } from './weather-chip';

export function MemoryCard({ memory }: { memory: Memory }) {
  const dateLabel = new Date(memory.savedAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <Link
      href={`/memories/${memory.id}`}
      className="group block rounded-[2rem] border border-slate-200/80 bg-white p-5 transition hover:border-amber-200"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-soft">
          {memory.type}
        </span>
        <span className="text-xs text-soft">{dateLabel}</span>
      </div>

      {memory.imageUrl ? (
        <div className="mb-4 overflow-hidden rounded-[1.5rem] bg-slate-100">
          <img src={memory.imageUrl} alt={memory.title} className="h-52 w-full object-cover" />
        </div>
      ) : memory.source ? (
        <div className="mb-4 rounded-[1.5rem] border border-slate-200/80 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-ink">{memory.sourceLabel || memory.source}</p>
          {memory.preview ? <p className="mt-2 text-sm text-soft line-clamp-2">{memory.preview}</p> : null}
        </div>
      ) : null}

      <h3 className="text-lg font-semibold leading-7 text-ink">{memory.title}</h3>
      <p className="mt-3 text-sm leading-7 text-soft line-clamp-3">{memory.notes}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-soft">
        {memory.location ? <span>{memory.location}</span> : <span>{memory.collection}</span>}
        <span>{dateLabel}</span>
      </div>

      {memory.coords ? (
        <div className="mt-4">
          <WeatherChip coords={memory.coords} />
        </div>
      ) : null}
    </Link>
  );
}
