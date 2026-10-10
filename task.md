LOCAL EXIM: UPDATE PASS (same project, do not rebuild from scratch)

0. SETUP
Replace src/siteConfig.js and src/locales/en.json with the two files in the attached update pack (they already contain the new contact details, the full language list with native names, and new "nav.blog" / "blog.*" keys).

1. CONTACT & ADDRESS UPDATE
Phone, email and address now come only from siteConfig.js — do not hardcode them anywhere.
- Phone: +91 93564 47373
- Email: shubhhampatill@localexim.com
- Address: Office No. 1846, Shivshambo Nagar, Ward No. 4, Tal. Karvir, Dist. Kolhapur – 416234, Maharashtra, India
Update every place these appear: the Contact section info cards, the footer contact column, the WhatsApp float button's underlying number stays UNCHANGED (still siteConfig.whatsappNumber, the catalogue number), and the JSON-LD Organization schema / meta tags if present. Grep the codebase for the old placeholder email/address and remove any hardcoded duplicates.

2. BLOG (nav + placeholder page only — no articles yet)
- Add "Blog" to the main nav and the mobile drawer, between "About" and "Contact", shown only if siteConfig.showBlog is true. Route: /blog.
- Build a simple BlogIndex page in the same brand style (cream background, gold hairline cards) styled like horizonexim.co.in/blog's card grid: each card has a date badge (day + month/year), a thumbnail, and a title link — but since there are no posts yet, render an empty state instead: an icon, the text from blog.title / blog.subtitle / blog.empty (locale keys provided), and a "Back to Home" button. Build the card component now so real posts can be dropped into src/data/blog.json later with zero redesign.
- Footer "Quick Links" also gets a Blog link, same visibility rule.
- This is a single extra route; it does not need its own language-specific SEO work beyond reusing the existing meta pattern.

3. LANGUAGES (10 total)
siteConfig.languages is now an ordered list of { code, native } — use it to drive the switcher instead of a hardcoded array. Keep the 6 already working (en, ar, es, fr, de, hi) and add 4 new locale files with full, natural translations of every key in en.json: zh (Simplified Chinese), ta (Tamil), ru (Russian), pt (Portuguese). Lazy-load each file as before.
Dropdown layout, since 10 languages is too long for a single column:
- Desktop: panel opens as a 2-column grid (5 rows x 2 cols), each row = flag/code + native name, active language has a gold left-border + tick icon, hover = soft green tint.
- Mobile drawer: single column, max-height with internal scroll (not pushing the rest of the drawer down), same row styling.
- Keep existing persistence (localStorage) and browser-language detection logic; just source the list from siteConfig.languages.
- Chinese and Tamil are not RTL — only Arabic keeps dir="rtl". No layout mirroring needed for the new ones.

4. RULES (unchanged from the original build)
No hardcoded copy in components. Don't touch sections outside what's listed above. Keep performance budget and existing structure intact — this is an incremental update, not a redesign.

5. DELIVERABLE
Confirm with a short diff summary of files touched, and a screenshot of: footer with new contact details, the open language dropdown (desktop), and the Blog empty-state page.