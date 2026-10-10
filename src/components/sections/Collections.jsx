import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import productsData from '../../data/products.json';

export default function Collections({ onSelectCollection, onNavigate }) {
  const { t } = useTranslation();

  return (
    <section id="collections" className="py-20 lg:py-28 relative overflow-hidden bg-cream">
      {/* Decorative subtle pattern */}
      <div className="absolute inset-0 bg-gold-pattern opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">
            Handmade Heritage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight mb-4">
            {t('collections.title')}
          </h2>
          <p className="text-base sm:text-lg text-ink/70">
            {t('collections.subtitle')}
          </p>
        </div>

        {/* 2 Large Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {productsData.collections.map((col) => {
            const targetCat = col.id === 'ladies' ? 'ladies' : 'men-kolhapuri';
            const targetUrl = `/catalogue?cat=${targetCat}`;

            return (
              <div
                key={col.id}
                className="group relative bg-white rounded-3xl border border-gold-500/25 shadow-card overflow-hidden hover:-translate-y-2 hover:border-gold-500 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Frame */}
                <div className="relative aspect-[4/3] bg-gradient-to-b from-[#F5F2EB] to-[#FAF8F3] overflow-hidden flex items-center justify-center p-8">
                  <img
                    src={col.image}
                    alt={t(col.nameKey)}
                    width="480"
                    height="480"
                    loading="lazy"
                    className="w-full max-w-[320px] h-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Card Content */}
                <div className="p-8 sm:p-10 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 mb-3 group-hover:text-brandGreen-800 transition-colors">
                      {t(col.nameKey)}
                    </h3>
                    <p className="text-sm sm:text-base text-ink/70 leading-relaxed mb-6">
                      {t(col.descKey)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gold-500/20">
                    <a
                      href={targetUrl}
                      onClick={(e) => {
                        if (onNavigate) {
                          e.preventDefault();
                          onNavigate(targetUrl);
                        }
                      }}
                      className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-forest-900 group-hover:text-gold-600 transition-colors"
                    >
                      <span>{t('collections.explore')}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
