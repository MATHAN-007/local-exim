import { siteConfig } from '../siteConfig';

/**
 * Returns a standardized wa.me link.
 * Normalizes number to digits-only. If exactly 10 digits, prefixes '91'.
 * @param {string} [message] - Message to encode in text query param
 * @returns {string} wa.me URL
 */
export function waLink(message = siteConfig.waMessages?.general || '') {
  let num = String(siteConfig.whatsappNumber || '').replace(/\D/g, '');
  if (num.length === 10) {
    num = '91' + num;
  }
  const textParam = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${num}${textParam}`;
}

/**
 * Generates a pre-filled product enquiry message using siteConfig.waMessages.product template.
 * Replaces {name} and {code}.
 * @param {{ name?: string, title?: string, code?: string, id?: string }} product
 * @returns {string} Filled message
 */
export function productMessage(product = {}) {
  const name = product.name || product.title || 'Product';
  const code = product.code || product.id || 'N/A';
  const template =
    siteConfig.waMessages?.product ||
    'Hello Local Exim, I am interested in {name} (Code: {code}). Please share details.';
  return template.replace('{name}', name).replace('{code}', code);
}
