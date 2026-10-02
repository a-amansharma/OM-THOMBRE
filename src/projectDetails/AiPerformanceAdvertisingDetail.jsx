import {
  BandFooter,
  BodyGrid,
  CaseStudyRoot,
  CaseStudyScroll,
  CaseStudySection,
  CaseStudyIndex,
  ConceptStrip,
  DarkBand,
  FlowDiagram,
  Gutter,
  HeroSection,
  IntroGrid,
  Kicker,
  MonoLead,
  NodeCards,
  Outline,
  Panel,
  PullQuote,
  Reveal,
  SectionColumn,
  SectionShell,
  TEXT,
  TopBar,
  TYPE,
  cx,
} from "./caseStudy/kit";

/* Four panels, one per stage the creative passes through before it is judged
   on performance. Same dotted-instrument treatment as the other case studies. */
const VariationPanel = () => (
  <Panel>
    <div className="grid gap-2 sm:grid-cols-4">
      {[
        ["A", "DIRECT HOOK"],
        ["B", "PROBLEM FIRST"],
        ["C", "STORY OPEN"],
        ["D", "SOCIAL PROOF"],
      ].map(([code, label], index) => (
        <div
          key={code}
          className="relative flex min-h-24 items-end border border-black/10 bg-[#FAF9F6]/90 p-3 sm:min-h-28 sm:p-4"
        >
          <span className="absolute right-3 top-3 font-mono text-[0.6875rem] text-black/35">
            {code}
          </span>
          <span className={cx(TYPE.node, "text-black/75")}>{label}</span>
        </div>
      ))}
    </div>
    <div className="mt-4 flex items-center justify-between gap-3 px-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-black/45">
      <span>One core idea</span>
      <span className="h-px flex-1 bg-black/10" />
      <span>Four testable openings</span>
    </div>
  </Panel>
);

const GrowthPanel = () => (
  <Panel label="Business growth during this period" meta="Account level">
    <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
      <span className="font-black tracking-tighter leading-none text-[1.75rem] text-black/35">
        ₹2 Cr
      </span>
      <span className="font-mono text-xs text-lime-600">&rarr;</span>
      <span className="font-black tracking-tighter leading-none text-[2.5rem] text-black">
        ₹2.75 Cr
      </span>
      <span className="ml-auto font-mono text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-black/45">
        August &rarr; September
      </span>
    </div>

    <div className="mt-5 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
      {[
        ["₹75 Lakh", "Increase"],
        ["37.5%", "Growth"],
      ].map(([value, label]) => (
        <div key={label} className="bg-[#FAF9F6] p-4">
          <span className="block font-black tracking-tighter leading-none text-[1.5rem] text-black">
            {value}
          </span>
          <span className="mt-2 block font-mono text-[0.625rem] font-bold uppercase tracking-[0.16em] text-black/45">
            {label}
          </span>
        </div>
      ))}
    </div>

    <p className={cx("mt-5", TYPE.micro, "text-black/50")}>
      Business growth across the account during this period, not a claim that one
      person caused the whole increase.
    </p>
  </Panel>
);

