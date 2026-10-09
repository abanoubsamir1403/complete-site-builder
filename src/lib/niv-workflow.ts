// U.S. Nonimmigrant Visas (NIV) workflow, questionnaires, documents and forms inventory.
// Reference: MIGRAFILE Nonimmigrant Visas Intake & Forms Inventory. Not legal advice.
import type { FormQuestion, FormRequirement } from "./form-requirements";
import { tx, type T } from "./i18n";

const q = (id: string, en: string, ar: string, type: FormQuestion["type"] = "text"): FormQuestion => ({
  id,
  q: tx(en, ar),
  type,
});

const d = (en: string, ar: string) => tx(en, ar);

export const NIV_SERVICE_SLUG = "nonimmigrant-visas";
export const DS160_CODE = "DS-160";

/**
 * 1. Nonimmigrant Visa Categories Directory
 */
export type NivCategory = {
  code: string;
  name: T;
  purpose: T;
  dependent: T;
};

export const NIV_CATEGORIES: NivCategory[] = [
  {
    code: "B-1",
    name: tx("Temporary Business Visitor", "زائر مؤقت للأعمال"),
    purpose: tx("Temporary business activities (meetings, conferences, contract negotiations)", "أنشطة الأعمال المؤقتة (اجتماعات، مؤتمرات، مفاوضات عقود)"),
    dependent: tx("Family applies separately for an appropriate visa (such as B-2)", "تتقدم الأسرة بطلبات منفصلة للحصول على تأشيرة مناسبة (مثل B-2)"),
  },
  {
    code: "B-2",
    name: tx("Temporary Visitor for Pleasure or Medical", "زائر مؤقت للسياحة أو العلاج"),
    purpose: tx("Tourism, vacations, visiting family/friends, and medical treatment", "السياحة والعطلات وزيارة العائلة أو الأصدقاء وتلقي العلاج الطبي"),
    dependent: tx("Separate individual applications for each family member", "طلبات فردية منفصلة لكل فرد من أفراد الأسرة"),
  },
  {
    code: "B-1/B-2",
    name: tx("Combined Business & Visitor Visa", "تأشيرة مدمجة للأعمال والزيارة"),
    purpose: tx("Combined business activities and pleasure/visitor travel", "السفر المدمج لأغراض الأعمال والزيارة أو السياحة"),
    dependent: tx("Separate individual applications for each family member", "طلبات فردية منفصلة لكل فرد من أفراد الأسرة"),
  },
  {
    code: "F-1",
    name: tx("Academic / Language Student", "طالب أكاديمي أو دراسة لغة"),
    purpose: tx("Academic study at an accredited university, college, seminary, or language school", "الدراسة الأكاديمية في جامعة أو كلية أو مدرسة لغات معتمدة"),
    dependent: tx("F-2 (Spouse and unmarried minor children)", "F-2 (الزوج/الزوجة والأبناء القصر غير المتزوجين)"),
  },
  {
    code: "M-1",
    name: tx("Vocational Student", "طالب تدريب مهني"),
    purpose: tx("Vocational or recognized nonacademic study programs", "الدراسة والتدريب في برامج مهنية أو غير أكاديمية معترف بها"),
    dependent: tx("M-2 (Spouse and unmarried minor children)", "M-2 (الزوج/الزوجة والأبناء القصر غير المتزوجين)"),
  },
  {
    code: "J-1",
    name: tx("Exchange Visitor", "زائر برنامج تبادل ثقافي أو تعليمي"),
    purpose: tx("Approved exchange visitor programs (professors, researchers, scholars, interns, trainees, au pairs)", "برامج التبادل المعتمدة (أساتذة، باحثون، متدربون، أطباء، جليسات أطفال)"),
    dependent: tx("J-2 (Spouse and unmarried minor children)", "J-2 (الزوج/الزوجة والأبناء القصر غير المتزوجين)"),
  },
  {
    code: "H-1B",
    name: tx("Specialty Occupation Worker", "عامل في مهنة تخصصية"),
    purpose: tx("Specialty occupation employment requiring a higher degree or specialized bachelor's equivalent", "العمل في مهن تخصصية تتطلب مؤهلًا عاليًا أو ما يعادل البكالوريوس المتخصص"),
    dependent: tx("H-4 (Spouse and unmarried children under 21)", "H-4 (الزوج/الزوجة والأبناء غير المتزوجين تحت سن 21)"),
  },
  {
    code: "H-1B1",
    name: tx("Specialty Professionals (Chile / Singapore)", "مهنيون متخصصون (تشيلي / سنغافورة)"),
    purpose: tx("Free Trade Agreement specialty occupation professionals from Chile or Singapore", "مهنيو المهن التخصصية بموجب اتفاقيات التجارة الحرة لتشيلي وسنغافورة"),
    dependent: tx("H-4 (Spouse and children)", "H-4 (الزوج/الزوجة والأبناء)"),
  },
  {
    code: "H-2A",
    name: tx("Temporary Agricultural Worker", "عامل زراعي مؤقت"),
    purpose: tx("Temporary or seasonal agricultural employment", "العمل الزراعي المؤقت أو الموسمي"),
    dependent: tx("H-4 (Spouse and unmarried children under 21)", "H-4 (الزوج/الزوجة والأبناء تحت سن 21)"),
  },
  {
    code: "H-2B",
    name: tx("Temporary Non-Agricultural Worker", "عامل غير زراعي مؤقت"),
    purpose: tx("Temporary or seasonal non-agricultural employment where U.S. workers are unavailable", "العمل غير الزراعي المؤقت أو الموسمي عند عدم توفر عمالة محلية"),
    dependent: tx("H-4 (Spouse and children)", "H-4 (الزوج/الزوجة والأبناء)"),
  },
  {
    code: "H-3",
    name: tx("Nonimmigrant Trainee", "متدرب غير مهاجر"),
    purpose: tx("Training programs not available in home country or special education exchange visitor programs", "برامج التدريب غير المتاحة ببلد المتقدم أو برامج التبادل لتعليم ذوي الاحتياجات"),
    dependent: tx("H-4 (Spouse and children)", "H-4 (الزوج/الزوجة والأبناء)"),
  },
  {
    code: "L-1A / L-1B",
    name: tx("Intracompany Transferee (Manager / Specialized Knowledge)", "منقول بين فروع الشركات (مدير / معارف متخصصة)"),
    purpose: tx("Intracompany transfer of multinational managers/executives (L-1A) or specialized knowledge staff (L-1B)", "النقل الداخلي لمديري وتنفيذيي الشركات متعددة الجنسيات (L-1A) أو ذوي المعرفة المتخصصة (L-1B)"),
    dependent: tx("L-2 (Spouse and unmarried children under 21)", "L-2 (الزوج/الزوجة والأبناء تحت سن 21)"),
  },
  {
    code: "O-1",
    name: tx("Individual with Extraordinary Ability", "أصحاب القدرات الاستثنائية"),
    purpose: tx("Extraordinary ability in sciences, arts, education, business, or athletics, or extraordinary achievement in motion pictures", "أصحاب القدرات الاستثنائية في العلوم والفنون والتعليم والأعمال والرياضة والسينما"),
    dependent: tx("O-3 (Spouse and unmarried children under 21)", "O-3 (الزوج/الزوجة والأبناء تحت سن 21)"),
  },
  {
    code: "O-2",
    name: tx("Support Personnel for O-1", "المرافقون المساعدون لحاملي O-1"),
    purpose: tx("Essential support personnel accompanying and assisting an O-1 artist or athlete", "المساعدون الأساسيون المرافقون لفناني أو رياضيي فئة O-1"),
    dependent: tx("O-3 (Spouse and unmarried children)", "O-3 (الزوج/الزوجة والأبناء)"),
  },
  {
    code: "P-1",
    name: tx("Internationally Recognized Athletes & Entertainers", "الرياضيون والفنانون المعترف بهم دوليًا"),
    purpose: tx("Internationally recognized athletes, athletic teams, and entertainment groups", "الرياضيون والفرق الرياضية والفرق الترفيهية المعترف بهم دوليًا"),
    dependent: tx("P-4 (Spouse and unmarried children under 21)", "P-4 (الزوج/الزوجة والأبناء تحت سن 21)"),
  },
  {
    code: "P-2",
    name: tx("Reciprocal Exchange Artists & Entertainers", "فنانون بموجب برامج تبادل متبادل"),
    purpose: tx("Artists and entertainers performing under a reciprocal exchange program", "الفنانون والمؤدون المشاركون ببرامج تبادل ثقافي وفني متبادلة"),
    dependent: tx("P-4 (Spouse and children)", "P-4 (الزوج/الزوجة والأبناء)"),
  },
  {
    code: "P-3",
    name: tx("Culturally Unique Artists & Entertainers", "فنانون يقدمون عروضًا ثقافية فريدة"),
    purpose: tx("Artists and entertainers performing, coaching, or teaching under culturally unique programs", "الفنانون والمؤدون لبرامج ثقافية أو تراثية فريدة ومتميزة"),
    dependent: tx("P-4 (Spouse and children)", "P-4 (الزوج/الزوجة والأبناء)"),
  },
  {
    code: "E-1",
    name: tx("Treaty Trader", "تاجر معاهدة"),
    purpose: tx("Substantial international trade between the United States and the treaty country", "التجارة الدولية الكبيرة بين الولايات المتحدة ودولة المعاهدة"),
    dependent: tx("E dependent classification (Spouse and unmarried children)", "تصنيف E التابع (الزوج/الزوجة والأبناء غير المتزوجين)"),
  },
  {
    code: "E-2",
    name: tx("Treaty Investor", "مستثمر معاهدة"),
    purpose: tx("Directing and developing a substantial commercial investment in the United States", "إدارة وتطوير استثمار تجاري حقيقي وملموس داخل الولايات المتحدة"),
    dependent: tx("E dependent classification (Spouse and unmarried children)", "تصنيف E التابع (الزوج/الزوجة والأبناء غير المتزوجين)"),
  },
  {
    code: "E-3",
    name: tx("Australian Specialty Occupation Professional", "مهني أسترالي في مهنة تخصصية"),
    purpose: tx("Australian nationals working in specialty occupations in the United States", "المواطنون الأستراليون العاملون في مهن تخصصية في الولايات المتحدة"),
    dependent: tx("E-3 dependent classification (Spouse and unmarried children)", "تصنيف E-3 التابع (الزوج/الزوجة والأبناء)"),
  },
  {
    code: "TN",
    name: tx("USMCA / NAFTA Professional (Canada / Mexico)", "مهنيو اتفاقية التجارة (كندا / المكسيك)"),
    purpose: tx("Qualified Canadian and Mexican citizens engaging in designated professional business activities", "المواطنون الكنديون والمكسيكيون المؤهلون لممارسة أنشطة مهنية محددة بالاتفاقية"),
    dependent: tx("TD (Spouse and unmarried children under 21)", "TD (الزوج/الزوجة والأبناء تحت سن 21)"),
  },
  {
    code: "I",
    name: tx("Foreign Media Representative", "ممثلو وسائل الإعلام الأجنبية"),
    purpose: tx("Bona fide representatives of foreign press, radio, film, or other information media", "ممثلو الصحافة والإذاعة والسينما ووسائل الإعلام الأجنبية المعتمدة"),
    dependent: tx("I classification for qualifying spouse and unmarried children", "تصنيف I للزوج/الزوجة والأبناء المؤهلين"),
  },
  {
    code: "R-1",
    name: tx("Temporary Religious Worker", "عامل ديني مؤقت"),
    purpose: tx("Ministers and religious workers employed by a bona fide nonprofit religious organization", "رجال الدين والعاملون الدينيون لدى منظمة دينية معتمدة غير ربحية"),
    dependent: tx("R-2 (Spouse and unmarried children under 21)", "R-2 (الزوج/الزوجة والأبناء تحت سن 21)"),
  },
  {
    code: "Q-1",
    name: tx("International Cultural Exchange Participant", "مشارك في برنامج تبادل ثقافي دولي"),
    purpose: tx("Practical training and employment sharing foreign culture and history", "التدريب العملي والعمل لمشاركة الثقافة والتاريخ والتراث الوطني"),
    dependent: tx("No dedicated Q dependent category (family applies separately)", "لا توجد فئة تابعة مخصصة لـ Q (تتقدم الأسرة بطلبات منفصلة)"),
  },
  {
    code: "C-1",
    name: tx("Transit Passenger", "عابر مؤقت (ترانزيت)"),
    purpose: tx("Immediate and continuous transit through the United States en route to another country", "العبور المباشر والمستمر عبر الولايات المتحدة في طريق السفر لدولة أخرى"),
    dependent: tx("Separate individual applications for each traveler", "طلبات فردية منفصلة لكل مسافر"),
  },
  {
    code: "C-2 / C-3",
    name: tx("UN / Foreign Government Transit", "ترانزيت الأمم المتحدة أو ممثلو الحكومات"),
    purpose: tx("Transit to UN Headquarters or foreign government officials transiting the United States", "العبور لمقر الأمم المتحدة أو عبور مسؤولي الحكومات الأجنبية"),
    dependent: tx("Depends on circumstance and official status", "حسب الظروف والصفة الرسمية"),
  },
  {
    code: "D",
    name: tx("Crewmember", "أفراد أطقم السفن والطائرات"),
    purpose: tx("Crewmembers serving aboard a sea vessel or aircraft landing in the United States", "أفراد الأطقم العاملون على متن السفن البحرية أو الطائرات القادمة للولايات المتحدة"),
    dependent: tx("Separate individual applications (such as B-2 for family)", "طلبات منفصلة (مثل تأشيرة B-2 لأسرة فرد الطاقم)"),
  },
  {
    code: "C-1/D",
    name: tx("Combined Transit / Crewmember Visa", "تأشيرة مدمجة للترانزيت وأفراد الأطقم"),
    purpose: tx("Transit through the United States to join an aircraft or vessel as a crewmember", "العبور عبر الولايات المتحدة للالتحاق بسفينة أو طائرة كفرد طاقم"),
    dependent: tx("Separate appropriate applications for accompanying family", "طلبات منفصلة مناسبة للأسرة المرافقة"),
  },
  {
    code: "A-1 / A-2",
    name: tx("Diplomats & Foreign Government Officials", "الدبلوماسيون ومسؤولو الحكومات الأجنبية"),
    purpose: tx("Ambassadors, public ministers, career diplomats, and foreign government officials on official business", "السفراء والوزراء المفوضون والدبلوماسيون وممثلو الحكومات في مهام رسمية"),
    dependent: tx("Qualifying immediate family members under A classification", "أفراد الأسرة المباشرون المؤهلون تحت تصنيف A"),
  },
  {
    code: "A-3",
    name: tx("Attendants & Employees of A Visa Holders", "المساعدون والموظفون الشخصيون لحاملي تأشيرة A"),
    purpose: tx("Attendants, servants, and personal employees of A-1 and A-2 visa holders", "المرافقون والمساعدون والموظفون الشخصيون لحاملي تأشيرات A-1 وA-2"),
    dependent: tx("Special employment contract and consular registration rules", "قواعد خاصة بعقود العمل والتسجيل القنصلي"),
  },
  {
    code: "G-1 - G-4",
    name: tx("International Organization Representatives", "ممثلو وموظفو المنظمات الدولية"),
    purpose: tx("Designated principal representatives, officers, and employees of recognized international organizations", "الممثلون المعتمدون والمسؤولون والموظفون لدى المنظمات الدولية المعترف بها"),
    dependent: tx("Qualifying immediate family members under G classification", "أفراد الأسرة المباشرون المؤهلون تحت تصنيف G"),
  },
  {
    code: "G-5",
    name: tx("Attendants & Employees of G Visa Holders", "المساعدون والموظفون الشخصيون لحاملي تأشيرة G"),
    purpose: tx("Attendants, servants, and personal employees of G-1 through G-4 visa holders", "المرافقون والمساعدون والموظفون الشخصيون لحاملي تأشيرات G-1 إلى G-4"),
    dependent: tx("Special employment contract and registration rules", "قواعد خاصة بعقود العمل والتسجيل"),
  },
  {
    code: "NATO-1 - NATO-6",
    name: tx("NATO Personnel & Representatives", "أفراد وممثلو حلف شمال الأطلسي (الناتو)"),
    purpose: tx("Military and civilian personnel serving pursuant to the North Atlantic Treaty", "العسكريون والمدنيون العاملون وفقًا لمعاهدة حلف شمال الأطلسي"),
    dependent: tx("Depends on principal classification and posting orders", "حسب التصنيف الرئيسي وأوامر الخدمة الرسمية"),
  },
  {
    code: "NATO-7",
    name: tx("Personal Employees of NATO Personnel", "الموظفون الشخصيون لأفراد الناتو"),
    purpose: tx("Attendants, servants, and personal employees of NATO-1 through NATO-6 personnel", "المرافقون والموظفون الشخصيون لأفراد NATO-1 إلى NATO-6"),
    dependent: tx("Special rules and contracts apply", "تطبق قواعد وعقود خاصة"),
  },
  {
    code: "K-1",
    name: tx("Fiancé(e) of a U.S. Citizen", "خطيب/خطيبة مواطن أمريكي"),
    purpose: tx("Travel to the United States to marry a U.S. citizen petitioner within 90 days of entry", "السفر إلى الولايات المتحدة للزواج من مواطن أمريكي خلال 90 يومًا من الدخول"),
    dependent: tx("K-2 (Eligible unmarried children of K-1 principal under 21)", "K-2 (أبناء حامل تأشيرة K-1 غير المتزوجين تحت سن 21)"),
  },
  {
    code: "K-3",
    name: tx("Spouse of a U.S. Citizen", "زوج/زوجة مواطن أمريكي (تأشيرة غير مهاجر مؤقتة)"),
    purpose: tx("Awaiting approval of underlying Form I-130 immigrant petition inside the United States", "انتظار البت في التماس الهجرة I-130 المقدم داخل الولايات المتحدة"),
    dependent: tx("K-4 (Eligible unmarried children of K-3 applicant)", "K-4 (الأبناء غير المتزوجين لمقدم طلب K-3)"),
  },
  {
    code: "T",
    name: tx("Victim of Human Trafficking", "ضحايا الاتجار بالبشر"),
    purpose: tx("Severe forms of human trafficking assisting in investigation or prosecution", "ضحايا الأشكال الخطيرة من الاتجار بالبشر المتعاونون في التحقيقات"),
    dependent: tx("Qualifying derivative T classifications (T-2, T-3, T-4, T-5, T-6)", "التصنيفات المشتقة المؤهلة (T-2، T-3، T-4، T-5، T-6)"),
  },
  {
    code: "U",
    name: tx("Victim of Qualifying Criminal Activity", "ضحايا الجرائم المؤهلة"),
    purpose: tx("Victims of designated crimes who have suffered mental or physical abuse and assist law enforcement", "ضحايا الجرائم المحددة الذين عانوا من ضرر نفسي أو جسدي ويتعاونون مع العدالة"),
    dependent: tx("Qualifying derivative U classifications (U-2, U-3, U-4, U-5)", "التصنيفات المشتقة المؤهلة (U-2، U-3، U-4، U-5)"),
  },
  {
    code: "S",
    name: tx("Witness or Informant", "الشهود والمخبرون"),
    purpose: tx("Critical witnesses or informants supplying essential information in criminal or counterterrorism matters", "الشهود الحاسمون أو المخبرون الذين يقدمون معلومات جوهرية في قضايا جنائية أو مكافحة الإرهاب"),
    dependent: tx("S-7 (Qualifying family members)", "S-7 (أفراد العائلة المؤهلون)"),
  },
  {
    code: "V",
    name: tx("Legacy Category for LPR Spouses & Children", "فئة قديمة لأزواج وأبناء حاملي الإقامة الدائمة"),
    purpose: tx("Limited legacy classification for spouses and children of lawful permanent residents with long-pending petitions", "فئة قديمة محدودة لأزواج وأبناء حاملي الجرين كارد ذوي الالتماسات القديمة"),
    dependent: tx("V-1 (Spouse), V-2 (Child), V-3 (Derivative child of V-1/V-2)", "V-1 (الزوج/الزوجة)، V-2 (الابن)، V-3 (الابن التابع لـ V-1/V-2)"),
  },
  {
    code: "N-8 / N-9",
    name: tx("Relatives of Special Immigrants", "أقارب بعض فئات المهاجرين الخاصين"),
    purpose: tx("Parents and children of certain special immigrants under international organization provisions", "والدو وأبناء بعض المهاجرين الخاصين بموجب أحكام المنظمات الدولية"),
    dependent: tx("Specialized statutory eligibility rules", "شروط أهلية قانونية خاصة"),
  },
  {
    code: "CW-1",
    name: tx("CNMI Transitional Worker", "عامل انتقالي في جزر ماريانا الشمالية"),
    purpose: tx("Transitional foreign workers admitted to the Commonwealth of the Northern Mariana Islands", "العمالة الانتقالية الأجنبية المسموح بها في كومنولث جزر ماريانا الشمالية"),
    dependent: tx("CW-2 (Spouse and minor children)", "CW-2 (الزوج/الزوجة والأبناء القصر)"),
  },
  {
    code: "E-2C",
    name: tx("CNMI Legacy Investor", "مستثمر كومنولث جزر ماريانا الشمالية (قديم)"),
    purpose: tx("Legacy long-term investor classification in the CNMI", "تصنيف المستثمرين طويل الأجل القديم في كومنولث جزر ماريانا الشمالية"),
    dependent: tx("Specialized dependent rules apply", "تطبق قواعد خاصة بالمعالين"),
  },
];

