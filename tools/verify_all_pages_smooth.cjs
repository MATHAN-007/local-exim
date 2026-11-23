const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const ARTIFACT_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/7c5a5605-2aa7-4c66-812a-c814cc5c12d0';
const SCREENSHOTS_DIR = path.join(ARTIFACT_DIR, 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function saveScreenshot(page, filename, options = {}) {
  const p1 = path.join(ARTIFACT_DIR, filename);
  const p2 = path.join(SCREENSHOTS_DIR, filename);
  const buf = await page.screenshot(options);
  fs.writeFileSync(p1, buf);
  fs.writeFileSync(p2, buf);
  console.log(`Saved screenshot: ${filename}`);
}

async function run() {
  console.log('=== Testing Full Navbar Visibility, Smooth Navigation & 17 Products ===\n');
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

  // 1. Home page at top
  console.log('1. Checking Home page at top...');
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  let homeTitle = await page.title();
  console.log('   Home title:', homeTitle);

  let navBox = await page.$eval("header", el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, height: r.height, opacity: window.getComputedStyle(el).opacity };
  });
  console.log('   Navbar at top: top =', navBox.top, 'height =', navBox.height, 'opacity =', navBox.opacity);
  if (navBox.top < 0) throw new Error('Navbar is clipped off top!');

  await saveScreenshot(page, 'fixed_home_top.png');

  // 2. Scroll down on Home - verify navbar stays 100% visible and unclipped
  console.log('\n2. Scrolling down 400px on Home...');
  await page.evaluate(() => window.scrollTo(0, 400));
  await new Promise(r => setTimeout(r, 400));

  let navBoxScrolled = await page.$eval("header", el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, height: r.height, opacity: window.getComputedStyle(el).opacity };
  });
  console.log('   Navbar after scroll 400: top =', navBoxScrolled.top, 'height =', navBoxScrolled.height, 'opacity =', navBoxScrolled.opacity);
  if (navBoxScrolled.top < 0) throw new Error('Navbar is clipped when scrolled!');

  await saveScreenshot(page, 'fixed_home_scrolled.png');

  // 3. Test Navbar "Products" link
  console.log('\n3. Clicking "Products" in navbar to go to /products...');
  await page.click('nav a[href="/products"]');
  await new Promise(r => setTimeout(r, 800));

  console.log('   Current URL:', page.url());
  let scrollAfterProducts = await page.evaluate(() => window.scrollY);
  console.log('   ScrollY on /products (must be 0):', scrollAfterProducts);
  if (scrollAfterProducts !== 0) throw new Error('Scroll position was not reset to 0 on /products!');

  await saveScreenshot(page, 'fixed_products_landing.png');

  // 4. Click "Explore" on Leather products card
  console.log('\n4. Clicking Explore on Leather card...');
  await page.click('main a[href="/products/leather"]');
  await new Promise(r => setTimeout(r, 800));

  console.log('   Current URL:', page.url());
  let scrollAfterLeather = await page.evaluate(() => window.scrollY);
  console.log('   ScrollY on /products/leather (must be 0):', scrollAfterLeather);
  if (scrollAfterLeather !== 0) throw new Error('Scroll position was not reset to 0 on /products/leather!');

  let leatherDesignsCount = await page.$eval('.flex.items-center.justify-between.mb-6 p', el => el.textContent.trim());
  console.log('   Designs count text on Leather page:', leatherDesignsCount);

  // Count product cards rendered
  const productCardsCount = await page.$$eval('main .grid > div', els => els.length);
  console.log(`   Product cards rendered on page: ${productCardsCount} (must be 17)`);
  if (productCardsCount !== 17) {
    throw new Error(`Expected exactly 17 product cards, found ${productCardsCount}`);
  }

  await saveScreenshot(page, 'fixed_leather_all_17.png');

  // 5. Scroll down 1200px on leather page
  console.log('\n5. Scrolling down 1200px on leather page...');
  await page.evaluate(() => window.scrollTo(0, 1200));
  await new Promise(r => setTimeout(r, 400));
  let scrollDeep = await page.evaluate(() => window.scrollY);
  console.log('   Deep scrollY:', scrollDeep);

  // Check navbar still clickable, visible, and unclipped
  let navBoxDeep = await page.$eval("header", el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, height: r.height, opacity: window.getComputedStyle(el).opacity };
  });
  console.log('   Navbar at 1200px scroll: top =', navBoxDeep.top, 'height =', navBoxDeep.height, 'opacity =', navBoxDeep.opacity);
  if (navBoxDeep.top < 0) throw new Error('Navbar is clipped off screen at deep scroll!');

  // 6. Click "Home" link in navbar from deep scroll
  console.log('\n6. Clicking "Home" link in navbar from 1200px scroll...');
  await page.click('nav a[href="/"]');
  await new Promise(r => setTimeout(r, 1000));

  console.log('   Returned to URL:', page.url());
  let homeScrollY = await page.evaluate(() => window.scrollY);
  console.log('   ScrollY on Home page after navigation (must be 0):', homeScrollY);
  if (homeScrollY !== 0) throw new Error('Home page did not reset scroll to 0 (landing page stuck at bottom)!');

  let homeTitleRestored = await page.title();
  console.log('   Title on Home page (must be Local Exim tagline):', homeTitleRestored);
  if (!homeTitleRestored.includes('Global Trade')) throw new Error('Document title was not restored on Home!');

  await saveScreenshot(page, 'fixed_home_after_nav.png');

  // 7. Test Anchor Link Smooth Scrolling (e.g. click "About")
  console.log('\n7. Clicking "About" nav link...');
  await page.click('nav a[href="#about"]');
  await new Promise(r => setTimeout(r, 1200));

  let aboutBox = await page.$eval('#about', el => el.getBoundingClientRect().top);
  console.log('   About section position relative to viewport:', aboutBox);
  if (Math.abs(aboutBox) > 150) throw new Error('Anchor scroll to #about failed!');

  // 8. Test "Contact" nav link
  console.log('\n8. Clicking "Contact" nav link...');
  await page.click('nav a[href="#contact"]');
  await new Promise(r => setTimeout(r, 1200));

  let contactBox = await page.$eval('#contact', el => el.getBoundingClientRect().top);
  console.log('   Contact section position relative to viewport:', contactBox);

  // 9. Mobile Viewport Test (375x812)
  console.log('\n9. Testing Mobile Viewport (375x812)...');
  await page.setViewport({ width: 375, height: 812 });
  await page.goto("http://127.0.0.1:5173/products/leather", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  let mobileNavBox = await page.$eval("header", el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, height: r.height, opacity: window.getComputedStyle(el).opacity };
  });
  console.log('   Mobile Navbar top =', mobileNavBox.top, 'height =', mobileNavBox.height);
  if (mobileNavBox.top < 0) throw new Error('Mobile Navbar is clipped!');

  await saveScreenshot(page, 'fixed_leather_mobile.png');

  await browser.close();
  console.log('\n======================================================');
  console.log('ALL NAVBAR, VISIBILITY & SMOOTH SCROLLING CHECKS PASSED!');
  console.log('======================================================');
}

run().catch(err => {
  console.error('\nTEST RUNNER FAILED:', err);
  process.exit(1);
});
