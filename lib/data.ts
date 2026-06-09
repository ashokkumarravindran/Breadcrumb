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
  capturedFrom?: string;
  captureContext?: string;
  aiInsight?: string;
  suggestedAction?: string;
  connectedTrail?: string[];
  actionLabel?: string;
};

export const collections = [
  'Quick capture',
  'Events and Plans',
  'Food and Restaurants',
  'Things to Buy',
  'Gift Ideas',
  'Health Notes',
  'Recipes',
  'Design Inspiration',
];

export const sampleMemories: Memory[] = [
  {
    id: 'metlife-concert',
    title: 'Taylor Swift concert at MetLife',
    type: 'Link',
    collection: 'Events and Plans',
    tags: ['concert', 'tickets', 'MetLife', 'music'],
    notes: 'Saved because I wanted to go, but did not want to keep checking ticket prices manually.',
    source: 'https://www.ticketmaster.com/',
    sourceLabel: 'Ticketmaster',
    preview: 'MetLife Stadium · East Rutherford · Saturday night',
    location: 'MetLife Stadium, NJ',
    savedAt: '2026-05-18T09:35:00.000Z',
    capturedFrom: 'Ticket listing',
    captureContext: 'Event date, venue, seat sections, and price range were saved from the listing.',
    aiInsight: 'Prices are trending down compared with when you saved it, and lower-bowl sections still have pairs available.',
    suggestedAction: 'You might want to check tickets tonight before weekend demand pushes prices up again.',
    connectedTrail: ['MetLife parking note', 'Dinner near Secaucus', 'Concert playlist'],
    actionLabel: 'Get tickets',
  },
  {
    id: 'blue-door-cafe',
    title: 'Café with the blue door',
    type: 'Place',
    collection: 'Food and Restaurants',
    tags: ['cafe', 'coffee', 'quiet', 'nearby'],
    notes: 'Saved because it looked like a quiet place for coffee, writing, and a slow afternoon.',
    location: 'Princeton, NJ',
    savedAt: '2026-05-20T14:10:00.000Z',
    coords: { lat: 40.3573, lon: -74.6672 },
    imageUrl:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    capturedFrom: 'Camera upload',
    captureContext: 'Saved from a street photo with location and time metadata attached.',
    aiInsight: 'Weather is clear, and this looks like a good window for an outdoor coffee stop.',
    suggestedAction: 'You might want to visit this afternoon and pair it with the bookstore you saved nearby.',
    connectedTrail: ['Princeton bookstore', 'Weekend writing ideas', 'Coffee roaster article'],
    actionLabel: 'Get directions',
  },
  {
    id: 'nyt-soup-recipe',
    title: 'Creamy tomato soup recipe',
    type: 'Article',
    collection: 'Recipes',
    tags: ['recipe', 'dinner', 'soup'],
    notes: 'Saved as an easy dinner idea for a cold evening.',
    source: 'https://cooking.nytimes.com/',
    sourceLabel: 'NYT Cooking',
    preview: 'Tomato soup with pantry staples and grilled cheese pairing.',
    savedAt: '2026-05-21T18:20:00.000Z',
    capturedFrom: 'Recipe page',
    captureContext: 'Ingredients, cooking time, and serving size were captured from the recipe.',
    aiInsight: 'You already have most of the ingredients from your saved grocery list.',
    suggestedAction: 'You might want to add cream and sourdough to your shopping list.',
    connectedTrail: ['Grocery list', 'Air fryer grilled cheese', 'Weeknight dinner ideas'],
    actionLabel: 'Add groceries',
  },
  {
    id: 'minimal-lamp',
    title: 'Minimal desk lamp',
    type: 'Product',
    collection: 'Things to Buy',
    tags: ['desk', 'lighting', 'home office'],
    notes: 'Saved while thinking about making the desk setup warmer and less cluttered.',
    source: 'https://www.ikea.com/us/en/',
    sourceLabel: 'IKEA',
    preview: 'Warm LED desk lamp · matte black · small footprint',
    savedAt: '2026-05-22T11:20:00.000Z',
    capturedFrom: 'Product page',
    captureContext: 'Price, color, dimensions, and product photo were saved from the listing.',
    aiInsight: 'This matches the desk setup references you saved. A similar lamp is cheaper, but this one fits the aesthetic better.',
    suggestedAction: 'You might want to review it before the sale ends tonight.',
    connectedTrail: ['Desk setup inspiration', 'Monitor light bar', 'Warm lighting guide'],
    actionLabel: 'Review options',
  },
  {
    id: 'stem-gift',
    title: 'STEM puzzle kit for a 10 year old',
    type: 'Idea',
    collection: 'Gift Ideas',
    tags: ['gift', 'kids', 'education', 'birthday'],
    notes: 'Saved as a birthday gift idea. Educational, hands-on, and not screen-based.',
    source: 'https://www.amazon.com/',
    sourceLabel: 'Amazon',
    preview: 'STEM puzzle kit · age 10+ · under $40',
    savedAt: '2026-05-26T16:10:00.000Z',
    capturedFrom: 'Quick note',
    captureContext: 'Captured after a friend mentioned it during a conversation.',
    aiInsight: 'Birthday week is coming up. This fits your saved gift pattern: age 10, educational, under $40.',
    suggestedAction: 'You might want to shortlist this with two other saved gift ideas before Friday.',
    connectedTrail: ['Lego robotics set', 'Science museum kit', 'Birthday reminder'],
    actionLabel: 'Shortlist gift',
  },
  {
    id: 'sleep-foundation',
    title: 'Better sleep routine',
    type: 'Article',
    collection: 'Health Notes',
    tags: ['sleep', 'routine', 'wellness'],
    notes: 'Saved to try a calmer evening routine before busy work weeks.',
    source: 'https://www.sleepfoundation.org/',
    sourceLabel: 'Sleep Foundation',
    preview: 'Simple evening habits that can support better sleep.',
    savedAt: '2026-05-24T08:50:00.000Z',
    capturedFrom: 'Health article',
    captureContext: 'The article, key tips, and suggested routine were saved from the web.',
    aiInsight: 'You saved this around late-night browsing twice. A wind-down reminder may help.',
    suggestedAction: 'You might want to set a 10:15 PM reminder for the next three weekdays.',
    connectedTrail: ['Focus book', 'Evening tea note', 'Sleep tracker screenshot'],
    actionLabel: 'Set reminder',
  },
  {
    id: 'cabin-weekend',
    title: 'Mountain cabin weekend',
    type: 'Photo',
    collection: 'Events and Plans',
    tags: ['travel', 'cabin', 'weekend'],
    notes: 'Saved as a quiet weekend getaway idea for when we need a slower reset.',
    source: 'https://www.airbnb.com/',
    sourceLabel: 'Airbnb',
    savedAt: '2026-05-28T10:15:00.000Z',
    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    capturedFrom: 'Image upload',
    captureContext: 'Captured from a cabin photo with weekend trip intent.',
    aiInsight: 'Two saved places match this vibe within a 2-hour drive. June 21–22 looks like the best weekend window.',
    suggestedAction: 'You might want to compare stays before weekend prices increase.',
    connectedTrail: ['Quiet weekend list', 'Lake hike bookmark', 'Dog-friendly stay filter'],
    actionLabel: 'Explore stays',
  },
  {
    id: 'human-ai-podcast',
    title: 'Human AI collaboration podcast',
    type: 'Podcast',
    collection: 'Design Inspiration',
    tags: ['AI', 'design', 'workshop'],
    notes: 'Saved as a reference for explaining how AI can support judgment, timing, and action.',
    source: 'https://open.spotify.com/',
    sourceLabel: 'Spotify',
    preview: 'People, judgment, trust, and AI systems working together.',
    savedAt: '2026-05-30T12:05:00.000Z',
    capturedFrom: 'Podcast episode',
    captureContext: 'Episode title, notes, and timestamp were saved for future workshop use.',
    aiInsight: 'This connects with three saved workshop notes. Minute 18–24 supports your human-in-the-loop framing.',
    suggestedAction: 'You might want to pull this into the Protogen case study narrative.',
    connectedTrail: ['Enterprise AI notes', 'Governance slide', 'Human judgment framework'],
    actionLabel: 'Use in deck',
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
    label: 'Check concert tickets',
    memoryTitle: 'Taylor Swift concert at MetLife',
    dueDate: 'Tonight',
  },
  {
    id: 'reminder-2',
    label: 'Review desk lamp sale',
    memoryTitle: 'Minimal desk lamp',
    dueDate: 'Today',
  },
  {
    id: 'reminder-3',
    label: 'Shortlist birthday gift',
    memoryTitle: 'STEM puzzle kit for a 10 year old',
    dueDate: 'This week',
  },
];