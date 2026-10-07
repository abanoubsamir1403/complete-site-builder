import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { tx, useLang, type T } from "@/lib/i18n";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/find-assistance")({
  head: () => seo("Find Documentation Assistance", "Identify the administrative help you need — file organization, data entry or tracking. We never recommend legal routes."),
  component: Finder,
});

const helpTypes: { k: string; l: T; to: string }[] = [
  { k: "entry", l: tx("Data entry for a form I already selected", "إدخال بيانات لنموذج اخترته"), to: "administrative" },
  { k: "organize", l: tx("Organizing an existing file", "تنظيم ملف قائم"), to: "" },
  { k: "review", l: tx("Administrative document review", "مراجعة إدارية للمستندات"), to: "" },
  { k: "tracking", l: tx("Tracking", "متابعة"), to: "" },
  { k: "resources", l: tx("General resources only", "مصادر عامة فقط"), to: "" },
];

const selected: { k: string; l: T }[] = [
  { k: "self", l: tx("Yes, I selected it myself", "نعم، اخترته بنفسي") },
  { k: "counsel", l: tx("Yes, instructed by qualified counsel", "نعم، بتوجيه من محامٍ مؤهل") },
  { k: "agency", l: tx("Yes, from agency correspondence", "نعم، من مراسلة جهة حكومية") },
  { k: "unknown", l: tx("I do not know which process to use", "لا أعرف أي إجراء أستخدم") },
];

function Opt({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={active} className={`rounded-md border px-4 py-3 text-start text-sm transition ${active ? "border-accent bg-accent/10 text-primary" : "bg-card hover:border-accent/50"}`}>
      {children}
    </button>
  );
}

function Finder() {
  const { t } = useLang();
  const [help, setHelp] = useState<string>();
  const [sel, setSel] = useState<string>();
  const [form, setForm] = useState("");
  const [confirm, setConfirm] = useState(false);
  const h = helpTypes.find((x) => x.k === help);

  return (
    <>
      <PageHeader
        eyebrow={tx("Service finder", "دليل الخدمة")}
        title={tx("Find documentation assistance", "ابحث عن المساعدة التوثيقية")}
        intro={tx("This identifies administrative help — not the visa you qualify for.", "هذا يحدد المساعدة الإدارية — وليس التأشيرة التي تستحقها.")}
      />
      <Container className="max-w-3xl py-16">
        <ol className="grid gap-12">
          <li>
            <p className="font-medium text-primary">1. {t(tx("What kind of help are you requesting?", "ما نوع المساعدة التي تطلبها؟"))}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {helpTypes.map((x) => <Opt key={x.k} active={help === x.k} onClick={() => setHelp(x.k)}>{t(x.l)}</Opt>)}
            </div>
          </li>
          {help && help !== "resources" && (
            <li>
              <p className="font-medium text-primary">2. {t(tx("Have you already selected a process or form?", "هل اخترت إجراءً أو نموذجًا بالفعل؟"))}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {selected.map((x) => <Opt key={x.k} active={sel === x.k} onClick={() => setSel(x.k)}>{t(x.l)}</Opt>)}
              </div>
              {sel && sel !== "unknown" && (
                <div className="mt-6">
                  <label className="text-sm text-muted-foreground" htmlFor="form">{t(tx("Form or process (e.g. I-130, NVC case)", "النموذج أو الإجراء (مثل I-130 أو قضية NVC)"))}</label>
                  <input id="form" value={form} onChange={(e) => setForm(e.target.value)} className="ltr mt-2 w-full rounded-md border bg-card px-3 py-2.5" />
                  <label className="mt-4 flex items-start gap-3 text-sm">
                    <input type="checkbox" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} className="mt-1" />
                    {t(tx("I confirm I selected this process myself or with qualified counsel. MIGRAFILE has not recommended it.", "أؤكد أنني اخترت هذا الإجراء بنفسي أو مع محامٍ مؤهل، ولم توصِ به MIGRAFILE."))}
                  </label>
                </div>
              )}
            </li>
          )}
        </ol>

        <div className="mt-12">
          {help === "resources" || sel === "unknown" ? (
            <Notice>
              {t(tx("We can't select a process for you. Review neutral official resources, or seek help from qualified U.S. immigration counsel.", "لا يمكننا اختيار الإجراء نيابة عنك. راجع المصادر الرسمية المحايدة أو استعن بمحامٍ أمريكي مؤهل."))}{" "}
              <Link to="/resources" className="text-accent underline">{t(tx("Official resources", "المصادر الرسمية"))}</Link>
            </Notice>
          ) : h && confirm && form ? (
            <div className="rounded-lg border bg-card p-6">
              <p className="text-sm text-muted-foreground">{t(tx("Your request", "طلبك"))}</p>
              <p className="mt-2 text-lg text-primary">
                {t(tx("You requested", "لقد طلبت"))} <strong>{t(h.l)}</strong>{form && <> — <span className="ltr font-mono">{form}</span></>}.{" "}
                {t(tx("Confirm this is the administrative assistance you want.", "أكد أن هذه هي المساعدة الإدارية التي تريدها."))}
              </p>
              <Link to="/portal" className="btn-primary mt-5">{t(tx("Continue", "متابعة"))}</Link>
            </div>
          ) : null}
        </div>
      </Container>
    </>
  );
}
