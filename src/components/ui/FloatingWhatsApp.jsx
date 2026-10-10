import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../../siteConfig';

export default function FloatingWhatsApp() {
  const { t } = useTranslation();

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    t('whatsapp.inquiryPrefix') + ' ' + siteConfig.name
  )}`;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 end-6 z-40 flex items-center group pointer-events-auto"
    >
      {/* Tooltip on Hover */}
      <div className="hidden sm:block absolute end-full me-3 px-3 py-1.5 rounded-xl bg-forest-900/90 text-cream text-xs font-medium whitespace-nowrap backdrop-blur-md border border-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg pointer-events-none">
        {t('hero.cta2')}
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('whatsapp.floatingAria')}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-500/50"
      >
        {/* Soft pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <MessageCircle className="w-7 h-7 fill-current relative z-10" />
      </a>
    </aside>
  );
}
