import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useRef, useEffect } from "react";
import {
  Search,
  ExternalLink,
  BookOpen,
  ArrowUp,
  FileText,
  CheckCircle2,
  Share2,
  Copy,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { tx, useLang, type T } from "@/lib/i18n";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";
import {
  allKnowledgeArticles,
  knowledgeCategories,
  hubLandingBlocks,
  hubLandingSources,
  hubLandingTitle,
  categoryById,
  type KnowledgeCategoryId,
  type KnowledgeArticle,
} from "@/lib/knowledge-hub";

export const Route = createFileRoute("/knowledge")({
  head: () =>
    seo(
      "USCIS Knowledge Hub — MIGRAFILE",
      "Plain-English educational guide to USCIS processes, family immigration, green cards, citizenship, work, filing instructions, and official government resources.",
    ),
  component: KnowledgePage,
});

export default function KnowledgePage() {
  const { t, lang } = useLang();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | KnowledgeCategoryId>("all");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentsRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter articles based on active category and search query
  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allKnowledgeArticles.filter((a) => {
      if (activeCategory !== "all" && a.category !== activeCategory) {
        return false;
      }
      if (!q) return true;
      const titleMatch = a.title.en.toLowerCase().includes(q) || a.title.ar.toLowerCase().includes(q);
      const formMatch = a.relatedForms?.some(
        (f) =>
          f.code.toLowerCase().includes(q) ||
          f.title.en.toLowerCase().includes(q) ||
          f.title.ar.toLowerCase().includes(q),
      );
      const sectionMatch = a.sections.some(
        (s) =>
          s.heading.en.toLowerCase().includes(q) ||
          s.heading.ar.toLowerCase().includes(q) ||
          s.paragraphs.some((p) => p.en.toLowerCase().includes(q) || p.ar.toLowerCase().includes(q)),
      );
      return titleMatch || formMatch || sectionMatch;
    });
  }, [query, activeCategory]);

  const scrollToContents = () => {
    if (contentsRef.current) {
      contentsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const copyArticleLink = (slug: string) => {
    const url = `${window.location.origin}/knowledge#${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    });
  };

  return (
    <>
      <PageHeader
        eyebrow={tx("MIGRAFILE Knowledge", "معرفة MIGRAFILE")}
        title={hubLandingTitle}
        intro={tx(
          "Immigration paperwork becomes easier to manage when you know which agency handles your request, which documents support it, and what stage your case has reached. This hub explains common USCIS processes in plain English and connects you to official resources.",
          "تصبح أوراق الهجرة أسهل في الإدارة عندما تعرف أي جهة تتولى طلبك، وأي مستندات تدعمه، وأي مرحلة وصل إليها ملفك. يشرح هذا المركز إجراءات USCIS الشائعة بلغة واضحة ويربطك بالمصادر الرسمية.",
        )}
      />

      <Container className="py-10">
        {/* Important Educational Notice */}
        <Notice>
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <div>
              <p className="font-semibold text-primary">
                {t(tx("Educational Reference Only", "مرجع تعليمي وتثقيفي فقط"))}
              </p>
              <p className="mt-1 text-sm">
                {t(
                  tx(
                    "Educational content is not legal advice and does not tell you what to file. Each article is linked to its official government source.",
                    "المحتوى التعليمي ليس استشارة قانونية ولا يحدد لك ما يجب تقديمه. كل مقال مرتبط بمصدره الحكومي الرسمي المعتمد.",
                  ),
                )}
              </p>
            </div>
          </div>
        </Notice>

        {/* Hub Landing Introductory Overview Blocks */}
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {hubLandingBlocks.map((block) => (
            <div
              key={block.heading.en}
              className="flex flex-col justify-between rounded-xl border bg-card p-6 shadow-sm transition hover:border-accent/40"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <h2 className="font-display text-lg font-semibold text-primary">{t(block.heading)}</h2>
                </div>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {block.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{t(p)}</p>
                  ))}
                </div>
              </div>

              {block.heading.en === "Choose where to begin" && (
                <div className="mt-5 border-t pt-4">
                  <Link
                    to="/forms"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    {t(tx("Browse Forms Library", "تصفح مكتبة النماذج"))}
                    <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Hub Landing Official Sources & Navigation */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-secondary/50 px-5 py-4 text-xs">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span className="font-semibold uppercase tracking-wider text-muted-foreground">
              {t(tx("Official Sources:", "المصادر الرسمية:"))}
            </span>
            {hubLandingSources.map((src, i) => (
              <span key={src.url} className="inline-flex items-center gap-1">
                {i > 0 && <span className="text-muted-foreground/40 me-1">·</span>}
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-primary hover:text-accent hover:underline"
                >
                  {t(src.label)}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </span>
            ))}
          </div>

          <button
            onClick={scrollToContents}
            className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            {t(tx("Back to contents", "العودة إلى الفهرس"))}
          </button>
        </div>

        {/* Interactive Controls & Table of Contents Anchor */}
        <div ref={contentsRef} id="contents" className="scroll-mt-24 pt-12">
          {/* Search Bar & Category Filters */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-primary">
                  {t(tx("Knowledge Hub Directory", "دليل مقالات مركز المعرفة"))}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(
                    tx(
                      "Explore 37 plain-language guides across all immigration stages, with direct citations to official rules.",
                      "استكشف 37 دليلاً مبسطًا يغطي مختلف مراحل الهجرة، مع إحالات مباشرة للوائح الرسمية.",
                    ),
                  )}
                </p>
              </div>

              {/* Search Field */}
              <div className="relative w-full md:max-w-md">
                <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t(
                    tx("Search articles, forms (e.g. I-130, N-400), or topics...", "ابحث في المقالات أو النماذج (مثل I-130، N-400)..."),
                  )}
                  className="w-full rounded-lg border bg-background py-2.5 pe-4 ps-10 text-sm outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                  aria-label="Search Knowledge Hub"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    {t(tx("Clear", "مسح"))}
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2 border-t pt-5">
              <span className="me-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {t(tx("Category:", "التصنيف:"))}
              </span>

              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  activeCategory === "all"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-muted-foreground hover:bg-muted hover:text-primary"
                }`}
              >
                {t(tx("All Topics", "كافة الموضوعات"))} ({allKnowledgeArticles.length})
              </button>

              {knowledgeCategories.map((cat) => {
                const count = allKnowledgeArticles.filter((a) => a.category === cat.id).length;
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary text-muted-foreground hover:bg-muted hover:text-primary"
                    }`}
                  >
                    {t(cat.title)} ({count})
                  </button>
                );
              })}
            </div>

            {/* Quick Table of Contents Jump Grid */}
            <div className="mt-6 border-t pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t(tx("Quick Jump to Guide:", "الانتقال السريع إلى الدليل:"))}
              </p>
              <div className="mt-3 grid max-h-56 grid-cols-1 gap-2 overflow-y-auto rounded-lg border bg-background/50 p-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article, idx) => (
                  <a
                    key={article.slug}
                    href={`#${article.slug}`}
                    className="group flex items-start gap-2 rounded p-1.5 text-xs transition hover:bg-secondary"
                  >
                    <span className="font-mono text-[11px] text-gold group-hover:text-accent">
                      {String(idx + 1).padStart(2, "0")}.
                    </span>
                    <span className="line-clamp-1 font-medium text-foreground/80 group-hover:text-primary group-hover:underline">
                      {t(article.title)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter / Empty State */}
        <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {t(tx("Showing", "عرض"))} <strong>{filteredArticles.length}</strong>{" "}
            {t(tx("guides", "أدلة"))}
            {activeCategory !== "all" && (
              <>
                {" "}
                {t(tx("in", "في"))} <strong>{t(categoryById(activeCategory).title)}</strong>
              </>
            )}
            {query && (
              <>
                {" "}
                {t(tx("matching", "تطابق"))} &ldquo;<strong>{query}</strong>&rdquo;
              </>
            )}
          </span>

          {(activeCategory !== "all" || query) && (
            <button
              onClick={() => {
                setActiveCategory("all");
                setQuery("");
              }}
              className="font-medium text-accent hover:underline"
            >
              {t(tx("Reset filters", "إعادة ضبط التصفية"))}
            </button>
          )}
        </div>

        {/* Articles List */}
        {filteredArticles.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed p-12 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/60" />
            <p className="mt-4 text-base font-semibold text-primary">
              {t(tx("No articles match your search", "لا توجد مقالات تطابق بحثك"))}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                tx(
                  "Try searching with different terms or reset your category filters.",
                  "جرّب البحث بمصطلحات مختلفة أو إعادة ضبط تصنيفات البحث.",
                ),
              )}
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setQuery("");
              }}
              className="mt-5 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-accent"
            >
              {t(tx("Show All Articles", "عرض جميع المقالات"))}
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-12">
            {filteredArticles.map((art, artIdx) => {
              const cat = categoryById(art.category);
              const isCopied = copiedSlug === art.slug;

              return (
                <article
                  key={art.slug}
                  id={art.slug}
                  className="scroll-mt-20 overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md"
                >
                  {/* Article Header Card Banner */}
                  <div className="border-b bg-gradient-to-r from-secondary/80 to-secondary/30 p-5 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-semibold text-gold">
                          #{String(artIdx + 1).padStart(2, "0")}
                        </span>
                        <span className="rounded-full border bg-background px-3 py-1 font-mono text-[11px] font-medium text-muted-foreground">
                          article / {art.category}
                        </span>
                        <span className="text-xs font-medium text-accent">
                          {t(cat.title)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyArticleLink(art.slug)}
                          className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground transition hover:border-accent hover:text-foreground"
                          title={t(tx("Copy direct link to this guide", "نسخ رابط مباشر لهذا الدليل"))}
                        >
                          {isCopied ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-status-green" />
                              <span className="text-status-green">{t(tx("Link copied!", "تم نسخ الرابط!"))}</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="h-3.5 w-3.5" />
                              <span>{t(tx("Share", "مشاركة"))}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-primary sm:text-3xl">
                      {t(art.title)}
                    </h2>
                  </div>

                  {/* Article Content Sections */}
                  <div className="p-6 sm:p-8">
                    <div className="space-y-8">
                      {art.sections.map((section, sIdx) => (
                        <section key={section.heading.en} className="space-y-3">
                          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                            {t(section.heading)}
                          </h3>
                          <div className="space-y-3 ps-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {section.paragraphs.map((para, pIdx) => (
                              <p key={pIdx}>{t(para)}</p>
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>

                    {/* Related Forms Section (if applicable) */}
                    {art.relatedForms && art.relatedForms.length > 0 && (
                      <div className="mt-8 rounded-xl border bg-secondary/40 p-4">
                        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          <FileText className="h-3.5 w-3.5 text-primary" />
                          {t(tx("Related USCIS Forms:", "النماذج ذات الصلة:"))}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {art.relatedForms.map((rf) => (
                            <Link
                              key={rf.code}
                              to="/forms"
                              className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-xs transition hover:border-accent hover:bg-card"
                            >
                              <span className="font-mono font-bold text-accent">{rf.code}</span>
                              <span className="text-muted-foreground">—</span>
                              <span className="font-medium text-foreground">{t(rf.title)}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Official Sources & Footer of Article */}
                    <div className="mt-8 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-semibold text-muted-foreground">
                          {t(tx("Official sources:", "المصادر الرسمية:"))}
                        </span>
                        {art.sources.map((source, srcIdx) => (
                          <span key={source.url} className="inline-flex items-center gap-1">
                            {srcIdx > 0 && <span className="text-muted-foreground/40 me-1">·</span>}
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-medium text-primary hover:text-accent hover:underline"
                            >
                              {t(source.label)}
                              <ExternalLink className="h-3 w-3 shrink-0" />
                            </a>
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={scrollToContents}
                        className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-accent hover:underline"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                        {t(tx("Back to contents", "العودة إلى الفهرس"))}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Global Floating Back To Contents / Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToContents}
            aria-label={t(tx("Back to contents", "العودة إلى الفهرس"))}
            className="fixed bottom-20 end-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-card/95 text-primary shadow-lg backdrop-blur transition hover:scale-110 hover:border-accent hover:bg-accent hover:text-primary-foreground"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </Container>
    </>
  );
}
