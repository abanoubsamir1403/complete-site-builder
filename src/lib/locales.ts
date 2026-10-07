// Every selectable UI language. "en" and "ar" are hand-written; the rest are AI-translated from English.
export type Locale = {
  code: string;
  name: string; // native name
  en: string; // English name (used in the AI prompt)
  flag: string;
  rtl?: boolean;
  base: "en" | "ar"; // which hand-written language data falls back to
  dialect?: boolean;
};

export const LOCALES: Locale[] = [
  { code: "en", name: "English", en: "English", flag: "🇺🇸", base: "en" },
  { code: "ar", name: "العربية (الفصحى)", en: "Modern Standard Arabic", flag: "🇸🇦", rtl: true, base: "ar" },
  { code: "ar-EG", name: "العربية — مصري", en: "Egyptian Arabic dialect (colloquial, Cairo)", flag: "🇪🇬", rtl: true, base: "ar", dialect: true },
  { code: "ar-MA", name: "الدارجة المغربية", en: "Moroccan Arabic (Darija), written in Arabic script", flag: "🇲🇦", rtl: true, base: "ar", dialect: true },
  { code: "ar-DZ", name: "الدارجة الجزائرية", en: "Algerian Arabic (Darja), written in Arabic script", flag: "🇩🇿", rtl: true, base: "ar", dialect: true },
  { code: "ar-JO", name: "العربية — شامي", en: "Levantine (Jordanian) Arabic dialect", flag: "🇯🇴", rtl: true, base: "ar", dialect: true },
  { code: "es", name: "Español", en: "Spanish (neutral Latin American)", flag: "🌎", base: "en" },
  { code: "es-MX", name: "Español (México)", en: "Mexican Spanish", flag: "🇲🇽", base: "en", dialect: true },
  { code: "es-CB", name: "Español (Caribe)", en: "Caribbean Spanish (Cuba, Dominican Republic)", flag: "🇨🇺", base: "en", dialect: true },
  { code: "es-CA", name: "Español (Centroamérica)", en: "Central American Spanish (El Salvador, Guatemala, Honduras, Nicaragua)", flag: "🇸🇻", base: "en", dialect: true },
  { code: "es-ES", name: "Español (España)", en: "Castilian Spanish (Spain)", flag: "🇪🇸", base: "en", dialect: true },
  { code: "pt-BR", name: "Português (Brasil)", en: "Brazilian Portuguese", flag: "🇧🇷", base: "en" },
  { code: "pt-PT", name: "Português (Portugal)", en: "European Portuguese", flag: "🇵🇹", base: "en" },
  { code: "fr", name: "Français", en: "French", flag: "🇫🇷", base: "en" },
  { code: "fr-CA", name: "Français (Canada)", en: "Canadian French (Québec)", flag: "🇨🇦", base: "en", dialect: true },
  { code: "ht", name: "Kreyòl ayisyen", en: "Haitian Creole", flag: "🇭🇹", base: "en" },
  { code: "zh-CN", name: "简体中文", en: "Simplified Chinese (Mandarin, mainland China)", flag: "🇨🇳", base: "en" },
  { code: "zh-TW", name: "繁體中文", en: "Traditional Chinese (Taiwan)", flag: "🇹🇼", base: "en" },
  { code: "hi", name: "हिन्दी", en: "Hindi", flag: "🇮🇳", base: "en" },
  { code: "tl", name: "Filipino (Tagalog)", en: "Filipino (Tagalog)", flag: "🇵🇭", base: "en" },
  { code: "vi", name: "Tiếng Việt", en: "Vietnamese", flag: "🇻🇳", base: "en" },
  { code: "ko", name: "한국어", en: "Korean", flag: "🇰🇷", base: "en" },
  { code: "tr", name: "Türkçe", en: "Turkish", flag: "🇹🇷", base: "en" },
  { code: "el", name: "Ελληνικά", en: "Greek", flag: "🇬🇷", base: "en" },
  { code: "de", name: "Deutsch", en: "German", flag: "🇩🇪", base: "en" },
  { code: "pl", name: "Polski", en: "Polish", flag: "🇵🇱", base: "en" },
  { code: "uk", name: "Українська", en: "Ukrainian", flag: "🇺🇦", base: "en" },
  { code: "ru", name: "Русский", en: "Russian", flag: "🇷🇺", base: "en" },
  { code: "fa", name: "فارسی", en: "Persian (Farsi, Iran)", flag: "🇮🇷", rtl: true, base: "en" },
  { code: "ur", name: "اردو", en: "Urdu (Pakistan)", flag: "🇵🇰", rtl: true, base: "en" },
  { code: "bn", name: "বাংলা", en: "Bengali (Bangladesh)", flag: "🇧🇩", base: "en" },
  { code: "yo", name: "Yorùbá", en: "Yoruba (Nigeria)", flag: "🇳🇬", base: "en" },
];

export const findLocale = (code: string | null | undefined) => LOCALES.find((l) => l.code === code);
