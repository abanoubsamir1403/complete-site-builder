import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Phone,
  Mail,
  Send,
  MessageSquare,
  CheckCircle2,
  Globe,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Info,
} from "lucide-react";
import { tx, useLang } from "@/lib/i18n";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";
import { useSessionUser } from "@/lib/use-session";
import {
  AVAILABLE_SLOTS,
  DEFAULT_US_TIMEZONE,
  US_TIMEZONES,
  formatEgyptTime,
  formatUsTime,
  previewEgyptTimeFromSlot,
  usTimeToUtc,
} from "@/lib/timezone";
import {
  COMMUNICATION_METHODS,
  INTERVIEW_TOPICS,
  createInterviewAppointment,
  type CommMethod,
  type InterviewAppointment,
} from "@/lib/interview";

type BookInterviewSearch = {
  service?: string;
  category?: string;
  topic?: string;
};

export const Route = createFileRoute("/book-interview")({
  validateSearch: (search: Record<string, unknown>): BookInterviewSearch => ({
    service: typeof search.service === "string" ? search.service : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
    topic: typeof search.topic === "string" ? search.topic : undefined,
  }),
  head: () =>
    seo(
      "Book A Video Call Interview | MIGRAFILE",
      "Schedule a Book a Personal Video Call with MIGRAFILE immigration documentation specialists. Book your appointment on U.S. Time.",
    ),
  component: BookInterviewPage,
});

function getUpcomingDays(count = 14) {
  const days: {
    dateStr: string;
    dayName: string;
    dayNum: number;
    monthName: string;
    isWeekend: boolean;
  }[] = [];
  const now = new Date();
  // Start from tomorrow
  for (let i = 1; i <= count + 5; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const dayOfWeek = d.getDay(); // 0 is Sun, 6 is Sat
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    if (isWeekend) continue; // Skip weekends for interview bookings

    const dateStr = d.toISOString().split("T")[0]!;
    days.push({
      dateStr,
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: d.getDate(),
      monthName: d.toLocaleDateString("en-US", { month: "short" }),
      isWeekend,
    });
    if (days.length >= count) break;
  }
  return days;
}

