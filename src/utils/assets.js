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

/**
 * Emit a right-sized card image for the requested render width.
 *
 * Card art can come from two CDNs, so each needs its own sizing transform:
 * Cloudinary takes automatic format/quality plus a width transform, while
 * StockSnap (CC0 photography) only publishes two pre-scaled variants, so small
 * viewports get 280h and everything else the 960w master.
 */
export const cardImgSrc = (originalUrl, width) => {
  try {
    if (!originalUrl || typeof originalUrl !== "string") return originalUrl;
    if (originalUrl.includes("/upload/")) {
      return originalUrl.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
    }
    const stockSnap = /^(https:\/\/cdn\.stocksnap\.io\/img-thumbs\/)\d+[wh]\/([A-Z0-9]+)\.jpg$/.exec(originalUrl);
    if (stockSnap) {
      return `${stockSnap[1]}${width <= 500 ? "280h" : "960w"}/${stockSnap[2]}.jpg`;
    }
    return originalUrl;
  } catch {
    return originalUrl;
  }
};
