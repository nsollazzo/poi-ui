# Migration guide

## 0.4 → 0.5

`0.5.0` **renamed identifiers, not just the package.** The package moved from
`@nsollazzo/poi-ui` to `@positronick/ui`, and along with it the `poi` prefix was
replaced with `pn` everywhere it was exposed to consumers.

> ⚠️ **Most of these renames break _silently_.** You can swap the package and your
> imports, and your project will still pass lint / type-check / build — while your
> theming is quietly dead: CSS custom-property overrides become no-ops and your
> `.poi-*` selectors stop matching anything. Run the [codemod](#codemod) so nothing
> slips through.

Theme names (The Machine / Samaritan), component APIs, and runtime behavior are
**unchanged** — only identifiers were renamed.

### What changed

| Kind                  | 0.4                   | 0.5                 | Fails loudly?                           |
| --------------------- | --------------------- | ------------------- | --------------------------------------- |
| Package name          | `@nsollazzo/poi-ui`   | `@positronick/ui`   | ✅ install / module resolution errors   |
| Imports / subpaths    | `@nsollazzo/poi-ui/…` | `@positronick/ui/…` | ✅ module resolution errors             |
| CSS custom properties | `--poi-*`             | `--pn-*`            | ❌ **silent** — overrides become no-ops |
| BEM classes           | `.poi-*`              | `.pn-*`             | ❌ **silent** — selectors stop matching |
| Exported type         | `PoiTheme`            | `PositronickTheme`  | ⚠️ type error only (no runtime signal)  |

### Steps

1. **Update the dependency.** Replace `@nsollazzo/poi-ui` with `@positronick/ui`
   in your `package.json`, then reinstall:

   ```bash
   pnpm remove @nsollazzo/poi-ui
   pnpm add @positronick/ui
   ```

2. **Run the [codemod](#codemod)** over your source to apply the remaining
   renames (imports, `--poi-*`, `.poi-*`, `PoiTheme`). **Always `--dry-run`
   first and review every file it lists** — rule 4 is purely lexical and
   rewrites _any_ token that begins `poi-`, including your own URLs, string
   literals, comments, and prose (e.g. `/api/poi-list`, `poi-search`), not just
   library classes:

   ```bash
   # 1. preview — REQUIRED. Review every file listed before applying.
   node scripts/migrate-0.4-to-0.5.mjs src --dry-run
   # 2. apply once the preview looks right
   node scripts/migrate-0.4-to-0.5.mjs src
   ```

3. **Verify the tree is clean.** After the codemod, this should return nothing
   that belongs to the library (any remaining hits are your own non-library
   identifiers):

   ```bash
   grep -rn "poi-\|PoiTheme\|@nsollazzo/poi-ui" src
   ```

   Then re-run your build / type-check and click through anything that relies on
   theme tokens or `.pn-*` selectors.

### Manual mapping (if you prefer not to run the codemod)

Apply these across your `src/` (skip `node_modules` and lockfiles):

- `@nsollazzo/poi-ui` → `@positronick/ui`
- `--poi-` → `--pn-` (CSS custom properties, including inside `var(--poi-…)`)
- `poi-` → `pn-` at the start of a class token (`.poi-…`, `class="poi-…"`,
  `classList.add('poi-…')`). ⚠️ This boundary also matches **any other** token
  that begins `poi-` — your own URLs, strings, comments, and prose
  (`/api/poi-list`, `poi-search`). Only `poi` **in the middle** of an identifier
  (`my-poi-thing`) is left alone. Review a `--dry-run` (or your diff) before
  committing
- `PoiTheme` → `PositronickTheme`

## Codemod

`scripts/migrate-0.4-to-0.5.mjs` applies every 0.4 → 0.5 rename across the paths
you give it. It is **safe to re-run** (idempotent) and skips `node_modules`,
lockfiles, VCS metadata, build output, and binary files.

```bash
node scripts/migrate-0.4-to-0.5.mjs [paths...] [--dry-run]
```

- `paths` — files or directories to process. Defaults to `src`.
- `--dry-run` — report what would change without writing anything.

It applies, in order:

1. `@nsollazzo/poi-ui` → `@positronick/ui` (package + all subpath imports)
2. `PoiTheme` → `PositronickTheme` (whole-word only)
3. `--poi-` → `--pn-` (CSS custom properties)
4. `poi-` → `pn-` at a token boundary (start of line/string, whitespace, `.`,
   quote, `(`, `>`, …). A preceding `-` or word character is treated as part of
   one of your own identifiers and left alone, so `--poi-*` is handled only by
   rule 3 and a class like `my-poi-thing` is never touched.

   > ⚠️ Rule 4 is **purely lexical** — it has no idea whether a `poi-` token is a
   > library class or your own code. It rewrites **every** token that begins
   > `poi-` at a boundary, including your own URLs, string literals, comments,
   > and text (`/api/poi-list`, `poi-search`). Only mid-token `poi`
   > (`my-poi-thing`) and `--poi-` (rule 3) are spared. **Always run `--dry-run`
   > and review the listed files before applying.**

The script is dependency-free (Node ≥ 18). If you vendored it into your own repo,
adjust the path accordingly. Prefer a one-liner? The rules above map directly to
`sed`; rule 4's only smarts over a blind substitution is the token boundary that
spares mid-token `poi` and leaves `--poi-` to rule 3 — it does **not**
distinguish a library class from your own `poi-`-prefixed string or URL, so the
`--dry-run` review is the real safety net.
