import React from 'react';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { siteConfig } from '../../siteConfig';
import catalogueData from '../../data/catalogue.json';

export default function Footer({ onNavigate }) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Social links (only non-empty entries)
  const socialLinks = [
    { key: 'instagram', icon: Instagram, url: siteConfig.social?.instagram },
    { key: 'facebook', icon: Facebook, url: siteConfig.social?.facebook },
    { key: 'linkedin', icon: Linkedin, url: siteConfig.social?.linkedin },
    { key: 'youtube', icon: Youtube, url: siteConfig.social?.youtube },
  ].filter((item) => item.url && item.url.trim().length > 0);

  // Column A: Company links
  const companyLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/#about' },
    { label: t('nav.catalogue'), href: '/catalogue', isRoute: true },
    { label: t('nav.blog'), href: '/blog', isRoute: true },
    { label: t('nav.why'), href: '/#why-us' },
    { label: t('nav.contact'), href: '/#contact' },
  ];

  // Column B: Catalogue category links from catalogue.json
  const catalogueCategories = catalogueData.categories.map((cat) => ({
    label: t(cat.nameKey),
    href: `/catalogue?cat=${cat.id}`,
    isRoute: true,
  }));

  const handleLinkClick = (e, link) => {
    if (onNavigate) {
      if (link.isRoute) {
        e.preventDefault();
        onNavigate(link.href);
      } else if (link.href === '/') {
        e.preventDefault();
        onNavigate('/');
      } else if (link.href.startsWith('/#')) {
        e.preventDefault();
        onNavigate('/');
        setTimeout(() => {
          const target = document.querySelector(link.href.replace('/', ''));
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <footer className="bg-[#07170E] text-cream/70 border-t border-gold-500/20 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header: Logo Lockup & Tagline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-10 border-b border-white/10">
          <div className="flex flex-col items-start">
            <a
              href="/"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/');
                }
              }}
              className="inline-block mb-2"
              aria-label="Local Exim"
            >
              <img
                src="/logo/logo-horizontal-light.png"
                srcSet="/logo/logo-horizontal-light@2x.png 2x"
                alt="Local Exim"
                width="160"
                height="40"
                loading="lazy"
                className="h-9 w-auto object-contain"
              />
            </a>
            <p className="text-xs sm:text-sm text-gold-300 font-serif italic">
              "{siteConfig.tagline}"
            </p>
          </div>

          {/* Social Links (Render ONLY when non-empty, no awkward gap when empty) */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.key}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 border border-gold-500/20 flex items-center justify-center text-cream/70 hover:text-gold-300 hover:border-gold-400 hover:bg-white/10 transition-colors"
                    aria-label={item.key}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* 3 Columns Grid on Desktop (stack on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 py-12 border-b border-gold-500/10">
          
          {/* Column A: Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400 mb-5">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className="hover:text-gold-300 transition-colors text-cream/80 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column B: Catalogue */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400 mb-5">
              {t('footer.productsHeading')}
            </h4>
            <ul className="space-y-3 text-sm">
              {catalogueCategories.map((cat, idx) => (
                <li key={idx}>
                  <a
                    href={cat.href}
                    onClick={(e) => handleLinkClick(e, cat)}
                    className="hover:text-gold-300 transition-colors text-cream/80 inline-block"
                  >
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column C: Get in Touch (3 labeled rows: email, phone, location) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400 mb-5">
              {t('footer.getInTouch')}
            </h4>
            <div className="space-y-4 text-sm">
              
              {/* Row 1: Email */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="block text-[10px] uppercase font-semibold tracking-wider text-gold-400/80 mb-1">
                  {t('footer.email')}
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-bold text-cream hover:text-gold-300 transition-colors block text-sm"
                >
                  {siteConfig.email}
                </a>
              </div>

              {/* Row 2: Phone */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="block text-[10px] uppercase font-semibold tracking-wider text-gold-400/80 mb-1">
                  {t('footer.phone')}
                </span>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="font-bold text-cream hover:text-gold-300 transition-colors block text-sm"
                >
                  {siteConfig.phone}
                </a>
              </div>

              {/* Row 3: Office Location */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="block text-[10px] uppercase font-semibold tracking-wider text-gold-400/80 mb-1">
                  {t('footer.location')}
                </span>
                <span className="font-bold text-cream block text-sm leading-snug">
                  {siteConfig.address}
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar: Divided by thin gold/10 divider */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50 gap-4">
          <p>
            &copy; {currentYear} {siteConfig.name}. {t('footer.rights')}
          </p>
        </div>

      </div>
    </footer>
  );
}
