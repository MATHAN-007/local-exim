import React from 'react';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { siteConfig } from '../../siteConfig';

export default function DownloadCatalogueButton({
  variant = 'primary',
  className = '',
  showSize = true,
  file,
  sizeLabel,
  labelKey = 'catalogue.download',
}) {
  const { t } = useTranslation();
  const activeFile = file || siteConfig.catalogueDownload?.file || '/downloads/Local-Exim-Catalogue.pdf';
  const activeSizeLabel = sizeLabel || siteConfig.catalogueDownload?.sizeLabel || 'PDF · 1.8 MB';
  const downloadName = activeFile.split('/').pop() || 'Local-Exim-Catalogue.pdf';
  const labelText = t(labelKey, { defaultValue: t('catalogue.download') });

  if (variant === 'link') {
    return (
      <a
        href={activeFile}
        download={downloadName}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 transition-colors font-medium ${className}`}
        aria-label={`${labelText} (${activeSizeLabel})`}
      >
        <Download className="w-3.5 h-3.5 flex-shrink-0" />
        <span>{labelText}</span>
        {showSize && <span className="text-[10px] text-cream/40">({activeSizeLabel})</span>}
      </a>
    );
  }

  if (variant === 'ghost' || variant === 'secondary') {
    return (
      <a
        href={activeFile}
        download={downloadName}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-gold-500/40 bg-white/70 hover:bg-gold-500/10 text-forest-900 font-semibold text-xs sm:text-sm hover:border-gold-500 transition-all duration-200 shadow-xs hover:shadow-sm ${className}`}
        aria-label={`${labelText} (${activeSizeLabel})`}
      >
        <Download className="w-4 h-4 text-gold-600 flex-shrink-0" />
        <span>{labelText}</span>
        {showSize && (
          <span className="text-[10px] text-ink/50 bg-black/5 px-1.5 py-0.5 rounded font-normal">
            {activeSizeLabel}
          </span>
        )}
      </a>
    );
  }

  // Primary variant
  return (
    <a
      href={activeFile}
      download={downloadName}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-forest-900 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 border border-gold-400/60 shadow-sm hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ${className}`}
      aria-label={`${labelText} (${activeSizeLabel})`}
    >
      <Download className="w-4 h-4 text-forest-900 flex-shrink-0" />
      <span>{labelText}</span>
      {showSize && (
        <span className="text-[10px] text-forest-900/70 bg-black/10 px-1.5 py-0.5 rounded font-medium">
          {activeSizeLabel}
        </span>
      )}
    </a>
  );
}
