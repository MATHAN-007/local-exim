const fs = require('fs');
const path = require('path');

const PACK_LOCALES_DIR = 'd:/local-exim-chappals-to-leather-pack/locale-patches';
const REAL_LOCALES_DIR = 'd:/documents/localexim/local-exim/src/locales';

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

function countKeys(obj) {
  let count = 0;
  for (const key of Object.keys(obj)) {
    count++;
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      count += countKeys(obj[key]);
    }
  }
  return count;
}

const patchFiles = fs.readdirSync(PACK_LOCALES_DIR).filter(f => f.endsWith('.json'));
console.log(`Found ${patchFiles.length} patch files in chappals-to-leather-pack.`);

let allGrewOrSame = true;

for (const file of patchFiles) {
  const realPath = path.join(REAL_LOCALES_DIR, file);
  const patchPath = path.join(PACK_LOCALES_DIR, file);

  if (!fs.existsSync(realPath)) {
    console.error(`ERROR: Real locale file does not exist: ${realPath}`);
    process.exit(1);
  }

  const realJson = JSON.parse(fs.readFileSync(realPath, 'utf8'));
  const patchJson = JSON.parse(fs.readFileSync(patchPath, 'utf8'));

  const countBefore = countKeys(realJson);

  deepMerge(realJson, patchJson);

  const countAfter = countKeys(realJson);

  fs.writeFileSync(realPath, JSON.stringify(realJson, null, 2) + '\n', 'utf8');

  console.log(`${file}: before = ${countBefore} keys, after = ${countAfter} keys (+${countAfter - countBefore})`);
  if (countAfter < countBefore) {
    allGrewOrSame = false;
  }
}

if (!allGrewOrSame) {
  console.error('FAILED: Some locale files shrank!');
  process.exit(1);
} else {
  console.log('\nSUCCESS: All 15 locale files merged safely without shrinking!');
}
