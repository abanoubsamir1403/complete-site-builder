import { describe, it, expect } from "vitest";
import {
  usTimeToUtc,
  formatEgyptTime,
  formatUsTime,
  previewEgyptTimeFromSlot,
  getAppointmentRelative,
} from "@/lib/timezone";
import {
  COMMUNICATION_METHODS,
  buildWhatsAppChatUrl,
  buildEmailInviteUrl,
  type InterviewAppointment,
} from "@/lib/interview";

describe("Interview Timezone Conversions", () => {
  it("converts US Eastern Time slot to accurate UTC and formats in Cairo Time", () => {
    // 2026-10-15 at 11:00 AM Eastern Time (EDT: UTC-4) -> 15:00 UTC -> Cairo (UTC+3) 18:00 (6:00 PM)
    const utc = usTimeToUtc("2026-10-15", "11:00 AM", "America/New_York");
    expect(utc).toBe("2026-10-15T15:00:00.000Z");

    const eg = formatEgyptTime(utc, "en-US");
    expect(eg.time).toMatch(/6:00\s*PM/i);

    const egAr = formatEgyptTime(utc, "ar-EG");
    expect(egAr.time).toContain("٦:٠٠");

    const us = formatUsTime(utc, "America/New_York", "en-US");
    expect(us.time).toContain("11:00 AM ET");
  });

  it("handles previewEgyptTimeFromSlot correctly", () => {
    const preview = previewEgyptTimeFromSlot("2026-10-15", "11:00 AM", "America/New_York", false);
    expect(preview).toContain("6:00 PM");
    expect(preview).toContain("Egypt Time");
  });

  it("calculates relative appointment urgency badges", () => {
    const futureUtc = new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString();
    const relFuture = getAppointmentRelative(futureUtc, false);
    expect(relFuture.isUpcoming).toBe(true);
    expect(relFuture.label).toMatch(/In \d+ days/);
  });
});

describe("Communication Methods and Link Generators", () => {
  it("includes required communication channels", () => {
    const ids = COMMUNICATION_METHODS.map((m) => m.id);
    expect(ids).toContain("whatsapp");
    expect(ids).toContain("google_meet");
    expect(ids).toContain("zoom");
    expect(ids).toContain("teams");
    expect(ids).toContain("telegram");
    expect(ids).toContain("other");
  });

  it("generates WhatsApp chat link with appointment details", () => {
    const mockApt: InterviewAppointment = {
      id: "test-1",
      reference: "IV-TEST01",
      client_id: null,
      client_name: "Ahmed Hassan",
      client_email: "ahmed@example.com",
      communication_method: "whatsapp",
      contact_detail: "+20 101 234 5678",
      scheduled_at: "2026-10-15T15:00:00.000Z",
      us_timezone: "America/New_York",
      us_time_slot: "11:00 AM",
      topic: "general_consultation",
      status: "upcoming",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const waUrl = buildWhatsAppChatUrl(mockApt, true);
    expect(waUrl).toContain("https://wa.me/201012345678");
    expect(decodeURIComponent(waUrl)).toContain("Ahmed Hassan");
    expect(decodeURIComponent(waUrl)).toContain("IV-TEST01");
  });

  it("generates Email invite link with subject and template", () => {
    const mockApt: InterviewAppointment = {
      id: "test-2",
      reference: "IV-TEST02",
      client_id: null,
      client_name: "Sarah Ali",
      client_email: "sarah@example.com",
      communication_method: "google_meet",
      contact_detail: "sarah.meet@gmail.com",
      scheduled_at: "2026-10-15T15:00:00.000Z",
      us_timezone: "America/New_York",
      us_time_slot: "11:00 AM",
      topic: "embassy_prep",
      status: "upcoming",
      video_link: "https://meet.google.com/abc-defg-hij",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const mailUrl = buildEmailInviteUrl(mockApt, true);
    expect(mailUrl).toContain("mailto:sarah.meet@gmail.com");
    expect(decodeURIComponent(mailUrl)).toContain("IV-TEST02");
    expect(decodeURIComponent(mailUrl)).toContain("meet.google.com/abc-defg-hij");
  });
});