/**
 * 2. General Client Questionnaire (DS-160 Intake)
 */
export const universalIntakeQuestions: FormQuestion[] = [
  // Biographics & Identity
  q("full_legal_name", "What is your full legal name? (Surname and given names exactly as in passport)", "ما هو اسمك القانوني الكامل؟ (اللقب والاسم الأول والأوسط مطابقًا تمامًا لجواز السفر)"),
  q("native_alphabet_name", "What is your name in your native alphabet? (Native-language spelling, where applicable; write “None” if not applicable)", "ما هو اسمك بأبجديتك الأصلية؟ (التهجئة باللغة الأم إن انطبقت؛ اكتب «لا يوجد» إن لم ينطبق)"),
  q("other_names_used", "Have you used any other names? (Previous names, aliases, maiden names; explain or write “None”)", "هل سبق لك استخدام أي أسماء أخرى؟ (الأسماء السابقة، الأسماء المستعارة، اسم ما قبل الزواج؛ اكتب «لا يوجد» إن لم ينطبق)", "textarea"),
  q("date_place_of_birth", "What is your date and place of birth? (Date: MM/DD/YYYY, City, State/Province, Country)", "ما هو تاريخ ومكان ميلادك؟ (التاريخ: شهر/يوم/سنة، المدينة، المحافظة/الولاية، الدولة)"),
  q("sex_and_marital_status", "What is your sex and current marital status? (Single, Married, Divorced, Widowed, Legally Separated)", "ما هو جنسك وحالتك الاجتماعية الحالية؟ (أعزب، متزوج، مطلق، أرمل، منفصل قانونيًا)"),
  q("citizenships_held", "What citizenships do you hold or have you held? (List all current and previous nationalities and passport numbers)", "ما هي الجنسيات التي تحملها أو حملتها سابقًا؟ (اذكر كل الجنسيات الحالية والسابقة وأرقام الجوازات)", "textarea"),
  q("permanent_resident_other", "Are you a permanent resident of another country? (If yes, specify country and document number; otherwise write “No”)", "هل أنت مقيم دائم في دولة أخرى؟ (إذا كانت الإجابة نعم، اذكر الدولة ورقم وثيقة الإقامة؛ وإلا اكتب «لا»)"),
  q("national_id_number", "Do you have a national identification number? (National ID / Citizen card number, or write “None”)", "هل لديك رقم هوية وطنية؟ (رقم بطاقة الرقم القومي أو الهوية الوطنية، أو اكتب «لا يوجد»)"),
  q("us_ssn_or_itin", "Have you been issued a U.S. SSN or taxpayer identification number (ITIN)? (Provide number or write “None”)", "هل صدر لك سابقًا رقم ضمان اجتماعي أمريكي (SSN) أو رقم ضريبي (ITIN)؟ (اذكر الرقم أو اكتب «لا يوجد»)"),

  // Addresses & Contact Details
  q("current_physical_address", "Where do you currently live? (Complete physical address including street, city, state/governorate, postal code, and country)", "أين تقيم حاليًا؟ (العنوان الفعلي الكامل متضمنًا الشارع والمدينة والمحافظة والرمز البريدي والدولة)", "textarea"),
  q("mailing_address_different", "Is your mailing address different from your physical address? (Provide complete mailing address or write “Same”)", "هل يختلف عنوان مراسلاتك البريدية عن عنوان إقامتك؟ (اذكر العنوان البريدي كاملًا أو اكتب «مطابق»)", "textarea"),
  q("contact_phone_and_email", "What are your contact details? (Current primary phone, secondary phone, and primary email address)", "ما هي تفاصيل الاتصال بك؟ (رقم الهاتف الأساسي، الهاتف الإضافي، والبريد الإلكتروني الأساسي)"),
  q("previous_phones_and_emails", "What previous telephone numbers and email addresses have you used in the last 5 years? (List all or write “None”)", "ما هي أرقام الهواتف وعناوين البريد الإلكتروني السابقة التي استخدمتها خلال آخر 5 سنوات؟ (اذكرها كاملة أو اكتب «لا يوجد»)", "textarea"),
  q("social_media_platforms", "Which social media platforms and identifiers/handles have you used in the last 5 years? (List platforms and usernames; never provide passwords)", "ما هي منصات وسائل التواصل الاجتماعي والمعرفات/الحسابات التي استخدمتها خلال آخر 5 سنوات؟ (اذكر المنصات وأسماء المستخدمين؛ لا تقدم كلمات مرور أبدًا)", "textarea"),

  // Passport & Travel Details
  q("passport_details", "What passport will you use? (Type, passport number, issuing country/authority, issue date, and expiration date)", "ما هو جواز السفر الذي ستستخدمه؟ (النوع، رقم الجواز، دولة وسلطة الإصدار، تاريخ الإصدار، وتاريخ الانتهاء)"),
  q("passports_lost_or_stolen", "Have any passports ever been lost or stolen? (If yes, provide passport number, issuing country, year, and explanation)", "هل سبق أن فُقد أو سُرق منك أي جواز سفر؟ (إذا كانت الإجابة نعم، اذكر رقم الجواز ودولة الإصدار والسنة والظروف)", "textarea"),
  q("travel_purpose_and_activities", "Why are you traveling to the United States? (State your specific purpose and intended activities in detail)", "لماذا تسافر إلى الولايات المتحدة؟ (اذكر غرضك المحدد والأنشطة المنوي القيام بها بالتفصيل)", "textarea"),
  q("visa_category_applying", "Which visa category are you applying for? (e.g. B-1/B-2, F-1, J-1, H-1B, L-1, etc.)", "ما هي فئة التأشيرة التي تتقدم للحصول عليها؟ (مثل B-1/B-2، F-1، J-1، H-1B، L-1، إلخ)"),
  q("application_location", "Where will you apply? (Selected U.S. Embassy or Consulate city and country of nationality or residence)", "أين ستتقدم بالطلب؟ (السفارة أو القنصلية الأمريكية المختارة ودولة الجنسية أو الإقامة)"),
  q("intended_travel_dates", "When do you intend to travel? (Proposed arrival date and intended length of stay)", "متى تنوي السفر؟ (تاريخ الوصول المتوقع والمدة المقصودة للإقامة)"),
  q("us_stay_address", "Where will you stay in the United States? (Full street address, hotel name, or host address and contact)", "أين ستقيم في الولايات المتحدة؟ (العنوان الكامل أو اسم الفندق أو عنوان المضيف وبيانات الاتصال)", "textarea"),
  q("trip_payer", "Who is paying for the trip? (Self, employer, U.S. sponsor, relative, or another entity)", "من يتحمل نفقات الرحلة؟ (المتقدم بنفسه، جهة العمل، الكفيل في أمريكا، قريب، أو جهة أخرى)"),
  q("travel_companions", "Are you traveling with anyone? (Names, relationships, and company/group details, or write “Traveling alone”)", "هل تسافر برفقة أحد؟ (الأسماء، صلة القرابة، وتفاصيل المجموعة، أو اكتب «مسافر بمفردي»)", "textarea"),
  q("us_contact_point", "Who is your U.S. contact point? (Name of person or organization, complete address, phone number, email, and relationship)", "من هي جهة الاتصال الخاصة بك في أمريكا؟ (اسم الشخص أو المؤسسة، العنوان الكامل، رقم الهاتف، البريد الإلكتروني، وصلة القرابة)", "textarea"),

  // Previous U.S. History
  q("prev_us_visits", "Have you previously visited the United States? (Dates of arrival/departure, length of stay, and visa category for each trip)", "هل زرت الولايات المتحدة سابقًا؟ (تواريخ الوصول والمغادرة، مدة الإقامة، وفئة التأشيرة لكل زيارة)", "textarea"),
  q("prev_us_visas", "Have you previously received a U.S. visa? (Date of issuance, visa category, issuing post, and visa number)", "هل حصلت على تأشيرة أمريكية سابقًا؟ (تاريخ الإصدار، فئة التأشيرة، السفارة المُصدِرة، ورقم التأشيرة)", "textarea"),
  q("visa_lost_canceled_revoked", "Has a U.S. visa ever been lost, stolen, canceled, or revoked? (If yes, provide dates, post, and explanation; otherwise write “No”)", "هل سبق أن فُقدت أو سُرقت أو أُلغيت منك تأشيرة أمريكية؟ (إن كانت الإجابة نعم، اذكر التواريخ والسفارة والسبب؛ وإلا اكتب «لا»)", "textarea"),
  q("visa_refusal_or_admission_denied", "Have you ever been refused a U.S. visa or denied admission to the U.S.? (Date, embassy/port, refusal clause, and explanation)", "هل سبق رفض طلب تأشيرة أمريكية لك أو رُفض دخولك في المنفذ؟ (التاريخ، السفارة/المنفذ، بند الرفض، والتوضيح)", "textarea"),
  q("immigrant_petitions_filed", "Has anyone ever filed an immigrant petition on your behalf with USCIS? (Petitioner name, form type, receipt number, date, and outcome)", "هل سبق لأي شخص أو جهة تقديم التماس هجرة نيابة عنك لدى USCIS؟ (اسم الكفيل، نوع النموذج، رقم الإيصال، التاريخ، والنتيجة)", "textarea"),

  // Family Information
  q("parents_details", "What are your parents' details? (Father's and Mother's full names, dates of birth, country of birth, and U.S. status if any)", "ما هي بيانات والديك؟ (الاسم الكامل للأب والأم، تواريخ الميلاد، بلد الميلاد، ووضعهما في أمريكا إن وجد)", "textarea"),
  q("us_relatives", "Do you have any relatives currently in the United States? (Names, relationships, and immigration status in the U.S.)", "هل لديك أي أقارب موجودين حاليًا في الولايات المتحدة؟ (الأسماء، صلة القرابة، والوضع القانوني في أمريكا)", "textarea"),
  q("spouse_details", "What are your current spouse's details? (Full name, date and city/country of birth, nationality, and current address)", "ما هي بيانات الزوج/الزوجة الحالي؟ (الاسم الكامل، تاريخ ومكان الميلاد، الجنسية، والعنوان الحالي)", "textarea"),
  q("prior_marriages", "Have you been previously married? (List each prior spouse, date of marriage, and how/when the marriage terminated)", "هل سبق لك الزواج سابقًا؟ (اذكر كل زوج/زوجة سابق، تاريخ الزواج، وتاريخ وسبب انتهاء الزواج ووثائقه)", "textarea"),

  // Employment, Education & Background
  q("current_occupation", "What is your current occupation? (Employer/School name, address, job title/duties, monthly income, and start date)", "ما هي مهنتك أو عملك الحالي؟ (اسم جهة العمل أو المؤسسة التعليمية، العنوان، المسمى والمهام، الدخل الشهري، وتاريخ البدء)", "textarea"),
  q("previous_employment", "What previous employment have you had in the last 5 years? (Employers, addresses, dates employed, supervisor, and duties)", "ما هي وظائفك السابقة خلال آخر 5 سنوات؟ (جهات العمل، العناوين، تواريخ العمل، المدير المباشر، والمهام)", "textarea"),
  q("education_completed", "What education have you completed beyond elementary level? (Schools/universities, addresses, course of study, degrees, and dates)", "ما هي المراحل التعليمية التي أكملتها بعد الابتدائية؟ (المدارس والجامعات، العناوين، التخصص، الدرجة العلمية، والتواريخ)", "textarea"),
  q("languages_spoken", "What languages do you speak? (List all languages)", "ما هي اللغات التي تتحدث بها؟ (اذكر جميع اللغات)"),
  q("countries_visited_history", "Which countries have you visited in the last 5 years? (List all countries and approximate dates)", "ما هي الدول التي سافرت إليها خلال آخر 5 سنوات؟ (اذكر جميع الدول والتواريخ التقريبية)", "textarea"),
  q("organization_memberships", "Have you belonged to, contributed to, or worked for any professional, social, or charitable organizations?", "هل انتميت أو ساهمت أو عملت لدى أي منظمات أو جمعيات مهنية أو اجتماعية أو خيرية؟", "textarea"),
  q("military_service_history", "Have you served in the military? (Country, branch, rank, specialty/MOS, and dates of service; or write “No”)", "هل خدمت في الخدمة العسكرية؟ (الدولة، السلاح، الرتبة، التخصص، وتواريخ الخدمة؛ أو اكتب «لا»)", "textarea"),
  q("specialized_training", "Do you have specialized training in weapons, explosives, nuclear, biological, or chemical fields? (Explain or write “No”)", "هل لديك تدريب متخصص في الأسلحة أو المتفجرات أو المواد النووية أو البيولوجية أو الكيميائية؟ (وضّح أو اكتب «لا»)", "textarea"),
  q("preparer_identity", "Did anyone assist you in preparing this questionnaire or application? (Preparer's name, organization, relationship, and fee charged if any)", "هل ساعدك أي شخص في إعداد هذا الاستبيان أو الطلب؟ (اسم من ساعدك، المؤسسة، صلة القرابة، والرسوم إن وجدت)"),
  q("applicant_certification", "Have you personally reviewed and confirmed that every answer provided is true, correct, and complete?", "هل راجعت شخصيًا وأكدت أن كل إجابة مقدمة صحيحة ودقيقة وكاملة؟"),

  // Security & Inadmissibility Screening Questions (Yes/No)
  q("sec_communicable_diseases", "Do you have any communicable diseases of public health significance, physical or mental disorders, or history of drug abuse/addiction?", "هل تعاني من أي أمراض معدية ذات أهمية للصحة العامة، أو اضطرابات جسدية أو عقلية، أو تاريخ من تعاطي المخدرات أو الإدمان؟", "yesno"),
  q("sec_criminal_history", "Have you ever been arrested, convicted, or involved in controlled-substance violations, prostitution, commercial vice, money laundering, or human trafficking?", "هل سبق القبض عليك أو إدانتك أو تورطك في مخالفات مخدرات أو دعارة أو رذيلة تجارية أو غسيل أموال أو اتجار بالبشر؟", "yesno"),
  q("sec_security_violations", "Have you ever engaged in terrorism, espionage, sabotage, illegal export of technology, genocide, torture, violence, or human rights violations?", "هل سبق لك المشاركة في أنشطة إرهابية أو تجسس أو تخريب أو تصدير غير قانوني للتكنولوجيا أو إبادة جماعية أو تعذيب أو انتهاكات حقوق الإنسان؟", "yesno"),
  q("sec_immigration_fraud", "Have you ever obtained or attempted to obtain a U.S. visa or entry by fraud, willful misrepresentation, or other unlawful means?", "هل سبق لك الحصول على تأشيرة أمريكية أو الدخول للولايات المتحدة عن طريق الاحتيال أو التضليل المتعمد أو وسائل غير قانونية؟", "yesno"),
  q("sec_immigration_violations", "Have you ever overstayed a period of authorized stay, worked unlawfully in the U.S., or been subjected to removal, deportation, or exclusion?", "هل سبق لك تجاوز مدة الإقامة المصرح بها، أو العمل دون تصريح في أمريكا، أو صدور قرار ترحيل أو إبعاد بحقك؟", "yesno"),
  q("sec_voting_custody", "Have you ever unlawfully voted in the U.S., renounced U.S. citizenship to avoid taxation, or detained a U.S. citizen child outside the U.S. in violation of custody?", "هل سبق لك التصويت بشكل غير قانوني في أمريكا، أو التخلي عن الجنسية لتفادي الضرائب، أو احتجاز طفل أمريكي بالمخالفة لأمر حضانة؟", "yesno"),
];

