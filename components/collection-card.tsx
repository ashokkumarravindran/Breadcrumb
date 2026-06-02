export function CollectionCard({ title, count }: { title: string; count: number }) {
  return (
    <div className="group rounded-3xl border border-slate-200/80 bg-white p-5 transition hover:border-amber-200">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-3 text-xs text-soft">{count} saved item{count === 1 ? '' : 's'}</p>
    </div>
  );
}
