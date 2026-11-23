import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight } from 'lucide-react';
import { siteConfig } from '../../siteConfig';
import { scrollToTop } from '../../hooks/useLenis';

const sectionImages = {
  chappals: '/hero/ladies-bingri-kolhapuri-cutout.webp',
  leather: '/leather/croc-texture-leather-briefcase.webp',
};

export default function ProductsLanding({ onNavigate }) {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('productsLanding.title')} | ${siteConfig.name}`;
    scrollToTop(true);
  }, [t]);

  const handleCardClick = (e, route) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(route);
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-28 pb-24 md:pt-36 md:pb-32 relative">
      {/* Decorative Gold Geometric Watermark */}
      <div className="absolute inset-0 bg-gold-pattern opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Direct Artisan Export</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight mb-4">
            {t('productsLanding.title')}
          </h1>

          <p className="text-base sm:text-lg text-ink/70 leading-relaxed">
            {t('productsLanding.subtitle')}
          </p>
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {siteConfig.productSections.map((section) => {
            const imageSrc = sectionImages[section.id] || sectionImages.chappals;
            const title = t(section.nameKey);
            const desc = t(section.descKey);

            return (
              <a
                key={section.id}
                href={section.route}
                onClick={(e) => handleCardClick(e, section.route)}
                className="group bg-white rounded-2xl border border-gold-500/25 shadow-soft hover:shadow-xl hover:border-gold-500/70 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden text-start focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                {/* Card Image Area */}
                <div className="relative aspect-[4/3] bg-cream/40 p-6 sm:p-8 flex items-center justify-center overflow-hidden border-b border-gold-500/10">
                  <img
                    src={imageSrc}
                    alt={title}
                    width="480"
                    height="360"
                    loading="eager"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 end-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-forest-900/90 text-gold-300 rounded-full backdrop-blur-sm">
                      {t('hero.chip1')}
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 mb-3 group-hover:text-brandGreen-800 transition-colors">
                      {title}
                    </h2>
                    <p className="text-sm sm:text-base text-ink/70 leading-relaxed mb-6">
                      {desc}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <span className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-forest-900 bg-cream-200 group-hover:bg-gold-500 group-hover:text-white border border-gold-500/30 transition-all duration-200 shadow-xs">
                      <span>{t('productsLanding.explore')}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