/**
 * 3. General Document Checklist (Core + Conditional)
 */
export const nivCoreDocs = [
  d("Current passport biographical page (valid for at least 6 months beyond stay)", "صفحة بيانات جواز السفر الساري (صالح لمدة 6 أشهر على الأقل بعد مدة الإقامة)"),
  d("Relevant previous passport pages and previous U.S. visas", "صفحات الجوازات السابقة ذات الصلة والتأشيرات الأمريكية السابقة"),
  d("Visa photograph meeting current Department of State 2x2 inch digital specifications", "صورة شخصية للتأشيرة مطابقة لمواصفات وزارة الخارجية الأمريكية (2×2 بوصة رقمية)"),
  d("DS-160 online confirmation page with barcode (after submission)", "صفحة تأكيد تقديم استمارة DS-160 الإلكترونية المحتوية على الباركود (بعد التقديم)"),
  d("Consular appointment confirmation letter (after scheduling)", "خطاب تأكيد موعد المقابلة القنصلية (بعد الحجز)"),
  d("Visa application fee (MRV) payment receipt", "إيصال سداد رسوم طلب التأشيرة القنصلية (MRV)"),
  d("Residence permit or proof of lawful status (if applying outside country of nationality)", "تصريح الإقامة أو إثبات الوضع القانوني (في حال التقديم من دولة غير دولة الجنسية)"),
  d("Previous visa refusal notices or Form 221(g) correspondence (if applicable)", "إشعارات رفض التأشيرة السابقة أو مراسلات نموذج 221(g) (إن وجدت)"),
  d("USCIS petition approval notice Form I-797 / receipt details (for petition-based categories)", "إشعار الموافقة على التماس USCIS نموذج I-797 أو بيانات الإيصال (للفئات القائمة على التماس)"),
  d("Embassy-specific instructions and consular checklist for the selected post", "التعليمات الخاصة بالسفارة وقائمة المتطلبات الإضافية للقنصلية المختارة"),
];

