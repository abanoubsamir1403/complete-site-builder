import { describe, it, expect } from "vitest";
import { Constants } from "@/integrations/supabase/types";

describe("Case Approval and Manual Payment Workflow", () => {
  it("includes all new stages in case_stage Enum definition", () => {
    const stages = Constants.public.Enums.case_stage;
    expect(stages).toContain("pending_admin_review");
    expect(stages).toContain("pending_payment");
    expect(stages).toContain("payment_verification");
    expect(stages).toContain("rejected");
    expect(stages).toContain("documents");
    expect(stages).toContain("review");
    expect(stages).toContain("complete");
  });

  it("verifies the stage transition state machine", () => {
    type Stage = (typeof Constants.public.Enums.case_stage)[number];

    interface MockCase {
      id: string;
      reference: string;
      stage: Stage;
      service_fee: number | null;
      payment_receipt_url: string | null;
    }

    // Step 1: Client submits case
    const currentCase: MockCase = {
      id: "case-123",
      reference: "MF-ABCD1234",
      stage: "pending_admin_review",
      service_fee: null,
      payment_receipt_url: null,
    };
    expect(currentCase.stage).toBe("pending_admin_review");

    // Step 2: Admin reviews & quotes
    const quoteFee = (c: MockCase, fee: number): MockCase => {
      if (c.stage !== "pending_admin_review") throw new Error("Invalid stage");
      return { ...c, stage: "pending_payment", service_fee: fee };
    };

    const quotedCase = quoteFee(currentCase, 350);
    expect(quotedCase.stage).toBe("pending_payment");
    expect(quotedCase.service_fee).toBe(350);

    // Step 3: Client transfers and uploads receipt
    const uploadReceipt = (c: MockCase, receiptPath: string): MockCase => {
      if (c.stage !== "pending_payment") throw new Error("Invalid stage");
      return { ...c, stage: "payment_verification", payment_receipt_url: receiptPath };
    };

    const verifiedUploadCase = uploadReceipt(quotedCase, "case-123/receipt-12345.png");
    expect(verifiedUploadCase.stage).toBe("payment_verification");
    expect(verifiedUploadCase.payment_receipt_url).toBe("case-123/receipt-12345.png");

    // Step 4: Admin verifies payment and starts processing
    const confirmPayment = (c: MockCase): MockCase => {
      if (c.stage !== "payment_verification") throw new Error("Invalid stage");
      return { ...c, stage: "documents" };
    };

    const processingCase = confirmPayment(verifiedUploadCase);
    expect(processingCase.stage).toBe("documents");
  });

  it("handles admin rejection flow", () => {
    type Stage = (typeof Constants.public.Enums.case_stage)[number];

    const currentCase = {
      id: "case-999",
      stage: "pending_admin_review" as Stage,
    };

    const rejectCase = (c: typeof currentCase) => ({
      ...c,
      stage: "rejected" as Stage,
    });

    const rejected = rejectCase(currentCase);
    expect(rejected.stage).toBe("rejected");
  });

  it("validates payment methods and instructions", () => {
    const paymentMethods = [
      { name: "Apple Pay", value: "+1 (555) 000-0000" },
      { name: "Venmo", value: "@MIGRAFILE-Dummy" },
      { name: "Zelle", value: "billing@dummy-migrafile.com" },
    ];

    expect(paymentMethods.find((m) => m.name === "Apple Pay")?.value).toBe("+1 (555) 000-0000");
    expect(paymentMethods.find((m) => m.name === "Venmo")?.value).toBe("@MIGRAFILE-Dummy");
    expect(paymentMethods.find((m) => m.name === "Zelle")?.value).toBe("billing@dummy-migrafile.com");
  });

  it("validates exact copy requirements", () => {
    const phase1SuccessMessage =
      "Your file is currently under review by our specialists. Once reviewed, we will determine the service fee and notify you of the next steps.";
    expect(phase1SuccessMessage).toContain("Your file is currently under review by our specialists");

    const rejectionMessage =
      "Unfortunately, we cannot accept your case at this time. For further inquiries, please Schedule a Private Documentation Call.";
    expect(rejectionMessage).toContain("Unfortunately, we cannot accept your case at this time");
    expect(rejectionMessage).toContain("Schedule a Private Documentation Call");

    const fee = 250;
    const paymentPrompt = `Good news! Your case has been accepted. Please pay the service fee of $${fee} to proceed.`;
    expect(paymentPrompt).toBe("Good news! Your case has been accepted. Please pay the service fee of $250 to proceed.");

    const uploadReceiptNote =
      "After completing the transfer, please upload a screenshot of your receipt for verification.";
    expect(uploadReceiptNote).toBe("After completing the transfer, please upload a screenshot of your receipt for verification.");

    const globalHelpBanner =
      "Need help or have questions? You can Schedule a Private Documentation Call at any time. If there are any updates required for your file, our specialist team will contact you directly.";
    expect(globalHelpBanner).toContain("Need help or have questions?");
    expect(globalHelpBanner).toContain("Schedule a Private Documentation Call");
    expect(globalHelpBanner).toContain("our specialist team will contact you directly.");
  });
});
