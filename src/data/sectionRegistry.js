// ─── Section Registry ────────────────────────────────────────────
// Single source of truth for all navigable sections in the portfolio.
//
// Every part of the app that needs to know about sections
// (intent router, chat widget, navbar, system prompt) imports from here.
//
// To add a new section:
//   1. Add an entry to SECTION_REGISTRY below
//   2. Make sure the component renders an element with the matching elementId
//   3. The intent router and chat widget will automatically pick it up
//
// Fields:
//   - id:        Unique action identifier (used in intent router & chat widget)
//   - label:     Human-readable section name (used in system prompt context)
//   - elementId: DOM element ID to scroll to (must match the component's id prop)
//   - synonyms:  Words/phrases users might say to refer to this section.
//                Both Indonesian and English. Used for intent matching.
//                These are NOT exact-match keywords - the intent router uses
//                fuzzy scoring, so partial matches and variations work too.

export const SECTION_REGISTRY = [
  {
    id: 'scroll_to_hero',
    label: 'Home / Landing',
    elementId: null, // special case: scrolls to top (0)
    synonyms: [
      'home', 'atas', 'awal', 'landing', 'top',
      'ke atas', 'scroll atas', 'halaman utama', 'beranda',
      'paling atas', 'back to top', 'go up',
    ],
  },
  {
    id: 'scroll_to_about',
    label: 'About / Who Am I',
    elementId: 'about-section',
    synonyms: [
      'about', 'tentang', 'profil', 'profile', 'bio', 'biography',
      'siapa', 'who', 'diri', 'perkenalan', 'introduce', 'yourself',
      'who am i', 'who is', 'ceritakan tentang', 'kamu siapa',
      'background', 'latar belakang',
    ],
  },
  {
    id: 'scroll_to_projects',
    label: 'Selected Work / Projects',
    elementId: 'project-section',
    synonyms: [
      'project', 'projek', 'proyek', 'portfolio', 'karya',
      'work', 'case study', 'selected work', 'past work',
      'list project', 'daftar project', 'semua project', 'all project',
      'show project', 'lihat project', 'apa aja project',
    ],
  },
  {
    id: 'scroll_to_experience',
    label: 'Experience / Work History',
    elementId: 'experience-section',
    synonyms: [
      'experience', 'pengalaman', 'karir', 'career', 'kerja', 'work',
      'organisasi', 'riwayat', 'work history', 'pekerjaan',
      'magang', 'internship', 'experience log', 'career journey',
      'riwayat kerja', 'riwayat karir', 'professional',
    ],
  },
  {
    id: 'scroll_to_videos',
    label: 'Videos / Playable Work',
    elementId: 'videos-section',
    synonyms: [
      'video', 'videos', 'watch', 'play', 'playable', 'tonton',
      'showreel', 'reel', 'cuts', 'watch video', 'main videos',
      'video work', 'latest work', 'gue nonton', 'liat video',
    ],
  },
  {
    id: 'scroll_to_scale',
    label: 'Content Scale / Large-Scale Production',
    elementId: 'scale-section',
    synonyms: [
      'scale', 'volume', 'large scale', 'content scale', 'production',
      'bulk', 'quantity', 'seberapa banyak', 'jumlah konten',
      'content production', 'large-scale production', 'content operations',
    ],
  },
  {
    id: 'scroll_to_impact',
    label: 'Business Impact / Results',
    elementId: 'impact-section',
    synonyms: [
      'impact', 'results', 'business', 'bisnis', 'growth', 'pertumbuhan',
      'performance', 'kinerja', 'outcome', 'hasil', 'revenue', 'account',
      'increase', 'naik', 'performance results',
    ],
  },
  {
    id: 'scroll_to_tech',
    label: 'Creative Workflow / Process',
    elementId: 'tech-stack-section',
    synonyms: [
      'workflow', 'process', 'proses', 'approach', 'metode',
      'pipeline', 'step', 'langkah', 'creative process', 'how you work',
      'alur kerja', 'cara kerja', 'metode kerja',
    ],
  },
  {
    id: 'scroll_to_capabilities',
    label: 'Creative Skills / What I Do',
    elementId: 'capabilities-section',
    synonyms: [
      'capabilities', 'kemampuan', 'keahlian', 'bisa apa',
      'bidang', 'expertise', 'specialization', 'spesialisasi',
      'apa yang dikuasai', 'mampu apa', 'what can you do',
      'skill', 'skills', 'ability', 'able', 'creative skills',
    ],
  },
  {
    id: 'scroll_to_tools',
    label: 'Tools / Software',
    elementId: 'tools-section',
    synonyms: [
      'tools', 'software', 'aplikasi', 'app', 'editor', 'editing software',
      'what do you use', 'pakai apa', 'pake apa', 'tool',
      'video tools', 'design tools', 'ai tools',
    ],
  },
  {
    id: 'scroll_to_contact',
    label: 'Contact / Footer',
    elementId: 'contact-section',
    synonyms: [
      'kontak', 'contact', 'hubungi', 'email', 'hire',
      'reach out', 'linkedin', 'footer',
      'how to contact', 'cara hubungi', 'cara kontak',
      'sosial media', 'social media', 'connect',
      'rekrut', 'recruit', 'hire me',
    ],
  },
];

// ─── Derived Lookups (auto-generated from registry) ──────────────

/**
 * Map from action ID to DOM element ID.
 * Used by ChatWidget to know which element to scroll to.
 *
 * Example: { scroll_to_about: "about-section", ... }
 */
export const ACTION_TO_ELEMENT = Object.fromEntries(
  SECTION_REGISTRY
    .filter(s => s.elementId !== null)
    .map(s => [s.id, s.elementId])
);

/**
 * Get all section labels for use in system prompt context.
 * Returns a formatted string describing available sections.
 */
export function getSectionLabels() {
  return SECTION_REGISTRY
    .map(s => `- ${s.label}`)
    .join('\n');
}