export const nivConditionalDocs = [
  d("Employment verification letter, approved leave letter, and recent pay stubs", "خطاب إثبات العمل والمسمى الوظيفي والموافقة على الإجازة وكشوف المرتبات الحديثة"),
  d("Commercial register, tax card, and company ownership documentation (if self-employed)", "السجل التجاري والبطاقة الضريبية ومستندات ملكية الشركة (لأصحاب الأعمال الحرة)"),
  d("Bank account statements (recent 3–6 months) or documented funding evidence", "كشوف الحسابات البنكية (لآخر 3-6 أشهر) أو أدلة التمويل المالي الموثقة"),
  d("Sponsor letter and sponsor financial/tax documentation (if trip is sponsored)", "خطاب الكفيل المالي ومستندات كفيله المالية والضريبية (في حال تكفل طرف آخر بالرحلة)"),
  d("Proposed travel itinerary, hotel accommodation reservations, and flight plans", "خط سير الرحلة المقترح وحجوزات الإقامة الفندقية المبدئية وتفاصيل رحلات الطيران"),
  d("Official business correspondence, conference registration, or invitation letter", "المراسلات التجارية الرسمية أو إثبات التسجيل في المؤتمرات أو خطاب الدعوة"),
  d("University/School enrollment certificate or official academic transcripts", "شهادة القيد الجامعي أو المدرسي أو السجلات الأكاديمية والشهادات الدراسية"),
  d("Civil relationship documents (bilingual marriage and birth certificates for dependents)", "المستندات المدنية لإثبات صلة القرابة (وثائق الزواج وشهادات الميلاد ثنائية اللغة)"),
  d("Property titles, lease agreements, and home-country family/social ties evidence", "عقود ملكية العقارات أو الإيجار وأدلة الروابط الأسرية والاجتماعية في بلد الإقامة"),
  d("Certified court records, police records, or immigration disposition documents (if applicable)", "أحكام المحاكم المعتمدة أو السجلات الجنائية أو قرارات الهجرة (إن انطبقت)"),
  d("Certified English translations for any supporting document not in English", "ترجمات معتمدة إلى اللغة الإنجليزية لأي مستند غير صادر باللغة الإنجليزية"),
];

export const allNivDocs = [...nivCoreDocs, ...nivConditionalDocs];

/**
 * 4. Category-Specific Intake Details
 */
export type CategoryIntake = {
  category: string;
  title: T;
  questions: FormQuestion[];
  docs: T[];
};

