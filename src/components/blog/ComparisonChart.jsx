import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Info } from 'lucide-react';

export default function ComparisonChart({ chart }) {
  if (!chart || !chart.items) return null;

  const chartRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    if (!chartRef.current || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, []);

  const items = chart.items;
  // Item 0: Traditional Kolhapuri Chappal (₹500–₹2,000)
  // Item 1: Prada SS26 Runway Sandal (₹1,20,000)
  const traditional = items[0] || {};
  const luxury = items[1] || {};

  return (
    <div
      ref={chartRef}
      className="my-10 p-6 sm:p-8 rounded-3xl bg-forest-900 border border-gold-500/35 text-cream shadow-2xl relative overflow-hidden"
      aria-label={chart.title || 'Price Comparison Chart'}
    >
      {/* Background ambient gold gradient glow */}
      <div
        className="absolute top-0 end-0 w-64 h-64 rounded-full bg-gold-500/[0.04] blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gold-500/20">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gold-500/15 text-gold-300">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gold-400">
              Price Disparity Analysis
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-cream">
              {chart.title}
            </h3>
          </div>
        </div>

        {/* Broken scale indicator badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-cream/70 self-start sm:self-auto">
          <Info className="w-3.5 h-3.5 text-gold-400" />
          <span>Broken visual scale for readability (~60×–240× ratio)</span>
        </div>
      </div>

      {/* Chart Bars */}
      <div className="space-y-6">
        {/* Row 1: Traditional Artisan Kolhapuri */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-400" />
              <span className="text-sm sm:text-base font-semibold text-cream">
                {traditional.label}
              </span>
            </div>
            <span className="text-sm sm:text-base font-mono font-bold text-gold-300">
              ₹500 – ₹2,000
            </span>
          </div>

          {/* Bar track */}
          <div className="w-full h-7 sm:h-8 bg-black/40 rounded-xl overflow-hidden p-1 border border-white/5 flex items-center">
            <div
              className="h-full rounded-lg bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 transition-all duration-700 ease-out shadow-sm"
              style={{
                width: isInView ? '20%' : '0%',
              }}
            />
          </div>
          {traditional.note && (
            <p className="text-[11px] text-cream/60 mt-1.5 ps-1">
              {traditional.note}
            </p>
          )}
        </div>

        {/* Row 2: Prada Runway Sandal */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="text-sm sm:text-base font-semibold text-cream">
                {luxury.label}
              </span>
            </div>
            <span className="text-sm sm:text-base font-mono font-bold text-red-300">
              ₹1,20,000 <span className="text-xs font-normal text-cream/60">(~$1,400)</span>
            </span>
          </div>

          {/* Bar track */}
          <div className="w-full h-7 sm:h-8 bg-black/40 rounded-xl overflow-hidden p-1 border border-white/5 flex items-center">
            <div
              className="h-full rounded-lg bg-gradient-to-r from-brandGreen-700 via-amber-600 to-red-500 transition-all duration-700 ease-out shadow-sm"
              style={{
                width: isInView ? '100%' : '0%',
              }}
            />
          </div>
          {luxury.note && (
            <p className="text-[11px] text-cream/60 mt-1.5 ps-1">
              {luxury.note}
            </p>
          )}
        </div>
      </div>

      {/* Source Note Caption */}
      {chart.sourceNote && (
        <div className="mt-6 pt-4 border-t border-white/10 text-center sm:text-start">
          <p className="text-xs text-cream/50 italic">
            Source: {chart.sourceNote}
          </p>
        </div>
      )}
    </div>
  );
}
