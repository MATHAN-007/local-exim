const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/7c5a5605-2aa7-4c66-812a-c814cc5c12d0';
const SCREENSHOTS_DIR = path.join(ARTIFACT_DIR, 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function saveScreenshot(page, filename, options = {}) {
  const p1 = path.join(ARTIFACT_DIR, filename);
  const p2 = path.join(SCREENSHOTS_DIR, filename);
  const buf = await page.screenshot(options);
  fs.writeFileSync(p1, buf);
  fs.writeFileSync(p2, buf);
  console.log(`Saved screenshot: ${filename}`);
}

async function run() {
  console.log('Launching browser for verification...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  const page = await browser.newPage();

  // Listen to page errors
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('PAGE LOG ERROR:', msg.text());
  });

  console.log('\n--- 1. Testing /products Landing Page (Desktop: 1280x900) ---');
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://127.0.0.1:5173/products', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const pageTitle = await page.title();
  console.log('Page Title:', pageTitle);

  // Check section cards
  const cards = await page.$$eval('a[href^="/products/"]', els => els.map(e => ({
    href: e.getAttribute('href'),
    title: e.querySelector('h2') ? e.querySelector('h2').textContent.trim() : ''
  })));
  console.log('Landing cards detected:', cards);

  await saveScreenshot(page, 'products_landing_desktop.png', { fullPage: false });

  console.log('\n--- 2. Testing /products Landing Page (Mobile: 360x780) ---');
  await page.setViewport({ width: 360, height: 780, isMobile: true, hasTouch: true });
  await page.goto('http://127.0.0.1:5173/products', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  await saveScreenshot(page, 'products_landing_mobile.png', { fullPage: false });

  console.log('\n--- 3. Testing /products/leather Page (Desktop: 1280x900) ---');
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://127.0.0.1:5173/products/leather', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Check that NO prices exist on the leather products page
  const pageText = await page.content();
  const hasInrSymbol = pageText.includes('₹');
  console.log('Leather page has INR symbol (should be false):', hasInrSymbol);

  // Check product count on initial "All"
  const visibleCardsCount = await page.$$eval('.grid > div', els => els.length);
  console.log('Visible product cards on "All":', visibleCardsCount, '(expected 12)');

  // Verify that the 4 excluded products are NOT rendered
  const excludedIds = [
    'monogram-snap-purse',
    'multipocket-leather-backpack',
    'reversible-leather-belt',
    'dalery-crossbody-bag'
  ];
  for (const id of excludedIds) {
    const found = pageText.includes(`/leather/${id}.webp`);
    console.log(`Excluded product ${id} rendered? ${found} (must be false)`);
  }

  // Check Category Chips
  const chipsText = await page.$$eval('.sticky button', els => els.map(e => e.textContent.trim()));
  console.log('Category filter chips count:', chipsText.length, 'Chips:', chipsText);

  console.log('\n--- 4. Testing Subcategory Filter Active (e.g. Hats or Jackets) ---');
  // Click on "Leather Jackets" or "Hats" chip
  const hatBtn = await page.waitForSelector('button::-p-text(Hats), button::-p-text(Leather Jackets)', { timeout: 4000 });
  if (hatBtn) {
    const btnText = await hatBtn.evaluate(el => el.textContent.trim());
    console.log(`Clicking filter chip: "${btnText}"...`);
    await hatBtn.click();
    await new Promise(r => setTimeout(r, 600));
    console.log('URL after filter click:', page.url());
    await saveScreenshot(page, 'leather_filter_active.png', { fullPage: false });
  }

  console.log('\n--- 5. Testing Empty State ("Bags" subcategory) ---');
  const bagsBtn = await page.waitForSelector('button::-p-text(Bags)', { timeout: 4000 });
  if (bagsBtn) {
    console.log('Clicking "Bags" chip (zero visible products)...');
    await bagsBtn.click();
    await new Promise(r => setTimeout(r, 600));
    console.log('URL after clicking Bags:', page.url());

    const emptyText = await page.$eval('.bg-white.rounded-3xl h3', el => el.textContent.trim());
    console.log('Empty state heading displayed:', emptyText);
    await saveScreenshot(page, 'leather_bags_empty_state.png', { fullPage: false });
  }

  console.log('\n--- 6. Testing Redirect from /catalogue?cat=men-kolhapuri ---');
  console.log('Navigating directly to http://127.0.0.1:5173/catalogue?cat=men-kolhapuri ...');
  await page.goto('http://127.0.0.1:5173/catalogue?cat=men-kolhapuri', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  const finalUrl = page.url();
  console.log('Target URL reached after redirect:', finalUrl);
  const redirectSuccess = finalUrl.includes('/products/chappals?cat=men-kolhapuri');
  console.log('Redirect succeeded (/catalogue?cat=men-kolhapuri -> /products/chappals?cat=men-kolhapuri):', redirectSuccess);

  // Verify that Catalogue page rendered and active chip is Men Kolhapuri
  const activeChip = await page.$eval('.sticky button.bg-forest-900', el => el.textContent.trim());
  console.log('Active chip on Chappals page:', activeChip);
  await saveScreenshot(page, 'catalogue_redirect_verified.png', { fullPage: false });

  console.log('\n--- 7. Testing Navbar Dropdown (Products) ---');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Find Products dropdown in Navbar
  const productsNavHover = await page.$('nav .group');
  if (productsNavHover) {
    await productsNavHover.hover();
    await new Promise(r => setTimeout(r, 400));
    const dropdownLinks = await page.$$eval('nav .group .w-56 a', els => els.map(e => ({
      text: e.textContent.trim(),
      href: e.getAttribute('href')
    })));
    console.log('Products nav dropdown items:', dropdownLinks);
    await saveScreenshot(page, 'products_nav_dropdown.png', {
      clip: { x: 0, y: 0, width: 1280, height: 260 }
    });
  }

  console.log('\n--- 8. Testing Mobile Drawer (Products Link) ---');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const hamburger = await page.$('button[aria-controls="mobile-navigation-drawer"], button[aria-label*="menu"], button[aria-label="Open menu"]');
  if (hamburger) {
    await hamburger.click();
    await new Promise(r => setTimeout(r, 500));
    await saveScreenshot(page, 'mobile_drawer_products.png', { fullPage: false });
  }

  await browser.close();
  console.log('\nALL PUPPETEER VERIFICATION TESTS FINISHED SUCCESSFULLY!');
}

run().catch(err => {
  console.error('VERIFICATION ERROR:', err);
  process.exit(1);
});
