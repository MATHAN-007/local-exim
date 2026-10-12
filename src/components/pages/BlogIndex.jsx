import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Clock, ArrowRight, BookOpen } from 'lucide-react';
import blogData from '../../data/blog.json';
import { siteConfig } from '../../siteConfig';

export default function BlogIndex({ onNavigate }) {
  const { t } = useTranslation();
  const posts = blogData.posts || [];

  // Sync document title
  useEffect(() => {
    document.title = `${t('blog.title')} | ${siteConfig.name}`;
  }, [t]);

  // Featured post: Prada post
  const featuredPost = posts.find((p) => p.slug === 'prada-kolhapuri-chappal-controversy') || posts[0];
  // Remaining posts
  const remainingPosts = posts.filter((p) => p.slug !== featuredPost?.slug);

  // Scroll-reveal IntersectionObserver
  const [revealedIds, setRevealedIds] = useState(new Set());
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setRevealedIds(new Set(posts.map((p) => p.slug)));
      return;
    }

    const cards = document.querySelectorAll('.scroll-reveal-card');
    if (!cards.length) {
      setRevealedIds(new Set(posts.map((p) => p.slug)));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setRevealedIds(new Set(posts.map((p) => p.slug)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute('data-slug');
            if (slug) {
              setRevealedIds((prev) => new Set([...prev, slug]));
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: '100px' }
    );

    cards.forEach((card) => observer.observe(card));

    // Fallback timer ensuring cards animate in even if observer threshold wasn't triggered immediately
    const fallbackTimer = setTimeout(() => {
      setRevealedIds(new Set(posts.map((p) => p.slug)));
    }, 500);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [posts]);

  const getCategoryLabel = (cat) => {
    if (!cat) return null;
    if (cat === 'men-kolhapuri') return t('catalogue.cat.mensKolhapuri');
    if (cat === 'men-kapshi') return t('catalogue.cat.mensKapshi');
    if (cat === 'ladies') return t('catalogue.cat.ladies');
    return cat;
  };

  return (
    <div className="py-28 md:py-36 min-h-[75vh] flex flex-col justify-center relative bg-cream text-ink">
      {/* Decorative Gold Geometric Watermark */}
      <div className="absolute inset-0 bg-gold-pattern opacity-40 pointer-events-none" />

      {/* Subtle Ambient Gold Ring */}
      <div
        className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full border border-gold-500/10 bg-gold-500/[0.02] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Articles &amp; Field Stories</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight mb-4">
            {t('blog.title')}
          </h1>

          <p className="text-base sm:text-lg text-ink/70 leading-relaxed max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* 1. Large Featured Card (Prada Post) with Ken-Burns style slow zoom */}
        {featuredPost && (
          <div className="mb-14">
            <a
              href={`/blog/${featuredPost.slug}`}
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(`/blog/${featuredPost.slug}`);
                }
              }}
              className="group block bg-white rounded-3xl border border-gold-500/30 shadow-card hover:shadow-2xl hover:border-gold-500/70 transition-all duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                
                {/* Hero Image with Ken-Burns slow zoom on image only */}
                <div className="lg:col-span-7 h-[280px] sm:h-[360px] lg:h-[440px] overflow-hidden relative bg-[#FAF8F3]">
                  <img
                    src={featuredPost.heroImage}
                    alt={featuredPost.title}
                    width="1200"
                    height="630"
                    loading="eager"
                    fetchpriority="high"
                    className="w-full h-full object-cover ken-burns group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none lg:hidden" />
                  
                  {/* Featured Badge */}
                  <div className="absolute top-4 start-4 z-10">
                    <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-forest-900/90 text-gold-300 rounded-full backdrop-blur-md border border-gold-500/40 shadow-sm flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                      <span>Featured Article</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                  <div>
                    {/* Category & Read Time Row */}
                    <div className="flex items-center gap-3 mb-4 text-xs font-semibold text-ink/60">
                      {featuredPost.category && (
                        <span className="px-2.5 py-0.5 rounded-md bg-gold-500/15 text-gold-700 font-medium">
                          {getCategoryLabel(featuredPost.category)}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-ink/50">
                        <Clock className="w-3.5 h-3.5 text-gold-600" />
                        <span>{t('blog.readTime', { n: featuredPost.readTimeMins })}</span>
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-forest-900 mb-4 group-hover:text-brandGreen-800 transition-colors leading-[1.2]">
                      {featuredPost.title}
                    </h2>

                    <p className="text-sm sm:text-base text-ink/75 leading-relaxed mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  {/* Read Article Button */}
                  <div>
                    <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-forest-900 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 border border-gold-400/60 shadow-sm group-hover:shadow-gold-glow group-hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                      <span>{t('blog.readMore', { defaultValue: 'Read Article' })}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>

                </div>

              </div>
            </a>
          </div>
        )}

        {/* 2. Remaining 3 Posts in Responsive Grid below */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {remainingPosts.map((post, idx) => {
            const isRevealed = revealedIds.has(post.slug);
            const categoryText = getCategoryLabel(post.category);

            return (
              <article
                key={post.slug}
                data-slug={post.slug}
                className={`scroll-reveal-card group bg-white rounded-2xl border border-gold-500/25 shadow-soft hover:shadow-xl hover:border-gold-500/70 transition-all duration-300 flex flex-col justify-between overflow-hidden transform ${
                  isRevealed
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${idx * 80}ms`,
                  transitionDuration: '500ms',
                }}
              >
                {/* Hero Image: fixed aspect ratio, object-cover */}
                <div className="relative aspect-[16/10] bg-[#FAF8F3] overflow-hidden border-b border-gold-500/15">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    width="600"
                    height="375"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />

                  {/* Category chip overlay */}
                  {categoryText && (
                    <div className="absolute top-3 start-3 z-10">
                      <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-forest-900/90 text-gold-300 rounded-full backdrop-blur-sm border border-gold-500/40 shadow-2xs">
                        {categoryText}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    {/* Read time */}
                    <div className="flex items-center gap-1.5 text-xs text-ink/50 mb-2.5">
                      <Clock className="w-3.5 h-3.5 text-gold-600" />
                      <span>{t('blog.readTime', { n: post.readTimeMins })}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-forest-900 mb-2.5 group-hover:text-brandGreen-800 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    {/* Excerpt (2-line clamp) */}
                    <p className="text-xs sm:text-sm text-ink/70 leading-relaxed mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read Article CTA Link */}
                  <div className="pt-4 border-t border-gold-500/15">
                    <a
                      href={`/blog/${post.slug}`}
                      onClick={(e) => {
                        if (onNavigate) {
                          e.preventDefault();
                          onNavigate(`/blog/${post.slug}`);
                        }
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-forest-900 bg-cream-200 hover:bg-gold-500 hover:text-white border border-gold-500/30 transition-all duration-200 shadow-sm active:scale-[0.98]"
                    >
                      <BookOpen className="w-4 h-4 text-brandGreen-800 group-hover:text-white transition-colors flex-shrink-0" />
                      <span>{t('blog.readMore', { defaultValue: 'Read Article' })}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-1" />
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
