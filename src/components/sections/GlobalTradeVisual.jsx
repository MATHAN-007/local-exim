import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Anchor, Plane, ShieldCheck, ArrowRight } from 'lucide-react';
import { scrollToElement } from '../../hooks/useLenis';

export default function GlobalTradeVisual({ onNavigate }) {
  const { t } = useTranslation();

  const handleEnquireClick = (e) => {
    e.preventDefault();
    scrollToElement('#contact');
  };

  return (
    <section id="global-trade" className="py-20 lg:py-28 relative bg-[#FAF8F3] border-t border-gold-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 text-xs font-semibold uppercase tracking-widest mb-3">
            {t('trade.eyebrow', { defaultValue: 'GLOBAL TRADE PERSPECTIVE' })}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight mb-4">
            {t('trade.title', { defaultValue: 'Rooted in India. Connected to Global Opportunities.' })}
          </h2>
          <p className="text-base sm:text-lg text-ink/75 leading-relaxed">
            {t('trade.subtitle', {
              defaultValue:
                'Explore our leather product range and connect with LocalExim for export enquiries and international sourcing discussions.',
            })}
          </p>
        </div>

        {/* Panoramic Banner Card */}
        <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-card bg-forest-900 mb-12">
          {/* Visual Frame */}
          <div className="relative h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] w-full overflow-hidden">
            <img
              src="/hero/global-trade-shipping.jpg"
              alt="International Shipping & Global Logistics Connectivity"
              width="1920"
              height="820"
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-transparent to-black/20" />
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-forest-900/80 via-transparent to-forest-900/40" />
          </div>

          {/* Trade Information Panel: stacked cleanly on mobile, overlaid floating on desktop */}
          <div className="p-5 sm:p-6 md:p-0 bg-forest-900 md:bg-transparent md:absolute md:bottom-6 md:inset-x-6 lg:bottom-8 lg:inset-x-8 z-10">
            <div className="p-5 sm:p-8 rounded-2xl bg-forest-900/95 md:bg-forest-900/85 md:backdrop-blur-md border border-gold-400/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">
                  <Globe className="w-4 h-4 text-gold-400" />
                  <span>Indian Sourcing &amp; International Forwarding</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-cream mb-1">
                  Direct Gateway for Worldwide Leather Sourcing
                </h3>
                <p className="text-xs sm:text-sm text-cream/70 max-w-xl">
                  Located strategically in Maharashtra with access to premier ocean and air cargo logistics terminals for reliable commercial transit.
                </p>
              </div>

              <div className="flex-shrink-0">
                <a
                  href="#contact"
                  onClick={handleEnquireClick}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-forest-900 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 hover:shadow-gold-glow transition-all"
                >
                  <span>Connect for Export Enquiry</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Logistic & Sourcing Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gold-500/25 shadow-soft flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-forest-900/5 flex items-center justify-center text-forest-900 flex-shrink-0 border border-gold-500/20">
              <ShieldCheck className="w-6 h-6 text-gold-600" />
            </div>
            <div>
              <h4 className="text-base font-serif font-bold text-forest-900 mb-1">
                Regional Artisan Hub
              </h4>
              <p className="text-xs text-ink/70 leading-relaxed">
                Headquartered in Kolhapur, Maharashtra, with deep roots in regional leathercraft traditions and direct artisan workshops.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gold-500/25 shadow-soft flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-forest-900/5 flex items-center justify-center text-forest-900 flex-shrink-0 border border-gold-500/20">
              <Anchor className="w-6 h-6 text-gold-600" />
            </div>
            <div>
              <h4 className="text-base font-serif font-bold text-forest-900 mb-1">
                Ocean Freight Gateways
              </h4>
              <p className="text-xs text-ink/70 leading-relaxed">
                Direct highway and rail transit connectivity to JNPT (Nhava Sheva Port) for containerized FCL and LCL ocean shipments.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gold-500/25 shadow-soft flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-forest-900/5 flex items-center justify-center text-forest-900 flex-shrink-0 border border-gold-500/20">
              <Plane className="w-6 h-6 text-gold-600" />
            </div>
            <div>
              <h4 className="text-base font-serif font-bold text-forest-900 mb-1">
                Air Cargo Accessibility
              </h4>
              <p className="text-xs text-ink/70 leading-relaxed">
                Fast coordination with Mumbai and Pune International Air Cargo complexes for high-value and expedited sample deliveries.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
