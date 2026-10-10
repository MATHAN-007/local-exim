import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

export default function AboutTeaser() {
  const { t } = useTranslation();

  const checkPoints = [
    t('about.p1'),
    t('about.p2'),
    t('about.p3'),
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Text & 3 check points (Cols 1-7) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-semibold uppercase tracking-widest mb-4">
              Local Roots
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight leading-[1.15] mb-6">
              {t('about.title')}
            </h2>
            <p className="text-base sm:text-lg text-ink/75 leading-relaxed mb-8 max-w-2xl">
              {t('about.text')}
            </p>

            {/* 3 Check Points */}
            <div className="space-y-4 pt-2">
              {checkPoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center text-forest-900">
                    <Check className="w-3.5 h-3.5 text-forest-900" />
                  </div>
                  <span className="text-base font-semibold text-forest-900">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Soft green panel with gold ring & logo emblem (Cols 8-12) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-br from-brandGreen-800/10 via-forest-900/15 to-brandGreen-700/10 border border-gold-500/30 shadow-card p-8 flex items-center justify-center overflow-hidden">
              
              {/* Outer decorative gold ring */}
              <div
                className="absolute inset-6 rounded-full border border-gold-500/40 border-dashed animate-pulse-glow"
                aria-hidden="true"
              />

              {/* Inner subtle glow */}
              <div
                className="absolute inset-12 rounded-full bg-gold-500/[0.05] blur-xl"
                aria-hidden="true"
              />

              {/* Logo Emblem PNG */}
              <div className="relative z-10 flex items-center justify-center p-4">
                <img
                  src="/logo/logo-emblem.png"
                  alt="Local Exim Emblem"
                  width="280"
                  height="280"
                  loading="lazy"
                  className="w-48 sm:w-56 h-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
