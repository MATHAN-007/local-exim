import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

export function scrollToTop(immediate = true) {
  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  } catch (e) {
    try {
      window.scrollTo(0, 0);
    } catch (_) {}
  }
  if (lenisInstance) {
    try {
      lenisInstance.scrollTo(0, { immediate: true, force: true });
    } catch (e) {}
  }
}

export function scrollToElement(selector, offset = -90) {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export function useLenis() {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisInstance = lenis;

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
