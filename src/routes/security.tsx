import { createFileRoute } from "@tanstack/react-router";
import { tx } from "@/lib/i18n";
import { TextPage } from "@/components/site/TextPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/security")({
  head: () => seo('Security & Privacy', 'How MIGRAFILE protects client documents and personal data.'),
  component: PSecurity,
});

function PSecurity() {
  return (
    <TextPage
      eyebrow={tx("Security","الأمان")}
      title={tx("Security & privacy","الأمان والخصوصية")}
      blocks={[{h:tx("Principles","المبادئ"),items:[tx("Private documents are never publicly accessible","المستندات الخاصة غير متاحة للعامة أبدًا"),tx("Case tracking requires authentication — never by case number alone","تتبع القضية يتطلب تسجيل الدخول — وليس برقم القضية وحده"),tx("Staff access is role-based and audited","وصول الموظفين حسب الدور ومسجل"),tx("We never sell your data","لا نبيع بياناتك أبدًا")]},{h:tx("Privacy policy","سياسة الخصوصية"),p:tx("A full privacy policy will be published before the client portal launches.","سيتم نشر سياسة خصوصية كاملة قبل إطلاق بوابة العملاء.")}]}
    />
  );
}
