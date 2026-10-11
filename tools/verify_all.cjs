const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/Admin/.gemini/antigravity-ide/brain/a6d28f90-b6cc-4661-8530-bf5135cb1a63';

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('--- 1. Testing PDF Download URL ---');
  const pdfRes = await page.goto('http://localhost:5173/downloads/Local-Exim-Catalogue.pdf');
  console.log('PDF response status:', pdfRes.status(), 'content-length:', pdfRes.headers()['content-length']);

  console.log('--- 2. Testing Desktop Home & Slideshow ---');
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });

  // Check initial active dot
  let activeDot = await page.$eval('button[aria-current="true"]', el => el.textContent.trim());
  console.log('Initial slide dot:', activeDot);

  // Wait 3.2 seconds for slideshow advance
  await new Promise(r => setTimeout(r, 3400));
  let advancedDot = await page.$eval('button[aria-current="true"]', el => el.textContent.trim());
  console.log('Advanced slide dot (after 3.4s):', advancedDot);

  // Capture hero desktop screenshot mid-slideshow
  const heroPathDesktop = path.join(ARTIFACT_DIR, 'hero_desktop_slideshow.png');
  const heroEl = await page.$('#hero');
  await heroEl.screenshot({ path: heroPathDesktop });
  console.log('Saved hero_desktop_slideshow.png');

  // Test Pause / Play Toggle
  const toggleBtn = await page.$('button[title="Pause slideshow"], button[aria-label="Pause slideshow"]');
  if (toggleBtn) {
    console.log('Pause toggle button found. Clicking to pause...');
    await toggleBtn.click();
    const pausedLabel = await page.$eval('button[title*="slideshow"]', el => el.getAttribute('aria-label'));
    console.log('After pause click, button label:', pausedLabel);
    
    // Wait another 3.4s to verify it stayed paused
    await new Promise(r => setTimeout(r, 3400));
    const stillDot = await page.$eval('button[aria-current="true"]', el => el.textContent.trim());
    console.log('Dot during pause:', stillDot, '(should match advancedDot:', advancedDot, ')');
  }

  // Check WhatsApp product links on Home
  const homeProductWaLink = await page.$eval('#featured a[href*="wa.me"]', el => el.href);
  console.log('Home Featured Product WhatsApp link sample:', decodeURIComponent(homeProductWaLink));

  // Capture Home Featured screenshot
  const featuredPath = path.join(ARTIFACT_DIR, 'home_featured_download.png');
  const featEl = await page.$('#featured');
  await featEl.screenshot({ path: featuredPath });
  console.log('Saved home_featured_download.png');

  // Capture footer desktop screenshot
  const footerPathDesktop = path.join(ARTIFACT_DIR, 'footer_desktop_download.png');
  const footerEl = await page.$('footer');
  await footerEl.screenshot({ path: footerPathDesktop });
  console.log('Saved footer_desktop_download.png');

  console.log('--- 3. Testing Desktop /catalogue ---');
  await page.goto('http://localhost:5173/catalogue', { waitUntil: 'networkidle2' });
  const catDownloadBtn = await page.$('a[href*="Local-Exim-Catalogue.pdf"]');
  console.log('Catalogue download button found on desktop:', !!catDownloadBtn);

  const catPathDesktop = path.join(ARTIFACT_DIR, 'catalogue_desktop_download.png');
  await page.screenshot({ path: catPathDesktop, fullPage: false });
  console.log('Saved catalogue_desktop_download.png');

  const catProductWaLink = await page.$eval('a[href*="wa.me"]', el => el.href);
  console.log('Catalogue Product WhatsApp link sample:', decodeURIComponent(catProductWaLink));

  console.log('--- 4. Testing Mobile View (375x812) ---');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });

  // Hero mobile screenshot
  const heroPathMobile = path.join(ARTIFACT_DIR, 'hero_mobile_slideshow.png');
  const heroElMobile = await page.$('#hero');
  await heroElMobile.screenshot({ path: heroPathMobile });
  console.log('Saved hero_mobile_slideshow.png');

  // Mobile /catalogue
  await page.goto('http://localhost:5173/catalogue', { waitUntil: 'networkidle2' });
  const catPathMobile = path.join(ARTIFACT_DIR, 'catalogue_mobile_download.png');
  await page.screenshot({ path: catPathMobile, fullPage: false });
  console.log('Saved catalogue_mobile_download.png');

  // Open mobile drawer
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  const hamburger = await page.$('button[aria-label*="menu"], button[aria-controls="mobile-navigation-drawer"]');
  if (hamburger) {
    await hamburger.click();
    await new Promise(r => setTimeout(r, 400));
    const drawerPath = path.join(ARTIFACT_DIR, 'mobile_drawer_download.png');
    await page.screenshot({ path: drawerPath });
    console.log('Saved mobile_drawer_download.png');
  }

  await browser.close();
  console.log('All automated checks & screenshots completed successfully!');
}

run().catch(err => {
  console.error('Error during test:', err);
  process.exit(1);
});