export const CATEGORY_INTAKES: CategoryIntake[] = [
  {
    category: "B-2 Tourism & Family Visit",
    title: tx("B-2 Tourism & Family Visits", "B-2 السياحة وزيارة العائلة"),
    questions: [
      q("b2_purpose", "What is the specific purpose of this trip? Who will you visit, and for how long?", "ما هو الغرض المحدد من هذه الزيارة؟ من ستزور وما هي مدة الإقامة؟", "textarea"),
      q("b2_funds", "Who will pay for your expenses during the trip? How will living and travel costs be funded?", "من سيتحمل نفقاتك أثناء الرحلة؟ وكيف سيتم تمويل تكاليف المعيشة والتنقل؟"),
      q("b2_ties", "What obligations, family ties, or employment commitments require you to return to your home country?", "ما هي الالتزامات أو الروابط الأسرية أو الوظيفية التي توجب عودتك إلى بلدك؟", "textarea"),
    ],
    docs: [
      d("Proposed itinerary and planned visit information", "خط سير الرحلة المقترح وتفاصيل الزيارة المخططة"),
      d("Financial funding evidence (bank statements, payslips)", "إثبات التمويل المالي (كشوف حساب بنكية، كشوف مرتب)"),
      d("Employer leave letter and home-country ties records", "خطاب إجازة من جهة العمل ومستندات الروابط بالوطن"),
    ],
  },
  {
    category: "B-1 Business",
    title: tx("B-1 Temporary Business Activities", "B-1 أنشطة الأعمال المؤقتة"),
    questions: [
      q("b1_activities", "Which meetings, conferences, contract negotiations, or business consultations will you attend?", "ما هي الاجتماعات أو المؤتمرات أو مفاوضات العقود أو الاستشارات التي ستحضرها؟", "textarea"),
      q("b1_employer", "Who is your foreign employer? What is your job title and responsibilities?", "من هي جهة عملك في الخارج؟ وما هو مسماك الوظيفي ومسؤولياتك؟"),
      q("b1_compensation", "Will you perform hands-on productive work or receive payment from any U.S. source? (Explain; must be paid by home employer)", "هل ستقوم بعمل إنتاجي مباشر أو تتلقى أي أجر من مصدر أمريكي؟ (وضّح؛ يجب أن يكون الأجر من جهة العمل بالخارج)", "textarea"),
    ],
    docs: [
      d("Business invitation letter and official correspondence", "خطاب دعوة تجاري ومراسلات رسمية من الشريك الأمريكي"),
      d("Conference registration confirmation and agenda", "تأكيد التسجيل في المؤتمر وجدول الأعمال"),
      d("Employer dispatch letter confirming foreign payroll and return", "خطاب إيفاد من جهة العمل يؤكد استمرار الراتب بالخارج والعودة"),
      d("Company commercial registration and financial records", "السجل التجاري للشركة والمستندات المالية"),
    ],
  },
  {
    category: "B-2 Medical Treatment",
    title: tx("B-2 Medical Treatment", "B-2 تلقي العلاج الطبي"),
    questions: [
      q("med_diagnosis", "What is your medical diagnosis? Why is treatment needed in the United States?", "ما هو تشخيص حالتك الطبية؟ ولماذا يلزم تلقي العلاج في الولايات المتحدة؟", "textarea"),
      q("med_provider", "Which U.S. medical provider or hospital will treat you? Who is the treating physician?", "ما هي المنشأة الطبية أو المستشفى الأمريكي المعالج؟ ومن هو الطبيب المعالج؟"),
      q("med_cost_duration", "What is the estimated duration and cost of treatment, and who is paying?", "ما هي المدة والتكلفة التقديرية للعلاج، ومن سيتكفل بدفعها بالكامل؟", "textarea"),
    ],
    docs: [
      d("Local treating physician's detailed medical report and diagnosis", "تقرير طبي مفصل وتشخيص من الطبيب المعالج المحلي"),
      d("U.S. medical facility acceptance letter and treatment plan", "خطاب قبول من المنشأة الطبية الأمريكية وخطة العلاج المقررة"),
      d("U.S. provider itemized cost estimate for treatment and hospitalization", "تقدير تكلفة تفصيلي من المنشأة الأمريكية للعلاج والإقامة بالمستشفى"),
      d("Proof of sufficient funds or sponsorship covering all medical and living costs", "إثبات توفر أموال كافية أو كفالة تغطي كامل تكاليف العلاج والمعيشة"),
    ],
  },
  {
    category: "F-1 / M-1 Students",
    title: tx("F-1 & M-1 Academic and Vocational Students", "F-1 وM-1 الطلاب الأكاديميون والمهنيون"),
    questions: [
      q("student_school", "Which school or program will you attend? What is the start date and SEVIS ID?", "ما هي المدرسة أو الجامعة أو البرنامج الذي ستلتحق به؟ ما تاريخ البدء ورقم SEVIS؟"),
      q("student_academic_bg", "What is your academic background and how does this program fit your future career plans?", "ما هي خلفيتك الأكاديمية وكيف يتناسب هذا البرنامج مع خططك المهنية المستقبلية؟", "textarea"),
      q("student_funding", "Who is paying for your tuition, fees, and living expenses? (Provide sponsor name and relationship)", "من يتكفل بمصاريف الدراسة والرسوم وتكاليف المعيشة؟ (اذكر اسم الكفيل وصلة القرابة)"),
    ],
    docs: [
      d("Signed and endorsed Form I-20 issued by the SEVP-certified institution", "نموذج I-20 موقع ومعتمد وصادر من مؤسسة تعليمية معتمدة من SEVP"),
      d("Form I-901 SEVIS fee payment receipt", "إيصال سداد رسوم SEVIS نموذج I-901"),
      d("Official academic records, diplomas, transcripts, and standardized test scores", "الشهادات الدراسية الرسمية والسجلات الأكاديمية ونتائج الاختبارات المعيارية"),
      d("Affidavit of financial support and liquid funds evidence for at least the first academic year", "إقرار الدعم المالي وإثبات توفر أموال سائلة تغطي العام الدراسي الأول على الأقل"),
    ],
  },
  {
    category: "F-2 / M-2 Student Dependents",
    title: tx("F-2 & M-2 Student Dependents", "F-2 وM-2 مرافقو الطلاب"),
    questions: [
      q("f2_relationship", "What is your relationship to the F-1/M-1 student principal? (Spouse or minor child)", "ما صلة قرابتك بالطالب الرئيسي الحامل لتأشيرة F-1/M-1؟ (زوج/زوجة أو طفل قاصر)"),
      q("f2_principal_status", "What is the principal student's SEVIS ID, school name, and current visa/status status?", "ما هو رقم SEVIS للطالب الرئيسي، اسم جامعته، ووضع تأشيرته الحالي؟"),
    ],
    docs: [
      d("Dependent Form I-20 issued specifically in the applicant's name", "نموذج I-20 الخاص بالمرافق والصادر باسم المتقدم"),
      d("Bilingual civil marriage certificate or child birth certificate", "وثيقة الزواج أو شهادة ميلاد الطفل ثنائية اللغة"),
      d("Copies of the principal student's valid passport, F-1/M-1 visa, and I-94", "نسخ من جواز سفر الطالب الرئيسي وتأشيرته السارية F-1/M-1 وسجل I-94"),
    ],
  },
  {
    category: "J-1 Exchange Visitors",
    title: tx("J-1 Exchange Visitors", "J-1 زوار برامج التبادل"),
    questions: [
      q("j1_program", "What is your designated exchange program and sponsor name? What is your SEVIS ID?", "ما هو برنامج التبادل المعتمد واسم الجهة الراعية؟ وما هو رقم SEVIS الخاص بك؟"),
      q("j1_placement", "What are the details of your placement, research, study, or training subject field?", "ما هي تفاصيل موقع البرنامج أو مجال البحث أو الدراسة أو التدريب؟", "textarea"),
      q("j1_prior_j", "Have you previously participated in a J-1 program in the U.S.? (Give dates, category, and whether subject to 212(e))", "هل شاركت سابقًا في أي برنامج J-1 بأمريكا؟ (اذكر التواريخ والفئة وما إذا كنت خاضعًا لشرط 212(e))", "textarea"),
    ],
    docs: [
      d("Form DS-2019 Certificate of Eligibility issued by designated sponsor", "نموذج DS-2019 شهادة الأهلية الصادرة من الجهة الراعية المعتمدة"),
      d("Form I-901 SEVIS fee payment receipt", "إيصال سداد رسوم SEVIS نموذج I-901"),
      d("Form DS-7002 Training/Internship Placement Plan (for applicable intern/trainee categories)", "نموذج DS-7002 خطة التدريب (لفئات المتدربين والتدريب العملي)"),
      d("Sponsor or institutional funding award letters and financial records", "خطابات المنحة والتمويل من الجهة الراعية أو المؤسسة والسجلات المالية"),
    ],
  },
  {
    category: "J-2 Exchange Dependents",
    title: tx("J-2 Exchange Visitor Dependents", "J-2 مرافقو زوار التبادل"),
    questions: [
      q("j2_relationship", "What is your relationship to the J-1 principal? (Spouse or child under 21)", "ما صلة قرابتك بحامل تأشيرة J-1 الرئيسي؟ (زوج/زوجة أو ابن تحت سن 21)"),
      q("j2_principal_info", "What is the principal exchange visitor's program, sponsor, and current status?", "ما هو برنامج زائر التبادل الرئيسي والجهة الراعية ووضعه الحالي؟"),
    ],
    docs: [
      d("Individual Form DS-2019 issued for the J-2 dependent", "نموذج DS-2019 الفردي الصادر للمرافق J-2"),
      d("Marriage certificate or birth certificate proving relationship", "وثيقة الزواج أو شهادة الميلاد لإثبات صلة القرابة"),
      d("Copies of the principal J-1 exchange visitor's visa, passport, and DS-2019", "نسخ من تأشيرة وجواز سفر ونموذج DS-2019 للزائر الرئيسي J-1"),
    ],
  },
  {
    category: "H Categories Temporary Workers",
    title: tx("H Categories (H-1B, H-1B1, H-2A, H-2B, H-3)", "فئات H للعمالة المؤقتة (H-1B، H-1B1، H-2A، H-2B، H-3)"),
    questions: [
      q("h_employer", "Who is the petitioning U.S. employer and what is the job position/duties?", "من هو صاحب العمل الأمريكي مقدم الالتماس وما هو المسمى الوظيفي والمهام؟", "textarea"),
      q("h_petition_number", "What is the USCIS receipt/petition number from Form I-797? What is the worksite location?", "ما هو رقم إيصال أو التماس USCIS من نموذج I-797؟ وما هو موقع العمل؟"),
      q("h_qualifications", "What are your degrees, licenses, or specialized qualifications for this role?", "ما هي مؤهلاتك العلمية أو تراخيصك المهنية أو خبراتك التخصصية لهذا المنصب؟", "textarea"),
    ],
    docs: [
      d("Form I-797 Notice of Approval for Form I-129 petition", "إشعار الموافقة I-797 على التماس نموذج I-129"),
      d("Certified Labor Condition Application (LCA) or temporary labor certification", "طلب شروط العمل المعتمد (LCA) أو شهادة العمل المؤقتة"),
      d("Employer support letter detailing duties, salary, and employment terms", "خطاب دعم من جهة العمل يوضح المهام والراتب وشروط التوظيف"),
      d("Academic diplomas, transcripts, evaluation of foreign degrees, and professional licenses", "الشهادات الأكاديمية والسجلات ومعادلة المؤهلات والتراخيص المهنية"),
    ],
  },
  {
    category: "L-1 Intracompany Transferees",
    title: tx("L-1A / L-1B Intracompany Transferees", "L-1A وL-1B المنقولون بين فروع الشركات"),
    questions: [
      q("l_companies", "What are the names and ownership relationship between the foreign and U.S. companies?", "ما هي أسماء الشركتين الأجنبية والأمريكية وما هي طبيعة علاقة الملكية بينهما؟", "textarea"),
      q("l_abroad_employment", "What were your dates of employment abroad (must have at least 1 continuous year in past 3)? What was your role?", "ما هي تواريخ عملك بالخارج (يجب عام متصل على الأقل خلال آخر 3 سنوات)؟ وما كان دورك؟", "textarea"),
      q("l_blanket", "Is this filing under an individual I-129 petition or an approved Blanket L petition?", "هل هذا الطلب بموجب التماس فردي I-129 أم التماس شامل معتمد (Blanket L)؟"),
    ],
    docs: [
      d("Form I-797 approval notice (or endorsed Form I-129S for Blanket L)", "إشعار الموافقة I-797 (أو نموذج I-129S المعتمد لحالات Blanket L)"),
      d("Detailed employer letter describing executive/managerial duties or specialized knowledge", "خطاب مفصل من الشركة يوضح المهام التنفيذية/الإدارية أو المعارف التخصصية"),
      d("Evidence of qualifying employment abroad for at least 1 continuous year (payroll, tax records)", "إثبات العمل بالخارج لمدة عام متصل على الأقل (كشوف رواتب، سجلات ضريبية)"),
      d("Corporate relationship and ownership records between the foreign and U.S. entities", "مستندات العلاقة المؤسسية والملكية بين الكيانين الأجنبي والأمريكي"),
    ],
  },
  {
    category: "O / P Extraordinary Ability & Performers",
    title: tx("O & P Extraordinary Ability, Athletes & Entertainers", "O وP ذوو القدرات الاستثنائية والرياضيون والفنانون"),
    questions: [
      q("op_field", "What is your specific field of extraordinary achievement or performance?", "ما هو مجالك المحدد في الإنجاز الاستثنائي أو الأداء الفني أو الرياضي؟"),
      q("op_itinerary", "What are the scheduled events, competitions, performances, or itinerary dates in the U.S.?", "ما هي الفعاليات أو المسابقات أو العروض المجدولة وتواريخها في أمريكا؟", "textarea"),
      q("op_agent", "Who is the U.S. employer, agent, or sponsor petitioning for you?", "من هو صاحب العمل أو الوكيل أو الراعي الأمريكي مقدم الالتماس؟"),
    ],
    docs: [
      d("Form I-797 approval notice for the underlying O or P petition", "إشعار الموافقة I-797 على التماس O أو P الأساسي"),
      d("Contracts, event itinerary, and agreements with presenters or venues", "العقود وجدول الفعاليات والاتفاقيات مع المنظمين أو المسارح"),
      d("Evidence of extraordinary achievements, awards, major media reviews, and peer recognition", "أدلة الإنجازات الاستثنائية والجوائز والتغطيات الإعلامية الكبرى وإشادات النظراء"),
      d("Written peer advisory opinion from an appropriate labor organization or peer group", "الرأي الاستشاري المكتوب من المنظمة النقابية أو الهيئة المهنية المختصة"),
    ],
  },
  {
    category: "E-1 / E-2 Treaty Traders & Investors",
    title: tx("E-1 Treaty Traders & E-2 Treaty Investors", "E-1 تجار المعاهدة وE-2 مستثمرو المعاهدة"),
    questions: [
      q("e_nationality", "What is your treaty nationality? Does the commercial enterprise possess the qualifying treaty ownership?", "ما هي جنسية المعاهدة التي تحملها؟ وهل تمتلك المؤسسة نسبة الملكية المؤهلة للمعاهدة؟"),
      q("e_trade_investment", "For E-1: What is the nature and volume of trade between the U.S. and treaty country? For E-2: What is the amount and lawful source of funds invested?", "لـ E-1: ما طبيعة وحجم التجارة بين أمريكا ودولة المعاهدة؟ ولـ E-2: ما مقدار ومصدر الأموال المستثمرة؟", "textarea"),
      q("e_role", "Are you applying as the principal trader/investor or as an executive, manager, or essential employee?", "هل تتقدم بصفتك التاجر/المستثمر الرئيسي أم كمدير تنفيذي أو موظف ذي مهارات جوهرية؟"),
    ],
    docs: [
      d("Form DS-156E Nonimmigrant Treaty Trader/Investor Application (where applicable)", "نموذج DS-156E لطلب تاجر أو مستثمر المعاهدة (حيثما انطبق)"),
      d("Proof of qualifying treaty nationality and corporate ownership structure (at least 50%)", "إثبات جنسية المعاهدة وهيكل ملكية الشركة (50% على الأقل لمواطني المعاهدة)"),
      d("Comprehensive business plan with 5-year financial projections and employee hiring table", "خطة عمل شاملة متضمنة التوقعات المالية لخمس سنوات وجدول التوظيف"),
      d("Proof of lawful source of funds and escrow/bank transfer documentation (for E-2)", "إثبات المصدر المشروع للأموال ومستندات التحويلات البنكية وحسابات الضمان (لـ E-2)"),
      d("Proof of continuous substantial international trade transactions (for E-1)", "إثبات المعاملات التجارية الدولية الكبيرة والمستمرة (لـ E-1)"),
    ],
  },
  {
    category: "E-3 Australian Specialty Professionals",
    title: tx("E-3 Australian Specialty Occupation Professionals", "E-3 المهنيون الأستراليون في مهن تخصصية"),
    questions: [
      q("e3_nationality", "Confirm Australian citizenship (passport and nationality documentation)", "تأكيد الجنسية الأسترالية (بيانات جواز السفر ووثائق الجنسية)"),
      q("e3_job", "What is the specialty occupation position, employer, and certified LCA salary?", "ما هي وظيفة المهنة التخصصية وصاحب العمل وراتب LCA المعتمد؟"),
      q("e3_licensure", "Do you hold the required degree and any required U.S. state licenses for this profession?", "هل تحمل الدرجة العلمية المطلوبة والتراخيص المهنية للولاية إن لزمت؟"),
    ],
    docs: [
      d("Certified Department of Labor Form ETA-9035 / ETA-9035E Labor Condition Application", "طلب شروط العمل المعتمد من وزارة العمل الأمريكية ETA-9035"),
      d("Formal job offer letter from the U.S. employer specifying salary and duties", "خطاب عرض عمل رسمي من صاحب العمل الأمريكي يحدد الراتب والمهام"),
      d("Australian passport and proof of citizenship", "جواز السفر الأسترالي وإثبات الجنسية"),
      d("Degree certificates, transcripts, and credentials evaluation equivalent to a U.S. bachelor's", "شهادات المؤهل والسجلات وتقييم معادلة الدرجة بما يعادل البكالوريوس الأمريكي"),
    ],
  },
  {
    category: "TN / TD USMCA Professionals",
    title: tx("TN & TD Canadian and Mexican Professionals", "TN وTD المهنيون الكنديون والمكسيكيون"),
    questions: [
      q("tn_profession", "Which designated USMCA profession does your position qualify under?", "تحت أي مهنة من المهن المحددة باتفاقية التجارة يندرج منصبك؟"),
      q("tn_employer", "Who is the U.S. employer and what are the detailed job duties and remuneration?", "من هو صاحب العمل الأمريكي وما هي مهام العمل التفصيلية والأجر؟", "textarea"),
    ],
    docs: [
      d("Detailed employer support letter confirming designated profession and duties", "خطاب دعم مفصل من صاحب العمل يؤكد المهنة المحددة والمهام"),
      d("Proof of Canadian or Mexican citizenship (valid passport)", "إثبات الجنسية الكندية أو المكسيكية (جواز سفر ساري)"),
      d("Required educational credentials, degrees, and professional licenses under Chapter 16", "المؤهلات التعليمية والدرجات والتراخيص المهنية المطلوبة بالفصل 16"),
      d("Civil relationship documents for accompanying TD dependents (marriage/birth certificates)", "مستندات صلة القرابة لمرافقي TD التابعين (وثائق الزواج وشهادات الميلاد)"),
    ],
  },
  {
    category: "I Foreign Media Representatives",
    title: tx("I Foreign Media Representatives", "I ممثلو وسائل الإعلام الأجنبية"),
    questions: [
      q("media_employer", "What is the foreign media organization employing you? Where is its headquarters?", "ما هي المؤسسة الإعلامية الأجنبية التي تعمل لديها؟ وأين يقع مقرها الرئيسي؟"),
      q("media_assignment", "What is the nature and duration of your journalistic assignment in the U.S.?", "ما هي طبيعة ومهمة العمل الصحفي والإعلامي في أمريكا ومدتها؟", "textarea"),
    ],
    docs: [
      d("Employer letter confirming full-time journalistic assignment and salary", "خطاب من المؤسسة الإعلامية يؤكد التفرغ للعمل الصحفي والراتب"),
      d("Press credentials issued by a professional journalistic association or government body", "بطاقة أو تصريح الصحافة الصادر من جمعية صحفية مهنية أو جهة رسمية"),
      d("Employment contract and samples of published journalistic work", "عقد العمل ونماذج من الأعمال الصحفية المنشورة للمتقدم"),
    ],
  },
  {
    category: "R-1 / R-2 Religious Workers",
    title: tx("R-1 & R-2 Religious Workers", "R-1 وR-2 العاملون الدينيون"),
    questions: [
      q("r_org", "What is the qualifying bona fide nonprofit religious organization in the U.S.?", "ما هي المنظمة الدينية المعتمدة غير الربحية في الولايات المتحدة؟"),
      q("r_membership", "Have you been a member of the religious denomination for at least the past 2 continuous years?", "هل كنت عضوًا في هذه الطائفة الدينية لمدة عامين متصلين على الأقل قبل التقديم؟", "yesno"),
      q("r_role", "What is your religious position (minister, religious vocation, or religious occupation)?", "ما هي صفتك الدينية (رجل دين، دعوة دينية، أو مهنة دينية تخصصية)؟"),
    ],
    docs: [
      d("Form I-797 approval notice for Form I-129 with Religious Worker Supplement", "إشعار الموافقة I-797 على نموذج I-129 مع الملحق الديني"),
      d("IRS 501(c)(3) tax-exempt determination letter for the petitioning religious organization", "خطاب إعفاء ضريبي 501(c)(3) من IRS للمنظمة الدينية صاحبة الالتماس"),
      d("Proof of continuous denomination membership for at least 2 preceding years", "إثبات عضوية متصلة في الطائفة الدينية لمدة سنتين على الأقل"),
      d("Certificate of ordination or formal religious credentials", "شهادة الرسامة الدينية أو المؤهلات والاعتمادات الدينية الرسمية"),
    ],
  },
  {
    category: "Q-1 Cultural Exchange",
    title: tx("Q-1 International Cultural Exchange", "Q-1 التبادل الثقافي الدولي"),
    questions: [
      q("q_program", "What is the approved cultural exchange employer and program?", "ما هو صاحب العمل وبرنامج التبادل الثقافي المعتمد؟"),
      q("q_duties", "How does the program provide practical training while sharing your history and culture?", "كيف يوفر البرنامج تدريبًا عمليًا مع مشاركة تاريخ وثقافة بلدك؟", "textarea"),
    ],
    docs: [
      d("Form I-797 approval notice for the Q-1 petition", "إشعار الموافقة I-797 على التماس Q-1"),
      d("Program curriculum and cultural presentation details", "المنهج التدريبي للبرنامج وتفاصيل الأنشطة الثقافية"),
      d("Employment contract and wage terms", "عقد العمل وشروط الأجور"),
    ],
  },
  {
    category: "C / D / C-1/D Transit & Crewmembers",
    title: tx("C, D & C-1/D Transit and Crewmembers", "C وD وC-1/D الترانزيت وأفراد الأطقم"),
    questions: [
      q("crew_vessel", "What is the name of the sea vessel or airline company? What is your crew position?", "ما اسم السفينة البحرية أو شركة الطيران؟ وما هي وظيفتك في الطاقم؟"),
      q("crew_joining", "Where and on what date will you join the vessel/aircraft?", "أين وفي أي تاريخ ستلتحق بالسفينة أو الطائرة؟"),
      q("crew_route", "What is your onward travel route and final international destination?", "ما هو خط سير رحلتك والوجهة الدولية النهائية بعد العبور؟", "textarea"),
    ],
    docs: [
      d("Crew contract or formal letter of employment from the shipping company or airline", "عقد عمل الطاقم أو خطاب توظيف رسمي من الشركة الملاحية أو الجوية"),
      d("Continuous Discharge Certificate (CDC), Seaman's Book, or Airline ID", "دفتر البحار (Seaman's Book) أو شهادة الخدمة المستمرة أو هوية الطيران"),
      d("Letter from vessel agent in the U.S. confirming port of entry and docking schedule", "خطاب وكيل السفينة في أمريكا يؤكد ميناء الدخول وجدول الرسو"),
      d("Onward travel ticket or confirmed travel itinerary to final destination outside the U.S.", "تذكرة السفر للوجهة التالية أو خط سير مؤكد لدولة أخرى خارج أمريكا"),
    ],
  },
  {
    category: "A / G / NATO Diplomats & Officials",
    title: tx("A, G & NATO Diplomats, Government Officials & Employees", "A وG وNATO الدبلوماسيون ومسؤولو الحكومات والمنظمات"),
    questions: [
      q("dip_position", "What is your official position and sending government or international organization?", "ما هو منصبك الرسمي والدولة أو المنظمة الدولية الموفِدة؟"),
      q("dip_mission", "What is the official purpose, nature, and expected duration of your mission or posting?", "ما هو الغرض الرسمي وطبيعة ومدة مهمتك أو عملك الدبلوماسي؟", "textarea"),
      q("dip_family", "List all accompanying immediate family members or personal attendants (A-3/G-5)", "اذكر جميع أفراد الأسرة المباشرين المرافقين أو المساعدين الشخصيين (A-3/G-5)", "textarea"),
    ],
    docs: [
      d("Official Diplomatic Note (Note Verbale) from foreign ministry or international organization", "مذكرة دبلوماسية رسمية (Note Verbale) من وزارة الخارجية أو المنظمة"),
      d("Official assignment orders or official government travel authorization", "أوامر التكليف الرسمية أو تفويض السفر الحكومي الرسمي"),
      d("Diplomatic or official passport biographical pages for all travelers", "صفحات بيانات الجوازات الدبلوماسية أو الرسمية لجميع المسافرين"),
      d("Standard employment contract (mandatory for A-3 and G-5 domestic workers)", "عقد العمل المعتمد (إلزامي للعمالة المنزلية والمساعدين A-3 وG-5)"),
    ],
  },
  {
    category: "K-1 / K-2 Fiancé(e) of U.S. Citizen",
    title: tx("K-1 & K-2 Fiancé(e) of U.S. Citizen and Minor Children", "K-1 وK-2 خطيب/خطيبة المواطن الأمريكي والأبناء"),
    questions: [
      q("k1_petitioner", "Who is the U.S. citizen petitioner? What is the approved Form I-129F receipt number?", "من هو المواطن الأمريكي مقدم الالتماس؟ وما هو رقم إيصال نموذج I-129F المعتمد؟"),
      q("k1_meeting", "Did you meet in person within the 2 years prior to filing? When and where?", "هل التقيتما شخصيًا وجهًا لوجه خلال العامين السابقين لتقديم الالتماس؟ متى وأين؟", "textarea"),
      q("k1_marriage_intent", "Do you both intend to marry within 90 days of admission to the U.S.?", "هل تنويان الزواج قانونيًا داخل الولايات المتحدة خلال 90 يومًا من الدخول؟", "yesno"),
      q("k1_children", "Are there any unmarried children under 21 applying as K-2 derivatives?", "هل هناك أي أبناء غير متزوجين تحت سن 21 يتقدمون كمرافقين K-2؟", "textarea"),
    ],
    docs: [
      d("USCIS Form I-797 approval notice for Form I-129F", "إشعار الموافقة I-797 من USCIS على التماس I-129F"),
      d("Civil birth certificates, single status certificates, and prior divorce/death certificates", "شهادات الميلاد وشهادة إثبات القيد الفردي/العزوبية وشهادات الطلاق/الوفاة السابقة"),
      d("Police certificates from all countries of residence (age 16+) per consular instructions", "صحف الحالة الجنائية (الفيش) من كل دولة إقامة (فوق 16 سنة) حسب تعليمات القنصلية"),
      d("Medical examination conducted by an embassy-approved panel physician", "تقرير الكشف الطبي المعتمد من الطبيب المعتمد لدى السفارة"),
      d("Form I-134 Declaration of Financial Support with petitioner's tax returns and W-2s", "نموذج I-134 إقرار الدعم المالي مرفقًا به إقرارات الكفيل الضريبية ونماذج W-2"),
      d("Relationship evidence (photos together, correspondence, trip tickets, wedding plans)", "أدلة العلاقة الحقيقية (صور مشتركة، مراسلات، تذاكر سفر، خطط الزفاف)"),
    ],
  },
  {
    category: "K-3 / K-4 Spouses of U.S. Citizens",
    title: tx("K-3 & K-4 Spouses of U.S. Citizens and Children", "K-3 وK-4 أزواج المواطنين الأمريكيين والأبناء"),
    questions: [
      q("k3_marriage", "When and where did your legal marriage take place? Give certificate details", "متى وأين تم عقد الزواج القانوني؟ اذكر بيانات وثيقة الزواج", "textarea"),
      q("k3_petitions", "What are the receipt numbers for the pending Form I-130 and approved Form I-129F?", "ما هي أرقام إيصالات التماس I-130 المعلق والتماس I-129F المعتمد؟"),
    ],
    docs: [
      d("Form I-797 receipt notice for Form I-130 and approval notice for Form I-129F", "إشعار استلام I-130 وإشعار الموافقة على I-129F"),
      d("Certified civil marriage certificate and prior marriage termination decrees", "وثيقة الزواج الرسمية المعتمدة وأحكام إنهاء الزيجات السابقة"),
      d("Medical examination report and required police certificates", "تقرير الفحص الطبي وشهادات السيرة الجنائية المطلوبة"),
      d("Financial support records and Form I-134 evidence", "مستندات الدعم المالي وأدلة نموذج I-134"),
    ],
  },
  {
    category: "T / U Victims of Trafficking & Crime",
    title: tx("T & U Victims of Human Trafficking and Crimes", "T وU ضحايا الاتجار بالبشر والجرائم"),
    questions: [
      q("tu_approval", "What is the USCIS approval or receipt notice details for Form I-914 (T) or Form I-918 (U)?", "ما هي بيانات إشعار الموافقة أو الإيصال من USCIS لنموذج I-914 أو I-918؟"),
      q("tu_location", "Where are the principal and derivative beneficiaries currently residing?", "أين يقيم المتقدم الرئيسي والمستفيدون المشتقون حاليًا؟"),
    ],
    docs: [
      d("Approved USCIS Form I-914 or I-918 petition notice and classification approval", "إشعار موافقة USCIS على التماس I-914 أو I-918"),
      d("Law enforcement certifications (Form I-914 Supp B or I-918 Supp B)", "شهادات جهات إنفاذ القانون (نموذج I-914 ملحق B أو I-918 ملحق B)"),
      d("Civil documents establishing derivative family relationships", "المستندات المدنية المثبتة لصلات القرابة للمشتقين"),
      d("Specialist consular processing and waiver documentation where applicable", "مستندات الإجراءات القنصلية المتخصصة وطلبات الإعفاء إن لزمت"),
    ],
  },
];

