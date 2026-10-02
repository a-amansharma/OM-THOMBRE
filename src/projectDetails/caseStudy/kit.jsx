import { Fragment, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Gsap } from "../../utils/gsapAnimate";

/* ============================================
   Portfolio case-study design system
   ============================================
   One shared kit for all six internal case-study pages. Every visible word,
   number and order still lives in the page files; this module only owns the
   visual language so the six read as a single publication.

   Two constraints shaped the tokens:

   1. Only Space Grotesk is loaded (wght 300-700). Every heading used
      `font-black`, which clamps to 700 for this family, so display type was
      rendering a full weight lighter than it asked for. Headings now use the
      real 700 and hierarchy is carried by size, spacing and opacity instead.
   2. The global `p, li { font-weight: 300 }` rule is unlayered, so it also beat
      `font-bold` on paragraphs. index.css now restores the intended weights
      inside `[data-case-study]`.

   Display clamps are sized against the longest single word in each page
   ("INNOVATION", "PLANNING") at 375px so nothing is ever clipped sideways. */

const EASE = [0.16, 1, 0.3, 1];

export const cx = (...parts) => parts.filter(Boolean).join(" ");

export const TYPE = {
  display: "break-words text-[clamp(2.5rem,10vw,7.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.05em]",
  outline: "break-words text-[clamp(1.4rem,5.2vw,4.5rem)] font-bold uppercase leading-[0.96] tracking-[-0.04em] cs-outline",
  title: "text-[clamp(1.5rem,3.1vw,2.6rem)] font-bold uppercase leading-[1.06] tracking-[-0.02em]",
  displayXL: "text-[clamp(1.75rem,6vw,4.75rem)] font-bold uppercase leading-[0.94] tracking-[-0.04em]",
  lead: "text-[1.0625rem] leading-[1.6] md:text-[1.1875rem] md:leading-[1.62]",
  body: "text-[1.0625rem] leading-[1.7] md:text-[1.125rem] md:leading-[1.78]",
  eyebrow: "font-mono text-[0.6875rem] font-bold uppercase leading-[1.5] tracking-[0.2em]",
  micro: "font-mono text-[0.6875rem] font-bold uppercase leading-[1.5] tracking-[0.12em]",
  meta: "font-mono text-[0.6875rem] font-bold uppercase leading-[1.5] tracking-[0.16em]",
  node: "font-mono text-[0.75rem] font-bold uppercase leading-[1.45] tracking-[0.08em] md:text-[0.8125rem]",
  monoLead:
    "font-mono text-[0.8125rem] font-bold uppercase leading-[1.6] tracking-[0.1em] md:text-[0.875rem] md:leading-[1.65]",
};

export const TEXT = {
  strong: (dark) => (dark ? "text-white" : "text-black"),
  body: (dark) => (dark ? "text-white/75" : "text-black/75"),
  support: (dark) => (dark ? "text-white/65" : "text-black/60"),
  meta: (dark) => (dark ? "text-white/50" : "text-black/45"),
  accent: (dark) => (dark ? "text-lime-300" : "text-lime-600"),
  rule: (dark) => (dark ? "border-white/15" : "border-black/10"),
  ruleSoft: (dark) => (dark ? "border-white/10" : "border-black/[0.08]"),
  accentRule: (dark) => (dark ? "bg-lime-300/70" : "bg-lime-500/70"),
  panel: (dark) => (dark ? "border-white/15 bg-white/[0.05]" : "border-black/10 bg-white/70"),
  panelInner: (dark) => (dark ? "border-white/15 bg-[#0A0A0A]" : "border-black/10 bg-[#FAF9F6]"),
};

const GUTTER = "px-5 sm:px-7 md:px-10";
const BLEED = "-mx-5 px-5 sm:-mx-7 sm:px-7 md:-mx-10 md:px-10";

export const Reveal = ({ children, className = "", delay = 0 }) => (
  <Gsap.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: 0.65, delay, ease: EASE }}
    className={className}
  >
    {children}
  </Gsap.div>
);

export const Kicker = ({ children, dark = false }) => (
  <p className={cx(TYPE.eyebrow, dark ? "text-lime-300/80" : "text-black/45")}>{children}</p>
);

