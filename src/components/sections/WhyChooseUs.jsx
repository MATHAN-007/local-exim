import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Layers, PackageCheck, MessageSquareQuote } from 'lucide-react';

export default function WhyChooseUs() {
  const { t } = useTranslation();

  const cards = [
    {
      icon: Award,
      title: t('why.i1t'),
      desc: t('why.i1d'),
    },
    {
      icon: Layers,
      title: t('why.i2t'),
      desc: t('why.i2d'),
    },
    {
      icon: PackageCheck,
      title: t('why.i3t'),
      desc: t('why.i3d'),
    },
    {
      icon: MessageSquareQuote,
      title: t('why.i4t'),
      desc: t('why.i4d'),
    },
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 relative bg-[#F7F4EC] border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">
            Exporter Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight">
            {t('why.title')}
          </h2>
        </div>

        {/* 4 Icon Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-7 border border-gold-500/25 shadow-soft hover:shadow-xl hover:border-gold-500 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-start"
              >
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-xl bg-forest-900/5 group-hover:bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-brandGreen-800 group-hover:text-gold-600 transition-colors mb-5">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-serif font-bold text-forest-900 mb-2">
                  {card.title}
                </h3>
                
                <p className="text-sm text-ink/70 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