/**
 * 5. Government Forms Inventory
 */
export type NivFormRecord = {
  code: string;
  agency: "DOS" | "USCIS";
  title: T;
  purpose: T;
  applicability: T;
};

export const NIV_FORMS_INVENTORY: NivFormRecord[] = [
  // Department of State & Exchange
  {
    code: "DS-160",
    agency: "DOS",
    title: tx("Online Nonimmigrant Visa Application", "طلب تأشيرة غير المهاجرين عبر الإنترنت"),
    purpose: tx("Primary consular application completed by the applicant before interview scheduling", "الطلب القنصلي الأساسي الذي يملأه المتقدم إلكترونيًا قبل حجز المقابلة"),
    applicability: tx("Main application for almost all NIV categories, including B, F, M, J, H, L, O, P, E, and K", "الطلب الرئيسي لجميع فئات غير المهاجرين بما فيها الزيارة والدراسة والعمل والخطيب"),
  },
  {
    code: "DS-156E",
    agency: "DOS",
    title: tx("Nonimmigrant Treaty Trader / Investor Application", "طلب تاجر أو مستثمر المعاهدة لغير المهاجرين"),
    purpose: tx("Provides detailed enterprise ownership, trade volume, investment path, and employee role", "يوضح ملكية المؤسسة وحجم التجارة ومسار الاستثمار ودور الموظف التخصصي"),
    applicability: tx("E-1 treaty traders and applicable E-1/E-2 executives, managers, and essential employees", "تجار معاهدة E-1 والمديرون والموظفون الأساسيون لحاملي E-1 وE-2"),
  },
  {
    code: "DS-1648",
    agency: "DOS",
    title: tx("Online Application for A, G, or NATO Visa", "طلب إلكتروني لتأشيرات A أو G أو NATO"),
    purpose: tx("Application for qualifying official diplomats, representatives, and staff inside the U.S.", "طلب التجديد أو إصدار تأشيرة للدبلوماسيين وممثلي المنظمات الرسمية داخل أمريكا"),
    applicability: tx("Applicable official applications processed within the United States", "الطلبات الرسمية المطبقة التي تُقدم من داخل الولايات المتحدة"),
  },
  {
    code: "DS-2019",
    agency: "DOS",
    title: tx("Certificate of Eligibility for Exchange Visitor Status", "شهادة الأهلية لوضع زائر التبادل"),
    purpose: tx("Official document issued by designated program sponsor establishing exchange participation", "الوثيقة الرسمية الصادرة من الجهة الراعية المعتمدة لإثبات المشاركة بالتبادل"),
    applicability: tx("Mandatory for all J-1 exchange visitors and J-2 qualifying dependents", "إلزامية لجميع زوار برنامج التبادل J-1 والمرافقين J-2"),
  },
  {
    code: "DS-7002",
    agency: "DOS",
    title: tx("Training / Internship Placement Plan", "خطة برنامج التدريب المهني / العملي"),
    purpose: tx("Formal training outline signed by the host organization, sponsor, and intern/trainee", "خطة التدريب المعتمدة والموقعة من المنشأة المستضيفة والجهة الراعية والمتدرب"),
    applicability: tx("Applicable J-1 intern and trainee exchange visitor programs", "برامج زوار التبادل J-1 لفئات المتدربين والتدريب المهني"),
  },
  {
    code: "DS-5535",
    agency: "DOS",
    title: tx("Supplemental Questions for Visa Applicants", "أسئلة تكميلية لمقدمي طلبات التأشيرة"),
    purpose: tx("Detailed 15-year travel, employment, address, and extended social media questionnaire", "استبيان مفصل لـ 15 سنة من السفر والعمل والعناوين وحسابات التواصل الاجتماعي الموسعة"),
    applicability: tx("Issued only when specifically requested by consular officers under administrative review", "يُطلب فقط بطلب مباشر من القنصل أثناء المراجعة الإدارية"),
  },
  {
    code: "DS-3035",
    agency: "DOS",
    title: tx("J-1 Visa Waiver Recommendation Application", "طلب توصية بإعفاء تأشيرة J-1 من شرط الإقامة بالخارج"),
    purpose: tx("Requests State Department recommendation to waive Section 212(e) 2-year home residence rule", "طلب توصية الخارجية بالإعفاء من شرط الإقامة بالوطن لمدة سنتين بموجب المادة 212(e)"),
    applicability: tx("J-1 holders subject to the two-year foreign residence requirement seeking a waiver", "حاملو تأشيرة J-1 الخاضعون لشرط السنتين بالخارج ويرغبون في الحصول على إعفاء"),
  },
  {
    code: "I-20",
    agency: "DOS",
    title: tx("Certificate of Eligibility for Nonimmigrant Student Status", "شهادة الأهلية لوضع طالب غير مهاجر"),
    purpose: tx("Official SEVP document certifying admission into a full-time course of study", "وثيقة SEVP الرسمية الصادرة من المؤسسة التعليمية التي تثبت القبول للدراسة"),
    applicability: tx("Mandatory for F-1, F-2, M-1, and M-2 visa applications", "إلزامية لطلبات تأشيرات الطلاب F-1 وM-1 والمرافقين F-2 وM-2"),
  },
  {
    code: "I-901",
    agency: "DOS",
    title: tx("SEVIS Fee Payment", "سداد رسوم نظام SEVIS"),
    purpose: tx("Proof of payment of the mandatory congressional fee funding the SEVIS tracking system", "إثبات سداد الرسوم الفيدرالية الإلزامية لتمويل نظام تتبع الطلاب SEVIS"),
    applicability: tx("Applicable F, M, and J applicants prior to visa interview", "مطلوبة لطلاب F وM وزوار J قبل إجراء المقابلة القنصلية"),
  },

  // USCIS Petitions & Related Forms
  {
    code: "I-129",
    agency: "USCIS",
    title: tx("Petition for a Nonimmigrant Worker", "التماس لعامل غير مهاجر"),
    purpose: tx("Employer request for temporary nonimmigrant worker status and classification", "طلب صاحب العمل لتصنيف العامل في فئة عمالة مؤقتة غير مهاجرة"),
    applicability: tx("Required prior to visa application for H, L, O, P, Q, and R categories", "مطلوب قبل التقديم على التأشيرة لفئات H وL وO وP وQ وR"),
  },
  {
    code: "I-129S",
    agency: "USCIS",
    title: tx("Nonimmigrant Petition Based on Blanket L Petition", "التماس غير مهاجر بموجب التماس L الشامل"),
    purpose: tx("Filed directly with consulate or USCIS by qualifying managers/executives or specialized knowledge transferees", "يُقدم مباشرة للقنصلية للمديرين أو أصحاب المعارف المتخصصة بموجب Blanket L"),
    applicability: tx("L-1 applicants qualifying under an approved corporate Blanket L petition", "متقدمو L-1 المؤهلون بموجب التماس Blanket L المعتمد للشركة"),
  },
  {
    code: "I-129F",
    agency: "USCIS",
    title: tx("Petition for Alien Fiancé(e)", "التماس لخطيب/خطيبة أجنبي/ة"),
    purpose: tx("U.S. citizen petition establishing relationship and intent to marry within 90 days", "التماس من مواطن أمريكي لإثبات العلاقة والنية في الزواج خلال 90 يومًا"),
    applicability: tx("Prerequisite petition for K-1 and K-2, and applicable K-3 spouse processing", "الالتماس الأساسي المطلوب لمعالجة تأشيرات K-1 وK-2 وK-3"),
  },
  {
    code: "I-539",
    agency: "USCIS",
    title: tx("Application to Extend/Change Nonimmigrant Status", "طلب تمديد أو تغيير وضع غير المهاجر"),
    purpose: tx("Filed inside the U.S. to extend stay or change from one nonimmigrant status to another", "يُقدم داخل أمريكا لتمديد الإقامة أو التحويل من فئة تأشيرة إلى أخرى"),
    applicability: tx("Eligible nonimmigrants already inside the U.S. (B, F, J, dependent statuses, etc.)", "حاملو تأشيرات غير المهاجرين المتواجدون داخل أمريكا (الزيارة، الطلاب، المعالون)"),
  },
  {
    code: "I-134",
    agency: "USCIS",
    title: tx("Declaration of Financial Support", "إقرار الدعم المالي"),
    purpose: tx("Sponsor agreement to financially support an intending visitor or fiancé(e)", "إقرار الكفيل بالتعهد بالدعم المالي للزائر أو الخطيب/الخطيبة لمنع الاعتماد على الإعانات"),
    applicability: tx("Commonly requested for K-1/K-2 applicants and conditional visitor cases", "يُطلب عادة لطلبات K-1 وK-2 وحالات الزيارة التي تتطلب كفالة مالية"),
  },
  {
    code: "I-765",
    agency: "USCIS",
    title: tx("Application for Employment Authorization", "طلب تصريح العمل"),
    purpose: tx("Requests an Employment Authorization Document (EAD) where category allows", "طلب بطاقة تصريح العمل (EAD) للفئات المصرح لها بالعمل"),
    applicability: tx("Applicable for J-2, L-2, E spouses, F-1 OPT/CPT, and K-1 holders", "متاح لأزواج J-2 وL-2 وE وطلاب F-1 في برامج OPT وحاملي K-1"),
  },
];

