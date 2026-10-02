import { useEffect, useRef } from "react";
import { Gsap, useGsapInView, useGsapReducedMotion } from "../utils/gsapAnimate";
import { Lightbulb, PenTool, Aperture, Wand2, Scissors, Music4, Gauge, PackageCheck, RefreshCw, ChevronDown } from "lucide-react";

import gsap from "gsap";

/* The journey reads as one continuous loop: each step hands a named output to
   the next, and the last one feeds back into the first. */
const STEPS = [
  {
    kicker: "01 // Idea",
    title: "Idea",
    icon: Lightbulb,
    body:
      "Start from the outcome the ad has to produce, then find the angle that earns it. The goal is one sharp creative thought that can survive being cut four different ways.",
    output: "output — one clear creative angle",
  },
  {
    kicker: "02 // Script",
    title: "Script",
    icon: PenTool,
    body:
      "The hook goes in the first seconds, because that is where attention is won or lost. I write the spoken line, the on-screen beat and the visual that carries each one.",
    output: "output — hook, beats & spoken lines",
  },
  {
    kicker: "03 // Visual Direction",
    title: "Visual Direction",
    icon: Aperture,
    body:
      "Before anything is generated, the look is decided: characters, scenes, palette, framing and lens language. Style set here is what makes a series of ads feel like one campaign.",
    output: "output — character & scene direction",
  },
  {
    kicker: "04 // AI Generation",
    title: "AI Generation",
    icon: Wand2,
    body:
      "Shots are generated against that direction rather than at random. Where AI cannot carry a beat, live footage is shot or sourced to sit inside the same film.",
    output: "output — AI + live-action footage",
  },
  {
    kicker: "05 // Editing",
    title: "Editing",
    icon: Scissors,
    body:
      "The cut decides whether the script worked. Pacing, rhythm, transitions and pacing of the reveal are tuned until the retention curve stops dropping where it should not.",
    output: "output — paced cut & transitions",
  },
  {
    kicker: "06 // Sound",
    title: "Sound",
    icon: Music4,
    body:
      "Music, SFX and captions are part of the story, not a layer on top. Captions are written and timed for muted playback, since most views arrive with the sound off.",
    output: "output — music, SFX & captions",
  },
  {
    kicker: "07 // Optimization",
    title: "Optimization",
    icon: Gauge,
    body:
      "Every version goes out with a reason to exist. Performance tells us which hook, edit or length actually earns attention, and that signal decides the next batch.",
    output: "output — variations & performance signal",
  },
  {
    kicker: "08 // Final Output",
    title: "Final Output",
    icon: PackageCheck,
    body:
      "Platform-ready files in every required ratio, checked for safe zones, sound-off readability and brand consistency before anything is delivered or published.",
    output: "output — platform-ready delivery",
  },
];

