const puppeteer = require("puppeteer");
const path = require("path");

const ARTIFACT_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/7c5a5605-2aa7-4c66-812a-c814cc5c12d0';

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1280,900"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('--- 1. Checking Home Page (/) ---');
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  const homeSections = await page.$$eval('main > *', els => els.map(e => ({
    id: e.id || e.tagName,
    classes: e.className,
    height: e.getBoundingClientRect().height
  })));
  console.log('Home main children:', homeSections);

  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'debug_home_top.png') });

  // Scroll to bottom of Home
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'debug_home_bottom.png') });

  console.log('--- 2. Checking /products Page ---');
  await page.goto("http://127.0.0.1:5173/products", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'debug_products_landing.png') });

  console.log('--- 3. Checking /products/chappals Page ---');
  await page.goto("http://127.0.0.1:5173/products/chappals", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'debug_products_chappals.png') });

  console.log('--- 4. Checking /products/leather Page ---');
  await page.goto("http://127.0.0.1:5173/products/leather", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'debug_products_leather.png') });

  await browser.close();
  console.log('Screenshots captured.');
})();