/**
 * 6. Upload and Submission Handling Matrix
 */
export type NivHandlingItem = {
  item: T;
  clientPortal: T;
  governmentHandling: T;
};

export const NIV_HANDLING_MATRIX: NivHandlingItem[] = [
  {
    item: tx("Questionnaire and supporting scans", "الاستبيان ومسح المستندات الداعمة"),
    clientPortal: tx("Upload to client portal for specialist review and folder preparation", "الرفع على بوابة العميل لمراجعة الأخصائي وتجهيز الملف"),
    governmentHandling: tx("Not automatically submitted to the government; retained for documentation record", "لا تُرسل تلقائيًا إلى الجهات الحكومية؛ تُحفظ لسجلات التوثيق والمراجعة"),
  },
  {
    item: tx("DS-160 Online Application", "نموذج DS-160 عبر الإنترنت"),
    clientPortal: tx("Keep draft/review records and verify barcode confirmation page", "حفظ مسودة المراجعة والتحقق من صفحة التأكيد والباركود"),
    governmentHandling: tx("Submitted electronically directly through the official CEAC consular portal", "تُرسل إلكترونيًا مباشرة عبر بوابة مركز CEAC القنصلي الرسمي"),
  },
  {
    item: tx("Digital visa photograph", "الصورة الشخصية الرقمية للتأشيرة"),
    clientPortal: tx("Upload for compliance check against State Dept. biometrics rules", "الرفع للتحقق من مطابقتها لمواصفات وزارة الخارجية البيومترية"),
    governmentHandling: tx("Uploaded directly during DS-160 submission; bring printed copies if digital upload fails", "تُرفع أثناء تقديم DS-160؛ ويُحضر نسخ مطبوعة إن تعذر الرفع"),
  },
  {
    item: tx("Original passport", "جواز السفر الأصلي"),
    clientPortal: tx("Upload clear biographical and visa page scans only", "رفع مسح ضوئي واضح لصفحة البيانات والتأشيرات فقط"),
    governmentHandling: tx("Present/submit the physical original only at the embassy interview or designated courier", "يُقدم الجواز الأصلي الفعلي في المقابلة بالسفارة أو شركة التوصيل المعتمدة"),
  },
  {
    item: tx("Supporting evidence & home ties", "الأدلة الداعمة وإثبات روابط الوطن"),
    clientPortal: tx("Upload relevant bank statements, employment letters, and property records", "رفع كشوف الحسابات البنكية وخطابات العمل وسجلات الملكية للمراجعة"),
    governmentHandling: tx("Bring organized physical copies to the consular interview as directed by post instructions", "إحضار نسخ ورقية منظمة للمقابلة القنصلية وفق تعليمات السفارة"),
  },
  {
    item: tx("Employer petition (I-129 / I-129F)", "التماس جهة العمل (I-129 / I-129F)"),
    clientPortal: tx("Upload copy of I-797 approval notice and petition documents", "رفع نسخة من إشعار الموافقة I-797 ومستندات الالتماس"),
    governmentHandling: tx("Petitioner files directly with USCIS; consulate verifies approval in PIMS/KCC", "يقدمه الكفيل لدى USCIS؛ وتتحقق القنصلية من الموافقة عبر أنظمة PIMS/KCC"),
  },
  {
    item: tx("Certificate of Eligibility (I-20 / DS-2019)", "شهادة الأهلية (I-20 / DS-2019)"),
    clientPortal: tx("Upload scanned copy of original signed certificate", "رفع نسخة ممسوحة ضوئيًا من الشهادة الأصلية الموقعة"),
    governmentHandling: tx("Present the physical, original signed form at the consular interview", "تقديم أصل النموذج الموقع فعليًا أثناء المقابلة القنصلية بالسفارة"),
  },
  {
    item: tx("Additional documents requested under 221(g)", "المستندات الإضافية المطلوبة بموجب 221(g)"),
    clientPortal: tx("Upload for tracking and compliance verification", "رفعها على البوابة للمتابعة والتحقق من الاستيفاء"),
    governmentHandling: tx("Submit using the specific postal, email, or courier method on the embassy's notice", "تُرسل بالطريقة المحددة في إشعار السفارة (بريد، إيميل، أو شركة شحن)"),
  },
  {
    item: tx("Medical examination (where applicable)", "الكشف الطبي (حيثما كان مطلوبًا)"),
    clientPortal: tx("Track scheduling and completion status for applicable categories (e.g. K visas)", "متابعة الحجز وحالة الإتمام للفئات المطلوبة (مثل تأشيرات K)"),
    governmentHandling: tx("Follow panel physician instructions; sealed envelope submitted unopened or electronically", "اتباع تعليمات الطبيب المعتمد؛ يُسلم المظروف مغلقًا أو يُرسل إلكترونيًا"),
  },
];

/**
 * 7. Official Reference Links
 */
export type NivOfficialReference = {
  num: number;
  title: T;
  desc: T;
  url: string;
};

export const NIV_OFFICIAL_REFERENCES: NivOfficialReference[] = [
  {
    num: 1,
    title: tx("DS-160: Frequently Asked Questions", "نموذج DS-160: الأسئلة الشائعة"),
    desc: tx("Official U.S. Department of State guidance on filling, signing, and submitting Form DS-160", "إرشادات وزارة الخارجية الأمريكية الرسمية حول ملء وتوقيع وإرسال نموذج DS-160"),
    url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/forms/ds-160-online-nonimmigrant-visa-application/ds-160-faqs.html",
  },
  {
    num: 2,
    title: tx("Directory of Visa Categories", "دليل فئات التأشيرات الأمريكية"),
    desc: tx("Comprehensive official catalog of all nonimmigrant and immigrant visa classifications", "الدليل الرسمي الكامل لجميع تصنيفات تأشيرات الهجرة وغير الهجرة"),
    url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/all-visa-categories.html",
  },
  {
    num: 3,
    title: tx("Visitor Visa (B-1 / B-2)", "تأشيرة الزائر (B-1 / B-2)"),
    desc: tx("Official requirements, application procedures, and documentation for business and tourism", "المتطلبات الرسمية وإجراءات التقديم والوثائق للزيارة وأنشطة الأعمال والسياحة"),
    url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html",
  },
  {
    num: 4,
    title: tx("Temporary Worker Visas", "تأشيرات العمالة المؤقتة"),
    desc: tx("USCIS petition and Department of State consular processing rules for H, L, O, P, and Q visas", "قواعد التماسات USCIS وإجراءات الخارجية القنصلية لتأشيرات العمل المؤقت H وL وO وP وQ"),
    url: "https://travel.state.gov/content/travel/en/us-visas/employment/temporary-worker-visas.html",
  },
  {
    num: 5,
    title: tx("Student Visa (F & M)", "تأشيرة الطلاب (F وM)"),
    desc: tx("State Department guidance for academic, vocational, and language students using Form I-20", "إرشادات وزارة الخارجية للطلاب الأكاديميين والمهنيين باستخدام نموذج I-20"),
    url: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
  },
  {
    num: 6,
    title: tx("Exchange Visitor Visa (J-1)", "تأشيرة زوار التبادل (J-1)"),
    desc: tx("Program rules, SEVIS tracking, and participant requirements for exchange visitors", "قواعد البرامج ونظام تتبع SEVIS وشروط المشاركين في برامج التبادل الثقافي"),
    url: "https://travel.state.gov/content/travel/en/us-visas/study/exchange.html",
  },
  {
    num: 7,
    title: tx("BridgeUSA: How to Apply", "BridgeUSA: كيفية التقديم لبرامج التبادل"),
    desc: tx("Official Department of State portal for BridgeUSA exchange visitor sponsors and programs", "البوابة الرسمية لوزارة الخارجية لبرامج ورعاة BridgeUSA لزوار التبادل"),
    url: "https://j1visa.state.gov/how-to-apply/",
  },
  {
    num: 8,
    title: tx("Treaty Trader / Investor & E-3 Visas", "تأشيرات تاجر/مستثمر المعاهدة وتأشيرات E-3"),
    desc: tx("Official instructions on nationality requirements, investment thresholds, and Form DS-156E", "تعليمات رسمية حول شروط الجنسية وحجم الاستثمار ونموذج DS-156E"),
    url: "https://travel.state.gov/content/travel/en/us-visas/employment/treaty-trader-investor-visa-e.html",
  },
  {
    num: 9,
    title: tx("Nonimmigrant Visa for a Fiancé(e) (K-1)", "تأشيرة غير المهاجرين للخطيب/الخطيبة (K-1)"),
    desc: tx("Consular instructions, medical examination, police certificates, and affidavit of support for K visas", "التعليمات القنصلية والكشف الطبي وصحف الحالة الجنائية وإقرارات الدعم لتأشيرات K"),
    url: "https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration/nonimmigrant-visa-for-a-fiance-k-1.html",
  },
  {
    num: 10,
    title: tx("Other Visa Categories", "فئات التأشيرات الأخرى"),
    desc: tx("Official procedures for transit, crewmember, diplomatic, media, and special categories", "الإجراءات الرسمية لتأشيرات الترانزيت والأطقم والدبلوماسية والإعلام والفئات الخاصة"),
    url: "https://travel.state.gov/content/travel/en/us-visas/other-visa-categories.html",
  },
  {
    num: 11,
    title: tx("Department of State Forms Directory", "دليل نماذج وزارة الخارجية الأمريكية"),
    desc: tx("Official portal for consular visa application forms and downloadable supplements", "البوابة الرسمية لنماذج طلبات التأشيرات القنصلية والملاحق المعتمدة"),
    url: "https://eforms.state.gov/",
  },
  {
    num: 12,
    title: tx("USCIS Forms & Filing Instructions", "نماذج وتعليمات التقديم لدى USCIS"),
    desc: tx("Official USCIS forms repository for I-129, I-129F, I-539, I-134, and premium processing", "مستودع نماذج USCIS الرسمية لالتماسات العمل وتمديد الإقامة والمعالجة السريعة"),
    url: "https://www.uscis.gov/forms/all-forms",
  },
];

