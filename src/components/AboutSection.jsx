import { memo, useState, lazy, Suspense } from 'react';
import { Gsap } from '../utils/gsapAnimate';
import { Trophy, ArrowUpRight } from 'lucide-react';
import { asset } from '../utils/assets';

const ProfileDetailModal = lazy(() => import('./ProfileDetailModal'));

/* ─────────────────────────────────────────
   Static data
   ───────────────────────────────────────── */
const achievements = [
  {
    icon: Trophy,
    rank: 'AI Director',
    category: 'Current Role',
    title: 'Inkpen Labs',
    event: 'AI Director — AI Video & Performance Creative',
    year: 'Present',
    description: 'Creating AI-driven advertising creatives and content for Meta platforms while managing large-scale video and digital content production.',
  },
];

/* ─────────────────────────────────────────
   Achievement Card
   ───────────────────────────────────────── */
const AchievementCard = ({ achievement, index, onClick }) => {
  const Icon = achievement.icon;

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <Gsap.div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.12 + index * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="group relative w-full cursor-pointer rounded-[8px] overflow-hidden border border-black/[0.08] bg-[#FFFEFC] shadow-[0_4px_14px_rgba(0,0,0,0.03)] hover:border-black/[0.14] hover:shadow-[0_10px_28px_rgba(0,0,0,0.06)] focus-visible:border-black/30 focus-visible:shadow-[0_10px_28px_rgba(0,0,0,0.06)] focus-visible:outline-none transition-all duration-300"
    >
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-lime-300/[0.16] blur-3xl opacity-35 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-lime-200/[0.08] via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute inset-0 border border-black/[0.03] rounded-[8px] pointer-events-none" />

      <div className="relative z-10 p-5 sm:p-6 md:p-7 lg:p-8">
        {/* Top meta row — tags left, year + icon right */}
        <div className="flex items-center justify-between gap-4 mb-7 md:mb-8">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {/* Category tag */}
            <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-black/45 border border-black/[0.1] px-2.5 py-1 rounded-[2px] bg-white/90 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
              {achievement.category}
            </span>
            {/* Rank badge */}
            {achievement.rank && (
              <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.18em] bg-black text-white px-2.5 py-1 rounded-[2px]">
                {achievement.rank}
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            {/* Year */}
            <span className="font-mono text-[11px] font-bold text-black/45 tabular-nums">
              {achievement.year}
            </span>
            <span className="hidden sm:block h-6 w-px bg-black/[0.09]" />
            {/* Icon circle */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border border-black/[0.1] bg-white/95 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover:border-black/20 transition-all duration-300">
              <Icon size={17} className="text-black/35 group-hover:text-black/55 transition-colors duration-300" />
            </div>
          </div>
        </div>

        {/* Title + copy — one shared left axis */}
        <div className="flex items-start gap-3 md:gap-4">
          {/* Index badge */}
          <span className="mt-1 md:mt-1.5 shrink-0 font-mono text-[10px] text-black/22 font-bold tabular-nums select-none border border-black/[0.08] px-1.5 py-0.5 rounded-[2px] leading-none">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="flex-1 min-w-0 lg:max-w-[680px]">
            <h3 className="font-display font-bold text-[26px] md:text-[32px] tracking-[-0.022em] text-black leading-[1.04]">
              {achievement.title}
            </h3>

            {/* Role label */}
            <p className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-[0.16em] text-black/50 mt-3">
              {achievement.event}
            </p>

            {/* Description */}
            {achievement.description && (
              <p className="text-[13px] md:text-[14px] text-black/58 font-light leading-[1.75] mt-4">
                {achievement.description}
              </p>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-7 md:mt-8 pt-5 border-t border-black/[0.07] flex">
          <span className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 border border-black/[0.12] bg-white rounded-[3px] px-4 py-2.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-bold text-black/60 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300">
            Click to View Details
            <ArrowUpRight size={15} strokeWidth={2.2} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </Gsap.div>
  );
};

/* ─────────────────────────────────────────
   Main Component
   ───────────────────────────────────────── */
const AboutSection = memo(function AboutSection() {
  const [showProfileDetail, setShowProfileDetail] = useState(false);

  return (
    <section id="about-section" className="py-20 md:py-28 w-full relative bg-[#FAF9F6] overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute right-0 top-1/4 w-[520px] h-[520px] bg-lime-300/[0.07] rounded-full blur-[110px]" />
        <div className="absolute -left-24 bottom-0 w-[380px] h-[380px] bg-black/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1380px] mx-auto px-6 md:px-12 relative z-10">

        {/* ── Section Label ── */}
        <div className="grid lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] gap-x-14 lg:gap-x-20 xl:gap-x-28 gap-y-12 md:gap-y-14 items-start">

          {/* ══════════════════════════════
              LEFT COLUMN — Image & Meta
              ══════════════════════════════ */}
          <Gsap.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            /* No sticky/offset here on purpose. The grid is `items-start`, so both
               columns already share a top edge and the photo's frame lines up with
               "Founder & CEO" for free. `lg:sticky lg:top-28` was what pushed the
               photo 112px down: the photo column (550px) is taller than the copy
               column (454px), so sticky had zero travel room and never engaged —
               it only clamped the frame 112px below the navbar. Dropping it (and
               the negative margin that had no effect) restores the flush alignment. */
          >
            {/* Profile image with decorative offset border */}
            <div className="relative">
              <div className="absolute -top-2.5 -left-2.5 w-full h-full border border-lime-400/25 rounded-[4px] pointer-events-none" />

              <div className="relative aspect-[4/5] w-full rounded-[4px] overflow-hidden border border-black/[0.07] bg-black/[0.04] group">
                {/* Hover desaturation overlay */}
                <div className="absolute inset-0 bg-black/[0.12] group-hover:bg-transparent transition-colors duration-700 z-10 mix-blend-multiply pointer-events-none" />

                <picture>
                  <source srcSet={asset('/profilee.webp')} type="image/webp" />
                  <img
                    src={asset('/profilee.webp')}
                    alt="Om Thombre"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top grayscale-[25%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </picture>

                {/* Name plate at bottom */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pt-10 pb-4 bg-gradient-to-t from-black/65 via-black/30 to-transparent z-20">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/50 mb-0.5">Name</p>
                  <p className="text-white font-bold text-[15px] tracking-wide leading-snug">Om Thombre</p>
                </div>

                {/* Corner brackets */}
                <span className="absolute top-3.5 left-3.5 w-5 h-px bg-white/65 z-20" />
                <span className="absolute top-3.5 left-3.5 w-px h-5 bg-white/65 z-20" />
                <span className="absolute bottom-3.5 right-3.5 w-5 h-px bg-white/65 z-20" />
                <span className="absolute bottom-3.5 right-3.5 w-px h-5 bg-white/65 z-20" />
              </div>
            </div>
          </Gsap.div>

          {/* ══════════════════════════════
              RIGHT COLUMN — Content
              ══════════════════════════════ */}
          <div className="flex flex-col">

            {/* Headline */}
            <Gsap.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 md:mb-10"
            >
              {/* Main title */}
              <h2 className="font-display font-bold tracking-[-0.025em] leading-[1.08] text-black">
                <span className="block text-[40px] sm:text-[52px] lg:text-[60px] xl:text-[68px]">
                  AI Director
                </span>

                <span className="block text-[21px] sm:text-[25px] lg:text-[29px] xl:text-[33px] font-medium tracking-[-0.01em] text-black/55 mt-2">
                  AI Video Editor &amp; Creative Strategist
                </span>
              </h2>
            </Gsap.div>

            {/* Role subtitle */}
            <Gsap.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.65 }}
              className="flex items-center gap-3 mb-8 md:mb-9"
            >

              <span className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-[0.2em] text-black/35">
                AI Video Direction · Script &amp; Story · Video Editing · Performance Creative · Content Operations
              </span>
            </Gsap.div>

            {/* Bio */}
            <Gsap.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14, duration: 0.75, ease: 'easeOut' }}
              className="space-y-4 text-[15px] md:text-[15.5px] font-light text-black/60 leading-[1.88] max-w-[580px]"
            >
              <p>
                I'm <strong className="text-black font-semibold">Om Thombre</strong>, an AI Director and Video Creative experienced in AI-powered video production, short-form advertising, storytelling, scripting, video editing, and performance-driven content.
              </p>
              <p>
                Currently I'm at <strong className="text-black font-semibold">Inkpen Labs</strong>, creating AI-driven advertising creatives and content for Meta platforms while managing large-scale video and digital content production — 2,700+ assets across video statuses, static statuses, live wallpapers and static wallpapers.
              </p>
            </Gsap.div>

            {/* Divider */}
            <div className="mt-10 md:mt-12 h-px bg-black/[0.07] max-w-[580px]" />

          </div>

          {/* Achievements — own full-width grid row so the card stays
              centred in the section instead of hugging the right column. */}
          {achievements.length > 0 && (
            <Gsap.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.75 }}
              className="lg:col-span-2 w-full"
            >
              <div className="mx-auto w-full max-w-[940px]">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-[5px] h-[5px] rounded-full bg-lime-500 shrink-0" />
                  <div className="flex-1 h-px bg-gradient-to-r from-black/[0.1] to-transparent" />
                </div>

                <div className="flex flex-col gap-3">
                  {achievements.map((achievement, index) => (
                    <AchievementCard
                      key={index}
                      achievement={achievement}
                      index={index}
                      onClick={() => setShowProfileDetail(true)}
                    />
                  ))}
                </div>
              </div>
            </Gsap.div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Suspense fallback={null}>
        <ProfileDetailModal
          isOpen={showProfileDetail}
          onClose={() => setShowProfileDetail(false)}
        />
      </Suspense>

    </section>
  );
});

export default AboutSection;
