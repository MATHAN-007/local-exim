import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MessageCircle, ShieldCheck, Globe, FileCheck } from 'lucide-react';
import { siteConfig } from '../../siteConfig';
import { waLink } from '../../lib/whatsapp';
import { scrollToElement } from '../../hooks/useLenis';

export default function Hero({ onNavigate }) {
  const { t } = useTranslation();

  // WhatsApp general inquiry link
  const whatsappUrl = waLink(siteConfig.waMessages?.general || 'Hello Local Exim, I would like to enquire about leather export products.');

  const handleRequestQuote = (e) => {
    e.preventDefault();
    scrollToElement('#contact');
  };

  const handleExploreProducts = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/products/leather');
    } else {
      window.location.href = '/products/leather';
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-forest-900 text-cream pt-28 pb-16 md:pt-36 md:pb-28"
    >
      {/* Background Image: Cinematic AI-generated export banner */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/hero/export-hero-banner.jpg"
          alt="Local Exim Global Leather Export"
          width="1920"
          height="1080"
          className="w-full h-full object-cover object-[65%_center] sm:object-center"
          loading="eager"
          fetchpriority="high"
        />
        {/* Layered cinematic gradient overlay: carefully tuned so port & sunrise are clearly visible on mobile while keeping text readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/75 to-forest-900/30 md:bg-gradient-to-r md:from-forest-900/95 md:via-forest-900/80 md:to-forest-900/25" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* Decorative Gold Geometric Watermark */}
      <div className="absolute inset-0 bg-dark-pattern opacity-20 pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-3xl">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-400/40 bg-forest-900/85 backdrop-blur-md shadow-sm mb-5 sm:mb-6">
            <Globe className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[11px] sm:text-sm font-semibold tracking-wider uppercase text-gold-300">
              {t('hero.eyebrow', { defaultValue: 'INDIA TO THE WORLD | GLOBAL EXPORT PARTNER' })}
            </span>
          </div>

          {/* Main H1 Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-cream leading-[1.14] mb-5 sm:mb-6 tracking-tight drop-shadow-sm">
            <span>{t('hero.title', { defaultValue: 'From Indian Craft to Global Markets.' })}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg lg:text-xl text-cream/90 font-normal leading-relaxed mb-8 max-w-2xl drop-shadow-xs">
            {t('hero.subtitle', {
              defaultValue:
                'Connecting quality leather products from India with international buyers through a commitment to product selection, dependable communication, and export-oriented service.',
            })}
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-8 sm:mb-10">
            {/* Primary CTA: Request Export Quote */}
            <a
              href="#contact"
              onClick={handleRequestQuote}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base text-forest-900 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-gold-400/60 shadow-lg text-center"
            >
              <span>{t('hero.requestQuote', { defaultValue: 'Request Export Quote' })}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </a>

            {/* Secondary CTA: Explore Our Products */}
            <a
              href="/products/leather"
              onClick={handleExploreProducts}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base text-cream bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md transition-all duration-200 active:scale-[0.98] text-center"
            >
              <span>{t('hero.exploreProducts', { defaultValue: 'Explore Our Products' })}</span>
            </a>

            {/* Tertiary Quick WhatsApp Chat */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-4 rounded-full text-xs sm:text-sm font-medium text-cream/90 hover:text-gold-300 hover:bg-white/10 transition-all text-center"
            >
              <MessageCircle className="w-4 h-4 text-green-400" />
              <span>{t('hero.chatWhatsApp', { defaultValue: 'Chat on WhatsApp' })}</span>
            </a>
          </div>

          {/* Trust Highlights Strip below CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 border-t border-white/20">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-cream/90">
              <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Direct Artisan Sourcing</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-cream/90">
              <FileCheck className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Transparent Documentation</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-cream/90">
              <Globe className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Bulk &amp; Wholesale Support</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
