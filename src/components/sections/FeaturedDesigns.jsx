import React from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from '../ui/ProductCard';
import DownloadCatalogueButton from '../ui/DownloadCatalogueButton';
import leatherProductsData from '../../data/leatherProducts.json';
import { siteConfig } from '../../siteConfig';

export default function FeaturedDesigns({ onNavigate }) {
  const { t } = useTranslation();

  // First 8 visible products from leatherProducts.json (excluding excludeUntilReview)
  const featuredProducts = (leatherProductsData.products || [])
    .filter((p) => !p.excludeUntilReview)
    .slice(0, 8);

  return (
    <section id="featured" className="py-20 lg:py-28 relative bg-cream-50 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">
              Export Catalogue
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight mb-2">
              {t('featured.title')}
            </h2>
            <p className="text-base text-ink/70">
              {t('featured.subtitle')}
            </p>
          </div>
        </div>

        {/* 8 Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showPrice={false}
              enquireKey="leather.enquire"
              photoComingSoonKey="leather.photoComingSoon"
            />
          ))}
        </div>

        {/* Full Catalogue Prompt & Single Download / View Buttons */}
        <div className="mt-14 text-center">
          <p className="text-sm text-ink/60 mb-4">
            {t('featured.bulkInquiry')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/products/leather"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/products/leather');
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-forest-900 bg-white border border-gold-500/40 hover:bg-gold-500/10 shadow-sm transition-all"
            >
              {t('featured.viewAll')}
            </a>
            <DownloadCatalogueButton
              variant="ghost"
              file={siteConfig.catalogueDownload?.file || '/downloads/Local-Exim-Leather-Catalogue.pdf'}
              sizeLabel={siteConfig.catalogueDownload?.sizeLabel || 'PDF · 0.8 MB'}
              labelKey="leather.download"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
