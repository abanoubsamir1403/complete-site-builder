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
      title={tx("Administrative Documentation Coordinators, not a law firm","منسقو التوثيق الإداري، ولسنا مكتب محاماة")}
      intro={tx("We organize the immigration process. You stay in control.","نحن ننظم إجراءات الهجرة. وأنت تبقى صاحب القرار.")}
      blocks={[{h:tx("What we do","ماذا نفعل"),p:tx("Client-directed administrative documentation: organizing, translating and entering client-provided data. Any case tracking is limited to administrative tasks expressly listed in the service order.","توثيق إداري بتوجيه من العميل: تنظيم المستندات وترجمتها وإدخال البيانات التي يقدمها العميل. وتقتصر متابعة الملفات على المهام الإدارية المحددة صراحةً في أمر الخدمة.")}]}
    />
  );
}
