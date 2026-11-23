import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Menu, X, MessageCircle, Check } from 'lucide-react';
import { siteConfig } from '../../siteConfig';
import { loadLanguageAsync } from '../../i18n';
import { waLink } from '../../lib/whatsapp';
import { scrollToElement } from '../../hooks/useLenis';
import DownloadCatalogueButton from '../ui/DownloadCatalogueButton';

export default function Navbar({ currentRoute = '/', onNavigate }) {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const langMenuRef = useRef(null);
  const catalogueMenuRef = useRef(null);
  const mobileDrawerRef = useRef(null);
  const navRef = useRef(null);

  const currentLang = i18n.language ? i18n.language.split('-')[0] : 'en';

  // Smooth shrink on scroll (stays fixed and visible at all times)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy with IntersectionObserver for home page sections
  useEffect(() => {
    if (currentRoute !== '/') return;

    const sectionIds = ['hero', 'collections', 'about', 'why-us', 'contact'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-30% 0px -50% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [currentRoute]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
      if (catalogueMenuRef.current && !catalogueMenuRef.current.contains(e.target)) {
        setIsCatalogueOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Mobile drawer: ESC key close
  useEffect(() => {
    if (!isMobileOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleLanguageChange = async (code) => {
    await loadLanguageAsync(code);
    i18n.changeLanguage(code);
    setIsLangOpen(false);
    setIsMobileOpen(false);
  };

  const handleLinkClick = (e, item) => {
    setIsMobileOpen(false);
    setIsCatalogueOpen(false);

    if (item.isRoute) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(item.href);
      } else {
        window.location.href = item.href;
      }
    } else if (currentRoute === '/') {
      e.preventDefault();
      scrollToElement(item.href);
    } else {
      e.preventDefault();
      if (onNavigate) {
        onNavigate('/');
        setTimeout(() => {
          scrollToElement(item.href);
        }, 120);
      } else {
        window.location.href = '/' + item.href;
      }
    }
  };

  // Main Nav Items: Home, Products (with dropdown), About, Why Us, Blog (conditional), Contact
  const navItems = [
    { id: 'hero', label: t('nav.home'), href: '/', isRoute: true },
    {
      id: 'catalogue',
      label: t('nav.products'),
      href: '/products',
      isRoute: true,
      hasDropdown: true,
      subItems: [
        { label: t('productsLanding.chappalsTitle'), href: '/products/chappals', isRoute: true },
        { label: t('productsLanding.leatherTitle'), href: '/products/leather', isRoute: true },
      ],
    },
    { id: 'about', label: t('nav.about'), href: '#about' },
    { id: 'why-us', label: t('nav.why'), href: '#why-us' },
  ];

  if (siteConfig.showBlog) {
    navItems.push({
      id: 'blog',
      label: t('nav.blog'),
      href: '/blog',
      isRoute: true,
    });
  }

  navItems.push({ id: 'contact', label: t('nav.contact'), href: '#contact' });

  const whatsappUrl = waLink(siteConfig.waMessages?.general);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[1200px] transition-all duration-300 pointer-events-auto"
      >
        <nav
          className={`flex items-center justify-between mx-auto rounded-full glass-pill transition-all duration-300 ${
            isScrolled
              ? 'py-2 px-4 sm:px-6 shadow-xl shadow-black/15 bg-cream/95'
              : 'py-3 sm:py-3.5 px-5 sm:px-8 shadow-nav bg-cream/90'
          }`}
          aria-label="Main Navigation"
        >
          {/* LEFT: Logo Lockup */}
          <a
            href="/"
            onClick={(e) => {
              if (currentRoute !== '/') {
                e.preventDefault();
                if (onNavigate) onNavigate('/');
              }
            }}
            className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg py-1"
            aria-label="Local Exim - Return to home"
          >
            <img
              src="/logo/logo-horizontal.png"
              srcSet="/logo/logo-horizontal@2x.png 2x"
              alt="Local Exim"
              className="h-[36px] lg:h-[40px] w-auto object-contain transition-transform duration-200 hover:scale-[1.02]"
              width="160"
              height="40"
            />
          </a>

          {/* CENTER: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isCatalogueActive = (currentRoute.startsWith('/products') || currentRoute.startsWith('/catalogue')) && item.id === 'catalogue';
              const isBlogActive = currentRoute.startsWith('/blog') && item.id === 'blog';
              const isHomeActive = currentRoute === '/' && item.id === 'hero';
              const isSectionActive = currentRoute === '/' && activeSection === item.id;

              const isActive = isCatalogueActive || isBlogActive || (item.id === 'hero' ? isHomeActive : isSectionActive);

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.id}
                    ref={catalogueMenuRef}
                    className="relative group"
                    onMouseEnter={() => setIsCatalogueOpen(true)}
                    onMouseLeave={() => setIsCatalogueOpen(false)}
                  >
                    <div className="flex items-center">
                      <a
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item)}
                        className={`relative flex items-center gap-1 ps-3.5 pe-1 py-1.5 text-sm font-medium transition-colors duration-200 rounded-s-full ${
                          isActive ? 'text-forest-900 font-semibold' : 'text-ink/80 hover:text-forest-900'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="absolute bottom-0 inset-x-3 h-[2px] bg-gold-500 rounded-full transition-all duration-300" />
                        )}
                      </a>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsCatalogueOpen(true);
                        }}
                        className="pe-2.5 ps-0.5 py-1.5 rounded-e-full text-ink/70 hover:text-forest-900 transition-colors focus:outline-none"
                        aria-label="Toggle Catalogue Menu"
                        aria-expanded={isCatalogueOpen}
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isCatalogueOpen ? 'rotate-180 text-gold-600' : 'text-ink/60'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Catalogue Dropdown Panel */}
                    <div
                      className={`absolute top-full start-0 pt-2 transition-all duration-200 ${
                        isCatalogueOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="w-56 py-2 bg-cream/95 backdrop-blur-xl border border-gold-500/40 rounded-2xl shadow-xl overflow-hidden">
                        {item.subItems.map((sub, idx) => (
                          <a
                            key={idx}
                            href={sub.href}
                            onClick={(e) => {
                              setIsCatalogueOpen(false);
                              handleLinkClick(e, sub);
                            }}
                            className="block px-4 py-2.5 text-xs sm:text-sm text-ink/90 hover:bg-gold-500/15 hover:text-forest-900 transition-colors"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.isRoute ? item.href : currentRoute === '/' ? item.href : `/${item.href}`}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full ${
                    isActive ? 'text-forest-900 font-semibold' : 'text-ink/80 hover:text-forest-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-3 h-[2px] bg-gold-500 rounded-full transition-all duration-300" />
                  )}
                </a>
              );
            })}
          </div>

          {/* RIGHT: Language Switcher & Quote CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher (10 languages, 2-column grid desktop) */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-500/30 bg-white/70 hover:bg-white text-xs sm:text-sm font-medium text-forest-900 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                aria-expanded={isLangOpen}
                aria-haspopup="true"
                aria-label="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-gold-600" />
                <span className="uppercase font-semibold tracking-wider">{currentLang}</span>
                <ChevronDown className={`w-3 h-3 text-ink/60 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Desktop Dropdown: 2-column grid (now 15 languages, scrollable) */}
              {isLangOpen && (
                <div className="absolute top-full end-0 mt-2 w-80 sm:w-[360px] max-h-[70vh] sm:max-h-[360px] overflow-y-auto p-2.5 bg-cream/95 backdrop-blur-xl border border-gold-500/40 rounded-2xl shadow-2xl z-50">
                  <div className="grid grid-cols-2 gap-1.5 pe-0.5">
                    {siteConfig.languages.map((lang) => {
                      const isActive = currentLang === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`flex items-center justify-between px-3 py-2 text-xs sm:text-sm rounded-xl text-start transition-all ${
                            isActive
                              ? 'border-s-2 border-gold-500 bg-brandGreen-800/15 text-forest-900 font-semibold'
                              : 'text-ink/80 hover:bg-brandGreen-800/10 hover:text-forest-900'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 overflow-hidden">
                            <span className="text-[10px] uppercase font-bold text-ink/50 bg-black/5 px-1.5 py-0.5 rounded">
                              {lang.code}
                            </span>
                            <span className="truncate">{lang.native}</span>
                          </div>
                          {isActive && (
                            <Check className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 ms-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Get Quote CTA (Desktop) */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                if (currentRoute === '/') {
                  scrollToElement('#contact');
                } else if (onNavigate) {
                  onNavigate('/');
                  setTimeout(() => {
                    scrollToElement('#contact');
                  }, 120);
                }
              }}
              className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm text-forest-900 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 border border-gold-400/50 shadow-sm hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              {t('nav.quote')}
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-full text-forest-900 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              aria-label={isMobileOpen ? t('nav.close') : t('nav.menu')}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {isMobileOpen ? <X className="w-5 h-5 text-forest-900" /> : <Menu className="w-5 h-5 text-forest-900" />}
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE DRAWER (<1024px) */}
      {isMobileOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 lg:hidden"
        >
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-forest-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer sheet sliding in from end */}
          <div
            ref={mobileDrawerRef}
            className="fixed top-0 bottom-0 end-0 w-full max-w-sm bg-cream border-s border-gold-500/30 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-gold-500/20">
                <img
                  src="/logo/logo-horizontal.png"
                  srcSet="/logo/logo-horizontal@2x.png 2x"
                  alt="Local Exim"
                  className="h-8 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 text-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  aria-label={t('nav.close')}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="py-5 space-y-1">
                {navItems.map((item) => {
                  const isCatalogueActive = (currentRoute.startsWith('/products') || currentRoute.startsWith('/catalogue')) && item.id === 'catalogue';
                  const isBlogActive = currentRoute.startsWith('/blog') && item.id === 'blog';
                  const isHomeActive = currentRoute === '/' && item.id === 'hero';
                  const isSectionActive = currentRoute === '/' && activeSection === item.id;
                  const isActive = isCatalogueActive || isBlogActive || (item.id === 'hero' ? isHomeActive : isSectionActive);

                  return (
                    <div key={item.id}>
                      <a
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item)}
                        className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-gold-500/20 text-forest-900 font-semibold border-s-4 border-gold-500'
                            : 'text-ink/80 hover:bg-black/5 hover:text-forest-900'
                        }`}
                      >
                        {item.label}
                      </a>
                      {item.subItems && (
                        <div className="ps-6 pe-2 py-1 space-y-1">
                          {item.subItems.map((sub, idx) => (
                            <a
                              key={idx}
                              href={sub.href}
                              onClick={(e) => handleLinkClick(e, sub)}
                              className="block px-3 py-1.5 rounded-lg text-sm text-ink/70 hover:text-forest-900 hover:bg-black/5"
                            >
                              {sub.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Download Catalogue PDF Button below nav links */}
              <div className="pb-4">
                <DownloadCatalogueButton variant="secondary" className="w-full" />
              </div>

              {/* Language Selector in Drawer: Single column with internal scroll */}
              <div className="pt-4 pb-4 border-t border-gold-500/20">
                <p className="px-1 text-xs font-semibold uppercase tracking-wider text-ink/50 mb-2">
                  Language / اللغة ({siteConfig.languages.length})
                </p>
                <div className="max-h-48 overflow-y-auto space-y-1 pe-1">
                  {siteConfig.languages.map((lang) => {
                    const isActive = currentLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl text-start transition-all ${
                          isActive
                            ? 'border-s-2 border-gold-500 bg-brandGreen-800/15 text-forest-900 font-semibold'
                            : 'text-ink/80 hover:bg-brandGreen-800/10 hover:text-forest-900 bg-white/50 border border-gold-500/10'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-ink/50 bg-black/5 px-1.5 py-0.5 rounded">
                            {lang.code}
                          </span>
                          <span>{lang.native}</span>
                        </div>
                        {isActive && (
                          <Check className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-4 border-t border-gold-500/20 space-y-3">
              <a
                href="#contact"
                onClick={(e) => {
                  setIsMobileOpen(false);
                  e.preventDefault();
                  if (currentRoute === '/') {
                    scrollToElement('#contact');
                  } else if (onNavigate) {
                    onNavigate('/');
                    setTimeout(() => {
                      scrollToElement('#contact');
                    }, 120);
                  }
                }}
                className="w-full flex items-center justify-center px-5 py-3 rounded-xl font-medium text-sm text-forest-900 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 shadow-sm"
              >
                {t('nav.quote')}
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-white bg-green-700 hover:bg-green-800 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('hero.cta2')}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
