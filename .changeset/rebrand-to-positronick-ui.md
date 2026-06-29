---
'@positronick/ui': minor
---

⚠️ BREAKING: rebrand `@nsollazzo/poi-ui` → `@positronick/ui`

The package is published under the new name `@positronick/ui`. Consumers must also update:

- **CSS custom properties:** `--poi-*` → `--pn-*`
- **BEM classes:** `.poi-*` → `.pn-*`
- **Exported type:** `PoiTheme` → `PositronickTheme`

Theme names (The Machine / Samaritan), component APIs, and runtime behavior are unchanged — only identifiers were renamed. (Pre-1.0, so this lands as a minor bump per semver convention.)
