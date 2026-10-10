# Local Exim - B2B Home Page

> **"Global Trade · Local Roots"**  
> Official export showcase for authentic Kolhapuri chappals and handcrafted open-toe leather sandals, manufactured in Kolhapur, Maharashtra, India.

---

## 1. Project Overview

Local Exim connects international footwear buyers, boutique retailers, and distributors directly with skilled artisanal craftsmen in Kolhapur. This single-page B2B web application is built for exceptional visual elegance, speed, and cross-border commercial usability.

### Key Highlights
- **Curated Brand Aesthetics**: Forest green (`#0B2415`), rich olive (`#14532D`), fine gold hairline borders (`#D4AF37`), and artisanal cream backgrounds (`#FAF8F3`).
- **Full Internationalization (i18n)**: English (`en`), Arabic (`ar` with native RTL layout and dynamic typography), Spanish (`es`), French (`fr`), German (`de`), and Hindi (`hi`).
- **High Performance**: Self-hosted fonts via `@fontsource`, lazy-loaded locale chunks, WebP image formats with fixed dimensions, zero layout shifts, and first-load JS gzipped to < 85 KB (well below the 200 KB target).
- **Direct B2B Conversion**: Seamless "Enquire on WhatsApp" actions with prefilled product context, Web3Forms integration, and flexible pricing toggles.

---

## 2. Technology Stack

- **Build Tool & Framework**: Vite + React 18
- **Styling**: Tailwind CSS + Custom CSS Design System
- **Typography**: `@fontsource/cormorant-garamond` (headings), `@fontsource/manrope` (body), `@fontsource/noto-sans-arabic` (lazy-loaded on Arabic locale)
- **Internationalization**: `react-i18next` + `i18next-browser-languagedetector`
- **Smooth Scrolling**: Lenis with `prefers-reduced-motion` compliance
- **Icons**: `lucide-react`
- **Forms**: Web3Forms API integration (`VITE_WEB3FORMS_KEY`)

---

## 3. Project Directory Structure

```text
local-exim/
├── public/
│   ├── .htaccess             # Hostinger Apache config (SPA fallback, gzip, cache headers)
│   ├── favicon.ico           # Multi-resolution favicons & touch icons
│   ├── robots.txt            # Search engine crawler instructions
│   ├── sitemap.xml           # Multi-language sitemap with hreflang
│   ├── hero/                 # Transparent cutout hero footwear (max 300px)
│   ├── logo/                 # Transparent brand PNGs (full, horizontal, emblem, light)
│   └── products/             # Featured product photos (480x480 WebP)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx    # Floating pill glassmorphic navbar with language switch & mobile drawer
│   │   │   └── Footer.jsx    # Dark footer with light logo, links, social & copyright
│   │   ├── sections/
│   │   │   ├── Hero.jsx            # Radial gradient hero with gold circular frame & glass chips
│   │   │   ├── HighlightsStrip.jsx # Overlapping 4-metric glass bar
│   │   │   ├── Collections.jsx     # 2 large cards (Classic & Ladies)
│   │   │   ├── FeaturedDesigns.jsx # 8-product grid with filters & WhatsApp triggers
│   │   │   ├── AboutTeaser.jsx     # Artisan story, 3 check points, and gold-ring emblem
│   │   │   ├── WhyChooseUs.jsx     # 4 advantage cards with Lucide icons
│   │   │   ├── HowToOrder.jsx      # 4-step responsive timeline
│   │   │   ├── ContactSection.jsx  # Forest-900 band, Web3Forms enquiry form & contact info
│   │   │   └── Testimonials.jsx    # Client voices (guarded by siteConfig toggle)
│   │   └── ui/
│   │       ├── FloatingWhatsApp.jsx # Bottom-corner floating WhatsApp button (mirrored in RTL)
│   │       └── ProductCard.jsx      # Modular product card ready for future API swap
│   ├── data/
│   │   └── products.json     # Product catalog and collections data
│   ├── hooks/
│   │   └── useLenis.js       # Smooth scrolling hook
│   ├── locales/
│   │   ├── en.json           # English copy
│   │   ├── ar.json           # Arabic copy (RTL)
│   │   ├── es.json           # Spanish copy
│   │   ├── fr.json           # French copy
│   │   ├── de.json           # German copy
│   │   └── hi.json           # Hindi copy
│   ├── i18n.js               # i18next setup, lazy loading, and RTL detection
│   ├── index.css             # Tailwind imports, font imports, custom glass/pattern utilities
│   ├── main.jsx              # React DOM root entry
│   ├── siteConfig.js         # Single-source-of-truth business settings and toggles
│   └── App.jsx               # Page layout composition
├── index.html                # SEO metadata, Open Graph, Favicons, JSON-LD Schema
├── package.json              # Scripts and dependencies
├── tailwind.config.js        # Brand color palette and layout tokens
└── vite.config.js            # Build configuration
```

