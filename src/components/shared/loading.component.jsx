import "./loading.css";
import SkeletonBlock from "./SkeletonBlock";
import { useI18n } from "../../i18n";

const LoadingRail = () => (
  <div className="loading-rail" aria-hidden="true">
    <span className="loading-rail__track" />
    <span className="loading-rail__item loading-rail__item--primary" />
    <span className="loading-rail__item loading-rail__item--light" />
    <span className="loading-rail__item loading-rail__item--dark" />
  </div>
);

const LoadingSkeleton = () => (
  <div className="loading-skeleton" aria-hidden="true">
    <div className="loading-skeleton__header">
      <SkeletonBlock className="loading-skeleton__brand" />
      <div className="loading-skeleton__nav">
        <SkeletonBlock className="loading-skeleton__nav-item" />
        <SkeletonBlock className="loading-skeleton__nav-item" />
        <SkeletonBlock className="loading-skeleton__nav-item" />
      </div>
    </div>
    <SkeletonBlock className="loading-skeleton__hero" />
    <div className="loading-skeleton__grid">
      <SkeletonBlock className="loading-skeleton__card" />
      <SkeletonBlock className="loading-skeleton__card" />
      <SkeletonBlock className="loading-skeleton__card" />
    </div>
  </div>
);

const Loading = () => {
  const { t } = useI18n();
  const loadingLabel = t("loading.label");

  return (
    <section
      id="loader-container"
      className="loading-screen"
      role="status"
      aria-label={loadingLabel}
      aria-live="polite"
    >
      <div className="loading-screen__card">
        <div className="loading-screen__mark" aria-hidden="true">
          <span>VTI</span>
        </div>
        <div>
          <p className="loading-screen__label">{loadingLabel}</p>
          <div className="loading-screen__progress" aria-hidden="true">
            <span />
          </div>
        </div>
        <LoadingRail />
      </div>
      <LoadingSkeleton />
    </section>
  );
};

export default Loading;
