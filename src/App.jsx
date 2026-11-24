import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { subscribeI18n, getI18nSnapshot } from './i18n';
import { useLenis, scrollToTop } from './hooks/useLenis';
import { siteConfig } from './siteConfig';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import HighlightsStrip from './components/sections/HighlightsStrip';
import Collections from './components/sections/Collections';
import FeaturedDesigns from './components/sections/FeaturedDesigns';
import AboutTeaser from './components/sections/AboutTeaser';
import WhyChooseUs from './components/sections/WhyChooseUs';
import HowToOrder from './components/sections/HowToOrder';
import Testimonials from './components/sections/Testimonials';
import ContactSection from './components/sections/ContactSection';
import BlogIndex from './components/pages/BlogIndex';
import BlogPost from './components/pages/BlogPost';
import LeatherProductsPage from './components/pages/LeatherProductsPage';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import BackToTop from './components/ui/BackToTop';

function LegacyCatalogueRedirect({ onNavigate }) {
  useEffect(() => {
    onNavigate('/products/leather', true);
  }, [onNavigate]);

  return <LeatherProductsPage onNavigate={onNavigate} />;
}

export default function App() {
  // Synchronize React with i18n on-demand lazy bundle additions
  useSyncExternalStore(subscribeI18n, getI18nSnapshot);

  // Initialize Lenis smooth scroll
  useLenis();

  const [currentRoute, setCurrentRoute] = useState(
    window.location.pathname + window.location.search
  );
  const [selectedCollectionFilter, setSelectedCollectionFilter] = useState('all');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname + window.location.search);
      scrollToTop(true);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentRoute === '/' || currentRoute === '') {
      document.title = `${siteConfig.name} – ${siteConfig.tagline}`;
    }
    scrollToTop(true);
  }, [currentRoute]);

  const navigate = (path, replace = false) => {
    if (replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    setCurrentRoute(path);
    scrollToTop(true);
  };

  const handleSelectCollection = (collectionId) => {
    setSelectedCollectionFilter(collectionId);
  };

  const urlPath = currentRoute.split('?')[0];
  const blogMatch = urlPath.match(/^\/blog\/(.+)$/);
  const blogSlug = blogMatch ? blogMatch[1] : null;
  const isBlogPostRoute = !!blogSlug;
  const isBlogIndexRoute = urlPath === '/blog' || (urlPath.startsWith('/blog') && !blogSlug);
  const isLeatherRoute = urlPath === '/products/leather';
  const isLegacyRedirectRoute =
    urlPath === '/catalogue' ||
    urlPath.startsWith('/catalogue') ||
    urlPath === '/products/chappals' ||
    urlPath.startsWith('/products/chappals') ||
    urlPath === '/products';

  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink selection:bg-gold-500 selection:text-white">
      {/* Accessible skip link for keyboard/screen reader accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-forest-900 focus:text-gold-300 focus:rounded-lg focus:shadow-xl focus:border focus:border-gold-400"
      >
        Skip to main content
      </a>

      {/* Floating Pill Navbar */}
      <Navbar currentRoute={currentRoute} onNavigate={navigate} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-grow">
        {isBlogPostRoute ? (
          <BlogPost slug={blogSlug} onNavigate={navigate} />
        ) : isBlogIndexRoute ? (
          <BlogIndex onNavigate={navigate} />
        ) : isLeatherRoute ? (
          <LeatherProductsPage onNavigate={navigate} />
        ) : isLegacyRedirectRoute ? (
          <LegacyCatalogueRedirect onNavigate={navigate} />
        ) : (
          <>
            {/* 1. Hero */}
            <Hero onNavigate={navigate} />

            {/* 2. Highlights Strip */}
            <HighlightsStrip />

            {/* 3. Collections */}
            <Collections
              onSelectCollection={handleSelectCollection}
              onNavigate={navigate}
            />

            {/* 4. Featured Designs */}
            <FeaturedDesigns
              selectedFilter={selectedCollectionFilter}
              onFilterChange={setSelectedCollectionFilter}
              onNavigate={navigate}
            />

            {/* 5. About Teaser */}
            <AboutTeaser />

            {/* 6. Why Choose Us */}
            <WhyChooseUs />

            {/* 7. How To Order */}
            <HowToOrder />

            {/* Optional Testimonials Component (rendered only if siteConfig.showTestimonials = true) */}
            <Testimonials />

            {/* 8. Contact & Web3Forms */}
            <ContactSection />
          </>
        )}
      </main>

      {/* 9. Footer */}
      <Footer onNavigate={navigate} />

      {/* 10. Circular Back to Top Button */}
      <BackToTop />

      {/* 11. Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
