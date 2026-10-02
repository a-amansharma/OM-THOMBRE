import { memo } from 'react';
import { ArrowUpRight, ArrowUp, Mail, Phone, Clapperboard, Linkedin, Instagram, MapPin } from 'lucide-react';
import { exponentialEaseOut } from '../utils/easing';

const CONTACTS = [
  { label: 'Email', value: 'officialompatil21@gmail.com', short: 'Write me', href: 'mailto:officialompatil21@gmail.com', Icon: Mail, wide: true },
  { label: 'Phone', value: '+91 70666 57903', short: 'Call me', href: 'tel:+917066657903', Icon: Phone },
  { label: 'Role', value: 'AI Director — Inkpen Labs', short: 'AI Director', href: 'mailto:officialompatil21@gmail.com', Icon: Clapperboard },
  { label: 'Focus', value: 'AI Video & Performance Creative', short: 'AI Video', href: 'mailto:officialompatil21@gmail.com', Icon: Clapperboard },
  { label: 'LinkedIn', value: 'linkedin.com/in/om-patil-581a13326', short: 'Add me', href: 'https://www.linkedin.com/in/om-patil-581a13326', Icon: Linkedin, external: true },
  { label: 'Instagram', value: '@ompatil._11', short: 'Follow', href: 'https://www.instagram.com/ompatil._11?stkn=Y3IxMmw3ZWQ3Mmhj', Icon: Instagram, external: true, wide: true }
];

/* Desktop-only footer index — mirrors the navbar sections so the footer
   doubles as a second navigation surface on wide viewports. */
const FOOTER_LINKS = [
  { label: 'About', sectionId: 'about-section' },
  { label: 'Journey', sectionId: 'experience-section' },
  { label: 'Selected Work', sectionId: 'project-section' },
  { label: 'Videos', sectionId: 'videos-section' },
  { label: 'Skills', sectionId: 'capabilities-section' },
  { label: 'Workflow', sectionId: 'tech-stack-section' },
  { label: 'Tools', sectionId: 'tools-section' }
];

const scrollToSection = (sectionId) => {
  const target = document.getElementById(sectionId);
  if (!target) return;

  if (window.lenisInstance && typeof window.lenisInstance.scrollTo === 'function') {
    window.lenisInstance.scrollTo(target, { offset: -24, duration: 1.5, easing: exponentialEaseOut });
    return;
  }
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const scrollToTop = () => {
  if (window.lenisInstance && typeof window.lenisInstance.scrollTo === 'function') {
    window.lenisInstance.scrollTo(0, { duration: 1.5, easing: exponentialEaseOut });
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer = memo(function Footer() {
  return (
    <footer id="contact-section" className="bg-[#0A0A0A] text-white pt-12 md:pt-14 lg:pt-24 pb-safe-4 lg:pb-12 w-full relative overflow-hidden">
      {/* Subtle Matrix BG */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      {/* Lime bloom, desktop only */}
      <div className="hidden lg:block absolute -bottom-40 left-1/4 w-[720px] h-[720px] bg-lime-400/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 relative z-10">

        <div className="flex flex-col lg:flex-row justify-between gap-8 md:gap-10 lg:gap-16">

          {/* Left: Name */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl sm:text-5xl lg:text-8xl xl:text-[7rem] font-black uppercase tracking-tighter leading-[0.95] sm:leading-[0.9] lg:leading-[0.85] text-white">
              LET'S <br />
              <span className="text-lime-400 transform inline-block italic pr-4">CONNECT.</span>
            </h2>

            {/* Supporting copy — desktop only */}
            <div className="hidden lg:block mt-9 max-w-[460px]">
              <p className="text-[15px] text-white/55 font-light leading-[1.8]">
                AI Director at Inkpen Labs. Video editing, AI video, storytelling, Meta advertising and
                creative strategy — building content that has to perform.
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-lime-400/30 bg-lime-400/[0.07] px-4 py-2">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-lime-400">
                    Available for work
                  </span>
                </span>

                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  <MapPin size={13} strokeWidth={2.2} className="text-lime-400/70" />
                  India
                </span>
              </div>
            </div>
          </div>

          {/* Right: Contact buttons */}
          <div className="lg:w-1/2">
            {/* Column heading — desktop only */}
            <div className="hidden lg:flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                Direct channels
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/[0.12] to-transparent" />
              <span className="font-mono text-[10px] tabular-nums text-white/25">
                06
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 lg:gap-3.5">
              {CONTACTS.map(({ label, value, short, href, external, Icon, wide }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  title={value}
                  className={`group flex items-center gap-3 lg:gap-4 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 lg:px-5 lg:py-4 transition-all duration-300 hover:border-lime-400/60 hover:bg-lime-400/10 active:scale-[0.98] ${wide ? 'lg:col-span-2' : ''}`}
                >
                  <span className="w-7 h-7 lg:w-9 lg:h-9 shrink-0 rounded-full bg-lime-400 text-black flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Icon size={13} strokeWidth={2.4} className="lg:hidden" />
                    <Icon size={17} strokeWidth={2.2} className="hidden lg:block" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-white/40 leading-none">
                      {label}
                    </span>
                    <span className="mt-1 block font-mono text-[0.8125rem] lg:text-sm font-bold text-white/85 group-hover:text-lime-400 transition-colors leading-none truncate">
                      {/* Phones keep the short CTA label; desktop reveals the real address */}
                      <span className="lg:hidden">{short}</span>
                      <span className="hidden lg:inline">{value}</span>
                    </span>
                  </span>
                  <ArrowUpRight
                    size={13}
                    strokeWidth={2.4}
                    className="shrink-0 text-white/30 group-hover:text-lime-400 group-hover:rotate-45 transition-all duration-300"
                  />
                </a>
              ))}
            </div>

            {/* Section index — desktop only */}
            <nav className="hidden lg:flex flex-wrap items-center gap-x-7 gap-y-3 mt-9" aria-label="Footer navigation">
              {FOOTER_LINKS.map(({ label, sectionId }) => (
                <button
                  key={sectionId}
                  type="button"
                  onClick={() => scrollToSection(sectionId)}
                  className="group font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white/45 hover:text-lime-400 transition-colors duration-300 inline-flex items-center gap-1.5"
                >
                  {label}
                  <ArrowUpRight
                    size={12}
                    strokeWidth={2.6}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar — desktop only */}
        <div className="hidden lg:flex items-center justify-between gap-6 mt-14 pt-8 border-t border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
            <span>© {new Date().getFullYear()} Om Thombre</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>AI Director, Inkpen Labs</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Built from scratch</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] pl-5 pr-2 py-2 hover:border-lime-400/60 hover:bg-lime-400/10 transition-all duration-300 active:scale-[0.98]"
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/60 group-hover:text-lime-400 transition-colors">
              Back to top
            </span>
            <span className="w-8 h-8 rounded-full bg-lime-400 text-black flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp size={15} strokeWidth={2.6} className="group-hover:translate-y-0.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
});

export default Footer;