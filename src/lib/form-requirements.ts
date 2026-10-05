// Per-form intake questions and documents, supplied by the MIGRAFILE owner. Not legal advice.
import type { T } from "./i18n";
import { nvcWorkflow } from "./nvc-workflow";
export type FormQuestion = { id: string; q: T; type: "text" | "yesno" | "date" | "textarea" };
export type FormRequirement = { code: string; title: T; questions: FormQuestion[]; docs: T[] };
export const formRequirements: FormRequirement[] = [
 {
  "code": "AR-11",
  "title": {
   "en": "AR-11 Alien's Change of Address Card",
   "ar": "بطاقة AR-11 لتغيير عنوان الأجنبي"
  },
  "questions": [
   {
    "id": "full_legal_name",
    "q": {
     "en": "What is your full legal name? (First, middle, and last name)",
     "ar": "ما هو اسمك القانوني الكامل؟ (الاسم الأول والأوسط والأخير)"
    },
    "type": "text"
   },
   {
    "id": "date_of_birth",
    "q": {
     "en": "What is your date of birth? (MM/DD/YYYY)",
     "ar": "ما هو تاريخ ميلادك؟ (الشهر/اليوم/السنة)"
    },
    "type": "date"
   },
   {
    "id": "country_of_citizenship",
    "q": {
     "en": "What is your country of citizenship?",
     "ar": "ما هي دولة جنسيتك؟"
    },
    "type": "text"
   },
   {
    "id": "alien_registration_number",
    "q": {
     "en": "What is your Alien Registration Number (A-Number), if assigned?",
     "ar": "ما هو رقم تسجيل الأجانب الخاص بك (A-Number)، إذا كان مخصصًا لك؟"
    },
    "type": "text"
   },
   {
    "id": "current_immigration_status",
    "q": {
     "en": "What is your current immigration status? (e.g., permanent resident, student, visitor, asylum applicant)",
     "ar": "ما هي حالة الهجرة الحالية الخاصة بك؟ (مثل: مقيم دائم، طالب، زائر، طالب لجوء)"
    },
    "type": "text"
   },
   {
    "id": "previous_physical_address",
    "q": {
     "en": "What was your previous physical address? (Street, apartment, city, state, ZIP code)",
     "ar": "ما هو عنوانك الفعلي السابق؟ (الشارع، رقم الشقة، المدينة، الولاية، الرمز البريدي)"
    },
    "type": "textarea"
   },
   {
    "id": "new_physical_address",
    "q": {
     "en": "What is your new physical address? (Complete address where you actually live)",
     "ar": "ما هو عنوانك الفعلي الجديد؟ (العنوان الكامل حيث تقيم بالفعل)"
    },
    "type": "textarea"
   },
   {
    "id": "mailing_address_different",
    "q": {
     "en": "Is your mailing address different from your new physical address? If yes, provide the complete mailing address and \"care of\" name, if applicable.",
     "ar": "هل عنوانك البريدي يختلف عن عنوانك الفعلي الجديد؟ إذا كانت الإجابة نعم، يرجى تقديم العنوان البريدي الكامل واسم \"عناية\"، إن وجد."
    },
    "type": "textarea"
   },
   {
    "id": "move_date",
    "q": {
     "en": "When did you move? (Exact move date)",
     "ar": "متى انتقلت؟ (تاريخ الانتقال الدقيق)"
    },
    "type": "date"
   },
   {
    "id": "pending_uscis_cases",
    "q": {
     "en": "Do you have pending USCIS cases? List every form type and receipt number.",
     "ar": "هل لديك قضايا USCIS معلقة؟ اذكر كل نوع نموذج ورقم الإيصال."
    },
    "type": "textarea"
   },
   {
    "id": "uscis_online_account",
    "q": {
     "en": "Do you have a USCIS online account?",
     "ar": "هل لديك حساب USCIS عبر الإنترنت؟"
    },
    "type": "yesno"
   },
   {
    "id": "family_members_moving",
    "q": {
     "en": "Are other family members moving? Identify each person.",
     "ar": "هل ينتقل أفراد آخرون من العائلة؟ حدد كل شخص."
    },
    "type": "textarea"
   },
   {
    "id": "vawa_t_u_i751_case",
    "q": {
     "en": "Do you have a VAWA, T, U, or I-751 abuse-waiver case?",
     "ar": "هل لديك قضية VAWA، T، U، أو I-751 (التنازل عن الإساءة)؟"
    },
    "type": "yesno"
   },
   {
    "id": "case_with_immigration_court_nvc",
    "q": {
     "en": "Is your case with immigration court or NVC?",
     "ar": "هل قضيتك لدى محكمة الهجرة أو NVC؟"
    },
    "type": "yesno"
   },
   {
    "id": "signed_affidavit_of_support",
    "q": {
     "en": "Have you signed an affidavit of support for someone?",
     "ar": "هل وقعت على إفادة دعم لشخص ما؟"
    },
    "type": "yesno"
   },
   {
    "id": "contact_details",
    "q": {
     "en": "What are your contact details? (Email and phone number)",
     "ar": "ما هي تفاصيل الاتصال الخاصة بك؟ (البريد الإلكتروني ورقم الهاتف)"
    },
    "type": "text"
   }
  ],
  "docs": [
   {
    "en": "USCIS receipt notices, Form I-797/I-797C",
    "ar": "إشعارات استلام USCIS، نموذج I-797/I-797C"
   },
   {
    "en": "Green card, EAD, or USCIS notice showing A-Number",
    "ar": "البطاقة الخضراء، EAD، أو إشعار USCIS يوضح رقم A-Number"
   },
   {
    "en": "Passport biographical page",
    "ar": "صفحة البيانات البيوغرافية في جواز السفر"
   },
   {
    "en": "Lease, utility bill, or other address evidence",
    "ar": "عقد الإيجار، فاتورة مرافق، أو أي دليل آخر على العنوان"
   },
   {
    "en": "Completed, signed AR-11 (Required when using the paper filing method)",
    "ar": "نموذج AR-11 مكتمل وموقع (مطلوب عند استخدام طريقة التقديم الورقية)"
   }
  ]
 },
 {
  "code": "G-28I",
  "title": {
   "en": "G-28I Appearance as Attorney in Matters Outside the United States",
   "ar": "G-28I إقرار وكالة المحامي في المسائل خارج الولايات المتحدة"
  },
  "questions": [
   {
    "id": "dhs_agency_overseas_office",
    "q": {
     "en": "Which DHS agency and overseas office is handling the matter?",
     "ar": "ما هي وكالة DHS والمكتب الخارجي الذي يتولى الأمر؟"
    },
    "type": "text"
   },
   {
    "id": "proceeding_outside_us",
    "q": {
     "en": "Is the proceeding actually outside the United States?",
     "ar": "هل الإجراء القضائي بالفعل خارج الولايات المتحدة؟"
    },
    "type": "yesno"
   },
   {
    "id": "attorney_full_legal_name",
    "q": {
     "en": "Attorney's full legal name",
     "ar": "الاسم القانوني الكامل للمحامي"
    },
    "type": "text"
   },
   {
    "id": "attorney_uscis_online_account_number",
    "q": {
     "en": "Attorney's USCIS online account number, if any",
     "ar": "رقم حساب المحامي عبر الإنترنت لدى USCIS، إن وجد"
    },
    "type": "text"
   },
   {
    "id": "attorney_business_address",
    "q": {
     "en": "Attorney's business address",
     "ar": "عنوان العمل الخاص بالمحامي"
    },
    "type": "textarea"
   },
   {
    "id": "attorney_country",
    "q": {
     "en": "Attorney's country",
     "ar": "بلد المحامي"
    },
    "type": "text"
   },
   {
    "id": "attorney_telephone",
    "q": {
     "en": "Attorney's telephone number",
     "ar": "رقم هاتف المحامي"
    },
    "type": "text"
   },
   {
    "id": "attorney_mobile",
    "q": {
     "en": "Attorney's mobile number",
     "ar": "رقم هاتف المحامي المحمول"
    },
    "type": "text"
   },
   {
    "id": "attorney_email",
    "q": {
     "en": "Attorney's email address",
     "ar": "البريد الإلكتروني للمحامي"
    },
    "type": "text"
   },
   {
    "id": "attorney_fax",
    "q": {
     "en": "Attorney's fax number, if any",
     "ar": "رقم الفاكس الخاص بالمحامي، إن وجد"
    },
    "type": "text"
   },
   {
    "id": "attorney_country_residence",
    "q": {
     "en": "Attorney's country of residence",
     "ar": "بلد إقامة المحامي"
    },
    "type": "text"
   },
   {
    "id": "attorney_country_legal_practice",
    "q": {
     "en": "Attorney's country of legal practice",
     "ar": "بلد ممارسة المحامي للمحاماة"
    },
    "type": "text"
   },
   {
    "id": "attorney_licensing_authority",
    "q": {
     "en": "Attorney's licensing authority",
     "ar": "الجهة المانحة لترخيص المحامي"
    },
    "type": "text"
   },
   {
    "id": "attorney_license_number",
    "q": {
     "en": "Attorney's license number, if applicable",
     "ar": "رقم ترخيص المحامي، إن وجد"
    },
    "type": "text"
   },
   {
    "id": "attorney_good_standing_active_practice",
    "q": {
     "en": "Confirmation of attorney's current good standing and active practice",
     "ar": "تأكيد وضع المحامي الحالي الجيد وممارسته النشطة للمهنة"
    },
    "type": "yesno"
   },
   {
    "id": "attorney_subject_to_restriction",
    "q": {
     "en": "Is the attorney subject to suspension, disbarment, injunction, or another restriction?",
     "ar": "هل المحامي خاضع للإيقاف، الشطب، أمر قضائي، أو أي قيود أخرى؟"
    },
    "type": "yesno"
   },
   {
    "id": "attorney_restriction_details",
    "q": {
     "en": "If yes, provide details of the attorney's practice restrictions",
     "ar": "إذا كانت الإجابة نعم، يرجى تقديم تفاصيل عن قيود ممارسة المحامي"
    },
    "type": "textarea"
   },
   {
    "id": "firm_name",
    "q": {
     "en": "Name of law firm or organization, if applicable",
     "ar": "اسم مكتب المحاماة أو المنظمة، إن وجد"
    },
    "type": "text"
   },
   {
    "id": "attorney_appearing_at_request_of_existing_attorney",
    "q": {
     "en": "Is the attorney appearing at the request of an existing attorney of record?",
     "ar": "هل يظهر المحامي بناءً على طلب محامٍ آخر موجود في السجل؟"
    },
    "type": "yesno"
   },
   {
    "id": "identify_existing_attorney",
    "q": {
     "en": "If yes, identify that attorney and the limited purpose of appearance",
     "ar": "إذا كانت الإجابة نعم، حدد هوية ذلك المحامي والغرض المحدد للمثول"
    },
    "type": "textarea"
   },
   {
    "id": "matter_agency",
    "q": {
     "en": "Matter details: Agency (USCIS, ICE, or CBP)",
     "ar": "تفاصيل القضية: الوكالة (USCIS، ICE، أو CBP)"
    },
    "type": "text"
   },
   {
    "id": "matter_form_numbers_or_specific_matter",
    "q": {
     "en": "Matter details: Form numbers or specific matter",
     "ar": "تفاصيل القضية: أرقام النماذج أو المسألة المحددة"
    },
    "type": "text"
   },
   {
    "id": "matter_receipt_number",
    "q": {
     "en": "Matter details: Receipt number, if any",
     "ar": "تفاصيل القضية: رقم الإيصال، إن وجد"
    },
    "type": "text"
   },
   {
    "id": "client_role",
    "q": {
     "en": "Client’s role (Applicant, petitioner, beneficiary/derivative, or respondent)",
     "ar": "دور العميل (مقدم الطلب، الملتمس، المستفيد/التابع، أو المدعى عليه)"
    },
    "type": "text"
   },
   {
    "id": "client_full_legal_name",
    "q": {
     "en": "Client's full legal name",
     "ar": "الاسم القانوني الكامل للعميل"
    },
    "type": "text"
   },
   {
    "id": "client_a_number",
    "q": {
     "en": "Client's A-Number, if any",
     "ar": "رقم A الخاص بالعميل، إن وجد"
    },
    "type": "text"
   },
   {
    "id": "client_uscis_online_account_number",
    "q": {
     "en": "Client's USCIS online account number, if any",
     "ar": "رقم حساب العميل عبر الإنترنت لدى USCIS، إن وجد"
    },
    "type": "text"
   },
   {
    "id": "entity_client_name",
    "q": {
     "en": "Entity client name, if applicable",
     "ar": "اسم العميل الكيان، إن وجد"
    },
    "type": "text"
   },
   {
    "id": "entity_client_authorized_signatory_name_title",
    "q": {
     "en": "Entity client authorized signatory’s name and title, if applicable",
     "ar": "اسم ووظيفة المخول بالتوقيع للعميل الكيان، إن وجد"
    },
    "type": "text"
   },
   {
    "id": "client_mailing_address",
    "q": {
     "en": "Client's mailing address",
     "ar": "عنوان البريد الخاص بالعميل"
    },
    "type": "textarea"
   },
   {
    "id": "client_telephone",
    "q": {
     "en": "Client's telephone number",
     "ar": "رقم هاتف العميل"
    },
    "type": "text"
   },
   {
    "id": "client_mobile",
    "q": {
     "en": "Client's mobile number",
     "ar": "رقم هاتف العميل المحمول"
    },
    "type": "text"
   },
   {
    "id": "client_email",
    "q": {
     "en": "Client's email address",
     "ar": "البريد الإلكتروني للعميل"
    },
    "type": "text"
   },
   {
    "id": "client_request_uscis_send_original_notices_to_attorney",
    "q": {
     "en": "Does the client request that USCIS send original notices to the attorney’s business address?",
     "ar": "هل يطلب العميل أن ترسل USCIS الإشعارات الأصلية إلى عنوان عمل المحامي؟"
    },
    "type": "yesno"
   },
   {
    "id": "client_consent_representation_release_information",
    "q": {
     "en": "Client’s consent to representation and release of information",
     "ar": "موافقة العميل على التمثيل والإفصاح عن المعلومات"
    },
    "type": "yesno"
   },
   {
    "id": "client_signature",
    "q": {
     "en": "Client’s signature",
     "ar": "توقيع العميل"
    },
    "type": "text"
   },
   {
    "id": "client_signature_date",
    "q": {
     "en": "Date of client’s signature",
     "ar": "تاريخ توقيع العميل"
    },
    "type": "date"
   },
   {
    "id": "attorney_signature",
    "q": {
     "en": "Attorney’s signature",
     "ar": "توقيع المحامي"
    },
    "type": "text"
   },
   {
    "id": "attorney_signature_date",
    "q": {
     "en": "Date of attorney’s signature",
     "ar": "تاريخ توقيع المحامي"
    },
    "type": "date"
   }
  ],
  "docs": [
   {
    "en": "Completed G-28I, signed by client and attorney",
    "ar": "نموذج G-28I مكتمل وموقع من العميل والمحامي"
   },
   {
    "en": "Additional-information sheets, if needed to complete or explain answers",
    "ar": "أوراق معلومات إضافية، إذا لزم الأمر لإكمال أو توضيح الإجابات"
   },
   {
    "en": "Attorney’s current license/bar registration, if requested by the handling office",
    "ar": "رخصة المحامي الحالية/تسجيله في نقابة المحامين، إذا طلبها المكتب المعالج"
   },
   {
    "en": "Certificate of good standing, if requested by the handling office",
    "ar": "شهادة حسن السيرة، إذا طلبها المكتب المعالج"
   },
   {
    "en": "Evidence of residence and active legal practice, if eligibility needs verification",
    "ar": "إثبات الإقامة وممارسة المحاماة النشطة، إذا كانت الأهلية بحاجة إلى التحقق"
   },
   {
    "en": "Orders restricting legal practice and explanation, if applicable (and supporting records if requested)",
    "ar": "أوامر تقييد الممارسة القانونية وشرحها، إن وجدت (والسجلات الداعمة إذا طُلبت)"
   },
   {
    "en": "Client’s passport/ID, only if needed to verify identity",
    "ar": "جواز سفر/هوية العميل، فقط إذا لزم الأمر للتحقق من الهوية"
   },
   {
    "en": "USCIS receipt notice, if an existing case has a receipt number",
    "ar": "إشعار استلام USCIS، إذا كانت هناك قضية حالية برقم إيصال"
   },
   {
    "en": "Engagement agreement",
    "ar": "اتفاقية التوكيل"
   }
  ]
 },
 {
  "code": "G-325A",
  "title": {
   "en": "G-325A Biographic Information",
   "ar": "G-325A معلومات السيرة الذاتية"
  },
  "questions": [
   {
    "id": "q1",
    "q": {
     "en": "Are you currently inside the United States?",
     "ar": "هل أنت حاليًا داخل الولايات المتحدة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q2",
    "q": {
     "en": "Are you in immigration court proceedings, under a removal order, or dealing with ICE?",
     "ar": "هل أنت حاليًا في إجراءات محكمة الهجرة، أو بموجب أمر ترحيل، أو تتعامل مع ICE؟"
    },
    "type": "yesno"
   },
   {
    "id": "q3",
    "q": {
     "en": "Is this your first deferred-action request or a subsequent request?",
     "ar": "هل هذا هو طلبك الأول للإجراء المؤجل أم طلب لاحق؟"
    },
    "type": "text"
   },
   {
    "id": "q4",
    "q": {
     "en": "Provide previous deferred-action decisions and expiration dates.",
     "ar": "قدم قرارات الإجراءات المؤجلة السابقة وتواريخ انتهائها."
    },
    "type": "textarea"
   },
   {
    "id": "q5",
    "q": {
     "en": "What medical, humanitarian, military-family, government-supported, or other circumstances support your request?",
     "ar": "ما هي الظروف الطبية أو الإنسانية أو العائلية العسكرية أو المدعومة من الحكومة أو غيرها التي تدعم طلبك؟"
    },
    "type": "textarea"
   },
   {
    "id": "q6",
    "q": {
     "en": "Full legal name",
     "ar": "الاسم القانوني الكامل"
    },
    "type": "text"
   },
   {
    "id": "q7",
    "q": {
     "en": "All other names used",
     "ar": "جميع الأسماء الأخرى المستخدمة"
    },
    "type": "text"
   },
   {
    "id": "q8",
    "q": {
     "en": "Date of birth",
     "ar": "تاريخ الميلاد"
    },
    "type": "date"
   },
   {
    "id": "q9",
    "q": {
     "en": "Place of birth",
     "ar": "مكان الميلاد"
    },
    "type": "text"
   },
   {
    "id": "q10",
    "q": {
     "en": "Sex",
     "ar": "الجنس"
    },
    "type": "text"
   },
   {
    "id": "q11",
    "q": {
     "en": "Citizenship/Nationality",
     "ar": "الجنسية"
    },
    "type": "text"
   },
   {
    "id": "q12",
    "q": {
     "en": "A-Number, if assigned",
     "ar": "رقم A-Number، إن وجد"
    },
    "type": "text"
   },
   {
    "id": "q13",
    "q": {
     "en": "USCIS online account number, if assigned",
     "ar": "رقم حساب USCIS عبر الإنترنت، إن وجد"
    },
    "type": "text"
   },
   {
    "id": "q14",
    "q": {
     "en": "Current physical address",
     "ar": "العنوان الفعلي الحالي"
    },
    "type": "text"
   },
   {
    "id": "q15",
    "q": {
     "en": "Current mailing address",
     "ar": "عنوان المراسلة الحالي"
    },
    "type": "text"
   },
   {
    "id": "q16",
    "q": {
     "en": "Previous addresses during the last five years, with dates",
     "ar": "العناوين السابقة خلال السنوات الخمس الماضية، مع التواريخ"
    },
    "type": "textarea"
   },
   {
    "id": "q17",
    "q": {
     "en": "Latest U.S. entry date",
     "ar": "تاريخ آخر دخول إلى الولايات المتحدة"
    },
    "type": "date"
   },
   {
    "id": "q18",
    "q": {
     "en": "Latest U.S. entry location",
     "ar": "موقع آخر دخول إلى الولايات المتحدة"
    },
    "type": "text"
   },
   {
    "id": "q19",
    "q": {
     "en": "Immigration status at latest U.S. entry",
     "ar": "حالة الهجرة عند آخر دخول إلى الولايات المتحدة"
    },
    "type": "text"
   },
   {
    "id": "q20",
    "q": {
     "en": "Date that status expired/expires",
     "ar": "تاريخ انتهاء/انتهاء تلك الحالة"
    },
    "type": "date"
   },
   {
    "id": "q21",
    "q": {
     "en": "I-94 number, if issued",
     "ar": "رقم I-94، إن وجد"
    },
    "type": "text"
   },
   {
    "id": "q22",
    "q": {
     "en": "I-94 authorized-stay expiration date, if issued",
     "ar": "تاريخ انتهاء الإقامة المصرح بها في I-94، إن وجد"
    },
    "type": "date"
   },
   {
    "id": "q23",
    "q": {
     "en": "Parent's name at birth",
     "ar": "اسم الوالد عند الولادة"
    },
    "type": "text"
   },
   {
    "id": "q24",
    "q": {
     "en": "Parent's date of birth",
     "ar": "تاريخ ميلاد الوالد"
    },
    "type": "date"
   },
   {
    "id": "q25",
    "q": {
     "en": "Parent's place of birth",
     "ar": "مكان ميلاد الوالد"
    },
    "type": "text"
   },
   {
    "id": "q26",
    "q": {
     "en": "Parent's current city/country of residence, if living",
     "ar": "مدينة/بلد إقامة الوالد الحالي، إذا كان على قيد الحياة"
    },
    "type": "text"
   },
   {
    "id": "q27",
    "q": {
     "en": "Current spouse's name (or 'none')",
     "ar": "اسم الزوج/الزوجة الحالي (أو 'لا يوجد')"
    },
    "type": "text"
   },
   {
    "id": "q28",
    "q": {
     "en": "Current spouse's date of birth",
     "ar": "تاريخ ميلاد الزوج/الزوجة الحالي"
    },
    "type": "date"
   },
   {
    "id": "q29",
    "q": {
     "en": "Current spouse's place of birth",
     "ar": "مكان ميلاد الزوج/الزوجة الحالي"
    },
    "type": "text"
   },
   {
    "id": "q30",
    "q": {
     "en": "Date of marriage",
     "ar": "تاريخ الزواج"
    },
    "type": "date"
   },
   {
    "id": "q31",
    "q": {
     "en": "Place of marriage",
     "ar": "مكان الزواج"
    },
    "type": "text"
   },
   {
    "id": "q32",
    "q": {
     "en": "Why are you requesting deferred action?",
     "ar": "لماذا تطلب الإجراء المؤجل؟"
    },
    "type": "textarea"
   },
   {
    "id": "q33",
    "q": {
     "en": "What facts and evidence support a favorable discretionary decision?",
     "ar": "ما هي الحقائق والأدلة التي تدعم قرارًا تقديريًا إيجابيًا؟"
    },
    "type": "textarea"
   },
   {
    "id": "q34",
    "q": {
     "en": "Do you want an EAD if deferred action is granted?",
     "ar": "هل ترغب في الحصول على EAD إذا تم منح الإجراء المؤجل؟"
    },
    "type": "yesno"
   },
   {
    "id": "q35",
    "q": {
     "en": "If yes to EAD: annual income",
     "ar": "إذا كانت الإجابة نعم لـ EAD: الدخل السنوي"
    },
    "type": "text"
   },
   {
    "id": "q36",
    "q": {
     "en": "If yes to EAD: annual expenses",
     "ar": "إذا كانت الإجابة نعم لـ EAD: المصروفات السنوية"
    },
    "type": "text"
   },
   {
    "id": "q37",
    "q": {
     "en": "If yes to EAD: assets",
     "ar": "إذا كانت الإجابة نعم لـ EAD: الأصول"
    },
    "type": "text"
   },
   {
    "id": "q38",
    "q": {
     "en": "If yes to EAD: explanation of economic need",
     "ar": "إذا كانت الإجابة نعم لـ EAD: شرح الحاجة الاقتصادية"
    },
    "type": "textarea"
   },
   {
    "id": "q39",
    "q": {
     "en": "If requesting an EAD: existing SSN",
     "ar": "إذا كنت تطلب EAD: رقم الضمان الاجتماعي (SSN) الحالي"
    },
    "type": "text"
   },
   {
    "id": "q40",
    "q": {
     "en": "If requesting an EAD: Is a Social Security card requested?",
     "ar": "إذا كنت تطلب EAD: هل تطلب بطاقة ضمان اجتماعي؟"
    },
    "type": "yesno"
   },
   {
    "id": "q41",
    "q": {
     "en": "If requesting an EAD: consent to information sharing for Social Security",
     "ar": "إذا كنت تطلب EAD: موافقة على مشاركة المعلومات للضمان الاجتماعي"
    },
    "type": "yesno"
   },
   {
    "id": "q42",
    "q": {
     "en": "Contact details",
     "ar": "تفاصيل الاتصال"
    },
    "type": "textarea"
   },
   {
    "id": "q43",
    "q": {
     "en": "Interpreter/preparer information, if applicable",
     "ar": "معلومات المترجم/المُعدّ، إذا كان ذلك ينطبق"
    },
    "type": "textarea"
   },
   {
    "id": "q44",
    "q": {
     "en": "Applicant’s review, signature, and date",
     "ar": "مراجعة مقدم الطلب، التوقيع، والتاريخ"
    },
    "type": "text"
   },
   {
    "id": "q45",
    "q": {
     "en": "Have you ever been arrested or involved in criminal cases?",
     "ar": "هل سبق أن تم إلقاء القبض عليك أو تورطت في قضايا جنائية؟"
    },
    "type": "yesno"
   },
   {
    "id": "q46",
    "q": {
     "en": "Have you ever had immigration violations?",
     "ar": "هل سبق أن ارتكبت انتهاكات للهجرة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q47",
    "q": {
     "en": "Have you ever had previous denials of immigration benefits?",
     "ar": "هل سبق أن تم رفض طلبات منافع الهجرة الخاصة بك؟"
    },
    "type": "yesno"
   },
   {
    "id": "q48",
    "q": {
     "en": "Are you currently in or have you ever been in removal proceedings?",
     "ar": "هل أنت حاليًا أو سبق أن كنت في إجراءات الترحيل؟"
    },
    "type": "yesno"
   }
  ],
  "docs": [
   {
    "en": "Completed and signed G-325A",
    "ar": "نموذج G-325A مكتمل وموقع"
   },
   {
    "en": "Supporting statement explaining the request and reasons for favorable discretion",
    "ar": "بيان داعم يشرح الطلب وأسباب تقدير إيجابي"
   },
   {
    "en": "Identity and nationality evidence (e.g., passport, national ID, birth certificate)",
    "ar": "إثبات الهوية والجنسية (مثل جواز السفر، الهوية الوطنية، شهادة الميلاد)"
   },
   {
    "en": "I-94, if applicable",
    "ar": "نموذج I-94، إن وجد"
   },
   {
    "en": "Visa/entry stamps, if applicable",
    "ar": "تأشيرات/أختام الدخول، إن وجدت"
   },
   {
    "en": "USCIS notices, if applicable",
    "ar": "إشعارات USCIS، إن وجدت"
   },
   {
    "en": "Previous EAD, if applicable",
    "ar": "تصريح عمل EAD سابق، إن وجد"
   },
   {
    "en": "Relevant immigration records, if applicable",
    "ar": "سجلات الهجرة ذات الصلة، إن وجدت"
   },
   {
    "en": "Previous deferred-action approval (for a subsequent request)",
    "ar": "موافقة سابقة على الإجراء المؤجل (لطلب لاحق)"
   },
   {
    "en": "Evidence supporting the request (depends on the category)",
    "ar": "أدلة تدعم الطلب (تعتمد على الفئة)"
   },
   {
    "en": "English translations for foreign-language documents, with required translator certification",
    "ar": "ترجمات إنجليزية للمستندات باللغات الأجنبية، مع شهادة المترجم المطلوبة"
   },
   {
    "en": "Representation form (if an eligible attorney or accredited representative is representing the applicant)",
    "ar": "نموذج التمثيل (إذا كان محامٍ مؤهل أو ممثل معتمد يمثل مقدم الطلب)"
   },
   {
    "en": "Fee/payment or fee-waiver materials (if requesting employment authorization and required)",
    "ar": "مواد الرسوم/الدفع أو الإعفاء من الرسوم (إذا كان يطلب تصريح عمل ومطلوب)"
   },
   {
    "en": "Doctor’s letter (Medical / humanitarian reason)",
    "ar": "رسالة طبيب (لسبب طبي/إنساني)"
   },
   {
    "en": "Diagnosis and treatment records (Medical / humanitarian reason)",
    "ar": "سجلات التشخيص والعلاج (لسبب طبي/إنساني)"
   },
   {
    "en": "Treatment plan (Medical / humanitarian reason)",
    "ar": "خطة العلاج (لسبب طبي/إنساني)"
   },
   {
    "en": "Consequences of interruption of treatment (Medical / humanitarian reason)",
    "ar": "عواقب انقطاع العلاج (لسبب طبي/إنساني)"
   },
   {
    "en": "Evidence explaining humanitarian circumstances (Medical / humanitarian reason)",
    "ar": "أدلة تشرح الظروف الإنسانية (لسبب طبي/إنساني)"
   },
   {
    "en": "Military service records (Military-family connection)",
    "ar": "سجلات الخدمة العسكرية (للاتصال العائلي العسكري)"
   },
   {
    "en": "Marriage/birth records proving qualifying relationship (Military-family connection)",
    "ar": "سجلات الزواج/الميلاد التي تثبت العلاقة المؤهلة (للاتصال العائلي العسكري)"
   },
   {
    "en": "Relevant discharge records and other category-specific evidence (Military-family connection)",
    "ar": "سجلات التسريح ذات الصلة وغيرها من الأدلة الخاصة بالفئة (للاتصال العائلي العسكري)"
   },
   {
    "en": "Supporting labor-agency statement (Labor investigation)",
    "ar": "بيان داعم من وكالة العمل (لتحقيق عمالي)"
   },
   {
    "en": "Evidence connecting the applicant to the investigation, such as employment records (Labor investigation)",
    "ar": "أدلة تربط مقدم الطلب بالتحقيق، مثل سجلات العمل (لتحقيق عمالي)"
   },
   {
    "en": "Supporting government-agency statement addressed to DHS (Government referral)",
    "ar": "بيان داعم من وكالة حكومية موجه إلى DHS (لإحالة حكومية)"
   },
   {
    "en": "Evidence explaining the request (Government referral)",
    "ar": "أدلة تشرح الطلب (لإحالة حكومية)"
   },
   {
    "en": "Documents supporting specific facts, such as caregiving responsibilities, family hardship, or relevant community ties (Other discretionary circumstances)",
    "ar": "وثائق تدعم حقائق محددة، مثل مسؤوليات الرعاية، أو الصعوبات العائلية، أو الروابط المجتمعية ذات الصلة (لظروف تقديرية أخرى)"
   }
  ]
 },
 {
  "code": "G-325R",
  "title": {
   "en": "Biographic Information — Registration",
   "ar": "معلومات السيرة الذاتية - التسجيل"
  },
  "questions": [
   {
    "id": "q1_inside_us",
    "q": {
     "en": "Are you currently inside the United States?",
     "ar": "هل أنت حاليًا داخل الولايات المتحدة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q2_age_dob",
    "q": {
     "en": "What is your age and date of birth?",
     "ar": "ما هو عمرك وتاريخ ميلادك؟"
    },
    "type": "text"
   },
   {
    "id": "q3_arrival_stay",
    "q": {
     "en": "When did you arrive, and how long will you stay?",
     "ar": "متى وصلت، وكم المدة التي ستبقى فيها؟"
    },
    "type": "text"
   },
   {
    "id": "q4_received_documents",
    "q": {
     "en": "Have you ever received an I-94, green card, EAD, or Border Crossing Card?",
     "ar": "هل تلقيت من قبل I-94، أو بطاقة خضراء (Green Card)، أو تصريح عمل (EAD)، أو بطاقة عبور الحدود (Border Crossing Card)؟"
    },
    "type": "yesno"
   },
   {
    "id": "q5_us_visa_before",
    "q": {
     "en": "Were you issued a U.S. visa before your latest arrival?",
     "ar": "هل صدرت لك تأشيرة أمريكية قبل وصولك الأخير؟"
    },
    "type": "yesno"
   },
   {
    "id": "q6_previously_registered",
    "q": {
     "en": "Have you previously registered or provided immigration fingerprints?",
     "ar": "هل سجلت مسبقًا أو قدمت بصمات الهجرة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q7_filed_application_removal",
    "q": {
     "en": "Have you filed an immigration application or been placed in removal proceedings?",
     "ar": "هل قدمت طلب هجرة أو وُضعت في إجراءات الترحيل؟"
    },
    "type": "yesno"
   },
   {
    "id": "q8_turned_14_us",
    "q": {
     "en": "Have you recently turned 14 while in the U.S.?",
     "ar": "هل بلغت 14 عامًا مؤخرًا وأنت في الولايات المتحدة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q9_under_14_guardian",
    "q": {
     "en": "If under 14, who is the parent/legal guardian submitting?",
     "ar": "إذا كنت أقل من 14 عامًا، فمن هو الوالد/الوصي القانوني الذي يقوم بالتقديم؟"
    },
    "type": "text"
   },
   {
    "id": "q10_full_legal_name",
    "q": {
     "en": "What is your full legal name?",
     "ar": "ما هو اسمك القانوني الكامل؟"
    },
    "type": "text"
   },
   {
    "id": "q11_other_names",
    "q": {
     "en": "What are all your other names?",
     "ar": "ما هي جميع أسماؤك الأخرى؟"
    },
    "type": "text"
   },
   {
    "id": "q12_dob_pob",
    "q": {
     "en": "What is your date and place of birth?",
     "ar": "ما هو تاريخ ومكان ميلادك؟"
    },
    "type": "text"
   },
   {
    "id": "q13_citizenship_nationality",
    "q": {
     "en": "What is your citizenship/nationality?",
     "ar": "ما هي جنسيتك؟"
    },
    "type": "text"
   },
   {
    "id": "q14_a_number",
    "q": {
     "en": "What is your A-Number, if assigned?",
     "ar": "ما هو رقم A-Number الخاص بك، إذا كان مخصصًا؟"
    },
    "type": "text"
   },
   {
    "id": "q15_uscis_online_account_number",
    "q": {
     "en": "What is your USCIS online account number, if assigned?",
     "ar": "ما هو رقم حسابك عبر الإنترنت في USCIS، إذا كان مخصصًا؟"
    },
    "type": "text"
   },
   {
    "id": "q16_current_address",
    "q": {
     "en": "What is your current physical and mailing address?",
     "ar": "ما هو عنوانك الفعلي والبريدي الحالي؟"
    },
    "type": "text"
   },
   {
    "id": "q17_previous_addresses",
    "q": {
     "en": "What are your addresses for the previous five years, and the dates you lived there?",
     "ar": "ما هي عناوينك للسنوات الخمس الماضية، وتواريخ إقامتك فيها؟"
    },
    "type": "textarea"
   },
   {
    "id": "q18_latest_entry_details",
    "q": {
     "en": "What are the details of your latest entry: date, location, status at entry, status expiration, and I-94 details?",
     "ar": "ما هي تفاصيل دخولك الأخير: التاريخ، المكان، الحالة عند الدخول، تاريخ انتهاء الحالة، وتفاصيل I-94؟"
    },
    "type": "textarea"
   },
   {
    "id": "q19_activities_since_entry",
    "q": {
     "en": "What activities have you engaged in since entry?",
     "ar": "ما هي الأنشطة التي مارستها منذ الدخول؟"
    },
    "type": "textarea"
   },
   {
    "id": "q20_intended_activities",
    "q": {
     "en": "What are your intended activities, expected length of stay, and departure date?",
     "ar": "ما هي أنشطتك المعتزمة، ومدة الإقامة المتوقعة، وتاريخ المغادرة؟"
    },
    "type": "textarea"
   },
   {
    "id": "q21_parents_details",
    "q": {
     "en": "What are your parents' names, birth details, and current residence if living?",
     "ar": "ما هي أسماء والديك، وتفاصيل ميلادهما، ومكان إقامتهما الحالي إذا كانا على قيد الحياة؟"
    },
    "type": "textarea"
   },
   {
    "id": "q22_marital_status",
    "q": {
     "en": "What is your marital status?",
     "ar": "ما هي حالتك الاجتماعية؟"
    },
    "type": "text"
   },
   {
    "id": "q23_spouse_details",
    "q": {
     "en": "What is your current spouse’s name, birth details, and your marriage date and place?",
     "ar": "ما هو اسم زوجك الحالي، وتفاصيل ميلاده، وتاريخ ومكان زواجكما؟"
    },
    "type": "textarea"
   },
   {
    "id": "q24_physical_description",
    "q": {
     "en": "What is your sex, ethnicity, race, height, weight, eye color, and hair color?",
     "ar": "ما هو جنسك، عرقك، سلالتك، طولك، وزنك، لون عينيك، ولون شعرك؟"
    },
    "type": "text"
   },
   {
    "id": "q25_criminal_history",
    "q": {
     "en": "Do you have any criminal history? Answer every current online question individually and explain applicable answers.",
     "ar": "هل لديك أي سجل جنائي؟ أجب على كل سؤال متاح عبر الإنترنت بشكل فردي واشرح الإجابات المنطبقة."
    },
    "type": "textarea"
   },
   {
    "id": "q26_contact_details",
    "q": {
     "en": "What are your contact details?",
     "ar": "ما هي تفاصيل الاتصال بك؟"
    },
    "type": "text"
   },
   {
    "id": "q27_declarations_signature",
    "q": {
     "en": "Have you reviewed and electronically signed the required declarations?",
     "ar": "هل قمت بمراجعة وتوقيع الإقرارات المطلوبة إلكترونيًا؟"
    },
    "type": "yesno"
   }
  ],
  "docs": [
   {
    "en": "Passport or government ID",
    "ar": "جواز السفر أو بطاقة الهوية الحكومية"
   },
   {
    "en": "I-94, visa and entry stamps",
    "ar": "نموذج I-94، التأشيرة، وأختام الدخول"
   },
   {
    "en": "Green card, EAD, Border Crossing Card, or previous registration proof",
    "ar": "البطاقة الخضراء (Green Card)، تصريح العمل (EAD)، بطاقة عبور الحدود (Border Crossing Card)، أو دليل التسجيل السابق"
   },
   {
    "en": "Previous USCIS/immigration records",
    "ar": "سجلات USCIS/الهجرة السابقة"
   },
   {
    "en": "Birth certificate/guardianship evidence (for a child)",
    "ar": "شهادة الميلاد/إثبات الوصاية (للطفل)"
   },
   {
    "en": "Criminal/court records (if applicable)",
    "ar": "سجلات الجرائم/المحكمة (إذا انطبق ذلك)"
   },
   {
    "en": "G-28 (if represented by legal counsel)",
    "ar": "نموذج G-28 (إذا كان ممثلاً بمستشار قانوني)"
   },
   {
    "en": "English translations for foreign-language documents",
    "ar": "الترجمات الإنجليزية للوثائق باللغات الأجنبية"
   }
  ]
 },
 {
  "code": "G-639",
  "title": {
   "en": "Freedom of Information / Privacy Act Request",
   "ar": "طلب قانون حرية المعلومات / قانون الخصوصية"
  },
  "questions": [
   {
    "id": "request_type",
    "q": {
     "en": "Are you requesting your own records, someone else’s records with consent, a deceased person’s records, or agency records?",
     "ar": "هل تطلب سجلاتك الخاصة، أم سجلات شخص آخر بموافقته، أم سجلات شخص متوفى، أم سجلات جهة حكومية؟"
    },
    "type": "text"
   },
   {
    "id": "records_wanted",
    "q": {
     "en": "Do you want the entire A-File or specific documents? If specific, please identify form numbers, decisions, correspondence, interview records, and relevant dates.",
     "ar": "هل ترغب في الحصول على الملف A-File بالكامل أم وثائق محددة؟ إذا كانت وثائق محددة، يرجى تحديد أرقام النماذج والقرارات والمراسلات وسجلات المقابلات والتواريخ ذات الصلة."
    },
    "type": "textarea"
   },
   {
    "id": "subject_full_name",
    "q": {
     "en": "What is the subject's full legal name?",
     "ar": "ما هو الاسم القانوني الكامل للشخص المعني؟"
    },
    "type": "text"
   },
   {
    "id": "subject_other_names",
    "q": {
     "en": "What other names has the subject used?",
     "ar": "ما هي الأسماء الأخرى التي استخدمها الشخص المعني؟"
    },
    "type": "text"
   },
   {
    "id": "subject_dob",
    "q": {
     "en": "What is the subject's date of birth?",
     "ar": "ما هو تاريخ ميلاد الشخص المعني؟"
    },
    "type": "date"
   },
   {
    "id": "subject_pob",
    "q": {
     "en": "What is the subject's place of birth?",
     "ar": "ما هو مكان ميلاد الشخص المعني؟"
    },
    "type": "text"
   },
   {
    "id": "subject_current_address",
    "q": {
     "en": "What is the subject's current address?",
     "ar": "ما هو العنوان الحالي للشخص المعني؟"
    },
    "type": "text"
   },
   {
    "id": "search_a_number",
    "q": {
     "en": "What is the subject's A-Number?",
     "ar": "ما هو رقم A-Number الخاص بالشخص المعني؟"
    },
    "type": "text"
   },
   {
    "id": "search_uscis_receipt_numbers",
    "q": {
     "en": "What are the USCIS receipt numbers?",
     "ar": "ما هي أرقام إيصالات USCIS؟"
    },
    "type": "text"
   },
   {
    "id": "search_other_identifiers",
    "q": {
     "en": "Are there any other relevant identifiers?",
     "ar": "هل توجد أي معرفات أخرى ذات صلة؟"
    },
    "type": "text"
   },
   {
    "id": "additional_search_previous_names_addresses",
    "q": {
     "en": "Are there any previous names or addresses that would be useful for the search?",
     "ar": "هل توجد أي أسماء أو عناوين سابقة قد تكون مفيدة للبحث؟"
    },
    "type": "text"
   },
   {
    "id": "additional_search_immigration_naturalization_dates",
    "q": {
     "en": "Are there any relevant immigration or naturalization dates that would be useful for the search?",
     "ar": "هل توجد أي تواريخ هجرة أو تجنيس ذات صلة قد تكون مفيدة للبحث؟"
    },
    "type": "text"
   },
   {
    "id": "requester_name",
    "q": {
     "en": "What is your (the requester's) full name?",
     "ar": "ما هو اسمك الكامل (مقدم الطلب)؟"
    },
    "type": "text"
   },
   {
    "id": "requester_organization",
    "q": {
     "en": "What is your organization, if applicable?",
     "ar": "ما هي منظمتك، إن وجدت؟"
    },
    "type": "text"
   },
   {
    "id": "requester_mailing_address",
    "q": {
     "en": "What is your mailing address?",
     "ar": "ما هو عنوانك البريدي؟"
    },
    "type": "text"
   },
   {
    "id": "requester_email",
    "q": {
     "en": "What is your email address?",
     "ar": "ما هو عنوان بريدك الإلكتروني؟"
    },
    "type": "text"
   },
   {
    "id": "requester_telephone",
    "q": {
     "en": "What is your telephone number?",
     "ar": "ما هو رقم هاتفك؟"
    },
    "type": "text"
   },
   {
    "id": "requester_relationship_to_subject",
    "q": {
     "en": "What is your relationship to the subject?",
     "ar": "ما هي صلتك بالشخص المعني؟"
    },
    "type": "text"
   },
   {
    "id": "consent_recipient",
    "q": {
     "en": "Who should receive the records?",
     "ar": "من يجب أن يستلم السجلات؟"
    },
    "type": "text"
   },
   {
    "id": "consent_subject_release_declaration",
    "q": {
     "en": "Has the subject signed the required release and identity declaration?",
     "ar": "هل وقع الشخص المعني على تصريح الإفراج والهوية المطلوبين؟"
    },
    "type": "yesno"
   },
   {
    "id": "child_guardianship_requester_parent_guardian",
    "q": {
     "en": "Is the requester a parent or legal guardian?",
     "ar": "هل مقدم الطلب والد أو وصي قانوني؟"
    },
    "type": "yesno"
   },
   {
    "id": "child_guardianship_proof",
    "q": {
     "en": "What document proves the parentage or guardianship relationship?",
     "ar": "ما هي الوثيقة التي تثبت العلاقة الأبوية أو الوصاية؟"
    },
    "type": "text"
   },
   {
    "id": "deceased_subject_date_of_death",
    "q": {
     "en": "What is the date of death for the deceased subject?",
     "ar": "ما هو تاريخ وفاة الشخص المتوفى المعني؟"
    },
    "type": "date"
   },
   {
    "id": "deceased_subject_proof",
    "q": {
     "en": "Is proof of death available for the deceased subject?",
     "ar": "هل يتوفر إثبات وفاة للشخص المتوفى المعني؟"
    },
    "type": "yesno"
   },
   {
    "id": "urgency_immigration_hearing",
    "q": {
     "en": "Is there an upcoming immigration hearing?",
     "ar": "هل توجد جلسة استماع قادمة للهجرة؟"
    },
    "type": "yesno"
   },
   {
    "id": "urgency_expedited_processing_basis",
    "q": {
     "en": "Is there any qualifying basis for expedited processing?",
     "ar": "هل يوجد أي أساس مؤهل لمعالجة الطلب بسرعة؟"
    },
    "type": "yesno"
   },
   {
    "id": "previous_request_foia_control_number",
    "q": {
     "en": "Is there an existing FOIA control number?",
     "ar": "هل يوجد رقم تحكم حالي لـ FOIA؟"
    },
    "type": "text"
   },
   {
    "id": "previous_request_scope",
    "q": {
     "en": "What was the scope of the previous request (to avoid duplicates)?",
     "ar": "ما هو نطاق الطلب السابق (لتجنب التكرار)؟"
    },
    "type": "textarea"
   },
   {
    "id": "correction_request_disputed_info",
    "q": {
     "en": "If seeking a Privacy Act correction, identify the disputed information.",
     "ar": "إذا كنت تسعى لتصحيح بموجب قانون الخصوصية، حدد المعلومات المتنازع عليها."
    },
    "type": "textarea"
   },
   {
    "id": "correction_request_correction_wanted",
    "q": {
     "en": "If seeking a Privacy Act correction, what is the requested correction?",
     "ar": "إذا كنت تسعى لتصحيح بموجب قانون الخصوصية، فما هو التصحيح المطلوب؟"
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Identity verification (for requesting your own records)",
    "ar": "إثبات الهوية (لطلب سجلاتك الخاصة)"
   },
   {
    "en": "Signed identity/consent statement from the subject authorizing release to the requester and affirming accuracy (for requesting another living person’s records)",
    "ar": "بيان هوية/موافقة موقع من الشخص المعني يصرح بالإفراج عن السجلات لمقدم الطلب ويؤكد دقتها (لطلب سجلات شخص حي آخر)"
   },
   {
    "en": "Declaration under penalty of perjury OR notarized identity affidavit (for signature verification, notarization is not automatically required when using the permitted perjury declaration)",
    "ar": "إقرار تحت طائلة عقوبة الحنث باليمين أو إفادة هوية موثقة (للتوثق من التوقيع، التوثيق ليس مطلوبًا تلقائيًا عند استخدام إقرار الحنث باليمين المسموح به)"
   },
   {
    "en": "Proof of parentage/guardianship, such as a birth certificate or court order (for parent/legal guardian requesting a child's records)",
    "ar": "إثبات الأبوة/الوصاية، مثل شهادة ميلاد أو أمر محكمة (للوالد/الوصي القانوني الذي يطلب سجلات طفل)"
   },
   {
    "en": "Proof of death, such as a death certificate or obituary (for deceased person's records)",
    "ar": "إثبات الوفاة، مثل شهادة وفاة أو نعي (لسجلات شخص متوفى)"
   },
   {
    "en": "Separate signed consents for other family members where disclosure of their private information is requested",
    "ar": "موافقات موقعة منفصلة لأفراد الأسرة الآخرين حيث يُطلب الكشف عن معلوماتهم الخاصة"
   },
   {
    "en": "Qualifying notice showing the immigration proceeding/hearing, such as I-862, I-863, or hearing-continuation notice (for upcoming immigration court proceeding)",
    "ar": "إشعار مؤهل يوضح إجراء/جلسة استماع الهجرة، مثل I-862 أو I-863 أو إشعار استمرار الجلسة (لإجراء محكمة الهجرة القادم)"
   },
   {
    "en": "Detailed explanation of the qualifying reason and supporting evidence (for expedited processing)",
    "ar": "شرح مفصل للسبب المؤهل والأدلة الداعمة (للمعالجة المعجلة)"
   },
   {
    "en": "Evidence supporting the requested correction (for Privacy Act correction)",
    "ar": "أدلة تدعم التصحيح المطلوب (لتصحيح بموجب قانون الخصوصية)"
   },
   {
    "en": "Complete English translation with appropriate translator certification (for foreign-language evidence)",
    "ar": "ترجمة إنجليزية كاملة مع شهادة مترجم مناسبة (للأدلة باللغة الأجنبية)"
   },
   {
    "en": "USCIS receipt notices (to verify case numbers, if needed)",
    "ar": "إشعارات استلام USCIS (للتحقق من أرقام الحالات، إذا لزم الأمر)"
   },
   {
    "en": "Immigration documents showing the A-Number (if needed)",
    "ar": "وثائق الهجرة التي تظهر رقم A-Number (إذا لزم الأمر)"
   },
   {
    "en": "Relevant decisions or correspondence (to define the requested records, if needed)",
    "ar": "القرارات أو المراسلات ذات الصلة (لتحديد السجلات المطلوبة، إذا لزم الأمر)"
   },
   {
    "en": "Existing FOIA acknowledgments (to check for duplicate requests, if needed)",
    "ar": "إقرارات FOIA الموجودة (للتحقق من الطلبات المكررة، إذا لزم الأمر)"
   }
  ]
 },
 {
  "code": "G-884",
  "title": {
   "en": "Request for the Return of Original Documents",
   "ar": "طلب استعادة المستندات الأصلية"
  },
  "questions": [
   {
    "id": "full_legal_name",
    "q": {
     "en": "What is your full legal name?",
     "ar": "ما هو اسمك القانوني الكامل؟"
    },
    "type": "text"
   },
   {
    "id": "birth_details",
    "q": {
     "en": "What are your birth details?",
     "ar": "ما هي تفاصيل ميلادك؟ (التاريخ، المدينة، البلد)"
    },
    "type": "text"
   },
   {
    "id": "uscis_identifiers",
    "q": {
     "en": "What are your USCIS identifiers?",
     "ar": "ما هي معرّفاتك لدى USCIS؟ (رقم A-Number، رقم الحساب عبر الإنترنت، رقم الإيصال)"
    },
    "type": "text"
   },
   {
    "id": "return_address",
    "q": {
     "en": "Where should USCIS return the documents?",
     "ar": "أين يجب على USCIS إعادة المستندات؟ (عنوان بريدي كامل في الولايات المتحدة واسم المستلم إن أمكن)"
    },
    "type": "textarea"
   },
   {
    "id": "originals_to_return",
    "q": {
     "en": "Which originals do you want returned?",
     "ar": "ما هي المستندات الأصلية التي ترغب في استعادتها؟ (نوع المستند، اسم الشخص المذكور، الجهة المصدرة، التاريخ، الرقم التعريفي إن وجد)"
    },
    "type": "textarea"
   },
   {
    "id": "subject_file_info",
    "q": {
     "en": "Whose USCIS file contains them?",
     "ar": "ملف أي شخص في USCIS يحتوي عليها؟ (اسم صاحب الملف، تفاصيل الميلاد، A-Number، ومعلومات تعريفية أخرى)"
    },
    "type": "text"
   },
   {
    "id": "submission_details",
    "q": {
     "en": "When and with which application were they submitted?",
     "ar": "متى وبأي طلب تم تقديمها؟ (رقم النموذج، تاريخ التقديم، رقم الإيصال)"
    },
    "type": "text"
   },
   {
    "id": "uscis_requested_originals",
    "q": {
     "en": "Did USCIS specifically request the originals?",
     "ar": "هل طلبت USCIS المستندات الأصلية على وجه التحديد؟"
    },
    "type": "yesno"
   },
   {
    "id": "case_status",
    "q": {
     "en": "Is the case pending or completed?",
     "ar": "هل القضية قيد الانتظار أم اكتملت؟ (آخر إشعار والمكتب الذي يتعامل مع القضية)"
    },
    "type": "text"
   },
   {
    "id": "documents_in_one_file",
    "q": {
     "en": "Are the documents in one USCIS file or several?",
     "ar": "هل المستندات موجودة في ملف واحد لدى USCIS أم في عدة ملفات؟ (حدد كل ملف)"
    },
    "type": "text"
   },
   {
    "id": "requesting_from_another_file",
    "q": {
     "en": "Are you requesting from someone else’s file?",
     "ar": "هل تطلب المستندات من ملف شخص آخر؟ (العلاقة والسلطة للطلب)"
    },
    "type": "text"
   },
   {
    "id": "subject_deceased_incapacitated",
    "q": {
     "en": "Is the subject deceased or incapacitated?",
     "ar": "هل صاحب الملف متوفى أم فاقد للأهلية؟ (وثائق السلطة ذات الصلة)"
    },
    "type": "yesno"
   },
   {
    "id": "have_two_ids",
    "q": {
     "en": "Do you have two acceptable IDs?",
     "ar": "هل لديك بطاقتي هوية مقبولتين؟ (حدد كليهما)"
    },
    "type": "yesno"
   },
   {
    "id": "interpreter_preparer_assisted",
    "q": {
     "en": "Did an interpreter or preparer assist?",
     "ar": "هل قام مترجم فوري أو مُحضِّر بمساعدتك؟ (تفاصيلهم والتوقيعات المطلوبة)"
    },
    "type": "text"
   },
   {
    "id": "contact_details",
    "q": {
     "en": "What are your contact details?",
     "ar": "ما هي تفاصيل الاتصال الخاصة بك؟ (رقم الهاتف والبريد الإلكتروني)"
    },
    "type": "text"
   }
  ],
  "docs": [
   {
    "en": "Completed G-884",
    "ar": "نموذج G-884 مكتمل وموقع"
   },
   {
    "en": "Notarization (for mailed submissions)",
    "ar": "توثيق (لعمليات الإرسال البريدي)"
   },
   {
    "en": "Copies of two acceptable IDs",
    "ar": "نسخ من بطاقتي هوية مقبولتين"
   },
   {
    "en": "Proof of relationship (when requesting from another person’s file)",
    "ar": "إثبات العلاقة (عند طلب المستندات من ملف شخص آخر)"
   },
   {
    "en": "Authority evidence (for a deceased/incapacitated subject)",
    "ar": "إثبات السلطة (لصاحب الملف المتوفى/فاقد الأهلية)"
   },
   {
    "en": "Additional-information sheets (if necessary)",
    "ar": "صفحات معلومات إضافية (إذا لزم الأمر)"
   },
   {
    "en": "Receipt, approval, decision, and transfer notices",
    "ar": "إشعارات الاستلام، الموافقة، القرار، والتحويل"
   },
   {
    "en": "Copies or scans of the originals being requested",
    "ar": "نسخ أو مسح ضوئي للمستندات الأصلية المطلوبة"
   },
   {
    "en": "Cover letter or document inventory from the original submission",
    "ar": "خطاب تغطية أو قائمة جرد المستندات من التقديم الأصلي"
   },
   {
    "en": "Delivery evidence and correspondence about the originals",
    "ar": "إثبات التسليم والمراسلات المتعلقة بالأصول"
   },
   {
    "en": "Certified English translation (for foreign-language supporting evidence)",
    "ar": "ترجمة إنجليزية معتمدة (للمستندات الداعمة باللغة الأجنبية)"
   }
  ]
 },
 {
  "code": "G-1041",
  "title": {
   "en": "Genealogy Index Search Request",
   "ar": "طلب البحث في فهرس الأنساب"
  },
  "questions": [
   {
    "id": "requesters_full_name",
    "q": {
     "en": "Requester’s full name",
     "ar": "الاسم الكامل للمُقدِّم"
    },
    "type": "text"
   },
   {
    "id": "requesters_mailing_address",
    "q": {
     "en": "Requester’s mailing address",
     "ar": "العنوان البريدي للمُقدِّم"
    },
    "type": "text"
   },
   {
    "id": "requesters_telephone",
    "q": {
     "en": "Requester’s telephone",
     "ar": "رقم هاتف المُقدِّم"
    },
    "type": "text"
   },
   {
    "id": "requesters_email",
    "q": {
     "en": "Requester’s email",
     "ar": "البريد الإلكتروني للمُقدِّم"
    },
    "type": "text"
   },
   {
    "id": "immigrants_full_name",
    "q": {
     "en": "Immigrant’s full name",
     "ar": "الاسم الكامل للمهاجر"
    },
    "type": "text"
   },
   {
    "id": "other_names_used",
    "q": {
     "en": "Other names used (Maiden, aliases, alternate spellings, Americanized names)",
     "ar": "أسماء أخرى استُخدمت (اسم العائلة قبل الزواج، أسماء مستعارة، تهجئات بديلة، أسماء أمريكية)"
    },
    "type": "textarea"
   },
   {
    "id": "immigrants_birth_date",
    "q": {
     "en": "Immigrant’s birth date (Exact date or estimated birth year)",
     "ar": "تاريخ ميلاد المهاجر (تاريخ دقيق أو سنة ميلاد تقديرية)"
    },
    "type": "text"
   },
   {
    "id": "is_birth_date_estimated",
    "q": {
     "en": "Is the birth date estimated?",
     "ar": "هل تاريخ الميلاد تقديري؟"
    },
    "type": "yesno"
   },
   {
    "id": "immigrants_birth_country",
    "q": {
     "en": "Immigrant’s birth country",
     "ar": "بلد ميلاد المهاجر"
    },
    "type": "text"
   },
   {
    "id": "immigrants_birth_town_village_province",
    "q": {
     "en": "Immigrant’s birth town/village and province (if known)",
     "ar": "مدينة/قرية ومقاطعة ميلاد المهاجر (إذا كانت معروفة)"
    },
    "type": "text"
   },
   {
    "id": "immigrants_arrival_date_in_us",
    "q": {
     "en": "Immigrant’s arrival date in the U.S. (Actual or estimated)",
     "ar": "تاريخ وصول المهاجر إلى الولايات المتحدة (فعلي أو تقديري)"
    },
    "type": "text"
   },
   {
    "id": "immigrants_arrival_port_and_ship",
    "q": {
     "en": "Immigrant’s arrival port of entry and ship (if known)",
     "ar": "ميناء الدخول والسفينة التي وصل عليها المهاجر (إذا كانت معروفة)"
    },
    "type": "text"
   },
   {
    "id": "immigrants_addresses_in_us",
    "q": {
     "en": "Immigrant’s addresses, cities/states, and approximate dates of residence in the U.S.",
     "ar": "عناوين المهاجر، المدن/الولايات، والتواريخ التقريبية للإقامة في الولايات المتحدة"
    },
    "type": "textarea"
   },
   {
    "id": "was_immigrant_naturalized",
    "q": {
     "en": "Was the immigrant naturalized?",
     "ar": "هل تم تجنيس المهاجر؟"
    },
    "type": "yesno"
   },
   {
    "id": "naturalization_details",
    "q": {
     "en": "Naturalization date, court/location, and certificate details (if known)",
     "ar": "تاريخ التجنيس، المحكمة/الموقع، وتفاصيل الشهادة (إذا كانت معروفة)"
    },
    "type": "textarea"
   },
   {
    "id": "is_immigrant_deceased",
    "q": {
     "en": "Is the immigrant deceased?",
     "ar": "هل المهاجر متوفى؟"
    },
    "type": "yesno"
   },
   {
    "id": "date_of_death_and_evidence",
    "q": {
     "en": "Date of death and available evidence",
     "ar": "تاريخ الوفاة والأدلة المتاحة"
    },
    "type": "textarea"
   },
   {
    "id": "known_immigration_file_numbers",
    "q": {
     "en": "Do you know any immigration file numbers? (A-Number, certificate number, or historical file references)",
     "ar": "هل تعرف أي أرقام ملفات هجرة؟ (رقم A، رقم الشهادة، أو مراجع ملفات تاريخية)"
    },
    "type": "textarea"
   },
   {
    "id": "previously_requested_search",
    "q": {
     "en": "Have you previously requested a search?",
     "ar": "هل طلبت بحثًا سابقًا؟"
    },
    "type": "yesno"
   },
   {
    "id": "previous_search_request_number_and_response",
    "q": {
     "en": "Previous search request number and response (if available)",
     "ar": "رقم طلب البحث السابق والرد (إذا كان متاحاً)"
    },
    "type": "textarea"
   },
   {
    "id": "additional_distinguishing_information",
    "q": {
     "en": "What additional information distinguishes them? (Family details or other identifying facts)",
     "ar": "ما هي المعلومات الإضافية التي تميزهم؟ (تفاصيل عائلية أو حقائق تعريفية أخرى)"
    },
    "type": "textarea"
   },
   {
    "id": "how_will_you_submit_request",
    "q": {
     "en": "How will you submit the request? (Online or paper)",
     "ar": "كيف ستقدم الطلب؟ (عبر الإنترنت أو ورقيًا)"
    },
    "type": "text"
   }
  ],
  "docs": [
   {
    "en": "Completed G-1041 request (Online submission or signed paper form)",
    "ar": "طلب G-1041 مُكتمل (تقديم عبر الإنترنت أو نموذج ورقي موقع)"
   },
   {
    "en": "Filing fee",
    "ar": "رسوم التقديم"
   },
   {
    "en": "Proof of death (Required if immigrant was born less than 100 years before request date)",
    "ar": "إثبات الوفاة (مطلوب إذا ولد المهاجر قبل أقل من 100 عام من تاريخ الطلب)"
   },
   {
    "en": "Additional information pages (If needed to explain names, dates, or identifying details)",
    "ar": "صفحات معلومات إضافية (إذا لزم الأمر لشرح الأسماء أو التواريخ أو التفاصيل التعريفية)"
   },
   {
    "en": "Birth/baptism record (To verify birth information)",
    "ar": "شهادة الميلاد/العماد (للتحقق من معلومات الميلاد)"
   },
   {
    "en": "Marriage records (To identify name changes)",
    "ar": "سجلات الزواج (لتحديد تغييرات الاسم)"
   },
   {
    "en": "Census records or directories (To establish U.S. residences)",
    "ar": "سجلات التعداد أو الأدلة (لتحديد أماكن الإقامة في الولايات المتحدة)"
   },
   {
    "en": "Passenger/arrival records (To establish arrival details)",
    "ar": "سجلات الركاب/الوصول (لتحديد تفاصيل الوصول)"
   },
   {
    "en": "Naturalization documents (To identify dates, court, and file references)",
    "ar": "وثائق التجنيس (لتحديد التواريخ والمحكمة والمراجع الملفية)"
   },
   {
    "en": "Previous USCIS genealogy response (To avoid repeating a search and identify the next request)",
    "ar": "رد USCIS السابق على طلب الأنساب (لتجنب تكرار البحث وتحديد الطلب التالي)"
   },
   {
    "en": "Family records (To resolve conflicting names or dates)",
    "ar": "سجلات العائلة (لحل تضارب الأسماء أو التواريخ)"
   }
  ]
 },
 {
  "code": "G-1055",
  "title": {
   "en": "G-1055 Fee Schedule",
   "ar": "جدول الرسوم G-1055"
  },
  "questions": [
   {
    "id": "form_number",
    "q": {
     "en": "Which form are you filing?",
     "ar": "ما هو النموذج الذي تتقدمون به؟"
    },
    "type": "text"
   },
   {
    "id": "filing_category",
    "q": {
     "en": "What filing category applies?",
     "ar": "ما هي فئة التقديم المطبقة؟"
    },
    "type": "text"
   },
   {
    "id": "filing_method",
    "q": {
     "en": "How will you file?",
     "ar": "كيف ستقومون بالتقديم؟"
    },
    "type": "text"
   },
   {
    "id": "request_type",
    "q": {
     "en": "Is this an initial application, renewal, or replacement?",
     "ar": "هل هذا طلب أولي أم تجديد أم استبدال؟"
    },
    "type": "text"
   },
   {
    "id": "applicant_age",
    "q": {
     "en": "What is the applicant's age? (Date of birth, where relevant)",
     "ar": "ما هو عمر المتقدم؟ (تاريخ الميلاد، حيثما كان ذلك ذا صلة)"
    },
    "type": "date"
   },
   {
    "id": "related_immigration_status",
    "q": {
     "en": "What immigration status or pending application relates to this filing?",
     "ar": "ما هي حالة الهجرة أو الطلب المعلق الذي يتعلق بهذا التقديم؟"
    },
    "type": "text"
   },
   {
    "id": "forms_filed_together",
    "q": {
     "en": "Are forms being filed together? (Identify each form)",
     "ar": "هل يتم تقديم نماذج معًا؟ (حدد كل نموذج)"
    },
    "type": "text"
   },
   {
    "id": "previous_filing",
    "q": {
     "en": "Was a related application previously filed? (Filing date and receipt information, where relevant)",
     "ar": "هل تم تقديم طلب ذي صلة مسبقًا؟ (تاريخ التقديم ومعلومات الإيصال، حيثما كان ذلك ذا صلة)"
    },
    "type": "text"
   },
   {
    "id": "fee_exemption_reduced",
    "q": {
     "en": "Does a fee exemption or reduced fee apply? (Applicable category and evidence)",
     "ar": "هل ينطبق إعفاء من الرسوم أو رسوم مخفضة؟ (الفئة والأدلة المطبقة)"
    },
    "type": "text"
   },
   {
    "id": "fee_waiver_request",
    "q": {
     "en": "Is the applicant requesting a fee waiver?",
     "ar": "هل يطلب المتقدم إعفاءً من الرسوم؟"
    },
    "type": "yesno"
   },
   {
    "id": "premium_processing",
    "q": {
     "en": "Is premium processing requested?",
     "ar": "هل تم طلب معالجة ممتازة؟"
    },
    "type": "yesno"
   },
   {
    "id": "petitioner_organization",
    "q": {
     "en": "Is the petitioner an employer/organization? (Collect employer size/nonprofit details only where relevant)",
     "ar": "هل مقدم الالتماس صاحب عمل/منظمة؟ (اجمع تفاصيل حجم صاحب العمل/غير الربحية حيثما كان ذلك ذا صلة)"
    },
    "type": "text"
   },
   {
    "id": "filing_submission_date",
    "q": {
     "en": "When will the filing be submitted?",
     "ar": "متى سيتم تقديم الطلب؟"
    },
    "type": "date"
   },
   {
    "id": "government_fee_payment_method",
    "q": {
     "en": "How will the government fee be paid?",
     "ar": "كيف سيتم دفع الرسوم الحكومية؟"
    },
    "type": "text"
   }
  ],
  "docs": [
   {
    "en": "Previous receipt notices",
    "ar": "إشعارات الإيصال السابقة"
   },
   {
    "en": "Relevant status/approval documents",
    "ar": "وثائق الحالة/الموافقة ذات الصلة"
   },
   {
    "en": "Age evidence",
    "ar": "دليل العمر"
   },
   {
    "en": "Employer/nonprofit records",
    "ar": "سجلات صاحب العمل/المنظمة غير الربحية"
   },
   {
    "en": "Income, benefit, or hardship evidence",
    "ar": "دليل الدخل أو المنفعة أو الصعوبة"
   }
  ]
 },
 {
  "code": "G-1145",
  "title": {
   "en": "E-Notification of Application/Petition Acceptance",
   "ar": "إشعار إلكتروني بقبول الطلب/الالتماس"
  },
  "questions": [
   {
    "id": "applicant_petitioner_last_name",
    "q": {
     "en": "Applicant/petitioner’s last name?",
     "ar": "الاسم الأخير لمقدم الطلب/الملتمس؟"
    },
    "type": "text"
   },
   {
    "id": "applicant_petitioner_first_name",
    "q": {
     "en": "First name?",
     "ar": "الاسم الأول؟"
    },
    "type": "text"
   },
   {
    "id": "applicant_petitioner_middle_name",
    "q": {
     "en": "Middle name? (If applicable)",
     "ar": "الاسم الأوسط؟ (إن وجد)"
    },
    "type": "text"
   },
   {
    "id": "email_address_for_notification",
    "q": {
     "en": "Email address for notification? (Check spelling carefully)",
     "ar": "عنوان البريد الإلكتروني للإشعار؟ (يرجى التحقق من التدقيق الإملائي بعناية)"
    },
    "type": "text"
   },
   {
    "id": "mobile_number_for_text_notification",
    "q": {
     "en": "Mobile number for text notification? (If applicable)",
     "ar": "رقم الهاتف المحمول لإشعار الرسائل النصية؟ (إن وجد)"
    },
    "type": "text"
   },
   {
    "id": "is_this_paper_lockbox_filing",
    "q": {
     "en": "Is this a paper Lockbox filing?",
     "ar": "هل هذا ملف ورقي مقدم عبر صندوق البريد (Lockbox)؟"
    },
    "type": "yesno"
   },
   {
    "id": "does_client_want_electronic_notification",
    "q": {
     "en": "Does the client want electronic notification?",
     "ar": "هل يرغب العميل في الحصول على إشعار إلكتروني؟"
    },
    "type": "yesno"
   }
  ],
  "docs": []
 },
 {
  "code": "G-1450",
  "title": {
   "en": "Authorization for Credit Card Transactions",
   "ar": "تفويض لمعاملات بطاقة الائتمان"
  },
  "questions": [
   {
    "id": "g1450_uscis_form_submitting",
    "q": {
     "en": "What USCIS form are you submitting?",
     "ar": "ما هو نموذج USCIS الذي ستقدمه؟"
    },
    "type": "text"
   },
   {
    "id": "g1450_government_filing_fee",
    "q": {
     "en": "What is the correct government filing fee?",
     "ar": "ما هي رسوم التقديم الحكومية الصحيحة؟"
    },
    "type": "text"
   },
   {
    "id": "g1450_applicant_full_legal_name",
    "q": {
     "en": "Applicant/petitioner/requester’s full legal name (first, middle, last)",
     "ar": "الاسم القانوني الكامل لمقدم الطلب/الملتمس (الاسم الأول، الأوسط، الأخير)"
    },
    "type": "text"
   },
   {
    "id": "g1450_cardholder_name",
    "q": {
     "en": "Cardholder’s name (exactly as shown on the card)",
     "ar": "اسم حامل البطاقة (تمامًا كما هو موضح على البطاقة)"
    },
    "type": "text"
   },
   {
    "id": "g1450_cardholder_billing_address",
    "q": {
     "en": "Cardholder’s billing address (street, unit, city, state, ZIP code)",
     "ar": "عنوان الفواتير الخاص بحامل البطاقة (الشارع، الوحدة، المدينة، الولاية، الرمز البريدي)"
    },
    "type": "textarea"
   },
   {
    "id": "g1450_cardholder_contact_details",
    "q": {
     "en": "Cardholder’s contact details (daytime telephone number, email address)",
     "ar": "تفاصيل الاتصال الخاصة بحامل البطاقة (رقم الهاتف أثناء النهار، عنوان البريد الإلكتروني)"
    },
    "type": "text"
   },
   {
    "id": "g1450_card_type",
    "q": {
     "en": "Card type (Visa, Mastercard, American Express, or Discover)",
     "ar": "نوع البطاقة (فيزا، ماستركارد، أمريكان إكسبريس، أو ديسكفر)"
    },
    "type": "text"
   },
   {
    "id": "g1450_card_number_and_expiration_date",
    "q": {
     "en": "Card number and expiration date",
     "ar": "رقم البطاقة وتاريخ انتهاء صلاحيتها"
    },
    "type": "text"
   },
   {
    "id": "g1450_authorized_payment_amount",
    "q": {
     "en": "Authorized payment amount (exact amount in U.S. dollars)",
     "ar": "مبلغ الدفع المصرح به (المبلغ الدقيق بالدولار الأمريكي)"
    },
    "type": "text"
   }
  ],
  "docs": [
   {
    "en": "Completed and signed Form G-1450",
    "ar": "نموذج G-1450 مكتمل وموقع"
   },
   {
    "en": "Underlying USCIS application and its supporting evidence",
    "ar": "طلب USCIS الأساسي والأدلة الداعمة له"
   }
  ]
 },
 {
  "code": "G-1650",
  "title": {
   "en": "Authorization for ACH Transactions",
   "ar": "تفويض لمعاملات ACH"
  },
  "questions": [
   {
    "id": "uscis_application_paying_for",
    "q": {
     "en": "Which USCIS application are you paying for?",
     "ar": "ما هو طلب USCIS الذي تدفع مقابله؟"
    },
    "type": "text"
   },
   {
    "id": "applicant_petitioner_requester_full_legal_name",
    "q": {
     "en": "Applicant/petitioner/requester’s full legal name",
     "ar": "الاسم القانوني الكامل لمقدم الطلب/الملتمس/الطالب"
    },
    "type": "text"
   },
   {
    "id": "account_ownership_type",
    "q": {
     "en": "Account ownership type",
     "ar": "نوع ملكية الحساب"
    },
    "type": "text"
   },
   {
    "id": "account_holder_name",
    "q": {
     "en": "Account holder’s name (as it appears on the account)",
     "ar": "اسم صاحب الحساب (كما يظهر في الحساب)"
    },
    "type": "text"
   },
   {
    "id": "account_type",
    "q": {
     "en": "Account type",
     "ar": "نوع الحساب"
    },
    "type": "text"
   },
   {
    "id": "bank_name",
    "q": {
     "en": "Bank name",
     "ar": "اسم البنك"
    },
    "type": "text"
   },
   {
    "id": "routing_number",
    "q": {
     "en": "Routing number",
     "ar": "رقم التوجيه (Routing Number)"
    },
    "type": "text"
   },
   {
    "id": "account_number",
    "q": {
     "en": "Account number",
     "ar": "رقم الحساب"
    },
    "type": "text"
   },
   {
    "id": "authorized_payment_amount",
    "q": {
     "en": "Authorized payment amount (in U.S. dollars)",
     "ar": "مبلغ الدفعة المصرح به (بالدولار الأمريكي)"
    },
    "type": "text"
   },
   {
    "id": "account_holder_signature",
    "q": {
     "en": "Account holder’s signature",
     "ar": "توقيع صاحب الحساب"
    },
    "type": "text"
   }
  ],
  "docs": [
   {
    "en": "Completed and signed G-1650",
    "ar": "نموذج G-1650 مكتمل وموقع"
   },
   {
    "en": "Underlying application and supporting evidence",
    "ar": "الطلب الأساسي والأدلة الداعمة له"
   }
  ]
 },
 {
  "code": "G-1651",
  "title": {
   "en": "Exemption for Paper Fee Payment",
   "ar": "طلب إعفاء لدفع الرسوم الورقي"
  },
  "questions": [
   {
    "id": "g1651_forms_filed",
    "q": {
     "en": "Which USCIS form(s) are being filed? (Form number, filing category, and verified government fee)",
     "ar": "ما هو نموذج/نماذج USCIS التي يتم تقديمها؟ (رقم النموذج، فئة التقديم، والرسوم الحكومية المعتمدة)"
    },
    "type": "textarea"
   },
   {
    "id": "g1651_applicant_petitioner",
    "q": {
     "en": "Who is the applicant/petitioner? (Full legal name for identifying the associated filing)",
     "ar": "من هو مقدم الطلب/الملتمس؟ (الاسم القانوني الكامل لتحديد الطلب المرتبط به)"
    },
    "type": "text"
   },
   {
    "id": "g1651_payer_name",
    "q": {
     "en": "Who will pay the fee? (Identify the payer requesting the exemption, who must sign G-1651)",
     "ar": "من سيدفع الرسوم؟ (حدد دافع الرسوم الذي يطلب الإعفاء، ويجب عليه توقيع G-1651)"
    },
    "type": "text"
   },
   {
    "id": "g1651_electronic_payment_impossible",
    "q": {
     "en": "Are electronic payment methods impossible for the payer?",
     "ar": "هل طرق الدفع الإلكتروني مستحيلة بالنسبة للدافع؟"
    },
    "type": "yesno"
   },
   {
    "id": "g1651_electronic_payment_explanation",
    "q": {
     "en": "Payer’s explanation for why electronic payment methods are impossible.",
     "ar": "تفسير الدافع لماذا طرق الدفع الإلكتروني مستحيلة."
    },
    "type": "textarea"
   },
   {
    "id": "g1651_exemption_applies",
    "q": {
     "en": "Which exemption applies?",
     "ar": "أي إعفاء ينطبق؟"
    },
    "type": "text"
   },
   {
    "id": "g1651_paper_payment_type",
    "q": {
     "en": "What paper payment will be submitted? (Check, money order, bank draft, or cashier’s check)",
     "ar": "ما هو نوع الدفعة الورقية التي سيتم تقديمها؟ (شيك، حوالة بريدية، حوالة بنكية، أو شيك مصرفي)"
    },
    "type": "text"
   },
   {
    "id": "g1651_certification_signed",
    "q": {
     "en": "Has the payer reviewed and signed the certification? (Required before marking the package ready)",
     "ar": "هل قام الدافع بمراجعة التوثيق وتوقيعه؟ (مطلوب قبل الإشارة إلى أن الحزمة جاهزة)"
    },
    "type": "yesno"
   },
   {
    "id": "g1651_no_banking_access",
    "q": {
     "en": "Do you lack access to banking services or electronic payment systems?",
     "ar": "هل تفتقر إلى الوصول إلى الخدمات المصرفية أو أنظمة الدفع الإلكتروني؟"
    },
    "type": "yesno"
   },
   {
    "id": "g1651_undue_hardship",
    "q": {
     "en": "Would electronic payment cause qualifying undue hardship under 31 CFR Part 208?",
     "ar": "هل سيسبب الدفع الإلكتروني مشقة غير مبررة مؤهلة بموجب 31 CFR Part 208؟"
    },
    "type": "yesno"
   },
   {
    "id": "g1651_national_security_law_enforcement",
    "q": {
     "en": "Are non-electronic transactions necessary or desirable for national security or law enforcement reasons?",
     "ar": "هل المعاملات غير الإلكترونية ضرورية أو مرغوبة لأسباب تتعلق بالأمن القومي أو إنفاذ القانون؟"
    },
    "type": "yesno"
   },
   {
    "id": "g1651_other_treasury_circumstances",
    "q": {
     "en": "Which other Treasury-recognized circumstance applies? (Recognized in Treasury regulations or guidance)",
     "ar": "ما هي الظروف الأخرى المعترف بها من قبل الخزانة التي تنطبق؟ (المعترف بها في لوائح أو إرشادات الخزانة)"
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed, signed G-1651",
    "ar": "نموذج G-1651 مكتمل وموقع"
   },
   {
    "en": "Underlying USCIS application and its evidence",
    "ar": "طلب USCIS الأساسي وأدلته"
   },
   {
    "en": "Actual paper payment instrument (Check, money order, bank draft, or cashier’s check)",
    "ar": "أداة الدفع الورقية الفعلية (شيك، حوالة بريدية، حوالة بنكية، أو شيك مصرفي)"
   }
  ]
 },
 {
  "code": "I-9",
  "title": {
   "en": "I-9 Employment Eligibility Verification",
   "ar": "نموذج I-9 التحقق من أهلية التوظيف"
  },
  "questions": [
   {
    "id": "employee_full_legal_name",
    "q": {
     "en": "Employee full legal name (last, first, middle initial)",
     "ar": "الاسم القانوني الكامل للموظف (اسم العائلة، الاسم الأول، الحرف الأول من الاسم الأوسط)"
    },
    "type": "text"
   },
   {
    "id": "employee_other_last_names",
    "q": {
     "en": "Other last names used, if any",
     "ar": "أسماء العائلة الأخرى المستخدمة، إن وجدت"
    },
    "type": "text"
   },
   {
    "id": "employee_home_address_street",
    "q": {
     "en": "Employee home address (street, apartment)",
     "ar": "عنوان المنزل للموظف (الشارع، رقم الشقة)"
    },
    "type": "text"
   },
   {
    "id": "employee_home_address_city",
    "q": {
     "en": "Employee home address (city)",
     "ar": "عنوان المنزل للموظف (المدينة)"
    },
    "type": "text"
   },
   {
    "id": "employee_home_address_state",
    "q": {
     "en": "Employee home address (state)",
     "ar": "عنوان المنزل للموظف (الولاية)"
    },
    "type": "text"
   },
   {
    "id": "employee_home_address_zip",
    "q": {
     "en": "Employee home address (ZIP code)",
     "ar": "عنوان المنزل للموظف (الرمز البريدي)"
    },
    "type": "text"
   },
   {
    "id": "employee_date_of_birth",
    "q": {
     "en": "Employee date of birth (MM/DD/YYYY)",
     "ar": "تاريخ ميلاد الموظف (الشهر/اليوم/السنة)"
    },
    "type": "date"
   },
   {
    "id": "employee_ssn",
    "q": {
     "en": "Employee Social Security number (if applicable)",
     "ar": "رقم الضمان الاجتماعي للموظف (إن وجد)"
    },
    "type": "text"
   },
   {
    "id": "employee_email",
    "q": {
     "en": "Employee email address (optional)",
     "ar": "عنوان البريد الإلكتروني للموظف (اختياري)"
    },
    "type": "text"
   },
   {
    "id": "employee_phone",
    "q": {
     "en": "Employee telephone number (optional)",
     "ar": "رقم هاتف الموظف (اختياري)"
    },
    "type": "text"
   },
   {
    "id": "employee_citizenship_status",
    "q": {
     "en": "Employee citizenship or immigration status (U.S. citizen, noncitizen national, lawful permanent resident, or alien authorized to work)",
     "ar": "جنسية الموظف أو حالة الهجرة (مواطن أمريكي، مواطن غير أمريكي، مقيم دائم شرعي، أو أجنبي مصرح له بالعمل)"
    },
    "type": "text"
   },
   {
    "id": "employee_status_details_uscia_number",
    "q": {
     "en": "USCIS/A-Number (if applicable)",
     "ar": "رقم USCIS/A (إن وجد)"
    },
    "type": "text"
   },
   {
    "id": "employee_status_details_i94_passport_info",
    "q": {
     "en": "Applicable I-94/passport information (if applicable)",
     "ar": "معلومات نموذج I-94/جواز السفر (إن وجدت)"
    },
    "type": "text"
   },
   {
    "id": "employee_status_details_ead_expiration",
    "q": {
     "en": "Employment authorization expiration date (if applicable)",
     "ar": "تاريخ انتهاء صلاحية ترخيص العمل (إن وجد)"
    },
    "type": "date"
   },
   {
    "id": "employee_signature_date",
    "q": {
     "en": "Employee signature and date",
     "ar": "توقيع الموظف والتاريخ"
    },
    "type": "date"
   },
   {
    "id": "preparer_translator_used",
    "q": {
     "en": "Did anyone help prepare or translate Section 1?",
     "ar": "هل ساعد أي شخص في إعداد أو ترجمة القسم 1؟"
    },
    "type": "yesno"
   },
   {
    "id": "first_day_of_employment",
    "q": {
     "en": "Employee's first day of employment",
     "ar": "تاريخ أول يوم عمل للموظف"
    },
    "type": "date"
   },
   {
    "id": "employer_business_name",
    "q": {
     "en": "Employer's business name",
     "ar": "اسم عمل صاحب العمل"
    },
    "type": "text"
   },
   {
    "id": "employer_business_address_street",
    "q": {
     "en": "Employer's business address (street, apartment/suite)",
     "ar": "عنوان عمل صاحب العمل (الشارع، رقم الشقة/الجناح)"
    },
    "type": "text"
   },
   {
    "id": "employer_business_address_city",
    "q": {
     "en": "Employer's business address (city)",
     "ar": "عنوان عمل صاحب العمل (المدينة)"
    },
    "type": "text"
   },
   {
    "id": "employer_business_address_state",
    "q": {
     "en": "Employer's business address (state)",
     "ar": "عنوان عمل صاحب العمل (الولاية)"
    },
    "type": "text"
   },
   {
    "id": "employer_business_address_zip",
    "q": {
     "en": "Employer's business address (ZIP code)",
     "ar": "عنوان عمل صاحب العمل (الرمز البريدي)"
    },
    "type": "text"
   },
   {
    "id": "reviewer_name",
    "q": {
     "en": "Reviewer's name for Section 2",
     "ar": "اسم المراجع للقسم 2"
    },
    "type": "text"
   },
   {
    "id": "reviewer_title",
    "q": {
     "en": "Reviewer's title for Section 2",
     "ar": "مسمى وظيفة المراجع للقسم 2"
    },
    "type": "text"
   },
   {
    "id": "document_titles",
    "q": {
     "en": "Document titles provided by employee for I-9 verification",
     "ar": "عناوين الوثائق التي قدمها الموظف للتحقق من I-9"
    },
    "type": "textarea"
   },
   {
    "id": "document_issuing_authorities",
    "q": {
     "en": "Issuing authorities for documents provided",
     "ar": "السلطات المصدرة للوثائق المقدمة"
    },
    "type": "textarea"
   },
   {
    "id": "document_numbers",
    "q": {
     "en": "Document numbers for documents provided",
     "ar": "أرقام الوثائق المقدمة"
    },
    "type": "textarea"
   },
   {
    "id": "document_expiration_dates",
    "q": {
     "en": "Expiration dates for documents provided (if applicable)",
     "ar": "تواريخ انتهاء صلاحية الوثائق المقدمة (إن وجدت)"
    },
    "type": "textarea"
   },
   {
    "id": "reviewer_signature_date",
    "q": {
     "en": "Reviewer's signature and date for Section 2",
     "ar": "توقيع المراجع والتاريخ للقسم 2"
    },
    "type": "date"
   },
   {
    "id": "authorized_alternative_procedure_used",
    "q": {
     "en": "Was an authorized alternative examination procedure used?",
     "ar": "هل تم استخدام إجراء فحص بديل مصرح به؟"
    },
    "type": "yesno"
   }
  ],
  "docs": [
   {
    "en": "Employee-chosen List A document (e.g., U.S. passport/passport card, Permanent Resident Card, Employment Authorization Document)",
    "ar": "وثيقة من القائمة A يختارها الموظف (مثل جواز السفر الأمريكي/بطاقة جواز السفر، بطاقة الإقامة الدائمة، وثيقة تفويض العمل)"
   },
   {
    "en": "Employee-chosen List B document (e.g., qualifying driver’s license or state-issued identification card)",
    "ar": "وثيقة من القائمة B يختارها الموظف (مثل رخصة قيادة مؤهلة أو بطاقة هوية صادرة عن الولاية)"
   },
   {
    "en": "Employee-chosen List C document (e.g., unrestricted Social Security card, qualifying original or certified U.S. birth certificate)",
    "ar": "وثيقة من القائمة C يختارها الموظف (مثل بطاقة الضمان الاجتماعي غير المقيدة، شهادة ميلاد أمريكية أصلية أو مصدقة)"
   }
  ]
 },
 {
  "code": "I-90",
  "title": {
   "en": "Replace Permanent Resident Card (Form I-90)",
   "ar": "استبدال بطاقة الإقامة الدائمة (نموذج I-90)"
  },
  "questions": [
   {
    "id": "i90_eligibility_10_year_card",
    "q": {
     "en": "Is this a 10-year Green Card?",
     "ar": "هل هذه بطاقة خضراء لمدة 10 سنوات؟"
    },
    "type": "yesno"
   },
   {
    "id": "i90_eligibility_card_expiry",
    "q": {
     "en": "Has the card expired or will it expire within six months?",
     "ar": "هل انتهت صلاحية البطاقة أو ستنتهي خلال ستة أشهر؟"
    },
    "type": "yesno"
   },
   {
    "id": "i90_eligibility_2_year_card",
    "q": {
     "en": "Is this a 2-year conditional Green Card?",
     "ar": "هل هذه بطاقة خضراء مشروطة لمدة سنتين؟"
    },
    "type": "yesno"
   },
   {
    "id": "i90_eligibility_conditional_card_expiry",
    "q": {
     "en": "Is the conditional card expiring within 90 days?",
     "ar": "هل ستنتهي صلاحية البطاقة المشروطة خلال 90 يومًا؟"
    },
    "type": "yesno"
   },
   {
    "id": "i90_legal_name",
    "q": {
     "en": "What is your legal name?",
     "ar": "ما هو اسمك القانوني؟"
    },
    "type": "text"
   },
   {
    "id": "i90_name_on_card",
    "q": {
     "en": "What name is printed on your Green Card?",
     "ar": "ما هو الاسم المطبوع على بطاقتك الخضراء؟"
    },
    "type": "text"
   },
   {
    "id": "i90_legal_name_changes",
    "q": {
     "en": "Have you had any legal name changes? If yes, provide details.",
     "ar": "هل قمت بأي تغييرات على اسمك القانوني؟ إذا كانت الإجابة نعم، يرجى تقديم التفاصيل."
    },
    "type": "textarea"
   },
   {
    "id": "i90_birth_date",
    "q": {
     "en": "What is your birth date?",
     "ar": "ما هو تاريخ ميلادك؟"
    },
    "type": "date"
   },
   {
    "id": "i90_birth_place",
    "q": {
     "en": "What is your place of birth (city, country)?",
     "ar": "ما هو مكان ميلادك (المدينة، البلد)؟"
    },
    "type": "text"
   },
   {
    "id": "i90_parents_given_names",
    "q": {
     "en": "What are your parents' given names?",
     "ar": "ما هي الأسماء الأولى لوالديك؟"
    },
    "type": "text"
   },
   {
    "id": "i90_a_number",
    "q": {
     "en": "What is your A-Number?",
     "ar": "ما هو رقم A-Number الخاص بك؟"
    },
    "type": "text"
   },
   {
    "id": "i90_uscis_online_account_number",
    "q": {
     "en": "What is your USCIS online account number?",
     "ar": "ما هو رقم حسابك عبر الإنترنت في USCIS؟"
    },
    "type": "text"
   },
   {
    "id": "i90_ssn",
    "q": {
     "en": "What is your Social Security Number (SSN), if any?",
     "ar": "ما هو رقم الضمان الاجتماعي (SSN) الخاص بك، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "i90_mailing_address",
    "q": {
     "en": "What is your mailing address?",
     "ar": "ما هو عنوانك البريدي؟"
    },
    "type": "textarea"
   },
   {
    "id": "i90_physical_address",
    "q": {
     "en": "What is your physical address?",
     "ar": "ما هو عنوانك الفعلي؟"
    },
    "type": "textarea"
   },
   {
    "id": "i90_telephone",
    "q": {
     "en": "What is your telephone number?",
     "ar": "ما هو رقم هاتفك؟"
    },
    "type": "text"
   },
   {
    "id": "i90_email",
    "q": {
     "en": "What is your email address?",
     "ar": "ما هو عنوان بريدك الإلكتروني؟"
    },
    "type": "text"
   },
   {
    "id": "i90_resident_since_date",
    "q": {
     "en": "What is your resident-since date?",
     "ar": "ما هو تاريخ حصولك على الإقامة الدائمة؟"
    },
    "type": "date"
   },
   {
    "id": "i90_admission_category",
    "q": {
     "en": "What is your admission category?",
     "ar": "ما هي فئة قبولك؟"
    },
    "type": "text"
   },
   {
    "id": "i90_card_expiration_date",
    "q": {
     "en": "What is your Green Card expiration date?",
     "ar": "ما هو تاريخ انتهاء صلاحية بطاقتك الخضراء؟"
    },
    "type": "date"
   },
   {
    "id": "i90_card_status",
    "q": {
     "en": "Is your card a 10-year card or conditional?",
     "ar": "هل بطاقتك لمدة 10 سنوات أم مشروطة؟"
    },
    "type": "text"
   },
   {
    "id": "i90_filing_reason",
    "q": {
     "en": "What is your reason for filing Form I-90? (Renewal, loss/theft/destruction, damage, non-delivery, correction, legal change, age-14 registration, commuter change, or older card)",
     "ar": "ما هو سبب تقديمك لنموذج I-90؟ (تجديد، فقدان/سرقة/تدمير، تلف، عدم الاستلام، تصحيح، تغيير قانوني، تسجيل بلوغ 14 عامًا، تغيير وضع المسافر، أو بطاقة قديمة)"
    },
    "type": "text"
   },
   {
    "id": "i90_residence_applied_granted_where",
    "q": {
     "en": "Where was your residence applied for/granted?",
     "ar": "أين تم تقديم طلب إقامتك/منحها؟"
    },
    "type": "text"
   },
   {
    "id": "i90_entry_details",
    "q": {
     "en": "What are your entry details, where applicable?",
     "ar": "ما هي تفاصيل دخولك، إذا كانت قابلة للتطبيق؟"
    },
    "type": "textarea"
   },
   {
    "id": "i90_removal_deportation_proceedings",
    "q": {
     "en": "Are you currently in removal/deportation proceedings?",
     "ar": "هل أنت حاليًا قيد إجراءات الإزالة/الترحيل؟"
    },
    "type": "yesno"
   },
   {
    "id": "i90_prior_abandonment_rescission",
    "q": {
     "en": "Have you previously abandoned or had your residence rescinded?",
     "ar": "هل قمت سابقًا بالتخلي عن إقامتك أو تم إلغاؤها؟"
    },
    "type": "yesno"
   },
   {
    "id": "i90_ethnicity",
    "q": {
     "en": "What is your ethnicity?",
     "ar": "ما هي عرقيتك؟"
    },
    "type": "text"
   },
   {
    "id": "i90_race",
    "q": {
     "en": "What is your race?",
     "ar": "ما هو عرقك؟"
    },
    "type": "text"
   },
   {
    "id": "i90_height",
    "q": {
     "en": "What is your height?",
     "ar": "كم طولك؟"
    },
    "type": "text"
   },
   {
    "id": "i90_weight",
    "q": {
     "en": "What is your weight?",
     "ar": "كم وزنك؟"
    },
    "type": "text"
   },
   {
    "id": "i90_eye_color",
    "q": {
     "en": "What is your eye color?",
     "ar": "ما هو لون عينيك؟"
    },
    "type": "text"
   },
   {
    "id": "i90_hair_color",
    "q": {
     "en": "What is your hair color?",
     "ar": "ما هو لون شعرك؟"
    },
    "type": "text"
   },
   {
    "id": "i90_applicant_certification_signature",
    "q": {
     "en": "Applicant certification/signature",
     "ar": "إقرار/توقيع مقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "i90_interpreter_details",
    "q": {
     "en": "Interpreter details, where applicable",
     "ar": "تفاصيل المترجم، إن وجدت"
    },
    "type": "textarea"
   },
   {
    "id": "i90_preparer_details",
    "q": {
     "en": "Preparer details, where applicable",
     "ar": "تفاصيل مُعد الطلب، إن وجدت"
    },
    "type": "textarea"
   },
   {
    "id": "i90_non_delivery_mailed",
    "q": {
     "en": "Did USCIS mail the card to the supplied address?",
     "ar": "هل أرسلت USCIS البطاقة بالبريد إلى العنوان المقدم؟"
    },
    "type": "yesno"
   },
   {
    "id": "i90_non_delivery_returned",
    "q": {
     "en": "Was the card returned as undeliverable?",
     "ar": "هل أعيدت البطاقة لعدم إمكانية تسليمها؟"
    },
    "type": "yesno"
   }
  ],
  "docs": [
   {
    "en": "Copy of the Green Card (front and back)",
    "ar": "نسخة من البطاقة الخضراء (الوجه والخلف)"
   },
   {
    "en": "Card copy if available (for lost, stolen, destroyed, or damaged card)",
    "ar": "نسخة من البطاقة إذا كانت متوفرة (للبطاقة المفقودة، المسروقة، المدمرة، أو التالفة)"
   },
   {
    "en": "Qualifying government identification showing name, birth date, photograph, and signature (for lost, stolen, destroyed, or damaged card)",
    "ar": "بطاقة هوية حكومية صالحة تظهر الاسم، تاريخ الميلاد، الصورة، والتوقيع (للبطاقة المفقودة، المسروقة، المدمرة، أو التالفة)"
   },
   {
    "en": "Government identification (for card issued but never received)",
    "ar": "بطاقة هوية حكومية (للبطاقة التي صدرت ولكن لم يتم استلامها)"
   },
   {
    "en": "Relevant I-797 approval notice (for card issued but never received)",
    "ar": "إشعار الموافقة I-797 ذو الصلة (للبطاقة التي صدرت ولكن لم يتم استلامها)"
   },
   {
    "en": "Passport page showing the admission I-551 stamp (for card issued but never received)",
    "ar": "صفحة جواز السفر التي تظهر ختم الدخول I-551 (للبطاقة التي صدرت ولكن لم يتم استلامها)"
   },
   {
    "en": "Original incorrect Green Card (for incorrect information caused by DHS)",
    "ar": "البطاقة الخضراء الأصلية الخاطئة (للمعلومات غير الصحيحة التي تسببت بها DHS)"
   },
   {
    "en": "Proof of correct information (for incorrect information caused by DHS)",
    "ar": "إثبات المعلومات الصحيحة (للمعلومات غير الصحيحة التي تسببت بها DHS)"
   },
   {
    "en": "Explanation of the error (for incorrect information caused by DHS)",
    "ar": "شرح الخطأ (للمعلومات غير الصحيحة التي تسببت بها DHS)"
   },
   {
    "en": "Legal/documentary proof of the new or correct information (for legal name/biographic change or applicant-caused error)",
    "ar": "إثبات قانوني/وثائقي للمعلومات الجديدة أو الصحيحة (لتغيير الاسم/البيانات البيوغرافية القانونية أو الخطأ الذي تسبب به مقدم الطلب)"
   },
   {
    "en": "Current card copy (for turning 14 or older card edition)",
    "ar": "نسخة من البطاقة الحالية (عند بلوغ 14 عامًا أو نسخة البطاقة الأقدم)"
   },
   {
    "en": "Recent U.S. employment evidence (for commuter status change)",
    "ar": "إثبات التوظيف الأخير في الولايات المتحدة (لتغيير وضع المسافر)"
   },
   {
    "en": "U.S. residence evidence (for commuter status change)",
    "ar": "إثبات الإقامة في الولايات المتحدة (لتغيير وضع المسافر)"
   },
   {
    "en": "Foreign-language evidence with complete certified English translation",
    "ar": "إثبات باللغة الأجنبية مع ترجمة إنجليزية معتمدة وكاملة"
   }
  ]
 },
 {
  "code": "I-102",
  "title": {
   "en": "I-102 Replace / Obtain Initial Nonimmigrant Arrival-Departure Document",
   "ar": "I-102 استبدال / الحصول على وثيقة وصول ومغادرة لغير المهاجرين"
  },
  "questions": [
   {
    "id": "i102_q1_retrieve_i94_cbp",
    "q": {
     "en": "Can you retrieve your electronic I-94 from CBP?",
     "ar": "هل يمكنك استعادة نموذج I-94 الإلكتروني الخاص بك من CBP؟"
    },
    "type": "yesno"
   },
   {
    "id": "i102_q2_error_on_cbp_doc",
    "q": {
     "en": "Is the error on a document issued by CBP?",
     "ar": "هل الخطأ موجود في وثيقة صادرة عن CBP؟"
    },
    "type": "yesno"
   },
   {
    "id": "i102_q3_error_on_uscis_doc",
    "q": {
     "en": "Is the error on a document issued by USCIS?",
     "ar": "هل الخطأ موجود في وثيقة صادرة عن USCIS؟"
    },
    "type": "yesno"
   },
   {
    "id": "i102_q4_doc_lost_stolen_damaged_never_issued",
    "q": {
     "en": "Was the document lost, stolen, damaged, or never issued?",
     "ar": "هل الوثيقة مفقودة، مسروقة، تالفة، أو لم تصدر أبدًا؟"
    },
    "type": "yesno"
   },
   {
    "id": "i102_q5_full_legal_name",
    "q": {
     "en": "Full legal name",
     "ar": "الاسم القانوني الكامل"
    },
    "type": "text"
   },
   {
    "id": "i102_q6_other_names_used",
    "q": {
     "en": "Other names used",
     "ar": "أسماء أخرى مستخدمة"
    },
    "type": "text"
   },
   {
    "id": "i102_q7_date_of_birth",
    "q": {
     "en": "Date of birth",
     "ar": "تاريخ الميلاد"
    },
    "type": "date"
   },
   {
    "id": "i102_q8_country_of_birth",
    "q": {
     "en": "Country of birth",
     "ar": "بلد الميلاد"
    },
    "type": "text"
   },
   {
    "id": "i102_q9_citizenship",
    "q": {
     "en": "Citizenship",
     "ar": "الجنسية"
    },
    "type": "text"
   },
   {
    "id": "i102_q10_a_number",
    "q": {
     "en": "A-Number",
     "ar": "رقم A-Number"
    },
    "type": "text"
   },
   {
    "id": "i102_q11_uscis_online_account_number",
    "q": {
     "en": "USCIS online account number (if applicable)",
     "ar": "رقم حساب USCIS عبر الإنترنت (إن أمكن)"
    },
    "type": "text"
   },
   {
    "id": "i102_q12_ssn",
    "q": {
     "en": "Social Security Number (if applicable)",
     "ar": "رقم الضمان الاجتماعي (إن أمكن)"
    },
    "type": "text"
   },
   {
    "id": "i102_q13_us_mailing_address",
    "q": {
     "en": "U.S. mailing address",
     "ar": "عنوان المراسلة في الولايات المتحدة"
    },
    "type": "textarea"
   },
   {
    "id": "i102_q14_us_physical_address",
    "q": {
     "en": "U.S. physical address",
     "ar": "العنوان الفعلي في الولايات المتحدة"
    },
    "type": "textarea"
   },
   {
    "id": "i102_q15_telephone",
    "q": {
     "en": "Telephone number",
     "ar": "رقم الهاتف"
    },
    "type": "text"
   },
   {
    "id": "i102_q16_email",
    "q": {
     "en": "Email address",
     "ar": "عنوان البريد الإلكتروني"
    },
    "type": "text"
   },
   {
    "id": "i102_q17_last_arrival_date",
    "q": {
     "en": "Last arrival date",
     "ar": "تاريخ آخر وصول"
    },
    "type": "date"
   },
   {
    "id": "i102_q18_last_arrival_location",
    "q": {
     "en": "Last arrival location",
     "ar": "مكان آخر وصول"
    },
    "type": "text"
   },
   {
    "id": "i102_q19_admission_class",
    "q": {
     "en": "Admission class",
     "ar": "فئة القبول"
    },
    "type": "text"
   },
   {
    "id": "i102_q20_entry_method",
    "q": {
     "en": "Was entry by land, airport, or seaport?",
     "ar": "هل كان الدخول عن طريق البر أو المطار أو الميناء البحري؟"
    },
    "type": "text"
   },
   {
    "id": "i102_q21_current_nonimmigrant_status",
    "q": {
     "en": "Current nonimmigrant status",
     "ar": "وضع غير المهاجرين الحالي"
    },
    "type": "text"
   },
   {
    "id": "i102_q22_status_expiration_date",
    "q": {
     "en": "Nonimmigrant status expiration date",
     "ar": "تاريخ انتهاء وضع غير المهاجرين"
    },
    "type": "date"
   },
   {
    "id": "i102_q23_i94_number",
    "q": {
     "en": "I-94/I-94W/I-95 number",
     "ar": "رقم I-94/I-94W/I-95"
    },
    "type": "text"
   },
   {
    "id": "i102_q24_name_on_document",
    "q": {
     "en": "Name printed on the document (I-94/I-94W/I-95)",
     "ar": "الاسم المطبوع على الوثيقة (I-94/I-94W/I-95)"
    },
    "type": "text"
   },
   {
    "id": "i102_q25_passport_number",
    "q": {
     "en": "Passport/travel document number",
     "ar": "رقم جواز السفر / وثيقة السفر"
    },
    "type": "text"
   },
   {
    "id": "i102_q26_passport_issuing_country",
    "q": {
     "en": "Passport/travel document issuing country",
     "ar": "البلد المُصدر لجواز السفر / وثيقة السفر"
    },
    "type": "text"
   },
   {
    "id": "i102_q27_passport_expiration_date",
    "q": {
     "en": "Passport/travel document expiration date",
     "ar": "تاريخ انتهاء صلاحية جواز السفر / وثيقة السفر"
    },
    "type": "date"
   },
   {
    "id": "i102_q28_filing_reason",
    "q": {
     "en": "Filing reason (loss/theft, damage, initial issuance, USCIS correction, or qualifying military category)",
     "ar": "سبب التقديم (فقدان/سرقة، تلف، إصدار أولي، تصحيح USCIS، أو فئة عسكرية مؤهلة)"
    },
    "type": "text"
   },
   {
    "id": "i102_q29_other_applications_filed_together",
    "q": {
     "en": "Other applications filed together",
     "ar": "طلبات أخرى مقدمة معًا"
    },
    "type": "text"
   },
   {
    "id": "i102_q30_current_removal_proceedings",
    "q": {
     "en": "Are you currently in removal proceedings? (If yes, provide explanation)",
     "ar": "هل أنت حاليًا في إجراءات الإبعاد؟ (إذا كانت الإجابة نعم، قدم توضيحًا)"
    },
    "type": "textarea"
   },
   {
    "id": "i102_q31_applicant_certification_signature",
    "q": {
     "en": "Applicant certification/signature",
     "ar": "تصديق/توقيع مقدم الطلب"
    },
    "type": "yesno"
   },
   {
    "id": "i102_q32_interpreter_info_signature",
    "q": {
     "en": "Interpreter information/signature (if applicable)",
     "ar": "معلومات/توقيع المترجم (إن أمكن)"
    },
    "type": "yesno"
   },
   {
    "id": "i102_q33_preparer_info_signature",
    "q": {
     "en": "Preparer information/signature (if applicable)",
     "ar": "معلومات/توقيع المُعِدّ (إن أمكن)"
    },
    "type": "yesno"
   }
  ],
  "docs": [
   {
    "en": "Government-issued identification verifying legal name and date of birth",
    "ar": "وثيقة هوية صادرة عن الحكومة للتحقق من الاسم القانوني وتاريخ الميلاد"
   },
   {
    "en": "Passport biographic page and admission-stamp page, or other evidence of identity/admission (for lost/stolen document or qualifying initial issuance)",
    "ar": "صفحة البيانات البيوغرافية لجواز السفر وصفحة ختم الدخول، أو أي دليل آخر للهوية/الدخول (للوثيقة المفقودة/المسروقة أو الإصدار الأولي المؤهل)"
   },
   {
    "en": "Letter explaining why passport is unavailable",
    "ar": "رسالة توضح سبب عدم توفر جواز السفر"
   },
   {
    "en": "Police report (if document or passport stolen), or a letter explaining why a report is unavailable",
    "ar": "تقرير الشرطة (إذا سُرقت الوثيقة أو جواز السفر)، أو رسالة توضح سبب عدم توفر التقرير"
   },
   {
    "en": "Damaged/mutilated document itself",
    "ar": "الوثيقة التالفة/المشوهة نفسها"
   },
   {
    "en": "Original document issued by USCIS containing an error",
    "ar": "الوثيقة الأصلية الصادرة عن USCIS التي تحتوي على خطأ"
   },
   {
    "en": "Explanation of the error in USCIS-issued document",
    "ar": "شرح الخطأ في الوثيقة الصادرة عن USCIS"
   },
   {
    "en": "Evidence showing the correct information for USCIS-issued document error",
    "ar": "دليل يوضح المعلومات الصحيحة لخطأ الوثيقة الصادرة عن USCIS"
   },
   {
    "en": "Complete English translation with translator certification (for foreign-language evidence)",
    "ar": "ترجمة إنجليزية كاملة مع شهادة المترجم (للأدلة باللغة الأجنبية)"
   }
  ]
 },
 {
  "code": "I-129F",
  "title": {
   "en": "I-129F Petition for Alien Fiancé(e)",
   "ar": "نموذج I-129F طلب لخطيب/خطيبة أجنبي/ة"
  },
  "questions": [
   {
    "id": "q_fiance_or_spouse",
    "q": {
     "en": "Are you petitioning for a fiancé(e) (K-1) or an already married spouse (K-3)?",
     "ar": "هل تتقدم بطلب لخطيب/خطيبة (K-1) أم لزوج/زوجة متزوجين بالفعل (K-3)؟"
    },
    "type": "text"
   },
   {
    "id": "q_petitioner_us_citizen",
    "q": {
     "en": "Is the petitioner a U.S. citizen?",
     "ar": "هل مقدم الالتماس مواطن أمريكي؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_both_legally_free_to_marry",
    "q": {
     "en": "Are both partners legally free to marry?",
     "ar": "هل كلا الشريكين أحرار قانونًا في الزواج؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_intend_to_marry_within_90_days",
    "q": {
     "en": "Do both intend to marry each other within 90 days of the beneficiary’s admission to the United States?",
     "ar": "هل ينوي كلاهما الزواج من بعضهما البعض في غضون 90 يومًا من دخول المستفيد إلى الولايات المتحدة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_met_in_person_2_years",
    "q": {
     "en": "Have you met in person within the two years immediately before filing?",
     "ar": "هل التقيتم شخصيًا خلال السنتين الأخيرتين قبل تقديم الطلب؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_requesting_meeting_waiver",
    "q": {
     "en": "If you have not met in person, are you requesting a meeting-requirement waiver?",
     "ar": "إذا لم تلتقوا شخصيًا، هل تطلبون إعفاءً من شرط المقابلة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_both_partners_legal_names",
    "q": {
     "en": "What are both partners’ full legal names?",
     "ar": "ما هي الأسماء القانونية الكاملة لكلا الشريكين؟"
    },
    "type": "text"
   },
   {
    "id": "q_both_partners_other_names",
    "q": {
     "en": "Have either partner used any other names (e.g., maiden name, aliases)?",
     "ar": "هل استخدم أي من الشريكين أسماء أخرى (مثل اسم العائلة قبل الزواج، أسماء مستعارة)؟"
    },
    "type": "text"
   },
   {
    "id": "q_both_partners_birth_dates_places",
    "q": {
     "en": "What are both partners’ birth dates and places of birth?",
     "ar": "ما هي تواريخ ومواطن ميلاد كلا الشريكين؟"
    },
    "type": "text"
   },
   {
    "id": "q_both_partners_citizenship",
    "q": {
     "en": "What is the citizenship of each partner?",
     "ar": "ما هي جنسية كل شريك؟"
    },
    "type": "text"
   },
   {
    "id": "q_both_partners_immigration_identifiers",
    "q": {
     "en": "Do either partner have applicable immigration identifiers (e.g., A-Number, USCIS Online Account Number)?",
     "ar": "هل لدى أي من الشريكين معرفات هجرة سارية (مثل رقم A-Number، رقم حساب USCIS عبر الإنترنت)؟"
    },
    "type": "text"
   },
   {
    "id": "q_both_partners_current_contact_details",
    "q": {
     "en": "What are both partners’ current contact details (phone, email, mailing address)?",
     "ar": "ما هي تفاصيل الاتصال الحالية لكلا الشريكين (الهاتف، البريد الإلكتروني، عنوان المراسلة)؟"
    },
    "type": "text"
   },
   {
    "id": "q_both_partners_physical_address_history",
    "q": {
     "en": "Provide physical address history for both partners for the past five years.",
     "ar": "يرجى تقديم سجل عناوين السكن لكلا الشريكين على مدى السنوات الخمس الماضية."
    },
    "type": "textarea"
   },
   {
    "id": "q_both_partners_employment_history",
    "q": {
     "en": "Provide employment history for both partners for the past five years.",
     "ar": "يرجى تقديم سجل التوظيف لكلا الشريكين على مدى السنوات الخمس الماضية."
    },
    "type": "textarea"
   },
   {
    "id": "q_parents_names_details",
    "q": {
     "en": "What are your parents' names and other details as requested by the form?",
     "ar": "ما هي أسماء آبائك وتفاصيلهم الأخرى كما يطلبها النموذج؟"
    },
    "type": "text"
   },
   {
    "id": "q_prior_spouses_dates",
    "q": {
     "en": "List all prior spouses, marriage dates, and termination dates for both partners.",
     "ar": "اذكر جميع الأزواج السابقين وتواريخ الزواج وتواريخ الانتهاء لكلا الشريكين."
    },
    "type": "textarea"
   },
   {
    "id": "q_petitioner_citizenship_acquired",
    "q": {
     "en": "How did the petitioner acquire U.S. citizenship?",
     "ar": "كيف اكتسب مقدم الالتماس الجنسية الأمريكية؟"
    },
    "type": "text"
   },
   {
    "id": "q_relationship_how_met",
    "q": {
     "en": "How did you meet?",
     "ar": "كيف التقيتم؟"
    },
    "type": "textarea"
   },
   {
    "id": "q_relationship_meeting_dates_locations",
    "q": {
     "en": "What are the dates and locations of your meetings?",
     "ar": "ما هي تواريخ ومواقع لقاءاتكم؟"
    },
    "type": "textarea"
   },
   {
    "id": "q_relationship_history",
    "q": {
     "en": "Provide details of your relationship history.",
     "ar": "يرجى تقديم تفاصيل عن تاريخ علاقتكم."
    },
    "type": "textarea"
   },
   {
    "id": "q_related_by_blood",
    "q": {
     "en": "Are you related by blood?",
     "ar": "هل أنتم أقارب بالدم؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_beneficiary_previous_us_entry",
    "q": {
     "en": "Provide any previous or current U.S. entry information for the beneficiary.",
     "ar": "يرجى تقديم أي معلومات دخول سابقة أو حالية للولايات المتحدة للمستفيد."
    },
    "type": "textarea"
   },
   {
    "id": "q_beneficiary_children_names_birthdates_residence",
    "q": {
     "en": "Provide names, birth dates, and residence details for the beneficiary’s children.",
     "ar": "يرجى تقديم أسماء وتواريخ ميلاد وتفاصيل إقامة أطفال المستفيد."
    },
    "type": "textarea"
   },
   {
    "id": "q_prior_i129f_filings",
    "q": {
     "en": "Have you filed any prior I-129F petitions?",
     "ar": "هل قدمتم أي التماسات I-129F سابقة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_prior_i129f_details",
    "q": {
     "en": "If yes, provide details of prior I-129F filings, beneficiaries, dates, and outcomes.",
     "ar": "إذا كانت الإجابة نعم، يرجى تقديم تفاصيل التماسات I-129F السابقة، والمستفيدين، والتواريخ، والنتائج."
    },
    "type": "textarea"
   },
   {
    "id": "q_international_marriage_broker_used",
    "q": {
     "en": "Was an international marriage broker used?",
     "ar": "هل تم استخدام وسيط زواج دولي؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_marriage_broker_info_consent",
    "q": {
     "en": "If yes, provide required marriage broker information and consent.",
     "ar": "إذا كانت الإجابة نعم، يرجى تقديم معلومات وسيط الزواج والموافقة المطلوبة."
    },
    "type": "textarea"
   },
   {
    "id": "q_petitioner_criminal_history",
    "q": {
     "en": "Does the petitioner have a criminal history?",
     "ar": "هل لدى مقدم الالتماس سجل جنائي؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_petitioner_protection_orders",
    "q": {
     "en": "Has the petitioner been subject to protection or restraining orders?",
     "ar": "هل خضع مقدم الالتماس لأوامر حماية أو منع؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_petitioner_criminal_waiver_questions",
    "q": {
     "en": "If applicable, answer waiver questions related to criminal history or protection orders.",
     "ar": "إذا كان ذلك ساريًا، أجب عن أسئلة الإعفاء المتعلقة بالسجل الجنائي أو أوامر الحماية."
    },
    "type": "textarea"
   },
   {
    "id": "q_intended_us_residence",
    "q": {
     "en": "What is your intended U.S. residence?",
     "ar": "ما هو مكان إقامتكم المقصود في الولايات المتحدة؟"
    },
    "type": "text"
   },
   {
    "id": "q_requested_embassy_consulate",
    "q": {
     "en": "Which U.S. embassy or consulate is requested for visa processing?",
     "ar": "أي سفارة أو قنصلية أمريكية مطلوبة لمعالجة التأشيرة؟"
    },
    "type": "text"
   },
   {
    "id": "q_interpreter_preparer_details",
    "q": {
     "en": "If applicable, provide interpreter and preparer details.",
     "ar": "إذا كان ذلك ساريًا، يرجى تقديم تفاصيل المترجم والمعدّ."
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed and signed Form I-129F",
    "ar": "نموذج I-129F مكتمل وموقع"
   },
   {
    "en": "Proof of petitioner’s U.S. citizenship (e.g., U.S. birth certificate, naturalization/citizenship certificate, CRBA, or valid U.S. passport)",
    "ar": "إثبات جنسية مقدم الالتماس الأمريكية (على سبيل المثال، شهادة ميلاد أمريكية، شهادة تجنيس/جنسية، CRBA، أو جواز سفر أمريكي ساري المفعول)"
   },
   {
    "en": "Termination of previous marriages (e.g., final divorce decrees, annulment orders, or death certificates for both partners, where applicable)",
    "ar": "وثائق إنهاء الزيجات السابقة (مثل، أحكام الطلاق النهائية، أوامر الإبطال، أو شهادات الوفاة لكلا الشريكين، حيثما ينطبق ذلك)"
   },
   {
    "en": "One passport-style color photograph of each partner, taken within 30 days before filing",
    "ar": "صورة ملونة بحجم جواز السفر لكل شريك، التقطت في غضون 30 يومًا قبل التقديم"
   },
   {
    "en": "Evidence of intent to marry (e.g., separate signed intent-to-marry statements from both partners)",
    "ar": "دليل على نية الزواج (على سبيل المثال، بيانات منفصلة موقعة من كلا الشريكين تفيد نية الزواج)"
   },
   {
    "en": "Evidence of the in-person meeting (e.g., dated photographs together, passport stamps, boarding passes/travel records, and a meeting explanation)",
    "ar": "دليل على اللقاء الشخصي (على سبيل المثال، صور مؤرخة معًا، أختام جواز السفر، بطاقات الصعود/سجلات السفر، وشرح للقاء)"
   },
   {
    "en": "Legal name-change evidence, where applicable",
    "ar": "دليل تغيير الاسم القانوني، حيثما ينطبق ذلك"
   },
   {
    "en": "Waiver evidence (e.g., meeting-requirement or IMBRA filing-limit waiver documentation, where applicable)",
    "ar": "دليل الإعفاء (على سبيل المثال، وثائق الإعفاء من شرط المقابلة أو من قيود تقديم IMBRA، حيثما ينطبق ذلك)"
   },
   {
    "en": "Certified police/court records and dispositions for petitioner’s criminal history, when required",
    "ar": "سجلات و قرارات الشرطة/المحكمة المعتمدة لتاريخ مقدم الالتماس الجنائي، عند الاقتضاء"
   },
   {
    "en": "Complete certified translations of non-English evidence",
    "ar": "ترجمات كاملة ومعتمدة للأدلة غير الإنجليزية"
   },
   {
    "en": "Marriage certificate (for K-3 spouse route)",
    "ar": "عقد الزواج (لمسار الزوج/الزوجة K-3)"
   },
   {
    "en": "Evidence of spouse’s I-130 filing (for K-3 spouse route)",
    "ar": "دليل على تقديم نموذج I-130 الخاص بالزوج/الزوجة (لمسار الزوج/الزوجة K-3)"
   }
  ]
 },
 {
  "code": "I-130",
  "title": {
   "en": "Petition for Alien Relative (Form I-130)",
   "ar": "طلب قريب أجنبي (نموذج I-130)"
  },
  "questions": [
   {
    "id": "beneficiary_relationship",
    "q": {
     "en": "Who is being sponsored? What is the relationship (biological, step, or adoptive)?",
     "ar": "من هو الكفيل؟ وما هي طبيعة العلاقة (بيولوجية، زوج الأب/الزوجة، أو بالتبني)؟"
    },
    "type": "text"
   },
   {
    "id": "petitioner_full_legal_name",
    "q": {
     "en": "What is the petitioner's full legal name?",
     "ar": "ما هو الاسم القانوني الكامل لمقدم الطلب (Petitioner)؟"
    },
    "type": "text"
   },
   {
    "id": "petitioner_other_names",
    "q": {
     "en": "Has the petitioner used any other names?",
     "ar": "هل استخدم مقدم الطلب (Petitioner) أي أسماء أخرى؟"
    },
    "type": "text"
   },
   {
    "id": "petitioner_birth_date",
    "q": {
     "en": "What is the petitioner's birth date?",
     "ar": "ما هو تاريخ ميلاد مقدم الطلب (Petitioner)؟"
    },
    "type": "date"
   },
   {
    "id": "petitioner_birth_place",
    "q": {
     "en": "What is the petitioner's place of birth (city, country)?",
     "ar": "ما هو مكان ميلاد مقدم الطلب (Petitioner) (المدينة، البلد)؟"
    },
    "type": "text"
   },
   {
    "id": "petitioner_citizenship",
    "q": {
     "en": "What is the petitioner's country of citizenship?",
     "ar": "ما هي جنسية مقدم الطلب (Petitioner)؟"
    },
    "type": "text"
   },
   {
    "id": "petitioner_a_number",
    "q": {
     "en": "What is the petitioner's A-Number, if applicable?",
     "ar": "ما هو رقم الـ A-Number الخاص بمقدم الطلب (Petitioner)، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "petitioner_uscis_account_number",
    "q": {
     "en": "What is the petitioner's USCIS online account number, if applicable?",
     "ar": "ما هو رقم حساب USCIS الإلكتروني لمقدم الطلب (Petitioner)، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "petitioner_ssn",
    "q": {
     "en": "What is the petitioner's SSN, if applicable?",
     "ar": "ما هو رقم الضمان الاجتماعي (SSN) لمقدم الطلب (Petitioner)، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_full_legal_name",
    "q": {
     "en": "What is the beneficiary's full legal name?",
     "ar": "ما هو الاسم القانوني الكامل للمستفيد (Beneficiary)؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_other_names",
    "q": {
     "en": "Has the beneficiary used any other names?",
     "ar": "هل استخدم المستفيد (Beneficiary) أي أسماء أخرى؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_birth_date",
    "q": {
     "en": "What is the beneficiary's birth date?",
     "ar": "ما هو تاريخ ميلاد المستفيد (Beneficiary)؟"
    },
    "type": "date"
   },
   {
    "id": "beneficiary_birth_place",
    "q": {
     "en": "What is the beneficiary's place of birth (city, country)?",
     "ar": "ما هو مكان ميلاد المستفيد (Beneficiary) (المدينة، البلد)؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_citizenship",
    "q": {
     "en": "What is the beneficiary's country of citizenship?",
     "ar": "ما هي جنسية المستفيد (Beneficiary)؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_a_number",
    "q": {
     "en": "What is the beneficiary's A-Number, if applicable?",
     "ar": "ما هو رقم الـ A-Number الخاص بالمستفيد (Beneficiary)، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_uscis_account_number",
    "q": {
     "en": "What is the beneficiary's USCIS online account number, if applicable?",
     "ar": "ما هو رقم حساب USCIS الإلكتروني للمستفيد (Beneficiary)، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_ssn",
    "q": {
     "en": "What is the beneficiary's SSN, if applicable?",
     "ar": "ما هو رقم الضمان الاجتماعي (SSN) للمستفيد (Beneficiary)، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "petitioner_status",
    "q": {
     "en": "What is the petitioner's current immigration status (U.S. citizen or permanent resident)?",
     "ar": "ما هي الحالة القانونية الحالية لمقدم الطلب (Petitioner) (مواطن أمريكي أو مقيم دائم)؟"
    },
    "type": "text"
   },
   {
    "id": "petitioner_status_how_acquired",
    "q": {
     "en": "How and when did the petitioner acquire their citizenship or permanent residence?",
     "ar": "كيف ومتى حصل مقدم الطلب (Petitioner) على جنسيته أو إقامته الدائمة؟"
    },
    "type": "text"
   },
   {
    "id": "petitioner_mailing_address",
    "q": {
     "en": "What is the petitioner's current mailing address?",
     "ar": "ما هو عنوان البريد الحالي لمقدم الطلب (Petitioner)؟"
    },
    "type": "text"
   },
   {
    "id": "petitioner_physical_address",
    "q": {
     "en": "What is the petitioner's current physical address?",
     "ar": "ما هو العنوان الفعلي الحالي لمقدم الطلب (Petitioner)؟"
    },
    "type": "text"
   },
   {
    "id": "petitioner_phone_number",
    "q": {
     "en": "What is the petitioner's telephone number?",
     "ar": "ما هو رقم هاتف مقدم الطلب (Petitioner)؟"
    },
    "type": "text"
   },
   {
    "id": "petitioner_email_address",
    "q": {
     "en": "What is the petitioner's email address?",
     "ar": "ما هو عنوان البريد الإلكتروني لمقدم الطلب (Petitioner)؟"
    },
    "type": "text"
   },
   {
    "id": "petitioner_five_year_address_history",
    "q": {
     "en": "Please provide the petitioner's address history for the past five years.",
     "ar": "يرجى تقديم سجل عناوين مقدم الطلب (Petitioner) للسنوات الخمس الماضية."
    },
    "type": "textarea"
   },
   {
    "id": "petitioner_five_year_employment_history",
    "q": {
     "en": "Please provide the petitioner's employment history for the past five years.",
     "ar": "يرجى تقديم سجل توظيف مقدم الطلب (Petitioner) للسنوات الخمس الماضية."
    },
    "type": "textarea"
   },
   {
    "id": "petitioner_parents_info",
    "q": {
     "en": "Please provide information about the petitioner's parents (names, birth dates, countries of birth, citizenship).",
     "ar": "يرجى تقديم معلومات عن والدي مقدم الطلب (Petitioner) (الأسماء، تواريخ الميلاد، بلدان الميلاد، الجنسية)."
    },
    "type": "textarea"
   },
   {
    "id": "petitioner_marital_history",
    "q": {
     "en": "Please provide the petitioner's marital history (dates of marriage/divorce, spouses' names).",
     "ar": "يرجى تقديم سجل الزواج لمقدم الطلب (Petitioner) (تواريخ الزواج/الطلاق، أسماء الأزواج/الزوجات)."
    },
    "type": "textarea"
   },
   {
    "id": "beneficiary_current_marriages",
    "q": {
     "en": "Please provide information about the beneficiary's current marriages.",
     "ar": "يرجى تقديم معلومات عن الزيجات الحالية للمستفيد (Beneficiary)."
    },
    "type": "textarea"
   },
   {
    "id": "beneficiary_prior_marriages",
    "q": {
     "en": "Please provide information about the beneficiary's prior marriages.",
     "ar": "يرجى تقديم معلومات عن الزيجات السابقة للمستفيد (Beneficiary)."
    },
    "type": "textarea"
   },
   {
    "id": "beneficiary_spouse_children_info",
    "q": {
     "en": "Please provide information about the beneficiary's spouse and children (names, birth dates, countries of birth, citizenship).",
     "ar": "يرجى تقديم معلومات عن زوج المستفيد (Beneficiary) وأطفاله (الأسماء، تواريخ الميلاد، بلدان الميلاد، الجنسية)."
    },
    "type": "textarea"
   },
   {
    "id": "beneficiary_us_entries",
    "q": {
     "en": "Has the beneficiary entered the U.S.? If so, when and where?",
     "ar": "هل دخل المستفيد (Beneficiary) الولايات المتحدة؟ إذا كان الأمر كذلك، متى وأين؟"
    },
    "type": "textarea"
   },
   {
    "id": "beneficiary_i94_info",
    "q": {
     "en": "Please provide the beneficiary's I-94 information, if applicable.",
     "ar": "يرجى تقديم معلومات I-94 للمستفيد (Beneficiary)، إن وجدت."
    },
    "type": "text"
   },
   {
    "id": "beneficiary_passport_info",
    "q": {
     "en": "Please provide the beneficiary's passport information (country, number, expiration date).",
     "ar": "يرجى تقديم معلومات جواز سفر المستفيد (Beneficiary) (البلد، الرقم، تاريخ الانتهاء)."
    },
    "type": "textarea"
   },
   {
    "id": "beneficiary_us_status",
    "q": {
     "en": "What is the beneficiary's current immigration status in the U.S., if any?",
     "ar": "ما هي الحالة القانونية الحالية للمستفيد (Beneficiary) في الولايات المتحدة، إن وجدت؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_us_employment",
    "q": {
     "en": "Has the beneficiary been employed in the U.S.? If so, please provide employment history.",
     "ar": "هل عمل المستفيد (Beneficiary) في الولايات المتحدة؟ إذا كان الأمر كذلك، يرجى تقديم سجل التوظيف."
    },
    "type": "textarea"
   },
   {
    "id": "beneficiary_immigration_proceedings",
    "q": {
     "en": "Has the beneficiary been involved in any immigration proceedings? If so, please provide details.",
     "ar": "هل كان المستفيد (Beneficiary) متورطًا في أي إجراءات هجرة؟ إذا كان الأمر كذلك، يرجى تقديم التفاصيل."
    },
    "type": "textarea"
   },
   {
    "id": "marriage_date_place",
    "q": {
     "en": "For spouse petitions: What is the date and place of marriage?",
     "ar": "لطلبات الزوج/الزوجة: ما هو تاريخ ومكان الزواج؟"
    },
    "type": "text"
   },
   {
    "id": "last_shared_residence",
    "q": {
     "en": "For spouse petitions: What was your last shared residence?",
     "ar": "لطلبات الزوج/الزوجة: ما هو آخر سكن مشترك لكما؟"
    },
    "type": "text"
   },
   {
    "id": "relationship_evidence",
    "q": {
     "en": "For spouse petitions: Please describe evidence of a genuine marriage.",
     "ar": "لطلبات الزوج/الزوجة: يرجى وصف الأدلة على زواج حقيقي."
    },
    "type": "textarea"
   },
   {
    "id": "prior_petitions_this_beneficiary",
    "q": {
     "en": "Have you filed previous petitions for this beneficiary?",
     "ar": "هل قدمت طلبات سابقة لهذا المستفيد (Beneficiary)؟"
    },
    "type": "yesno"
   },
   {
    "id": "prior_petitions_other_relatives",
    "q": {
     "en": "Have you filed previous petitions for other relatives?",
     "ar": "هل قدمت طلبات سابقة لأقارب آخرين؟"
    },
    "type": "yesno"
   },
   {
    "id": "relatives_petitioned_together",
    "q": {
     "en": "Are other relatives being petitioned for together with this beneficiary?",
     "ar": "هل يتم تقديم طلب لأقارب آخرين مع هذا المستفيد (Beneficiary)؟"
    },
    "type": "yesno"
   },
   {
    "id": "processing_choice",
    "q": {
     "en": "Do you choose consular processing or adjustment of status?",
     "ar": "هل تختار المعالجة القنصلية أم تعديل الوضع؟"
    },
    "type": "text"
   },
   {
    "id": "requested_processing_location",
    "q": {
     "en": "What is the requested location for processing?",
     "ar": "ما هو الموقع المطلوب للمعالجة؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_native_language_name",
    "q": {
     "en": "What is the beneficiary's name written in their native script (e.g., Arabic)?",
     "ar": "ما هو اسم المستفيد (Beneficiary) مكتوبًا بالخط الأصلي (مثل العربية)؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_native_language_foreign_address",
    "q": {
     "en": "What is the beneficiary's foreign address written in their native script (e.g., Arabic)?",
     "ar": "ما هو العنوان الأجنبي للمستفيد (Beneficiary) مكتوبًا بالخط الأصلي (مثل العربية)؟"
    },
    "type": "text"
   },
   {
    "id": "petitioner_certification",
    "q": {
     "en": "Do you certify and sign the petition?",
     "ar": "هل تصدق وتوقع على الطلب؟"
    },
    "type": "yesno"
   },
   {
    "id": "interpreter_details",
    "q": {
     "en": "If an interpreter was used, please provide their details.",
     "ar": "إذا تم استخدام مترجم فوري، يرجى تقديم تفاصيله."
    },
    "type": "textarea"
   },
   {
    "id": "preparer_details",
    "q": {
     "en": "If a preparer was used, please provide their details.",
     "ar": "إذا تم استخدام مُعد (Preparer)، يرجى تقديم تفاصيله."
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed and signed Form I-130",
    "ar": "نموذج I-130 مكتمل وموقع"
   },
   {
    "en": "Proof of government payment for Form I-130",
    "ar": "إثبات دفع الرسوم الحكومية لنموذج I-130"
   },
   {
    "en": "Petitioner's qualifying citizenship evidence (e.g., U.S. birth certificate, passport, naturalization certificate)",
    "ar": "إثبات أهلية المواطنة لمقدم الطلب (Petitioner) (مثل شهادة ميلاد أمريكية، جواز سفر، شهادة تجنيس)"
   },
   {
    "en": "Petitioner's Green Card copy (front and back), if applicable",
    "ar": "نسخة من البطاقة الخضراء لمقدم الطلب (Petitioner) (الوجه والخلف)، إن وجدت"
   },
   {
    "en": "Legal name-change documents, if applicable",
    "ar": "وثائق تغيير الاسم القانوني، إن وجدت"
   },
   {
    "en": "Certified English translations for any non-English evidence",
    "ar": "ترجمات إنجليزية معتمدة لأي دليل غير إنجليزي"
   },
   {
    "en": "Completed Form I-130A (for spouse petitions only)",
    "ar": "نموذج I-130A مكتمل (لطلبات الزوج/الزوجة فقط)"
   },
   {
    "en": "Marriage certificate (for spouse petitions)",
    "ar": "وثيقة الزواج (لطلبات الزوج/الزوجة)"
   },
   {
    "en": "Termination of both parties' previous marriages (e.g., divorce decrees, death certificates) (for spouse petitions)",
    "ar": "إنهاء الزيجات السابقة لكلا الطرفين (مثل أحكام الطلاق، شهادات الوفاة) (لطلبات الزوج/الزوجة)"
   },
   {
    "en": "Evidence of genuine marriage (e.g., joint bank accounts, property deeds, birth certificates of shared children, photographs, correspondence, affidavits from third parties) (for spouse petitions)",
    "ar": "أدلة على زواج حقيقي (مثل حسابات بنكية مشتركة، سندات ملكية، شهادات ميلاد الأطفال المشتركين، صور فوتوغرافية، مراسلات، إفادات خطية من أطراف ثالثة) (لطلبات الزوج/الزوجة)"
   },
   {
    "en": "Child's birth certificate identifying the mother (for mother petitioning for child)",
    "ar": "شهادة ميلاد الطفل التي تحدد الأم (لطلب الأم لطفلها)"
   },
   {
    "en": "Child's birth certificate (for father petitioning for child)",
    "ar": "شهادة ميلاد الطفل (لطلب الأب لطفله)"
   },
   {
    "en": "Applicable parents' marriage/divorce evidence (for father petitioning for child)",
    "ar": "أدلة زواج/طلاق الوالدين ذات الصلة (لطلب الأب لطفله)"
   },
   {
    "en": "Additional legitimation or parent-child relationship evidence, where required (for father petitioning for child)",
    "ar": "أدلة إضافية على الشرعية أو علاقة الوالد بالطفل، حيثما تتطلب (لطلب الأب لطفله)"
   },
   {
    "en": "Petitioner's birth certificate identifying the mother (for petitioner petitioning for mother)",
    "ar": "شهادة ميلاد مقدم الطلب (Petitioner) التي تحدد الأم (لطلب مقدم الطلب لأمه)"
   },
   {
    "en": "Petitioner's birth certificate (for petitioner petitioning for father)",
    "ar": "شهادة ميلاد مقدم الطلب (Petitioner) (لطلب مقدم الطلب لأبيه)"
   },
   {
    "en": "Applicable parents' marriage/termination evidence (for petitioner petitioning for father)",
    "ar": "أدلة زواج/إنهاء زواج الوالدين ذات الصلة (لطلب مقدم الطلب لأبيه)"
   },
   {
    "en": "Both birth certificates showing a common parent (for sibling petitions)",
    "ar": "شهادتي الميلاد التي تظهر والدًا مشتركًا (لطلبات الإخوة)"
   },
   {
    "en": "Additional marriage/parentage evidence for certain half-sibling relationships (for sibling petitions)",
    "ar": "أدلة زواج/أبوة إضافية لعلاقات الأخوة غير الأشقاء معينة (لطلبات الإخوة)"
   },
   {
    "en": "Birth and marriage records establishing the step-relationship (for step-relationships)",
    "ar": "سجلات الميلاد والزواج التي تثبت علاقة زوج الأب/الزوجة (لعلاقات زوج الأب/الزوجة)"
   },
   {
    "en": "Adoption decree (for adoptive relationships)",
    "ar": "مرسوم التبني (لعلاقات التبني)"
   },
   {
    "en": "Required custody and joint-residence evidence (for adoptive relationships)",
    "ar": "أدلة الحضانة والإقامة المشتركة المطلوبة (لعلاقات التبني)"
   },
   {
    "en": "Passport photographs, where applicable",
    "ar": "صور جواز السفر، حيثما تنطبق"
   }
  ]
 },
 {
  "code": "I-130A",
  "title": {
   "en": "I-130A Supplemental Information for Spouse Beneficiary",
   "ar": "معلومات إضافية للمستفيد الزوج/الزوجة (I-130A)"
  },
  "questions": [
   {
    "id": "beneficiary_full_legal_name",
    "q": {
     "en": "What is the beneficiary's full legal name (first, middle, and last)?",
     "ar": "ما هو الاسم القانوني الكامل للمستفيد (الاسم الأول، اسم الأب، اسم العائلة)؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_anumber",
    "q": {
     "en": "What is the beneficiary's A-Number, if any?",
     "ar": "ما هو رقم A الخاص بالمستفيد، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_uscis_online_account_number",
    "q": {
     "en": "What is the beneficiary's USCIS online account number, if any?",
     "ar": "ما هو رقم حساب USCIS الإلكتروني الخاص بالمستفيد، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_address_history",
    "q": {
     "en": "Provide all addresses where the beneficiary lived during the last five years, with from/to dates, starting with the current address.",
     "ar": "يرجى تقديم جميع العناوين التي عاش فيها المستفيد خلال السنوات الخمس الماضية، مع تواريخ البدء والانتهاء، بدءاً بالعنوان الحالي."
    },
    "type": "textarea"
   },
   {
    "id": "beneficiary_last_foreign_address",
    "q": {
     "en": "What is the last foreign address outside the United States where the beneficiary lived for more than one year?",
     "ar": "ما هو آخر عنوان أجنبي خارج الولايات المتحدة أقام فيه المستفيد لأكثر من عام؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_parent_info",
    "q": {
     "en": "Provide the names (including maiden names), birth dates, sex, birthplaces, and current residence details for both of the beneficiary's parents.",
     "ar": "يرجى تقديم أسماء (بما في ذلك أسماء ما قبل الزواج)، وتواريخ الميلاد، والجنس، وأماكن الميلاد، وتفاصيل الإقامة الحالية لوالدي المستفيد."
    },
    "type": "textarea"
   },
   {
    "id": "beneficiary_employment_history",
    "q": {
     "en": "Provide the beneficiary's employment history for the last five years (inside and outside the United States), including employer name/address, occupation, and dates.",
     "ar": "يرجى تقديم تاريخ عمل المستفيد للسنوات الخمس الماضية (داخل وخارج الولايات المتحدة)، بما في ذلك اسم/عنوان صاحب العمل، المهنة، والتواريخ."
    },
    "type": "textarea"
   },
   {
    "id": "beneficiary_last_foreign_employment",
    "q": {
     "en": "If not covered by the employment history, provide the beneficiary's last employment outside the United States.",
     "ar": "إذا لم يتم تغطيته في تاريخ العمل، يرجى تقديم آخر وظيفة للمستفيد خارج الولايات المتحدة."
    },
    "type": "text"
   },
   {
    "id": "beneficiary_daytime_telephone",
    "q": {
     "en": "What is the beneficiary's daytime telephone number, if applicable?",
     "ar": "ما هو رقم هاتف المستفيد خلال النهار، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_mobile_telephone",
    "q": {
     "en": "What is the beneficiary's mobile telephone number, if applicable?",
     "ar": "ما هو رقم هاتف المستفيد المحمول، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "beneficiary_email",
    "q": {
     "en": "What is the beneficiary's email address, if applicable?",
     "ar": "ما هو عنوان البريد الإلكتروني للمستفيد، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "interpreter_used",
    "q": {
     "en": "Was an interpreter used to prepare the form?",
     "ar": "هل تم الاستعانة بمترجم لإعداد النموذج؟"
    },
    "type": "yesno"
   },
   {
    "id": "interpreter_details",
    "q": {
     "en": "If an interpreter was used, provide their language, identity, contact information, and certification.",
     "ar": "إذا تم الاستعانة بمترجم، يرجى تقديم لغته، وهويته، ومعلومات الاتصال به، وتصديقه."
    },
    "type": "textarea"
   },
   {
    "id": "preparer_used",
    "q": {
     "en": "Did someone other than the beneficiary prepare the form?",
     "ar": "هل قام شخص آخر غير المستفيد بإعداد النموذج؟"
    },
    "type": "yesno"
   },
   {
    "id": "preparer_details",
    "q": {
     "en": "If someone helped prepare the form, provide their identity, business/contact information, and certification.",
     "ar": "إذا ساعد شخص في إعداد النموذج، يرجى تقديم هويته، ومعلومات العمل/الاتصال الخاصة به، وتصديقه."
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed I-130A form",
    "ar": "نموذج I-130A مكتمل"
   },
   {
    "en": "Extra pages for address or employment history, if needed",
    "ar": "صفحات إضافية لسجل العناوين أو العمل، إذا لزم الأمر"
   },
   {
    "en": "English translations for any non-English supporting documents",
    "ar": "ترجمات إنجليزية لأي مستندات داعمة غير إنجليزية"
   }
  ]
 },
 {
  "code": "I-131",
  "title": {
   "en": "I-131 Travel Documents, Parole Documents, and Arrival/Departure Records",
   "ar": "وثائق السفر، وثائق الإفراج المشروط، وسجلات الوصول/المغادرة I-131"
  },
  "questions": [
   {
    "id": "i131_applying_for_self_or_other",
    "q": {
     "en": "Are you applying for yourself or another person?",
     "ar": "هل تتقدم بالطلب لنفسك أم لشخص آخر؟"
    },
    "type": "yesno"
   },
   {
    "id": "i131_beneficiary_location",
    "q": {
     "en": "Where is the beneficiary physically located today? (Country, address, and whether inside the United States)",
     "ar": "أين يقع المستفيد فعلياً اليوم؟ (البلد والعنوان وما إذا كان داخل الولايات المتحدة)"
    },
    "type": "textarea"
   },
   {
    "id": "i131_beneficiary_immigration_status",
    "q": {
     "en": "What is the beneficiary's current immigration status or pending application?",
     "ar": "ما هي حالة الهجرة الحالية للمستفيد أو طلبه المعلق؟"
    },
    "type": "text"
   },
   {
    "id": "i131_document_or_benefit_requested",
    "q": {
     "en": "Which document or benefit is being requested?",
     "ar": "ما هي الوثيقة أو المنفعة المطلوبة؟"
    },
    "type": "text"
   },
   {
    "id": "i131_request_type",
    "q": {
     "en": "Is this an initial request, another period of parole, replacement, or correction?",
     "ar": "هل هذا طلب أولي، فترة أخرى من الإفراج المشروط، استبدال، أم تصحيح؟"
    },
    "type": "text"
   },
   {
    "id": "i131_another_request_pending",
    "q": {
     "en": "Is another I-131 request already pending?",
     "ar": "هل يوجد طلب I-131 آخر معلق بالفعل؟"
    },
    "type": "yesno"
   },
   {
    "id": "i131_court_proceedings_or_removal_orders",
    "q": {
     "en": "Are there immigration court proceedings or removal orders?",
     "ar": "هل هناك إجراءات قضائية للهجرة أو أوامر إبعاد؟"
    },
    "type": "yesno"
   },
   {
    "id": "identity_contact_details",
    "q": {
     "en": "Provide legal name, other names used, birth information, citizenship, A-number, USCIS account number, mailing/physical addresses, phone, and email.",
     "ar": "يرجى تقديم الاسم القانوني، الأسماء الأخرى المستخدمة، معلومات الميلاد، الجنسية، رقم A-number، رقم حساب USCIS، العناوين البريدية/الفعلية، الهاتف، والبريد الإلكتروني."
    },
    "type": "textarea"
   },
   {
    "id": "immigration_records_details",
    "q": {
     "en": "Provide passport details, I-94 number and expiration, immigration category, and related USCIS receipt numbers.",
     "ar": "يرجى تقديم تفاصيل جواز السفر، رقم I-94 وتاريخ انتهائه، فئة الهجرة، وأرقام إيصالات USCIS ذات الصلة."
    },
    "type": "textarea"
   },
   {
    "id": "previous_documents_info",
    "q": {
     "en": "Provide previous document type, issue/expiration dates, receipt number, whether still possessed; and explanation for loss, damage, or correction.",
     "ar": "يرجى تقديم نوع الوثيقة السابقة، تواريخ الإصدار/الانتهاء، رقم الإيصال، ما إذا كانت لا تزال بحوزتك؛ وشرح لأسباب الفقدان أو التلف أو التصحيح."
    },
    "type": "textarea"
   },
   {
    "id": "proposed_travel_details",
    "q": {
     "en": "Provide proposed travel purpose, destinations, departure date, expected duration, and number of trips.",
     "ar": "يرجى تقديم الغرض من السفر المقترح، الوجهات، تاريخ المغادرة، المدة المتوقعة، وعدد الرحلات."
    },
    "type": "textarea"
   },
   {
    "id": "reentry_permit_details",
    "q": {
     "en": "Provide permanent residence details and time spent outside the United States for a reentry permit.",
     "ar": "للحصول على تصريح إعادة دخول، يرجى تقديم تفاصيل الإقامة الدائمة والوقت الذي قضيته خارج الولايات المتحدة."
    },
    "type": "textarea"
   },
   {
    "id": "refugee_travel_document_details",
    "q": {
     "en": "Provide refugee/asylee history, departure history, and answer questions concerning the country of claimed persecution for a refugee travel document.",
     "ar": "للحصول على وثيقة سفر اللاجئ، يرجى تقديم تاريخك كلاجئ/طالب لجوء، تاريخ المغادرة، والإجابة على الأسئلة المتعلقة ببلد الاضطهاد المزعوم."
    },
    "type": "textarea"
   },
   {
    "id": "parole_request_details",
    "q": {
     "en": "Provide humanitarian/public-benefit reason, requested duration, supporting circumstances, financial support, and prior visa attempts for parole requests.",
     "ar": "لطلبات الإفراج المشروط، يرجى تقديم السبب الإنساني/المنفعة العامة، المدة المطلوبة، الظروف الداعمة، الدعم المالي، ومحاولات الحصول على تأشيرة سابقة."
    },
    "type": "textarea"
   },
   {
    "id": "applicant_certification_info",
    "q": {
     "en": "Applicant certification details; interpreter and preparer details when used.",
     "ar": "تفاصيل إقرار مقدم الطلب؛ تفاصيل المترجم والمعد عند الاستخدام."
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Government photo identification showing name and birth date",
    "ar": "بطاقة هوية حكومية مصورة توضح الاسم وتاريخ الميلاد"
   },
   {
    "en": "Green Card, front and back, or qualifying alternative evidence of permanent residence (for Reentry Permit)",
    "ar": "البطاقة الخضراء، من الأمام والخلف، أو دليل بديل مؤهل على الإقامة الدائمة (لتصريح إعادة الدخول)"
   },
   {
    "en": "Refugee/asylee evidence and relevant eligibility records; additional explanation for an overseas filing (for Refugee Travel Document)",
    "ar": "إثبات صفة لاجئ/طالب لجوء وسجلات الأهلية ذات الصلة؛ شرح إضافي للتقديم من الخارج (لوثيقة سفر اللاجئ)"
   },
   {
    "en": "Current-status evidence; I-485 receipt when filed separately, or other category-specific eligibility and travel-purpose evidence (for Advance Parole)",
    "ar": "إثبات الحالة الحالية؛ إيصال النموذج I-485 عند تقديمه بشكل منفصل، أو غير ذلك من أدلة الأهلية الخاصة بالفئة والغرض من السفر (للإفراج المشروط المسبق)"
   },
   {
    "en": "TPS approval evidence (for TPS Travel Authorization)",
    "ar": "إثبات الموافقة على TPS (لتصريح سفر TPS)"
   },
   {
    "en": "Previous parole/I-94 evidence and explanation with evidence supporting another period (for Re-parole)",
    "ar": "إثبات الإفراج المشروط/I-94 السابق وشرح مع أدلة تدعم فترة أخرى (لإعادة الإفراج المشروط)"
   },
   {
    "en": "Humanitarian/public-benefit evidence; qualifying military-service and relationship records for a military request (for Parole in Place)",
    "ar": "إثبات السبب الإنساني/المنفعة العامة؛ سجلات الخدمة العسكرية والعلاقة المؤهلة لطلب عسكري (للإفراج المشروط في المكان)"
   },
   {
    "en": "Beneficiary passport/identity records (for general humanitarian parole from outside the United States)",
    "ar": "سجلات جواز سفر/هوية المستفيد (للإفراج المشروط الإنساني العام من خارج الولايات المتحدة)"
   },
   {
    "en": "Petitioner identification (for general humanitarian parole from outside the United States)",
    "ar": "وثائق هوية مقدم الالتماس (للإفراج المشروط الإنساني العام من خارج الولايات المتحدة)"
   },
   {
    "en": "Detailed justification (for general humanitarian parole from outside the United States)",
    "ar": "تبرير مفصل (للإفراج المشروط الإنساني العام من خارج الولايات المتحدة)"
   },
   {
    "en": "Relevant medical or other supporting records (for general humanitarian parole from outside the United States)",
    "ar": "السجلات الطبية أو غيرها من السجلات الداعمة ذات الصلة (للإفراج المشروط الإنساني العام من خارج الولايات المتحدة)"
   },
   {
    "en": "Form I-134 and financial evidence (for general humanitarian parole from outside the United States)",
    "ar": "النموذج I-134 والإثباتات المالية (للإفراج المشروط الإنساني العام من خارج الولايات المتحدة)"
   },
   {
    "en": "Explanations/evidence concerning visa alternatives (for general humanitarian parole from outside the United States)",
    "ar": "تفسيرات/أدلة تتعلق ببدائل التأشيرة (للإفراج المشروط الإنساني العام من خارج الولايات المتحدة)"
   },
   {
    "en": "Certified English translations for foreign-language records",
    "ar": "ترجمات إنجليزية معتمدة للسجلات باللغات الأجنبية"
   },
   {
    "en": "Photographs (conditional on category and filing instructions)",
    "ar": "صور فوتوغرافية (مشروطة حسب الفئة وتعليمات التقديم)"
   }
  ]
 },
 {
  "code": "I-131A",
  "title": {
   "en": "Application for Carrier Documentation",
   "ar": "طلب وثائق الناقل"
  },
  "questions": [
   {
    "id": "i131a_outside_us",
    "q": {
     "en": "Are you currently outside the United States?",
     "ar": "هل أنت حالياً خارج الولايات المتحدة؟"
    },
    "type": "yesno"
   },
   {
    "id": "i131a_permanent_resident",
    "q": {
     "en": "Are you a permanent or conditional permanent resident?",
     "ar": "هل أنت مقيم دائم أو مقيم دائم مشروط؟"
    },
    "type": "yesno"
   },
   {
    "id": "i131a_lost_doc_type",
    "q": {
     "en": "Which document was lost, stolen, destroyed, or damaged?",
     "ar": "ما هي الوثيقة التي فُقدت، سُرقت، دُمرت، أو تضررت؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_last_us_departure",
    "q": {
     "en": "When did you last leave the United States?",
     "ar": "متى غادرت الولايات المتحدة آخر مرة؟"
    },
    "type": "date"
   },
   {
    "id": "i131a_gc_absence_less_than_year",
    "q": {
     "en": "If using the Green Card path, has the absence been less than one year?",
     "ar": "إذا كنت تستخدم مسار البطاقة الخضراء، هل كانت مدة الغياب أقل من سنة واحدة؟"
    },
    "type": "yesno"
   },
   {
    "id": "i131a_reentry_permit_absence_less_than_two_years",
    "q": {
     "en": "If using the reentry-permit path, has the absence been less than two years?",
     "ar": "إذا كنت تستخدم مسار تصريح إعادة الدخول، هل كانت مدة الغياب أقل من سنتين؟"
    },
    "type": "yesno"
   },
   {
    "id": "i131a_travel_authorization_unexpired",
    "q": {
     "en": "If using advance parole, TPS travel authorization, or an EAD with travel endorsement, is the authorization still unexpired?",
     "ar": "إذا كنت تستخدم الإفراج المشروط المسبق (advance parole)، أو تصريح سفر TPS، أو EAD مع تصريح سفر، هل لا يزال التصريح ساري المفعول؟"
    },
    "type": "yesno"
   },
   {
    "id": "i131a_full_legal_name",
    "q": {
     "en": "What is your full legal name?",
     "ar": "ما هو اسمك القانوني الكامل؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_other_names",
    "q": {
     "en": "Have you used any other names?",
     "ar": "هل استخدمت أي أسماء أخرى؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_dob",
    "q": {
     "en": "What is your date of birth?",
     "ar": "ما هو تاريخ ميلادك؟"
    },
    "type": "date"
   },
   {
    "id": "i131a_pob",
    "q": {
     "en": "What is your place of birth?",
     "ar": "ما هو مكان ميلادك؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_citizenship",
    "q": {
     "en": "What is your country of citizenship?",
     "ar": "ما هي دولة جنسيتك؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_a_number",
    "q": {
     "en": "What is your A-number?",
     "ar": "ما هو رقم A الخاص بك؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_uscis_account_number",
    "q": {
     "en": "What is your USCIS account number, if applicable?",
     "ar": "ما هو رقم حسابك لدى USCIS، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_us_address",
    "q": {
     "en": "What is your U.S. address?",
     "ar": "ما هو عنوانك في الولايات المتحدة؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_current_overseas_address",
    "q": {
     "en": "What is your current overseas address?",
     "ar": "ما هو عنوانك الحالي في الخارج؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_telephone",
    "q": {
     "en": "What is your telephone number?",
     "ar": "ما هو رقم هاتفك؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_email",
    "q": {
     "en": "What is your email address?",
     "ar": "ما هو عنوان بريدك الإلكتروني؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_passport_number",
    "q": {
     "en": "What is your passport number?",
     "ar": "ما هو رقم جواز سفرك؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_passport_issuing_country",
    "q": {
     "en": "What is the issuing country of your passport?",
     "ar": "ما هي الدولة المصدرة لجواز سفرك؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_passport_expiration_date",
    "q": {
     "en": "What is the expiration date of your passport?",
     "ar": "ما هو تاريخ انتهاء صلاحية جواز سفرك؟"
    },
    "type": "date"
   },
   {
    "id": "i131a_possess_original_passport",
    "q": {
     "en": "Do you possess the original passport?",
     "ar": "هل بحوزتك جواز السفر الأصلي؟"
    },
    "type": "yesno"
   },
   {
    "id": "i131a_permanent_residence_details",
    "q": {
     "en": "Provide details of your permanent residence or basis for travel authorization.",
     "ar": "قدم تفاصيل إقامتك الدائمة أو أساس تصريح السفر."
    },
    "type": "textarea"
   },
   {
    "id": "i131a_missing_doc_type",
    "q": {
     "en": "What is the type of the missing document?",
     "ar": "ما هو نوع الوثيقة المفقودة؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_missing_doc_number",
    "q": {
     "en": "What is the number of the missing document, if known?",
     "ar": "ما هو رقم الوثيقة المفقودة، إن كان معروفاً؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_missing_doc_issue_date",
    "q": {
     "en": "What is the issue date of the missing document?",
     "ar": "ما هو تاريخ إصدار الوثيقة المفقودة؟"
    },
    "type": "date"
   },
   {
    "id": "i131a_missing_doc_expiration_date",
    "q": {
     "en": "What is the expiration date of the missing document?",
     "ar": "ما هو تاريخ انتهاء صلاحية الوثيقة المفقودة؟"
    },
    "type": "date"
   },
   {
    "id": "i131a_missing_doc_copy_available",
    "q": {
     "en": "Do you have an available copy of the missing document?",
     "ar": "هل لديك نسخة متاحة من الوثيقة المفقودة؟"
    },
    "type": "yesno"
   },
   {
    "id": "i131a_incident_what_happened",
    "q": {
     "en": "What happened to your document?",
     "ar": "ماذا حدث لوثيقتك؟"
    },
    "type": "textarea"
   },
   {
    "id": "i131a_incident_when",
    "q": {
     "en": "When did the incident occur?",
     "ar": "متى وقع الحادث؟"
    },
    "type": "date"
   },
   {
    "id": "i131a_incident_where",
    "q": {
     "en": "Where did the incident occur?",
     "ar": "أين وقع الحادث؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_incident_reported_to_police",
    "q": {
     "en": "Was the incident reported to the police?",
     "ar": "هل تم الإبلاغ عن الحادث للشرطة؟"
    },
    "type": "yesno"
   },
   {
    "id": "i131a_intended_return_date",
    "q": {
     "en": "What is your intended return date to the U.S.?",
     "ar": "ما هو تاريخ عودتك المتوقع إلى الولايات المتحدة؟"
    },
    "type": "date"
   },
   {
    "id": "i131a_travel_itinerary",
    "q": {
     "en": "Provide your travel itinerary.",
     "ar": "قدم خط سير رحلتك."
    },
    "type": "textarea"
   },
   {
    "id": "i131a_possess_expired_gc",
    "q": {
     "en": "Do you possess an expired Green Card?",
     "ar": "هل بحوزتك بطاقة خضراء منتهية الصلاحية؟"
    },
    "type": "yesno"
   },
   {
    "id": "i131a_possess_extension_notice",
    "q": {
     "en": "Do you possess an extension notice?",
     "ar": "هل بحوزتك إشعار تمديد؟"
    },
    "type": "yesno"
   },
   {
    "id": "i131a_possess_other_boarding_evidence",
    "q": {
     "en": "Do you possess other boarding evidence?",
     "ar": "هل بحوزتك أي دليل آخر للصعود إلى الطائرة؟"
    },
    "type": "yesno"
   },
   {
    "id": "i131a_airline_refused_boarding",
    "q": {
     "en": "Has the airline refused boarding?",
     "ar": "هل رفضت شركة الطيران صعودك؟"
    },
    "type": "yesno"
   },
   {
    "id": "i131a_consular_country",
    "q": {
     "en": "What is the country of the embassy/consulate?",
     "ar": "ما هي دولة السفارة/القنصلية؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_consular_embassy_name",
    "q": {
     "en": "What is the name of the embassy/consulate?",
     "ar": "ما هو اسم السفارة/القنصلية؟"
    },
    "type": "text"
   },
   {
    "id": "i131a_appointment_details",
    "q": {
     "en": "Provide appointment details.",
     "ar": "قدم تفاصيل الموعد."
    },
    "type": "textarea"
   },
   {
    "id": "i131a_payment_confirmation",
    "q": {
     "en": "Do you have payment confirmation?",
     "ar": "هل لديك تأكيد الدفع؟"
    },
    "type": "yesno"
   },
   {
    "id": "i131a_applicant_signature",
    "q": {
     "en": "Applicant signature",
     "ar": "توقيع مقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "i131a_interpreter_details",
    "q": {
     "en": "Interpreter details (if applicable)",
     "ar": "تفاصيل المترجم (إن وجد)"
    },
    "type": "textarea"
   },
   {
    "id": "i131a_preparer_details",
    "q": {
     "en": "Preparer details (if applicable)",
     "ar": "تفاصيل المُعد (إن وجد)"
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed, signed Form I-131A",
    "ar": "نموذج I-131A مكتمل وموقع"
   },
   {
    "en": "Original passport",
    "ar": "جواز السفر الأصلي"
   },
   {
    "en": "Biographic-page copy of passport",
    "ar": "نسخة من صفحة المعلومات البيوغرافية لجواز السفر"
   },
   {
    "en": "Evidence of permanent residence (Green Card copies or other supporting records)",
    "ar": "إثبات الإقامة الدائمة (نسخ من البطاقة الخضراء أو سجلات داعمة أخرى)"
   },
   {
    "en": "Copy/evidence of travel authorization (for advance-parole/TPS/travel-endorsed EAD path, if available)",
    "ar": "نسخة/دليل تصريح السفر (لمسار الإفراج المشروط المسبق/TPS/EAD مع تصريح سفر، إن وجد)"
   },
   {
    "en": "Departure and return evidence (tickets, boarding passes, itinerary, or other records)",
    "ar": "دليل المغادرة والعودة (تذاكر، بطاقات صعود الطائرة، خط سير الرحلة، أو سجلات أخرى)"
   },
   {
    "en": "One passport-style photograph (taken within 30 days of filing)",
    "ar": "صورة شخصية بحجم جواز السفر (ملتقطة خلال 30 يوماً من تاريخ التقديم)"
   },
   {
    "en": "USCIS online payment receipt",
    "ar": "إيصال الدفع الإلكتروني من USCIS"
   },
   {
    "en": "Police report (if applicable and available)",
    "ar": "تقرير الشرطة (إذا كان منطبقاً ومتاحاً)"
   },
   {
    "en": "Additional documents requested by the consular post",
    "ar": "وثائق إضافية تطلبها البعثة القنصلية"
   },
   {
    "en": "Complete English translation with translator’s certification for foreign-language evidence",
    "ar": "ترجمة إنجليزية كاملة مع شهادة المترجم للأدلة باللغة الأجنبية"
   }
  ]
 },
 {
  "code": "I-134",
  "title": {
   "en": "I-134 Declaration of Financial Support",
   "ar": "إقرار الدعم المالي I-134"
  },
  "questions": [
   {
    "id": "i134_underlying_case",
    "q": {
     "en": "What application or visa is this supporting?",
     "ar": "ما هو نوع الطلب أو التأشيرة الذي يدعمه هذا الإقرار؟"
    },
    "type": "text"
   },
   {
    "id": "i134_beneficiary_location",
    "q": {
     "en": "Where is the beneficiary located?",
     "ar": "أين يوجد المستفيد حالياً؟"
    },
    "type": "text"
   },
   {
    "id": "i134_support_type",
    "q": {
     "en": "Are you supporting someone else or demonstrating self-support?",
     "ar": "هل تقوم بدعم شخص آخر أم تثبت قدرتك على إعالة نفسك؟"
    },
    "type": "text"
   },
   {
    "id": "i134_handling_entity",
    "q": {
     "en": "Which embassy, consulate, or USCIS process is handling the case?",
     "ar": "ما هي السفارة أو القنصلية أو عملية USCIS التي تتولى هذه الحالة؟"
    },
    "type": "text"
   },
   {
    "id": "i134_num_beneficiaries",
    "q": {
     "en": "How many beneficiaries need declarations?",
     "ar": "كم عدد المستفيدين الذين يحتاجون إلى إقرارات دعم؟"
    },
    "type": "text"
   },
   {
    "id": "i134_supporter_full_name",
    "q": {
     "en": "What is the financial supporter's full name?",
     "ar": "ما هو الاسم الكامل للداعم المالي؟"
    },
    "type": "text"
   },
   {
    "id": "i134_supporter_birth_info",
    "q": {
     "en": "What is the financial supporter's birth information (date and place)?",
     "ar": "ما هي معلومات ميلاد الداعم المالي (تاريخ ومكان الميلاد)؟"
    },
    "type": "text"
   },
   {
    "id": "i134_supporter_addresses",
    "q": {
     "en": "What are the financial supporter's addresses (current and past)?",
     "ar": "ما هي عناوين الداعم المالي (الحالية والسابقة)؟"
    },
    "type": "text"
   },
   {
    "id": "i134_supporter_citizenship_status",
    "q": {
     "en": "What is the financial supporter's citizenship or immigration status?",
     "ar": "ما هي جنسية الداعم المالي أو حالته كمهاجر؟"
    },
    "type": "text"
   },
   {
    "id": "i134_supporter_identifiers",
    "q": {
     "en": "What are the financial supporter's A-number and other applicable identifiers?",
     "ar": "ما هو رقم A-number للداعم المالي ومعرفاته الأخرى ذات الصلة؟"
    },
    "type": "text"
   },
   {
    "id": "i134_supporter_employment_status",
    "q": {
     "en": "What is the financial supporter's employment status?",
     "ar": "ما هي الحالة الوظيفية للداعم المالي؟"
    },
    "type": "text"
   },
   {
    "id": "i134_supporter_employer_name",
    "q": {
     "en": "What is the financial supporter's employer/business name?",
     "ar": "ما هو اسم صاحب العمل/العمل التجاري للداعم المالي؟"
    },
    "type": "text"
   },
   {
    "id": "i134_supporter_employer_address",
    "q": {
     "en": "What is the financial supporter's employer/business address?",
     "ar": "ما هو عنوان صاحب العمل/العمل التجاري للداعم المالي؟"
    },
    "type": "text"
   },
   {
    "id": "i134_supporter_occupation",
    "q": {
     "en": "What is the financial supporter's occupation?",
     "ar": "ما هي مهنة الداعم المالي؟"
    },
    "type": "text"
   },
   {
    "id": "i134_supporter_income_employment",
    "q": {
     "en": "What is the financial supporter's income from employment?",
     "ar": "ما هو دخل الداعم المالي من العمل؟"
    },
    "type": "text"
   },
   {
    "id": "i134_dependents_supported",
    "q": {
     "en": "Who are the people financially supported by the financial supporter?",
     "ar": "من هم الأشخاص الذين يدعمهم الداعم المالي مالياً؟"
    },
    "type": "text"
   },
   {
    "id": "i134_dependents_relationships",
    "q": {
     "en": "What are their relationships to the financial supporter?",
     "ar": "ما هي علاقاتهم بالداعم المالي؟"
    },
    "type": "text"
   },
   {
    "id": "i134_dependents_contributions",
    "q": {
     "en": "What are the relevant financial contributions made to dependents?",
     "ar": "ما هي المساهمات المالية ذات الصلة المقدمة للمُعالين؟"
    },
    "type": "text"
   },
   {
    "id": "i134_income_sources",
    "q": {
     "en": "What are the financial supporter's income sources and amounts?",
     "ar": "ما هي مصادر دخل الداعم المالي ومقدارها؟"
    },
    "type": "text"
   },
   {
    "id": "i134_income_continuity",
    "q": {
     "en": "Will these income sources continue during the beneficiary’s stay?",
     "ar": "هل ستستمر مصادر الدخل هذه خلال إقامة المستفيد؟"
    },
    "type": "yesno"
   },
   {
    "id": "i134_asset_type",
    "q": {
     "en": "What are the financial supporter's asset types?",
     "ar": "ما هي أنواع أصول الداعم المالي؟"
    },
    "type": "text"
   },
   {
    "id": "i134_asset_ownership",
    "q": {
     "en": "What is the ownership of these assets?",
     "ar": "ما هي ملكية هذه الأصول؟"
    },
    "type": "text"
   },
   {
    "id": "i134_asset_net_value",
    "q": {
     "en": "What is the net value of these assets?",
     "ar": "ما هي القيمة الصافية لهذه الأصول؟"
    },
    "type": "text"
   },
   {
    "id": "i134_beneficiary_name",
    "q": {
     "en": "What is the beneficiary's full name?",
     "ar": "ما هو الاسم الكامل للمستفيد؟"
    },
    "type": "text"
   },
   {
    "id": "i134_beneficiary_birth_info",
    "q": {
     "en": "What is the beneficiary's birth information (date and place)?",
     "ar": "ما هي معلومات ميلاد المستفيد (تاريخ ومكان الميلاد)؟"
    },
    "type": "text"
   },
   {
    "id": "i134_beneficiary_citizenship",
    "q": {
     "en": "What is the beneficiary's citizenship?",
     "ar": "ما هي جنسية المستفيد؟"
    },
    "type": "text"
   },
   {
    "id": "i134_beneficiary_address",
    "q": {
     "en": "What is the beneficiary's address?",
     "ar": "ما هو عنوان المستفيد؟"
    },
    "type": "text"
   },
   {
    "id": "i134_beneficiary_relationship",
    "q": {
     "en": "What is the beneficiary's relationship to the financial supporter?",
     "ar": "ما هي علاقة المستفيد بالداعم المالي؟"
    },
    "type": "text"
   },
   {
    "id": "i134_beneficiary_identifiers",
    "q": {
     "en": "What are the beneficiary's relevant immigration identifiers?",
     "ar": "ما هي معرفات الهجرة ذات الصلة للمستفيد؟"
    },
    "type": "text"
   },
   {
    "id": "i134_beneficiary_income",
    "q": {
     "en": "What is the beneficiary's applicable income?",
     "ar": "ما هو دخل المستفيد القابل للتطبيق؟"
    },
    "type": "text"
   },
   {
    "id": "i134_beneficiary_dependents",
    "q": {
     "en": "Does the beneficiary have dependents?",
     "ar": "هل للمستفيد معالون؟"
    },
    "type": "yesno"
   },
   {
    "id": "i134_beneficiary_assets",
    "q": {
     "en": "What are the beneficiary's assets?",
     "ar": "ما هي أصول المستفيد؟"
    },
    "type": "text"
   },
   {
    "id": "i134_beneficiary_resources_available",
    "q": {
     "en": "What are the beneficiary's resources available during the stay?",
     "ar": "ما هي الموارد المتاحة للمستفيد خلال الإقامة؟"
    },
    "type": "text"
   },
   {
    "id": "i134_expected_stay_duration",
    "q": {
     "en": "What is the expected duration of the beneficiary's stay?",
     "ar": "ما هي المدة المتوقعة لإقامة المستفيد؟"
    },
    "type": "text"
   },
   {
    "id": "i134_support_provided",
    "q": {
     "en": "What money, housing, food, or other support will be provided?",
     "ar": "ما هو الدعم المالي أو السكني أو الغذائي أو غيره الذي سيتم تقديمه؟"
    },
    "type": "textarea"
   },
   {
    "id": "i134_signer_contact_info",
    "q": {
     "en": "What are the correct signer's contact information?",
     "ar": "ما هي معلومات الاتصال للموقع الصحيح؟"
    },
    "type": "text"
   },
   {
    "id": "i134_interpreter_details",
    "q": {
     "en": "If applicable, what are the interpreter's details?",
     "ar": "إذا كان ذلك منطبقًا، ما هي تفاصيل المترجم؟"
    },
    "type": "text"
   },
   {
    "id": "i134_preparer_details",
    "q": {
     "en": "If applicable, what are the preparer's details?",
     "ar": "إذا كان ذلك منطبقًا، ما هي تفاصيل المُعد؟"
    },
    "type": "text"
   }
  ],
  "docs": [
   {
    "en": "Completed, signed I-134",
    "ar": "نموذج I-134 مكتمل وموقع"
   },
   {
    "en": "Identity/status evidence",
    "ar": "إثبات الهوية/الحالة"
   },
   {
    "en": "Employer letter (employment, start date, salary, and temporary/permanent position)",
    "ar": "رسالة من صاحب العمل (توضح العمل، تاريخ البدء، الراتب، والوظيفة مؤقتة/دائمة)"
   },
   {
    "en": "Recent pay statements",
    "ar": "كشوف رواتب حديثة"
   },
   {
    "en": "Bank letter/statements (deposits, balances, and available funds)",
    "ar": "خطاب/كشوف حساب بنكية (توضح الودائع، الأرصدة، والأموال المتاحة)"
   },
   {
    "en": "Most recent tax transcript or return; relevant W-2/1099 records",
    "ar": "أحدث كشف ضريبي أو إقرار ضريبي؛ سجلات W-2/1099 ذات الصلة"
   },
   {
    "en": "Self-employment records (applicable tax schedules and evidence of ongoing business income)",
    "ar": "سجلات العمل الحر (الجداول الضريبية المطبقة وإثبات الدخل التجاري المستمر)"
   },
   {
    "en": "Asset records (ownership, value, and available equity)",
    "ar": "سجلات الأصول (الملكية، القيمة، وحقوق الملكية المتاحة)"
   },
   {
    "en": "Beneficiary’s financial evidence",
    "ar": "الإثبات المالي للمستفيد"
   }
  ]
 },
 {
  "code": "I-407",
  "title": {
   "en": "I-407 Abandonment of Lawful Permanent Resident Status",
   "ar": "I-407 التخلي عن صفة المقيم الدائم الشرعي"
  },
  "questions": [
   {
    "id": "voluntarily_abandon_status",
    "q": {
     "en": "Do you voluntarily intend to give up permanent resident status?",
     "ar": "هل تنوي طواعية التخلي عن صفة المقيم الدائم؟"
    },
    "type": "yesno"
   },
   {
    "id": "location_or_prior_abandonment",
    "q": {
     "en": "Are you outside the United States, at a U.S. port of entry, or documenting an earlier abandonment?",
     "ar": "هل أنت خارج الولايات المتحدة، أم في ميناء دخول أمريكي، أم توثّق تخلّيًا سابقًا؟"
    },
    "type": "text"
   },
   {
    "id": "understand_status_loss_waiver",
    "q": {
     "en": "Do you understand the status loss and hearing-rights waiver?",
     "ar": "هل تفهم فقدان الصفة والتنازل عن حقوق الاستماع؟"
    },
    "type": "yesno"
   },
   {
    "id": "acting_as",
    "q": {
     "en": "Are you acting for yourself, a child, or an incapacitated adult?",
     "ar": "هل تتصرف عن نفسك، أو عن طفل، أو عن شخص بالغ عاجز؟"
    },
    "type": "text"
   },
   {
    "id": "uncertain_or_pressured",
    "q": {
     "en": "Are you uncertain or being pressured to sign?",
     "ar": "هل أنت غير متأكد أم تتعرض لضغوط للتوقيع؟"
    },
    "type": "yesno"
   },
   {
    "id": "reviewed_tax_consequences",
    "q": {
     "en": "Have you reviewed possible U.S. tax consequences?",
     "ar": "هل راجعت العواقب الضريبية الأمريكية المحتملة؟"
    },
    "type": "yesno"
   },
   {
    "id": "a_number",
    "q": {
     "en": "A-number",
     "ar": "رقم A"
    },
    "type": "text"
   },
   {
    "id": "uscis_online_account_number",
    "q": {
     "en": "USCIS online account number (if any)",
     "ar": "رقم حساب USCIS عبر الإنترنت (إن وجد)"
    },
    "type": "text"
   },
   {
    "id": "name_on_green_card",
    "q": {
     "en": "Name exactly as shown on the Green Card",
     "ar": "الاسم تمامًا كما هو موضح في البطاقة الخضراء"
    },
    "type": "text"
   },
   {
    "id": "current_legal_name",
    "q": {
     "en": "Current legal name",
     "ar": "الاسم القانوني الحالي"
    },
    "type": "text"
   },
   {
    "id": "date_of_birth",
    "q": {
     "en": "Date of birth",
     "ar": "تاريخ الميلاد"
    },
    "type": "date"
   },
   {
    "id": "country_of_birth",
    "q": {
     "en": "Country of birth",
     "ar": "بلد الميلاد"
    },
    "type": "text"
   },
   {
    "id": "citizenship_or_nationality",
    "q": {
     "en": "Citizenship or nationality",
     "ar": "الجنسية أو القومية"
    },
    "type": "text"
   },
   {
    "id": "date_of_last_departure_us",
    "q": {
     "en": "Date of last departure from the United States",
     "ar": "تاريخ آخر مغادرة من الولايات المتحدة"
    },
    "type": "date"
   },
   {
    "id": "overseas_mailing_address",
    "q": {
     "en": "Overseas mailing address",
     "ar": "عنوان المراسلات في الخارج"
    },
    "type": "textarea"
   },
   {
    "id": "email",
    "q": {
     "en": "Email",
     "ar": "البريد الإلكتروني"
    },
    "type": "text"
   },
   {
    "id": "green_card_surrendered",
    "q": {
     "en": "Is the Green Card being surrendered?",
     "ar": "هل يتم تسليم البطاقة الخضراء؟"
    },
    "type": "yesno"
   },
   {
    "id": "green_card_unavailable_reason",
    "q": {
     "en": "If Green Card is unavailable, is it lost, stolen, mutilated, or another circumstance? (Explain)",
     "ar": "إذا كانت البطاقة الخضراء غير متوفرة، فهل هي مفقودة، مسروقة، مشوهة، أم بسبب ظرف آخر؟ (اذكر السبب)"
    },
    "type": "textarea"
   },
   {
    "id": "other_uscis_documents_returned",
    "q": {
     "en": "List USCIS documents being returned (besides Green Card)",
     "ar": "اذكر وثائق USCIS الأخرى التي يتم إرجاعها (بجانب البطاقة الخضراء)"
    },
    "type": "textarea"
   },
   {
    "id": "submission_method",
    "q": {
     "en": "How will I-407 be submitted: Overseas mail, permitted in-person submission, port of entry, or recording prior abandonment?",
     "ar": "كيف سيتم تقديم I-407: بريد خارجي، تقديم شخصي مسموح به، ميناء دخول، أو تسجيل تخلي سابق؟"
    },
    "type": "text"
   },
   {
    "id": "signer_name",
    "q": {
     "en": "Appropriate signer's name",
     "ar": "اسم الموقّع المناسب"
    },
    "type": "text"
   },
   {
    "id": "signer_signature_date",
    "q": {
     "en": "Appropriate signer's signature and date",
     "ar": "توقيع الموقّع المناسب وتاريخه"
    },
    "type": "text"
   },
   {
    "id": "interpreter_details",
    "q": {
     "en": "Interpreter details and signature (when applicable)",
     "ar": "تفاصيل وتوقيع المترجم (عند الاقتضاء)"
    },
    "type": "textarea"
   },
   {
    "id": "preparer_details",
    "q": {
     "en": "Preparer details and signature (when applicable)",
     "ar": "تفاصيل وتوقيع المحضر (عند الاقتضاء)"
    },
    "type": "textarea"
   },
   {
    "id": "missing_card_certification",
    "q": {
     "en": "Complete the missing-card certification when required.",
     "ar": "أكمل شهادة البطاقة المفقودة عند الاقتضاء."
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed, signed I-407 (all pages)",
    "ar": "نموذج I-407 مكتمل وموقع (جميع الصفحات)"
   },
   {
    "en": "Original Green Card (if possessed, for surrender)",
    "ar": "البطاقة الخضراء الأصلية (إذا كانت بحوزتك، للتنازل)"
   },
   {
    "en": "Reentry permits/refugee travel documents (for surrender as directed)",
    "ar": "تصاريح إعادة الدخول/وثائق سفر اللاجئين (للتنازل حسب التوجيهات)"
   },
   {
    "en": "Missing-card explanation/certification (when card unavailable)",
    "ar": "شرح/شهادة البطاقة المفقودة (عند عدم توفر البطاقة)"
   },
   {
    "en": "Birth certificate (for representative-signature cases)",
    "ar": "شهادة الميلاد (لحالات توقيع الممثل)"
   },
   {
    "en": "Custody evidence (for representative-signature cases involving children)",
    "ar": "إثبات الحضانة (لحالات توقيع الممثل التي تخص الأطفال)"
   },
   {
    "en": "Guardianship order (for representative-signature cases involving incapacitated adults or children)",
    "ar": "أمر الوصاية (لحالات توقيع الممثل التي تخص البالغين العاجزين أو الأطفال)"
   },
   {
    "en": "Certified English translations (for foreign-language supporting evidence)",
    "ar": "ترجمات إنجليزية معتمدة (للأدلة الداعمة باللغات الأجنبية)"
   },
   {
    "en": "Copy of the complete packet and surrendered documents (for client’s records)",
    "ar": "نسخة من الحزمة الكاملة والوثائق المسلمة (لسجلات العميل)"
   }
  ]
 },
 {
  "code": "I-485",
  "title": {
   "en": "I-485 Register Permanent Residence or Adjust Status",
   "ar": "I-485 تسجيل الإقامة الدائمة أو تعديل الوضع"
  },
  "questions": [
   {
    "id": "i485_q1_physically_inside_us",
    "q": {
     "en": "Are you physically inside the United States?",
     "ar": "هل أنت متواجد فعلياً داخل الولايات المتحدة؟"
    },
    "type": "yesno"
   },
   {
    "id": "i485_q2_immigration_category",
    "q": {
     "en": "What is your immigration category?",
     "ar": "ما هي فئة هجرتك؟"
    },
    "type": "text"
   },
   {
    "id": "i485_q3_principal_derivative",
    "q": {
     "en": "Are you a principal or derivative applicant?",
     "ar": "هل أنت مقدم الطلب الرئيسي أم مشتق؟"
    },
    "type": "text"
   },
   {
    "id": "i485_q4_underlying_petition_status",
    "q": {
     "en": "Is the underlying petition pending, approved, or being filed together?",
     "ar": "هل الالتماس الأساسي معلّق، أم تمت الموافقة عليه، أم يتم تقديمهما معاً؟"
    },
    "type": "text"
   },
   {
    "id": "i485_q5_priority_date_chargeability_country",
    "q": {
     "en": "What are your priority date and country of chargeability?",
     "ar": "ما هو تاريخ أولويتك وبلد الجنسية المنسوبة إليك؟"
    },
    "type": "text"
   },
   {
    "id": "i485_q6_how_entered_us",
    "q": {
     "en": "How did you enter the United States?",
     "ar": "كيف دخلت الولايات المتحدة؟"
    },
    "type": "text"
   },
   {
    "id": "i485_q7_overstayed_unauthorized_work_violated_status",
    "q": {
     "en": "Have you overstayed, worked without authorization, or violated status?",
     "ar": "هل تجاوزت مدة إقامتك، أو عملت بدون تصريح، أو انتهكت وضعك القانوني؟"
    },
    "type": "yesno"
   },
   {
    "id": "i485_q8_removal_proceedings_prior_removals_arrests_fraud_admissibility",
    "q": {
     "en": "Are there removal proceedings, prior removals, arrests, fraud allegations, or other admissibility concerns?",
     "ar": "هل هناك إجراءات ترحيل، أو ترحيلات سابقة، أو اعتقالات، أو ادعاءات احتيال، أو مخاوف أخرى تتعلق بالقبول؟"
    },
    "type": "yesno"
   },
   {
    "id": "i485_q9_identity_details",
    "q": {
     "en": "Provide your legal name, other names used, birth information, citizenship, A-number, applicable identifiers, and biographic details.",
     "ar": "قدم اسمك القانوني، الأسماء الأخرى المستخدمة، معلومات الميلاد، الجنسية، رقم A-number، المعرّفات المطبقة، والتفاصيل البيوغرافية."
    },
    "type": "textarea"
   },
   {
    "id": "i485_q10_contact_history",
    "q": {
     "en": "Provide your current mailing and physical addresses, required address history, employment and education history.",
     "ar": "قدم عناوينك البريدية والمادية الحالية، تاريخ العناوين المطلوب، تاريخ التوظيف والتعليم."
    },
    "type": "textarea"
   },
   {
    "id": "i485_q11_immigration_history",
    "q": {
     "en": "Provide your passport/visa details, entries and departures, I-94, status changes, previous applications and decisions.",
     "ar": "قدم تفاصيل جواز سفرك/تأشيرتك، الدخول والمغادرة، I-94، تغييرات الوضع، الطلبات والقرارات السابقة."
    },
    "type": "textarea"
   },
   {
    "id": "i485_q12_filing_basis",
    "q": {
     "en": "Provide your category, petition details, priority date, and principal/derivative relationship.",
     "ar": "قدم فئتك، تفاصيل الالتماس، تاريخ الأولوية، والعلاقة الرئيسية/التابعة."
    },
    "type": "textarea"
   },
   {
    "id": "i485_q13_family_details",
    "q": {
     "en": "Provide details for your parents, current/former spouses, marriages and terminations, and children.",
     "ar": "قدم تفاصيل والديك، أزواجك الحاليين/السابقين، الزيجات والإنهاءات، والأطفال."
    },
    "type": "textarea"
   },
   {
    "id": "i485_q14_admissibility_questions",
    "q": {
     "en": "Answer every applicable criminal, immigration, security, fraud, and other eligibility question.",
     "ar": "أجب عن كل سؤال مطبق متعلق بالجنايات، الهجرة، الأمن، الاحتيال، وأسئلة الأهلية الأخرى."
    },
    "type": "textarea"
   },
   {
    "id": "i485_q15_public_charge_details",
    "q": {
     "en": "Answer current-edition public charge questions and provide any applicable exemption with supporting explanations.",
     "ar": "أجب عن أسئلة تهمة العبء العام للطبعة الحالية وقدم أي إعفاء مطبق مع شرح داعم."
    },
    "type": "textarea"
   },
   {
    "id": "i485_q16_completion_details",
    "q": {
     "en": "Provide applicant certification, interpreter/preparer details, signatures, and additional information.",
     "ar": "قدم شهادة مقدم الطلب، تفاصيل المترجم/المعد، التوقيعات، ومعلومات إضافية."
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed, signed I-485",
    "ar": "نموذج I-485 مكتمل وموقع"
   },
   {
    "en": "Two passport-style photographs",
    "ar": "صورتان شخصيتان بحجم جواز السفر"
   },
   {
    "en": "Government photo identification",
    "ar": "وثيقة هوية حكومية مصورة"
   },
   {
    "en": "Birth certificate (with certified translation)",
    "ar": "شهادة ميلاد (مع ترجمة معتمدة)"
   },
   {
    "en": "Passport, visa, entry stamps, I-94",
    "ar": "جواز السفر، التأشيرة، أختام الدخول، I-94"
   },
   {
    "en": "Petition receipt/approval notice (unless properly filed concurrently)",
    "ar": "إشعار استلام/موافقة الالتماس (ما لم يتم تقديمه بشكل صحيح بالتزامن)"
   },
   {
    "en": "Marriage, divorce, death, adoption records",
    "ar": "سجلات الزواج، الطلاق، الوفاة، التبني"
   },
   {
    "en": "Status-maintenance records",
    "ar": "سجلات الحفاظ على الوضع"
   },
   {
    "en": "I-864/I-864EZ and financial evidence",
    "ar": "I-864/I-864EZ والأدلة المالية"
   },
   {
    "en": "Certified criminal dispositions and relevant police/court records",
    "ar": "أحكام جنائية معتمدة وسجلات الشرطة/المحكمة ذات الصلة"
   },
   {
    "en": "I-693 or required partial I-693",
    "ar": "I-693 أو I-693 الجزئي المطلوب"
   },
   {
    "en": "Applicable supplements, waivers, and supporting evidence",
    "ar": "الملحقات، التنازلات، والأدلة الداعمة المطبقة"
   },
   {
    "en": "Principal applicant’s records (for derivative cases)",
    "ar": "سجلات مقدم الطلب الرئيسي (للحالات التابعة)"
   },
   {
    "en": "Supplement J or occupational-intent statement (for employment cases)",
    "ar": "المُلحق J أو بيان نية المهنة (لحالات التوظيف)"
   },
   {
    "en": "Eligibility evidence (for asylum/refugee and special-category cases)",
    "ar": "دليل الأهلية (لحالات اللجوء/اللاجئين والفئات الخاصة)"
   }
  ]
 },
 {
  "code": "I-539",
  "title": {
   "en": "I-539 Extend / Change Nonimmigrant Status",
   "ar": "I-539 تمديد / تغيير وضع غير المهاجر"
  },
  "questions": [
   {
    "id": "i539_eligibility_us_physical",
    "q": {
     "en": "Are you currently physically inside the United States?",
     "ar": "هل أنت متواجد حاليًا داخل الولايات المتحدة الأمريكية؟"
    },
    "type": "yesno"
   },
   {
    "id": "i539_eligibility_current_classification",
    "q": {
     "en": "What is your current immigration classification?",
     "ar": "ما هو تصنيف الهجرة الحالي الخاص بك؟"
    },
    "type": "text"
   },
   {
    "id": "i539_eligibility_request_type",
    "q": {
     "en": "Are you requesting an extension, change of status, or student reinstatement?",
     "ar": "هل تطلب تمديدًا، تغييرًا في الوضع، أم إعادة وضع طالب؟"
    },
    "type": "text"
   },
   {
    "id": "i539_eligibility_requested_classification",
    "q": {
     "en": "What classification are you requesting?",
     "ar": "ما هو التصنيف الذي تطلبه؟"
    },
    "type": "text"
   },
   {
    "id": "i539_eligibility_i94_expiration",
    "q": {
     "en": "What is your latest I-94 expiration date, or does it show D/S?",
     "ar": "ما هو أحدث تاريخ انتهاء صلاحية لنموذج I-94 الخاص بك، أم أنه يظهر D/S؟"
    },
    "type": "text"
   },
   {
    "id": "i539_eligibility_status_violation",
    "q": {
     "en": "Have you violated your status, worked without authorization, or filed after your authorized stay expired?",
     "ar": "هل انتهكت وضعك، عملت بدون ترخيص، أو قدمت الطلب بعد انتهاء إقامتك المعتمدة؟"
    },
    "type": "yesno"
   },
   {
    "id": "i539_eligibility_removal_proceedings",
    "q": {
     "en": "Are you in removal proceedings?",
     "ar": "هل أنت قيد إجراءات الترحيل؟"
    },
    "type": "yesno"
   },
   {
    "id": "i539_eligibility_family_included",
    "q": {
     "en": "Are you including a spouse or unmarried children under 21?",
     "ar": "هل تضم زوجًا أو أطفالًا غير متزوجين تحت 21 عامًا؟"
    },
    "type": "yesno"
   },
   {
    "id": "i539_eligibility_other_pending_application",
    "q": {
     "en": "Do you have another pending immigration application?",
     "ar": "هل لديك طلب هجرة آخر قيد الانتظار؟"
    },
    "type": "yesno"
   },
   {
    "id": "i539_eligibility_departed_or_plan_to_depart",
    "q": {
     "en": "Have you departed, or do you plan to depart, while this application is pending?",
     "ar": "هل غادرت، أو هل تخطط للمغادرة، أثناء انتظار هذا الطلب؟"
    },
    "type": "yesno"
   },
   {
    "id": "i539_identity_legal_name",
    "q": {
     "en": "What is your full legal name?",
     "ar": "ما هو اسمك القانوني الكامل؟"
    },
    "type": "text"
   },
   {
    "id": "i539_identity_other_names",
    "q": {
     "en": "Have you used any other names?",
     "ar": "هل استخدمت أي أسماء أخرى؟"
    },
    "type": "text"
   },
   {
    "id": "i539_identity_dob_pob",
    "q": {
     "en": "What is your date and place of birth?",
     "ar": "ما هو تاريخ ومكان ميلادك؟"
    },
    "type": "text"
   },
   {
    "id": "i539_identity_citizenship",
    "q": {
     "en": "What is your country of citizenship?",
     "ar": "ما هي دولة جنسيتك؟"
    },
    "type": "text"
   },
   {
    "id": "i539_identity_anumber",
    "q": {
     "en": "What is your A-number, if any?",
     "ar": "ما هو رقم A-number الخاص بك، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "i539_identity_uscis_account_number",
    "q": {
     "en": "What is your USCIS account number, if any?",
     "ar": "ما هو رقم حسابك لدى USCIS، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "i539_addresses_us_physical",
    "q": {
     "en": "What is your U.S. physical address?",
     "ar": "ما هو عنوان سكنك في الولايات المتحدة؟"
    },
    "type": "text"
   },
   {
    "id": "i539_addresses_us_mailing",
    "q": {
     "en": "What is your U.S. mailing address?",
     "ar": "ما هو عنوان بريدك في الولايات المتحدة؟"
    },
    "type": "text"
   },
   {
    "id": "i539_addresses_foreign",
    "q": {
     "en": "What is your foreign address?",
     "ar": "ما هو عنوانك الأجنبي؟"
    },
    "type": "text"
   },
   {
    "id": "i539_contact_telephone",
    "q": {
     "en": "What is your telephone number?",
     "ar": "ما هو رقم هاتفك؟"
    },
    "type": "text"
   },
   {
    "id": "i539_contact_email",
    "q": {
     "en": "What is your email address?",
     "ar": "ما هو عنوان بريدك الإلكتروني؟"
    },
    "type": "text"
   },
   {
    "id": "i539_passport_number",
    "q": {
     "en": "What is your passport number?",
     "ar": "ما هو رقم جواز سفرك؟"
    },
    "type": "text"
   },
   {
    "id": "i539_passport_issuing_country",
    "q": {
     "en": "Which country issued your passport?",
     "ar": "ما هي الدولة التي أصدرت جواز سفرك؟"
    },
    "type": "text"
   },
   {
    "id": "i539_passport_issue_date",
    "q": {
     "en": "What is your passport issue date?",
     "ar": "ما هو تاريخ إصدار جواز سفرك؟"
    },
    "type": "date"
   },
   {
    "id": "i539_passport_expiration_date",
    "q": {
     "en": "What is your passport expiration date?",
     "ar": "ما هو تاريخ انتهاء صلاحية جواز سفرك؟"
    },
    "type": "date"
   },
   {
    "id": "i539_admission_most_recent_arrival_date",
    "q": {
     "en": "What was your most recent U.S. arrival date?",
     "ar": "ما هو أحدث تاريخ وصول لك إلى الولايات المتحدة؟"
    },
    "type": "date"
   },
   {
    "id": "i539_admission_i94_number",
    "q": {
     "en": "What is your I-94 number?",
     "ar": "ما هو رقم I-94 الخاص بك؟"
    },
    "type": "text"
   },
   {
    "id": "i539_admission_classification",
    "q": {
     "en": "What is your admission classification?",
     "ar": "ما هو تصنيف قبولك؟"
    },
    "type": "text"
   },
   {
    "id": "i539_admission_authorized_stay_expiration",
    "q": {
     "en": "What is your authorized-stay expiration or D/S?",
     "ar": "ما هو تاريخ انتهاء إقامتك المعتمدة أو D/S؟"
    },
    "type": "text"
   },
   {
    "id": "i539_requested_benefit_type",
    "q": {
     "en": "Are you requesting an extension, change of status, or reinstatement?",
     "ar": "هل تطلب تمديدًا، تغييرًا في الوضع، أم إعادة وضع؟"
    },
    "type": "text"
   },
   {
    "id": "i539_requested_classification",
    "q": {
     "en": "What classification are you requesting?",
     "ar": "ما هو التصنيف الذي تطلبه؟"
    },
    "type": "text"
   },
   {
    "id": "i539_requested_end_date",
    "q": {
     "en": "What is your requested end date?",
     "ar": "ما هو تاريخ الانتهاء المطلوب؟"
    },
    "type": "date"
   },
   {
    "id": "i539_requested_explanation",
    "q": {
     "en": "Please provide an explanation for your requested benefit.",
     "ar": "يرجى تقديم شرح للخدمة المطلوبة."
    },
    "type": "textarea"
   },
   {
    "id": "i539_financial_employment",
    "q": {
     "en": "What is your employment information?",
     "ar": "ما هي معلومات عملك؟"
    },
    "type": "textarea"
   },
   {
    "id": "i539_financial_income",
    "q": {
     "en": "What is your income?",
     "ar": "ما هو دخلك؟"
    },
    "type": "text"
   },
   {
    "id": "i539_financial_savings",
    "q": {
     "en": "What are your savings?",
     "ar": "ما هي مدخراتك؟"
    },
    "type": "text"
   },
   {
    "id": "i539_financial_sponsor",
    "q": {
     "en": "Who is your sponsor/supporter, if any?",
     "ar": "من هو الكفيل/الداعم الخاص بك، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "i539_financial_expenses_paid",
    "q": {
     "en": "How will your expenses be paid?",
     "ar": "كيف سيتم دفع نفقاتك؟"
    },
    "type": "textarea"
   },
   {
    "id": "i539_immigration_history_prior_applications",
    "q": {
     "en": "Have you had any prior immigration applications?",
     "ar": "هل كان لديك أي طلبات هجرة سابقة؟"
    },
    "type": "textarea"
   },
   {
    "id": "i539_immigration_history_pending_petitions",
    "q": {
     "en": "Do you have any pending petitions?",
     "ar": "هل لديك أي التماسات معلقة؟"
    },
    "type": "textarea"
   },
   {
    "id": "i539_immigration_history_status_violations",
    "q": {
     "en": "Have you had any status violations and relevant proceedings?",
     "ar": "هل كان لديك أي انتهاكات للوضع أو إجراءات ذات صلة؟"
    },
    "type": "textarea"
   },
   {
    "id": "i539_family_identity",
    "q": {
     "en": "What is the identity of each family applicant (full legal name, other names, DOB, POB, citizenship, A-number, USCIS account number)?",
     "ar": "ما هي هوية كل فرد من أفراد العائلة المتقدمين (الاسم القانوني الكامل، الأسماء الأخرى، تاريخ ومكان الميلاد، الجنسية، رقم A-number، رقم حساب USCIS)؟"
    },
    "type": "textarea"
   },
   {
    "id": "i539_family_relationship",
    "q": {
     "en": "What is the relationship of each family applicant to the principal?",
     "ar": "ما هي علاقة كل فرد من أفراد العائلة المتقدمين بالمتقدم الرئيسي؟"
    },
    "type": "text"
   },
   {
    "id": "i539_family_passport",
    "q": {
     "en": "What is the passport information for each family applicant (number, issuing country, issue/expiration dates)?",
     "ar": "ما هي معلومات جواز السفر لكل فرد من أفراد العائلة المتقدمين (الرقم، الدولة المصدرة، تواريخ الإصدار والانتهاء)؟"
    },
    "type": "textarea"
   },
   {
    "id": "i539_family_i94",
    "q": {
     "en": "What is the I-94 information for each family applicant (number, authorized-stay expiration or D/S)?",
     "ar": "ما هي معلومات I-94 لكل فرد من أفراد العائلة المتقدمين (الرقم، تاريخ انتهاء الإقامة المعتمدة أو D/S)؟"
    },
    "type": "textarea"
   },
   {
    "id": "i539_family_current_status",
    "q": {
     "en": "What is the current status for each family applicant?",
     "ar": "ما هو الوضع الحالي لكل فرد من أفراد العائلة المتقدمين؟"
    },
    "type": "text"
   },
   {
    "id": "i539_category_school_program_info",
    "q": {
     "en": "What is your school/program information (for F-1/M-1 related requests)?",
     "ar": "ما هي معلومات مدرستك/برنامجك (لطلبات F-1/M-1)؟"
    },
    "type": "textarea"
   },
   {
    "id": "i539_category_principal_applicant_status",
    "q": {
     "en": "What is the principal applicant's status (for dependents)?",
     "ar": "ما هو وضع المتقدم الرئيسي (للمعالين)؟"
    },
    "type": "text"
   },
   {
    "id": "i539_category_visitor_plans",
    "q": {
     "en": "What are your visitor plans (for B-1/B-2 related requests)?",
     "ar": "ما هي خطط زيارتك (لطلبات B-1/B-2)؟"
    },
    "type": "textarea"
   },
   {
    "id": "i539_declarations",
    "q": {
     "en": "Please provide answers to every applicable question from the actual form's declarations section.",
     "ar": "يرجى تقديم إجابات لكل سؤال من قسم الإقرارات في النموذج الفعلي."
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed, signed I-539 (for paper filing) or confirmation of online application",
    "ar": "نموذج I-539 مكتمل وموقع (للتقديم الورقي) أو تأكيد الطلب عبر الإنترنت"
   },
   {
    "en": "I-94 for each applicant",
    "ar": "نموذج I-94 لكل متقدم"
   },
   {
    "en": "Passport identification and validity pages; relevant visa/admission pages",
    "ar": "صفحات تحديد الهوية وصلاحية جواز السفر؛ صفحات التأشيرة/القبول ذات الصلة"
   },
   {
    "en": "Relevant USCIS approval notices and pending-case receipts",
    "ar": "إشعارات موافقة USCIS ذات الصلة وإيصالات القضايا المعلقة"
   },
   {
    "en": "Evidence supporting the requested benefit and continued eligibility (e.g., financial support, employment, school enrollment)",
    "ar": "أدلة تدعم الخدمة المطلوبة والأهلية المستمرة (مثل: الدعم المالي، التوظيف، التسجيل في المدرسة)"
   },
   {
    "en": "I-539A for each additional eligible family applicant (for combined paper application)",
    "ar": "نموذج I-539A لكل فرد إضافي مؤهل من أفراد العائلة (للطلب الورقي المجمع)"
   },
   {
    "en": "Written explanation of the request, why the stay is temporary, departure arrangements, financial support, and effect on foreign employment/residence (for B-1/B-2 extension or change)",
    "ar": "شرح مكتوب للطلب، سبب الإقامة المؤقتة، ترتيبات المغادرة، الدعم المالي، وتأثيره على العمل/الإقامة الأجنبية (لتمديد أو تغيير B-1/B-2)"
   },
   {
    "en": "Appropriate Form I-20 and evidence of funds for tuition, living costs and dependents; SEVIS fee evidence where required (for change to F-1/M-1)",
    "ar": "نموذج I-20 المناسب وإثبات الأموال لتكاليف الدراسة والمعيشة والمعالين؛ إثبات رسوم SEVIS عند الاقتضاء (لتغيير الوضع إلى F-1/M-1)"
   },
   {
    "en": "Appropriate I-20, financial evidence and documents explaining the status violation and reinstatement eligibility (for F/M reinstatement)",
    "ar": "نموذج I-20 المناسب، أدلة مالية ووثائق تشرح انتهاك الوضع وأهلية إعادة الوضع (لإعادة وضع F/M)"
   },
   {
    "en": "Marriage/birth certificates, principal's status documents and applicable petition/approval/receipt evidence (for dependent status H-4, L-2, F-2, E dependent)",
    "ar": "شهادات الزواج/الميلاد، وثائق وضع المتقدم الرئيسي وأدلة الالتماس/الموافقة/الإيصال المعمول بها (لوضع المعالين H-4, L-2, F-2, E)"
   },
   {
    "en": "Certified English translations of foreign-language documents",
    "ar": "ترجمات إنجليزية معتمدة للوثائق باللغة الأجنبية"
   }
  ]
 },
 {
  "code": "I-589",
  "title": {
   "en": "I-589 Asylum and Withholding of Removal",
   "ar": "طلب اللجوء وحجب الترحيل I-589"
  },
  "questions": [
   {
    "id": "q1_physical_presence",
    "q": {
     "en": "Are you physically present in the United States? Are you a U.S. citizen?",
     "ar": "هل أنت متواجد فعلياً في الولايات المتحدة؟ هل أنت مواطن أمريكي؟"
    },
    "type": "yesno"
   },
   {
    "id": "q2_entry_date",
    "q": {
     "en": "When did you enter the United States? List every entry and departure.",
     "ar": "متى دخلت الولايات المتحدة؟ اذكر كل دخول ومغادرة."
    },
    "type": "textarea"
   },
   {
    "id": "q3_prior_notices",
    "q": {
     "en": "Have you received an A-number, Notice to Appear, hearing notice, or removal order?",
     "ar": "هل تلقيت رقم A-number، إشعار المثول، إشعار جلسة استماع، أو أمر ترحيل؟"
    },
    "type": "yesno"
   },
   {
    "id": "q4_prior_asylum_applications",
    "q": {
     "en": "Have you previously applied for asylum in the United States or another country?",
     "ar": "هل سبق لك التقدم بطلب اللجوء في الولايات المتحدة أو بلد آخر؟"
    },
    "type": "yesno"
   },
   {
    "id": "q5_unaccompanied_child",
    "q": {
     "en": "Were you determined to be an unaccompanied alien child?",
     "ar": "هل تم تحديدك كطفل أجنبي غير مصحوب؟"
    },
    "type": "yesno"
   },
   {
    "id": "q6_family_members",
    "q": {
     "en": "Are you including a spouse or children? Where are they located?",
     "ar": "هل تقوم بتضمين زوج أو أطفال؟ أين يتواجدون؟"
    },
    "type": "textarea"
   },
   {
    "id": "q7_filing_delay_reason",
    "q": {
     "en": "If filing more than one year after arrival, what caused the delay?",
     "ar": "إذا كان التقديم بعد أكثر من عام من الوصول، ما هو سبب التأخير؟"
    },
    "type": "textarea"
   },
   {
    "id": "q8_identity",
    "q": {
     "en": "Provide your names and aliases, birth details, nationality, ethnicity, religion, languages, passport information, and A-number.",
     "ar": "قدم أسماءك وأسماءك المستعارة، تفاصيل الميلاد، الجنسية، العرق، الديانة، اللغات، معلومات جواز السفر، ورقم A-number."
    },
    "type": "textarea"
   },
   {
    "id": "q9_us_contact_details",
    "q": {
     "en": "Provide your U.S. contact details.",
     "ar": "قدم تفاصيل الاتصال الخاصة بك في الولايات المتحدة."
    },
    "type": "text"
   },
   {
    "id": "q10_residence_history",
    "q": {
     "en": "Provide your address, education and employment history for the periods requested on the form.",
     "ar": "قدم عنوانك، وتاريخ التعليم والتوظيف للفترات المطلوبة في النموذج."
    },
    "type": "textarea"
   },
   {
    "id": "q11_family_info",
    "q": {
     "en": "Provide information about your spouse, all children, parents and siblings, including their locations and immigration information.",
     "ar": "قدم معلومات عن زوجك، جميع الأطفال، الوالدين والإخوة والأخوات؛ بما في ذلك مواقعهم ومعلومات الهجرة الخاصة بهم."
    },
    "type": "textarea"
   },
   {
    "id": "q12_past_harm",
    "q": {
     "en": "Describe what happened, when, where, who harmed/threatened you, any injuries, and witnesses.",
     "ar": "صف ما حدث، متى، أين، من ألحق بك الأذى/هددك، الإصابات، والشهود."
    },
    "type": "textarea"
   },
   {
    "id": "q13_reason_for_targeting",
    "q": {
     "en": "Why do you believe you were targeted? What did the perpetrators say or do?",
     "ar": "لماذا تعتقد أنك استُهدفت؟ ماذا قال أو فعل الجناة؟"
    },
    "type": "textarea"
   },
   {
    "id": "q14_government_protection",
    "q": {
     "en": "Did you seek police/government help? What happened? If not, why?",
     "ar": "هل طلبت مساعدة الشرطة/الحكومة؟ ماذا حدث؟ إذا لم تفعل، لماذا؟"
    },
    "type": "textarea"
   },
   {
    "id": "q15_future_fear",
    "q": {
     "en": "What do you fear will happen if you return, who would harm you, and why?",
     "ar": "ماذا تخشى أن يحدث إذا عدت، ومن سيؤذيك، ولماذا؟"
    },
    "type": "textarea"
   },
   {
    "id": "q16_relocation",
    "q": {
     "en": "Could you safely live elsewhere in your country? Explain the facts.",
     "ar": "هل يمكنك العيش بأمان في مكان آخر في بلدك؟ اشرح الحقائق."
    },
    "type": "textarea"
   },
   {
    "id": "q17_torture_concerns",
    "q": {
     "en": "What torture do you fear, and what government involvement or acquiescence do you believe exists?",
     "ar": "ما نوع التعذيب الذي تخشاه، وما هو التدخل الحكومي أو التواطؤ الذي تعتقد أنه موجود؟"
    },
    "type": "textarea"
   },
   {
    "id": "q18_additional_history",
    "q": {
     "en": "Provide information about any arrests, charges, convictions, organizations, military activity, harm to others, residence in other countries and return trips.",
     "ar": "قدم معلومات عن أي اعتقالات، اتهامات، إدانات، منظمات، نشاط عسكري، إلحاق الضرر بالآخرين، الإقامة في بلدان أخرى، ورحلات العودة."
    },
    "type": "textarea"
   },
   {
    "id": "q19_applicant_declaration",
    "q": {
     "en": "Applicant’s declaration, interpreter/preparer information and required signatures.",
     "ar": "إقرار مقدم الطلب، معلومات المترجم/المُعد والتوقيعات المطلوبة."
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed, signed I-589 application; Supplement A/B or additional pages where needed",
    "ar": "طلب I-589 مكتمل وموقع؛ ملحق A/B أو صفحات إضافية عند الحاجة"
   },
   {
    "en": "Available passports",
    "ar": "جوازات السفر المتاحة"
   },
   {
    "en": "Identity/birth documents",
    "ar": "وثائق الهوية/الميلاد"
   },
   {
    "en": "Visas",
    "ar": "التأشيرات"
   },
   {
    "en": "I-94 and entry records",
    "ar": "نموذج I-94 وسجلات الدخول"
   },
   {
    "en": "Notices to Appear",
    "ar": "إشعارات المثول"
   },
   {
    "en": "Hearing notices",
    "ar": "إشعارات الجلسات"
   },
   {
    "en": "Orders from immigration proceedings",
    "ar": "أوامر من إجراءات الهجرة"
   },
   {
    "en": "Prior asylum applications and decisions",
    "ar": "طلبات اللجوء السابقة والقرارات"
   },
   {
    "en": "Marriage/birth certificates",
    "ar": "شهادات الزواج/الميلاد"
   },
   {
    "en": "Relevant divorce, adoption or death records",
    "ar": "سجلات الطلاق أو التبني أو الوفاة ذات الصلة"
   },
   {
    "en": "Personal statement (detailed account of events, dates, perpetrators, reasons for targeting and fear of return)",
    "ar": "بيان شخصي (سرد مفصل للأحداث، التواريخ، الجناة، أسباب الاستهداف والخوف من العودة)"
   },
   {
    "en": "Threat messages",
    "ar": "رسائل التهديد"
   },
   {
    "en": "Police/court records",
    "ar": "سجلات الشرطة/المحكمة"
   },
   {
    "en": "Medical or psychological records",
    "ar": "السجلات الطبية أو النفسية"
   },
   {
    "en": "Photographs",
    "ar": "الصور الفوتوغرافية"
   },
   {
    "en": "Witness statements",
    "ar": "إفادات الشهود"
   },
   {
    "en": "Membership/activity records",
    "ar": "سجلات العضوية/النشاط"
   },
   {
    "en": "Relevant reports and articles supporting the applicant’s specific circumstances (country conditions)",
    "ar": "تقارير ومقالات ذات صلة تدعم ظروف مقدم الطلب الخاصة (ظروف البلد)"
   },
   {
    "en": "Documents supporting the explanation for delayed filing, if applicable",
    "ar": "وثائق تدعم تفسير التأخير في التقديم، إن أمكن"
   },
   {
    "en": "Full English translations with translator certification",
    "ar": "ترجمات إنجليزية كاملة مع شهادة المترجم"
   }
  ]
 },
 {
  "code": "I-693",
  "title": {
   "en": "I-693 Immigration Medical Examination and Vaccination Record",
   "ar": "I-693 تقرير الفحص الطبي الخاص بالهجرة وسجل التطعيمات"
  },
  "questions": [
   {
    "id": "full_legal_name",
    "q": {
     "en": "Full legal name",
     "ar": "الاسم القانوني الكامل"
    },
    "type": "text"
   },
   {
    "id": "dob",
    "q": {
     "en": "Date of birth",
     "ar": "تاريخ الميلاد"
    },
    "type": "date"
   },
   {
    "id": "pob",
    "q": {
     "en": "Place of birth",
     "ar": "مكان الميلاد"
    },
    "type": "text"
   },
   {
    "id": "address",
    "q": {
     "en": "Address",
     "ar": "العنوان"
    },
    "type": "textarea"
   },
   {
    "id": "a_number",
    "q": {
     "en": "A-number",
     "ar": "رقم A-number"
    },
    "type": "text"
   },
   {
    "id": "contact_info",
    "q": {
     "en": "Contact information (phone, email)",
     "ar": "معلومات الاتصال (الهاتف، البريد الإلكتروني)"
    },
    "type": "text"
   },
   {
    "id": "medical_application_type",
    "q": {
     "en": "What application requires the medical examination?",
     "ar": "ما هو الطلب الذي يتطلب الفحص الطبي؟"
    },
    "type": "text"
   },
   {
    "id": "i485_status",
    "q": {
     "en": "Is your I-485 being prepared, already pending, or subject to an RFE?",
     "ar": "هل نموذج I-485 الخاص بك قيد الإعداد، معلق بالفعل، أم خاضع لطلب أدلة إضافية (RFE)؟"
    },
    "type": "text"
   },
   {
    "id": "filing_route",
    "q": {
     "en": "Will the underlying application be filed online, by mail, or with immigration court?",
     "ar": "هل سيتم تقديم الطلب الأساسي عبر الإنترنت، بالبريد، أم إلى محكمة الهجرة؟"
    },
    "type": "text"
   },
   {
    "id": "previous_medical_exam",
    "q": {
     "en": "Have you previously completed an immigration medical examination?",
     "ar": "هل أكملت فحصًا طبيًا للهجرة مسبقًا؟"
    },
    "type": "yesno"
   },
   {
    "id": "previous_exam_date",
    "q": {
     "en": "If yes, when was the previous examination?",
     "ar": "إذا كانت الإجابة نعم، متى كان الفحص السابق؟"
    },
    "type": "date"
   },
   {
    "id": "previous_exam_location",
    "q": {
     "en": "If yes, where was the previous examination conducted?",
     "ar": "إذا كانت الإجابة نعم، أين تم إجراء الفحص السابق؟"
    },
    "type": "text"
   },
   {
    "id": "previous_exam_application",
    "q": {
     "en": "If yes, for which application was the previous examination?",
     "ar": "إذا كانت الإجابة نعم، لأي طلب كان الفحص السابق؟"
    },
    "type": "text"
   },
   {
    "id": "special_category",
    "q": {
     "en": "Were you admitted as a refugee, derivative asylee, K visa holder, or under a program with medical exceptions?",
     "ar": "هل تم قبولك كلاجئ، لاجئ مشتق، حامل تأشيرة K، أو بموجب برنامج يتضمن استثناءات طبية؟"
    },
    "type": "text"
   },
   {
    "id": "civil_surgeon_name",
    "q": {
     "en": "Civil surgeon’s name",
     "ar": "اسم الجراح المدني"
    },
    "type": "text"
   },
   {
    "id": "clinic_name",
    "q": {
     "en": "Clinic name",
     "ar": "اسم العيادة"
    },
    "type": "text"
   },
   {
    "id": "appointment_date",
    "q": {
     "en": "Appointment date",
     "ar": "تاريخ الموعد"
    },
    "type": "date"
   },
   {
    "id": "completion_date",
    "q": {
     "en": "Completion date of the examination",
     "ar": "تاريخ الانتهاء من الفحص"
    },
    "type": "date"
   },
   {
    "id": "vaccination_records",
    "q": {
     "en": "Do you have vaccination records?",
     "ar": "هل لديك سجلات تطعيمات؟"
    },
    "type": "yesno"
   },
   {
    "id": "medical_treatment_records",
    "q": {
     "en": "Do you have relevant medical/treatment records?",
     "ar": "هل لديك سجلات طبية/علاجية ذات صلة؟"
    },
    "type": "yesno"
   },
   {
    "id": "interpreter_needed",
    "q": {
     "en": "Do you need an interpreter?",
     "ar": "هل تحتاج إلى مترجم؟"
    },
    "type": "yesno"
   },
   {
    "id": "accessibility_accommodation",
    "q": {
     "en": "Do you need accessibility accommodation?",
     "ar": "هل تحتاج إلى تسهيلات خاصة بذوي الاحتياجات الخاصة؟"
    },
    "type": "yesno"
   },
   {
    "id": "parent_guardian_assistance",
    "q": {
     "en": "Do you need parent/guardian assistance?",
     "ar": "هل تحتاج إلى مساعدة الوالد/الوصي؟"
    },
    "type": "yesno"
   },
   {
    "id": "doctor_completed_exam",
    "q": {
     "en": "Has the doctor completed the examination?",
     "ar": "هل أكمل الطبيب الفحص؟"
    },
    "type": "yesno"
   },
   {
    "id": "doctor_signed_form",
    "q": {
     "en": "Has the doctor signed the form?",
     "ar": "هل وقع الطبيب على النموذج؟"
    },
    "type": "yesno"
   },
   {
    "id": "doctor_provided_envelope",
    "q": {
     "en": "Has the doctor provided the sealed envelope?",
     "ar": "هل قدم الطبيب الظرف المختوم؟"
    },
    "type": "yesno"
   }
  ],
  "docs": [
   {
    "en": "Government-issued photo identification (e.g., valid passport or driver’s license)",
    "ar": "وثيقة هوية حكومية تحمل صورة (مثل جواز سفر ساري المفعول أو رخصة قيادة)"
   },
   {
    "en": "Current Form I-693 (do not sign beforehand)",
    "ar": "نموذج I-693 الحالي (لا توقع عليه مسبقًا)"
   },
   {
    "en": "Available vaccination records",
    "ar": "سجلات التطعيمات المتوفرة"
   },
   {
    "en": "Relevant medical records (prior diagnoses, treatment, hospital records, specialist reports)",
    "ar": "السجلات الطبية ذات الصلة (التشخيصات السابقة، العلاج، سجلات المستشفى، تقارير الأخصائيين)"
   },
   {
    "en": "Medication list",
    "ar": "قائمة الأدوية"
   },
   {
    "en": "Previous immigration medical/vaccination record (e.g., DS-3025), if available",
    "ar": "سجل طبي/تطعيمات الهجرة السابق (مثل DS-3025)، إذا كان متاحًا"
   },
   {
    "en": "USCIS request/notice (any RFE or notice specifically requesting the medical)",
    "ar": "طلب/إشعار من USCIS (أي RFE أو إشعار يطلب الفحص الطبي على وجه التحديد)"
   },
   {
    "en": "Appointment payment (for examination, laboratory, and vaccination costs)",
    "ar": "دفع الموعد (لتكاليف الفحص والمختبر والتطعيمات)"
   }
  ]
 },
 {
  "code": "I-730",
  "title": {
   "en": "I-730 Refugee/Asylee Relative Petition",
   "ar": "نموذج I-730 طلب لم شمل أقارب اللاجئين/طالبي اللجوء"
  },
  "questions": [
   {
    "id": "q1_admitted_as_principal",
    "q": {
     "en": "Were you admitted as a principal refugee, or granted asylum as a principal asylee? On what date?",
     "ar": "هل تم قبولك كلاجئ رئيسي، أو مُنحْت اللجوء كطالب لجوء رئيسي؟ وفي أي تاريخ؟"
    },
    "type": "date"
   },
   {
    "id": "q2_became_permanent_resident_or_citizen",
    "q": {
     "en": "Have you since become a permanent resident or U.S. citizen?",
     "ar": "هل أصبحت منذ ذلك الحين مقيمًا دائمًا أو مواطنًا أمريكيًا؟"
    },
    "type": "yesno"
   },
   {
    "id": "q3_beneficiary_relationship",
    "q": {
     "en": "Is the beneficiary your spouse or unmarried child?",
     "ar": "هل المستفيد هو زوجك/زوجتك أو ابنك/ابنتك غير المتزوج/ة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q4_relationship_start_date",
    "q": {
     "en": "When did the marriage or parent-child relationship begin?",
     "ar": "متى بدأت علاقة الزواج أو الأبوة/الأمومة والطفل؟"
    },
    "type": "date"
   },
   {
    "id": "q5_child_dob_marital_status",
    "q": {
     "en": "What is the child’s birth date and marital status?",
     "ar": "ما هو تاريخ ميلاد الطفل وحالته الاجتماعية؟"
    },
    "type": "text"
   },
   {
    "id": "q6_original_asylum_refugee_application_date",
    "q": {
     "en": "When did you originally apply for asylum or refugee status?",
     "ar": "متى تقدمت بطلب اللجوء أو وضع اللاجئ في الأصل؟"
    },
    "type": "date"
   },
   {
    "id": "q7_filing_within_two_years",
    "q": {
     "en": "Are you filing within two years of refugee admission or asylum approval?",
     "ar": "هل تقدم هذا الطلب خلال سنتين من قبولك كلاجئ أو الموافقة على لجوئك؟"
    },
    "type": "yesno"
   },
   {
    "id": "q8_humanitarian_delay_explanation",
    "q": {
     "en": "If filing late, what humanitarian circumstances explain the delay?",
     "ar": "إذا كنت تقدم الطلب متأخرًا، فما هي الظروف الإنسانية التي تفسر التأخير؟"
    },
    "type": "textarea"
   },
   {
    "id": "q9_beneficiary_location",
    "q": {
     "en": "Is the beneficiary inside or outside the United States?",
     "ar": "هل المستفيد داخل أم خارج الولايات المتحدة؟"
    },
    "type": "text"
   },
   {
    "id": "q10_beneficiary_previous_status",
    "q": {
     "en": "Has this relative previously received derivative refugee/asylee status or been included in another petition?",
     "ar": "هل حصل هذا القريب سابقًا على وضع لاجئ/طالب لجوء مشتق أو تم تضمينه في طلب آخر؟"
    },
    "type": "yesno"
   },
   {
    "id": "q11_petitioner_legal_name",
    "q": {
     "en": "Petitioner's full legal name, including any aliases.",
     "ar": "الاسم القانوني الكامل لمقدم الطلب، بما في ذلك أي أسماء مستعارة."
    },
    "type": "text"
   },
   {
    "id": "q12_petitioner_birth_details",
    "q": {
     "en": "Petitioner's birth details (date and place of birth).",
     "ar": "تفاصيل ميلاد مقدم الطلب (تاريخ ومكان الميلاد)."
    },
    "type": "text"
   },
   {
    "id": "q13_petitioner_a_number",
    "q": {
     "en": "Petitioner's A-number (Alien Registration Number).",
     "ar": "رقم A لمقدم الطلب (رقم تسجيل الأجانب)."
    },
    "type": "text"
   },
   {
    "id": "q14_petitioner_contact_info",
    "q": {
     "en": "Petitioner's address, telephone number, and email address.",
     "ar": "عنوان مقدم الطلب، رقم الهاتف، وعنوان البريد الإلكتروني."
    },
    "type": "text"
   },
   {
    "id": "q15_petitioner_refugee_asylum_approval_date",
    "q": {
     "en": "Petitioner's refugee admission or asylum approval date.",
     "ar": "تاريخ قبول مقدم الطلب كلاجئ أو الموافقة على لجوئه."
    },
    "type": "date"
   },
   {
    "id": "q16_petitioner_underlying_case_info",
    "q": {
     "en": "Underlying case information for petitioner's refugee/asylum status.",
     "ar": "معلومات القضية الأساسية لوضع اللاجئ/اللجوء لمقدم الطلب."
    },
    "type": "textarea"
   },
   {
    "id": "q17_petitioner_current_immigration_status",
    "q": {
     "en": "Petitioner's current immigration status.",
     "ar": "وضع الهجرة الحالي لمقدم الطلب."
    },
    "type": "text"
   },
   {
    "id": "q18_beneficiary_names",
    "q": {
     "en": "Beneficiary's full names (including any aliases).",
     "ar": "الأسماء الكاملة للمستفيد (بما في ذلك أي أسماء مستعارة)."
    },
    "type": "text"
   },
   {
    "id": "q19_beneficiary_birth_details",
    "q": {
     "en": "Beneficiary's birth details (date and place of birth).",
     "ar": "تفاصيل ميلاد المستفيد (تاريخ ومكان الميلاد)."
    },
    "type": "text"
   },
   {
    "id": "q20_beneficiary_citizenship",
    "q": {
     "en": "Beneficiary's citizenship.",
     "ar": "جنسية المستفيد."
    },
    "type": "text"
   },
   {
    "id": "q21_beneficiary_a_number",
    "q": {
     "en": "Beneficiary's A-number (Alien Registration Number), if any.",
     "ar": "رقم A للمستفيد (رقم تسجيل الأجانب)، إن وجد."
    },
    "type": "text"
   },
   {
    "id": "q22_beneficiary_passport_travel_document_info",
    "q": {
     "en": "Beneficiary's passport or travel document information.",
     "ar": "معلومات جواز سفر المستفيد أو وثيقة السفر."
    },
    "type": "text"
   },
   {
    "id": "q23_beneficiary_current_addresses",
    "q": {
     "en": "Beneficiary's current physical and mailing addresses.",
     "ar": "العناوين الفعلية والبريدية الحالية للمستفيد."
    },
    "type": "text"
   },
   {
    "id": "q24_beneficiary_country_of_residence",
    "q": {
     "en": "Beneficiary's country of residence.",
     "ar": "بلد إقامة المستفيد."
    },
    "type": "text"
   },
   {
    "id": "q25_beneficiary_contact_info",
    "q": {
     "en": "Beneficiary's telephone number and email address.",
     "ar": "رقم هاتف المستفيد وعنوان البريد الإلكتروني."
    },
    "type": "text"
   },
   {
    "id": "q26_marriage_date_place",
    "q": {
     "en": "Date and place of marriage (if applicable).",
     "ar": "تاريخ ومكان الزواج (إذا كان منطبقاً)."
    },
    "type": "text"
   },
   {
    "id": "q27_relationship_type",
    "q": {
     "en": "Relationship type (biological, stepchild, or adoption details).",
     "ar": "نوع العلاقة (بيولوجية، ابن/ابنة زوج/ة، أو تفاصيل التبني)."
    },
    "type": "text"
   },
   {
    "id": "q28_previous_marriages_details",
    "q": {
     "en": "Details of any previous marriages for petitioner or beneficiary.",
     "ar": "تفاصيل أي زيجات سابقة لمقدم الطلب أو المستفيد."
    },
    "type": "text"
   },
   {
    "id": "q29_child_marital_history",
    "q": {
     "en": "Child's marital history (if applicable).",
     "ar": "التاريخ الزوجي للطفل (إذا كان منطبقاً)."
    },
    "type": "text"
   },
   {
    "id": "q30_child_relevant_asylum_refugee_app_dates",
    "q": {
     "en": "Relevant dates of any asylum or refugee applications for the child.",
     "ar": "التواريخ ذات الصلة لأي طلبات لجوء أو لاجئ للطفل."
    },
    "type": "text"
   },
   {
    "id": "q31_us_immigration_history",
    "q": {
     "en": "Details of U.S. immigration history: entries, I-94 records, current status, proceedings, and previous applications.",
     "ar": "تفاصيل تاريخ الهجرة إلى الولايات المتحدة: الدخول، سجلات I-94، الوضع الحالي، الإجراءات، والطلبات السابقة."
    },
    "type": "textarea"
   },
   {
    "id": "q32_late_filing_explanation",
    "q": {
     "en": "Explanation and timeline for late filing, if applicable.",
     "ar": "شرح وجدول زمني لتقديم الطلب المتأخر، إذا كان منطبقاً."
    },
    "type": "textarea"
   },
   {
    "id": "q33_form_declarations_explanations",
    "q": {
     "en": "Responses to every applicable question from the current I-730 form, with explanations where requested.",
     "ar": "إجابات على كل سؤال منطبق من نموذج I-730 الحالي، مع التفسيرات عند الطلب."
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed and signed Form I-730 (one for each beneficiary).",
    "ar": "نموذج I-730 مكتمل وموقع (واحد لكل مستفيد)."
   },
   {
    "en": "Proof of principal refugee/asylee status (Asylum approval, immigration judge’s order, refugee/asylee I-94, or other appropriate status evidence).",
    "ar": "إثبات وضع اللاجئ/طالب اللجوء الرئيسي (موافقة اللجوء، أمر قاضي الهجرة، I-94 للاجئ/طالب اللجوء، أو أي دليل آخر مناسب على الوضع)."
   },
   {
    "en": "Recent beneficiary photograph (clear passport-style).",
    "ar": "صورة حديثة للمستفيد (بنمط جواز السفر واضحة)."
   },
   {
    "en": "Beneficiary’s Form I-94 (if in the United States and available).",
    "ar": "نموذج I-94 للمستفيد (إذا كان داخل الولايات المتحدة ومتاحًا)."
   },
   {
    "en": "Identity documents: available passport identification page, birth certificate, and relevant name-change records.",
    "ar": "وثائق الهوية: صفحة تحديد الهوية في جواز السفر المتاحة، شهادة الميلاد، وسجلات تغيير الاسم ذات الصلة."
   },
   {
    "en": "Evidence for late filing (if requesting humanitarian consideration).",
    "ar": "أدلة على التأخير في التقديم (إذا طُلب اعتبار لأسباب إنسانية)."
   },
   {
    "en": "Marriage certificate (for spouse).",
    "ar": "وثيقة الزواج (للشريك/ة)."
   },
   {
    "en": "Spouse’s birth certificate (for spouse).",
    "ar": "شهادة ميلاد الشريك/ة (للشريك/ة)."
   },
   {
    "en": "Termination records for either spouse’s previous marriages (for spouse).",
    "ar": "سجلات إنهاء الزيجات السابقة لأي من الزوجين (للشريك/ة)."
   },
   {
    "en": "Birth certificate showing parentage (for biological child).",
    "ar": "شهادة الميلاد التي تثبت الأبوة/الأمومة (للابن/الابنة البيولوجي/ة)."
   },
   {
    "en": "Applicable marriage, legitimation, or genuine parent-child relationship evidence (for biological child).",
    "ar": "أدلة الزواج، أو إضفاء الشرعية، أو العلاقة الأبوية/الأمومية الحقيقية (للابن/الابنة البيولوجي/ة)."
   },
   {
    "en": "Child’s birth certificate (for stepchild).",
    "ar": "شهادة ميلاد الطفل (لابن/ابنة الزوج/الزوجة)."
   },
   {
    "en": "Petitioner's marriage certificate to the child’s parent (for stepchild).",
    "ar": "شهادة زواج مقدم الطلب من والد/ة الطفل (لابن/ابنة الزوج/الزوجة)."
   },
   {
    "en": "Applicable prior-marriage termination records (for stepchild).",
    "ar": "سجلات إنهاء الزيجات السابقة المنطبقة (لابن/ابنة الزوج/الزوجة)."
   },
   {
    "en": "Certified adoption decree (for adopted child).",
    "ar": "مرسوم التبني المصدق (للطفل المتبنى)."
   },
   {
    "en": "Applicable custody order (for adopted child).",
    "ar": "أمر الحضانة المنطبق (للطفل المتبنى)."
   },
   {
    "en": "Evidence of required residence together (for adopted child).",
    "ar": "دليل الإقامة المشتركة المطلوبة (للطفل المتبنى)."
   }
  ]
 },
 {
  "code": "I-751",
  "title": {
   "en": "I-751 Petition to Remove Conditions on Residence",
   "ar": "I-751 طلب إزالة شروط الإقامة"
  },
  "questions": [
   {
    "id": "received_conditional_green_card",
    "q": {
     "en": "Did you receive a two-year conditional Green Card through marriage?",
     "ar": "هل تلقيت بطاقة إقامة خضراء مشروطة لمدة عامين عن طريق الزواج؟"
    },
    "type": "yesno"
   },
   {
    "id": "green_card_resident_since_date",
    "q": {
     "en": "What is your Green Card's 'Resident Since' date?",
     "ar": "ما هو تاريخ 'مقيم منذ' الموضح على بطاقتك الخضراء؟"
    },
    "type": "date"
   },
   {
    "id": "green_card_expiration_date",
    "q": {
     "en": "What is your Green Card's expiration date?",
     "ar": "ما هو تاريخ انتهاء صلاحية بطاقتك الخضراء؟"
    },
    "type": "date"
   },
   {
    "id": "still_married_to_petitioning_spouse",
    "q": {
     "en": "Are you still married to the spouse through whom you obtained residence?",
     "ar": "هل ما زلت متزوجًا من الزوج/الزوجة الذي/التي حصلت عن طريقه/طريقها على الإقامة؟"
    },
    "type": "yesno"
   },
   {
    "id": "spouse_participate_sign",
    "q": {
     "en": "Will that spouse participate and sign?",
     "ar": "هل سيشارك هذا الزوج/الزوجة ويوقع؟"
    },
    "type": "yesno"
   },
   {
    "id": "separated_divorcing_divorced_widowed",
    "q": {
     "en": "Are you separated, divorcing, divorced, or widowed?",
     "ar": "هل أنت منفصل، بصدد الطلاق، مطلق، أو أرمل/أرملة؟"
    },
    "type": "text"
   },
   {
    "id": "experienced_battery_or_extreme_cruelty",
    "q": {
     "en": "Have you or your child experienced battery or extreme cruelty?",
     "ar": "هل تعرضت أنت أو طفلك للضرب أو القسوة الشديدة؟"
    },
    "type": "yesno"
   },
   {
    "id": "removal_cause_extreme_hardship",
    "q": {
     "en": "Would removal cause extreme hardship?",
     "ar": "هل سيسبب الإبعاد صعوبة بالغة؟"
    },
    "type": "yesno"
   },
   {
    "id": "conditional_resident_children_included",
    "q": {
     "en": "Are conditional resident children being included in this petition?",
     "ar": "هل يتم إدراج الأطفال المقيمين بشروط في هذا الطلب؟"
    },
    "type": "yesno"
   },
   {
    "id": "child_residence_dates",
    "q": {
     "en": "When did each conditional resident child obtain residence?",
     "ar": "متى حصل كل طفل مقيم بشروط على الإقامة؟"
    },
    "type": "text"
   },
   {
    "id": "previously_filed_i751_denied_removal_proceedings",
    "q": {
     "en": "Have you previously filed I-751, received a denial, or entered removal proceedings?",
     "ar": "هل سبق لك أن قدمت I-751، أو تلقيت رفضًا، أو دخلت في إجراءات الإبعاد؟"
    },
    "type": "yesno"
   },
   {
    "id": "late_filing_circumstances",
    "q": {
     "en": "If filing late, what circumstances caused the delay?",
     "ar": "إذا كان التقديم متأخرًا، فما هي الظروف التي تسببت في التأخير؟"
    },
    "type": "textarea"
   },
   {
    "id": "applicant_legal_name",
    "q": {
     "en": "What is your full legal name?",
     "ar": "ما هو اسمك القانوني الكامل؟"
    },
    "type": "text"
   },
   {
    "id": "applicant_other_names",
    "q": {
     "en": "What other names have you used?",
     "ar": "ما هي الأسماء الأخرى التي استخدمتها؟"
    },
    "type": "text"
   },
   {
    "id": "applicant_birth_details",
    "q": {
     "en": "What are your birth details (date and place)?",
     "ar": "ما هي تفاصيل ميلادك (تاريخ ومكان)؟"
    },
    "type": "text"
   },
   {
    "id": "applicant_citizenship",
    "q": {
     "en": "What is your country of citizenship?",
     "ar": "ما هي جنسيتك؟"
    },
    "type": "text"
   },
   {
    "id": "applicant_anumber",
    "q": {
     "en": "What is your A-number?",
     "ar": "ما هو رقم A الخاص بك؟"
    },
    "type": "text"
   },
   {
    "id": "applicant_uscis_account_number",
    "q": {
     "en": "What is your USCIS account number?",
     "ar": "ما هو رقم حساب USCIS الخاص بك؟"
    },
    "type": "text"
   },
   {
    "id": "applicant_physical_address",
    "q": {
     "en": "What is your physical address?",
     "ar": "ما هو عنوانك الفعلي؟"
    },
    "type": "text"
   },
   {
    "id": "applicant_mailing_address",
    "q": {
     "en": "What is your mailing address?",
     "ar": "ما هو عنوانك البريدي؟"
    },
    "type": "text"
   },
   {
    "id": "applicant_address_history",
    "q": {
     "en": "Please provide your address history for the past 5 years.",
     "ar": "يرجى تقديم سجل عناوينك خلال السنوات الخمس الماضية."
    },
    "type": "textarea"
   },
   {
    "id": "applicant_telephone_number",
    "q": {
     "en": "What is your telephone number?",
     "ar": "ما هو رقم هاتفك؟"
    },
    "type": "text"
   },
   {
    "id": "applicant_email_address",
    "q": {
     "en": "What is your email address?",
     "ar": "ما هو عنوان بريدك الإلكتروني؟"
    },
    "type": "text"
   },
   {
    "id": "conditional_residence_admission_adjustment_date",
    "q": {
     "en": "What is your admission or adjustment date for conditional residence?",
     "ar": "ما هو تاريخ دخولك أو تعديل وضعك للإقامة المشروطة؟"
    },
    "type": "date"
   },
   {
    "id": "green_card_category",
    "q": {
     "en": "What is your Green Card category?",
     "ar": "ما هي فئة بطاقتك الخضراء؟"
    },
    "type": "text"
   },
   {
    "id": "spouse_stepparent_identity",
    "q": {
     "en": "What are the identity details for your spouse/stepparent (full name, date of birth, etc.)?",
     "ar": "ما هي تفاصيل هوية زوجك/زوجتك أو زوج والدتك/والدك (الاسم الكامل، تاريخ الميلاد، إلخ)؟"
    },
    "type": "text"
   },
   {
    "id": "spouse_stepparent_immigration_status",
    "q": {
     "en": "What is the immigration status of your spouse/stepparent?",
     "ar": "ما هو الوضع الهجري لزوجك/زوجتك أو زوج والدتك/والدك؟"
    },
    "type": "text"
   },
   {
    "id": "spouse_stepparent_contact_details",
    "q": {
     "en": "What are the contact details for your spouse/stepparent?",
     "ar": "ما هي تفاصيل الاتصال بزوجك/زوجتك أو زوج والدتك/والدك؟"
    },
    "type": "text"
   },
   {
    "id": "spouse_stepparent_marriage_information",
    "q": {
     "en": "What is the marriage information for your spouse/stepparent?",
     "ar": "ما هي معلومات الزواج الخاصة بزوجك/زوجتك أو زوج والدتك/والدك؟"
    },
    "type": "text"
   },
   {
    "id": "marriage_date_place",
    "q": {
     "en": "What is your marriage date and place?",
     "ar": "ما هو تاريخ ومكان زواجك؟"
    },
    "type": "text"
   },
   {
    "id": "previous_marriages_details",
    "q": {
     "en": "Please provide details of any previous marriages (dates, spouse names).",
     "ar": "يرجى تقديم تفاصيل عن أي زيجات سابقة (التواريخ، أسماء الأزواج)."
    },
    "type": "textarea"
   },
   {
    "id": "separation_divorce_death_dates",
    "q": {
     "en": "What are the separation, divorce, or death dates (if applicable)?",
     "ar": "ما هي تواريخ الانفصال، الطلاق، أو الوفاة (إن وجدت)؟"
    },
    "type": "text"
   },
   {
    "id": "shared_residence_details",
    "q": {
     "en": "Where have you lived together with your spouse (addresses and dates)?",
     "ar": "أين عشتم معًا مع زوجك/زوجتك (العناوين والتواريخ)؟"
    },
    "type": "textarea"
   },
   {
    "id": "shared_finances_details",
    "q": {
     "en": "Please describe your shared finances (joint accounts, loans, etc.).",
     "ar": "يرجى وصف أموالك المشتركة (الحسابات المشتركة، القروض، إلخ)."
    },
    "type": "textarea"
   },
   {
    "id": "shared_insurance_benefits_details",
    "q": {
     "en": "Please describe any shared insurance or benefits.",
     "ar": "يرجى وصف أي تأمين أو مزايا مشتركة."
    },
    "type": "textarea"
   },
   {
    "id": "shared_children_details",
    "q": {
     "en": "Do you have children together? Please provide their details.",
     "ar": "هل لديكم أطفال معًا؟ يرجى تقديم تفاصيلهم."
    },
    "type": "textarea"
   },
   {
    "id": "significant_events_shared",
    "q": {
     "en": "Please list any significant events you shared.",
     "ar": "يرجى ذكر أي أحداث مهمة شاركتماها."
    },
    "type": "textarea"
   },
   {
    "id": "children_identity_details",
    "q": {
     "en": "What are the identity details for all children (name, date of birth, etc.)?",
     "ar": "ما هي تفاصيل هوية جميع الأطفال (الاسم، تاريخ الميلاد، إلخ)؟"
    },
    "type": "text"
   },
   {
    "id": "children_location",
    "q": {
     "en": "What is the current location of each child?",
     "ar": "ما هو الموقع الحالي لكل طفل؟"
    },
    "type": "text"
   },
   {
    "id": "children_anumber",
    "q": {
     "en": "What is the A-number for each child?",
     "ar": "ما هو رقم A لكل طفل؟"
    },
    "type": "text"
   },
   {
    "id": "children_conditional_residence_dates",
    "q": {
     "en": "What are the conditional residence dates for each child?",
     "ar": "ما هي تواريخ الإقامة المشروطة لكل طفل؟"
    },
    "type": "text"
   },
   {
    "id": "filing_basis",
    "q": {
     "en": "What is your filing basis (Joint petition, death-related individual filing, or waiver basis)?",
     "ar": "ما هو أساس تقديم طلبك (طلب مشترك، تقديم فردي بعد وفاة، أو أساس تنازل)؟"
    },
    "type": "text"
   },
   {
    "id": "additional_disclosures_criminal_history",
    "q": {
     "en": "Do you have any criminal history or other disclosures required by Form I-751?",
     "ar": "هل لديك أي سجل جنائي أو إفصاحات أخرى مطلوبة بموجب النموذج I-751؟"
    },
    "type": "yesno"
   },
   {
    "id": "interpreter_information",
    "q": {
     "en": "If an interpreter was used, please provide their information.",
     "ar": "إذا تم استخدام مترجم فوري، يرجى تقديم معلوماته."
    },
    "type": "text"
   },
   {
    "id": "preparer_information",
    "q": {
     "en": "If a preparer assisted with this form, please provide their information.",
     "ar": "إذا ساعدك مُعد في هذا النموذج، يرجى تقديم معلوماته."
    },
    "type": "text"
   }
  ],
  "docs": [
   {
    "en": "Completed I-751 form with all required signatures",
    "ar": "نموذج I-751 مكتمل مع جميع التوقيعات المطلوبة"
   },
   {
    "en": "Copies of the front and back of the applicant’s Green Card",
    "ar": "نسخ من الوجه الأمامي والخلفي للبطاقة الخضراء للمقدم"
   },
   {
    "en": "Front-and-back copies of included children’s conditional Green Cards",
    "ar": "نسخ من الوجه الأمامي والخلفي لبطاقات الإقامة الخضراء المشروطة للأطفال المدرجين"
   },
   {
    "en": "Applicable relationship and filing-basis evidence",
    "ar": "أدلة العلاقة وأساس التقديم المعمول بها"
   },
   {
    "en": "Criminal records/dispositions (if required)",
    "ar": "السجلات الجنائية/القرارات (إذا لزم الأمر)"
   },
   {
    "en": "Late-filing explanation and supporting evidence (if applicable)",
    "ar": "شرح التقديم المتأخر والأدلة الداعمة (إذا انطبق ذلك)"
   },
   {
    "en": "Full certified English translations of foreign-language documents",
    "ar": "ترجمات إنجليزية كاملة ومعتمدة للمستندات الأجنبية"
   },
   {
    "en": "Joint leases, mortgages, deeds, and address records",
    "ar": "عقود إيجار مشتركة، رهون عقارية، سندات ملكية، وسجلات عناوين"
   },
   {
    "en": "Bank statements showing joint transactions",
    "ar": "كشوف حسابات بنكية توضح المعاملات المشتركة"
   },
   {
    "en": "Joint tax returns",
    "ar": "إقرارات ضريبية مشتركة"
   },
   {
    "en": "Joint loans and credit accounts",
    "ar": "قروض وحسابات ائتمانية مشتركة"
   },
   {
    "en": "Health, life, and vehicle insurance policies with beneficiary designations",
    "ar": "وثائق تأمين صحي، على الحياة، وعلى المركبات مع تحديد المستفيدين"
   },
   {
    "en": "Children's birth certificates showing both parents",
    "ar": "شهادات ميلاد الأطفال التي تظهر كلا الوالدين"
   },
   {
    "en": "Dated photographs of shared experiences",
    "ar": "صور مؤرخة لتجارب مشتركة"
   },
   {
    "en": "Travel records",
    "ar": "سجلات السفر"
   },
   {
    "en": "Correspondence",
    "ar": "المراسلات"
   },
   {
    "en": "Detailed affidavits from people with personal knowledge of the relationship",
    "ar": "إفادات مفصلة من أشخاص لديهم معرفة شخصية بالعلاقة"
   },
   {
    "en": "Spouse's death certificate",
    "ar": "شهادة وفاة الزوج/الزوجة"
   },
   {
    "en": "Final divorce/annulment decree",
    "ar": "مرسوم الطلاق/الإلغاء النهائي"
   },
   {
    "en": "Relevant credible abuse evidence",
    "ar": "أدلة إساءة معاملة موثوقة وذات صلة"
   },
   {
    "en": "Evidence supporting claimed extreme hardship",
    "ar": "أدلة تدعم ادعاء الصعوبة البالغة"
   }
  ]
 },
 {
  "code": "I-765",
  "title": {
   "en": "I-765 Employment Authorization",
   "ar": "I-765 تصريح العمل"
  },
  "questions": [
   {
    "id": "q1_request_type",
    "q": {
     "en": "Are you requesting initial employment authorization, renewal, or replacement/correction?",
     "ar": "هل تطلب تصريح عمل مبدئي، تجديد، أم استبدال/تصحيح؟"
    },
    "type": "text"
   },
   {
    "id": "q2_immigration_status",
    "q": {
     "en": "What is your current immigration status or pending immigration application?",
     "ar": "ما هي حالة الهجرة الحالية الخاصة بك أو طلب الهجرة المعلق؟"
    },
    "type": "text"
   },
   {
    "id": "q3_eligibility_category",
    "q": {
     "en": "What is the applicable I-765 eligibility category, such as (c)(9) or (c)(8)?",
     "ar": "ما هي فئة الأهلية لنموذج I-765 المعمول بها، مثل (c)(9) أو (c)(8)؟"
    },
    "type": "text"
   },
   {
    "id": "q4_previous_ead",
    "q": {
     "en": "Have you previously received an EAD? If yes, what category and expiration date appear on it?",
     "ar": "هل سبق لك الحصول على EAD؟ إذا نعم، ما هي الفئة وتاريخ انتهاء الصلاحية الظاهر عليه؟"
    },
    "type": "text"
   },
   {
    "id": "q5_underlying_status_valid",
    "q": {
     "en": "Is your underlying application/status still valid or pending?",
     "ar": "هل طلبك/وضعك الأساسي لا يزال ساريًا أو معلقًا؟"
    },
    "type": "yesno"
   },
   {
    "id": "q6_i765_filing_method",
    "q": {
     "en": "Are you filing I-765 separately or together with another application?",
     "ar": "هل تقدم I-765 بشكل منفصل أم مع طلب آخر؟"
    },
    "type": "text"
   },
   {
    "id": "q7_replacement_reason",
    "q": {
     "en": "If replacing a card, was it lost, stolen, damaged, undelivered, or printed incorrectly?",
     "ar": "إذا كنت تستبدل بطاقة، هل فقدت، سرقت، تضررت، لم يتم تسليمها، أم طبعت بشكل غير صحيح؟"
    },
    "type": "text"
   },
   {
    "id": "q8_error_by_uscis",
    "q": {
     "en": "If incorrect, was the error caused by USCIS?",
     "ar": "إذا كان غير صحيح، هل كان الخطأ بسبب USCIS؟"
    },
    "type": "yesno"
   },
   {
    "id": "q9_category_deadlines",
    "q": {
     "en": "Are there category-specific filing deadlines or waiting periods?",
     "ar": "هل توجد مواعيد نهائية أو فترات انتظار خاصة بالفئة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q10_legal_name",
    "q": {
     "en": "What is your legal name?",
     "ar": "ما هو اسمك القانوني؟"
    },
    "type": "text"
   },
   {
    "id": "q11_other_names",
    "q": {
     "en": "Have you used any other names?",
     "ar": "هل استخدمت أي أسماء أخرى؟"
    },
    "type": "text"
   },
   {
    "id": "q12_birth_details",
    "q": {
     "en": "What are your birth details (date and place of birth)?",
     "ar": "ما هي تفاصيل ميلادك (تاريخ ومكان الميلاد)؟"
    },
    "type": "text"
   },
   {
    "id": "q13_citizenship",
    "q": {
     "en": "What is your country of citizenship?",
     "ar": "ما هي جنسيتك؟"
    },
    "type": "text"
   },
   {
    "id": "q14_a_number",
    "q": {
     "en": "What is your Alien Registration Number (A-number), if any?",
     "ar": "ما هو رقم تسجيل الأجنبي الخاص بك (A-number)، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "q15_uscis_account_number",
    "q": {
     "en": "What is your USCIS online account number, if any?",
     "ar": "ما هو رقم حسابك في USCIS عبر الإنترنت، إن وجد؟"
    },
    "type": "text"
   },
   {
    "id": "q16_us_physical_address",
    "q": {
     "en": "What is your U.S. physical address?",
     "ar": "ما هو عنوانك الفعلي في الولايات المتحدة؟"
    },
    "type": "textarea"
   },
   {
    "id": "q17_secure_mailing_address",
    "q": {
     "en": "What is your secure mailing address?",
     "ar": "ما هو عنوانك البريدي الآمن؟"
    },
    "type": "textarea"
   },
   {
    "id": "q18_telephone",
    "q": {
     "en": "What is your telephone number?",
     "ar": "ما هو رقم هاتفك؟"
    },
    "type": "text"
   },
   {
    "id": "q19_email",
    "q": {
     "en": "What is your email address?",
     "ar": "ما هو عنوان بريدك الإلكتروني؟"
    },
    "type": "text"
   },
   {
    "id": "q20_last_arrival",
    "q": {
     "en": "What was your last arrival date and place in the U.S.?",
     "ar": "ما هو تاريخ ومكان وصولك الأخير إلى الولايات المتحدة؟"
    },
    "type": "text"
   },
   {
    "id": "q21_i94_number",
    "q": {
     "en": "What is your I-94 number?",
     "ar": "ما هو رقم I-94 الخاص بك؟"
    },
    "type": "text"
   },
   {
    "id": "q22_admission_classification",
    "q": {
     "en": "What is your admission classification (e.g., F-1, H-1B)?",
     "ar": "ما هو تصنيف دخولك (على سبيل المثال، F-1، H-1B)؟"
    },
    "type": "text"
   },
   {
    "id": "q23_current_status",
    "q": {
     "en": "What is your current immigration status?",
     "ar": "ما هي حالة هجرتك الحالية؟"
    },
    "type": "text"
   },
   {
    "id": "q24_travel_document_details",
    "q": {
     "en": "What are your passport/travel document details (e.g., number, country of issuance, expiration date)?",
     "ar": "ما هي تفاصيل جواز سفرك/وثيقة سفرك (على سبيل المثال، الرقم، بلد الإصدار، تاريخ الانتهاء)؟"
    },
    "type": "text"
   },
   {
    "id": "q25_prior_i765_filings",
    "q": {
     "en": "Have you had any prior I-765 filings? If yes, provide details and receipt numbers.",
     "ar": "هل قدمت أي طلبات I-765 سابقة؟ إذا نعم، قدم التفاصيل وأرقام الإيصالات."
    },
    "type": "textarea"
   },
   {
    "id": "q26_eligibility_details",
    "q": {
     "en": "What is your exact eligibility category and underlying approval, receipt or status information?",
     "ar": "ما هي فئة أهليتك الدقيقة ومعلومات الموافقة أو الإيصال أو الحالة الأساسية؟"
    },
    "type": "textarea"
   },
   {
    "id": "q27_category_specific_details",
    "q": {
     "en": "Provide any category-specific details required for your application (e.g., SEVIS/school information, asylum filing and clock information, spouse’s status, etc.).",
     "ar": "قدم أي تفاصيل خاصة بالفئة مطلوبة لطلبك (مثل معلومات SEVIS/المدرسة، معلومات تقديم طلب اللجوء والوقت، حالة الزوج/الزوجة، إلخ)."
    },
    "type": "textarea"
   },
   {
    "id": "q28_criminal_history",
    "q": {
     "en": "Have you ever been arrested, charged, or convicted of any crime?",
     "ar": "هل سبق لك أن تم القبض عليك أو اتهامك أو إدانتك بأي جريمة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q29_interpreter_info",
    "q": {
     "en": "If applicable, provide interpreter information.",
     "ar": "إذا كان منطبقًا، قدم معلومات المترجم."
    },
    "type": "textarea"
   },
   {
    "id": "q30_preparer_info",
    "q": {
     "en": "If applicable, provide preparer information.",
     "ar": "إذا كان منطبقًا، قدم معلومات مُعِدّ الطلب."
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed and signed Form I-765 (for paper filing) or completed online application confirmation.",
    "ar": "نموذج I-765 مكتمل وموقع (للتقديم الورقي) أو تأكيد الطلب المكتمل عبر الإنترنت."
   },
   {
    "en": "Previous Employment Authorization Document (EAD) (front and back), if issued.",
    "ar": "وثيقة تفويض العمل السابقة (EAD) (الوجه والخلف)، إن وجدت."
   },
   {
    "en": "Government-issued identity document (e.g., passport, driver's license), if no previous EAD.",
    "ar": "وثيقة هوية صادرة عن الحكومة (مثل جواز السفر، رخصة القيادة)، إذا لم يكن هناك EAD سابق."
   },
   {
    "en": "Form I-94 Arrival/Departure Record, passport, or travel document evidence.",
    "ar": "نموذج I-94 سجل الوصول/المغادرة، جواز السفر، أو دليل وثيقة السفر."
   },
   {
    "en": "Required passport-style photograph(s).",
    "ar": "صورة (صور) شخصية مطلوبة بحجم جواز السفر."
   },
   {
    "en": "Category-specific supporting evidence (see below for examples).",
    "ar": "أدلة داعمة خاصة بالفئة (انظر أدناه للأمثلة)."
   },
   {
    "en": "Applicable fee payment or permitted fee exemption/waiver documentation.",
    "ar": "دفع الرسوم المطبقة أو وثائق الإعفاء/التنازل من الرسوم المسموح بها."
   },
   {
    "en": "I-485 receipt or other pending adjustment of status evidence (for (c)(9) category, unless filing together with I-485).",
    "ar": "إيصال I-485 أو دليل آخر على طلب تعديل الوضع المعلق (لفئة (c)(9)، ما لم يتم تقديمه مع I-485)."
   },
   {
    "en": "Evidence that Form I-589 (Application for Asylum and for Withholding of Removal) was filed with USCIS/EOIR; applicable appeal/remand records (for (c)(8) category).",
    "ar": "دليل على تقديم نموذج I-589 (طلب اللجوء وطلب حجب الإبعاد) إلى USCIS/EOIR؛ سجلات الاستئناف/الإعادة المعمول بها (لفئة (c)(8))."
   },
   {
    "en": "Asylum approval document, qualifying I-94, judge’s order, or derivative approval (for (a)(5) category).",
    "ar": "وثيقة موافقة اللجوء، I-94 مؤهلة، أمر قاضي، أو موافقة مشتقة (لفئة (a)(5))."
   },
   {
    "en": "Refugee admission/status evidence (for (a)(3) category).",
    "ar": "دليل دخول/وضع اللاجئ (لفئة (a)(3))."
   },
   {
    "en": "DSO-endorsed Form I-20 and applicable prior CPT/OPT information (for F-1 OPT (c)(3)(A)/(B) category).",
    "ar": "نموذج I-20 مصدق من DSO ومعلومات CPT/OPT السابقة المعمول بها (لفئة F-1 OPT (c)(3)(A)/(B))."
   },
   {
    "en": "DSO-endorsed Form I-20, qualifying degree, and applicable school evidence (for STEM OPT (c)(3)(C) category).",
    "ar": "نموذج I-20 مصدق من DSO، شهادة مؤهلة، وأدلة مدرسية معمول بها (لفئة STEM OPT (c)(3)(C))."
   },
   {
    "en": "H-4 status evidence, marriage evidence, and qualifying spouse’s I-140/AC21 evidence (for Eligible H-4 spouse (c)(26) category).",
    "ar": "دليل وضع H-4، دليل الزواج، ودليل I-140/AC21 للزوج المؤهل (لفئة الزوج H-4 المؤهل (c)(26))."
   },
   {
    "en": "Form DS-2019, status evidence, and an explanation that earnings will not support the J-1 principal (for J-2 (c)(5) category).",
    "ar": "نموذج DS-2019، دليل الوضع، وشرح بأن الأرباح لن تدعم حامل التأشيرة J-1 الأساسي (لفئة J-2 (c)(5))."
   }
  ]
 },
 {
  "code": "I-821",
  "title": {
   "en": "I-821 Application for Temporary Protected Status (TPS)",
   "ar": "I-821 طلب الحصول على صفة الحماية المؤقتة (TPS)"
  },
  "questions": [
   {
    "id": "q_in_us",
    "q": {
     "en": "Are you currently in the United States?",
     "ar": "هل أنت متواجد حاليًا في الولايات المتحدة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_nationality",
    "q": {
     "en": "What countries are you a national of?",
     "ar": "ما هي الدول التي تحمل جنسيتها؟"
    },
    "type": "text"
   },
   {
    "id": "q_stateless_residence",
    "q": {
     "en": "If stateless, where did you last habitually reside?",
     "ar": "إذا كنت عديم الجنسية، فأين كان آخر مكان إقامتك المعتادة؟"
    },
    "type": "text"
   },
   {
    "id": "q_tps_country",
    "q": {
     "en": "Which country’s TPS designation are you applying under?",
     "ar": "تحت أي دولة مصنفة للحماية المؤقتة TPS تتقدم بالطلب؟"
    },
    "type": "text"
   },
   {
    "id": "q_filing_type",
    "q": {
     "en": "Are you applying initially or re-registering?",
     "ar": "هل تتقدم بالطلب لأول مرة أم تقوم بإعادة التسجيل؟"
    },
    "type": "text"
   },
   {
    "id": "q_us_entry_date",
    "q": {
     "en": "When did you enter the United States? List subsequent departures and returns.",
     "ar": "متى دخلت الولايات المتحدة؟ اذكر المغادرات والعودات اللاحقة."
    },
    "type": "textarea"
   },
   {
    "id": "q_continuous_residence",
    "q": {
     "en": "Have you continuously resided and been physically present here since the applicable country-specific dates?",
     "ar": "هل أقمت باستمرار وتواجدت جسديًا هنا منذ التواريخ المحددة للدولة المعنية؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_previous_tps",
    "q": {
     "en": "Have you previously received TPS, a denial, or withdrawal of TPS?",
     "ar": "هل سبق لك الحصول على TPS، أو تم رفض طلبك، أو سحب صفة TPS منك؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_filing_period",
    "q": {
     "en": "Are you filing during the applicable registration period?",
     "ar": "هل تقدم الطلب خلال فترة التسجيل المطبقة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_late_filing_reason",
    "q": {
     "en": "If filing late, what circumstances or qualifying conditions support late filing?",
     "ar": "إذا كنت تتقدم بطلب متأخر، فما هي الظروف أو الشروط المؤهلة التي تدعم تقديم الطلب المتأخر؟"
    },
    "type": "textarea"
   },
   {
    "id": "q_arrested_charged_convicted",
    "q": {
     "en": "Have you been arrested, charged, convicted, or placed in immigration proceedings?",
     "ar": "هل تم اعتقالك، أو توجيه تهم إليك، أو إدانتك، أو وضعك في إجراءات الهجرة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_legal_name",
    "q": {
     "en": "What is your full legal name and any other names used?",
     "ar": "ما هو اسمك القانوني الكامل وأي أسماء أخرى استخدمتها؟"
    },
    "type": "text"
   },
   {
    "id": "q_birth_details",
    "q": {
     "en": "What are your birth details (date, city, country)?",
     "ar": "ما هي تفاصيل ميلادك (التاريخ، المدينة، الدولة)؟"
    },
    "type": "text"
   },
   {
    "id": "q_a_number_uscis_account",
    "q": {
     "en": "What is your A-number and USCIS account number?",
     "ar": "ما هو رقم A-number الخاص بك ورقم حساب USCIS؟"
    },
    "type": "text"
   },
   {
    "id": "q_contact_info",
    "q": {
     "en": "What are your U.S. mailing/physical address, telephone, and email?",
     "ar": "ما هو عنوانك البريدي/الفعلي في الولايات المتحدة، ورقم هاتفك، وبريدك الإلكتروني؟"
    },
    "type": "textarea"
   },
   {
    "id": "q_immigration_history",
    "q": {
     "en": "Provide your entry dates, I-94 information, admission status, current status, and any pending applications or proceedings.",
     "ar": "قدم تواريخ دخولك، معلومات I-94، حالة القبول، حالتك الحالية، وأي طلبات أو إجراءات معلقة."
    },
    "type": "textarea"
   },
   {
    "id": "q_residence_timeline",
    "q": {
     "en": "Provide a timeline of your U.S. addresses and available records covering the required period.",
     "ar": "قدم جدولًا زمنيًا لعناوينك في الولايات المتحدة والسجلات المتاحة التي تغطي الفترة المطلوبة."
    },
    "type": "textarea"
   },
   {
    "id": "q_travel_history",
    "q": {
     "en": "List every departure/return from the U.S., reasons, duration, and whether you had travel authorization.",
     "ar": "اذكر كل مغادرة/عودة من الولايات المتحدة، الأسباب، المدة، وما إذا كان لديك تصريح سفر."
    },
    "type": "textarea"
   },
   {
    "id": "q_previous_tps_details",
    "q": {
     "en": "Provide details of any previous TPS application: country/designation, receipt numbers, approval/denial notices, and previous EAD.",
     "ar": "قدم تفاصيل أي طلب TPS سابق: البلد/التصنيف، أرقام الإيصالات، إشعارات الموافقة/الرفض، وتصريح العمل EAD السابق."
    },
    "type": "textarea"
   },
   {
    "id": "q_family_info",
    "q": {
     "en": "Provide family information requested by the form, especially qualifying relationships relevant to late registration.",
     "ar": "قدم معلومات الأسرة المطلوبة في النموذج، خاصة العلاقات المؤهلة ذات الصلة بالتسجيل المتأخر."
    },
    "type": "textarea"
   },
   {
    "id": "q_eligibility_disclosures",
    "q": {
     "en": "Disclose all applicable criminal, security, persecution, and admissibility questions.",
     "ar": "اكشف عن جميع الأسئلة المتعلقة بالجنائيات والأمن والاضطهاد والمقبولية المعمول بها."
    },
    "type": "textarea"
   },
   {
    "id": "q_ead_request",
    "q": {
     "en": "Are you requesting an Employment Authorization Document (EAD)? If so, is it an initial, renewal, or replacement request?",
     "ar": "هل تطلب وثيقة ترخيص عمل (EAD)؟ إذا كان الأمر كذلك، هل هو طلب أولي، تجديد، أم استبدال؟"
    },
    "type": "text"
   },
   {
    "id": "q_applicant_details",
    "q": {
     "en": "Provide your details for the form, including required signatures.",
     "ar": "قدم تفاصيلك للنموذج، بما في ذلك التوقيعات المطلوبة."
    },
    "type": "textarea"
   },
   {
    "id": "q_interpreter_details",
    "q": {
     "en": "Provide interpreter details and required signatures.",
     "ar": "قدم تفاصيل المترجم والتوقيعات المطلوبة."
    },
    "type": "textarea"
   },
   {
    "id": "q_preparer_details",
    "q": {
     "en": "Provide preparer details and required signatures.",
     "ar": "قدم تفاصيل المُعد والتوقيعات المطلوبة."
    },
    "type": "textarea"
   },
   {
    "id": "q_tps_granted_by_ij_bia",
    "q": {
     "en": "If TPS was granted by an immigration judge or BIA, provide additional grant records for the first USCIS benefit request.",
     "ar": "إذا تم منح TPS من قبل قاضي هجرة أو BIA، قدم سجلات المنح الإضافية لطلب منفعة USCIS الأول."
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed and signed Form I-821",
    "ar": "نموذج I-821 مكتمل وموقع"
   },
   {
    "en": "Applicable payment or fee exemption documentation",
    "ar": "وثائق الدفع أو الإعفاء من الرسوم المطبقة"
   },
   {
    "en": "Passport, national identity document, or birth certificate with photo identification",
    "ar": "جواز السفر، أو وثيقة هوية وطنية، أو شهادة ميلاد مع إثبات هوية مصور"
   },
   {
    "en": "Form I-94",
    "ar": "نموذج I-94"
   },
   {
    "en": "Passport admission stamps or other reliable entry evidence",
    "ar": "أختام دخول جواز السفر أو أي دليل دخول موثوق آخر"
   },
   {
    "en": "Dated employment/payroll records, leases, rent receipts, utilities, school, medical, or other records covering the relevant period for residence/presence",
    "ar": "سجلات التوظيف/الرواتب المؤرخة، عقود الإيجار، إيصالات الإيجار، فواتير الخدمات، سجلات المدرسة، السجلات الطبية، أو سجلات أخرى تغطي الفترة ذات الصلة للإقامة/التواجد"
   },
   {
    "en": "Relevant notices, status documents, travel records, and court orders for immigration history",
    "ar": "الإشعارات ذات الصلة، وثائق الحالة، سجلات السفر، وأوامر المحكمة لتاريخ الهجرة"
   },
   {
    "en": "Certified court dispositions and related records for criminal history",
    "ar": "أحكام المحكمة المعتمدة والسجلات ذات الصلة للسجل الجنائي"
   },
   {
    "en": "Explanation and evidence supporting the specific late-filing basis",
    "ar": "شرح وأدلة تدعم أساس تقديم الطلب المتأخر المحدد"
   },
   {
    "en": "Form I-765 (if requesting employment authorization)",
    "ar": "نموذج I-765 (إذا كنت تطلب تصريح عمل)"
   },
   {
    "en": "Required evidence and photos for Form I-765",
    "ar": "الأدلة والصور المطلوبة لنموذج I-765"
   },
   {
    "en": "Previous TPS notices and EADs (for re-registration)",
    "ar": "إشعارات TPS السابقة وتصاريح العمل EAD (لإعادة التسجيل)"
   },
   {
    "en": "Explanation of good cause (for late re-registration)",
    "ar": "شرح لسبب وجيه (لإعادة التسجيل المتأخرة)"
   },
   {
    "en": "Additional grant records if TPS was granted by an immigration judge or BIA",
    "ar": "سجلات منح إضافية إذا تم منح TPS من قبل قاضي هجرة أو BIA"
   }
  ]
 },
 {
  "code": "I-824",
  "title": {
   "en": "I-824 Application for Action on an Approved Application or Petition",
   "ar": "طلب إجراء بشأن طلب أو عريضة موافق عليها I-824"
  },
  "questions": [
   {
    "id": "i824_requested_action_type",
    "q": {
     "en": "What action is being requested on the approved application or petition? (e.g., Duplicate approval notice, Notify consulate, Follow-to-join, Send to NVC, Notify DOS of naturalization)",
     "ar": "ما هو الإجراء المطلوب اتخاذه بخصوص الطلب أو العريضة الموافق عليها؟ (مثل: إشعار موافقة مكرر، إخطار قنصلية، لم الشمل، إرسال إلى NVC، إخطار وزارة الخارجية بالتجنيس)"
    },
    "type": "text"
   },
   {
    "id": "i824_duplicate_notice_details",
    "q": {
     "en": "If requesting a duplicate approval notice, which approval notice is missing or damaged? Provide its form number, receipt number, and approval date.",
     "ar": "إذا كنت تطلب إشعار موافقة مكرر، فما هو إشعار الموافقة المفقود أو التالف؟ قدم رقم النموذج ورقم الإيصال وتاريخ الموافقة الخاص به."
    },
    "type": "textarea"
   },
   {
    "id": "i824_notify_consulate_details",
    "q": {
     "en": "If requesting to notify another consulate/port of entry, identify the original and requested location and the underlying nonimmigrant petition/waiver.",
     "ar": "إذا كنت تطلب إخطار قنصلية أخرى/ميناء دخول، حدد الموقع الأصلي والمطلوب والعريضة/التنازل الأساسي لغير المهاجرين."
    },
    "type": "textarea"
   },
   {
    "id": "i824_follow_to_join_details",
    "q": {
     "en": "If requesting follow-to-join after adjustment of status, identify the approved I-485 and potentially eligible spouse/children abroad.",
     "ar": "إذا كنت تطلب لم الشمل بعد تعديل الوضع، حدد نموذج I-485 الموافق عليه والزوج/الأطفال المؤهلين المحتملين في الخارج."
    },
    "type": "textarea"
   },
   {
    "id": "i824_send_to_nvc_details",
    "q": {
     "en": "If requesting to send an approved immigrant petition to NVC, identify the approved petition and why consular processing is requested.",
     "ar": "إذا كنت تطلب إرسال عريضة هجرة موافق عليها إلى NVC، حدد العريضة الموافق عليها وسبب طلب المعالجة القنصلية."
    },
    "type": "textarea"
   },
   {
    "id": "i824_notify_dos_naturalization_details",
    "q": {
     "en": "If requesting to notify DOS of naturalization, identify the relevant approved petition and naturalization information.",
     "ar": "إذا كنت تطلب إخطار وزارة الخارجية بالتجنيس، حدد العريضة الموافق عليها ذات الصلة ومعلومات التجنيس."
    },
    "type": "textarea"
   },
   {
    "id": "i824_person_filing_applicant_petitioner",
    "q": {
     "en": "Are you the applicant or petitioner on the underlying case?",
     "ar": "هل أنت مقدم الطلب أو مقدم العريضة في القضية الأساسية؟"
    },
    "type": "yesno"
   },
   {
    "id": "i824_person_filing_name",
    "q": {
     "en": "Provide your full name.",
     "ar": "يرجى ذكر اسمك الكامل."
    },
    "type": "text"
   },
   {
    "id": "i824_person_filing_birth_details",
    "q": {
     "en": "Provide your birth details (date and place of birth).",
     "ar": "يرجى ذكر تفاصيل ميلادك (تاريخ ومكان الميلاد)."
    },
    "type": "text"
   },
   {
    "id": "i824_person_filing_citizenship",
    "q": {
     "en": "What is your country of citizenship?",
     "ar": "ما هي دولة جنسيتك؟"
    },
    "type": "text"
   },
   {
    "id": "i824_person_filing_immigration_status",
    "q": {
     "en": "What is your current immigration status?",
     "ar": "ما هي حالة هجرتك الحالية؟"
    },
    "type": "text"
   },
   {
    "id": "i824_organization_name",
    "q": {
     "en": "If applicable, what is the company name for the organization?",
     "ar": "إذا كان ذلك منطبقاً، ما هو اسم الشركة للمنظمة؟"
    },
    "type": "text"
   },
   {
    "id": "i824_organization_tax_id",
    "q": {
     "en": "If applicable, provide the organization's tax identification information.",
     "ar": "إذا كان ذلك منطبقاً، قدم معلومات التعريف الضريبي للمنظمة."
    },
    "type": "text"
   },
   {
    "id": "i824_contact_physical_address",
    "q": {
     "en": "What is your physical address?",
     "ar": "ما هو عنوانك الفعلي؟"
    },
    "type": "text"
   },
   {
    "id": "i824_contact_mailing_address",
    "q": {
     "en": "What is your mailing address?",
     "ar": "ما هو عنوانك البريدي؟"
    },
    "type": "text"
   },
   {
    "id": "i824_contact_telephone",
    "q": {
     "en": "What is your telephone number?",
     "ar": "ما هو رقم هاتفك؟"
    },
    "type": "text"
   },
   {
    "id": "i824_contact_email",
    "q": {
     "en": "What is your email address?",
     "ar": "ما هو عنوان بريدك الإلكتروني؟"
    },
    "type": "text"
   },
   {
    "id": "i824_identifiers_a_number",
    "q": {
     "en": "What is your A-number (Alien Registration Number)?",
     "ar": "ما هو رقم A الخاص بك (رقم تسجيل الأجانب)؟"
    },
    "type": "text"
   },
   {
    "id": "i824_identifiers_uscis_account_number",
    "q": {
     "en": "What is your USCIS online account number?",
     "ar": "ما هو رقم حسابك على الإنترنت لدى USCIS؟"
    },
    "type": "text"
   },
   {
    "id": "i824_identifiers_applicable_id_numbers",
    "q": {
     "en": "Are there any other applicable identification numbers?",
     "ar": "هل هناك أي أرقام تعريف أخرى ذات صلة؟"
    },
    "type": "text"
   },
   {
    "id": "i824_underlying_case_form_number",
    "q": {
     "en": "What is the form number of the underlying case?",
     "ar": "ما هو رقم نموذج القضية الأساسية؟"
    },
    "type": "text"
   },
   {
    "id": "i824_underlying_case_receipt_number",
    "q": {
     "en": "What is the receipt number of the underlying case?",
     "ar": "ما هو رقم إيصال القضية الأساسية؟"
    },
    "type": "text"
   },
   {
    "id": "i824_underlying_case_filing_date",
    "q": {
     "en": "What is the filing date of the underlying case?",
     "ar": "ما هو تاريخ تقديم القضية الأساسية؟"
    },
    "type": "date"
   },
   {
    "id": "i824_underlying_case_approval_date",
    "q": {
     "en": "What is the approval date of the underlying case?",
     "ar": "ما هو تاريخ موافقة القضية الأساسية؟"
    },
    "type": "date"
   },
   {
    "id": "i824_underlying_case_approving_office",
    "q": {
     "en": "Which USCIS office approved the underlying case?",
     "ar": "أي مكتب من مكاتب USCIS وافق على القضية الأساسية؟"
    },
    "type": "text"
   },
   {
    "id": "i824_beneficiary_name",
    "q": {
     "en": "What is the beneficiary's full name?",
     "ar": "ما هو الاسم الكامل للمستفيد؟"
    },
    "type": "text"
   },
   {
    "id": "i824_beneficiary_birth_details",
    "q": {
     "en": "What are the beneficiary's birth details (date and place of birth)?",
     "ar": "ما هي تفاصيل ميلاد المستفيد (تاريخ ومكان الميلاد)؟"
    },
    "type": "text"
   },
   {
    "id": "i824_beneficiary_a_number",
    "q": {
     "en": "What is the beneficiary's A-number (Alien Registration Number)?",
     "ar": "ما هو رقم A للمستفيد (رقم تسجيل الأجانب)؟"
    },
    "type": "text"
   },
   {
    "id": "i824_beneficiary_address",
    "q": {
     "en": "What is the beneficiary's address?",
     "ar": "ما هو عنوان المستفيد؟"
    },
    "type": "text"
   },
   {
    "id": "i824_beneficiary_current_location",
    "q": {
     "en": "What is the beneficiary's current location?",
     "ar": "ما هو موقع المستفيد الحالي؟"
    },
    "type": "text"
   },
   {
    "id": "i824_requested_action_exact_part2_option",
    "q": {
     "en": "Which exact option from Part 2 of Form I-824 are you selecting?",
     "ar": "ما هو الخيار المحدد من الجزء 2 من النموذج I-824 الذي تختاره؟"
    },
    "type": "text"
   },
   {
    "id": "i824_requested_action_explanation",
    "q": {
     "en": "Provide an explanation for the requested action.",
     "ar": "قدم شرحًا للإجراء المطلوب."
    },
    "type": "textarea"
   },
   {
    "id": "i824_requested_action_destination_office",
    "q": {
     "en": "What is the destination office for the requested action?",
     "ar": "ما هو المكتب المستهدف للإجراء المطلوب؟"
    },
    "type": "text"
   },
   {
    "id": "i824_follow_to_join_spouse_children_identities",
    "q": {
     "en": "For follow-to-join, provide the full names and birth dates of your spouse and children.",
     "ar": "لأغراض لم الشمل، يرجى ذكر الأسماء الكاملة وتواريخ الميلاد لزوجتك وأطفالك."
    },
    "type": "textarea"
   },
   {
    "id": "i824_follow_to_join_relationship_dates",
    "q": {
     "en": "For follow-to-join, provide dates of marriage and birth for family members.",
     "ar": "لأغراض لم الشمل، يرجى ذكر تواريخ الزواج والميلاد لأفراد العائلة."
    },
    "type": "textarea"
   },
   {
    "id": "i824_follow_to_join_marital_status",
    "q": {
     "en": "For follow-to-join, what is the marital status of your spouse/children?",
     "ar": "لأغراض لم الشمل، ما هي الحالة الاجتماعية لزوجتك/أطفالك؟"
    },
    "type": "text"
   },
   {
    "id": "i824_follow_to_join_locations",
    "q": {
     "en": "For follow-to-join, what are the current locations of your spouse and children?",
     "ar": "لأغراض لم الشمل، ما هي المواقع الحالية لزوجتك وأطفالك؟"
    },
    "type": "text"
   },
   {
    "id": "i824_existing_processing_forwarded_case",
    "q": {
     "en": "Has USCIS already forwarded the case to another agency (e.g., NVC)?",
     "ar": "هل قامت USCIS بتحويل القضية بالفعل إلى وكالة أخرى (مثل NVC)؟"
    },
    "type": "yesno"
   },
   {
    "id": "i824_existing_processing_nvc_case_number",
    "q": {
     "en": "Is there an NVC case number?",
     "ar": "هل يوجد رقم قضية NVC؟"
    },
    "type": "text"
   },
   {
    "id": "i824_existing_processing_nvc_correspondence",
    "q": {
     "en": "Is there any correspondence from NVC?",
     "ar": "هل توجد أي مراسلات من NVC؟"
    },
    "type": "yesno"
   },
   {
    "id": "i824_completion_required_signature",
    "q": {
     "en": "Will the form be signed by the applicant/petitioner?",
     "ar": "هل سيتم توقيع النموذج من قبل مقدم الطلب/مقدم العريضة؟"
    },
    "type": "yesno"
   },
   {
    "id": "i824_completion_interpreter_info",
    "q": {
     "en": "Are there any interpreter details to provide?",
     "ar": "هل توجد أي تفاصيل تخص مترجماً لتقديمها؟"
    },
    "type": "yesno"
   },
   {
    "id": "i824_completion_preparer_info",
    "q": {
     "en": "Are there any preparer details to provide?",
     "ar": "هل توجد أي تفاصيل تخص معد الطلب لتقديمها؟"
    },
    "type": "yesno"
   },
   {
    "id": "i824_approval_lost_explanation",
    "q": {
     "en": "If the original approval notice is lost, please explain the circumstances.",
     "ar": "إذا فُقد إشعار الموافقة الأصلي، يرجى شرح الظروف."
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed and signed Form I-824",
    "ar": "نموذج I-824 مكتمل وموقع"
   },
   {
    "en": "Copy of the underlying approval notice (Form I-797) for options 1.a–1.d",
    "ar": "نسخة من إشعار الموافقة الأساسي (نموذج I-797) للخيارات 1.أ - 1.د"
   },
   {
    "en": "Naturalization Certificate (Form N-550) for option 1.e",
    "ar": "شهادة التجنيس (نموذج N-550) للخيار 1.هـ"
   },
   {
    "en": "Applicable fee payment documentation",
    "ar": "وثائق دفع الرسوم المطبقة"
   },
   {
    "en": "Relevant USCIS/NVC correspondence",
    "ar": "المراسلات ذات الصلة من USCIS/NVC"
   },
   {
    "en": "Explanation of the request (if circumstances need clarification)",
    "ar": "شرح الطلب (إذا كانت الظروف تتطلب توضيحاً)"
   },
   {
    "en": "Additional case-specific evidence to support the selected action",
    "ar": "أدلة إضافية خاصة بالحالة لدعم الإجراء المختار"
   },
   {
    "en": "Available copies or receipt information for lost approval notice",
    "ar": "النسخ المتاحة أو معلومات الإيصال لإشعار الموافقة المفقود"
   },
   {
    "en": "Principal applicant's adjustment of status records or status records (for follow-to-join)",
    "ar": "سجلات تعديل وضع مقدم الطلب الرئيسي أو سجلات الحالة (لأغراض لم الشمل)"
   },
   {
    "en": "Marriage certificates (for follow-to-join)",
    "ar": "شهادات الزواج (لأغراض لم الشمل)"
   },
   {
    "en": "Birth certificates (for follow-to-join)",
    "ar": "شهادات الميلاد (لأغراض لم الشمل)"
   },
   {
    "en": "Records of termination of prior marriages (for follow-to-join)",
    "ar": "سجلات إنهاء الزيجات السابقة (لأغراض لم الشمل)"
   },
   {
    "en": "Identity documents for family members (for follow-to-join)",
    "ar": "وثائق هوية أفراد العائلة (لأغراض لم الشمل)"
   }
  ]
 },
 {
  "code": "I-864",
  "title": {
   "en": "I-864 Affidavit of Support Under Section 213A",
   "ar": "I-864 إفادة دعم بموجب القسم 213A"
  },
  "questions": [
   {
    "id": "i864_eligibility_category",
    "q": {
     "en": "What immigration category is the applicant using?",
     "ar": "ما هي فئة الهجرة التي يستخدمها مقدم الطلب؟"
    },
    "type": "text"
   },
   {
    "id": "i864_eligibility_required",
    "q": {
     "en": "Is Form I-864 required, or does an exemption apply?",
     "ar": "هل النموذج I-864 مطلوب، أم أن هناك إعفاء ينطبق؟"
    },
    "type": "yesno"
   },
   {
    "id": "i864_eligibility_process",
    "q": {
     "en": "Is this an adjustment of status through USCIS or immigrant-visa processing through NVC?",
     "ar": "هل هذه تسوية وضع من خلال USCIS أم معالجة تأشيرة الهجرة من خلال NVC؟"
    },
    "type": "text"
   },
   {
    "id": "i864_sponsor_role",
    "q": {
     "en": "Is the sponsor the petitioner, a joint sponsor, or a substitute sponsor?",
     "ar": "هل الكفيل هو مقدم الالتماس، كفيل مشترك، أم كفيل بديل؟"
    },
    "type": "text"
   },
   {
    "id": "i864_sponsor_eligibility_age",
    "q": {
     "en": "Is the sponsor at least 18 years old?",
     "ar": "هل الكفيل يبلغ 18 عامًا على الأقل؟"
    },
    "type": "yesno"
   },
   {
    "id": "i864_sponsor_eligibility_status",
    "q": {
     "en": "Is the sponsor a U.S. citizen, U.S. national, or lawful permanent resident?",
     "ar": "هل الكفيل مواطن أمريكي، مواطن أمريكي، أم مقيم دائم قانوني؟"
    },
    "type": "yesno"
   },
   {
    "id": "i864_sponsor_domicile",
    "q": {
     "en": "Does the sponsor have U.S. domicile?",
     "ar": "هل لدى الكفيل موطن في الولايات المتحدة؟"
    },
    "type": "yesno"
   },
   {
    "id": "i864_sponsor_domicile_egypt",
    "q": {
     "en": "If living in Egypt, how has the sponsor maintained U.S. domicile or how will they reestablish it?",
     "ar": "إذا كان الكفيل يعيش في مصر، كيف حافظ على موطنه في الولايات المتحدة أو كيف سيعيد تأسيسه؟"
    },
    "type": "textarea"
   },
   {
    "id": "i864_sponsor_qualify_method",
    "q": {
     "en": "Will the sponsor qualify using individual income, household-member income, assets, or a joint sponsor?",
     "ar": "هل سيتأهل الكفيل باستخدام الدخل الفردي، دخل أفراد الأسرة، الأصول، أم كفيل مشترك؟"
    },
    "type": "text"
   },
   {
    "id": "i864_sponsor_legal_name",
    "q": {
     "en": "Sponsor's full legal name",
     "ar": "الاسم القانوني الكامل للكفيل"
    },
    "type": "text"
   },
   {
    "id": "i864_sponsor_dob",
    "q": {
     "en": "Sponsor's date of birth",
     "ar": "تاريخ ميلاد الكفيل"
    },
    "type": "date"
   },
   {
    "id": "i864_sponsor_pob",
    "q": {
     "en": "Sponsor's place of birth",
     "ar": "مكان ميلاد الكفيل"
    },
    "type": "text"
   },
   {
    "id": "i864_sponsor_citizenship_status",
    "q": {
     "en": "Sponsor's citizenship or immigration status",
     "ar": "جنسية الكفيل أو وضعه الهجري"
    },
    "type": "text"
   },
   {
    "id": "i864_sponsor_ssn",
    "q": {
     "en": "Sponsor's Social Security number",
     "ar": "رقم الضمان الاجتماعي للكفيل"
    },
    "type": "text"
   },
   {
    "id": "i864_sponsor_anumber",
    "q": {
     "en": "Sponsor's A-number (if applicable)",
     "ar": "رقم A للكفيل (إن وجد)"
    },
    "type": "text"
   },
   {
    "id": "i864_sponsor_mailing_address",
    "q": {
     "en": "Sponsor's mailing address",
     "ar": "عنوان المراسلة للكفيل"
    },
    "type": "text"
   },
   {
    "id": "i864_sponsor_physical_address",
    "q": {
     "en": "Sponsor's physical address",
     "ar": "عنوان السكن الفعلي للكفيل"
    },
    "type": "text"
   },
   {
    "id": "i864_sponsor_telephone",
    "q": {
     "en": "Sponsor's telephone number",
     "ar": "رقم هاتف الكفيل"
    },
    "type": "text"
   },
   {
    "id": "i864_sponsor_email",
    "q": {
     "en": "Sponsor's email address",
     "ar": "عنوان البريد الإلكتروني للكفيل"
    },
    "type": "text"
   },
   {
    "id": "i864_sponsorship_basis_petition_type",
    "q": {
     "en": "Petition type (e.g., I-130, I-140)",
     "ar": "نوع الالتماس (مثل I-130, I-140)"
    },
    "type": "text"
   },
   {
    "id": "i864_sponsorship_basis_relationship",
    "q": {
     "en": "Sponsor's relationship to the immigrant",
     "ar": "علاقة الكفيل بالمهاجر"
    },
    "type": "text"
   },
   {
    "id": "i864_principal_immigrant_name",
    "q": {
     "en": "Principal immigrant's full name",
     "ar": "الاسم الكامل للمهاجر الرئيسي"
    },
    "type": "text"
   },
   {
    "id": "i864_principal_immigrant_dob",
    "q": {
     "en": "Principal immigrant's date of birth",
     "ar": "تاريخ ميلاد المهاجر الرئيسي"
    },
    "type": "date"
   },
   {
    "id": "i864_principal_immigrant_nationality",
    "q": {
     "en": "Principal immigrant's nationality",
     "ar": "جنسية المهاجر الرئيسي"
    },
    "type": "text"
   },
   {
    "id": "i864_principal_immigrant_anumber",
    "q": {
     "en": "Principal immigrant's A-number",
     "ar": "رقم A للمهاجر الرئيسي"
    },
    "type": "text"
   },
   {
    "id": "i864_accompanying_family_members",
    "q": {
     "en": "List all accompanying or following family members (name, date of birth, A-number)",
     "ar": "أدرج جميع أفراد الأسرة المرافقين أو اللاحقين (الاسم، تاريخ الميلاد، رقم A)"
    },
    "type": "textarea"
   },
   {
    "id": "i864_household_sponsor",
    "q": {
     "en": "Count of sponsor (always 1)",
     "ar": "عدد الكفيل (دائماً 1)"
    },
    "type": "text"
   },
   {
    "id": "i864_household_spouse",
    "q": {
     "en": "Count of sponsor's spouse (if applicable)",
     "ar": "عدد زوج/زوجة الكفيل (إن وجد)"
    },
    "type": "text"
   },
   {
    "id": "i864_household_dependent_children",
    "q": {
     "en": "Count of sponsor's dependent children",
     "ar": "عدد الأطفال المعالين للكفيل"
    },
    "type": "text"
   },
   {
    "id": "i864_household_other_tax_dependents",
    "q": {
     "en": "Count of other tax dependents",
     "ar": "عدد المعالين الآخرين لأغراض الضريبة"
    },
    "type": "text"
   },
   {
    "id": "i864_household_sponsored_immigrants",
    "q": {
     "en": "Count of sponsored immigrants (principal and accompanying family members)",
     "ar": "عدد المهاجرين المكفولين (الرئيسي وأفراد الأسرة المرافقين)"
    },
    "type": "text"
   },
   {
    "id": "i864_household_previously_sponsored",
    "q": {
     "en": "Count of people previously sponsored whose support obligations continue",
     "ar": "عدد الأشخاص الذين تم كفالتهم سابقًا والذين لا تزال التزامات الدعم مستمرة تجاههم"
    },
    "type": "text"
   },
   {
    "id": "i864_household_qualifying_members",
    "q": {
     "en": "Count of qualifying household members contributing income",
     "ar": "عدد أفراد الأسرة المؤهلين المساهمين بالدخل"
    },
    "type": "text"
   },
   {
    "id": "i864_employment_employer",
    "q": {
     "en": "Sponsor's current employer",
     "ar": "صاحب العمل الحالي للكفيل"
    },
    "type": "text"
   },
   {
    "id": "i864_employment_occupation",
    "q": {
     "en": "Sponsor's occupation",
     "ar": "مهنة الكفيل"
    },
    "type": "text"
   },
   {
    "id": "i864_employment_dates",
    "q": {
     "en": "Sponsor's employment dates",
     "ar": "فترة عمل الكفيل"
    },
    "type": "text"
   },
   {
    "id": "i864_employment_self",
    "q": {
     "en": "Is the sponsor self-employed?",
     "ar": "هل الكفيل يعمل لحسابه الخاص؟"
    },
    "type": "yesno"
   },
   {
    "id": "i864_employment_retired",
    "q": {
     "en": "Is the sponsor retired?",
     "ar": "هل الكفيل متقاعد؟"
    },
    "type": "yesno"
   },
   {
    "id": "i864_employment_unemployed",
    "q": {
     "en": "Is the sponsor unemployed?",
     "ar": "هل الكفيل عاطل عن العمل؟"
    },
    "type": "yesno"
   },
   {
    "id": "i864_current_income_annual",
    "q": {
     "en": "Sponsor's current annual income",
     "ar": "الدخل السنوي الحالي للكفيل"
    },
    "type": "text"
   },
   {
    "id": "i864_current_income_sources",
    "q": {
     "en": "Sources of sponsor's current income",
     "ar": "مصادر الدخل الحالي للكفيل"
    },
    "type": "textarea"
   },
   {
    "id": "i864_current_income_household_contributions",
    "q": {
     "en": "Household member contributions to current income",
     "ar": "مساهمات أفراد الأسرة في الدخل الحالي"
    },
    "type": "textarea"
   },
   {
    "id": "i864_current_income_continue",
    "q": {
     "en": "Will the current income continue from the same sources?",
     "ar": "هل سيستمر الدخل الحالي من نفس المصادر؟"
    },
    "type": "yesno"
   },
   {
    "id": "i864_tax_filing_status_latest_year",
    "q": {
     "en": "Sponsor's filing status for the latest tax year",
     "ar": "حالة الكفيل الضريبية لآخر سنة ضريبية"
    },
    "type": "text"
   },
   {
    "id": "i864_tax_total_income_latest_year",
    "q": {
     "en": "Sponsor's total income for the latest tax year",
     "ar": "إجمالي دخل الكفيل لآخر سنة ضريبية"
    },
    "type": "text"
   },
   {
    "id": "i864_tax_filing_status_previous_year_1",
    "q": {
     "en": "Sponsor's filing status for the second latest tax year",
     "ar": "حالة الكفيل الضريبية لثاني آخر سنة ضريبية"
    },
    "type": "text"
   },
   {
    "id": "i864_tax_total_income_previous_year_1",
    "q": {
     "en": "Sponsor's total income for the second latest tax year",
     "ar": "إجمالي دخل الكفيل لثاني آخر سنة ضريبية"
    },
    "type": "text"
   },
   {
    "id": "i864_tax_filing_status_previous_year_2",
    "q": {
     "en": "Sponsor's filing status for the third latest tax year",
     "ar": "حالة الكفيل الضريبية لثالث آخر سنة ضريبية"
    },
    "type": "text"
   },
   {
    "id": "i864_tax_total_income_previous_year_2",
    "q": {
     "en": "Sponsor's total income for the third latest tax year",
     "ar": "إجمالي دخل الكفيل لثالث آخر سنة ضريبية"
    },
    "type": "text"
   },
   {
    "id": "i864_tax_missing_returns_explanation",
    "q": {
     "en": "Explanation for any missing tax returns",
     "ar": "شرح لأي إقرارات ضريبية مفقودة"
    },
    "type": "textarea"
   },
   {
    "id": "i864_assets_owner",
    "q": {
     "en": "Owner of the asset (if relying on assets)",
     "ar": "مالك الأصل (إذا كان يعتمد على الأصول)"
    },
    "type": "text"
   },
   {
    "id": "i864_assets_type",
    "q": {
     "en": "Type of asset (if relying on assets)",
     "ar": "نوع الأصل (إذا كان يعتمد على الأصول)"
    },
    "type": "text"
   },
   {
    "id": "i864_assets_location",
    "q": {
     "en": "Location of asset (if relying on assets)",
     "ar": "موقع الأصل (إذا كان يعتمد على الأصول)"
    },
    "type": "text"
   },
   {
    "id": "i864_assets_value",
    "q": {
     "en": "Value of asset (if relying on assets)",
     "ar": "قيمة الأصل (إذا كان يعتمد على الأصول)"
    },
    "type": "text"
   },
   {
    "id": "i864_assets_outstanding_debt",
    "q": {
     "en": "Outstanding debt on asset (if relying on assets)",
     "ar": "الديون المستحقة على الأصل (إذا كان يعتمد على الأصول)"
    },
    "type": "text"
   },
   {
    "id": "i864_assets_net_value",
    "q": {
     "en": "Net value of asset (if relying on assets)",
     "ar": "القيمة الصافية للأصل (إذا كان يعتمد على الأصول)"
    },
    "type": "text"
   },
   {
    "id": "i864_assets_convert_to_cash",
    "q": {
     "en": "Ability to convert asset to cash (if relying on assets)",
     "ar": "القدرة على تحويل الأصل إلى نقد (إذا كان يعتمد على الأصول)"
    },
    "type": "yesno"
   },
   {
    "id": "i864_joint_sponsor_details",
    "q": {
     "en": "Details of each joint sponsor (name, contact, income, etc.)",
     "ar": "تفاصيل كل كفيل مشترك (الاسم، معلومات الاتصال، الدخل، إلخ)"
    },
    "type": "textarea"
   },
   {
    "id": "i864_household_member_i864a",
    "q": {
     "en": "List household members requiring Form I-864A (name, relationship)",
     "ar": "أدرج أفراد الأسرة الذين يحتاجون النموذج I-864A (الاسم، العلاقة)"
    },
    "type": "textarea"
   },
   {
    "id": "i864_sponsor_acknowledgement",
    "q": {
     "en": "Acknowledge that I-864 creates a legally enforceable financial obligation, including possible reimbursement claims for certain public benefits.",
     "ar": "أقر بأن I-864 ينشئ التزامًا ماليًا قابلاً للتنفيذ قانونًا، بما في ذلك مطالبات السداد المحتملة لبعض المنافع العامة."
    },
    "type": "yesno"
   }
  ],
  "docs": [
   {
    "en": "Completed, signed I-864—all pages",
    "ar": "النموذج I-864 مكتمل وموقع - جميع الصفحات"
   },
   {
    "en": "Most recent federal tax transcript or complete filed federal return",
    "ar": "أحدث كشف ضريبي فيدرالي أو إقرار ضريبي فيدرالي كامل ومقدم"
   },
   {
    "en": "W-2s, 1099s and applicable schedules (with a complete tax-return copy)",
    "ar": "نماذج W-2s, 1099s والجداول المطبقة (مع نسخة كاملة من الإقرار الضريبي)"
   },
   {
    "en": "Evidence identifying the sponsor’s own income (for joint-return cases)",
    "ar": "إثبات يحدد دخل الكفيل الخاص (لحالات الإقرار الضريبي المشترك)"
   },
   {
    "en": "Current income evidence (pay statements, employer letter, pension/benefit statements or other evidence)",
    "ar": "إثبات الدخل الحالي (كشوف المرتبات، خطاب من صاحب العمل، كشوف المعاشات/المنافع أو أي إثبات آخر)"
   },
   {
    "en": "Self-employment evidence (relevant tax schedules and evidence supporting current business income)",
    "ar": "إثبات العمل الحر (الجداول الضريبية ذات الصلة والأدلة التي تدعم دخل الأعمال الحالي)"
   },
   {
    "en": "Nonfiling explanation (signed explanation establishing why a federal return was not required)",
    "ar": "تفسير عدم تقديم الإقرار الضريبي (تفسير موقع يوضح سبب عدم ضرورة الإقرار الضريبي الفيدرالي)"
   },
   {
    "en": "Tax-extension evidence (Form 4868 or signed extension statement, plus the previous year’s transcript/return for NVC)",
    "ar": "إثبات تمديد الموعد الضريبي (النموذج 4868 أو بيان تمديد موقع، بالإضافة إلى كشف/إقرار السنة السابقة لـ NVC)"
   },
   {
    "en": "U.S. status evidence (passport, citizenship certificate or green card, as appropriate)",
    "ar": "إثبات الوضع في الولايات المتحدة (جواز السفر، شهادة الجنسية أو البطاقة الخضراء، حسب الاقتضاء)"
   },
   {
    "en": "Domicile evidence (explanation plus evidence of maintained U.S. ties or concrete steps to establish U.S. residence)",
    "ar": "إثبات الموطن (شرح بالإضافة إلى دليل على الاحتفاظ بالروابط الأمريكية أو خطوات ملموسة لتأسيس الإقامة في الولايات المتحدة)"
   },
   {
    "en": "Asset evidence (ownership, valuation, account records and debts/liens when relying on assets)",
    "ar": "إثبات الأصول (الملكية، التقييم، سجلات الحسابات والديون/الرهون عند الاعتماد على الأصول)"
   },
   {
    "en": "Signed I-864A and supporting evidence (when using a qualifying household member’s income/assets)",
    "ar": "النموذج I-864A الموقّع والأدلة الداعمة (عند استخدام دخل/أصول فرد مؤهل من أفراد الأسرة)"
   },
   {
    "en": "Relationship and residence evidence (for I-864A, where required)",
    "ar": "إثبات العلاقة والإقامة (للنموذج I-864A، حيثما يلزم)"
   },
   {
    "en": "Proof that intending immigrant’s income will continue from the same source (if using their income)",
    "ar": "دليل على أن دخل المهاجر المزمع سيستمر من نفس المصدر (إذا كان يستخدم دخلهم)"
   },
   {
    "en": "Complete certified English translation for foreign-language evidence",
    "ar": "ترجمة إنجليزية كاملة ومعتمدة للأدلة بلغات أجنبية"
   }
  ]
 },
 {
  "code": "I-864A",
  "title": {
   "en": "I-864A Contract Between Sponsor and Household Member",
   "ar": "I-864A عقد بين الكفيل وأفراد الأسرة"
  },
  "questions": [
   {
    "id": "i864_support_type",
    "q": {
     "en": "Which sponsor’s I-864 will this contract support—the petitioner’s or a joint sponsor’s?",
     "ar": "أي نموذج I-864 الخاص بأي كفيل سيدعمه هذا العقد - الخاص بمقدم الالتماس أم الكفيل المشترك؟"
    },
    "type": "text"
   },
   {
    "id": "household_member_age",
    "q": {
     "en": "Is the household member at least 18 years old?",
     "ar": "هل يبلغ فرد الأسرة 18 عامًا على الأقل؟"
    },
    "type": "yesno"
   },
   {
    "id": "household_member_relationship_sponsor",
    "q": {
     "en": "What is their relationship to the sponsor?",
     "ar": "ما هي علاقتهم بالكفيل؟"
    },
    "type": "text"
   },
   {
    "id": "household_member_share_residence",
    "q": {
     "en": "Do they share the sponsor’s principal residence?",
     "ar": "هل يشاركون الكفيل محل إقامته الرئيسي؟"
    },
    "type": "yesno"
   },
   {
    "id": "household_member_tax_dependent",
    "q": {
     "en": "Were they lawfully claimed as a dependent on the sponsor’s most recent federal tax return?",
     "ar": "هل تم إدراجهم بشكل قانوني كمعالين في أحدث إقرار ضريبي فيدرالي للكفيل؟"
    },
    "type": "yesno"
   },
   {
    "id": "household_member_contribution_type",
    "q": {
     "en": "Will they contribute income, assets, or both?",
     "ar": "هل سيساهمون بالدخل أو الأصول أو كليهما؟"
    },
    "type": "text"
   },
   {
    "id": "household_member_intending_immigrant",
    "q": {
     "en": "Are they the intending immigrant?",
     "ar": "هل هم المهاجر المقصود؟"
    },
    "type": "yesno"
   },
   {
    "id": "intending_immigrant_dependents",
    "q": {
     "en": "If the household member is the intending immigrant, are any spouse or children immigrating with them?",
     "ar": "إذا كان فرد الأسرة هو المهاجر المقصود، فهل يهاجر أي زوج أو أطفال معهم؟"
    },
    "type": "yesno"
   },
   {
    "id": "household_member_full_name",
    "q": {
     "en": "Household member's full legal name",
     "ar": "الاسم القانوني الكامل لفرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "household_member_dob",
    "q": {
     "en": "Household member's date of birth",
     "ar": "تاريخ ميلاد فرد الأسرة"
    },
    "type": "date"
   },
   {
    "id": "household_member_pob",
    "q": {
     "en": "Household member's place of birth",
     "ar": "مكان ميلاد فرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "household_member_mailing_address",
    "q": {
     "en": "Household member's mailing address",
     "ar": "عنوان المراسلات لفرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "household_member_physical_address",
    "q": {
     "en": "Household member's physical address",
     "ar": "العنوان الفعلي لفرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "household_member_ssn",
    "q": {
     "en": "Household member's Social Security number (SSN)",
     "ar": "رقم الضمان الاجتماعي (SSN) لفرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "household_member_anumber",
    "q": {
     "en": "Household member's A-number (where applicable)",
     "ar": "رقم A الخاص بفرد الأسرة (إن وجد)"
    },
    "type": "text"
   },
   {
    "id": "household_member_uscis_account_number",
    "q": {
     "en": "Household member's USCIS account number (where applicable)",
     "ar": "رقم حساب USCIS الخاص بفرد الأسرة (إن وجد)"
    },
    "type": "text"
   },
   {
    "id": "household_member_relationship_details",
    "q": {
     "en": "Household member's relationship category to the sponsor (Spouse, parent, adult child, sibling, other qualifying dependent, or intending immigrant)",
     "ar": "فئة علاقة فرد الأسرة بالكفيل (زوج، والد، ابن بالغ، أخ، معال مؤهل آخر، أو مهاجر مقصود)"
    },
    "type": "text"
   },
   {
    "id": "household_member_residence_since",
    "q": {
     "en": "If household member shares principal residence, since when?",
     "ar": "إذا كان فرد الأسرة يشارك الكفيل محل إقامته الرئيسي، فمنذ متى؟"
    },
    "type": "date"
   },
   {
    "id": "household_member_tax_dependent_return",
    "q": {
     "en": "If household member was claimed as a tax dependent, on which return?",
     "ar": "إذا تم إدراج فرد الأسرة كمعال ضريبي، ففي أي إقرار؟"
    },
    "type": "text"
   },
   {
    "id": "household_member_employer",
    "q": {
     "en": "Household member's employer name",
     "ar": "اسم صاحب عمل فرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "household_member_occupation",
    "q": {
     "en": "Household member's occupation",
     "ar": "وظيفة فرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "household_member_employment_dates",
    "q": {
     "en": "Household member's employment dates",
     "ar": "تواريخ عمل فرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "household_member_self_employment",
    "q": {
     "en": "Is the household member self-employed?",
     "ar": "هل فرد الأسرة يعمل لحسابه الخاص؟"
    },
    "type": "yesno"
   },
   {
    "id": "household_member_retirement",
    "q": {
     "en": "Is the household member retired?",
     "ar": "هل فرد الأسرة متقاعد؟"
    },
    "type": "yesno"
   },
   {
    "id": "household_member_unemployment",
    "q": {
     "en": "Is the household member unemployed?",
     "ar": "هل فرد الأسرة عاطل عن العمل؟"
    },
    "type": "yesno"
   },
   {
    "id": "household_member_current_annual_income",
    "q": {
     "en": "Household member's individual current annual income amount",
     "ar": "مبلغ الدخل السنوي الفردي الحالي لفرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "household_member_income_sources",
    "q": {
     "en": "Sources of household member's income",
     "ar": "مصادر دخل فرد الأسرة"
    },
    "type": "textarea"
   },
   {
    "id": "household_member_income_continuation",
    "q": {
     "en": "Will the household member's income continue?",
     "ar": "هل سيستمر دخل فرد الأسرة؟"
    },
    "type": "yesno"
   },
   {
    "id": "household_member_most_recent_tax_year",
    "q": {
     "en": "Household member's most recent federal tax year",
     "ar": "أحدث سنة ضريبية فيدرالية لفرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "household_member_reported_total_income",
    "q": {
     "en": "Household member's reported total income for the most recent federal tax year",
     "ar": "إجمالي الدخل المبلغ عنه لفرد الأسرة لأحدث سنة ضريبية فيدرالية"
    },
    "type": "text"
   },
   {
    "id": "household_member_tax_filing_history",
    "q": {
     "en": "Household member's federal tax filing history",
     "ar": "تاريخ تقديم الإقرارات الضريبية الفيدرالية لفرد الأسرة"
    },
    "type": "textarea"
   },
   {
    "id": "household_member_joint_filing",
    "q": {
     "en": "Did the household member file taxes jointly?",
     "ar": "هل قدم فرد الأسرة إقرارات ضريبية مشتركة؟"
    },
    "type": "yesno"
   },
   {
    "id": "household_member_tax_extensions",
    "q": {
     "en": "Did the household member file tax extensions?",
     "ar": "هل قدم فرد الأسرة طلبات تمديد ضريبي؟"
    },
    "type": "yesno"
   },
   {
    "id": "household_member_nonfiling_explanation",
    "q": {
     "en": "If household member lawfully did not file taxes, provide explanation",
     "ar": "إذا لم يقدم فرد الأسرة إقرارات ضريبية بشكل قانوني، يرجى تقديم توضيح"
    },
    "type": "textarea"
   },
   {
    "id": "household_member_asset_type",
    "q": {
     "en": "Type of asset(s) to be contributed by household member",
     "ar": "نوع الأصول التي سيساهم بها فرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "household_member_asset_owner",
    "q": {
     "en": "Owner of asset(s) to be contributed by household member",
     "ar": "مالك الأصول التي سيساهم بها فرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "household_member_asset_location",
    "q": {
     "en": "Location of asset(s) to be contributed by household member",
     "ar": "موقع الأصول التي سيساهم بها فرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "household_member_asset_value",
    "q": {
     "en": "Value of asset(s) to be contributed by household member",
     "ar": "قيمة الأصول التي سيساهم بها فرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "household_member_asset_debt_liens",
    "q": {
     "en": "Debt or liens on asset(s) to be contributed by household member",
     "ar": "الديون أو الرهون على الأصول التي سيساهم بها فرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "household_member_asset_net_value",
    "q": {
     "en": "Net value of asset(s) to be contributed by household member",
     "ar": "صافي قيمة الأصول التي سيساهم بها فرد الأسرة"
    },
    "type": "text"
   },
   {
    "id": "linked_sponsor_full_name",
    "q": {
     "en": "Full name of the linked sponsor",
     "ar": "الاسم الكامل للكفيل المرتبط"
    },
    "type": "text"
   },
   {
    "id": "linked_sponsor_connection_i864",
    "q": {
     "en": "Sponsor's connection to the accompanying I-864",
     "ar": "صلة الكفيل بنموذج I-864 المرفق"
    },
    "type": "text"
   },
   {
    "id": "sponsored_immigrant_names",
    "q": {
     "en": "Names of sponsored immigrants matching the sponsor’s I-864",
     "ar": "أسماء المهاجرين المكفولين المطابقة لنموذج I-864 الخاص بالكفيل"
    },
    "type": "textarea"
   },
   {
    "id": "sponsored_immigrant_identifying_info",
    "q": {
     "en": "Identifying information of sponsored immigrants matching the sponsor’s I-864",
     "ar": "المعلومات التعريفية للمهاجرين المكفولين المطابقة لنموذج I-864 الخاص بالكفيل"
    },
    "type": "textarea"
   },
   {
    "id": "sponsor_certification_date",
    "q": {
     "en": "Sponsor's certification date",
     "ar": "تاريخ تصديق الكفيل"
    },
    "type": "date"
   },
   {
    "id": "sponsor_contact_information",
    "q": {
     "en": "Sponsor's contact information",
     "ar": "معلومات اتصال الكفيل"
    },
    "type": "textarea"
   },
   {
    "id": "household_member_certification_date",
    "q": {
     "en": "Household member's certification date",
     "ar": "تاريخ تصديق فرد الأسرة"
    },
    "type": "date"
   },
   {
    "id": "household_member_contact_information",
    "q": {
     "en": "Household member's contact information",
     "ar": "معلومات اتصال فرد الأسرة"
    },
    "type": "textarea"
   },
   {
    "id": "interpreter_details",
    "q": {
     "en": "Interpreter's details and signature (when applicable)",
     "ar": "تفاصيل المترجم وتوقيعه (إن وجد)"
    },
    "type": "textarea"
   },
   {
    "id": "preparer_details",
    "q": {
     "en": "Preparer's details and signature (when applicable)",
     "ar": "تفاصيل مُعد النموذج وتوقيعه (إن وجد)"
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Signed I-864A – all pages (with both parties’ signatures)",
    "ar": "نموذج I-864A الموقّع - جميع الصفحات (مع توقيع الطرفين)"
   },
   {
    "en": "Linked sponsor’s I-864",
    "ar": "نموذج I-864 الخاص بالكفيل المرتبط"
   },
   {
    "en": "Household member’s latest federal tax transcript or complete filed return",
    "ar": "أحدث كشف ضريبي فيدرالي لفرد الأسرة أو الإقرار الضريبي الكامل المقدم"
   },
   {
    "en": "Household member’s W-2s, 1099s and applicable schedules (with a return copy; joint-return cases need evidence identifying individual income)",
    "ar": "نماذج W-2s، و1099s، والجداول المطبقة لفرد الأسرة (مع نسخة من الإقرار؛ تحتاج حالات الإقرار المشترك إلى دليل يحدد الدخل الفردي)"
   },
   {
    "en": "Household member’s current income evidence (pay statements, employer letter, pension statements or other records, especially where tax income is insufficient or outdated)",
    "ar": "دليل الدخل الحالي لفرد الأسرة (كشوف الراتب، خطاب صاحب العمل، كشوف المعاشات التقاعدية، أو سجلات أخرى، خاصة إذا كان الدخل الضريبي غير كافٍ أو قديم)"
   },
   {
    "en": "Household member’s self-employment evidence (applicable schedules and records supporting current income)",
    "ar": "دليل عمل فرد الأسرة لحسابه الخاص (الجداول والسجلات المطبقة التي تدعم الدخل الحالي)"
   },
   {
    "en": "Relationship evidence (birth, marriage or adoption records, or other appropriate evidence)",
    "ar": "دليل العلاقة (شهادات الميلاد، الزواج أو التبني، أو أي دليل آخر مناسب)"
   },
   {
    "en": "Shared-residence evidence (lease, mortgage, identification, utility bills or other records showing the same principal address, where required)",
    "ar": "دليل الإقامة المشتركة (عقد إيجار، رهن عقاري، هوية، فواتير خدمات، أو سجلات أخرى تظهر نفس العنوان الرئيسي، عند الاقتضاء)"
   },
   {
    "en": "Tax-dependent evidence (sponsor’s latest return showing the claimed dependent, when relying on that category)",
    "ar": "دليل الإعالة الضريبية (أحدث إقرار للكفيل يظهر المعال المعلن عنه، عند الاعتماد على هذه الفئة)"
   },
   {
    "en": "Nonfiling explanation (signed explanation and evidence establishing why filing was not required)",
    "ar": "توضيح عدم التقديم (توضيح موقع ودليل يثبت لماذا لم يكن التقديم مطلوبًا)"
   },
   {
    "en": "Asset evidence (ownership, valuation, account records, outstanding loans and liens, if used)",
    "ar": "دليل الأصول (الملكية، التقييم، سجلات الحساب، القروض والرهون المعلقة، إذا تم استخدامها)"
   },
   {
    "en": "Income-continuation evidence (proof it will continue after permanent residence, when using intending-immigrant income)",
    "ar": "دليل استمرارية الدخل (إثبات أنه سيستمر بعد الحصول على الإقامة الدائمة، عند استخدام دخل المهاجر المقصود)"
   }
  ]
 },
 {
  "code": "I-864EZ",
  "title": {
   "en": "I-864EZ Affidavit of Support — Simplified Form",
   "ar": "I-864EZ إقرار دعم - نموذج مبسط"
  },
  "questions": [
   {
    "id": "i130_petitioner",
    "q": {
     "en": "Are you the petitioner who filed Form I-130 for this immigrant?",
     "ar": "هل أنت مقدم الالتماس الذي قدم النموذج I-130 لهذا المهاجر؟"
    },
    "type": "yesno"
   },
   {
    "id": "sole_applicant",
    "q": {
     "en": "Is the sponsored immigrant the only applicant on that petition, without accompanying derivative beneficiaries?",
     "ar": "هل المهاجر المكفول هو مقدم الطلب الوحيد في ذلك الالتماس، بدون مستفيدين تابعين مرافقين؟"
    },
    "type": "yesno"
   },
   {
    "id": "income_w2_only",
    "q": {
     "en": "Can you meet the financial requirement entirely through your own salary or pension, documented by one or more Forms W-2?",
     "ar": "هل يمكنك تلبية المتطلبات المالية بالكامل من خلال راتبك أو معاشك التقاعدي الخاص، الموثق بنموذج W-2 واحد أو أكثر؟"
    },
    "type": "yesno"
   },
   {
    "id": "sponsor_age",
    "q": {
     "en": "Sponsor's age",
     "ar": "عمر الكفيل"
    },
    "type": "text"
   },
   {
    "id": "sponsor_full_legal_name",
    "q": {
     "en": "Sponsor's full legal name",
     "ar": "الاسم القانوني الكامل للكفيل"
    },
    "type": "text"
   },
   {
    "id": "sponsor_address",
    "q": {
     "en": "Sponsor's address",
     "ar": "عنوان الكفيل"
    },
    "type": "text"
   },
   {
    "id": "sponsor_dob_place",
    "q": {
     "en": "Sponsor's date and place of birth",
     "ar": "تاريخ ومكان ميلاد الكفيل"
    },
    "type": "text"
   },
   {
    "id": "sponsor_ssn",
    "q": {
     "en": "Sponsor's Social Security number",
     "ar": "رقم الضمان الاجتماعي للكفيل"
    },
    "type": "text"
   },
   {
    "id": "sponsor_immigration_identifiers",
    "q": {
     "en": "Sponsor's relevant immigration identifiers",
     "ar": "معرفات الهجرة ذات الصلة للكفيل"
    },
    "type": "text"
   },
   {
    "id": "sponsor_us_status",
    "q": {
     "en": "Is the sponsor a U.S. citizen, national, or permanent resident?",
     "ar": "هل الكفيل مواطن أم مواطن أم مقيم دائم في الولايات المتحدة؟"
    },
    "type": "yesno"
   },
   {
    "id": "sponsor_domicile_country",
    "q": {
     "en": "Sponsor's country of domicile",
     "ar": "بلد إقامة الكفيل"
    },
    "type": "text"
   },
   {
    "id": "sponsor_living_abroad",
    "q": {
     "en": "Is the sponsor living abroad?",
     "ar": "هل الكفيل يعيش في الخارج؟"
    },
    "type": "yesno"
   },
   {
    "id": "household_size_sponsor",
    "q": {
     "en": "Household members: Sponsor",
     "ar": "أفراد الأسرة: الكفيل"
    },
    "type": "text"
   },
   {
    "id": "household_size_immigrant",
    "q": {
     "en": "Household members: Sponsored immigrant",
     "ar": "أفراد الأسرة: المهاجر المكفول"
    },
    "type": "text"
   },
   {
    "id": "household_size_spouse",
    "q": {
     "en": "Household members: Spouse",
     "ar": "أفراد الأسرة: الزوج/الزوجة"
    },
    "type": "text"
   },
   {
    "id": "household_size_dependent_children",
    "q": {
     "en": "Household members: Dependent children",
     "ar": "أفراد الأسرة: الأطفال المعالون"
    },
    "type": "text"
   },
   {
    "id": "household_size_other_dependents",
    "q": {
     "en": "Household members: Other dependents",
     "ar": "أفراد الأسرة: معالون آخرون"
    },
    "type": "text"
   },
   {
    "id": "household_size_previously_sponsored",
    "q": {
     "en": "Household members: Previously sponsored immigrants whose obligations continue",
     "ar": "أفراد الأسرة: المهاجرون المكفولون سابقًا الذين لا تزال التزاماتهم سارية"
    },
    "type": "text"
   },
   {
    "id": "sponsor_employer_former",
    "q": {
     "en": "Sponsor's current or former employer",
     "ar": "صاحب العمل الحالي أو السابق للكفيل"
    },
    "type": "text"
   },
   {
    "id": "sponsor_occupation",
    "q": {
     "en": "Sponsor's occupation",
     "ar": "مهنة الكفيل"
    },
    "type": "text"
   },
   {
    "id": "sponsor_employment_status",
    "q": {
     "en": "Sponsor's employment status",
     "ar": "حالة توظيف الكفيل"
    },
    "type": "text"
   },
   {
    "id": "sponsor_pension_source",
    "q": {
     "en": "Sponsor's pension source",
     "ar": "مصدر معاش الكفيل"
    },
    "type": "text"
   },
   {
    "id": "sponsor_current_annual_income",
    "q": {
     "en": "Sponsor's current individual annual qualifying income",
     "ar": "الدخل السنوي الفردي المؤهل الحالي للكفيل"
    },
    "type": "text"
   },
   {
    "id": "tax_filing_history",
    "q": {
     "en": "Sponsor's tax filing history",
     "ar": "تاريخ تقديم الإقرارات الضريبية للكفيل"
    },
    "type": "text"
   },
   {
    "id": "tax_income_figures",
    "q": {
     "en": "Sponsor's income figures requested by the current form",
     "ar": "أرقام دخل الكفيل المطلوبة من النموذج الحالي"
    },
    "type": "text"
   },
   {
    "id": "tax_joint_filing",
    "q": {
     "en": "Did the sponsor file taxes jointly?",
     "ar": "هل قدم الكفيل إقرارات ضريبية مشتركة؟"
    },
    "type": "yesno"
   },
   {
    "id": "tax_extensions",
    "q": {
     "en": "Were tax extensions filed? If so, provide explanation.",
     "ar": "هل تم تقديم طلبات تمديد ضريبية؟ إذا كان الأمر كذلك، يرجى تقديم شرح."
    },
    "type": "textarea"
   },
   {
    "id": "tax_nonfiling_explanation",
    "q": {
     "en": "If the sponsor did not file taxes, provide an explanation.",
     "ar": "إذا لم يقدم الكفيل إقرارات ضريبية، يرجى تقديم شرح."
    },
    "type": "textarea"
   },
   {
    "id": "military_active_duty",
    "q": {
     "en": "Is the sponsor on active duty in the U.S. armed forces?",
     "ar": "هل الكفيل في الخدمة الفعلية في القوات المسلحة الأمريكية؟"
    },
    "type": "yesno"
   },
   {
    "id": "military_sponsoring_spouse_child",
    "q": {
     "en": "Is the sponsor on active duty and sponsoring a spouse or child?",
     "ar": "هل الكفيل في الخدمة الفعلية ويكفل زوجًا أو طفلًا؟"
    },
    "type": "yesno"
   },
   {
    "id": "immigrant_full_legal_name",
    "q": {
     "en": "Sponsored immigrant's full legal name",
     "ar": "الاسم القانوني الكامل للمهاجر المكفول"
    },
    "type": "text"
   },
   {
    "id": "immigrant_address",
    "q": {
     "en": "Sponsored immigrant's address",
     "ar": "عنوان المهاجر المكفول"
    },
    "type": "text"
   },
   {
    "id": "immigrant_birth_date",
    "q": {
     "en": "Sponsored immigrant's birth date",
     "ar": "تاريخ ميلاد المهاجر المكفول"
    },
    "type": "date"
   },
   {
    "id": "immigrant_a_number",
    "q": {
     "en": "Sponsored immigrant's A-number (if applicable)",
     "ar": "رقم A للمهاجر المكفول (إن وجد)"
    },
    "type": "text"
   },
   {
    "id": "immigrant_uscis_account_number",
    "q": {
     "en": "Sponsored immigrant's USCIS account number (if applicable)",
     "ar": "رقم حساب USCIS للمهاجر المكفول (إن وجد)"
    },
    "type": "text"
   },
   {
    "id": "sponsor_certification",
    "q": {
     "en": "Sponsor certification",
     "ar": "شهادة الكفيل"
    },
    "type": "yesno"
   },
   {
    "id": "sponsor_signature_date",
    "q": {
     "en": "Sponsor signature and date",
     "ar": "توقيع الكفيل والتاريخ"
    },
    "type": "text"
   },
   {
    "id": "sponsor_contact_info",
    "q": {
     "en": "Sponsor contact information",
     "ar": "معلومات الاتصال بالكفيل"
    },
    "type": "text"
   },
   {
    "id": "interpreter_section",
    "q": {
     "en": "Interpreter information (if applicable)",
     "ar": "معلومات المترجم (إن وجد)"
    },
    "type": "textarea"
   },
   {
    "id": "preparer_section",
    "q": {
     "en": "Preparer information (if applicable)",
     "ar": "معلومات المحضر (إن وجد)"
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed, signed I-864EZ—all pages",
    "ar": "نموذج I-864EZ مكتمل وموقع — جميع الصفحات"
   },
   {
    "en": "Proof of qualifying U.S. status (U.S. passport, birth/citizenship certificate, or permanent resident evidence)",
    "ar": "إثبات حالة الإقامة المؤهلة في الولايات المتحدة (جواز سفر أمريكي، شهادة ميلاد/جنسية، أو إثبات إقامة دائمة)"
   },
   {
    "en": "Most recent federal tax transcript or complete filed return",
    "ar": "أحدث كشف ضرائب فيدرالية أو إقرار ضريبي كامل مقدم"
   },
   {
    "en": "W-2 evidence",
    "ar": "إثباتات W-2"
   },
   {
    "en": "W-2s, 1099s and applicable schedules accompanying a return copy",
    "ar": "نماذج W-2، 1099s، والجداول المطبقة المرفقة بنسخة الإقرار"
   },
   {
    "en": "Current salary/pension evidence (pay statements, employer letter, or pension records)",
    "ar": "إثبات الراتب/المعاش الحالي (كشوف المرتبات، خطاب صاحب العمل، أو سجلات المعاش)"
   },
   {
    "en": "Individual income evidence for a joint tax return (to identify sponsor's own income)",
    "ar": "إثبات الدخل الفردي للإقرار الضريبي المشترك (لتحديد دخل الكفيل الخاص)"
   },
   {
    "en": "Domicile explanation and evidence (if sponsor lives abroad or domicile needs clarification)",
    "ar": "شرح وإثبات الإقامة (إذا كان الكفيل يعيش في الخارج أو يحتاج مكان الإقامة إلى توضيح)"
   },
   {
    "en": "Nonfiling or tax-extension evidence (where applicable)",
    "ar": "إثبات عدم التقديم أو تمديد الضرائب (حسب الاقتضاء)"
   },
   {
    "en": "Active-duty evidence (if claiming military income-threshold exception)",
    "ar": "إثبات الخدمة الفعلية (إذا كان يطالب باستثناء عتبة دخل الجيش)"
   }
  ]
 },
 {
  "code": "I-864W",
  "title": {
   "en": "Request for Exemption for Intending Immigrant’s Affidavit of Support",
   "ar": "طلب إعفاء من إقرار دعم المهاجر المزمع"
  },
  "questions": [
   {
    "id": "q1_1",
    "q": {
     "en": "Are you applying through USCIS adjustment of status or NVC/consular processing?",
     "ar": "هل تتقدم بطلبك من خلال تعديل الوضع مع USCIS أو من خلال معالجة NVC/القنصلية؟"
    },
    "type": "text"
   },
   {
    "id": "q1_2",
    "q": {
     "en": "What is your immigration category?",
     "ar": "ما هي فئة هجرتك؟"
    },
    "type": "text"
   },
   {
    "id": "q1_3",
    "q": {
     "en": "Which exemption are you claiming?",
     "ar": "ما هو الإعفاء الذي تطالب به؟"
    },
    "type": "text"
   },
   {
    "id": "q1_4",
    "q": {
     "en": "Have USCIS, NVC or the embassy issued specific instructions or an evidence request?",
     "ar": "هل أصدرت USCIS أو NVC أو السفارة تعليمات محددة أو طلب إثبات؟"
    },
    "type": "yesno"
   },
   {
    "id": "q2_1",
    "q": {
     "en": "Have you earned or can you be credited with 40 qualifying Social Security quarters?",
     "ar": "هل كسبت أو يمكن أن تُنسب إليك 40 ربعًا مؤهلاً للضمان الاجتماعي؟"
    },
    "type": "yesno"
   },
   {
    "id": "q2_2",
    "q": {
     "en": "Are you relying on your own, a spouse’s or a parent’s work record?",
     "ar": "هل تعتمد على سجل عملك الخاص، أو سجل عمل زوجك/زوجتك، أو سجل عمل أحد والديك؟"
    },
    "type": "text"
   },
   {
    "id": "q2_3",
    "q": {
     "en": "What evidence supports those credits?",
     "ar": "ما هي الأدلة التي تدعم هذه الأرصدة؟"
    },
    "type": "textarea"
   },
   {
    "id": "q2_4",
    "q": {
     "en": "Child’s birth date?",
     "ar": "تاريخ ميلاد الطفل؟"
    },
    "type": "date"
   },
   {
    "id": "q2_5",
    "q": {
     "en": "Which parent is a U.S. citizen?",
     "ar": "أي من الوالدين مواطن أمريكي؟"
    },
    "type": "text"
   },
   {
    "id": "q2_6",
    "q": {
     "en": "Will the child become a permanent resident and reside in the United States in that parent’s legal and physical custody before age 18?",
     "ar": "هل سيصبح الطفل مقيمًا دائمًا ويقيم في الولايات المتحدة تحت الحضانة القانونية والمادية لذلك الوالد قبل سن 18؟"
    },
    "type": "yesno"
   },
   {
    "id": "q2_7",
    "q": {
     "en": "Is adoption involved?",
     "ar": "هل هناك تبني؟"
    },
    "type": "yesno"
   },
   {
    "id": "q2_8",
    "q": {
     "en": "Are you applying under the qualifying widow/widower category?",
     "ar": "هل تتقدم بطلبك تحت فئة الأرمل/الأرملة المؤهلين؟"
    },
    "type": "yesno"
   },
   {
    "id": "q2_9",
    "q": {
     "en": "What petition or approval establishes that category?",
     "ar": "ما هو الالتماس أو الموافقة التي تؤسس هذه الفئة؟"
    },
    "type": "text"
   },
   {
    "id": "q2_10",
    "q": {
     "en": "Are you applying under a qualifying VAWA self-petition category?",
     "ar": "هل تتقدم بطلبك تحت فئة VAWA لالتماس ذاتي مؤهل؟"
    },
    "type": "yesno"
   },
   {
    "id": "q2_11",
    "q": {
     "en": "What petition/approval evidence establishes the classification?",
     "ar": "ما هو دليل الالتماس/الموافقة الذي يؤسس التصنيف؟"
    },
    "type": "text"
   },
   {
    "id": "q2_12",
    "q": {
     "en": "What is the exact category not requiring I-864 and supporting notices?",
     "ar": "ما هي الفئة الدقيقة التي لا تتطلب I-864 والإشعارات الداعمة؟"
    },
    "type": "text"
   },
   {
    "id": "q_applicant_name",
    "q": {
     "en": "Applicant’s full name",
     "ar": "الاسم الكامل للمقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "q_applicant_dob",
    "q": {
     "en": "Applicant’s birth date",
     "ar": "تاريخ ميلاد المقدم الطلب"
    },
    "type": "date"
   },
   {
    "id": "q_applicant_address",
    "q": {
     "en": "Applicant’s addresses",
     "ar": "عناوين المقدم الطلب"
    },
    "type": "textarea"
   },
   {
    "id": "q_applicant_anumber",
    "q": {
     "en": "Applicant’s A-number",
     "ar": "رقم A للمقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "q_applicant_casereceipt",
    "q": {
     "en": "Applicant’s case/receipt number",
     "ar": "رقم القضية/الاستلام للمقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "q_applicant_petitiondetails",
    "q": {
     "en": "Relevant petition details",
     "ar": "تفاصيل الالتماس ذات الصلة"
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "SSA earnings/coverage records",
    "ar": "سجلات أرباح/تغطية الضمان الاجتماعي (SSA)"
   },
   {
    "en": "Family member's relevant records (if relying on their credits)",
    "ar": "سجلات أفراد الأسرة ذات الصلة (إذا كان الاعتماد على أرصدتهم)"
   },
   {
    "en": "Marriage/birth evidence (if relying on family member credits)",
    "ar": "إثبات الزواج/الميلاد (إذا كان الاعتماد على أرصدة أفراد الأسرة)"
   },
   {
    "en": "Child’s birth certificate",
    "ar": "شهادة ميلاد الطفل"
   },
   {
    "en": "Parent’s U.S. citizenship evidence",
    "ar": "إثبات الجنسية الأمريكية للوالد"
   },
   {
    "en": "Relevant immigration/petition documents",
    "ar": "وثائق الهجرة/الالتماس ذات الصلة"
   },
   {
    "en": "Legal-custody records (where applicable)",
    "ar": "سجلات الحضانة القانونية (حيثما ينطبق ذلك)"
   },
   {
    "en": "Evidence of the required U.S. residence and physical custody",
    "ar": "إثبات الإقامة المطلوبة في الولايات المتحدة والحضانة المادية"
   },
   {
    "en": "Adoption decree and documents establishing that the adoption and citizenship requirements are satisfied",
    "ar": "مرسوم التبني والوثائق التي تثبت استيفاء متطلبات التبني والجنسية"
   },
   {
    "en": "Relevant I-360 approval or classification evidence",
    "ar": "موافقة I-360 ذات الصلة أو دليل التصنيف"
   },
   {
    "en": "Marriage and death certificates (where necessary to establish the exemption)",
    "ar": "شهادات الزواج والوفاة (عند الضرورة لإثبات الإعفاء)"
   },
   {
    "en": "Relevant VAWA petition/approval or classification evidence",
    "ar": "دليل التماس/موافقة أو تصنيف VAWA ذي الصلة"
   },
   {
    "en": "Additional sensitive evidence (only when required for VAWA)",
    "ar": "أدلة حساسة إضافية (مطلوبة فقط لـ VAWA)"
   },
   {
    "en": "Applicable agency instructions/RFE",
    "ar": "تعليمات الوكالة المعنية/طلب الأدلة الإضافية (RFE)"
   },
   {
    "en": "Exemption explanation (where needed)",
    "ar": "شرح الإعفاء (حيثما يلزم)"
   },
   {
    "en": "Required translations",
    "ar": "الترجمات المطلوبة"
   }
  ]
 },
 {
  "code": "I-865",
  "title": {
   "en": "I-865 Sponsor’s Notice of Change of Address",
   "ar": "I-865 إخطار الكفيل بتغيير العنوان"
  },
  "questions": [
   {
    "id": "q1_affidavit_submitted",
    "q": {
     "en": "Have you submitted an affidavit of support for an immigrant?",
     "ar": "هل قدمت إقرار دعم لمهاجر؟"
    },
    "type": "yesno"
   },
   {
    "id": "q2_sponsor_role",
    "q": {
     "en": "Were you the petitioner, joint sponsor or substitute sponsor?",
     "ar": "هل كنت مقدم الالتماس، أو الكفيل المشترك، أو الكفيل البديل؟"
    },
    "type": "text"
   },
   {
    "id": "q3_address_changed",
    "q": {
     "en": "Has your physical address or mailing address changed?",
     "ar": "هل تغير عنوانك الفعلي أو عنوانك البريدي؟"
    },
    "type": "yesno"
   },
   {
    "id": "q4_change_effective_date",
    "q": {
     "en": "What date did the change become effective?",
     "ar": "ما هو تاريخ سريان التغيير؟"
    },
    "type": "date"
   },
   {
    "id": "q5_sponsored_immigrants",
    "q": {
     "en": "Which immigrants did you sponsor? (Provide full legal name and A-number for each)",
     "ar": "من هم المهاجرون الذين كفلتهم؟ (يرجى تقديم الاسم القانوني الكامل ورقم A-number لكل منهم)"
    },
    "type": "textarea"
   },
   {
    "id": "q6_support_obligation_in_effect",
    "q": {
     "en": "Does your support obligation remain in effect?",
     "ar": "هل لا يزال التزامك بالدعم ساري المفعول؟"
    },
    "type": "yesno"
   },
   {
    "id": "q7_lpr_address_change",
    "q": {
     "en": "Are you a lawful permanent resident who also needs to report your own immigration address change?",
     "ar": "هل أنت مقيم دائم شرعي وتحتاج أيضًا إلى الإبلاغ عن تغيير عنوان إقامتك الخاص؟"
    },
    "type": "yesno"
   },
   {
    "id": "q8_pending_uscis_nvc_cases",
    "q": {
     "en": "Are any related USCIS or NVC cases still pending?",
     "ar": "هل هناك أي قضايا USCIS أو NVC ذات صلة لا تزال معلقة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q9_full_legal_name",
    "q": {
     "en": "Sponsor's full legal name",
     "ar": "الاسم القانوني الكامل للكفيل"
    },
    "type": "text"
   },
   {
    "id": "q10_date_of_birth",
    "q": {
     "en": "Sponsor's date of birth",
     "ar": "تاريخ ميلاد الكفيل"
    },
    "type": "date"
   },
   {
    "id": "q11_new_physical_address_street",
    "q": {
     "en": "New physical address: Street and apartment/unit number",
     "ar": "العنوان الفعلي الجديد: الشارع ورقم الشقة/الوحدة"
    },
    "type": "text"
   },
   {
    "id": "q12_new_physical_address_city",
    "q": {
     "en": "New physical address: City",
     "ar": "العنوان الفعلي الجديد: المدينة"
    },
    "type": "text"
   },
   {
    "id": "q13_new_physical_address_state_province",
    "q": {
     "en": "New physical address: State/province",
     "ar": "العنوان الفعلي الجديد: الولاية/المقاطعة"
    },
    "type": "text"
   },
   {
    "id": "q14_new_physical_address_zip_postal_code",
    "q": {
     "en": "New physical address: ZIP/postal code",
     "ar": "العنوان الفعلي الجديد: الرمز البريدي"
    },
    "type": "text"
   },
   {
    "id": "q15_new_physical_address_country",
    "q": {
     "en": "New physical address: Country",
     "ar": "العنوان الفعلي الجديد: الدولة"
    },
    "type": "text"
   },
   {
    "id": "q16_mailing_address_matches_physical",
    "q": {
     "en": "Does your new mailing address match your new physical address?",
     "ar": "هل يتطابق عنوانك البريدي الجديد مع عنوانك الفعلي الجديد؟"
    },
    "type": "yesno"
   },
   {
    "id": "q17_new_mailing_address",
    "q": {
     "en": "New mailing address (if different from physical address)",
     "ar": "العنوان البريدي الجديد (إذا كان مختلفًا عن العنوان الفعلي)"
    },
    "type": "textarea"
   },
   {
    "id": "q18_mailing_address_in_care_of",
    "q": {
     "en": "New mailing address: \"In Care Of\" name (if applicable)",
     "ar": "العنوان البريدي الجديد: اسم \"برعاية\" (إذا كان معمولاً به)"
    },
    "type": "text"
   },
   {
    "id": "q19_effective_date_of_address_change",
    "q": {
     "en": "Actual date the address changed",
     "ar": "التاريخ الفعلي لتغيير العنوان"
    },
    "type": "date"
   },
   {
    "id": "q20_immigrant_full_legal_name_a_number",
    "q": {
     "en": "For each sponsored immigrant: full legal name and A-number",
     "ar": "لكل مهاجر مكفول: الاسم القانوني الكامل ورقم A-number"
    },
    "type": "textarea"
   },
   {
    "id": "q21_telephone_numbers",
    "q": {
     "en": "Your telephone numbers",
     "ar": "أرقام هاتفك"
    },
    "type": "text"
   },
   {
    "id": "q22_email_address",
    "q": {
     "en": "Your email address",
     "ar": "عنوان بريدك الإلكتروني"
    },
    "type": "text"
   },
   {
    "id": "q23_previous_address",
    "q": {
     "en": "Your previous address (for internal tracking)",
     "ar": "عنوانك السابق (للتتبع الداخلي)"
    },
    "type": "textarea"
   },
   {
    "id": "q24_linked_affidavits_cases",
    "q": {
     "en": "Linked affidavit/cases (for internal tracking)",
     "ar": "إفادات/قضايا مرتبطة (للتتبع الداخلي)"
    },
    "type": "textarea"
   },
   {
    "id": "q25_reason_for_termination_claim",
    "q": {
     "en": "If claiming support obligation termination, what is the reason and do you have evidence?",
     "ar": "إذا كنت تدعي إنهاء التزام الدعم، فما هو السبب وهل لديك دليل؟"
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed and signed I-865—all pages",
    "ar": "I-865 مكتمل وموقع - جميع الصفحات"
   },
   {
    "en": "Additional information sheet (if more space is needed)",
    "ar": "ورقة معلومات إضافية (إذا كانت هناك حاجة لمساحة أكبر)"
   },
   {
    "en": "Guardian appointment/authority documents (if a legal guardian signs)",
    "ar": "وثائق تعيين/سلطة الوصي (إذا وقع الوصي القانوني)"
   },
   {
    "en": "Translations (if required supporting documents are in another language)",
    "ar": "الترجمات (إذا كانت الوثائق الداعمة المطلوبة بلغة أخرى)"
   },
   {
    "en": "Prior affidavit, immigration notices or A-number evidence (for internal verification)",
    "ar": "إقرار دعم سابق، إخطارات الهجرة، أو دليل رقم A-number (للتحقق الداخلي)"
   },
   {
    "en": "Mailing receipt and delivery confirmation (after filing as proof of submission)",
    "ar": "إيصال البريد وتأكيد التسليم (بعد التقديم كدليل على الإرسال)"
   }
  ]
 },
 {
  "code": "I-907",
  "title": {
   "en": "I-907 Request for Premium Processing Service",
   "ar": "طلب خدمة المعالجة المستعجلة I-907"
  },
  "questions": [
   {
    "id": "q1_underlying_form",
    "q": {
     "en": "Which underlying form needs premium processing? (e.g., I-129, I-140, I-765, I-539)",
     "ar": "ما هو النموذج الأساسي الذي يحتاج إلى معالجة مستعجلة؟ (مثل I-129، I-140، I-765، I-539)"
    },
    "type": "text"
   },
   {
    "id": "q2_classification",
    "q": {
     "en": "What is the exact classification/category for the underlying form?",
     "ar": "ما هو التصنيف/الفئة الدقيقة للنموذج الأساسي؟"
    },
    "type": "text"
   },
   {
    "id": "q3_filing_status",
    "q": {
     "en": "Is the underlying case being filed now or already pending?",
     "ar": "هل يتم تقديم الحالة الأساسية الآن أم هي معلقة بالفعل؟"
    },
    "type": "text"
   },
   {
    "id": "q4_requestor_role",
    "q": {
     "en": "Who is requesting the service (Applicant, Petitioner, or properly authorized representative)?",
     "ar": "من يطلب الخدمة (مقدم الطلب، الملتمس، أو ممثل مفوض حسب الأصول)؟"
    },
    "type": "text"
   },
   {
    "id": "q5_receipt_number",
    "q": {
     "en": "For a pending case, what is its receipt number?",
     "ar": "بالنسبة لحالة معلقة، ما هو رقم الإيصال الخاص بها؟"
    },
    "type": "text"
   },
   {
    "id": "q6_premium_already_requested",
    "q": {
     "en": "Has premium processing already been requested for this case?",
     "ar": "هل تم طلب المعالجة المستعجلة لهذه الحالة بالفعل؟"
    },
    "type": "yesno"
   },
   {
    "id": "q7_submission_method",
    "q": {
     "en": "Will the I-907 request be filed online or by paper mail?",
     "ar": "هل سيتم تقديم طلب I-907 عبر الإنترنت أم بالبريد الورقي؟"
    },
    "type": "text"
   },
   {
    "id": "q8_requestor_fullname",
    "q": {
     "en": "Requestor's full name",
     "ar": "الاسم الكامل للملتمس/مقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "q9_requestor_company",
    "q": {
     "en": "Requestor's company/organization (if applicable)",
     "ar": "شركة/منظمة الملتمس/مقدم الطلب (إذا كان ينطبق)"
    },
    "type": "text"
   },
   {
    "id": "q10_requestor_mailing_address",
    "q": {
     "en": "Requestor's mailing address",
     "ar": "عنوان المراسلات للملتمس/مقدم الطلب"
    },
    "type": "textarea"
   },
   {
    "id": "q11_requestor_contact_details",
    "q": {
     "en": "Requestor's contact details (phone, email)",
     "ar": "تفاصيل الاتصال للملتمس/مقدم الطلب (الهاتف، البريد الإلكتروني)"
    },
    "type": "text"
   },
   {
    "id": "q12_requestor_identifiers",
    "q": {
     "en": "Requestor's relevant identifiers (e.g., A-Number)",
     "ar": "المعرفات ذات الصلة للملتمس/مقدم الطلب (مثل رقم A)"
    },
    "type": "text"
   },
   {
    "id": "q13_underlying_form_number",
    "q": {
     "en": "Underlying case form number",
     "ar": "رقم نموذج الحالة الأساسية"
    },
    "type": "text"
   },
   {
    "id": "q14_underlying_filing_date",
    "q": {
     "en": "Underlying case filing date (if already filed)",
     "ar": "تاريخ تقديم الحالة الأساسية (إذا تم تقديمها بالفعل)"
    },
    "type": "date"
   },
   {
    "id": "q15_underlying_receipt_number",
    "q": {
     "en": "Underlying case receipt number (if already filed)",
     "ar": "رقم إيصال الحالة الأساسية (إذا تم تقديمها بالفعل)"
    },
    "type": "text"
   },
   {
    "id": "q16_petitioner_applicant_name",
    "q": {
     "en": "Petitioner/applicant name (exactly matching the related application/petition)",
     "ar": "اسم الملتمس/مقدم الطلب (مطابق تمامًا للالتماس/الطلب ذي الصلة)"
    },
    "type": "text"
   },
   {
    "id": "q17_petitioner_applicant_address",
    "q": {
     "en": "Petitioner/applicant address (exactly matching the related application/petition)",
     "ar": "عنوان الملتمس/مقدم الطلب (مطابق تمامًا للالتماس/الطلب ذي الصلة)"
    },
    "type": "textarea"
   },
   {
    "id": "q18_beneficiary_fullname",
    "q": {
     "en": "Beneficiary's full name (where applicable)",
     "ar": "الاسم الكامل للمستفيد (حيثما ينطبق)"
    },
    "type": "text"
   },
   {
    "id": "q19_beneficiary_identifying_details",
    "q": {
     "en": "Beneficiary's identifying details (where applicable)",
     "ar": "تفاصيل تعريف المستفيد (حيثما ينطبق)"
    },
    "type": "text"
   },
   {
    "id": "q20_organization_name",
    "q": {
     "en": "Organization/company name (where applicable)",
     "ar": "اسم المنظمة/الشركة (حيثما ينطبق)"
    },
    "type": "text"
   },
   {
    "id": "q21_organization_ein",
    "q": {
     "en": "Organization/company EIN (where applicable)",
     "ar": "رقم تعريف صاحب العمل (EIN) للمنظمة/الشركة (حيثما ينطبق)"
    },
    "type": "text"
   },
   {
    "id": "q22_current_case_location",
    "q": {
     "en": "Current location of the underlying case (e.g., service center, field office)",
     "ar": "الموقع الحالي للحالة الأساسية (مثل مركز الخدمة، مكتب ميداني)"
    },
    "type": "text"
   },
   {
    "id": "q23_transfer_notices",
    "q": {
     "en": "Details of any transfer notices for the underlying case",
     "ar": "تفاصيل أي إشعارات تحويل للحالة الأساسية"
    },
    "type": "textarea"
   },
   {
    "id": "q24_outstanding_evidence_requests",
    "q": {
     "en": "Details of any outstanding requests for evidence (RFE) for the underlying case",
     "ar": "تفاصيل أي طلبات أدلة (RFE) معلقة للحالة الأساسية"
    },
    "type": "textarea"
   },
   {
    "id": "q25_requestor_certification",
    "q": {
     "en": "Requestor's certification completed?",
     "ar": "هل تم إكمال شهادة الملتمس/مقدم الطلب؟"
    },
    "type": "yesno"
   },
   {
    "id": "q26_requestor_signature_date",
    "q": {
     "en": "Requestor's signature and date provided?",
     "ar": "هل تم تقديم توقيع وتاريخ الملتمس/مقدم الطلب؟"
    },
    "type": "yesno"
   },
   {
    "id": "q27_interpreter_details",
    "q": {
     "en": "Interpreter's full name and address (if applicable)",
     "ar": "الاسم الكامل وعنوان المترجم (إذا كان ينطبق)"
    },
    "type": "textarea"
   },
   {
    "id": "q28_preparer_details",
    "q": {
     "en": "Preparer's full name and address (if applicable)",
     "ar": "الاسم الكامل وعنوان مُعد الطلب (إذا كان ينطبق)"
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed and signed Form I-907 (for paper requests)",
    "ar": "النموذج I-907 مكتملًا وموقعًا (لطلبات الورقية)"
   },
   {
    "en": "Correct premium processing payment",
    "ar": "الدفع الصحيح لرسوم المعالجة المستعجلة"
   },
   {
    "en": "Underlying case receipt notice (for pending case upgrades)",
    "ar": "إيصال استلام الحالة الأساسية (لترقية الحالات المعلقة)"
   },
   {
    "en": "Transfer notice (if the pending case was transferred)",
    "ar": "إشعار التحويل (إذا تم تحويل الحالة المعلقة)"
   },
   {
    "en": "Underlying application/petition and its evidence (when filing concurrently)",
    "ar": "الطلب/الالتماس الأساسي وأدلته (عند التقديم المتزامن)"
   },
   {
    "en": "Form G-28, Notice of Entry of Appearance as Attorney or Accredited Representative (where required)",
    "ar": "النموذج G-28، إشعار دخول المحامي أو الممثل المعتمد (حيثما يلزم)"
   },
   {
    "en": "Additional information or translations (only when applicable)",
    "ar": "معلومات إضافية أو ترجمات (فقط عندما ينطبق)"
   }
  ]
 },
 {
  "code": "I-912",
  "title": {
   "en": "Request for Fee Waiver",
   "ar": "طلب إعفاء من الرسوم"
  },
  "questions": [
   {
    "id": "form_and_category",
    "q": {
     "en": "Which USCIS form and eligibility category are you filing?",
     "ar": "ما هو نموذج USCIS وفئة الأهلية التي تقدمها؟"
    },
    "type": "text"
   },
   {
    "id": "fee_eligible_for_waiver",
    "q": {
     "en": "Is that particular fee eligible for waiver?",
     "ar": "هل هذه الرسوم معينة مؤهلة للإعفاء؟"
    },
    "type": "yesno"
   },
   {
    "id": "automatic_fee_exemption",
    "q": {
     "en": "Does an automatic fee exemption already apply?",
     "ar": "هل ينطبق إعفاء تلقائي من الرسوم بالفعل؟"
    },
    "type": "yesno"
   },
   {
    "id": "mandatory_statutory_fee",
    "q": {
     "en": "Does the application include a mandatory statutory fee that cannot be waived?",
     "ar": "هل يتضمن الطلب رسومًا قانونية إلزامية لا يمكن التنازل عنها؟"
    },
    "type": "yesno"
   },
   {
    "id": "waiver_basis",
    "q": {
     "en": "Which waiver basis are you claiming?",
     "ar": "ما هو أساس الإعفاء الذي تطالب به؟"
    },
    "type": "text"
   },
   {
    "id": "means_tested_benefit",
    "q": {
     "en": "Do you or a qualifying family member currently receive a qualifying means-tested benefit?",
     "ar": "هل تتلقى أنت أو أحد أفراد الأسرة المؤهلين حاليًا مزايا مؤهلة تعتمد على الدخل؟"
    },
    "type": "yesno"
   },
   {
    "id": "low_household_income",
    "q": {
     "en": "Is household income at or below 150% of the applicable Federal Poverty Guidelines?",
     "ar": "هل دخل الأسرة عند أو أقل من 150% من إرشادات الفقر الفيدرالية المعمول بها؟"
    },
    "type": "yesno"
   },
   {
    "id": "extreme_financial_hardship",
    "q": {
     "en": "Do extraordinary expenses or circumstances prevent you from paying?",
     "ar": "هل تمنعك النفقات أو الظروف الاستثنائية من الدفع؟"
    },
    "type": "yesno"
   },
   {
    "id": "applicant_legal_name",
    "q": {
     "en": "Applicant's legal name",
     "ar": "الاسم القانوني لمقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "applicant_birth_date",
    "q": {
     "en": "Applicant's birth date",
     "ar": "تاريخ ميلاد مقدم الطلب"
    },
    "type": "date"
   },
   {
    "id": "applicant_a_number",
    "q": {
     "en": "Applicant's A-number",
     "ar": "رقم A لمقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "applicant_relevant_account_number",
    "q": {
     "en": "Applicant's relevant account number",
     "ar": "رقم الحساب ذي الصلة لمقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "applicant_marital_status",
    "q": {
     "en": "Applicant's marital status",
     "ar": "الحالة الاجتماعية لمقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "applicant_contact_information",
    "q": {
     "en": "Applicant's contact information",
     "ar": "معلومات الاتصال بمقدم الطلب"
    },
    "type": "textarea"
   },
   {
    "id": "persons_requesting_waiver",
    "q": {
     "en": "For each person requesting a waiver: identity, relationship to you, and underlying USCIS form they are filing",
     "ar": "لكل شخص يطلب إعفاء: هويته، علاقته بك، ونموذج USCIS الأساسي الذي يقدمه"
    },
    "type": "textarea"
   },
   {
    "id": "requested_fees_form_number",
    "q": {
     "en": "Form number for which a fee waiver is requested",
     "ar": "رقم النموذج الذي يُطلب له إعفاء من الرسوم"
    },
    "type": "text"
   },
   {
    "id": "requested_fees_category",
    "q": {
     "en": "Category of the form for which a fee waiver is requested",
     "ar": "فئة النموذج الذي يُطلب له إعفاء من الرسوم"
    },
    "type": "text"
   },
   {
    "id": "requested_fees_specific_fee",
    "q": {
     "en": "Specific fee amount being requested for waiver",
     "ar": "مبلغ الرسوم المحدد الذي يُطلب إعفاءه"
    },
    "type": "text"
   },
   {
    "id": "benefit_name",
    "q": {
     "en": "Name of the means-tested benefit received",
     "ar": "اسم الميزة التي تعتمد على الدخل المستلمة"
    },
    "type": "text"
   },
   {
    "id": "benefit_recipient",
    "q": {
     "en": "Recipient of the benefit",
     "ar": "مستلم الميزة"
    },
    "type": "text"
   },
   {
    "id": "benefit_granting_agency",
    "q": {
     "en": "Agency granting the benefit",
     "ar": "الوكالة المانحة للميزة"
    },
    "type": "text"
   },
   {
    "id": "benefit_current_eligibility_dates",
    "q": {
     "en": "Current eligibility dates for the benefit",
     "ar": "تواريخ الأهلية الحالية للميزة"
    },
    "type": "text"
   },
   {
    "id": "benefit_relationship_to_recipient",
    "q": {
     "en": "Your relationship to the benefit recipient",
     "ar": "علاقتك بمستلم الميزة"
    },
    "type": "text"
   },
   {
    "id": "household_members",
    "q": {
     "en": "Names of all household members",
     "ar": "أسماء جميع أفراد الأسرة"
    },
    "type": "textarea"
   },
   {
    "id": "household_members_relationships",
    "q": {
     "en": "Relationships of all household members to the applicant",
     "ar": "علاقات جميع أفراد الأسرة بمقدم الطلب"
    },
    "type": "textarea"
   },
   {
    "id": "household_members_ages",
    "q": {
     "en": "Ages of all household members",
     "ar": "أعمار جميع أفراد الأسرة"
    },
    "type": "textarea"
   },
   {
    "id": "household_members_dependency_student_status",
    "q": {
     "en": "Dependency/student status of all household members",
     "ar": "حالة التبعية/الطالب لجميع أفراد الأسرة"
    },
    "type": "textarea"
   },
   {
    "id": "household_head",
    "q": {
     "en": "Name of head of household",
     "ar": "اسم رب الأسرة"
    },
    "type": "text"
   },
   {
    "id": "employment_details",
    "q": {
     "en": "Employment details for all working household members",
     "ar": "تفاصيل التوظيف لجميع أفراد الأسرة العاملين"
    },
    "type": "textarea"
   },
   {
    "id": "annual_household_income",
    "q": {
     "en": "Total annual household income",
     "ar": "إجمالي الدخل السنوي للأسرة"
    },
    "type": "text"
   },
   {
    "id": "other_income_support",
    "q": {
     "en": "Details of other household income or support",
     "ar": "تفاصيل مصادر الدخل أو الدعم الأخرى للأسرة"
    },
    "type": "textarea"
   },
   {
    "id": "tax_filing_status",
    "q": {
     "en": "Tax filing status and details",
     "ar": "حالة و تفاصيل تقديم الإقرارات الضريبية"
    },
    "type": "textarea"
   },
   {
    "id": "recent_income_changes",
    "q": {
     "en": "Details of any recent income changes",
     "ar": "تفاصيل أي تغييرات حديثة في الدخل"
    },
    "type": "textarea"
   },
   {
    "id": "hardship_what_happened",
    "q": {
     "en": "What event or circumstances led to extreme financial hardship?",
     "ar": "ما هو الحدث أو الظروف التي أدت إلى صعوبات مالية قصوى؟"
    },
    "type": "textarea"
   },
   {
    "id": "hardship_when",
    "q": {
     "en": "When did the extreme financial hardship occur or begin?",
     "ar": "متى حدثت أو بدأت الصعوبات المالية القصوى؟"
    },
    "type": "text"
   },
   {
    "id": "hardship_effect_on_finances",
    "q": {
     "en": "How did the extreme financial hardship affect your finances?",
     "ar": "كيف أثرت الصعوبات المالية القصوى على أموالك؟"
    },
    "type": "textarea"
   },
   {
    "id": "hardship_available_assets",
    "q": {
     "en": "Details of any available assets",
     "ar": "تفاصيل أي أصول متاحة"
    },
    "type": "textarea"
   },
   {
    "id": "hardship_debts",
    "q": {
     "en": "Details of all debts owed",
     "ar": "تفاصيل جميع الديون المستحقة"
    },
    "type": "textarea"
   },
   {
    "id": "hardship_necessary_expenses",
    "q": {
     "en": "Details of necessary monthly expenses",
     "ar": "تفاصيل النفقات الشهرية الضرورية"
    },
    "type": "textarea"
   },
   {
    "id": "applicant_signature",
    "q": {
     "en": "Applicant's signature",
     "ar": "توقيع مقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "parent_guardian_signature",
    "q": {
     "en": "Parent/Guardian signature (if applicable)",
     "ar": "توقيع ولي الأمر/الوصي (إذا كان ينطبق)"
    },
    "type": "text"
   },
   {
    "id": "interpreter_details",
    "q": {
     "en": "Interpreter's full name and contact information (if applicable)",
     "ar": "الاسم الكامل للمترجم ومعلومات الاتصال (إذا كان ينطبق)"
    },
    "type": "textarea"
   },
   {
    "id": "preparer_details",
    "q": {
     "en": "Preparer's full name and contact information (if applicable)",
     "ar": "الاسم الكامل للمُعد ومعلومات الاتصال (إذا كان ينطبق)"
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Signed I-912 form",
    "ar": "نموذج I-912 موقع"
   },
   {
    "en": "Completed underlying application",
    "ar": "الطلب الأساسي المكتمل"
   },
   {
    "en": "Required evidence for the underlying application",
    "ar": "الأدلة المطلوبة للطلب الأساسي"
   },
   {
    "en": "Current agency letter or notice identifying recipient, agency, benefit, and current receipt for means-tested benefit",
    "ar": "رسالة أو إشعار وكالة حالي يحدد المستفيد، الوكالة، الميزة، والاستلام الحالي للميزة التي تعتمد على الدخل"
   },
   {
    "en": "Evidence of relationship and shared residence for family member's benefit (if required)",
    "ar": "دليل على العلاقة والإقامة المشتركة لميزة أحد أفراد الأسرة (إذا كان مطلوبًا)"
   },
   {
    "en": "Recent federal tax return or transcript",
    "ar": "الإقرار الضريبي الفيدرالي الأخير أو كشف الضرائب"
   },
   {
    "en": "Wage statements or employer evidence",
    "ar": "بيانات الأجور أو دليل من صاحب العمل"
   },
   {
    "en": "Records of other household income or support",
    "ar": "سجلات مصادر الدخل أو الدعم الأخرى للأسرة"
   },
   {
    "en": "Explanation of changed income or no tax return",
    "ar": "شرح لتغير الدخل أو عدم وجود إقرار ضريبي"
   },
   {
    "en": "Current income/nonfiling evidence",
    "ar": "دليل الدخل الحالي/عدم التقديم"
   },
   {
    "en": "Detailed explanation of extreme hardship",
    "ar": "شرح مفصل للصعوبات القصوى"
   },
   {
    "en": "Bank statements",
    "ar": "كشوف الحسابات المصرفية"
   },
   {
    "en": "Income or unemployment records",
    "ar": "سجلات الدخل أو البطالة"
   },
   {
    "en": "Medical bills",
    "ar": "الفواتير الطبية"
   },
   {
    "en": "Housing or utility expenses",
    "ar": "نفقات السكن أو المرافق"
   },
   {
    "en": "Debt records",
    "ar": "سجلات الديون"
   },
   {
    "en": "Emergency records",
    "ar": "سجلات الطوارئ"
   },
   {
    "en": "Explanation of why records are unavailable",
    "ar": "شرح سبب عدم توفر السجلات"
   },
   {
    "en": "Available corroborating statements",
    "ar": "البيانات الداعمة المتاحة"
   },
   {
    "en": "Complete certified English translations for foreign-language documents",
    "ar": "ترجمات إنجليزية معتمدة كاملة للوثائق باللغة الأجنبية"
   },
   {
    "en": "Separate required payment for nonwaivable fees (if applicable)",
    "ar": "دفعة منفصلة مطلوبة للرسوم غير القابلة للإعفاء (إذا كان ينطبق)"
   }
  ]
 },
 {
  "code": "N-336",
  "title": {
   "en": "N-336 Hearing on a Decision in Naturalization Proceedings",
   "ar": "N-336 جلسة استماع بشأن قرار في إجراءات التجنيس"
  },
  "questions": [
   {
    "id": "n400_denied",
    "q": {
     "en": "Was Form N-400 denied?",
     "ar": "هل تم رفض نموذج N-400؟"
    },
    "type": "yesno"
   },
   {
    "id": "denial_decision_date",
    "q": {
     "en": "What is the decision date of the denial?",
     "ar": "ما هو تاريخ قرار الرفض؟"
    },
    "type": "date"
   },
   {
    "id": "denial_received_date",
    "q": {
     "en": "What is the date the denial decision was received?",
     "ar": "ما هو تاريخ استلام قرار الرفض؟"
    },
    "type": "date"
   },
   {
    "id": "denial_delivery_method",
    "q": {
     "en": "What was the delivery method for the denial decision?",
     "ar": "ما هي طريقة تسليم قرار الرفض؟"
    },
    "type": "text"
   },
   {
    "id": "deadline_instructions",
    "q": {
     "en": "What deadline and filing instructions appear in the denial notice?",
     "ar": "ما هو الموعد النهائي وتعليمات التقديم التي تظهر في إشعار الرفض؟"
    },
    "type": "textarea"
   },
   {
    "id": "denying_uscis_office",
    "q": {
     "en": "Which USCIS office denied the application?",
     "ar": "أي مكتب USCIS رفض الطلب؟"
    },
    "type": "text"
   },
   {
    "id": "reasons_for_denial",
    "q": {
     "en": "What reasons did USCIS give for the denial?",
     "ar": "ما هي الأسباب التي قدمتها USCIS للرفض؟"
    },
    "type": "textarea"
   },
   {
    "id": "hearing_request_filed_already",
    "q": {
     "en": "Has a hearing request already been filed?",
     "ar": "هل تم تقديم طلب استماع بالفعل؟"
    },
    "type": "yesno"
   },
   {
    "id": "attorney_representation",
    "q": {
     "en": "Will a qualified U.S. attorney or accredited representative handle the case?",
     "ar": "هل سيتولى محامٍ أمريكي مؤهل أو ممثل معتمد القضية؟"
    },
    "type": "yesno"
   },
   {
    "id": "applicant_full_legal_name",
    "q": {
     "en": "Applicant's full legal name",
     "ar": "الاسم القانوني الكامل لمقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "applicant_other_names",
    "q": {
     "en": "Other names used by the applicant",
     "ar": "أسماء أخرى استخدمها مقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "applicant_birth_date",
    "q": {
     "en": "Applicant's birth date",
     "ar": "تاريخ ميلاد مقدم الطلب"
    },
    "type": "date"
   },
   {
    "id": "applicant_a_number",
    "q": {
     "en": "Applicant's A-number",
     "ar": "الرقم A لمقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "applicant_uscis_account_number",
    "q": {
     "en": "Applicant's USCIS account number (where applicable)",
     "ar": "رقم حساب USCIS لمقدم الطلب (حيثما ينطبق ذلك)"
    },
    "type": "text"
   },
   {
    "id": "applicant_physical_address",
    "q": {
     "en": "Applicant's physical address",
     "ar": "العنوان الفعلي لمقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "applicant_mailing_address",
    "q": {
     "en": "Applicant's mailing address (if different from physical)",
     "ar": "عنوان البريد لمقدم الطلب (إذا كان مختلفًا عن العنوان الفعلي)"
    },
    "type": "text"
   },
   {
    "id": "applicant_telephone",
    "q": {
     "en": "Applicant's telephone number",
     "ar": "رقم هاتف مقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "applicant_email",
    "q": {
     "en": "Applicant's email address",
     "ar": "عنوان البريد الإلكتروني لمقدم الطلب"
    },
    "type": "text"
   },
   {
    "id": "n400_receipt_number",
    "q": {
     "en": "N-400 receipt number",
     "ar": "رقم إيصال N-400"
    },
    "type": "text"
   },
   {
    "id": "n400_filing_date",
    "q": {
     "en": "N-400 filing date",
     "ar": "تاريخ تقديم N-400"
    },
    "type": "date"
   },
   {
    "id": "n400_interview_dates",
    "q": {
     "en": "N-400 interview dates",
     "ar": "تواريخ مقابلة N-400"
    },
    "type": "textarea"
   },
   {
    "id": "n400_deciding_office",
    "q": {
     "en": "N-400 deciding office",
     "ar": "المكتب الذي اتخذ قرار N-400"
    },
    "type": "text"
   },
   {
    "id": "denial_details_decision_date",
    "q": {
     "en": "Denial decision date",
     "ar": "تاريخ قرار الرفض"
    },
    "type": "date"
   },
   {
    "id": "denial_details_delivery_receipt",
    "q": {
     "en": "Denial delivery/receipt details",
     "ar": "تفاصيل التسليم/الاستلام للرفض"
    },
    "type": "textarea"
   },
   {
    "id": "denial_details_grounds",
    "q": {
     "en": "Every stated denial ground",
     "ar": "كل أسباب الرفض المذكورة"
    },
    "type": "textarea"
   },
   {
    "id": "reason_for_hearing",
    "q": {
     "en": "Applicant's explanation of why they disagree with the denial, including factual corrections and supporting documents",
     "ar": "شرح مقدم الطلب لسبب عدم موافقته على الرفض، بما في ذلك التصحيحات الوقائعية والوثائق الداعمة"
    },
    "type": "textarea"
   },
   {
    "id": "relevant_history_denial",
    "q": {
     "en": "Facts connected to the denial, such as travel, residence, marriage, taxes, criminal matters or testing",
     "ar": "حقائق مرتبطة بالرفض، مثل السفر، الإقامة، الزواج، الضرائب، المسائل الجنائية أو الاختبارات"
    },
    "type": "textarea"
   },
   {
    "id": "new_evidence_available",
    "q": {
     "en": "What new evidence is available now?",
     "ar": "ما هي الأدلة الجديدة المتوفرة الآن؟"
    },
    "type": "textarea"
   },
   {
    "id": "new_evidence_previously_submitted",
    "q": {
     "en": "Was this new evidence previously submitted?",
     "ar": "هل تم تقديم هذه الأدلة الجديدة مسبقًا؟"
    },
    "type": "yesno"
   },
   {
    "id": "accommodations_disability",
    "q": {
     "en": "Do you require disability-related accommodation?",
     "ar": "هل تحتاج إلى تسهيلات متعلقة بالإعاقة؟"
    },
    "type": "yesno"
   },
   {
    "id": "accommodations_interpreter",
    "q": {
     "en": "Do you require interpreter services?",
     "ar": "هل تحتاج إلى خدمات مترجم فوري؟"
    },
    "type": "yesno"
   },
   {
    "id": "completion_applicant_signature_date",
    "q": {
     "en": "Applicant signature and date of completion",
     "ar": "توقيع مقدم الطلب وتاريخ الإكمال"
    },
    "type": "text"
   },
   {
    "id": "completion_interpreter_details",
    "q": {
     "en": "Interpreter details (if applicable)",
     "ar": "تفاصيل المترجم (إن وجدت)"
    },
    "type": "textarea"
   },
   {
    "id": "completion_preparer_details",
    "q": {
     "en": "Preparer details (if applicable)",
     "ar": "تفاصيل مُعد الطلب (إن وجدت)"
    },
    "type": "textarea"
   },
   {
    "id": "representation_details",
    "q": {
     "en": "Qualified representative’s details (if represented)",
     "ar": "تفاصيل الممثل المؤهل (إذا كان ممثلاً)"
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Complete N-400 denial decision",
    "ar": "قرار رفض N-400 الكامل"
   },
   {
    "en": "Completed and signed N-336 (for paper filing)",
    "ar": "نموذج N-336 مكتمل وموقع (للتقديم الورقي)"
   },
   {
    "en": "Fee payment, qualifying exemption, or I-912 package",
    "ar": "رسوم الدفع، أو إعفاء مؤهل، أو حزمة I-912"
   },
   {
    "en": "Statement explaining the hearing request (explaining disputed findings and relevant facts)",
    "ar": "بيان يوضح طلب الاستماع (يشرح النتائج المتنازع عليها والحقائق ذات الصلة)"
   },
   {
    "en": "Supporting evidence addressing the denial (e.g., passports, travel records, leases, employment and tax records for residence/physical presence; marriage records, spouse’s citizenship evidence, marital-union evidence for marriage-based eligibility; tax transcripts, payment agreements, payment history, support records for taxes/support obligations; certified court dispositions, sentencing and completion records for criminal history; testing notices, relevant medical records, N-648 for English/civics or disability exception; previously filed documents and evidence explaining/correcting discrepancy for alleged inconsistency)",
    "ar": "أدلة داعمة تتناول الرفض (على سبيل المثال، جوازات السفر، سجلات السفر، عقود الإيجار، سجلات التوظيف والضرائب للإقامة/الوجود الفعلي؛ سجلات الزواج، دليل جنسية الزوج/الزوجة، دليل الوحدة الزوجية لأهلية الزواج؛ كشوف الضرائب، اتفاقيات الدفع، تاريخ الدفع، سجلات الدعم لالتزامات الضرائب/الدعم؛ قرارات المحكمة المعتمدة، سجلات الحكم والإكمال للتاريخ الجنائي؛ إشعارات الاختبار، السجلات الطبية ذات الصلة، N-648 لاستثناء اللغة الإنجليزية/التربية المدنية أو الإعاقة؛ الوثائق المقدمة مسبقًا والأدلة التي تشرح/تصحيح التناقض للتناقض المزعوم)"
   },
   {
    "en": "Legal brief",
    "ar": "مذكرة قانونية"
   },
   {
    "en": "G-28, Notice of Entry of Appearance as Attorney or Accredited Representative",
    "ar": "G-28، إشعار الدخول كمحامٍ أو ممثل معتمد"
   },
   {
    "en": "Certified English translations for foreign-language supporting documents",
    "ar": "ترجمات إنجليزية معتمدة للوثائق الداعمة باللغات الأجنبية"
   },
   {
    "en": "G-1145, E-Notification of Application/Petition Acceptance",
    "ar": "G-1145، إشعار إلكتروني بقبول الطلب/الالتماس"
   }
  ]
 },
 {
  "code": "N-400",
  "title": {
   "en": "Application for Naturalization",
   "ar": "طلب التجنس"
  },
  "questions": [
   {
    "id": "q_n400_birth_citizen",
    "q": {
     "en": "Are you already a U.S. citizen through birth, a parent, or automatic acquisition?",
     "ar": "هل أنت بالفعل مواطن أمريكي عن طريق الولادة، أو أحد الوالدين، أو الاكتساب التلقائي؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_n400_age_18",
    "q": {
     "en": "Are you at least 18 years old?",
     "ar": "هل عمرك 18 عامًا على الأقل؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_n400_lpr_date",
    "q": {
     "en": "When did you become a lawful permanent resident?",
     "ar": "متى أصبحت مقيمًا دائمًا بشكل قانوني؟"
    },
    "type": "date"
   },
   {
    "id": "q_n400_basis",
    "q": {
     "en": "Which basis applies to your naturalization application: five-year permanent resident, three-year qualifying spouse of a U.S. citizen, military service, or another special provision?",
     "ar": "أي أساس ينطبق على طلب التجنس الخاص بك: مقيم دائم لمدة خمس سنوات، أو زوج مواطن أمريكي مؤهل لمدة ثلاث سنوات، أو خدمة عسكرية، أو أي حكم خاص آخر؟"
    },
    "type": "text"
   },
   {
    "id": "q_n400_residence_history",
    "q": {
     "en": "Where have you lived, and how much time have you spent outside the United States?",
     "ar": "أين عشت، وكم من الوقت قضيته خارج الولايات المتحدة؟"
    },
    "type": "textarea"
   },
   {
    "id": "q_n400_issues",
    "q": {
     "en": "Have you had long absences, criminal matters, immigration problems, unpaid taxes, or support obligations?",
     "ar": "هل كان لديك غيابات طويلة، أو مسائل جنائية، أو مشاكل هجرة، أو ضرائب غير مدفوعة، أو التزامات إعالة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_n400_accommodations",
    "q": {
     "en": "Do you need an English-language exception, disability exception, or interview accommodation?",
     "ar": "هل تحتاج إلى استثناء للغة الإنجليزية، أو استثناء للإعاقة، أو ترتيبات مقابلة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_n400_identity_legal_name",
    "q": {
     "en": "What is your legal name?",
     "ar": "ما هو اسمك القانوني؟"
    },
    "type": "text"
   },
   {
    "id": "q_n400_identity_other_names",
    "q": {
     "en": "Have you used any other names?",
     "ar": "هل استخدمت أي أسماء أخرى؟"
    },
    "type": "text"
   },
   {
    "id": "q_n400_identity_name_change_request",
    "q": {
     "en": "Do you request a name change?",
     "ar": "هل تطلب تغيير الاسم؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_n400_identity_birth_details",
    "q": {
     "en": "What are your birth details (date, city, country)?",
     "ar": "ما هي تفاصيل ميلادك (التاريخ، المدينة، الدولة)؟"
    },
    "type": "text"
   },
   {
    "id": "q_n400_identity_citizenship",
    "q": {
     "en": "What is your country of citizenship?",
     "ar": "ما هي جنسيتك؟"
    },
    "type": "text"
   },
   {
    "id": "q_n400_identity_a_number",
    "q": {
     "en": "What is your A-number?",
     "ar": "ما هو رقم A-number الخاص بك؟"
    },
    "type": "text"
   },
   {
    "id": "q_n400_identity_ssn",
    "q": {
     "en": "What is your Social Security number?",
     "ar": "ما هو رقم الضمان الاجتماعي الخاص بك؟"
    },
    "type": "text"
   },
   {
    "id": "q_n400_identity_uscis_account",
    "q": {
     "en": "What is your USCIS account number?",
     "ar": "ما هو رقم حسابك لدى USCIS؟"
    },
    "type": "text"
   },
   {
    "id": "q_n400_residence_since_date",
    "q": {
     "en": "What is your 'Resident Since' date?",
     "ar": "ما هو تاريخ 'المقيم منذ' الخاص بك؟"
    },
    "type": "date"
   },
   {
    "id": "q_n400_residence_admission_category",
    "q": {
     "en": "What was your admission or adjustment category?",
     "ar": "ما كانت فئة دخولك أو تعديل وضعك؟"
    },
    "type": "text"
   },
   {
    "id": "q_n400_residence_pending_i751",
    "q": {
     "en": "Do you have a pending I-751?",
     "ar": "هل لديك نموذج I-751 معلق؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_n400_addresses_history",
    "q": {
     "en": "Provide your complete address history for the period required by your filing basis.",
     "ar": "قدم تاريخ عنوانك الكامل للفترة المطلوبة حسب أساس تقديمك."
    },
    "type": "textarea"
   },
   {
    "id": "q_n400_employment_history",
    "q": {
     "en": "Provide your employment history, including employers, schools, unemployment, and retirement periods without unexplained gaps.",
     "ar": "قدم تاريخ عملك، بما في ذلك أصحاب العمل، والمدارس، وفترات البطالة والتقاعد دون فجوات غير مبررة."
    },
    "type": "textarea"
   },
   {
    "id": "q_n400_travel_history",
    "q": {
     "en": "Provide your travel history, including departure/return dates, destinations, and total days abroad for every relevant trip.",
     "ar": "قدم تاريخ سفرك، بما في ذلك تواريخ المغادرة/العودة، والوجهات، وإجمالي الأيام التي قضيتها خارج البلاد لكل رحلة ذات صلة."
    },
    "type": "textarea"
   },
   {
    "id": "q_n400_marriage_current",
    "q": {
     "en": "What is your current marital status and marriage details?",
     "ar": "ما هي حالتك الزوجية الحالية وتفاصيل الزواج؟"
    },
    "type": "text"
   },
   {
    "id": "q_n400_marriage_prior",
    "q": {
     "en": "Provide details of any prior marriages.",
     "ar": "قدم تفاصيل أي زيجات سابقة."
    },
    "type": "textarea"
   },
   {
    "id": "q_n400_marriage_spouse_citizenship",
    "q": {
     "en": "What is your spouse's citizenship (if applicable)?",
     "ar": "ما هي جنسية زوجك (إذا كان ذلك ينطبق)؟"
    },
    "type": "text"
   },
   {
    "id": "q_n400_marriage_spouse_history",
    "q": {
     "en": "Provide your spouse's marriage history (if required).",
     "ar": "قدم تاريخ زواج زوجك (إذا كان مطلوبًا)."
    },
    "type": "textarea"
   },
   {
    "id": "q_n400_children_info",
    "q": {
     "en": "Provide identifying information, residence, and financial support information for your children.",
     "ar": "قدم معلومات تعريفية، ومعلومات الإقامة، ومعلومات الدعم المالي لأطفالك."
    },
    "type": "textarea"
   },
   {
    "id": "q_n400_conduct_history",
    "q": {
     "en": "Answer every applicable current-form question concerning arrests, offenses, taxes, voting, citizenship claims, immigration history, organizations, and military service.",
     "ar": "أجب على كل سؤال مطبق في النموذج الحالي المتعلق بالاعتقالات، والجرائم، والضرائب، والتصويت، ومطالبات الجنسية، وتاريخ الهجرة، والمنظمات، والخدمة العسكرية."
    },
    "type": "textarea"
   },
   {
    "id": "q_n400_testing_age",
    "q": {
     "en": "What is your age (for testing exemptions)?",
     "ar": "ما هو عمرك (لاستثناءات الاختبار)؟"
    },
    "type": "text"
   },
   {
    "id": "q_n400_testing_lpr_years",
    "q": {
     "en": "How many years have you been a permanent resident (for testing exemptions)?",
     "ar": "كم سنة كنت مقيمًا دائمًا (لاستثناءات الاختبار)؟"
    },
    "type": "text"
   },
   {
    "id": "q_n400_testing_english_exception",
    "q": {
     "en": "Do you qualify for an English exception?",
     "ar": "هل أنت مؤهل لاستثناء اللغة الإنجليزية؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_n400_testing_n648",
    "q": {
     "en": "Do you have an N-648 Medical Certification for Disability Accommodations?",
     "ar": "هل لديك شهادة طبية N-648 لترتيبات الإعاقة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_n400_testing_accommodation_needs",
    "q": {
     "en": "Do you have any other accommodation needs for the interview/tests?",
     "ar": "هل لديك أي احتياجات إقامة أخرى للمقابلة/الاختبارات؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_n400_oath_answers",
    "q": {
     "en": "Are you willing to take the Oath of Allegiance?",
     "ar": "هل أنت مستعد لأداء قسم الولاء؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_n400_certification",
    "q": {
     "en": "Do you certify that the information provided is true and correct?",
     "ar": "هل تشهد بأن المعلومات المقدمة صحيحة ودقيقة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_n400_interpreter_info",
    "q": {
     "en": "If an interpreter is used, provide their information.",
     "ar": "إذا تم استخدام مترجم، قدم معلوماته."
    },
    "type": "text"
   },
   {
    "id": "q_n400_preparer_info",
    "q": {
     "en": "If a preparer is used, provide their information.",
     "ar": "إذا تم استخدام مُعد، قدم معلوماته."
    },
    "type": "text"
   }
  ],
  "docs": [
   {
    "en": "Signed N-400 application or online certification",
    "ar": "نموذج N-400 موقع أو شهادة عبر الإنترنت"
   },
   {
    "en": "Required payment or evidence for fee exemption/waiver/reduced fee",
    "ar": "المبلغ المطلوب أو دليل الإعفاء/التنازل عن الرسوم/الرسوم المخفضة"
   },
   {
    "en": "Green card (both sides)",
    "ar": "البطاقة الخضراء (الوجهين)"
   },
   {
    "en": "Marriage certificate",
    "ar": "شهادة الزواج"
   },
   {
    "en": "Prior marriage termination records (e.g., divorce decree, death certificate)",
    "ar": "سجلات إنهاء الزواج السابق (مثل حكم الطلاق، شهادة الوفاة)"
   },
   {
    "en": "Spouse’s citizenship evidence (e.g., U.S. passport, birth certificate, naturalization certificate)",
    "ar": "دليل جنسية الزوج (مثل جواز السفر الأمريكي، شهادة الميلاد، شهادة التجنس)"
   },
   {
    "en": "Marital union evidence (e.g., joint tax returns, joint bank accounts, joint leases)",
    "ar": "دليل الاتحاد الزوجي (مثل الإقرارات الضريبية المشتركة، الحسابات المصرفية المشتركة، عقود الإيجار المشتركة)"
   },
   {
    "en": "Name-change document (e.g., court order, marriage certificate)",
    "ar": "وثيقة تغيير الاسم (مثل أمر المحكمة، شهادة الزواج)"
   },
   {
    "en": "Residence/travel evidence (for long absences or other residence issues)",
    "ar": "دليل الإقامة/السفر (للغيابات الطويلة أو مسائل الإقامة الأخرى)"
   },
   {
    "en": "Arrest reports and certified court records (including dismissed, sealed, or expunged matters)",
    "ar": "تقارير الاعتقال وسجلات المحكمة المعتمدة (بما في ذلك المسائل التي تم رفضها أو ختمها أو محوها)"
   },
   {
    "en": "Sentence/probation completion evidence",
    "ar": "دليل إتمام العقوبة/المراقبة"
   },
   {
    "en": "Tax payment agreement and compliance evidence",
    "ar": "اتفاق دفع الضرائب ودليل الامتثال"
   },
   {
    "en": "Child-support records",
    "ar": "سجلات إعالة الطفل"
   },
   {
    "en": "Selective Service records/explanation",
    "ar": "سجلات/شرح الخدمة الانتقائية"
   },
   {
    "en": "Form N-648, Medical Certification for Disability Accommodations",
    "ar": "نموذج N-648، شهادة طبية لترتيبات الإعاقة"
   },
   {
    "en": "Military certification/service records",
    "ar": "شهادة/سجلات الخدمة العسكرية"
   },
   {
    "en": "Special overseas-employment evidence (for qualifying spouse-abroad route)",
    "ar": "دليل التوظيف الخاص في الخارج (لطريق الزوج المؤهل في الخارج)"
   },
   {
    "en": "Photographs (only if required by applicable overseas instructions)",
    "ar": "الصور (فقط إذا كانت مطلوبة بموجب التعليمات الخارجية المعمول بها)"
   },
   {
    "en": "Form G-28, Notice of Entry of Appearance as Attorney or Accredited Representative",
    "ar": "نموذج G-28، إشعار دخول المحامي أو الممثل المعتمد"
   },
   {
    "en": "Translations of foreign-language documents",
    "ar": "ترجمات الوثائق باللغات الأجنبية"
   }
  ]
 },
 {
  "code": "N-470",
  "title": {
   "en": "N-470 Preserve Residence for Naturalization Purposes",
   "ar": "N-470 الحفاظ على الإقامة لأغراض التجنس"
  },
  "questions": [
   {
    "id": "lpr_status",
    "q": {
     "en": "Are you a lawful permanent resident? What is your “Resident Since” date?",
     "ar": "هل أنت مقيم دائم قانوني؟ ما هو تاريخ \"إقامتك منذ\"؟"
    },
    "type": "text"
   },
   {
    "id": "overseas_employment_purpose",
    "q": {
     "en": "What overseas employment or religious duties require your absence?",
     "ar": "ما هي الوظيفة الخارجية أو الواجبات الدينية التي تتطلب غيابك؟"
    },
    "type": "textarea"
   },
   {
    "id": "employer_organization",
    "q": {
     "en": "Who is the employer, contracting organization or religious organization?",
     "ar": "من هو صاحب العمل، المنظمة المتعاقدة أو المنظمة الدينية؟"
    },
    "type": "text"
   },
   {
    "id": "qualifying_category",
    "q": {
     "en": "Which qualifying category applies? (U.S. government, American research institution, American firm/corporation, Public international organization, Religious duties)",
     "ar": "أي فئة مؤهلة تنطبق؟ (حكومة أمريكية، مؤسسة بحثية أمريكية، شركة/مؤسسة أمريكية، منظمة دولية عامة، واجبات دينية)"
    },
    "type": "text"
   },
   {
    "id": "uninterrupted_us_year",
    "q": {
     "en": "Have you completed one uninterrupted year physically residing in the United States after becoming an LPR, without any trips abroad?",
     "ar": "هل أكملت سنة متواصلة واحدة من الإقامة الجسدية في الولايات المتحدة بعد أن أصبحت مقيمًا دائمًا، دون أي رحلات إلى الخارج؟"
    },
    "type": "yesno"
   },
   {
    "id": "already_departed",
    "q": {
     "en": "Have you already departed? What was your departure date?",
     "ar": "هل غادرت بالفعل؟ ما هو تاريخ مغادرتك؟"
    },
    "type": "date"
   },
   {
    "id": "assignment_duration",
    "q": {
     "en": "How long is the assignment expected to last?",
     "ar": "كم من الوقت يتوقع أن تستمر المهمة؟"
    },
    "type": "text"
   },
   {
    "id": "family_reside_abroad",
    "q": {
     "en": "Will a spouse or dependent children reside abroad with you?",
     "ar": "هل سيقيم الزوج أو الأطفال المعالون معك في الخارج؟"
    },
    "type": "yesno"
   },
   {
    "id": "spouse_abroad_eligibility",
    "q": {
     "en": "Are you potentially eligible for a separate spouse-abroad naturalization provision?",
     "ar": "هل أنت مؤهل محتملاً لحكم تجنيس منفصل للزوج في الخارج؟"
    },
    "type": "yesno"
   },
   {
    "id": "identity_details",
    "q": {
     "en": "Legal name, birth details, A-number and relevant identifiers",
     "ar": "الاسم القانوني، تفاصيل الميلاد، رقم A-number والمعرفات ذات الصلة"
    },
    "type": "textarea"
   },
   {
    "id": "addresses_us_overseas",
    "q": {
     "en": "U.S. and overseas physical/mailing addresses",
     "ar": "العناوين الفعلية/البريدية في الولايات المتحدة والخارج"
    },
    "type": "textarea"
   },
   {
    "id": "permanent_residence_details",
    "q": {
     "en": "Admission/adjustment date and status evidence",
     "ar": "تاريخ القبول/التعديل ودليل الحالة"
    },
    "type": "text"
   },
   {
    "id": "travel_history_dates",
    "q": {
     "en": "Dates establishing the uninterrupted U.S. year and current overseas absence",
     "ar": "التواريخ التي تثبت السنة الأمريكية المتواصلة والغياب الحالي في الخارج"
    },
    "type": "textarea"
   },
   {
    "id": "employment_details",
    "q": {
     "en": "Employer’s legal name, addresses, job title, duties and employment/contract dates",
     "ar": "الاسم القانوني لصاحب العمل، العناوين، المسمى الوظيفي، الواجبات وتواريخ التوظيف/العقد"
    },
    "type": "textarea"
   },
   {
    "id": "assignment_details",
    "q": {
     "en": "Country, purpose, start/end dates and expected duration of assignment",
     "ar": "البلد، الغرض، تواريخ البدء/الانتهاء والمدة المتوقعة للمهمة"
    },
    "type": "textarea"
   },
   {
    "id": "employer_qualification_details",
    "q": {
     "en": "Employer’s government relationship, research recognition, ownership/commerce, international membership or religious organization details",
     "ar": "تفاصيل العلاقة الحكومية لصاحب العمل، الاعتراف بالبحث، الملكية/التجارة، العضوية الدولية أو تفاصيل المنظمة الدينية"
    },
    "type": "textarea"
   },
   {
    "id": "family_information",
    "q": {
     "en": "Required information about accompanying/residing spouse and dependent children",
     "ar": "المعلومات المطلوبة عن الزوج والأطفال المعالين المرافقين/المقيمين"
    },
    "type": "textarea"
   },
   {
    "id": "applicant_certification",
    "q": {
     "en": "Applicant certification/signature, interpreter and preparer information",
     "ar": "تصديق/توقيع مقدم الطلب، معلومات المترجم والمعد"
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed, signed N-470 and applicable payment",
    "ar": "N-470 مكتمل وموقع والدفع المطبق"
   },
   {
    "en": "Green card copy—both sides",
    "ar": "نسخة البطاقة الخضراء – من كلا الجانبين"
   },
   {
    "en": "Passport/travel records and U.S. residence evidence",
    "ar": "سجلات جواز السفر/السفر وأدلة الإقامة في الولايات المتحدة"
   },
   {
    "en": "Detailed employer/organization letter explaining duties, assignment dates/location and qualifying employment",
    "ar": "رسالة مفصلة من صاحب العمل/المنظمة تشرح الواجبات، تواريخ/موقع المهمة والعمل المؤهل"
   },
   {
    "en": "Employment agreement, contract or assignment orders",
    "ar": "اتفاقية التوظيف، العقد أو أوامر التعيين"
   },
   {
    "en": "Category-specific organizational evidence (e.g., recognition, ownership, foreign-commerce activity, treaty/statutory membership or qualifying religious organization)",
    "ar": "أدلة تنظيمية خاصة بالفئة (مثل: الاعتراف، الملكية، نشاط التجارة الخارجية، العضوية بموجب معاهدة/قانون أو منظمة دينية مؤهلة)"
   },
   {
    "en": "Marriage/birth and family-status evidence (where claiming applicable family benefits)",
    "ar": "أدلة الزواج/الميلاد وحالة الأسرة (عند المطالبة بمنافع عائلية مطبقة)"
   },
   {
    "en": "Previous N-470 decisions (if relevant)",
    "ar": "قرارات N-470 السابقة (إذا كانت ذات صلة)"
   },
   {
    "en": "G-28 Authorized Representation (where applicable)",
    "ar": "G-28 تمثيل قانوني (حيثما ينطبق)"
   },
   {
    "en": "Certified English translations for foreign-language evidence",
    "ar": "ترجمات إنجليزية معتمدة للأدلة باللغات الأجنبية"
   }
  ]
 },
 {
  "code": "N-565",
  "title": {
   "en": "N-565 Replacement Naturalization/Citizenship Document",
   "ar": "N-565 وثيقة بديلة للتجنس/المواطنة"
  },
  "questions": [
   {
    "id": "confirmation_previous_issuance",
    "q": {
     "en": "Has USCIS previously issued the document you need to replace?",
     "ar": "هل سبق أن أصدرت USCIS الوثيقة التي تحتاج إلى استبدالها؟"
    },
    "type": "yesno"
   },
   {
    "id": "document_type_to_replace",
    "q": {
     "en": "Which document needs replacement: Certificate of Naturalization, Certificate of Citizenship, Declaration of Intention or Repatriation Certificate?",
     "ar": "ما هي الوثيقة التي تحتاج إلى استبدال: شهادة التجنس، شهادة الجنسية، إعلان النية، أو شهادة العودة إلى الوطن؟"
    },
    "type": "text"
   },
   {
    "id": "reason_for_replacement_type",
    "q": {
     "en": "Is the document lost, stolen, destroyed, damaged or incorrect?",
     "ar": "هل الوثيقة مفقودة، مسروقة، تالفة، مدمرة، أو غير صحيحة؟"
    },
    "type": "text"
   },
   {
    "id": "requesting_correction_type",
    "q": {
     "en": "Are you requesting a legal name change, eligible birth-date correction or another supported correction?",
     "ar": "هل تطلب تغيير الاسم القانوني، تصحيح تاريخ الميلاد المؤهل، أو تصحيح آخر مدعوم؟"
    },
    "type": "text"
   },
   {
    "id": "possess_original",
    "q": {
     "en": "Do you possess the original document?",
     "ar": "هل تمتلك الوثيقة الأصلية؟"
    },
    "type": "yesno"
   },
   {
    "id": "possess_copy",
    "q": {
     "en": "Do you have a copy of the document?",
     "ar": "هل لديك نسخة من الوثيقة؟"
    },
    "type": "yesno"
   },
   {
    "id": "incorrect_info_cause",
    "q": {
     "en": "Was the incorrect information caused by USCIS, or does it match information you previously supplied?",
     "ar": "هل كانت المعلومات غير الصحيحة بسبب خطأ من USCIS، أم أنها تتطابق مع المعلومات التي قدمتها سابقاً؟"
    },
    "type": "text"
   },
   {
    "id": "special_certificate_foreign_recognition",
    "q": {
     "en": "Are you requesting a special certificate of naturalization for recognition by a foreign country?",
     "ar": "هل تطلب شهادة تجنس خاصة للاعتراف بها من قبل دولة أجنبية؟"
    },
    "type": "yesno"
   },
   {
    "id": "live_inside_or_outside_us",
    "q": {
     "en": "Do you live inside or outside the United States?",
     "ar": "هل تعيش داخل الولايات المتحدة أم خارجها؟"
    },
    "type": "text"
   },
   {
    "id": "applicant_current_legal_name",
    "q": {
     "en": "Your current legal name",
     "ar": "اسمك القانوني الحالي"
    },
    "type": "text"
   },
   {
    "id": "applicant_previous_names",
    "q": {
     "en": "Your previous names",
     "ar": "أسماؤك السابقة"
    },
    "type": "text"
   },
   {
    "id": "applicant_birth_details",
    "q": {
     "en": "Your birth details (date, place, country)",
     "ar": "تفاصيل ميلادك (التاريخ، المكان، الدولة)"
    },
    "type": "text"
   },
   {
    "id": "applicant_a_number",
    "q": {
     "en": "Your A-number",
     "ar": "رقم الـ A الخاص بك"
    },
    "type": "text"
   },
   {
    "id": "applicant_relevant_identifiers",
    "q": {
     "en": "Other relevant identifiers",
     "ar": "معرفات أخرى ذات صلة"
    },
    "type": "text"
   },
   {
    "id": "contact_mailing_address",
    "q": {
     "en": "Your mailing address",
     "ar": "عنوانك البريدي"
    },
    "type": "text"
   },
   {
    "id": "contact_physical_address",
    "q": {
     "en": "Your physical address",
     "ar": "عنوانك الفعلي"
    },
    "type": "text"
   },
   {
    "id": "contact_telephone",
    "q": {
     "en": "Your telephone number",
     "ar": "رقم هاتفك"
    },
    "type": "text"
   },
   {
    "id": "contact_email",
    "q": {
     "en": "Your email address",
     "ar": "عنوان بريدك الإلكتروني"
    },
    "type": "text"
   },
   {
    "id": "original_doc_type",
    "q": {
     "en": "Type of original document",
     "ar": "نوع الوثيقة الأصلية"
    },
    "type": "text"
   },
   {
    "id": "original_doc_certificate_number",
    "q": {
     "en": "Certificate number of original document",
     "ar": "رقم شهادة الوثيقة الأصلية"
    },
    "type": "text"
   },
   {
    "id": "original_doc_name_shown",
    "q": {
     "en": "Name shown on original document",
     "ar": "الاسم الظاهر على الوثيقة الأصلية"
    },
    "type": "text"
   },
   {
    "id": "original_doc_issuing_office_court",
    "q": {
     "en": "Issuing office or court of original document",
     "ar": "المكتب أو المحكمة التي أصدرت الوثيقة الأصلية"
    },
    "type": "text"
   },
   {
    "id": "original_doc_issue_date",
    "q": {
     "en": "Issue date of original document",
     "ar": "تاريخ إصدار الوثيقة الأصلية"
    },
    "type": "date"
   },
   {
    "id": "replacement_reason_specific",
    "q": {
     "en": "Specific reason for replacement (loss/theft/destruction, damage, USCIS error or supported information change)",
     "ar": "السبب المحدد للاستبدال (فقدان/سرقة/تدمير، تلف، خطأ من USCIS، أو تغيير معلومات مدعوم)"
    },
    "type": "text"
   },
   {
    "id": "incident_details_when",
    "q": {
     "en": "When was the document lost, stolen, destroyed or damaged?",
     "ar": "متى فقدت الوثيقة أو سرقت أو دمرت أو تلفت؟"
    },
    "type": "text"
   },
   {
    "id": "incident_details_where",
    "q": {
     "en": "Where was the document lost, stolen, destroyed or damaged?",
     "ar": "أين فقدت الوثيقة أو سرقت أو دمرت أو تلفت؟"
    },
    "type": "text"
   },
   {
    "id": "incident_details_how",
    "q": {
     "en": "How was the document lost, stolen, destroyed or damaged?",
     "ar": "كيف فقدت الوثيقة أو سرقت أو دمرت أو تلفت؟"
    },
    "type": "textarea"
   },
   {
    "id": "correction_details_existing_info",
    "q": {
     "en": "Existing information on the document you want to correct",
     "ar": "المعلومات الحالية في الوثيقة التي ترغب في تصحيحها"
    },
    "type": "text"
   },
   {
    "id": "correction_details_requested_info",
    "q": {
     "en": "Requested information for correction",
     "ar": "المعلومات المطلوبة للتصحيح"
    },
    "type": "text"
   },
   {
    "id": "correction_details_explanation",
    "q": {
     "en": "Supporting explanation for the correction",
     "ar": "شرح داعم للتصحيح"
    },
    "type": "textarea"
   },
   {
    "id": "name_change_previous_name",
    "q": {
     "en": "Previous name (for name change request)",
     "ar": "الاسم السابق (لطلب تغيير الاسم)"
    },
    "type": "text"
   },
   {
    "id": "name_change_new_name",
    "q": {
     "en": "New name (for name change request)",
     "ar": "الاسم الجديد (لطلب تغيير الاسم)"
    },
    "type": "text"
   },
   {
    "id": "name_change_date",
    "q": {
     "en": "Date of name change",
     "ar": "تاريخ تغيير الاسم"
    },
    "type": "date"
   },
   {
    "id": "name_change_legal_document",
    "q": {
     "en": "Legal document establishing the name change",
     "ar": "الوثيقة القانونية التي تثبت تغيير الاسم"
    },
    "type": "text"
   },
   {
    "id": "special_certificate_foreign_country",
    "q": {
     "en": "Foreign country for special certificate recognition",
     "ar": "الدولة الأجنبية لطلب شهادة خاصة للاعتراف بها"
    },
    "type": "text"
   },
   {
    "id": "special_certificate_official_authority",
    "q": {
     "en": "Relevant official or authority in the foreign country for special certificate recognition",
     "ar": "المسؤول أو السلطة المعنية في الدولة الأجنبية لطلب شهادة خاصة للاعتراف بها"
    },
    "type": "text"
   },
   {
    "id": "applicant_certification_signature",
    "q": {
     "en": "Applicant certification/signature",
     "ar": "إقرار/توقيع مقدم الطلب"
    },
    "type": "yesno"
   },
   {
    "id": "interpreter_details",
    "q": {
     "en": "Interpreter details (if applicable)",
     "ar": "تفاصيل المترجم (إن وجد)"
    },
    "type": "textarea"
   },
   {
    "id": "preparer_details",
    "q": {
     "en": "Preparer details (if applicable)",
     "ar": "تفاصيل المُعدّ (إن وجد)"
    },
    "type": "textarea"
   },
   {
    "id": "guardian_details",
    "q": {
     "en": "Guardian details (if applicable)",
     "ar": "تفاصيل الوصي (إن وجد)"
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Police report or sworn statement explaining the incident (for lost, stolen or destroyed document)",
    "ar": "تقرير الشرطة أو إفادة خطية تشرح الحادث (للوثيقة المفقودة أو المسروقة أو المدمرة)"
   },
   {
    "en": "Copy of certificate (if available, for lost, stolen or destroyed document)",
    "ar": "نسخة من الشهادة (إذا كانت متاحة، للوثيقة المفقودة أو المسروقة أو المدمرة)"
   },
   {
    "en": "Original damaged document (for damaged/mutilated document)",
    "ar": "الوثيقة التالفة الأصلية (للوثيقة المتضررة/المشوهة)"
   },
   {
    "en": "Original document (for USCIS clerical error)",
    "ar": "الوثيقة الأصلية (لخطأ كتابي من USCIS)"
   },
   {
    "en": "Evidence identifying the error and correct information (for USCIS clerical error)",
    "ar": "دليل يحدد الخطأ والمعلومات الصحيحة (لخطأ كتابي من USCIS)"
   },
   {
    "en": "Original certificate (for legal name change)",
    "ar": "الشهادة الأصلية (لتغيير الاسم القانوني)"
   },
   {
    "en": "Marriage certificate, divorce decree or court order establishing the name change (for legal name change)",
    "ar": "عقد الزواج، أو قرار الطلاق، أو أمر المحكمة الذي يثبت تغيير الاسم (لتغيير الاسم القانوني)"
   },
   {
    "en": "Original Certificate of Citizenship (for eligible birth-date change)",
    "ar": "شهادة الجنسية الأصلية (لتغيير تاريخ الميلاد المؤهل)"
   },
   {
    "en": "Qualifying court or vital-record evidence (for eligible birth-date change)",
    "ar": "دليل محكمة مؤهل أو سجل حيوي (لتغيير تاريخ الميلاد المؤهل)"
   },
   {
    "en": "Original certificate (for correction to reflect biological sex at birth)",
    "ar": "الشهادة الأصلية (للتصحيح ليعكس الجنس البيولوجي عند الولادة)"
   },
   {
    "en": "Evidence required by current USCIS instructions (for correction to reflect biological sex at birth)",
    "ar": "الأدلة المطلوبة بموجب تعليمات USCIS الحالية (للتصحيح ليعكس الجنس البيولوجي عند الولادة)"
   },
   {
    "en": "Copy of naturalization certificate (for special certificate for foreign recognition)",
    "ar": "نسخة من شهادة التجنس (لشهادة خاصة للاعتراف الأجنبي)"
   },
   {
    "en": "Supporting request details (for special certificate for foreign recognition)",
    "ar": "تفاصيل الطلب الداعمة (لشهادة خاصة للاعتراف الأجنبي)"
   },
   {
    "en": "Two identical passport-style photographs (if applicant living abroad)",
    "ar": "صورتان متطابقتان بحجم جواز السفر (إذا كان مقدم الطلب يعيش في الخارج)"
   },
   {
    "en": "Certified translations (if applicable)",
    "ar": "ترجمات معتمدة (إن وجدت)"
   },
   {
    "en": "Authorized representative’s G-28 (if applicable)",
    "ar": "نموذج G-28 للممثل المعتمد (إن وجد)"
   },
   {
    "en": "Guardian-authority evidence (if applicable)",
    "ar": "دليل سلطة الوصي (إن وجد)"
   }
  ]
 },
 {
  "code": "N-600",
  "title": {
   "en": "N-600 Application for Certificate of Citizenship",
   "ar": "نموذج N-600 طلب شهادة الجنسية"
  },
  "questions": [
   {
    "id": "q_born_outside_us",
    "q": {
     "en": "Was the applicant born outside the United States?",
     "ar": "هل وُلِدَ مقدم الطلب خارج الولايات المتحدة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_parent_us_citizen_birth",
    "q": {
     "en": "Was either parent a U.S. citizen when the applicant was born?",
     "ar": "هل كان أحد الوالدين مواطنًا أمريكيًا عندما وُلِد مقدم الطلب؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_parent_became_citizen_date",
    "q": {
     "en": "If a parent became a citizen later, on what date?",
     "ar": "إذا أصبح أحد الوالدين مواطنًا لاحقًا، فما هو تاريخ ذلك؟"
    },
    "type": "date"
   },
   {
    "id": "q_applicant_pr_date",
    "q": {
     "en": "When did the applicant become a permanent resident?",
     "ar": "متى أصبح مقدم الطلب مقيمًا دائمًا؟"
    },
    "type": "date"
   },
   {
    "id": "q_resided_us_citizen_parent_custody_before_18",
    "q": {
     "en": "Before age 18, did the applicant reside in the United States in the citizen parent’s legal and physical custody?",
     "ar": "قبل سن 18 عامًا، هل أقام مقدم الطلب في الولايات المتحدة تحت الحضانة القانونية والمادية للوالد المواطن؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_parents_marital_status",
    "q": {
     "en": "Were the parents married, divorced or legally separated? When?",
     "ar": "هل كان الوالدان متزوجين أم مطلقين أم منفصلين قانونيًا؟ ومتى كان ذلك؟"
    },
    "type": "text"
   },
   {
    "id": "q_adoption_legitimation_disputed_parentage",
    "q": {
     "en": "Is adoption, legitimation or disputed parentage involved?",
     "ar": "هل هناك تبني أو إثبات نسب أو نزاع على الأبوة؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_n600_previously_filed",
    "q": {
     "en": "Has N-600 previously been filed, approved or denied?",
     "ar": "هل تم تقديم النموذج N-600 مسبقًا، أو تمت الموافقة عليه أو رفضه؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_have_us_passport_crba_citizenship_certificate",
    "q": {
     "en": "Does the applicant already have a U.S. passport, CRBA or citizenship certificate?",
     "ar": "هل يمتلك مقدم الطلب بالفعل جواز سفر أمريكي، أو تقرير قنصلي عن ولادة في الخارج (CRBA)، أو شهادة جنسية؟"
    },
    "type": "yesno"
   },
   {
    "id": "q_current_residence",
    "q": {
     "en": "Where does the applicant currently reside?",
     "ar": "أين يقيم مقدم الطلب حاليًا؟"
    },
    "type": "text"
   },
   {
    "id": "q_applicant_identity",
    "q": {
     "en": "Provide applicant's legal and previous names, birth date, birth place, addresses, A-number, and relevant identifiers.",
     "ar": "قدم الأسماء القانونية والسابقة لمقدم الطلب، وتاريخ ومكان الميلاد، والعناوين، ورقم A-number، والمعرفات ذات الصلة."
    },
    "type": "textarea"
   },
   {
    "id": "q_citizenship_claim",
    "q": {
     "en": "State citizenship claim (at birth or after birth), relevant dates, and claimed legal basis.",
     "ar": "اذكر ادعاء الجنسية (عند الولادة أو بعد الولادة)، والتواريخ ذات الصلة، والأساس القانوني المدعى."
    },
    "type": "textarea"
   },
   {
    "id": "q_immigration_history",
    "q": {
     "en": "Provide U.S. admissions, permanent-residence date, status, and residence history.",
     "ar": "قدم معلومات حول دخول الولايات المتحدة، وتاريخ الإقامة الدائمة، والوضع، وتاريخ الإقامة."
    },
    "type": "textarea"
   },
   {
    "id": "q_parents_info",
    "q": {
     "en": "Provide parents' names, birth details, citizenship history, naturalization dates, and addresses.",
     "ar": "قدم أسماء الوالدين، وتفاصيل الميلاد، وتاريخ الجنسية، وتواريخ التجنيس، والعناوين."
    },
    "type": "textarea"
   },
   {
    "id": "q_parents_marriages",
    "q": {
     "en": "Provide parents’ marriage dates and termination records.",
     "ar": "قدم تواريخ زواج الوالدين وسجلات إنهاء الزواج."
    },
    "type": "textarea"
   },
   {
    "id": "q_citizenship_at_birth_path",
    "q": {
     "en": "Provide citizen parent’s U.S. residence/physical-presence periods before the applicant’s birth, and applicable parentage requirements.",
     "ar": "قدم فترات إقامة الوالد المواطن في الولايات المتحدة/حضوره الفعلي قبل ولادة مقدم الطلب، ومتطلبات الأبوة المعمول بها."
    },
    "type": "textarea"
   },
   {
    "id": "q_citizenship_after_birth_path",
    "q": {
     "en": "Provide dates when citizenship, LPR status, age, and custody/residence conditions were satisfied.",
     "ar": "قدم التواريخ التي تم فيها استيفاء شروط الجنسية، ووضع LPR (المقيم القانوني الدائم)، والعمر، وشروط الحضانة/الإقامة."
    },
    "type": "textarea"
   },
   {
    "id": "q_adoption_parentage_details",
    "q": {
     "en": "Provide adoption dates, custody/residence history, paternity or legitimation records.",
     "ar": "قدم تواريخ التبني، وتاريخ الحضانة/الإقامة، وسجلات الأبوة أو إثبات النسب."
    },
    "type": "textarea"
   },
   {
    "id": "q_filing_history",
    "q": {
     "en": "Provide prior N-600/N-600K decisions and existing citizenship documents.",
     "ar": "قدم القرارات السابقة لـ N-600/N-600K والمستندات الجنسية الحالية."
    },
    "type": "textarea"
   },
   {
    "id": "q_applicant_signature",
    "q": {
     "en": "Will the applicant (age 14 or older) sign the form, or will a parent/guardian (under age 14) sign?",
     "ar": "هل سيوقع مقدم الطلب (14 عامًا أو أكبر) النموذج، أم سيوقع أحد الوالدين/الوصي (أقل من 14 عامًا)؟"
    },
    "type": "text"
   },
   {
    "id": "q_interpreter_preparer_info",
    "q": {
     "en": "Provide interpreter and preparer information if applicable.",
     "ar": "قدم معلومات المترجم والمعد إذا كانت قابلة للتطبيق."
    },
    "type": "textarea"
   }
  ],
  "docs": [
   {
    "en": "Completed N-600 form",
    "ar": "النموذج N-600 المكتمل"
   },
   {
    "en": "Applicable payment/fee-assistance evidence",
    "ar": "دليل الدفع/المساعدة في الرسوم المطبقة"
   },
   {
    "en": "Applicant’s civil birth certificate",
    "ar": "شهادة ميلاد مقدم الطلب المدنية"
   },
   {
    "en": "Parent’s birth and citizenship records",
    "ar": "سجلات ميلاد وجنسية الوالد"
   },
   {
    "en": "Parents’ marriage/termination records (if relevant)",
    "ar": "سجلات زواج الوالدين/إنهاء الزواج (إذا كانت ذات صلة)"
   },
   {
    "en": "Green card and admission records (for citizenship acquired after birth)",
    "ar": "البطاقة الخضراء وسجلات الدخول (للحصول على الجنسية بعد الولادة)"
   },
   {
    "en": "U.S. residence and physical-custody evidence (e.g., school, medical, housing records)",
    "ar": "دليل الإقامة في الولايات المتحدة والحضانة المادية (مثل سجلات المدرسة، الطبية، السكن)"
   },
   {
    "en": "Legal-custody records (especially divorce, separation, or adoption cases)",
    "ar": "سجلات الحضانة القانونية (خاصة حالات الطلاق، الانفصال، أو التبني)"
   },
   {
    "en": "Parent’s physical-presence evidence (e.g., school, employment, military records for birth-citizenship claims)",
    "ar": "دليل الحضور الفعلي للوالد (مثل سجلات المدرسة، العمل، العسكرية لمطالبات الجنسية عند الولادة)"
   },
   {
    "en": "Adoption/paternity/legitimation documents (if applicable)",
    "ar": "وثائق التبني/الأبوة/إثبات النسب (إذا كانت قابلة للتطبيق)"
   },
   {
    "en": "Legal name-change evidence (if names changed)",
    "ar": "دليل تغيير الاسم القانوني (إذا تغيرت الأسماء)"
   },
   {
    "en": "Existing passport/CRBA or prior N-600/N-600K decisions (if available and relevant)",
    "ar": "جواز السفر/CRBA الحالي أو القرارات السابقة لـ N-600/N-600K (إذا كانت متاحة وذات صلة)"
   },
   {
    "en": "Certified English translations (for non-English documents)",
    "ar": "ترجمات إنجليزية معتمدة (للمستندات غير الإنجليزية)"
   },
   {
    "en": "G-28, Notice of Entry of Appearance as Attorney or Accredited Representative (if applicable)",
    "ar": "نموذج G-28، إشعار المثول كمحامٍ أو ممثل معتمد (إذا كان قابلاً للتطبيق)"
   },
   {
    "en": "Two identical color passport-style photographs (if filing outside the U.S.)",
    "ar": "صورتان شخصيتان ملونتان متطابقتان بحجم جواز السفر (إذا كان التقديم من خارج الولايات المتحدة)"
   }
  ]
 },
 {
  "code": "N-648",
  "title": {
   "en": "N-648 Medical Certification for Disability Exceptions",
   "ar": "N-648 شهادة طبية للإعفاءات المتعلقة بالإعاقة"
  },
  "questions": [
   {
    "id": "full_legal_name",
    "q": {
     "en": "Full legal name",
     "ar": "الاسم القانوني الكامل"
    },
    "type": "text"
   },
   {
    "id": "date_of_birth",
    "q": {
     "en": "Date of birth",
     "ar": "تاريخ الميلاد"
    },
    "type": "date"
   },
   {
    "id": "a_number",
    "q": {
     "en": "A-Number",
     "ar": "رقم A-Number"
    },
    "type": "text"
   },
   {
    "id": "contact_details",
    "q": {
     "en": "Contact details",
     "ar": "تفاصيل الاتصال"
    },
    "type": "text"
   },
   {
    "id": "preparing_n400_status",
    "q": {
     "en": "Are you preparing N-400, or have you already filed it?",
     "ar": "هل تقوم بإعداد النموذج N-400، أم قمت بتقديمه بالفعل؟"
    },
    "type": "text"
   },
   {
    "id": "n400_filing_date",
    "q": {
     "en": "N-400 filing date (if filed)",
     "ar": "تاريخ تقديم N-400 (إذا تم تقديمه)"
    },
    "type": "date"
   },
   {
    "id": "n400_receipt_number",
    "q": {
     "en": "N-400 receipt number (if filed)",
     "ar": "رقم إيصال N-400 (إذا تم تقديمه)"
    },
    "type": "text"
   },
   {
    "id": "exception_request",
    "q": {
     "en": "Which requirements are you requesting an exception from: English, civics, or both?",
     "ar": "ما هي المتطلبات التي تطلب الإعفاء منها: اللغة الإنجليزية، التربية المدنية، أم كلاهما؟"
    },
    "type": "text"
   },
   {
    "id": "disability_description",
    "q": {
     "en": "What disability or impairment affects your ability to meet those requirements?",
     "ar": "ما هي الإعاقة أو الضعف الذي يؤثر على قدرتك على تلبية هذه المتطلبات؟"
    },
    "type": "textarea"
   },
   {
    "id": "disability_onset_and_impact",
    "q": {
     "en": "When did it begin, and how does it affect learning, remembering or communicating?",
     "ar": "متى بدأ، وكيف يؤثر على التعلم أو التذكر أو التواصل؟"
    },
    "type": "textarea"
   },
   {
    "id": "previously_submitted_n648",
    "q": {
     "en": "Have you previously submitted N-648?",
     "ar": "هل سبق لك تقديم N-648؟"
    },
    "type": "yesno"
   },
   {
    "id": "treating_medical_professional",
    "q": {
     "en": "Who is your treating or evaluating medical professional?",
     "ar": "من هو أخصائي الرعاية الطبية الذي يعالجك أو يقيم حالتك؟"
    },
    "type": "text"
   },
   {
    "id": "interpreter_needed",
    "q": {
     "en": "Do you need an interpreter or someone legally authorized to assist you?",
     "ar": "هل تحتاج إلى مترجم فوري أو شخص مخول قانونيًا لمساعدتك؟"
    },
    "type": "yesno"
   },
   {
    "id": "interview_accommodations_needed",
    "q": {
     "en": "Do you also need interview accommodations?",
     "ar": "هل تحتاج أيضًا إلى تسهيلات للمقابلة؟"
    },
    "type": "yesno"
   }
  ],
  "docs": [
   {
    "en": "Copies of previously submitted N-648 and any USCIS response",
    "ar": "نسخ من النماذج N-648 التي قدمت سابقًا وأي رد من USCIS"
   },
   {
    "en": "Professional contact and licensing information for your treating or evaluating medical professional",
    "ar": "معلومات الاتصال والترخيص المهنية لأخصائي الرعاية الطبية الذي يعالجك أو يقيم حالتك"
   }
  ]
 }
];
formRequirements.unshift(nvcWorkflow);
export const getFormRequirement = (code: string | null | undefined) =>
  formRequirements.find((f) => f.code.toLowerCase() === (code ?? "").trim().toLowerCase());
