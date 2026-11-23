import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Sparkles } from 'lucide-react';
import { waLink, productMessage } from '../../lib/whatsapp';

export default function ProductCard({
  product,
  showPrices = false,
  showPrice = true,
  showPriceNote = false,
  isEager = false,
  enquireKey = 'catalogue.enquire',
  photoComingSoonKey = 'catalogue.photoComingSoon',
  badgeText,
}) {
  const { t } = useTranslation();

  // Use single-source-of-truth waLink with prefilled product details
  const messageText = productMessage(product);
  const whatsappUrl = waLink(messageText);

  const isNeedsPhoto = product.photoQuality === 'needs-photo';

  return (
    <div className="group bg-white rounded-2xl border border-gold-500/25 shadow-soft hover:shadow-xl hover:border-gold-500/70 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Product Image Frame */}
      <div className="relative aspect-square bg-[#FFFFFF] p-6 flex items-center justify-center overflow-hidden border-b border-gold-500/10">
        {isNeedsPhoto ? (
          /* Neutral 'Photo coming soon' placeholder tile */
          <div className="w-full h-full flex flex-col items-center justify-center bg-cream/70 border border-gold-500/20 rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-700 mb-2">
              <Sparkles className="w-5 h-5 text-gold-600" />
            </div>
            <span className="text-xs font-medium text-ink/60">
              {t(photoComingSoonKey, { defaultValue: t('catalogue.photoComingSoon') })}
            </span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            width="480"
            height="480"
            loading={isEager ? 'eager' : 'lazy'}
            fetchpriority={isEager ? 'high' : 'auto'}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Hover overlay pill */}
        <div className="absolute top-3 end-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-forest-900/90 text-gold-300 rounded-full backdrop-blur-sm">
            {badgeText || t('hero.chip1')}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Product Code Badge */}
          {product.code && (
            <span className="inline-block text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider text-gold-700 bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 rounded-md mb-2">
              {product.code}
            </span>
          )}

          <h3 className="text-base sm:text-lg font-serif font-bold text-forest-900 mb-2 group-hover:text-brandGreen-800 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Pricing area (hidden when showPrice is false, e.g. Home page) */}
          {showPrice && (
            <div className="mb-4">
              {showPriceNote ? (
                <div>
                  <span className="text-sm sm:text-base font-semibold text-brandGreen-800">
                    ₹{product.priceInr ? product.priceInr.toLocaleString('en-IN') : '—'}
                  </span>
                  <p className="text-[11px] text-ink/50 mt-0.5 leading-tight">
                    {t('catalogue.priceNote')}
                  </p>
                </div>
              ) : showPrices && product.priceInr ? (
                <span className="text-sm font-semibold text-brandGreen-800">
                  ₹{product.priceInr.toLocaleString('en-IN')}
                </span>
              ) : (
                <span className="text-xs sm:text-sm font-medium text-ink/60 italic">
                  {t('featured.priceOnRequest')}
                </span>
              )}
            </div>
          )}
        </div>

        {/* WhatsApp Inquiry Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-forest-900 bg-cream-200 hover:bg-gold-500 hover:text-white border border-gold-500/30 transition-all duration-200 shadow-sm active:scale-[0.98]"
        >
          <MessageCircle className="w-4 h-4 text-brandGreen-800 group-hover:text-white transition-colors flex-shrink-0" />
          <span>{t(enquireKey, { defaultValue: t('catalogue.enquire', { defaultValue: t('featured.enquire') }) })}</span>
        </a>
      </div>
    </div>
  );
}
