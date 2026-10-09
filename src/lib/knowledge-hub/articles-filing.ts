import { tx } from "@/lib/i18n";
import { article, block, rel, src } from "./helpers";
import type { KnowledgeArticle } from "./types";

export const articlesFiling: KnowledgeArticle[] = [
  article(
    "finding-correct-form-edition",
    "filing",
    tx("Finding the Correct Form and Edition", "العثور على النموذج وإصداره الصحيح"),
    [
      block(
        "Start at the official form page",
        "ابدأ من الصفحة الرسمية للنموذج",
        [
          [
            "Use the USCIS page for the specific form. Review its purpose, instructions, accepted editions, filing information, and alerts. A saved PDF from an earlier case may no longer be accepted.",
            "استخدم صفحة USCIS الرسمية المخصصة لكل نموذج. راجع الغرض منه، والتعليمات، والإصدارات المقبولة، وبيانات التقديم، والتنبيهات الحديثة. فالملف المحفوظ (PDF) من قضية سابقة قد يكون منتهي الصلاحية ولم يعد مقبولاً.",
          ],
        ],
      ),
      block(
        "Edition date and expiration date differ",
        "تاريخ الإصدار يختلف عن تاريخ انتهاء الصلاحية",
        [
          [
            "Do not use an OMB expiration date as the sole test of whether a form edition is accepted. Check USCIS's edition guidance. For a paper form, verify that the pages belong to the same accepted edition and that the complete set of required pages is included.",
            "لا تعتمد على تاريخ انتهاء صلاحية مكتب الإدارة والميزانية (OMB) كمعيار وحيد لمعرفة ما إذا كان إصدار النموذج مقبولاً. تحقق من إرشادات الإصدار الصادرة عن USCIS. وبالنسبة للنماذج الورقية، تأكد من أن جميع الصفحات تنتمي لنفس الإصدار المقبول وأن الحزمة كاملة دون نقص.",
          ],
        ],
      ),
      block(
        "Keep a filing snapshot",
        "احتفظ بنسخة مطابقة لما تم تقديمه",
        [
          [
            "Record the download date, edition checked, filing method, and the official source URL. Save the final version the applicant reviewed and signed. Recheck the requirements shortly before submission.",
            "سجّل تاريخ التحميل، والإصدار الذي تم فحصه، وطريقة التقديم، ورابط المصدر الرسمي. واحتفظ بالنسخة النهائية التي راجعها المتقدم ووقع عليها، وأعد التحقق من المتطلبات قبل الإرسال مباشرة.",
          ],
        ],
      ),
      block(
        "Avoid unofficial downloads",
        "تجنب تحميل النماذج من مواقع غير رسمية",
        [
          [
            "The form cards in this hub point to the government source instead of hosting a permanent copy that may become outdated. Government form downloads are free. MIGRAFILE preparation charges, if offered, must be explained separately from agency filing fees.",
            "تشير بطاقات النماذج في هذا المركز إلى المصادر الحكومية الرسمية بدلاً من استضافة نسخ دائمة قد تصبح قديمة. فتحميل النماذج الحكومية مجاني دائمًا، ويجب توضيح رسوم إعداد النماذج في MIGRAFILE - إن وجدت - بشكل مستقل تمامًا عن الرسوم الحكومية.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS All Forms", "جميع نماذج USCIS"), "https://www.uscis.gov/forms/all-forms"),
      src(tx("USCIS Forms Updates", "تحديثات نماذج USCIS"), "https://www.uscis.gov/forms/forms-updates"),
      src(tx("USCIS Filing Guidance", "إرشادات التقديم لدى USCIS"), "https://www.uscis.gov/forms/filing-guidance"),
    ],
  ),

  article(
    "preparing-supporting-documents",
    "filing",
    tx("Preparing Clear and Consistent Supporting Documents", "إعداد مستندات داعمة واضحة ومتطابقة"),
    [
      block(
        "Build a document inventory",
        "أنشئ قائمة جرد للمستندات",
        [
          [
            "List the document name, person it belongs to, issuing authority, issue date, language, and why it may be relevant. Mark missing records and pending translations. Keep originals secure.",
            "سجّل اسم كل مستند، والشخص الذي يخصه، والجهة المصدرة، وتاريخ الإصدار، واللغة، وسبب صلته بالطلب. وحدد النواقص والترجمات المعلقة، واحتفظ بالأصول الورقية في مكان آمن.",
          ],
        ],
      ),
      block(
        "Make readable copies",
        "احرص على وضوح النسخ المصورة",
        [
          [
            "Scan the complete document, including relevant reverse sides, endorsements, and attached pages. Check that names, dates, stamps, and document numbers are legible. Keep a record unaltered; use a separate explanation for discrepancies.",
            "امسح المستند كاملاً ضوئيًا، بما في ذلك الوجه الخلفي والتصديقات والصفحات المرفقة. وتأكد من وضوح وقراءة الأسماء والتواريخ والأختام وأرقام المستندات. واترك السجل دون أي تعديل أو شطب، واستخدم ورقة توضيحية منفصلة لشرح أي تعارض.",
          ],
        ],
      ),
      block(
        "Avoid unnecessary disclosure",
        "تجنب إرسال مستندات غير ضرورية",
        [
          [
            "Submit evidence tied to the actual request. A long upload is not automatically a stronger filing. Do not hide required facts, but do not send unrelated sensitive records simply because there is room to upload them.",
            "قدّم الأدلة المرتبطة مباشرة بنوع الطلب، فكثرة الملفات المرفقة لا تعني بالضرورة قوة الطلب. لا تخفِ وقائع مطلوبة، ولكن لا ترسل سجلات حساسة غير ذات صلة لمجرد توفر مساحة للرفع.",
          ],
        ],
      ),
      block(
        "Civil documents vary by country",
        "تختلف الوثائق المدنية باختلاف الدول",
        [
          [
            "Consult the official reciprocity guidance where relevant and the form's instructions. If a primary document is unavailable, investigate the proper evidence of unavailability and allowed alternatives. Do not replace an unavailable record with an invented certificate.",
            "راجع جدول المعاملة بالمثل الصادر عن وزارة الخارجية (Reciprocity Schedule) وتعليمات النموذج. وإذا تعذر الحصول على وثيقة أصلية أولية، فتحقق من الأدلة الرسمية المطلوبة لإثبات عدم توفرها والبدائل المقبولة قانونيًا، ولا تستبدل وثيقة مفقودة بشهادة غير صحيحة.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS Filing Guidance", "إرشادات التقديم لدى USCIS"), "https://www.uscis.gov/forms/filing-guidance"),
      src(tx("Department of State Civil Documents by Country", "الوثائق المدنية حسب الدولة لوزارة الخارجية"), "https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country.html"),
    ],
  ),

  article(
    "foreign-language-translations",
    "filing",
    tx("Foreign-Language Documents and English Translations", "المستندات بلغات أجنبية والترجمة إلى الإنجليزية"),
    [
      block(
        "Keep both versions",
        "احتفظ بالنسختين معًا",
        [
          [
            "When USCIS requires an English translation, organize the foreign-language document together with its complete English translation. A summary of selected lines may leave out important information.",
            "عندما تطلب USCIS ترجمة باللغة الإنجليزية، ارفق المستند المكتوب باللغة الأجنبية مع ترجمته الإنجليزية الكاملة معًا. فالملخص لبعض الأسطر المختارة قد يغفل معلومات جوهرية مطلوبة.",
          ],
        ],
      ),
      block(
        "Certification belongs to the translator",
        "شهادة الترجمة يوقعها المترجم",
        [
          [
            "The applicable USCIS requirements call for a translator certification of completeness, accuracy, and competence to translate into English. Read the current instructions for the relevant filing. Notarization and translation certification are different concepts; do not assume notarization is universally required.",
            "تشترط USCIS إقرارًا معتمدًا من المترجم يؤكد اكتمال الترجمة ودقتها وكفاءته في الترجمة إلى الإنجليزية. واقرأ التعليمات الحالية للطلب المعني، علمًا بأن التوثيق لدى كاتب العدل (Notarization) يختلف عن شهادة المترجم المعتمدة ولا تشترطه اللوائح في كل الحالات.",
          ],
        ],
      ),
      block(
        "Handle names carefully",
        "تعامل بحرص مع ترجمة الأسماء",
        [
          [
            "Preserve names and dates as written in the original document. If transliterations differ among records, explain the variation through appropriate evidence rather than quietly changing the translated text.",
            "حافظ على الأسماء والتواريخ كما هي مدونة في المستند الأصلي. وإذا اختلفت طريقة كتابة الحروف بين الوثائق الرسمية، فاشرح هذا الاختلاف من خلال الأدلة المناسبة بدلاً من تعديل نص الترجمة سرًا.",
          ],
        ],
      ),
      block(
        "Review readability",
        "راجع وضوح القراءة والبيانات",
        [
          [
            "Match each translation with its source document, identify all translated pages, and make sure signatures, stamps, and handwritten entries are addressed. A translation does not authenticate a forged document or resolve a legal disagreement about what the original proves.",
            "طابق كل ترجمة مع مستندها الأصلي، وحدد جميع الصفحات المترجمة، وتأكد من ترجمة التوقيعات والأختام والبيانات المكتوبة بخط اليد. فالترجمة لا تضفي شرعية على مستند مزور ولا تحسم خلافًا قانونيًا حول دلالة الوثيقة الأصلية.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS Filing Guidance", "إرشادات التقديم لدى USCIS"), "https://www.uscis.gov/forms/filing-guidance"),
      src(tx("USCIS I-130", "نموذج I-130 لدى USCIS"), "https://www.uscis.gov/i-130"),
    ],
    [
      rel("I-130", tx("Petition for Alien Relative", "طلب قريب أجنبي")),
    ],
  ),

  article(
    "signatures-interpreters-preparers",
    "filing",
    tx("Signatures, Interpreters and Form Preparers", "التوقيعات والمترجمون الشفويون ومعدو النماذج"),
    [
      block(
        "Review before signing",
        "راجع الطلب كاملاً قبل التوقيع",
        [
          [
            "The person responsible for a filing should understand the answers and review the supporting documents. A typed name in a document is not automatically a valid paper signature. Online attestations follow the official electronic filing process.",
            "يجب على الشخص المسؤول عن الملف أن يفهم الإجابات ويراجع المستندات الداعمة قبل التوقيع. وكتابة الاسم بالطباعة ليست توقيعًا ورقيًا صحيحًا تلقائيًا. وتتبع الإقرارات الإلكترونية عبر الإنترنت الإجراءات الرسمية المعتمدة في حساب التقديم.",
          ],
        ],
      ),
      block(
        "Identify assistance accurately",
        "أفصح عن المساعدة بدقة وشفافية",
        [
          [
            "If someone prepares the form or interprets its questions, complete the applicable sections according to the instructions. Do not hide paid preparation assistance or represent a clerical preparer as a legal representative.",
            "إذا ساعدك شخص في إعداد النموذج أو ترجمة أسئلته، فعليك ملء الأقسام المخصصة للمعدّ والمترجم الشفوي وفق التعليمات. لا تخفِ المساعدة المدفوعة ولا تقدم معد النماذج المكتبي على أنه ممثل قانوني أو محامٍ.",
          ],
        ],
      ),
      block(
        "Special signing situations",
        "حالات التوقيع الخاصة",
        [
          [
            "Minor applicants, legal guardians, and people unable to sign can have special requirements. Do not assume the petitioner, sponsor, and applicant are interchangeable signers. Verify who signs each form, any supplemental form, and each required certification.",
            "يخضع المتقدمون القُصّر والأوصياء القانونيون وغير القادرين على التوقيع لقواعد خاصة. ولا تفترض أن مقدم الالتماس والكفيل والمستفيد يوقعون نيابة عن بعضهم عشوائيًا، بل تحقق بدقة ممن يجب عليه توقيع كل نموذج وملحق وشهادة مطلوبة.",
          ],
        ],
      ),
      block(
        "Preserve the final submission",
        "احتفظ بنسخة من النسخة الموقعة النهائية",
        [
          [
            "Keep the signed final form and any permitted signature records. If an answer changes after signature, ensure the final version is properly reviewed and executed. Check current signature policy before filing, especially when using scanned or reproduced signatures.",
            "احتفظ بالنموذج النهائي الموقع وأي سجلات توقيع مصرح بها. وإذا تغيرت إجابة بعد التوقيع، فتأكد من مراجعة النسخة المعدلة واعتمادها رسميًا. وتحقق من سياسة التوقيع الحالية لدى USCIS، لا سيما عند استخدام التوقيعات الممسوحة ضوئيًا.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS Filing Guidance", "إرشادات التقديم لدى USCIS"), "https://www.uscis.gov/forms/filing-guidance"),
      src(tx("USCIS Online Account Terms", "شروط حساب USCIS عبر الإنترنت"), "https://myaccount.uscis.gov/"),
      src(tx("USCIS I-765", "نموذج I-765 لدى USCIS"), "https://www.uscis.gov/i-765"),
    ],
    [
      rel("I-765", tx("Application for Employment Authorization", "تصريح العمل")),
    ],
  ),

  article(
    "uscis-fees-payments-waivers",
    "filing",
    tx("USCIS Fees, Payment Methods and Fee Waivers", "رسوم USCIS وطرق السداد والإعفاء من الرسوم"),
    [
      block(
        "Check the exact request",
        "تحقق من نوع الطلب بدقة",
        [
          [
            "Government fees can vary by category, filing method, applicant facts, and the forms submitted. Use the current USCIS Fee Schedule and Fee Calculator, then read the specific form instructions and alerts. Do not reuse a fee from an old receipt.",
            "تختلف الرسوم الحكومية باختلاف الفئة وطريقة التقديم وبيانات المتقدم والنماذج المرفقة. استخدم جدول رسوم USCIS الحالي وحاسبة الرسوم الرسمية، واقرأ تعليمات النموذج والتنبيهات بعناية، ولا تعتمد على مبلغ مدون في إيصال قديم.",
          ],
        ],
      ),
      block(
        "Verify payment instructions",
        "تأكد من تعليمات وسيلة الدفع",
        [
          [
            "Payment methods have changed. The current electronic-payment framework includes card and ACH authorization forms for applicable mailed filings, with limited exception procedures. Confirm the method for your destination and filing type before sending the package. Do not assume an old instruction to send a check remains valid.",
            "تغيرت وسائل الدفع المقبولة، حيث يتضمن الإطار الحالي نماذج تفويض بطاقات الائتمان والخصم المباشر (ACH) للطلبات البريدية المؤهلة، مع استثناءات محدودة. تأكد من وسيلة الدفع المعتمدة لعنوان إرسال ملفك قبل الشحن، ولا تفترض صلاحية تعليمات الشيكات القديمة تلقائيًا.",
          ],
        ],
      ),
      block(
        "A waiver is not universal",
        "الإعفاء من الرسوم ليس متاحًا لجميع النماذج",
        [
          [
            "Fee-waiver eligibility depends on the benefit and applicable requirements. Additional statutory fees can have different waiver rules. A low income alone does not mean every USCIS fee can be waived.",
            "تعتمد أهلية الإعفاء من الرسوم على نوع المنفعة والشروط المنطبقة. وقد تخضع الرسوم الإضافية لقواعد إعفاء مختلفة. والدخل المنخفض وحده لا يعني إمكانية الإعفاء من رسوم كل طلب أو نموذج لدى USCIS.",
          ],
        ],
      ),
      block(
        "Keep separate receipts",
        "افصل بين إيصالات الرسوم المختلفة",
        [
          [
            "Record government fees and private preparation charges separately. A preparation service should disclose its own charge without implying it is a government charge. Never publish full card or bank details in the knowledge hub.",
            "سجّل الرسوم الحكومية وتكاليف الخدمات الخاصة في قيود منفصلة. ويجب على خدمة الإعداد الإفصاح عن أتعابها بوضوح دون الإيحاء بأنها رسوم حكومية. ولا تشارك أبدًا بيانات البطاقات البنكية أو الحسابات في مركز المعرفة.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS Fee Schedule", "جدول رسوم USCIS"), "https://www.uscis.gov/g-1055"),
      src(tx("USCIS Fee Calculator", "حاسبة رسوم USCIS الرسمية"), "https://www.uscis.gov/feecalculator"),
      src(tx("USCIS Transition to Electronic Payments", "الانتقال إلى المدفوعات الإلكترونية لدى USCIS"), "https://www.uscis.gov/forms/filing-fees"),
      src(tx("USCIS I-912", "نموذج I-912 لدى USCIS"), "https://www.uscis.gov/i-912"),
    ],
    [
      rel("I-912", tx("Request for Fee Waiver", "طلب إعفاء من الرسوم")),
    ],
  ),

  article(
    "online-vs-paper-filing",
    "filing",
    tx("Online Filing and Paper Filing", "التقديم عبر الإنترنت والتقديم الورقي"),
    [
      block(
        "Confirm the allowed method",
        "تأكد من الطريقة المتاحة لكل نموذج",
        [
          [
            "Not every form or category is available online. An online version may have different eligibility or filing limitations. Review the official page before deciding how to submit.",
            "ليست كل النماذج أو الفئات متاحة للتقديم عبر الإنترنت. وقد يشتمل التقديم الإلكتروني على شروط أهلية أو قيود مختلفة. راجع الصفحة الرسمية قبل اتخاذ القرار بشأن طريقة الإرسال.",
          ],
        ],
      ),
      block(
        "For online filing",
        "بالنسبة للتقديم عبر الإنترنت",
        [
          [
            "Use the applicant's appropriate USCIS account and official workflow. Review uploaded evidence, responses, declarations, and payment information before submission. Save the submission confirmation and final application records. Keep account recovery information private.",
            "استخدم حساب USCIS الشخصي المناسب للمتقدم واتبع الخطوات الرسمية. راجع الأدلة المرفوعة والإجابات والإقرارات وبيانات الدفع قبل الإرسال النهائي. واحفظ إشعار تأكيد الإرسال وسجلات الطلب، واحتفظ ببيانات استرداد الحساب سرية.",
          ],
        ],
      ),
      block(
        "For paper filing",
        "بالنسبة للتقديم الورقي",
        [
          [
            "Verify the correct filing address for the exact form, category, and delivery service. Review required pages, signatures, evidence, and payment instructions. Retain a complete copy and carrier tracking. Delivery to a lockbox is different from acceptance of a properly filed case.",
            "تحقق من عنوان الإرسال البريدي الدقيق الخاص بالنموذج والفئة وشركة الشحن المستخدمة. وراجع الصفحات والتوقيعات والأدلة وتعليمات السداد. واحتفظ بنسخة كاملة مطابقة مع رقم تتبع الشحنة البريدية. فتسليم الطرد لصندوق البريد (Lockbox) يختلف عن قبوله رسميًا للبدء في معالجته.",
          ],
        ],
      ),
      block(
        "Avoid duplicate submissions",
        "تجنب الإرسال المكرر للطلبات",
        [
          [
            "Do not file the same request twice merely because a receipt is delayed. First check official inquiry options and assess the consequences. If a package is returned, read the rejection reason and correct the actual issue rather than automatically resending the same material.",
            "لا ترسل نفس الطلب مرتين لمجرد تأخر صدور إيصال الاستلام، بل استفسر عبر القنوات الرسمية وقيم العواقب أولاً. وإذا أُعيد الطرد المالي، فاقرأ سبب الرفض وصحح المشكلة الفعلية بدلاً من إعادة إرسال نفس الأوراق تلقائيًا.",
          ],
        ],
      ),
    ],
    [
      src(tx("Create a USCIS Online Account", "إنشاء حساب USCIS عبر الإنترنت"), "https://myaccount.uscis.gov/"),
      src(tx("USCIS Online Account Terms", "شروط حساب USCIS عبر الإنترنت"), "https://myaccount.uscis.gov/"),
      src(tx("Tips for Filing Forms by Mail", "نصائح إرسال النماذج بالبريد لدى USCIS"), "https://www.uscis.gov/forms/filing-guidance/tips-for-filing-forms-by-mail"),
    ],
  ),
];
