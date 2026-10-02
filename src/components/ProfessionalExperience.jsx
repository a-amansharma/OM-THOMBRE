import { useState } from 'react';
import { Gsap, GsapPresence } from '../utils/gsapAnimate';
// Note: scroll-triggered entrance animations removed from this section intentionally
import { Plus, Calendar, Building2, Sparkles, ArrowUpRight } from 'lucide-react';

const experiences = [
  {
    company: 'Inkpen Labs',
    role: 'AI Director',
    period: 'Present',
    impact:
      'AI-powered video advertisements and content for Meta platforms — from creative concept and script through AI generation, editing and performance-based optimization, alongside large-scale video and digital content production.',
    stack: ['AI Video Direction', 'Script & Story', 'AI + Live-Action Editing', 'Meta Performance Creative'],
    description: [
      'AI-powered video advertisements.',
      'Short-form video content.',
      'Creative concepts and scripts.',
      'Character and scene development.',
      'AI-generated visuals.',
      'AI + live-action video editing.',
      'Hooks, storytelling and transitions.',
      'Music, SFX and captions.',
      'Multiple creative variations.',
      'Meta advertising creatives.',
      'Performance-based creative optimization.',
    ],
  },
  {
    company: 'Daily Bhakti',
    role: 'AI Video & Content Production',
    period: 'Ongoing',
    impact:
      'AI video concepts and devotional content told through Marathi storytelling — scripts, characters, scenes, AI visuals and editing, published alongside advertisements, festival content and social media videos.',
    stack: ['Marathi Storytelling', 'AI Visuals', 'Festival Content', 'Social Media Video'],
    description: [
      'AI video concepts and devotional scripts.',
      'Marathi storytelling built around characters and scenes.',
      'AI visuals, editing and festival content.',
      'Advertisements and social media videos.',
    ],
  },
  {
    company: 'Myntra',
    role: 'Video Content Contractor',
    period: '2 Corporate Projects',
    impact:
      'Two official corporate video projects delivered end to end — creative execution, editing, visual enhancement, content structuring, client feedback and final delivery.',
    stack: ['Creative Execution', 'Video Editing', 'Visual Enhancement', 'Client Delivery'],
    description: [
      '2 official corporate video projects.',
      'Creative execution and editing.',
      'Visual enhancement and content structuring.',
      'Client feedback and final delivery.',
    ],
  },
  {
    company: 'Real Estate Venture',
    role: 'Co-Founder & Media Lead',
    period: 'Ongoing',
    impact:
      'Promotional videos, social media marketing and digital branding for a real estate venture — built, published and communicated with clients directly.',
    stack: ['Promotional Video', 'Social Media Marketing', 'Digital Branding', 'Operations'],
    description: [
      'Promotional videos.',
      'Social media marketing.',
      'Digital branding and marketing content.',
      'Client communication and operations.',
    ],
  },
];

const ExperienceItem = ({ experience, isExpanded, onToggle, index }) => {
  const isCurrent = /present/i.test(experience.period);

  return (
    <article className="relative min-w-0">
      <div className="absolute left-[15px] top-0 h-full w-px bg-black/[0.08]" />

      <div className="relative pl-8 min-w-0">
        <span className={`absolute left-[10px] top-8 h-[11px] w-[11px] rounded-full border ${isExpanded ? 'border-lime-500 bg-lime-500' : 'border-black/25 bg-[#FAF9F6]'}`} />

        <button
          onClick={onToggle}
          type="button"
          className="w-full max-w-full rounded-[6px] border border-black/[0.08] bg-white text-left px-5 md:px-7 py-6 md:py-7 hover:border-black/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.16em] text-black/45 border border-black/[0.1] px-2.5 py-1 rounded-[2px] inline-flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {experience.period}
                </span>
                {isCurrent && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] bg-lime-400 text-black px-2.5 py-1 rounded-[2px]">
                    Active Now
                  </span>
                )}
              </div>

              {/* Viewport-relative below sm: "DEVELOPMENT"/"ENGINEERING" are
                  single unbreakable words that needed ~159px at 24px but only
                  had 142px of column on a 320px screen, so they ran into the
                  expand button. 24px from sm up is unchanged. */}
              <h3 className="text-[clamp(1.2rem,6vw,1.5rem)] sm:text-[24px] md:text-[30px] lg:text-[34px] font-black uppercase tracking-[-0.02em] leading-[0.95] text-black">
                {experience.role}
              </h3>

              <p className="mt-2 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-black/45 inline-flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                {experience.company}
              </p>

              <p className="mt-5 text-sm md:text-[15px] font-light leading-relaxed text-black/60 max-w-3xl">
                {experience.impact}
              </p>
            </div>

            <Gsap.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`mt-1 w-10 h-10 shrink-0 rounded-full border flex items-center justify-center ${isExpanded ? 'border-black bg-black text-white' : 'border-black/20 text-black/60'}`}
            >
              <Plus className="w-4.5 h-4.5" strokeWidth={1.8} />
            </Gsap.div>
          </div>
        </button>

        <GsapPresence>
          {isExpanded && (
            <Gsap.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.22, ease: 'easeOut' },
              }}
              className="overflow-hidden"
            >
              <div className="mt-2 ml-0 rounded-[6px] border border-black/[0.08] bg-[#F7F7F3] px-5 md:px-7 py-5 md:py-6">
                <ul className="space-y-3 max-w-3xl">
                  {experience.description.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-black/60 font-light text-sm md:text-[15px] leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/30 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-black/[0.08] flex flex-wrap gap-2">
                  {experience.stack.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[9.5px] md:text-[10px] uppercase tracking-[0.14em] text-black/68 border border-black/[0.1] bg-white px-2.5 py-1 rounded-[2px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Gsap.div>
          )}
        </GsapPresence>
      </div>
    </article>
  );
};

const ProfessionalExperience = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section id="experience-section" className="pt-20 md:pt-24 pb-24 md:pb-32 w-full relative bg-[#FAF9F6] overflow-hidden overflow-x-clip">
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute right-0 top-20 w-[460px] h-[460px] bg-black/[0.025] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-[360px_1fr] gap-10 lg:gap-14 items-start min-w-0">
          <aside className="lg:sticky lg:top-24 min-w-0">
            <h2 className="text-[34px] sm:text-[46px] lg:text-[56px] font-black uppercase tracking-[-0.03em] leading-[0.95] text-black">
              Professional
              <br />
              Experience
            </h2>

            <p className="mt-5 text-[14px] md:text-[15px] font-light leading-[1.8] text-black/60 max-w-[320px]">
              From AI-powered ad creative at Inkpen Labs to devotional video production at Daily Bhakti, corporate video at Myntra, and co-founding a real estate venture — every role built on writing, directing and editing video that has to perform.
            </p>

            <div className="mt-7 flex items-center gap-2 text-black/42">
              <Sparkles className="w-3.5 h-3.5" />
              <p className="font-mono text-[9px] uppercase tracking-[0.16em]">Career timeline - expand each role</p>
            </div>
          </aside>

          <div className="relative space-y-3 min-w-0 overflow-x-clip">
            {experiences.map((experience, index) => (
              <ExperienceItem
                key={experience.company + experience.role}
                experience={experience}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() => setExpandedIndex((current) => (current === index ? null : index))}
              />
            ))}

            <div className="pl-9 pt-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/28 inline-flex items-center gap-1.5">
                End of timeline
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalExperience;
