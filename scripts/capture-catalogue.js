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
  console.log('Launching browser for catalogue screenshots...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // 1. /catalogue desktop with active category filter
  console.log('1. Capturing /catalogue desktop with active category filter (?cat=men-kolhapuri)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://127.0.0.1:5173/catalogue?cat=men-kolhapuri', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));

  await saveScreenshot(page, 'catalogue_desktop_filtered.png', {
    fullPage: false,
  });

  // 2. /catalogue mobile (375x812)
  console.log('2. Capturing /catalogue mobile...');
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://127.0.0.1:5173/catalogue', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));

  await saveScreenshot(page, 'catalogue_mobile.png', {
    fullPage: false,
  });

  // 3. Navbar with Catalogue dropdown open
  console.log('3. Capturing navbar with Catalogue dropdown open...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2, isMobile: false });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));

  // Click the Catalogue dropdown chevron button
  const toggleBtn = await page.waitForSelector('button[aria-label="Toggle Catalogue Menu"]', { timeout: 5000 });
  if (toggleBtn) {
    await toggleBtn.click();
    console.log('Clicked Toggle Catalogue Menu button');
  }

  await new Promise((r) => setTimeout(r, 400));

  await saveScreenshot(page, 'navbar_catalogue_dropdown.png', {
    clip: { x: 0, y: 0, width: 1440, height: 360 },
  });

  await browser.close();
  console.log('All catalogue screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
