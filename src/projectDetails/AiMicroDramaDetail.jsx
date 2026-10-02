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

/* Three-act beat sheet, rendered as the same dotted instrument panel the other
   case studies use for structured breakdowns. */
const BeatSheet = () => (
  <Panel label="Beat sheet" meta="Three acts">
    <div className="grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
      {[
        ["ACT I", "Set up the character and the want. Something is wrong before anything good happens."],
        ["ACT II", "Pressure escalates. The plan to fix it fails in a way that raises the stakes."],
        ["ACT III", "Resolution, and a final beat that lands the theme instead of explaining it."],
      ].map(([label, body]) => (
        <div key={label} className="bg-[#FAF9F6] p-4 md:p-5">
          <span className={cx(TYPE.meta, "text-lime-600")}>{label}</span>
          <p className="mt-3 text-[0.8125rem] leading-[1.65] text-black/75">{body}</p>
        </div>
      ))}
    </div>
  </Panel>
);

const ContinuityPanel = () => (
  <Panel label="Shot continuity" meta="AI + live-action">
    <div className="grid gap-2 sm:grid-cols-4">
      {["REFERENCE", "GENERATE", "SELECT", "MATCH"].map((item, index) => (
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

export default function AiMicroDramaDetail({ onClose, mode }) {
  const closeLabel = mode === "modal" ? "Close" : "Back to Home";

  return (
    <CaseStudyRoot mode={mode} dataAttr="data-micro-drama-detail">
      <TopBar
        section="AI Video Production"
        project="AI-Generated Micro-Drama"
        closeLabel={closeLabel}
        onClose={onClose}
      />

      <CaseStudyScroll dataAttr="data-micro-drama-scroll">
        <main>
          <HeroSection
            kicker="Self-Initiated / AI Production"
            lead="A short film made almost entirely with AI — taken from a blank page to a finished, sound-designed cut."
          >
            <h1 className={cx(TYPE.display, "mt-7 md:mt-9")}>
              <span className="block">AI VIDEO</span>
              <Outline className="mt-2 block" as="span">
                MICRO-DRAMA
              </Outline>
            </h1>
          </HeroSection>

          <SectionShell>
            <Gutter className="pb-14 sm:pb-16 md:pb-20">
              <IntroGrid heading="WHY A MICRO-DRAMA">
                <p>
                  Short-form advertising taught me that a clip has about three seconds
                  to earn attention. A micro-drama is the harder version of the same
                  problem: keep someone watching when there is no product to sell yet.
                </p>
                <p>
                  So the project was treated like a real film — script first, characters
                  and scenes designed before generation, then edit, sound and delivery.
                </p>
              </IntroGrid>

              <Reveal delay={0.22} className="mt-10 md:mt-12">
                <ConceptStrip
                  items={[
                    "Story Development",
                    "Scriptwriting",
                    "Character Development",
                    "Scene Direction",
                    "AI Video Generation",
                    "Video Editing",
                    "Sound Design",
                    "Captions",
                  ]}
                />
                <BeatSheet />
              </Reveal>

              <BodyGrid className="mt-12 md:mt-16">
                <CaseStudyIndex
                  title="Production map"
                  idPrefix="micro-drama"
                  scrollAttr="data-micro-drama-scroll"
                  items={[
                    ["01", "Story"],
                    ["02", "Script"],
                    ["03", "Characters"],
                    ["04", "Scenes"],
                    ["05", "Generation"],
                    ["06", "Editing"],
                    ["07", "Sound"],
                    ["08", "Delivery"],
                  ]}
                />

                <SectionColumn>
                  <CaseStudySection
                    number="01"
                    note="AI production / pre-production"
                    title="STORY DEVELOPMENT"
                    id="micro-drama-01"
                  >
                    <p>
                      The story had to survive without a talking head explaining it. So
                      the whole thing runs on one character, one want and one thing going
                      wrong.
                    </p>
                    <PullQuote
                      className="my-7"
                      kicker="The rule I set for this project"
                      body="If a shot does not move the story forward, it does not go in the film."
                    />
                    <FlowDiagram
                      items={[
                        "WANT",
                        "OBSTACLE",
                        "ESCALATION",
                        "TURN",
                        "RESOLUTION",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="02"
                    note="AI production / pre-production"
                    title="SCRIPT"
                    id="micro-drama-02"
                    dark
                  >
                    <p>
                      The script was written to be produced, not just read. Every line
                      had a visual that could carry it, and every beat had a length.
                    </p>
                    <p>
                      Dialogue was kept short because AI lip-sync and generated voice
                      are still the weakest link in the chain — so the script works
                      around them instead of leaning on them.
                    </p>
                    <ConceptStrip
                      dark
                      items={["Dialogue", "Action lines", "Beat timing", "Off-screen narration"]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="03"
                    note="AI production / pre-production"
                    title="CHARACTER DEVELOPMENT"
                    id="micro-drama-03"
                  >
                    <p>
                      One character, designed properly — face, wardrobe, posture, voice.
                      Locking that early is what stopped the film drifting between
                      generations.
                    </p>
                    <NodeCards
                      items={[
                        "A reference set the character is judged against in every shot.",
                        "Wardrobe and silhouette stay fixed so identity reads instantly.",
                        "Voice and mannerisms carry across cuts the face alone cannot.",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="04"
                    note="AI production / pre-production"
                    title="SCENE DIRECTION"
                    id="micro-drama-04"
                    dark
                  >
                    <p>
                      Each scene was boarded as a set of specific shots — size, angle,
                      lens feel and light. Generation followed the board rather than the
                      prompt alone.
                    </p>
                    <FlowDiagram
                      dark
                      items={[
                        "ESTABLISH",
                        "MEDIUM",
                        "CLOSE",
                        "REACTION",
                        "OBJECT",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="05"
                    note="AI production / production"
                    title="AI VIDEO GENERATION"
                    id="micro-drama-05"
                  >
                    <p>
                      Shots were generated, reviewed and regenerated. Continuity between
                      adjacent shots was treated as a real problem, not something the
                      model would handle on its own.
                    </p>
                    <ContinuityPanel />
                    <p>
                      Live-action reference material was used where a real texture — a
                      hand, a reflection, a face at a genuine angle — beat a generated
                      equivalent.
                    </p>
                    <ConceptStrip
                      items={[
                        "Shot list",
                        "Reference frames",
                        "Continuity notes",
                        "AI + live-action",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="06"
                    note="AI production / post"
                    title="EDITING"
                    id="micro-drama-06"
                    dark
                  >
                    <p>
                      The edit is where generated footage starts behaving like film.
                      Pacing, rhythm and transitions were tuned against the script beats,
                      not against how long each shot took to generate.
                    </p>
                    <NodeCards
                      dark
                      items={[
                        "Pacing follows the story arc, not the shot count.",
                        "Transitions are cut or motivated, never added to hide a join.",
                        "Rhythm is varied so the film never settles into one tempo.",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="07"
                    note="AI production / post"
                    title="SOUND & CAPTIONS"
                    id="micro-drama-07"
                  >
                    <p>
                      Music was scored to the arc, SFX were used to make transitions
                      land, and captions were written and timed so the film still works
                      muted.
                    </p>
                    <ConceptStrip
                      items={[
                        "Music",
                        "SFX",
                        "Captions",
                        "Mix balance",
                        "Muted-playback check",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="08"
                    note="AI production / delivery"
                    title="FINAL OUTPUT"
                    id="micro-drama-08"
                    dark
                  >
                    <p>
                      Delivered as a finished short film with platform-ready ratios, not
                      a test render.
                    </p>
                    <FlowDiagram
                      dark
                      items={[
                        "IDEA",
                        "SCRIPT",
                        "DIRECTION",
                        "GENERATION",
                        "EDIT",
                        "SOUND",
                        "FINAL CUT",
                      ]}
                    />
                    <p>
                      The run also produced reusable characters, scenes and shot
                      templates — assets that made the next production start faster
                      instead of from zero.
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
                  <Kicker dark>What the project proved</Kicker>
                  <h2 className={cx(TYPE.displayXL, "mt-5 max-w-[16ch]")}>
                    AI IS A <span className="text-lime-300">PRODUCTION STEP</span>
                  </h2>
                </Reveal>
                <Reveal
                  delay={0.1}
                  className="mt-10 grid gap-8 md:mt-12 md:grid-cols-[0.9fr_1.1fr] md:gap-10 lg:gap-16"
                >
                  <MonoLead>
                    The generation is the easy part. Directing it is the job.
                  </MonoLead>
                  <div className={cx(TYPE.body, "space-y-5", TEXT.body(true))}>
                    <p>
                      A micro-drama has no ad account to hide behind. If the character
                      is inconsistent, the cut is muddy or the sound is wrong, there is
                      nowhere for it to go — the film either holds or it does not.
                    </p>
                    <p>
                      That constraint is exactly what makes it useful practice for
                      everything else: the same discipline is what keeps an ad
                      watchable in three seconds.
                    </p>
                  </div>
                </Reveal>
                <BandFooter left="AI VIDEO PRODUCTION" />
              </Gutter>
            </SectionShell>
          </DarkBand>
        </main>
      </CaseStudyScroll>
    </CaseStudyRoot>
  );
}
