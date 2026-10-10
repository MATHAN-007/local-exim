import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X, PackageX, Sparkles } from 'lucide-react';
import ProductCard from '../ui/ProductCard';
import catalogueData from '../../data/catalogue.json';
import { siteConfig } from '../../siteConfig';

export default function CataloguePage({ initialCategory, onNavigate }) {
  const { t } = useTranslation();

  // Helper to parse category from URL search params
  const getCatFromUrl = () => {
    if (typeof window === 'undefined') return 'all';
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    const validCats = catalogueData.categories.map((c) => c.id);
    return validCats.includes(cat) ? cat : 'all';
  };

  const [activeCategory, setActiveCategory] = useState(initialCategory || getCatFromUrl());
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync document title
  useEffect(() => {
    document.title = `${t('catalogue.title')} | ${siteConfig.name}`;
  }, [t]);

  // Handle URL changes via back/forward
  useEffect(() => {
    const handlePopState = () => {
      setActiveCategory(getCatFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL and state on category chip click
  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setVisibleCount(12);
    const url = catId === 'all' ? '/catalogue' : `/catalogue?cat=${catId}`;
    window.history.pushState({ cat: catId }, '', url);
  };

  // Debounce search query input (client-side, 250ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setVisibleCount(12);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter products:
  // 1. Skip excludeUntilPhoto === true
  // 2. Category match
  // 3. Name search match
  const filteredProducts = useMemo(() => {
    return catalogueData.products.filter((product) => {
      if (product.excludeUntilPhoto) return false;

      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      if (debouncedQuery.trim()) {
        const query = debouncedQuery.trim().toLowerCase();
        const matchesName = product.name?.toLowerCase().includes(query);
        const matchesCatName = product.catalogueName?.toLowerCase().includes(query);
        if (!matchesName && !matchesCatName) return false;
      }

      return true;
    });
  }, [activeCategory, debouncedQuery]);

  // Products to render based on visibleCount
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const handleClearFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setDebouncedQuery('');
    setVisibleCount(12);
    window.history.pushState({}, '', '/catalogue');
  };

  // Build chips array with 'all' + categories from catalogue.json
  const chips = [
    { id: 'all', nameKey: 'catalogue.filterAll' },
    ...catalogueData.categories,
  ];

  return (
    <div className="min-h-screen bg-cream pt-28 pb-24 md:pt-36 md:pb-32 relative">
      {/* Decorative Gold Geometric Watermark */}
      <div className="absolute inset-0 bg-gold-pattern opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Direct Artisan Export</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight mb-4">
            {t('catalogue.title')}
          </h1>

          <p className="text-base sm:text-lg text-ink/70 leading-relaxed max-w-2xl mx-auto">
            {t('catalogue.subtitle')}
          </p>
        </div>

        {/* Sticky Filter & Search Bar */}
        <div className="sticky top-[72px] sm:top-[80px] z-30 mb-10 py-3.5 px-4 sm:px-6 rounded-2xl bg-cream/95 backdrop-blur-xl border border-gold-500/30 shadow-nav transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none no-scrollbar">
              {chips.map((chip) => {
                const isActive = activeCategory === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => handleCategoryChange(chip.id)}
                    className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                      isActive
                        ? 'bg-forest-900 text-cream shadow-sm border border-forest-900 font-semibold'
                        : 'bg-white/90 text-ink/75 hover:bg-gold-500/15 hover:text-forest-900 border border-gold-500/30'
                    }`}
                  >
                    {t(chip.nameKey)}
                  </button>
                );
              })}
            </div>

            {/* Debounced Search Input */}
            <div className="relative w-full md:w-72 lg:w-80 flex-shrink-0">
              <Search className="w-4 h-4 text-ink/40 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('catalogue.searchPlaceholder')}
                className="w-full ps-10 pe-9 py-2 text-xs sm:text-sm rounded-full bg-white border border-gold-500/30 text-ink placeholder-ink/40 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute end-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-ink/40 hover:text-ink hover:bg-black/5"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Product Count Indicator */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs sm:text-sm text-ink/60 font-medium">
            Showing <span className="font-bold text-forest-900">{visibleProducts.length}</span> of{' '}
            <span className="font-bold text-forest-900">{filteredProducts.length}</span> designs
          </p>
          {(activeCategory !== 'all' || debouncedQuery) && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs text-gold-700 hover:text-gold-900 underline font-medium"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {visibleProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  whatsappNumber={siteConfig.whatsappNumber}
                  showPriceNote={true}
                  isEager={idx < 4}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-14 text-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-forest-900 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 border border-gold-400/60 shadow-sm hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  {t('catalogue.loadMore')}
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="max-w-md mx-auto my-16 p-8 sm:p-12 text-center bg-white rounded-3xl border border-gold-500/35 shadow-card">
            <div className="w-16 h-16 rounded-full bg-cream border border-gold-500/40 flex items-center justify-center mx-auto mb-4 text-ink/40">
              <PackageX className="w-8 h-8 text-gold-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-forest-900 mb-2">
              {t('catalogue.empty')}
            </h3>
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-6 inline-flex items-center px-6 py-2.5 rounded-full text-xs font-semibold text-forest-900 bg-cream-200 hover:bg-gold-500 hover:text-white border border-gold-500/40 transition-colors"
            >
              Reset filters &amp; search
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
