'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/collections' },
  { label: 'Reminders', href: '/reminders' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200/80 bg-white/95 sticky top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-4 text-ink transition hover:text-ink/80">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200 to-orange-200 text-white shadow-[0_22px_45px_rgba(251,191,36,0.12)]">
            <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 9h6m0 0l-2-2m2 2l-2 2" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 9v14" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 19h6m0 0l-2-2m2 2l-2 2" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 19V7" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-base font-semibold tracking-tight text-ink">Breadcrumbs</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${active ? 'text-ink' : 'text-soft hover:text-ink'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/add-memory" className="rounded-full border border-slate-200 bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900">
            Add memory
          </Link>
        </div>
      </div>
    </header>
  );
}
