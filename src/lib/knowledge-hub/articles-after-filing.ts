import { tx } from "@/lib/i18n";
import { article, block, rel, src } from "./helpers";
import type { KnowledgeArticle } from "./types";

export const articlesAfterFiling: KnowledgeArticle[] = [
  article(
    "receipt-notices-status-processing-times",
    "after-filing",
    tx("Receipt Notices, Case Status and Processing Times", "إشعارات الاستلام وحالة القضية وأوقات المعالجة"),
    [
      block(
        "Save the notice",
        "احفظ إشعار الاستلام بعناية",
        [
          [
            "A receipt notice identifies a filing and its reference number. USCIS receipt numbers generally contain three letters and ten numbers. Keep a separate notice and timeline for each form, even when several forms were submitted together.",
            "يحدد إشعار الاستلام (Receipt Notice) تفاصيل الطلب ورقمه المرجعي. وتتكون أرقام إيصالات USCIS عادة من 3 أحرف متبوعة بـ 10 أرقام. واحتفظ بإشعار وجدول زمني منفصل لكل نموذج، حتى لو قُدمت عدة نماذج معًا في حزمة واحدة.",
          ],
        ],
      ),
      block(
        "Check official tools",
        "استخدم الأدوات الرسمية للاستعلام",
        [
          [
            "Use Case Status Online for the latest recorded status and the Processing Times tool for the relevant request. Published estimates are not guarantees for an individual case. An account estimate may change as the agency receives information or adjusts workloads.",
            "استخدم أداة حالة القضية عبر الإنترنت لمعرفة آخر إجراء مسجل، وأداة أوقات المعالجة لمعرفة التقديرات الزمنية. علمًا بأن التقديرات المنشورة ليست ضمانات لقضيتك الفردية، وقد تتغير التقديرات الزمنية في الحساب مع تعديل أعباء العمل في المكاتب.",
          ],
        ],
      ),
      block(
        "Read written instructions",
        "اقرأ الإشعارات المكتوبة بالكامل",
        [
          [
            "Short status messages do not replace the full notice. If the status indicates an evidence request or appointment, obtain the notice and follow its details. Do not infer a final decision from silence or an unchanged status.",
            "الرسائل النصية الموجزة لحالة القضية لا تغني عن قراءة الإشعار الرسمي الكامل. وإذا أظهرت الحالة طلب أدلة أو تحديد موعد، فاحرص على استلام الإشعار واتباع تفاصيله بدقة، ولا تستنتج قرارًا نهائيًا من ثبات الحالة دون تغيير.",
          ],
        ],
      ),
      block(
        "When to inquire",
        "متى يحق لك تقديم استفسار رسمي",
        [
          [
            "Use the tool's current eligibility and inquiry-date guidance. Keep the date, method, and reference number of each inquiry. A case inquiry is different from an expedite request and does not guarantee faster adjudication.",
            "اتبع إرشادات تاريخ الاستفسار الرسمي في الأداة لتحديد موعد إمكانية المراسلة. واحتفظ بتاريخ وطريقة والرقم المرجعي لكل استفسار (e-Request). والاستفسار عن سير الملف يختلف عن طلب الاستعجال، ولا يضمن تسريع البت في القضية.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS Case Status Online", "الاستعلام عن حالة القضية لدى USCIS"), "https://egov.uscis.gov/"),
      src(tx("USCIS Processing Times", "أوقات المعالجة لدى USCIS"), "https://egov.uscis.gov/processing-times/"),
      src(tx("USCIS e-Request", "نظام الاستفسار الإلكتروني e-Request لدى USCIS"), "https://egov.uscis.gov/e-request/"),
    ],
  ),

  article(
    "biometrics-and-interviews",
    "after-filing",
    tx("Biometrics and USCIS Interview Appointments", "مواعيد البصمات والمقابلات لدى USCIS"),
    [
      block(
        "Let the notice guide you",
        "اتبع إرشادات الإشعار بدقة",
        [
          [
            "USCIS may schedule biometrics or an interview depending on the request and circumstances. The notice provides the date, location, and instructions. Bring the identification and records it requests.",
            "قد تحدد USCIS موعدًا لالتقاط البصمات والصورة (Biometrics) أو موعدًا لمقابلة شخصية وفق نوع الطلب وظروفه. ويوضح الإشعار التاريخ والمكان والتعليمات. ويجب إحضار وثائق إثبات الهوية والمستندات المحددة فيه.",
          ],
        ],
      ),
      block(
        "Prepare a practical folder",
        "جهّز ملفًا منظمًا للموعد",
        [
          [
            "Include the notice, relevant identification, the submitted application, and specifically requested evidence. If the appointment involves an interpreter, guardian, or representative, check the applicable rules in advance rather than assuming anyone may attend in that role.",
            "ضع في الملف إشعار الموعد، وإثبات الهوية الساري، ونسخة من الطلب المقدم، والأدلة المطلوبة صراحة. وإذا تطلب الموعد وجود مترجم فوري أو وصي أو ممثل قانوني، فتحقق من القواعد المنظمة لحضورهم مسبقًا بدلاً من افتراض إمكانية مرافقة أي شخص.",
          ],
        ],
      ),
      block(
        "If you cannot attend",
        "إذا تعذر عليك الحضور في الموعد",
        [
          [
            "Follow the official rescheduling instructions promptly. Do not simply miss an appointment or assume calling an unrelated agency updates it. Keep evidence of your request and the agency's response.",
            "اتبع تعليمات إعادة جدولة المواعيد الرسمية على الفور. لا تتغيب عن الموعد ببساطة أو تفترض أن الاتصال بجهة أخرى يحدث النظام، واحتفظ بإثبات تقديم طلب التأجيل ورد الهيئة عليه.",
          ],
        ],
      ),
      block(
        "Accessibility needs",
        "احتياجات التيسير وذوي الإعاقة",
        [
          [
            "Use the current USCIS accommodation process when needed. Describe the functional need accurately. Do not upload medical details to a public contact form. Questions about how a disability affects eligibility or testing exceptions should be addressed through the proper process and qualified advice.",
            "استخدم القنوات الرسمية لطلب تسهيلات ذوي الاحتياجات الخاصة (Accommodations) عند الحاجة، وصف الاحتياج بدقة دون نشر تفاصيل طبية سرية في نماذج الاتصال العامة. وتُعالج الاستثناءات الطبية للاختبارات (مثل N-648) عبر المسار المعتمد واستشارة المتخصصين.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS Appointment Requests", "طلبات المواعيد لدى USCIS"), "https://my.uscis.gov/en/appointment/v2"),
      src(tx("USCIS Contact Center", "مركز اتصال USCIS"), "https://www.uscis.gov/contactcenter"),
      src(tx("USCIS Citizenship: What to Expect", "الجنسية: ماذا تتوقع من USCIS"), "https://www.uscis.gov/citizenship/learn-about-citizenship/citizenship-and-naturalization"),
    ],
  ),

  article(
    "rfes-and-noids",
    "after-filing",
    tx("Requests for Evidence and Notices of Intent to Deny", "طلبات الأدلة الإضافية (RFE) وإشعارات نية الرفض (NOID)"),
    [
      block(
        "Read every page",
        "اقرأ كل صفحة بتمعن",
        [
          [
            "A Request for Evidence asks for additional information or documentation. A Notice of Intent to Deny raises issues that may require a response before a decision. Neither should be handled from a short online status message alone.",
            "يطلب طلب الأدلة الإضافية (RFE) معلومات أو مستندات ناقصة لدعم الطلب، بينما يثير إشعار نية الرفض (NOID) أوجه قصور قد تؤدي إلى رفض القضية ما لم يتم الرد عليها بإقناع. ولا يمكن التعامل مع أي منهما بناءً على رسالة الحالة المختصرة في الموقع فقط.",
          ],
        ],
      ),
      block(
        "Create a response inventory",
        "أنشئ قائمة منظمة لبنود الرد",
        [
          [
            "Record the case number, notice date, deadline, permitted response method, and each requested item. Match documents and explanations to the numbered issues. Include the notice or response identification as instructed.",
            "سجّل رقم القضية، وتاريخ الإشعار، والموعد النهائي، وطريقة الرد المعتمدة، وكل بند مطلوب. وطابق الوثائق والتوضيحات مع النقاط المرقمة في الخطاب، وأرفق إشعار الاستدعاء الأصلي وفق التعليمات المقررة.",
          ],
        ],
      ),
      block(
        "Avoid generic responses",
        "تجنب الردود العشوائية أو العامة",
        [
          [
            "More documents do not necessarily address the concern. Preserve truthful information and explain gaps with appropriate evidence. Do not assume an unsolicited upload satisfies a notice or that mailing by a deadline is enough when receipt is required.",
            "إرسال مستندات إضافية كثيرة لا يحل المشكلة بالضرورة إن لم تكن تلبي المطلوب مباشرة. حافظ على صحة المعلومات وعلل الثغرات بأدلة موثوقة، ولا تفترض أن مجرد ختم الإرسال البريدي يكفي إذا كانت التعليمات تشترط وصول الرد لمقر الهيئة قبل انتهاء الموعد.",
          ],
        ],
      ),
      block(
        "Seek advice when issues are legal",
        "استعن باستشارة قانونية عند وجود أسباب قانونية",
        [
          [
            "Eligibility, inconsistent testimony, fraud allegations, status violations, and adverse findings require authorized legal assistance. Keep a full copy of the response and proof of submission. A request for more time should never be assumed to extend the deadline.",
            "تتطلب مسائل الأهلية، والشهادات المتناقضة، وشبهات الاحتيال، ومخالفات الإقامة، والاستنتاجات السلبية تمثيلاً قانونيًا مرخصًا. واحتفظ بنسخة كاملة من الرد مع إثبات التسليم، ولا تفترض أبدًا أن طلب مهلة إضافية يوقف أو يمدد الموعد النهائي تلقائيًا.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS e-Request", "نظام e-Request لدى USCIS"), "https://egov.uscis.gov/e-request/"),
      src(tx("USCIS Filing Guidance", "إرشادات التقديم لدى USCIS"), "https://www.uscis.gov/forms/filing-guidance"),
      src(tx("USCIS I-290B", "نموذج I-290B لدى USCIS"), "https://www.uscis.gov/i-290b"),
    ],
    [
      rel("I-290B", tx("Notice of Appeal or Motion", "إشعار استئناف أو طلب إعادة نظر")),
    ],
  ),

  article(
    "address-changes-and-errors",
    "after-filing",
    tx("Address Changes, Missing Notices and Document Errors", "تغيير العناوين والإشعارات المفقودة والأخطاء في المستندات"),
    [
      block(
        "Moving requires more than mail forwarding",
        "الانتقال يتطلب أكثر من مجرد إعادة توجيه البريد",
        [
          [
            "Updating an address with a postal service does not necessarily update an immigration case. Use the official USCIS address-change process and include the affected cases. Special procedures may apply to protected or sensitive cases.",
            "تحديث العنوان لدى هيئة البريد الأمريكية (USPS) لا يحدّث عنوانك تلقائيًا في ملفات الهجرة. استخدم نظام تغيير العنوان الرسمي لدى USCIS واشمل جميع القضايا المعلقة، مع مراعاة الإجراءات الخاصة بالقضايا المحمية والحساسة.",
          ],
        ],
      ),
      block(
        "Separate responsibilities",
        "مسؤوليات منفصلة لكل طرف",
        [
          [
            "Applicants, beneficiaries, sponsors, and representatives may have different update procedures. A sponsor's address notice can be a separate obligation. NVC, an embassy, and an immigration court do not automatically receive every USCIS update.",
            "قد تختلف إجراءات التحديث للمتقدمين والمستفيدين والكفلاء والممثلين القانونيين. فإخطار تغيير عنوان الكفيل (I-865) التزام قانوني مستقل. كما أن مركز التأشيرات الوطني (NVC) والسفارات ومحاكم الهجرة لا تتلقى تحديثات عنوان USCIS تلقائيًا.",
          ],
        ],
      ),
      block(
        "Preserve confirmation",
        "احتفظ بإثبات تأكيد التحديث",
        [
          [
            "Keep the submitted address, effective move date, case numbers, and confirmation. Check any new notice for the correct address. Do not assume a profile change alone updated all pending filings.",
            "احتفظ بالعنوان الجديد وتاريخ الانتقال الفعلي وأرقام القضايا وإشعار تأكيد التحديث الإلكتروني. وتأكد من صحة العنوان في أي إشعار جديد يردك، ولا تفترض أن تعديل الملف الشخصي العام حدّث كافة الطلبات المعلقة تلقائيًا.",
          ],
        ],
      ),
      block(
        "Missing or incorrect documents",
        "المستندات المفقودة أو التي تحوي أخطاء",
        [
          [
            "Use official inquiry tools for a notice, card, or document that was not received, and the applicable correction or replacement process for an error. Compare the document with the submitted information. Material identity discrepancies or uncertainty about status should be reviewed by a qualified legal professional.",
            "استخدم أدوات الاستفسار الرسمية للإبلاغ عن الإشعارات أو البطاقات التي لم تصل، واتبع إجراءات التصحيح أو الاستبدال عند وجود أخطاء مطبعية. وقارن بيانات المستند بالطلب المقدم، ويجب مراجعة أي أخطاء جوهرية في بيانات الهوية مع محامٍ معتمد.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS Change of Address", "تغيير العنوان لدى USCIS"), "https://www.uscis.gov/addresschange"),
      src(tx("USCIS e-Request", "نظام e-Request لدى USCIS"), "https://egov.uscis.gov/e-request/"),
      src(tx("USCIS I-865", "نموذج I-865 لدى USCIS"), "https://www.uscis.gov/i-865"),
    ],
    [
      rel("I-865", tx("Sponsor's Notice of Change of Address", "إخطار الكفيل بتغيير العنوان")),
    ],
  ),

  article(
    "expedite-and-premium-processing",
    "after-filing",
    tx("Expedite Requests and Premium Processing", "طلبات الاستعجال وخدمة المعالجة الممتازة (Premium Processing)"),
    [
      block(
        "Two different processes",
        "إجراءان مختلفان تمامًا",
        [
          [
            "An expedite request asks USCIS to consider handling a case faster under its current criteria. USCIS assesses requests individually. Premium processing is a paid service available only for specified requests and categories.",
            "طلب الاستعجال (Expedite Request) هو التماس يُقدم إلى USCIS للنظر في تسريع معالجة القضية وفق معايير إنسانية أو طارئة محددة وبتقدير فردي من الهيئة. أما المعالجة الممتازة (Premium Processing) فهي خدمة حكومية مدفوعة ومحددة لنماذج وفئات معينة فقط.",
          ],
        ],
      ),
      block(
        "Prepare a focused record",
        "جهّز ملفًا مدعمًا بالأدلة المباشرة",
        [
          [
            "For a possible expedite request, identify the urgent event, relevant dates, supporting documentation, and the case that needs action. Describe facts accurately. A preference to finish sooner is different from documented circumstances addressed by the official criteria.",
            "في طلبات الاستعجال، حدد الظرف الطارئ والتواريخ والمستندات الداعمة والقضية المعنية. واشرح الحقائق بصدق، فالرغبة الشخصية في إنهاء الإجراءات سريعًا تختلف كليًا عن الظروف الطارئة الموثقة التي تعترف بها المعايير الرسمية.",
          ],
        ],
      ),
      block(
        "Verify current availability",
        "تحقق من توفر الخدمة حاليًا للطلب",
        [
          [
            "Check the current expedite guidance and the I-907 page. Do not assume premium processing covers every form or that an old fee or timeframe remains correct. Processing rules may concern a qualifying agency action, not guaranteed approval.",
            "راجع إرشادات الاستعجال الحالية وصفحة نموذج I-907. لا تفترض أن المعالجة الممتازة تشمل كل النماذج أو أن الرسوم والمدد القديمة ما زالت سارية. وقواعد المعالجة تضمن اتخاذ إجراء في مهلة معينة ولا تضمن الموافقة على الطلب.",
          ],
        ],
      ),
      block(
        "Manage expectations",
        "تطلعات واقعية للمخرجات",
        [
          [
            "An expedite approval does not establish eligibility for the underlying benefit. It does not automatically expedite related cases at another agency. Questions about the best procedural route or the sufficiency of a hardship claim require authorized advice.",
            "الموافقة على طلب الاستعجال لا تثبت الأهلية للمنفعة الهجرية الأساسية، ولا تعني تسريع القضايا المرتبطة بها لدى جهات أخرى تلقائيًا. وتتطلب المسارات الإجرائية الأفضل وتقدير كفاية أدلة المشقة مشورة قانونية متخصصة.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS Expedite Requests", "طلبات الاستعجال لدى USCIS"), "https://www.uscis.gov/forms/filing-guidance/how-to-make-an-expedite-request"),
      src(tx("USCIS Expedite Criteria Policy Alert", "معايير الاستعجال لدى USCIS"), "https://www.uscis.gov/policy-manual/volume-1-part-a-chapter-5"),
      src(tx("USCIS I-907", "نموذج I-907 لدى USCIS"), "https://www.uscis.gov/i-907"),
    ],
    [
      rel("I-907", tx("Request for Premium Processing Service", "طلب خدمة المعالجة المستعجلة")),
    ],
  ),

  article(
    "obtaining-immigration-records",
    "after-filing",
    tx("Obtaining Your Immigration Records", "الحصول على سجلاتك وملفاتك الهجرية"),
    [
      block(
        "Identify the record you need",
        "حدّد نوع السجل الذي تحتاجه",
        [
          [
            "A copy of a receipt, an electronic admission record, and a complete immigration file are different requests. First check the issuing agency's tools and your retained records.",
            "نسخة الإيصال، وسجل الدخول الإلكتروني (I-94)، والملف الهجري الكامل (A-File) كلها طلبات مختلفة. ابدأ بفحص حسابك وسجلاتك المحفوظة وأدوات الجهة المصدرة أولاً.",
          ],
        ],
      ),
      block(
        "Request records through the proper agency",
        "اطلب السجلات من الجهة المعنية الصحيحة",
        [
          [
            "USCIS provides Freedom of Information Act and Privacy Act procedures for records it maintains. Another agency may hold the record you need. Third-party records require appropriate authorization and may be subject to privacy limits.",
            "تتيح USCIS إجراءات قانون حرية المعلومات وحماية الخصوصية (FOIA) للسجلات المحفوظة لديها، بينما قد تكون سجلاتك الأخرى محفوظة لدى جهة حكومية ثانية. وتتطلب سجلات الغير تفويضًا رسميًا وتخضع لضوابط الخصوصية.",
          ],
        ],
      ),
      block(
        "Make the request specific",
        "اجعل طلبك محددًا وواضحًا",
        [
          [
            "Identify the person, reference numbers, relevant dates, and document types. Preserve the request confirmation and response. Store released records securely because they can contain sensitive information about multiple people.",
            "حدّد بيانات الشخص، والأرقام المرجعية، والتواريخ ذات الصلة، وأنواع المستندات المطلوبة. واحتفظ بإيصال تقديم الطلب ورقم المتابعة والرد المستلم، واحفظ الملفات المستلمة في مكان آمن لأنها تحوي بيانات شخصية حساسة.",
          ],
        ],
      ),
      block(
        "Know what a records request does not do",
        "ما لا يمكن لطلب السجلات تحقيقه",
        [
          [
            "Requesting a file does not itself reopen a case, correct a record, extend a deadline, or pause removal proceedings. If the records relate to a denial or an approaching deadline, seek legal advice promptly while the records request is pending.",
            "طلب الحصول على الملف لا يعيد فتح القضية بحد ذاته، ولا يصحح السجلات، ولا يمدد أي موعد نهائي، ولا يوقف إجراءات الترحيل. وإذا كانت السجلات مرتبطة بقرار رفض أو موعد نهائي وشيك، فاطلب المشورة القانونية فورًا أثناء انتظار الملف.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS Request Records through FOIA", "طلب السجلات عبر FOIA لدى USCIS"), "https://www.uscis.gov/records/request-records-through-the-freedom-of-information-act-or-privacy-act"),
      src(tx("CBP I-94", "سجل I-94 لدى CBP"), "https://i94.cbp.dhs.gov/"),
      src(tx("USCIS Contact Center", "مركز اتصال USCIS"), "https://www.uscis.gov/contactcenter"),
    ],
  ),
];
