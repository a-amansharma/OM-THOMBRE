/**
 * Remembers where the page was when a project case study opened.
 *
 * The Selected Work track is a GSAP pinned horizontal scroll driven by the
 * vertical scroll position, so restoring the vertical offset on close also puts
 * the cards back where the visitor left them. The browser's own restoration is
 * not enough: the modal used to pin `overflow: hidden` on <html>, which
 * collapses the document's scrollable height and clamps the offset to 0 as soon
 * as it is released.
 */

let savedScrollY = null;

const currentScrollY = () => {
  const lenis = window.lenisInstance;
  // Lenis drives the real scroll position, so read it first; it keeps tracking
  // the offset correctly even after its own rAF loop has been stopped.
  if (lenis && typeof lenis.scroll === 'number') return lenis.scroll;
  return window.scrollY;
};

export const rememberScroll = () => {
  savedScrollY = currentScrollY();
  return savedScrollY;
};

export const restoreScroll = async () => {
  if (savedScrollY === null) return;

  const target = savedScrollY;
  // Cleared before the await so a later open cannot re-apply a stale offset.
  savedScrollY = null;

  // The pinned pin-spacer is only re-measured after a refresh, and the refresh
  // itself reads the current scroll position — so let it settle before the
  // offset is written back, otherwise the pin is measured against 0.
  try {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    ScrollTrigger.refresh();
  } catch {
    // ScrollTrigger is optional here; the raw scroll restore still applies.
  }

  requestAnimationFrame(() => {
    const lenis = window.lenisInstance;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(target, { immediate: true, force: true });
    } else {
      window.scrollTo(0, target);
    }
  });
};