function BookInterviewPage() {
  const { t, lang } = useLang();
  const isAr = lang === "ar";
  const user = useSessionUser();
  const qc = useQueryClient();

  const search = Route.useSearch();
  const requestedService = search.service;
  const requestedCategory = search.category;

  // Booking states
  const days = getUpcomingDays(14);
  const [selectedDate, setSelectedDate] = useState<string>(days[0]?.dateStr || "");
  const [selectedSlot, setSelectedSlot] = useState<string>("11:00 AM");
  const [selectedTz, setSelectedTz] = useState<string>(DEFAULT_US_TIMEZONE);

  // Client info & communication method
  const [clientName, setClientName] = useState(user?.email?.split("@")[0] || "");
  const [clientEmail, setClientEmail] = useState(user?.email || "");
  const [commMethod, setCommMethod] = useState<CommMethod>("whatsapp");
  const [customMethodName, setCustomMethodName] = useState("");
  const [contactDetail, setContactDetail] = useState("");
  const [topic, setTopic] = useState(() => {
    if (
      search.topic &&
      INTERVIEW_TOPICS.some((interviewTopic) => interviewTopic.id === search.topic)
    ) {
      return search.topic;
    }
    return "general_consultation";
  });
  const [caseRef, setCaseRef] = useState(() => {
    if (requestedService) {
      return requestedCategory ? `${requestedCategory} — ${requestedService}` : requestedService;
    }
    return "";
  });
  const [notes, setNotes] = useState(() => {
    if (requestedService) {
      return `Requested document/service: ${requestedService}${requestedCategory ? ` (${requestedCategory})` : ""}`;
    }
    return "";
  });

  // Validation & UI State
  const [validationError, setValidationError] = useState<string | null>(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState<InterviewAppointment | null>(
    null,
  );

  const activeMethodConfig =
    COMMUNICATION_METHODS.find((m) => m.id === commMethod) ?? COMMUNICATION_METHODS[0]!;

  const mutation = useMutation({
    mutationFn: async () => {
      setValidationError(null);

      if (!clientName.trim()) {
        throw new Error(t(tx("Please enter your full name.", "يرجى كتابة الاسم بالكامل.")));
      }
      if (!clientEmail.trim() || !clientEmail.includes("@")) {
        throw new Error(
          t(tx("Please enter a valid email address.", "يرجى إدخال بريد إلكتروني صالح.")),
        );
      }
      if (!contactDetail.trim()) {
        throw new Error(
          t(
            tx(
              `Please provide your ${activeMethodConfig.name.en} contact details so we can send the video call link.`,
              `يرجى إدخال بيانات التواصل لـ (${activeMethodConfig.name.ar}) حتى نتمكن من إرسال رابط المقابلة إليك.`,
            ),
          ),
        );
      }
      if (commMethod === "other" && !customMethodName.trim()) {
        throw new Error(
          t(tx("Please specify the application name.", "يرجى كتابة اسم تطبيق التواصل.")),
        );
      }
      if (!selectedDate || !selectedSlot) {
        throw new Error(
          t(tx("Please select an appointment date and time.", "يرجى اختيار تاريخ وموعد للمقابلة.")),
        );
      }

      const scheduledUtc = usTimeToUtc(selectedDate, selectedSlot, selectedTz);

      return await createInterviewAppointment({
        client_id: user?.id ?? null,
        client_name: clientName,
        client_email: clientEmail,
        communication_method: commMethod,
        custom_method_name: customMethodName,
        contact_detail: contactDetail,
        scheduled_at: scheduledUtc,
        us_timezone: selectedTz,
        us_time_slot: selectedSlot,
        topic,
        case_reference: caseRef,
        notes,
      });
    },
    onSuccess: (data) => {
      setConfirmedAppointment(data);
      qc.invalidateQueries({ queryKey: ["interview-appointments"] });
      window.scrollTo({ top: 120, behavior: "smooth" });
    },
    onError: (err: Error) => {
      setValidationError(err.message);
    },
  });

  const previewEgyptTime = previewEgyptTimeFromSlot(selectedDate, selectedSlot, selectedTz, isAr);

  return (
    <>
      <PageHeader
        eyebrow={tx("Direct Video Consultation", "مقابلة شخصية أونلاين")}
        title={tx("Book a Personal Interview (Video Call)", "حجز موعد مقابلة شخصية (فيديو كول)")}
        intro={tx(
          "Schedule a one-on-one video call interview with a MIGRAFILE documentation specialist. Choose your preferred time in U.S. Time, specify how you want to receive the call link, and we'll connect at your scheduled time.",
          "احجز موعد مقابلة فيديو كول شخصية ومباشرة مع متخصصي توثيق الهجرة في MIGRAFILE. اختر الموعد المناسب بالساعة الأمريكية وحدد وسيلة التواصل المفضلة لنرسل لك رابط المقابلة من خلالها.",
        )}
      />

      <Container className="py-12">
        {confirmedAppointment ? (
          /* Confirmation Screen */
          <div className="mf-scale-in mx-auto max-w-2xl rounded-3xl border border-accent/30 bg-card p-6 shadow-xl sm:p-10">
            <div className="text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-status-green/15 text-status-green">
                <CheckCircle2 className="h-10 w-10" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-primary sm:text-3xl">
                {t(tx("Appointment Confirmed!", "تم تأكيد حجز المقابلة بنجاح!"))}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(
                  tx(
                    "Your personal interview has been scheduled. Keep your reference number handy.",
                    "تم تسجيل موعد مقابلتك الشخصية بنجاح. احتفظ برقم الحجز المرجعي التالي:",
                  ),
                )}
              </p>
              <div className="mt-4 inline-block rounded-xl border border-dashed border-accent/60 bg-muted/50 px-5 py-2 font-mono text-lg font-bold text-primary">
                {confirmedAppointment.reference}
              </div>
            </div>

            {/* Time Comparison Card */}
            <div className="mt-8 grid gap-4 rounded-2xl border bg-background p-5 sm:grid-cols-2">
              <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <Globe className="h-4 w-4" />
                  {t(tx("U.S. Time (Eastern Time)", "التوقيت الأمريكي (Eastern Time)"))}
                </div>
                <p className="mt-2 font-display text-xl font-bold text-primary">
                  {
                    formatUsTime(
                      confirmedAppointment.scheduled_at,
                      confirmedAppointment.us_timezone,
                      lang,
                    ).time
                  }
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {
                    formatUsTime(
                      confirmedAppointment.scheduled_at,
                      confirmedAppointment.us_timezone,
                      lang,
                    ).date
                  }
                </p>
              </div>

              <div className="rounded-xl border border-gold/20 bg-gold/5 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-gold">
                  <Clock className="h-4 w-4" />
                  {t(tx("Egypt Time (Cairo Time)", "توقيت مصر (توقيت القاهرة)"))}
                </div>
                <p className="mt-2 font-display text-xl font-bold text-primary">
                  {
                    formatEgyptTime(confirmedAppointment.scheduled_at, isAr ? "ar-EG" : "en-US")
                      .time
                  }
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {
                    formatEgyptTime(confirmedAppointment.scheduled_at, isAr ? "ar-EG" : "en-US")
                      .full
                  }
                </p>
              </div>
            </div>

            {/* Selected Communication Method Notice */}
            <div className="mt-6 rounded-2xl border bg-muted/40 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t(tx("Communication & Video Call Details", "وسيلة التواصل ورابط المقابلة"))}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-accent/20 px-2.5 py-1 text-xs font-bold text-accent">
                    {confirmedAppointment.communication_method === "other"
                      ? confirmedAppointment.custom_method_name || t(tx("Other", "أخرى"))
                      : t(activeMethodConfig.name)}
                  </span>
                  <p className="mt-2 font-mono text-sm font-semibold text-foreground" dir="ltr">
                    {confirmedAppointment.contact_detail}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground sm:text-end">
                  <p className="font-medium text-foreground">{confirmedAppointment.client_name}</p>
                  <p>{confirmedAppointment.client_email}</p>
                </div>
              </div>
              <p className="mt-4 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                <Info className="me-1 inline h-3.5 w-3.5 text-accent" />
                {t(
                  tx(
                    "Our specialist will send the video call meeting link to your chosen contact method right before the scheduled time.",
                    "سيقوم أخصائي التوثيق بإرسال رابط مكالمة الفيديو (Video Call) مباشرة عبر وسيلة التواصل المحددة أعلاه قبل الموعد.",
                  ),
                )}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted"
              >
                {t(tx("Back to Home", "العودة للرئيسية"))}
              </Link>
              <button
                onClick={() => {
                  setConfirmedAppointment(null);
                  setContactDetail("");
                  setNotes("");
                }}
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-accent"
              >
                {t(tx("Book Another Appointment", "حجز موعد آخر"))}
              </button>
            </div>
          </div>
        ) : (
          /* Main Booking Form */
          <div className="mx-auto max-w-4xl">
            {requestedService && (
              <div className="mb-8 rounded-2xl border border-accent/40 bg-accent/10 p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-primary">
                      {t(tx("Booking interview for:", "حجز مقابلة لخدمة:"))}{" "}
                      <span className="text-accent underline font-bold">{requestedService}</span>
                    </p>
                    {requestedCategory && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {t(tx("Category:", "القسم:"))} {requestedCategory}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {t(
                        tx(
                          "No advance paperwork or preliminary uploads needed! Simply pick your preferred time and contact method below. Our documentation specialist will review, draft, and coordinate this document directly with you during your session.",
                          "لا حاجة لأي أوراق أو رفع مستندات مسبقة! اختر فقط الموعد ووسيلة التواصل المفضلة لديك بالأسفل، وسيقوم أخصائي التوثيق بمراجعة وصياغة هذا المستند معك خطوة بخطوة أثناء المقابلة.",
                        ),
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Banner explaining US Time & Egypt Conversion */}
            <div className="mb-8 rounded-2xl border border-accent/25 bg-accent/5 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Globe className="h-4 w-4" />
                </span>
                <div className="min-w-0 text-sm">
                  <p className="font-semibold text-primary">
                    {t(
                      tx(
                        "All booking slots are in U.S. Time (Eastern Time)",
                        "جميع مواعيد الحجز معروضة بالساعة الأمريكية (توقيت شرق أمريكا - Eastern Time)",
                      ),
                    )}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {t(
                      tx(
                        "You choose your interview slot according to the U.S. clock. Our dashboard automatically converts and syncs your appointment with Cairo / Egypt time so our team connects with you at the exact moment.",
                        "تختار موعد المقابلة بالساعة الأمريكية، ولوحة التحكم لدينا تحوّل الموعد وتزامنه تلقائيًا مع توقيت مصر حتى يتواصل معك فريقنا في اللحظة المحددة دون أي التباس.",
                      ),
                    )}
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate();
              }}
              className="grid gap-8"
            >
              {/* SECTION 1: DATE & TIME SELECTION */}
              <section className="rounded-2xl border bg-card p-5 sm:p-7 shadow-sm">
                <div className="flex items-center gap-2.5 border-b pb-4">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    1
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-primary">
                      {t(
                        tx(
                          "Choose Date & Time (U.S. Time)",
                          "اختر التاريخ والوقت (بالتوقيت الأمريكي)",
                        ),
                      )}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {t(
                        tx(
                          "Select an available business day and U.S. Eastern Time slot.",
                          "اختر يوم عمل مناسب وموعدًا بتوقيت شرق الولايات المتحدة (ET).",
                        ),
                      )}
                    </p>
                  </div>
                </div>

                {/* Day selector */}
                <div className="mt-5">
                  <label className="mb-2 block text-xs font-semibold text-muted-foreground">
                    {t(tx("Select Date", "اختر اليوم"))}
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-7">
                    {days.map((d) => {
                      const isSel = selectedDate === d.dateStr;
                      return (
                        <button
                          key={d.dateStr}
                          type="button"
                          onClick={() => setSelectedDate(d.dateStr)}
                          className={`flex flex-col items-center rounded-xl border p-2.5 transition-all text-center ${
                            isSel
                              ? "border-primary bg-primary text-primary-foreground shadow-sm scale-[1.02]"
                              : "border-border bg-background hover:border-accent/60"
                          }`}
                        >
                          <span
                            className={`text-[11px] uppercase ${isSel ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                          >
                            {d.dayName}
                          </span>
                          <span className="font-display text-lg font-bold">{d.dayNum}</span>
                          <span
                            className={`text-[10px] ${isSel ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                          >
                            {d.monthName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="mt-6">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <label className="text-xs font-semibold text-muted-foreground">
                      {t(
                        tx(
                          "Select Time Slot (U.S. Eastern Time - ET)",
                          "اختر التوقيت (بالساعة الأمريكية - ET)",
                        ),
                      )}
                    </label>
                    <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-medium text-foreground">
                      {t(tx("Cairo equivalent:", "يعادل بتوقيت مصر:"))}{" "}
                      <strong className="text-primary">{previewEgyptTime}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {AVAILABLE_SLOTS.map((slot) => {
                      const isSel = selectedSlot === slot;
                      const egPreview = previewEgyptTimeFromSlot(
                        selectedDate,
                        slot,
                        selectedTz,
                        isAr,
                      );
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`group flex flex-col items-center justify-center rounded-xl border px-3 py-2.5 text-center transition-all ${
                            isSel
                              ? "border-accent bg-accent/15 text-primary ring-2 ring-accent shadow-sm"
                              : "border-border bg-background hover:border-accent/40 hover:bg-muted/50"
                          }`}
                        >
                          <span className="font-mono text-sm font-bold text-foreground group-hover:text-primary">
                            {slot}{" "}
                            <span className="text-[10px] font-normal text-muted-foreground">
                              ET
                            </span>
                          </span>
                          <span className="mt-0.5 text-[10px] text-muted-foreground">
                            {egPreview}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* SECTION 2: COMMUNICATION METHOD */}
              <section className="rounded-2xl border bg-card p-5 sm:p-7 shadow-sm">
                <div className="flex items-center gap-2.5 border-b pb-4">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    2
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-primary">
                      {t(tx("Choose Communication Method", "اختر وسيلة التواصل لمكالمة الفيديو"))}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {t(
                        tx(
                          "Specify how you want us to deliver the video call meeting link (e.g. WhatsApp, Google Meet, Zoom).",
                          "حدد الطريقة التي ترغب في استلام رابط مكالمة الفيديو من خلالها (مثل واتساب، جوجل ميت، زووم).",
                        ),
                      )}
                    </p>
                  </div>
                </div>

                {/* Communication Method Cards */}
                <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {COMMUNICATION_METHODS.map((m) => {
                    const isSel = commMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setCommMethod(m.id);
                          setValidationError(null);
                        }}
                        className={`flex items-center gap-3 rounded-xl border p-3.5 text-start transition-all ${
                          isSel
                            ? "border-primary bg-primary/5 text-primary shadow-sm ring-1 ring-primary"
                            : "border-border bg-background hover:border-accent/50"
                        }`}
                      >
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                            isSel
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {m.id === "whatsapp" && <Phone className="h-4 w-4" />}
                          {m.id === "google_meet" && <Video className="h-4 w-4" />}
                          {m.id === "zoom" && <Video className="h-4 w-4" />}
                          {m.id === "teams" && <Video className="h-4 w-4" />}
                          {m.id === "telegram" && <Send className="h-4 w-4" />}
                          {m.id === "other" && <MessageSquare className="h-4 w-4" />}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold">{t(m.name)}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Contact Detail Input */}
                <div className="mf-expand-in mt-6 rounded-2xl border border-primary/20 bg-muted/30 p-4 sm:p-5">
                  {commMethod === "other" && (
                    <div className="mb-4">
                      <label className="mb-1 block text-xs font-semibold text-foreground">
                        {t(tx("Application / Platform Name *", "اسم التطبيق أو المنصة *"))}
                      </label>
                      <input
                        type="text"
                        value={customMethodName}
                        onChange={(e) => setCustomMethodName(e.target.value)}
                        placeholder={t(
                          tx("e.g. Signal, Skype, Botim...", "مثال: Signal, Skype, Botim..."),
                        )}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                        required
                      />
                    </div>
                  )}

                  <label className="mb-1 block text-xs font-semibold text-foreground">
                    {t(activeMethodConfig.inputLabel)} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type={activeMethodConfig.inputType}
                    value={contactDetail}
                    onChange={(e) => setContactDetail(e.target.value)}
                    placeholder={activeMethodConfig.placeholder}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none font-mono"
                    dir="ltr"
                    required
                  />
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    <Info className="me-1 inline h-3.5 w-3.5 text-accent" />
                    {t(activeMethodConfig.helpText)}
                  </p>
                </div>
              </section>

              {/* SECTION 3: CLIENT & TOPIC DETAILS */}
              <section className="rounded-2xl border bg-card p-5 sm:p-7 shadow-sm">
                <div className="flex items-center gap-2.5 border-b pb-4">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    3
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-primary">
                      {t(tx("Your Information & Inquiry", "بياناتك وموضوع المقابلة"))}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {t(
                        tx(
                          "Let us know who will be attending.",
                          "أخبرنا بالاسم وموضوع الاستفسار لتحضير ملفك مسبقًا.",
                        ),
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-foreground">
                      {t(tx("Full Name *", "الاسم بالكامل *"))}
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder={t(
                        tx("Your name as in passport/ID", "الاسم كما هو في الجواز أو البطاقة"),
                      )}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-foreground">
                      {t(tx("Email Address *", "البريد الإلكتروني *"))}
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                      dir="ltr"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-foreground">
                      {t(tx("Interview Topic *", "موضوع المقابلة *"))}
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                    >
                      {INTERVIEW_TOPICS.map((top) => (
                        <option key={top.id} value={top.id}>
                          {t(top.label)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-foreground">
                      {t(
                        tx(
                          "MIGRAFILE Case Reference (Optional)",
                          "رقم ملف القضية إن وجد (اختياري)",
                        ),
                      )}
                    </label>
                    <input
                      type="text"
                      value={caseRef}
                      onChange={(e) => setCaseRef(e.target.value)}
                      placeholder="MF-XXXXXX"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-semibold text-foreground">
                      {t(
                        tx(
                          "Notes or Questions (Optional)",
                          "ملاحظات أو أسئلة محددة تود مناقشتها (اختياري)",
                        ),
                      )}
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t(
                        tx(
                          "Tell us briefly what documents or questions you want to go through...",
                          "اكتب بإيجاز ما تريد مراجعته أو الأسئلة التي تشغل بالك لنستعد لها...",
                        ),
                      )}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              </section>

              {/* Error Message */}
              {validationError && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-xs font-medium text-destructive">
                  {validationError}
                </div>
              )}

              {/* Booking Summary Box & Submit */}
              <div className="rounded-2xl border bg-card p-5 sm:p-7 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      {t(tx("Scheduled Time Summary", "ملخص الموعد المحجوز"))}
                    </p>
                    <p className="mt-1 font-display text-xl font-bold text-primary">
                      {selectedSlot}{" "}
                      <span className="text-xs font-normal text-muted-foreground">
                        (U.S. Time ET)
                      </span>
                    </p>
                    <p className="text-xs font-semibold text-accent">
                      {t(tx("Equivalent to:", "يعادل بتوقيت مصر:"))} {previewEgyptTime}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition hover:bg-accent disabled:opacity-60"
                  >
                    {mutation.isPending
                      ? t(tx("Booking appointment...", "جاري تأكيد الموعد..."))
                      : t(tx("Confirm Video Interview Booking", "تأكيد حجز المقابلة الشخصية"))}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </Container>
    </>
  );
}
