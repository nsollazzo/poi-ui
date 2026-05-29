import { MediaQuery } from 'svelte/reactivity';

/**
 * Reactive `prefers-reduced-motion: reduce` state.
 *
 * Read `reducedMotion.current` — it is `true` when the user has requested
 * reduced motion. SSR-safe (defaults to `false` on the server). Components use
 * this to gate JS-driven animation; CSS-driven motion is gated with the
 * `@media (prefers-reduced-motion: reduce)` query.
 */
export const reducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)', false);
