# breadcrumb.

**Save once. Act later.**

Breadcrumb is an AI-powered personal context engine that captures links, places, products, notes, events, and ideas — then quietly turns them into timely actions when the context becomes useful.

Live site: [breadcrumb-theta.vercel.app](https://breadcrumb-theta.vercel.app)

---

## What it does

Most saved content goes nowhere. A restaurant you meant to try, a product you almost bought, a gift idea you had in passing — all scattered across browser tabs, notes apps, and reminders that never surface at the right moment.

Breadcrumb is a single layer that captures information once, organizes it by intent, and resurfaces it when timing, location, or context makes it actionable.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Deployment | Vercel |

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
app/
  page.tsx              # Home feed — saved trail, action items, collections
  add-memory/           # Capture form for new memories
  collections/          # Collection browser
  memories/[slug]/      # Memory detail view with AI insights and connected trail
components/
  header.tsx            # Nav, notifications, user avatar
  memory-card.tsx       # Card with AI insight, suggested action, connected trail
  collection-card.tsx   # Collection tile with item count
  weather-card.tsx      # Location-aware weather panel
  weather-chip.tsx      # Inline weather badge on place cards
lib/
  data.ts               # Memory schema, collections, and sample data
  weather.ts            # Open-Meteo weather fetch
  suggestions.ts        # Context-aware day plan copy
```

---

## License

See [LICENSE.MD](LICENSE.MD).