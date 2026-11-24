import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MessageCircle } from 'lucide-react';
import DownloadCatalogueButton from '../ui/DownloadCatalogueButton';
import leatherProductsData from '../../data/leatherProducts.json';
import { siteConfig } from '../../siteConfig';
import { waLink } from '../../lib/whatsapp';

export default function FeaturedDesigns({ onNavigate }) {
  const { t } = useTranslation();

  // Curate 6 diverse, authentic products representing the key export categories
  const featuredSkus = ['SH-01', 'LJ-01', 'LB-03', 'LH-02', 'WL-01', 'HT-02'];
  const allProducts = leatherProductsData.products || [];
  const featuredProducts = featuredSkus
    .map((sku) => allProducts.find((p) => p.code === sku))
    .filter(Boolean);

  const getCategoryTitle = (catId) => {
    const cat = leatherProductsData.categories?.find((c) => c.id === catId);
    if (!cat) return catId;
    return t(cat.nameKey, { defaultValue: catId.replace(/-/g, ' ') });
  };

  return (
    <section id="collections" className="py-20 lg:py-28 relative bg-[#F7F4EC] border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 text-xs font-semibold uppercase tracking-widest mb-3">
              {t('featured.eyebrow', { defaultValue: 'EXPORT CATALOGUE' })}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight mb-3">
              {t('featured.title', { defaultValue: 'Explore Our Export Collection' })}
            </h2>
            <p className="text-base text-ink/75 max-w-2xl">
              {t('featured.subtitle', {
                defaultValue:
                  'Discover our selection of leather goods and accessories for international buyers and wholesale requirements.',
              })}
            </p>
          </div>

          <div className="flex-shrink-0">
            <DownloadCatalogueButton
              variant="secondary"
              file={siteConfig.catalogueDownload?.file || '/downloads/Local-Exim-Leather-Catalogue.pdf'}
              sizeLabel={siteConfig.catalogueDownload?.sizeLabel || 'PDF · 1.1 MB'}
              labelKey="leather.download"
            />
          </div>
        </div>

        {/* 6 Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((product) => {
            const categoryLabel = getCategoryTitle(product.category);
            const waInquiryMsg = `Hello Local Exim, I am interested in ${product.name} (Code: ${product.code}) for export quotation.`;
            const waProductUrl = waLink(waInquiryMsg);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-gold-500/25 shadow-soft hover:shadow-xl hover:border-gold-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Product Image Container */}
                <div className="relative aspect-square sm:aspect-[4/3] bg-white p-4 sm:p-5 flex items-center justify-center overflow-hidden border-b border-gold-500/15">
                  <img
                    src={product.image}
                    alt={product.name}
                    width="600"
                    height="600"
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* SKU & Category Chips */}
                  <div className="absolute top-3 start-3 z-10 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider bg-forest-900/90 text-gold-300 rounded-md backdrop-blur-sm border border-gold-400/40 shadow-xs">
                      {product.code}
                    </span>
                    {categoryLabel && (
                      <span className="px-2.5 py-1 text-[11px] font-medium tracking-wide bg-cream/90 text-forest-900 rounded-md backdrop-blur-sm border border-gold-500/30 shadow-xs">
                        {categoryLabel}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-forest-900 mb-2 group-hover:text-brandGreen-800 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink/70 leading-relaxed mb-6">
                      Export grade assembly, verified artisan finishing, and available for bulk specifications.
                    </p>
                  </div>

                  {/* Action Row */}
                  <div className="pt-4 border-t border-gold-500/15 flex items-center gap-3">
                    <a
                      href={waProductUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-forest-900 bg-gold-500/15 hover:bg-gold-500 hover:text-white border border-gold-500/35 transition-all duration-200"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-forest-900 group-hover:text-white" />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to view full catalogue */}
        <div className="mt-14 text-center">
          <p className="text-sm text-ink/65 mb-4">
            Looking for specific styles, volume quantities, or custom leather items?
          </p>
          <a
            href="/products/leather"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('/products/leather');
              }
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base text-forest-900 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-gold-400/60 shadow-md"
          >
            <span>View Complete Export Catalogue</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </a>
        </div>

      </div>
    </section>
  );
}
