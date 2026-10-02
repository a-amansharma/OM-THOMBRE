import { Fragment } from 'react';
import { Gsap } from '../../utils/gsapAnimate';
import { ExternalLink } from 'lucide-react';
import {
    Reveal, Chapter, ChapterTitle, Lead, Band, Chip, Eyebrow, Rail,
} from './StoryPrimitives';
import {
    BEGINNING, PROBLEM, SOLUTION, BUILT, INNOVATION, TEAM, TRACTION, EXPLORE,
} from './storyData';

const EASE = [0.16, 1, 0.3, 1];

/* ════════════════════════════════════════════════════════════
   02 — disconnected islands diagram
   ════════════════════════════════════════════════════════════ */
const BrokenLink = () => (
    <span aria-hidden="true" className="shrink-0 w-6 md:w-10 flex flex-col gap-2 py-1">
        <span className="h-px w-3/5 bg-white/25" />
        <span className="h-px w-3/5 bg-white/25 self-end" />
    </span>
);

const IslandDiagram = () => (
    <div className="border border-white/10 bg-white/[0.02] p-5 md:p-6">
        <div className="flex items-center justify-between gap-2 md:gap-3">
            {PROBLEM.islands.map((island, i) => {
                const Icon = island.icon;
                return (
                    <Fragment key={island.label}>
                        <div className="flex-1 min-w-0 border border-dashed border-white/25 px-2 py-5 md:py-8 flex flex-col items-center gap-2.5 text-center">
                            <Icon size={17} className="text-white/40" />
                            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.12em] text-white/70 leading-tight">
                                {island.label}
                            </span>
                        </div>
                        {i < PROBLEM.islands.length - 1 && <BrokenLink />}
                    </Fragment>
                );
            })}
        </div>
    </div>
);

const ConsequenceCard = ({ item, index }) => {
    const Icon = item.icon;
    return (
        <Reveal delay={0.05 * index} className="bg-[#0A0A0A] p-5 md:p-6">
            <Icon size={16} className="text-lime-400 mb-3.5" strokeWidth={2} />
            <p className="text-[12.5px] md:text-[13.5px] leading-[1.5] text-white/80">{item.label}</p>
        </Reveal>
    );
};

/* ════════════════════════════════════════════════════════════
   04 — product cards
   ════════════════════════════════════════════════════════════ */
const BuildCard = ({ item, index }) => {
    const Icon = item.icon;
    return (
        <Gsap.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            viewport={{ once: true, amount: 0.04 }}
            transition={{ delay: 0.05 * (index % 3), duration: 0.65, ease: EASE }}
            className="group relative flex flex-col border border-black/[0.08] bg-white/70 p-5 md:p-6 transition-colors duration-300 hover:border-black/20"
        >
            <span aria-hidden="true" className="absolute left-0 top-0 h-px w-0 bg-lime-500 group-hover:w-full transition-[width] duration-500 ease-out" />
            <div className="flex items-center justify-between">
                <Icon size={18} className="text-black/35 group-hover:text-black/70 transition-colors duration-300" strokeWidth={1.75} />
                <span className="font-mono text-[10px] font-bold text-black/20 tabular-nums">{item.code}</span>
            </div>
            <h3 className="mt-5 font-black uppercase tracking-tight text-[14.5px] md:text-[17px] leading-[1.18] text-black">
                {item.title}
            </h3>
            <p className="mt-2.5 text-[12.5px] md:text-[13px] leading-[1.65] text-black/55 font-light">
                {item.desc}
            </p>
        </Gsap.div>
    );
};

/* ════════════════════════════════════════════════════════════
   05 — connected system chain
   ════════════════════════════════════════════════════════════ */
