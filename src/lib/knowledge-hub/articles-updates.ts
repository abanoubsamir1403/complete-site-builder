import { tx } from "@/lib/i18n";
import { article, block, src } from "./helpers";
import type { KnowledgeArticle } from "./types";

export const articlesUpdates: KnowledgeArticle[] = [
  article(
    "official-uscis-updates",
    "updates",
    tx("Official USCIS Updates and How to Read Them", "تحديثات USCIS الرسمية وكيفية قراءتها"),
    [
      block(
        "Start with the original announcement",
        "ابدأ دائمًا بالإعلان الأصلي",
        [
          [
            "Use USCIS Newsroom, Forms Updates, the Policy Manual, and the relevant form page. Check whether a page is current, archived, superseded, or subject to a later court order or announcement.",
            "اعتمد على غرفة أخبار USCIS الرسمية، وتحديثات النماذج، ودليل السياسات، وصفحة النموذج المحددة. وتحقق مما إذا كانت الصفحة محدثة أو مؤرشفة أو تم استبدالها أو تخضع لأمر قضائي لاحق أو إعلان مكمل.",
          ],
        ],
      ),
      block(
        "Read dates separately",
        "ميّز بين التواريخ المختلفة",
        [
          [
            "A publication date is not always an effective date. A new edition may have a separate acceptance deadline. A rule may apply only to filings received after a certain date or to specified categories.",
            "تاريخ نشر الخبر ليس دائمًا هو تاريخ بدء سريانه. فقد يكون للإصدار الجديد من النموذج مهلة قبول محددة، وقد ينطبق التعديل على الطلبات المستلمة بعد تاريخ معين فقط أو لفئات بعينها دون غيرها.",
          ],
        ],
      ),
      block(
        "Connect the update to the request",
        "اربط التحديث بنوع طلبك",
        [
          [
            "Record what changed, who is affected, the effective date if stated, and the original source. Avoid claiming every pending case is affected. If the announcement is unclear about a specific case, obtain qualified guidance.",
            "سجّل ما طرأ عليه التغيير، ومن يتأثر به، وتاريخ السريان، والمصدر الأصلي. وتجنب افتراض أن كل قضية معلقة تتأثر بالقرار تلقائيًا. وإذا كان الإعلان غامضًا بشأن قضيتك الفردية، فاطلب توضيحًا قانونيًا مؤهلاً.",
          ],
        ],
      ),
      block(
        "This page is a source directory",
        "هذه الصفحة دليل مرجعي للمصادر",
        [
          [
            "It is not a live news feed and does not claim that automated monitoring is active. Open the official sources for the latest information. Dated MIGRAFILE summaries should be published only after the actual announcement and any later developments are reviewed.",
            "هذا الدليل ليس موجزًا إخباريًا فوريًا ولا يزعم تفعيل رصد آلي مباشر. افتح الروابط الرسمية المرفقة للحصول على أحدث التوجيهات. ولا تُنشر ملخصات MIGRAFILE المؤرخة إلا بعد فحص الإعلان الرسمي والمستجدات اللاحقة بعناية.",
          ],
        ],
      ),
    ],
    [
      src(tx("USCIS Newsroom", "غرفة أخبار USCIS"), "https://www.uscis.gov/newsroom"),
      src(tx("USCIS Forms Updates", "تحديثات نماذج USCIS"), "https://www.uscis.gov/forms/forms-updates"),
      src(tx("USCIS Policy Manual", "دليل سياسات USCIS"), "https://www.uscis.gov/policy-manual"),
      src(tx("USCIS Fee Schedule", "جدول رسوم USCIS"), "https://www.uscis.gov/g-1055"),
    ],
  ),
];
