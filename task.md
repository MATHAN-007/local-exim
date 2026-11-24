# LOCAL EXIM – BLOG SECTION CONTENT & SEO OPTIMIZATION
## Safe Development Prompt for Antigravity AI Coding Agent

### 1. ROLE & OBJECTIVE

Act as a Senior Full-Stack Developer, UI/UX Engineer, Technical SEO Specialist, and Content Strategist.

You are working on the existing LocalExim website.
  
**Existing project:** React + Vite  
**Product asset workspace:** `local-exim-leather-products-pack/public/leather/`

The product catalogue has recently been updated:
- The previous Kolhapuri Chappal and sandals product section has been removed.
- New leather products, leather accessories, loafers and chappals have been introduced.
- The existing blog still contains outdated Kolhapuri and Prada sandal-related content.

Your task is to completely update the BLOG CONTENT, ARTICLE DATA, ARTICLE IMAGES, AND SEO METADATA to align with the updated LocalExim product catalogue. (only work on blog page)

**MOST IMPORTANT REQUIREMENT: Preserve the existing blog page's UI, visual design, layout, theme, typography, spacing, and overall appearance. Only change the content, article information, and relevant product images.**

---

### 2. STRICT DESIGN PRESERVATION – NO REDESIGN

Treat the existing `/blog` page as the approved reference design.

Study the existing components and CSS before making modifications.

Preserve the following visual properties exactly:

**Theme and colours**
- Warm ivory/off-white background.
- Deep forest-green headings and primary text.
- Elegant mustard/golden-yellow accent colour.
- Existing gold borders and subtle shadows.
- Existing dark-green footer.
- Existing visual contrast and colour hierarchy.

**Typography**
- Preserve the existing premium serif typography for major headings and article titles.
- Preserve the existing sans-serif typography for paragraphs, labels, metadata, and navigation.
- Maintain current font weights, line heights, and text hierarchy.

**Layout and components**
- Preserve the existing navbar and active Blog navigation state.
- Preserve the existing centred blog hero section.
- Maintain the featured article's large split-layout card.
- Maintain the existing three-column article card grid on desktop.
- Preserve image dimensions, aspect ratios, card borders, rounded corners, and hover effects.
- Maintain the existing article-detail layout.
- Preserve existing CTA sections, footer, floating WhatsApp button, and scroll-to-top button.
- Keep all existing animations and interactions.

**Responsive behaviour**
- Preserve the current desktop, tablet, and mobile design patterns.
- Ensure new titles and article descriptions fit without overflow.
- Stack cards appropriately on smaller screens.
- Maintain readable article widths and image proportions.

Do not introduce a new colour palette, new component library, new typography system, or different visual layout.

Do not redesign the website.

---

### 3. EXISTING CONTENT TO REMOVE

Remove outdated blog content related to:

- Kolhapuri Chappals.
- Kolhapuri sandals.
- 900-year Kolhapuri history.
- Prada sandal controversy.
- Traditional chappal maintenance.
- Kolhapuri authenticity guides.
- Chappal-related pricing comparisons.
- Old chappal product images and thumbnails.

Remove these references from the blog listing, featured article, article detail pages, related-article recommendations, and blog-specific metadata.

Do not globally delete product references, assets, or data used elsewhere in the application.

Preserve any unrelated website content.

---

### 4. PRODUCT IMAGE INTEGRATION – VERY IMPORTANT



The matching product image assets already exist in the workspace:

`local-exim-leather-products-pack/public/leather/`

Inspect the actual directory and match the images by visual appearance and filename.

Expected asset filenames include:

- `zip-leather-jacket.webp`
- `buckle-loafer.webp`
- `felt-outback-hat.webp`
- The appropriate existing `messenger-briefcase-bag` WebP asset.

The messenger briefcase filename may have additional characters or a suffix. Verify its exact filename instead of guessing.

**Image implementation rules:**

- Reuse the existing product images.
- Do not generate new images.
- Do not download stock images.
- Do not use the previous Kolhapuri images.
- Do not duplicate assets unnecessarily.
- Use the correct image for each corresponding article.
- Preserve image quality and aspect ratios.
- Add descriptive, meaningful alt text.
- Use the correct public asset URL based on the actual Vite project structure.
- Verify every asset path before finalizing.

