// Card art is CC0 stock photography from StockSnap (stocksnap.io), chosen to
// sit quietly behind the existing grayscale + gradient treatment rather than
// compete with the typography. Every image is object-only: no people, faces or
// hands, so nothing reads as staged stock or synthetic. These are kept as
// placeholders and can be swapped for real project stills at any time.
// Topic per card:
//   1 production / studio            4 devotional / festival content
//   2 editing / post                 5 corporate / brand production
//   3 scale / output volume          6 marketing / digital branding
const STOCKSNAP = (id) => `https://cdn.stocksnap.io/img-thumbs/960w/${id}.jpg`;

export const PROJECT_META = [
  {
    id: 1,
    slug: "ai-performance-advertising",
    title: "AI Performance Advertising",
    category: "Inkpen Labs",
    description:
      "AI-driven Meta ad creatives built around hooks, scripts and performance signals.",
    color: "bg-lime-400",
    img: STOCKSNAP("A0737DFF83"), // Beetle Buggy
  },
  {
    id: 2,
    slug: "ai-micro-drama",
    title: "AI Video Production",
    category: "AI Production",
    description:
      "An AI-generated micro-drama: characters, scenes, visuals, edit, sound and delivery.",
    color: "bg-purple-400",
    img: STOCKSNAP("TAY8UPBESM"), // Motherboard Computer
  },
  {
    id: 3,
    slug: "large-scale-content",
    title: "Large-Scale Video Content",
    category: "Content Operations",
    description:
      "2,700+ assets across video statuses, static statuses, live and static wallpapers.",
    color: "bg-orange-400",
    img: STOCKSNAP("92E981EC6F"), // Antenna Satellite
  },
  {
    id: 4,
    slug: "daily-bhakti",
    title: "Daily Bhakti",
    category: "Devotional Content",
    description:
      "Marathi devotional storytelling produced with AI concepts, characters and editing.",
    color: "bg-blue-400",
    img: STOCKSNAP("PN7RVGLUUD"), // Technology Network
  },
  {
    id: 5,
    slug: "myntra-corporate-video",
    title: "Myntra",
    category: "Corporate Video",
    description:
      "Two official corporate video projects delivered as a contracted video creator.",
    color: "bg-pink-400",
    img: STOCKSNAP("0KAO4K0U1O"), // Building Skyscraper
  },
  {
    id: 6,
    slug: "real-estate-media",
    title: "Real Estate Media",
    category: "Promotional & Branding",
    description:
      "Promotional videos, social media marketing and digital branding for a real estate venture.",
    color: "bg-cyan-400",
    img: STOCKSNAP("5YE5ANA9FM"), // Mountains Peaks
  },
];

export const PROJECT_META_BY_SLUG = PROJECT_META.reduce((accumulator, item) => {
  accumulator[item.slug] = item;
  return accumulator;
}, {});
