<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Per-service required documents and intake questions live in src/lib/requirements.ts; case answers are stored in cases.intake_answers — single source for service pages, portal and staff view.
- Route-entry and staggered interface motion use the shared `mf-*` CSS motion system so public and authenticated pages stay visually consistent and respect reduced-motion preferences.
- CRBA intake is defined in a dedicated workflow module and registered in the common form registry; service-to-form mappings govern portal options so public links, client answers and staff review share one source.

- Shared responsive sizing lives in global base styles and Layout; mixed text/action rows use shrinkable grid tracks so bilingual labels and controls cannot expand narrow screens.
