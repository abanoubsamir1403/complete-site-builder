import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LangProvider, tx, useLang } from "../lib/i18n";
import { Header, DisclaimerBar } from "../components/site/Layout";
import { lazy, Suspense } from "react";
const Footer = lazy(() => import("../components/site/Layout").then((m) => ({ default: m.Footer })));
const WhatsAppHelp = lazy(() => import("../components/site/Layout").then((m) => ({ default: m.WhatsAppHelp })));

function NotFoundContent() {
  const { t } = useLang();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t(tx("Page not found", "الصفحة غير موجودة"))}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t(tx("The page you're looking for doesn't exist or has been moved.", "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."))}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t(tx("Go home", "العودة للرئيسية"))}
          </Link>
        </div>
      </div>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <LangProvider>
      <NotFoundContent />
    </LangProvider>
  );
}

function ErrorContent({ router, reset }: { router: ReturnType<typeof useRouter>; reset: () => void }) {
  const { t } = useLang();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t(tx("This page didn't load", "تعذر تحميل هذه الصفحة"))}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t(tx("Something went wrong on our end. You can try refreshing or head back home.", "حدث خطأ ما لدينا. يمكنك محاولة التحديث أو العودة للرئيسية."))}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t(tx("Try again", "حاول مرة أخرى"))}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t(tx("Go home", "العودة للرئيسية"))}
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <LangProvider>
      <ErrorContent router={router} reset={reset} />
    </LangProvider>
  );
}

const GOOGLE_FONTS_URL = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MIGRAFILE — U.S. Immigration Documentation Services" },
      { name: "description", content: "Client-directed U.S. immigration documentation and case-management support from Egypt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      // Preload critical main CSS chunk for highest priority fetch
      {
        rel: "preload",
        as: "style",
        href: appCss,
      },
      // Non-render-blocking main stylesheet load
      {
        rel: "stylesheet",
        href: appCss,
        media: "print",
        // @ts-expect-error onLoad will switch stylesheet to media all once loaded
        onLoad: "this.media='all'",
      },
      // Preload & non-blocking fonts load
      {
        rel: "preload",
        as: "style",
        href: GOOGLE_FONTS_URL,
      },
      {
        rel: "stylesheet",
        href: GOOGLE_FONTS_URL,
        media: "print",
        // @ts-expect-error onLoad will switch stylesheet to media all once loaded
        onLoad: "this.media='all'",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Critical tokens and base shell layout inlined to prevent FOUC & zero CLS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --background: oklch(0.985 0.003 250);
                --foreground: oklch(0.24 0.06 262);
                --navy: #0D2B5E;
                --card: #ffffff;
                --accent: #12968C;
              }
              *, *::before, *::after { box-sizing: border-box; }
              html, body {
                background-color: var(--background);
                color: var(--foreground);
                margin: 0;
                padding: 0;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                -webkit-font-smoothing: antialiased;
              }
              header { min-height: 4rem; }
              .bg-navy { background-color: var(--navy); }
              .text-navy-foreground { color: #f8fafc; }
            `,
          }}
        />
        <HeadContent />
        <noscript>
          <link rel="stylesheet" href={appCss} />
          <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SkipToContent() {
  const { t } = useLang();
  return <a href="#main" className="sr-only focus:not-sr-only">{t(tx("Skip to content", "الانتقال إلى المحتوى"))}</a>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pageKey = useRouterState({ select: (state) => state.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <LangProvider>
        <SkipToContent />
        <DisclaimerBar />
        <Header />
        <main id="main" key={pageKey} className="mf-page-enter"><Outlet /></main>
        <Suspense fallback={null}>
          <Footer />
          <WhatsAppHelp />
        </Suspense>
      </LangProvider>
    </QueryClientProvider>
  );
}
