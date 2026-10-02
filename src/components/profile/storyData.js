import {
    Clapperboard, Wand2, Sparkles, Megaphone, Layers, Film,
    Video, Music4, Gauge, Palette, PenTool,
    Users, TrendingUp, Repeat, Target, Image as ImageIcon,
} from 'lucide-react';

/* ─── 01 — The Beginning ─────────────────────────────────── */
export const BEGINNING = {
    name: 'Om Thombre',
    role: 'AI Director — Inkpen Labs',
    period: 'Present',
    body: 'I am an AI Director and Video Creative working across AI-powered video production, short-form advertising, storytelling, scripting, video editing and performance-driven content. At Inkpen Labs I create AI-driven advertising creatives and content for Meta platforms while managing large-scale video and digital content production.',
    facts: [
        { label: 'Role', value: 'AI Director' },
        { label: 'Focus', value: 'AI video & performance creative' },
        { label: 'Period', value: 'Present' },
    ],
};

/* ─── 02 — The Problem ───────────────────────────────────── */
export const PROBLEM = {
    statement: 'Performance ad creative is judged in seconds, and good ideas die on slow or untested production.',
    islands: [
        { label: 'Ideas', icon: Sparkles },
        { label: 'Assets', icon: ImageIcon },
        { label: 'Results', icon: Gauge },
    ],
    bridgeLabel: 'Making it difficult to',
    consequences: [
        { label: 'Producing Enough Volume to Actually Test', icon: Layers },
        { label: 'Keeping Characters, Tone and Style Consistent Across Assets', icon: PenTool },
        { label: 'Turning Scripted Ideas Into Video Fast Enough to Ship', icon: Clapperboard },
        { label: 'Letting Performance Data Decide Which Creative Wins', icon: TrendingUp },
    ],
    close: 'My work sits exactly at that intersection: creative direction and AI generation on one side, measurable ad performance on the other.',
};

/* ─── 03 — The Solution ──────────────────────────────────── */
export const SOLUTION = {
    lead: 'Every piece of content moves through the same repeatable system:',
    pillars: [
        { label: 'Concept', icon: Sparkles },
        { label: 'Script', icon: PenTool },
        { label: 'AI Visuals', icon: Wand2 },
        { label: 'AI + Live Edit', icon: Video },
        { label: 'Sound + Captions', icon: Music4 },
        { label: 'Performance', icon: Megaphone },
    ],
    goal: 'The goal is to ship more creative variants per week than a traditional production line could, while keeping every one of them on brand, on script and on message.',
    flow: ['Idea', 'Script', 'Visual Direction', 'AI Generation', 'Editing', 'Sound', 'Optimization', 'Final Output'],
};

/* ─── 04 — What I Work On ────────────────────────────────── */
export const BUILT = [
    {
        code: '01',
        title: 'AI-Powered Video Advertisements',
        desc: 'Meta-ready ad creatives built from concept, script and AI-generated visuals, then edited for sound, captions and pacing.',
        icon: Megaphone,
    },
    {
        code: '02',
        title: 'Short-Form Video Content',
        desc: 'Vertical-first edits with a hook in the first seconds, tight pacing and captions that read without sound.',
        icon: Clapperboard,
    },
    {
        code: '03',
        title: 'Creative Concepts & Scripts',
        desc: 'Hooks, angles and story beats written to be shot, generated or hybrid — one idea, several executable directions.',
        icon: PenTool,
    },
    {
        code: '04',
        title: 'Character & Scene Development',
        desc: 'Consistent characters and scenes so a series of ads feels like one campaign instead of six unrelated clips.',
        icon: Users,
    },
    {
        code: '05',
        title: 'AI + Live-Action Editing',
        desc: 'AI-generated and real footage cut together as one film: transitions, rhythm, music, SFX and final mix.',
        icon: Film,
    },
    {
        code: '06',
        title: 'Multiple Creative Variations',
        desc: 'Several cuts, hooks and openings from one core idea, so performance testing has something real to compare.',
        icon: Repeat,
    },
];

/* ─── 05 — Performance ───────────────────────────────────── */
export const INNOVATION = {
    lead: 'The creative is only finished once performance has had a say.',
    note: 'Each variation is tracked on Meta, and what the numbers say feeds straight back into the next batch of scripts and edits.',
    chain: [
        'Hook', 'Retention', 'Engagement', 'Click',
        'Conversion', 'Data', 'Next Variation',
    ],
    areasLabel: 'Performance creative work across',
    areas: [
        'Meta Advertising',
        'Performance Creative',
        'Creative Testing',
        'Hook Writing',
        'Retention Editing',
        'Audience-Focused Content',
        'Caption Strategy',
        'A/B Hook Testing',
        'Iteration Speed',
    ],
};

/* ─── 06 — The Clients & Projects ────────────────────────── */
export const TEAM = {
    note: 'Alongside the full-time AI Director role, I run my own production across clients, own brands and a co-founded venture.',
    members: [
        {
            initials: 'OT',
            name: 'Om Thombre',
            role: 'AI Director — Inkpen Labs',
            affiliation: ['AI video direction', 'Meta performance creative'],
            variant: 'primary',
        },
        {
            initials: 'DB',
            name: 'Daily Bhakti',
            role: 'AI Video & Content Production',
            affiliation: ['Marathi devotional storytelling', 'Festival & social content'],
        },
        {
            initials: 'MY',
            name: 'Myntra',
            role: 'Video Content Contractor',
            affiliation: ['2 official corporate video projects'],
        },
        {
            initials: 'RE',
            name: 'Real Estate Venture',
            role: 'Co-Founder & Media Lead',
            affiliation: ['Promotional video & digital branding'],
            variant: 'accent',
        },
    ],
};

/* ─── 07 — Scale & Impact ────────────────────────────────── */
export const TRACTION = {
    /* scale keeps long values (2,700+, End-to-End) from overflowing
       their grid column next to short ones (600+, 300+). */
    metrics: [
        { value: '2,700+', label: 'Total Content Assets', icon: Layers, scale: 'xl' },
        { value: '600+', label: 'Video Statuses', icon: Video, scale: 'xl' },
        { value: '600+', label: 'Static Statuses', icon: ImageIcon, scale: 'xl' },
        { value: '1,100+', label: 'Wallpapers (Live + Static)', icon: Palette, scale: 'md' },
        { value: '37.5%', label: 'Business Growth, Aug → Sep', icon: TrendingUp, scale: 'md' },
    ],
    note: 'Volume figures reflect team and target output produced and managed during this period, not one person working alone. Business growth of ₹75 Lakh happened across the account while this AI-driven creative work and Meta advertising were running.',
};

/* ─── 08 — Explore the Work ──────────────────────────────── */
export const EXPLORE = {
    lead: 'Get in touch directly:',
    links: [
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/om-patil-581a13326' },
        { label: 'Instagram', url: 'https://www.instagram.com/ompatil._11?stkn=Y3IxMmw3ZWQ3Mmhj' },
    ],
};

export const SECTIONS = [
    { index: '01', title: 'The Beginning' },
    { index: '02', title: 'The Problem' },
    { index: '03', title: 'The Solution' },
    { index: '04', title: 'What I Work On' },
    { index: '05', title: 'Performance' },
    { index: '06', title: 'The Clients & Projects' },
    { index: '07', title: 'Scale & Impact' },
    { index: '08', title: 'Explore the Work' },
];

export const STORY_INTRO_ICON = Target;