const ChainNode = ({ label, index, total }) => {
    const last = index === total - 1;
    const endsRow2 = (index + 1) % 2 === 0;
    const endsRow4 = (index + 1) % 4 === 0;

    return (
        <Reveal delay={0.045 * index} className="relative flex items-center justify-center">
            <span className={`w-full text-center border px-2.5 py-3.5 md:py-4 font-mono text-[9px] md:text-[10.5px] uppercase tracking-[0.1em] leading-[1.35] ${last ? 'border-lime-400/50 bg-lime-400/10 text-lime-300' : 'border-white/15 bg-white/[0.03] text-white/75'}`}>
                {label}
            </span>

            {!endsRow4 && (
                <span aria-hidden="true" className="hidden lg:block absolute left-full top-1/2 w-7 -translate-y-1/2 overflow-hidden">
                    <Gsap.div
                        className="w-full h-px origin-left bg-lime-400/45"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.12 + 0.045 * index, duration: 0.45, ease: EASE }}
                    />
                </span>
            )}

            {!endsRow2 && (
                <span aria-hidden="true" className="lg:hidden absolute left-1/2 top-full -translate-x-1/2 h-4 overflow-hidden">
                    <Gsap.div
                        className="w-px h-full origin-top bg-lime-400/45"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.12 + 0.045 * index, duration: 0.45, ease: EASE }}
                    />
                </span>
            )}
        </Reveal>
    );
};

/* ════════════════════════════════════════════════════════════
   06 — team
   ════════════════════════════════════════════════════════════ */
