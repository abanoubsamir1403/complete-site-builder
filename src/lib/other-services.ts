import { tx, type T } from "./i18n";

export type OtherServiceItem = {
  id: string;
  name: T;
  description?: T;
};

export type OtherServiceCategory = {
  id: string;
  num: string;
  title: T;
  description: T;
  icon: string;
  items: OtherServiceItem[];
};

export const OTHER_SERVICES_CATEGORIES: OtherServiceCategory[] = [
  {
    id: "supporting-letters-affidavits",
    num: "01",
    title: tx("Supporting Letters and Affidavits", "خطابات الدعم والإقرارات المشفوعة بقسم"),
    description: tx(
      "Formal statements, invitation letters, proof letters, and sworn affidavits customized for official, consular, and institutional uses.",
      "بيانات رسمية، خطابات دعوة، إثباتات دخل وعمل، وإقرارات قانونية مشفوعة بقسم مخصصة للاستخدامات الرسمية والقنصلية.",
    ),
    icon: "file-text",
    items: [
      {
        id: "visa-invitation-letter",
        name: tx("Visa Invitation Letter", "خطاب دعوة تأشيرة"),
        description: tx("Formal invitation letter for U.S. visitor visas (B-1/B-2) and consular travel requests.", "خطاب دعوة رسمي لزيارة الولايات المتحدة والتأشيرات السياحية."),
      },
      {
        id: "proof-of-employment-letter",
        name: tx("Proof of Employment Letter", "خطاب إثبات عمل / توظيف"),
        description: tx("Verification of active employment, role, tenure, and position on company letterhead.", "شهادة إثبات وظيفة ومسمى وظيفي ومدة الخدمة."),
      },
      {
        id: "proof-of-income-letter",
        name: tx("Proof of Income Letter", "خطاب إثبات دخل"),
        description: tx("Official verification of earnings, compensation, and regular income streams.", "إثبات رسمي لمصادر الدخل والراتب المنتظم."),
      },
      {
        id: "letter-of-recommendation",
        name: tx("Letter of Recommendation", "خطاب توصية"),
        description: tx("Professional, academic, or character endorsement letter.", "خطاب تزكية وتوصية مهنية أو أكاديمية."),
      },
      {
        id: "general-affidavit",
        name: tx("General Affidavit", "إقرار مشفوع بقسم عام (General Affidavit)"),
        description: tx("Sworn written statement of facts declared under oath.", "بيان وإقرار خطي رسمي بالوقائع تحت القسم."),
      },
      {
        id: "affidavit-of-residency",
        name: tx("Affidavit of Residency", "إقرار إقامة وسكن"),
        description: tx("Formal declaration certifying physical address and residency status.", "إقرار رسمي يؤكد محل الإقامة والعنوان الفعلي."),
      },
      {
        id: "marriage-affidavit",
        name: tx("Marriage Affidavit", "إقرار زواج مشفوع بقسم"),
        description: tx("Affidavit confirming the validity of marriage and marital relationship facts.", "إقرار رسمي لصحة الزواج والوقائع الزوجية."),
      },
      {
        id: "affidavit-of-correction",
        name: tx("Affidavit of Correction", "إقرار تصحيح بيانات"),
        description: tx("Formal document correcting typographical errors, names, or clerical details on records.", "إقرار رسمي لتصحيح أخطاء إملائية أو بيانات في سجلات سابقة."),
      },
    ],
  },
  {
    id: "career-employment",
    num: "02",
    title: tx("Career and Employment", "المسار المهني والتوظيف"),
    description: tx(
      "Professional employment agreements, workplace policies, resumes, and HR onboarding documentation.",
      "عقود عمل احترافية، سياسات عمل، سير ذاتية، ووثائق الموارد البشرية وإجراءات التوظيف.",
    ),
    icon: "briefcase",
    items: [
      {
        id: "resume",
        name: tx("Resume / CV", "سيرة ذاتية احترافية"),
        description: tx("Tailored, ATS-optimized resume emphasizing accomplishments and qualifications.", "سيرة ذاتية احترافية متوافقة مع أنظمة التوظيف العالمية."),
      },
      {
        id: "cover-letter",
        name: tx("Cover Letter", "خطاب تقديمي (Cover Letter)"),
        description: tx("Persuasive cover letter highlighting relevance to the target job position.", "خطاب تقديم للوظيفة يعكس الخبرات والدافع المهني."),
      },
      {
        id: "professional-reference-list",
        name: tx("Professional Reference List", "قائمة المراجع المهنية"),
        description: tx("Organized contact and credential summary of professional referees.", "قائمة مراجع وتوصيات مهنية منسقة لأرباب العمل."),
      },
      {
        id: "resignation-letter",
        name: tx("Resignation Letter", "خطاب استقالة"),
        description: tx("Professional notification of departure maintaining positive relations.", "إشعار استقالة رسمي باحترافية واحترام لشروط التعاقد."),
      },
      {
        id: "employment-contract",
        name: tx("Employment Contract", "عقد عمل"),
        description: tx("Comprehensive employment agreement setting compensation, role, and terms.", "عقد توظيف كامل يحدد الحقوق والواجبات والأجر والالتزامات."),
      },
      {
        id: "employee-handbook",
        name: tx("Employee Handbook", "دليل الموظف ولوائح العمل"),
        description: tx("Workplace policies, company standards, conduct rules, and employee guidelines.", "كتيب سياسات الشركة ومعايير السلوك وحقوق العاملين."),
      },
      {
        id: "employee-evaluation-form",
        name: tx("Employee Evaluation Form", "نموذج تقييم الموظف"),
        description: tx("Performance review and appraisal framework for team members.", "استمارة مراجعة وتقييم أداء الموظف وتحديد الأهداف."),
      },
      {
        id: "new-hire-checklist",
        name: tx("New Hire Checklist", "قائمة فحص وتعيين موظف جديد"),
        description: tx("Structured onboarding checklist ensuring all compliance steps are met.", "قائمة تدقيق لجميع خطوات وإجراءات استيعاب الموظف الجديد."),
      },
      {
        id: "workplace-incident-report",
        name: tx("Workplace Incident Report", "تقرير حادث أو واقعة بمكان العمل"),
        description: tx("Formal documentation of workplace safety incidents or conduct issues.", "توثيق رسمي لوقائع وحوادث بيئة العمل والتحقيق الداخلي."),
      },
      {
        id: "non-compete-agreement",
        name: tx("Non-Compete Agreement", "اتفاقية عدم منافسة"),
        description: tx("Restrictive covenant protecting business interests post-employment.", "اتفاق لحماية أسرار وأنشطة المؤسسة بعد انتهاء العمل."),
      },
    ],
  },
  {
    id: "business-planning-proposals",
    num: "03",
    title: tx("Business Planning and Proposals", "تخطيط الأعمال والمقترحات التجارية"),
    description: tx(
      "Strategic business plans, risk assessments, financial feasibility models, and winning commercial proposals.",
      "خطط عمل استراتيجية، تقييم المخاطر، دراسات جدوى وتقديرات تكاليف، ومقترحات تجارية متكاملة.",
    ),
    icon: "trending-up",
    items: [
      {
        id: "business-plan",
        name: tx("Business Plan", "خطة عمل تجارية (Business Plan)"),
        description: tx("Comprehensive operational and financial roadmap for investors and lenders.", "خطة عمل متكاملة للمستثمرين والبنوك وإدارة المشروع."),
      },
      {
        id: "one-page-business-plan",
        name: tx("One Page Business Plan", "خطة عمل من صفحة واحدة"),
        description: tx("Executive summary plan focusing on core strategy and key milestones.", "ملخص تنفيذي مركز لأهداف المشروع ونموذج العمل."),
      },
      {
        id: "swot-analysis",
        name: tx("SWOT Analysis", "تحليل سوات (SWOT Analysis)"),
        description: tx("Structured assessment of Strengths, Weaknesses, Opportunities, and Threats.", "تحليل دقيق لنقاط القوة والضعف والفرص والتهديدات."),
      },
      {
        id: "risk-management-plan",
        name: tx("Risk Management Plan", "خطة إدارة المخاطر"),
        description: tx("Framework for identifying, mitigating, and monitoring operational risks.", "خطة لتحديد وتفادي والتعامل مع المخاطر التشغيلية والمالية."),
      },
      {
        id: "startup-cost-estimate",
        name: tx("Startup Cost Estimate", "تقدير تكاليف بدء المشروع"),
        description: tx("Detailed capital expenditure and initial cash-flow requirements breakdown.", "حساب التكاليف التأسيسية ورأس المال الأولي المطلوب للانطلاق."),
      },
      {
        id: "business-proposal",
        name: tx("Business Proposal", "مقترح تجاري (Business Proposal)"),
        description: tx("Persuasive pitch outlining client solutions, deliverables, and terms.", "عرض تجاري متكامل لجذب العملاء وشرح الحلول المقدمة."),
      },
      {
        id: "bid-proposal",
        name: tx("Bid Proposal", "مقترح عطاء / مناقصة"),
        description: tx("Formal response to commercial tenders, bids, and contracts.", "عرض تسعير ومواصفات للمناقصات والمزايدات التجارية."),
      },
      {
        id: "request-for-proposals",
        name: tx("Request for Proposals (RFP)", "طلب عروض تقديمية (RFP)"),
        description: tx("Procurement document soliciting vendor quotes and project proposals.", "وثيقة رسمية لطرح وتلقي عروض الموردين والشركاء."),
      },
    ],
  },
  {
    id: "financial-records-loans",
    num: "04",
    title: tx("Financial Records, Loans and Payments", "السجلات المالية والقروض والمدفوعات"),
    description: tx(
      "Financial statements, binding debt instruments, promissory notes, and payment settlement contracts.",
      "قوائم مالية، عقود قروض ملزمة، كمبيالات وسندات لأمر، واتفاقيات تسوية وتجزئة الديون.",
    ),
    icon: "dollar-sign",
    items: [
      {
        id: "personal-financial-statement",
        name: tx("Personal Financial Statement", "بيان مالي شخصي"),
        description: tx("Overview of assets, liabilities, net worth, and regular cash flows.", "كشف تفصيلي بالأصول والالتزامات وصافي الثروة الشخصية."),
      },
      {
        id: "invoice",
        name: tx("Invoice", "فاتورة رسمية"),
        description: tx("Itemized billing statement for products delivered or services rendered.", "فاتورة مطالبة مالية واضحة ومفصلة بالبنود والضرائب."),
      },
      {
        id: "purchase-order",
        name: tx("Purchase Order", "أمر شراء (Purchase Order)"),
        description: tx("Official commercial document authorizing product/service acquisition.", "طلب توريد واعتماد شراء تجاري محدد الكميات والأسعار."),
      },
      {
        id: "amortization-schedule",
        name: tx("Amortization Schedule", "جدول سداد / إهلاك القرض"),
        description: tx("Table breaking down principal, interest, and remaining balance over time.", "جدول زمني يوضح أصل الدين والفوائد ورصيد السداد."),
      },
      {
        id: "loan-agreement",
        name: tx("Loan Agreement", "اتفاقية قرض مالي"),
        description: tx("Legally binding contract defining loan amount, interest rate, and repayment terms.", "عقد قرض ملزم يحدد المبالغ ونسب الفائدة ومواعيد السداد."),
      },
      {
        id: "payment-agreement",
        name: tx("Payment Agreement", "اتفاقية سداد وجدولة"),
        description: tx("Structured installment agreement for paying outstanding balances.", "اتفاق تسوية مالية مجدولة على دفعات محددة."),
      },
      {
        id: "promissory-note",
        name: tx("Promissory Note", "سند إذني / كمبيالة (Promissory Note)"),
        description: tx("Unconditional written promise to pay a sum of money on demand or at a specified date.", "تعهد خطي غير مشروط بالدفع بموجب القانون."),
      },
      {
        id: "debt-settlement-agreement",
        name: tx("Debt Settlement Agreement", "اتفاقية تسوية ديون"),
        description: tx("Agreement resolving outstanding debts, often with discounted lump sums.", "اتفاق نهائي لإنهاء وتسوية مطالبات ديون مالية."),
      },
    ],
  },
  {
    id: "housing-leases-tenants",
    num: "05",
    title: tx("Housing, Leases and Tenant Documents", "السكن وعقود الإيجار ومستندات المستأجرين"),
    description: tx(
      "Residential and commercial lease contracts, notices, inspections, rental applications, and eviction documents.",
      "عقود إيجار سكنية وتجارية، إخطارات الإخلاء وزيادة القيمة الإيجارية، وطلبات واستمارات المستأجرين.",
    ),
    icon: "home",
    items: [
      {
        id: "residential-rental-application",
        name: tx("Residential Rental Application", "طلب استئجار سكني"),
        description: tx("Screening document collecting prospective tenant background and finances.", "استمارة فحص وفحص بيانات المستأجر السكني."),
      },
      {
        id: "commercial-lease-application",
        name: tx("Commercial Lease Application", "طلب استئجار تجاري"),
        description: tx("Business entity vetting application for commercial leasing space.", "استمارة تقديم لاستئجار مقر أو متجر أو مكتب تجاري."),
      },
      {
        id: "residential-lease-agreement",
        name: tx("Residential Lease Agreement", "عقد إيجار سكني"),
        description: tx("Comprehensive lease contract governing residential tenancy terms.", "عقد إيجار سكني متكامل يحمي حقوق المؤجر والمستأجر."),
      },
      {
        id: "commercial-lease-agreement",
        name: tx("Commercial Lease Agreement", "عقد إيجار تجاري"),
        description: tx("Commercial property lease tailored for business operations and premises.", "عقد إيجار للمنشآت والمكاتب والمحلات التجارية."),
      },
      {
        id: "roommate-agreement",
        name: tx("Roommate Agreement", "اتفاقية سكن مشترك (Roommate Agreement)"),
        description: tx("Rules regarding shared rent, chores, utilities, and house regulations.", "اتفاقية تقاسم السكن وتوزيع المصاريف والمسؤوليات."),
      },
      {
        id: "rental-inspection-report",
        name: tx("Rental Inspection Report", "تقرير فحص ومعاينة العقار"),
        description: tx("Move-in and move-out condition checklist protecting security deposits.", "تقرير معاينة حالة الوحدة قبل وبعد الاستئجار لحفظ التأمين."),
      },
      {
        id: "maintenance-request-form",
        name: tx("Maintenance Request Form", "نموذج طلب صيانة"),
        description: tx("Formal submission log for property repairs and maintenance issues.", "استمارة طلب إصلاح وصيانة معتمدة لمالك العقار."),
      },
      {
        id: "tenant-repair-request-letter",
        name: tx("Tenant Repair Request Letter", "خطاب طلب إصلاحات من المستأجر"),
        description: tx("Written demand to landlord specifying required repairs under lease.", "خطاب رسمي للمؤجر لإجراء الإصلاحات والترميمات الضرورية."),
      },
      {
        id: "rent-receipt",
        name: tx("Rent Receipt", "إيصال استلام الإيجار"),
        description: tx("Proof of payment document confirming receipt of monthly rental funds.", "إيصال معتمد يثبت استلام القيمة الإيجارية المحددة."),
      },
      {
        id: "rent-increase-notice",
        name: tx("Rent Increase Notice", "إشعار زيادة الإيجار"),
        description: tx("Advance statutory notification regarding upcoming rental rate adjustment.", "إشعار قانوني مسبق للمستأجر برفع قيمة الإيجار."),
      },
      {
        id: "tenant-notice-intent-vacate",
        name: tx("Tenant Notice of Intent to Vacate", "إشعار نية إخلاء العقار من المستأجر"),
        description: tx("Formal notice from tenant regarding plans to move out upon lease expiration.", "إخطار كتابي من المستأجر بإنهاء الإقامة وتسليم العقار."),
      },
      {
        id: "lease-termination",
        name: tx("Lease Termination Agreement", "إنهاء عقد الإيجار بالتراضي"),
        description: tx("Mutual agreement dissolving lease obligations ahead of schedule.", "اتفاق رضائي لإنهاء عقد الإيجار وبراءة ذمة الطرفين."),
      },
      {
        id: "eviction-notice",
        name: tx("Eviction Notice", "إشعار إخلاء قانوني"),
        description: tx("Official notice requesting tenant vacate premises due to lease breach or non-payment.", "إنذار قانوني للمستأجر بإخلاء العقار عند الإخلال بالشروط."),
      },
      {
        id: "notice-to-quit",
        name: tx("Notice to Quit", "إشعار إنهاء وإخلاء (Notice to Quit)"),
        description: tx("Formal final warning demanding lease compliance or forfeiture of premises.", "إشعار رسمي نهائي لتصحيح الوضع أو تسليم العين المؤجرة."),
      },
    ],
  },
  {
    id: "family-children-separation",
    num: "06",
    title: tx("Family, Children and Separation", "الأسرة والأطفال والاتفاقيات الأسرية"),
    description: tx(
      "Marital agreements, child care powers, parental travel consents, divorce forms, and family arrangements.",
      "اتفاقيات الزواج والانفصال، توكيلات رعاية وسفر الأطفال، وأوراق الطلاق والترتيبات الأسرية.",
    ),
    icon: "users",
    items: [
      {
        id: "prenuptial-agreement",
        name: tx("Prenuptial Agreement", "اتفاقية ما قبل الزواج (Prenuptial)"),
        description: tx("Agreement executed prior to marriage clarifying property rights upon dissolution.", "عقد ينظم الحقوق المالية والملكية قبل إتمام الزواج."),
      },
      {
        id: "postnuptial-agreement",
        name: tx("Postnuptial Agreement", "اتفاقية ما بعد الزواج (Postnuptial)"),
        description: tx("Financial and property agreement entered into by spouses during marriage.", "اتفاقية لتسوية وتحديد الشؤون المالية أثناء قيام الزوجية."),
      },
      {
        id: "separation-agreement",
        name: tx("Separation Agreement", "اتفاقية انفصال"),
        description: tx("Contract settling division of assets, child custody, and support upon living apart.", "عقد يحدد تقاسم الممتلكات والنفقة وحضانة الأبناء عند الانفصال."),
      },
      {
        id: "online-divorce-papers",
        name: tx("Online Divorce Papers", "أوراق وإجراءات الطلاق"),
        description: tx("Standardized administrative packets for uncontested divorce petitions.", "نماذج ومستندات الطلاق الودي غير المتنازع عليه."),
      },
      {
        id: "child-travel-consent",
        name: tx("Child Travel Consent", "إذن سفر للطفل / قاصر"),
        description: tx("Notarized parental permission for minor traveling internationally or alone.", "موافقة رسمية موثقة من الوالدين لسفر الطفل القاصر دولياً."),
      },
      {
        id: "child-medical-consent",
        name: tx("Child Medical Consent", "إقرار موافقة على علاج طبي للأطفال"),
        description: tx("Authorization granting temporary guardians rights to approve medical treatment.", "تفويض مؤقت لمنح الرعاية الطبية والعلاجية للطفل في غياب الأهل."),
      },
      {
        id: "child-power-of-attorney",
        name: tx("Child Power of Attorney", "توكيل لرعاية الطفل"),
        description: tx("Designation of temporary parental authority to a caregiver during absence.", "توكيل مؤقت يمنح الوصي صلاحيات اتخاذ القرارات بشأن الطفل."),
      },
      {
        id: "child-care-contract",
        name: tx("Child Care Contract", "عقد رعاية أطفال"),
        description: tx("Agreement with babysitters, nannies, or daycare providers.", "عقد لتحديد التزامات ومواعيد ومسؤوليات جليسة أو دار رعاية الأطفال."),
      },
      {
        id: "birth-plan",
        name: tx("Birth Plan", "خطة ولادة ورعاية"),
        description: tx("Documented preferences for labor, delivery, newborn care, and postpartum wishes.", "خطة توضح تفضيلات الولادة والرعاية الصحية للأم والمولود."),
      },
    ],
  },
  {
    id: "healthcare-caregiving",
    num: "07",
    title: tx("Healthcare, Caregiving and Emergency Planning", "الرعاية الصحية والطوارئ والتخطيط الصحي"),
    description: tx(
      "Advance medical directives, emergency action profiles, medical authorizations, and caregiving contracts.",
      "التوكيلات الطبية، الوصية الحية، خطط الطوارئ الأسرية، وتفويضات الإفراج عن السجلات الصحية.",
    ),
    icon: "activity",
    items: [
      {
        id: "medical-power-of-attorney",
        name: tx("Medical Power of Attorney", "توكيل طبي للرعاية الصحية"),
        description: tx("Appoints a trusted healthcare agent to make decisions if you are incapacitated.", "تعيين وكيل صحي لاتخاذ القرارات الطبية عند عدم القدرة على الاختيار."),
      },
      {
        id: "living-will",
        name: tx("Living Will", "وصية طبية مسبقة (Living Will)"),
        description: tx("Expresses desires regarding life-sustaining medical treatments and interventions.", "بيان بالرغبات الطبية وتفضيلات الإنعاش في الحالات الحرجة."),
      },
      {
        id: "medical-records-release",
        name: tx("Medical Records Release Authorization", "تفويض بالإفراج عن السجلات الطبية (HIPAA)"),
        description: tx("Consent enabling healthcare providers to disclose patient records to designated parties.", "تصريح رسمي لمقدمي الرعاية الصحية لمشاركة التقارير والملف الطبي."),
      },
      {
        id: "personal-care-profile",
        name: tx("Personal Care Profile", "ملف الرعاية الشخصية"),
        description: tx("Comprehensive summary of medications, medical history, allergies, and daily routines.", "ملف شامل بالسوابق المرضية والأدوية والحساسية للاعتناء السليم."),
      },
      {
        id: "household-emergency-plan",
        name: tx("Household Emergency Plan", "خطة طوارئ منزلية"),
        description: tx("Action protocol, contact directory, and evacuation steps for families during crises.", "دليل وإجراءات الإخلاء والتواصل للأسر في حالات الطوارئ والكوارث."),
      },
      {
        id: "just-in-case-instructions",
        name: tx("Just In Case Instructions", "تعليمات وإرشادات للطوارئ والحالات الخاصة"),
        description: tx("Crucial guidance and account access roadmaps for loved ones in emergencies.", "إرشادات للأقارب والشركاء تتضمن أماكن المستندات والحسابات المهمة."),
      },
      {
        id: "end-of-life-preferences",
        name: tx("End of Life Preferences", "تفضيلات ورغبات الرعاية المتقدمة"),
        description: tx("Personal wishes for palliative care, comfort preferences, and memorial desires.", "توجيهات شخصية حول الرعاية التلطيفية والترتيبات الختامية."),
      },
      {
        id: "pet-care-agreement",
        name: tx("Pet Care Agreement", "اتفاقية رعاية الحيوانات الأليفة"),
        description: tx("Instructions and designation of caregiver responsibilities for companion animals.", "اتفاقية تحدد التزامات وتكاليف رعاية الحيوانات الأليفة في غياب صاحبها."),
      },
    ],
  },
  {
    id: "wills-trusts-poa",
    num: "08",
    title: tx("Wills, Trusts and Powers of Attorney", "الوصايا والصناديق الاستئمانية والتوكيلات"),
    description: tx(
      "Estate planning instruments, powers of attorney, living trusts, and testamentary codicils.",
      "مستندات التخطيط للتركة، توكيلات عامة وخاصة، صناديق استئمانية، وملاحق تعديل الوصايا.",
    ),
    icon: "shield",
    items: [
      {
        id: "last-will-and-testament",
        name: tx("Last Will and Testament", "الوصية الأخيرة (Last Will and Testament)"),
        description: tx("Legal document specifying asset distribution and guardian appointments upon death.", "وثيقة رسمية تحدد توزيع التركة وتعيين الأوصياء على القُصّر."),
      },
      {
        id: "codicil",
        name: tx("Codicil", "ملحق تعديل الوصية (Codicil)"),
        description: tx("Formal amendment or supplement modifying existing terms of a previously executed will.", "ملحق لتعديل أو إضافة بنود على وصية سابقة دون إلغائها."),
      },
      {
        id: "revocable-living-trust",
        name: tx("Revocable Living Trust", "صندوق استئماني قابل للإلغاء (Living Trust)"),
        description: tx("Trust arrangement allowing assets to bypass probate while retaining lifetime control.", "ترتيب قانوني لحماية الأصول ونقلها للورثة دون تعقيدات المحاكم."),
      },
      {
        id: "power-of-attorney",
        name: tx("Power of Attorney", "توكيل قانوني عام / خاص (Power of Attorney)"),
        description: tx("Authorizes an attorney-in-fact to conduct financial, legal, or property matters on your behalf.", "توكيل رسمي يخول شخصاً موثوقاً إدارة المعاملات المالية والقانونية نيابة عنك."),
      },
    ],
  },
  {
    id: "service-contractor-agreements",
    num: "09",
    title: tx("Service and Contractor Agreements", "عقود الخدمات والمقاولين المستقلين"),
    description: tx(
      "Independent contractor agreements, consulting engagements, professional services, and vendor contracts.",
      "عقود مقاولين مستقلين، اتفاقيات استشارية، خدمات صيانة وتقنية وتسويق، وتحديد نطاق العمل والأتعاب.",
    ),
    icon: "file-check",
    items: [
      {
        id: "general-service-agreement",
        name: tx("General Service Agreement", "اتفاقية خدمات عامة"),
        description: tx("Baseline contract defining work scope, payment milestones, and obligations.", "عقد عام يحدد نطاق تقديم الخدمة وجدول الدفعات والمسؤوليات."),
      },
      {
        id: "independent-contractor-agreement",
        name: tx("Independent Contractor Agreement", "عقد مقاول مستقل (1099)"),
        description: tx("Distinguishes 1099 contractor status, deliverables, IP ownership, and fee structures.", "عقد يحدد استقلالية المقاول والملكية الفكرية للأعمال المسلمة."),
      },
      {
        id: "subcontractor-agreement",
        name: tx("Subcontractor Agreement", "اتفاقية مقاول من الباطن"),
        description: tx("Agreement engaging a secondary contractor under a primary master contract.", "عقد لتكليف مقاول من الباطن بتنفيذ جزء من مشروع أكبر."),
      },
      {
        id: "consulting-agreement",
        name: tx("Consulting Agreement", "اتفاقية خدمات استشارية"),
        description: tx("Governs expert advisory services, billable rates, and strategic deliverables.", "عقد يحدد التزامات المستشار الاستراتيجي والأجر ونطاق الاستشارة."),
      },
      {
        id: "cleaning-services-agreement",
        name: tx("Cleaning Services Agreement", "اتفاقية خدمات نظافة"),
        description: tx("Service contract detailing scope, frequency, supplies, and facility access.", "عقد تقديم خدمات النظافة وجدول الزيارات وتوفير المواد."),
      },
      {
        id: "computer-services-agreement",
        name: tx("Computer Services Agreement", "اتفاقية خدمات حاسوب وتكنولوجيا"),
        description: tx("IT maintenance, hardware support, software development, or network administration agreement.", "عقد لخدمات الدعم الفني وتقنية المعلومات وإدارة الشبكات."),
      },
      {
        id: "tutoring-contract",
        name: tx("Tutoring Contract", "عقد دروس خصوصية / تعليم"),
        description: tx("Agreement setting instructional schedule, subjects, rates, and cancellation policies.", "عقد لتحديد مواعيد وساعات وأجر الدروس الخصوصية وسياسة الإلغاء."),
      },
      {
        id: "marketing-services-agreement",
        name: tx("Marketing Services Agreement", "اتفاقية خدمات تسويقية"),
        description: tx("Covers advertising campaigns, lead generation, branding, and performance metrics.", "عقد لإدارة الحملات الإعلانية والتسويق وتوليد العملاء المحتملين."),
      },
      {
        id: "influencer-agreement",
        name: tx("Influencer Agreement", "اتفاقية تسويق عبر المؤثرين"),
        description: tx("Content deliverables, posting schedules, disclosure compliance, and sponsorships.", "عقد رعاية وإعلانات عبر منصات التواصل وحقوق الملكية والتراخيص."),
      },
    ],
  },
  {
    id: "events-catering-performances",
    num: "10",
    title: tx("Events, Catering and Performances", "الفعاليات والضيافة والعروض التقديمية"),
    description: tx(
      "Event venue bookings, food and beverage catering agreements, performer bookings, and vendor contracts.",
      "عقود حجز القاعات، عقود الضيافة والتموين، اتفاقيات العارضين والفرق الفنية، والتعاقد مع موردي الفعاليات.",
    ),
    icon: "calendar",
    items: [
      {
        id: "catering-contract",
        name: tx("Catering Contract", "عقد تموين وضيافة (Catering)"),
        description: tx("Details food menus, headcounts, dietary requirements, service staff, and cleanup.", "عقد لتوريد المأكولات والضيافة وتحديد عدد الأفراد وتكاليف الخدمة."),
      },
      {
        id: "event-venue-agreement",
        name: tx("Event Venue Agreement", "اتفاقية حجز قاعة / مكان فعاليات"),
        description: tx("Facility rental terms, occupancy limits, security deposits, and event duration.", "عقد تأجير قاعة أو موقع للمؤتمرات أو الحفلات مع شروط الاستخدام والتأمين."),
      },
      {
        id: "vendor-event-agreement",
        name: tx("Vendor Event Agreement", "اتفاقية موردين للفعاليات"),
        description: tx("Governs booth spaces, equipment suppliers, decorators, and event contractors.", "عقد لموردي الأجنحة والمعدات والديكورات في المعارض والمناسبات."),
      },
      {
        id: "performance-contract",
        name: tx("Performance Contract", "عقد أداء فني / عرض حي"),
        description: tx("Agreement between organizers and performers regarding setlists, riders, and remuneration.", "عقد استقدام فنانين أو محاضرين يحدد الأجر والمتطلبات الفنية."),
      },
    ],
  },
  {
    id: "sales-property-rentals",
    num: "11",
    title: tx("Sales and Personal Property Rentals", "البيوع وتأجير المنقولات الشخصية"),
    description: tx(
      "Bills of sale, goods sales agreements, consignment arrangements, and equipment rental contracts.",
      "سندات وفواتير البيع (Bill of Sale)، عقود توريد السلع، البيع بالأمانة، وتأجير الآلات والمعدات.",
    ),
    icon: "shopping-bag",
    items: [
      {
        id: "bill-of-sale",
        name: tx("Bill of Sale", "عقد وفاتورة بيع (Bill of Sale)"),
        description: tx("Official document transferring title of personal property (vehicles, boats, machinery).", "سند رسمي لنقل ملكية المنقولات كالمعدات والسيارات والآلات."),
      },
      {
        id: "goods-sales-agreement",
        name: tx("Goods Sales Agreement", "اتفاقية بيع وتوريد بضائع"),
        description: tx("Defines product specifications, warranties, delivery conditions, and payment terms.", "عقد بيع بضائع يحدد المواصفات والضمانات وشروط الشحن والدفع."),
      },
      {
        id: "consignment-agreement",
        name: tx("Consignment Agreement", "اتفاقية بيع بالأمانة / تصريف"),
        description: tx("Arrangement allowing a third party to sell your goods in exchange for commission.", "اتفاق لعرض بضائع للبيع لدى طرف ثالث مقابل نسبة عمولة محددة."),
      },
      {
        id: "equipment-rental-agreement",
        name: tx("Equipment Rental Agreement", "عقد تأجير معدات وآلات"),
        description: tx("Governs temporary rental of industrial, electronic, or construction equipment.", "عقد تأجير معدات صناعية أو أجهزة مع شروط الصيانة والتأمين."),
      },
      {
        id: "personal-property-rental",
        name: tx("Personal Property Rental Agreement", "عقد تأجير منقولات وممتلكات شخصية"),
        description: tx("Rental contract for non-real-estate items with liability terms.", "عقد لتأجير المقتنيات والأدوات الشخصية مع حفظ حقوق المالك."),
      },
    ],
  },
  {
    id: "confidentiality-creative-policies",
    num: "12",
    title: tx("Confidentiality, Creative Permissions and Website Policies", "السرية والتراخيص وسياسات المواقع"),
    description: tx(
      "Non-disclosure agreements (NDAs), digital image licenses, model releases, and digital privacy policies.",
      "اتفاقيات عدم الإفصاح والسرية (NDA)، تراخيص استخدام الصور والتصاميم، إقرارات التصوير، وسياسات المواقع.",
    ),
    icon: "lock",
    items: [
      {
        id: "non-disclosure-agreement",
        name: tx("Non-Disclosure Agreement (NDA)", "اتفاقية عدم إفصاح / سرية المعلومات (NDA)"),
        description: tx("Protects proprietary business secrets, customer lists, and sensitive IP.", "اتفاقية قانونية لحماية الأسرار التجارية والبيانات السرية من التسريب."),
      },
      {
        id: "digital-image-license",
        name: tx("Digital Image License", "ترخيص استخدام صور ومواد رقمية"),
        description: tx("Defines authorized commercial or editorial usage rights for digital assets.", "ترخيص يحدد حقوق ومجالات استخدام الصور والتصميمات الرقمية."),
      },
      {
        id: "model-entertainment-release",
        name: tx("Model and Entertainment Release", "تنازل وتفويض تصوير ونشر (Model Release)"),
        description: tx("Grants permission to use an individual's likeness, voice, or image in media.", "موافقة خطية من الشخص أو الموديل لنشر واستخدام صوره تجارياً."),
      },
      {
        id: "website-privacy-policy",
        name: tx("Website Privacy Policy", "سياسة خصوصية للموقع الإلكتروني"),
        description: tx("Mandatory disclosure detailing how digital platforms collect, use, and store user data.", "وثيقة رسمية تلبي القوانين وتوضح كيفية معالجة وحماية بيانات الزوار."),
      },
      {
        id: "website-terms-conditions",
        name: tx("Website Terms and Conditions", "شروط وأحكام الموقع الإلكتروني"),
        description: tx("Binding agreement governing user behavior, disclaimers, and platform liability.", "عقد وشروط استخدام المنصة أو المتجر الإلكتروني وحماية حقوق المالك."),
      },
    ],
  },
  {
    id: "real-estate-transactions",
    num: "13",
    title: tx("Real Estate Ownership and Transactions", "الملكية العقارية والمعاملات العقارية"),
    description: tx(
      "Deeds of conveyance (quitclaim, warranty, TOD), real estate purchase agreements, and mortgage paperwork.",
      "سندات نقل وتنازل الملكية العقارية، عقود الشراء العقاري، والرهن العقاري والتوثيقات الرسمية.",
    ),
    icon: "map-pin",
    items: [
      {
        id: "quitclaim-deed",
        name: tx("Quitclaim Deed", "سند تنازل عن حق ملكية عقارية (Quitclaim Deed)"),
        description: tx("Transfers interest in real property without title warranties, common among family members.", "سند سريع لنقل الحصة أو التنازل عن العقار بين أفراد العائلة."),
      },
      {
        id: "warranty-deed",
        name: tx("Warranty Deed", "سند ملكية عقارية مضمون (Warranty Deed)"),
        description: tx("Guarantees clear title free from liens, offering complete buyer protection.", "سند نقل ملكية رسمي يضمن خلو العقار من أي ديون أو حقوق للغير."),
      },
      {
        id: "transfer-on-death-deed",
        name: tx("Transfer on Death Deed (TOD)", "سند انتقال ملكية عند الوفاة (TOD Deed)"),
        description: tx("Directs real estate to a designated beneficiary upon death without probate.", "سند يتيح انتقال ملكية العقار للوريث تلقائياً دون إجراءات تركة معقدة."),
      },
      {
        id: "real-estate-purchase-agreement",
        name: tx("Real Estate Purchase Agreement", "عقد شراء عقار"),
        description: tx("Binding contract governing sale price, closing date, financing contingencies, and title.", "عقد بيع وشراء عقاري ملزم يحدد الثمن ومواعيد التسليم والشروط الجزائية."),
      },
      {
        id: "mortgage-agreement",
        name: tx("Mortgage Agreement", "اتفاقية رهن عقاري"),
        description: tx("Security instrument securing a debt against real estate collateral.", "عقد رهن عقاري يوثق التزام السداد وضمانة العقار للمقرض."),
      },
    ],
  },
  {
    id: "business-ownership-governance",
    num: "14",
    title: tx("Business Ownership and Governance", "ملكية الشركات وحوكمة الأعمال"),
    description: tx(
      "LLC operating agreements, partnership contracts, shareholder pacts, and business buyout documents.",
      "اتفاقيات تشغيل الشركات (LLC)، عقود الشراكة، اتفاقيات المساهمين، وعقود شراء والاستحواذ على الأنشطة التجارية.",
    ),
    icon: "building",
    items: [
      {
        id: "llc-operating-agreement",
        name: tx("LLC Operating Agreement", "اتفاقية تشغيل شركة ذات مسؤولية محدودة (LLC)"),
        description: tx("Foundational document defining member shares, voting powers, profits, and management.", "العقد التأسيسي الداخلي الذي ينظم الحصص والقرارات والأرباح بشركات LLC."),
      },
      {
        id: "partnership-agreement",
        name: tx("Partnership Agreement", "اتفاقية شراكة تجارية"),
        description: tx("Establishes profit sharing, capital contributions, and partner responsibilities.", "عقد شراكة مفصل يحدد نسب رأس المال والأرباح والمسؤوليات وإجراءات التخارج."),
      },
      {
        id: "shareholder-agreement",
        name: tx("Shareholder Agreement", "اتفاقية المساهمين"),
        description: tx("Regulates relations among company shareholders, voting, and share transfer restrictions.", "اتفاق ينظم العلاقة بين المساهمين وحق الأولوية في شراء الأسهم."),
      },
      {
        id: "purchase-of-business-agreement",
        name: tx("Purchase of Business Agreement", "اتفاقية شراء حصة أو نشاط تجاري"),
        description: tx("Governs the acquisition of an existing enterprise, assets, goodwill, and liabilities.", "عقد بيع وشراء شركة أو نشاط تجاري قائم مع تقييم الأصول والالتزامات."),
      },
    ],
  },
  {
    id: "corporate-association-records",
    num: "15",
    title: tx("Corporate and Association Records", "سجلات الشركات والجمعيات"),
    description: tx(
      "Corporate minutes, board resolutions, consents in lieu of meetings, officer certificates, and HOA minutes.",
      "محاضر اجتماعات مجالس الإدارة والجمعيات العمومية، قرارات التعيين، شهادات الصلاحيات، ومحاضر اتحاد الملاك.",
    ),
    icon: "layers",
    items: [
      {
        id: "directors-meeting-minutes",
        name: tx("Directors Meeting Minutes", "محضر اجتماع مجلس الإدارة"),
        description: tx("Official record of discussions and votes conducted by corporate directors.", "التدوين الرسمي لمداولات وقرارات مجلس إدارة الشركة."),
      },
      {
        id: "shareholders-meeting-minutes",
        name: tx("Shareholders Meeting Minutes", "محضر اجتماع الجمعية العمومية للمساهمين"),
        description: tx("Documented proceedings of annual or special shareholder assemblies.", "محضر رسمي لاجتماعات المساهمين وانتخاب الإدارة واعتماد الميزانية."),
      },
      {
        id: "corporate-board-resolution",
        name: tx("Corporate Board Resolution", "قرار مجلس إدارة الشركة"),
        description: tx("Formal authorization by board of directors for corporate actions (banking, leasing, loans).", "قرار رسمي معتمد من المجلس للموافقة على معاملات محددة كالقروض أو الحسابات."),
      },
      {
        id: "directors-consent-without-meeting",
        name: tx("Directors Consent to Action Without Meeting", "موافقة أعضاء مجلس الإدارة دون انعقاد"),
        description: tx("Unanimous written resolution passed without holding a formal board meeting.", "قرار كتابي جماعي نافذ لأعضاء المجلس دون الحاجة لعقد جلسة رسمية."),
      },
      {
        id: "shareholders-consent-without-meeting",
        name: tx("Shareholders Consent to Action Without Meeting", "موافقة المساهمين دون انعقاد"),
        description: tx("Written consent documenting shareholder decisions bypassing formal meetings.", "اعتماد رسمي لقرارات المساهمين بالتمرير والموافقة المكتوبة."),
      },
      {
        id: "consent-act-director-officer",
        name: tx("Consent to Act as Director or Officer", "إقرار موافقة على تولي منصب مدير أو مسؤول"),
        description: tx("Formal signed statement accepting corporate directorship and fiduciary responsibilities.", "إقرار خطي بقبول المنصب والالتزام بمسؤوليات إدارة الشركة."),
      },
      {
        id: "certificate-of-incumbency",
        name: tx("Certificate of Incumbency", "شهادة مناصب وصلاحيات المسؤولين (Certificate of Incumbency)"),
        description: tx("Certifies current company officers, directors, and their legal signing authority for banks.", "شهادة رسمية تثبت أسماء المسؤولين المخولين بالتوقيع أمام البنوك والجهات."),
      },
      {
        id: "incorporators-organizational-meeting",
        name: tx("Incorporators Organizational Meeting Record", "سجل الاجتماع التأسيسي للشركاء المؤسسين"),
        description: tx("Records the initial actions establishing corporate existence and bylaws.", "سجل الاجتماع الأول للمؤسسين لاعتماد اللوائح الداخلية وبدء النشاط."),
      },
      {
        id: "directors-organizational-meeting",
        name: tx("Directors Organizational Meeting Record", "سجل الاجتماع التأسيسي لمجلس الإدارة"),
        description: tx("Minutes of the first meeting of elected corporate directors appointing officers.", "محضر أول اجتماع لمجلس الإدارة المنتخب لتعيين المسؤولين التنفيذيين."),
      },
      {
        id: "shareholders-organizational-meeting",
        name: tx("Shareholders Organizational Meeting Record", "سجل الاجتماع التأسيسي للمساهمين"),
        description: tx("Minutes confirming initial share subscriptions and director elections.", "محضر تأسيسي للمساهمين يعتمد الاكتتاب وتعيين أول مجلس إدارة."),
      },
      {
        id: "shareholder-proxy",
        name: tx("Shareholder Proxy", "توكيل تمثيل مساهم في الاجتماعات (Proxy)"),
        description: tx("Designates another individual to cast shareholder votes during meetings.", "توكيل رسمي يخول شخصاً آخر لحضور والتصويت في اجتماعات الشركة."),
      },
      {
        id: "corporate-shareholder-representative",
        name: tx("Corporate Shareholder Representative Appointment", "تعيين ممثل مساهم الشركة"),
        description: tx("Designation letter for a corporate entity's delegate at shareholder meetings.", "خطاب تفويض ممثل الشركة الاعتبارية في اجتماعات الشركات التابعة."),
      },
      {
        id: "hoa-board-meeting-minutes",
        name: tx("HOA or Condominium Board Meeting Minutes", "محضر اجتماع مجلس اتحاد الملاك / إدارة العقار"),
        description: tx("Records resolutions of community associations regarding dues, repairs, and rules.", "محضر رسمي لقرارات مجلس إدارة مجمع سكني أو اتحاد الملاك."),
      },
    ],
  },
  {
    id: "complaints-claims-settlements",
    num: "16",
    title: tx("Complaints, Claims and Settlements", "الشكاوى والمطالبات والتسويات"),
    description: tx(
      "Formal demand letters, cease and desist notices, complaints, settlement pacts, and liability releases.",
      "خطابات المطالبة الرسمية، إنذارات الكف والامتناع (Cease & Desist)، اتفاقيات التسوية، وإخلاء المسؤولية.",
    ),
    icon: "alert-circle",
    items: [
      {
        id: "complaint-letter",
        name: tx("Complaint Letter", "خطاب شكوى رسمي"),
        description: tx("Professional notification detailing grievances to businesses or agencies.", "خطاب رسمي لصياغة شكوى واضحة للمؤسسات والشركات مع طلب تصحيح الضرر."),
      },
      {
        id: "demand-letter",
        name: tx("Demand Letter", "خطاب مطالبة وسداد قانوني (Demand Letter)"),
        description: tx("Formal notice demanding payment or corrective action before pursuing legal recourse.", "إنذار ومطالبة رسمية بسداد مستحقات مالية أو تعويض قبل اللجوء للقضاء."),
      },
      {
        id: "cease-and-desist-letter",
        name: tx("Cease and Desist Letter", "إنذار كف وامتناع (Cease and Desist)"),
        description: tx("Formal demand to stop infringing actions (harassment, copyright, defamation).", "إنذار رسمي لوقف الانتهاكات والتعدي الفكري أو المضايقات فوراً."),
      },
      {
        id: "settlement-agreement",
        name: tx("Settlement Agreement", "اتفاقية تسوية وصلح"),
        description: tx("Binding contract resolving disputes and releasing parties from future claims.", "عقد تسوية شامل يُنهي النزاع ويمنع تجدد المطالبات القضائية."),
      },
      {
        id: "liability-waiver",
        name: tx("Liability Waiver / Release", "إخلاء طرف وتنازل عن المسؤولية (Liability Waiver)"),
        description: tx("Exculpatory agreement releasing one party from potential injury or damage claims.", "إقرار قانوني بالتنازل وإخلاء المسؤولية عن الأضرار المحتملة في الأنشطة."),
      },
      {
        id: "mechanics-lien",
        name: tx("Mechanic's Lien", "حق امتياز فني أو مقاول (Mechanic’s Lien)"),
        description: tx("Legal claim filed against property by contractors or suppliers for unpaid work.", "إشعار ومطالبة بحق امتياز مقاول أو فني لضمان استيفاء أجر الأعمال المنجزة."),
      },
    ],
  },
];
