import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Calendar } from 'lucide-react';

export default function BlogCard({ post }) {
  const { t } = useTranslation();

  return (
    <article className="group bg-white rounded-2xl border border-gold-500/25 shadow-soft hover:shadow-xl hover:border-gold-500/70 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Thumbnail Frame with Date Badge */}
      <div className="relative aspect-[16/10] bg-cream-100 overflow-hidden border-b border-gold-500/15">
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt={post.title}
            width="600"
            height="375"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brandGreen-800/10 to-forest-900/10">
            <span className="text-xs uppercase tracking-wider text-forest-900/40 font-semibold">
              Local Exim Insights
            </span>
          </div>
        )}

        {/* Date Badge: Styled like horizonexim.co.in/blog */}
        {post.displayDate && (
          <div className="absolute top-3 start-3 z-10 flex flex-col items-center justify-center min-w-[50px] px-2.5 py-1.5 rounded-xl bg-forest-900/90 text-gold-300 backdrop-blur-md border border-gold-500/40 shadow-md">
            <span className="text-base font-bold font-serif leading-none">
              {post.displayDate.day}
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-cream/70 leading-tight">
              {post.displayDate.monthYear}
            </span>
          </div>
        )}

        {/* Category Pill */}
        {post.category && (
          <div className="absolute top-3 end-3 z-10">
            <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-cream/90 text-forest-900 rounded-full backdrop-blur-sm border border-gold-500/30">
              {post.category}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-forest-900 mb-2 group-hover:text-brandGreen-800 transition-colors line-clamp-2">
            <a href={`/blog/${post.slug || post.id}`} className="hover:underline">
              {post.title}
            </a>
          </h3>

          <p className="text-sm text-ink/70 leading-relaxed line-clamp-3 mb-6">
            {post.excerpt}
          </p>
        </div>

        {/* Read More Trigger */}
        <div className="pt-4 border-t border-gold-500/15 flex items-center justify-between">
          <a
            href={`/blog/${post.slug || post.id}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-forest-900 group-hover:text-gold-600 transition-colors"
          >
            <span>{t('blog.readMore')}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

    </article>
  );
}
