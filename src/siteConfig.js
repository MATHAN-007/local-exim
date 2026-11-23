// ONE FILE TO EDIT: business details, toggles and numbers. Text lives in src/locales/*.json
export const siteConfig = {
  name: "Local Exim",
  tagline: "Global Trade · Local Roots",
  whatsappNumber: "919356447373",          // Single source of truth (digits only)
  phone: "+91 93564 47373",
  email: "shubhhampatill@localexim.com",
  address: "Office No. 1846, Shivshambo Nagar, Ward No. 4, Tal. Karvir, Dist. Kolhapur – 416234, Maharashtra, India",
  social: { instagram: "", facebook: "", linkedin: "", youtube: "" }, // empty = icon hidden
  heroSlideshow: {
    intervalMs: 3000
  },
  catalogueDownload: {
    file: "/downloads/Local-Exim-Catalogue.pdf",
    sizeLabel: "PDF · 2.2 MB"
  },
  productSections: [
    {
      id: "chappals",
      nameKey: "productsLanding.chappalsTitle",
      descKey: "productsLanding.chappalsDesc",
      route: "/products/chappals",
      dataFile: "catalogue",
      image: "/catalogue/sankeshwari-kolhapuri.webp",
      pdfFile: "/downloads/Local-Exim-Catalogue.pdf",
      pdfSizeLabel: "PDF · 1.8 MB"
    },
    {
      id: "leather",
      nameKey: "productsLanding.leatherTitle",
      descKey: "productsLanding.leatherDesc",
      route: "/products/leather",
      dataFile: "leatherProducts",
      image: "/leather/structured-tan-handbag.webp",
      pdfFile: "/downloads/Local-Exim-Leather-Catalogue.pdf",
      pdfSizeLabel: "PDF · 0.7 MB"
    }
  ],
  waMessages: {
    general: "Hello Local Exim, I would like to enquire about your Kolhapuri footwear.",
    product: "Hello Local Exim, I am interested in {name} (Code: {code}). Please share details."
  },
  showPrices: false,
  showTestimonials: false,
  showFaq: false,
  showBlog: true,
  highlights: [
    { value: "60+", labelKey: "highlights.designs" },
    { value: "Men & Women", labelKey: "highlights.ranges" },
    { value: "5–11", labelKey: "highlights.sizes" },
    { value: "24/7", labelKey: "highlights.whatsapp" }
  ],
  languages: [
    { code: "en", native: "English" },
    { code: "ar", native: "العربية" },
    { code: "es", native: "Español" },
    { code: "fr", native: "Français" },
    { code: "de", native: "Deutsch" },
    { code: "hi", native: "हिन्दी" },
    { code: "zh", native: "中文" },
    { code: "ta", native: "தமிழ்" },
    { code: "ru", native: "Русский" },
    { code: "pt", native: "Português" },
    { code: "ja", native: "日本語" },
    { code: "ko", native: "한국어" },
    { code: "it", native: "Italiano" },
    { code: "tr", native: "Türkçe" },
    { code: "id", native: "Bahasa Indonesia" }
  ],
  formEndpoint: import.meta.env.VITE_WEB3FORMS_KEY
};