/* Decorative grid, ring and signal dot. Purely atmospheric: the grid is the
   same 40px tile everywhere, and the ring/dot drift right and down as the page
   gets taller so they never sit behind body copy. */
export const Backdrop = ({ dark = false }) => (
  <>
    <div
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute inset-0 -z-10 opacity-[0.055]",
        "[background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]",
        "[background-size:40px_40px]",
        dark && "invert opacity-[0.13]",
      )}
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-32 top-10 -z-10 hidden h-72 w-72 rounded-full border border-lime-500/10 md:block md:h-[30rem] md:w-[30rem]"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-8 top-24 -z-10 h-2 w-2 rounded-full bg-lime-500/50 shadow-[0_0_0_8px_rgba(163,230,53,0.08),0_0_0_18px_rgba(163,230,53,0.04)]"
    />
  </>
);

export const SectionShell = ({ children, className }) => (
  <div className={cx("mx-auto w-full max-w-6xl", className)}>{children}</div>
);

export const Gutter = ({ children, className }) => (
  <div className={cx(GUTTER, className)}>{children}</div>
);

export const CaseStudyRoot = ({ mode, dataAttr, children }) => (
  <div
    data-case-study
    {...(dataAttr ? { [dataAttr]: true } : {})}
    className={cx(
      "overflow-x-hidden bg-[#FAF9F6] text-black selection:bg-lime-400 selection:text-black",
      mode === "page" ? "min-h-screen" : "flex h-full flex-col",
    )}
  >
    {children}
  </div>
);

export const CaseStudyScroll = ({ dataAttr, children }) => (
  <div
    {...(dataAttr ? { [dataAttr]: true } : {})}
    data-case-study-scroll
    className="flex-1 overflow-y-auto overscroll-contain scroll-smooth"
  >
    {children}
  </div>
);

export const TopBar = ({ section, project = "Om Thombre", closeLabel, onClose }) => (
  <div className="sticky top-0 z-40 border-b border-black/[0.07] bg-[#FAF9F6]/90 backdrop-blur-md">
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-7 md:px-10 md:py-4">
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
        <span className="flex min-w-0 items-center gap-2 truncate font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-black/70 sm:text-[0.75rem]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime-500" />
          {section}
        </span>
        <span className="hidden shrink-0 border-l border-black/15 pl-3 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-black/40 sm:block sm:text-[0.75rem]">
          {project}
        </span>
      </div>
      <button
        onClick={onClose}
        className="flex min-h-[2.5rem] shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-wide shadow-sm transition-all duration-300 hover:bg-black hover:text-white hover:shadow-md sm:px-5 sm:text-sm"
      >
        <ArrowUpRight className="rotate-[225deg]" size={16} />
        {closeLabel}
      </button>
    </div>
  </div>
);

/* Stroked second line under the hero word. Solid black by default so the line
   survives engines without -webkit-text-stroke, transparent once supported. */
export const Outline = ({ as: Tag = "span", className = "", children }) => (
  <Tag className={cx(TYPE.outline, className)}>{children}</Tag>
);

export const HeroSection = ({ kicker, lead, children, after }) => (
  <section className="relative isolate overflow-hidden border-b border-black/10 py-12 sm:py-14 md:py-20 lg:py-24">
    <Backdrop />
    <SectionShell>
      <Gutter>
        <Reveal>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-lime-500 shadow-[0_0_10px_rgba(163,230,53,0.75)]" />
            <Kicker>{kicker}</Kicker>
          </div>
          {children}
          {lead && (
            <p className={cx(TYPE.lead, "mt-7 max-w-[46ch] md:mt-9", TEXT.body(false))}>{lead}</p>
          )}
        </Reveal>
        {after}
      </Gutter>
    </SectionShell>
  </section>
);

/* Heading on the left, lime-ruled prose on the right. Desktop splits at 0.85fr
   / 1.15fr so the prose column carries the reading weight. */
