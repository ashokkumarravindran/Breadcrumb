export type MemoryType =
  | 'Link'
  | 'Place'
  | 'Photo'
  | 'Note'
  | 'Product'
  | 'Article'
  | 'Podcast'
  | 'Book'
  | 'Idea'
  | 'Screenshot'
  | 'Voice note'
  | 'Video';

export type Memory = {
  id: string;
  title: string;
  type: MemoryType;
  collection: string;
  tags: string[];
  notes: string;
  source?: string;
  sourceLabel?: string;
  imageUrl?: string;
  location?: string;
  reminder?: string;
  savedAt: string;
  coords?: { lat: number; lon: number };
  preview?: string;
};

export const collections = [
  'Quick capture',
  'Food and Restaurants',
  'Health Notes',
  'Things to Buy',
  'Books and Podcasts',
  'Gift Ideas',
  'Places to Visit',
  'Design Inspiration',
];

export const sampleMemories: Memory[] = [
  {
    id: 'blue-door-cafe',
    title: 'Café with the blue door',
    type: 'Place',
    collection: 'Food and Restaurants',
    tags: ['Lisbon', 'cafe', 'travel'],
    notes: 'Saved after seeing it in a travel vlog.',
    location: 'Lisbon, Portugal',
    savedAt: '2026-05-18T09:35:00.000Z',
    coords: { lat: 38.7223, lon: -9.1393 },
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'better-sleep',
    title: 'Article about better sleep routines',
    type: 'Article',
    collection: 'Health Notes',
    tags: ['sleep', 'routine', 'wellness'],
    notes: 'Practical evening habits worth revisiting.',
    source: 'https://example.com/sleep-routines',
    sourceLabel: 'example.com',
    preview: 'Quick wins for quiet evenings and better rest.',
    savedAt: '2026-05-20T14:10:00.000Z',
  },
  {
    id: 'minimal-lamp',
    title: 'Minimal desk lamp',
    type: 'Product',
    collection: 'Things to Buy',
    tags: ['home', 'design', 'lighting'],
    notes: 'Warm light, small footprint, good for bedside table.',
    source: 'https://example.com/minimal-lamp',
    sourceLabel: 'example.com',
    savedAt: '2026-05-22T11:20:00.000Z',
  },
  {
    id: 'attention-book',
    title: 'Book about attention and focus',
    type: 'Book',
    collection: 'Books and Podcasts',
    tags: ['book', 'focus', 'learning'],
    notes: 'Recommended in a podcast episode.',
    source: 'https://example.com/attention-book',
    sourceLabel: 'example.com',
    savedAt: '2026-05-24T08:50:00.000Z',
  },
  {
    id: 'gift-idea-child',
    title: 'Gift idea for a 10 year old',
    type: 'Idea',
    collection: 'Gift Ideas',
    tags: ['gift', 'kids', 'education'],
    notes: 'STEM puzzle kit with good reviews.',
    savedAt: '2026-05-26T16:10:00.000Z',
  },
  {
    id: 'mountain-cabin',
    title: 'Mountain cabin inspiration',
    type: 'Photo',
    collection: 'Places to Visit',
    tags: ['cabin', 'nature', 'weekend'],
    notes: 'Quiet weekend getaway idea.',
    savedAt: '2026-05-28T10:15:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'human-ai-podcast',
    title: 'Human AI collaboration podcast',
    type: 'Podcast',
    collection: 'Design Inspiration',
    tags: ['podcast', 'AI', 'design'],
    notes: 'Useful for future workshop references.',
    source: 'https://example.com/human-ai-podcast',
    sourceLabel: 'example.com',
    savedAt: '2026-05-30T12:05:00.000Z',
  },
  {
    id: 'bryant-park',
    title: 'Bryant Park Winter Market',
    type: 'Place',
    collection: 'Places to Visit',
    tags: ['New York', 'market', 'outdoors'],
    notes: 'A winter stroll with food stalls and warm drinks.',
    location: 'Bryant Park, New York',
    savedAt: '2026-05-12T15:40:00.000Z',
    coords: { lat: 40.7536, lon: -73.9832 },
  },
];

export type ReminderItem = {
  id: string;
  label: string;
  memoryTitle: string;
  dueDate: string;
};

export const reminderItems: ReminderItem[] = [
  {
    id: 'reminder-1',
    label: 'Check the article this weekend',
    memoryTitle: 'Article about better sleep routines',
    dueDate: 'May 25',
  },
  {
    id: 'reminder-2',
    label: 'Review the cabin inspiration',
    memoryTitle: 'Mountain cabin inspiration',
    dueDate: 'June 1',
  },
  {
    id: 'reminder-3',
    label: 'Save the lamp for the desk setup',
    memoryTitle: 'Minimal desk lamp',
    dueDate: 'June 8',
  },
];
