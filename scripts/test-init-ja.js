import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  await page.goto('http://127.0.0.1:5173/?lang=ja', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const text = await page.evaluate(() => {
    return {
      h1: document.querySelector('h1')?.innerText,
      aboutTitle: document.querySelector('#about h2')?.innerText,
      hasBundle: window.__i18nBundleLoaded || false
    };
  });
  console.log('Result on initial load ?lang=ja:', JSON.stringify(text, null, 2));
  await browser.close();
})();
