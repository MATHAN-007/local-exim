import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const outDir = 'C:/Users/Admin/.gemini/antigravity-ide/brain/a6d28f90-b6cc-4661-8530-bf5135cb1a63/screenshots';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function preparePageForFullCapture(page) {
  // Scroll down smoothly to trigger any lazy images
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 350;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 80);
    });
  });
  await new Promise((r) => setTimeout(r, 800));
}

async function runCapture() {
  console.log('Launching headless browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // 1. Desktop Viewport (1440x900)
  console.log('Capturing Desktop Viewport...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await preparePageForFullCapture(page);

  await page.screenshot({
    path: path.join(outDir, 'desktop.png'),
    fullPage: false,
  });

  await page.screenshot({
    path: path.join(outDir, 'desktop_full.png'),
    fullPage: true,
  });

  // 2. Mobile Viewport (375x812)
  console.log('Capturing Mobile Viewport...');
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await preparePageForFullCapture(page);

  await page.screenshot({
    path: path.join(outDir, 'mobile.png'),
    fullPage: false,
  });

  await page.screenshot({
    path: path.join(outDir, 'mobile_full.png'),
    fullPage: true,
  });

  // 3. Arabic RTL Viewport (1440x900)
  console.log('Capturing Arabic RTL Viewport...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://127.0.0.1:5173/?lang=ar', { waitUntil: 'networkidle0' });
  // Wait until Arabic translation is loaded
  await page.waitForFunction(() => {
    return document.documentElement.getAttribute('dir') === 'rtl' &&
      document.querySelector('h1')?.innerText.includes('صنادل');
  }, { timeout: 8000 }).catch(() => console.log('Timeout waiting for Arabic h1 text, continuing...'));

  await preparePageForFullCapture(page);

  await page.screenshot({
    path: path.join(outDir, 'arabic_rtl.png'),
    fullPage: false,
  });

  await page.screenshot({
    path: path.join(outDir, 'arabic_full.png'),
    fullPage: true,
  });

  console.log('Auditing DOM and Meta...');
  const audit = await page.evaluate(() => {
    return {
      title: document.title,
      dir: document.documentElement.getAttribute('dir'),
      lang: document.documentElement.getAttribute('lang'),
      h1: document.querySelector('h1')?.innerText,
      headingsCount: document.querySelectorAll('h1, h2, h3').length,
      imagesTotal: document.querySelectorAll('img').length,
      imagesMissingAlt: Array.from(document.querySelectorAll('img')).filter((img) => !img.alt).length,
    };
  });

  console.log('Audit Summary:', JSON.stringify(audit, null, 2));

  await browser.close();
  console.log('Capture & Audit finished successfully!');
}

runCapture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
