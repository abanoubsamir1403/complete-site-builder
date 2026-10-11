import { createFileRoute } from "@tanstack/react-router";
import { tx } from "@/lib/i18n";
import { TextPage } from "@/components/site/TextPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/how-it-works")({
  head: () => seo("How It Works", "From intake to a package you review and approve. Private, client-directed administrative document organization."),
  component: PHowItWorks,
});

function PHowItWorks() {
  return (
    <TextPage
      eyebrow={tx("How it works","كيف نعمل")}
      title={tx("A clear process you control","إجراء واضح أنت تتحكم فيه")}
      blocks={[
        {
          h: tx("1. Intake", "1. بدء الخدمة"),
          p: tx("You select the administrative task and provide the records and information you want organized.", "تختار المهمة الإدارية وتقدم السجلات والمعلومات التي تريد تنظيمها."),
        },
        {
          h: tx("2. Service-scope check", "2. التحقق من نطاق الخدمة"),
          p: tx("We check only whether the requested administrative task is permitted and within MIGRAFILE's scope. We do not assess immigration eligibility.", "نتحقق فقط مما إذا كانت المهمة الإدارية المطلوبة مسموحًا بها وضمن نطاق MIGRAFILE. لا نقيّم أهلية الهجرة."),
        },
        {
          h: tx("3. Administrative Documentation Coordinator", "3. منسق التوثيق الإداري"),
          p: tx("Your records are organized according to your instructions. Evidence is indexed only when identified by you, authorized counsel, or an explicit official checklist.", "تُنظم سجلاتك وفق تعليماتك. ولا تُفهرس الأدلة إلا إذا حددتها أنت أو محامٍ مخوّل أو قائمة رسمية صريحة."),
        },
        {
          h: tx("4. Clerical consistency check", "4. فحص الاتساق الكتابي"),
          p: tx("A second team member checks clerical consistency and completion against your instructions. This is not legal review or external oversight.", "يفحص عضو ثانٍ من الفريق الاتساق الكتابي واكتمال العمل وفق تعليماتك. هذه ليست مراجعة قانونية أو رقابة خارجية."),
        },
        {
          h: tx("5. Your review and approval", "5. مراجعتك واعتمادك"),
          p: tx("You review and approve the package. This is not government acceptance or legal review. Any separately agreed submission requires your approval of the exact final files, destination, action, and date, plus any required form-specific signature; onboarding consent is not submission approval.", "تراجع الحزمة وتعتمدها. هذا لا يعني قبولًا حكوميًا أو مراجعة قانونية. وأي تقديم يُتفق عليه بشكل منفصل يتطلب موافقتك على الملفات النهائية المحددة والجهة المستلمة والإجراء والتاريخ، إضافة إلى أي توقيع خاص بالنموذج؛ ولا تُعد موافقة بدء الخدمة موافقةً على التقديم."),
        },
      ]}
    />
  );
}
