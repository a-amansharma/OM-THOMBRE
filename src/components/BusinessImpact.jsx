import { memo } from 'react';
import { Gsap } from '../utils/gsapAnimate';
import { ArrowRight, TrendingUp, IndianRupee, CalendarDays, Users } from 'lucide-react';

/* The figures below are the business result across the account during the
   period this AI-driven creative and Meta advertising work was running — not a
   claim that one person or one piece of creative caused the whole increase. */
const HEADLINE = { from: '₹2 Cr', to: '₹2.75 Cr', period: 'August → September' };

const SUPPORT = [
  { value: '₹75 Lakh', label: 'Increase', icon: IndianRupee },
  { value: '37.5%', label: 'Growth', icon: TrendingUp },
];

const BusinessImpact = memo(function BusinessImpact() {
  return (
    <section id="impact-section" className="pt-4 md:pt-8 pb-24 md:pb-32 w-full relative bg-[#FAF9F6] overflow-hidden">
      {/* Lime bloom anchored on the dark panel */}
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[520px] bg-lime-400/[0.07] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

        {/* ── Title ── */}
        <div className="mb-12 md:mb-16 flex flex-col items-center text-center max-w-3xl mx-auto">
          <Gsap.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2rem,10.5vw,3rem)] sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-black"
          >
            Business <br />
            <span className="text-black/20">Impact.</span>
          </Gsap.h2>

          <Gsap.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-[14px] md:text-[15px] lg:text-base font-light leading-[1.85] text-black/60 max-w-2xl"
          >
            While this AI-driven creative production and Meta advertising work was
            running, the business grew month over month. The result belongs to the
            whole team and account — the creative work is one part of it.
          </Gsap.p>
        </div>

        {/* ── The numbers panel ── */}
        <Gsap.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative border-2 border-black bg-[#0A0A0A] text-white overflow-hidden"
        >
          {/* Faint grid, same 40px tile as the dark sections */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06] pointer-events-none [background-image:linear-gradient(to_right,rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.24)_1px,transparent_1px)] [background-size:40px_40px]"
          />
          <div aria-hidden="true" className="absolute -top-28 right-0 w-80 h-80 rounded-full bg-lime-400/10 blur-3xl pointer-events-none" />

          <div className="relative px-5 sm:px-8 md:px-14 py-10 md:py-16">
            {/* Headline movement */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
              <div className="flex flex-wrap items-center gap-4 md:gap-8">
                <span className="font-black tracking-tighter leading-[0.86] text-[clamp(2.25rem,10vw,4.25rem)] md:text-[6.5rem] text-white/35">
                  {HEADLINE.from}
                </span>

                <span className="relative inline-flex items-center justify-center w-11 h-11 md:w-16 md:h-16 rounded-full border border-lime-400/50 bg-lime-400/[0.08] text-lime-400 shrink-0">
                  <ArrowRight size={22} strokeWidth={2.2} className="md:hidden" />
                  <ArrowRight size={32} strokeWidth={2} className="hidden md:block" />
                </span>

                <span className="font-black tracking-tighter leading-[0.86] text-[clamp(2.75rem,13vw,5.5rem)] md:text-[8.5rem] text-lime-400">
                  {HEADLINE.to}
                </span>
              </div>

              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 self-start md:self-auto md:ml-auto">
                <CalendarDays size={13} strokeWidth={2.2} className="text-lime-400/70 shrink-0" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 whitespace-nowrap">
                  {HEADLINE.period}
                </span>
              </span>
            </div>

            <div className="mt-10 md:mt-14 h-px bg-white/10" />

            {/* Supporting figures + attribution */}
            <div className="mt-8 md:mt-10 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-14 lg:gap-20 items-start">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {SUPPORT.map((item) => (
                  <div key={item.label} className="border border-white/15 bg-white/[0.03] p-5 md:p-7">
                    <item.icon size={17} strokeWidth={2} className="text-lime-400 mb-5" />
                    <span className="block font-black tracking-tighter leading-[0.9] text-[clamp(1.5rem,5.5vw,2.5rem)] md:text-[3rem] text-white break-words hyphens-none">
                      {item.value}
                    </span>
                    <span className="mt-3 block font-mono text-[9px] md:text-[10.5px] uppercase tracking-[0.16em] text-white/45 leading-[1.5]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-l-2 border-lime-400 pl-5 md:pl-7">
                <p className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-lime-400/80">
                  How to read this
                </p>
                <p className="mt-4 text-[14px] md:text-[15.5px] font-light leading-[1.85] text-white/70 max-w-[56ch]">
                  Revenue moved from ₹2 Cr in August to ₹2.75 Cr in September — a
                  ₹75 Lakh increase, or 37.5% growth, across the account during the
                  period this AI-driven creative production and Meta advertising work
                  was running.
                </p>
                <p className="mt-4 flex items-start gap-2.5 text-[12.5px] md:text-[13.5px] font-light leading-[1.75] text-white/45 max-w-[56ch]">
                  <Users size={14} strokeWidth={2} className="text-white/35 shrink-0 mt-1" />
                  <span>
                    This is business growth over that period, not a claim that the
                    entire increase was caused by me personally — it reflects the wider
                    account, team and offer.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Gsap.div>
      </div>
    </section>
  );
});

export default BusinessImpact;
