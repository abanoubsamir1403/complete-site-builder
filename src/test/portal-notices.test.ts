import { describe, it, expect } from "vitest";
import { localizedNoticeText } from "@/routes/_authenticated/portal";

describe("localizedNoticeText", () => {
  const paymentConfirmedTitle =
    "Payment Confirmed — Document Preparation Started | تم تأكيد السداد — بدأ العمل على المستندات";
  const paymentConfirmedBody =
    "تم التحقق من إيصال السداد واعتماده بنجاح! بدأ العمل الفعلي على ملفك. يرجى مراجعة قائمة المستندات ورفع أي ملفات متبقية.\n\nYour payment has been verified and confirmed! Your case is now in active preparation. Please review your checklist and upload any remaining required documents.";

  const receiptSubmittedTitle = "Payment Receipt Submitted | تم إرسال إيصال السداد";
  const receiptSubmittedBody =
    "استلمنا إيصال تحويل الرسوم. يجري التحقق منه وسنؤكد بدء المعالجة في أقرب وقت.\n\nWe received your payment transfer receipt. Our team is verifying it and will confirm processing shortly.";

  it("extracts English title when user language is 'en'", () => {
    expect(localizedNoticeText(paymentConfirmedTitle, "en", true)).toBe(
      "Payment Confirmed — Document Preparation Started",
    );
    expect(localizedNoticeText(receiptSubmittedTitle, "en", true)).toBe(
      "Payment Receipt Submitted",
    );
  });

  it("extracts Arabic title when user language is 'ar'", () => {
    expect(localizedNoticeText(paymentConfirmedTitle, "ar", true)).toBe(
      "تم تأكيد السداد — بدأ العمل على المستندات",
    );
    expect(localizedNoticeText(receiptSubmittedTitle, "ar", true)).toBe("تم إرسال إيصال السداد");
  });

  it("extracts English body when user language is 'en'", () => {
    expect(localizedNoticeText(paymentConfirmedBody, "en")).toBe(
      "Your payment has been verified and confirmed! Your case is now in active preparation. Please review your checklist and upload any remaining required documents.",
    );
    expect(localizedNoticeText(receiptSubmittedBody, "en")).toBe(
      "We received your payment transfer receipt. Our team is verifying it and will confirm processing shortly.",
    );
  });

  it("extracts Arabic body when user language is 'ar'", () => {
    expect(localizedNoticeText(paymentConfirmedBody, "ar")).toBe(
      "تم التحقق من إيصال السداد واعتماده بنجاح! بدأ العمل الفعلي على ملفك. يرجى مراجعة قائمة المستندات ورفع أي ملفات متبقية.",
    );
    expect(localizedNoticeText(receiptSubmittedBody, "ar")).toBe(
      "استلمنا إيصال تحويل الرسوم. يجري التحقق منه وسنؤكد بدء المعالجة في أقرب وقت.",
    );
  });

  it("handles doc status notices with single newlines and specialist notes", () => {
    const docTitle = "⚠️ مستند يحتاج استكمال: Passport | Document Needs Attention";
    expect(localizedNoticeText(docTitle, "en", true)).toBe("Document Needs Attention");
    expect(localizedNoticeText(docTitle, "ar", true)).toBe("⚠️ مستند يحتاج استكمال: Passport");

    const singleNewlineBody = "تم تحديث مرحلة الملف إلى: complete\nCase stage updated to: complete";
    expect(localizedNoticeText(singleNewlineBody, "en")).toBe("Case stage updated to: complete");
    expect(localizedNoticeText(singleNewlineBody, "ar")).toBe("تم تحديث مرحلة الملف إلى: complete");
  });

  it("preserves unilingual notices as-is", () => {
    expect(localizedNoticeText("Custom English notice", "en")).toBe("Custom English notice");
    expect(localizedNoticeText("Custom English notice", "ar")).toBe("Custom English notice");
    expect(localizedNoticeText("تنبيه عربي مخصص", "ar")).toBe("تنبيه عربي مخصص");
    expect(localizedNoticeText("تنبيه عربي مخصص", "en")).toBe("تنبيه عربي مخصص");
  });
});
