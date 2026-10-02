import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Play } from "lucide-react";
import { Gsap, GsapPresence } from "../utils/gsapAnimate";

const RATIO = {
  portrait: "aspect-[9/16]",
  landscape: "aspect-video",
};

const MAX_RATIO = {
  portrait: "max-h-[78vh] max-w-[min(92vw,30rem)]",
  landscape: "max-h-[78vh] max-w-[min(94vw,72rem)]",
};

/**
 * Click-to-play video lightbox.
 *
 * The <video> element only mounts while a video is selected, so nothing is
 * downloaded until a card is tapped — `preload="metadata"` keeps even the first
 * request small. The source is a web-optimised copy (see src/data/videoShowcase.js).
 */
export default function VideoPlayerModal({ video, onClose }) {
  const videoRef = useRef(null);
  const isOpen = Boolean(video);

  /* Freeze the page behind the lightbox and hand the scroll back on unmount,
     the same way the project case-study modal does. */
  useEffect(() => {
    if (!isOpen) return undefined;

    const lenis = window.lenisInstance;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    if (lenis && typeof lenis.stop === "function") lenis.stop();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (lenis && typeof lenis.start === "function") lenis.start();
    };
  }, [isOpen]);

  /* Escape closes. Arrow keys are left alone so the video's own controls can
     use them for scrubbing. */
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <GsapPresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`${video.title} — video player`}
        >
          <Gsap.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />

          <Gsap.div
            initial={{ opacity: 0, y: 26, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.75)]" />
                <span className="truncate font-mono text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-white/70">
                  {video.category}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close video"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 hover:bg-white hover:text-black"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className={`relative mx-auto w-full overflow-hidden rounded-lg border border-white/10 bg-black ${RATIO[video.orientation] ?? RATIO.portrait} ${MAX_RATIO[video.orientation] ?? MAX_RATIO.portrait}`}
            >
              <video
                ref={videoRef}
                key={video.slug}
                src={video.src}
                poster={video.poster}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="h-full w-full bg-black object-contain"
              />
            </div>

            <div className="pt-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.18em] text-lime-400">
                  NO.{String(video.id).padStart(2, "0")}
                </span>
                <span className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.18em] text-white/35">
                  {video.client} — {video.year} — {video.duration}
                </span>
              </div>
              <h3 className="mt-2.5 font-black uppercase leading-[1.05] tracking-tight text-white text-[clamp(1.5rem,4.5vw,2.5rem)]">
                {video.title}
              </h3>
              <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-white/55">
                {video.description}
              </p>
              <p className="mt-5 flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-white/30">
                <Play size={11} />
                Press esc to close
              </p>
            </div>
          </Gsap.div>
        </div>
      )}
    </GsapPresence>,
    document.body,
  );
}