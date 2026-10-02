import { Suspense } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getProjectRouteConfig } from "../../projectDetails/projectRegistry";

const LoadingState = () => (
  <div className="p-8 text-center text-sm font-bold uppercase tracking-[0.2em]">
    Loading project...
  </div>
);

const NotFoundState = ({ onClose }) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 px-6 py-24">
    <span className="font-mono text-[10px] uppercase font-bold tracking-[0.18em] text-black/40">
      {'// 404_CASE_NOT_FOUND'}
    </span>
    <h1 className="text-[clamp(1.75rem,8vw,3rem)] font-black uppercase leading-[0.9] tracking-tighter text-black">
      Project <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Unavailable</span>
    </h1>
    <p className="text-sm md:text-base text-black/60 max-w-md leading-relaxed">
      This case study does not exist or has been moved.
    </p>
    <button
      onClick={onClose}
      className="shrink-0 flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-xs md:text-sm font-bold tracking-wide uppercase hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
    >
      Back to Home
    </button>
  </div>
);

export default function ProjectDetailRouter({ mode = "page" }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const routeConfig = getProjectRouteConfig(slug);

  // Set when the app itself pushed this entry (a project card click), so Home
  // is mounted underneath and going back restores its scroll position. A
  // shared /projects/:slug link has no such entry left to pop.
  const hasBackground = Boolean(location.state?.backgroundLocation);

  const goHome = () => navigate("/", { replace: true });

  const handleClose = () => {
    if (mode === "modal") {
      if (hasBackground) {
        navigate(-1);
      } else {
        goHome();
      }
    } else if (routeConfig?.id) {
      navigate(`/?scrollTo=project-${routeConfig.id}`);
    } else {
      goHome();
    }
  };

  if (!routeConfig?.Component) return <NotFoundState onClose={handleClose} />;

  const ProjectComponent = routeConfig.Component;

  return (
    <Suspense fallback={<LoadingState />}>
      <ProjectComponent mode={mode} onClose={handleClose} />
    </Suspense>
  );
}
