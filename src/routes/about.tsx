import { createFileRoute } from "@tanstack/react-router";
import { tx } from "@/lib/i18n";
import { TextPage } from "@/components/site/TextPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About MIGRAFILE", "Learn about MIGRAFILE's client-directed U.S. immigration documentation services."),
  component: PAbout,
});

function PAbout() {
  return (
    <TextPage
      eyebrow={tx("About","من نحن")}
      title={tx("Documentation specialists, not a law firm","متخصصون في التوثيق، ولسنا مكتب محاماة")}
      intro={tx("We organize the immigration process. You stay in control.","نحن ننظم إجراءات الهجرة. وأنت تبقى صاحب القرار.")}
      blocks={[{h:tx("What we do","ماذا نفعل"),p:tx("Client-directed administrative documentation: organizing, translating, data entry and tracking.","توثيق إداري بتوجيه من العميل: تنظيم وترجمة وإدخال بيانات ومتابعة.")}]}
    />
  );
}
