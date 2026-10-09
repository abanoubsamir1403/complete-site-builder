import { arEG, arMA, arDZ, arJO } from "./ar-dialects";
import { es } from "./es";
import { fr } from "./fr";
import { pt } from "./pt";
import { de } from "./de";
import { tr, ru } from "./it-tr-ru";
import { zhCN, zhTW, hi, tl, vi, ko } from "./asia";
import { fa, ur, bn, ht, el, pl, uk, yo } from "./other";

const registry: Record<string, Record<string, string>> = {
  "ar-EG": arEG,
  "ar-MA": arMA,
  "ar-DZ": arDZ,
  "ar-JO": arJO,
  "es": es,
  "es-MX": es,
  "es-CB": es,
  "es-CA": es,
  "es-ES": es,
  "pt-BR": pt,
  "pt-PT": pt,
  "fr": fr,
  "fr-CA": fr,
  "de": de,
  "tr": tr,
  "ru": ru,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  "hi": hi,
  "tl": tl,
  "vi": vi,
  "ko": ko,
  "fa": fa,
  "ur": ur,
  "bn": bn,
  "ht": ht,
  "el": el,
  "pl": pl,
  "uk": uk,
  "yo": yo,
};

import { getKnowledgeHubDictionary } from "./knowledge-translations";

export function getBuiltinDictionary(code: string): Record<string, string> {
  const base = registry[code] ?? {};
  const kh = getKnowledgeHubDictionary(code);
  return { ...base, ...kh };
}