If an expected asset cannot be located, report it instead of silently substituting an unrelated image.

---

### 5. NEW BLOG CONTENT STRATEGY

Replace the old chappal-focused blog with four relevant, high-quality editorial articles covering the updated catalogue.

Use the first article as the featured article and the other three as article cards.

#### ARTICLE 01 – FEATURED ARTICLE

Category: Leather Footwear

Title:
"Leather Buckle Loafers: A Complete Guide to Style, Fit & Care"

Suggested slug:

`leather-buckle-loafers-style-fit-care-guide`

Image:
`buckle-loafer.webp`

SKU reference: SH-01

Excerpt:

"Discover how buckle loafers complement modern outfits, what to consider when choosing the right fit, and practical ways to care for your footwear."

Article structure:
- Introduction to buckle loafers.
- Understanding the design and buckle detail.
- How to style loafers for different occasions.
- Choosing a comfortable fit.
- Practical footwear care and maintenance.
- How to explore the LocalExim footwear collection.
- Relevant catalogue CTA.

#### ARTICLE 02

Category: Leather Jackets

Title:
"How to Choose a Leather Jacket: Style, Fit & Everyday Wear"

Suggested slug:

`how-to-choose-a-leather-jacket`

Image:
`zip-leather-jacket.webp`

SKU reference: LJ-01

Excerpt:

"Explore important factors to consider when choosing a leather jacket, from silhouette and fit to everyday styling and proper maintenance."

Article structure:
- Introduction to leather jackets.
- Understanding different jacket silhouettes.
- Choosing the right fit.
- Styling a zip leather jacket.
- Seasonal and everyday outfit inspiration.
- Basic jacket care and storage.
- Link to the LocalExim jacket catalogue.

#### ARTICLE 03

Category: Bags & Accessories

Title:
"Leather Messenger Briefcases: A Practical Guide to Style & Function"

Suggested slug:

`leather-messenger-briefcase-buying-guide`

Image:
Use the verified messenger briefcase asset.

SKU reference: LB-03

Excerpt:

"Explore what makes a messenger briefcase a practical everyday accessory, including design, carrying comfort, organisation, and styling."

Article structure:
- Introduction to messenger briefcases.
- Understanding the messenger bag design.
- What to consider when selecting a briefcase.
- Everyday and professional styling.
- Organisation and practical usage.
- Basic cleaning and maintenance.
- Link to the relevant LocalExim bag catalogue.

#### ARTICLE 04

Category: Fashion Accessories

Title:
"Felt Outback Hats: Styling Ideas & Essential Care Tips"

Suggested slug:

`felt-outback-hat-styling-care-guide`

Image:
`felt-outback-hat.webp`

SKU reference: HT-02

Excerpt:

"Discover simple ways to style a felt outback hat, choose a comfortable fit, and maintain its shape through everyday use."

Article structure:
- Introduction to outback hats.
- Understanding the classic hat silhouette.
- Outfit combinations and styling suggestions.
- Choosing the right fit.
- Basic felt-hat cleaning and storage.
- Link to the relevant LocalExim accessories catalogue.

Important: The product is identified as a felt outback hat. Do not incorrectly describe its material as leather without verified product specifications.

---

### 6. BLOG HOMEPAGE CONTENT STRUCTURE

Keep the original blog homepage structure.

**Section A – Hero**

Preserve:
- Existing eyebrow label.
- Main title.
- Supporting description.
- Existing spacing and alignment.

Suggested content:

Eyebrow:
ARTICLES & FIELD STORIES

Heading:
Insights & Updates

Description:
"Explore guides, styling ideas, product insights, and useful tips from the world of leather goods and accessories."

**Section B – Featured Article**

Display Article 01 as the featured article.

Use:
- Buckle loafer image.
- Category badge.
- Reading time.
- Featured article title.
- Short description.
- Existing Read Article button.

Preserve the original split-card layout and styling.

**Section C – Article Cards**

Display the remaining three articles in the existing three-column grid.

