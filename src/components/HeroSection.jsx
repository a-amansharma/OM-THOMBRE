import { memo, useRef, useState, useEffect } from 'react';
import { Gsap, useGsapReducedMotion, useGsapScroll, useGsapTransform } from '../utils/gsapAnimate';
import { Clapperboard, Wand2, Layers, Megaphone, ArrowUpRight } from 'lucide-react';
import { asset } from '../utils/assets';
import { exponentialEaseOut } from '../utils/easing';

/* Same Lenis-aware jump the navbar and footer use, so a hero CTA lands on the
   target section with the identical easing instead of a native smooth scroll. */
const scrollToSection = (sectionId) => {
  const target = document.getElementById(sectionId);
  if (!target) return;

  if (window.lenisInstance && typeof window.lenisInstance.scrollTo === 'function') {
    window.lenisInstance.scrollTo(target, { offset: -24, duration: 1.5, easing: exponentialEaseOut });
    return;
  }
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// === DECORATIVE ORBITING ELEMENTS (Left & Right) ===
// The entrance and the idle float are two animations on one element, so they
// are combined into a single `animation` list rather than competing over
// `transform`.
const OrbitingDecoration = ({ icon: Icon, delay, className, isRevealed, enableAmbientMotion }) => {
  const entrance = `hero-chip 0.9s ${delay}s cubic-bezier(0.22, 1, 0.36, 1) both`;

  return (
  <Gsap.div
    className={`absolute flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-lime-500/20 bg-white/60 backdrop-blur-lg shadow-[0_10px_30px_rgba(132,204,22,0.12)] ${className}`}
    style={enableAmbientMotion && isRevealed ? {
      animation: `${entrance}, hero-float 5.8s ${delay + 0.9}s ease-in-out infinite`,
      willChange: 'transform',
    } : { animation: entrance }}
  >
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lime-300/25 to-transparent" />
    <Icon size={18} className="relative text-black/65" />
  </Gsap.div>
  );
};

// === MAIN COMPONENT ===
const HeroSection = memo(function HeroSection({ isRevealed = true }) {
  const containerRef = useRef(null);
  const reduceMotion = useGsapReducedMotion();
  const [enableParallax, setEnableParallax] = useState(false);
  const [enableAmbientMotion, setEnableAmbientMotion] = useState(false);

  const { scrollYProgress } = useGsapScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Subtle scroll parallax
  const bgY = useGsapTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentY = useGsapTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  // The portrait is a tall, narrow element, so it needs a gentler drift than
  // the text stack or it would appear to slide out from under the layout.
  const portraitY = useGsapTransform(scrollYProgress, [0, 1], ['0%', '7%']);

  useEffect(() => {
    if (typeof window === 'undefined' || reduceMotion) {
      setEnableParallax(false);
      setEnableAmbientMotion(false);
      return;
    }

    const parallaxMedia = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
    const updateParallax = () => {
      setEnableParallax(parallaxMedia.matches);
      setEnableAmbientMotion(parallaxMedia.matches);
    };

    updateParallax();

    if (parallaxMedia.addEventListener) {
      parallaxMedia.addEventListener('change', updateParallax);
    } else {
      parallaxMedia.addListener(updateParallax);
    }

    return () => {
      if (parallaxMedia.removeEventListener) {
        parallaxMedia.removeEventListener('change', updateParallax);
      } else {
        parallaxMedia.removeListener(updateParallax);
      }
    };
  }, [reduceMotion]);

  return (
    <header
      ref={containerRef}
      id="hero-section"
      className="min-h-screen min-h-[100svh] w-full relative bg-[#FAF9F6] selection:bg-lime-300 selection:text-black overflow-hidden flex flex-col items-center justify-center pt-16 pb-16 min-[1600px]:min-h-[104svh]"
    >
      {/* ── BACKGROUND ENGINEERING Grid & Dynamic Glow ── */}
      <Gsap.div
        style={enableParallax ? { y: bgY } : undefined}
        className="hero-enter hero-enter-fade absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center"
        style={{ y: enableParallax ? bgY : undefined, '--enter-delay': '0s' }}
      >

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(163,230,53,0.12),transparent_48%),linear-gradient(to_bottom,rgba(163,230,53,0.04),transparent_48%)]" />

        {/* 1. Base Moving Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            ...(enableAmbientMotion && isRevealed ? { animation: 'hero-grid-scroll 14s linear infinite', willChange: 'transform' } : {}),
          }}
        />

        {/* 2. Plus/Cross Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M40 38v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z' fill='%23000000' fill-opacity='1' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundPosition: 'center center'
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 18% 18%, rgba(163, 230, 53, 0.14), transparent 44%), radial-gradient(circle at 82% 15%, rgba(132, 204, 22, 0.1), transparent 42%), radial-gradient(circle at 50% 85%, rgba(190, 242, 100, 0.09), transparent 50%), linear-gradient(135deg, rgba(163, 230, 53, 0.02), rgba(234, 179, 8, 0.01))'
          }}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[920px] max-h-[920px] rounded-full border border-lime-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72vw] h-[72vw] max-w-[720px] max-h-[720px] rounded-full border border-lime-500/10" />

        {/* 3. Dynamic Organic Glowing Orbs — CSS animations for zero JS overhead
            These use radial-gradient falloff instead of filter: blur(). A blurred
            solid circle is just a soft radial falloff, and dropping the filter lets
            the scale/translate loops run purely on the compositor. With blur() on
            the same element the browser re-rendered the 130px blur every frame. */}
        <div
          className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] opacity-[0.1]"
          style={{
            backgroundImage: 'radial-gradient(circle, #bef264 0%, #bef264 30%, rgba(190,242,100,0.62) 55%, rgba(190,242,100,0.28) 74%, rgba(190,242,100,0.08) 88%, rgba(190,242,100,0) 100%)',
            ...(enableAmbientMotion && isRevealed ? {
              animation: 'hero-orb-1 10s ease-in-out infinite',
              willChange: 'transform',
            } : { transform: 'translate3d(-50%, -50%, 0)' }),
          }}
        />
        <div
          className="absolute top-1/4 right-[20%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #a3e635 0%, #a3e635 30%, rgba(163,230,53,0.62) 55%, rgba(163,230,53,0.28) 74%, rgba(163,230,53,0.08) 88%, rgba(163,230,53,0) 100%)',
            ...(enableAmbientMotion && isRevealed ? {
              animation: 'hero-orb-2 12s 2s ease-in-out infinite',
              willChange: 'transform',
            } : {}),
          }}
        />
        <div
          className="absolute bottom-[10%] left-[20%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle, #d9f99d 0%, #d9f99d 30%, rgba(217,249,157,0.62) 55%, rgba(217,249,157,0.28) 74%, rgba(217,249,157,0.08) 88%, rgba(217,249,157,0) 100%)',
            ...(enableAmbientMotion && isRevealed ? {
              animation: 'hero-orb-3 15s 1s ease-in-out infinite',
              willChange: 'transform',
            } : {}),
          }}
        />

        {/* 4. Radial Vignette to blend gracefully with section edges */}
        <div className="absolute inset-0 bg-[#FAF9F6] [mask-image:radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-75" />

        {/* Soft bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FAF9F6] to-transparent pointer-events-none" />
      </Gsap.div>

      {/* ── PORTRAIT ──
          Landscape source (1627x967) laid over the whole header as a cover
          layer, so the hero is fully filled at startup and every content layer
          stacks above it. The image carries a small scale so the drift never
          exposes an edge, and the bottom fade carries it into the next section
          the way the background layer already does.

          The subject sits in the RIGHT half of that frame and runs flush to its
          right edge, so the focal point is anchored right: a centred focal point
          crops a quarter of the subject away on a 1024px-wide screen, while
          anchoring right pushes the overflow onto the empty left half instead.

          Below lg the landscape frame is cropped so hard on a phone or tablet
          that the subject is lost, and it also sits directly behind the centred
          name, which muddies the type. So a transparent cutout (575x705) is
          swapped in and shown whole, in flow above the name, instead of as a
          backdrop. Laptop width and up keeps the full-bleed cover treatment. */}
      <Gsap.div
        className="pointer-events-none max-lg:relative max-lg:inset-auto max-lg:z-[5] max-lg:w-full max-lg:flex-none max-lg:overflow-visible max-lg:mt-10 hero-enter hero-enter-settle absolute inset-0 z-[1] overflow-hidden"
          style={{ '--enter-delay': '0.12s' }}
      >
        <Gsap.div
          style={enableParallax ? { y: portraitY } : undefined}
          className="max-lg:relative max-lg:w-full absolute inset-0"
        >
          <picture className="block max-lg:w-full lg:h-full lg:w-full">
            {/* Phones and tablets: swaps in the transparent cutout. The parent
                clip and the scale stay put, so nothing else about the layer
                changes between the two sources. */}
            <source
              media="(max-width: 1023px)"
              srcSet={asset('/center-top-image-only-smartphone.png')}
              width="575"
              height="705"
            />
            <img
              src={asset('/portrait.png')}
              alt="Om Thombre"
              /* Intrinsic size of the fallback source. The <source> above is
                 575x705 and is media-preloaded, so the correct aspect ratio is
                 already in cache when the img paints. */
              width={1627}
              height={967}
              loading="eager"
              decoding="async"
              draggable={false}
              /* Phone and tablet: a transparent RGBA cutout shown whole (no
                 cover), anchored bottom-centre. The PNG is trimmed to its alpha
                 bbox, so the figure sits exactly on the viewport's centre line
                 and the size caps alone decide how big it reads — no scale
                 hack needed. Caps keep a tall phone from overflowing, and the
                 layer drops its clip at these widths so a bottom-anchored box
                 never has its head sliced off.
                 lg and up: the cover treatment that fills the header, focal
                 point pinned right so the subject is never cropped, and kept
                 low so the bottom of the frame stays in view. */
              className="block max-lg:h-auto max-lg:max-h-[42svh] max-lg:w-auto max-lg:max-w-[min(70vw,30rem)] max-lg:object-contain max-lg:mx-auto max-lg:origin-bottom h-full w-full object-cover object-[right_78%] scale-[1.08] select-none"
            />
          </picture>
        </Gsap.div>
        <div className="absolute inset-x-0 bottom-0 h-40 max-lg:hidden bg-gradient-to-t from-[#FAF9F6] to-transparent" />
      </Gsap.div>

      {/* ── MAIN CONTENT ──
          Stacked above the portrait layer. Centred below 1024px, where the hero
          shows the cutout floating above the name; from 1024px up the
          .hero-split class moves the stack to the left edge, mirroring the
          <picture> switch to the full-bleed portrait (see index.css). */}
      {/* Parallax wrapper (scroll-driven y only) */}
      <Gsap.div
        style={enableParallax ? { y: contentY } : undefined}
        className="hero-split relative z-10 w-full max-w-[1200px] px-5 sm:px-6 md:px-12 flex flex-col items-center text-center mt-8"
      >
        {/* Entrance wrapper. The lift lives on this inner element rather than
            .hero-split itself, because the outer wrapper's scroll parallax
            already owns `transform` and the two would overwrite each other. */}
        <div
          className="hero-enter w-full flex flex-col items-center hero-left"
          style={{ '--enter-delay': '0.3s' }}
        >

        {/* 2. Massive Clear Typography */}
        <div className="flex flex-col items-center justify-center relative w-full mb-4 md:mb-5 hero-left">
{/* Left Decoration — hidden from lg up, where the text is left-aligned against
    the viewport edge and there is no margin left to sit in.
    Also hidden below sm: the name spans nearly the full phone width
    there, so a 40px disc at left-0 would sit on top of the "O". */}
