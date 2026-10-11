LOCAL EXIM: HERO SLIDESHOW + WHATSAPP NUMBER + PDF CATALOGUE DOWNLOAD

0. SETUP (files from the pack, overwrite existing)
- public/downloads/Local-Exim-Catalogue.pdf  (new)
- public/catalogue/*.webp  (refreshed images, overwrite all)
- public/hero/ladies-bingri-kolhapuri-cutout.webp  (new 5th hero image)
- src/data/catalogue.json  (overwrite: adds `code`, corrected photoQuality flags)
- src/data/heroSlides.json  (new)
- tools/build_catalogue_pdf.py  (new, do not run it unless asked)
Do NOT overwrite src/siteConfig.js or src/locales/*.json; edit them as described below.

1. HERO AUTO SLIDESHOW
Extend the existing hero featured-design selector (currently 4 items) to the 5 slides in src/data/heroSlides.json. Do not rebuild the hero layout.
- Autoplay every 3000 ms (put `heroSlideshow: { intervalMs: 3000 }` in siteConfig.js and read it from there).
- Crossfade (~600 ms) between slides stacked in the same gold-ringed frame; subtle scale 1.00 -> 1.04 during the show is fine. Keep the existing CSS float animation on the wrapper, NOT on each image.
- The 5 numbered dots stay and become clickable; clicking a dot shows that slide and restarts the 3 s timer.
- Pause on hover/focus-within, when the browser tab is hidden (visibilitychange), and when the hero is off-screen (IntersectionObserver).
- Add a small pause/play toggle button next to the dots (aria-label from locale keys hero.pause / hero.play). This is required for accessibility because the content moves automatically for more than 5 s.
- prefers-reduced-motion: do NOT autoplay (start paused), no crossfade scale; the user can still press play or click dots.
- Performance: first slide eager with fetchpriority=high; preload the other 4 after window load (idle callback); container has fixed width/height so there is no layout shift. Images are shown at max ~300px wide, never stretched.
- Keep the dot buttons' aria-labels from locale key hero.slide ("Show design {{n}}").

2. WHATSAPP NUMBER: 9356447373 (SINGLE SOURCE OF TRUTH)
- In src/siteConfig.js set whatsappNumber: "919356447373" (digits only, country code first) and add:
    waMessages: {
      general: "Hello Local Exim, I would like to enquire about your Kolhapuri footwear.",
      product: "Hello Local Exim, I am interested in {name} (Code: {code}). Please share details."
    }
  Keep phone: "+91 93564 47373" (it is the same number).
- Create src/lib/whatsapp.js exporting waLink(message): digits-only number (if exactly 10 digits, prefix 91), returns `https://wa.me/${number}?text=${encodeURIComponent(message)}`; and productMessage(product) that fills {name} and {code} from waMessages.product.
- EVERY WhatsApp entry point must use waLink(): hero "Chat on WhatsApp", mobile drawer WhatsApp button, floating WhatsApp button, "Enquire on WhatsApp" on Home featured cards, /catalogue cards, /blog spotlight cards, the Contact section, and the footer. Use general message for generic buttons and productMessage() for product buttons.
- Implement every one as a plain <a href={waLink(...)} target="_blank" rel="noopener noreferrer">. Do NOT use window.open in click handlers (popup blockers / iOS Safari), do NOT use whatsapp:// or api.whatsapp.com/send. wa.me works on both: it opens the WhatsApp app on mobile and WhatsApp Web / Desktop on computers.
- Search the whole codebase (src, index.html, public, JSON-LD, meta) for the old number 917038405530 / 7038405530 and any other hardcoded phone or wa.me URL, and replace them with the siteConfig values. Phone rows use tel:+919356447373; email rows use mailto:. JSON-LD telephone = "+919356447373".

3. PDF CATALOGUE DOWNLOAD
The PDF is pre-built and static (46 designs, product code, photo, price, tappable enquire links). Do NOT generate PDFs in the browser and do not add a PDF library.
- Add to siteConfig.js: catalogueDownload: { file: "/downloads/Local-Exim-Catalogue.pdf", sizeLabel: "PDF · 1.8 MB" }.
- Create a reusable <DownloadCatalogueButton variant="primary|ghost|link"> rendering <a href={file} download="Local-Exim-Catalogue.pdf" target="_blank" rel="noopener noreferrer"> with a Download icon, label from catalogue.download, and the sizeLabel in small muted text. (On iPhone the PDF opens in the viewer with Share / Save to Files; on Android and desktop it downloads. This is expected, do not fight it.)
- Place it in: (a) top of /catalogue next to the title (desktop) and as a full-width button under the title (mobile); (b) Home > Featured Designs, beside "View Full Catalogue" as the secondary button; (c) footer, in the Catalogue column; (d) mobile drawer, below the main links.
- Show the product `code` (small, gold, muted) on /catalogue and Home cards, and include it in the WhatsApp message via productMessage().
- On /catalogue keep prices as ₹{priceInr} with the note "Bulk / export pricing on request"; never show prices on Home cards.
- Respect catalogue.json flags: skip items with excludeUntilPhoto; for photoQuality "needs-photo" show a neutral "Photo coming soon" placeholder tile (locale key catalogue.photoComingSoon) instead of the image.

4. LOCALE KEYS (add to src/locales/en.json AND translate into all other 14 locale files so no language falls back to English)
- catalogue.download: "Download Catalogue (PDF)"
- catalogue.downloadHint: "All designs with photos, codes and details"
- hero.pause: "Pause slideshow"
- hero.play: "Play slideshow"
- hero.slide: "Show design {{n}}"
The PDF itself is English only; that is fine.

5. SMALL COPY FIX
The hero badge "100% Genuine Leather" is an unverified claim. Change it to "Handcrafted Leather" (via a locale key) unless I confirm otherwise. Do not add any other claims.

6. RULES
No hardcoded copy; keep the existing performance budget; mobile-first (verify 360 / 768 / 1280). Do not touch unrelated sections.

7. DELIVERABLE + TEST NOTES
Screenshots: hero mid-slideshow (desktop + mobile), /catalogue with the download button (desktop + mobile), footer. Confirm in writing: (a) slideshow advances every ~3 s and pauses on hover and via the toggle; (b) grep shows no remaining old WhatsApp number; (c) a product "Enquire on WhatsApp" link opens wa.me/919356447373 with the product name and code prefilled, on a desktop width and a mobile width; (d) the PDF link opens/downloads the file.