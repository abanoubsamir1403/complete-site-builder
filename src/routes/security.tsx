import { createFileRoute } from "@tanstack/react-router";
import { Container, PageHeader } from "@/components/site/Layout";
import { tx, useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";

const sections = [
  {
    heading: tx("Exclusive purpose of data collection", "الغرض الحصري من جمع البيانات"),
    body: tx(
      "We collect personal information (such as names, addresses, and family details) and sensitive supporting documents only as needed to provide the administrative task you requested. We use your information according to your instructions and the scope of the service. We do not use your data for marketing purposes or sell it to third parties.",
      "نجمع المعلومات الشخصية (مثل الأسماء والعناوين وتفاصيل الأسرة) والمستندات الداعمة الحساسة عند الحاجة لتنفيذ المهمة الإدارية التي طلبتها فقط. نستخدم معلوماتك وفقًا لتعليماتك ونطاق الخدمة. لا نستخدم بياناتك لأغراض التسويق ولا نبيعها لأطراف ثالثة.",
    ),
  },
  {
    heading: tx(
      "Legal disclaimer and no attorney-client privilege",
      "إخلاء المسؤولية القانونية وعدم وجود امتياز السرية بين المحامي والموكل",
    ),
    body: tx(
      "MIGRAFILE is a private, client-directed administrative document preparation service. We are not a law firm, are not affiliated with U.S. Citizenship and Immigration Services (USCIS) or any other government agency, and do not provide legal advice, representation, or legal strategies. By using our services, you acknowledge that no attorney-client relationship is established. Communications between you and MIGRAFILE are treated as confidential under this Privacy Policy but are not protected by attorney-client privilege.",
      "MIGRAFILE خدمة خاصة لإعداد المستندات الإدارية بناءً على توجيهات العميل. لسنا مكتب محاماة، ولا نتبع إدارة خدمات المواطنة والهجرة الأمريكية (USCIS) أو أي جهة حكومية أخرى، ولا نقدم استشارات قانونية أو تمثيلًا أو استراتيجيات قانونية. باستخدامك لخدماتنا، تقرّ بعدم نشوء علاقة محامٍ وموكل. تُعامل المراسلات بينك وبين MIGRAFILE بسرية وفق سياسة الخصوصية هذه، لكنها لا تتمتع بامتياز السرية القانونية بين المحامي والموكل.",
    ),
  },
  {
    heading: tx("No direct government sharing", "عدم مشاركة البيانات مباشرةً مع الجهات الحكومية"),
    body: tx(
      "MIGRAFILE does not submit files unless a separate submission service is agreed. Before any submission, you must approve the exact final files, destination, action, and date, and provide any form-specific signature required. General onboarding consent is not approval of a later submission.",
      "لا تقدم MIGRAFILE الملفات إلا إذا تم الاتفاق على خدمة تقديم منفصلة. قبل أي تقديم، يجب أن توافق على الملفات النهائية المحددة والجهة المستلمة والإجراء والتاريخ، وأن تقدم أي توقيع خاص بالنموذج مطلوب. لا تُعد الموافقة العامة عند بدء الخدمة اعتمادًا لتقديم لاحق.",
    ),
  },
  {
    heading: tx("Data retention and deletion", "الاحتفاظ بالبيانات وحذفها"),
    body: tx(
      "We retain information only as needed to operate the service, meet applicable requirements, and resolve service-related issues. Retention periods may vary by record type. Contact us to ask about access or deletion; requests may be subject to applicable retention requirements.",
      "نحتفظ بالمعلومات للمدة اللازمة لتشغيل الخدمة والامتثال للمتطلبات المنطبقة ومعالجة المسائل المتعلقة بالخدمة. وقد تختلف مدة الاحتفاظ حسب نوع السجل. تواصل معنا للاستفسار عن الوصول إلى بياناتك أو حذفها، مع مراعاة متطلبات الاحتفاظ المنطبقة.",
    ),
  },
  {
    heading: tx("Third-party service providers", "مقدمو الخدمات من الأطراف الثالثة"),
    body: tx(
      "External websites and independent document tools have their own privacy policies and terms. Review them before sharing information. MIGRAFILE does not transfer client files to a new provider without the required disclosure and authorization.",
      "للمواقع الخارجية وأدوات المستندات المستقلة سياسات خصوصية وشروط خاصة بها. راجعها قبل مشاركة المعلومات. لا تنقل MIGRAFILE ملفات العملاء إلى مقدم جديد دون الإفصاح المطلوب والحصول على التفويض.",
    ),
  },
];

const securityPrinciples = [
  tx(
    "We take steps to limit access to private documents. No system can guarantee absolute security.",
    "نتخذ تدابير للحد من الوصول إلى المستندات الخاصة. لا يمكن لأي نظام ضمان الأمان المطلق.",
  ),
  tx(
    "Case tracking requires authentication — never by case number alone.",
    "تتطلب متابعة القضية تسجيل الدخول، ولا تتم برقم القضية وحده.",
  ),
  tx("We never sell your data.", "لا نبيع بياناتك أبدًا."),
];

export const Route = createFileRoute("/security")({
  head: () =>
    seo(
      "Privacy Policy & Legal Disclaimer",
      "Learn how MIGRAFILE handles personal information and the legal scope of its administrative document preparation services.",
    ),
  component: PSecurity,
});

function PSecurity() {
  const { t } = useLang();

  return (
    <>
      <PageHeader
        eyebrow={tx("Security & privacy", "الأمان والخصوصية")}
        title={tx("Privacy Policy & Legal Disclaimer", "سياسة الخصوصية وإخلاء المسؤولية القانونية")}
        intro={tx("Last Updated: 11/10/2026", "آخر تحديث: 11/10/2026")}
      />
      <Container className="max-w-3xl py-14">
        <div className="grid gap-10">
          <section>
            <h2 className="text-2xl text-primary">
              {t(tx("Security principles", "مبادئ الأمان"))}
            </h2>
            <ul className="mt-4 grid gap-2">
              {securityPrinciples.map((principle) => (
                <li key={principle.en} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-gold">—</span>
                  {t(principle)}
                </li>
              ))}
            </ul>
          </section>
          {sections.map((section, index) => (
            <section key={section.heading.en}>
              <h2 className="text-2xl text-primary">
                {index + 1}. {t(section.heading)}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t(section.body)}</p>
            </section>
          ))}
          <section>
            <h2 className="text-2xl text-primary">
              6.{" "}
              {t(tx("Service operator and privacy contact", "مشغّل الخدمة وجهة التواصل للخصوصية"))}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {t(
                tx(
                  "MIGRAFILE is a private online service operated by Bobs Preparation LLC. The correspondence address is 618 S Broad St, Lansdale, PA 19446-5200 USA 🇺🇸; it is not a walk-in location. For privacy requests or questions, contact Support@migrafile.com.",
                  "MIGRAFILE خدمة خاصة عبر الإنترنت تشغّلها Bobs Preparation LLC. عنوان المراسلات هو 618 S Broad St, Lansdale, PA 19446-5200 USA 🇺🇸، وليس موقعًا لاستقبال الزوار. لطلبات الخصوصية أو الاستفسارات، تواصل عبر Support@migrafile.com.",
                ),
              )}
            </p>
          </section>
          <section>
            <h2 className="text-2xl text-primary">7. {t(tx("Your rights", "حقوقك"))}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {t(
                tx(
                  "You have the right to access, review, update, or request the immediate deletion of your personal data at any time. If you wish to exercise these rights or have any questions about this policy, contact us:",
                  "يحق لك الوصول إلى بياناتك الشخصية ومراجعتها وتحديثها أو طلب حذفها فورًا في أي وقت. لممارسة هذه الحقوق أو للاستفسار عن هذه السياسة، تواصل معنا:",
                ),
              )}
            </p>
            <ul className="mt-4 grid gap-2 text-sm">
              <li>
                <span className="font-medium text-primary">
                  {t(tx("Email:", "البريد الإلكتروني:"))}{" "}
                </span>
                <a className="ltr text-accent hover:underline" href="mailto:Support@migrafile.com">
                  Support@migrafile.com
                </a>
              </li>
              <li>
                <span className="font-medium text-primary">
                  {t(tx("Phone/WhatsApp:", "الهاتف/واتساب:"))}{" "}
                </span>
                <a className="ltr text-accent hover:underline" href="tel:+12674677785">
                  +1 (267) 467-7785
                </a>
              </li>
            </ul>
          </section>
        </div>
      </Container>
    </>
  );
}
