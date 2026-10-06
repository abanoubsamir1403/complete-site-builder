import { createFileRoute } from "@tanstack/react-router";
import { tx, useLang, type T } from "@/lib/i18n";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/tools")({
  head: () => seo("Official Tools & Sources", "Direct links to official USCIS, NVC, embassy and IRS tools, plus document and photo utilities for your immigration paperwork."),
  component: Tools,
});

type ToolItem = { name: T; desc: T; url: string; tag?: T };
type ToolSection = { id: string; title: T; blurb: T; items: ToolItem[] };

const sections: ToolSection[] = [
  {
    id: "uscis",
    title: tx("USCIS Tools", "أدوات USCIS"),
    blurb: tx("Official USCIS services for fees, appointments, processing times and offices.", "خدمات USCIS الرسمية للرسوم والمواعيد ومدد المعالجة والمكاتب."),
    items: [
      { name: tx("Fee Calculator", "حاسبة الرسوم"), desc: tx("Check the official fee for each form and filing.", "اعرف الرسوم الرسمية لكل نموذج قبل التقديم."), url: "https://www.uscis.gov/feecalculator" },
      { name: tx("Book or Reschedule an Appointment", "حجز أو تعديل موعد"), desc: tx("Book an appointment at a USCIS office through myUSCIS.", "احجز موعدًا في مكتب USCIS من خلال myUSCIS."), url: "https://my.uscis.gov/appointment/v2" },
      { name: tx("Processing Times", "مدد المعالجة"), desc: tx("See published processing times by form and office. Published times are not a guaranteed completion date.", "اطلع على مدد المعالجة المنشورة حسب النموذج والمكتب — المدة المنشورة ليست موعدًا مضمونًا."), url: "https://egov.uscis.gov/processing-times" },
      { name: tx("Find a Civil Surgeon", "البحث عن طبيب معتمد"), desc: tx("Find an approved civil surgeon for your medical exam.", "اعثر على طبيب معتمد لإجراء الفحص الطبي."), url: "https://www.uscis.gov/tools/find-a-civil-surgeon" },
      { name: tx("Find a USCIS Office", "البحث عن مكتب USCIS"), desc: tx("Locate USCIS offices, field offices and service centers.", "اعثر على مواقع مكاتب ومراكز USCIS."), url: "https://www.uscis.gov/about-us/find-a-uscis-office" },
      { name: tx("Case Status Online", "متابعة حالة الملف"), desc: tx("Track your case using your Receipt Number.", "تابع ملفك باستخدام رقم الإيصال (Receipt Number)."), url: "https://egov.uscis.gov/case-status" },
      { name: tx("myUSCIS Account", "حساب myUSCIS"), desc: tx("Manage your USCIS account and available online services.", "أدر حسابك وملفاتك والخدمات المتاحة إلكترونيًا."), url: "https://my.uscis.gov" },
      { name: tx("e-Request", "طلب خدمة إلكتروني"), desc: tx("Submit certain service requests, such as notice delivery problems, based on available options.", "قدّم بعض طلبات الخدمة مثل مشكلات وصول الإشعارات، حسب الخيارات المتاحة."), url: "https://egov.uscis.gov/e-request" },
      { name: tx("Change of Address (AR-11)", "تغيير العنوان (AR-11)"), desc: tx("Update your address with USCIS.", "حدّث عنوانك لدى USCIS."), url: "https://www.uscis.gov/ar-11" },
    ],
  },
  {
    id: "nvc",
    title: tx("NVC & Visa Tools", "أدوات NVC والتأشيرات"),
    blurb: tx("Tools for the consular stage: CEAC, NVC timeframes, visa availability and scheduling.", "أدوات المرحلة القنصلية: CEAC ومدد NVC وتوافر التأشيرات والجدولة."),
    items: [
      { name: tx("NVC — National Visa Center", "المركز الوطني للتأشيرات NVC"), desc: tx("How processing works after your petition moves to NVC.", "شرح خطوات المعالجة بعد انتقال الالتماس إلى NVC."), url: "https://nvc.state.gov" },
      { name: tx("CEAC", "نظام CEAC"), desc: tx("DS-260, fees, civil documents and case status, depending on your case type.", "نموذج DS-260 والرسوم والمستندات المدنية وحالة الملف، بحسب نوع القضية."), url: "https://ceac.state.gov/iv" },
      { name: tx("NVC Timeframes", "مدد معالجة NVC"), desc: tx("Dates of cases NVC is working on and response timeframes.", "متابعة تواريخ الملفات التي يجري العمل عليها ومدد الرد على الاستفسارات."), url: "https://nvc.state.gov/timeframes" },
      { name: tx("Ask NVC", "اسأل NVC"), desc: tx("Send an official inquiry to NVC.", "إرسال استفسار رسمي إلى NVC."), url: "https://nvc.state.gov/ask" },
      { name: tx("Visa Bulletin", "نشرة التأشيرات"), desc: tx("Follow visa availability for categories subject to numerical limits.", "متابعة توافر التأشيرات للفئات التي تخضع لحدود عددية."), url: "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html" },
      { name: tx("IV Scheduling Status Tool", "أداة حالة جدولة المقابلات"), desc: tx("See which interview dates each embassy is currently scheduling. It does not give you a personal appointment.", "اعرف مرحلة الجدولة الحالية لدى كل سفارة — الأداة لا تعطي موعدًا شخصيًا مؤكدًا."), url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/iv-wait-times.html" },
    ],
  },
  {
    id: "embassy",
    title: tx("Documents & Embassies", "المستندات والسفارات"),
    blurb: tx("Which document is accepted, who issues it, and your embassy's interview instructions.", "معرفة المستند المقبول والجهة المُصدرة، وتعليمات سفارتك للمقابلة."),
    items: [
      { name: tx("Reciprocity & Civil Documents by Country", "المستندات المدنية حسب الدولة"), desc: tx("Which document is accepted and who issues it in each country.", "اعرف نوع المستند المقبول والجهة التي تصدره في كل دولة."), url: "https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country.html" },
      { name: tx("U.S. Embassies Directory", "دليل السفارات الأمريكية"), desc: tx("Find the official website of the embassy handling your case.", "الوصول إلى الموقع الرسمي للسفارة المعنية بملفك."), url: "https://www.usembassy.gov" },
      { name: tx("U.S. Embassy Cairo — Immigrant Visas", "سفارة أمريكا بالقاهرة — تأشيرات الهجرة"), desc: tx("Cairo interview documents, medical exam, registration and local instructions.", "المستندات والفحص الطبي والتسجيل والتعليمات المحلية لمقابلات الهجرة في القاهرة."), url: "https://eg.usembassy.gov/visas/" },
      { name: tx("Financial Evidence Assistant", "مساعد الأدلة المالية"), desc: tx("Understand which financial documents fit the sponsor's circumstances.", "فهم المستندات المالية المطلوبة حسب ظروف الكفيل."), url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/financial-evidence-assistant.html" },
    ],
  },
  {
    id: "irs",
    title: tx("IRS — Tax Records for the Sponsor", "الضرائب (IRS) — سجلات الكفيل"),
    blurb: tx("Get tax transcripts free from the IRS for the affidavit of support. The transcript belongs to the sponsor or joint sponsor — not the visa applicant.", "استخراج السجلات الضريبية مجانًا من IRS لإثبات الكفالة — السجل يخص الكفيل أو المشارك، وليس طالب التأشيرة."),
    items: [
      { name: tx("IRS — Get Transcript", "استخراج السجل الضريبي"), desc: tx("Get your tax record online or order it by mail — free of charge.", "استخراج السجل الضريبي أونلاين أو طلبه بالبريد — مجانًا."), url: "https://www.irs.gov/individuals/get-transcript", tag: tx("Start with Tax Return Transcript", "ابدأ بـ Tax Return Transcript") },
      { name: tx("IRS Online Account", "حسابك لدى IRS"), desc: tx("Sign in to your personal IRS account and access your records. MIGRAFILE never asks for your IRS password or verification codes.", "ادخل حسابك الشخصي لدى IRS للوصول لسجلاتك — منصتنا لا تطلب كلمة مرور IRS ولا أكواد التحقق."), url: "https://www.irs.gov/payments/your-online-account" },
      { name: tx("Get Transcript — FAQs", "أسئلة استخراج السجلات"), desc: tx("Solve availability problems or order the record another way.", "حل مشكلات التوافر أو استخراج المستند بطريقة أخرى."), url: "https://www.irs.gov/individuals/get-transcript-faqs" },
      { name: tx("Form 4506-T", "نموذج 4506-T"), desc: tx("Request records by mail when not using the online account.", "طلب السجلات بالبريد عند عدم استخدام الحساب الإلكتروني."), url: "https://www.irs.gov/forms-pubs/about-form-4506-t" },
    ],
  },
  {
    id: "community",
    title: tx("Other Official Sources", "مصادر رسمية أخرى"),
    blurb: tx("Trusted government sources that serve your case beyond USCIS and NVC.", "مصادر حكومية موثوقة تخدم ملفك خارج USCIS وNVC."),
    items: [
      { name: tx("CBP I-94", "سجل الدخول I-94"), desc: tx("Retrieve your electronic entry record and available travel history. It is a reference tool, not a complete legal record.", "استخراج سجل الدخول الإلكتروني وتاريخ السفر المتاح — أداة مساعدة وليست سجلًا كاملًا يُعتمد عليه وحده."), url: "https://i94.cbp.dhs.gov/I94" },
      { name: tx("USCIS — Avoid Scams", "USCIS — تجنب الاحتيال"), desc: tx("Learn to recognize fraud and find authorized legal help.", "تعرّف على علامات الاحتيال واعثر على مساعدة قانونية مخوّلة."), url: "https://www.uscis.gov/scams-fraud-misconduct/avoid-scams" },
      { name: tx("SAVE CaseCheck", "متابعة SAVE CaseCheck"), desc: tx("Track a pending immigration-status verification request, when one exists.", "متابعة طلب التحقق من الوضع الهجري لدى الجهات المستخدمة لنظام SAVE، عند وجود طلب قائم."), url: "https://save.uscis.gov/casecheck" },
    ],
  },
  {
    id: "doc-tools",
    title: tx("Document & Photo Toolkit", "صندوق أدوات المستندات والصور"),
    blurb: tx("Practical utilities to prepare files before uploading. Some features need an account or subscription.", "أدوات عملية لتجهيز ملفاتك قبل الرفع — بعض الخصائص تحتاج حسابًا أو اشتراكًا."),
    items: [
      { name: tx("Merge & Compress PDF — iLovePDF", "دمج وضغط PDF — iLovePDF"), desc: tx("Merge, split, compress and convert files. Review text and stamp clarity after compressing.", "دمج وتقسيم وضغط وتحويل الملفات — راجع وضوح النص والأختام بعد الضغط."), url: "https://www.ilovepdf.com" },
      { name: tx("PDF Tools — Smallpdf", "أدوات PDF — Smallpdf"), desc: tx("Compress, convert, edit and sign PDFs.", "ضغط وتحويل وتعديل وتوقيع ملفات PDF."), url: "https://smallpdf.com" },
      { name: tx("PDF Tools — Adobe Acrobat Online", "أدوات PDF — Adobe Acrobat"), desc: tx("Organize, convert and compress PDF files online.", "تنظيم وتحويل وضغط ملفات PDF أونلاين."), url: "https://www.adobe.com/acrobat/online.html" },
      { name: tx("PDF24 Tools", "أدوات PDF24"), desc: tx("Free file tools, with a desktop option that processes files locally without uploading them.", "مجموعة أدوات مجانية للملفات، مع خيار برنامج يعمل محليًا بدون رفع الملفات إلى موقع — الأنسب للجوازات والضرائب والمستندات الطبية."), url: "https://tools.pdf24.org" },
      { name: tx("E-Signature — DocuSign", "التوقيع الإلكتروني — DocuSign"), desc: tx("Send MIGRAFILE contracts and service consents for signature. Check each government form's instructions first — an e-signature is not automatically accepted by USCIS.", "إرسال عقود وموافقات MIGRAFILE للتوقيع — راجع تعليمات كل نموذج حكومي أولًا؛ التوقيع الإلكتروني غير مقبول تلقائيًا لدى USCIS."), url: "https://www.docusign.com" },
      { name: tx("E-Signature — Adobe & Smallpdf", "التوقيع الإلكتروني — Adobe وSmallpdf"), desc: tx("Fill PDFs and add signatures online.", "تعبئة ملفات PDF وإضافة توقيع أونلاين."), url: "https://www.adobe.com/acrobat/online/sign-pdf.html" },
      { name: tx("Resize Images — iLoveIMG", "تغيير أبعاد الصور — iLoveIMG"), desc: tx("Change width and height in pixels or percentage. Keep the aspect ratio so faces or documents don't stretch.", "تغيير العرض والارتفاع بالبكسل أو بالنسبة — احفظ نسبة الأبعاد حتى لا يتمدد الوجه أو المستند."), url: "https://www.iloveimg.com/resize-image" },
      { name: tx("Compress & Crop — iLoveIMG", "ضغط وقص الصور — iLoveIMG"), desc: tx("Reduce file size in KB/MB or crop a photo. Compress changes size; crop changes framing.", "تقليل حجم الملف بالـKB/MB أو قص الصورة — الضغط يقلل الحجم والقص يغيّر الإطار."), url: "https://www.iloveimg.com/compress-image" },
      { name: tx("iLoveIMG in Arabic", "iLoveIMG بالعربية"), desc: tx("Access the tools with an Arabic interface.", "الوصول للأدوات بواجهة عربية."), url: "https://www.iloveimg.com/ar" },
      { name: tx("Visa Photos — Official Requirements", "صور التأشيرة — المتطلبات الرسمية"), desc: tx("Start with the U.S. Department of State's digital photo requirements, including the official photo tool. Resizing alone does not guarantee acceptance.", "ابدأ بمتطلبات الصور الرقمية لوزارة الخارجية الأمريكية وأداة القص الرسمية — تعديل المقاس وحده لا يضمن قبول الصورة."), url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html" },
    ],
  },
];

function Tools() {
  const { t } = useLang();
  return (
    <>
      <PageHeader
        eyebrow={tx("MIGRAFILE Tools", "أدوات MIGRAFILE")}
        title={tx("Official tools & sources", "الأدوات والمصادر الرسمية")}
        intro={tx("Direct links to the official tools for each stage of your case — USCIS, NVC, the embassy, IRS — plus utilities to prepare your documents. MIGRAFILE links to these sources only; it does not operate them.", "روابط مباشرة للأدوات الرسمية في كل مرحلة من ملفك — USCIS ثم NVC ثم السفارة ثم IRS — بالإضافة إلى أدوات تجهيز مستنداتك. MIGRAFILE تحوّلك لهذه المصادر فقط ولا تديرها.")}
      />
      <Container className="py-12">
        <div className="mb-6">
          <Notice>
            {t(tx("These are official external government sources. MIGRAFILE is an independent platform and is not affiliated with USCIS or the U.S. Department of State. Links last reviewed: October 2026.", "مصادر حكومية رسمية خارجية. MIGRAFILE منصة مستقلة وليست تابعة لـUSCIS أو وزارة الخارجية الأمريكية. آخر مراجعة للروابط: أكتوبر 2026."))}
          </Notice>
        </div>

        <div className="mf-stagger grid gap-12">
          {sections.map((section) => (
            <section key={section.id} className="mf-stagger-item">
              <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h2 className="text-2xl text-primary">{t(section.title)}</h2>
                <p className="text-sm text-muted-foreground">{t(section.blurb)}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => (
                  <a
                    key={item.url + item.name.en}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doc-card group flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-primary">{t(item.name)}</h3>
                      <span aria-hidden className="ltr mt-0.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent">↗</span>
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t(item.desc)}</p>
                    {item.tag && (
                      <span className="mt-3 w-fit rounded-full bg-secondary px-3 py-1 text-xs text-primary">{t(item.tag)}</span>
                    )}
                    <span className="mt-4 text-xs font-medium text-accent">{t(tx("Open official source", "افتح المصدر الرسمي"))}</span>
                  </a>
                ))}
              </div>
            </section>
          ))}

          <section className="mf-stagger-item grid gap-8 lg:grid-cols-2">
            <div className="doc-card">
              <h2 className="text-2xl text-primary">{t(tx("Civil document checklist", "قائمة المستندات المدنية"))}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{done.length} / {docs.length}</p>
              <div className="mt-3 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(done.length / docs.length) * 100}%` }} /></div>
              <ul className="mt-5 grid gap-2">
                {docs.map((d, i) => (
                  <li key={d.en}>
                    <label className="flex items-center gap-3 text-sm">
                      <input type="checkbox" checked={done.includes(i)} onChange={() => setDone(done.includes(i) ? done.filter((x) => x !== i) : [...done, i])} />
                      {t(d)}
                    </label>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">{t(tx("Generic list. Your required documents depend on official instructions.", "قائمة عامة. المستندات المطلوبة تحددها التعليمات الرسمية."))}</p>
            </div>
            <div className="doc-card">
              <h2 className="text-2xl text-primary">{t(tx("Date calculator", "حاسبة التواريخ"))}</h2>
              <div className="mt-5 grid gap-4">
                <label className="text-sm">{t(tx("Start date", "تاريخ البداية"))}<input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="ltr mt-1 block w-full rounded-md border bg-background px-3 py-2" /></label>
                <label className="text-sm">{t(tx("Add days", "إضافة أيام"))}<input type="number" value={days} onChange={(e) => setDays(+e.target.value)} className="ltr mt-1 block w-full rounded-md border bg-background px-3 py-2" /></label>
                <div className="rounded-md bg-secondary p-4">
                  <p className="text-xs text-muted-foreground">{t(tx("Resulting date", "التاريخ الناتج"))}</p>
                  <p className="ltr font-mono text-2xl text-primary">{target || "—"}</p>
                </div>
              </div>
              <div className="mt-4"><Notice>{t(tx("Calendar arithmetic only. Official deadlines are set by the agency.", "حساب تقويمي فقط. المواعيد الرسمية تحددها الجهة المختصة."))}</Notice></div>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