export const IntroGrid = ({
  heading,
  children,
  as: Heading = "h2",
  columns = "lg:grid-cols-[0.85fr_1.15fr]",
  align = "lg:items-start",
}) => (
  <div className={cx("mt-10 grid gap-8 md:mt-14 md:gap-10 lg:gap-14 xl:gap-16", columns, align)}>
    <Reveal delay={0.08}>
      <Heading className={cx(TYPE.title, "max-w-[18ch]", TEXT.strong(false))}>{heading}</Heading>
    </Reveal>
    <Reveal delay={0.16} className="border-l-2 border-lime-400 pl-5 md:pl-7">
      <div className={cx(TYPE.body, "space-y-5", TEXT.body(false))}>{children}</div>
    </Reveal>
  </div>
);

export const ConceptStrip = ({ items, dark = false }) => (
  <div className="mt-7 flex flex-wrap gap-2 md:mt-8">
    {items.map((item) => (
      <span
        key={item}
        className={cx(
          "border px-3 py-2 transition-colors",
          TYPE.micro,
          dark
            ? "border-white/15 bg-white/[0.05] text-white/75 hover:border-lime-300/50 hover:text-lime-300"
            : "border-black/10 bg-white/70 text-black/70 hover:border-lime-500/50 hover:text-black",
        )}
      >
        {item}
      </span>
    ))}
  </div>
);

/* Vertical on phones, wrapping rows from sm up. A 7-9 item chain used to be
   forced onto one nowrap row at lg, squeezing each node to three wrapped lines;
   letting the row wrap keeps every node legible at 12-13px. */
export const FlowDiagram = ({ items, dark = false, dataAttr }) => (
  <div
    {...(dataAttr ? { [dataAttr]: items.join(" → ") } : {})}
    className={cx("mt-7 overflow-hidden border md:mt-8", TEXT.rule(dark), dark ? "bg-white/[0.03]" : "bg-white/60")}
  >
    <div className="flex flex-col gap-px bg-current/10 sm:flex-row sm:flex-wrap">
      {items.map((item, index) => (
        <Fragment key={item}>
          <div
            className={cx(
              "relative flex min-h-16 min-w-0 flex-1 basis-36 items-center justify-center px-4 py-5 text-center transition-colors sm:min-h-20",
              TYPE.node,
              dark
                ? "bg-[#0A0A0A] text-white/80 hover:bg-white/[0.06] hover:text-lime-300"
                : "bg-[#FAF9F6] text-black/75 hover:bg-lime-50 hover:text-black",
            )}
          >
            <span className="absolute left-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-lime-500/70" />
            <span className="min-w-0 break-words">{item}</span>
          </div>
          {index < items.length - 1 && (
            <>
              <div
                aria-hidden="true"
                className={cx(
                  "hidden shrink-0 items-center justify-center px-2 font-mono text-base sm:flex",
                  dark ? "bg-[#0A0A0A] text-lime-300/70" : "bg-[#FAF9F6] text-lime-600",
                )}
              >
                →
              </div>
              <div
                aria-hidden="true"
                className={cx(
                  "flex shrink-0 items-center justify-center py-1.5 font-mono text-base sm:hidden",
                  dark ? "bg-[#0A0A0A] text-lime-300/70" : "bg-[#FAF9F6] text-lime-600",
                )}
              >
                ↓
              </div>
            </>
          )}
        </Fragment>
      ))}
    </div>
  </div>
);

/* The section number moves out of a cramped 150px left rail into a horizontal
   meta row, so the heading and body sit on the same left edge as the hero and
   the sidebar, and gain the full content width. */
