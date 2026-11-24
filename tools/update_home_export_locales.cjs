const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/locales');

const homePatches = {
  hero: {
    eyebrow: "INDIA TO THE WORLD | GLOBAL EXPORT PARTNER",
    title: "From Indian Craft to Global Markets.",
    subtitle: "Connecting quality leather products from India with international buyers through a commitment to product selection, dependable communication, and export-oriented service.",
    requestQuote: "Request Export Quote",
    exploreProducts: "Explore Our Products",
    chatWhatsApp: "Chat on WhatsApp"
  },
  about: {
    eyebrow: "ABOUT LOCAL EXIM",
    heading: "Bringing Indian Leather Goods to Global Markets.",
    description: "LocalExim connects buyers with a curated range of leather products and accessories from India. We focus on understanding buyer requirements, coordinating product enquiries, and providing a clear path from product selection to order fulfilment."
  },
  featured: {
    eyebrow: "EXPORT CATALOGUE",
    title: "Explore Our Export Collection",
    subtitle: "Discover our selection of leather goods and accessories for international buyers and wholesale requirements."
  },
  capabilities: {
    eyebrow: "EXPORT CAPABILITIES",
    title: "Export Support Built Around Your Requirements",
    subtitle: "We aim to make product sourcing and export enquiries straightforward through clear communication, product coordination, and buyer-oriented support."
  },
  how: {
    eyebrow: "SIMPLE 5-STEP EXPORT PROCESS",
    title: "A Simple Path from Enquiry to Shipment",
    subtitle: "We keep the enquiry and order process clear, structured, and buyer-focused."
  },
  why: {
    eyebrow: "EXPORTER ADVANTAGE",
    title: "Why International Buyers Choose LocalExim",
    subtitle: "Building business relationships through product variety, transparent communication, and a buyer-focused approach."
  },
  trade: {
    eyebrow: "GLOBAL TRADE PERSPECTIVE",
    title: "Rooted in India. Connected to Global Opportunities.",
    subtitle: "Explore our leather product range and connect with LocalExim for export enquiries and international sourcing discussions."
  },
  trust: {
    eyebrow: "BUYER CONFIDENCE",
    title: "Committed to Reliability, Transparency & Quality",
    subtitle: "We operate with a commitment to integrity, clear buyer agreements, and dependable export assistance for every international transaction."
  },
  faq: {
    eyebrow: "QUESTIONS & ANSWERS",
    title: "Frequently Asked Questions About Exporting with LocalExim",
    subtitle: "Find answers to common questions about our export ordering process, bulk inquiries, and product coordination."
  },
  contact: {
    title: "Let's Take Your Next Order from India to Your Market.",
    subtitle: "Looking for leather products for your international business? Connect with LocalExim to discuss your product requirements and export enquiry."
  }
};

const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const filePath = path.join(localesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const [section, patch] of Object.entries(homePatches)) {
    if (!data[section]) data[section] = {};
    for (const [key, val] of Object.entries(patch)) {
      // In en.json, always apply new english copy.
      // In other locales, if english or missing, set the new copy as baseline
      if (file === 'en.json' || !data[section][key]) {
        data[section][key] = val;
      }
    }
    // Also update contact and hero titles/subtitles in all files to ensure export messaging
    if (file === 'en.json') {
      data[section] = { ...data[section], ...patch };
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated export strings in ${file}`);
}
console.log('All locale files updated!');
