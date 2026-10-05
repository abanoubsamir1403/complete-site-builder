import { createFileRoute } from "@tanstack/react-router";
import { tx } from "@/lib/i18n";
import { TextPage } from "@/components/site/TextPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/how-it-works")({
  head: () => seo('How It Works', 'From intake to a client-approved package: scope review, document specialist, independent quality control.'),
  component: PHowItWorks,
});

function PHowItWorks() {
  return (
    <TextPage
      eyebrow={tx("How it works","كيف نعمل")}
      title={tx("A clear process you control","إجراء واضح أنت تتحكم فيه")}
      blocks={[{h:tx("1. Intake","1. الاستلام"),p:tx("You choose the service and provide your facts and documents.","تختار الخدمة وتقدم معلوماتك ومستنداتك.")},{h:tx("2. Scope review — GREEN / YELLOW / RED","2. مراجعة النطاق — أخضر/أصفر/أحمر"),p:tx("We confirm the request is administrative and within our scope.","نتأكد أن الطلب إداري وضمن نطاقنا.")},{h:tx("3. Document specialist","3. أخصائي المستندات"),p:tx("Your file is organized, translated and a missing-documents report is issued.","يُنظم ملفك ويُترجم ويصدر تقرير بالمستندات الناقصة.")},{h:tx("4. Independent quality control","4. مراجعة جودة مستقلة"),p:tx("A second reviewer checks consistency before you see the package.","مراجع ثانٍ يفحص الاتساق قبل عرض الملف عليك.")},{h:tx("5. Your review & authorization","5. مراجعتك وتفويضك"),p:tx("You review every answer, approve and sign. Nothing is submitted without you.","تراجع كل إجابة وتعتمد وتوقع. لا يُرسل شيء بدونك.")}]}
    />
  );
}
