import { createFileRoute } from "@tanstack/react-router";
import { Container, PageHeader } from "@/components/site/Layout";
import { tx, useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";

const termsSections = [
  {
    heading: tx(
      "Nature of services and legal disclaimer",
      "طبيعة الخدمات وإخلاء المسؤولية القانونية",
    ),
    body: tx(
      "MIGRAFILE provides client-directed, administrative document preparation and organization services. We are not a law firm, are not affiliated with the U.S. Citizenship and Immigration Services (USCIS) or any government agency, and do not provide legal advice, legal representation, or legal strategies. Our service is limited to formatting and populating the immigration forms you select based on the specific information you provide. You are solely responsible for all decisions regarding your case.",
      "تقدم MIGRAFILE خدمات إدارية لإعداد المستندات وتنظيمها بناءً على توجيهات العميل. لسنا مكتب محاماة، ولا نتبع إدارة خدمات المواطنة والهجرة الأمريكية (USCIS) أو أي جهة حكومية، ولا نقدم استشارات قانونية أو تمثيلًا قانونيًا أو استراتيجيات قانونية. تقتصر خدماتنا على تنسيق نماذج الهجرة التي تختارها وإدخال البيانات التي تقدمها. وتتحمل وحدك مسؤولية جميع القرارات المتعلقة بملفك.",
    ),
  },
  {
    heading: tx(
      "User responsibilities and accuracy of information",
      "مسؤوليات المستخدم ودقة المعلومات",
    ),
    body: tx(
      "You agree to provide complete, accurate, and truthful information and documents. MIGRAFILE is not responsible for delays, rejections, or legal consequences resulting from false, inaccurate, or incomplete information you provide. You must review all finalized documents for accuracy before signing and authorizing their submission.",
      "توافق على تقديم معلومات ومستندات كاملة ودقيقة وصحيحة. لا تتحمل MIGRAFILE مسؤولية التأخير أو الرفض أو العواقب القانونية الناتجة عن معلومات غير صحيحة أو غير دقيقة أو غير مكتملة تقدمها. ويجب عليك مراجعة جميع المستندات بصيغتها النهائية للتأكد من دقتها قبل توقيعها والتصريح بتقديمها.",
    ),
  },
  {
    heading: tx("No guarantee of outcome", "عدم ضمان النتائج"),
    body: tx(
      "The final decision to approve or deny any immigration application, petition, or visa rests entirely with USCIS, the Department of State, or the respective government authority. MIGRAFILE makes no guarantees, warranties, or predictions regarding the outcome or processing time of your case.",
      "يعود القرار النهائي بقبول أو رفض أي طلب هجرة أو التماس أو تأشيرة إلى USCIS أو وزارة الخارجية أو الجهة الحكومية المعنية وحدها. ولا تقدم MIGRAFILE أي ضمانات أو تعهدات أو توقعات بشأن نتيجة ملفك أو مدة معالجته.",
    ),
  },
  {
    heading: tx("Payments and government fees", "المدفوعات والرسوم الحكومية"),
    items: [
      tx(
        "a. Service fees: All fees paid to MIGRAFILE are strictly for our administrative and document preparation services.",
        "أ. رسوم الخدمة: جميع الرسوم المدفوعة إلى MIGRAFILE مخصصة حصريًا لخدماتنا الإدارية وخدمات إعداد المستندات.",
      ),
      tx(
        "b. Government fees: MIGRAFILE service fees do not include government filing fees, biometric fees, or medical examination fees. You are solely responsible for paying all applicable government fees directly to the relevant agency.",
        "ب. الرسوم الحكومية: لا تشمل رسوم خدمات MIGRAFILE رسوم تقديم الطلبات الحكومية أو الرسوم البيومترية أو رسوم الفحص الطبي. وتتحمل وحدك مسؤولية دفع جميع الرسوم الحكومية المطبقة مباشرةً إلى الجهة المعنية.",
      ),
    ],
  },
  {
    heading: tx("Refund policy", "سياسة الاسترداد"),
    body: tx(
      "Because our services involve administrative labor and time, refunds are issued only under the following conditions:",
      "نظرًا لأن خدماتنا تتطلب وقتًا وجهدًا إداريًا، لا يُصدر رد المبالغ إلا وفق الشروط التالية:",
    ),
    items: [
      tx(
        "Full refund: If you request cancellation before any document preparation or review work has commenced on your file.",
        "استرداد كامل: إذا طلبت الإلغاء قبل بدء أي عمل لإعداد مستندات ملفك أو مراجعتها.",
      ),
      tx(
        "No refund: Once our Administrative Documentation Coordinators have begun reviewing your documents, entering client-provided information, or providing administrative service, the service fee becomes non-refundable, regardless of the final government decision on your case.",
        "لا يُرد المبلغ: بعد أن يبدأ منسقو التوثيق الإداري لدينا مراجعة مستنداتك أو إدخال المعلومات التي قدمتها أو تقديم الخدمة الإدارية، تصبح رسوم الخدمة غير قابلة للاسترداد، بصرف النظر عن القرار الحكومي النهائي بشأن ملفك.",
      ),
    ],
  },
  {
    heading: tx("Limitation of liability", "حدود المسؤولية"),
    body: tx(
      "To the maximum extent permitted by law, MIGRAFILE and its partners shall not be liable for any indirect, incidental, or consequential damages (including loss of employment, travel expenses, or legal fees) arising from the use of our services, form rejections, or processing delays. In any event, our total liability shall not exceed the amount you paid directly to MIGRAFILE for the specific service in question.",
      "إلى أقصى حد يسمح به القانون، لا تتحمل MIGRAFILE أو شركاؤها مسؤولية أي أضرار غير مباشرة أو عرضية أو تبعية (بما في ذلك فقدان العمل أو نفقات السفر أو الأتعاب القانونية) تنشأ عن استخدام خدماتنا أو رفض النماذج أو تأخر المعالجة. وفي جميع الأحوال، لا يتجاوز إجمالي مسؤوليتنا المبلغ الذي دفعته مباشرةً إلى MIGRAFILE مقابل الخدمة المحددة محل المطالبة.",
    ),
  },
  {
    heading: tx("Changes to terms", "التغييرات على الشروط"),
    body: tx(
      "We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this website. Your continued use of the service constitutes your acceptance of the revised Terms.",
      "نحتفظ بحق تعديل هذه الشروط في أي وقت. وتسري التعديلات فور نشرها على هذا الموقع. ويُعد استمرارك في استخدام الخدمة موافقةً منك على الشروط المعدلة.",
    ),
  },
];

export const Route = createFileRoute("/legal")({
  head: () =>
    seo(
      "Terms of Service & Legal Notice",
      "Review MIGRAFILE's terms of service, refund policy, responsibilities, and legal disclaimer.",
    ),
  component: PLegal,
});

function PLegal() {
  const { t } = useLang();

  return (
    <>
      <PageHeader
        eyebrow={tx("Legal", "قانوني")}
        title={tx("Terms of Service", "شروط الخدمة")}
        intro={tx("Last Updated: 11/10/2026", "آخر تحديث: 11/10/2026")}
      />
      <Container className="max-w-3xl py-14">
        <p className="mb-10 leading-relaxed text-muted-foreground">
          {t(
            tx(
              'Please read these Terms of Service ("Terms") carefully before using the MIGRAFILE website and services. By accessing or using our services, you agree to be bound by these Terms.',
              "يرجى قراءة شروط الخدمة هذه («الشروط») بعناية قبل استخدام موقع MIGRAFILE وخدماته. بدخولك إلى خدماتنا أو استخدامها، فإنك توافق على الالتزام بهذه الشروط.",
            ),
          )}
        </p>

        <div className="grid gap-10">
          {termsSections.map((section, index) => (
            <section key={section.heading.en}>
              <h2 className="text-2xl text-primary">
                {index + 1}. {t(section.heading)}
              </h2>
              {section.body && (
                <p className="mt-3 leading-relaxed text-muted-foreground">{t(section.body)}</p>
              )}
              {section.items && (
                <ul className="mt-4 grid gap-3">
                  {section.items.map((item) => (
                    <li
                      key={item.en}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="text-gold">—</span>
                      {t(item)}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section>
            <h2 className="text-2xl text-primary">{t(tx("Questions?", "هل لديك أسئلة؟"))}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {t(
                tx(
                  "If you have any questions regarding these Terms, please contact us at:",
                  "إذا كانت لديك أي أسئلة حول هذه الشروط، يرجى التواصل معنا عبر:",
                ),
              )}
            </p>
            <a
              href="mailto:contact@migrafile.com"
              className="mt-2 inline-block text-accent hover:underline"
            >
              contact@migrafile.com
            </a>
          </section>
        </div>
      </Container>
    </>
  );
}
