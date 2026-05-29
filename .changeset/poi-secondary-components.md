---
'@nsollazzo/poi-ui': minor
---

Add the secondary components: `Button` (glow/pulse in The Machine vs. crisp in Samaritan, optional rotate-on-hover), `ProgressBar` (sizes, glowing vs. flat fill), `RecDot` (pulsing record indicator), `Terminal` (monospace with blinking prompt), `Banner` (word-by-word "samaritanWrite" reveal), `Loading` (rotating cube), and `Window` (collapsible, theme-driven chrome — traffic-light dots vs. a severe red title bar). All motion is gated behind `prefers-reduced-motion`; everything is verified in both themes with axe. The full 13-component inventory is now complete.
