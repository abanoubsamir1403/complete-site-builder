import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { findLocale } from "@/lib/locales";
import { getTranslations, translateBatch } from "@/lib/translate.functions";
import { getBuiltinDictionary } from "@/lib/dictionaries";

/** Base language of hand-written content. Other locales are AI-translated from English. */
export type Lang = "en" | "ar";
export type T = { en: string; ar: string };

type Ctx = { lang: Lang; locale: string; setLocale: (c: string) => void; setLang: (l: Lang) => void; tr: (v: T | string) => string; translating: boolean };
const LangCtx = createContext<Ctx>({ lang: "en", locale: "en", setLocale: () => {}, setLang: () => {}, tr: (v) => (typeof v === "string" ? v : v.en), translating: false });

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("mf-lang");
    return saved && findLocale(saved) ? saved : "en";
  });
  const [dict, setDict] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = window.localStorage.getItem("mf-lang") ?? "en";
      const builtin = getBuiltinDictionary(saved);
      const c = window.sessionStorage.getItem(`mf-tr-${saved}`);
      return c ? { ...builtin, ...JSON.parse(c) } : { ...builtin };
    } catch {
      return {};
    }
  });
  const [pending, setPending] = useState(0);
  const queue = useRef(new Set<string>());
  const requested = useRef(new Set<string>());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loc = findLocale(locale) ?? findLocale("en")!;
  const lang: Lang = loc.base;
  const machine = locale !== "en" && locale !== "ar";

  useEffect(() => {
    const saved = window.localStorage.getItem("mf-lang");
    if (saved && findLocale(saved)) {
      setLocaleState(saved);
    } else {
      import("@/integrations/supabase/client").then(({ supabase }) => {
        supabase.auth.getSession().then(({ data }) => {
          if (data.session?.user?.id) {
            supabase
              .from("profiles")
              .select("preferred_lang")
              .eq("id", data.session.user.id)
              .maybeSingle()
              .then(({ data: prof }) => {
                if (prof?.preferred_lang && findLocale(prof.preferred_lang)) {
                  setLocaleState(prof.preferred_lang);
                  window.localStorage.setItem("mf-lang", prof.preferred_lang);
                }
              });
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = loc.rtl ? "rtl" : "ltr";
  }, [locale, loc.rtl]);

  // Load cached translations for this locale.
  useEffect(() => {
    queue.current.clear(); requested.current.clear();
    if (!machine) {
      setDict({});
      return;
    }
    const builtin = getBuiltinDictionary(locale);
    let alive = true;
    try {
      const c = window.sessionStorage.getItem(`mf-tr-${locale}`);
      if (c) setDict({ ...builtin, ...JSON.parse(c) });
      else setDict({ ...builtin });
    } catch {
      setDict({ ...builtin });
    }
    getTranslations({ data: { locale } })
      .then((d) => { if (alive && d) setDict((p) => ({ ...p, ...d })); })
      .catch(() => {});
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
        .then((d) => { if (d) setDict((p) => ({ ...p, ...d })); })
        .catch(() => {})
        .finally(() => setPending((n) => n - 1));
    }
  }, [locale]);

  const tr = useCallback((v: T | string) => {
    if (typeof v === "string") {
      if (!machine || !v.trim()) return v;
      const bDict = getBuiltinDictionary(locale);
      const hit = dict[v] ?? bDict[v];
      if (hit !== undefined) return hit;
      if (!requested.current.has(v)) {
        requested.current.add(v); queue.current.add(v);
        if (!timer.current) timer.current = setTimeout(flush, 250);
      }
      return v;
    }
    if (!machine) return v[lang];
    const bDict = getBuiltinDictionary(locale);
    const hit = dict[v.en] ?? bDict[v.en] ?? dict[v.ar] ?? bDict[v.ar];
    if (hit !== undefined) return hit;
    if (v.en.trim() && !requested.current.has(v.en)) {
      requested.current.add(v.en); queue.current.add(v.en);
      if (!timer.current) timer.current = setTimeout(flush, 250);
    }
    return v[lang];
  }, [machine, lang, dict, locale, flush]);

  const setLocale = (c: string) => {
    setLocaleState(c);
    window.localStorage.setItem("mf-lang", c);
    import("@/integrations/supabase/client").then(({ supabase }) => {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session?.user?.id) {
          supabase.from("profiles").update({ preferred_lang: c }).eq("id", data.session.user.id);
        }
      });
    });
  };

  return <LangCtx.Provider value={{ lang, locale, setLocale, setLang: setLocale, tr, translating: pending > 0 }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const { lang, locale, setLocale, setLang, tr, translating } = useContext(LangCtx);
  return { lang, locale, setLocale, setLang, t: tr, translating };
}

export const tx = (en: string, ar: string): T => ({ en, ar });
