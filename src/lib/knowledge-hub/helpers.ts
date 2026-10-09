import { tx, type T } from "@/lib/i18n";
import type { KnowledgeArticle, KnowledgeCategoryId, KnowledgeRelatedForm, KnowledgeSection, KnowledgeSource } from "./types";

export const p = tx;

export function sec(heading: T, paragraphs: T[]): KnowledgeSection {
  return { heading, paragraphs };
}

export function src(label: T, url: string): KnowledgeSource {
  return { label, url };
}

export function rel(code: string, title: T): KnowledgeRelatedForm {
  return { code, title };
}

export function uscisForm(code: string, title: T): KnowledgeSource {
  return src(title, `https://www.uscis.gov/${code.toLowerCase()}`);
}

export function article(
  slug: string,
  category: KnowledgeCategoryId,
  title: T,
  sections: KnowledgeSection[],
  sources: KnowledgeSource[],
  relatedForms?: KnowledgeRelatedForm[],
): KnowledgeArticle {
  return { slug, category, title, sections, sources, relatedForms };
}

/** Shorthand: heading + paragraph pairs for one section. */
export function block(hEn: string, hAr: string, pairs: [string, string][]): KnowledgeSection {
  return sec(tx(hEn, hAr), pairs.map(([en, ar]) => tx(en, ar)));
}
