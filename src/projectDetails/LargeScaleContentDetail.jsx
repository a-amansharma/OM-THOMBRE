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

/* Output mix, shown as a proportion strip — the same instrument-panel idiom
   used for the creative breakdowns elsewhere. */
const OutputPanel = () => (
  <Panel label="Output mix" meta="Per production cycle">
    <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
      {[
        ["600+", "Video Statuses"],
        ["600+", "Static Statuses"],
        ["300+", "Live Wallpapers"],
        ["800+", "Static Wallpapers"],
      ].map(([value, label]) => (
        <div key={label} className="bg-[#FAF9F6] p-4 md:p-5">
          <span className="block font-black tracking-tighter leading-none text-[1.75rem] text-black">
            {value}
          </span>
          <span className="mt-2.5 block font-mono text-[0.625rem] font-bold uppercase tracking-[0.16em] text-black/45 leading-[1.5]">
            {label}
          </span>
        </div>
      ))}
    </div>

    <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-2 border-black bg-black px-5 py-4">
      <span className="font-black tracking-tighter leading-none text-[2rem] text-lime-400">
        2,700+
      </span>
      <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-white/70">
        Total content assets
      </span>
    </div>
  </Panel>
);

export default function LargeScaleContentDetail({ onClose, mode }) {
  const closeLabel = mode === "modal" ? "Close" : "Back to Home";

  return (
    <CaseStudyRoot mode={mode} dataAttr="data-large-scale-detail">
      <TopBar
        section="Large-Scale Video Content"
        project="Content Operations"
        closeLabel={closeLabel}
        onClose={onClose}
      />

      <CaseStudyScroll dataAttr="data-large-scale-scroll">
        <main>
          <HeroSection
            kicker="Content Operations / High-Volume Production"
            lead="2,700+ assets delivered across video, status and wallpaper formats — planned, produced, quality-checked and shipped every cycle."
          >
            <h1 className={cx(TYPE.display, "mt-7 md:mt-9")}>
              LARGE-SCALE <Outline>CONTENT</Outline>
            </h1>
          </HeroSection>

          <SectionShell>
            <Gutter className="pb-14 sm:pb-16 md:pb-20">
              <IntroGrid heading="WHAT LARGE-SCALE ACTUALLY MEANS">
                <p>
                  Volume is not the interesting part — consistency at volume is. The
                  same quality bar has to hold across thousands of assets produced on a
                  deadline, without anyone watching every cut frame by frame.
                </p>
                <p>
                  These are team and target output figures for the production, not one
                  person's individual count.
                </p>
              </IntroGrid>

              <Reveal delay={0.22} className="mt-10 md:mt-12">
                <ConceptStrip
                  items={[
                    "Content Planning",
                    "Large-Scale Production",
                    "Production Management",
                    "Quality Control",
                    "Content Delivery",
                  ]}
                />
                <OutputPanel />
              </Reveal>

              <BodyGrid className="mt-12 md:mt-16">
                <CaseStudyIndex
                  title="Operations map"
                  idPrefix="large-scale"
                  scrollAttr="data-large-scale-scroll"
                  items={[
                    ["01", "Formats"],
                    ["02", "Planning"],
                    ["03", "Batch"],
                    ["04", "Quality"],
                    ["05", "Delivery"],
                    ["06", "Cadence"],
                    ["07", "Reuse"],
                    ["08", "Scaling"],
                  ]}
                />

                <SectionColumn>
                  <CaseStudySection
                    number="01"
                    note="Content operations / the formats"
                    title="FOUR FORMATS, ONE OPERATION"
                    id="large-scale-01"
                  >
                    <p>
                      Video statuses, static statuses, live wallpapers and static
                      wallpapers are different products with different constraints — and
                      they all come out of the same production cycle.
                    </p>
                    <FlowDiagram
                      items={[
                        "VIDEO STATUS",
                        "STATIC STATUS",
                        "LIVE WALLPAPER",
                        "STATIC WALLPAPER",
                      ]}
                    />
                    <ConceptStrip
                      items={[
                        "Vertical 9:16",
                        "Loop-safe motion",
                        "Text-safe zones",
                        "Device-ready exports",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="02"
                    note="Content operations / planning"
                    title="CONTENT PLANNING"
                    id="large-scale-02"
                    dark
                  >
                    <p>
                      Nothing gets produced that does not have a slot. The calendar,
                      the theme and the format mix are decided before production starts,
                      so nothing is made speculatively and left unused.
                    </p>
                    <PullQuote
                      className="my-7"
                      kicker="The planning question"
                      body="What does this month need, in which format, and by when?"
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="03"
                    note="Content operations / production"
                    title="BATCH PRODUCTION"
                    id="large-scale-03"
                  >
                    <p>
                      Assets are produced in themed batches rather than one at a time.
                      A batch shares a look, which means the decisions that make
                      something good are made once instead of two thousand times.
                    </p>
                    <NodeCards
                      items={[
                        "One visual direction per batch, applied consistently.",
                        "Templates and shot lists reused across the batch.",
                        "The same motion and sound language carries between assets.",
                      ]}
                    />
                    <ConceptStrip
                      items={[
                        "Templates",
                        "Batch scheduling",
                        "Shared look",
                        "Reusable elements",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="04"
                    note="Content operations / production"
                    title="PRODUCTION MANAGEMENT"
                    id="large-scale-04"
                    dark
                  >
                    <p>
                      Keeping four formats moving at once is mostly a coordination
                      problem. Queues are tracked per format so a blocked asset is
                      visible before it becomes a missed day.
                    </p>
                    <NodeRows
                      dark
                      items={[
                        "Brief and reference locked before generation starts",
                        "Asset status tracked per format across the batch",
                        "Blocked or rejected work re-queued the same day",
                        "Export settings fixed once per format, not per asset",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="05"
                    note="Content operations / quality"
                    title="QUALITY CONTROL"
                    id="large-scale-05"
                  >
                    <p>
                      At this volume, review has to be systematic rather than
                      attentive-by-feeling. Every asset goes through the same checklist,
                      and rejections feed straight back into the next batch's brief.
                    </p>
                    <FlowDiagram
                      items={[
                        "CHECKLIST",
                        "REVIEW",
                        "REJECT OR PASS",
                        "FIX BRIEF",
                        "NEXT BATCH",
                      ]}
                    />
                    <ConceptStrip
                      items={[
                        "Brand consistency",
                        "Safe zones",
                        "Audio & captions",
                        "Export correctness",
                        "No duplicate output",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="06"
                    note="Content operations / delivery"
                    title="CONTENT DELIVERY"
                    id="large-scale-06"
                    dark
                  >
                    <p>
                      Delivery is part of the craft at this scale. Naming, folder
                      structure and version control are what make 2,700+ assets
                      findable six months later.
                    </p>
                    <ConceptStrip
                      dark
                      items={[
                        "Naming convention",
                        "Per-format folders",
                        "Version control",
                        "Channel-ready exports",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="07"
                    note="Content operations / compounding"
                    title="REUSING WHAT ALREADY WORKS"
                    id="large-scale-07"
                  >
                    <p>
                      Once a batch lands, the winning elements get pulled into the
                      library. The next cycle starts from proven material instead of
                      rebuilding the same look from scratch.
                    </p>
                    <FlowDiagram
                      items={[
                        "BATCH",
                        "WHAT WORKED",
                        "ASSET LIBRARY",
                        "NEXT BATCH",
                        "HIGHER QUALITY",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="08"
                    note="Content operations / the result"
                    title="THE NUMBERS"
                    id="large-scale-08"
                    dark
                  >
                    <p>
                      600+ video statuses, 600+ static statuses, 300+ live wallpapers and
                      800+ static wallpapers — 2,700+ total content assets.
                    </p>
                    <NodeRows
                      dark
                      items={[
                        "600+ video statuses produced and delivered",
                        "600+ static statuses produced and delivered",
                        "300+ live wallpapers delivered",
                        "800+ static wallpapers delivered",
                      ]}
                    />
                    <p>
                      These figures represent team and target output for the period.
                      Individual output varies with role.
                    </p>
                  </CaseStudySection>
                </SectionColumn>
              </BodyGrid>
            </Gutter>
          </SectionShell>

          <DarkBand>
            <SectionShell>
              <Gutter>
                <Reveal>
                  <Kicker dark>What running volume teaches you</Kicker>
                  <h2 className={cx(TYPE.displayXL, "mt-5 max-w-[16ch]")}>
                    SCALE IS A <span className="text-lime-300">SYSTEM</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.1} className="mt-10 md:mt-12">
                  <FlowDiagram
                    dark
                    items={[
                      "PLAN",
                      "PRODUCE",
                      "CHECK",
                      "DELIVER",
                      "LEARN",
                      "REPEAT",
                    ]}
                  />
                </Reveal>
                <Reveal
                  delay={0.16}
                  className="mt-10 grid gap-8 border-t border-white/15 pt-8 md:mt-12 md:gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16"
                >
                  <MonoLead>
                    Output goes up because the process gets cheaper per asset.
                  </MonoLead>
                  <div className={cx(TYPE.body, "space-y-5", TEXT.body(true))}>
                    <p>
                      Individual craft does not scale linearly. What scales is the
                      system around it — planning, batching, review and reuse — so the
                      thousandth asset costs a fraction of the first.
                    </p>
                  </div>
                </Reveal>
                <BandFooter left="LARGE-SCALE CONTENT" />
              </Gutter>
            </SectionShell>
          </DarkBand>
        </main>
      </CaseStudyScroll>
    </CaseStudyRoot>
  );
}
