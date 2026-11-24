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

async function run() {
  console.log('=== Step 1: Checking Server Status ===');
  const port = (await isPortOpen(4173)) ? 4173 : (await isPortOpen(5173)) ? 5173 : null;
  if (!port) {
    throw new Error('Server not running on port 4173 or 5173.');
  }
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`Testing against server on: ${baseUrl}`);

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => {
    if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
  });

  console.log('\n=== Step 2: Testing Homepage (1440px Desktop) ===');
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  // 1. Verify SEO
  const title = await page.title();
  console.log(`Page Title: "${title}"`);
  if (!title.includes('Leather Goods Exporter from India')) {
    throw new Error(`Expected title to include 'Leather Goods Exporter from India', got '${title}'`);
  }

  const metaDesc = await page.$eval('meta[name="description"]', el => el.getAttribute('content'));
  console.log(`Meta Description: "${metaDesc}"`);
  if (!metaDesc.includes('premium leather jackets, loafers, briefcases')) {
    throw new Error(`Meta description mismatch`);
  }

  // 2. Verify Navbar Structure
  console.log('Checking Navbar structure...');
  const navItems = await page.$$eval('header nav a, header nav button', els => els.map(e => e.textContent.trim()).filter(Boolean));
  console.log('Navbar elements detected:', navItems.slice(0, 8));
  const hasProducts = navItems.some(t => t.includes('Products') || t.includes('Catalogue'));
  const hasAbout = navItems.some(t => t.includes('About'));
  const hasWhy = navItems.some(t => t.includes('Why'));
  const hasContact = navItems.some(t => t.includes('Contact'));
  if (!hasProducts || !hasAbout || !hasWhy || !hasContact) {
    throw new Error('Navbar is missing key links!');
  }
  console.log('  ✓ Navbar structure preserved!');

  // 3. Section 01: Hero
  console.log('Checking Section 01: Hero...');
  const heroEyebrow = await page.$eval('#hero div span', el => el.textContent.trim());
  console.log(`  Hero Eyebrow: "${heroEyebrow}"`);
  const heroH1 = await page.$eval('#hero h1', el => el.textContent.trim());
  console.log(`  Hero H1: "${heroH1}"`);
  if (!heroH1.includes('From Indian Craft to Global Markets')) {
    throw new Error(`Hero H1 mismatch: ${heroH1}`);
  }
  const heroSection = await page.$('#hero');
  await saveScreenshot(heroSection, 'export_home_hero_desktop.png');

  // 4. Section 02: Export Value Proposition
  console.log('Checking Section 02: Export Value Proposition...');
  const aboutH2 = await page.$eval('#about h2', el => el.textContent.trim());
  console.log(`  About H2: "${aboutH2}"`);
  if (!aboutH2.includes('Bringing Indian Leather Goods to Global Markets')) {
    throw new Error(`Section 02 H2 mismatch: ${aboutH2}`);
  }
  const aboutSection = await page.$('#about');
  await saveScreenshot(aboutSection, 'export_home_value_prop.png');

  // 5. Section 03: Featured Export Catalogue
  console.log('Checking Section 03: Featured Export Catalogue...');
  const catH2 = await page.$eval('#collections h2', el => el.textContent.trim());
  console.log(`  Catalogue H2: "${catH2}"`);
  if (!catH2.includes('Explore Our Export Collection')) {
    throw new Error(`Section 03 H2 mismatch: ${catH2}`);
  }
  const productCards = await page.$$eval('#collections .grid > div', els => els.length);
  console.log(`  Rendered Featured Products: ${productCards}`);
  if (productCards !== 6) {
    throw new Error(`Expected exactly 6 featured export products, found ${productCards}`);
  }
  const collectionsSection = await page.$('#collections');
  await saveScreenshot(collectionsSection, 'export_home_catalogue_grid.png');

  // 6. Section 04: Verify Export Capabilities is REMOVED per user request
  console.log('Verifying Section 04 (Export Capabilities) is removed...');
  const capSectionExists = await page.$('#capabilities');
  if (capSectionExists) {
    throw new Error('Export Capabilities section should have been removed, but #capabilities was found!');
  }
  console.log('  ✓ Export Capabilities section verified removed.');

  // 7. Section 05: How Export Ordering Works
  console.log('Checking Section 05: How Export Ordering Works...');
  const howH2 = await page.$eval('#how-to-order h2', el => el.textContent.trim());
  console.log(`  How To Order H2: "${howH2}"`);
  const howSteps = await page.$$eval('#how-to-order .grid > div', els => els.length);
  console.log(`  Order Steps: ${howSteps}`);
  if (howSteps !== 5) {
    throw new Error(`Expected 5 order steps, got ${howSteps}`);
  }
  const howSection = await page.$('#how-to-order');
  await saveScreenshot(howSection, 'export_home_timeline.png');

  // 8. Section 06: Why Choose Local Exim
  console.log('Checking Section 06: Why Choose Local Exim...');
  const whyH2 = await page.$eval('#why-us h2', el => el.textContent.trim());
  console.log(`  Why Us H2: "${whyH2}"`);
  const whyCards = await page.$$eval('#why-us .grid > div', els => els.length);
  console.log(`  Why Us Advantages: ${whyCards}`);
  if (whyCards !== 6) {
    throw new Error(`Expected 6 advantage cards, got ${whyCards}`);
  }

  // 9. Section 07: Global Trade Visual
  console.log('Checking Section 07: Global Trade Visual...');
  const tradeH2 = await page.$eval('#global-trade h2', el => el.textContent.trim());
  console.log(`  Global Trade H2: "${tradeH2}"`);
  const tradeSection = await page.$('#global-trade');
  await saveScreenshot(tradeSection, 'export_home_global_trade.png');

  // 10. Section 08: Business Trust & Advantages
  console.log('Checking Section 08: Business Trust & Advantages...');
  const trustH2 = await page.$eval('#trust-advantages h2', el => el.textContent.trim());
  console.log(`  Trust H2: "${trustH2}"`);

  // 11. Section 09: Export FAQ
  console.log('Checking Section 09: Export FAQ...');
  const faqH2 = await page.$eval('#faq h2', el => el.textContent.trim());
  console.log(`  FAQ H2: "${faqH2}"`);
  const faqItems = await page.$$eval('#faq button', els => els.length);
  console.log(`  FAQ Items: ${faqItems}`);
  if (faqItems !== 8) {
    throw new Error(`Expected 8 FAQ items, found ${faqItems}`);
  }
  // Test FAQ click interaction
  const faqButtons = await page.$$('#faq button');
  if (faqButtons.length > 1) {
    await faqButtons[1].click();
  }
  await new Promise(r => setTimeout(r, 200));
  const faqSection = await page.$('#faq');
  await saveScreenshot(faqSection, 'export_home_faq.png');

  // 12. Section 10: Final Export Enquiry CTA & Contact
  console.log('Checking Section 10: Final Export Enquiry CTA & Contact...');
  const contactH2 = await page.$eval('#contact h2', el => el.textContent.trim());
  console.log(`  Contact H2: "${contactH2}"`);

  // 13. Mobile Viewport (390x844)
  console.log('\n=== Step 3: Testing Mobile Viewport (390x844) & Mobile Image Visibility ===');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  // Verify Hero Background image is visible on mobile
  const heroImgVisible = await page.$eval('#hero img', img => img.complete && img.naturalWidth > 0 && img.offsetHeight > 0);
  console.log(`  Mobile Hero Image Visible: ${heroImgVisible}`);
  if (!heroImgVisible) throw new Error('Hero background image is not properly loaded/visible on mobile');

  const heroMob = await page.$('#hero');
  await saveScreenshot(heroMob, 'export_home_mobile_hero.png');

  // Verify Value Proposition image is visible on mobile
  await page.evaluate(() => document.querySelector('#about')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 400));
  const aboutImgVisible = await page.$eval('#about img', img => img.complete && img.naturalWidth > 0 && img.offsetHeight > 0);
  console.log(`  Mobile Export Operations Image Visible: ${aboutImgVisible}`);
  if (!aboutImgVisible) throw new Error('Export operations image is not properly loaded/visible on mobile');

  const aboutMob = await page.$('#about');
  await saveScreenshot(aboutMob, 'export_home_mobile_value_prop.png');

  // Verify Featured Designs product images are visible and contain aspect
  const cards = await page.$$('#collections .grid > div');
  for (const card of cards) {
    await card.scrollIntoView();
    await new Promise(r => setTimeout(r, 150));
  }
  await new Promise(r => setTimeout(r, 500));
  const productImgsVisible = await page.$$eval('#collections img', imgs => imgs.every(img => img.complete && img.naturalWidth > 0 && img.offsetHeight > 0));
  console.log(`  Mobile Product Showcase Images Visible: ${productImgsVisible}`);
  if (!productImgsVisible) throw new Error('Product images in collections are not properly visible on mobile');

  const collectionsMob = await page.$('#collections');
  await saveScreenshot(collectionsMob, 'export_home_mobile_catalogue.png');

  // Verify Global Trade shipping image is visible on mobile (height > 200px)
  await page.evaluate(() => document.querySelector('#global-trade')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  const tradeImgHeight = await page.$eval('#global-trade img', img => img.offsetHeight);
  console.log(`  Mobile Global Trade Image Height: ${tradeImgHeight}px`);
  if (tradeImgHeight < 200) throw new Error(`Global trade image too small or collapsed: ${tradeImgHeight}px`);

  const tradeMob = await page.$('#global-trade');
  await saveScreenshot(tradeMob, 'export_home_mobile_global_trade.png');

  // Full mobile overview
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 400));
  await saveScreenshot(page, 'export_home_mobile_view.png');

  // 14. Verify Other Pages are completely intact
  console.log('\n=== Step 4: Verifying Unchanged Pages ===');
  // (a) Catalogue Page
  await page.goto(`${baseUrl}/products/leather`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 400));
  const leatherCount = await page.$eval('.flex.items-center.justify-between.mb-6 p', el => el.textContent.trim());
  console.log(`  Catalogue Designs: "${leatherCount}" (must be 21 of 21)`);
  if (!leatherCount.includes('21 of 21')) {
    throw new Error(`Catalogue page modified or broken: ${leatherCount}`);
  }

  // (b) Blog Page
  await page.goto(`${baseUrl}/blog`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 400));
  const blogH1 = await page.$eval('h1', el => el.textContent.trim());
  console.log(`  Blog H1: "${blogH1}"`);
  if (!blogH1.includes('Insights & Updates')) {
    throw new Error(`Blog page modified or broken: ${blogH1}`);
  }

  await browser.close();
  console.log('\n=== ALL HOMEPAGE REDESIGN VERIFICATIONS PASSED! ===');
}

run().catch(err => {
  console.error('VERIFICATION ERROR:', err);
  process.exit(1);
});
