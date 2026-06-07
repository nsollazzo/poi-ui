import { render } from 'vitest-browser-svelte';
import { afterEach, describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Toaster from './Toaster.svelte';
import { toast, dismiss } from '../toast/index.js';
import { store } from '../toast/store.svelte.js';

// The store is a module singleton — reset it between tests.
afterEach(() => store.items.splice(0));

describe('Toaster', () => {
	test('announces non-error toasts via the persistent polite live region', async () => {
		render(ThemedHarness, { theme: 'machine', Comp: Toaster });
		// The container is a pre-existing live region (so insertions are announced);
		// non-error toasts rely on it rather than a per-toast role=status.
		expect(document.querySelector('.poi-toaster')!.getAttribute('aria-live')).toBe('polite');
		toast('Target acquired', { level: 'success', duration: 0 });
		await expect
			.poll(() => document.querySelector('.poi-toast')?.textContent?.includes('Target acquired'))
			.toBe(true);
		const el = document.querySelector('.poi-toast') as HTMLElement;
		expect(el.getAttribute('data-level')).toBe('success');
		expect(el.getAttribute('role')).toBeNull();
	});

	test('an error toast is an assertive alert', async () => {
		render(ThemedHarness, { theme: 'machine', Comp: Toaster });
		toast('Threat detected', { level: 'error', duration: 0 });
		await expect.poll(() => document.querySelector('.poi-toast')).not.toBeNull();
		expect(document.querySelector('.poi-toast')!.getAttribute('role')).toBe('alert');
	});

	test('can be dismissed by id', async () => {
		render(ThemedHarness, { theme: 'machine', Comp: Toaster });
		const id = toast('Dismiss me', { duration: 0 });
		await expect.poll(() => document.querySelector('.poi-toast')).not.toBeNull();
		dismiss(id);
		await expect.poll(() => document.querySelector('.poi-toast')).toBeNull();
	});

	test('auto-dismisses after its duration', async () => {
		render(ThemedHarness, { theme: 'machine', Comp: Toaster });
		toast('Fleeting', { duration: 60 });
		await expect.poll(() => document.querySelector('.poi-toast')).not.toBeNull();
		await expect.poll(() => document.querySelector('.poi-toast'), { timeout: 2000 }).toBeNull();
	});

	test('uses the success status accent in The Machine', async () => {
		render(ThemedHarness, { theme: 'machine', Comp: Toaster });
		toast('ok', { level: 'success', duration: 0 });
		await expect.poll(() => document.querySelector('.poi-toast')).not.toBeNull();
		expect(
			getComputedStyle(document.querySelector('.poi-toast') as HTMLElement).borderTopColor
		).toBe('rgba(71, 255, 86, 0.85)');
	});

	test('status accents collapse to ink in Samaritan', async () => {
		render(ThemedHarness, { theme: 'samaritan', Comp: Toaster });
		toast('ok', { level: 'success', duration: 0 });
		await expect.poll(() => document.querySelector('.poi-toast')).not.toBeNull();
		expect(
			getComputedStyle(document.querySelector('.poi-toast') as HTMLElement).borderTopColor
		).toBe('rgb(0, 0, 0)');
	});
});
