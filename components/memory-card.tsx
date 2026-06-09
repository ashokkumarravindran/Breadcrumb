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
      className="group flex h-full min-h-[460px] flex-col overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white p-5 transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-stone-100 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-soft">
          {memory.type}
        </span>
        <span className="text-xs text-soft">{dateLabel}</span>
      </div>

      {memory.imageUrl ? (
        <div className="mb-5 overflow-hidden rounded-[1.5rem] bg-stone-100">
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <h3 className="text-xl font-semibold leading-7 text-ink">{memory.title}</h3>

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-soft">
        {memory.preview || memory.notes}
      </p>

      {memory.aiInsight ? (
        <div className="mt-5 rounded-[1.25rem] bg-amber-50/80 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-800/70">
            Insights
          </p>
          <p className="mt-2 text-sm leading-6 text-ink">{memory.aiInsight}</p>
        </div>
      ) : null}

      {memory.suggestedAction ? (
        <div className="mt-4">
          <p className="text-xs uppercase tracking-[0.22em] text-soft">
            You might want to
          </p>
          <p className="mt-2 text-sm leading-6 text-ink">{memory.suggestedAction}</p>
        </div>
      ) : null}

      {memory.connectedTrail && memory.connectedTrail.length > 0 ? (
        <div className="mt-5">
          <p className="text-xs uppercase tracking-[0.22em] text-soft">
            Connected trail
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {memory.connectedTrail.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs text-ink/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-auto pt-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm text-soft">
              {memory.location || memory.collection}
            </p>
            {memory.sourceLabel ? (
              <p className="mt-1 truncate text-xs text-soft">
                From {memory.sourceLabel}
              </p>
            ) : null}
          </div>

          <span className="shrink-0 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white">
            {memory.actionLabel || 'Open'}
          </span>
        </div>

        {memory.coords ? (
          <div className="mt-4">
            <WeatherChip coords={memory.coords} />
          </div>
        ) : null}
      </div>
    </Link>
  );
}