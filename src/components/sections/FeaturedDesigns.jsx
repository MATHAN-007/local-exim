import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from '../ui/ProductCard';
import DownloadCatalogueButton from '../ui/DownloadCatalogueButton';
import productsData from '../../data/products.json';
import { siteConfig } from '../../siteConfig';

export default function FeaturedDesigns({ selectedFilter = 'all', onFilterChange, onNavigate }) {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState(selectedFilter);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (onFilterChange) onFilterChange(filter);
  };

  const filteredProducts = activeFilter === 'all'
    ? productsData.products
    : productsData.products.filter((p) => p.collection === activeFilter);

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

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <button
              type="button"
              onClick={() => handleFilter('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-forest-900 text-cream shadow-sm'
                  : 'bg-white text-ink/70 hover:bg-gold-500/15 border border-gold-500/25'
              }`}
            >
              {t('featured.allDesigns')} ({productsData.products.length})
            </button>
            <button
              type="button"
              onClick={() => handleFilter('classic')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                activeFilter === 'classic'
                  ? 'bg-forest-900 text-cream shadow-sm'
                  : 'bg-white text-ink/70 hover:bg-gold-500/15 border border-gold-500/25'
              }`}
            >
              {t('nav.classic')}
            </button>
            <button
              type="button"
              onClick={() => handleFilter('ladies')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                activeFilter === 'ladies'
                  ? 'bg-forest-900 text-cream shadow-sm'
                  : 'bg-white text-ink/70 hover:bg-gold-500/15 border border-gold-500/25'
              }`}
            >
              {t('nav.ladies')}
            </button>
          </div>
        </div>

        {/* 8 Product Grid (4 cols desktop, 2 cols tablet/mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showPrice={false}
            />
          ))}
        </div>

        {/* Full Catalogue Prompt */}
        <div className="mt-14 text-center">
          <p className="text-sm text-ink/60 mb-4">
            {t('featured.bulkInquiry')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/catalogue"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/catalogue');
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-forest-900 bg-white border border-gold-500/40 hover:bg-gold-500/10 shadow-sm transition-all"
            >
              {t('featured.viewAll')}
            </a>
            <DownloadCatalogueButton variant="ghost" />
          </div>
        </div>

      </div>
    </section>
  );
}
