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
  const buf = await elementOrPage.screenshot();
  fs.writeFileSync(p1, buf);
  fs.writeFileSync(p2, buf);
  console.log(`Saved screenshot: ${filename}`);
}

async function verifyJsonIntegrity() {
  console.log('=== Step 1: Validating leatherProducts.json Integrity ===');
  const jsonPath = path.join(__dirname, '../src/data/leatherProducts.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  if (!Array.isArray(data.products)) throw new Error('data.products must be an array');
  console.log(`Total products: ${data.products.length}`);
  if (data.products.length !== 21) {
    throw new Error(`Expected exactly 21 products, found ${data.products.length}`);
  }

  // Check unique IDs and Codes
  const ids = new Set();
  const codes = new Set();
  for (const p of data.products) {
    if (ids.has(p.id)) throw new Error(`Duplicate product id: ${p.id}`);
    if (codes.has(p.code)) throw new Error(`Duplicate product code: ${p.code}`);
    if (p.excludeUntilReview) throw new Error(`Product ${p.id} still has excludeUntilReview: true`);
    ids.add(p.id);
    codes.add(p.code);

    // Verify image exists
    const imgDiskPath = path.join(__dirname, '../public', p.image.replace(/^\//, ''));
    if (!fs.existsSync(imgDiskPath)) {
      throw new Error(`Image file missing on disk: ${imgDiskPath} for product ${p.id}`);
    }
  }

  // Check categories: shoes must not exist, loafers must exist
  const catIds = data.categories.map(c => c.id);
  if (catIds.includes('shoes')) throw new Error("'shoes' category still present in leatherProducts.json categories!");
  if (!catIds.includes('loafers')) throw new Error("'loafers' category missing from leatherProducts.json categories!");

  // Verify the 6 missing products
  const missing6 = [
    { id: 'reversible-leather-belt', cat: 'belts', code: 'BL-01' },
    { id: 'multipocket-leather-backpack', cat: 'laptop-bags', code: 'LB-02' },
    { id: 'monogram-snap-purse', cat: 'ladies-purse', code: 'LP-01' },
    { id: 'messenger-briefcase-bag-alt', cat: 'laptop-bags', code: 'LB-04' },
    { id: 'dalery-crossbody-bag', cat: 'ladies-handbags', code: 'LH-03' },
    { id: 'buckle-loafer', cat: 'loafers', code: 'SH-01' }
  ];

  for (const m of missing6) {
    const found = data.products.find(p => p.id === m.id);
    if (!found) throw new Error(`Missing product not found in JSON: ${m.id}`);
    if (found.category !== m.cat) throw new Error(`Product ${m.id} in wrong category: ${found.category}, expected: ${m.cat}`);
    if (found.code !== m.code) throw new Error(`Product ${m.id} has code ${found.code}, expected ${m.code}`);
    console.log(`  ✓ Verified: ${m.id} (code: ${m.code}, cat: ${m.cat})`);
  }

  // Verify Kolhapuri chappals
  const chappals = data.products.filter(p => p.category === 'kolhapuri-chappals-loafers');
  if (chappals.length !== 4) {
    throw new Error(`Expected 4 Kolhapuri chappals in 'kolhapuri-chappals-loafers', got ${chappals.length}`);
  }
  console.log(`  ✓ Verified 4 Kolhapuri chappals: ${chappals.map(c => c.code).join(', ')}`);

  console.log('✓ leatherProducts.json validation passed!\n');
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
  console.log('=== Step 2: Browser UI Validation ===');
  const port = (await isPortOpen(5173)) ? 5173 : (await isPortOpen(4173)) ? 4173 : null;
  if (!port) {
    throw new Error('Neither port 5173 nor 4173 is responding. Please start dev or preview server.');
  }
  console.log(`Using server on port: ${port}`);
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1280,900"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE ERROR:', msg.text());
      errors.push(msg.text());
    }
  });

  // A. All 21 products visible on /products/leather
  console.log('Navigating to /products/leather...');
  await page.goto(`${baseUrl}/products/leather`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  const countTextAll = await page.$eval('.flex.items-center.justify-between.mb-6 p', el => el.textContent.trim());
  console.log(`Designs count under All: "${countTextAll}"`);
  if (!countTextAll.includes('21 of 21')) {
    throw new Error(`Expected count text to contain '21 of 21', got '${countTextAll}'`);
  }

  const allCards = await page.$$eval('main .grid > div', els => els.length);
  console.log(`Rendered cards on All: ${allCards}`);
  if (allCards !== 21) {
    throw new Error(`Expected 21 product cards rendered, got ${allCards}`);
  }

  await saveScreenshot(page, 'leather_21_all_products.png');

  // B. Loafers category
  console.log('Navigating to /products/leather?cat=loafers...');
  await page.goto(`${baseUrl}/products/leather?cat=loafers`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  const countTextLoafers = await page.$eval('.flex.items-center.justify-between.mb-6 p', el => el.textContent.trim());
  console.log(`Designs count under Loafers: "${countTextLoafers}"`);
  if (!countTextLoafers.includes('1 of 1')) {
    throw new Error(`Expected count text to contain '1 of 1', got '${countTextLoafers}'`);
  }

  const loaferCards = await page.$$eval('main .grid > div', els => els.length);
  console.log(`Rendered cards on Loafers: ${loaferCards}`);
  if (loaferCards !== 1) {
    throw new Error(`Expected 1 loafer card rendered, got ${loaferCards}`);
  }

  const loaferName = await page.$eval('main .grid > div h3', el => el.textContent.trim());
  console.log(`Loafer product name: "${loaferName}"`);
  if (!loaferName.toLowerCase().includes('loafer')) {
    throw new Error(`Expected loafer card to be 'Leather Buckle Loafer', got '${loaferName}'`);
  }

  await saveScreenshot(page, 'leather_loafers_category.png');

  // C. Kolhapuri Chappals
  console.log('Navigating to /products/leather?cat=kolhapuri-chappals-loafers...');
  await page.goto(`${baseUrl}/products/leather?cat=kolhapuri-chappals-loafers`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  const countTextChappals = await page.$eval('.flex.items-center.justify-between.mb-6 p', el => el.textContent.trim());
  console.log(`Designs count under Kolhapuri Chappals: "${countTextChappals}"`);
  if (!countTextChappals.includes('4 of 4')) {
    throw new Error(`Expected count text to contain '4 of 4', got '${countTextChappals}'`);
  }

  const chappalCards = await page.$$eval('main .grid > div', els => els.length);
  console.log(`Rendered cards on Kolhapuri Chappals: ${chappalCards}`);
  if (chappalCards !== 4) {
    throw new Error(`Expected 4 chappal cards, got ${chappalCards}`);
  }

  await saveScreenshot(page, 'leather_chappals_4_items.png');

  // D. Laptop Bags (must be 4: LB-01, LB-02, LB-03, LB-04)
  console.log('Navigating to /products/leather?cat=laptop-bags...');
  await page.goto(`${baseUrl}/products/leather?cat=laptop-bags`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  const countTextLaptopBags = await page.$eval('.flex.items-center.justify-between.mb-6 p', el => el.textContent.trim());
  console.log(`Designs count under Laptop Bags: "${countTextLaptopBags}"`);
  if (!countTextLaptopBags.includes('4 of 4')) {
    throw new Error(`Expected count text to contain '4 of 4', got '${countTextLaptopBags}'`);
  }

  // E. Navbar Loafers link check
  console.log('Checking Navbar links on Home page...');
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 500));
  await page.hover('nav div.relative.group');
  await new Promise(r => setTimeout(r, 300));
  const dropdownLinks = await page.$$eval('nav div.relative.group a', els => els.map(a => ({ text: a.textContent.trim(), href: a.getAttribute('href') })));
  console.log('Navbar dropdown links:', dropdownLinks);
  const loaferLink = dropdownLinks.find(l => l.href.includes('cat=loafers'));
  if (!loaferLink) {
    throw new Error("Navbar dropdown does not have a link to 'cat=loafers'");
  }
  console.log(`  ✓ Navbar has loafer link: "${loaferLink.text}" -> "${loaferLink.href}"`);

  await browser.close();
  console.log('\n=== All Automated Checks PASSED Perfectly! ===');
}

async function main() {
  await verifyJsonIntegrity();
  await runBrowserTests();
}

main().catch(err => {
  console.error('VERIFICATION ERROR:', err);
  process.exit(1);
});
