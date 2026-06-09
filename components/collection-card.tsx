const collectionMeta: Record<string, { label: string; accent: string }> = {
  'Quick capture': { label: 'Inbox', accent: 'bg-stone-100' },
  'Food and Restaurants': { label: 'Food', accent: 'bg-orange-100' },
  'Health Notes': { label: 'Health', accent: 'bg-emerald-100' },
  'Things to Buy': { label: 'Buy', accent: 'bg-amber-100' },
  'Books and Podcasts': { label: 'Learn', accent: 'bg-blue-100' },
  'Gift Ideas': { label: 'Gift', accent: 'bg-pink-100' },
  'Places to Visit': { label: 'Places', accent: 'bg-sky-100' },
  'Design Inspiration': { label: 'Design', accent: 'bg-violet-100' },
};

export function CollectionCard({ title, count }: { title: string; count: number }) {
  const meta = collectionMeta[title] ?? { label: 'Memory', accent: 'bg-stone-100' };

  return (
    <div className="group rounded-3xl border border-stone-200/80 bg-white p-5 transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold text-ink ${meta.accent}`}>
          {meta.label}
        </span>
        <span className="text-xs text-soft">{count} item{count === 1 ? '' : 's'}</span>
      </div>

      <p className="text-base font-semibold text-ink">{title}</p>
      <p className="mt-2 text-sm leading-6 text-soft">
        A calm space for everything you may want to find again.
      </p>
    </div>
  );
}