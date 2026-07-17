import { useEffect, useRef, useState } from "react";

/**
 * useParallax — returns a ref and a CSS translateY offset for a parallax effect.
 *
 * Attach `ref` to the parallax container. The returned `offsetY` (in px) is
 * meant to be applied as `transform: translateY(${offsetY}px)` on the
 * background element inside the container.
 *
 * @param {Object} options
 * @param {number} options.speed   - Parallax intensity: 0 = none, 1 = 1:1 with scroll (default 0.35)
 * @param {number} options.clamp   - Maximum absolute offset in px (default 60)
 *
 * @returns {{ ref: React.RefObject, offsetY: number }}
 *
 * Usage:
 *   const { ref, offsetY } = useParallax({ speed: 0.3 });
 *   <section ref={ref}>
 *     <div style={{ transform: `translateY(${offsetY}px)` }} />
 *   </section>
 */
const useParallax = ({ speed = 0.35, clamp = 60 } = {}) => {
  const ref = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const rafId = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /** Calculates value. */
    const calculate = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;

      // Only animate when element is near the viewport
      if (rect.bottom < -viewH || rect.top > viewH * 2) return;

      // Fraction of element position relative to viewport center
      const center = rect.top + rect.height / 2;
      const relativeToCenter = center - viewH / 2;
      const raw = relativeToCenter * speed;

      // Clamp so the background doesn't shift too far
      const clamped = Math.max(-clamp, Math.min(clamp, raw));
      setOffsetY(clamped);
    };

    /** Handles scroll. */
    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(calculate);
    };

    // Initial calculation
    calculate();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [speed, clamp]);

  return { ref, offsetY };
};

export default useParallax;