const MyApproach = () => {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const fillRef = useRef(null);
  const dotRef = useRef(null);

  const reduced = useGsapReducedMotion();
  const isInView = useGsapInView(sectionRef, { once: true, amount: 0.12 });

  /* The rail fills top-to-bottom when the section arrives, and a single lime
     signal keeps travelling down it afterwards so the flow never reads as
     finished — the point of the section is that the loop keeps running. */
  useEffect(() => {
    const fill = fillRef.current;
    const dot = dotRef.current;
    const rail = railRef.current;
    if (!fill || !dot || !rail) return undefined;

    gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(dot, { y: 0 });

    if (reduced) {
      gsap.set(fill, { scaleY: 1 });
      return () => gsap.killTweensOf([fill, dot]);
    }

    let reveal;
    let flow;
    if (isInView) {
      reveal = gsap.to(fill, { scaleY: 1, duration: 2, ease: "power2.out" });
      flow = gsap.to(dot, {
        y: rail.offsetHeight,
        duration: 4.5,
        ease: "none",
        repeat: -1,
        repeatDelay: 1.2,
      });
    }

    return () => {
      reveal?.kill();
      flow?.kill();
      gsap.killTweensOf([fill, dot]);
    };
  }, [isInView, reduced]);

  return (
    <section
      id="tech-stack-section"
      ref={sectionRef}
      className="pt-20 md:pt-24 pb-24 md:pb-32 w-full relative bg-[#0A0A0A] overflow-hidden"
    >
      {/* depth wash */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="absolute -left-24 top-0 w-[380px] h-[380px] bg-lime-400 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* ── TITLE + INTRO ── */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-16 items-end mb-20 md:mb-28">
          <Gsap.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.4rem,11vw,3.5rem)] sm:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white"
          >
            Creative <br />
            <span className="text-lime-400">Workflow.</span>
          </Gsap.h2>

          <Gsap.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pb-3"
          >
            <p className="text-sm md:text-base lg:text-lg text-white/55 leading-7 md:leading-8 max-w-xl">
              Every piece of content I make — an ad, a devotional short, a corporate
              film or a status video — moves through the same eight steps. Each one
              hands a clear output to the next, and the last step loops all the way
              back to the first.
            </p>
          </Gsap.div>
        </div>

        {/* ── THE JOURNEY ── */}
        <ol className="relative">
          {/* rail: base, fill and travelling signal */}
          <div
            ref={railRef}
            aria-hidden="true"
            className="absolute left-[23px] lg:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-white/10"
          >
            <div
              ref={fillRef}
              className="absolute inset-0 bg-gradient-to-b from-lime-400 via-lime-400/60 to-lime-400/20"
            />
            <div className="absolute left-1/2 top-0 -translate-x-1/2">
              <div
                ref={dotRef}
                className="w-1.5 h-1.5 rounded-full bg-lime-400 shadow-[0_0_10px_2px_rgba(163,230,53,0.55)]"
              />
            </div>
          </div>

          {STEPS.map((step, index) => {
            const isRight = index % 2 === 1;
            const isLast = index === STEPS.length - 1;
            const Icon = step.icon;

            return (
              <li key={step.title} className="group/step relative">
                <Gsap.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: Math.min(index, 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid lg:grid-cols-2 items-start"
                >
                  {/* ── STEP CARD ── */}
                  <div
                    className={
                      isRight
                        ? "pl-16 lg:col-start-2 lg:pl-16 pb-2"
                        : "pl-16 lg:col-start-1 lg:pr-16 lg:row-start-1 pb-2"
                    }
                  >
                    <div className="relative">
                      {/* oversized ghost index */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-6 right-0 lg:-right-1 text-[4.5rem] md:text-[6.5rem] font-black leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)] select-none"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="relative border-t border-white/10 pt-6 transition-colors duration-500 group-hover/step:border-lime-400/60">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-lime-400">
                            {step.kicker}
                          </span>
                        </div>

                        <h3 className="text-3xl md:text-5xl lg:text-[3.5rem] font-black uppercase text-white tracking-tight leading-[0.92] transition-colors duration-500 group-hover/step:text-lime-400">
                          {step.title}
                        </h3>

                        <p className="mt-5 text-sm md:text-base text-white/55 leading-7 md:leading-8 max-w-[48ch]">
                          {step.body}
                        </p>

                        <p className="mt-6 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-white/30">
                          <span className="text-lime-400/70">{step.output}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ── RAIL NODE ── */}
                  <div
                    aria-hidden="true"
                    className="absolute left-[23px] lg:left-1/2 top-0 -translate-x-1/2 z-20"
                  >
                    <div className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/15 bg-[#0A0A0A] transition-all duration-500 group-hover/step:border-lime-400 group-hover/step:bg-lime-400/10">
                      <Icon
                        className="w-[18px] h-[18px] md:w-5 md:h-5 text-white/50 transition-all duration-500 group-hover/step:text-lime-400 group-hover/step:rotate-90"
                        strokeWidth={1.75}
                      />
                    </div>
                  </div>
                </Gsap.div>

                {/* ── CONNECTOR ARROW ── */}
                {!isLast && (
                  <div aria-hidden="true" className="relative h-12 lg:h-16">
                    <ChevronDown
                      className="absolute left-[23px] lg:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 text-lime-400/30"
                      strokeWidth={2.5}
                    />
                  </div>
                )}
              </li>
            );
          })}

          {/* ── LOOP BACK ── */}
          <li className="relative grid lg:grid-cols-2 pt-6">
            <div className="hidden lg:block" />
            <Gsap.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="pl-16 lg:col-start-2 lg:pl-16"
            >
              <div className="flex items-center gap-4 border border-dashed border-lime-400/25 bg-lime-400/[0.03] px-5 py-4">
                <RefreshCw
                  className="w-4 h-4 text-lime-400 shrink-0 animate-[spin_6s_linear_infinite]"
                  strokeWidth={2}
                />
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.16em] text-white/40 leading-5">
                  Loops back into{" "}
                  <span className="text-lime-400">01. Idea</span> — the cycle is
                  the method, not a one-off sequence.
                </p>
              </div>
            </Gsap.div>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default MyApproach;
