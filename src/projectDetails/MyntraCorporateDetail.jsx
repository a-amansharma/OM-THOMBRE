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
  NodeRows,
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

/* A clean footage test strip — the same instrument-panel idiom used for the
   other structured breakdowns on this site. */
const CleanerChecklist = () => (
  <Panel label="Clean-footage checklist" meta="Before the edit is judged">
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {[
        "CLOTHING",
        "SIGNAGE",
        "SET DRESSING",
        "WEATHER",
        "REFLECTIONS",
        "PAPERS",
        "CREDITS / LOGOS",
        "SCREEN GRAPHICS",
      ].map((item, index) => (
        <div
          key={item}
          className="relative flex min-h-20 items-end border border-black/10 bg-[#FAF9F6]/90 p-3 sm:min-h-24 sm:p-4"
        >
          <span className="absolute right-3 top-3 font-mono text-[0.6875rem] text-black/35">
            0{index + 1}
          </span>
          <span className={cx(TYPE.node, "text-black/75")}>{item}</span>
        </div>
      ))}
    </div>
  </Panel>
);

/* Three distinct use cases, one footage decision model. */
const UseCasePanel = () => (
  <Panel label="Three cases" meta="One decision model">
    <div className="grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
      {[
        ["CORPORATE FILM", "A 60-second cut built from a single shoot day."],
        ["AI EDIT VERSION", "AI used for motion, transitions and finishing."],
        ["SOCIAL ADS", "Many short cuts pulled from the same material."],
      ].map(([label, body]) => (
        <div key={label} className="bg-[#FAF9F6] p-4 md:p-5">
          <span className={cx(TYPE.meta, "text-lime-600")}>{label}</span>
          <p className="mt-3 text-[0.8125rem] leading-[1.65] text-black/75">{body}</p>
        </div>
      ))}
    </div>
  </Panel>
);

