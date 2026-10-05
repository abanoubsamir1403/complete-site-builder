import { createFileRoute, Link } from "@tanstack/react-router";
import { tx, useLang } from "@/lib/i18n";
import { Container, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/track")({
  head: () => seo('Track My Case', 'Secure client portal for tracking your MIGRAFILE case.'),
  component: PTrack,
});

function PTrack() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={tx("Client portal","بوابة العملاء")} title={tx("Track my case","تتبع قضيتي")}
        intro={tx("Secure sign-in is required to view any case information. For your protection, cases cannot be looked up by case number alone.","يلزم تسجيل دخول آمن لعرض أي معلومات عن القضية. لحمايتك، لا يمكن البحث عن القضايا برقم القضية وحده.")} />
      <Container className="max-w-3xl py-14">
        <Link to="/portal" className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-accent">
          {t(tx("Open my portal","افتح بوابتي"))}
        </Link>
      </Container>
    </>
  );
}
