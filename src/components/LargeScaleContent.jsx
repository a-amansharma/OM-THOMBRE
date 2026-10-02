import { memo, useRef, useState, useEffect } from 'react';
import { Gsap, useGsapInView } from '../utils/gsapAnimate';
import { Video, Image as ImageIcon, Layers, PlayCircle, MousePointerClick, Coins } from 'lucide-react';

/* Volume figures. These are team / target output produced and managed during
   this period rather than one person's individual count, so the heading copy
   below states that explicitly instead of implying solo authorship. */
const FORMATS = [
  { value: '600+', label: 'Video Statuses', icon: Video },
  { value: '600+', label: 'Static Statuses', icon: ImageIcon },
  { value: '300+', label: 'Live Wallpapers', icon: PlayCircle },
  { value: '800+', label: 'Static Wallpapers', icon: MousePointerClick },
];

const TOTAL = { value: '2,700+', label: 'Total Content Assets', icon: Layers };

const LargeScaleContent = memo(function LargeScaleContent() {
  const gridRef = useRef(null);
  const isInView = useGsapInView(gridRef, { once: true, amount: 0.15 });
  const [activeIndex, setActiveIndex] = useState(-1);

  /* Same 700ms cascade used by the capabilities matrix, so two stat grids on
     one page reveal with identical timing. */
  useEffect(() => {
    if (!isInView) return undefined;

    let currentIndex = 0;
    const interval = setInterval(() => {
      setActiveIndex(currentIndex);
      currentIndex++;

      if (currentIndex > FORMATS.length) {
        setTimeout(() => setActiveIndex(-1), 700);
        clearInterval(interval);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section id="scale-section" className="pt-20 md:pt-24 pb-24 md:pb-32 w-full relative bg-[#FAF9F6] overflow-hidden overflow-x-clip">
      {/* Ambient wash, matching the About section's glow placement */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute -right-24 top-1/3 w-[460px] h-[460px] bg-lime-300/[0.08] rounded-full blur-[110px]" />
        <div className="absolute left-0 bottom-0 w-[320px] h-[320px] bg-black/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

        {/* ── Title ── */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-16 items-end mb-14 md:mb-20">
          <Gsap.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.2rem,10vw,3.25rem)] sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-black"
          >
            Large-Scale
            <br />
            <span className="text-black/20">Content.</span>
          </Gsap.h2>

          <Gsap.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pb-2"
          >
            <p className="text-[14px] md:text-[15px] lg:text-base font-light leading-[1.85] text-black/60 max-w-xl">
              Alongside the AI-driven ad work, a large volume of video and static
              content is planned, produced, quality-checked and delivered every month.
              These are the team and target output figures for that production — not
              one person's individual count.
            </p>
          </Gsap.div>
        </div>

        {/* ── Format matrix ── */}
        <Gsap.div
          ref={gridRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 xl:grid-cols-4 border-l-2 border-t-2 border-black group/grid bg-[#FAF9F6]"
        >
          {FORMATS.map((stat, i) => {
            const isActive = activeIndex === i;
            return (
              <div
                key={stat.label}
                className={`group/cell relative border-r-2 border-b-2 border-black p-4 sm:p-5 md:p-8 lg:p-10 min-h-[190px] md:min-h-[260px] flex flex-col justify-between overflow-hidden cursor-crosshair transition-colors duration-500 hover:bg-[#0A0A0A] ${isActive ? '!bg-[#0A0A0A]' : ''}`}
              >
                <div className="flex justify-between items-start relative z-10">
                  <span className={`font-mono text-xs md:text-sm font-bold text-black group-hover/cell:text-lime-400 transition-colors duration-500 tracking-[0.12em] md:tracking-[0.16em] ${isActive ? '!text-lime-400' : ''}`}>
                    0{i + 1}
                  </span>
                  <stat.icon className={`w-5 h-5 md:w-7 md:h-7 text-black group-hover/cell:text-lime-400 transition-colors duration-500 ${isActive ? '!text-lime-400' : ''}`} strokeWidth={2} />
                </div>

                <div className="relative z-10 mt-auto">
                  <span className={`block font-black tracking-tighter leading-[0.9] text-[clamp(2rem,7vw,3.25rem)] md:text-[4rem] lg:text-[4.5rem] text-black group-hover/cell:text-lime-400 transition-colors duration-500 break-words hyphens-none ${isActive ? '!text-lime-400' : ''}`}>
                    {stat.value}
                  </span>
                  <span className={`mt-3 block font-mono text-[9.5px] md:text-[11px] uppercase tracking-[0.16em] text-black/50 group-hover/cell:text-white/60 leading-[1.5] transition-colors duration-500 ${isActive ? '!text-white/60' : ''}`}>
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </Gsap.div>

        {/* ── Total band ── */}
        <Gsap.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 border-2 border-black bg-black text-white px-5 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-12"
        >
          <TOTAL.icon size={28} strokeWidth={1.75} className="text-lime-400 shrink-0" />

          <div className="min-w-0">
            <span className="block font-black tracking-tighter leading-[0.88] text-[clamp(2.5rem,12vw,4.5rem)] md:text-[6rem] lg:text-[7rem] text-lime-400">
              {TOTAL.value}
            </span>
          </div>

          <div className="md:ml-auto md:text-right min-w-0">
            <p className="font-mono text-[11px] md:text-[13px] uppercase tracking-[0.2em] text-white">
              {TOTAL.label}
            </p>
            <p className="mt-3 text-[12.5px] md:text-[14px] font-light leading-[1.75] text-white/55 max-w-[38ch] md:ml-auto">
              Every format planned, produced, quality-checked and delivered as one
              continuous content operation.
            </p>
          </div>
        </Gsap.div>

        <div className="mt-6 flex items-center gap-3">
          <Coins size={14} className="text-black/30 shrink-0" strokeWidth={2} />
          <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.16em] text-black/32 leading-[1.6]">
            Team and target output figures for the period · Individual output varies with role
          </p>
        </div>
      </div>
    </section>
  );
});

export default LargeScaleContent;
