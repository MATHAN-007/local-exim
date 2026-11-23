const data = require('../src/data/leatherProducts.json');
const fs = require('fs');
const path = require('path');

console.log('--- Checking 17 Leather Products ---');
console.log('Total products:', data.products.length);

const ids = new Set();
const codes = new Set();
const images = new Set();

let hasDuplicates = false;

data.products.forEach((p, idx) => {
  if (ids.has(p.id)) {
    console.error(`DUPLICATE ID: ${p.id}`);
    hasDuplicates = true;
  }
  ids.add(p.id);

  if (codes.has(p.code)) {
    console.error(`DUPLICATE CODE: ${p.code}`);
    hasDuplicates = true;
  }
  codes.add(p.code);

  if (images.has(p.image)) {
    console.error(`DUPLICATE IMAGE: ${p.image}`);
    hasDuplicates = true;
  }
  images.add(p.image);

  const localPath = path.join(__dirname, '../public', p.image);
  if (!fs.existsSync(localPath)) {
    console.error(`MISSING IMAGE FILE: ${localPath}`);
    hasDuplicates = true;
  }

  console.log(`${(idx + 1).toString().padStart(2, ' ')}. [${p.code}] ${p.name.padEnd(32, ' ')} | Category: ${p.category.padEnd(16, ' ')} | Image: ${p.image}`);
});

if (!hasDuplicates && data.products.length === 17) {
  console.log('\nSUCCESS: Exactly 17 products verified with 0 duplicates, all images present!');
} else {
  console.error('\nFAILURE in verification');
  process.exit(1);
}
