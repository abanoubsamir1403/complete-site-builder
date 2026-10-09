import type { KnowledgeArticle, KnowledgeCategoryId } from "./types";
import { articlesStart } from "./articles-start";
import { articlesFamily } from "./articles-family";
import { articlesGreenCard } from "./articles-green-card";
import { articlesCitizenship } from "./articles-citizenship";
import { articlesWorkTravel } from "./articles-work-travel";
import { articlesHumanitarian } from "./articles-humanitarian";
import { articlesFiling } from "./articles-filing";
import { articlesAfterFiling } from "./articles-after-filing";
import { articlesUpdates } from "./articles-updates";

export const allKnowledgeArticles: KnowledgeArticle[] = [
  ...articlesStart,
  ...articlesFamily,
  ...articlesGreenCard,
  ...articlesCitizenship,
  ...articlesWorkTravel,
  ...articlesHumanitarian,
  ...articlesFiling,
  ...articlesAfterFiling,
  ...articlesUpdates,
];

export function articleBySlug(slug: string): KnowledgeArticle | undefined {
  return allKnowledgeArticles.find((a) => a.slug === slug);
}

export function articlesByCategory(category: KnowledgeCategoryId): KnowledgeArticle[] {
  return allKnowledgeArticles.filter((a) => a.category === category);
}

export function searchKnowledgeArticles(query: string): KnowledgeArticle[] {
  const q = query.trim().toLowerCase();
  if (!q) return allKnowledgeArticles;
  return allKnowledgeArticles.filter((a) => {
    if (a.title.en.toLowerCase().includes(q) || a.title.ar.toLowerCase().includes(q)) return true;
    if (a.relatedForms?.some((f) => f.code.toLowerCase().includes(q) || f.title.en.toLowerCase().includes(q) || f.title.ar.toLowerCase().includes(q))) return true;
    return a.sections.some((s) =>
      s.heading.en.toLowerCase().includes(q) ||
      s.heading.ar.toLowerCase().includes(q) ||
      s.paragraphs.some((p) => p.en.toLowerCase().includes(q) || p.ar.toLowerCase().includes(q)),
    );
  });
}
