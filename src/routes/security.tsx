import { createFileRoute } from "@tanstack/react-router";
import { Container, PageHeader } from "@/components/site/Layout";
import { tx, useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";

const sections = [
  {
    heading: tx("Exclusive purpose of data collection", "الغرض الحصري من جمع البيانات"),
    body: tx(
      "We collect personal information (such as names, addresses, and family details) and sensitive supporting documents strictly for administrative organization and document preparation. Your data is used exclusively to populate the immigration forms you have selected and to organize your file according to your instructions. We do not use your data for marketing purposes, nor do we sell it to third parties.",
      "نجمع المعلومات الشخصية (مثل الأسماء والعناوين وتفاصيل الأسرة) والمستندات الداعمة الحساسة لأغراض التنظيم الإداري وإعداد المستندات فقط. تُستخدم بياناتك حصريًا لإدخال المعلومات في نماذج الهجرة التي اخترتها وتنظيم ملفك وفقًا لتعليماتك. لا نستخدم بياناتك لأغراض التسويق ولا نبيعها لأطراف ثالثة.",
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
      "We operate strictly on your behalf. We will not share, submit, or transmit your personal data or completed files to USCIS, the National Visa Center (NVC), or any embassy without your explicit review and final written consent. You maintain control over when and how your documents are submitted.",
      "نعمل بناءً على توجيهاتك فقط. لن نشارك بياناتك الشخصية أو ملفاتك المكتملة أو نقدمها أو نرسلها إلى USCIS أو المركز الوطني للتأشيرات (NVC) أو أي سفارة دون مراجعتك الصريحة وموافقتك الكتابية النهائية. وتظل أنت صاحب القرار في توقيت تقديم مستنداتك وطريقته.",
    ),
  },
  {
    heading: tx("Data retention and deletion", "الاحتفاظ بالبيانات وحذفها"),
    body: tx(
      "Because immigration documents are highly sensitive, we do not store your files indefinitely. We retain uploaded documents and forms on our secure servers only for the duration of active work on your case. Once your file is finalized and delivered to you, or upon your explicit request at any time, we will permanently delete your documents from our databases.",
      "نظرًا لحساسية مستندات الهجرة، لا نحتفظ بملفاتك إلى أجل غير محدد. نحتفظ بالمستندات والنماذج التي ترفعها على خوادمنا الآمنة طوال فترة العمل الفعلي على قضيتك فقط. بعد استكمال ملفك وتسليمه إليك، أو بناءً على طلبك الصريح في أي وقت، سنحذف مستنداتك نهائيًا من قواعد بياناتنا.",
    ),
  },
  {
    heading: tx("Third-party service providers", "مقدمو الخدمات من الأطراف الثالثة"),
    body: tx(
      "To provide our platform, we use secure third-party service providers for cloud hosting and payment processing, such as Apple Pay, Zelle or Venmo. These providers use encryption and security measures. They are granted access to your data only to the extent necessary to perform their technical functions and are prohibited from using it for any other purpose.",
      "لتوفير منصتنا، نستعين بمقدمي خدمات آمنين من الأطراف الثالثة لاستضافة البيانات السحابية ومعالجة المدفوعات، مثل Zelle أو Venmo أو Apple Pay. يستخدم هؤلاء المزودون التشفير وإجراءات أمنية، ولا يُسمح لهم بالوصول إلى بياناتك إلا بالقدر اللازم لأداء وظائفهم التقنية، ويُحظر عليهم استخدامها لأي غرض آخر.",
    ),
  },
];

const securityPrinciples = [
  tx(
    "Private documents are never publicly accessible.",
    "المستندات الخاصة غير متاحة للعامة أبدًا.",
  ),
  tx(
    "Case tracking requires authentication — never by case number alone.",
    "تتطلب متابعة القضية تسجيل الدخول، ولا تتم برقم القضية وحده.",
  ),
  tx("Staff access is role-based and audited.", "يُحدد وصول الموظفين حسب أدوارهم ويخضع للتدقيق."),
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
            <h2 className="text-2xl text-primary">6. {t(tx("Your rights", "حقوقك"))}</h2>
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
                <a className="ltr text-accent hover:underline" href="mailto:contact@migrafile.com">
                  contact@migrafile.com
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
