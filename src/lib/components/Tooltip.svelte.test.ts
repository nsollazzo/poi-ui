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
		// The describedby link lives on the focusable trigger, not the wrapper.
		expect(
			(document.querySelector('.poi-tooltip button') as HTMLElement).getAttribute(
				'aria-describedby'
			)
		).toBeNull();
	});

	test('opens on pointer enter and links the focusable trigger via aria-describedby', async () => {
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
		// aria-describedby must be on the trigger (the focused control), not the
		// non-focusable wrapper, or assistive tech never announces the tip.
		expect(wrapper.querySelector('button')!.getAttribute('aria-describedby')).toBe(bubbleId);
		expect(wrapper.getAttribute('aria-describedby')).toBeNull();
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

	test('the bubble inverts to the opposite polarity; the trigger keeps the page theme', async () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Tooltip,
			componentProps: { text: 'Tip', children: trigger }
		});
		const wrapper = document.querySelector('.poi-tooltip') as HTMLElement;
		wrapper.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await expect.poll(() => document.querySelector('.poi-tooltip__bubble')).not.toBeNull();
		expect(document.querySelector('.poi-tooltip__bubble')!.getAttribute('data-theme')).toBe(
			'machine'
		);
		// Inversion is scoped to the bubble — the wrapper (and trigger) stay unthemed.
		expect(wrapper.getAttribute('data-theme')).toBeNull();
	});

	test('the inverted bubble is opaque, not a translucent lift over the page', async () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Tooltip,
			componentProps: { text: 'Tip', children: trigger }
		});
		const wrapper = document.querySelector('.poi-tooltip') as HTMLElement;
		wrapper.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await expect.poll(() => document.querySelector('.poi-tooltip__bubble')).not.toBeNull();
		// Machine surface-base under the surface-2 lift: fully opaque black.
		expect(
			getComputedStyle(document.querySelector('.poi-tooltip__bubble') as HTMLElement)
				.backgroundColor
		).toBe('rgb(0, 0, 0)');
	});

	test('invert={false} keeps the bubble in the surrounding theme', async () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Tooltip,
			componentProps: { text: 'Tip', invert: false, children: trigger }
		});
		const wrapper = document.querySelector('.poi-tooltip') as HTMLElement;
		wrapper.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await expect.poll(() => document.querySelector('.poi-tooltip__bubble')).not.toBeNull();
		expect(document.querySelector('.poi-tooltip__bubble')!.getAttribute('data-theme')).toBeNull();
	});

	test('outside a ThemeProvider it mounts with no inversion (no crash)', async () => {
		render(Tooltip, { text: 'Tip', children: trigger });
		const wrapper = document.querySelector('.poi-tooltip') as HTMLElement;
		wrapper.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await expect.poll(() => document.querySelector('.poi-tooltip__bubble')).not.toBeNull();
		expect(document.querySelector('.poi-tooltip__bubble')!.getAttribute('data-theme')).toBeNull();
	});
});
