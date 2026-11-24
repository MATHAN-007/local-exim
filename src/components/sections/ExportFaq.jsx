import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../siteConfig';
import { waLink } from '../../lib/whatsapp';

export default function ExportFaq() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What leather products are available for export?',
      a: 'LocalExim offers a curated catalogue of Indian leather goods including jackets, messenger briefcases, laptop bags, buckle loafers, handcrafted chappals, handbags, wallets, and fashion headwear. You can review the full range in our digital catalogue.',
    },
    {
      q: 'Can international buyers enquire about bulk quantities?',
      a: 'Yes. We welcome bulk, wholesale, and multi-category commercial inquiries from overseas retailers, boutique curators, and trade distributors. Please share your required quantities and design references for volume terms.',
    },
    {
      q: 'How can I request an export quotation?',
      a: 'You can request an export quotation by submitting your product requirements, approximate quantities, and destination through our website enquiry form, or by contacting our export team directly via WhatsApp for swift assistance.',
    },
    {
      q: 'Can I enquire about specific product designs and specifications?',
      a: 'Yes. If you have specific preferences regarding materials, dimensions, hardware finishes, or custom SKU assortments, our team can review feasibility and discuss suitable options during initial consultations.',
    },
    {
      q: 'How are packaging requirements discussed?',
      a: 'We coordinate export packaging based on your market requirements, offering protective inner tissue wrapping, individual dust bags, and sturdy corrugated outer cartons suitable for long-distance international transit.',
    },
    {
      q: 'What information is needed to calculate shipping costs?',
      a: 'Shipping costs depend on the total shipment volume (CBM), gross weight, preferred transit mode (air cargo or ocean freight), and the destination port or airport. Share your destination details with our team to evaluate available options.',
    },
    {
      q: 'How do I confirm an export order?',
      a: 'Once product selection, specifications, pricing, packaging, and commercial arrangements are agreed upon, we issue a formal proforma invoice. Your order proceeds to production coordination and scheduling upon confirmation.',
    },
    {
      q: 'What shipping and export documentation is available?',
      a: 'We provide standard international trade documentation including commercial invoices, packing lists, air waybills or bills of lading, and certificates of origin coordinated in compliance with Indian export regulations.',
    },
  ];

  const whatsappFaqUrl = waLink(siteConfig.waMessages?.general || 'Hello Local Exim, I have a question regarding your export process.');

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 relative bg-[#F7F4EC] border-t border-gold-500/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 text-xs font-semibold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-gold-600" />
            <span>{t('faq.eyebrow', { defaultValue: 'QUESTIONS & ANSWERS' })}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight mb-4">
            {t('faq.title', { defaultValue: 'Frequently Asked Questions About Exporting with LocalExim' })}
          </h2>
          <p className="text-base text-ink/75 leading-relaxed">
            {t('faq.subtitle', {
              defaultValue:
                'Find answers to common questions about our export ordering process, bulk inquiries, and product coordination.',
            })}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                  isOpen
                    ? 'border-gold-500/60 shadow-md'
                    : 'border-gold-500/20 hover:border-gold-500/40 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-5 px-6 sm:px-8 text-start flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-serif font-bold text-forest-900 leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-gold-500 text-white rotate-180'
                        : 'bg-forest-900/5 text-forest-900 hover:bg-gold-500/15'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-ink/80 leading-relaxed border-t border-gold-500/10">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Note */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-gold-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-soft">
          <div className="text-start">
            <h4 className="text-base font-serif font-bold text-forest-900">
              Have a specific question not covered here?
            </h4>
            <p className="text-xs sm:text-sm text-ink/70">
              Our export desk is ready to assist with individual market requirements and shipping inquiries.
            </p>
          </div>
          <a
            href={whatsappFaqUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm text-forest-900 bg-gold-500/20 hover:bg-gold-500 hover:text-white border border-gold-500/40 transition-all flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask Us on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
