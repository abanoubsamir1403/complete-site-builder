import { describe, expect, it } from "vitest";
import { getDocLabel } from "@/routes/_authenticated/portal";

describe("Document label localization", () => {
  it("localizes form document labels stored in Arabic", () => {
    const label =
      "أدلة على زواج حقيقي (مثل حسابات بنكية مشتركة، سندات ملكية، شهادات ميلاد الأطفال المشتركين، صور فوتوغرافية، مراسلات، إفادات خطية من أطراف ثالثة) (لطلبات الزوج/الزوجة)";

    expect(getDocLabel(label).en).toBe(
      "Evidence of genuine marriage (e.g. joint bank accounts, property deeds, birth certificates of shared children, photographs, correspondence, affidavits from third parties) (for spouse petitions)",
    );
  });

  it("returns the matching Arabic label for English document labels", () => {
    const label =
      "Evidence of genuine marriage (e.g. joint bank accounts, property deeds, birth certificates of shared children, photographs, correspondence, affidavits from third parties) (for spouse petitions)";

    expect(getDocLabel(label).ar).toBe(
      "أدلة على زواج حقيقي (مثل حسابات بنكية مشتركة، سندات ملكية، شهادات ميلاد الأطفال المشتركين، صور فوتوغرافية، مراسلات، إفادات خطية من أطراف ثالثة) (لطلبات الزوج/الزوجة)",
    );
  });
});
