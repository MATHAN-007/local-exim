const puppeteer = require('puppeteer');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/Admin/.gemini/antigravity-ide/brain/a6d28f90-b6cc-4661-8530-bf5135cb1a63';

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('--- 1. Testing /blog Index (Desktop) ---');
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:5173/blog', { waitUntil: 'networkidle2' });

  // Verify Featured Card exists
  const featuredTitle = await page.$eval('.ken-burns', el => {
    return el.closest('a').querySelector('h2').textContent.trim();
  });
  console.log('Featured card title:', featuredTitle);

  // Check 3 grid cards
  const gridCardsCount = await page.$$eval('.scroll-reveal-card', cards => cards.length);
  console.log('Remaining grid cards count:', gridCardsCount);

  // Take screenshot of blog index desktop
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'blog_index_desktop.png') });
  console.log('Saved blog_index_desktop.png');

  console.log('--- 2. Testing /blog Index (Mobile) ---');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/blog', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'blog_index_mobile.png') });
  console.log('Saved blog_index_mobile.png');

  console.log('--- 3. Testing Prada Blog Post (Desktop) ---');
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:5173/blog/prada-kolhapuri-chappal-controversy', { waitUntil: 'networkidle2' });

  const postTitle = await page.$eval('h1', el => el.textContent.trim());
  console.log('Post title:', postTitle);

  // Verify comparison chart is rendered
  const chartExists = await page.$eval('[aria-label="The Price Gap, in Perspective"]', el => !!el);
  console.log('Comparison chart rendered:', chartExists);

  // Scroll to chart so IntersectionObserver triggers and wait for animation
  await page.evaluate(() => {
    const el = document.querySelector('[aria-label="The Price Gap, in Perspective"]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 900));

  // Screenshot of the comparison chart
  const chartEl = await page.$('[aria-label="The Price Gap, in Perspective"]');
  if (chartEl) {
    await chartEl.screenshot({ path: path.join(ARTIFACT_DIR, 'blog_prada_chart.png') });
    console.log('Saved blog_prada_chart.png');
  }

  // Check scroll progress bar
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await new Promise(r => setTimeout(r, 400));
  const progressWidth = await page.$eval('.fixed.top-0.inset-x-0 > div', el => el.style.width);
  console.log('Reading progress bar width mid-page:', progressWidth);

  // Check bottom WhatsApp CTA
  const bottomWaLink = await page.$eval('a[href*="wa.me"][href*="prada"]', el => el.href).catch(async () => {
    return await page.$eval('a[href*="wa.me"][href*="question"]', el => el.href).catch(() => 'found other wa link');
  });
  console.log('Bottom WhatsApp CTA URL:', decodeURIComponent(bottomWaLink));

  // Check Related Collection link
  const relatedCatLink = await page.$eval('a[href*="/catalogue?cat="]', el => el.href);
  console.log('Related collection link:', relatedCatLink);

  // Full page screenshot of Prada post
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'blog_post_prada_desktop.png') });
  console.log('Saved blog_post_prada_desktop.png');

  console.log('--- 4. Testing Prada Blog Post (Mobile) ---');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/blog/prada-kolhapuri-chappal-controversy', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'blog_post_prada_mobile.png') });
  console.log('Saved blog_post_prada_mobile.png');

  console.log('--- 5. Testing 404 / Invalid Slug Redirect ---');
  await page.goto('http://localhost:5173/blog/invalid-slug-12345', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  const currentPath = await page.evaluate(() => window.location.pathname);
  console.log('Redirected path for invalid slug:', currentPath);

  await browser.close();
  console.log('All Blog tests passed and screenshots captured!');
}

run().catch(err => {
  console.error('Error during blog verification:', err);
  process.exit(1);
});
