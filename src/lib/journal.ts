export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  cover: string;
  body: string[];
};

export const posts: JournalPost[] = [
  {
    slug: "a-simple-v60-recipe",
    title: "A simple V60 recipe we actually use at home",
    excerpt:
      "Three things matter more than the rest: a fresh grind, water just off the boil, and paying attention.",
    date: "March 14, 2026",
    category: "Brew guide",
    cover: "https://images.unsplash.com/photo-1542367597-8849eb950fd8?auto=format&fit=crop&w=1600&q=80",
    body: [
      "There is a quiet pleasure in making a cup of coffee well. Not perfectly — well. The difference is the one we keep chasing.",
      "Use 15 grams of coffee to 250 grams of water. Bloom with 50 grams for 40 seconds. Pour in slow, concentric circles until you reach 250. Aim to finish around 3:30.",
      "If the cup is muddy, grind coarser. If it's thin, grind finer. That's the entire conversation.",
    ],
  },
  {
    slug: "harvest-notes-from-guji",
    title: "Harvest notes from Guji",
    excerpt:
      "A short letter from the highlands of southern Ethiopia, written between drying beds and rain.",
    date: "February 02, 2026",
    category: "Origin",
    cover: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=1600&q=80",
    body: [
      "We arrived in Hambela on a Tuesday, a few weeks earlier than last year. The cherries were a little ahead of schedule and the air smelled like wet stone.",
      "Our producers had built a new set of raised beds — more even drying, fewer defects. It is the kind of small, expensive decision that makes its way into the cup six months later.",
    ],
  },
  {
    slug: "what-seasonal-actually-means",
    title: "What 'seasonal' actually means in coffee",
    excerpt:
      "Coffee is fruit. Fruit has a season. We try to respect that, even when it's inconvenient.",
    date: "January 12, 2026",
    category: "Philosophy",
    cover: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80",
    body: [
      "Once a coffee is harvested, the clock starts. It tastes best in the months immediately after roasting, and the green itself peaks in the year after harvest.",
      "So our menu changes. Kenyas in late winter, Ethiopias through spring, Centrals into autumn. If a coffee disappears from the shop, it's because we'd rather not sell it past its window.",
    ],
  },
  {
    slug: "espresso-at-home",
    title: "Espresso at home, without losing your mind",
    excerpt:
      "A short, kind guide to dialling in espresso in a domestic kitchen — without the rabbit hole.",
    date: "December 04, 2025",
    category: "Brew guide",
    cover: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=1600&q=80",
    body: [
      "Start with a 1:2 ratio: 18 grams in, 36 grams out, in roughly 28 seconds. Taste it. Adjust one variable at a time.",
      "If it's sour and fast, grind finer. If it's bitter and slow, grind coarser. Everything else is detail.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