export const CaseStudySection = ({ id, number, note, title, dark = false, children }) => (
  <Reveal className={cx("scroll-mt-28 border-t md:scroll-mt-32", TEXT.rule(dark))}>
    <section
      id={id}
      className={cx(
        "relative isolate overflow-hidden py-10 md:py-14 lg:py-16",
        dark && cx("bg-[#0A0A0A] text-white", BLEED),
      )}
    >
      <Backdrop dark={dark} />
      <div
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute -right-6 -top-10 select-none font-bold text-[7rem] leading-none tracking-[-0.1em] md:-right-4 md:-top-14 md:text-[11rem]",
          dark ? "text-white/[0.035]" : "text-black/[0.035]",
        )}
      >
        {number}
      </div>
      <div className="relative">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            className={cx(
              "font-mono text-[0.8125rem] font-bold tabular-nums tracking-[0.08em] md:text-[0.875rem]",
              TEXT.accent(dark),
            )}
          >
            {number}
          </span>
          <span className={cx("h-px w-8 shrink-0", dark ? "bg-white/20" : "bg-black/15")} />
          {note && <Kicker dark={dark}>{note}</Kicker>}
        </div>
        <h2 className={cx(TYPE.title, "mt-5 max-w-[20ch] md:mt-6", TEXT.strong(dark))}>{title}</h2>
        <div className={cx(TYPE.body, "mt-6 max-w-[62ch] space-y-5", TEXT.body(dark))}>{children}</div>
      </div>
    </section>
  </Reveal>
);

/* Sticky rail on lg, horizontal chip rail below it so the map is reachable on
   phones instead of disappearing. The active item is tracked against whichever
   ancestor actually scrolls: the modal's inner pane, or the window in page mode. */
export const CaseStudyIndex = ({ title, items, idPrefix, scrollAttr }) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    const ids = items.map(([number]) => `${idPrefix}-${number}`);
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;

    const scrollHost = scrollAttr ? document.querySelector(`[${scrollAttr}]`) : null;
    const scrolls = scrollHost ? scrollHost.scrollHeight > scrollHost.clientHeight + 4 : false;
    const root = scrolls ? scrollHost : null;

    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        });
        const first = ids.find((id) => visible.has(id));
        setActive(first ?? null);
      },
      { root, rootMargin: "-12% 0px -70% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [idPrefix, items, scrollAttr]);

  const hrefFor = (number) => `#${idPrefix}-${number}`;

  return (
    <Fragment>
      <nav
        aria-label={title}
        className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-1 sm:-mx-7 sm:px-7 lg:hidden"
      >
        {items.map(([number, label]) => (
          <a
            key={number}
            href={hrefFor(number)}
            className={cx(
              "flex shrink-0 snap-start items-center gap-2 border px-3 py-2 transition-colors",
              TYPE.micro,
              active === `${idPrefix}-${number}`
                ? "border-black bg-black text-white"
                : "border-black/10 bg-white/70 text-black/60 hover:border-lime-500/50 hover:text-black",
            )}
          >
            <span className={active === `${idPrefix}-${number}` ? "text-lime-300" : "text-black/35"}>
              {number}
            </span>
            {label}
          </a>
        ))}
      </nav>

      <aside className="hidden self-start lg:sticky lg:top-28 lg:block">
        <Kicker>{title}</Kicker>
        <nav className="mt-5 flex flex-col border-l border-black/10">
          {items.map(([number, label]) => {
            const isActive = active === `${idPrefix}-${number}`;
            return (
              <a
                key={number}
                href={hrefFor(number)}
                aria-current={isActive ? "true" : undefined}
                className={cx(
                  "group -ml-px flex items-baseline gap-3 border-l-2 py-2 pl-4 pr-2 transition-colors",
                  isActive
                    ? cx("border-lime-500", TEXT.strong(false))
                    : "border-l-transparent hover:border-lime-500/60",
                )}
              >
                <span
                  className={cx(
                    "font-mono text-[0.6875rem] font-bold tabular-nums tracking-[0.08em]",
                    isActive ? "text-lime-600" : "text-black/35 group-hover:text-lime-600",
                  )}
                >
                  {number}
                </span>
                <span
                  className={cx(
                    "text-[0.8125rem] font-semibold uppercase leading-tight tracking-[0.05em]",
                    isActive ? "text-black" : "text-black/55 group-hover:text-black",
                  )}
                >
                  {label}
                </span>
              </a>
            );
          })}
        </nav>
      </aside>
    </Fragment>
  );
};

export const SectionColumn = ({ children }) => <div className="min-w-0">{children}</div>;

export const BodyGrid = ({ children, className }) => (
  <div
    className={cx(
      "grid grid-cols-1 gap-8 pb-14 sm:pb-16 md:pb-20 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-10 xl:gap-x-12",
      className,
    )}
  >
    {children}
  </div>
);

