const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/locales');

const translations = {
  en: {
    title: "Insights & Updates",
    subtitle: "Explore guides, styling ideas, product insights, and useful tips from the world of leather goods and accessories."
  },
  ar: {
    title: "رؤى وتحديثات",
    subtitle: "استكشف الأدلة، أفكار التنسيق، رؤى المنتجات والنصائح المفيدة من عالم المنتجات الجلدية والإكسسوارات."
  },
  de: {
    title: "Einblicke & Updates",
    subtitle: "Entdecken Sie Ratgeber, Styling-Ideen, Produkteinblicke und nützliche Tipps aus der Welt der Lederwaren und Accessoires."
  },
  es: {
    title: "Perspectivas y Novedades",
    subtitle: "Explore guías, ideas de estilo, información sobre productos y consejos prácticos del mundo de los artículos de cuero y accesorios."
  },
  fr: {
    title: "Perspectives & Mises à Jour",
    subtitle: "Explorez des guides, des idées de style, des aperçus de produits et des conseils pratiques sur le monde des articles en cuir et des accessoires."
  },
  hi: {
    title: "अंतर्दृष्टि और अपडेट",
    subtitle: "चमड़े के सामान और सहायक उपकरणों की दुनिया से गाइड, स्टाइलिंग विचार, उत्पाद अंतर्दृष्टि और उपयोगी सुझाव देखें।"
  },
  id: {
    title: "Wawasan & Pembaruan",
    subtitle: "Jelajahi panduan, inspirasi gaya, informasi produk, dan tips bermanfaat seputar barang kulit dan aksesori."
  },
  it: {
    title: "Approfondimenti e Novità",
    subtitle: "Scopri guide, idee di stile, approfondimenti sui prodotti e consigli utili dal mondo della pelletteria e degli accessori."
  },
  ja: {
    title: "インサイト＆最新情報",
    subtitle: "レザーグッズとアクセサリーの世界から、ガイド、スタイリングのアイデア、製品情報、実用的なヒントをお届けします。"
  },
  ko: {
    title: "인사이트 및 최신 소식",
    subtitle: "가죽 제품과 액세서리의 세계에서 제공하는 가이드, 스타일링 팁, 제품 정보 및 유용한 조언을 살펴보세요."
  },
  pt: {
    title: "Ideias e Atualizações",
    subtitle: "Explore guias, ideias de estilo, informações sobre produtos e dicas práticas do mundo dos artigos de couro e acessórios."
  },
  ru: {
    title: "Обзоры и Новости",
    subtitle: "Узнайте больше о стилях, советах по уходу, идеях и информации о кожаных изделиях и аксессуарах."
  },
  ta: {
    title: "செய்திகள் மற்றும் புதுப்பிப்புகள்",
    subtitle: "தோல் பொருட்கள் மற்றும் அணிகலன்களின் உலகத்திலிருந்து வழிகாட்டிகள், பாணி யோசனைகள் மற்றும் பயனுள்ள குறிப்புகளைப் பெறுங்கள்."
  },
  tr: {
    title: "İçgörüler ve Güncellemeler",
    subtitle: "Deri ürünler ve aksesuarlar dünyasından rehberler, stil fikirleri, ürün bilgileri ve pratik ipuçlarını keşfedin."
  },
  zh: {
    title: "见解与动态",
    subtitle: "探索皮革制品与配饰领域的实用指南、搭配灵感、产品见解与护理技巧。"
  }
};

for (const [lang, t] of Object.entries(translations)) {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`Locale file missing: ${filePath}`);
    continue;
  }
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!content.blog) content.blog = {};
  content.blog.title = t.title;
  content.blog.subtitle = t.subtitle;
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
  console.log(`Updated blog title & subtitle in ${lang}.json`);
}
console.log('All 15 locales updated successfully!');
