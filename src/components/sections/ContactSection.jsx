import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { siteConfig } from '../../siteConfig';

export default function ContactSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.country.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const apiKey = import.meta.env.VITE_WEB3FORMS_KEY;

    try {
      if (apiKey && apiKey !== 'YOUR_WEB3FORMS_KEY_HERE') {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: apiKey,
            subject: `New B2B Footwear Inquiry from ${formData.name} (${formData.country})`,
            from_name: 'Local Exim Web Form',
            ...formData,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setStatus('success');
          setFormData({ name: '', company: '', country: '', email: '', message: '' });
        } else {
          setStatus('error');
          setErrorMessage(result.message || t('contact.error'));
        }
      } else {
        // Fallback demo simulation if key is not yet configured in .env
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStatus('success');
        setFormData({ name: '', company: '', country: '', email: '', message: '' });
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus('error');
      setErrorMessage(t('contact.error'));
    }
  };

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    t('whatsapp.inquiryPrefix') + ' ' + siteConfig.name
  )}`;

  return (
    <section id="contact" className="py-20 lg:py-28 relative bg-forest-900 text-cream overflow-hidden">
      {/* Background Decorative Gold Watermark */}
      <div className="absolute inset-0 bg-dark-pattern opacity-25 pointer-events-none" />
      <div
        className="absolute bottom-0 start-0 w-96 h-96 rounded-full bg-gold-500/[0.03] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Contact Information (Cols 1-5) */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
              Get in Touch
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream tracking-tight mb-4">
              {t('contact.title')}
            </h2>
            
            <p className="text-base text-cream/75 leading-relaxed mb-8">
              {t('contact.subtitle')}
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-gold-500/20 hover:border-gold-400 hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-green-700/30 border border-green-500/40 flex items-center justify-center text-lime-400 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-cream/50">WhatsApp Direct</span>
                  <span className="text-sm sm:text-base font-semibold text-cream">
                    +{siteConfig.whatsappNumber.slice(0, 2)} {siteConfig.whatsappNumber.slice(2, 7)} {siteConfig.whatsappNumber.slice(7)}
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-gold-500/20 hover:border-gold-400 hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-300 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-cream/50">Phone</span>
                  <span className="text-sm sm:text-base font-semibold text-cream">{siteConfig.phone}</span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-gold-500/20 hover:border-gold-400 hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-300 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-cream/50">Email</span>
                  <span className="text-sm sm:text-base font-semibold text-cream">{siteConfig.email}</span>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-gold-500/20">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-cream/50">Location</span>
                  <span className="text-sm sm:text-base font-semibold text-cream">{siteConfig.address}</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Web3Forms Enquiry Form (Cols 6-12) */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 backdrop-blur-xl border border-gold-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
              
              {status === 'success' ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-lime-500/20 border border-lime-500/40 flex items-center justify-center text-lime-400 mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-cream mb-2">
                    {t('contact.sent')}
                  </h3>
                  <p className="text-sm text-cream/70 max-w-md mb-8">
                    Our export representative will review your requirements and reach out via email/WhatsApp shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-forest-900 bg-gold-400 hover:bg-gold-300 transition-colors"
                  >
                    {t('contact.sendAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-900/40 border border-red-500/50 flex items-center gap-3 text-red-200 text-sm">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{errorMessage || t('contact.error')}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-cream/70 mb-2">
                        {t('contact.name')} <span className="text-gold-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-forest-900/60 border border-gold-500/30 text-cream placeholder-cream/30 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-sm transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Company (Optional) */}
                    <div>
                      <label htmlFor="contact-company" className="block text-xs font-semibold uppercase tracking-wider text-cream/70 mb-2">
                        {t('contact.company')}
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-forest-900/60 border border-gold-500/30 text-cream placeholder-cream/30 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-sm transition-colors"
                        placeholder="Retailer or Trading Co."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Country */}
                    <div>
                      <label htmlFor="contact-country" className="block text-xs font-semibold uppercase tracking-wider text-cream/70 mb-2">
                        {t('contact.country')} <span className="text-gold-400">*</span>
                      </label>
                      <input
                        id="contact-country"
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-forest-900/60 border border-gold-500/30 text-cream placeholder-cream/30 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-sm transition-colors"
                        placeholder="e.g. United Arab Emirates, USA"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-cream/70 mb-2">
                        {t('contact.email')} <span className="text-gold-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-forest-900/60 border border-gold-500/30 text-cream placeholder-cream/30 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-sm transition-colors"
                        placeholder="buyer@example.com"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-cream/70 mb-2">
                      {t('contact.message')} <span className="text-gold-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-forest-900/60 border border-gold-500/30 text-cream placeholder-cream/30 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-sm transition-colors resize-none"
                      placeholder="Please specify footwear styles, estimated pairs or sizes needed..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-forest-900 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 hover:shadow-gold-glow hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 rtl:rotate-180" />
                    <span>{status === 'submitting' ? t('contact.sending') : t('contact.send')}</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