const MemberCard = ({ member, index }) => {
    const primary = member.variant === 'primary';
    const accent = member.variant === 'accent';

    return (
        <Gsap.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            viewport={{ once: true, amount: 0.04 }}
            transition={{ delay: 0.05 * (index % 4), duration: 0.65, ease: EASE }}
            className={`group relative flex flex-col border p-5 md:p-6 transition-colors duration-300 ${primary ? 'bg-[#0A0A0A] border-black' : 'bg-white/70 border-black/[0.08] hover:border-black/20'}`}
        >
            {accent && <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-[3px] bg-lime-500" />}

            <span className={`w-11 h-11 rounded-full flex items-center justify-center font-mono text-[11px] font-bold tracking-[0.04em] ${primary ? 'bg-lime-400 text-black' : 'bg-black text-white'}`}>
                {member.initials}
            </span>

            <h3 className={`mt-5 font-black uppercase tracking-tight text-[15px] md:text-[17px] leading-[1.14] ${primary ? 'text-white' : 'text-black'}`}>
                {member.name}
            </h3>
            <p className={`mt-2 font-mono text-[9.5px] md:text-[10px] uppercase tracking-[0.14em] leading-[1.5] ${primary ? 'text-lime-400' : 'text-black/45'}`}>
                {member.role}
            </p>

            <div className="mt-auto pt-5">
                {member.affiliation.map((line) => (
                    <p key={line} className={`text-[11.5px] md:text-[12px] leading-[1.5] ${primary ? 'text-white/55' : 'text-black/50'}`}>
                        {line}
                    </p>
                ))}
            </div>
        </Gsap.div>
    );
};

/* ════════════════════════════════════════════════════════════
   07 — metrics
   ════════════════════════════════════════════════════════════ */
const METRIC_SIZE = {
    xl: 'text-[30px] md:text-[38px] xl:text-[44px]',
    md: 'text-[23px] md:text-[29px] xl:text-[33px]',
    sm: 'text-[17px] md:text-[21px] xl:text-[23px]',
};

const Metric = ({ metric, index, total }) => {
    const Icon = metric.icon;
    return (
        <Reveal
            delay={0.05 * index}
            className={`bg-[#FAF9F6] p-5 md:p-6 ${index === total - 1 ? 'col-span-2 sm:col-span-1 lg:col-span-1' : ''}`}
        >
            <Icon size={16} className="text-lime-600 mb-4" strokeWidth={2} />
            <span className={`block font-black tracking-tighter leading-[0.95] break-words hyphens-none ${METRIC_SIZE[metric.scale]}`}>
                {metric.value}
            </span>
            <span className="mt-2.5 block font-mono text-[9px] md:text-[9.5px] uppercase tracking-[0.16em] text-black/45 leading-[1.4]">
                {metric.label}
            </span>
        </Reveal>
    );
};

/* ════════════════════════════════════════════════════════════
   08 — links
   ════════════════════════════════════════════════════════════ */
const LinkRow = ({ link, index }) => (
    <Reveal delay={0.06 * index}>
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 md:gap-6 border border-white/15 bg-white/[0.03] px-5 md:px-7 py-5 md:py-6 transition-colors duration-300 hover:border-lime-400/60 hover:bg-lime-400/[0.08]"
        >
            <span className="min-w-0">
                <span className="block font-black uppercase tracking-tight text-[16px] md:text-[22px] text-white group-hover:text-lime-300 transition-colors duration-300">
                    {link.label}
                </span>
                <span className="mt-1.5 block font-mono text-[10.5px] md:text-[12px] text-white/45 group-hover:text-white/70 transition-colors duration-300 break-all">
                    {link.url}
                </span>
            </span>
            <ExternalLink size={18} className="shrink-0 text-white/40 group-hover:text-lime-400 transition-colors duration-300" />
        </a>
    </Reveal>
);

/* ════════════════════════════════════════════════════════════
   Story
   ════════════════════════════════════════════════════════════ */
export default function ProfileStory() {
    return (
        <div className="space-y-16 md:space-y-24">

            {/* ── 01 · The Beginning ─────────────────────────── */}
            <Chapter index="01" title="The Beginning" className="pt-2">
                <div className="mt-6 grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-14 items-end">
                    <div>
                        <Reveal><Eyebrow>{BEGINNING.name}</Eyebrow></Reveal>
                        <Reveal delay={0.05}><ChapterTitle className="mt-3.5">AI Director</ChapterTitle></Reveal>
                        <Reveal delay={0.09}>
                            <span className="block mt-2.5 text-[17px] md:text-[24px] font-medium tracking-[-0.01em] text-black/50">
                                {BEGINNING.role.split('—')[1].trim()}
                            </span>
                        </Reveal>
                    </div>

                    <Reveal delay={0.12}>
                        <dl className="border-t border-black/[0.12]">
                            {BEGINNING.facts.map((fact) => (
                                <div key={fact.label} className="flex items-baseline justify-between gap-6 border-b border-black/[0.07] py-3">
                                    <dt className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-black/35 shrink-0">{fact.label}</dt>
                                    <dd className="text-[12.5px] md:text-[13.5px] text-black/75 text-right">{fact.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </Reveal>
                </div>

                <Reveal delay={0.1} className="mt-8 md:mt-10">
                    <Lead className="max-w-[64ch]">{BEGINNING.body}</Lead>
                </Reveal>
            </Chapter>

            {/* ── 02 · The Problem ───────────────────────────── */}
            <Band>
                <Chapter index="02" title="The Problem" tone="dark">
                    <div className="mt-6 md:mt-8 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
                        <Reveal>
                            <p className="font-black uppercase tracking-tighter leading-[1.02] text-[clamp(1.4rem,5.2vw,2.1rem)] md:text-[34px] text-white">
                                {PROBLEM.statement}
                            </p>
                        </Reveal>
                        <Reveal delay={0.08}><IslandDiagram /></Reveal>
                    </div>

                    <div className="mt-10 md:mt-14">
                        <Reveal><Eyebrow tone="dark">{PROBLEM.bridgeLabel}</Eyebrow></Reveal>
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-white/10 border border-white/10">
                            {PROBLEM.consequences.map((item, i) => (
                                <ConsequenceCard key={item.label} item={item} index={i} />
                            ))}
                        </div>
                    </div>

                    <Reveal delay={0.05} className="mt-10 md:mt-14 border-l-2 border-lime-400 pl-5 md:pl-6">
                        <p className="text-[15px] md:text-[17px] font-light leading-[1.75] text-white/85 max-w-[68ch]">
                            {PROBLEM.close}
                        </p>
                    </Reveal>
                </Chapter>
            </Band>

            {/* ── 03 · The Solution ──────────────────────────── */}
            <Chapter index="03" title="The Solution">
                <Reveal className="mt-6"><Lead className="max-w-[54ch]">{SOLUTION.lead}</Lead></Reveal>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-px bg-black/10 border border-black/[0.08]">
                    {SOLUTION.pillars.map((pillar, i) => {
                        const Icon = pillar.icon;
                        return (
                            <Reveal key={pillar.label} delay={0.04 * (i % 6)} className="bg-[#FAF9F6] px-3 py-5 md:py-6 flex flex-col items-center text-center gap-3">
                                <Icon size={17} className="text-black/40" strokeWidth={1.75} />
                                <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.12em] text-black/60 leading-[1.4]">
                                    {pillar.label}
                                </span>
                            </Reveal>
                        );
                    })}
                </div>

                <Reveal className="mt-6"><Lead className="max-w-[64ch]">{SOLUTION.goal}</Lead></Reveal>

                <Reveal className="mt-10 md:mt-12">
                    <div className="border border-black/[0.08] bg-white/70 p-6 md:p-8 max-w-[620px]">
                        <Rail steps={SOLUTION.flow} />
                    </div>
                </Reveal>
            </Chapter>

            {/* ── 04 · What I Work On ──────────────────────── */}
            <Chapter index="04" title="What I Work On">
                <div className="mt-6 md:mt-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                    {BUILT.map((item, i) => <BuildCard key={item.code} item={item} index={i} />)}
                </div>
            </Chapter>

            {/* ── 05 · Performance ────────────────────────────── */}
            <Band>
                <Chapter index="05" title="Performance" tone="dark">
                    <div className="mt-6 md:mt-8 grid lg:grid-cols-2 gap-8 lg:gap-14 items-end">
                        <Reveal>
                            <p className="font-black uppercase tracking-tighter leading-[1.02] text-[clamp(1.3rem,4.6vw,1.9rem)] md:text-[30px] text-white">
                                {INNOVATION.lead}
                            </p>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <p className="text-[14px] md:text-[15px] font-light leading-[1.75] text-white/60 max-w-[52ch]">
                                {INNOVATION.note}
                            </p>
                        </Reveal>
                    </div>

                    <div className="mt-10 md:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7">
                        {INNOVATION.chain.map((step, i) => (
                            <ChainNode key={step} label={step} index={i} total={INNOVATION.chain.length} />
                        ))}
                    </div>

                    <div className="mt-10 md:mt-14">
                        <Reveal><Eyebrow tone="dark">{INNOVATION.areasLabel}</Eyebrow></Reveal>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {INNOVATION.areas.map((area, i) => (
                                <Reveal key={area} delay={0.03 * i}><Chip tone="dark">{area}</Chip></Reveal>
                            ))}
                        </div>
                    </div>
                </Chapter>
            </Band>

            {/* ── 06 · Clients & Projects ────────────────────── */}
            <Chapter index="06" title="Clients &amp; Projects">
                <Reveal className="mt-6"><Lead className="max-w-[64ch]">{TEAM.note}</Lead></Reveal>

                <div className="mt-8 md:mt-10 grid sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
                    {TEAM.members.map((member, i) => (
                        <MemberCard key={member.name} member={member} index={i} />
                    ))}
                </div>
            </Chapter>

            {/* ── 07 · Scale & Impact ────────────────────────── */}
            <Chapter index="07" title="Scale &amp; Impact">
                <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-black/10 border border-black/[0.08]">
                    {TRACTION.metrics.map((metric, i) => (
                        <Metric key={metric.label} metric={metric} index={i} total={TRACTION.metrics.length} />
                    ))}
                </div>

                <Reveal className="mt-8 md:mt-10 border-l-2 border-lime-500 pl-5 md:pl-6">
                    <p className="text-[15px] md:text-[16px] font-light leading-[1.75] text-black/65 max-w-[70ch]">
                        {TRACTION.note}
                    </p>
                </Reveal>
            </Chapter>

            {/* ── 08 · Explore the Work ─────────────────────── */}
            <Band>
                <Chapter index="08" title="Explore the Work" tone="dark">
                    <Reveal className="mt-6">
                        <p className="text-white/55 text-[15px] md:text-[16px] font-light">{EXPLORE.lead}</p>
                    </Reveal>

                    <div className="mt-7 md:mt-9 flex flex-col gap-3">
                        {EXPLORE.links.map((link, i) => <LinkRow key={link.url} link={link} index={i} />)}
                    </div>
                </Chapter>
            </Band>

        </div>
    );
}
