import React from 'react';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '../../siteConfig';

export default function HighlightsStrip() {
  const { t } = useTranslation();

  return (
    <div className="relative z-20 -mt-10 sm:-mt-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-cream/95 backdrop-blur-xl border border-gold-500/35 rounded-2xl shadow-xl shadow-black/8 py-6 px-6 sm:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-center divide-y lg:divide-y-0 lg:divide-x rtl:lg:divide-x-reverse divide-gold-500/20">
          {siteConfig.highlights.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center ${idx > 1 ? 'pt-6 lg:pt-0' : idx === 1 ? 'pt-0' : ''}`}
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-forest-900 tracking-tight mb-1 bg-gradient-to-r from-forest-900 via-brandGreen-800 to-forest-900 bg-clip-text">
                {item.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-ink/75 max-w-[140px] leading-tight">
                {t(item.labelKey)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
