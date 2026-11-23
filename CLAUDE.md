@AGENTS.md

# Project rules

- The spec and the work plan are private and live outside this repo: `../SPEC.md` and `../PLAN.md`.
  Read both before changing content. Section 6 of the spec (content rules) is mandatory.
- This repo is **public**. Never copy files from the parent folders into it, and never write a
  banned term in code, tests or comments (use made-up examples). The pre-commit hook enforces it.
- Facts come only from the source material listed in the spec; never invent numbers or claims.
- Before each commit: `pnpm typecheck && pnpm lint && pnpm test`, plus `pnpm build && pnpm test:e2e`
  when pages change. Work on a branch and open a PR; never push to `main` directly.
