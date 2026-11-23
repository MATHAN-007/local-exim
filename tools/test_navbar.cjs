const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1280,900"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 1000));
  
  const navBox = await page.$eval("header", el => {
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      width: rect.width,
      height: rect.height,
      transform: style.transform,
      opacity: style.opacity,
      position: style.position
    };
  });
  console.log("Header box at scroll 0:", navBox);

  // Scroll down 200px
  await page.evaluate(() => window.scrollTo(0, 200));
  await new Promise(r => setTimeout(r, 400));
  const navBoxScrolled = await page.$eval("header", el => {
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return {
      top: rect.top,
      bottom: rect.bottom,
      transform: style.transform,
      opacity: style.opacity,
      classes: el.className
    };
  });
  console.log("Header box at scroll 200:", navBoxScrolled);

  // Scroll up 50px
  await page.evaluate(() => window.scrollTo(0, 150));
  await new Promise(r => setTimeout(r, 400));
  const navBoxUp = await page.$eval("header", el => {
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return {
      top: rect.top,
      bottom: rect.bottom,
      transform: style.transform,
      opacity: style.opacity,
      classes: el.className
    };
  });
  console.log("Header box at scroll 150:", navBoxUp);

  await browser.close();
})();
