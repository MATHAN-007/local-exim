LOCAL EXIM: RETIRE CHAPPALS CATALOGUE -- UNIFY INTO LEATHER PRODUCTS

CONTEXT
Per client decision, the standalone Chappals catalogue is being retired. 4 specific chappal
products survive, merged into Leather Products under a new "Kolhapuri Chappals & Loafers"
subcategory. Leather Products becomes the SINGLE product catalogue on the site.

0. SETUP -- MERGE RULES VARY BY FILE, READ CAREFULLY
- Copy public/leather/*.webp (4 new files) and public/hero/*.webp (2 new files) into the
  existing folders -- additive, no conflicts.
- Copy public/downloads/Local-Exim-Leather-Catalogue.pdf into public/downloads/, OVERWRITING
  the existing file of the same name.
- REPLACE src/data/leatherProducts.json entirely with this pack's version (full replacement
  of this ONE file only -- it now has 20 products / 12 subcategories, see its _note field).
- REPLACE src/data/heroSlides.json entirely (full replacement, same as before -- this file
  only ever holds hero content).
- Copy tools/build_leather_catalogue_pdf.py into tools/, overwriting the existing one (adds
  the new subcategory's title mapping).
- Open src/siteConfig.js: REMOVE the `productSections` array entirely (the old Chappals/Leather
  2-tile split is retired). ADD `catalogueDownload` and `homeCollections` from
  siteConfig.patch2.js. Leave every other key in siteConfig.js untouched.
- For each of the 15 locale-patches/*.json files, MERGE IN exactly 3 new keys into the REAL
  existing src/locales/<code>.json: leather.cat.kolhapuriChappals, productsLanding.kolhapuriDesc,
  productsLanding.jacketsDesc. Do not overwrite the files -- these are small additions on top
  of everything already built.

1. REMOVE THE CHAPPALS CATALOGUE
- Delete the /products/chappals route and its page component.
- Delete the /products landing page (the old 2-tile chooser) -- no longer needed with a single
  catalogue.
- src/data/catalogue.json: stop importing/using it anywhere. Do not delete the file from disk
  (harmless to leave it unreferenced), but remove every component reference to it.
- Retire the Chappals-only PDF button/reference and the old Local-Exim-Catalogue.pdf file
  reference in code (the physical file can stay on disk unused, or be deleted -- your call).

2. REDIRECTS -- DO NOT BREAK EXISTING LINKS
The blog posts, sitemap, and old bookmarks point at /catalogue, /catalogue?cat=X, and
/products/chappals*. All of these must now redirect to /products/leather (dropping any old
chappal-specific ?cat= value, since those subcategories -- men-kolhapuri, men-kapshi, ladies --
no longer exist in the unified structure; redirecting to the unfiltered /products/leather is
correct, don't try to remap old cat values to new ones). Update sitemap.xml accordingly:
remove /products/chappals and /products entries, ensure /products/leather is listed.

3. NAVBAR -- "PRODUCTS" BECOMES A FLAT SUBCATEGORY DROPDOWN
- Clicking the "Products" label itself now goes directly to /products/leather (showing "All").
- Replace the old 2-item (Chappals/Leather Products) dropdown with a flat list of all 12
  subcategories plus "All", in a two-column aligned layout, using the SAME hover style already
  used elsewhere in the nav (don't invent a new dropdown visual style). Order: All, Leather
  Jackets, Belts, Wallets, Ladies Purse, Ladies Handbags, Shoes, Leather Folders, Bags, Laptop
  Bags, Leather Duffel Bags, Hats, Kolhapuri Chappals & Loafers. Each item links to
  /products/leather?cat={id} (All links to /products/leather with no query param). Labels
  from leather.cat.* locale keys (all already exist, including the new kolhapuriChappals key).
- Mirror this flat list in the mobile drawer the same way the old 2-item version was mirrored.
- Footer's product-links column: replace the old "Chappals group / Leather Products group"
  structure (built in the immediately prior session) with a single flat list of a few top
  subcategories plus a "View All" link to /products/leather -- keep it lean, 4-5 links max
  (suggest: Kolhapuri Chappals & Loafers, Leather Jackets, Bags, Wallets, then "View All
  Products" linking to /products/leather with no filter).

4. /products/leather PAGE -- NO STRUCTURAL CHANGES
This page already supports subcategory filtering, search, "Load More", excludeUntilReview
filtering, and the empty/coming-soon state for subcategories with zero products. It now simply
has 3 empty subcategories instead of 2 (shoes, bags, leather-duffel-bags all show the empty
state) and one new populated one (Kolhapuri Chappals & Loafers, 5 products). No code changes
needed here beyond consuming the updated data file.

5. HOME PAGE -- HERO
- Hero slideshow reads the new heroSlides.json (2 chappal + 3 leather slides, same dot/autoplay
  component as before -- data swap only).
- The "Browse full catalogue" link under the hero CTAs now points to /products/leather (not
  /products, which no longer exists).

6. HOME PAGE -- "OUR COLLECTIONS" SECTION
Replace its data source with siteConfig.homeCollections (2 entries: Kolhapuri Chappals &
Loafers, Leather Jackets). Same exact card visual style as already built (image, title from
nameKey, description from descKey, "Explore" button to route) -- this is a data-source swap,
not a redesign.

7. HOME PAGE -- "FEATURED DESIGNS" SECTION
Remove the Chappals/Leather Products tab toggle added in the prior session (no longer
applicable -- single catalogue now). Revert to a single grid: first 8 visible products from
leatherProducts.json (respecting excludeUntilReview), same ProductCard, showPrice={false},
single "View Full Catalogue" button (-> /products/leather) and single "Download Catalogue
(PDF)" button (-> siteConfig.catalogueDownload.file, showing .sizeLabel) beneath the grid --
matching the original single-section layout pattern, not the two-button-per-tab pattern from
the prior session.

8. RULES
No prices anywhere. No hardcoded copy -- everything through locale keys and
leatherProducts.json. Don't touch Home's About/Why Us/How-to-order/Contact sections or any
form. Mobile-first, verify 360/768/1280.

9. DELIVERABLE
Screenshots: navbar's new flat two-column subcategory dropdown (desktop), hero showing a
chappal slide, "Our Collections" with the 2 new cards, "Featured Designs" single-grid layout
with its one Download button, and /products/leather filtered to "Kolhapuri Chappals &
Loafers" showing all 5 items. Confirm: (a) an old /catalogue?cat=ladies link redirects
correctly to /products/leather, (b) /products and /products/chappals no longer exist (404 or
redirect, not a broken page), (c) the regenerated PDF opens and shows all 16 visible products
including the 4 chappals with no prices.