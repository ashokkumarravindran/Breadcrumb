'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/collections' },
];

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M15 17H9m9-2v-4.5a6 6 0 0 0-12 0V15l-1.5 2h15L18 15Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 20a2.2 2.2 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M19 13.5v-3l-2.1-.5a7.5 7.5 0 0 0-.8-1.9l1.1-1.8-2.1-2.1-1.8 1.1a7.5 7.5 0 0 0-1.9-.8L10.9 2h-3l-.5 2.1a7.5 7.5 0 0 0-1.9.8L3.7 3.8 1.6 5.9l1.1 1.8a7.5 7.5 0 0 0-.8 1.9L0 10.1v3l2.1.5a7.5 7.5 0 0 0 .8 1.9l-1.1 1.8 2.1 2.1 1.8-1.1a7.5 7.5 0 0 0 1.9.8l.5 2.1h3l.5-2.1a7.5 7.5 0 0 0 1.9-.8l1.8 1.1 2.1-2.1-1.1-1.8a7.5 7.5 0 0 0 .8-1.9l1.9-.1Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2 1)"
      />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-canvas/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-4 text-ink transition hover:text-ink/80">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200 to-orange-200 text-lg font-bold text-ink shadow-sm">
            B
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
                className={`text-sm font-medium transition ${
                  active ? 'text-ink' : 'text-soft hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-soft transition hover:border-amber-200 hover:text-ink"
          >
            <BellIcon />
          </button>

          <button
            type="button"
            aria-label="Settings"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-soft transition hover:border-amber-200 hover:text-ink"
          >
            <SettingsIcon />
          </button>

          <button
            type="button"
            aria-label="User profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white shadow-sm transition hover:bg-slate-900"
          >
            AK
          </button>
        </div>
      </div>
    </header>
  );
}