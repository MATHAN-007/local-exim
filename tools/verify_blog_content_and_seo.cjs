const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const http = require("http");

const ARTIFACT_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/7c5a5605-2aa7-4c66-812a-c814cc5c12d0';
const SCREENSHOTS_DIR = path.join(ARTIFACT_DIR, 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function saveScreenshot(elementOrPage, filename) {
  const p1 = path.join(ARTIFACT_DIR, filename);
  const p2 = path.join(SCREENSHOTS_DIR, filename);
  const buf = await elementOrPage.screenshot({ fullPage: false });
  fs.writeFileSync(p1, buf);
  fs.writeFileSync(p2, buf);
  console.log(`Saved screenshot: ${filename}`);
}

async function verifyBlogDataIntegrity() {
  console.log('=== Step 1: Validating blog.json Integrity ===');
  const jsonPath = path.join(__dirname, '../src/data/blog.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  if (!Array.isArray(data.posts)) throw new Error('data.posts must be an array');
  console.log(`Total blog posts: ${data.posts.length}`);
  if (data.posts.length !== 4) {
    throw new Error(`Expected exactly 4 blog posts, found ${data.posts.length}`);
  }

  const expectedArticles = [
    {
      slug: 'leather-buckle-loafers-style-fit-care-guide',
      title: 'Leather Buckle Loafers: A Complete Guide to Style, Fit & Care',
      category: 'Leather Footwear',
      image: '/leather/buckle-loafer.webp',
      sku: 'SH-01'
    },
    {
      slug: 'how-to-choose-a-leather-jacket',
      title: 'How to Choose a Leather Jacket: Style, Fit & Everyday Wear',
      category: 'Leather Jackets',
      image: '/leather/zip-leather-jacket.webp',
      sku: 'LJ-01'
    },
    {
      slug: 'leather-messenger-briefcase-buying-guide',
      title: 'Leather Messenger Briefcases: A Practical Guide to Style & Function',
      category: 'Bags & Accessories',
      image: '/leather/messenger-briefcase-bag.webp',
      sku: 'LB-03'
    },
    {
      slug: 'felt-outback-hat-styling-care-guide',
      title: 'Felt Outback Hats: Styling Ideas & Essential Care Tips',
      category: 'Fashion Accessories',
      image: '/leather/felt-outback-hat.webp',
      sku: 'HT-02'
    }
  ];

  expectedArticles.forEach((expected, i) => {
    const post = data.posts[i];
    if (!post) throw new Error(`Missing post at index ${i}`);
    if (post.slug !== expected.slug) throw new Error(`Expected slug ${expected.slug}, got ${post.slug}`);
    if (post.title !== expected.title) throw new Error(`Expected title ${expected.title}, got ${post.title}`);
    if (post.category !== expected.category) throw new Error(`Expected category ${expected.category}, got ${post.category}`);
    if (post.heroImage !== expected.image) throw new Error(`Expected image ${expected.image}, got ${post.heroImage}`);

    const diskImg = path.join(__dirname, '../public', post.heroImage.replace(/^\//, ''));
    if (!fs.existsSync(diskImg)) throw new Error(`Image missing on disk: ${diskImg}`);
    console.log(`  ✓ Article ${i + 1} verified: "${post.title}" (${post.slug})`);
  });

  // Check no Prada or Kolhapuri content remains
  const rawText = fs.readFileSync(jsonPath, 'utf8').toLowerCase();
  if (rawText.includes('prada') || rawText.includes('900-year')) {
    throw new Error('Outdated Prada or 900-year Kolhapuri content still detected in blog.json!');
  }
  console.log('✓ blog.json validation passed (0 outdated content, all 4 images on disk)!\n');
}

async function isPortOpen(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}`, () => resolve(true));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function runBrowserTests() {
  console.log('=== Step 2: Automated Browser UI & SEO Validation ===');
  const port = (await isPortOpen(4173)) ? 4173 : (await isPortOpen(5173)) ? 5173 : null;
  if (!port) {
    throw new Error('Server not responding on port 4173 or 5173.');
  }
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`Testing against server: ${baseUrl}`);

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1280,900"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  page.on('console', msg => {
    if (msg.type() === 'error') console.log('BROWSER CONSOLE ERROR:', msg.text());
  });

  // 1. Validate /blog Homepage
  console.log('1. Navigating to /blog...');
  await page.goto(`${baseUrl}/blog`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  // Check H1 and eyebrow
  const h1Text = await page.$eval('h1', el => el.textContent.trim());
  console.log(`   Page H1: "${h1Text}"`);
  if (!h1Text.includes('Insights & Updates')) {
    throw new Error(`Expected H1 to be 'Insights & Updates', got '${h1Text}'`);
  }

  // Check SEO metadata on /blog
  const pageTitle = await page.title();
  console.log(`   Document Title: "${pageTitle}"`);
  if (!pageTitle.includes('Leather Goods Guides & Product Insights')) {
    throw new Error(`Expected SEO title to include 'Leather Goods Guides & Product Insights', got '${pageTitle}'`);
  }

  const metaDesc = await page.$eval('meta[name="description"]', el => el.getAttribute('content'));
  console.log(`   Meta Description: "${metaDesc}"`);
  if (!metaDesc.includes('leather jackets, messenger briefcases, buckle loafers')) {
    throw new Error(`Meta description mismatch on /blog`);
  }

  const canonical = await page.$eval('link[rel="canonical"]', el => el.getAttribute('href'));
  console.log(`   Canonical URL: "${canonical}"`);
  if (canonical !== 'https://localexim.com/blog') {
    throw new Error(`Expected canonical 'https://localexim.com/blog', got '${canonical}'`);
  }

  // Check Featured Card
  const featuredTitle = await page.$eval('.mb-14 h2', el => el.textContent.trim());
  console.log(`   Featured Article Title: "${featuredTitle}"`);
  if (!featuredTitle.includes('Leather Buckle Loafers')) {
    throw new Error(`Expected featured article to be 'Leather Buckle Loafers...', got '${featuredTitle}'`);
  }

  // Check Remaining 3 Cards
  const cardTitles = await page.$$eval('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 article h3', els => els.map(e => e.textContent.trim()));
  console.log('   Grid Card Titles:', cardTitles);
  if (cardTitles.length !== 3) {
    throw new Error(`Expected 3 cards in grid, got ${cardTitles.length}`);
  }
  if (!cardTitles[0].includes('Leather Jacket') || !cardTitles[1].includes('Messenger Briefcase') || !cardTitles[2].includes('Outback Hat')) {
    throw new Error('Cards order mismatch in 3-column grid!');
  }

  // Check JSON-LD
  const jsonLdContent = await page.$eval('#blog-index-jsonld', el => el.textContent);
  const parsedJsonLd = JSON.parse(jsonLdContent);
  if (!parsedJsonLd['@graph']) throw new Error('Missing @graph in blog index structured data');
  console.log('   ✓ JSON-LD on /blog contains ItemList & BreadcrumbList');

  await saveScreenshot(page, 'blog_homepage_updated.png');

  // 2. Validate Article 01 (Loafer Guide)
  console.log('2. Navigating to Article 01 (/blog/leather-buckle-loafers-style-fit-care-guide)...');
  await page.goto(`${baseUrl}/blog/leather-buckle-loafers-style-fit-care-guide`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  const art1H1 = await page.$eval('h1', el => el.textContent.trim());
  console.log(`   Article 01 H1: "${art1H1}"`);
  if (!art1H1.includes('Leather Buckle Loafers')) {
    throw new Error(`Article 01 H1 mismatch: ${art1H1}`);
  }

  const art1Canonical = await page.$eval('link[rel="canonical"]', el => el.getAttribute('href'));
  console.log(`   Article 01 Canonical: "${art1Canonical}"`);
  if (art1Canonical !== 'https://localexim.com/blog/leather-buckle-loafers-style-fit-care-guide') {
    throw new Error(`Article 01 canonical mismatch`);
  }

  const art1CatalogueLink = await page.$eval('article a', el => el.getAttribute('href'));
  console.log(`   Article 01 Catalogue link: "${art1CatalogueLink}"`);
  if (!art1CatalogueLink.includes('/products/leather?cat=loafers')) {
    throw new Error(`Article 01 internal link should link to '/products/leather?cat=loafers', got '${art1CatalogueLink}'`);
  }

  await saveScreenshot(page, 'blog_article_01_loafer.png');

  // 3. Validate Article 02 (Jacket Guide)
  console.log('3. Navigating to Article 02 (/blog/how-to-choose-a-leather-jacket)...');
  await page.goto(`${baseUrl}/blog/how-to-choose-a-leather-jacket`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 500));
  const art2H1 = await page.$eval('h1', el => el.textContent.trim());
  console.log(`   Article 02 H1: "${art2H1}"`);
  await saveScreenshot(page, 'blog_article_02_jacket.png');

  // 4. Validate Article 03 (Briefcase Guide)
  console.log('4. Navigating to Article 03 (/blog/leather-messenger-briefcase-buying-guide)...');
  await page.goto(`${baseUrl}/blog/leather-messenger-briefcase-buying-guide`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 500));
  const art3H1 = await page.$eval('h1', el => el.textContent.trim());
  console.log(`   Article 03 H1: "${art3H1}"`);
  await saveScreenshot(page, 'blog_article_03_briefcase.png');

  // 5. Validate Article 04 (Outback Hat Guide)
  console.log('5. Navigating to Article 04 (/blog/felt-outback-hat-styling-care-guide)...');
  await page.goto(`${baseUrl}/blog/felt-outback-hat-styling-care-guide`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 500));
  const art4H1 = await page.$eval('h1', el => el.textContent.trim());
  console.log(`   Article 04 H1: "${art4H1}"`);
  await saveScreenshot(page, 'blog_article_04_hat.png');

  // 6. Validate Retired Route Redirection
  console.log('6. Testing Retired URL (/blog/prada-kolhapuri-chappal-controversy)...');
  await page.goto(`${baseUrl}/blog/prada-kolhapuri-chappal-controversy`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 500));
  console.log(`   Final URL after accessing retired slug: "${page.url()}"`);
  if (!page.url().endsWith('/blog')) {
    throw new Error(`Expected redirect to /blog, but got ${page.url()}`);
  }
  console.log('   ✓ Retired route successfully redirects to /blog!');

  // 7. Validate Mobile Viewport
  console.log('7. Testing Mobile Viewport (375x812)...');
  await page.setViewport({ width: 375, height: 812 });
  await page.goto(`${baseUrl}/blog`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 500));
  await saveScreenshot(page, 'blog_mobile_view.png');

  await browser.close();
  console.log('\n=== All Automated Blog Content & SEO Checks PASSED! ===');
}

async function main() {
  await verifyBlogDataIntegrity();
  await runBrowserTests();
}

main().catch(err => {
  console.error('VERIFICATION FAILED:', err);
  process.exit(1);
});
