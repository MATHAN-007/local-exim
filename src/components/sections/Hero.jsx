import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles, Pause, Play } from 'lucide-react';
import { siteConfig } from '../../siteConfig';
import { waLink } from '../../lib/whatsapp';
import heroSlidesData from '../../data/heroSlides.json';

export default function Hero({ onNavigate }) {
  const { t } = useTranslation();
  const slides = heroSlidesData.slides || [];
  const intervalMs = siteConfig.heroSlideshow?.intervalMs || 3000;

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);
  const [isHovered, setIsHovered] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);

  const heroSectionRef = useRef(null);

  // WhatsApp general link via single source of truth
  const whatsappUrl = waLink(siteConfig.waMessages?.general);

  // Tab visibility listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // IntersectionObserver to pause when hero is off-screen
  useEffect(() => {
    if (!heroSectionRef.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(heroSectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Preload remaining slides after window load (idle callback)
  useEffect(() => {
    const preloadRest = () => {
      slides.slice(1).forEach((slide) => {
        const img = new Image();
        img.src = slide.image;
      });
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const handle = window.requestIdleCallback(preloadRest);
        return () => window.cancelIdleCallback(handle);
      } else {
        const timer = setTimeout(preloadRest, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [slides]);

  // Slideshow timer: 3000ms autoplay
  const canAutoplay = isPlaying && !isHovered && isIntersecting && isTabVisible;

  useEffect(() => {
    if (!canAutoplay || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [canAutoplay, currentIdx, intervalMs, slides.length]);

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brandGreen-800 via-forest-900 to-[#07170E] text-cream pt-28 pb-20 md:pt-36 md:pb-28"
    >
      {/* Background Decorative Gold Watermark & Glowing Rings */}
      <div className="absolute inset-0 bg-dark-pattern opacity-30 pointer-events-none" />

      {/* Ambient Large Gold Ring echoing the logo */}
      <div
        className="absolute top-1/2 end-[-100px] md:end-10 -translate-y-1/2 w-[420px] h-[420px] sm:w-[580px] sm:h-[580px] lg:w-[700px] lg:h-[700px] rounded-full border border-gold-500/15 bg-gradient-to-br from-gold-500/[0.04] to-transparent blur-sm pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 start-1/4 w-[300px] h-[300px] rounded-full bg-gold-500/[0.03] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT: Text Content (Col 1-7) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-400/40 bg-forest-900/80 backdrop-blur-md shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-gold-300">
                {t('hero.eyebrow')}
              </span>
            </div>

            {/* Main H1 Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-cream leading-[1.12] mb-6 tracking-tight max-w-2xl">
              <span className="text-cream block">{t('hero.title')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-cream/80 font-normal leading-relaxed mb-8 max-w-xl">
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="#collections"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base text-forest-900 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 border border-gold-300 shadow-md hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>{t('hero.cta1')}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base text-cream border border-gold-500/40 bg-forest-900/60 hover:bg-forest-900 hover:border-gold-400 transition-all duration-200 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-lime-500" />
                <span>{t('hero.cta2')}</span>
              </a>
            </div>

            {/* Tertiary Catalogue Link */}
            <div className="mt-4">
              <a
                href="/products/leather"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/products/leather');
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gold-300/90 hover:text-gold-200 underline underline-offset-4 decoration-gold-400/40 hover:decoration-gold-300 transition-colors"
              >
                <span>{t('hero.browseCatalogue')}</span>
              </a>
            </div>

            {/* Numbered Dots & Pause/Play Toggle */}
            <div
              className="mt-8 flex items-center gap-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
            >
              <span className="text-[11px] uppercase tracking-wider text-cream/50 me-1">
                Featured:
              </span>
              {slides.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  className={`px-2.5 py-1 text-xs rounded-full border transition-all duration-200 ${
                    currentIdx === idx
                      ? 'border-gold-400 text-gold-300 bg-gold-500/20 font-medium scale-105'
                      : 'border-white/10 text-cream/60 hover:text-cream hover:border-white/30 bg-black/20'
                  }`}
                  aria-label={t('hero.slide', { n: idx + 1 })}
                  aria-current={currentIdx === idx ? 'true' : undefined}
                >
                  {idx + 1}
                </button>
              ))}

              {/* Pause/Play Toggle Button for Accessibility */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="ms-1 p-1.5 rounded-full border border-white/10 text-cream/60 hover:text-gold-300 hover:border-gold-400/40 bg-black/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                aria-label={isPlaying ? t('hero.pause') : t('hero.play')}
                title={isPlaying ? t('hero.pause') : t('hero.play')}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* RIGHT: Circular Frame with Stacked Crossfading Slides & Glass Chips (Col 8-12) */}
          <div
            className="lg:col-span-5 flex justify-center items-center relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Soft decorative background circles */}
            <div className="relative flex items-center justify-center w-[300px] sm:w-[360px] md:w-[400px] h-[300px] sm:h-[360px] md:h-[400px]">
              {/* Outer Golden Halo Frame echoing the logo */}
              <div
                className="absolute inset-0 rounded-full border border-gold-400/30 bg-gradient-to-tr from-brandGreen-800/40 to-forest-900/40 backdrop-blur-sm shadow-2xl"
                aria-hidden="true"
              />

              {/* Inner ring */}
              <div
                className="absolute inset-4 rounded-full border border-gold-400/20 border-dashed"
                aria-hidden="true"
              />

              {/* Central Cutout Product Container (IMPORTANT: Max ~300px wide, float on wrapper) */}
              <div className="relative z-10 flex items-center justify-center animate-float w-[240px] sm:w-[280px] max-w-[300px] h-[240px] sm:h-[280px] max-h-[300px]">
                {slides.map((slide, idx) => {
                  const isActive = idx === currentIdx;
                  return (
                    <img
                      key={slide.id}
                      src={slide.image}
                      alt={slide.name}
                      fetchpriority={idx === 0 ? 'high' : 'auto'}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      width="300"
                      height="300"
                      className={`absolute inset-0 m-auto w-auto max-w-[300px] h-auto max-h-[300px] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.55)] transition-all duration-[600ms] ease-in-out pointer-events-none ${
                        isActive
                          ? prefersReducedMotion
                            ? 'opacity-100 z-10'
                            : 'opacity-100 scale-100 z-10'
                          : prefersReducedMotion
                          ? 'opacity-0 z-0'
                          : 'opacity-0 scale-[0.96] z-0'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Glass Chip 1: Handcrafted Leather */}
              <div className="absolute -top-2 end-2 sm:end-0 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-forest-900/85 backdrop-blur-md border border-gold-400/50 shadow-lg text-cream">
                <div className="p-1 rounded-lg bg-gold-500/20 text-gold-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium tracking-wide">
                  {t('hero.chip1')}
                </span>
              </div>

              {/* Glass Chip 2: Direct Artisan Sourcing */}
              <div className="absolute -bottom-2 start-2 sm:start-0 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-forest-900/85 backdrop-blur-md border border-gold-400/50 shadow-lg text-cream">
                <div className="p-1 rounded-lg bg-gold-500/20 text-gold-300">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium tracking-wide">
                  {t('hero.chip2')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
