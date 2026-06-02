import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/header';

export const metadata: Metadata = {
  title: 'Breadcrumbs',
  description: 'A personal memory vault for things you don’t want to forget.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-canvas text-ink">
          <Header />
          <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
