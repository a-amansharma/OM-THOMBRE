/**
 * Resolve a public-folder asset to a URL that respects Vite's `base`.
 *
 * Public assets (everything in /public) are copied verbatim at build time and
 * are NOT processed by Vite, so a literal "/portrait.png" stays absolute and
 * 404s whenever the site is served from a subpath (GitHub Pages project sites).
 * Importing BASE_URL and prefixing keeps those references correct in both cases.
 */
export const asset = (path) => {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${String(path).replace(/^\/+/, "")}`;
};
