---
'@nsollazzo/poi-ui': minor
---

Overlay theme inversion + filter primitives extracted from positronick.

**New behavior — overlays invert theme polarity by default.** The UI is flat (no
elevation), so `Dialog`, `Sheet`, `Tooltip` and `Toaster` now render in the
opposite theme of the page (Samaritan page → Machine overlay, and vice versa)
as their figure-ground cue. Pass `invert={false}` to keep the previous
same-theme rendering. Inversion no-ops outside a `<ThemeProvider>`. `Dropdown`
intentionally does not invert (it reads as an extension of its trigger). The
tooltip bubble background is now opaque (surface-2 composited over
surface-base).

**Changed — Dropdown ARIA.** The trigger no longer claims
`aria-haspopup="menu"` (the popup contains plain buttons, not menuitems); it is
now an honest disclosure (`aria-expanded` + `aria-controls` wired to the menu)
with focus management: first option focused on open, focus returned to the
trigger on Escape or selection.

**New — `Chip` disclosure props.** `expanded` now works without `hasPopup`, and
the new `ariaControls` prop links the chip to its popup.

**New components.** `SortControl` (segmented sort field + direction picker) and
`FilterToolbar` (search command bar with global `/` shortcut, status readout,
removable filter tokens, and `primary`/`controls` snippets).

**New exports.** `oppositeTheme(theme)` and the `SortDir` type.
