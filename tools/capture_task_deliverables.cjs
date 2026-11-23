const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const ARTIFACT_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/7c5a5605-2aa7-4c66-812a-c814cc5c12d0';
const SCREENSHOTS_DIR = path.join(ARTIFACT_DIR, 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function saveScreenshot(elementOrPage, filename) {
  const p1 = path.join(ARTIFACT_DIR, filename);
  const p2 = path.join(SCREENSHOTS_DIR, filename);
  const buf = await elementOrPage.screenshot();
  fs.writeFileSync(p1, buf);
  fs.writeFileSync(p2, buf);
  console.log(`Saved screenshot: ${filename}`);
}

async function run() {
  console.log('=== Capturing Task.md Deliverable Screenshots ===\n');
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  // 1. Desktop captures
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  // Switch hero slide to slide 2 (Biker Leather Jacket) or slide 4 (Briefcase)
  console.log('1. Switching hero slide to leather product (Slide 2: Biker Leather Jacket)...');
  await page.click('button[aria-label="Show design 2"]');
  await new Promise(r => setTimeout(r, 700)); // wait for crossfade transition
  const heroSection = await page.$('#hero');
  await saveScreenshot(heroSection, 'hero_leather_slide_desktop.png');

  // 2. Mobile Hero capture
  console.log('2. Capturing Mobile Hero with Leather Slide (375x812)...');
  await page.setViewport({ width: 375, height: 812 });
  await new Promise(r => setTimeout(r, 400));
  await page.click('button[aria-label="Show design 2"]');
  await new Promise(r => setTimeout(r, 700));
  const mobileHeroSection = await page.$('#hero');
  await saveScreenshot(mobileHeroSection, 'hero_leather_slide_mobile.png');

  // Restore Desktop Viewport for remaining sections
  await page.setViewport({ width: 1280, height: 900 });
  await new Promise(r => setTimeout(r, 400));

  // 3. "Our Collections" Section
  console.log('3. Capturing Collections section showing both product line cards...');
  const collectionsSection = await page.$('#collections');
  await saveScreenshot(collectionsSection, 'collections_dual_cards.png');

  // 4. "Featured Designs" with Leather Tab Active
  console.log('4. Clicking Leather tab in Featured Designs section...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('#featured button'));
    const leatherBtn = btns.find(b => b.textContent.includes('Leather'));
    if (leatherBtn) leatherBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  const featuredSection = await page.$('#featured');
  await saveScreenshot(featuredSection, 'featured_designs_leather_tab.png');

  // 5. Updated Footer
  console.log('5. Capturing updated Footer showing both Chappals and Leather groups...');
  const footerElement = await page.$('footer');
  await saveScreenshot(footerElement, 'footer_updated_groups.png');

  await browser.close();
  console.log('\n======================================================');
  console.log('ALL DELIVERABLE SCREENSHOTS CAPTURED SUCCESSFULLY!');
  console.log('======================================================');
}

run().catch(err => {
  console.error('\nCAPTURE FAILED:', err);
  process.exit(1);
});
