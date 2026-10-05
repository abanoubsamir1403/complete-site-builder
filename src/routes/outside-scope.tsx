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
      blocks={[{h:tx("We do not","نحن لا"),items:[tx("Give legal advice or recommend a visa, form or legal route","نقدم استشارات قانونية أو نرشح تأشيرة أو نموذجًا أو مسارًا"),tx("Determine eligibility, citizenship or sponsor eligibility","نحدد الأهلية أو الجنسية أو أهلية الكفيل"),tx("Predict approval chances","نتوقع فرص الموافقة"),tx("Handle waivers, inadmissibility, removal defense or asylum strategy","نتعامل مع الإعفاءات أو عدم القبول أو الترحيل أو اللجوء"),tx("Represent you before USCIS, the State Department or immigration court","نمثلك أمام USCIS أو الخارجية أو محاكم الهجرة")]},{h:tx("What happens instead","ماذا يحدث بدلًا من ذلك"),p:tx("Affected work is placed on hold (RED) and you are directed to independently qualified U.S. counsel.","يُوقف العمل المتأثر (أحمر) ونوجهك لمحامٍ أمريكي مؤهل ومستقل.")}]}
    />
  );
}
