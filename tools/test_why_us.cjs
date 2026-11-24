const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const ARTIFACT_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/7c5a5605-2aa7-4c66-812a-c814cc5c12d0';
const SCREENSHOTS_DIR = path.join(ARTIFACT_DIR, 'screenshots');

async function run() {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const viewports = [
    { name: "desktop_1440", width: 1440, height: 900 },
    { name: "tablet_768", width: 768, height: 1024 },
    { name: "mobile_390", width: 390, height: 844 },
    { name: "mobile_360", width: 360, height: 800 }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle2" });
    await page.evaluate(() => document.querySelector("#why-us")?.scrollIntoView());
    await new Promise(r => setTimeout(r, 600));

    const section = await page.$("#why-us");
    if (section) {
      const filename = `why_us_${vp.name}.png`;
      const buf = await section.screenshot();
      fs.writeFileSync(path.join(ARTIFACT_DIR, filename), buf);
      fs.writeFileSync(path.join(SCREENSHOTS_DIR, filename), buf);
      console.log(`Saved screenshot: ${filename}`);
    }

    // Check horizontal scroll / overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`Viewport ${vp.name} (${vp.width}px): Horizontal overflow = ${hasHorizontalOverflow}`);

    await page.close();
  }

  await browser.close();
  console.log("All viewport tests complete.");
}

run().catch(err => {
  console.error("Test error:", err);
  process.exit(1);
});