/**
 * Form Requirements registrations for Nonimmigrant Visas workflow.
 */
export const nivWorkflows: FormRequirement[] = [
  {
    code: DS160_CODE,
    title: tx("DS-160 Online Nonimmigrant Visa Application", "نموذج DS-160 لطلب تأشيرة غير المهاجرين عبر الإنترنت"),
    questions: universalIntakeQuestions,
    docs: allNivDocs,
  },
  {
    code: "DS-156E",
    title: tx("DS-156E Nonimmigrant Treaty Trader / Investor Application", "نموذج DS-156E لطلب تاجر أو مستثمر المعاهدة لغير المهاجرين"),
    questions: [
      q("e_enterprise_name", "What is the full legal name and address of the U.S. enterprise?", "ما هو الاسم القانوني الكامل وعنوان المؤسسة داخل الولايات المتحدة؟"),
      q("e_treaty_country", "What is the treaty country of nationality?", "ما هي دولة المعاهدة وجنسيتها؟"),
      q("e_total_investment", "What is the total amount invested in the enterprise (cash, equipment, inventory)?", "ما هو إجمالي المبلغ المستثمر في المؤسسة (نقدًا، معدات، بضائع)؟"),
      q("e_employee_role", "Is the applicant the principal trader/investor or an executive/manager/specialist?", "هل المتقدم هو التاجر/المستثمر الرئيسي أم مدير تنفيذي/إداري/متخصص جوهري؟"),
    ],
    docs: [
      d("Proof of qualifying treaty nationality and corporate ownership structure", "إثبات جنسية المعاهدة المؤهلة وهيكل ملكية الشركة"),
      d("5-year comprehensive business plan and audited/reviewed financial statements", "خطة عمل تفصيلية لخمس سنوات وقوائم مالية مراجعة"),
      d("Commercial contracts, bank transfer receipts, and escrow documentation", "العقود التجارية وإيصالات التحويلات البنكية وحسابات الضمان"),
    ],
  },
  {
    code: "DS-1648",
    title: tx("DS-1648 Online Application for A, G, or NATO Visa", "نموذج DS-1648 لتأشيرات A أو G أو NATO"),
    questions: [
      q("dip_mission_name", "What is the official government entity or international organization?", "ما هي الجهة الحكومية الرسمية أو المنظمة الدولية؟"),
      q("dip_current_status", "What is your current nonimmigrant status in the United States?", "ما هو وضعك الحالي لغير المهاجرين في الولايات المتحدة؟"),
    ],
    docs: [
      d("Official diplomatic note (Note Verbale) or international organization request", "مذكرة دبلوماسية رسمية (Note Verbale) أو طلب المنظمة الدولية"),
      d("Valid diplomatic or official passport biographical pages", "صفحات بيانات الجواز الدبلوماسي أو الرسمي الساري"),
    ],
  },
  {
    code: "DS-2019",
    title: tx("DS-2019 Certificate of Eligibility for Exchange Visitor Status", "نموذج DS-2019 شهادة الأهلية لوضع زائر التبادل"),
    questions: [
      q("sevis_id_number", "What is your SEVIS ID number (N-number)?", "ما هو رقم SEVIS الخاص بك (يبدأ بحرف N)؟"),
      q("sponsor_org_name", "What is the designated exchange program sponsor's name and program number?", "ما اسم الجهة الراعية المعتمدة لبرنامج التبادل ورقم البرنامج؟"),
    ],
    docs: [
      d("Signed Form DS-2019 issued by designated program sponsor", "نموذج DS-2019 موقع وصادر من الجهة الراعية المعتمدة"),
      d("Form I-901 SEVIS fee payment receipt", "إيصال سداد رسوم SEVIS نموذج I-901"),
      d("Financial support letters and institutional awards", "خطابات الدعم المالي والمنح المؤسسية"),
    ],
  },
  {
    code: "DS-7002",
    title: tx("DS-7002 Training / Internship Placement Plan", "نموذج DS-7002 خطة التدريب المهني / العملي"),
    questions: [
      q("host_org_name", "What is the host organization name, address, and supervisor contact?", "ما هو اسم المنشأة المستضيفة وعنوانها وبيانات المشرف المباشر؟"),
      q("training_phases", "How many training phases are outlined, and what are the specific skills to be acquired?", "كم عدد مراحل التدريب المحددة، وما هي المهارات التخصصية المكتسبة؟", "textarea"),
    ],
    docs: [
      d("Form DS-7002 signed by host organization, designated sponsor, and trainee", "نموذج DS-7002 موقع من المنشأة المستضيفة والجهة الراعية والمتدرب"),
      d("Company training syllabus, workplace agreement, and compensation terms", "المنهج التدريبي للشركة واتفاقية العمل وشروط المقابل المالي"),
    ],
  },
  {
    code: "DS-5535",
    agency: "DOS",
    title: tx("DS-5535 Supplemental Questions for Visa Applicants", "نموذج DS-5535 أسئلة تكميلية لمقدمي طلبات التأشيرة"),
    questions: [
      q("travel_15_years", "List all international travel in the past 15 years (dates, countries, duration, and funding source)", "اذكر كل السفريات الدولية خلال آخر 15 سنة (التواريخ والدول والمدد ومصدر التمويل)", "textarea"),
      q("addresses_15_years", "List all physical residential addresses for the past 15 years", "اذكر جميع عناوين الإقامة السكنية الفعلية خلال آخر 15 سنة", "textarea"),
      q("employment_15_years", "List all employers and employment history for the past 15 years", "اذكر جميع جهات العمل وتاريخ التوظيف خلال آخر 15 سنة", "textarea"),
      q("social_media_handles_5y", "List all social media handles, usernames, and platforms used in the past 5 years", "اذكر كل حسابات وسائل التواصل الاجتماعي والمنصات لآخر 5 سنوات", "textarea"),
      q("siblings_details", "List all siblings (names, dates of birth, country of birth, and current residence)", "اذكر جميع الإخوة والأخوات (الأسماء وتواريخ وبلد الميلاد ومكان الإقامة الحالي)", "textarea"),
    ],
    docs: [
      d("Complete 15-year travel history and passport exit/entry stamp records", "سجل السفر لـ 15 سنة كاملة وصور أختام الدخول والخروج بالجوازات"),
      d("Complete employment verification records for past 15 years", "سجلات وشهادات إثبات العمل لآخر 15 سنة كاملة"),
    ],
  },
  {
    code: "DS-3035",
    agency: "DOS",
    title: tx("DS-3035 J-1 Visa Waiver Recommendation Application", "نموذج DS-3035 طلب توصية بإعفاء تأشيرة J-1"),
    questions: [
      q("waiver_basis", "What is the basis for your waiver request (No Objection, Interested Gov Agency, Persecution, Exceptional Hardship)?", "ما هو الأساس لطلب الإعفاء (عدم ممانعة، جهة حكومية معنية، اضطهاد، مشقة استثنائية)؟"),
      q("j_case_number", "What is your Department of State waiver review case number?", "ما هو رقم قضية مراجعة الإعفاء لدى وزارة الخارجية؟"),
    ],
    docs: [
      d("Copies of all previously issued DS-2019 / IAP-66 forms", "نسخ من جميع نماذج DS-2019 / IAP-66 الصادرة لك سابقًا"),
      d("Statement of reason and official third-party waiver support letter (e.g. No Objection Statement)", "بيان الأسباب وخطاب الدعم الرسمي لطلب الإعفاء (مثل خطاب عدم الممانعة)"),
    ],
  },
  {
    code: "I-20",
    title: tx("I-20 Certificate of Eligibility for Nonimmigrant Student Status", "نموذج I-20 شهادة الأهلية لوضع طالب غير مهاجر"),
    questions: [
      q("student_sevis_id", "What is your SEVIS ID number?", "ما هو رقم SEVIS الخاص بك؟"),
      q("school_code", "What is the SEVP school code and program name?", "ما هو كود المدرسة لدى SEVP واسم البرنامج الأكاديمي؟"),
    ],
    docs: [
      d("Form I-20 signed by student and Designated School Official (DSO)", "نموذج I-20 موقع من الطالب والمسؤول المدرسي المعتمد (DSO)"),
      d("Form I-901 SEVIS fee receipt", "إيصال سداد رسوم SEVIS نموذج I-901"),
      d("Academic and financial support documentation", "مستندات الدعم الأكاديمي والمالي"),
    ],
  },
  {
    code: "I-901",
    title: tx("I-901 SEVIS Fee Payment Record", "إيصال سداد رسوم I-901 SEVIS"),
    questions: [
      q("sevis_fee_receipt_number", "What is the SEVIS fee confirmation/receipt number?", "ما هو رقم إيصال أو تأكيد سداد رسوم SEVIS؟"),
    ],
    docs: [
      d("Official Form I-901 payment confirmation receipt", "إيصال تأكيد سداد رسوم I-901 الرسمي"),
    ],
  },
  {
    code: "I-129",
    title: tx("I-129 Petition for a Nonimmigrant Worker", "نموذج I-129 التماس لعامل غير مهاجر"),
    questions: [
      q("petition_employer_name", "What is the petitioning U.S. employer's full legal name and EIN?", "ما هو الاسم القانوني لصاحب العمل الأمريكي مقدم الالتماس ورقمه الضريبي؟"),
      q("petition_job_title", "What is the job title, nonimmigrant classification (H, L, O, P, Q, R), and offered wage?", "ما هو المسمى الوظيفي وتصنيف غير المهاجر (H, L, O, P, Q, R) والأجر المعروض؟"),
      q("petition_worksite_address", "What is the primary worksite physical address in the United States?", "ما هو العنوان الفعلي لموقع العمل الرئيسي في الولايات المتحدة؟"),
    ],
    docs: [
      d("Certified Department of Labor LCA or prevailing wage determination", "طلب شروط العمل المعتمد (LCA) أو تحديد الأجر السائد"),
      d("Employer support letter and detailed job duties description", "خطاب دعم من جهة العمل ووصف مفصل لمهام الوظيفة"),
      d("Beneficiary degrees, transcripts, credentials evaluation, and licenses", "شهادات المستفيد الأكاديمية ومعادلة المؤهلات والتراخيص"),
    ],
  },
  {
    code: "I-129S",
    title: tx("I-129S Nonimmigrant Petition Based on Blanket L Petition", "نموذج I-129S التماس بموجب التماس L الشامل"),
    questions: [
      q("blanket_approval_number", "What is the Blanket L approval notice (I-797) receipt number and expiration date?", "ما هو رقم إيصال إشعار اعتماد Blanket L (I-797) وتاريخ انتهائه؟"),
      q("transferee_qualifying_role", "Is the role executive/managerial (L-1A) or specialized knowledge professional (L-1B)?", "هل الدور تنفيذي/إداري (L-1A) أم مهني ذو معرفة تخصصية (L-1B)؟"),
      q("foreign_employment_dates", "What were the dates and job title of your qualifying 1-year continuous employment abroad?", "ما هي تواريخ والمسمى الوظيفي لعملك المتصل لمدة عام بالخارج؟"),
    ],
    docs: [
      d("Copy of the approved Form I-797 Blanket L notice for the corporate group", "نسخة من إشعار اعتماد التماس Blanket L (I-797) لمجموعة الشركات"),
      d("Detailed employer letter describing proposed U.S. role and foreign qualifying experience", "خطاب مفصل من صاحب العمل يصف المنصب المقترح في أمريكا والخبرة المؤهلة بالخارج"),
      d("Payroll, tax, and organizational charts proving 1 year of continuous qualifying employment", "سجلات الرواتب والضرائب والهيكل التنظيمي لإثبات سنة عمل متصلة مؤهلة بالخارج"),
    ],
  },
];
