LOCAL EXIM: HOME PAGE UPDATE -- DUAL PRODUCT LINE (CHAPPALS + LEATHER PRODUCTS)

CONTEXT
The site already has /products, /products/chappals, /products/leather built in a prior
session, with siteConfig.productSections as the shared config for both sections. This task
updates the HOME PAGE ONLY to reflect both product lines. Do not touch forms, do not change
any other page's structure.

0. SETUP -- MERGE, NOT REPLACE
- Copy public/hero/*.webp (3 new files) into the existing public/hero/ folder (adds to the 5
  already there -- 2 of the existing 5 are being reused, 3 of the existing 5 are being retired
  from the hero but should NOT be deleted from disk, they're still used elsewhere).
- Copy public/downloads/Local-Exim-Leather-Catalogue.pdf into public/downloads/.
- Copy tools/build_leather_catalogue_pdf.py into tools/.
- REPLACE src/data/heroSlides.json entirely with the one in this pack (intentional full
  replace -- this file only ever holds hero slide content, nothing else depends on its old data).
- Open src/siteConfig.js and MERGE IN the productSections structure from siteConfig.patch.js --
  if productSections already exists from the earlier /products session, UPDATE each entry to
  add the new image / pdfFile / pdfSizeLabel fields shown in the patch rather than duplicating
  the array. Do not touch any other key in siteConfig.js.
- For each of the 15 files in locale-patches/, MERGE the hero.eyebrow / hero.title /
  hero.subtitle / hero.cta1 UPDATED VALUES and the new leather.download / leather.downloadHint
  keys into the REAL existing src/locales/<code>.json files. These are small, targeted key
  updates/additions -- do NOT overwrite any locale file wholesale, that would delete all other
  existing content (nav, collections, featured, about, why, how, contact, footer, catalogue,
  blog, productsLanding, leather.cat.*, etc. all built in earlier sessions). Confirm each
  file's total key count only grew or stayed the same, never shrank.

1. HERO SECTION
- Text: use the updated hero.eyebrow / hero.title / hero.subtitle / hero.cta1 from the locale
  files (English: eyebrow "Handcrafted Leather, Made in India", title "Kolhapuri Chappals &
  Leather Essentials, Crafted for the World", subtitle mentions both categories, cta1 now
  "Explore Products"). No other hero layout changes.
- Slideshow: now reads heroSlides.json's 5 entries (2 chappals, 3 leather) instead of the old
  5-chappal set. Same component, same autoplay/pause/dot behavior as already built -- just
  swap the data source, no structural changes. Each slide's `section` field (chappals/leather)
  is informational only for now; no per-slide visual treatment change required.
- The "Browse full catalogue" link under the CTAs now points to /products (the landing page
  showing both sections) instead of directly to /catalogue or /products/chappals, since it's
  no longer chappals-only. Update its href only, keep its existing style/position.

2. "OUR COLLECTIONS" SECTION -- NOW DRIVEN BY siteConfig.productSections
Replace its current data source (the old 2 chappal-subcategory cards) with a map over
siteConfig.productSections (2 entries: chappals, leather). Each card: image (section.image),
title (t(section.nameKey)), description (t(section.descKey)), "Explore" button
(productsLanding.explore label) linking to section.route. Keep the exact existing card style
(gold border, hover lift, rounded-2xl) -- this is a data-source swap, not a redesign. Section
heading/subtitle can keep using the existing collections.title/subtitle keys, unchanged.

3. "FEATURED DESIGNS" SECTION -- ADD A TWO-WAY TOGGLE
- Add a tab/toggle control above the grid with two options, labeled from
  productsLanding.chappalsTitle and productsLanding.leatherTitle (reuse these keys, don't add
  new ones) -- default selected: Chappals.
- Chappals tab: unchanged behavior -- first 8 products from catalogue.json, existing
  ProductCard with price-note behavior exactly as already built.
- Leather tab: first 8 visible products from leatherProducts.json (skip excludeUntilReview
  automatically, same filter already used on /products/leather), using the SAME ProductCard
  component with showPrice={false} and the leather.enquire WhatsApp button pattern already
  built for /products/leather. Do not build a second card component.
- Below the grid, two buttons that change target based on the active tab, sourced from the
  active productSections entry: "View Full Catalogue" -> section.route, and
  "Download Catalogue (PDF)" -> section.pdfFile, showing section.pdfSizeLabel as the small
  muted size label (reuse the existing download-button component built for the Chappals PDF --
  it already takes a file + sizeLabel prop, just pass the active section's values instead of
  hardcoding the Chappals ones).
- Switching tabs should not cause layout jank -- keep the grid container's min-height stable
  if feasible, or accept a brief reflow if not; don't over-engineer this.

4. FOOTER UPDATE
In the footer's product-links column (previously labeled for Chappals/Collections only):
- Add a small sub-heading or visual grouping so it's clearly two lists now, not one:
  "Chappals" group: links to /products/chappals, plus 2 shortcuts -- Men's Kolhapuri
  (/products/chappals?cat=men-kolhapuri) and Ladies' (/products/chappals?cat=ladies).
  "Leather Products" group: link to /products/leather, plus 3 shortcuts -- Leather Jackets
  (/products/leather?cat=leather-jackets), Bags (/products/leather?cat=laptop-bags), Wallets
  (/products/leather?cat=wallets). (Only 3 of the 11 leather subcategories shown here by
  design, to keep the footer lean -- not an exhaustive list.)
Keep the footer's other columns (Company, Get in Touch) and the back-to-top button exactly
as already built -- this section's internal structure only.

5. RULES
Do not modify: the Home page's About section, Why Us section, How-to-order section, Contact
form, or any non-Home page. Do not add prices anywhere on the Leather side. Do not invent
subcategory shortcuts beyond what's specified above. Mobile-first, verify 360/768/1280. Keep
the existing performance budget -- hero images follow the same eager-first/lazy-rest pattern
already built.

6. DELIVERABLE
Screenshots: hero mid-slideshow showing a leather product slide (desktop + mobile), "Our
Collections" section showing both cards, "Featured Designs" with the Leather tab active
showing its own View/Download buttons, and the updated footer. Confirm: (a) all 15 locale
files grew rather than shrank after merging, (b) the regenerated understanding that
Local-Exim-Leather-Catalogue.pdf opens correctly and shows no prices, (c) the Home page's
About/Why Us/How-to-order/Contact sections are pixel-identical to before this change.