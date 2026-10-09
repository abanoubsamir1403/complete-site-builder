import { useState } from "react";
import { Search, FileText, CheckCircle2, ExternalLink, ShieldCheck, Layers, HelpCircle, ArrowRight } from "lucide-react";
import { tx, useLang } from "@/lib/i18n";
import {
  NIV_CATEGORIES,
  CATEGORY_INTAKES,
  NIV_FORMS_INVENTORY,
  NIV_HANDLING_MATRIX,
  NIV_OFFICIAL_REFERENCES,
  universalIntakeQuestions,
  nivCoreDocs,
  nivConditionalDocs,
} from "@/lib/niv-workflow";

type TabKey = "checklist" | "category_intake" | "directory" | "forms" | "submission" | "references";

export function NivServiceDetails() {
  const { t, lang } = useLang();
  const [activeTab, setActiveTab] = useState<TabKey>("checklist");
  const [categorySearch, setCategorySearch] = useState("");
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);

  const tabs: { key: TabKey; label: { en: string; ar: string }; icon: typeof FileText }[] = [
    { key: "checklist", label: tx("Intake & Documents", "الاستبيان والمستندات"), icon: FileText },
    { key: "category_intake", label: tx("Category-Specific Intake", "المتطلبات حسب الفئة"), icon: Layers },
    { key: "directory", label: tx("Visa Categories (40+)", "دليل الفئات (40+)"), icon: ShieldCheck },
    { key: "forms", label: tx("Forms Inventory", "حصر النماذج"), icon: HelpCircle },
    { key: "submission", label: tx("Submission & Portal Handling", "إجراءات الرفع والتقديم"), icon: CheckCircle2 },
    { key: "references", label: tx("Official References", "المراجع الرسمية"), icon: ExternalLink },
  ];

  const filteredCategories = NIV_CATEGORIES.filter((c) => {
    const q = categorySearch.toLowerCase().trim();
    if (!q) return true;
    return (
      c.code.toLowerCase().includes(q) ||
      c.name[lang].toLowerCase().includes(q) ||
      c.purpose[lang].toLowerCase().includes(q) ||
      c.dependent[lang].toLowerCase().includes(q)
    );
  });

  const activeCategoryIntake = CATEGORY_INTAKES[selectedCategoryIdx] ?? CATEGORY_INTAKES[0];

  return (
    <div className="mt-12 space-y-10">
      {/* Scope and Guide Header Notice */}
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 text-sm leading-relaxed text-foreground">
        <h3 className="font-semibold text-primary">
          {t(tx("How to Use This Guide & Where Applications Go", "كيفية استخدام هذا الدليل والجهات المعنية بالتقديم"))}
        </h3>
        <ul className="mt-3 grid gap-2 text-xs sm:text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            <span>
              {t(
                tx(
                  "Use a separate questionnaire for each applicant, including children. Start with the universal intake and add only the questions and documents relevant to the selected category. This intake is not a replacement for an official government application.",
                  "يُستخدم استبيان منفصل لكل متقدم، بما في ذلك الأطفال. ابدأ بالاستبيان العام وأضف فقط الأسئلة والمستندات المرتبطة بالفئة المختارة. هذا الاستبيان ليس بديلًا عن طلب حكومي رسمي.",
                ),
              )}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            <span>
              {t(
                tx(
                  "Most visa applications are submitted to the U.S. Department of State through a U.S. embassy or consulate, using Form DS-160. Certain categories first require a USCIS petition approval. Documents uploaded to the client portal are separate from documents submitted to the government; DS-160 generally does not accept a complete supporting document package. Follow the selected embassy's submission instructions.",
                  "تُقدم معظم طلبات التأشيرات لوزارة الخارجية الأمريكية عبر السفارة أو القنصلية باستخدام نموذج DS-160. تتطلب بعض الفئات موافقة مسبقة على التماس من USCIS. المستندات المرفوعة على بوابة العميل منفصلة عن المستندات المقدمة للحكومة؛ حيث لا يقبل DS-160 عمومًا حزمة المستندات الداعمة الكاملة. اتبع تعليمات التقديم الخاصة بالسفارة المختارة.",
                ),
              )}
            </span>
          </li>
        </ul>
      </div>

      {/* Tabs navigation */}
      <div className="border-b">
        <nav className="flex flex-wrap gap-2 pb-2" aria-label="Nonimmigrant visa sections">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{t(tab.label)}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab 1: Intake & Documents */}
      {activeTab === "checklist" && (
        <div className="space-y-10 animate-in fade-in duration-300">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-primary">
                {t(tx("A. Core Application Documents", "أ. مستندات الطلب الأساسية الإلزامية"))}
              </h3>
              <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
                {nivCoreDocs.length} {t(tx("items", "عناصر"))}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {t(
                tx(
                  "Required for all applicants. For many visas, the passport must be valid for at least 6 months beyond the intended stay. Digital photo must meet State Department specifications.",
                  "مطلوبة لجميع المتقدمين. يجب أن يكون جواز السفر صالحًا لمدة 6 أشهر على الأقل بعد مدة الإقامة المقصودة. يجب أن تطابق الصورة الرقمية مواصفات الخارجية.",
                ),
              )}
            </p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {nivCoreDocs.map((doc, idx) => (
                <li key={idx} className="flex gap-3 rounded-lg border bg-card p-3 text-xs sm:text-sm">
                  <span className="text-status-green font-bold shrink-0">✓</span>
                  <span>{t(doc)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-primary">
                {t(tx("B. Conditional Supporting Documents", "ب. المستندات الداعمة المشروطة"))}
              </h3>
              <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-medium text-gold">
                {nivConditionalDocs.length} {t(tx("items", "عناصر"))}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {t(
                tx(
                  "Conditional evidence based on your category and home-country circumstances. There is no universal bank balance rule; invitation letters are not mandatory for visitor visas. Do not purchase final tickets before visa issuance.",
                  "أدلة مشروطة بحسب الفئة وظروف الروابط بالوطن. لا توجد قاعدة عامة تلزم برصيد بنكي محدد؛ وخطابات الدعوة ليست إلزامية لتأشيرات الزيارة. لا تقم بشراء تذاكر نهائية قبل صدور التأشيرة.",
                ),
              )}
            </p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {nivConditionalDocs.map((doc, idx) => (
                <li key={idx} className="flex gap-3 rounded-lg border bg-card p-3 text-xs sm:text-sm">
                  <span className="text-accent font-bold shrink-0">▢</span>
                  <span>{t(doc)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-primary">
                {t(tx("Universal Client Questionnaire (DS-160 Intake)", "استبيان العميل العام (إعداد DS-160)"))}
              </h3>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {universalIntakeQuestions.length} {t(tx("questions", "سؤالًا"))}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {t(
                tx(
                  "Universal intake covering biographic details, travel plans, contact history, family background, employment, education, and official security screening.",
                  "استبيان شامل يشمل البيانات الشخصية، وخطط السفر، وتاريخ الاتصال، والبيانات العائلية، والعمل، والتعليم، والفحص الأمني الرسمي.",
                ),
              )}
            </p>
            <div className="mt-4 max-h-96 space-y-2 overflow-y-auto rounded-xl border bg-muted/30 p-4">
              {universalIntakeQuestions.map((q, idx) => (
                <div key={q.id} className="border-b border-border/50 pb-2.5 last:border-0">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-xs font-bold text-accent shrink-0">
                      {String(idx + 1).padStart(2, "0")}.
                    </span>
                    <span className="text-xs sm:text-sm text-foreground">{t(q.q)}</span>
                    {q.type === "yesno" && (
                      <span className="ms-auto rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary shrink-0">
                        {t(tx("Yes/No", "نعم/لا"))}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Category-Specific Intake */}
      {activeTab === "category_intake" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <p className="text-sm text-muted-foreground">
            {t(
              tx(
                "Add these specific questions and documents to the general intake based on your selected classification. Requirements are conditional on classification, individual facts, and consular post instructions.",
                "أضف هذه الأسئلة والمستندات التخصصية إلى الاستبيان العام بناءً على الفئة المختارة. تختلف المتطلبات بحسب الفئة والظروف الفردية وتعليمات القنصلية.",
              ),
            )}
          </p>

          {/* Category Selector Chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORY_INTAKES.map((cat, idx) => (
              <button
                key={cat.category}
                type="button"
                onClick={() => setSelectedCategoryIdx(idx)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  selectedCategoryIdx === idx
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {t(cat.title)}
              </button>
            ))}
          </div>

          {/* Active Category Display */}
          <div className="rounded-xl border bg-card p-5 sm:p-6 shadow-sm space-y-6">
            <div className="border-b pb-4">
              <span className="font-mono text-xs font-semibold uppercase text-accent">
                {activeCategoryIntake.category}
              </span>
              <h4 className="mt-1 text-xl font-bold text-primary">{t(activeCategoryIntake.title)}</h4>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-primary">
                {t(tx("Additional Client Questions", "أسئلة العميل الإضافية للفئة"))}
              </h5>
              <ul className="mt-3 grid gap-2 text-xs sm:text-sm">
                {activeCategoryIntake.questions.map((q) => (
                  <li key={q.id} className="flex gap-2 rounded-lg bg-muted/40 p-2.5">
                    <span className="text-accent font-bold">?</span>
                    <span>{t(q.q)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-primary">
                {t(tx("Additional Category Documents", "المستندات الإضافية المطلوبة للفئة"))}
              </h5>
              <ul className="mt-3 grid gap-2 text-xs sm:text-sm">
                {activeCategoryIntake.docs.map((doc, idx) => (
                  <li key={idx} className="flex gap-2 rounded-lg bg-muted/40 p-2.5">
                    <span className="text-status-green font-bold">✓</span>
                    <span>{t(doc)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: All Nonimmigrant Visa Categories Directory */}
      {activeTab === "directory" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-primary">
                {t(tx("Comprehensive Category Directory (40+ Categories)", "دليل تصنيفات تأشيرات غير المهاجرين الشامل (40+ فئة)"))}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {t(tx("Eligibility, nationality restrictions, and dependent rules differ per category.", "تختلف شروط الأهلية والقيود الخاصة بالجنسيات وقواعد المرافقين باختلاف كل فئة."))}
              </p>
            </div>
            <div className="relative max-w-xs">
              <Search className="absolute start-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder={t(tx("Search categories (e.g. B-1, F-1, H-1B)...", "ابحث عن فئة (مثل B-1، F-1، H-1B)..."))}
                className="w-full rounded-md border bg-card ps-9 pe-3 py-1.5 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border bg-card">
            <table className="w-full text-start text-xs sm:text-sm">
              <thead className="border-b bg-muted/50 font-medium text-muted-foreground">
                <tr>
                  <th className="p-3 text-start">{t(tx("Category", "الفئة"))}</th>
                  <th className="p-3 text-start">{t(tx("Main Purpose", "الغرض الرئيسي"))}</th>
                  <th className="p-3 text-start">{t(tx("Family / Dependent Category", "فئة الأسرة / المرافقين"))}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredCategories.map((c) => (
                  <tr key={c.code} className="hover:bg-muted/30">
                    <td className="p-3 font-mono font-bold text-accent whitespace-nowrap">{c.code}</td>
                    <td className="p-3">
                      <div className="font-medium text-foreground">{t(c.name)}</div>
                      <div className="text-xs text-muted-foreground">{t(c.purpose)}</div>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">{t(c.dependent)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Government Forms Inventory */}
      {activeTab === "forms" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div>
            <h3 className="text-xl font-semibold text-primary">
              {t(tx("Government Forms Inventory", "حصر النماذج الحكومية لتأشيرات غير المهاجرين"))}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {t(
                tx(
                  "A procedure-based inventory, not a package every visa applicant files. Official instructions for fees, supplements, and filing methods control.",
                  "حصر إجرائي وليس حزمة يقدمها كل متقدم. تسري دائمًا التعليمات الرسمية للرسوم والملاحق وطريقة التقديم.",
                ),
              )}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {NIV_FORMS_INVENTORY.map((f) => (
              <div key={f.code} className="rounded-xl border bg-card p-4 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-primary">{f.code}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      f.agency === "DOS" ? "bg-accent/15 text-accent" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {f.agency}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-foreground">{t(f.title)}</h4>
                <p className="text-xs text-muted-foreground">{t(f.purpose)}</p>
                <div className="mt-2 rounded bg-muted/50 p-2 text-[11px] text-muted-foreground">
                  <span className="font-semibold text-foreground">{t(tx("Applicability: ", "نطاق الانطباق: "))}</span>
                  {t(f.applicability)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Submission & Portal Handling */}
      {activeTab === "submission" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h3 className="text-xl font-semibold text-primary">
              {t(tx("Upload, Submission & Consular Handling Matrix", "مصفوفة معالجة الرفع والتقديم القنصلي"))}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {t(
                tx(
                  "Clear distinction between what is uploaded to MIGRAFILE for preparation and what is submitted to the U.S. government.",
                  "توضيح الفارق بين ما يُرفع على MIGRAFILE للمراجعة والإعداد وما يُقدم للجهات الحكومية الأمريكية.",
                ),
              )}
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border bg-card">
            <table className="w-full text-start text-xs sm:text-sm">
              <thead className="border-b bg-muted/50 font-medium text-muted-foreground">
                <tr>
                  <th className="p-3 text-start">{t(tx("Item", "البند"))}</th>
                  <th className="p-3 text-start">{t(tx("Client Portal Handling", "التعامل على بوابة العميل"))}</th>
                  <th className="p-3 text-start">{t(tx("Government Handling", "التعامل الحكومي الرسمي"))}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {NIV_HANDLING_MATRIX.map((m, idx) => (
                  <tr key={idx} className="hover:bg-muted/30">
                    <td className="p-3 font-medium text-primary">{t(m.item)}</td>
                    <td className="p-3 text-muted-foreground">{t(m.clientPortal)}</td>
                    <td className="p-3 text-foreground">{t(m.governmentHandling)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border bg-muted/40 p-4 text-xs sm:text-sm text-muted-foreground">
            <h4 className="font-semibold text-foreground">
              {t(tx("MigraFile Workflow Rules", "قواعد سير عمل MigraFile"))}
            </h4>
            <p className="mt-1">
              {t(
                tx(
                  "Make the core intake universal, then show category-specific questions and documents. Every document is marked Required, Conditional, or Optional, and tracked as Missing, Uploaded, Reviewed, or Submitted. An uploaded document should only become 'Submitted' after the actual government submission is recorded.",
                  "الاستبيان الأساسي عام لجميع المتقدمين، ثم تُعرض الأسئلة والمستندات الخاصة بكل فئة. يُصنف كل مستند كـ (إلزامي، مشروط، أو اختياري)، وتُتتبع حالته كـ (مفقود، تم الرفع، قيد المراجعة، أو تم التقديم). لا يتحول المستند المرفوع إلى 'تم التقديم' إلا بعد تسجيل التقديم الحكومي الفعلي.",
                ),
              )}
            </p>
          </div>
        </div>
      )}

      {/* Tab 6: Official References */}
      {activeTab === "references" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h3 className="text-xl font-semibold text-primary">
              {t(tx("Official Reference Links", "المصادر والروابط الرسمية المعتمدة"))}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {t(
                tx(
                  "Official United States government sources for regulations, DS-160 instructions, and embassy requirements.",
                  "المصادر الرسمية لحكومة الولايات المتحدة للتعليمات ونموذج DS-160 ومتطلبات السفارات.",
                ),
              )}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {NIV_OFFICIAL_REFERENCES.map((ref) => (
              <a
                key={ref.num}
                href={ref.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between rounded-xl border bg-card p-4 transition hover:border-accent hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-gold">
                    <span>[{ref.num}]</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-60 transition group-hover:opacity-100" />
                  </div>
                  <h4 className="mt-2 text-sm font-semibold text-primary group-hover:text-accent">
                    {t(ref.title)}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">{t(ref.desc)}</p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-accent">
                  {t(tx("Visit official source", "زيارة المصدر الرسمي"))} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
