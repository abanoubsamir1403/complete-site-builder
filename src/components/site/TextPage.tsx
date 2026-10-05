import { useLang, type T } from "@/lib/i18n";
import { Container, Notice, PageHeader } from "./Layout";

export type Block = { h: T; p?: T; items?: T[] };

export function TextPage({ eyebrow, title, intro, blocks, notice }: { eyebrow: T; title: T; intro?: T; blocks: Block[]; notice?: T }) {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} intro={intro} />
      <Container className="max-w-3xl py-14">
        {notice && <div className="mb-10"><Notice>{t(notice)}</Notice></div>}
        <div className="grid gap-10">
          {blocks.map((b) => (
            <section key={b.h.en}>
              <h2 className="text-2xl text-primary">{t(b.h)}</h2>
              {b.p && <p className="mt-3 leading-relaxed text-muted-foreground">{t(b.p)}</p>}
              {b.items && (
                <ul className="mt-4 grid gap-2">
                  {b.items.map((i) => <li key={i.en} className="flex gap-3 text-sm"><span className="text-gold">—</span>{t(i)}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
