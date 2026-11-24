import React from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Layers, Package, MessageSquareText, CheckCircle2 } from 'lucide-react';

export default function ExportValueProposition() {
  const { t } = useTranslation();

  const trustIndicators = [
    {
      icon: Building2,
      title: 'India-based Export Business',
      desc: 'Headquartered in Kolhapur, Maharashtra, connecting regional leather craftsmanship with international buyers.',
    },
    {
      icon: Layers,
      title: 'Diverse Leather Product Range',
      desc: 'Curated selection spanning jackets, briefcases, loafers, handbags, belts, wallets, and fashion accessories.',
    },
    {
      icon: Package,
      title: 'Bulk & Wholesale Enquiries',
      desc: 'Dedicated commercial quotation support, quantity planning, and custom packaging coordination for global trade.',
    },
    {
      icon: MessageSquareText,
      title: 'International Buyer Communication',
      desc: 'Prompt, direct communication via WhatsApp and email to clarify specifications, lead times, and terms.',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative bg-cream overflow-hidden">
      {/* Decorative background watermark */}
      <div className="absolute inset-0 bg-gold-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Text & 4 Trust Indicators (Cols 1-7) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 text-xs font-semibold uppercase tracking-widest mb-4">
              {t('about.eyebrow', { defaultValue: 'ABOUT LOCAL EXIM' })}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight leading-[1.15] mb-6">
              {t('about.heading', { defaultValue: 'Bringing Indian Leather Goods to Global Markets.' })}
            </h2>

            <p className="text-base sm:text-lg text-ink/80 leading-relaxed mb-8 max-w-2xl">
              {t('about.description', {
                defaultValue:
                  'LocalExim connects buyers with a curated range of leather products and accessories from India. We focus on understanding buyer requirements, coordinating product enquiries, and providing a clear path from product selection to order fulfilment.',
              })}
            </p>

            {/* 4 Trust Indicators Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {trustIndicators.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-gold-500/25 shadow-soft hover:border-gold-500/60 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-forest-900/5 text-forest-900 flex items-center justify-center mb-3 border border-gold-500/20">
                      <Icon className="w-5 h-5 text-gold-600" />
                    </div>
                    <h3 className="text-sm font-serif font-bold text-forest-900 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-700 flex-shrink-0" />
                      <span>{item.title}</span>
                    </h3>
                    <p className="text-xs text-ink/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Export Operations Visual (Cols 8-12) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden border border-gold-500/35 shadow-card group bg-white">
              <div className="aspect-[16/10] sm:aspect-square overflow-hidden relative">
                <img
                  src="/hero/export-process.jpg"
                  alt="Local Exim Export Operations & Quality Inspection"
                  width="800"
                  height="800"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-transparent to-transparent pointer-events-none" />

                {/* Verification Badge Overlay */}
                <div className="absolute bottom-3 sm:bottom-4 start-3 sm:start-4 end-3 sm:end-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-forest-900/90 backdrop-blur-md border border-gold-400/30 text-cream">
                  <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gold-300 mb-0.5 sm:mb-1">
                    Export Ready Standards
                  </div>
                  <div className="text-[11px] sm:text-xs text-cream/80">
                    Inspection, protective packaging &amp; international commercial dispatch
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
