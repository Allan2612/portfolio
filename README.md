# Portfolio · Allan Vargas Torres

Personal portfolio site: who I am, what I build, and case studies of work whose code is private.
Bilingual (English first, Spanish), fully static, deployed on Vercel.

> Status: **Phase 0** (project setup). Content and visual design land in the next phases.

## Stack

- **Next.js 16** (App Router, Cache Components) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS 4**
- Every page is prerendered at build time; there is no server, database or CMS.
- i18n with a `[locale]` route segment and typed dictionaries (`content/site.<locale>.ts`), no i18n library.
- Tests: **Vitest** (units), **Playwright** + **axe** (routes, accessibility, HTTP headers)
- CI: GitHub Actions on every PR and on pushes to `main`/`develop` (audit, types, lint, tests, build, content guard, E2E)
- CD: Vercel deploys `main` to production and every other branch and PR as a preview

## Branches

`main` is production and `develop` is integration. Work happens on a branch off `develop`, merged
by PR into `develop`; a release is a PR from `develop` into `main`. Both branches are protected:
changes only through a PR, the `ci` check must pass, and force pushes and deletion are blocked.

## Commands

Requires Node 24+ and pnpm.

```bash
pnpm install        # also points git hooks to .githooks/
pnpm dev            # http://localhost:3000 (redirects to /en)
pnpm typecheck
pnpm lint
pnpm test           # Vitest
pnpm build
pnpm test:e2e       # Playwright against the production build (run `pnpm build` first)
pnpm check:banned   # content guard over sources and the build output
pnpm cv:public      # rebuild public/cv/*.pdf (needs the private CV sources and Tectonic)
```

## Structure

```
app/[locale]/        pages (one tree per language)
content/             site copy and profile data, one file per language
lib/                 i18n helpers
scripts/             content guard, public CV build
tests/  e2e/         Vitest and Playwright
public/cv/           public CV PDFs
.githooks/           pre-commit: content guard on staged files
```

## Content guard

Some things must never appear on this site (private names, client figures, personal data).
`scripts/banned-terms.mjs` fails if any of them shows up, and it runs:

- **before every commit** (`.githooks/pre-commit`, on the staged content), because in a public repo history is permanent;
- **in CI**, over the sources and the built HTML.

The term list itself is private, so it is **not in this repo**: the script reads it from the
`BANNED_TERMS` environment variable (a GitHub Actions secret in CI) or from `../banned-terms.txt`
locally. Without a list, the guard fails instead of passing silently.

## Public CV

`public/cv/` holds a public version of the CV, built by `pnpm cv:public` from the private LaTeX
sources without modifying them: it drops the phone number and client business figures, re-checks
the content guard and compiles with [Tectonic](https://tectonic-typesetting.github.io/).

## Security headers

Set in `next.config.ts` and checked by `e2e/smoke.spec.ts`: CSP, HSTS, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`.

**CSP exception:** `script-src` and `style-src` allow `'unsafe-inline'`. A nonce-based CSP would force
every page to render per request, and this site is intentionally static; Next.js injects inline
bootstrap scripts, so static pages need `'unsafe-inline'`. There is no user input, no third-party
script and never `'unsafe-eval'` in production (it is only added in `next dev`).
