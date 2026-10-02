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

/* The three content lanes this channel runs in, as the same dotted panel used
   for the other structured breakdowns. */
const ContentLanes = () => (
  <Panel label="Content lanes" meta="Daily Bhakti">
    <div className="grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
      {[
        ["DEVOTIONAL", "Marathi storytelling — stories, teachings and scripture made watchable."],
        ["FESTIVAL", "Seasonal specials built around the calendar, released on the day."],
        ["ADVERTISEMENTS", "Promotional and brand work delivered on the same production cycle."],
      ].map(([label, body]) => (
        <div key={label} className="bg-[#FAF9F6] p-4 md:p-5">
          <span className={cx(TYPE.meta, "text-lime-600")}>{label}</span>
          <p className="mt-3 text-[0.8125rem] leading-[1.65] text-black/75">{body}</p>
        </div>
      ))}
    </div>
  </Panel>
);

const ArcPanel = () => (
  <Panel label="Story arc" meta="Per episode">
    <div className="grid gap-2 sm:grid-cols-4">
      {["SETUP", "CONFLICT", "TURN", "MESSAGE"].map((item, index) => (
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

export default function DailyBhaktiDetail({ onClose, mode }) {
  const closeLabel = mode === "modal" ? "Close" : "Back to Home";

  return (
    <CaseStudyRoot mode={mode} dataAttr="data-daily-bhakti-detail">
      <TopBar
        section="Daily Bhakti"
        project="AI Video & Devotional Content"
        closeLabel={closeLabel}
        onClose={onClose}
      />

      <CaseStudyScroll dataAttr="data-daily-bhakti-scroll">
        <main>
          <HeroSection
            kicker="Own Channel / Devotional Content"
            lead="Marathi devotional storytelling produced with AI concepts, scripts, characters, scenes, editing and festival specials — plus advertisements on the same cycle."
          >
            <h1 className={cx(TYPE.display, "mt-7 md:mt-9")}>
              DAILY <Outline>BHAKTI</Outline>
            </h1>
          </HeroSection>

          <SectionShell>
            <Gutter className="pb-14 sm:pb-16 md:pb-20">
              <IntroGrid heading="WHY DEVOTIONAL CONTENT WORKS">
                <p>
                  Devotional content is not advertising — which makes it the hardest
                  thing to make. There is no hook selling anything, no product shot and
                  no offer. The video has to hold attention on the strength of the story
                  alone.
                </p>
                <p>
                  That constraint is the same one that shapes performance creative, and
                  it is why the two feed each other.
                </p>
              </IntroGrid>

              <Reveal delay={0.22} className="mt-10 md:mt-12">
                <ConceptStrip
                  items={[
                    "Marathi Storytelling",
                    "AI Video Concepts",
                    "Devotional Scripts",
                    "Character Development",
                    "Scene Direction",
                    "AI Visuals",
                    "Video Editing",
                    "Social Media Video",
                  ]}
                />
                <ContentLanes />
              </Reveal>

              <BodyGrid className="mt-12 md:mt-16">
                <CaseStudyIndex
                  title="Production map"
                  idPrefix="daily-bhakti"
                  scrollAttr="data-daily-bhakti-scroll"
                  items={[
                    ["01", "Concept"],
                    ["02", "Script"],
                    ["03", "Language"],
                    ["04", "Characters"],
                    ["05", "Visuals"],
                    ["06", "Editing"],
                    ["07", "Festival"],
                    ["08", "Publishing"],
                  ]}
                />

                <SectionColumn>
                  <CaseStudySection
                    number="01"
                    note="AI video / concept"
                    title="AI VIDEO CONCEPTS"
                    id="daily-bhakti-01"
                  >
                    <p>
                      Ideas come from the calendar and from what people actually ask
                      about. Each concept is a story someone would want finished, not
                      an abstract theme.
                    </p>
                    <FlowDiagram
                      items={[
                        "OCCASION",
                        "STORY IDEA",
                        "EMOTION",
                        "FORMAT",
                        "PLATFORM",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="02"
                    note="AI video / scripting"
                    title="DEVOTIONAL SCRIPTS"
                    id="daily-bhakti-02"
                    dark
                  >
                    <p>
                      The script has to carry the meaning accurately and still work as
                      a piece of video. That means writing for a listener first and a
                      viewer second.
                    </p>
                    <PullQuote
                      className="my-7"
                      kicker="The line I keep honest"
                      body="If the story only works when you read it, it is not finished."
                    />
                    <ConceptStrip
                      dark
                      items={[
                        "Narration",
                        "Dialogue",
                        "Scripture reference",
                        "Pacing beats",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="03"
                    note="AI video / scripting"
                    title="MARATHI STORYTELLING"
                    id="daily-bhakti-03"
                  >
                    <p>
                      Marathi has its own rhythm, and that rhythm decides the edit.
                      Sentence length, cadence and where the voice pauses all change how
                      a scene feels.
                    </p>
                    <NodeCards
                      items={[
                        "Narration written for the ear, not the page.",
                        "Word choice chosen for register, so devotion never slides into informality.",
                        "Pauses placed deliberately — the silence is part of the storytelling.",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="04"
                    note="AI video / direction"
                    title="CHARACTERS & SCENES"
                    id="daily-bhakti-04"
                    dark
                  >
                    <p>
                      Recurring characters give the channel continuity. A viewer should
                      recognise the same figure across dozens of videos, and the same
                      applies to the world each story is set in.
                    </p>
                    <ArcPanel />
                  </CaseStudySection>

                  <CaseStudySection
                    number="05"
                    note="AI video / production"
                    title="AI VISUALS"
                    id="daily-bhakti-05"
                  >
                    <p>
                      Visuals follow the same direction discipline as the ad work:
                      reference set first, scenes designed, then generation — so the
                      look stays consistent across a daily publishing rhythm.
                    </p>
                    <ConceptStrip
                      items={[
                        "Reference frames",
                        "Scene direction",
                        "Consistent palette",
                        "Live-action inserts",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="06"
                    note="AI video / post"
                    title="EDITING"
                    id="daily-bhakti-06"
                    dark
                  >
                    <p>
                      Editing carries the narration, so the cut follows the voice. Music
                      is scored to hold space underneath it, and captions are accurate
                      because most views are muted.
                    </p>
                    <NodeCards
                      dark
                      items={[
                        "Cut follows the narration, not the shot length.",
                        "Music leaves room for the voice rather than competing with it.",
                        "Captions checked for meaning and timing, not generated and left.",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="07"
                    note="AI video / calendar"
                    title="FESTIVAL CONTENT"
                    id="daily-bhakti-07"
                  >
                    <p>
                      Festival content is planned ahead and released on the day, when
                      people are actually looking for it. Publishing late on a festival
                      is the same as not publishing at all.
                    </p>
                    <FlowDiagram
                      items={[
                        "CALENDAR",
                        "PLAN AHEAD",
                        "PREPARE",
                        "RELEASE ON THE DAY",
                        "EXTEND",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="08"
                    note="AI video / channels"
                    title="SOCIAL MEDIA & ADVERTISEMENTS"
                    id="daily-bhakti-08"
                    dark
                  >
                    <p>
                      The same production cycle carries the social media videos and the
                      advertisements — which keeps one system paying for itself instead
                      of running three.
                    </p>
                    <FlowDiagram
                      dark
                      items={[
                        "STORY",
                        "SHORT CUT",
                        "SOCIAL POST",
                        "AD CREATIVE",
                        "FESTIVAL CUT",
                      ]}
                    />
                    <p>
                      One story produces more usable output than one video would, which
                      is the only way a daily cadence holds up.
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
                  <Kicker dark>What devotional work taught me</Kicker>
                  <h2 className={cx(TYPE.displayXL, "mt-5 max-w-[16ch]")}>
                    STORY BEATS <span className="text-lime-300">EFFECTS</span>
                  </h2>
                </Reveal>
                <Reveal
                  delay={0.1}
                  className="mt-10 grid gap-8 md:mt-12 md:grid-cols-[0.9fr_1.1fr] md:gap-10 lg:gap-16"
                >
                  <MonoLead>
                    An ad can borrow attention. A story has to earn it.
                  </MonoLead>
                  <div className={cx(TYPE.body, "space-y-5", TEXT.body(true))}>
                    <p>
                      With an ad, a good visual buys you a few seconds of attention. With
                      devotional content there is nothing to fall back on — the only thing
                      that works is a story told well enough that someone stays for the
                      ending.
                    </p>
                    <p>
                      That is the discipline that shows up in every ad I make: if the
                      idea underneath the visual is weak, no amount of polish rescues it.
                    </p>
                  </div>
                </Reveal>
                <BandFooter left="DAILY BHAKTI" />
              </Gutter>
            </SectionShell>
          </DarkBand>
        </main>
      </CaseStudyScroll>
    </CaseStudyRoot>
  );
}
