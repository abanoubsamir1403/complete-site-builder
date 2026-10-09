import { tx } from "@/lib/i18n";
import { article, block, rel, src } from "./helpers";
import type { KnowledgeArticle } from "./types";

export const articlesFamily: KnowledgeArticle[] = [
  article(
    "i-130-family-petitions",
    "family",
    tx("Understanding Form I-130 and Family Petitions", "فهم نموذج I-130 والتماسات الهجرة العائلية"),
    [
      block(
        "What the petition does",
        "ما يفعله الالتماس",
        [
          [
            "Form I-130 is used to establish a qualifying family relationship for immigration purposes. The petitioner's status and the relationship determine the relevant category. U.S. citizens and permanent residents have different petitioning categories.",
            "يُستخدم نموذج I-130 لإثبات وجود صلة قرابة عائلية مؤهلة لأغراض الهجرة. ويحدد الوضع القانوني لمقدم الالتماس ونوع القرابة الفئة المناسبة. فالمواطنون الأمريكيون والمقيمون الدائمون لديهم فئات التماس مختلفة.",
          ],
        ],
      ),
      block(
        "What to organize",
        "ما يجب تنظيمه من مستندات",
        [
          [
            "Prepare identity and status documents, civil records establishing the relationship, legal name-change records, and relevant prior immigration filings. A spouse petition also requires attention to prior marriages and genuine-marriage evidence. Keep each person's dates and names consistent with the original records.",
            "حضّر مستندات إثبات الشخصية والوضع القانوني، والسجلات المدنية التي تثبت صلة القرابة، وسجلات تغيير الاسم القانونية، وملفات الهجرة السابقة ذات الصلة. ويتطلب التماس الزوج أيضًا التدقيق في حالات الزواج السابقة وتقديم أدلة على حقيقة الزواج. واحرص على تطابق تواريخ وأسماء كل شخص مع سجلاته الأصلية.",
          ],
        ],
      ),
      block(
        "What approval means",
        "ماذا تعني الموافقة",
        [
          [
            "Approval of the relationship petition does not by itself grant a Green Card or a visa. A later stage may involve adjustment of status or consular processing. Visa availability and other eligibility requirements remain separate issues.",
            "لا تمنح الموافقة على التماس القرابة بطاقة خضراء أو تأشيرة بحد ذاتها. فقد تتضمن المرحلة اللاحقة تعديل الوضع في الداخل أو المعالجة القنصلية في الخارج. ويظل توفر التأشيرة وشروط الأهلية الأخرى مسائل منفصلة.",
          ],
        ],
      ),
      block(
        "Questions that need legal assessment",
        "مسائل تتطلب تقييمًا قانونيًا",
        [
          [
            "Adoption, step-relationships, age-related category changes, prior petition denials, and complicated marital histories can affect the correct route. Do not select a category solely from a simplified chart. Check the current I-130 instructions and ask an authorized legal professional when facts are uncertain.",
            "التبني، وأبناء الزوج أو الزوجة، وتغيرات الفئة المرتبطة بالعمر، ورفض الالتماسات السابقة، والتاريخ الزواجي المعقد، كلها عوامل قد تؤثر على المسار الصحيح. لا تختر فئة اعتمادًا على جدول مبسط فقط. راجع تعليمات I-130 الحالية واستشر محامي هجرة معتمدًا عند وجود أي شكوك.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS I-130", "نموذج I-130 لدى USCIS"), "https://www.uscis.gov/i-130"),
      src(tx("Department of State Immigrant Visa Process", "إجراءات تأشيرة الهجرة لوزارة الخارجية"), "https://travel.state.gov/content/travel/en/us-visas/immigrate/the-immigrant-visa-process.html"),
    ],
    [
      rel("I-130", tx("Petition for Alien Relative", "طلب قريب أجنبي")),
    ],
  ),

  article(
    "marriage-petition-evidence",
    "family",
    tx("Organizing Evidence for a Marriage-Based Petition", "تنظيم الأدلة لالتماس الهجرة القائم على الزواج"),
    [
      block(
        "Start with civil records",
        "ابدأ بالسجلات المدنية الرسمية",
        [
          [
            "A marriage certificate establishes the legal marriage. Records ending prior marriages may also be relevant. The filing instructions explain which evidence supports the petition and whether Form I-130A is required.",
            "تثبت وثيقة الزواج شرعية الزواج قانونيًا. كما قد تكون سجلات إنهاء الزيجات السابقة مطلوبة. وتوضح تعليمات التقديم الأدلة الداعمة للالتماس وما إذا كان نموذج I-130A مطلوبًا.",
          ],
        ],
      ),
      block(
        "Organize genuine-marriage evidence",
        "نظّم أدلة الزواج الفعلي والحقيقي",
        [
          [
            "Potential evidence may include shared housing, finances, insurance or beneficiary records, children, travel together, and dated photographs. Use only records that actually exist and relate to your circumstances. Couples living apart should describe their real history rather than manufacture joint documents.",
            "تشمل الأدلة المحتملة السكن المشترك، والأمور المالية المشتركة، والتأمين وسجلات المستفيدين، والأطفال المشتركين، والسفر معًا، والصور المؤرخة. استخدم فقط السجلات الحقيقية المرتبطة بظروفكم. ويجب على الأزواج المقيمين بشكل منفصل شرح واقعهم بدلاً من اصطناع وثائق مشتركة.",
          ],
        ],
      ),
      block(
        "Make the record understandable",
        "اجعل الملف واضحًا ومفهومًا",
        [
          [
            "Create a brief relationship timeline. Label each document with the people, date, and event it supports. If photographs are included, explain who appears and where and when the photograph was taken. Select representative material rather than repetitive files.",
            "أنشئ جدولاً زمنيًا موجزًا للعلاقة. وعنون كل وثيقة بالأسماء والتاريخ والحدث الذي تدعمه. وإذا أرفقت صورًا، وضح من يظهر فيها وأين ومتى التقطت. اختر وثائق دالة ونموذجية بدلاً من تكديس ملفات مكررة.",
          ],
        ],
      ),
      block(
        "Explain discrepancies accurately",
        "اشرح أي تعارض أو اختلاف بدقة",
        [
          [
            "If records contain different spellings or dates, preserve the original and obtain reliable clarification. Do not edit a civil document to match a form. Questions about whether a marriage is legally valid, unusual marriage arrangements, or material inconsistencies require legal assessment.",
            "إذا احتوت السجلات على تهجئة مختلفة للأسماء أو تواريخ متباينة، فاحتفظ بالأصل وقدّم توضيحات موثوقة. لا تعدل وثيقة مدنية لتطابق النموذج. والأسئلة حول صحة الزواج القانونية أو الترتيبات الزوجية غير المعتادة أو التناقضات الجوهرية تتطلب تقييمًا قانونيًا متخصصًا.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS I-130", "نموذج I-130 لدى USCIS"), "https://www.uscis.gov/i-130"),
      src(tx("USCIS I-130A", "نموذج I-130A لدى USCIS"), "https://www.uscis.gov/i-130a"),
    ],
    [
      rel("I-130", tx("Petition for Alien Relative", "طلب قريب أجنبي")),
      rel("I-130A", tx("Supplemental Information for Spouse Beneficiary", "معلومات إضافية للمستفيد الزوج/الزوجة")),
    ],
  ),

  article(
    "children-parents-family-relationships",
    "family",
    tx("Children, Parents and Other Family Relationships", "الأبناء والوالدون وصلات القرابة العائلية الأخرى"),
    [
      block(
        "Relationship labels are not enough",
        "مسميات القرابة وحدها لا تكفي",
        [
          [
            "Immigration rules may distinguish children from adult sons or daughters and biological relationships from step-relationships or adoption. A child's age, marital status, and family history can matter. The petitioner's citizenship or permanent residence also matters.",
            "تميز قوانين الهجرة بين الأطفال القُصّر والأبناء البالغين، وبين العلاقات البيولوجية وعلاقات أبناء الزوج/الزوجة والتبني. كما يؤثر عمر الطفل وحالته الاجتماعية وتاريخ الأسرة، بالإضافة إلى صفة مقدم الطلب كمواطن أو مقيم دائم.",
          ],
        ],
      ),
      block(
        "Build the family record",
        "ابنِ سجل العائلة التوثيقي",
        [
          [
            "Collect birth records showing parentage, marriage and divorce records where relevant, adoption decrees, custody orders, and name-change documents. Record dates of birth, marriage, adoption, entry, and changes in status. Keep a separate profile for each person.",
            "اجمع شهادات الميلاد التي توضح النسب، ووثائق الزواج والطلاق عند الاقتضاء، وأحكام التبني، وقرارات الحضانة، ومستندات تغيير الاسم. وثّق تواريخ الميلاد والزواج والتبني والدخول وتغييرات الوضع القانوني، مع الاحتفاظ بملف منفصل لكل فرد.",
          ],
        ],
      ),
      block(
        "Avoid assumptions about inclusion",
        "تجنب الافتراضات حول الشمول التلقائي",
        [
          [
            "Listing a child on a form does not necessarily make that child an applicant or derivative beneficiary. Some relatives need separate petitions or applications. A petition for one family member should not be treated as travel authorization for all family members.",
            "إدراج اسم الطفل في النموذج لا يجعله تلقائيًا متقدمًا أو مستفيدًا مشتقًا. إذ يحتاج بعض الأقارب إلى التماسات أو طلبات منفصلة. ولا يجوز التعامل مع التماس فرد من العائلة على أنه تصريح سفر لجميع أفراد الأسرة.",
          ],
        ],
      ),
      block(
        "Citizenship is a separate question",
        "الجنسية مسألة قانونية منفصلة",
        [
          [
            "Before assuming a child needs immigrant processing, determine whether there may already be a citizenship claim through a parent. That assessment depends on the applicable law and evidence. Refer citizenship, aging-out, adoption, and derivative-beneficiary questions to an authorized legal professional.",
            "قبل افتراض أن الطفل بحاجة إلى إجراءات هجرة، تحقق مما إذا كان يمتلك بالفعل حقًا في الجنسية عبر أحد والديه. ويعتمد ذلك على القوانين النافذة والأدلة. اعرض مسائل الجنسية وتجاوز السن القانونية (Aging-out) والتبني والمستفيدين المشتقين على مختص قانوني معتمد.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS I-130", "نموذج I-130 لدى USCIS"), "https://www.uscis.gov/i-130"),
      src(tx("USCIS Automatic Acquisition of Citizenship", "الاكتساب التلقائي للجنسية لدى USCIS"), "https://www.uscis.gov/policy-manual/volume-12-part-h-chapter-4"),
    ],
    [
      rel("I-130", tx("Petition for Alien Relative", "طلب قريب أجنبي")),
    ],
  ),

  article(
    "after-i-130-approval-nvc",
    "family",
    tx("After I-130 Approval: USCIS to NVC", "بعد الموافقة على I-130: الانتقال من USCIS إلى NVC"),
    [
      block(
        "Follow the transfer instructions",
        "اتبع تعليمات الإحالة",
        [
          [
            "For a case proceeding through consular processing, USCIS approval is followed by the Department of State's visa process. Retain the approval notice and watch for communication from NVC or the designated embassy or consulate.",
            "بالنسبة للملفات التي تسير عبر المعالجة القنصلية، تتبع موافقة USCIS مرحلة التأشيرة التابعة لوزارة الخارجية الأمريكية. احتفظ بإشعار الموافقة وتابع المراسلات الواردة من المركز الوطني للتأشيرات (NVC) أو السفارة أو القنصلية المعنية.",
          ],
        ],
      ),
      block(
        "Use the receiving agency's checklist",
        "استخدم قائمة المستندات الخاصة بالجهة المستقبلة",
        [
          [
            "The visa stage may require an online visa application, civil records, financial sponsorship materials, fees, and interview preparation. Documents already submitted with an I-130 may still be needed at a later stage. Embassy requirements can vary by post and case.",
            "قد تتطلب مرحلة التأشيرة تعبئة طلب تأشيرة إلكتروني، ومستندات مدنية، وأوراق الكفالة المالية، ودفع الرسوم، والتحضير للمقابلة. والمستندات المقدمة سابقًا مع I-130 قد تطلب مجددًا في مراحل لاحقة. وقد تختلف متطلبات السفارات باختلاف المقر والقضية.",
          ],
        ],
      ),
      block(
        "Keep stages separate",
        "افصل بين مراحل الإجراءات",
        [
          [
            "Do not send an embassy-requested police certificate or NVC upload to USCIS unless USCIS independently requests it. Keep USCIS, NVC, and embassy correspondence in separate folders within the same case timeline.",
            "لا ترسل صحيفة الحالة الجنائية المطلوبة من السفارة أو مستندات NVC إلى USCIS ما لم تطلبها الأخيرة صراحة. واحتفظ بمراسلات USCIS وNVC والسفارة في مجلدات منفصلة ضمن الجدول الزمني للملف.",
          ],
        ],
      ),
      block(
        "Before travel",
        "قبل السفر",
        [
          [
            "A visa must actually be issued and its conditions reviewed. Follow the official instructions about the USCIS immigrant fee if applicable. Petition approval, document qualification, or an interview appointment is not a guarantee of visa issuance or admission.",
            "يجب إصدار التأشيرة فعليًا ومراجعة شروطها قبل السفر. واتبع التعليمات الرسمية المتعلقة برسوم الهجرة لـ USCIS (USCIS Immigrant Fee) إذا كانت سارية. فالموافقة على الالتماس أو استيفاء الأوراق أو تحديد موعد مقابلة لا تضمن صدور التأشيرة أو الدخول التلقائي.",
          ],
        ],
      ),
    ],
    [
      src(tx("Department of State Immigrant Visa Process", "إجراءات تأشيرة الهجرة لوزارة الخارجية"), "https://travel.state.gov/content/travel/en/us-visas/immigrate/the-immigrant-visa-process.html"),
      src(tx("Department of State Affidavit of Support", "إقرار الدعم المالي لوزارة الخارجية"), "https://travel.state.gov/content/travel/en/us-visas/immigrate/the-immigrant-visa-process/step-1-submit-a-petition/affidavit-of-support.html"),
      src(tx("USCIS Immigrant Fee", "رسوم الهجرة لدى USCIS"), "https://www.uscis.gov/forms/filing-fees/uscis-immigrant-fee"),
    ],
  ),

  article(
    "fiance-petitions-i-129f",
    "family",
    tx("Fiancé(e) Petitions: Understanding Form I-129F", "التماسات الخطيب/الخطيبة: فهم نموذج I-129F"),
    [
      block(
        "Identify the stage",
        "حدّد المرحلة الحالية",
        [
          [
            "Form I-129F is associated with qualifying fiancé(e) and certain spouse classifications. A petition approval is not the same as an issued K visa. The relevant visa process is handled by the Department of State.",
            "يرتبط نموذج I-129F بفئات الخطيب/الخطيبة المؤهلة وبعض فئات الأزواج. والموافقة على الالتماس ليست مماثلة لإصدار تأشيرة K، إذ تتولى وزارة الخارجية الأمريكية معالجة التأشيرة اللاحقة.",
          ],
        ],
      ),
      block(
        "Organize relationship and eligibility records",
        "نظّم سجلات العلاقة والأهلية",
        [
          [
            "Prepare proof of the petitioner's citizenship, relationship history, prior marriage terminations, and evidence relevant to the applicable meeting and intention requirements. Follow the current form's questions about criminal history and other disclosures accurately.",
            "جهّز إثبات جنسية مقدم الطلب، وتاريخ العلاقة، وإنهاء الزيجات السابقة، والأدلة الخاصة بشرط اللقاء الشخصي والنية المتبادلة للزواج. وأجب عن أسئلة النموذج الحالية حول السجل الجنائي والإفصاحات الأخرى بكل دقة.",
          ],
        ],
      ),
      block(
        "Keep later steps visible",
        "ضع الخطوات اللاحقة في الحسبان",
        [
          [
            "For the fiancé(e) route, visa issuance, admission, marriage, and any later application for permanent residence are separate stages. Read the visa instructions and get advice about the rules that apply after entry.",
            "في مسار الخطوبة، يعد إصدار التأشيرة والدخول وإتمام الزواج وأي طلب لاحق للإقامة الدائمة مراحل منفصلة. اقرأ تعليمات التأشيرة واطلع على القواعد والشروط التي تسري بعد الدخول.",
          ],
        ],
      ),
      block(
        "Use legal review for exceptions",
        "استعن باستشارة قانونية في الحالات الاستثنائية",
        [
          [
            "Meeting exceptions, prior filings, criminal histories, and uncertainty about the correct relationship route require a qualified assessment. A form-preparation provider should not choose the fiancé(e) route over a spouse route or promise that one is faster.",
            "تتطلب الاستثناءات من شرط اللقاء، أو التقديمات السابقة، أو السوابق الجنائية، أو الشك في المسار المناسب، تقييمًا قانونيًا معتمدًا. ولا يجوز لمعد النماذج تفضيل مسار الخطيب على مسار الزوج أو الوعد بأن أحدهما أسرع.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS I-129F", "نموذج I-129F لدى USCIS"), "https://www.uscis.gov/i-129f"),
      src(tx("Department of State Immigrant Visa Process", "إجراءات تأشيرة الهجرة لوزارة الخارجية"), "https://travel.state.gov/content/travel/en/us-visas/immigrate/the-immigrant-visa-process.html"),
    ],
    [
      rel("I-129F", tx("Petition for Alien Fiancé(e)", "طلب لخطيب/خطيبة أجنبي/ة")),
    ],
  ),

  article(
    "financial-sponsorship-i-864",
    "family",
    tx("Financial Sponsorship and the I-864 Family", "الكفالة المالية ونماذج عائلة I-864"),
    [
      block(
        "A financial undertaking",
        "تعهد مالي ملزم قانونيًا",
        [
          [
            "An applicable Affidavit of Support is more than a letter confirming employment. It is a legally enforceable undertaking. The petitioner, a qualifying joint sponsor, and a qualifying household member can have different roles.",
            "إقرار الدعم المالي (Affidavit of Support) ليس مجرد خطاب عمل عادي، بل هو تعهد ملزم قانونيًا وقابل للتنفيذ. وتختلف أدوار مقدم الطلب والكفيل المشترك المؤهل وأفراد الأسرة المؤهلين باختلاف الحالة.",
          ],
        ],
      ),
      block(
        "Prepare the numbers and records",
        "جهّز الأرقام والمستندات",
        [
          [
            "Record household members, sponsored immigrants, income sources, tax filing facts, and any assets proposed for consideration. Organize the applicable tax transcript or return and evidence of current income. A tax return can describe an earlier year; current earnings may require separate evidence.",
            "سجّل أفراد الأسرة، والمهاجرين المكفولين، ومصادر الدخل، وبيانات الإقرارات الضريبية، وأي أصول مقدمة للاعتبار. نظّم كشف الضرائب (Tax Transcript) أو الإقرار الضريبي وأدلة الدخل الحالي. فالإقرار يوضح سنة سابقة بينما يتطلب الدخل الحالي إثباتات مستقلة.",
          ],
        ],
      ),
      block(
        "Verify the correct arrangement",
        "تحقق من النموذج والترتيب الصحيح",
        [
          [
            "The form family includes I-864, I-864A, and I-864EZ. The appropriate arrangement depends on the case. Sponsorship exemptions also exist; the method for claiming an exemption must be checked with the agency handling that stage rather than assuming a historical form remains the required method.",
            "تشمل عائلة النماذج I-864 وI-864A وI-864EZ. ويعتمد الترتيب الصحيح على ملابسات القضية. وتوجد أيضًا إعفاءات من الكفالة يجب التحقق من آلية طلبها مع الجهة المعنية بتلك المرحلة بدلاً من افتراض استمرار العمل بنماذج قديمة.",
          ],
        ],
      ),
      block(
        "Read before signing",
        "اقرأ الشروط بتمعن قبل التوقيع",
        [
          [
            "Do not assume divorce ends sponsorship obligations. Ask for legal advice if obligations, domicile, household size, income eligibility, or exemptions are uncertain. Financial sponsorship does not replace the applicant's other immigration requirements.",
            "لا تفترض أن الطلاق ينهي التزامات الكفالة المالية. اطلب استشارة قانونية إذا كانت الالتزامات أو محل الإقامة أو حجم الأسرة أو شروط الدخل أو الإعفاءات غير مؤكدة. ولا تعفي الكفالة المالية مقدم الطلب من استيفاء متطلبات الهجرة الأخرى.",
          ],
        ],
      ),
    ],
    [
      src(tx("Department of State Affidavit of Support", "إقرار الدعم المالي لوزارة الخارجية"), "https://travel.state.gov/content/travel/en/us-visas/immigrate/the-immigrant-visa-process/step-1-submit-a-petition/affidavit-of-support.html"),
      src(tx("Department of State Financial Documents", "المستندات المالية لوزارة الخارجية"), "https://travel.state.gov/content/travel/en/us-visas/immigrate/the-immigrant-visa-process/step-5-collect-financial-documents.html"),
      src(tx("USCIS I-864", "نموذج I-864 لدى USCIS"), "https://www.uscis.gov/i-864"),
      src(tx("USCIS I-864A", "نموذج I-864A لدى USCIS"), "https://www.uscis.gov/i-864a"),
      src(tx("USCIS I-864EZ", "نموذج I-864EZ لدى USCIS"), "https://www.uscis.gov/i-864ez"),
    ],
    [
      rel("I-864", tx("Affidavit of Support Under Section 213A of the INA", "إفادة دعم بموجب القسم 213A")),
      rel("I-864A", tx("Contract Between Sponsor and Household Member", "عقد بين الكفيل وأفراد الأسرة")),
      rel("I-864EZ", tx("Affidavit of Support Under Section 213A of the INA", "إفادة دعم — نموذج مبسط")),
    ],
  ),
];
