import { asset } from "../utils/assets";

// ─── Video Showcase ─────────────────────────────────────────────
// Every video on the site is registered here. Nothing else needs to
// change: both the horizontal "Videos" strip and the video cards at the
// end of the Selected Work track read from this one array.
//
// ADDING A VIDEO
//   1. Drop the master file in `Project-Videos-originals/` (that folder is
//      git-ignored — the browser never downloads the full-size master).
//   2. Create the web copy + poster with the command in
//      `docs/customization.md` → "Adding a portfolio video".
//   3. Add one entry below.
//
// FIELDS
//   id           number, used for the 01 / 02 counter — keep it sequential
//   slug         unique kebab-case key
//   title        card headline
//   category     small label above the title
//   client       credited client / channel
//   year         shown in the player
//   duration     human-readable runtime shown on the card
//   orientation  'portrait' | 'landscape' — drives the card aspect ratio
//   file         base filename inside /public/project-videos (no extension)
//   description  one or two lines for the card and the player

export const VIDEOS = [
  {
    id: 1,
    slug: "inkpen-labs-ad-01",
    title: "Inkpen Labs — AI Ad 01",
    category: "AI Performance Advertising",
    client: "Inkpen Labs",
    year: "2026",
    duration: "0:57",
    orientation: "portrait",
    file: "inkpen-labs-ad-01",
    description:
      "Scripted and created end to end — concept, script, AI-generated visuals, edit, sound and captions, built as a Meta-ready vertical ad.",
  },
  {
    id: 2,
    slug: "inkpen-labs-ad-02",
    title: "Inkpen Labs — AI Ad 02",
    category: "AI Performance Advertising",
    client: "Inkpen Labs",
    year: "2026",
    duration: "0:46",
    orientation: "portrait",
    file: "inkpen-labs-ad-02",
    description:
      "The second Inkpen Labs script — a different hook and a different cut of the same production system, so both creatives could be tested against each other.",
  },
  {
    id: 3,
    slug: "myntra-corporate-video",
    title: "Myntra — Corporate Video",
    category: "Corporate Video",
    client: "Myntra",
    year: "2026",
    duration: "0:59",
    orientation: "portrait",
    file: "myntra-corporate-video",
    description:
      "An official Myntra corporate video delivered as a video content contractor — concept, production, footage clean-up and the final edit.",
  },
  {
    id: 4,
    slug: "myntra-stepathon",
    title: "Myntra Stepathon",
    category: "Brand Film",
    client: "Myntra",
    year: "2026",
    duration: "1:05",
    orientation: "landscape",
    file: "myntra-stepathon",
    description:
      "A landscape brand film cut from the Myntra production — paced and composed for a seated viewer rather than a feed.",
  },
];

// Resolved URLs, kept out of the hand-written entries above so the data stays
// readable and copy-pasteable.
export const VIDEO_ITEMS = VIDEOS.map((video) => ({
  ...video,
  src: asset(`/project-videos/${video.file}.mp4`),
  poster: asset(`/project-videos/posters/${video.file}.jpg`),
}));