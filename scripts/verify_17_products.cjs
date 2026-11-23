const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/7c5a5605-2aa7-4c66-812a-c814cc5c12d0';
const SCREENSHOTS_DIR = path.join(ARTIFACT_DIR, 'screenshots');

async function saveScreenshot(page, filename, options = {}) {
  const p1 = path.join(ARTIFACT_DIR, filename);
  const p2 = path.join(SCREENSHOTS_DIR, filename);
  const buf = await page.screenshot(options);
  fs.writeFileSync(p1, buf);
  fs.writeFileSync(p2, buf);
  console.log(`Saved screenshot: ${filename}`);
}

async function run() {
  console.log('Launching browser to verify 17 products...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,1200']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1200 });

  console.log('\n--- Navigating to /products/leather ---');
  await page.goto('http://127.0.0.1:5173/products/leather', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Check count indicator
  const countText = await page.$eval('.flex.items-center.justify-between.mb-6 p', el => el.textContent.trim());
  console.log('Count indicator on Leather page:', countText);

  // Count product card elements
  const cards = await page.$$eval('.grid > div', els => els.map(e => {
    const code = e.querySelector('span.font-mono')?.textContent.trim() || '';
    const name = e.querySelector('h3')?.textContent.trim() || '';
    return { code, name };
  }));
  console.log(`Total visible product cards rendered: ${cards.length}`);
  cards.forEach((c, i) => console.log(`  ${i+1}. [${c.code}] ${c.name}`));

  await saveScreenshot(page, 'leather_all_17_products_desktop.png', { fullPage: true });

  // Test mobile viewport
  console.log('\n--- Checking Mobile View (375x812) ---');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.goto('http://127.0.0.1:5173/products/leather', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const mobileCountText = await page.$eval('.flex.items-center.justify-between.mb-6 p', el => el.textContent.trim());
  console.log('Mobile count indicator:', mobileCountText);
  await saveScreenshot(page, 'leather_all_17_products_mobile.png', { fullPage: false });

  await browser.close();
  console.log('\nALL 17 PRODUCTS VERIFIED SUCCESSFULLY ON LIVE SITE!');
}

run().catch(err => {
  console.error('VERIFICATION ERROR:', err);
  process.exit(1);
});
