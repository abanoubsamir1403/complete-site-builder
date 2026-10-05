import { createFileRoute } from "@tanstack/react-router";
import { tx } from "@/lib/i18n";
import { TextPage } from "@/components/site/TextPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/track")({
  head: () => seo('Track My Case', 'Secure client portal for tracking your MIGRAFILE case.'),
  component: PTrack,
});

function PTrack() {
  return (
    <TextPage
      eyebrow={tx("Client portal","بوابة العملاء")}
      title={tx("Track my case","تتبع قضيتي")}
      intro={tx("Secure sign-in is required to view any case information.","يلزم تسجيل دخول آمن لعرض أي معلومات عن القضية.")}
      blocks={[{h:tx("Coming in the next phase","قادمة في المرحلة القادمة"),p:tx("The secure portal — documents, tasks, approvals and tracking — is being built. For your protection, cases cannot be looked up by case number alone.","البوابة الآمنة — المستندات والمهام والموافقات والمتابعة — قيد الإنشاء. لحمايتك، لا يمكن البحث عن القضايا برقم القضية وحده.")}]}
    />
  );
}
