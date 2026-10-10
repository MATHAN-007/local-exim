import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t('footer.backToTop', { defaultValue: 'Back to top' })}
      className={`fixed bottom-[88px] sm:bottom-[92px] end-6 z-40 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-forest-900/95 text-gold-300 border border-gold-500/40 shadow-xl backdrop-blur-md hover:bg-gold-500 hover:text-forest-900 hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
}
