import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Tooltip from './Tooltip.svelte';

const trigger = createRawSnippet(() => ({ render: () => `<button>info</button>` }));

describe('Tooltip', () => {
	test('is hidden until hovered/focused', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Tooltip,
			componentProps: { text: 'Subject under surveillance', children: trigger }
		});
		expect(document.querySelector('[role="tooltip"]')).toBeNull();
		expect(
			(document.querySelector('.poi-tooltip') as HTMLElement).getAttribute('aria-describedby')
		).toBeNull();
	});

	test('opens on pointer enter and links the trigger via aria-describedby', async () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Tooltip,
			componentProps: { text: 'Subject under surveillance', children: trigger }
		});
		const wrapper = document.querySelector('.poi-tooltip') as HTMLElement;
		wrapper.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await expect
			.poll(() => document.querySelector('[role="tooltip"]')?.textContent)
			.toBe('Subject under surveillance');
		const bubbleId = document.querySelector('[role="tooltip"]')!.id;
		expect(wrapper.getAttribute('aria-describedby')).toBe(bubbleId);
	});

	test('Escape dismisses it', async () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Tooltip,
			componentProps: { text: 'Tip', children: trigger }
		});
		const wrapper = document.querySelector('.poi-tooltip') as HTMLElement;
		wrapper.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await expect.poll(() => document.querySelector('[role="tooltip"]')).not.toBeNull();
		wrapper.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		await expect.poll(() => document.querySelector('[role="tooltip"]')).toBeNull();
	});

	test('places the bubble on the requested side', async () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Tooltip,
			componentProps: { text: 'Tip', side: 'bottom', children: trigger }
		});
		const wrapper = document.querySelector('.poi-tooltip') as HTMLElement;
		wrapper.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await expect
			.poll(() => document.querySelector('[role="tooltip"]')?.getAttribute('data-side'))
			.toBe('bottom');
	});

	test('respects a show delay', async () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Tooltip,
			componentProps: { text: 'Tip', delay: 80, children: trigger }
		});
		const wrapper = document.querySelector('.poi-tooltip') as HTMLElement;
		wrapper.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		// Not shown immediately…
		expect(document.querySelector('[role="tooltip"]')).toBeNull();
		// …but appears after the delay.
		await expect.poll(() => document.querySelector('[role="tooltip"]')).not.toBeNull();
	});

	test('the bubble uses the surface-2 lift in Samaritan', async () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Tooltip,
			componentProps: { text: 'Tip', children: trigger }
		});
		const wrapper = document.querySelector('.poi-tooltip') as HTMLElement;
		wrapper.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await expect.poll(() => document.querySelector('.poi-tooltip__bubble')).not.toBeNull();
		expect(
			getComputedStyle(document.querySelector('.poi-tooltip__bubble') as HTMLElement)
				.backgroundColor
		).toBe('rgba(0, 0, 0, 0.06)');
	});
});
