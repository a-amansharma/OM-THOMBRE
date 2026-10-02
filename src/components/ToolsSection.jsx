import { memo } from 'react';
import { Gsap } from '../utils/gsapAnimate';
import { Clapperboard, Palette, Wand2, Megaphone } from 'lucide-react';

const TOOL_GROUPS = [
  {
    label: 'Video',
    icon: Clapperboard,
    tools: ['Adobe Premiere Pro', 'CapCut'],
  },
  {
    label: 'Design',
    icon: Palette,
    tools: ['Canva', 'Adobe Lightroom'],
  },
  {
    label: 'AI',
    icon: Wand2,
    tools: ['Google Flow', 'Gemini', 'AI Video & Image Generation Tools'],
  },
  {
    label: 'Marketing',
    icon: Megaphone,
    tools: ['Meta Ads Manager'],
  },
];

const ToolsSection = memo(function ToolsSection() {
  return (
    <section id="tools-section" className="pt-20 md:pt-24 pb-24 md:pb-32 w-full relative bg-[#FAF9F6] overflow-hidden">
      <div aria-hidden="true" className="absolute -left-24 top-1/4 w-[380px] h-[380px] bg-black/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

        {/* ── Heading row ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12 md:mb-16">
          <Gsap.h2
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2rem,9vw,3rem)] sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-black"
          >
            Tools <span className="text-black/20">I Work With.</span>
          </Gsap.h2>

          <Gsap.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:text-right text-[13px] md:text-[14.5px] font-light leading-[1.8] text-black/55 max-w-md"
          >
            The daily toolkit — cutting, designing, generating and running the ads
            that carry the work.
          </Gsap.p>
        </div>

        {/* ── Tool boards ── */}
        <Gsap.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.18 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border-l-2 border-t-2 border-black group/grid bg-[#FAF9F6]"
        >
          {TOOL_GROUPS.map((group, i) => (
            <div
              key={group.label}
              className="group/cell relative border-r-2 border-b-2 border-black p-5 sm:p-6 md:p-8 min-h-[190px] flex flex-col justify-between overflow-hidden cursor-crosshair transition-colors duration-500 hover:bg-[#0A0A0A]"
            >
              {/* Oversized ghost index, same watermark language as the other matrices */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 right-3 font-black leading-none text-[6rem] md:text-[8rem] text-transparent [-webkit-text-stroke:1.5px_black] opacity-45 group-hover/cell:opacity-0 transition-opacity duration-500 select-none"
              >
                0{i + 1}
              </span>

              <div className="relative z-10 flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-black/45 group-hover/cell:text-lime-400 transition-colors duration-500">
                  {group.label}
                </span>
                <group.icon className="w-5 h-5 md:w-7 md:h-7 text-black group-hover/cell:text-lime-400 transition-colors duration-500 shrink-0" strokeWidth={2} />
              </div>

              <ul className="relative z-10 mt-auto pt-8 space-y-2">
                {group.tools.map((tool) => (
                  <li
                    key={tool}
                    className="flex items-start gap-2.5 border-l-2 border-black group-hover/cell:border-lime-400 pl-3 text-[12.5px] md:text-[13.5px] font-mono leading-[1.6] text-black/75 group-hover/cell:text-white/85 transition-colors duration-500 break-words"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Gsap.div>
      </div>
    </section>
  );
});

export default ToolsSection;
