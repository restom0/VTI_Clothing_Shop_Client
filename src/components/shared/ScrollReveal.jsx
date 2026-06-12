import PropTypes from "prop-types";
import useInView from "../../hooks/useInView.hook";

/**
 * ScrollReveal — wraps children in a div that animates into view
 * when it enters the viewport (powered by IntersectionObserver).
 *
 * Props:
 *  variant   — "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "fade"
 *  delay     — CSS delay string, e.g. "0.1s" (applied via --reveal-delay)
 *  threshold — 0..1 fraction of element visible before trigger (default 0.12)
 *  stagger   — if true, adds .stagger class so direct .reveal children get
 *              auto-incremental delays (use with multiple RevealItem children)
 *  className — extra class names on the wrapper
 *  as        — HTML tag to render (default "div")
 */
const ScrollReveal = ({
  children,
  variant = "fade-up",
  delay = "0s",
  threshold = 0.12,
  stagger = false,
  className = "",
  as: Tag = "div",
  ...rest
}) => {
  const { ref, inView } = useInView({ threshold });

  const revealClass = variant ? `reveal reveal-${variant}` : "reveal reveal-fade";
  const staggerClass = stagger ? "stagger" : "";
  const inViewClass = inView ? "in-view" : "";

  return (
    <Tag
      ref={ref}
      className={[revealClass, staggerClass, inViewClass, className]
        .filter(Boolean)
        .join(" ")}
      style={delay !== "0s" ? { "--reveal-delay": delay } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["fade-up", "fade-down", "fade-left", "fade-right", "scale", "fade"]),
  delay: PropTypes.string,
  threshold: PropTypes.number,
  stagger: PropTypes.bool,
  className: PropTypes.string,
  as: PropTypes.string,
};

export default ScrollReveal;
