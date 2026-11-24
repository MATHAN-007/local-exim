const fs = require('fs');
const path = require('path');

const LOCALES_DIR = 'd:/documents/localexim/local-exim/src/locales';

const translations = {
  en: "Loafers",
  ar: "أحذية لوفر",
  de: "Loafer",
  es: "Mocasines",
  fr: "Mocassins",
  hi: "लोफर्स",
  id: "Sepatu Loafer",
  it: "Mocassini",
  ja: "ローファー",
  ko: "로퍼",
  pt: "Mocassins",
  ru: "Лоферы",
  ta: "லோஃபர்ஸ்",
  tr: "Makosenler",
  zh: "乐福鞋"
};

for (const [lang, val] of Object.entries(translations)) {
  const filePath = path.join(LOCALES_DIR, `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`File missing: ${filePath}`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!data.leather) data.leather = {};
  if (!data.leather.cat) data.leather.cat = {};
  data.leather.cat.loafers = val;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated ${lang}.json with leather.cat.loafers = "${val}"`);
}

console.log('Finished updating all 15 locale files.');
