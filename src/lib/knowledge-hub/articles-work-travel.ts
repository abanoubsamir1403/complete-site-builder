import { tx } from "@/lib/i18n";
import { article, block, rel, src } from "./helpers";
import type { KnowledgeArticle } from "./types";

export const articlesWorkTravel: KnowledgeArticle[] = [
  article(
    "employment-authorization-i-765",
    "work-travel",
    tx("Employment Authorization: Understanding Form I-765", "تصريح العمل: فهم نموذج I-765"),
    [
      block(
        "Identify the basis first",
        "حدّد أساس الأهلية أولاً",
        [
          [
            "Form I-765 requests employment authorization or an Employment Authorization Document in eligible categories. Some people are authorized to work through their immigration status; others need approval before beginning work. The correct category matters.",
            "يُستخدم نموذج I-765 لطلب تصريح عمل أو بطاقة تصريح عمل (EAD) للفئات المؤهلة. فبعض الأفراد مصرح لهم بالعمل بموجب وضعهم الهجري تلقائيًا، بينما يحتاج آخرون إلى موافقة مسبقة قبل بدء العمل. واختيار الفئة الدقيقة أمر جوهري.",
          ],
        ],
      ),
      block(
        "Prepare the category record",
        "جهّز مستندات الفئة",
        [
          [
            "Gather identity records, prior EADs where applicable, and evidence of the status or pending request supporting the chosen category. Distinguish an initial application, renewal, and replacement. Match dates and category codes to the original notices.",
            "اجمع وثائق الهوية، وتصاريح العمل السابقة إن وجدت، وأدلة الوضع الهجري أو الطلب المعلق الذي يدعم الفئة المختارة. وميز بين الطلب المبدئي والتجديد والاستبدال، وتأكد من مطابقة التواريخ ورموز الفئات مع الإشعارات الأصلية.",
          ],
        ],
      ),
      block(
        "Do not assume renewal rules",
        "لا تفترض قواعد التجديد تلقائيًا",
        [
          [
            "Any automatic extension depends on the current rule, category, filing facts, and documents. A receipt does not universally extend work permission. Read the current official guidance before relying on an extension.",
            "يعتمد أي تمديد تلقائي لتصريح العمل على اللوائح السارية والفئة وتفاصيل التقديم والمستندات. فالإيصال لا يمدد تصريح العمل لجميع الحالات. اقرأ الإرشادات الرسمية الحالية قبل الاعتماد على التمديد التلقائي.",
          ],
        ],
      ),
      block(
        "Keep benefits separate",
        "افصل بين المزايا الهجرية المختلفة",
        [
          [
            "An EAD is not a Green Card, and it does not itself establish permission to travel. If a card contains travel-related wording, review the specific authorization rather than assuming every EAD has it. Ask an authorized legal professional about work permission when your circumstances are unclear.",
            "تصريح العمل (EAD) ليس بطاقة إقامة دائمة (Green Card)، ولا يمنح بحد ذاته إذنًا بالسفر الدولي. وإذا احتوت البطاقة على عبارة مشتركة للسفر (Combo Card)، فتحقق من التصريح المحدد بدلاً من تعميمه على كل بطاقة. واستشر محامي هجرة معتمدًا إذا كانت ظروف عملك غير واضحة.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS I-765", "نموذج I-765 لدى USCIS"), "https://www.uscis.gov/i-765"),
      src(tx("USCIS I-765 Processing Information", "معلومات معالجة I-765 لدى USCIS"), "https://www.uscis.gov/forms/all-forms/form-i-765-processing-times-and-information"),
    ],
    [
      rel("I-765", tx("Application for Employment Authorization", "تصريح العمل")),
    ],
  ),

  article(
    "travel-documents-i-131",
    "work-travel",
    tx("Travel Documents: Understanding Form I-131", "وثائق السفر: فهم نموذج I-131"),
    [
      block(
        "One form covers different requests",
        "نموذج واحد يغطي طلبات سفر مختلفة",
        [
          [
            "Form I-131 is associated with several types of travel and parole-related requests. A reentry permit, a refugee travel document, and advance parole serve different functions. Their requirements are not interchangeable.",
            "يرتبط نموذج I-131 بعدة أنواع من طلبات السفر والإفراج المشروط. فتصريح إعادة الدخول (Reentry Permit)، ووثيقة سفر اللاجئ، ووثيقة الإفراج المشروط المسبق (Advance Parole) تؤدي وظائف مختلفة، وشروطها ليست قابلة للتبديل.",
          ],
        ],
      ),
      block(
        "Prepare a travel record",
        "جهّز سجلاً دقيقًا للسفر",
        [
          [
            "Identify your actual immigration category, current documents, pending applications, intended destination, dates, and purpose. Keep prior travel documents and relevant notices. Presence, biometrics, filing timing, and validity rules depend on the specific request.",
            "حدّد فئتك الهجرية الحالية، ومستنداتك السارية، وطلباتك المعلقة، والوجهة المقصودة، والتواريخ، والغرض من السفر. واحتفظ بوثائق السفر السابقة والإشعارات، حيث تختلف متطلبات التواجد والبصمات وتوقيت التقديم والصلاحية باختلاف نوع الطلب.",
          ],
        ],
      ),
      block(
        "Before departure",
        "قبل مغادرة الولايات المتحدة",
        [
          [
            "Get case-specific advice if travel could affect a pending application, asylum claim, residence, or admissibility. A pending travel-document application is not permission to leave and return. Do not book nonrefundable travel based on a predicted approval date.",
            "احصل على استشارة قانونية مخصصة إذا كان السفر قد يؤثر على طلب معلق، أو قضية لجوء، أو استمرارية الإقامة، أو شروط القبول. فالطلب المعلق ليس إذنًا بالمغادرة والعودة، ولا تحجز رحلات غير قابلة للإلغاء بناءً على تواريخ موافقة متوقعة.",
          ],
        ],
      ),
      block(
        "At return",
        "عند العودة إلى الولايات المتحدة",
        [
          [
            "A travel document does not guarantee admission. Carrier documentation and inspection are separate issues. If a permanent resident loses travel-related evidence abroad, investigate the applicable official carrier-documentation process rather than assuming an I-90 filing allows boarding.",
            "لا تضمن وثيقة السفر الدخول المؤكد، إذ يخضع المسافر لإجراءات التفتيش والقبول عند المنفذ. وإذا فقد المقيم الدائم بطاقته بالخارج، فعليه اتباع إجراءات وثائق الناقل الرسمية (I-131A) بدلاً من افتراض أن مجرد تقديم I-90 يسمح له بركوب الطائرة.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS I-131", "نموذج I-131 لدى USCIS"), "https://www.uscis.gov/i-131"),
      src(tx("USCIS I-131A", "نموذج I-131A لدى USCIS"), "https://www.uscis.gov/i-131a"),
    ],
    [
      rel("I-131", tx("Application for Travel Documents, Parole Documents, and Arrival/Departure Records", "وثائق السفر والإفراج المشروط وسجلات الوصول/المغادرة")),
      rel("I-131A", tx("Application for Carrier Documentation", "طلب وثائق الناقل")),
    ],
  ),

  article(
    "extend-change-status-i-539",
    "work-travel",
    tx("Extending or Changing Nonimmigrant Status: I-539", "تمديد أو تغيير وضع غير المهاجر: نموذج I-539"),
    [
      block(
        "What the request concerns",
        "ما يتعلق به هذا الطلب",
        [
          [
            "Certain nonimmigrants use Form I-539 to request an extension or change of status, and some categories use it for other specified purposes. Not every classification or circumstance is eligible. Related dependents may require additional forms or separate filings.",
            "يستخدم حاملو تأشيرات غير المهاجرين المؤهلون نموذج I-539 لطلب تمديد إقامتهم أو تغيير وضعهم داخل البلاد، وتستخدمه بعض الفئات لأغراض محددة أخرى. ولا تتأهل جميع التصنيفات أو الظروف لهذا الإجراء، وقد يحتاج المرافقون إلى نماذج تكميلية أو تقديمات منفصلة.",
          ],
        ],
      ),
      block(
        "Organize supporting facts",
        "نظّم الوقائع والمستندات الداعمة",
        [
          [
            "Collect passport and I-94 records, current status notices, evidence of activities consistent with the existing classification, and documents supporting the requested classification or additional stay. Record the actual authorized-stay notation and relevant deadlines.",
            "اجمع جواز السفر وسجل I-94، وإشعارات الوضع الحالي، وأدلة ممارسة الأنشطة المتوافقة مع التصنيف القائم، والوثائق الداعمة للوضع الجديد أو الإقامة الإضافية المطلوبة. وسجّل تاريخ انتهاء الإقامة المصرح به بدقة والمواعيد النهائية المرتبطة به.",
          ],
        ],
      ),
      block(
        "A visa is a separate document",
        "التأشيرة وثيقة منفصلة تمامًا",
        [
          [
            "An extension or change of status in the United States is different from getting a visa from a consulate. Do not assume a USCIS approval automatically creates a visa in a passport.",
            "تمديد أو تغيير الوضع داخل الولايات المتحدة يختلف كليًا عن الحصول على تأشيرة جديدة من قنصلية أمريكية بالخارج. ولا تفترض أن موافقة USCIS تطبع تأشيرة تلقائية في جواز سفرك.",
          ],
        ],
      ),
      block(
        "Timing and conduct matter",
        "التوقيت والالتزام بالشروط أمران حاسمان",
        [
          [
            "Do not infer authorization to work, study, or remain indefinitely from a filing receipt. Late filings, pending requests, international travel, and changes in the proposed activity can have legal consequences. Seek authorized advice when any of these issues arise.",
            "لا تستنتج تصريحًا بالعمل أو الدراسة أو البقاء لأجل غير مسمى من مجرد إيصال الاستلام. فالتقديم المتأخر، والطلبات المعلقة، والسفر الدولي أثناء المعالجة، وتغيير النشاط، كلها أمور قد تؤدي إلى عواقب قانونية جسيمة. اطلب مشورة قانونية معتمدة فور ظهور أي منها.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS I-539", "نموذج I-539 لدى USCIS"), "https://www.uscis.gov/i-539"),
      src(tx("CBP I-94", "سجل I-94 لدى CBP"), "https://i94.cbp.dhs.gov/"),
    ],
    [
      rel("I-539", tx("Application to Extend/Change Nonimmigrant Status", "تمديد / تغيير وضع غير المهاجر")),
    ],
  ),

  article(
    "employment-based-petitions-i-129-i-140",
    "work-travel",
    tx("Employer and Employment-Based Immigration Petitions", "التماسات الهجرة والعمل القائمة على التوظيف"),
    [
      block(
        "Different requests have different purposes",
        "طلبات مختلفة لأغراض متباينة",
        [
          [
            "Form I-129 is used for certain nonimmigrant worker petitions. Form I-140 is used for certain immigrant worker classifications. Some classifications involve an employer; others may allow a qualifying person to self-petition. Classification-specific rules control.",
            "يُستخدم نموذج I-129 لالتماسات العمال المؤقتين غير المهاجرين، بينما يُستخدم نموذج I-140 لتصنيفات العمال المهاجرين الدائمين. وتتطلب بعض الفئات صاحب عمل كفيلاً، بينما تسمح فئات أخرى بتقديم التماس ذاتي للمؤهلين. وتحدد القواعد الخاصة بكل فئة متطلباتها الدقيقة.",
          ],
        ],
      ),
      block(
        "Separate employer and individual records",
        "افصل بين سجلات صاحب العمل وسجلات الموظف",
        [
          [
            "Employer evidence may include business records, role descriptions, financial information, and classification-specific documents. Individual evidence may include education, employment history, achievements, licenses, and immigration records. Requirements differ substantially by category.",
            "تشمل أدلة صاحب العمل السجلات التجارية، وتوصيف الوظيفة، والقوائم المالية، والوثائق الخاصة بالتصنيف. بينما تشمل أدلة الموظف المؤهلات الأكاديمية، وسير العمل، والإنجازات، والتراخيص، وسجلات الهجرة. وتختلف المتطلبات اختلافًا كبيرًا باختلاف الفئة.",
          ],
        ],
      ),
      block(
        "Approval does not answer every question",
        "الموافقة على الالتماس لا تجيب عن كل مسألة",
        [
          [
            "A petition, a visa, status, admission, and employment authorization are separate concepts. A worker should not assume permission to start a job, change employers, or travel from the existence of an employer receipt.",
            "الالتماس، والتأشيرة، والوضع القانوني، والدخول، وتصريح العمل مفاهيم قانونية منفصلة. ولا ينبغي للعامل أن يفترض تصريحًا ببدء العمل أو الانتقال لصاحب عمل آخر أو السفر لمجرد استلام إشعار تقديم الالتماس.",
          ],
        ],
      ),
      block(
        "Use qualified assessment",
        "استعن بتقييم قانوني متخصص",
        [
          [
            "Labor certification, specialty occupation requirements, extraordinary ability, national interest waivers, corporate transfers, and investment classifications involve legal analysis. This hub provides orientation and official links; it does not choose an employment classification or evaluate the sufficiency of an employer's evidence.",
            "تتطلب شهادات العمل (PERM)، واشتراطات المهن التخصصية، والقدرات الاستثنائية، والإعفاءات للمصلحة الوطنية (NIW)، والنقل الداخلي للشركات، وفئات الاستثمار تحليلاً قانونيًا معقدًا. يهدف هذا المركز للتوعية وتقديم الروابط الرسمية، ولا يحدد التصنيف الوظيفي ولا يقيم كفاية أدلة صاحب العمل.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS I-129", "نموذج I-129 لدى USCIS"), "https://www.uscis.gov/i-129"),
      src(tx("USCIS I-140", "نموذج I-140 لدى USCIS"), "https://www.uscis.gov/i-140"),
      src(tx("USCIS All Forms", "جميع نماذج USCIS"), "https://www.uscis.gov/forms/all-forms"),
    ],
    [
      rel("I-129", tx("Petition for a Nonimmigrant Worker", "طلب لعامل غير مهاجر")),
      rel("I-140", tx("Immigrant Petition for Alien Workers", "التماس الهجرة للعمال الأجانب")),
    ],
  ),
];
