const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const ARTIFACT_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/7c5a5605-2aa7-4c66-812a-c814cc5c12d0';
const SCREENSHOTS_DIR = path.join(ARTIFACT_DIR, 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function saveScreenshot(elementOrPage, filename) {
  const p1 = path.join(ARTIFACT_DIR, filename);
  const p2 = path.join(SCREENSHOTS_DIR, filename);
  const buf = await elementOrPage.screenshot();
  fs.writeFileSync(p1, buf);
  fs.writeFileSync(p2, buf);
  console.log(`Saved screenshot: ${filename}`);
}

async function run() {
  console.log('=== Verifying Unified Catalogue and Capturing Deliverables ===\n');
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1280,900"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  page.on('console', msg => {
    if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
  });

  // 1. Confirm Redirects
  console.log('1. Testing Redirects...');
  // (a) /catalogue?cat=ladies -> /products/leather
  await page.goto("http://127.0.0.1:5173/catalogue?cat=ladies", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 400));
  console.log('   /catalogue?cat=ladies redirected to:', page.url());
  if (!page.url().endsWith('/products/leather')) {
    throw new Error(`Expected redirect to /products/leather, got ${page.url()}`);
  }

  // (b) /products/chappals -> /products/leather
  await page.goto("http://127.0.0.1:5173/products/chappals", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 400));
  console.log('   /products/chappals redirected to:', page.url());
  if (!page.url().endsWith('/products/leather')) {
    throw new Error(`Expected redirect to /products/leather, got ${page.url()}`);
  }

  // (c) /products -> /products/leather
  await page.goto("http://127.0.0.1:5173/products", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 400));
  console.log('   /products redirected to:', page.url());
  if (!page.url().endsWith('/products/leather')) {
    throw new Error(`Expected redirect to /products/leather, got ${page.url()}`);
  }
  console.log('   Redirect checks PASSED!\n');

  // 2. Home Page & Navbar Dropdown
  console.log('2. Opening Home page and testing Navbar Dropdown...');
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 500));

  // Trigger Products dropdown
  await page.hover('nav div.relative.group');
  await new Promise(r => setTimeout(r, 400));
  const navHeader = await page.$('header');
  await saveScreenshot(navHeader, 'navbar_two_column_dropdown.png');

  // 3. Hero showing chappal slide (Slide 1: Sankeshwari Kolhapuri)
  console.log('3. Capturing Hero showing Chappal slide...');
  await page.click('button[aria-label="Show design 1"]');
  await new Promise(r => setTimeout(r, 600));
  const heroSection = await page.$('#hero');
  await saveScreenshot(heroSection, 'hero_chappal_slide.png');

  // 4. "Our Collections" section showing both new cards
  console.log('4. Capturing Our Collections section (2 cards: Kolhapuri Chappals & Loafers / Leather Jackets)...');
  const collectionsSection = await page.$('#collections');
  await saveScreenshot(collectionsSection, 'collections_2_cards.png');

  // 5. "Featured Designs" section: single-grid layout with its one Download button
  console.log('5. Capturing Featured Designs section (single-grid with one Download button)...');
  const featuredSection = await page.$('#featured');
  await saveScreenshot(featuredSection, 'featured_single_grid.png');

  // 6. /products/leather filtered to "Kolhapuri Chappals & Loafers"
  console.log('6. Navigating to /products/leather?cat=kolhapuri-chappals-loafers...');
  await page.goto("http://127.0.0.1:5173/products/leather?cat=kolhapuri-chappals-loafers", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  const countText = await page.$eval('.flex.items-center.justify-between.mb-6 p', el => el.textContent.trim());
  console.log('   Count text on filtered page:', countText);

  const productCardsCount = await page.$$eval('main .grid > div', els => els.length);
  console.log(`   Products rendered in Kolhapuri Chappals & Loafers: ${productCardsCount} (must be 5)`);
  if (productCardsCount !== 5) {
    throw new Error(`Expected 5 products, got ${productCardsCount}`);
  }

  await saveScreenshot(page, 'leather_chappals_and_loafers_5_items.png');

  // 7. Verify Empty state on empty subcategory (e.g. shoes)
  console.log('7. Testing empty subcategory (shoes)...');
  await page.goto("http://127.0.0.1:5173/products/leather?cat=shoes", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 500));
  const emptyStateH3 = await page.$eval('main h3', el => el.textContent.trim());
  console.log('   Empty/coming soon text displayed:', emptyStateH3);
  if (!emptyStateH3.includes('coming soon')) {
    throw new Error(`Expected coming soon message, got: ${emptyStateH3}`);
  }
  await saveScreenshot(page, 'leather_shoes_empty_state.png');

  await browser.close();
  console.log('\n======================================================');
  console.log('ALL VERIFICATIONS & DELIVERABLE SCREENSHOTS PASSED!');
  console.log('======================================================');
}

run().catch(err => {
  console.error('\nVERIFICATION RUNNER FAILED:', err);
  process.exit(1);
});