<OrbitingDecoration icon={Clapperboard} delay={0.15} className="left-0 sm:left-2 top-2 max-sm:hidden lg:hidden" isRevealed={isRevealed} enableAmbientMotion={enableAmbientMotion} />
<OrbitingDecoration icon={Wand2} delay={0.45} className="left-6 sm:left-12 bottom-8 hidden sm:flex lg:hidden" isRevealed={isRevealed} enableAmbientMotion={enableAmbientMotion} />

          <h1
            /* Below sm the 4.25rem floor made the name wider than a 320px
               viewport, so the word overflowed the screen. The phone size is
               viewport-relative and only applies under sm — from sm up the
               original clamp (and therefore the desktop lockup) is unchanged. */
            className="hero-enter text-[clamp(2.5rem,17vw,9rem)] sm:text-[clamp(4.25rem,14vw,9rem)] font-black uppercase tracking-tight text-black leading-[0.88]"
            style={{ '--enter-delay': '0.38s' }}
          >
            OM
          </h1>

          <h1
            className="hero-enter text-[clamp(2.5rem,17vw,9rem)] sm:text-[clamp(4.25rem,14vw,9rem)] font-black uppercase tracking-tight text-transparent leading-[0.88] mt-2 sm:mt-0 font-outline-fallback"
            style={{ '--enter-delay': '0.5s' }}
          >
            THOMBRE
          </h1>

          {/* Right Decoration — hidden at 2xl+, where the portrait takes this column,
              and below sm, where the name fills the width */}
          <OrbitingDecoration icon={Layers} delay={0.28} className="right-0 sm:right-2 lg:right-16 top-10 max-sm:hidden 2xl:hidden" isRevealed={isRevealed} enableAmbientMotion={enableAmbientMotion} />
          <OrbitingDecoration icon={Megaphone} delay={0.58} className="right-6 sm:right-12 lg:right-28 -bottom-2 hidden sm:flex 2xl:hidden" isRevealed={isRevealed} enableAmbientMotion={enableAmbientMotion} />
        </div>

        {/* 3. Role Line with Green Accent */}
        <div
          className="hero-enter flex flex-col items-center gap-2 mt-0 hero-left"
          style={{ '--enter-delay': '0.66s' }}
        >
          <h2 className="text-[clamp(1.05rem,3.4vw,2.25rem)] sm:text-[clamp(1.35rem,4.2vw,2.25rem)] font-bold text-black/80 tracking-tight flex items-center justify-center flex-wrap gap-x-2 gap-y-1 px-2 hero-left">
            AI Director <span className="text-black/30 font-normal">|</span>{' '}
            <span className="bg-lime-400/30 px-2 rounded-md ring-1 ring-lime-500/20">AI Video Editor</span>{' '}
            <span className="text-black/30 font-normal">|</span> Creative &amp; Content Strategist
            <span className="text-lime-500 font-extrabold -ml-1">.</span>
          </h2>
        </div>

        {/* 3b. Positioning copy */}
        <div
          className="hero-enter mt-4 md:mt-5 max-w-[62ch] space-y-2.5 text-center hero-left"
          style={{ '--enter-delay': '0.73s' }}
        >
          <p className="text-[13px] sm:text-[14px] md:text-[15px] font-light leading-[1.75] text-black/60">
            AI Director and Video Creative experienced in AI-powered video production,
            short-form advertising, storytelling, scripting, video editing, and
            performance-driven content.
          </p>
          <p className="text-[13px] sm:text-[14px] md:text-[15px] font-light leading-[1.75] text-black/60">
            Currently at <strong className="text-black font-semibold">Inkpen Labs</strong>,
            creating AI-driven advertising creatives and content for Meta platforms while
            managing large-scale video and digital content production.
          </p>
        </div>

        {/* 4. CTA Buttons */}
        <div
          className="hero-enter flex flex-wrap items-center justify-center gap-4 mt-5 md:mt-7 hero-left"
          style={{ '--enter-delay': '0.8s' }}
        >
          <button
            type="button"
            onClick={() => scrollToSection('contact-section')}
            className="group flex items-center gap-2 bg-black text-white px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider hover:bg-lime-400 hover:text-black transition-all duration-300"
          >
            Let's Talk <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('project-section')}
            className="group flex items-center gap-2 border border-black/15 bg-white/70 backdrop-blur-md text-black px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider hover:border-black hover:bg-white transition-all duration-300"
          >
            View Work <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
          </button>
        </div>
      </div>

      </Gsap.div>
    </header>
  );
});

export default HeroSection;
