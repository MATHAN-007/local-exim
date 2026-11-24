import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Layers, Users, Package, MessageCircle, MapPin, CheckCircle } from 'lucide-react';

export default function WhyChooseUs() {
  const { t } = useTranslation();

  const advantages = [
    {
      icon: BookOpen,
      title: 'Carefully Presented Product Catalogue',
      desc: 'High-resolution photography, clear SKU codes, and accurate specifications for reliable buyer evaluation.',
    },
    {
      icon: Layers,
      title: 'Multiple Leather Product Categories',
      desc: 'Comprehensive selection covering footwear, outerwear, travel luggage, wallets, and accessories under one export partner.',
    },
    {
      icon: Users,
      title: 'Buyer-Oriented Enquiry Support',
      desc: 'Attentive assistance tailored to international retail buyers, boutique owners, and commercial distributors.',
    },
    {
      icon: Package,
      title: 'Bulk & Wholesale Discussions',
      desc: 'Direct consultation on commercial quantities, custom export packaging, and flexible order volume requirements.',
    },
    {
      icon: MessageCircle,
      title: 'Responsive Communication',
      desc: 'Prompt replies through WhatsApp and email, ensuring smooth collaboration across global time zones.',
    },
    {
      icon: MapPin,
      title: 'India-Based Business Connection',
      desc: 'Direct link to authentic Indian leather craftsmanship and regional artisan manufacturing hubs.',
    },
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 relative bg-forest-900 text-cream overflow-hidden">
      {/* Full-width Reference Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <picture>
          <source srcSet="/hero/why-choose-us-bg.webp" type="image/webp" />
          <img
            src="/hero/why-choose-us-bg.jpg"
            alt="Local Exim Global Export Trade Background"
            width="1920"
            height="906"
            className="w-full h-full object-cover object-[70%_top] sm:object-center transition-all duration-700"
            loading="lazy"
          />
        </picture>

        {/* Subtle dark-green overlays and gradients for brand consistency & text contrast */}
        {/* Soft top & bottom blend into adjacent sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/90 via-transparent to-forest-900/90" />

        {/* Radial center shade on desktop: protects text readability without darkening the left craft or right cargo port */}
        <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(18,38,28,0.72)_0%,rgba(18,38,28,0.25)_65%,transparent_100%)]" />

        {/* Mobile-optimized dark-green wash: keeps card text legible while preserving background export visuals */}
        <div className="md:hidden absolute inset-0 bg-forest-900/45" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-3">
            {t('why.eyebrow', { defaultValue: 'EXPORTER ADVANTAGE' })}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream tracking-tight mb-4">
            {t('why.title', { defaultValue: 'Why International Buyers Choose LocalExim' })}
          </h2>
          <p className="text-base sm:text-lg text-cream/75 leading-relaxed">
            {t('why.subtitle', {
              defaultValue:
                'Building business relationships through product variety, transparent communication, and a buyer-focused approach.',
            })}
          </p>
        </div>

        {/* 6 Advantages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {advantages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group bg-forest-900/80 hover:bg-forest-900/95 rounded-2xl p-7 sm:p-8 border border-gold-500/30 hover:border-gold-400/60 shadow-xl hover:shadow-2xl hover:shadow-gold-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between backdrop-blur-md"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gold-500/15 border border-gold-400/30 flex items-center justify-center text-gold-300 group-hover:bg-gold-500 group-hover:text-forest-900 transition-colors mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif font-bold text-cream mb-3 group-hover:text-gold-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-cream/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-gold-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Business Advantage</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
