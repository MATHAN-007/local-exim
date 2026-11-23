const fs = require('fs');
const path = require('path');

const langs = ['en', 'ar', 'es', 'fr', 'de', 'hi', 'zh', 'ta', 'ru', 'pt', 'ja', 'ko', 'it', 'tr', 'id'];
const localesDir = path.join(__dirname, '../src/locales');

console.log('| Language | Code | Root Keys | Line Count | nav.products | productsLanding | leather | leather.cat |');
console.log('|---|---|---|---|---|---|---|---|');

for (const code of langs) {
  const filePath = path.join(localesDir, `${code}.json`);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').length;
  const data = JSON.parse(content);

  const rootKeys = Object.keys(data).length;
  const navProd = data.nav?.products ? 'Yes' : 'No';
  const plKeys = Object.keys(data.productsLanding || {}).length;
  const lKeys = Object.keys(data.leather || {}).length;
  const lCatKeys = Object.keys(data.leather?.cat || {}).length;

  console.log(`| ${code.toUpperCase()} | \`${code}\` | ${rootKeys} | ${lines} lines | ${navProd} | ${plKeys} keys | ${lKeys} keys | ${lCatKeys} categories |`);
}