Card order:
1. Leather Jacket Guide.
2. Messenger Briefcase Guide.
3. Felt Outback Hat Guide.

Every card must contain:
- Appropriate product image.
- Category badge, if supported by the existing design.
- Estimated reading time.
- Article title.
- Short excerpt.
- Existing Read Article CTA.

Keep all cards visually consistent with the original design.

---

### 7. ARTICLE DETAIL PAGE

Reuse the existing article-detail page components and styling.

Do not create an entirely new article template.

Each new article must contain:

1. Back to Blog navigation.
2. Article hero image.
3. Category label.
4. H1 article title.
5. Reading time.
6. Existing share functionality.
7. Properly structured article content.
8. Clear H2 and H3 sections.
9. Relevant internal catalogue links.
10. Existing WhatsApp enquiry CTA.
11. Related articles section.
12. Existing footer.

Write useful, original, human-readable articles.

Target approximately 500–700 words per article where appropriate, without adding unnecessary filler.

Use short paragraphs, descriptive subheadings, and natural keyword placement.

Keep the content educational and product-focused.

Do not make unsupported claims about:
- Genuine leather certification.
- Specific leather grades.
- Manufacturing processes.
- Product dimensions or technical specifications.
- Waterproofing.
- Sustainability certifications.
- Country of origin.
- Exact product durability.
- Export certifications.

Use verified existing catalogue information only.

---

### 8. SEO OPTIMIZATION – HIGH PRIORITY

Implement proper on-page and technical SEO while preserving the design.

**A. Blog homepage SEO**

Suggested title:

`Leather Goods Guides & Product Insights | Local Exim`

Suggested meta description:

`Explore leather jackets, messenger briefcases, buckle loafers and accessories with practical styling guides, product insights and care tips from Local Exim.`

Ensure:
- One descriptive H1.
- Logical H2/H3 structure.
- Canonical URL: `https://localexim.com/blog`
- Open Graph metadata.
- Twitter/X card metadata.
- Descriptive image alt text.
- Proper internal links.
- No duplicate meta descriptions.

**B. Individual article SEO**

Every article must have unique:

- SEO title.
- Meta description.
- H1.
- URL slug.
- Canonical URL.
- Open Graph title and description.
- Social sharing image.
- Descriptive image alt text.

Example canonical:

`https://localexim.com/blog/leather-buckle-loafers-style-fit-care-guide`

Use natural search phrases, including:

- Leather buckle loafers.
- Leather jacket styling guide.
- Leather messenger briefcase.
- Felt outback hat.
- Leather product care.
- Leather accessories.
- Leather footwear.

Do not keyword-stuff titles or paragraphs.

**C. Structured data**

Implement appropriate structured data using the project's existing SEO infrastructure.

Use:
- `BlogPosting` or `Article` schema for individual articles.
- `BreadcrumbList` for article navigation.
- `ItemList` for the blog listing, when appropriate.

Include accurate:
- Headline.
- Description.
- Image.
- Author or publisher, where verified.
- Date published and modified, only when accurate.
- Canonical page URL.

Never fabricate publication dates, authors, ratings, reviews, or other structured-data properties.

Avoid duplicate JSON-LD blocks.

**D. Technical SEO**

- Keep important article text available in the rendered HTML.
- Ensure each article is crawlable through its own URL.
- Avoid duplicate URLs and duplicate content.
- Add meaningful internal links between relevant blog articles.
- Link articles to their corresponding existing catalogue categories.
- Use descriptive image filenames and alt attributes.
- Lazy-load below-the-fold article images where appropriate.
- Do not lazy-load the main LCP image unnecessarily.
- Avoid layout shifts during image loading.
- Preserve existing robots and sitemap configuration.
- Verify that blog routes are not accidentally marked `noindex`.

---

### 9. ROUTING & BACKWARD COMPATIBILITY

Inspect the existing React Router or routing implementation.

Ensure these routes work correctly:

- `/blog`
- `/blog/leather-buckle-loafers-style-fit-care-guide`
- `/blog/how-to-choose-a-leather-jacket`
- `/blog/leather-messenger-briefcase-buying-guide`
- `/blog/felt-outback-hat-styling-care-guide`

