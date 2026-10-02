import { useEffect, useRef, useState } from "react";
import { Gsap } from "../utils/gsapAnimate";
import { ArrowUpRight, Play } from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VIDEO_ITEMS } from "../data/videoShowcase";

const INDICATOR_CARD_WIDTH = 600;
const INDICATOR_GAP = 48;
const INDICATOR_INTRO_WIDTH = 500;

// Hanya register sekali untuk menghindari konflik
if (typeof window !== 'undefined' && !ScrollTrigger.isRegistered) {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectGallery({ onPlayVideo }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const activeProjectIndexRef = useRef(0);

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  /* Seeded from the same conditions the effect below re-checks, so phones
     never paint one frame of the desktop pinned layout (a 100dvh section
     with 96px track padding) before switching to the mobile strip. */
  const [enablePinnedScroll, setEnablePinnedScroll] = useState(() => {
    if (typeof window === 'undefined') return true;
    const isMobile = window.innerWidth < 1024;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !reducedMotion && !isMobile;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // GSAP pinned scroll only on desktop; mobile uses native horizontal scroll
    // to prevent vibration/shaking from touch events fighting GSAP transforms
    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMode = () => {
      const isMobile = window.innerWidth < 1024;
      setEnablePinnedScroll(!reducedMotionMedia.matches && !isMobile);
    };

    updateMode();

    if (reducedMotionMedia.addEventListener) reducedMotionMedia.addEventListener('change', updateMode);
    else reducedMotionMedia.addListener(updateMode);

    // Also listen for resize to switch between mobile/desktop mode
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateMode, 200);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (reducedMotionMedia.removeEventListener) reducedMotionMedia.removeEventListener('change', updateMode);
      else reducedMotionMedia.removeListener(updateMode);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Preload the first poster so the pinned track paints without a blank card
  useEffect(() => {
    const firstPoster = new Image();
    firstPoster.src = VIDEO_ITEMS[0]?.poster;
  }, []);

  /* This track is videos only — the six case-study cards live further down the
     page in a plain vertical grid, so nothing here navigates. The counter and
     the progress dots below index the video list. */
  const videos = VIDEO_ITEMS;
  const projectCount = videos.length;

  useEffect(() => {
    if (!enablePinnedScroll) {
      setMaxScroll(0);
      return;
    }

    const calc = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const sectionW = section.getBoundingClientRect().width;
      const total = track.scrollWidth - sectionW;
      const nextMaxScroll = Math.max(0, total);
      setMaxScroll((prevMaxScroll) => (prevMaxScroll === nextMaxScroll ? prevMaxScroll : nextMaxScroll));
    };

    calc();
    const t1 = setTimeout(calc, 250);
    const t2 = setTimeout(calc, 900);

    // Debounce resize untuk performa lebih baik
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        calc();
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Mobile: visualViewport fires when browser toolbar shows/hides (changes innerHeight)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    let ro;
    if (typeof ResizeObserver !== "undefined" && trackRef.current) {
      // Debounce ResizeObserver callback untuk menghindari loop error
      let roTimeout;
      ro = new ResizeObserver(() => {
        clearTimeout(roTimeout);
        roTimeout = setTimeout(() => {
          calc();
          ScrollTrigger.refresh();
        }, 100);
      });
      ro.observe(trackRef.current);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
      if (ro) ro.disconnect();
    };
  }, [enablePinnedScroll]);

  useEffect(() => {
    if (enablePinnedScroll) return;

    const container = mobileScrollRef.current;
    if (!container) return;

    const updateActiveByScroll = () => {
      const cards = container.querySelectorAll('[data-project-index]');
      if (!cards.length) return;

      const viewportCenter = container.scrollLeft + container.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card) => {
        const idx = Number(card.getAttribute('data-project-index') || 0);
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(viewportCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = idx;
        }
      });

      if (closestIndex !== activeProjectIndexRef.current) {
        activeProjectIndexRef.current = closestIndex;
        setActiveProjectIndex(closestIndex);
      }
    };

    updateActiveByScroll();
    container.addEventListener('scroll', updateActiveByScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', updateActiveByScroll);
    };
  }, [enablePinnedScroll]);

  useEffect(() => {
    if (!enablePinnedScroll) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    gsap.set(track, { x: 0 });
    activeProjectIndexRef.current = 0;
    setActiveProjectIndex(0);

    if (maxScroll <= 0) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = window.lenisInstance;

    let usingLenis = false;
    if (lenis && typeof lenis.scrollTo === "function") {
      usingLenis = true;

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length) lenis.scrollTo(value, { immediate: true });
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
      });

      ScrollTrigger.defaults({ scroller: document.documentElement });
    } else {
      ScrollTrigger.defaults({ scroller: window });
    }

    const ctx = gsap.context(() => {
      const setX = gsap.quickSetter(track, "x", "px");

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${maxScroll}`,
        pin: true,
        scrub: true,
        anticipatePin: 0.5,
        fastScrollEnd: false,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const current = self.progress * maxScroll;
          setX(-current);

          const nextActiveIndex = Math.max(
            0,
            Math.min(
              projectCount - 1,
              Math.floor((Math.max(0, current - INDICATOR_INTRO_WIDTH + 100)) / (INDICATOR_CARD_WIDTH + INDICATOR_GAP))
            )
          );

          if (nextActiveIndex !== activeProjectIndexRef.current) {
            activeProjectIndexRef.current = nextActiveIndex;
            setActiveProjectIndex(nextActiveIndex);
          }
        },
      });

      const refreshSoon = () => ScrollTrigger.refresh();
      window.addEventListener("load", refreshSoon);

      return () => {
        window.removeEventListener("load", refreshSoon);
        st.kill();
      };
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      if (usingLenis) {
        ScrollTrigger.scrollerProxy(document.documentElement, null);
        ScrollTrigger.defaults({ scroller: window });
      }
    };
  }, [enablePinnedScroll, maxScroll, projectCount]);

  /* ═══════════════════════════════════════════
     Desktop: GSAP horizontal pinned scroll
     Mobile:  Vertical stacked cards
     ═══════════════════════════════════════════ */

  // ── MOBILE LAYOUT ──
  if (!enablePinnedScroll) {
    return (
      <section ref={sectionRef} className="relative bg-neutral-900 overflow-hidden py-16 pb-20">
        {/* Section Header */}
        <div className="px-6 mb-10">
          <h2 className="text-[7vw] sm:text-5xl font-black text-white uppercase leading-[0.92] tracking-tight">
            <span className="text-lime-400">Videos</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-sm leading-6 max-w-sm">
            Actual cuts — AI ad creative, devotional and corporate video. Tap any card to play it in full.
          </p>
        </div>

        {/* Project Counter */}
        <div className="px-6 mb-6 flex items-center justify-between">
          <span className="font-mono text-xs text-white/30 uppercase tracking-[0.16em]">
            {String(activeProjectIndex + 1).padStart(2, '0')} / {String(projectCount).padStart(2, '0')}
          </span>
          <div className="flex gap-1.5">
            {videos.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${i === activeProjectIndex ? 'w-6 bg-lime-400' : 'w-1.5 bg-white/20'}`}
              />
            ))}
          </div>
        </div>

        {/* Horizontally scrollable card strip */}
        <div
          ref={mobileScrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 scrollbar-hide [-webkit-overflow-scrolling:touch] overscroll-x-contain [touch-action:pan-x_pan-y] pb-4"
        >
          {videos.map((video, index) => (
            <Gsap.div
              key={video.slug}
              id={`video-${video.slug}`}
              onClick={() => onPlayVideo?.(video)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") onPlayVideo?.(video); }}
              className="project-card group relative w-[80vw] shrink-0 snap-center overflow-hidden rounded-lg border border-white/10 bg-neutral-950 cursor-pointer active:scale-[0.98] transition-transform"
              data-project-index={index}
              style={{ WebkitTapHighlightColor: 'transparent', aspectRatio: '3/4' }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  draggable="false"
                  src={video.poster}
                  alt={`${video.title} — video still`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-75"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Play affordance */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-sm">
                  <Play size={22} fill="currentColor" className="ml-0.5" />
                </span>
              </div>

              <div className="absolute top-4 left-4 z-10">
                <span className="rounded-full bg-lime-400 px-2.5 py-1 font-mono text-[0.5625rem] font-bold uppercase tracking-[0.14em] text-black">
                  Video
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shadow-[0_0_6px_rgba(163,230,53,0.8)]" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-white/70">
                    {video.category}
                  </span>
                </div>
                <h3 className="text-2xl font-black uppercase text-white tracking-tight leading-[1.05]">
                  {video.title}
                </h3>

                {video.description && (
                  <p className="mt-2.5 text-[11px] font-mono leading-5 text-white/55 max-w-[34ch]">
                    {video.description}
                  </p>
                )}

                <div className="mt-3 flex items-center gap-2 text-lime-400">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] font-bold">
                    PLAY — {video.duration}
                  </span>
                </div>
              </div>
            </Gsap.div>
          ))}
          <div className="shrink-0 w-2" />
        </div>
      </section>
    );
  }

  // ── DESKTOP LAYOUT (GSAP horizontal pinned scroll) ──
  return (
    <section ref={sectionRef} className="relative bg-neutral-900 overflow-hidden h-[100dvh]">

      {/* Horizontal scroll track */}
      <div className="flex w-full h-[100dvh] items-center overflow-hidden">
        <Gsap.div
          ref={trackRef}
          className="flex gap-12 px-24"
        >
          {/* Intro Card */}
          <Gsap.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            /* 40vw is only wide enough for the 96px "Videos" lockup from
               ~1472px up. Below that the heading ran under the first video
               card (which paints over it), so the word was cut off. The floor
               keeps the 96px type identical on every desktop and only widens
               this intro column, which is the first item in a scrolling track. */
            className="flex flex-col justify-center shrink-0 h-[70vh] w-[40vw] min-w-[44rem]"
          >
            <h2 className="text-[clamp(2.75rem,5.2vw,6rem)] lg:text-[clamp(3rem,6vw,8rem)] font-black text-white uppercase leading-[0.92]">
              <span className="text-lime-400">Videos</span>
            </h2>
            <p className="mt-8 text-neutral-300 max-w-md text-lg leading-7">
              Actual cuts — AI ad creative, devotional and corporate video. Tap any card to play it in full.
            </p>
            <ArrowUpRight className="text-lime-400 w-24 h-24 mt-8" />
          </Gsap.div>

          {/* Video cards — playable, so they never navigate */}
          {videos.map((video, index) => (
            <Gsap.div
              key={video.slug}
              id={`video-${video.slug}`}
              onClick={() => onPlayVideo?.(video)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") onPlayVideo?.(video);
              }}
              className="project-card group relative h-[70vh] w-[45vw] shrink-0 overflow-hidden rounded-[4px] border border-white/10 bg-neutral-900 transition-all duration-500 hover:border-lime-400/50 hover:shadow-[0_0_40px_rgba(163,230,53,0.1)] active:scale-[0.98] cursor-pointer"
              data-project-index={index}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <div className="absolute inset-0 overflow-hidden bg-neutral-950">
                <img
                  draggable="false"
                  src={video.poster}
                  alt={`${video.title} — video still`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-85 transition-transform duration-1000 group-hover:scale-105 will-change-transform"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-95" />

              {/* Play affordance */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-lime-400 group-hover:bg-lime-400 group-hover:text-black">
                  <Play size={30} fill="currentColor" className="ml-1" />
                </span>
              </div>

              <div className="absolute left-10 top-8 z-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-3 py-1.5 font-mono text-[0.5625rem] font-bold uppercase tracking-[0.16em] text-black">
                  <Play size={10} fill="currentColor" />
                  Play Video — {video.duration}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
                <div className="flex justify-between items-end gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
                      <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white/80">
                        {video.category}
                      </span>
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-[1.1]">{video.title}</h3>

                    {video.description && (
                      <p className="mt-4 text-sm md:text-base text-white/60 max-w-[46ch] leading-relaxed">
                        {video.description}
                      </p>
                    )}
                  </div>

                  <div className="w-14 h-14 bg-white/10 border border-white/20 text-white flex items-center justify-center rounded-full shrink-0 group-hover:bg-lime-400 group-hover:text-black group-hover:border-lime-400 transition-all duration-300 shadow-lg">
                    <Play size={20} fill="currentColor" />
                  </div>
                </div>
              </div>

              <Gsap.div
                className="absolute top-0 right-0 p-8"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-start">
                  <span className="font-mono text-sm text-lime-400 font-bold mr-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">VID.</span>
                  <span className="font-mono text-5xl font-light text-white/20 tracking-[0.18em] group-hover:text-white/40 transition-colors duration-500">
                    {String(video.id).padStart(2, '0')}
                  </span>
                </div>
              </Gsap.div>
            </Gsap.div>
          ))}

          <div className="shrink-0 w-[10vw]"></div>
        </Gsap.div>
      </div>

      {/* Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {videos.map((_, index) => {
          const isActive = index === activeProjectIndex;
          return (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${isActive ? 'w-8 bg-lime-400' : 'w-2 bg-white/30'}`}
            />
          );
        })}
      </div>
    </section>
  );
}