export const DarkBand = ({ children, className, bordered = false }) => (
  <section
    className={cx(
      "relative isolate overflow-hidden bg-[#0A0A0A] text-white",
      bordered ? "border-t border-white/15 pt-12 md:pt-16 lg:pt-20" : "py-12 md:py-16 lg:py-20",
      className,
    )}
  >
    <Backdrop dark />
    <div className="relative">{children}</div>
  </section>
);

export const BandHeading = ({ kicker, children }) => (
  <Reveal>
    <Kicker dark>{kicker}</Kicker>
    <h2 className={cx(TYPE.displayXL, "mt-5 max-w-[16ch]")}>{children}</h2>
  </Reveal>
);

export const BandFooter = ({ left, right = "Om Thombre" }) => (
  <Reveal delay={0.22} className="mt-12 border-t border-white/15 pt-5 md:mt-16">
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-white/40 md:text-[0.75rem]">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  </Reveal>
);

export const MonoLead = ({ children, className = "" }) => (
  <p className={cx(TYPE.monoLead, "text-lime-300/85", className)}>{children}</p>
);

/* Shared chrome for the dotted instrument panels (signal, network, market,
   wireframe). Each page keeps its own labels and interior; only the frame,
   header row and type sizes are shared. */
export const Panel = ({ label, meta, dark = false, className = "", children }) => (
  <div
    className={cx(
      "relative mt-8 overflow-hidden border p-3 md:mt-10 md:p-5",
      dark ? "border-white/15 bg-white/[0.03]" : "border-black/10 bg-black/[0.02]",
      className,
    )}
  >
    <div
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(#000_0.7px,transparent_0.7px)] [background-size:14px_14px]",
        dark && "invert",
      )}
    />
    <div className={cx("relative border p-4 md:p-6", TEXT.panelInner(dark))}>
      {(label || meta) && (
        <div
          className={cx(
            "flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b pb-3",
            TYPE.meta,
            TEXT.rule(dark),
            dark ? "text-white/50" : "text-black/50",
          )}
        >
          {label && <span>{label}</span>}
          {meta && (
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
              {meta}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  </div>
);

/* Numbered cards: the repeated 01/02/03 blocks used for questions, statements
   and lists. */
export const NodeCards = ({ items, dark = false, columns = "sm:grid-cols-2", startAt = 1, className = "" }) => (
  <div className={cx("grid gap-2 pt-2 sm:gap-3", columns, className)}>
    {items.map((item, index) => (
      <div
        key={item}
        className={cx(
          "border p-4 md:p-5",
          TYPE.node,
          dark ? "border-white/15 bg-white/[0.05] text-white/80" : "border-black/10 bg-white/70 text-black/75",
        )}
      >
        <span className={cx("mb-3 block", TEXT.accent(dark))}>
          {String(index + startAt).padStart(2, "0")}
        </span>
        {item}
      </div>
    ))}
  </div>
);

/* Numbered rows: dot, label, trailing index. */
export const NodeRows = ({ items, dark = false, columns = "", className = "" }) => (
  <div className={cx("grid gap-2 pt-2", columns, className)}>
    {items.map((item, index) => (
      <div
        key={item}
        className={cx(
          "flex items-center gap-3 border px-4 py-3",
          TYPE.node,
          dark
            ? "border-white/15 bg-white/[0.05] text-white/80"
            : "border-black/10 bg-white/70 text-black/75",
        )}
      >
        <span className={cx("h-1.5 w-1.5 shrink-0 rounded-full", dark ? "bg-lime-300" : "bg-lime-500")} />
        <span>{item}</span>
        <span className={cx("ml-auto", dark ? "text-white/30" : "text-black/30")}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    ))}
  </div>
);

export const PullQuote = ({ kicker, body, dark = false, className = "" }) => (
  <div
    className={cx(
      "my-7 border-l-2 border-lime-400 bg-lime-400/10 px-5 py-5 md:px-7 md:py-6",
      className,
    )}
  >
    <Kicker>{kicker}</Kicker>
    <p className={cx(TYPE.monoLead, "mt-3", TEXT.strong(dark))}>{body}</p>
  </div>
);