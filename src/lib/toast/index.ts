// Public toast API. Kept as a plain .ts module so the public surface is a simple
// typed entry point, decoupled from the runes-based reactive store in
// ./store.svelte.ts (which <Toaster> reads directly).
import { add, remove } from './store.svelte.js';

export type ToastLevel = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions {
	/** Severity — drives the accent color and ARIA urgency. Default `'info'`. */
	level?: ToastLevel;
	/** Auto-dismiss after this many milliseconds; `0` keeps it until dismissed. Default `5000`. */
	duration?: number;
}

/** Show a toast. Returns its id so it can be dismissed manually. */
export function toast(message: string, opts: ToastOptions = {}): string {
	// Guard against NaN/Infinity (e.g. a computed duration) silently producing a
	// permanent, countdown-less toast; fall back to the default. `0` (sticky) and
	// finite values pass through.
	const duration = Number.isFinite(opts.duration) ? (opts.duration as number) : 5000;
	return add(message, opts.level ?? 'info', duration);
}

/** Dismiss a toast by id. */
export function dismiss(id: string): void {
	remove(id);
}
