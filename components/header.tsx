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
        <Link href="/" className="flex items-center gap-3 text-ink transition hover:text-ink/80">
          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-ink">
            <svg viewBox="0 0 36 24" className="h-4 w-12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12C5 8 8 7 12 8" stroke="#6B5B4B" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M14 10C16.5 10.5 18 12 19 14" stroke="#6B5B4B" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="4" cy="12" r="1.7" fill="#6B5B4B" />
              <circle cx="12" cy="8" r="1.7" fill="#6B5B4B" />
              <circle cx="19" cy="14" r="1.7" fill="#6B5B4B" />
            </svg>
            Breadcrumbs
          </span>
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