export default function MyntraCorporateDetail({ onClose, mode }) {
  const closeLabel = mode === "modal" ? "Close" : "Back to Home";

  return (
    <CaseStudyRoot mode={mode} dataAttr="data-myntra-detail">
      <TopBar
        section="Myntra"
        project="Corporate Video Production"
        closeLabel={closeLabel}
        onClose={onClose}
      />

      <CaseStudyScroll dataAttr="data-myntra-scroll">
        <main>
          <HeroSection
            kicker="Corporate Video / Fashion Commerce"
            lead="A corporate video produced for Myntra — shot on one day, then cut into a main film, an AI-assisted edit version, and social ad variants from the same footage."
          >
            <h1 className={cx(TYPE.display, "mt-7 md:mt-9")}>
              MYNTRA <Outline>CORPORATE</Outline>
            </h1>
          </HeroSection>

          <SectionShell>
            <Gutter className="pb-14 sm:pb-16 md:pb-20">
              <IntroGrid heading="ONE SHOOT, THREE DELIVERABLES">
                <p>
                  Corporate video work is rarely about one film. It is about how much
                  usable material comes out of a shoot day that is booked for a day.
                </p>
                <p>
                  This project was planned around that: shoot for the edit, not for the
                  schedule, and treat every version as a cut of the same material.
                </p>
              </IntroGrid>

              <Reveal delay={0.22} className="mt-10 md:mt-12">
                <ConceptStrip
                  items={[
                    "Corporate Video",
                    "Video Production",
                    "Video Editing",
                    "AI Video Editing",
                    "Creative Direction",
                    "Social Media Ads",
                  ]}
                />
                <UseCasePanel />
              </Reveal>

              <BodyGrid className="mt-12 md:mt-16">
                <CaseStudyIndex
                  title="Production map"
                  idPrefix="myntra"
                  scrollAttr="data-myntra-scroll"
                  items={[
                    ["01", "Concept"],
                    ["02", "Pre-production"],
                    ["03", "Shoot"],
                    ["04", "Clean-up"],
                    ["05", "Edit"],
                    ["06", "AI edit"],
                    ["07", "Ads"],
                    ["08", "Versions"],
                  ]}
                />

                <SectionColumn>
                  <CaseStudySection
                    number="01"
                    note="Corporate video / concept"
                    title="CONCEPT & SCRIPT"
                    id="myntra-01"
                  >
                    <p>
                      The concept had to work as a corporate film and still give a
                      social team something to cut down later, so the script was built
                      with clear sections and self-contained visual beats.
                    </p>
                    <FlowDiagram
                      items={[
                        "OBJECTIVE",
                        "TONE",
                        "SECTIONS",
                        "VISUAL BEATS",
                        "SOCIAL HOOK",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="02"
                    note="Corporate video / pre-production"
                    title="PRE-PRODUCTION"
                    id="myntra-02"
                    dark
                  >
                    <p>
                      Shot lists were built for coverage, with every frame that might be
                      unusable for social accounted for before the camera rolled.
                    </p>
                    <NodeRows
                      dark
                      items={[
                        "Shot list designed for the main cut and the social cuts together",
                        "Wardrobe and set dressing checked against on-screen graphics",
                        "Framing planned so vertical crops still hold up",
                        "Contingency frames shot for transitions and gaps",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="03"
                    note="Corporate video / production"
                    title="THE SHOOT"
                    id="myntra-03"
                  >
                    <p>
                      One production day, captured at full quality. The priority was
                      clean, complete coverage over stylisation that would limit what
                      could still be cut later.
                    </p>
                    <ConceptStrip
                      items={[
                        "Corporate film",
                        "Fashion commerce",
                        "Full-quality capture",
                        "Coverage-first framing",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="04"
                    note="Corporate video / post"
                    title="FOOTAGE CLEAN-UP"
                    id="myntra-04"
                    dark
                  >
                    <p>
                      Corporate footage is unforgiving. Stray logos, visible signage,
                      creases and reflections read instantly on a brand film, so they
                      get removed before the edit is judged on anything else.
                    </p>
                    <CleanerChecklist />
                  </CaseStudySection>

                  <CaseStudySection
                    number="05"
                    note="Corporate video / post"
                    title="MAIN EDIT"
                    id="myntra-05"
                  >
                    <p>
                      The main cut was assembled around the script sections — pacing,
                      transitions and music built to the structure rather than to the
                      footage length.
                    </p>
                    <PullQuote
                      className="my-7"
                      kicker="What a corporate film has to get right"
                      body="Nothing flashy. Clean, on time, and invisible."
                    />
                    <ConceptStrip
                      items={["Pacing", "Transitions", "Music", "Sound", "Colour"]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="06"
                    note="Corporate video / post"
                    title="AI-ASSISTED EDIT VERSION"
                    id="myntra-06"
                    dark
                  >
                    <p>
                      A second version used AI in post — motion, transitions and
                      finishing — to produce a distinctly different feel from the same
                      shoot, without booking more production time.
                    </p>
                    <FlowDiagram
                      dark
                      items={[
                        "SAME FOOTAGE",
                        "AI MOTION",
                        "AI TRANSITIONS",
                        "FINISHING PASS",
                        "SECOND VERSION",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="07"
                    note="Corporate video / performance"
                    title="SOCIAL MEDIA ADS"
                    id="myntra-07"
                  >
                    <p>
                      Short ad cuts were pulled from the same material and shaped for
                      feed behaviour — fast openings, a clear read, and enough version
                      variety to test against each other.
                    </p>
                    <NodeCards
                      items={[
                        "Short cuts built for the first three seconds.",
                        "Multiple versions so performance can actually be compared.",
                        "Captions and audio checked for muted feed playback.",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="08"
                    note="Corporate video / delivery"
                    title="DELIVERABLES"
                    id="myntra-08"
                    dark
                  >
                    <p>
                      The project delivered a main corporate video, an AI-assisted edit
                      version, and a set of social ad cuts — all from one production day.
                    </p>
                    <NodeRows
                      dark
                      items={[
                        "Corporate film — main edit",
                        "AI-assisted edit version",
                        "Social media ad cuts for feed testing",
                        "Footage cleared for further internal cuts",
                      ]}
                    />
                    <FlowDiagram
                      dark
                      items={[
                        "ONE SHOOT DAY",
                        "ONE SET",
                        "THREE DELIVERABLES",
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
                  <Kicker dark>What corporate production teaches</Kicker>
                  <h2 className={cx(TYPE.displayXL, "mt-5 max-w-[16ch]")}>
                    SHOOT FOR THE <span className="text-lime-300">EDIT</span>
                  </h2>
                </Reveal>
                <Reveal
                  delay={0.1}
                  className="mt-10 grid gap-8 md:mt-12 md:grid-cols-[0.9fr_1.1fr] md:gap-10 lg:gap-16"
                >
                  <MonoLead>
                    Corporate polish is mostly problem-solving that nobody should notice.
                  </MonoLead>
                  <div className={cx(TYPE.body, "space-y-5", TEXT.body(true))}>
                    <p>
                      The visible part of this job is a clean sixty seconds. The work is
                      in the coverage that was shot for it, the clean-up that made the
                      footage usable, and the versions that came out of the same day
                      without a second shoot.
                    </p>
                    <p>
                      AI did not replace any of that — it made the material produce more
                      than one idea could.
                    </p>
                  </div>
                </Reveal>
                <BandFooter left="MYNTRA CORPORATE VIDEO" />
              </Gutter>
            </SectionShell>
          </DarkBand>
        </main>
      </CaseStudyScroll>
    </CaseStudyRoot>
  );
}