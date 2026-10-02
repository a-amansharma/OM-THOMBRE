import { useCallback, useEffect, useRef, useState } from "react";
import { Play, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Gsap } from "../utils/gsapAnimate";
import { VIDEO_ITEMS } from "../data/videoShowcase";

const CARD_ASPECT = {
  portrait: "aspect-[9/16]",
  landscape: "aspect-video",
};

/**
 * The video strip on the landing page.
 *
 * A native horizontal scroller rather than a second GSAP-pinned section: the
 * Selected Work track above already pins the page, and two pinned sections in
 * one document fight each other over the same vertical scroll. Native scroll
 * keeps this one independent of Lenis and of the pinned track, and gives
 * momentum scrolling on touch for free.
 */
export default function VideoShowcase({ onPlayVideo }) {
  const trackRef = useRef(null);
  const dragState = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const total = VIDEO_ITEMS.length;

  const syncScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollLeft(track.scrollLeft > 8);
    setCanScrollRight(track.scrollLeft < maxScroll - 8);

    /* The active card is whichever one sits closest to the left edge. */
    const card = track.querySelector("[data-video-index]");
    if (!card) return;
    const cardWidth = card.getBoundingClientRect().width + 20;
    const next = Math.min(total - 1, Math.max(0, Math.round(track.scrollLeft / cardWidth)));
    setActiveIndex((prev) => (prev === next ? prev : next));
  }, [total]);

  useEffect(() => {
    syncScrollState();
    const track = trackRef.current;
    if (!track) return undefined;

    track.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("resize", syncScrollState);

    /* Posters decode after mount, so the scrollable width grows slightly. */
    const settle = setTimeout(syncScrollState, 600);

    return () => {
      track.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("resize", syncScrollState);
      clearTimeout(settle);
    };
  }, [syncScrollState]);

  /* Shift + wheel, and vertical wheel over the strip, pan it sideways — the
     behaviour visitors expect from a horizontal track. */
  const handleWheel = useCallback((event) => {
    const track = trackRef.current;
    if (!track) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;

    event.preventDefault();
    track.scrollLeft += event.deltaY;
  }, []);

  const scrollByCard = useCallback((direction) => {
    const track = trackRef.current;
    const card = track?.querySelector("[data-video-index]");
    if (!track || !card) return;
    const step = card.getBoundingClientRect().width + 20;
    track.scrollTo({ left: track.scrollLeft + step * direction, behavior: "smooth" });
  }, []);

  /* Click-and-drag panning for fine pointers; touch already scrolls natively. */
  const handlePointerDown = (event) => {
    if (event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    dragState.current = { startX: event.clientX, startScroll: track.scrollLeft, moved: false };
  };

  const handlePointerMove = (event) => {
    const drag = dragState.current;
    const track = trackRef.current;
    if (!drag || !track) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 4) drag.moved = true;
    track.scrollLeft = drag.startScroll - delta;
  };

  const endDrag = () => {
    dragState.current = null;
  };

  return (
    <section id="videos-section" className="relative w-full overflow-hidden bg-[#FAF9F6] py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 md:px-10">
        <Gsap.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 border-t border-black/10 pt-8 md:flex-row md:items-end md:justify-between md:gap-10"
        >
          <div>
            <span className="flex items-center gap-2 font-mono text-[0.625rem] font-bold uppercase tracking-[0.2em] text-black/40">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
              {String(total).padStart(2, "0")} Videos — Playable
            </span>
            <h2 className="mt-4 text-[clamp(2.25rem,7vw,4.5rem)] font-black uppercase leading-[0.92] tracking-tight text-black">
              Latest <span className="text-transparent" style={{ WebkitTextStroke: "2px black" }}>Work</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-black/60 md:text-lg">
              Actual cuts — AI ad creative and Myntra brand video. Tap any card to play it in full.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-black/45">
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="text-black/20"> / </span>
              {String(total).padStart(2, "0")}
            </span>
            <div className="hidden items-center gap-2 md:flex">
              <button
                onClick={() => scrollByCard(-1)}
                disabled={!canScrollLeft}
                aria-label="Previous videos"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={() => scrollByCard(1)}
                disabled={!canScrollRight}
                aria-label="Next videos"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </Gsap.div>
      </div>

      {/* Full-bleed track so cards can run past the gutter on wide screens. */}
      <Gsap.div
        ref={trackRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 scrollbar-hide [-webkit-overflow-scrolling:touch] overscroll-x-contain [touch-action:pan-x_pan-y] md:mt-12 md:gap-6 md:px-10"
      >
        {VIDEO_ITEMS.map((video, index) => (
          <Gsap.div
            key={video.slug}
            data-video-index={index}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: Math.min(index, 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="w-[74vw] max-w-[19rem] shrink-0 snap-start sm:w-[46vw] md:w-[22vw] lg:w-[19rem]"
          >
            <button
              onClick={() => onPlayVideo?.(video)}
              className="group relative block w-full overflow-hidden rounded-lg border border-black/10 bg-black text-left shadow-sm transition-all duration-500 hover:border-black/30 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.55)]"
            >
              <div className={`relative w-full overflow-hidden ${CARD_ASPECT[video.orientation] ?? CARD_ASPECT.portrait}`}>
                <img
                  src={video.poster}
                  alt={`${video.title} — video still`}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  draggable="false"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

                {/* Play affordance */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-lime-400 group-hover:bg-lime-400 group-hover:text-black md:h-16 md:w-16">
                    <Play size={22} fill="currentColor" className="ml-0.5" />
                  </span>
                </div>

                <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[0.625rem] font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
                  {video.duration}
                </span>
                <span className="absolute left-3 top-3 font-mono text-[0.625rem] font-bold uppercase tracking-[0.14em] text-white/50">
                  NO.{String(video.id).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 bg-white p-4 md:p-5">
                <div className="min-w-0">
                  <span className="font-mono text-[0.5625rem] font-bold uppercase tracking-[0.18em] text-black/40">
                    {video.category}
                  </span>
                  <h3 className="mt-2 text-[0.9375rem] font-black uppercase leading-[1.15] tracking-tight text-black md:text-base">
                    {video.title}
                  </h3>
                </div>
                <ArrowUpRight
                  size={20}
                  className="mt-1 shrink-0 text-black/25 transition-all duration-300 group-hover:rotate-45 group-hover:text-black"
                />
              </div>
            </button>
          </Gsap.div>
        ))}

        <div className="w-2 shrink-0 md:w-6" aria-hidden="true" />
      </Gsap.div>

      {/* Progress rail mirrors the track position. */}
      <div className="mx-auto mt-4 w-full max-w-6xl px-6 sm:px-8 md:px-10">
        <div className="h-px w-full bg-black/10">
          <div
            className="h-px bg-black transition-[width] duration-300 ease-out"
            style={{
              width: `${((activeIndex + 1) / total) * 100}%`,
            }}
          />
        </div>
        <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-black/35">
          More videos added as they go live
        </p>
      </div>
    </section>
  );
}