// Internal reactive toast store. This is a .svelte.ts module (it uses runes) and
// does NOT emit .d.ts — it is NOT part of the public type surface. Consumers use
// the plain-.ts public API in ./index.ts; <Toaster> reads this store directly.
import type { ToastLevel } from './index.js';

export interface ToastItem {
	id: string;
	message: string;
	level: ToastLevel;
	duration: number;
}

let counter = 0;
// Plain dictionary — these timers are not reactive state, just a dismissal registry.
const timers: Record<string, ReturnType<typeof setTimeout>> = {};

// Cross-module rune state: export the container object and mutate its fields.
export const store = $state<{ items: ToastItem[] }>({ items: [] });

export function add(message: string, level: ToastLevel, duration: number): string {
	const id = `poi-toast-${++counter}`;
	store.items.push({ id, message, level, duration });
	if (duration > 0) {
		timers[id] = setTimeout(() => remove(id), duration);
	}
	return id;
}

export function remove(id: string): void {
	const timer = timers[id];
	if (timer !== undefined) {
		clearTimeout(timer);
		delete timers[id];
	}
	const index = store.items.findIndex((item) => item.id === id);
	if (index !== -1) store.items.splice(index, 1);
}
