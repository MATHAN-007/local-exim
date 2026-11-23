const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1280,900"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('1. Going to /products/leather...');
  await page.goto("http://127.0.0.1:5173/products/leather", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  console.log('2. Scrolling down 1500px on /products/leather...');
  await page.evaluate(() => window.scrollTo(0, 1500));
  await new Promise(r => setTimeout(r, 600));

  const scrollBefore = await page.evaluate(() => window.scrollY);
  console.log('Scroll position on leather page:', scrollBefore);

  console.log('3. Clicking "Home" link in navbar...');
  const homeLink = await page.$('nav a[href="/"]');
  if (homeLink) {
    await homeLink.click();
    await new Promise(r => setTimeout(r, 1000));
  }

  const scrollAfter = await page.evaluate(() => window.scrollY);
  const currentUrl = page.url();
  const titleAfter = await page.title();
  console.log('After clicking Home: URL =', currentUrl, '| scrollY =', scrollAfter, '| title =', titleAfter);

  await browser.close();
})();
