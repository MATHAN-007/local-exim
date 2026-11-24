import React from 'react';
import { useTranslation } from 'react-i18next';
import { Send, FileText, CheckCircle2, PackageCheck, Truck } from 'lucide-react';

export default function HowToOrder() {
  const { t } = useTranslation();

  const steps = [
    {
      num: '01',
      icon: Send,
      title: 'Share Your Requirement',
      desc: 'Send product interests, required quantities, and destination market via WhatsApp or enquiry form.',
    },
    {
      num: '02',
      icon: FileText,
      title: 'Product & Quotation Discussion',
      desc: 'Review available designs, specifications, commercial export terms, and shipping alternatives.',
    },
    {
      num: '03',
      icon: CheckCircle2,
      title: 'Confirm Your Order',
      desc: 'Finalise product selection, order volume, packaging details, and formal commercial agreement.',
    },
    {
      num: '04',
      icon: PackageCheck,
      title: 'Packaging & Dispatch',
      desc: 'Coordinate careful inspection, protective export packing, and timely handover for dispatch.',
    },
    {
      num: '05',
      icon: Truck,
      title: 'Shipment Communication',
      desc: 'Receive milestone updates, documentation copies, and transit tracking through direct channels.',
    },
  ];

  return (
    <section id="how-to-order" className="py-20 lg:py-28 relative bg-[#F7F4EC] border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 text-xs font-semibold uppercase tracking-widest mb-3">
            {t('how.eyebrow', { defaultValue: 'SIMPLE 5-STEP EXPORT PROCESS' })}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight mb-4">
            {t('how.title', { defaultValue: 'A Simple Path from Enquiry to Shipment' })}
          </h2>
          <p className="text-base sm:text-lg text-ink/75 leading-relaxed">
            {t('how.subtitle', {
              defaultValue: 'We keep the enquiry and order process clear, structured, and buyer-focused.',
            })}
          </p>
        </div>

        {/* 5-step Timeline (Horizontal Desktop, Vertical Mobile) */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div
            className="hidden lg:block absolute top-7 start-12 end-12 h-[2px] bg-gradient-to-r from-gold-500/20 via-gold-500/70 to-gold-500/20 pointer-events-none z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                  
                  {/* Step Circle & Number Badge */}
                  <div className="w-14 h-14 rounded-full bg-cream border-2 border-gold-500 shadow-md flex items-center justify-center text-forest-900 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300 mb-6 relative">
                    <Icon className="w-6 h-6" />
                    <span className="absolute -top-2 -end-2 w-6 h-6 rounded-full bg-forest-900 text-gold-300 text-[11px] font-bold flex items-center justify-center border border-gold-400">
                      {step.num}
                    </span>
                  </div>

                  {/* Step Content Card */}
                  <div className="w-full h-full bg-white rounded-2xl p-6 border border-gold-500/20 shadow-soft group-hover:border-gold-500/60 group-hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-forest-900 mb-2 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-ink/70 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Vertical connector line for mobile */}
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden w-[2px] h-6 bg-gold-500/40 my-2" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
