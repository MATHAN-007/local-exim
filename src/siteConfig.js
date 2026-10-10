// ONE FILE TO EDIT: business details, toggles and numbers. Text lives in src/locales/*.json
export const siteConfig = {
  name: "Local Exim",
  tagline: "Global Trade · Local Roots",
  whatsappNumber: "917038405530",          // catalogue WhatsApp number (UNCHANGED)
  email: "shubhhampatill@localexim.com",
  phone: "+91 93564 47373",
  address: "Office No. 1846, Shivshambo Nagar, Ward No. 4, Tal. Karvir, Dist. Kolhapur – 416234, Maharashtra, India",
  social: { instagram: "", facebook: "", linkedin: "", youtube: "" }, // empty = icon hidden
  showPrices: false,          // B2B: show "Request price list" instead of INR retail prices
  showTestimonials: false,    // no reviews yet
  showFaq: false,             // later page
  showBlog: true,             // route: /blog
  highlights: [               // small number strip under hero (edit freely)
    { value: "60+", labelKey: "highlights.designs" },
    { value: "Men & Women", labelKey: "highlights.ranges" },
    { value: "5–11", labelKey: "highlights.sizes" },     // sizes: gents 6–11, ladies 5–10
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
    { code: "pt", native: "Português" }
  ],
  formEndpoint: import.meta.env.VITE_WEB3FORMS_KEY // add key in .env
};
