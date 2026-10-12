const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/locales');

const translations = {
  en: {
    back: "Back to Blog",
    readTime: "{{n}} min read",
    share: "Share",
    shareOnWhatsapp: "Share on WhatsApp",
    copyLink: "Copy link",
    linkCopied: "Link copied",
    relatedPosts: "You might also like",
    viewCollection: "View Related Collection",
    askUs: "Ask us on WhatsApp"
  },
  ar: {
    back: "العودة إلى المدونة",
    readTime: "قراءة في {{n}} دقائق",
    share: "مشاركة",
    shareOnWhatsapp: "مشاركة عبر واتساب",
    copyLink: "نسخ الرابط",
    linkCopied: "تم نسخ الرابط",
    relatedPosts: "قد يعجبك أيضاً",
    viewCollection: "عرض المجموعة ذات الصلة",
    askUs: "اسألنا عبر واتساب"
  },
  es: {
    back: "Volver al blog",
    readTime: "{{n}} min de lectura",
    share: "Compartir",
    shareOnWhatsapp: "Compartir en WhatsApp",
    copyLink: "Copiar enlace",
    linkCopied: "Enlace copiado",
    relatedPosts: "También te podría gustar",
    viewCollection: "Ver colección relacionada",
    askUs: "Pregúntanos por WhatsApp"
  },
  fr: {
    back: "Retour au blog",
    readTime: "{{n}} min de lecture",
    share: "Partager",
    shareOnWhatsapp: "Partager sur WhatsApp",
    copyLink: "Copier le lien",
    linkCopied: "Lien copié",
    relatedPosts: "Vous pourriez aussi aimer",
    viewCollection: "Voir la collection associée",
    askUs: "Posez vos questions sur WhatsApp"
  },
  de: {
    back: "Zurück zum Blog",
    readTime: "{{n}} Min. Lesezeit",
    share: "Teilen",
    shareOnWhatsapp: "Auf WhatsApp teilen",
    copyLink: "Link kopieren",
    linkCopied: "Link kopiert",
    relatedPosts: "Das könnte Ihnen auch gefallen",
    viewCollection: "Zugehörige Kollektion ansehen",
    askUs: "Fragen Sie uns auf WhatsApp"
  },
  hi: {
    back: "ब्लॉग पर वापस जाएं",
    readTime: "{{n}} मिनट का समय",
    share: "साझा करें",
    shareOnWhatsapp: "व्हाट्सएप पर साझा करें",
    copyLink: "लिंक कॉपी करें",
    linkCopied: "लिंक कॉपी हो गया",
    relatedPosts: "आपको यह भी पसंद आ सकता है",
    viewCollection: "संबंधित संग्रह देखें",
    askUs: "व्हाट्सएप पर पूछें"
  },
  zh: {
    back: "返回博客",
    readTime: "{{n}} 分钟阅读",
    share: "分享",
    shareOnWhatsapp: "在WhatsApp上分享",
    copyLink: "复制链接",
    linkCopied: "链接已复制",
    relatedPosts: "猜你喜欢",
    viewCollection: "查看相关系列",
    askUs: "在WhatsApp上咨询我们"
  },
  ta: {
    back: "வலைப்பதிவிற்குத் திரும்பு",
    readTime: "{{n}} நிமிட வாசிப்பு",
    share: "பகிர்",
    shareOnWhatsapp: "வாட்ஸ்அப்பில் பகிரவும்",
    copyLink: "இணைப்பை நகலெடு",
    linkCopied: "இணைப்பு நகலெடுக்கப்பட்டது",
    relatedPosts: "உங்களுக்கு இதுவும் பிடிக்கலாம்",
    viewCollection: "தொடர்புடைய தொகுப்பைப் பார்க்கவும்",
    askUs: "வாட்ஸ்அப்பில் கேளுங்கள்"
  },
  ru: {
    back: "Назад в блог",
    readTime: "{{n}} мин чтения",
    share: "Поделиться",
    shareOnWhatsapp: "Поделиться в WhatsApp",
    copyLink: "Скопировать ссылку",
    linkCopied: "Ссылка скопирована",
    relatedPosts: "Вам также может понравиться",
    viewCollection: "Смотреть связанную коллекцию",
    askUs: "Спросите нас в WhatsApp"
  },
  pt: {
    back: "Voltar ao blog",
    readTime: "{{n}} min de leitura",
    share: "Compartilhar",
    shareOnWhatsapp: "Compartilhar no WhatsApp",
    copyLink: "Copiar link",
    linkCopied: "Link copiado",
    relatedPosts: "Você também pode gostar",
    viewCollection: "Ver coleção relacionada",
    askUs: "Fale conosco no WhatsApp"
  },
  ja: {
    back: "ブログ一覧に戻る",
    readTime: "読了時間：約{{n}}分",
    share: "シェア",
    shareOnWhatsapp: "WhatsAppで共有",
    copyLink: "リンクをコピー",
    linkCopied: "リンクをコピーしました",
    relatedPosts: "おすすめの関連記事",
    viewCollection: "関連コレクションを見る",
    askUs: "WhatsAppでお問い合わせ"
  },
  ko: {
    back: "블로그로 돌아가기",
    readTime: "읽는 시간: {{n}}분",
    share: "공유하기",
    shareOnWhatsapp: "WhatsApp으로 공유",
    copyLink: "링크 복사",
    linkCopied: "링크가 복사되었습니다",
    relatedPosts: "관련 추천 글",
    viewCollection: "관련 컬렉션 보기",
    askUs: "WhatsApp으로 문의하기"
  },
  it: {
    back: "Torna al blog",
    readTime: "{{n}} min di lettura",
    share: "Condividi",
    shareOnWhatsapp: "Condividi su WhatsApp",
    copyLink: "Copia link",
    linkCopied: "Link copiato",
    relatedPosts: "Potrebbe piacerti anche",
    viewCollection: "Vedi collezione correlata",
    askUs: "Chiedici su WhatsApp"
  },
  tr: {
    back: "Bloga Geri Dön",
    readTime: "{{n}} dk okuma süresi",
    share: "Paylaş",
    shareOnWhatsapp: "WhatsApp'ta Paylaş",
    copyLink: "Bağlantıyı kopyala",
    linkCopied: "Bağlantı kopyalandı",
    relatedPosts: "Bunlar da ilginizi çekebilir",
    viewCollection: "İlgili Koleksiyonu Görüntüle",
    askUs: "WhatsApp'tan Bize Sorun"
  },
  id: {
    back: "Kembali ke Blog",
    readTime: "{{n}} mnt baca",
    share: "Bagikan",
    shareOnWhatsapp: "Bagikan di WhatsApp",
    copyLink: "Salin tautan",
    linkCopied: "Tautan disalin",
    relatedPosts: "Anda mungkin juga menyukai",
    viewCollection: "Lihat Koleksi Terkait",
    askUs: "Tanya kami di WhatsApp"
  }
};

const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const code = file.replace('.json', '');
  const filePath = path.join(localesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!data.blog) {
    data.blog = {};
  }

  const langTranslations = translations[code] || translations.en;
  for (const [key, val] of Object.entries(langTranslations)) {
    data.blog[key] = val;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated ${file}`);
}
console.log('All 15 locale files updated with blog.* keys successfully!');
