import { createFileRoute } from "@tanstack/react-router";
import { tx, useLang } from "@/lib/i18n";
import { knowledgeCenters } from "@/lib/content";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/knowledge")({
  head: () => seo("U.S. Immigration Knowledge Hub", "Sourced general educational information on family immigration, NVC, affidavits of support, CRBA, visas and more."),
  component: Knowledge,
});

function Knowledge() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={tx("MIGRAFILE Knowledge", "معرفة MIGRAFILE")} title={tx("U.S. Immigration Knowledge Hub", "مركز المعرفة للهجرة الأمريكية")} intro={tx("General educational information, each article linked to its official source.", "معلومات تعليمية عامة، وكل مقال مرتبط بمصدره الرسمي.")} />
      <Container className="py-12">
        <Notice>{t(tx("Educational content is not legal advice and does not tell you what to file.", "المحتوى التعليمي ليس استشارة قانونية ولا يحدد لك ما يجب تقديمه."))}</Notice>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {knowledgeCenters.map((c, i) => (
            <article key={c.title.en} className="doc-card">
              <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-2 text-xl text-primary">{t(c.title)}</h2>
              <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                {c.topics.map((x) => <li key={x.en}>— {t(x)}</li>)}
              </ul>
              <p className="mt-5 text-xs text-accent">{t(tx("Articles in source review", "المقالات قيد مراجعة المصدر"))}</p>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
