import { useEffect, useState, useCallback, useRef } from 'react';
import { Gsap, GsapPresence } from '../utils/gsapAnimate';
import { createPortal } from 'react-dom';
import { X, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import ProfileStory from './profile/ProfileStory';
import { asset } from '../utils/assets';

/* ─── Showcase gallery ───────── */
const galleryImages = [
    { src: asset('/showcase/showcase-1.jpg'), alt: 'Selected work — Om Thombre' },
    { src: asset('/showcase/showcase-2.jpg'), alt: 'Selected work — Om Thombre' },
    { src: asset('/showcase/showcase-3.jpg'), alt: 'Selected work — Om Thombre' },
    { src: asset('/showcase/showcase-4.jpg'), alt: 'Selected work — Om Thombre' },
    { src: asset('/showcase/showcase-5.jpg'), alt: 'Selected work — Om Thombre' },
    { src: asset('/showcase/showcase-6.jpg'), alt: 'Selected work — Om Thombre' },
    { src: asset('/showcase/showcase-7.jpg'), alt: 'Selected work — Om Thombre' },
    { src: asset('/showcase/showcase-8.jpg'), alt: 'Selected work — Om Thombre' },
    { src: asset('/showcase/showcase-9.jpg'), alt: 'Selected work — Om Thombre' },
];

/* ─── Image Carousel ────────────────────────────────────── */
function ImageCarousel() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const touchStart = useRef(null);
    const len = galleryImages.length;

    const go = useCallback((dir) => {
        setDirection(dir);
        setCurrent(prev => (prev + dir + len) % len);
    }, [len]);

    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'ArrowLeft') go(-1);
            if (e.key === 'ArrowRight') go(1);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [go]);

    const variants = {
        enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
    };

    const img = galleryImages[current];

    return (
        <div className="relative w-full">
            {/* Main image container */}
            <div
                className="relative bg-neutral-100 overflow-hidden aspect-video border border-black/10 rounded-[2px]"
                onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => {
                    if (!touchStart.current) return;
                    const diff = e.changedTouches[0].clientX - touchStart.current;
                    if (Math.abs(diff) > 50) go(diff < 0 ? 1 : -1);
                    touchStart.current = null;
                }}
            >
                <GsapPresence initial={false} custom={direction} mode="wait">
                    <Gsap.div
                        key={current}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                        className="absolute inset-0"
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain"
                        />
                    </Gsap.div>
                </GsapPresence>

                {/* Nav arrows - Minimal styling */}
                <button
                    onClick={(e) => { e.stopPropagation(); go(-1); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full shadow-sm flex items-center justify-center hover:bg-white text-black/60 hover:text-black transition-all"
                    aria-label="Previous image"
                >
                    <ChevronLeft size={20} strokeWidth={2} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); go(1); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full shadow-sm flex items-center justify-center hover:bg-white text-black/60 hover:text-black transition-all"
                    aria-label="Next image"
                >
                    <ChevronRight size={20} strokeWidth={2} />
                </button>

                {/* Counter */}
                <div className="absolute bottom-4 right-4 z-10 bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-full font-mono text-[10px] tracking-[0.12em] md:tracking-[0.16em] backdrop-saturate-150">
                    {String(current + 1).padStart(2, '0')} / {String(len).padStart(2, '0')}
                </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {galleryImages.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                        className={`
                            shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-[2px] overflow-hidden transition-all duration-300 relative
                            ${i === current ? 'opacity-100 ring-2 ring-black ring-offset-2' : 'opacity-40 hover:opacity-100'}
                        `}
                    >
                        <img src={img.src} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ─── Main Modal ────────────────────────────────────────── */
export default function ProfileDetailModal({ isOpen, onClose }) {
    // Lock body scroll
    useEffect(() => {
        if (!isOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, [isOpen]);

    // Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    return createPortal(
        <GsapPresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-6 lg:p-10">
                    {/* Backdrop */}
                    <Gsap.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal content */}
                    <Gsap.div
                        initial={{ opacity: 0, y: 30, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        data-lenis-prevent
                        className="relative z-10 w-full h-dvh md:h-auto md:max-h-[90vh] max-w-6xl bg-[#FAF9F6] shadow-2xl md:rounded-lg overflow-y-auto overscroll-contain flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* ── Sticky header ─────────────────────── */}
                        <div className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-black/5">
                            <div className="px-6 md:px-10 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-[10px] uppercase font-bold tracking-[0.12em] md:tracking-[0.16em] text-[#000] flex items-center gap-2">
                                        <Trophy size={14} className="text-lime-500" />
                                        AI Director
                                    </span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                                    aria-label="Close"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* ── Content body ──────────────────────── */}
                        <div className="px-6 md:px-10 pt-8 pb-20">

                            {/* Title block */}
                            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] md:tracking-[0.26em] text-black/40 mb-4">
                                    Inkpen Labs
                                </p>

                                <h1 className="text-[clamp(2rem,9vw,3rem)] md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-black mb-6">
                                    OM <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>THOMBRE</span>
                                </h1>

                                <p className="text-base md:text-lg leading-7 md:leading-8 text-black/60 max-w-2xl mx-auto">
                                    AI Director at Inkpen Labs — AI-powered video advertisements, short-form content and
                                    performance-driven creative for Meta platforms.
                                </p>
                            </div>

                            {/* Image gallery */}
                            <div className="max-w-5xl mx-auto mt-16 border border-black/5 p-2 bg-white rounded-lg shadow-sm">
                                <ImageCarousel />
                            </div>

                            {/* Story — everything below the gallery */}
                            <div className="mt-16 md:mt-24">
                                <ProfileStory />
                            </div>

                        </div>
                    </Gsap.div>
                </div>
            )}
        </GsapPresence>,
        document.body
    );
}
