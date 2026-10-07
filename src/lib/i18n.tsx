import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { findLocale } from "@/lib/locales";

/** Base language of hand-written content. Other locales use pre-translated static files in src/locales. */
export type Lang = "en" | "ar";
export type T = { en: string; ar: string };

const files = import.meta.glob<{ default: Record<string, string> }>("../locales/*.json");

type Ctx = { lang: Lang; locale: string; setLocale: (c: string) => void; setLang: (l: Lang) => void; tr: (v: T) => string; translating: boolean };
const LangCtx = createContext<Ctx>({ lang: "en", locale: "en", setLocale: () => {}, setLang: () => {}, tr: (v) => v.en, translating: false });

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState("en");
  const [dict, setDict] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    setDict({});
    if (!machine) return;
    const load = files[`../locales/${locale}.json`];
    if (!load) return;
    let alive = true;
    setLoading(true);
    load().then((m) => { if (alive) setDict(m.default); }).catch(() => {}).finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [locale, machine]);

  const tr = useCallback((v: T) => (machine ? dict[v.en] ?? v.en : v[lang]), [machine, lang, dict]);

  const setLocale = (c: string) => { setLocaleState(c); window.localStorage.setItem("mf-lang", c); };
  return <LangCtx.Provider value={{ lang, locale, setLocale, setLang: setLocale, tr, translating: loading }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const { lang, locale, setLocale, setLang, tr, translating } = useContext(LangCtx);
  return { lang, locale, setLocale, setLang, t: tr, translating };
}

export const tx = (en: string, ar: string): T => ({ en, ar });
