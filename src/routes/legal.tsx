import { createFileRoute } from "@tanstack/react-router";
import { tx } from "@/lib/i18n";
import { TextPage } from "@/components/site/TextPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/legal")({
  head: () => seo('Legal Notice', 'Important legal notice: MIGRAFILE is not a law firm and does not provide legal advice.'),
  component: PLegal,
});

function PLegal() {
  return (
    <TextPage
      eyebrow={tx("Legal","قانوني")}
      title={tx("Important legal notice","إشعار قانوني مهم")}
      blocks={[{h:tx("Not a law firm","لسنا مكتب محاماة"),p:tx("MIGRAFILE is not a law firm, not a U.S. government agency, and is not affiliated with USCIS or the U.S. Department of State. We do not provide legal advice or representation.","MIGRAFILE ليست مكتب محاماة ولا جهة حكومية أمريكية ولا تتبع USCIS أو وزارة الخارجية. لا نقدم استشارات أو تمثيلًا قانونيًا.")},{h:tx("Client-directed document preparation","إعداد مستندات بتوجيه العميل"),p:tx("You select the process and provide the answers. You are responsible for reviewing and approving everything submitted.","أنت تختار الإجراء وتقدم الإجابات، وأنت مسؤول عن مراجعة واعتماد كل ما يُقدّم.")},{h:tx("Terms of service","شروط الخدمة"),p:tx("Full terms, refund policy and client authorization will be published before payments are enabled.","سيتم نشر الشروط الكاملة وسياسة الاسترداد وتفويض العميل قبل تفعيل الدفع.")}]}
    />
  );
}
