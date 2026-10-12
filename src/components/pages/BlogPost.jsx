import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Copy,
  Check,
  MessageCircle,
  FolderOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import blogData from '../../data/blog.json';
import { siteConfig } from '../../siteConfig';
import { waLink } from '../../lib/whatsapp';
import ComparisonChart from '../blog/ComparisonChart';

export default function BlogPost({ slug, onNavigate }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Find post by slug
  const post = useMemo(() => {
    const list = blogData.posts || [];
    return list.find((p) => p.slug === slug);
  }, [slug]);

  // If not found, redirect to /blog
  useEffect(() => {
    if (!post && onNavigate) {
      onNavigate('/blog');
    }
  }, [post, onNavigate]);

  // Sync document title and meta description
  useEffect(() => {
    if (!post) return;
    const title = post.metaTitle || `${post.title} | ${siteConfig.name}`;
    document.title = title;

    let descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', post.metaDescription || post.excerpt);
    }

    let kwMeta = document.querySelector('meta[name="keywords"]');
    if (kwMeta && post.keywords) {
      kwMeta.setAttribute('content', post.keywords.join(', '));
    }

    return () => {
      document.title = `${t('blog.title')} | ${siteConfig.name}`;
    };
  }, [post, t]);

  // Reading progress bar calculation
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2 related posts
  const relatedPosts = useMemo(() => {
    const list = blogData.posts || [];
    return list.filter((p) => p.slug !== slug).slice(0, 2);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-cream">
        <p className="text-sm text-ink/60">Redirecting to blog...</p>
      </div>
    );
  }

  // Share URLs
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://localexim.com/blog/${slug}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `${post.title} — ${currentUrl}`
  )}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error('Failed to copy URL', err);
    }
  };

  // WhatsApp enquiry for post
  const waEnquiryMsg = `Hello Local Exim, I read your article "${post.title}" and would like to ask a question.`;
  const postWaUrl = waLink(waEnquiryMsg);

  // Format category label
  const getCategoryLabel = (cat) => {
    if (!cat) return null;
    if (cat === 'men-kolhapuri') return t('catalogue.cat.mensKolhapuri');
    if (cat === 'men-kapshi') return t('catalogue.cat.mensKapshi');
    if (cat === 'ladies') return t('catalogue.cat.ladies');
    return cat;
  };

  const categoryLabel = getCategoryLabel(post.category);

  return (
    <div className="min-h-screen bg-cream pt-24 pb-24 md:pt-32 md:pb-32 relative text-ink selection:bg-gold-500 selection:text-white">
      {/* 1. Thin Reading Progress Bar fixed at top of viewport */}
      <div
        className="fixed top-0 inset-x-0 h-1 z-[60] bg-gold-500/15 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-gold-400 via-gold-500 to-forest-800 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Decorative Gold Geometric Watermark */}
      <div className="absolute inset-0 bg-gold-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <a
            href="/blog"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('/blog');
              }
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-forest-900/80 hover:text-gold-700 transition-colors py-1.5"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{t('blog.back', { defaultValue: 'Back to Blog' })}</span>
          </a>
        </div>

        {/* Hero Image Container: Full-width, max ~420px tall, object-cover */}
        <div className="w-full max-h-[420px] h-[260px] sm:h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow-card border border-gold-500/25 relative mb-8 bg-[#FAF8F3]">
          <img
            src={post.heroImage}
            alt={post.title}
            width="1200"
            height="630"
            loading="eager"
            fetchpriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Article Header & Meta */}
        <header className="max-w-[680px] mx-auto mb-10">
          {/* Category Chip */}
          {categoryLabel && (
            <div className="mb-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/15 text-gold-700 border border-gold-500/30">
                {categoryLabel}
              </span>
            </div>
          )}

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-forest-900 tracking-tight leading-[1.18] mb-4">
            {post.title}
          </h1>

          {/* Meta Row: Read time, keywords/date, share row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gold-500/20 text-xs sm:text-sm text-ink/65">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gold-600" />
                <span>{t('blog.readTime', { n: post.readTimeMins })}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gold-600" />
                <span>{post.readTimeMins ? `${post.wordCount} words` : 'Export Insights'}</span>
              </span>
            </div>

            {/* Share Row */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-ink/50 uppercase tracking-wider me-1">
                {t('blog.share', { defaultValue: 'Share' })}:
              </span>
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-700/10 hover:bg-green-700 hover:text-white border border-green-600/30 text-green-800 text-xs font-medium transition-all"
                aria-label={t('blog.shareOnWhatsapp', { defaultValue: 'Share on WhatsApp' })}
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-gold-500/15 border border-gold-500/30 text-forest-900 text-xs font-medium transition-all"
                aria-label={t('blog.copyLink', { defaultValue: 'Copy link' })}
                title="Copy link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-gold-600" />}
                <span>{copied ? t('blog.linkCopied', { defaultValue: 'Link copied' }) : t('blog.copyLink', { defaultValue: 'Copy link' })}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Article Body Column (~680px max width for optimal reading rhythm) */}
        <article className="max-w-[680px] mx-auto prose-custom">
          {post.hasComparisonChart ? (
            /* For the Prada post, render comparison chart right between the backstory and analysis */
            <>
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 mt-10 mb-4 pt-4 border-t border-gold-500/15" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-base sm:text-lg text-ink/80 leading-relaxed mb-6 font-sans" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold text-forest-900" {...props} />
                  ),
                  a: ({ node, href, ...props }) => (
                    <a
                      href={href}
                      onClick={(e) => {
                        if (href?.startsWith('/') && onNavigate) {
                          e.preventDefault();
                          onNavigate(href);
                        }
                      }}
                      className="text-gold-700 hover:text-gold-900 font-medium underline underline-offset-4 decoration-gold-400/50 hover:decoration-gold-700 transition-colors"
                      {...props}
                    />
                  ),
                }}
              >
                {post.body.split('## Why It Struck a Nerve')[0]}
              </ReactMarkdown>

              {/* Pure SVG/div Comparison Chart */}
              <ComparisonChart chart={post.comparisonChart} />

              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 mt-10 mb-4 pt-4 border-t border-gold-500/15" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-base sm:text-lg text-ink/80 leading-relaxed mb-6 font-sans" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold text-forest-900" {...props} />
                  ),
                  a: ({ node, href, ...props }) => (
                    <a
                      href={href}
                      onClick={(e) => {
                        if (href?.startsWith('/') && onNavigate) {
                          e.preventDefault();
                          onNavigate(href);
                        }
                      }}
                      className="text-gold-700 hover:text-gold-900 font-medium underline underline-offset-4 decoration-gold-400/50 hover:decoration-gold-700 transition-colors"
                      {...props}
                    />
                  ),
                }}
              >
                {`## Why It Struck a Nerve${post.body.split('## Why It Struck a Nerve')[1] || ''}`}
              </ReactMarkdown>
            </>
          ) : (
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 mt-10 mb-4 pt-4 border-t border-gold-500/15" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-base sm:text-lg text-ink/80 leading-relaxed mb-6 font-sans" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-semibold text-forest-900" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-outside ps-6 mb-6 space-y-2 text-base sm:text-lg text-ink/80" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-outside ps-6 mb-6 space-y-2 text-base sm:text-lg text-ink/80" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="leading-relaxed" {...props} />
                ),
                a: ({ node, href, ...props }) => (
                  <a
                    href={href}
                    onClick={(e) => {
                      if (href?.startsWith('/') && onNavigate) {
                        e.preventDefault();
                        onNavigate(href);
                      }
                    }}
                    className="text-gold-700 hover:text-gold-900 font-medium underline underline-offset-4 decoration-gold-400/50 hover:decoration-gold-700 transition-colors"
                    {...props}
                  />
                ),
              }}
            >
              {post.body}
            </ReactMarkdown>
          )}
        </article>

        {/* Bottom CTA Block: WhatsApp Inquiry & Related Collection */}
        <div className="max-w-[680px] mx-auto mt-14 pt-8 border-t border-gold-500/25">
          <div className="p-6 sm:p-8 rounded-3xl bg-forest-900 text-cream border border-gold-500/35 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Export Direct</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-cream mb-1">
                Have questions about this article?
              </h3>
              <p className="text-xs sm:text-sm text-cream/70">
                Our export team is available directly on WhatsApp to answer craft and sourcing queries.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <a
                href={postWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-xs sm:text-sm text-forest-900 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 hover:shadow-gold-glow transition-all"
              >
                <MessageCircle className="w-4 h-4 text-forest-900" />
                <span>{t('blog.askUs', { defaultValue: 'Ask us on WhatsApp' })}</span>
              </a>

              {post.category && (
                <a
                  href={`/catalogue?cat=${post.category}`}
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(`/catalogue?cat=${post.category}`);
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-xs sm:text-sm text-cream bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
                >
                  <FolderOpen className="w-4 h-4 text-gold-300" />
                  <span>{t('blog.viewCollection', { defaultValue: 'View Related Collection' })}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* "You might also like": up to 2 other posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-[680px] mx-auto mt-16 pt-10 border-t border-gold-500/20">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-forest-900 mb-6">
              {t('blog.relatedPosts', { defaultValue: 'You might also like' })}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((item) => (
                <a
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(`/blog/${item.slug}`);
                    }
                  }}
                  className="group bg-white rounded-2xl border border-gold-500/25 p-4 shadow-soft hover:shadow-lg hover:border-gold-500/60 transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-[#FAF8F3]">
                    <img
                      src={item.heroImage}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-ink/50 mb-1">
                      <Clock className="w-3 h-3 text-gold-600" />
                      <span>{t('blog.readTime', { n: item.readTimeMins })}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-serif font-bold text-forest-900 group-hover:text-brandGreen-800 transition-colors line-clamp-2 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-ink/65 line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-gold-700 group-hover:text-gold-900">
                    <span>{t('blog.readMore', { defaultValue: 'Read Article' })}</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
