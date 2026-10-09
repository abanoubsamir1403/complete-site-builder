import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Clock,
  Phone,
  Video,
  Mail,
  Send,
  MessageSquare,
  Search,
  ExternalLink,
  Copy,
  Check,
  Filter,
  Save,
  Trash2,
  Download,
  AlertCircle,
  Globe,
  Sparkles,
  Link as LinkIcon,
} from "lucide-react";
import { tx, useLang } from "@/lib/i18n";
import {
  formatEgyptTime,
  formatUsTime,
  getAppointmentRelative,
} from "@/lib/timezone";
import {
  fetchInterviewAppointments,
  updateInterviewAppointment,
  deleteInterviewAppointment,
  buildWhatsAppChatUrl,
  buildEmailInviteUrl,
  STATUS_LABELS,
  COMMUNICATION_METHODS,
  INTERVIEW_TOPICS,
  type InterviewAppointment,
  type InterviewStatus,
  type CommMethod,
} from "@/lib/interview";

export function InterviewsManager() {
  const { t, lang } = useLang();
  const isAr = lang === "ar";
  const qc = useQueryClient();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<InterviewStatus | "all">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Expanded card for editing video link / staff notes
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeVideoLink, setActiveVideoLink] = useState("");
  const [activeStaffNotes, setActiveStaffNotes] = useState("");

  const appointmentsQuery = useQuery({
    queryKey: ["interview-appointments"],
    queryFn: fetchInterviewAppointments,
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      patch,
    }: {
      id: string;
      patch: Partial<Pick<InterviewAppointment, "status" | "video_link" | "staff_notes">>;
    }) => {
      await updateInterviewAppointment(id, patch);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["interview-appointments"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (confirm(t(tx("Are you sure you want to delete this interview appointment?", "هل أنت متأكد من حذف هذا الموعد؟")))) {
        await deleteInterviewAppointment(id);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["interview-appointments"] });
      setSelectedId(null);
    },
  });

  const list = useMemo(() => {
    const raw = appointmentsQuery.data ?? [];
    return raw.filter((apt) => {
      const matchStatus = statusFilter === "all" || apt.status === statusFilter;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        apt.reference.toLowerCase().includes(q) ||
        apt.client_name.toLowerCase().includes(q) ||
        apt.client_email.toLowerCase().includes(q) ||
        apt.contact_detail.toLowerCase().includes(q) ||
        (apt.case_reference && apt.case_reference.toLowerCase().includes(q));
      return matchStatus && matchSearch;
    });
  }, [appointmentsQuery.data, statusFilter, search]);

  const counts = useMemo(() => {
    const raw = appointmentsQuery.data ?? [];
    return {
      all: raw.length,
      upcoming: raw.filter((a) => a.status === "upcoming").length,
      link_sent: raw.filter((a) => a.status === "link_sent").length,
      completed: raw.filter((a) => a.status === "completed").length,
      cancelled: raw.filter((a) => a.status === "cancelled").length,
    };
  }, [appointmentsQuery.data]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportExcel = async () => {
    if (!list.length) return;
    const { default: writeXlsxFile } = await import("write-excel-file/browser");

    const header = [
      { value: "Reference", fontWeight: "bold" },
      { value: "Client Name", fontWeight: "bold" },
      { value: "Client Email", fontWeight: "bold" },
      { value: "Communication Method", fontWeight: "bold" },
      { value: "Contact Detail", fontWeight: "bold" },
      { value: "Egypt Time (Cairo)", fontWeight: "bold" },
      { value: "U.S. Time (ET)", fontWeight: "bold" },
      { value: "Topic", fontWeight: "bold" },
      { value: "Status", fontWeight: "bold" },
      { value: "Video Meeting Link", fontWeight: "bold" },
      { value: "Staff Notes", fontWeight: "bold" },
    ];

    const rows = list.map((a) => {
      const eg = formatEgyptTime(a.scheduled_at, "en-US");
      const us = formatUsTime(a.scheduled_at, a.us_timezone, "en-US");
      return [
        { value: a.reference },
        { value: a.client_name },
        { value: a.client_email },
        { value: a.communication_method },
        { value: a.contact_detail },
        { value: eg.full },
        { value: us.full },
        { value: a.topic },
        { value: a.status },
        { value: a.video_link || "" },
        { value: a.staff_notes || "" },
      ];
    });

    await (writeXlsxFile as any)([header, ...rows], {
      fileName: `migrafile_interviews_${new Date().toISOString().split("T")[0]}.xlsx`,
    });
  };

  const current = list.find((a) => a.id === selectedId);

  return (
    <div className="grid gap-6">
      {/* Top Banner / Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-card p-4 sm:p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
              <Video className="h-5 w-5" />
            </span>
            <h2 className="font-display text-xl font-bold text-primary sm:text-2xl">
              {t(tx("Video Call Interviews", "مواعيد المقابلات الشخصية (فيديو كول)"))}
            </h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {t(
              tx(
                "Clients book in U.S. Time; all appointments below are accurately converted and shown in Egyptian Time (Cairo).",
                "المواعيد حجزها العملاء بالساعة الأمريكية، ومعروضة هنا في لوحة التحكم بالساعة المصرية (توقيت القاهرة).",
              ),
            )}
          </p>
        </div>

        <button
          onClick={handleExportExcel}
          disabled={!list.length}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted disabled:opacity-50"
        >
          <Download className="h-3.5 w-3.5" />
          {t(tx("Export to Excel", "تصدير إلى إكسيل"))}
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1 rounded-xl bg-muted p-1">
          <button
            onClick={() => setStatusFilter("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              statusFilter === "all" ? "bg-card text-primary shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(tx("All", "الكل"))} ({counts.all})
          </button>
          <button
            onClick={() => setStatusFilter("upcoming")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              statusFilter === "upcoming" ? "bg-card text-primary shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(tx("Upcoming", "القادمة"))} ({counts.upcoming})
          </button>
          <button
            onClick={() => setStatusFilter("link_sent")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              statusFilter === "link_sent" ? "bg-card text-primary shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(tx("Link Sent", "تم إرسال الرابط"))} ({counts.link_sent})
          </button>
          <button
            onClick={() => setStatusFilter("completed")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              statusFilter === "completed" ? "bg-card text-primary shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(tx("Completed", "المكتملة"))} ({counts.completed})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute start-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t(tx("Search client, phone, ref...", "ابحث بالاسم أو الهاتف أو المرجع..."))}
            className="w-full rounded-xl border border-input bg-background py-2 pe-3 ps-9 text-xs text-foreground focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {/* Main Grid: List on Left, Detail/Action on Right */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        {/* Appointments List */}
        <div className="grid gap-3">
          {appointmentsQuery.isLoading && (
            <div className="rounded-2xl border bg-card p-8 text-center text-sm text-muted-foreground">
              {t(tx("Loading appointments...", "جاري تحميل المواعيد..."))}
            </div>
          )}

          {!appointmentsQuery.isLoading && list.length === 0 && (
            <div className="rounded-2xl border bg-card p-10 text-center">
              <Calendar className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-3 font-semibold text-primary">{t(tx("No appointments found", "لا توجد مواعيد حالية"))}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t(
                  tx(
                    "Bookings made by clients will appear here automatically with Cairo time conversion.",
                    "المواعيد التي يحجزها العملاء ستظهر هنا تلقائيًا محولة إلى التوقيت المصري.",
                  ),
                )}
              </p>
            </div>
          )}

          {list.map((apt) => {
            const isSelected = selectedId === apt.id;
            const egTime = formatEgyptTime(apt.scheduled_at, isAr ? "ar-EG" : "en-US");
            const usTime = formatUsTime(apt.scheduled_at, apt.us_timezone, isAr ? "ar-EG" : "en-US");
            const rel = getAppointmentRelative(apt.scheduled_at, isAr);
            const statusCfg = STATUS_LABELS[apt.status] || STATUS_LABELS.upcoming;
            const commCfg = COMMUNICATION_METHODS.find((c) => c.id === apt.communication_method);

            return (
              <div
                key={apt.id}
                onClick={() => {
                  setSelectedId(apt.id);
                  setActiveVideoLink(apt.video_link || "");
                  setActiveStaffNotes(apt.staff_notes || "");
                }}
                className={`group cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all ${
                  isSelected
                    ? "border-primary bg-primary/[0.03] shadow-md ring-1 ring-primary"
                    : "border-border bg-card hover:border-accent/50 hover:shadow-sm"
                }`}
              >
                {/* Header row: Relative badge + Reference + Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${rel.color}`}>
                      {rel.label}
                    </span>
                    <span className="font-mono text-xs font-semibold text-muted-foreground">
                      {apt.reference}
                    </span>
                  </div>

                  <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${statusCfg.badge}`}>
                    {t(statusCfg.label)}
                  </span>
                </div>

                {/* Primary: EGYPT TIME HIGHLIGHT */}
                <div className="mt-3 rounded-xl border border-gold/30 bg-gold/5 p-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gold">
                    <Clock className="h-4 w-4" />
                    <span>{t(tx("Egypt Time (Cairo):", "بتوقيت مصر (القاهرة):"))}</span>
                  </div>
                  <p className="mt-1 font-display text-base font-bold text-primary sm:text-lg">
                    {egTime.full}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    <Globe className="me-1 inline h-3 w-3" />
                    {t(tx("Booked on U.S. Time:", "الموعد بالساعة الأمريكية:"))}{" "}
                    <strong className="text-foreground">{usTime.full}</strong>
                  </p>
                </div>

                {/* Client & Communication method details */}
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">{t(tx("Client Name", "العميل"))}</p>
                    <p className="font-semibold text-foreground text-sm">{apt.client_name}</p>
                    <p className="text-xs text-muted-foreground truncate">{apt.client_email}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">{t(tx("Communication Method", "وسيلة التواصل"))}</p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-xs font-medium text-foreground">
                        {apt.communication_method === "whatsapp" && <Phone className="h-3 w-3 text-status-green" />}
                        {apt.communication_method === "google_meet" && <Video className="h-3 w-3 text-accent" />}
                        {apt.communication_method === "zoom" && <Video className="h-3 w-3 text-accent" />}
                        {apt.communication_method === "telegram" && <Send className="h-3 w-3 text-accent" />}
                        {commCfg ? t(commCfg.name) : apt.communication_method}
                      </span>
                    </div>
                    {/* The exact contact entered */}
                    <p className="mt-1 font-mono text-xs font-bold text-primary break-all" dir="ltr">
                      {apt.contact_detail}
                    </p>
                  </div>
                </div>

                {/* Quick actions row */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    {apt.communication_method === "whatsapp" && (
                      <a
                        href={buildWhatsAppChatUrl(apt, isAr)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-status-green/15 px-2.5 py-1 text-xs font-bold text-status-green hover:bg-status-green/25"
                      >
                        <Phone className="h-3 w-3" />
                        {t(tx("Open WhatsApp & Send Link", "فتح واتساب وإرسال الرابط"))}
                      </a>
                    )}

                    {(apt.communication_method === "google_meet" ||
                      apt.communication_method === "zoom" ||
                      apt.communication_method === "teams") && (
                      <a
                        href={buildEmailInviteUrl(apt, isAr)}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-accent/15 px-2.5 py-1 text-xs font-bold text-accent hover:bg-accent/25"
                      >
                        <Mail className="h-3 w-3" />
                        {t(tx("Send Email Invite", "إرسال دعوة بالإيميل"))}
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(apt.contact_detail, apt.id);
                      }}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      {copiedId === apt.id ? <Check className="h-3 w-3 text-status-green" /> : <Copy className="h-3 w-3" />}
                      {copiedId === apt.id ? t(tx("Copied", "تم النسخ")) : t(tx("Copy Contact", "نسخ جهة الاتصال"))}
                    </button>
                  </div>

                  <span className="text-[11px] font-medium text-accent group-hover:underline">
                    {t(tx("Manage Appointment →", "إدارة الموعد والروابط ←"))}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail & Action Panel on the right */}
        <aside className="rounded-2xl border bg-card p-5 sm:p-6 shadow-sm h-fit sticky top-20">
          {current ? (
            <div className="grid gap-5">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-primary">
                    {t(tx("Appointment Management", "إدارة موعد المقابلة"))}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground">{current.reference}</p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteMutation.mutate(current.id)}
                  className="rounded-lg border border-destructive/20 p-2 text-destructive hover:bg-destructive/10"
                  title={t(tx("Delete appointment", "حذف الموعد"))}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Status Selector */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                  {t(tx("Update Status", "تحديث حالة المقابلة"))}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["upcoming", "link_sent", "completed", "cancelled"] as InterviewStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() =>
                        updateMutation.mutate({
                          id: current.id,
                          patch: { status: st },
                        })
                      }
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                        current.status === st
                          ? "border-primary bg-primary text-primary-foreground shadow"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                    >
                      {t(STATUS_LABELS[st].label)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Video Meeting URL input */}
              <div className="rounded-xl border border-primary/20 bg-muted/40 p-3.5">
                <label className="mb-1 block text-xs font-bold text-foreground">
                  <Video className="me-1 inline h-3.5 w-3.5 text-primary" />
                  {t(tx("Video Call Meeting Link (Google Meet / Zoom URL)", "رابط مكالمة الفيديو (Meet / Zoom)"))}
                </label>
                <input
                  type="url"
                  value={activeVideoLink}
                  onChange={(e) => setActiveVideoLink(e.target.value)}
                  placeholder="https://meet.google.com/xyz-abcd-efg"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none font-mono"
                  dir="ltr"
                />
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateMutation.mutate({
                        id: current.id,
                        patch: { video_link: activeVideoLink.trim() || null, status: "link_sent" },
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-accent"
                  >
                    <Save className="h-3 w-3" />
                    {t(tx("Save & Mark Link Sent", "حفظ وتحديد 'تم الإرسال'"))}
                  </button>

                  {activeVideoLink && (
                    <a
                      href={activeVideoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-accent underline"
                    >
                      {t(tx("Test Link", "تجربة الرابط"))}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Send link directly via chosen method */}
              <div className="rounded-xl border bg-background p-3.5">
                <p className="text-xs font-semibold text-foreground">
                  {t(tx("Deliver link to client via:", "إرسال الرابط للعميل عبر:"))}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {current.communication_method === "whatsapp" && (
                    <a
                      href={buildWhatsAppChatUrl({ ...current, video_link: activeVideoLink }, isAr)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-status-green px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:opacity-90"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {t(tx("Send via WhatsApp", "إرسال عبر واتساب"))}
                    </a>
                  )}

                  <a
                    href={buildEmailInviteUrl({ ...current, video_link: activeVideoLink }, isAr)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-accent"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {t(tx("Send Email", "إرسال إيميل"))}
                  </a>
                </div>
              </div>

              {/* Internal Staff Notes */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                  {t(tx("Staff Internal Notes", "ملاحظات الفريق الداخلية"))}
                </label>
                <textarea
                  rows={3}
                  value={activeStaffNotes}
                  onChange={(e) => setActiveStaffNotes(e.target.value)}
                  placeholder={t(tx("Interview takeaways, case notes, outcome...", "ملاحظات المقابلة، ما تم مناقشته..."))}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    updateMutation.mutate({
                      id: current.id,
                      patch: { staff_notes: activeStaffNotes.trim() || null },
                    })
                  }
                  className="mt-2 inline-flex items-center gap-1 rounded-md border border-border px-3 py-1 text-xs hover:bg-muted"
                >
                  <Save className="h-3 w-3" />
                  {t(tx("Save Notes", "حفظ الملاحظات"))}
                </button>
              </div>

              {/* Inquiry Details summary */}
              <div className="rounded-xl border bg-muted/30 p-3 text-xs text-muted-foreground space-y-1">
                <p>
                  <strong>{t(tx("Topic:", "الموضوع:"))}</strong>{" "}
                  {INTERVIEW_TOPICS.find((tp) => tp.id === current.topic)?.label ? t(INTERVIEW_TOPICS.find((tp) => tp.id === current.topic)!.label) : current.topic}
                </p>
                {current.case_reference && (
                  <p>
                    <strong>{t(tx("Case Ref:", "ملف القضية:"))}</strong> {current.case_reference}
                  </p>
                )}
                {current.notes && (
                  <p>
                    <strong>{t(tx("Client Notes:", "ملاحظات العميل:"))}</strong> {current.notes}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-muted-foreground">
              <Calendar className="mx-auto h-8 w-8 opacity-40" />
              <p className="mt-2">{t(tx("Select an appointment to manage details", "اختر موعدًا من القائمة لعرض التفاصيل وإدارته"))}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
