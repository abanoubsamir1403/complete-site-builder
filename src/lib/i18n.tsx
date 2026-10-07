import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { findLocale } from "@/lib/locales";
import { getTranslations, translateBatch } from "@/lib/translate.functions";

/** Base language of hand-written content. Other locales are AI-translated from English. */
export type Lang = "en" | "ar";
export type T = { en: string; ar: string };

type Ctx = { lang: Lang; locale: string; setLocale: (c: string) => void; setLang: (l: Lang) => void; tr: (v: T) => string; translating: boolean };
const LangCtx = createContext<Ctx>({ lang: "en", locale: "en", setLocale: () => {}, setLang: () => {}, tr: (v) => v.en, translating: false });

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState("en");
  const [dict, setDict] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(0);
  const queue = useRef(new Set<string>());
  const requested = useRef(new Set<string>());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loc = findLocale(locale) ?? findLocale("en")!;
  const lang: Lang = loc.base;
  const machine = locale !== "en" && locale !== "ar";

  useEffect(() => {
    const saved = window.localStorage.getItem("mf-lang");
    if (saved && findLocale(saved)) setLocaleState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = loc.rtl ? "rtl" : "ltr";
  }, [locale, loc.rtl]);

  // Load cached translations for this locale.
  useEffect(() => {
    queue.current.clear(); requested.current.clear(); setDict({});
    if (!machine) return;
    let alive = true;
    try {
      const c = window.sessionStorage.getItem(`mf-tr-${locale}`);
      if (c) setDict(JSON.parse(c));
    } catch { /* ignore */ }
    getTranslations({ data: { locale } }).then((d) => { if (alive) setDict((p) => ({ ...p, ...d })); }).catch(() => {});
    return () => { alive = false; };
  }, [locale, machine]);

  useEffect(() => {
    if (machine && Object.keys(dict).length) {
      try { window.sessionStorage.setItem(`mf-tr-${locale}`, JSON.stringify(dict)); } catch { /* quota */ }
    }
  }, [dict, locale, machine]);

  const flush = useCallback(() => {
    timer.current = null;
    const all = [...queue.current]; queue.current.clear();
    for (let i = 0; i < all.length; i += 40) {
      const chunk = all.slice(i, i + 40);
      setPending((n) => n + 1);
      translateBatch({ data: { locale, texts: chunk } })
        .then((d) => setDict((p) => ({ ...p, ...d })))
        .catch(() => {})
        .finally(() => setPending((n) => n - 1));
    }
  }, [locale]);

  const tr = useCallback((v: T) => {
    if (!machine) return v[lang];
    const hit = dict[v.en];
    if (hit !== undefined) return hit;
    if (v.en.trim() && !requested.current.has(v.en)) {
      requested.current.add(v.en); queue.current.add(v.en);
      if (!timer.current) timer.current = setTimeout(flush, 250);
    }
    return v.en;
  }, [machine, lang, dict, flush]);

  const setLocale = (c: string) => { setLocaleState(c); window.localStorage.setItem("mf-lang", c); };
  return <LangCtx.Provider value={{ lang, locale, setLocale, setLang: setLocale, tr, translating: pending > 0 }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const { lang, locale, setLocale, setLang, tr, translating } = useContext(LangCtx);
  return { lang, locale, setLocale, setLang, t: tr, translating };
}

export const tx = (en: string, ar: string): T => ({ en, ar });
