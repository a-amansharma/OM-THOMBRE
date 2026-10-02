import { Gsap } from '../../utils/gsapAnimate';

const EASE = [0.16, 1, 0.3, 1];

/* ─── Scroll reveal ────────────────────────────────────────
   amount is deliberately low: the details panel is a small
   scroll viewport, so tall blocks can never reach a high
   intersection ratio.                                         */
export const Reveal = ({ children, delay = 0, y = 16, duration = 0.7, className = '', style }) => (
    <Gsap.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.04 }}
        transition={{ delay, duration, ease: EASE }}
        style={style}
        className={className}
    >
        {children}
    </Gsap.div>
);

/* ─── Numbered chapter header ─────────────────────────────── */
export const Chapter = ({ index, title, tone = 'light', className = '', children }) => {
    const dark = tone === 'dark';
    return (
        <div className={className}>
            <Reveal className="flex items-center gap-3">
                <span className={`font-mono text-[10px] font-bold tabular-nums border px-2 py-1 rounded-[2px] leading-none ${dark ? 'border-white/25 text-lime-400' : 'border-black/10 text-black/45'}`}>
                    {index}
                </span>
                <span className={`font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] whitespace-nowrap ${dark ? 'text-white/70' : 'text-black/45'}`}>
                    {title}
                </span>
                <span className={`flex-1 h-px min-w-[12px] ${dark ? 'bg-white/15' : 'bg-black/[0.1]'}`} />
            </Reveal>
            {children}
        </div>
    );
};

/* ─── Display chapter title ───────────────────────────────── */
export const ChapterTitle = ({ children, tone = 'light', className = '' }) => (
    <h2 className={`font-black uppercase leading-[0.95] tracking-tighter text-[clamp(1.7rem,6.5vw,2.6rem)] md:text-[44px] ${tone === 'dark' ? 'text-white' : 'text-black'} ${className}`}>
        {children}
    </h2>
);

/* ─── Body copy ───────────────────────────────────────────── */
export const Lead = ({ children, tone = 'light', className = '' }) => (
    <p className={`text-[15px] md:text-[17px] font-light leading-[1.75] ${tone === 'dark' ? 'text-white/70' : 'text-black/60'} ${className}`}>
        {children}
    </p>
);

/* ─── Full-bleed dark band ────────────────────────────────── */
export const Band = ({ children, className = '' }) => (
    <section className={`relative -mx-6 md:-mx-10 px-6 md:px-10 py-14 md:py-20 bg-[#0A0A0A] text-white overflow-hidden ${className}`}>
        <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.18] pointer-events-none [background-image:linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:28px_28px]"
        />
        <div aria-hidden="true" className="absolute -top-28 -right-20 w-80 h-80 rounded-full bg-lime-400/[0.12] blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-16 w-72 h-72 rounded-full bg-white/[0.05] blur-3xl pointer-events-none" />
        <div className="relative z-10">{children}</div>
    </section>
);

/* ─── Mono chip ───────────────────────────────────────────── */
export const Chip = ({ children, tone = 'light', className = '' }) => (
    <span className={`inline-flex items-center font-mono text-[10px] md:text-[11px] uppercase tracking-[0.14em] border px-3 py-2 rounded-[2px] leading-none ${tone === 'dark' ? 'border-white/20 text-white/75' : 'border-black/10 text-black/60'} ${className}`}>
        {children}
    </span>
);

/* ─── Small mono eyebrow ──────────────────────────────────── */
export const Eyebrow = ({ children, tone = 'light', className = '' }) => (
    <span className={`font-mono text-[9.5px] md:text-[10px] font-bold uppercase tracking-[0.24em] ${tone === 'dark' ? 'text-lime-400' : 'text-black/35'} ${className}`}>
        {children}
    </span>
);

/* ─── Rail: vertical spine with a node per step ───────────── */
export const Rail = ({ steps, tone = 'light' }) => {
    const dark = tone === 'dark';
    const spine = dark ? 'bg-white/15' : 'bg-black/[0.1]';
    const node = dark
        ? 'border-white/20 bg-[#0A0A0A] text-lime-400'
        : 'border-black/10 bg-[#FAF9F6] text-black/40';
    const label = dark ? 'text-white' : 'text-black';

    return (
        <ol className="relative">
            {/* spine */}
            <span aria-hidden="true" className={`absolute left-[19px] md:left-[27px] top-5 md:top-7 bottom-5 md:bottom-7 w-px ${spine}`} />
            <Gsap.div
                aria-hidden="true"
                className="absolute left-[19px] md:left-[27px] top-5 md:top-7 bottom-5 md:bottom-7 w-px origin-top bg-lime-500"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.04 }}
                transition={{ duration: 1.1, ease: EASE }}
            />

            {steps.map((step, i) => (
                <li key={step} className="relative flex gap-4 md:gap-6 pb-8 last:pb-0">
                    <Reveal
                        delay={0.06 * i}
                        className={`relative z-10 shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full border flex items-center justify-center font-mono text-[10px] md:text-[11px] font-bold tabular-nums ${node}`}
                    >
                        {String(i + 1).padStart(2, '0')}
                    </Reveal>

                    <Reveal delay={0.06 * i + 0.04} className={`flex-1 min-w-0 pt-1 md:pt-3.5 font-black uppercase tracking-tight text-[17px] md:text-[26px] leading-[1.05] ${label}`}>
                        {step}
                    </Reveal>
                </li>
            ))}
        </ol>
    );
};
