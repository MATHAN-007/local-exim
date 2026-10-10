import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Sparkles } from 'lucide-react';
import blogData from '../../data/blog.json';
import { siteConfig } from '../../siteConfig';

export default function BlogIndex() {
  const { t } = useTranslation();

  // Sync document title
  useEffect(() => {
    document.title = `${t('blog.title')} | ${siteConfig.name}`;
  }, [t]);

  // Support spotlights or future articles array
  const items = blogData.spotlights || blogData.articles || blogData.posts || (Array.isArray(blogData) ? blogData : []);

  return (
    <div className="py-28 md:py-36 min-h-[75vh] flex flex-col justify-center relative bg-cream">
      {/* Decorative Gold Geometric Watermark */}
      <div className="absolute inset-0 bg-gold-pattern opacity-50 pointer-events-none" />

      {/* Subtle Ambient Gold Ring */}
      <div
        className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-gold-500/10 bg-gold-500/[0.02] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>{t('blog.spotlightTag', { defaultValue: 'Product Spotlight' })}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight mb-4">
            {t('blog.title')}
          </h1>

          <p className="text-base sm:text-lg text-ink/70 leading-relaxed max-w-2xl mx-auto">
            {t('blog.spotlightSubtitle', {
              defaultValue: 'A closer look at a few designs from our catalogue. Full articles coming soon.',
            })}
          </p>
        </div>

        {/* 3-Column Grid on Desktop, 1-2 on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item) => {
            const message = `Hello Local Exim, I would like to inquire about the "${item.title}". Could you please share export details?`;
            const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

            return (
              <article
                key={item.id}
                className="group bg-white rounded-2xl border border-gold-500/25 shadow-soft hover:shadow-xl hover:border-gold-500/70 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-[16/10] bg-[#FAF8F3] overflow-hidden border-b border-gold-500/15">
                  <img
                    src={item.image}
                    alt={item.title}
                    width="600"
                    height="375"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Pill Badge: Product Spotlight */}
                  <div className="absolute top-3 start-3 z-10">
                    <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-forest-900/90 text-gold-300 rounded-full backdrop-blur-sm border border-gold-500/40 shadow-xs">
                      {t('blog.spotlightTag', { defaultValue: 'Product Spotlight' })}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-forest-900 mb-2 group-hover:text-brandGreen-800 transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-sm text-ink/70 leading-relaxed mb-6">
                      {item.blurb}
                    </p>
                  </div>

                  {/* Enquire on WhatsApp (No price displayed) */}
                  <div className="pt-4 border-t border-gold-500/15">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-forest-900 bg-cream-200 hover:bg-gold-500 hover:text-white border border-gold-500/30 transition-all duration-200 shadow-sm active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4 text-brandGreen-800 group-hover:text-white transition-colors flex-shrink-0" />
                      <span>{t('catalogue.enquire', { defaultValue: 'Enquire on WhatsApp' })}</span>
                    </a>
                  </div>
                </div>

              </article>
            );
          })}
        </div>

      </div>
    </div>
  );
}
