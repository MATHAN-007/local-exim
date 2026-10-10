import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const artifactDir = 'C:/Users/Admin/.gemini/antigravity-ide/brain/a6d28f90-b6cc-4661-8530-bf5135cb1a63';
const screenshotsDir = path.join(artifactDir, 'screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function saveScreenshot(page, filename, options = {}) {
  const filePath1 = path.join(artifactDir, filename);
  const filePath2 = path.join(screenshotsDir, filename);
  const buffer = await page.screenshot(options);
  fs.writeFileSync(filePath1, buffer);
  fs.writeFileSync(filePath2, buffer);
  console.log(`Saved screenshot: ${filename}`);
}

async function run() {
  console.log('Launching browser for blog & footer deliverables...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // 1. Home Featured Designs (Confirm NO price text)
  console.log('1. Capturing Home Featured Designs section without price text...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));

  await page.evaluate(() => {
    const el = document.getElementById('featured');
    if (el) el.scrollIntoView({ behavior: 'auto' });
  });
  await new Promise((r) => setTimeout(r, 600));

  const featuredEl = await page.$('#featured');
  if (featuredEl) {
    const buffer = await featuredEl.screenshot();
    fs.writeFileSync(path.join(artifactDir, 'home_featured_no_price.png'), buffer);
    fs.writeFileSync(path.join(screenshotsDir, 'home_featured_no_price.png'), buffer);
    console.log('Saved screenshot: home_featured_no_price.png');
  }

  // 2. Blog Page (/blog)
  console.log('2. Capturing /blog page...');
  await page.goto('http://127.0.0.1:5173/blog', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await saveScreenshot(page, 'blog_page.png', { fullPage: false });

  // 3. New Footer Desktop (with Back to Top + WhatsApp buttons)
  console.log('3. Capturing Desktop Footer with Back-to-Top and WhatsApp buttons...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    window.scrollTo({ top: 100000, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await saveScreenshot(page, 'footer_desktop.png', { fullPage: false });

  // 4. New Footer Mobile (375x812)
  console.log('4. Capturing Mobile Footer...');
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    window.scrollTo({ top: 100000, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await saveScreenshot(page, 'footer_mobile.png', { fullPage: false });

  await browser.close();
  console.log('All deliverable screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
