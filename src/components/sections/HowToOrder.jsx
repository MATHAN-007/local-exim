import React from 'react';
import { useTranslation } from 'react-i18next';
import { Send, FileText, CheckCircle2, PlaneTakeoff } from 'lucide-react';

export default function HowToOrder() {
  const { t } = useTranslation();

  const steps = [
    {
      num: '01',
      icon: Send,
      title: t('how.s1t'),
      desc: t('how.s1d'),
    },
    {
      num: '02',
      icon: FileText,
      title: t('how.s2t'),
      desc: t('how.s2d'),
    },
    {
      num: '03',
      icon: CheckCircle2,
      title: t('how.s3t'),
      desc: t('how.s3d'),
    },
    {
      num: '04',
      icon: PlaneTakeoff,
      title: t('how.s4t'),
      desc: t('how.s4d'),
    },
  ];

  return (
    <section id="how-to-order" className="py-20 lg:py-28 relative bg-cream border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight">
            {t('how.title')}
          </h2>
        </div>

        {/* 4-step Timeline (Horizontal Desktop, Vertical Mobile) */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div
            className="hidden lg:block absolute top-7 start-16 end-16 h-[2px] bg-gradient-to-r from-gold-500/30 via-gold-500 to-gold-500/30 pointer-events-none z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                  
                  {/* Step Circle & Number */}
                  <div className="w-14 h-14 rounded-full bg-cream border-2 border-gold-500 shadow-md flex items-center justify-center text-forest-900 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300 mb-6 relative">
                    <Icon className="w-6 h-6" />
                    <span className="absolute -top-2 -end-2 w-6 h-6 rounded-full bg-forest-900 text-gold-300 text-[11px] font-bold flex items-center justify-center border border-gold-400">
                      {step.num}
                    </span>
                  </div>

                  {/* Step Card */}
                  <div className="w-full bg-white rounded-2xl p-6 border border-gold-500/20 shadow-soft group-hover:border-gold-500/60 transition-all duration-300">
                    <h3 className="text-lg font-serif font-bold text-forest-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-ink/70 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Vertical connector arrow for mobile */}
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
