// Public toast API. Plain .ts so its types are emitted in the package's .d.ts
// (a .svelte.ts module would not emit declarations). The reactive state lives in
// ./store.svelte.ts; this module is the typed entry point consumers import.
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
	return add(message, opts.level ?? 'info', opts.duration ?? 5000);
}

/** Dismiss a toast by id. */
export function dismiss(id: string): void {
	remove(id);
}