export default function AiPerformanceAdvertisingDetail({ onClose, mode }) {
  const closeLabel = mode === "modal" ? "Close" : "Back to Home";

  return (
    <CaseStudyRoot mode={mode} dataAttr="data-ai-performance-detail">
      <TopBar
        section="AI Performance Advertising"
        project="Inkpen Labs"
        closeLabel={closeLabel}
        onClose={onClose}
      />

      <CaseStudyScroll dataAttr="data-ai-performance-scroll">
        <main>
          <HeroSection
            kicker="Inkpen Labs / Performance Creative"
            lead="AI-powered video advertisements built for Meta — where the creative only counts once it has been tested against real performance."
          >
            <h1 className={cx(TYPE.display, "mt-7 md:mt-9")}>
              AI <Outline>PERFORMANCE</Outline>
            </h1>
          </HeroSection>

          <SectionShell>
            <Gutter className="pb-14 sm:pb-16 md:pb-20">
              <IntroGrid heading="HOW THE AD CREATIVE IS BUILT">
                <p>
                  As AI Director at Inkpen Labs I create AI-driven advertising
                  creatives and content for Meta platforms.
                </p>
                <p>
                  The creative is not the first step. It is the answer to a
                  performance question — and it has to be produced fast enough that
                  there is enough of it to actually test.
                </p>
              </IntroGrid>

              <Reveal delay={0.22} className="mt-10 md:mt-12">
                <ConceptStrip
                  items={[
                    "AI Video Generation",
                    "Creative Concepts",
                    "Scriptwriting",
                    "Character & Scene Development",
                    "AI + Live-Action Editing",
                    "Hooks & Transitions",
                    "Music, SFX & Captions",
                    "Meta Ads Manager",
                  ]}
                />
                <VariationPanel />
              </Reveal>

              <BodyGrid className="mt-12 md:mt-16">
                <CaseStudyIndex
                  title="Creative map"
                  idPrefix="ai-performance"
                  scrollAttr="data-ai-performance-scroll"
                  items={[
                    ["01", "Concept"],
                    ["02", "Script"],
                    ["03", "Characters"],
                    ["04", "Generation"],
                    ["05", "Editing"],
                    ["06", "Sound"],
                    ["07", "Variations"],
                    ["08", "Optimization"],
                  ]}
                />

                <SectionColumn>
                  <CaseStudySection
                    number="01"
                    note="Performance creative / stage one"
                    title="CREATIVE CONCEPT"
                    id="ai-performance-01"
                  >
                    <p>
                      Every ad starts as one clear creative thought. Not a mood board,
                      not a list of shots — one idea that could be cut several ways.
                    </p>
                    <p>
                      The concept is chosen because it can be executed quickly without
                      losing the thing that makes it interesting.
                    </p>
                    <PullQuote
                      className="my-7"
                      kicker="The question behind every concept"
                      body="What is the one thing someone should feel or understand in three seconds?"
                    />
                    <ConceptStrip
                      items={[
                        "Problem",
                        "Objection",
                        "Desire",
                        "Contrast",
                        "Social proof",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="02"
                    note="Performance creative / stage two"
                    title="SCRIPT & HOOK"
                    id="ai-performance-02"
                    dark
                  >
                    <p>
                      The hook is written first, not last. On a feed, the first seconds
                      decide whether anything else in the script gets seen.
                    </p>
                    <p>
                      I write the spoken line, the on-screen beat and the visual that
                      carries each one — so the script is shootable, generatable, or
                      both.
                    </p>
                    <ConceptStrip
                      dark
                      items={[
                        "Spoken line",
                        "On-screen text",
                        "Visual beat",
                        "Payoff",
                        "CTA",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="03"
                    note="Performance creative / stage three"
                    title="CHARACTER & SCENE DEVELOPMENT"
                    id="ai-performance-03"
                  >
                    <p>
                      Characters and scenes are developed before any generation
                      happens, because consistency is what makes six ads feel like one
                      campaign instead of six unrelated clips.
                    </p>
                    <FlowDiagram
                      items={[
                        "CHARACTER",
                        "LOOK & VOICE",
                        "SCENE",
                        "WORLD",
                        "PALETTE",
                        "FRAMING",
                      ]}
                    />
                    <p>
                      Once the direction is set, every shot gets generated against it.
                      Where AI cannot carry a beat, live footage is shot or sourced to
                      sit inside the same film.
                    </p>
                    <ConceptStrip
                      items={[
                        "Character design",
                        "Scene direction",
                        "Visual consistency",
                        "AI + live-action",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="04"
                    note="Performance creative / stage four"
                    title="AI-GENERATED VISUALS"
                    id="ai-performance-04"
                    dark
                  >
                    <p>
                      Generation is treated as a production step, not a creative
                      shortcut. Shot list, reference frames and continuity notes come
                      first.
                    </p>
                    <FlowDiagram
                      dark
                      items={[
                        "BRIEF",
                        "REFERENCE",
                        "GENERATE",
                        "SELECT",
                        "CONTINUITY",
                        "RESHOOT",
                      ]}
                    />
                    <p>
                      The gap between a usable asset and a great one is almost entirely
                      in the shot list.
                    </p>
                  </CaseStudySection>

                  <CaseStudySection
                    number="05"
                    note="Performance creative / stage five"
                    title="AI + LIVE-ACTION VIDEO EDITING"
                    id="ai-performance-05"
                  >
                    <p>
                      AI footage and real footage are cut together as one film. The
                      edit is where the script either works or quietly fails.
                    </p>
                    <NodeCards
                      items={[
                        "Pacing and rhythm set to the hook, not to the footage.",
                        "Transitions carry the eye instead of announcing themselves.",
                        "Live action is used where a real reaction or product shot beats a generated one.",
                      ]}
                    />
                    <ConceptStrip
                      items={[
                        "Pacing & Rhythm",
                        "Transitions",
                        "Motion Graphics",
                        "Visual Enhancement",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="06"
                    note="Performance creative / stage six"
                    title="HOOKS, STORYTELLING & SOUND"
                    id="ai-performance-06"
                    dark
                  >
                    <p>
                      Music, SFX and captions are part of the story, not a layer on
                      top of it.
                    </p>
                    <p>
                      Captions are written and timed for muted playback, because most
                      views arrive with the sound off.
                    </p>
                    <ConceptStrip
                      dark
                      items={[
                        "Music",
                        "SFX",
                        "Captions",
                        "Text-on-screen",
                        "Safe zones",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="07"
                    note="Performance creative / stage seven"
                    title="MULTIPLE CREATIVE VARIATIONS"
                    id="ai-performance-07"
                  >
                    <p>
                      One core idea ships as several versions. Different hook,
                      different opening, different length — so performance testing has
                      something real to compare instead of a coin flip.
                    </p>
                    <FlowDiagram
                      items={[
                        "ONE IDEA",
                        "VARIATION A",
                        "VARIATION B",
                        "VARIATION C",
                        "VARIATION D",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="08"
                    note="Performance creative / stage eight"
                    title="PERFORMANCE-BASED OPTIMIZATION"
                    id="ai-performance-08"
                    dark
                  >
                    <p>
                      Performance is read in Meta Ads Manager and fed straight back
                      into the next batch of scripts and edits.
                    </p>
                    <GrowthPanel />
                    <p>
                      The numbers decide what gets made next. The hook that held
                      attention gets more cuts; the one that did not gets rewritten.
                    </p>
                    <NodeCards
                      dark
                      items={[
                        "Retention curve shows where attention actually drops.",
                        "Engagement separates a good look from a good idea.",
                        "Click and conversion tell you which hook earned the next iteration.",
                      ]}
                    />
                  </CaseStudySection>
                </SectionColumn>
              </BodyGrid>
            </Gutter>
          </SectionShell>

          <DarkBand>
            <SectionShell>
              <Gutter>
                <Reveal>
                  <Kicker dark>How I run performance creative</Kicker>
                  <h2 className={cx(TYPE.displayXL, "mt-5 max-w-[16ch]")}>
                    THE <span className="text-lime-300">CREATIVE LOOP</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.1} className="mt-10 md:mt-12">
                  <FlowDiagram
                    dark
                    items={[
                      "CONCEPT",
                      "SCRIPT",
                      "DIRECTION",
                      "GENERATE",
                      "EDIT",
                      "SOUND",
                      "TEST",
                      "ITERATE",
                    ]}
                  />
                </Reveal>
                <Reveal
                  delay={0.16}
                  className="mt-10 grid gap-8 border-t border-white/15 pt-8 md:mt-12 md:gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16"
                >
                  <MonoLead>
                    Speed is only useful when the creative still holds up.
                  </MonoLead>
                  <div className={cx(TYPE.body, "space-y-5", TEXT.body(true))}>
                    <p>
                      Producing more variants is easy. Producing more variants that are
                      all watchable, on brand and on message is the actual job — and it
                      is what makes the testing worth running at all.
                    </p>
                  </div>
                </Reveal>
                <BandFooter left="AI PERFORMANCE ADVERTISING" right="Inkpen Labs" />
              </Gutter>
            </SectionShell>
          </DarkBand>
        </main>
      </CaseStudyScroll>
    </CaseStudyRoot>
  );
}
