import { tx, type T } from "@/lib/i18n";
import type { KnowledgeCategoryId } from "./types";

export type KnowledgeCategory = {
  id: KnowledgeCategoryId;
  title: T;
  description: T;
};

export const knowledgeCategories: KnowledgeCategory[] = [
  {
    id: "start",
    title: tx("Start Here", "ابدأ من هنا"),
    description: tx("Agencies, documents, and choosing help safely.", "الجهات والمستندات واختيار المساعدة بأمان."),
  },
  {
    id: "family",
    title: tx("Family Immigration", "الهجرة العائلية"),
    description: tx("Petitions, evidence, NVC, and sponsorship.", "الالتماسات والأدلة وNVC والكفالة."),
  },
  {
    id: "green-card",
    title: tx("Green Card", "البطاقة الخضراء"),
    description: tx("Adjustment, visa charts, renewal, and conditions.", "تعديل الوضع وجداول التأشيرات والتجديد والشروط."),
  },
  {
    id: "citizenship",
    title: tx("Citizenship", "الجنسية"),
    description: tx("Naturalization, derived citizenship, and interviews.", "التجنس والجنسية المكتسبة والمقابلات."),
  },
  {
    id: "work-travel",
    title: tx("Work & Travel", "العمل والسفر"),
    description: tx("Employment authorization, travel documents, and status changes.", "تصريح العمل ووثائق السفر وتغيير الوضع."),
  },
  {
    id: "humanitarian",
    title: tx("Humanitarian", "الحماية الإنسانية"),
    description: tx("Protection programs, waivers, and sensitive filings.", "برامج الحماية والإعفاءات والطلبات الحساسة."),
  },
  {
    id: "filing",
    title: tx("Filing", "التقديم"),
    description: tx("Forms, evidence, fees, and submission methods.", "النماذج والأدلة والرسوم وطرق الإرسال."),
  },
  {
    id: "after-filing",
    title: tx("After Filing", "بعد التقديم"),
    description: tx("Receipts, appointments, RFEs, and records.", "الإيصالات والمواعيد وطلبات الأدلة والسجلات."),
  },
  {
    id: "updates",
    title: tx("Updates", "المستجدات"),
    description: tx("How to read official USCIS announcements.", "كيف تقرأ إعلانات USCIS الرسمية."),
  },
];

export function categoryById(id: KnowledgeCategoryId) {
  return knowledgeCategories.find((c) => c.id === id)!;
}
