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
  console.log('Launching Chrome via Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Desktop Language Dropdown
  console.log('1. Capturing Desktop Language Dropdown...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));

  const langBtn = await page.waitForSelector('button[aria-label="Select language"]', { timeout: 5000 });
  if (langBtn) {
    await langBtn.click();
    await new Promise((r) => setTimeout(r, 400));
    // Capture the top area with the open 2-column dropdown
    await saveScreenshot(page, 'desktop_language_dropdown.png', {
      clip: { x: 0, y: 0, width: 1440, height: 420 },
    });
  }

  // 2. Footer with new contact details
  console.log('2. Capturing Footer with new contact details...');
  // Click somewhere to close dropdown, then scroll to footer
  await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'auto' });
    }
  });
  await new Promise((r) => setTimeout(r, 600));

  const footerEl = await page.$('footer');
  if (footerEl) {
    const box = await footerEl.boundingBox();
    if (box) {
      // Screenshot footer specifically
      const buffer = await footerEl.screenshot();
      fs.writeFileSync(path.join(artifactDir, 'footer_new_contact.png'), buffer);
      fs.writeFileSync(path.join(screenshotsDir, 'footer_new_contact.png'), buffer);
      console.log('Saved screenshot: footer_new_contact.png');
    }
  }

  // 3. Blog empty-state page
  console.log('3. Capturing Blog empty-state page...');
  await page.goto('http://127.0.0.1:5173/blog', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await saveScreenshot(page, 'blog_empty_state.png', {
    fullPage: false,
  });

  await browser.close();
  console.log('All 3 task screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
