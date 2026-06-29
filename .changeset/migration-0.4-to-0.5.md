---
'@positronick/ui': patch
---

docs: add a 0.4 → 0.5 migration guide + codemod for the silent `--poi-*` / `.poi-*` / `PoiTheme` renames

`0.5.0` renamed identifiers, not just the package, and most of those renames break **silently** for consumers (CSS custom-property overrides become no-ops, `.poi-*` selectors stop matching). This adds:

- **`MIGRATION.md`** — the 0.4 → 0.5 breaking renames and exact upgrade steps, linked from the README and CHANGELOG.
- **`scripts/migrate-0.4-to-0.5.mjs`** — a dependency-free, idempotent codemod (with `--dry-run`) that applies all renames across a consumer's `src/`, skipping `node_modules`, lockfiles, and build output.

No runtime or API changes.
