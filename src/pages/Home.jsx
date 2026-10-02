import { useEffect, useRef, useState, lazy, Suspense, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cursor from '../components/Cursor';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import useLenis from '../hooks/useLenis';
import useScrollToGallery from '../hooks/useScrollToGallery';

const AboutSection = lazy(() => import('../components/AboutSection'));
const Footer = lazy(() => import('../components/Footer'));

const ProjectGallery = lazy(() => import('../components/ProjectGallery'));
const MyApproach = lazy(() => import('../components/MyApproach'));
const NoiseOverlay = lazy(() => import('../components/NoiseOverlay'));
const ProfessionalExperience = lazy(() => import('../components/ProfessionalExperience'));
const TechnicalCapabilities = lazy(() => import('../components/TechnicalCapabilities'));
const LargeScaleContent = lazy(() => import('../components/LargeScaleContent'));
const BusinessImpact = lazy(() => import('../components/BusinessImpact'));
const ToolsSection = lazy(() => import('../components/ToolsSection'));
const VideoShowcase = lazy(() => import('../components/VideoShowcase'));
const VideoPlayerModal = lazy(() => import('../components/VideoPlayerModal'));

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const galleryRef = useRef(null);
  const [enableNoiseOverlay, setEnableNoiseOverlay] = useState(false);
  /* The video lightbox is owned here because two different sections open it:
     the Videos strip and the video cards at the end of the Selected Work
     track. Only one player can exist at a time. */
  const [activeVideo, setActiveVideo] = useState(null);

  /* No preloader and no scroll lock: Lenis starts enabled and the hero plays
     its own entrance as soon as React mounts. */
  useLenis(false);

  useScrollToGallery(galleryRef);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setEnableNoiseOverlay(isFinePointer && !reduceMotion);
    }
  }, []);

  const handlePlayVideo = useCallback((video) => {
    if (!video?.src) return;
    setActiveVideo(video);
  }, []);

  const handleCloseVideo = useCallback(() => setActiveVideo(null), []);

  const handleOpenProject = useCallback((project) => {
    if (!project?.slug) return;
    navigate(`/projects/${project.slug}`, {
      state: { backgroundLocation: location },
    });
  }, [navigate, location]);

  return (
    <div className="bg-[#FAF9F6] text-black selection:bg-lime-400 selection:text-black relative">
      {enableNoiseOverlay && <Suspense fallback={null}><NoiseOverlay /></Suspense>}

      <Cursor />
      <Navbar />
      <HeroSection isRevealed={true} />
      <Suspense fallback={null}><AboutSection /></Suspense>

      <div id="project-section" ref={galleryRef} className="bg-neutral-900">
        <Suspense fallback={<div className="h-screen bg-neutral-900" />}>
          <ProjectGallery onOpenProject={handleOpenProject} onPlayVideo={handlePlayVideo} />
        </Suspense>
      </div>

      <Suspense fallback={null}><VideoShowcase onPlayVideo={handlePlayVideo} /></Suspense>

      <Suspense fallback={null}><ProfessionalExperience /></Suspense>
      <Suspense fallback={null}><LargeScaleContent /></Suspense>
      <Suspense fallback={null}><BusinessImpact /></Suspense>
      <Suspense fallback={null}><MyApproach /></Suspense>
      <Suspense fallback={null}><TechnicalCapabilities /></Suspense>
      <Suspense fallback={null}><ToolsSection /></Suspense>
      <Suspense fallback={null}><Footer /></Suspense>

      <Suspense fallback={null}>
        <VideoPlayerModal video={activeVideo} onClose={handleCloseVideo} />
      </Suspense>
    </div>
  );
}