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

/* Same footage, same client, three different destination cuts. */
const CutMatrix = () => (
  <Panel label="One shoot, three cuts" meta="Real Estate Venture">
    <div className="grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
      {[
        ["YOUTUBE", "Longer brand film — pacing, music and narrative built for a seated viewer."],
        ["INSTAGRAM", "Shorter cut — vertical, faster opens, captions sized for feed."],
        ["META ADS", "Performance cuts — built to test against each other, not to just look good."],
      ].map(([label, body]) => (
        <div key={label} className="bg-[#FAF9F6] p-4 md:p-5">
          <span className={cx(TYPE.meta, "text-lime-600")}>{label}</span>
          <p className="mt-3 text-[0.8125rem] leading-[1.65] text-black/75">{body}</p>
        </div>
      ))}
    </div>
  </Panel>
);

/* Why b-roll matters more in property than in any other category. */
const BrollPanel = () => (
  <Panel label="B-roll set" meta="Property-specific">
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {[
        "EXTERIOR",
        "KITCHEN",
        "LIVING",
        "BEDROOM",
        "AMENITIES",
        "LOCATION",
        "HIGHLIGHTS",
        "CLOSING",
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

export default function RealEstateMediaDetail({ onClose, mode }) {
  const closeLabel = mode === "modal" ? "Close" : "Back to Home";

  return (
    <CaseStudyRoot mode={mode} dataAttr="data-real-estate-detail">
      <TopBar
        section="Real Estate Venture"
        project="Real Estate Media & Ads"
        closeLabel={closeLabel}
        onClose={onClose}
      />

      <CaseStudyScroll dataAttr="data-real-estate-scroll">
        <main>
          <HeroSection
            kicker="Real Estate / Photography to Performance"
            lead="Property photography, brand films and ad creative produced from the same shoot — then cut three ways for YouTube, Instagram and Meta."
          >
            <h1 className={cx(TYPE.display, "mt-7 md:mt-9")}>
              REAL ESTATE <Outline>MEDIA</Outline>
            </h1>
          </HeroSection>

          <SectionShell>
            <Gutter className="pb-14 sm:pb-16 md:pb-20">
              <IntroGrid heading="ONE PROPERTY, EVERY FORMAT">
                <p>
                  Property marketing lives or dies on how a place looks. So the media
                  work starts with the photography — everything after it is built from
                  frames that have already been made to look right.
                </p>
                <p>
                  One shoot produced the brand film, the Instagram content and the Meta
                  ad cuts. Each one was edited for where people actually watch it.
                </p>
              </IntroGrid>

              <Reveal delay={0.22} className="mt-10 md:mt-12">
                <ConceptStrip
                  items={[
                    "Real Estate Photography",
                    "Property Video",
                    "YouTube",
                    "Instagram",
                    "Meta Ads",
                    "Video Production",
                    "Editing",
                  ]}
                />
                <CutMatrix />
              </Reveal>

              <BodyGrid className="mt-12 md:mt-16">
                <CaseStudyIndex
                  title="Production map"
                  idPrefix="real-estate"
                  scrollAttr="data-real-estate-scroll"
                  items={[
                    ["01", "Photography"],
                    ["02", "Concept"],
                    ["03", "Video"],
                    ["04", "B-roll"],
                    ["05", "Edit"],
                    ["06", "YouTube"],
                    ["07", "Instagram"],
                    ["08", "Meta Ads"],
                  ]}
                />

                <SectionColumn>
                  <CaseStudySection
                    number="01"
                    note="Real estate media / photography"
                    title="PROPERTY PHOTOGRAPHY"
                    id="real-estate-01"
                  >
                    <p>
                      Photography is the base layer. If the frames are wrong — dark
                      rooms, unbalanced composition, no sense of scale — no edit can
                      rescue the video built on top of them.
                    </p>
                    <ConceptStrip
                      items={[
                        "Interior & exterior",
                        "Natural light priority",
                        "Sense of scale",
                        "Consistent visual standard",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="02"
                    note="Real estate media / concept"
                    title="VIDEO CONCEPT"
                    id="real-estate-02"
                    dark
                  >
                    <p>
                      The film needed to sell a lifestyle rather than list features. So
                      the structure is built around a small set of strong moments instead
                      of a walkthrough.
                    </p>
                    <FlowDiagram
                      dark
                      items={[
                        "OPEN",
                        "SPACE",
                        "LIFESTYLE",
                        "DETAIL",
                        "LOCATION",
                        "CLOSE",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="03"
                    note="Real estate media / production"
                    title="PROPERTY VIDEO PRODUCTION"
                    id="real-estate-03"
                  >
                    <p>
                      Shot to carry three different edits at once — so framing had to
                      work cropped vertical, cropped square, and full width, without
                      losing the subject of every shot.
                    </p>
                    <PullQuote
                      className="my-7"
                      kicker="The planning constraint"
                      body="If it does not hold up cropped, it does not get shot."
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="04"
                    note="Real estate media / production"
                    title="B-ROLL SET"
                    id="real-estate-04"
                    dark
                  >
                    <p>
                      B-roll carries property content more than any other category.
                      Without it, a tour is just a walkthrough.
                    </p>
                    <BrollPanel />
                  </CaseStudySection>

                  <CaseStudySection
                    number="05"
                    note="Real estate media / post"
                    title="EDITING"
                    id="real-estate-05"
                  >
                    <p>
                      One edit pass, three masters. Pacing, music and colour were
                      decided once, then the sequence was rebuilt for each platform's
                      length and aspect ratio.
                    </p>
                    <FlowDiagram
                      items={[
                        "ASSEMBLE",
                        "PACING",
                        "MUSIC",
                        "COLOUR",
                        "SOUND",
                        "CAPTIONS",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="06"
                    note="Real estate media / platforms"
                    title="YOUTUBE"
                    id="real-estate-06"
                    dark
                  >
                    <p>
                      The longest cut. It can afford to build atmosphere and hold on a
                      shot, because the viewer chose to be here.
                    </p>
                    <NodeCards
                      dark
                      items={[
                        "Brand-film pacing, not ad pacing.",
                        "Music and space given room to build the sense of place.",
                        "Narrative structure instead of a feature-by-feature tour.",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="07"
                    note="Real estate media / platforms"
                    title="INSTAGRAM"
                    id="real-estate-07"
                  >
                    <p>
                      Vertical, faster, and cut around the first second. The same
                      material, re-sequenced for feed behaviour and captions sized to be
                      read without sound.
                    </p>
                    <ConceptStrip
                      items={[
                        "9:16 vertical",
                        "Fast open",
                        "Feed-native captions",
                        "Shorter runtime",
                      ]}
                    />
                  </CaseStudySection>

                  <CaseStudySection
                    number="08"
                    note="Real estate media / performance"
                    title="META ADS"
                    id="real-estate-08"
                    dark
                  >
                    <p>
                      The ad cuts exist to be compared. Multiple versions were produced
                      from the same shoot so performance could be judged between
                      creative ideas rather than between properties.
                    </p>
                    <NodeRows
                      dark
                      items={[
                        "Multiple ad versions from a single shoot",
                        "Hooks reworked so the first three seconds differ between cuts",
                        "Same footage, different creative premise",
                        "Output measured by response, not by views alone",
                      ]}
                    />
                    <FlowDiagram
                      dark
                      items={[
                        "ONE SHOOT",
                        "PHOTOS",
                        "BRAND FILM",
                        "INSTAGRAM CUTS",
                        "META AD VARIANTS",
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
                  <Kicker dark>What property media teaches</Kicker>
                  <h2 className={cx(TYPE.displayXL, "mt-5 max-w-[16ch]")}>
                    ONE SHOOT, <span className="text-lime-300">THREE AUDIENCES</span>
                  </h2>
                </Reveal>
                <Reveal
                  delay={0.1}
                  className="mt-10 grid gap-8 md:mt-12 md:grid-cols-[0.9fr_1.1fr] md:gap-10 lg:gap-16"
                >
                  <MonoLead>
                    The shoot is the expensive part. The edits are where the reach is.
                  </MonoLead>
                  <div className={cx(TYPE.body, "space-y-5", TEXT.body(true))}>
                    <p>
                      Planning a single shoot to serve a brand film, an Instagram feed
                      and a set of Meta ad variants is what makes the whole thing
                      economical — one production, several creative directions.
                    </p>
                    <p>
                      It also forces the framing to be right from the start, because a
                      shot that only works in one aspect ratio limits every edit that
                      follows it.
                    </p>
                  </div>
                </Reveal>
                <BandFooter left="REAL ESTATE MEDIA" />
              </Gutter>
            </SectionShell>
          </DarkBand>
        </main>
      </CaseStudyScroll>
    </CaseStudyRoot>
  );
}