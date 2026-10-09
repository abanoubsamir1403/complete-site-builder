import type { T } from "@/lib/i18n";

export type KnowledgeCategoryId =
  | "start"
  | "family"
  | "green-card"
  | "citizenship"
  | "work-travel"
  | "humanitarian"
  | "filing"
  | "after-filing"
  | "updates";

export type KnowledgeSection = { heading: T; paragraphs: T[] };

export type KnowledgeSource = { label: T; url: string };

export type KnowledgeRelatedForm = { code: string; title: T };

export type KnowledgeArticle = {
  slug: string;
  category: KnowledgeCategoryId;
  title: T;
  sections: KnowledgeSection[];
  sources: KnowledgeSource[];
  relatedForms?: KnowledgeRelatedForm[];
};
