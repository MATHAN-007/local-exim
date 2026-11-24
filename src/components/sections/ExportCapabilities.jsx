import React from 'react';
import { useTranslation } from 'react-i18next';
import { SearchCheck, ShieldCheck, Boxes, PackageCheck, ClipboardCheck, Ship } from 'lucide-react';

export default function ExportCapabilities() {
  const { t } = useTranslation();

  const capabilities = [
    {
      num: '01',
      icon: SearchCheck,
      title: 'Product Selection',
      desc: 'Explore available leather products and identify suitable designs, materials, and specification options.',
    },
    {
      num: '02',
      icon: ShieldCheck,
      title: 'Quality Focus',
      desc: 'Communicate product requirements and confirm applicable specifications before commercial confirmation.',
    },
    {
      num: '03',
      icon: Boxes,
      title: 'Bulk & Wholesale Enquiries',
      desc: 'Support commercial inquiries involving product quantities, tiered pricing, and buyer requirements.',
    },
    {
      num: '04',
      icon: PackageCheck,
      title: 'Export Packaging',
      desc: 'Individual dust-covers, protective inner wrapping, and heavy-duty corrugated master export cartons.',
    },
    {
      num: '05',
      icon: ClipboardCheck,
      title: 'Order Coordination',
      desc: 'Maintain clear, consistent communication during product selection, quotation, and order processing.',
    },
    {
      num: '06',
      icon: Ship,
      title: 'Shipping Coordination',
      desc: 'Coordinate available air and ocean freight arrangements according to destination and order terms.',
    },
  ];

  return (
    <section id="capabilities" className="py-20 lg:py-28 relative bg-cream border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 text-xs font-semibold uppercase tracking-widest mb-3">
            {t('capabilities.eyebrow', { defaultValue: 'EXPORT CAPABILITIES' })}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-900 tracking-tight mb-4">
            {t('capabilities.title', { defaultValue: 'Export Support Built Around Your Requirements' })}
          </h2>
          <p className="text-base sm:text-lg text-ink/75 leading-relaxed">
            {t('capabilities.subtitle', {
              defaultValue:
                'We aim to make product sourcing and export enquiries straightforward through clear communication, product coordination, and buyer-oriented support.',
            })}
          </p>
        </div>

        {/* 6 Capabilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-7 sm:p-8 border border-gold-500/25 shadow-soft hover:shadow-xl hover:border-gold-500 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-forest-900/5 group-hover:bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-forest-900 group-hover:text-gold-700 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-gold-600 bg-gold-500/10 px-2.5 py-1 rounded-md border border-gold-500/20">
                      {item.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-forest-900 mb-3 group-hover:text-brandGreen-800 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-ink/70 leading-relaxed">
                    {item.desc}
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