Requirements:

- Clicking a blog card opens the correct article.
- Clicking Back to Blog returns to the blog homepage.
- Related article links work.
- Refreshing an individual article URL must not produce a 404.
- Unknown slugs should display the existing not-found behaviour.
- Preserve compatibility with Hostinger shared hosting and its current SPA routing setup.

The previous article URL:

`/blog/prada-kolhapuri-chappal-controversy`

Should no longer expose outdated content.

Where technically supported, provide an appropriate permanent redirect to `/blog` for the retired article URL. Verify the actual hosting/router behaviour before configuring redirects. Do not break existing `.htaccess` rules or unrelated routes.

---

### 10. DEVELOPMENT SAFETY RULES

Before editing anything:

1. Inspect the complete project directory.
2. Locate the current blog homepage and article-detail components.
3. Identify the article data source.
4. Identify the existing SEO implementation.
5. Inspect the actual image asset directory.
6. Check the current Git status and existing uncommitted changes.

During development:

- Modify only files required for the blog update.
- Reuse existing components, styles, and utilities.
- Prefer updating existing article data over creating duplicate components.
- Keep the current design system intact.
- Do not modify the homepage, catalogue pages, About, Why Us, or Contact sections.
- Do not change existing product information.
- Do not change WhatsApp numbers, email addresses, or contact URLs.
- Do not remove assets used by other pages.
- Do not replace existing working integrations.
- Do not install unnecessary npm packages.
- Do not expose private environment variables or API keys.
- Do not execute destructive terminal commands.
- Do not run `git reset --hard`, `git clean -fd`, or overwrite unrelated files.
- Do not delete user modifications or existing working code.

Before substantial changes, preserve a rollback point using Git or a separate backup.

Do not commit, push, deploy, or upload files to Hostinger without explicit permission.

---

### 11. TESTING & VALIDATION

After implementation, perform the following checks.

**Visual checks**
- Blog page retains the existing design.
- Featured card looks consistent with the original.
- Three article cards retain their existing proportions.
- Article detail page retains its original visual structure.
- Images display correctly.
- No stretched or distorted images.
- No broken layout on smaller screens.
- Footer and navbar remain unchanged.

**Functional checks**
- All four article routes open.
- All Read Article buttons work.
- Back to Blog works.
- Related articles work.
- WhatsApp CTA works.
- Share functionality works.
- Catalogue links point to real existing pages.
- Old article route is handled safely.
- No broken image paths.

**SEO checks**
- Correct H1 on every route.
- Unique title and description for every article.
- Correct canonical URLs.
- Valid structured data.
- Descriptive image alt text.
- No duplicate metadata.
- No accidental noindex directives.

**Build checks**

Run the available project validation commands, including:

`npm run build`

Also run existing lint and type-check commands where available.

Resolve errors introduced by the changes.

Do not suppress existing errors without understanding their source.

---

### 12. FINAL DELIVERY REPORT

After completing development, provide a summary containing:

1. Files modified.
2. Components reused.
3. Old articles removed or retired.
4. Four new article titles and URLs.
5. Product image filenames used.
6. SEO metadata implemented.
7. Structured-data implementation.
8. Responsive validation results.
9. Build and lint results.
10. Any remaining issues or missing assets.

Include a clear statement confirming whether the existing blog design was preserved.

**Do not deploy the website to Hostinger.** Complete the development in the local project and report the successful production build so the owner can review and upload the updated `dist` folder manually.

---

### FINAL PRIORITY

Priority order:

1. Preserve the original LocalExim blog design without redesigning it.
2. Remove outdated Kolhapuri and sandal-focused blog content.
3. Feature the four updated product categories using the supplied product images.
4. Create relevant, high-quality editorial articles.
5. Implement technically correct SEO.
6. Maintain all existing website functionality.
7. Ensure a successful Vite production build.

Work carefully, inspect first, and make minimal, controlled modifications.

The final result must look like the original LocalExim blog, but its content, images, articles, and SEO must accurately reflect the updated leather products and loafer catalogue.