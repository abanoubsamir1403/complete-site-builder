import { tx } from "@/lib/i18n";
import { article, block, rel, src } from "./helpers";
import type { KnowledgeArticle } from "./types";

export const articlesHumanitarian: KnowledgeArticle[] = [
  article(
    "humanitarian-immigration-guide",
    "humanitarian",
    tx("Humanitarian Immigration: An Introductory Guide", "الهجرة الإنسانية: دليل تمهيدي"),
    [
      block(
        "These are distinct legal processes",
        "إجراءات قانونية متباينة ومستقلة",
        [
          [
            "Asylum, refugee family petitions, Temporary Protected Status, VAWA self-petitions, and T or U nonimmigrant requests have different requirements and procedures. A difficult situation does not automatically establish eligibility for a particular benefit.",
            "اللجوء، والتماسات لم شمل اللاجئين، ووضع الحماية المؤقتة (TPS)، والتماسات الحماية الذاتية لضحايا العنف (VAWA)، وتأشيرات ضحايا الاتجار بالبشر والجرائم (T وU) كلها إجراءات تخضع لمتطلبات وشروط مختلفة. ولا تعني الظروف الصعبة تلقائيًا الأهلية لمنفعة هجرية محددة.",
          ],
        ],
      ),
      block(
        "Protect sensitive information",
        "احمِ المعلومات الحساسة والشخصية",
        [
          [
            "Keep detailed histories, identity records, official notices, and evidence private. Consider whether it is safe to receive messages, use a shared device, or mail documents to an address. A public contact form should not request a full account of abuse, trafficking, or persecution.",
            "حافظ على سرية تفاصيل روايتك، ووثائق الهوية، والإشعارات الرسمية، والأدلة. وتأكد من أمان وسائل استلام الرسائل، والأجهزة المشتركة، وعنوان المراسلة البريدية. ولا ينبغي لنماذج الاتصال العامة طلب سرد تفصيلي لوقائع الإساءة أو الاتجار أو الاضطهاد.",
          ],
        ],
      ),
      block(
        "Identify the correct authority",
        "حدّد الجهة المختصة بالنظر في القضية",
        [
          [
            "Some matters involve USCIS; others involve immigration courts or multiple agencies. Existing proceedings and notices matter. Preserve all documents and deadlines.",
            "تختص USCIS ببعض القضايا بينما تتبع قضايا أخرى لمحاكم الهجرة (EOIR) أو جهات متعددة. كما أن الإجراءات والإشعارات القضائية القائمة تؤثر بشكل جوهري. واحتفظ بجميع المستندات والمواعيد النهائية بعناية.",
          ],
        ],
      ),
      block(
        "Obtain specialized help",
        "احصل على مساعدة قانونية متخصصة",
        [
          [
            "Seek an authorized legal professional experienced in the relevant area. Do not let a general questionnaire write a claim, coach a narrative, or decide which facts to omit. Program availability, litigation, and country designations can change; follow current official announcements before filing.",
            "ابحث عن محامٍ معتمد أو ممثل قانوني معتمد ذي خبرة واسعة في هذا المجال التخصصي. ولا تعتمد على استبيان عام لصياغة دعوى أو توجيه روايتك أو حذف وقائع. كما قد تتغير البرامج والأحكام القضائية وتصنيفات الدول؛ لذا تابع الإعلانات الرسمية الحديثة قبل التقديم.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS I-589", "نموذج I-589 لدى USCIS"), "https://www.uscis.gov/i-589"),
      src(tx("USCIS I-730", "نموذج I-730 لدى USCIS"), "https://www.uscis.gov/i-730"),
      src(tx("USCIS I-360", "نموذج I-360 لدى USCIS"), "https://www.uscis.gov/i-360"),
      src(tx("USCIS I-821", "نموذج I-821 لدى USCIS"), "https://www.uscis.gov/i-821"),
      src(tx("USCIS I-914", "نموذج I-914 لدى USCIS"), "https://www.uscis.gov/i-914"),
      src(tx("USCIS I-918", "نموذج I-918 لدى USCIS"), "https://www.uscis.gov/i-918"),
    ],
    [
      rel("I-589", tx("Application for Asylum and for Withholding of Removal", "اللجوء وحجب الترحيل")),
      rel("I-730", tx("Refugee/Asylee Relative Petition", "طلب لم شمل أقارب اللاجئين/طالبي اللجوء")),
      rel("I-360", tx("Petition for Amerasian, Widow(er), or Special Immigrant", "عريضة للمهاجرين الخاصين والأرامل")),
      rel("I-821", tx("Application for Temporary Protected Status", "الحماية المؤقتة")),
    ],
  ),

  article(
    "waivers-and-adverse-decisions",
    "humanitarian",
    tx("Waivers, Prior Removal and Adverse Decisions", "الإعفاءات وأوامر الترحيل السابقة والقرارات السلبية"),
    [
      block(
        "Different problems require different procedures",
        "مشاكل مختلفة تتطلب إجراءات قانونية متباينة",
        [
          [
            "Forms I-601, I-601A, and I-212 address different kinds of requests. They are not interchangeable ways to fix every immigration problem. Form I-290B is used for specified appeals or motions, but not every adverse decision uses that form or permits the same procedure.",
            "تعالج نماذج I-601 وI-601A وI-212 أنواعًا مختلفة من طلبات الإعفاء، وهي ليست حلولاً قابلة للتبديل لكل مشكلة هجرية. ويُستخدم نموذج I-290B لبعض الاستئنافات أو طلبات إعادة النظر، ولكن ليست كل القرارات السلبية تقبل هذا النموذج أو نفس الإجراء.",
          ],
        ],
      ),
      block(
        "Preserve the complete record",
        "احتفظ بالسجل الكامل للقرارات والمراسلات",
        [
          [
            "Keep refusal or denial notices, prior applications, entry and exit records, court documents, and all agency correspondence. Record the date issued, date received, method of service, and any deadline described in the notice.",
            "احتفظ بإشعارات الرفض أو عدم القبول، والطلبات السابقة، وسجلات الدخول والخروج، والوثائق القضائية، وكافة المراسلات الحكومية. ودوّن تاريخ الإصدار، وتاريخ الاستلام، وطريقة التبليغ، وأي موعد نهائي محدد في الإشعار.",
          ],
        ],
      ),
      block(
        "Do not substitute a general deadline",
        "لا تعتمد على مواعيد عامة تقريبية",
        [
          [
            "Read the decision's procedure and seek legal help promptly. An appeal, a motion, a new application, and a request to another agency can have different consequences. A generic website should not calculate the final deadline without examining the governing rule and service facts.",
            "اقرأ الإجراءات المنصوص عليها في نص القرار واطلب المساعدة القانونية فورًا. فالاستئناف، وطلب إعادة النظر، والطلب الجديد، ومخاطبة جهة أخرى تترتب عليها عواقب مختلفة كليًا. ولا يمكن لموقع عام حساب الموعد النهائي دون فحص اللائحة الحاكمة وتفاصيل التبليغ.",
          ],
        ],
      ),
      block(
        "Legal assessment is essential",
        "التقييم القانوني ضرورة قصوى",
        [
          [
            "Inadmissibility, fraud findings, unlawful presence, criminal history, removal orders, and hardship requirements need a qualified evaluation. A preparation checklist can organize documents but cannot decide whether a waiver is available or advisable.",
            "تتطلب أسباب عدم القبول، ونتائج الاحتيال، والتواجد غير القانوني، والسجل الجنائي، وأوامر الترحيل، وشروط المشقة الاستثنائية تقييمًا من محامٍ مختص. فقائمة إعداد الأوراق تساعد في تنظيم المستندات لكنها لا تحدد ما إذا كان الإعفاء متاحًا أو مناسبًا.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS I-601", "نموذج I-601 لدى USCIS"), "https://www.uscis.gov/i-601"),
      src(tx("USCIS I-601A", "نموذج I-601A لدى USCIS"), "https://www.uscis.gov/i-601a"),
      src(tx("USCIS I-212", "نموذج I-212 لدى USCIS"), "https://www.uscis.gov/i-212"),
      src(tx("USCIS I-290B", "نموذج I-290B لدى USCIS"), "https://www.uscis.gov/i-290b"),
    ],
    [
      rel("I-601", tx("Application for Waiver of Grounds of Inadmissibility", "طلب إعفاء من أسباب عدم القبول")),
      rel("I-601A", tx("Application for Provisional Unlawful Presence Waiver", "طلب إعفاء مؤقت عن التواجد غير القانوني")),
      rel("I-212", tx("Application for Permission to Reapply for Admission into the United States After Deportation or Removal", "طلب إذن لإعادة التقدم للدخول بعد الترحيل")),
      rel("I-290B", tx("Notice of Appeal or Motion", "إشعار استئناف أو طلب إعادة نظر")),
    ],
  ),

  article(
    "registration-and-asylum-fee-notices",
    "humanitarian",
    tx("Registration Requirements and Asylum Fee Notices", "شروط التسجيل وإشعارات رسوم اللجوء"),
    [
      block(
        "Registration is a separate legal issue",
        "التسجيل مسألة قانونية مستقلة",
        [
          [
            "USCIS has published information about the alien registration requirement and Form G-325R. Registration should not be confused with receiving lawful status, work permission, or protection from removal. Whether a person already satisfies registration requirements or needs another action requires careful review.",
            "نشرت USCIS إرشادات حول شروط تسجيل الأجانب ونموذج G-325R. ويجب عدم الخلط بين التسجيل وبين الحصول على وضع قانوني أو تصريح عمل أو حماية من الترحيل. ويتطلب تحديد ما إذا كان الشخص يستوفي بالفعل شروط التسجيل أو يحتاج لإجراء آخر فحصًا قانونيًا متأنيًا.",
          ],
        ],
      ),
      block(
        "Treat payment notices as case-specific",
        "تعامل مع إشعارات الرسوم وفقًا لملفك الفردي",
        [
          [
            "Asylum-related fees and payment procedures have been affected by policy changes and litigation. Use the current official USCIS guidance, fee schedule, and the actual notice for your case. Do not assume an amount, due date, or recurring payment obligation from a generic article.",
            "تأثرت الرسوم المتعلقة باللجوء وإجراءات سدادها بتغيرات السياسات والأحكام القضائية المتتالية. اعتمد دائمًا على التوجيهات الرسمية الحالية لـ USCIS وجدول الرسوم والإشعار الفعلي الصادر لقضيتك، ولا تفترض مبلغًا أو موعد استحقاق بناءً على مقال عام.",
          ],
        ],
      ),
      block(
        "Protect identifiers",
        "احمِ بيانات هويتك وأرقامك المرجعية",
        [
          [
            "Use official payment entry points. Never put A-Numbers, notice numbers, payment details, or full case documents into a public website comment.",
            "استخدم بوابات الدفع الرسمية المعتمدة فقط. ولا تشارك أبدًا رقم الأجنبي (A-Number) أو أرقام الإشعارات أو تفاصيل السداد أو وثائق القضية في تعليقات مواقع الإنترنت العامة.",
          ],
        ],
      ),
      block(
        "Get advice before acting on uncertainty",
        "استشر أهل الاختصاص قبل اتخاذ أي خطوة عند الشك",
        [
          [
            "If registration, fees, or a notice could affect your case, consult an authorized legal professional. This article deliberately does not publish a universal registration instruction or asylum-fee schedule.",
            "إذا كانت مسألة التسجيل أو الرسوم أو أي إشعار مستلم قد تؤثر على قضيتك، فاستشر محامي هجرة معتمدًا فورًا. ولا يقدم هذا المقال تعليمات تسجيل شاملة أو جدول رسوم ثابتًا عمدًا نظرًا لحساسية وتغير هذه الإجراءات.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS Alien Registration Requirement", "متطلبات تسجيل الأجانب لدى USCIS"), "https://www.uscis.gov/alien-registration"),
      src(tx("USCIS G-325R", "نموذج G-325R لدى USCIS"), "https://www.uscis.gov/g-325r"),
      src(tx("USCIS Annual Asylum Fee Portal", "بوابة رسوم اللجوء السنوية لدى USCIS"), "https://www.uscis.gov/forms/filing-fees"),
      src(tx("USCIS Fee Schedule", "جدول الرسوم الرسمي لـ USCIS"), "https://www.uscis.gov/g-1055"),
    ],
    [
      rel("G-325R", tx("Biographic Information (Registration)", "معلومات السيرة الذاتية (التسجيل)")),
    ],
  ),
];
