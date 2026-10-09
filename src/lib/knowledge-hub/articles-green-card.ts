import { tx } from "@/lib/i18n";
import { article, block, rel, src } from "./helpers";
import type { KnowledgeArticle } from "./types";

export const articlesGreenCard: KnowledgeArticle[] = [
  article(
    "adjustment-of-status",
    "green-card",
    tx("Understanding Adjustment of Status", "فهم إجراءات تعديل الوضع (Adjustment of Status)"),
    [
      block(
        "What adjustment means",
        "ماذا يعني تعديل الوضع",
        [
          [
            "Adjustment of status is a process for certain people in the United States to apply for permanent residence without completing the immigrant visa process abroad. Form I-485 is commonly used. Eligibility depends on the category and the person's individual immigration history.",
            "تعديل الوضع هو إجراء يتيح لأشخاص مؤهلين داخل الولايات المتحدة التقدم للحصول على الإقامة الدائمة دون الحاجة لإتمام إجراءات تأشيرة الهجرة في الخارج. ويُستخدم نموذج I-485 لهذه الغاية. وتعتمد الأهلية على الفئة والتاريخ الهجري الفردي لمقدم الطلب.",
          ],
        ],
      ),
      block(
        "A petition and an application are different",
        "الالتماس والطلب إجراءان مختلفان",
        [
          [
            "An underlying petition may establish a relationship or classification. The adjustment application requests permanent residence. The order and timing of filing depend on the applicable rules and visa availability. Concurrent filing is available only in eligible circumstances.",
            "يثبت الالتماس الأساسي صلة القرابة أو التصنيف الوظيفي، بينما يطلب طلب تعديل الوضع الإقامة الدائمة. ويعتمد ترتيب وتوقيت التقديم على القواعد المعمول بها وتوفر التأشيرة. ولا يُتاح التقديم المتزامن (Concurrent filing) إلا في الحالات المؤهلة.",
          ],
        ],
      ),
      block(
        "Prepare the evidence record",
        "جهّز ملف الأدلة والمستندات",
        [
          [
            "Organize identity, civil documents, admission records, immigration notices, and category-specific evidence. A medical examination and financial sponsorship documentation may be relevant. Check the current instructions rather than using a universal bundle of forms.",
            "نظّم وثائق الهوية، والمستندات المدنية، وسجلات الدخول، وإشعارات الهجرة، والأدلة الخاصة بالفئة. وقد يكون الفحص الطبي وأوراق الكفالة المالية مطلوبين. راجع التعليمات الرسمية الحالية بدلاً من الاعتماد على حزمة نماذج عامة ثابتة.",
          ],
        ],
      ),
      block(
        "While the case is pending",
        "أثناء انتظار البت في القضية",
        [
          [
            "Do not assume that filing I-485 authorizes work or international travel. Separate authorization or an applicable existing status may be required. Legal assessment is particularly important for entry without inspection, overstays, unauthorized employment, prior removal, fraud allegations, or criminal history.",
            "لا تفترض أن تقديم نموذج I-485 يمنح تصريحًا بالعمل أو السفر خارج البلاد تلقائيًا، بل قد يلزم الحصول على تصريح مستقل أو الاعتماد على وضع قانوني سارٍ. والتقييم القانوني ضروري جدًا في حالات الدخول غير القانوني، وتجاوز مدة الإقامة، والعمل غير المصرح به، وأوامر الترحيل السابقة، وادعاءات الاحتيال، والسجلات الجنائية.",
          ],
        ],
      ),
    ],
    [
      src(tx("USAGov Adjustment of Status", "تعديل الوضع عبر موقع USAGov"), "https://www.usa.gov/green-card"),
      src(tx("USCIS I-485", "نموذج I-485 لدى USCIS"), "https://www.uscis.gov/i-485"),
    ],
    [
      rel("I-485", tx("Register Permanent Residence or Adjust Status", "تسجيل الإقامة الدائمة أو تعديل الوضع")),
    ],
  ),

  article(
    "priority-dates-and-visa-bulletin",
    "green-card",
    tx("Priority Dates, Visa Availability and Filing Charts", "تواريخ الأولوية وتوفر التأشيرات وجداول التقديم"),
    [
      block(
        "What a priority date helps identify",
        "ما يساعد تاريخ الأولوية في تحديده",
        [
          [
            "In categories subject to annual numerical limits, a priority date helps establish a person's place in the visa queue. It is different from a predicted completion date. Category and country of chargeability may affect how the official charts apply.",
            "في الفئات الخاضعة لحدود عددية سنوية، يحدد تاريخ الأولوية دور الشخص في طابور انتظار التأشيرة. وهو يختلف عن تاريخ الانتهاء المتوقع للقضية. وتؤثر فئة الهجرة وبلد المحاسبة (Country of Chargeability) على كيفية انطباق الجداول الرسمية.",
          ],
        ],
      ),
      block(
        "Read both official sources",
        "اقرأ كلا المصدرين الرسميين معًا",
        [
          [
            "The Department of State publishes the Visa Bulletin. USCIS identifies which chart eligible adjustment applicants should use for a particular month. A date that allows filing is not necessarily the date that allows final approval.",
            "تنشر وزارة الخارجية نشرة التأشيرات (Visa Bulletin) شهريًا، وتحدد USCIS الجدول المعتمد لمقدمي طلبات تعديل الوضع في كل شهر. والتاريخ الذي يسمح بتقديم الطلب ليس بالضرورة هو التاريخ الذي يسمح بالموافقة النهائية.",
          ],
        ],
      ),
      block(
        "Record the comparison",
        "سجّل المقارنة بدقة",
        [
          [
            "Save the bulletin month, category, country, applicable chart, and the priority date shown in the case record. Review again when a new bulletin is released. Dates can advance, remain unchanged, or move backward.",
            "احفظ شهر النشرة والفئة والدولة والجدول المنطبق وتاريخ الأولوية المدون في سجلك. وراجع التحديثات فور صدور النشرة الجديدة، حيث يمكن للتواريخ أن تتقدم أو تتوقف أو تتراجع إلى الوراء (Retrogression).",
          ],
        ],
      ),
      block(
        "Do not automate legal conclusions",
        "لا تبنِ استنتاجات قانونية آلية",
        [
          [
            "A website should not return 'eligible to file' solely from a priority-date comparison. Other requirements still apply. Aging-out questions, category conversions, country-of-chargeability issues, and uncertainty about a chart require case-specific legal advice.",
            "لا ينبغي لأي موقع إصدار نتيجة 'مؤهل للتقديم' بمجرد مقارنة تاريخ الأولوية، إذ تظل الشروط الأخرى واجبة التحقق. وتتطلب مسائل تجاوز السن والتحويل بين الفئات وبلد المحاسبة والغموض في الجداول استشارة قانونية مخصصة لكل حالة.",
          ],
        ],
      ),
    ],
    [
      src(tx("Department of State Visa Bulletin", "نشرة التأشيرات لوزارة الخارجية"), "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html"),
      src(tx("USCIS Adjustment of Status Filing Charts", "جداول تقديم تعديل الوضع لدى USCIS"), "https://www.uscis.gov/green-card/green-card-processes-and-procedures/visa-availability-priority-dates/adjustment-of-status-filing-charts-from-the-visa-bulletin"),
    ],
  ),

  article(
    "renewing-replacing-green-card",
    "green-card",
    tx("Renewing or Replacing a Green Card", "تجديد أو استبدال البطاقة الخضراء (Green Card)"),
    [
      block(
        "Identify the reason",
        "حدّد سبب التقديم بدقة",
        [
          [
            "Form I-90 is used in many permanent resident card renewal or replacement situations, including loss, damage, certain corrections, and expiring cards. The correct filing reason affects the required evidence and payment.",
            "يُستخدم نموذج I-90 في العديد من حالات تجديد أو استبدال بطاقة الإقامة الدائمة، بما في ذلك الفقد والتلف وبعض التصحيحات وانتهاء الصلاحية. ويؤثر سبب التقديم على الأدلة المطلوبة والرسوم المفروضة.",
          ],
        ],
      ),
      block(
        "Conditional residence is different",
        "الإقامة المشروطة تخضع لإجراء مختلف",
        [
          [
            "Renewing a card does not remove conditions on residence. Marriage-based conditional residence and investor-based conditional residence use different removal-of-conditions processes. A conditional resident may have a card-replacement issue while still needing the appropriate separate conditions process.",
            "تجديد البطاقة لا يزيل شروط الإقامة، فالإقامة المشروطة القائمة على الزواج أو الاستثمار تتبع إجراءات مستقلة لإزالة الشروط. وقد يحتاج المقيم المشروط إلى استبدال بطاقته مع استمرار حاجته لتقديم طلب إزالة الشروط المنفصل في موعده.",
          ],
        ],
      ),
      block(
        "Prepare your records",
        "جهّز سجلاتك ومستنداتك",
        [
          [
            "Keep a copy of both sides of the card if available, identity documents, legal name-change evidence where relevant, and a description of the replacement reason. For an error, compare the card with the original application and approval documents.",
            "احتفظ بنسخة من وجهي البطاقة إن أمكن، ووثائق إثبات الهوية، ومستندات تغيير الاسم القانوني عند الاقتضاء، وبيان يوضح سبب الاستبدال. وفي حال وجود خطأ مطبعي، قارن البطاقة بالطلب الأصلي ومستندات الموافقة.",
          ],
        ],
      ),
      block(
        "If proof is urgently needed",
        "إذا كنت بحاجة إلى إثبات عاجل للإقامة",
        [
          [
            "Read the receipt notice to understand any documentary effect it describes. If additional temporary proof is needed, use official USCIS contact or appointment instructions. Do not assume every receipt provides the same extension, and do not rely on a fixed extension period copied from an old guide.",
            "اقرأ إشعار الاستلام لفهم الأثر التوثيقي وفترة التمديد المذكورة فيه. وإذا دعت الحاجة لإثبات مؤقت إضافي، اتبع إرشادات حجز المواعيد الرسمية لدى USCIS (ختم ADIT). ولا تفترض أن كل إيصال يمنح نفس التمديد أو تعتمد على فترات مقتبسة من أدلة قديمة.",
          ],
        ],
      ),
    ],
    [
      src(tx("USAGov Renew or Replace a Green Card", "تجديد أو استبدال البطاقة الخضراء عبر USAGov"), "https://www.usa.gov/green-card-replace-renew"),
      src(tx("USCIS I-90", "نموذج I-90 لدى USCIS"), "https://www.uscis.gov/i-90"),
    ],
    [
      rel("I-90", tx("Application to Replace Permanent Resident Card", "استبدال بطاقة الإقامة الدائمة")),
    ],
  ),

  article(
    "removal-of-conditions-i-751",
    "green-card",
    tx("Marriage-Based Removal of Conditions: Form I-751", "إزالة شروط الإقامة القائمة على الزواج: نموذج I-751"),
    [
      block(
        "What the petition addresses",
        "ما يعالجه هذا الالتماس",
        [
          [
            "Form I-751 concerns removal of marriage-based conditions on permanent residence. It is different from replacing a lost card. Filing requirements depend on the person's circumstances and the filing basis.",
            "يختص نموذج I-751 بإزالة الشروط المفروضة على الإقامة الدائمة القائمة على الزواج. وهو يختلف كليًا عن استبدال بطاقة مفقودة. وتعتمد شروط التقديم على ظروف الشخص وأساس التقديم.",
          ],
        ],
      ),
      block(
        "Organize evidence over time",
        "نظّم الأدلة على مدار فترة الإقامة",
        [
          [
            "Prepare a copy of the conditional resident card and documents reflecting the actual marriage and shared life. Date the evidence and organize it across the relevant period. Marriage termination, death of a spouse, abuse, or hardship may change the appropriate filing basis and evidence.",
            "جهّز نسخة من بطاقة الإقامة المشروطة والمستندات التي تعكس الزواج الفعلي والحياة المشتركة. أرّخ الأدلة ورتبها زمنيًا على مدار فترة الإقامة. علمًا بأن انتهاء الزواج أو وفاة الزوج أو التعرض للإساءة أو المشقة قد يغير أساس التقديم والأدلة المطلوبة.",
          ],
        ],
      ),
      block(
        "Treat deadlines seriously",
        "تعامل مع المواعيد النهائية بحزم وجدية",
        [
          [
            "Check the current instructions and the card's dates. Do not assume that every filing basis has the same filing window or signature requirement. A late filing, separation, pending divorce, or disagreement about joint filing requires prompt legal assessment.",
            "راجع التعليمات الحالية والتواريخ المدونة على البطاقة. ولا تفترض أن جميع أسس التقديم تشترك في نفس نافذة التقديم أو متطلبات التوقيع. ويتطلب التقديم المتأخر أو الانفصال أو الطلاق المعلق أو الخلاف حول التقديم المشترك تقييمًا قانونيًا فوريًا.",
          ],
        ],
      ),
      block(
        "Read the notice after filing",
        "اقرأ الإشعار الوارد بعد التقديم",
        [
          [
            "Retain the receipt and follow its exact instructions about proof of residence, appointments, and further evidence. A filed petition is not the same as a final approval. Keep the underlying marriage and immigration record available until the process is complete.",
            "احتفظ بالإيصال واتبع تعليماته بدقة فيما يخص إثبات استمرار الإقامة والمواعيد والأدلة الإضافية. فالالتماس المقدم ليس موافقة نهائية، ويجب الاحتفاظ بسجلات الزواج والهجرة متاحة حتى اكتمال الإجراء بالكامل.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS I-751", "نموذج I-751 لدى USCIS"), "https://www.uscis.gov/i-751"),
      src(tx("USAGov Renew or Replace a Green Card", "تجديد أو استبدال البطاقة الخضراء عبر USAGov"), "https://www.usa.gov/green-card-replace-renew"),
    ],
    [
      rel("I-751", tx("Petition to Remove Conditions on Residence", "إزالة شروط الإقامة")),
    ],
  ),

  article(
    "immigration-medical-exam-i-693",
    "green-card",
    tx("Immigration Medical Examinations and Form I-693", "الفحص الطبي للهجرة ونموذج I-693"),
    [
      block(
        "Identify the examination process",
        "حدّد مسار الفحص الطبي المطلوب",
        [
          [
            "For a USCIS filing requiring Form I-693, use the official civil-surgeon process. A consular immigrant visa medical examination uses a different designated-provider process under embassy instructions.",
            "بالنسبة لطلبات USCIS التي تتطلب نموذج I-693، يجب استخدام مسار الطبيب المدني المعتمد (Civil Surgeon). أما الفحص الطبي لتأشيرات الهجرة القنصلية فيستخدم أطباء معتمدين بموجب تعليمات السفارة (Panel Physicians).",
          ],
        ],
      ),
      block(
        "Prepare for the visit",
        "الاستعداد لموعد الفحص",
        [
          [
            "Ask the medical provider what identification, vaccination records, prior medical information, and payment arrangements to bring. The civil surgeon completes the medical findings and certifications. A clerical preparation service cannot substitute for that professional.",
            "اسأل المركز الطبي عن إثبات الشخصية وسجلات التطعيم والمعلومات الطبية السابقة وترتيبات الدفع المطلوبة. ويتولى الطبيب المدني المعتمد تعبئة النتائج والشهادات الطبية، ولا يمكن لخدمة إعداد النماذج أن تحل محل الطبيب.",
          ],
        ],
      ),
      block(
        "Preserve the document correctly",
        "احفظ المستند وفق التعليمات المقررة",
        [
          [
            "If the provider gives you a sealed envelope for submission, keep it sealed. Retain any copy provided for your own records. Match the examination to the applicant's identity and filing.",
            "إذا سلمك الطبيب مظروفًا مغلقًا ومختومًا للتقديم، فاحتفظ به مغلقًا تمامًا. واحتفظ بنسخة من التقرير لسجلاتك الشخصية، وتأكد من مطابقة بيانات الفحص مع هوية مقدم الطلب وملفه.",
          ],
        ],
      ),
      block(
        "Check current timing rules",
        "تحقق من قواعد التوقيت والصلاحية الحالية",
        [
          [
            "Medical-document validity and submission requirements have changed. Verify the current I-693 instructions and relevant USCIS alerts shortly before filing. Do not assume an older examination remains usable for a new application, or that every applicant may submit medical evidence later without affecting acceptance.",
            "تغيرت فترات صلاحية التقارير الطبية وشروط تقديمها بمرور الوقت. تأكد من تعليمات I-693 وتنبيهات USCIS قبل التقديم مباشرة. ولا تفترض أن فحصًا قديمًا يظل صالحًا لطلب جديد، أو أن التقديم اللاحق متاح لجميع الفئات دون قيود.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS I-693", "نموذج I-693 لدى USCIS"), "https://www.uscis.gov/i-693"),
      src(tx("USCIS Find a Civil Surgeon", "البحث عن طبيب معتمد لدى USCIS"), "https://my.uscis.gov/findadoctor"),
      src(tx("USCIS Newsroom", "غرفة أخبار USCIS"), "https://www.uscis.gov/newsroom"),
    ],
    [
      rel("I-693", tx("Report of Immigration Medical Examination and Vaccination Record", "الفحص الطبي الخاص بالهجرة وسجل التطعيمات")),
    ],
  ),
];
