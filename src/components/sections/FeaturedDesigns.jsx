import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from '../ui/ProductCard';
import DownloadCatalogueButton from '../ui/DownloadCatalogueButton';
import catalogueData from '../../data/catalogue.json';
import leatherProductsData from '../../data/leatherProducts.json';
import { siteConfig } from '../../siteConfig';

export default function FeaturedDesigns({ onNavigate }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('chappals'); // 'chappals' | 'leather'

  // Chappals: first 8 products from catalogue.json
  const chappalProducts = (catalogueData.products || []).slice(0, 8);

  // Leather: first 8 visible products from leatherProducts.json (excluding excludeUntilReview)
  const leatherProducts = (leatherProductsData.products || [])
    .filter((p) => !p.excludeUntilReview)
    .slice(0, 8);

  const displayedProducts = activeTab === 'leather' ? leatherProducts : chappalProducts;

  // Active section config from siteConfig.productSections
  const activeSection =
    siteConfig.productSections.find((s) => s.id === activeTab) || siteConfig.productSections[0];

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

          {/* Two-Way Toggle: Chappals & Leather */}
          <div className="inline-flex p-1 rounded-full bg-cream-200 border border-gold-500/30 shadow-2xs self-start md:self-end">
            <button
              type="button"
              onClick={() => setActiveTab('chappals')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 ${
                activeTab === 'chappals'
                  ? 'bg-forest-900 text-cream shadow-sm'
                  : 'text-forest-900/80 hover:text-forest-900 hover:bg-gold-500/10'
              }`}
            >
              {t('productsLanding.chappalsTitle')}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('leather')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 ${
                activeTab === 'leather'
                  ? 'bg-forest-900 text-cream shadow-sm'
                  : 'text-forest-900/80 hover:text-forest-900 hover:bg-gold-500/10'
              }`}
            >
              {t('productsLanding.leatherTitle')}
            </button>
          </div>
        </div>

        {/* 8 Product Grid with stable min-height */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 min-h-[580px] sm:min-h-[660px]">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showPrice={false}
              enquireKey={activeTab === 'leather' ? 'leather.enquire' : 'catalogue.enquire'}
              photoComingSoonKey={activeTab === 'leather' ? 'leather.photoComingSoon' : 'catalogue.photoComingSoon'}
            />
          ))}
        </div>

        {/* Full Catalogue Prompt & Dynamic Target Buttons */}
        <div className="mt-14 text-center">
          <p className="text-sm text-ink/60 mb-4">
            {t('featured.bulkInquiry')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={activeSection.route}
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(activeSection.route);
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-forest-900 bg-white border border-gold-500/40 hover:bg-gold-500/10 shadow-sm transition-all"
            >
              {t('featured.viewAll')}
            </a>
            <DownloadCatalogueButton
              variant="ghost"
              file={activeSection.pdfFile}
              sizeLabel={activeSection.pdfSizeLabel}
              labelKey={activeTab === 'leather' ? 'leather.download' : 'catalogue.download'}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
