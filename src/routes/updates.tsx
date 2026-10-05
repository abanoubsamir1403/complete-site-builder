import { createFileRoute } from "@tanstack/react-router";
import { tx } from "@/lib/i18n";
import { TextPage } from "@/components/site/TextPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/updates")({
  head: () => seo('Updates & Alerts', 'Source-labeled updates on USCIS and Department of State administrative changes.'),
  component: PUpdates,
});

function PUpdates() {
  return (
    <TextPage
      eyebrow={tx("Updates","التحديثات")}
      title={tx("Updates & alerts","التحديثات والتنبيهات")}
      intro={tx("Every update cites its official source and review date.","كل تحديث يذكر مصدره الرسمي وتاريخ مراجعته.")}
      blocks={[{h:tx("No published updates yet","لا توجد تحديثات منشورة بعد"),p:tx("Updates are published only after source verification by our team.","تُنشر التحديثات فقط بعد التحقق من المصدر.")},{h:tx("Where to check meanwhile","أين تتابع حاليًا"),items:[tx("USCIS Newsroom — uscis.gov/newsroom","أخبار USCIS — uscis.gov/newsroom"),tx("Visa Bulletin — travel.state.gov","نشرة التأشيرات — travel.state.gov")]}]}
    />
  );
}
