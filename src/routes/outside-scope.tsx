import { createFileRoute } from "@tanstack/react-router";
import { tx } from "@/lib/i18n";
import { TextPage } from "@/components/site/TextPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/outside-scope")({
  head: () => seo('Services Outside Our Scope', 'What MIGRAFILE does not do: legal advice, eligibility determinations, representation and more.'),
  component: POutsideScope,
});

function POutsideScope() {
  return (
    <TextPage
      eyebrow={tx("Scope","النطاق")}
      title={tx("Services outside our scope","خدمات خارج نطاقنا")}
      intro={tx("When a matter needs legal judgment, we pause and refer you.","عندما يحتاج الأمر لرأي قانوني، نتوقف ونحيلك.")}
      blocks={[
        {
          h: tx("We do not", "لا نقدم"),
          items: [
            tx("Legal advice or recommendations about visas, forms, or immigration options", "مشورة قانونية أو توصيات بشأن التأشيرات أو النماذج أو خيارات الهجرة"),
            tx("Immigration, citizenship, or sponsor-eligibility assessments", "تقييم أهلية الهجرة أو الجنسية أو الكفيل"),
            tx("Predictions about approval", "توقعات بشأن الموافقة"),
            tx("Waiver, inadmissibility, removal-defense, or asylum strategy services", "خدمات استراتيجية للإعفاءات أو عدم القبول أو الدفاع ضد الترحيل أو اللجوء"),
            tx("Representation before USCIS, the State Department, or immigration court", "التمثيل أمام USCIS أو وزارة الخارجية أو محكمة الهجرة"),
          ],
        },
        {
          h: tx("Service-scope check", "التحقق من نطاق الخدمة"),
          p: tx("We check only whether a requested administrative task is permitted and within MIGRAFILE's scope. Out-of-scope work is placed on hold and legal questions are referred to authorized counsel.", "نتحقق فقط مما إذا كانت المهمة الإدارية المطلوبة مسموحًا بها وضمن نطاق MIGRAFILE. نوقف العمل الخارج عن النطاق ونحيل الأسئلة القانونية إلى محامٍ مخوّل."),
        },
      ]}
    />
  );
}
