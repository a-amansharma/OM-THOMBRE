import { lazy } from "react";
import { PROJECT_META_BY_SLUG } from "../data/projectMeta";

const PROJECT_DETAIL_COMPONENTS = {
  "ai-performance-advertising": lazy(() => import("./AiPerformanceAdvertisingDetail")),
  "ai-micro-drama": lazy(() => import("./AiMicroDramaDetail")),
  "large-scale-content": lazy(() => import("./LargeScaleContentDetail")),
  "daily-bhakti": lazy(() => import("./DailyBhaktiDetail")),
  "myntra-corporate-video": lazy(() => import("./MyntraCorporateDetail")),
  "real-estate-media": lazy(() => import("./RealEstateMediaDetail")),
};

export function getProjectRouteConfig(slug) {
  const metadata = PROJECT_META_BY_SLUG[slug];
  if (!metadata) return null;

  return {
    ...metadata,
    Component: PROJECT_DETAIL_COMPONENTS[slug],
  };
}