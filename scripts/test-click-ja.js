import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5173/?lang=en', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // Open dropdown and click JA
  await page.click('button[aria-label="Select language"]');
  await new Promise(r => setTimeout(r, 300));
  
  const clicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const jaBtn = btns.find(b => b.innerText.includes('JA') || b.innerText.includes('日本語'));
    if (jaBtn) { jaBtn.click(); return true; }
    return false;
  });
  console.log('Clicked JA:', clicked);
  await new Promise(r => setTimeout(r, 1200));

  const text = await page.evaluate(() => {
    return {
      h1: document.querySelector('h1')?.innerText,
      aboutTitle: document.querySelector('#about h2')?.innerText,
      whyTitle: document.querySelector('#why h2')?.innerText,
      collectionsTitle: document.querySelector('#collections h2')?.innerText,
      orderTitle: document.querySelector('#how-to-order h2')?.innerText,
      footerTagline: document.querySelector('footer p')?.innerText
    };
  });
  console.log(JSON.stringify(text, null, 2));
  await browser.close();
})();
