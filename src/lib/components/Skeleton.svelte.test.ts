import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Skeleton from './Skeleton.svelte';

describe('Skeleton', () => {
	test('is decorative (aria-hidden) so it is not announced', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Skeleton });
		const el = document.querySelector('.poi-skeleton') as HTMLElement;
		expect(el.getAttribute('aria-hidden')).toBe('true');
	});

	test('runs the pulse animation under normal motion', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Skeleton });
		// Svelte scopes @keyframes names (e.g. svelte-xxxx-poi-skeleton-pulse).
		expect(
			getComputedStyle(document.querySelector('.poi-skeleton') as HTMLElement).animationName
		).toContain('poi-skeleton-pulse');
	});

	test('uses the surface-2 lift in The Machine', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Skeleton });
		expect(
			getComputedStyle(document.querySelector('.poi-skeleton') as HTMLElement).backgroundColor
		).toBe('rgba(255, 255, 255, 0.07)');
	});

	test('uses the surface-2 lift in Samaritan', () => {
		render(ThemedHarness, { theme: 'samaritan', Comp: Skeleton });
		expect(
			getComputedStyle(document.querySelector('.poi-skeleton') as HTMLElement).backgroundColor
		).toBe('rgba(0, 0, 0, 0.06)');
	});
});
