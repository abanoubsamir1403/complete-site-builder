import { tx } from "@/lib/i18n";
import { article, block, src } from "./helpers";
import type { KnowledgeArticle } from "./types";

export const articlesStart: KnowledgeArticle[] = [
  article(
    "agencies-and-courts",
    "start",
    tx("USCIS, NVC, Embassies, CBP and Immigration Courts", "USCIS وNVC والسفارات وCBP ومحاكم الهجرة"),
    [
      block(
        "Different agencies handle different stages",
        "جهات مختلفة تتولى مراحل مختلفة",
        [
          [
            "USCIS handles many immigration petitions and applications, including relative petitions, certain applications for permanent residence, and naturalization. The Department of State manages visa processing through NVC and U.S. embassies and consulates. CBP handles inspection at ports of entry and many electronic I-94 records. Immigration courts are part of the Department of Justice, not USCIS.",
            "تتولى إدارة خدمات الهجرة والجنسية الأمريكية (USCIS) العديد من الالتماسات والطلبات، بما في ذلك التماسات الأقارب وبعض طلبات الإقامة الدائمة والتجنس. بينما تدير وزارة الخارجية الأمريكية معالجة التأشيرات عبر مركز التأشيرات الوطني (NVC) والسفارات والقنصليات الأمريكية. وتتولى هيئة الجمارك وحماية الحدود (CBP) التفتيش عند منافذ الدخول وإدارة سجلات I-94 الإلكترونية. أما محاكم الهجرة فهي جزء من وزارة العدل الأمريكية وليست تابعة لـ USCIS.",
          ],
        ],
      ),
      block(
        "Why the distinction matters",
        "لماذا يعد هذا التمييز مهمًا",
        [
          [
            "A USCIS approval notice is not automatically a visa, permission to board a flight, or permission to enter the country. An NVC document request belongs to the visa stage. An embassy appointment is not a USCIS interview. A court deadline requires the appropriate court procedure.",
            "إشعار الموافقة الصادر عن USCIS ليس تأشيرة تلقائية ولا إذنًا بركوب الطائرة أو دخول البلاد. طلب المستندات من NVC ينتمي لمرحلة التأشيرة. موعد المقابلة في السفارة ليس مقابلة USCIS. والمواعيد المحددة من المحكمة تتطلب اتباع الإجراءات القضائية المناسبة.",
          ],
        ],
      ),
      block(
        "Keep the record connected",
        "حافظ على ترابط سجلك وملفك",
        [
          [
            "Create a timeline with the agency, reference number, date, document received, and next action. Keep USCIS receipt numbers separate from NVC case numbers and embassy references. When one agency transfers a case, retain the transfer notice and the receiving agency's instructions.",
            "أنشئ جدولاً زمنيًا يوضح اسم الجهة، والرقم المرجعي، والتاريخ، والمستند المستلم، والإجراء التالي. افصل بين أرقام إيصالات USCIS وأرقام قضايا NVC ومراجع السفارة. وعندما تحيل جهة الملف إلى أخرى، احتفظ بإشعار الإحالة وبتعليمات الجهة المستقبلة.",
          ],
        ],
      ),
      block(
        "CRBA",
        "تقرير القنصلية للولادة في الخارج (CRBA)",
        [
          [
            "A Consular Report of Birth Abroad is a Department of State citizenship-documentation process. Do not upload a CRBA application to USCIS merely because it concerns citizenship.",
            "يعد تقرير القنصلية للميلاد في الخارج (CRBA) إجراءً توثيقيًا للجنسية تابعًا لوزارة الخارجية الأمريكية. لا تقدم طلب CRBA إلى USCIS لمجرد أنه يتعلق بالجنسية.",
          ],
        ],
      ),
    ],
    [
      src(tx("Department of State Immigrant Visa Process", "إجراءات تأشيرة الهجرة لوزارة الخارجية"), "https://travel.state.gov/content/travel/en/us-visas/immigrate/the-immigrant-visa-process.html"),
      src(tx("CBP I-94", "سجل I-94 لدى CBP"), "https://i94.cbp.dhs.gov/"),
      src(tx("Department of State Birth Abroad", "الولادة في الخارج لوزارة الخارجية"), "https://travel.state.gov/content/travel/en/international-travel/while-abroad/birth-abroad.html"),
      src(tx("USCIS All Forms", "جميع نماذج USCIS"), "https://www.uscis.gov/forms/all-forms"),
    ],
  ),

  article(
    "visas-status-and-documents",
    "start",
    tx("Visa, Immigration Status and Immigration Documents", "التأشيرة والوضع الهجري والمستندات الهجرية"),
    [
      block(
        "Read the right document",
        "اقرأ المستند الصحيح",
        [
          [
            "A visa generally allows a traveler to seek entry in a particular classification. Admission and the authorized period of stay are separate questions, often documented on an I-94. A USCIS receipt confirms receipt of a filing; its legal effect depends on the request and category.",
            "تتيح التأشيرة للمسافر عمومًا طلب الدخول بتصنيف معين. لكن القبول للدخول وفترة الإقامة المصرح بها مسألتان منفصلتان يتم توثيقهما عادة في سجل I-94. ويؤكد إيصال استلام USCIS استلام الملف فقط، ويعتمد أثره القانوني على نوع الطلب والفئة.",
          ],
        ],
      ),
      block(
        "Documents have different functions",
        "لكل مستند وظيفة مختلفة",
        [
          [
            "A Green Card documents permanent residence. An Employment Authorization Document is evidence of work authorization. A travel document serves the function specified for its category. An approval notice must be read together with the underlying classification and any attached admission record.",
            "البطاقة الخضراء (Green Card) تثبت الإقامة الدائمة. ووثيقة تصريح العمل (EAD) تثبت التصريح بالعمل. وتؤدي وثيقة السفر الغرض المحدد لفئتها. ويجب قراءة إشعار الموافقة بالاقتران مع التصنيف الأساسي وأي سجل دخول مرفق به.",
          ],
        ],
      ),
      block(
        "Build a document timeline",
        "أنشئ تسلسلاً زمنيًا للمستندات",
        [
          [
            "Record visa issuance and expiration, entry dates, the I-94 classification and admit-until notation, approval periods, and document expiration dates. Do not assume all these dates are interchangeable. Preserve prior records as well as current documents.",
            "سجّل تاريخ إصدار التأشيرة وانتهائها، وتواريخ الدخول، وتصنيف I-94 وتاريخ انتهاء الإقامة المصرح به، وفترات الموافقة، وتواريخ انتهاء صلاحية المستندات. لا تفترض أن هذه التواريخ قابلة للتبديل، واحتفظ بالسجلات السابقة والمستندات الحالية معًا.",
          ],
        ],
      ),
      block(
        "If a date is unclear",
        "إذا كان هناك تاريخ غير واضح",
        [
          [
            "Compare the original record with the official agency account. Ask the issuing agency about a clerical discrepancy. Get legal advice about status, unlawful presence, work permission, or the consequences of a late filing. A preparation service should not infer lawful status from the existence of a receipt alone.",
            "قارن السجل الأصلي مع حساب الجهة الرسمية. واستفسر من الجهة المصدرة بشأن أي خطأ كتابي. احصل على استشارة قانونية بشأن الوضع القانوني أو التواجد غير القانوني أو تصريح العمل أو عواقب التقديم المتأخر. ولا يجوز لخدمة إعداد النماذج استنتاج الوضع القانوني بمجرد وجود إيصال استلام.",
          ],
        ],
      ),
    ],
    [
      src(tx("CBP I-94", "سجل I-94 لدى CBP"), "https://i94.cbp.dhs.gov/"),
      src(tx("USCIS All Forms", "جميع نماذج USCIS"), "https://www.uscis.gov/forms/all-forms"),
      src(tx("USAGov Adjustment of Status", "تعديل الوضع عبر موقع USAGov"), "https://www.usa.gov/green-card"),
    ],
  ),

  article(
    "choosing-help-avoiding-scams",
    "start",
    tx("Choosing Immigration Help and Avoiding Scams", "اختيار المساعدة في الهجرة وتجنب عمليات الاحتيال"),
    [
      block(
        "Verify what the provider can do",
        "تحقق مما يمكن لمقدم الخدمة القيام به",
        [
          [
            "Typing information, organizing records, and translating documents are different from advising someone about eligibility, legal strategy, or how to answer a legally significant question. Verify the credentials and authority of anyone offering legal advice or representation.",
            "إدخال البيانات وتنظيم السجلات وترجمة المستندات تختلف كليًا عن تقديم المشورة بشأن الأهلية أو الاستراتيجية القانونية أو كيفية الإجابة على أسئلة ذات أثر قانوني. تحقق دائمًا من مؤهلات وصلاحيات أي شخص يعرض تقديم استشارات قانونية أو تمثيلك قانونيًا.",
          ],
        ],
      ),
      block(
        "Protect your records",
        "احمِ مستنداتك وسجلاتك",
        [
          [
            "Keep your own copies of forms, receipts, agreements, and payment records. Read every answer before signing. Do not sign blank forms or permit someone to invent facts, backdate documents, or hide an event that the form asks about.",
            "احتفظ بنسخك الخاصة من النماذج والإيصالات والاتفاقيات وسجلات الدفع. اقرأ كل إجابة قبل التوقيع. لا توقع أبدًا على نماذج فارغة، ولا تسمح لأحد باختلاق حقائق أو تقديم تواريخ بأثر رجعي أو إخفاء وقائع يطلبها النموذج.",
          ],
        ],
      ),
      block(
        "Review promises carefully",
        "دقّق في الوعود بحذر",
        [
          [
            "Government form downloads are free, even when an application carries a filing fee. A private preparation charge is separate from a government fee. Ask for a written explanation of services and charges. A private provider cannot guarantee approval or sell access to a special USCIS decision-maker.",
            "تحميل النماذج الحكومية مجاني دائمًا حتى لو كان للطلب رسوم تقديم رسمية. ورسوم الإعداد الخاصة منفصلة تمامًا عن الرسوم الحكومية. اطلب بيانًا مكتوبًا بالخدمات والتكاليف. لا يمكن لأي جهة خاصة ضمان الموافقة أو بيع إمكانية الوصول إلى صانع قرار خاص في USCIS.",
          ],
        ],
      ),
      block(
        "Account ownership",
        "ملكية الحساب الرسمي",
        [
          [
            "Use your own email address for your personal USCIS account. Keep passwords and verification codes private. If you use an authorized representative, follow the official representative workflow rather than informally transferring control of your account.",
            "استخدم بريدك الإلكتروني الشخصي لحسابك في USCIS، واحتفظ بكلمات المرور ورموز التحقق سرية. إذا استعنت بممثل قانوني معتمد، فاتبع إجراءات التمثيل الرسمية بدلاً من تسليمه إدارة حسابك بشكل غير رسمي.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS Unauthorized Practice of Immigration Law Brochure", "كتيب USCIS حول ممارسة قانون الهجرة غير المصرح بها"), "https://www.uscis.gov/avoid-scams/unauthorized-practice-of-immigration-law"),
      src(tx("USCIS Avoid Immigration Scams", "تجنب احتيال الهجرة عبر USCIS"), "https://www.uscis.gov/avoid-scams"),
      src(tx("USCIS All Forms", "جميع نماذج USCIS"), "https://www.uscis.gov/forms/all-forms"),
    ],
  ),
];
