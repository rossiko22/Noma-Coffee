export type Product = {
  slug: string;
  name: string;
  origin?: string;
  category: "Single-Origin" | "Blends" | "Decaf" | "Brew Gear" | "Merch";
  price: number;
  notes: string[];
  description: string;
  details?: { process?: string; altitude?: string; roast?: string; variety?: string };
  image: string;
  imageAlt: string;
  gallery?: string[];
  badge?: string;
};

const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export const products: Product[] = [
  {
    slug: "ethiopia-guji",
    name: "Ethiopia Guji",
    origin: "Hambela, Guji",
    category: "Single-Origin",
    price: 22,
    notes: ["Jasmine", "Peach", "Bergamot"],
    badge: "New season",
    description:
      "A washed Guji that drinks like a clear morning — floral, bright, and almost tea-like. Picked at altitude on small family lots and roasted just enough to let the fruit speak.",
    details: { process: "Washed", altitude: "2,050 masl", roast: "Light", variety: "Heirloom" },
    image: U("photo-1587734195503-904fca47e0e9"),
    imageAlt: U("photo-1611854779393-1b2da9d400fe"),
    gallery: [U("photo-1587734195503-904fca47e0e9"), U("photo-1611854779393-1b2da9d400fe"), U("photo-1442550528053-c431ecb55509")],
  },
  {
    slug: "colombia-huila",
    name: "Colombia Huila",
    origin: "Pitalito, Huila",
    category: "Single-Origin",
    price: 21,
    notes: ["Red apple", "Caramel", "Dark cocoa"],
    description:
      "A rounded, sweet Colombia from the Acevedo family. Honey-like body, a quiet acidity, and a finish that lingers like baked fruit.",
    details: { process: "Washed", altitude: "1,720 masl", roast: "Medium-light", variety: "Caturra, Castillo" },
    image: U("photo-1559525839-d9acfd0e85b3"),
    imageAlt: U("photo-1559056199-641a0ac8b55e"),
    gallery: [U("photo-1559525839-d9acfd0e85b3"), U("photo-1559056199-641a0ac8b55e"), U("photo-1442550528053-c431ecb55509")],
  },
  {
    slug: "kenya-nyeri",
    name: "Kenya Nyeri",
    origin: "Nyeri",
    category: "Single-Origin",
    price: 24,
    notes: ["Blackcurrant", "Tomato leaf", "Cane sugar"],
    description:
      "Loud, juicy, unmistakably Kenyan. A washed SL28/SL34 lot with the kind of acidity that wakes a room up.",
    details: { process: "Washed", altitude: "1,800 masl", roast: "Light", variety: "SL28, SL34" },
    image: U("photo-1611854779393-1b2da9d400fe"),
    imageAlt: U("photo-1442550528053-c431ecb55509"),
    gallery: [U("photo-1611854779393-1b2da9d400fe"), U("photo-1442550528053-c431ecb55509"), U("photo-1495474472287-4d71bcdd2085")],
  },
  {
    slug: "guatemala-huehue",
    name: "Guatemala Huehuetenango",
    origin: "Huehuetenango",
    category: "Single-Origin",
    price: 22,
    notes: ["Orange", "Honey", "Cocoa nib"],
    description:
      "Grown high in the mountains of north-western Guatemala. A balanced, sweet cup with a soft citrus lift.",
    details: { process: "Washed", altitude: "1,900 masl", roast: "Medium-light", variety: "Bourbon, Caturra" },
    image: U("photo-1495474472287-4d71bcdd2085"),
    imageAlt: U("photo-1587049352846-4a222e784d38"),
    gallery: [U("photo-1495474472287-4d71bcdd2085"), U("photo-1587049352846-4a222e784d38")],
  },
  {
    slug: "house-blend",
    name: "House Blend",
    origin: "Brazil & Colombia",
    category: "Blends",
    price: 19,
    badge: "Bestseller",
    notes: ["Milk chocolate", "Hazelnut", "Brown sugar"],
    description:
      "Our daily cup. Built to be forgiving — equally good as a pour-over, an espresso, or a quiet flat white at the kitchen counter.",
    details: { process: "Natural & Washed", roast: "Medium" },
    image: U("photo-1559056199-641a0ac8b55e"),
    imageAlt: U("photo-1497935586351-b67a49e012bf"),
    gallery: [U("photo-1559056199-641a0ac8b55e"), U("photo-1497935586351-b67a49e012bf")],
  },
  {
    slug: "northbound-espresso",
    name: "Northbound Espresso",
    origin: "Brazil, Ethiopia, Guatemala",
    category: "Blends",
    price: 20,
    notes: ["Dark cocoa", "Toffee", "Stone fruit"],
    description:
      "A three-origin espresso blend dialled in over a year of pulls. Dense crema, a long sweet finish, and just enough fruit to hold its own under milk.",
    details: { roast: "Medium-dark" },
    image: U("photo-1510707577719-ae7c14805e3a"),
    imageAlt: U("photo-1511920170033-f8396924c348"),
    gallery: [U("photo-1510707577719-ae7c14805e3a"), U("photo-1511920170033-f8396924c348")],
  },
  {
    slug: "decaf-brazil",
    name: "Decaf Brazil",
    origin: "Cerrado",
    category: "Decaf",
    price: 19,
    notes: ["Almond", "Milk chocolate", "Vanilla"],
    description:
      "Sugarcane EA-decaffeinated. All the comfort of an after-dinner cup with none of the wake-up call.",
    details: { process: "Sugarcane EA", roast: "Medium" },
    image: U("photo-1497935586351-b67a49e012bf"),
    imageAlt: U("photo-1559056199-641a0ac8b55e"),
    gallery: [U("photo-1497935586351-b67a49e012bf"), U("photo-1559056199-641a0ac8b55e")],
  },
  {
    slug: "v60-dripper",
    name: "Hario V60 Dripper",
    category: "Brew Gear",
    price: 28,
    notes: ["Ceramic", "Size 02", "For 1–4 cups"],
    description:
      "The dripper we reach for most mornings. Even extraction, clean cup, and a ritual that takes about four minutes.",
    image: U("photo-1542181961-9590d0c79dab"),
    imageAlt: U("photo-1497935586047-9242eb4fc795"),
    gallery: [U("photo-1542181961-9590d0c79dab"), U("photo-1497935586047-9242eb4fc795")],
  },
  {
    slug: "hand-grinder",
    name: "1Zpresso Hand Grinder",
    category: "Brew Gear",
    price: 165,
    notes: ["Stainless steel burrs", "Pour-over to espresso"],
    description:
      "A precise, hand-held grinder built to last a decade. Adjusts cleanly from filter to espresso fineness.",
    image: U("photo-1497515114629-f71d768fd07c"),
    imageAlt: U("photo-1542181961-9590d0c79dab"),
    gallery: [U("photo-1497515114629-f71d768fd07c"), U("photo-1542181961-9590d0c79dab")],
  },
  {
    slug: "chemex-6cup",
    name: "Chemex 6-Cup",
    category: "Brew Gear",
    price: 52,
    notes: ["Borosilicate glass", "Filter brewer"],
    description:
      "Slow, clean, ceremonial. The brewer to pull out on a Sunday morning with people you like.",
    image: U("photo-1497935586047-9242eb4fc795"),
    imageAlt: U("photo-1542181961-9590d0c79dab"),
    gallery: [U("photo-1497935586047-9242eb4fc795"), U("photo-1542181961-9590d0c79dab")],
  },
  {
    slug: "tote-bag",
    name: "Canvas Tote",
    category: "Merch",
    price: 24,
    notes: ["Heavy 12oz canvas", "Natural"],
    description:
      "A quiet tote. Carries two kilos of beans, a book, and a baguette — which is most of what we ask of a bag.",
    image: U("photo-1591561954557-26941169b49e"),
    imageAlt: U("photo-1544816155-12df9643f363"),
    gallery: [U("photo-1591561954557-26941169b49e"), U("photo-1544816155-12df9643f363")],
  },
  {
    slug: "ceramic-cup",
    name: "Stoneware Cup",
    category: "Merch",
    price: 32,
    notes: ["180ml", "Hand-thrown in Copenhagen"],
    description:
      "Made by a small studio twenty minutes from the roastery. Each one slightly different, all of them honest.",
    image: U("photo-1514228742587-6b1558fcca3d"),
    imageAlt: U("photo-1511920170033-f8396924c348"),
    gallery: [U("photo-1514228742587-6b1558fcca3d"), U("photo-1511920170033-f8396924c348")],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
