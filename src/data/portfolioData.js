// ─── Portfolio Data (single source of truth for site content) ────
//
// This is the LIVE data the site renders and the AI assistant reads. It is
// imported by `src/services/aiContext.js` and the AI assistant panel.
//
// CUSTOMIZING: edit the values below with your own details. See also
// `docs/customization.md`.
//
// FIELDS TO EDIT:
//   profile.name / role / bio / location / email / socials  → your identity
//   experience[]   → your employment / freelance / venture history
//   techStack[]    → your skills, grouped by `category`
//   projects[]     → short project summaries (keep `slug` in sync with
//                    projectMeta.js + projectDetailsData.js)
//   achievements[] → recognition / milestones (optional)
//   capabilities[] → high-level specializations
export const PORTFOLIO_DATA = {
    profile: {
        name: "Om Thombre",
        role: "AI Director | AI Video Editor | Creative & Content Strategist",
        bio: "AI Director and Video Creative experienced in AI-powered video production, short-form advertising, storytelling, scripting, video editing, and performance-driven content.",
        location: "India",
        email: "officialompatil21@gmail.com",
        socials: {
            linkedin: "https://www.linkedin.com/in/om-patil-581a13326",
            instagram: "https://www.instagram.com/ompatil._11?stkn=Y3IxMmw3ZWQ3Mmhj"
        }
    },
    experience: [
        {
            title: "AI Director — Inkpen Labs",
            period: "Present",
            description: [
                "AI-powered video advertisements for Meta platforms.",
                "Short-form video content, creative concepts and scripts.",
                "Character and scene development with AI-generated visuals.",
                "AI + live-action video editing, hooks, storytelling and transitions.",
                "Music, SFX and captions, plus multiple creative variations.",
                "Performance-based creative optimization."
            ]
        },
        {
            title: "AI Video & Content Production — Daily Bhakti",
            period: "Ongoing",
            description: [
                "AI video concepts and devotional scripts in Marathi storytelling.",
                "Characters, scenes, AI visuals and editing.",
                "Advertisements, festival content and social media videos."
            ]
        },
        {
            title: "Video Content Contractor — Myntra",
            period: "2 Corporate Projects",
            description: [
                "Two official corporate video projects delivered.",
                "Creative execution, editing and visual enhancement.",
                "Content structuring, client feedback and final delivery."
            ]
        },
        {
            title: "Co-Founder & Media Lead — Real Estate Venture",
            period: "Ongoing",
            description: [
                "Promotional videos and social media marketing.",
                "Digital branding and marketing content.",
                "Client communication and operations."
            ]
        }
    ],
    techStack: [
        { name: "AI Video Generation", category: "AI & Creative" },
        { name: "AI-Assisted Content", category: "AI & Creative" },
        { name: "Creative Direction", category: "AI & Creative" },
        { name: "Visual Storytelling", category: "AI & Creative" },
        { name: "Scriptwriting", category: "AI & Creative" },
        { name: "Story Development", category: "AI & Creative" },
        { name: "Character Development", category: "AI & Creative" },
        { name: "Scene Direction", category: "AI & Creative" },
        { name: "Video Editing", category: "Video" },
        { name: "Short-Form Video", category: "Video" },
        { name: "Video Advertising", category: "Video" },
        { name: "Pacing & Rhythm", category: "Video" },
        { name: "Sound Design", category: "Video" },
        { name: "Motion Graphics", category: "Video" },
        { name: "Captions", category: "Video" },
        { name: "Visual Enhancement", category: "Video" },
        { name: "Meta Advertising", category: "Marketing" },
        { name: "Performance Creative", category: "Marketing" },
        { name: "Creative Testing", category: "Marketing" },
        { name: "Content Strategy", category: "Marketing" },
        { name: "Social Media Content", category: "Marketing" },
        { name: "Audience-Focused Content", category: "Marketing" },
        { name: "Content Planning", category: "Content Operations" },
        { name: "Large-Scale Production", category: "Content Operations" },
        { name: "Production Management", category: "Content Operations" },
        { name: "Quality Control", category: "Content Operations" },
        { name: "Content Delivery", category: "Content Operations" }
    ],
    projects: [
        {
            slug: "ai-performance-advertising",
            title: "AI Performance Advertising",
            category: "AI Performance Advertising",
            description: "AI-driven Meta ad creatives produced at Inkpen Labs."
        },
        {
            slug: "ai-micro-drama",
            title: "AI Video Production",
            category: "AI Video Production",
            description: "An AI-generated micro-drama built end to end."
        },
        {
            slug: "large-scale-content",
            title: "Large-Scale Video Content",
            category: "Large-Scale Content",
            description: "2,700+ content assets across video, status and wallpaper formats."
        },
        {
            slug: "daily-bhakti",
            title: "Daily Bhakti",
            category: "AI Video & Devotional Content",
            description: "AI devotional video production in Marathi storytelling."
        },
        {
            slug: "myntra-corporate-video",
            title: "Myntra",
            category: "Corporate Video",
            description: "Two official corporate video projects as a video contractor."
        },
        {
            slug: "real-estate-media",
            title: "Real Estate Media",
            category: "Promotional Video & Digital Content",
            description: "Co-founder and media lead for a real estate venture."
        }
    ],
    achievements: [
        {
            title: "AI Performance Advertising — Inkpen Labs",
            project: "Inkpen Labs",
            description: "Creating AI-driven advertising creatives and content for Meta platforms while managing large-scale video and digital content production.",
            team: "Om Thombre",
            track: "AI Director | Present",
            techStack: ["AI Video Generation", "Meta Advertising", "Performance Creative", "Video Editing"],
            links: {}
        }
    ],
    capabilities: [
        "AI Video Direction",
        "Script & Story Development",
        "Video Editing & Sound Design",
        "Meta Performance Creative",
        "Large-Scale Content Operations"
    ]
};
