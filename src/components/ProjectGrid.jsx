import { Gsap } from "../utils/gsapAnimate";
import { ArrowUpRight } from "lucide-react";

import { PROJECT_META } from "../data/projectMeta";
import { cardImgSrc } from "../utils/assets";

/**
 * The case-study grid.
 *
 * These six cards used to sit in the pinned horizontal track above, interleaved
 * with the video cards. They live here instead — an ordinary vertical grid in
 * normal page flow — so the track can be videos only.
 *
 * Each card keeps its `project-${id}` anchor: closing a case study that was
 * opened from a shared link navigates to /?scrollTo=project-N, and the scroll
 * helper uses that id to find the card (see useScrollToGallery).
 */
export default function ProjectGrid({ onOpenProject }) {
  return (
    <section
      id="project-section"
      className="relative w-full overflow-hidden bg-[#FAF9F6] py-20 md:py-28"
    >
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
              {String(PROJECT_META.length).padStart(2, "0")} Case Studies
            </span>
            <h2 className="mt-4 text-[clamp(2.25rem,7vw,4.5rem)] font-black uppercase leading-[0.92] tracking-tight text-black">
              Selected{" "}
              <span className="text-transparent" style={{ WebkitTextStroke: "2px black" }}>
                Work
              </span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-black/60 md:text-lg">
              Full case studies — the brief, the approach, and what came out of it. Tap any card to
              read it.
            </p>
          </div>
        </Gsap.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-12 md:gap-8">
          {PROJECT_META.map((project, index) => (
            <Gsap.div
              key={project.id}
              id={`project-${project.id}`}
              onClick={() => onOpenProject?.(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpenProject?.(project);
                }
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative cursor-pointer overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-black/25 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/[0.04]">
                <picture>
                  <source
                    srcSet={[
                      cardImgSrc(project.img, 400) + " 400w",
                      cardImgSrc(project.img, 800) + " 800w",
                    ].join(", ")}
                    sizes="(min-width: 640px) 45vw, 90vw"
                  />
                  <img
                    draggable="false"
                    src={cardImgSrc(project.img, 800)}
                    alt={project.title}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover grayscale-[35%] transition-all duration-[900ms] ease-out group-hover:scale-[1.05] group-hover:grayscale-0"
                  />
                </picture>

                <span className="absolute left-4 top-4 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[0.5625rem] font-bold uppercase tracking-[0.14em] text-black/70 backdrop-blur-sm">
                  {project.category}
                </span>
                <span className="absolute right-4 top-4 font-mono text-[0.625rem] font-bold uppercase tracking-[0.14em] text-white/80 drop-shadow">
                  NO.{String(project.id).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 p-5 md:p-6">
                <div className="min-w-0">
                  <h3 className="text-lg font-black uppercase leading-[1.15] tracking-tight text-black md:text-xl">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="mt-2 font-mono text-[0.6875rem] leading-5 text-black/55">
                      {project.description}
                    </p>
                  )}
                </div>
                <ArrowUpRight
                  size={22}
                  className="mt-1 shrink-0 text-black/25 transition-all duration-300 group-hover:rotate-45 group-hover:text-black"
                />
              </div>
            </Gsap.div>
          ))}
        </div>
      </div>
    </section>
  );
}
