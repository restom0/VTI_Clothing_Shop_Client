import { useEffect, useRef, useState } from "react";

/**
 * useInView — fires once when the ref element enters the viewport.
 *
 * @param {Object} options
 * @param {string}  options.threshold  - 0..1, fraction visible before firing (default 0.15)
 * @param {string}  options.rootMargin - CSS margin shrinking/expanding the root (default "0px")
 * @param {boolean} options.once       - unobserve after first fire (default true)
 *
 * @returns {{ ref: React.RefObject, inView: boolean }}
 *
 * Usage:
 *   const { ref, inView } = useInView();
 *   <div ref={ref} className={`reveal reveal-fade-up ${inView ? "in-view" : ""}`} />
 */
const useInView = ({
  threshold = 0.15,
  rootMargin = "0px",
  once = true,
} = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback for environments without IntersectionObserver (SSR, old browsers)
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
};

export default useInView;
