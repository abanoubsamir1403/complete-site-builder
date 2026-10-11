import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Calendar as CalendarIcon,
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
  formatLocalTime,
  formatUsTime,
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
      "Schedule a Documentation Call | MIGRAFILE",
      "Schedule a private administrative documentation call with MIGRAFILE. Discuss administrative scope, client-selected records, and workflow. MIGRAFILE is a private service provider and does not advise on immigration options or eligibility.",
    ),
  component: BookInterviewPage,
});

function getUpcomingDays(count = 14, localeCode = "en-US") {
  const days: {
    dateStr: string;
    dayName: string;
    dayNum: number;
    monthName: string;
    isWeekend: boolean;
  }[] = [];
  const todayParts = new Intl.DateTimeFormat("en-US", {
    timeZone: DEFAULT_US_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    Number(todayParts.find((item) => item.type === type)?.value);
  const todayUtc = new Date(Date.UTC(part("year"), part("month") - 1, part("day")));
  for (let i = 1; i <= count + 5; i++) {
    const d = new Date(todayUtc);
    d.setUTCDate(todayUtc.getUTCDate() + i);
    const dayOfWeek = d.getUTCDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    if (isWeekend) continue;

    const dateStr = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
    days.push({
      dateStr,
      dayName: new Intl.DateTimeFormat(localeCode, { timeZone: "UTC", weekday: "short" }).format(d),
      dayNum: d.getUTCDate(),
      monthName: new Intl.DateTimeFormat(localeCode, { timeZone: "UTC", month: "short" }).format(d),
      isWeekend,
    });
    if (days.length >= count) break;
  }
  return days;
}

function BookInterviewPage() {
  const { t, lang, locale } = useLang();
  const isAr = lang === "ar";
  const user = useSessionUser();
  const qc = useQueryClient();

  const search = Route.useSearch();
  const requestedService = search.service;
  const requestedCategory = search.category;

  // Booking states
  const days = getUpcomingDays(14, isAr ? "ar-EG" : locale);
  const [selectedDate, setSelectedDate] = useState<string>(days[0]?.dateStr || "");
  const [selectedSlot, setSelectedSlot] = useState<string>("11:00 AM");
  const selectedTz = DEFAULT_US_TIMEZONE;

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
          t(tx("Please select a call date and time.", "يرجى اختيار تاريخ ووقت للمكالمة.")),
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

  return (
    <>
      <PageHeader
        eyebrow={tx("Administrative Documentation Video Call", "مكالمة فيديو للتوثيق الإداري")}
        title={tx("Schedule a Private Documentation Call", "احجز مكالمة خاصة لتنظيم المستندات")}
        intro={tx(
          "Schedule a private call with MIGRAFILE, an independent private service provider. The call covers administrative service scope, client-selected records, and workflow only. We do not advise on immigration options, eligibility, interview answers, or strategy.",
          "احجز مكالمة خاصة مع MIGRAFILE، مقدم خدمات خاص ومستقل. تقتصر المكالمة على نطاق الخدمة الإدارية والسجلات التي تختارها وسير العمل. لا نقدم مشورة بشأن خيارات الهجرة أو الأهلية أو إجابات المقابلة أو الاستراتيجية.",
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
                {t(tx("Documentation Call Scheduled", "تم تحديد موعد مكالمة التوثيق"))}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(
                  tx(
                    "Your documentation call is scheduled. Keep your reference number handy.",
                    "تم تحديد موعد مكالمة التوثيق. احتفظ بالرقم المرجعي التالي:",
                  ),
                )}
              </p>
              <div className="mt-4 inline-block rounded-xl border border-dashed border-accent/60 bg-muted/50 px-5 py-2 font-mono text-lg font-bold text-primary">
                {confirmedAppointment.reference}
              </div>
            </div>

            {/* Time Comparison Card */}
            <div className="mt-8 rounded-2xl border bg-background p-5">
              <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <Globe className="h-4 w-4" />
                  {t(
                    tx(
                      "America/New_York Appointment Time",
                      "موعدك بتوقيت نيويورك (America/New_York)",
                    ),
                  )}
                </div>
                <p className="mt-2 font-display text-xl font-bold text-primary">
                  {
                    formatUsTime(
                      confirmedAppointment.scheduled_at,
                      confirmedAppointment.us_timezone,
                      locale,
                    ).time
                  }
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {
                    formatUsTime(
                      confirmedAppointment.scheduled_at,
                      confirmedAppointment.us_timezone,
                      locale,
                    ).date
                  }
                  {" · "}
                  {
                    formatUsTime(
                      confirmedAppointment.scheduled_at,
                      confirmedAppointment.us_timezone,
                      locale,
                    ).utcOffset
                  }
                  {" · "}
                  {confirmedAppointment.us_timezone}
                </p>
              </div>
              <div className="mt-3 rounded-xl border bg-muted/40 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <Globe className="h-4 w-4" />
                  {t(tx("Your Local Time", "موعدك بالتوقيت المحلي"))}
                </div>
                <p className="mt-2 font-display text-lg font-bold text-foreground">
                  {formatLocalTime(confirmedAppointment.scheduled_at, locale).time}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatLocalTime(confirmedAppointment.scheduled_at, locale).date}
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
                    "An Administrative Documentation Coordinator will send the call link to your chosen contact method shortly before the scheduled time.",
                    "سيرسل منسق التوثيق الإداري رابط المكالمة إلى وسيلة التواصل التي اخترتها قبل الموعد بقليل.",
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
                {t(tx("Schedule Another Documentation Call", "احجز مكالمة توثيق أخرى"))}
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
                      {t(tx("Documentation call about:", "مكالمة توثيق بخصوص:"))}{" "}
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
                          "Choose a time and contact method below. The call covers administrative scope, records you selected, and workflow only; we do not provide immigration advice or draft substantive answers.",
                          "اختر الموعد ووسيلة التواصل أدناه. تقتصر المكالمة على نطاق الخدمة الإداري والسجلات التي اخترتها وسير العمل؛ ولا نقدم مشورة هجرة أو نصوغ إجابات موضوعية.",
                        ),
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Booking times are shown in America/New_York. */}
            <div className="mb-8 rounded-2xl border border-accent/25 bg-accent/5 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Globe className="h-4 w-4" />
                </span>
                <div className="min-w-0 text-sm">
                  <p className="font-semibold text-primary">
                    {t(
                      tx(
                        "All booking slots use America/New_York (Eastern Time). The UTC offset changes with daylight saving time.",
                        "تُعرض المواعيد بتوقيت America/New_York (التوقيت الشرقي)، ويتغير فارق UTC عند تطبيق التوقيت الصيفي.",
                      ),
                    )}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {t(
                      tx(
                        "Your confirmation shows the appointment date and time in America/New_York with its applicable UTC offset, plus the converted date and time in your device's local timezone.",
                        "سيعرض التأكيد تاريخ ووقت الموعد بتوقيت America/New_York مع فارق UTC المطبق، إضافة إلى التاريخ والوقت بعد تحويلهما إلى المنطقة الزمنية المحلية لجهازك.",
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
                          "Choose Date & Time (America/New_York)",
                          "اختر التاريخ والوقت (America/New_York)",
                        ),
                      )}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {t(
                        tx(
                          "Select an available business day and an America/New_York time slot.",
                          "اختر يوم عمل متاحًا وموعدًا بتوقيت America/New_York.",
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
                        tx("Select Time Slot (America/New_York)", "اختر الموعد (America/New_York)"),
                      )}
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {AVAILABLE_SLOTS.map((slot) => {
                      const isSel = selectedSlot === slot;
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
                      {t(tx("Call Topic *", "موضوع المكالمة *"))}
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
                          "Briefly describe the administrative documents or workflow you want to ask about...",
                          "اكتب بإيجاز عن المستندات الإدارية أو سير العمل الذي تريد الاستفسار عنه...",
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
                        {t(tx("(America/New_York)", "(America/New_York)"))}
                      </span>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition hover:bg-accent disabled:opacity-60"
                  >
                    {mutation.isPending
                      ? t(tx("Scheduling call...", "جارٍ جدولة المكالمة..."))
                      : t(tx("Schedule a Documentation Call", "احجز مكالمة لتنظيم المستندات"))}
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
