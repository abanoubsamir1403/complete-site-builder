import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, type CSSProperties } from "react";
import {
  FileText,
  Briefcase,
  TrendingUp,
  DollarSign,
  Home as HomeIcon,
  Users,
  Activity,
  Shield,
  FileCheck,
  Calendar,
  ShoppingBag,
  Lock,
  MapPin,
  Building,
  Layers,
  AlertCircle,
  Video,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  Compass,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { tx, useLang } from "@/lib/i18n";
import { services } from "@/lib/content";
import { OTHER_SERVICES_CATEGORIES, type OtherServiceCategory, type OtherServiceItem } from "@/lib/other-services";
import { Container, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

type ServicesSearch = {
  tab?: "immigration" | "other";
  category?: string;
  q?: string;
};

export const Route = createFileRoute("/services/")({
  validateSearch: (search: Record<string, unknown>): ServicesSearch => ({
    tab: search.tab === "other" || search.tab === "immigration" ? search.tab : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () =>
    seo(
      "Services & Documentation | MIGRAFILE",
      "Divisions of client-directed U.S. immigration documentation support, plus MigraFile Other Services: Supporting letters, affidavits, career contracts, business plans, leases, trusts, corporate records, and deeds.",
    ),
  component: ServicesPage,
});

function getCategoryIcon(name: string) {
  switch (name) {
    case "file-text":
      return FileText;
    case "briefcase":
      return Briefcase;
    case "trending-up":
      return TrendingUp;
    case "dollar-sign":
      return DollarSign;
    case "home":
      return HomeIcon;
    case "users":
      return Users;
    case "activity":
      return Activity;
    case "shield":
      return Shield;
    case "file-check":
      return FileCheck;
    case "calendar":
      return Calendar;
    case "shopping-bag":
      return ShoppingBag;
    case "lock":
      return Lock;
    case "map-pin":
      return MapPin;
    case "building":
      return Building;
    case "layers":
      return Layers;
    case "alert-circle":
      return AlertCircle;
    default:
      return FileText;
  }
}

function ServicesPage() {
  const { t, lang } = useLang();
  const search = Route.useSearch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"immigration" | "other">(
    search.tab === "other" ? "other" : "immigration",
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(search.category || "all");
  const [searchQuery, setSearchQuery] = useState<string>(search.q || "");

  const handleTabChange = (tab: "immigration" | "other") => {
    setActiveTab(tab);
    navigate({
      search: (prev) => ({
        ...prev,
        tab: tab === "other" ? "other" : undefined,
      }),
      replace: true,
    });
  };

  // Filtered other services
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return OTHER_SERVICES_CATEGORIES.map((cat) => {
      // Category matches if query is in category title or description
      const catMatchesQuery =
        !q ||
        cat.title.en.toLowerCase().includes(q) ||
        cat.title.ar.toLowerCase().includes(q) ||
        cat.description.en.toLowerCase().includes(q) ||
        cat.description.ar.toLowerCase().includes(q);

      // Filter items
      const matchingItems = cat.items.filter((item) => {
        if (!q) return true;
        return (
          item.name.en.toLowerCase().includes(q) ||
          item.name.ar.toLowerCase().includes(q) ||
          (item.description &&
            (item.description.en.toLowerCase().includes(q) || item.description.ar.toLowerCase().includes(q)))
        );
      });

      const shouldInclude =
        selectedCategory === "all" || selectedCategory === cat.id;

      if (!shouldInclude) return null;

      if (q) {
        if (matchingItems.length > 0) {
          return { ...cat, items: matchingItems };
        }
        if (catMatchesQuery) {
          return cat;
        }
        return null;
      }

      return cat;
    }).filter(Boolean) as OtherServiceCategory[];
  }, [searchQuery, selectedCategory]);

  const totalOtherServicesCount = useMemo(() => {
    return OTHER_SERVICES_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);
  }, []);

  return (
    <>
      <PageHeader
        eyebrow={tx("MIGRAFILE Services", "خدمات MIGRAFILE")}
        title={tx("Professional Documentation & Case Management", "خدمات التوثيق وإدارة المعاملات")}
        intro={tx(
          "Choose between our core U.S. immigration filing divisions or explore MigraFile Other Services for personal, business, and legal agreements with direct interview consultation.",
          "اختر بين أقسام توثيق الهجرة الأمريكية المعتمدة أو استكشف خدمات MigraFile الأخرى للوثائق والعقود الشخصية والتجارية مع إمكانية حجز استشارة ومقابلة مباشرة.",
        )}
      />

      {/* Tabs navigation */}
      <div className="sticky top-16 z-30 border-b bg-background/95 backdrop-blur-md">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-2 rounded-xl bg-muted p-1">
              <button
                type="button"
                onClick={() => handleTabChange("immigration")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  activeTab === "immigration"
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{t(tx("U.S. Immigration Documentation", "توثيق الهجرة الأمريكية"))}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  {services.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("other")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  activeTab === "other"
                    ? "bg-card text-accent shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span>{t(tx("MigraFile Other Services", "خدمات MigraFile الأخرى"))}</span>
                <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent">
                  16 {t(tx("Divisions", "قسماً"))}
                </span>
              </button>
            </div>

            {/* Quick CTA to book interview directly */}
            <Link
              to="/book-interview"
              className="hidden items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent transition hover:bg-accent hover:text-navy sm:inline-flex"
            >
              <Video className="h-3.5 w-3.5" />
              {t(tx("Book Video Consultation", "حجز موعد مقابلة فيديو كول"))}
            </Link>
          </div>
        </Container>
      </div>

      {/* TAB 1: IMMIGRATION SERVICES */}
      {activeTab === "immigration" && (
        <section className="py-12 sm:py-16">
          <Container>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">{t(tx("Immigration Divisions", "أقسام الهجرة"))}</p>
                <h2 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">
                  {t(tx("Administrative Documentation Support", "الدعم التوثيقي الإداري للهجرة"))}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(
                    tx(
                      "You choose the process — alone or with qualified counsel. We organize, translate, enter data and track.",
                      "أنت تختار الإجراء — بنفسك أو مع محامٍ مؤهل. ونحن ننظم ونترجم وندخل البيانات ونتابع.",
                    ),
                  )}
                </p>
              </div>

              {/* Banner jumping to Other Services */}
              <button
                type="button"
                onClick={() => handleTabChange("other")}
                className="group flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/5 px-4 py-2 text-xs font-medium text-accent transition hover:bg-accent/15"
              >
                <span>{t(tx("Looking for affidavits, contracts or agreements?", "تبحث عن إقرارات، عقود أو وثائق قانونية؟"))}</span>
                <span className="font-bold underline underline-offset-4 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                  {t(tx("View Other Services", "تصفح الخدمات الأخرى"))} →
                </span>
              </button>
            </div>

            <div className="mf-stagger grid gap-6 md:grid-cols-2">
              {services.map((s, index) => (
                <Link
                  key={s.slug}
                  to="/portal"
                  search={{ service: s.slug }}
                  className="doc-card mf-stagger-item group"
                  style={{ "--mf-index": index } as CSSProperties}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-gold">{s.num}</span>
                    <span className="text-xs text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 rtl:group-hover:-translate-x-1">
                      →
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl text-primary">{t(s.title)}</h3>
                  <p className="mt-2 text-muted-foreground">{t(s.summary)}</p>
                  <ul className="mt-4 grid gap-1.5 text-sm">
                    {s.includes.slice(0, 3).map((i) => (
                      <li key={i.en} className="flex gap-2">
                        <span className="text-accent">✓</span>
                        {t(i)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs font-semibold text-primary">
                    <span className="text-accent group-hover:underline">
                      {t(tx("Start Case or View Details", "بدء المعاملة أو عرض التفاصيل"))}
                    </span>
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-muted-foreground font-mono">
                      {s.slug}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* TAB 2: MIGRAFILE OTHER SERVICES */}
      {activeTab === "other" && (
        <section className="py-12 sm:py-16">
          <Container>
            {/* Informational Hero Banner explaining the interview-based workflow */}
            <div className="mb-12 overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-card via-card to-accent/5 p-6 shadow-lg sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    <Sparkles className="h-3.5 w-3.5" />
                    {t(tx("MigraFile Other Services", "خدمات MigraFile الأخرى"))}
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                    {t(
                      tx(
                        "Affidavits, Contracts, Agreements & Official Records",
                        "الإقرارات المشفوعة بقسم، العقود، الاتفاقيات والسجلات الرسمية",
                      ),
                    )}
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground sm:text-base leading-relaxed">
                    {t(
                      tx(
                        "These specialized services are handled through direct one-on-one video call consultations with our documentation team. There are no preliminary intake questionnaires or document uploads required — simply choose your service below and book an interview so our specialist can draft and coordinate your document with you step-by-step.",
                        "يتم تقديم هذه الخدمات المتخصصة من خلال حجز موعد مقابلة فيديو كول واستشارة مباشرة مع متخصصي التوثيق لدينا. لا تتطلب هذه الخدمات رفع مستندات أو ملء استبيانات مسبقة — ما عليك سوى اختيار الخدمة المطلوبة بالأسفل وحجز المقابلة لنقوم بصياغة وتجهيز مستندك باحترافية كاملة.",
                      ),
                    )}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 rounded-xl bg-background/80 px-3 py-2 border shadow-xs">
                      <CheckCircle2 className="h-4 w-4 text-status-green" />
                      <span className="font-medium text-foreground">
                        {t(tx("No paperwork required beforehand", "بدون أي أوراق مطلوبة مسبقًا"))}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-background/80 px-3 py-2 border shadow-xs">
                      <Video className="h-4 w-4 text-accent" />
                      <span className="font-medium text-foreground">
                        {t(tx("Direct personal consultation", "مقابلة واستشارة شخصية مباشرة"))}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-background/80 px-3 py-2 border shadow-xs">
                      <Shield className="h-4 w-4 text-gold" />
                      <span className="font-medium text-foreground">
                        {t(tx("16 Specialized Categories", "١٦ قسماً شاملاً"))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick booking card */}
                <div className="rounded-2xl border border-primary/10 bg-primary/5 p-5 text-center lg:p-6">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-md">
                    <Video className="h-6 w-6" />
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-primary">
                    {t(tx("Ready to get started?", "جاهز لبدء تجهيز مستندك؟"))}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t(
                      tx(
                        "Schedule your interview directly on U.S. Time. Our specialists connect with you via WhatsApp, Google Meet, or Zoom.",
                        "احجز موعد مقابلتك بالساعة الأمريكية، وسيتواصل معك المتخصص عبر واتساب، Google Meet، أو Zoom.",
                      ),
                    )}
                  </p>
                  <Link
                    to="/book-interview"
                    className="btn-primary mt-4 w-full shadow-md"
                  >
                    <Video className="h-4 w-4" />
                    {t(tx("Book a Consultation", "حجز موعد استشارة ومقابلة"))}
                  </Link>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t(
                      tx(
                        "Search 80+ documents (e.g. Affidavit, Lease, LLC, Resume)...",
                        "ابحث بين أكثر من 80 وثيقة وعقد (مثل: إقرار، إيجار، سيرة ذاتية، LLC)...",
                      ),
                    )}
                    className="w-full rounded-xl border border-input bg-card py-2.5 pe-9 ps-9 text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute end-3 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="text-xs text-muted-foreground font-mono">
                  {t(tx("Showing", "عرض"))}{" "}
                  <span className="font-bold text-foreground">
                    {filteredCategories.reduce((acc, c) => acc + c.items.length, 0)}
                  </span>{" "}
                  {t(tx("of", "من أصل"))}{" "}
                  <span className="font-bold text-foreground">{totalOtherServicesCount}</span>{" "}
                  {t(tx("services across", "خدمة موزعة على"))}{" "}
                  <span className="font-bold text-foreground">{filteredCategories.length}</span>{" "}
                  {t(tx("categories", "أقسام"))}
                </div>
              </div>

              {/* Category Pills Slider / Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1 no-scrollbar">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    selectedCategory === "all"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {t(tx("All Categories (16)", "كافة الأقسام (١٦)"))}
                </button>
                {OTHER_SERVICES_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      selectedCategory === cat.id
                        ? "bg-accent text-navy shadow-xs font-bold"
                        : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <span className="font-mono opacity-60 me-1">{cat.num}</span>
                    {t(cat.title)}
                  </button>
                ))}
              </div>
            </div>

            {/* CATEGORIES AND ITEMS LIST */}
            {filteredCategories.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 font-semibold text-foreground">
                  {t(tx("No services found", "لم يتم العثور على نتائج"))}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(
                    tx(
                      "Try adjusting your search terms or reset the category filter.",
                      "جرب البحث بكلمات مختلفة أو قم بإلغاء فلتر الأقسام.",
                    ),
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="mt-4 rounded-full bg-secondary px-4 py-2 text-xs font-medium text-foreground hover:bg-muted"
                >
                  {t(tx("Reset filters", "إعادة ضبط البحث"))}
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredCategories.map((cat, catIdx) => {
                  const CategoryIconComponent = getCategoryIcon(cat.icon);
                  return (
                    <div
                      key={cat.id}
                      id={cat.id}
                      className="rounded-3xl border bg-card/60 p-6 shadow-sm transition hover:shadow-md sm:p-8"
                    >
                      {/* Category Header */}
                      <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3.5">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                            <CategoryIconComponent className="h-5 w-5" />
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-gold">
                                {cat.num}
                              </span>
                              <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                                {cat.items.length} {t(tx("services", "خدمات"))}
                              </span>
                            </div>
                            <h3 className="mt-1 font-display text-xl font-bold text-primary sm:text-2xl">
                              {t(cat.title)}
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                              {t(cat.description)}
                            </p>
                          </div>
                        </div>

                        {/* Category direct booking action */}
                        <Link
                          to="/book-interview"
                          search={{
                            service: cat.title.en,
                            category: cat.title.en,
                          }}
                          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-bold text-accent transition hover:bg-accent hover:text-navy"
                        >
                          <Video className="h-3.5 w-3.5" />
                          <span>{t(tx("Book for this category", "حجز لهذا القسم"))}</span>
                        </Link>
                      </div>

                      {/* Items Grid */}
                      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {cat.items.map((item, itemIdx) => (
                          <div
                            key={item.id}
                            className="group flex flex-col justify-between rounded-2xl border bg-background p-4.5 transition duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-semibold text-primary group-hover:text-accent transition-colors">
                                  {t(item.name)}
                                </h4>
                                <span className="font-mono text-[10px] text-muted-foreground/60 shrink-0">
                                  #{itemIdx + 1}
                                </span>
                              </div>

                              {/* Secondary language subtitle */}
                              <p className="mt-0.5 text-xs text-muted-foreground/75 font-medium">
                                {lang === "ar" ? item.name.en : item.name.ar}
                              </p>

                              {item.description && (
                                <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                                  {t(item.description)}
                                </p>
                              )}
                            </div>

                            {/* Book Interview Button for this specific item */}
                            <div className="mt-4 pt-3 border-t">
                              <Link
                                to="/book-interview"
                                search={{
                                  service: item.name.en,
                                  category: cat.title.en,
                                }}
                                className="inline-flex w-full items-center justify-between rounded-xl bg-secondary/80 px-3.5 py-2 text-xs font-semibold text-primary transition duration-200 group-hover:bg-accent group-hover:text-navy"
                              >
                                <span className="flex items-center gap-1.5">
                                  <Video className="h-3.5 w-3.5 shrink-0" />
                                  <span>{t(tx("Book Interview", "حجز مقابلة"))}</span>
                                </span>
                                <span className="text-sm transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                                  →
                                </span>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </section>
      )}
    </>
  );
}
