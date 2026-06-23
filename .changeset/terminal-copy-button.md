---
'@nsollazzo/poi-ui': minor
---

Terminal: lead with the prompt sigil, add a copy button, and gate the cursor

- The prompt sigil (e.g. `$`) now **leads** the command on a single line instead of sitting on a separate line below it.
- Added a **copy-to-clipboard button** in the top-right that copies the command text only (the sigil is never included); its glyph flips `⧉` → `✓` on success and announces via an `aria-live` region.
- Added a **`cursor` prop** (default `true`) to toggle the trailing blinking cursor.
