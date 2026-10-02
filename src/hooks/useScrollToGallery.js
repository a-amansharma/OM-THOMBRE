import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { exponentialEaseOut } from '../utils/easing';

const useScrollToGallery = (galleryRef) => {
  const location = useLocation();

  const smoothScrollTo = (target, onComplete) => {
    const lenis = window.lenisInstance;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(target, {
        duration: 1.5,
        easing: exponentialEaseOut,
        lock: true,
        onComplete,
      });
      return;
    }

    window.scrollTo({ top: target, behavior: 'smooth' });
    if (onComplete) setTimeout(onComplete, 420);
  };

  useEffect(() => {
    let cancelled = false;

    const params = new URLSearchParams(location.search);
    const scrollTo = params.get('scrollTo');

    if (!scrollTo || !scrollTo.startsWith('project-')) {
      return () => { cancelled = true; };
    }

    const findTrack = () => {
      const section = galleryRef.current;
      if (!section) return null;
      return section.querySelector('.flex.gap-6, .flex.gap-12');
    };

    /* The gallery is code-split, so its horizontal track is not in the DOM on
       the first frame. Waiting for the track itself (rather than a fixed delay)
       keeps the offset measurement honest. */
    const waitForTrack = (maxMs = 8000) => new Promise((resolve) => {
      const started = performance.now();
      const existing = findTrack();
      if (existing) { resolve(existing); return; }

      const observer = new MutationObserver(() => {
        const t = findTrack();
        if (t) { observer.disconnect(); resolve(t); }
      });

      const section = galleryRef.current;
      if (section) observer.observe(section, { childList: true, subtree: true });

      const tick = () => {
        if (cancelled) { observer.disconnect(); resolve(null); return; }
        const t = findTrack();
        if (t) { observer.disconnect(); resolve(t); return; }
        if (performance.now() - started > maxMs) { observer.disconnect(); resolve(null); return; }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

    const scrollToGallery = async () => {
      if (cancelled) return;
      const section = galleryRef.current;
      if (!section) return;

      const track = await waitForTrack();
      if (cancelled || !track) return;

      const [gsapModule, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      const gsap = gsapModule.default || gsapModule.gsap;

      gsap.set(track, { x: 0 });
      ScrollTrigger.refresh();

      /* Every section below the hero is lazy, so the document keeps growing
         after the gallery mounts. A single scroll would be clamped by whatever
         height existed at that moment, so re-measure and retry until the
         browser actually lands on the target. */
      const attempts = 8;
      for (let attempt = 0; attempt < attempts; attempt++) {
        if (cancelled) return;

        const target = section.offsetTop + Math.min((section.offsetHeight || window.innerHeight) * 0.3, 300);
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const reachable = Math.min(target, maxScroll);

        smoothScrollTo(reachable);

        await new Promise((resolve) => setTimeout(resolve, 800));
        if (cancelled) return;

        if (Math.abs(window.scrollY - reachable) <= 4) break;
      }

      if (cancelled) return;
      ScrollTrigger.refresh();
    };

    const timer = setTimeout(() => { scrollToGallery(); }, 150);

    setTimeout(() => {
      window.history.replaceState({}, '', '/');
    }, 100);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [location.search, galleryRef]);
};

export default useScrollToGallery;