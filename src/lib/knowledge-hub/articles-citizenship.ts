import { tx } from "@/lib/i18n";
import { article, block, rel, src } from "./helpers";
import type { KnowledgeArticle } from "./types";

export const articlesCitizenship: KnowledgeArticle[] = [
  article(
    "naturalization-n-400",
    "citizenship",
    tx("Naturalization: Understanding Form N-400", "التجنس: فهم نموذج N-400"),
    [
      block(
        "What naturalization is",
        "ما هو التجنس",
        [
          [
            "Naturalization is a process through which an eligible person becomes a U.S. citizen. Form N-400 is the application used for many applicants. The relevant basis may involve different requirements and exceptions.",
            "التجنس هو الإجراء القانوني الذي يكتسب بموجبه الشخص المؤهل الجنسية الأمريكية. ويعد نموذج N-400 هو الطلب المعتمد لغالبية المتقدمين، وتتضمن الأسس المختلفة متطلبات واستثناءات متباينة.",
          ],
        ],
      ),
      block(
        "Prepare the history",
        "جهّز سجلك وتاريخك الشخصي",
        [
          [
            "Organize permanent residence records, addresses, employment, travel outside the United States, marital history, taxes, and any court records requested by the form. Read the actual question and its time period rather than assuming every question covers the same years.",
            "نظّم سجلات الإقامة الدائمة، وتواريخ العناوين، وسجلات العمل، وتفاصيل السفر خارج الولايات المتحدة، والتاريخ الزواجي، والإقرارات الضريبية، وأي سجلات قضائية يطلبها النموذج. اقرأ كل سؤال بدقة وفترته الزمنية المحددة بدلاً من افتراض أنها تغطي نفس السنوات.",
          ],
        ],
      ),
      block(
        "Eligibility is broader than a calendar date",
        "الأهلية أشمل من مجرد تاريخ تقويمي",
        [
          [
            "Residence, physical presence, good moral character, language and civics requirements, and other conditions may apply. Reaching a residence anniversary does not automatically resolve every requirement.",
            "تشمل الشروط الإقامة المستمرة، والتواجد الفعلي، وحسن السيرة والأخلاق، ومتطلبات اللغة الإنجليزية والتربية الوطنية، وشروطًا أخرى. وبلوغ ذكرى مرور سنوات الإقامة لا يعني استيفاء جميع المتطلبات تلقائيًا.",
          ],
        ],
      ),
      block(
        "The process includes an examination",
        "تتضمن الإجراءات اختبارًا رسميًا",
        [
          [
            "USCIS may schedule biometrics and an interview. Citizenship generally requires completion of the applicable oath process after approval. Use current official study materials for the test version that applies to your filing. Travel, arrests, tax issues, prior immigration inaccuracies, and disability-related exceptions deserve individual review.",
            "قد تحدد USCIS موعدًا للبصمات ومقابلة شخصية. وتتطلب الجنسية عمومًا أداء قسم الولاء بعد الموافقة. استخدم مواد الدراسة الرسمية الحالية المعتمدة لنسخة الاختبار المنطبقة على ملفك. وتتطلب فترات السفر الطويلة، والتوقيفات، والمسائل الضريبية، والأخطاء الهجرية السابقة، واستثناءات الإعاقة فحصًا فرديًا دقيقًا.",
          ],
        ],
      ),
    ],
    [
      src(tx("USAGov Naturalization", "التجنس عبر موقع USAGov"), "https://www.usa.gov/become-us-citizen"),
      src(tx("USCIS N-400", "نموذج N-400 لدى USCIS"), "https://www.uscis.gov/n-400"),
      src(tx("USCIS Citizenship: What to Expect", "الجنسية: ماذا تتوقع من USCIS"), "https://www.uscis.gov/citizenship/learn-about-citizenship/citizenship-and-naturalization"),
    ],
    [
      rel("N-400", tx("Application for Naturalization", "طلب التجنس")),
    ],
  ),

  article(
    "citizenship-through-parents",
    "citizenship",
    tx("Citizenship Through Parents: N-600, N-600K and CRBA", "الجنسية عبر الوالدين: N-600 وN-600K وCRBA"),
    [
      block(
        "Three processes serve different purposes",
        "ثلاثة إجراءات تؤدي أغراضًا مختلفة",
        [
          [
            "Form N-600 requests a Certificate of Citizenship documenting an existing citizenship claim. Form N-600K concerns a separate citizenship process under INA section 322, often relevant to qualifying children residing abroad. CRBA is handled by the Department of State for qualifying births abroad.",
            "يطلب نموذج N-600 إصدار شهادة جنسية لتوثيق حق قائم بالفعل في المواطنة. بينما يختص نموذج N-600K بإجراء منفصل بموجب المادة 322 من قانون الهجرة، وهو مخصص غالبًا للأطفال المؤهلين المقيمين في الخارج. أما تقرير القنصلية للولادة في الخارج (CRBA) فتتولاه وزارة الخارجية للمواليد المؤهلين خارج البلاد.",
          ],
        ],
      ),
      block(
        "Facts and dates control",
        "الحقائق والتواريخ هي الحاكمة",
        [
          [
            "The applicable law can depend on birth date, the parent's citizenship history, physical presence, the child's residence, permanent resident admission, custody, and family circumstances. These routes should not be selected from nationality alone.",
            "يعتمد القانون المنطبق على تاريخ ميلاد الطفل، وتاريخ جنسية الوالد، وفترة التواجد الفعلي، وإقامة الطفل، وقبوله كمقيم دائم، والحضانة، والظروف الأسرية. ولا يمكن اختيار هذه المسارات بناءً على جنسية الوالدين فقط.",
          ],
        ],
      ),
      block(
        "Build an evidence timeline",
        "أنشئ جدولاً زمنيًا للأدلة",
        [
          [
            "Collect the child's birth certificate, the parent's citizenship evidence, residence and physical-presence records, and relevant custody, marriage, divorce, or adoption documents. Preserve dates showing when each claimed requirement was met.",
            "اجمع شهادة ميلاد الطفل، وإثبات جنسية الوالد، وسجلات الإقامة والتواجد الفعلي، ووثائق الحضانة أو الزواج أو الطلاق أو التبني ذات الصلة. واحتفظ بالتواريخ التي تثبت متى تم استيفاء كل شرط مطلوب.",
          ],
        ],
      ),
      block(
        "Get the citizenship assessment right",
        "احرص على تقييم حق الجنسية بدقة",
        [
          [
            "Do not label a child a U.S. citizen based only on a parent's passport. Obtain qualified advice about the claim and the appropriate documentation route. A questionnaire may record facts but should not conclusively decide citizenship.",
            "لا تعتبر الطفل مواطنًا أمريكيًا بمجرد حيازة أحد والديه لجواز سفر أمريكي دون تحقق قانوني. احصل على استشارة مؤهلة حول شروط المطالبة ومسار التوثيق المناسب. فالاستبيان يجمع الحقائق لكنه لا يبت نهائيًا في استحقاق الجنسية.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS N-600", "نموذج N-600 لدى USCIS"), "https://www.uscis.gov/n-600"),
      src(tx("USCIS Automatic Acquisition of Citizenship", "الاكتساب التلقائي للجنسية لدى USCIS"), "https://www.uscis.gov/policy-manual/volume-12-part-h-chapter-4"),
      src(tx("USCIS N-600K", "نموذج N-600K لدى USCIS"), "https://www.uscis.gov/n-600k"),
      src(tx("Department of State Birth Abroad", "الولادة في الخارج لوزارة الخارجية"), "https://travel.state.gov/content/travel/en/international-travel/while-abroad/birth-abroad.html"),
    ],
    [
      rel("N-600", tx("Application for Certificate of Citizenship", "طلب شهادة الجنسية")),
      rel("N-600K", tx("Application for Citizenship and Issuance of Certificate Under Section 322", "طلب الجنسية وإصدار الشهادة بموجب القسم 322")),
    ],
  ),

  article(
    "naturalization-interview-and-oath",
    "citizenship",
    tx("Preparing for a Naturalization Interview and Oath", "الاستعداد لمقابلة التجنس وأداء القسم"),
    [
      block(
        "Read the appointment notice",
        "اقرأ إشعار الموعد بدقة",
        [
          [
            "The notice identifies when and where to attend and what to bring. Review the application you filed and identify any information that has changed. Bring requested documents and retain copies in your case folder.",
            "يوضح الإشعار زمان ومكان الحضور والمستندات المطلوبة. راجع الطلب الذي قدمته وحدد أي معلومات قد طرأ عليها تغيير منذ تقديمه. أحضر المستندات المطلوبة واحتفظ بنسخ منها في ملف قضيتك.",
          ],
        ],
      ),
      block(
        "Study the applicable materials",
        "ادرس المواد التعليمية المنطبقة",
        [
          [
            "Use the official USCIS citizenship resources to identify the correct English and civics requirements for your application. Test versions and certain answers can change. Do not rely exclusively on an undated list from a private website.",
            "استخدم موارد الجنسية الرسمية من USCIS لمعرفة متطلبات اللغة والتربية الوطنية المنطبقة على حالتك. فقد تتغير إصدارات الاختبار وبعض الإجابات الرسمية بمرور الوقت، فلا تعتمد على قوائم غير مؤرخة من مواقع غير رسمية.",
          ],
        ],
      ),
      block(
        "Report changes truthfully",
        "أبلغ عن أي تغييرات بصدق وشفافية",
        [
          [
            "Be prepared to discuss relevant travel, address changes, employment, marriage, and any new events asked about by USCIS. If a question has legal significance or earlier information was incorrect, consult an authorized legal professional before the interview.",
            "كن مستعدًا لمناقشة السفر، وتغييرات العنوان، والعمل، والزواج، وأي وقائع جديدة تسأل عنها USCIS. وإذا كان للسؤال أثر قانوني أو احتوى الطلب السابق على أخطاء، فاستشر محامي هجرة معتمدًا قبل موعد المقابلة.",
          ],
        ],
      ),
      block(
        "The oath is a separate milestone",
        "أداء القسم محطة ختامية مستقلة",
        [
          [
            "If USCIS schedules an oath ceremony, review its notice and any accompanying questionnaire. Preserve the resulting Certificate of Naturalization carefully. An interview recommendation or approval message alone should not be treated as a citizenship certificate.",
            "عند تحديد موعد مراسم حفل أداء القسم، راجع الإشعار والاستبيان المرفق به بعناية. واحتفظ بشهادة التجنس الصادرة في مكان آمن، إذ لا تعد توصية المقابلة أو رسالة الموافقة وحدها شهادة جنسية.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS Citizenship: What to Expect", "الجنسية: ماذا تتوقع من USCIS"), "https://www.uscis.gov/citizenship/learn-about-citizenship/citizenship-and-naturalization"),
      src(tx("USAGov Naturalization", "التجنس عبر موقع USAGov"), "https://www.usa.gov/become-us-citizen"),
      src(tx("USCIS N-400", "نموذج N-400 لدى USCIS"), "https://www.uscis.gov/n-400"),
    ],
    [
      rel("N-400", tx("Application for Naturalization", "طلب التجنس")),
    ],
  ),
];