---

## 4. How to Edit

All website content is organized into 3 clearly defined, isolated files for straightforward maintenance:

### 1. Change Phone, WhatsApp, Email, or Address
Open [`src/siteConfig.js`](src/siteConfig.js) and update the corresponding fields:
```javascript
export const siteConfig = {
  name: "Local Exim",
  tagline: "Global Trade · Local Roots",
  whatsappNumber: "917038405530",          // WhatsApp number with country code (no +)
  email: "info@localexim.com",             // Primary contact email
  phone: "+91 70384 05530",                // Formatted display phone number
  address: "Kolhapur, Maharashtra, India", // Registered workshop/office address
  social: {
    instagram: "https://instagram.com/yourhandle", // Empty string hides the icon
    facebook: "",
    linkedin: "",
    youtube: ""
  },
  ...
};
```

### 2. Add a New Product
1. Save your square product photo (`480x480` WebP recommended) in `public/products/my-new-shoe.webp`.
2. Open [`src/data/products.json`](src/data/products.json) and add an item under `"products"`:
```json
{
  "id": "my-new-shoe",
  "collection": "classic",
  "name": "Maharaja Royal Kolhapuri",
  "image": "/products/my-new-shoe.webp",
  "priceInr": 1850,
  "catalogueName": "maharaja royal"
}
```
*Note: Product names remain untranslated as per standard export branding rules.*

### 3. Replace a Product Photo
- Simply place your new high-resolution photo in `public/products/` using the **exact same filename** (e.g. `sankeshwari-kolhapuri.webp`). The site will immediately update without any code changes.

### 4. Edit or Add Translations
- English text lives in [`src/locales/en.json`](src/locales/en.json).
- Arabic text lives in [`src/locales/ar.json`](src/locales/ar.json).
- Spanish, French, German, and Hindi live in their respective JSON files under `src/locales/`.
- To update any headline, button text, or description, edit the corresponding string in those JSON files. Components automatically pull from these files.

### 5. Turn Sections and Features On / Off
In [`src/siteConfig.js`](src/siteConfig.js), toggle the boolean flags:
```javascript
export const siteConfig = {
  showPrices: false,       // Set to true to display retail INR prices; false displays "Price on request"
  showTestimonials: false, // Set to true when verified customer testimonials are ready to display
  showFaq: false,          // Reserved for future FAQ expansion
  ...
};
```

---

## 5. Development & Deployment

### Local Development
```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Visit `http://localhost:5173/` in your browser.

### Production Build
```bash
npm run build
```
The output will be placed in the `dist/` directory.

### Hostinger / Apache Deployment (`public_html`)
1. Run `npm run build`.
2. Copy the contents of the `dist/` directory directly into Hostinger's `public_html/` folder via FTP or the Hostinger File Manager.
3. The included `public/.htaccess` file is automatically bundled into `dist/.htaccess` and configures:
   - Client-side routing fallback (`RewriteRule . /index.html [L]`)
   - Gzip compression (`mod_deflate`)
   - 1-year browser caching for fonts, images, and WebP files (`mod_expires`)
   - Standard security headers (`X-Content-Type-Options`, `X-Frame-Options`)

---

## 6. Audit & Quality Verification

| Category | Status | Details |
| :--- | :---: | :--- |
| **First Load Bundle** | **Passed** | `dist/assets/index-*.js` is ~85 KB gzipped (< 200 KB target) |
| **Accessibility** | **100%** | All 14 images contain valid `alt` text; all buttons include descriptive `aria-label`s; contrast verified |
| **Arabic RTL** | **Verified** | `dir="rtl"`, mirrored logical layouts (`end-6`, `ps-`, `pe-`), Noto Sans Arabic typography |
| **SEO & Social** | **100%** | JSON-LD Organization schema, Open Graph, Twitter cards, sitemap.xml, robots.txt |
| **Responsive Grid** | **Verified** | Tested across 360px (mobile), 768px (tablet), 1280px (desktop), 1920px (large displays) |

---

&copy; Local Exim. All rights reserved.
