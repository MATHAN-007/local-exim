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
  console.log('Launching browser to capture 15 languages deliverables...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Language Dropdown Open (showing all 15 languages, scrollable)
  console.log('1. Capturing language dropdown open with 15 languages...');
  await page.goto('http://127.0.0.1:5173/?lang=en', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));

  // Click the language switcher button
  const langBtn = await page.$('button[aria-label="Select language"]');
  if (langBtn) {
    await langBtn.click();
    await new Promise((r) => setTimeout(r, 400));
  }
  await saveScreenshot(page, 'language_dropdown_15.png', { fullPage: false });

  // 2. Japanese Full-Page Screenshot
  console.log('2. Capturing Japanese full-page screenshot (ja)...');
  await page.goto('http://127.0.0.1:5173/?lang=ja', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));
  // Scroll down and up to trigger lazy-loaded images
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight / 2);
    await new Promise((r) => setTimeout(r, 400));
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 500));
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 600));
  await saveScreenshot(page, 'japanese_fullpage.png', { fullPage: true });

  // 3. Turkish Full-Page Screenshot
  console.log('3. Capturing Turkish full-page screenshot (tr)...');
  await page.goto('http://127.0.0.1:5173/?lang=tr', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight / 2);
    await new Promise((r) => setTimeout(r, 400));
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 500));
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 600));
  await saveScreenshot(page, 'turkish_fullpage.png', { fullPage: true });

  await browser.close();
  console.log('All 15-languages screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
