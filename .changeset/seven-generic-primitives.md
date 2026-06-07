---
'@nsollazzo/poi-ui': minor
---

Add seven generic primitives — Dialog, Sheet, Tooltip, Input, Separator, Skeleton, and a Toaster (with `toast`/`dismiss`). All are pure vanilla CSS over the existing token system (no Tailwind, no runtime deps), accessible (native `<dialog>` focus-trap + focus-return that also survives unmount-while-open, `aria-labelledby`/`aria-label`, Escape; Tooltip links its description to the focusable trigger and dismisses on Escape even when hover-opened; Toaster announces via a persistent polite live region with assertive `role="alert"` errors), and verified in both themes. Adds semantic tokens `--poi-overlay-bg` (modal scrim) and `--poi-status-{info,success,warning,error}`. The `svelte` peer floor is now `^5.20.0` (the new components use `$props.id()`).
