import { useEffect, useRef, useState } from "react";

/**
 * Hook that returns a ref and visibility state
 * Used to trigger scroll-based animations
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Trigger only once
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        ...options,
      }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [options]);

  return [ref, isVisible];
}