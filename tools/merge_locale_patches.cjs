const fs = require('fs');
const path = require('path');

const PACK_PATCHES_DIR = 'D:/local-exim-leather-products-pack/locale-patches';
const LOCALES_DIR = path.join(__dirname, '../src/locales');

const langCodes = [
  'en', 'ar', 'es', 'fr', 'de', 'hi', 'zh', 'ta', 'ru', 'pt', 'ja', 'ko', 'it', 'tr', 'id'
];

console.log('--- Merging Locale Patches ---');
const results = [];

for (const code of langCodes) {
  const patchFile = path.join(PACK_PATCHES_DIR, `${code}.json`);
  const existingFile = path.join(LOCALES_DIR, `${code}.json`);

  if (!fs.existsSync(patchFile)) {
    throw new Error(`Patch file missing: ${patchFile}`);
  }
  if (!fs.existsSync(existingFile)) {
    throw new Error(`Existing locale missing: ${existingFile}`);
  }

  const origRaw = fs.readFileSync(existingFile, 'utf8');
  const patchRaw = fs.readFileSync(patchFile, 'utf8');

  const origLines = origRaw.split('\n').length;
  const origData = JSON.parse(origRaw);
  const patchData = JSON.parse(patchRaw);

  // Safety checks: ensure existing vital keys are present before merge
  if (!origData.hero || !origData.nav || !origData.catalogue) {
    throw new Error(`Corrupted existing file ${code}.json before merge`);
  }

  // Deep merge patch keys
  if (patchData.nav) {
    origData.nav = { ...origData.nav, ...patchData.nav };
  }
  if (patchData.productsLanding) {
    origData.productsLanding = patchData.productsLanding;
  }
  if (patchData.leather) {
    origData.leather = patchData.leather;
  }

  // Safety checks: ensure existing vital keys are still present after merge
  if (!origData.hero || !origData.collections || !origData.catalogue || !origData.nav.home) {
    throw new Error(`Merge dropped vital keys in ${code}.json`);
  }
  if (!origData.nav.products || !origData.productsLanding || !origData.leather) {
    throw new Error(`Merge failed to add new keys in ${code}.json`);
  }

  const newRaw = JSON.stringify(origData, null, 2) + '\n';
  const newLines = newRaw.split('\n').length;

  if (newLines <= origLines) {
    throw new Error(`Line count did not grow for ${code}.json: ${origLines} -> ${newLines}`);
  }

  fs.writeFileSync(existingFile, newRaw, 'utf8');
  results.push({ code, origLines, newLines, diff: newLines - origLines });
}

console.table(results);
console.log('All 15 locale files successfully merged and verified!');
