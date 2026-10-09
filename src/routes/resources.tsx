import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { tx, useLang } from "@/lib/i18n";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

const resources = [
  {
    name: "America.gov",
    url: "https://america.gov/",
    subtitle: tx("U.S. Government AI-Powered Information Assistant", "مساعد معلومات حكومي أمريكي مدعوم بالذكاء الاصطناعي"),
    desc: tx(
      "Find answers to your questions using information from official U.S. government sources.",
      "اعثر على إجابات لأسئلتك باستخدام معلومات من مصادر حكومية أمريكية رسمية.",
    ),
  },
  {
    name: "USA.gov",
    url: "https://www.usa.gov/",
    subtitle: tx("Official Guide to U.S. Government Information and Services", "الدليل الرسمي لمعلومات وخدمات الحكومة الأمريكية"),
    desc: tx(
      "Explore government services, benefits, agencies, and official resources in one place.",
      "استكشف الخدمات الحكومية والمزايا والوكالات والمصادر الرسمية في مكان واحد.",
    ),
  },
];

export const Route = createFileRoute("/resources")({
  head: () => seo("Official Government Directory", "Official links to America.gov and USA.gov."),
  component: Resources,
});

function Resources() {
  const { t } = useLang();
  return (
    <>
      <PageHeader
        eyebrow={tx("Official resources", "المصادر الرسمية")}
        title={tx("Official government directory", "دليل الجهات الحكومية الرسمية")}
        intro={tx(
          "Go straight to the source. These sites are operated by the U.S. government, not by MIGRAFILE.",
          "اذهب مباشرة إلى المصدر. هذه المواقع تديرها الحكومة الأمريكية وليس MIGRAFILE.",
        )}
      />
      <Container className="py-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="doc-card group min-w-0"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <h2 className="ltr text-lg font-medium text-primary">{resource.name}</h2>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-accent" />
              </div>
              <p className="mt-2 text-sm font-medium text-primary">{t(resource.subtitle)}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t(resource.desc)}</p>
              <p className="ltr mt-3 truncate font-mono text-xs text-accent">{resource.url.replace("https://", "")}</p>
            </a>
          ))}
        </div>
        <div className="mt-10">
          <Notice>
            {t(
              tx(
                "Government websites end in .gov. Be cautious of sites that imitate official agencies.",
                "المواقع الحكومية تنتهي بـ .gov. احذر من المواقع التي تقلد الجهات الرسمية.",
              ),
            )}
          </Notice>
        </div>
      </Container>
    </>
  );
}
