import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { tx, useLang } from "@/lib/i18n";
import { officialResources } from "@/lib/content";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/resources")({
  head: () => seo("Official Government Directory", "Direct links to USCIS, the U.S. Department of State, CEAC, CBP, EOIR and the U.S. Embassy in Cairo."),
  component: Resources,
});

function Resources() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={tx("Official resources", "المصادر الرسمية")} title={tx("Official government directory", "دليل الجهات الحكومية الرسمية")} intro={tx("Go straight to the source. These sites are operated by the U.S. government, not by MIGRAFILE.", "اذهب مباشرة إلى المصدر. هذه المواقع تديرها الحكومة الأمريكية وليس MIGRAFILE.")} />
      <Container className="py-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {officialResources.map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noreferrer" className="doc-card group min-w-0">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <h2 className="ltr text-lg font-medium text-primary">{r.name}</h2>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-accent" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t(r.desc)}</p>
              <p className="ltr mt-3 truncate font-mono text-xs text-accent">{r.url.replace("https://", "")}</p>
            </a>
          ))}
        </div>
        <div className="mt-10"><Notice>{t(tx("Government websites end in .gov. Be cautious of sites that imitate official agencies.", "المواقع الحكومية تنتهي بـ .gov. احذر من المواقع التي تقلد الجهات الرسمية."))}</Notice></div>
      </Container>
    </>
  );
}
