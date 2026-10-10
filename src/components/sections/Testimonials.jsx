import React from 'react';
import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';
import { siteConfig } from '../../siteConfig';

export default function Testimonials() {
  const { t } = useTranslation();

  // If feature toggle is off, do not render
  if (!siteConfig.showTestimonials) {
    return null;
  }

  const sampleReviews = [
    {
      author: 'Verified International Buyer',
      location: 'Dubai, UAE',
      text: 'Exceptional craftsmanship and leather quality. The pairs arrived perfectly packaged for our boutique.',
    },
    {
      author: 'Footwear Distributor',
      location: 'London, UK',
      text: 'Authentic Indian Kolhapuri chappals delivered with great professionalism and transparent communication.',
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 relative bg-cream border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">
            Client Voices
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight">
            {t('testimonials.title')}
          </h2>
          <p className="text-base text-ink/70 mt-2">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {sampleReviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-gold-500/25 shadow-soft relative"
            >
              <Quote className="w-8 h-8 text-gold-400 mb-4 opacity-50" />
              <p className="text-base text-ink/80 italic mb-6 leading-relaxed">
                "{rev.text}"
              </p>
              <div className="border-t border-gold-500/15 pt-4">
                <span className="block font-semibold text-forest-900 text-sm">{rev.author}</span>
                <span className="block text-xs text-ink/50">{rev.location}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
