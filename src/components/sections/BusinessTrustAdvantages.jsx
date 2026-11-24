import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckSquare, PackageCheck, FileText, Headphones } from 'lucide-react';

export default function BusinessTrustAdvantages() {
  const { t } = useTranslation();

  const pillars = [
    {
      icon: CheckSquare,
      title: 'Strict Quality Inspection',
      desc: 'Every item is evaluated for material consistency, clean seam stitching, and robust hardware finishing prior to final packaging.',
    },
    {
      icon: PackageCheck,
      title: 'Custom Packaging Solutions',
      desc: 'Protective inner tissue, individual poly dust-covers, customized SKU barcoding on request, and heavy export-grade outer cartons.',
    },
    {
      icon: FileText,
      title: 'Documentation Assistance',
      desc: 'Transparent coordination of commercial invoices, detailed packing lists, and export documentation for hassle-free customs clearance.',
    },
    {
      icon: Headphones,
      title: 'Direct Channel Support',
      desc: 'Ongoing, responsive interaction with our dedicated export management team via WhatsApp and email throughout your order lifecycle.',
    },
  ];

  return (
    <section id="trust-advantages" className="py-20 lg:py-28 relative bg-cream border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 text-xs font-semibold uppercase tracking-widest mb-3">
            {t('trust.eyebrow', { defaultValue: 'BUYER CONFIDENCE' })}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight mb-4">
            {t('trust.title', { defaultValue: 'Committed to Reliability, Transparency & Quality' })}
          </h2>
          <p className="text-base sm:text-lg text-ink/75 leading-relaxed">
            {t('trust.subtitle', {
              defaultValue:
                'We operate with a commitment to integrity, clear buyer agreements, and dependable export assistance for every international transaction.',
            })}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-7 border border-gold-500/25 shadow-soft hover:shadow-xl hover:border-gold-500/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-forest-900/5 group-hover:bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-forest-900 group-hover:text-gold-700 transition-colors mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-serif font-bold text-forest-900 mb-2.5 group-hover:text-brandGreen-800 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-ink/70 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
