# Breadcrumb — Product Brief

**Save once. Act later.**

---

## 1. The problem

People save things constantly — restaurant recommendations, products they mean to buy, articles to read, gift ideas, event listings, recipes. They save them everywhere: browser bookmarks, notes apps, reminders, screenshots, voice memos, texts to themselves.

The problem is not capturing. It is resurfacing. Saved content almost never comes back at the right moment. The concert you bookmarked sells out. The recipe you saved never gets cooked. The gift idea surfaces three weeks after the birthday.

The deeper issue: there is no layer that connects these fragments and understands *when* they matter.

---

## 2. The concept

Breadcrumb is a personal context engine — not another note-taking tool or to-do list.

The core idea: capture anything once, in any form, from any source. Breadcrumb then holds it, finds the relationships across everything you have saved, and surfaces it when timing, location, or context makes it genuinely useful.

The name reflects the metaphor: you leave breadcrumbs as you move through life, and the system helps you follow them back to what matters.

**Design principle:** Breadcrumb should feel like a quiet, attentive layer — not a dashboard you have to check. It should interrupt you only when it has something worth saying.

---

## 3. Conceptualization

The product was conceived as part of the Protogen initiative, which explores how AI can augment everyday decision-making without requiring technical expertise from the end user.

Three tensions shaped the early design thinking:

- **Capture vs. recall.** Most tools optimize for capture. Breadcrumb optimizes for recall — specifically, for the moment when a saved item becomes relevant again.
- **Passive vs. proactive.** Rather than asking users to search, Breadcrumb is designed to push: it monitors saved content against time, location, price, and behavioral signals, then acts.
- **Structure vs. flexibility.** People save different kinds of things for different reasons. The data model needed to accommodate links, photos, notes, products, ideas, places, and more — without forcing users into rigid categories.

The information architecture was designed around a **Memory** object — a typed, enriched record of anything a user wants to remember — grouped into **Collections** organized by intent rather than format.

---

## 4. What is working now (v0.1 MVP)

The current build is a concept prototype / "art of the possible" demonstrator. All data is static mock data; no live integrations or backend exist yet.

### Home feed
- **Hero panel** — tagline, primary search, and CTAs to add a memory or browse collections
- **Location-aware weather panel** — uses the browser Geolocation API and Open-Meteo to fetch real weather; generates a context-aware day plan suggestion; surfaces a nearby saved place when location is available
- **Time-sensitive action items** — a curated list of items that need attention now (price drop, sale ending, upcoming birthday), with source context and a single CTA per item
- **Saved trail** — a responsive grid of Memory Cards showing everything the user has saved, filterable via a real-time search bar (searches title, notes, collection, location, and tags)
- **Collections panel** — tiles for each named collection with a live count of saved items

### Memory cards
Each card surfaces:
- Memory type badge (Link, Place, Product, Article, Podcast, Idea, Photo, etc.)
- Save date
- Optional image with hover zoom
- Title and preview/notes excerpt
- AI insight (contextual observation generated from the saved item)
- Suggested action ("You might want to…")
- Connected trail — up to 3 related items shown as chips
- Location or collection label, source attribution, and a primary action button
- Inline weather chip for place-type memories with coordinates

### Memory detail view (`/memories/[slug]`)
- Full context of the saved item including capture source, capture context, AI insight, suggested action, and connected trail

### Collections view (`/collections`)
- Browse all collections with item counts

### Add memory form (`/add-memory`)
- Form to capture a new memory (title, type, collection, notes, tags, location)

### Navigation
- Sticky header with logo, nav links (Home, Collections), notifications bell, settings, and user avatar
- Amber accent highlight on active nav item

### Tech
- Next.js 14 App Router, TypeScript, Tailwind CSS
- Deployed on Vercel
- Open-Meteo API for weather (no key required)
- Browser Geolocation API for location context

---

## 5. What is not yet built

The MVP deliberately excludes production functionality in order to keep the prototype focused on the UX concept:

- No backend, database, or user accounts
- No real AI inference — insights and suggestions are static mock strings
- No live integrations with external services
- No persistent state across sessions (localStorage is seeded with sample data on load)
- No push notifications
- No mobile-native experience

---

## 6. Planned features — next releases

### v0.2 — Persistence and real capture
- Backend with user auth (Supabase or similar)
- Real memory creation and storage (database-backed)
- Browser extension or share-sheet integration for one-tap save from any app or website
- Manual add-memory form wired to real storage
- Collections CRUD

### v0.3 — AI insights layer
- LLM-powered insight generation per memory (Claude API)
- Pattern detection across the saved trail (e.g., "you tend to save things and never act on them in this category")
- Suggested action generation based on memory type, timing, and connected items
- Connected trail inference — automatically linking related memories by topic, location, and behavior

### v0.4 — Integrations
- Apple Notes import
- Apple Reminders sync
- Google Keep import
- Amazon wishlist and order history
- Calendar event detection
- Email scanning for saved confirmations, bookings, and receipts
- Pocket / Instapaper import

### v0.5 — Proactive intelligence
- Push notifications triggered by time, location, or price signals
- Price tracking for saved products
- Event date monitoring for saved listings
- Location-aware nudges (e.g., you are near a saved restaurant)
- Scheduled reminders surfaced from saved items

### v1.0 — Production
- Natural language search across the full saved trail
- Cross-device sync
- Personalization (behavioral learning, preference signals)
- Automated task creation and action orchestration
- Partner integrations (Spotify, Airbnb, Ticketmaster, NYT Cooking, etc.)
- Mobile apps (iOS first)

---

## 7. Design references and inspiration

- **Notion** — flexible content blocks as a mental model for typed memory objects
- **Rewind.ai** — passive capture and temporal recall
- **Google Now / Pixel At a Glance** — proactive, context-aware surfacing without requiring a search
- **Superhuman** — speed and intentionality as a design value
- **Apple Shortcuts / Intelligent Suggestions** — behavioral inference from saved state
- **Raindrop.io** — visual, collection-based bookmark organization
- Human-in-the-loop AI framing from enterprise AI research (referenced in saved podcast: "Human AI collaboration")

---

## 8. Open questions

- What is the right moment to interrupt the user vs. let them discover on their own?
- How do we handle memory decay — things the user saved but no longer cares about?
- Should collections be user-defined, AI-inferred, or both?
- What is the right permission model for accessing a user's notes, calendar, and email?
- Is the primary surface a mobile app, a browser extension, or a web dashboard?

---

*This brief was last updated June 2026. It reflects the state of the prototype at v0.1.*
