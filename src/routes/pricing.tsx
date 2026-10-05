import { createFileRoute } from "@tanstack/react-router";
import { tx } from "@/lib/i18n";
import { TextPage } from "@/components/site/TextPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () => seo('Pricing & Fees', 'MIGRAFILE service fees and how they differ from government filing fees.'),
  component: PPricing,
});

function PPricing() {
  return (
    <TextPage
      eyebrow={tx("Fees Center","مركز الرسوم")}
      title={tx("Pricing & fees","الأسعار والرسوم")}
      intro={tx("Transparent, written quotes before any work starts.","عرض سعر مكتوب وواضح قبل بدء أي عمل.")}
      notice={tx("Online payment is not yet enabled.","الدفع الإلكتروني غير مفعّل بعد.")}
      blocks={[{h:tx("Service fees","رسوم الخدمات"),items:[tx("Intake fee — to be confirmed","رسوم الاستلام — يُحدد لاحقًا"),tx("Document preparation — to be confirmed","إعداد المستندات — يُحدد لاحقًا"),tx("Translation (per page) — to be confirmed","الترجمة (للصفحة) — يُحدد لاحقًا"),tx("Case Management Plus — proposed, not yet available","إدارة القضية بلس — مقترحة وغير متاحة بعد")]},{h:tx("Government fees","الرسوم الحكومية"),p:tx("Government filing fees are paid to the agency and are separate from MIGRAFILE fees. Always verify current amounts on uscis.gov/g-1055 or travel.state.gov.","الرسوم الحكومية تُدفع للجهة الحكومية ومنفصلة عن رسوم MIGRAFILE. تحقق دائمًا من القيم الحالية على uscis.gov/g-1055 أو travel.state.gov.")},{h:tx("Refunds","الاسترداد"),p:tx("Refund terms will be published before payments are enabled.","سيتم نشر شروط الاسترداد قبل تفعيل الدفع.")}]}
    />
  );
}
