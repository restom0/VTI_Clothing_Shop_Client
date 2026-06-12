import PropTypes from "prop-types";
import useParallax from "../../hooks/useParallax.hook";
import ScrollReveal from "./ScrollReveal";

/**
 * ParallaxBanner — a full-width section with a JS-driven parallax background.
 *
 * Props:
 *  imageUrl  — URL of the background image
 *  speed     — parallax intensity (0 = static, 0.5 = fast). Default 0.3
 *  height    — CSS height of the banner. Default "400px"
 *  overlay   — opacity of the dark overlay (0–1). Default 0.5
 *  className — extra classes on the outer wrapper
 *  children  — content rendered above the overlay (centered)
 */
const ParallaxBanner = ({
  imageUrl,
  speed = 0.3,
  height = "400px",
  overlay = 0.5,
  className = "",
  children,
}) => {
  const { ref, offsetY } = useParallax({ speed, clamp: 70 });

  return (
    <section
      ref={ref}
      className={`parallax-banner ${className}`}
      style={{ height }}
      aria-label="Parallax banner"
    >
      {/* Background layer — shifts on scroll */}
      <div
        className="parallax-banner__bg"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `translateY(${offsetY}px)`,
        }}
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div
        className="parallax-banner__overlay"
        style={{ background: `rgba(0,0,0,${overlay})` }}
        aria-hidden="true"
      />

      {/* Content */}
      {children && (
        <div className="parallax-banner__content">
          <ScrollReveal variant="fade-up" threshold={0.2}>
            {children}
          </ScrollReveal>
        </div>
      )}
    </section>
  );
};

ParallaxBanner.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  speed: PropTypes.number,
  height: PropTypes.string,
  overlay: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default ParallaxBanner;
