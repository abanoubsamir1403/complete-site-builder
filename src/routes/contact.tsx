import { createFileRoute } from "@tanstack/react-router";
import { tx } from "@/lib/i18n";
import { TextPage } from "@/components/site/TextPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo('Contact & Complaints', 'Contact MIGRAFILE or file a complaint about our services.'),
  component: PContact,
});

function PContact() {
  return (
    <TextPage
      eyebrow={tx("Contact","التواصل")}
      title={tx("Contact & complaints","التواصل والشكاوى")}
      notice={tx("Do not send passports or personal documents by email. A secure portal is coming.","لا ترسل جوازات السفر أو مستنداتك الشخصية عبر البريد. البوابة الآمنة قادمة.")}
      blocks={[{h:tx("Contact details","بيانات التواصل"),items:[tx("Email — to be confirmed","البريد الإلكتروني — يُحدد لاحقًا"),tx("Phone / WhatsApp — to be confirmed","الهاتف / واتساب — يُحدد لاحقًا"),tx("Office address — to be confirmed","عنوان المكتب — يُحدد لاحقًا")]},{h:tx("Complaints","الشكاوى"),p:tx("Every complaint receives a reference number and a written response. The complaints process will be published before launch.","كل شكوى تحصل على رقم مرجعي ورد مكتوب. سيتم نشر إجراء الشكاوى قبل الإطلاق.")}]}
    />
  );
}
