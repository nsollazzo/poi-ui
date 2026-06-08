import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Sheet from './Sheet.svelte';

const body = createRawSnippet(() => ({ render: () => `<p>Panel contents</p>` }));

describe('Sheet', () => {
	test('opens modally and is labelled by its title', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Sheet,
			componentProps: { open: true, title: 'Controls', children: body }
		});
		const el = document.querySelector('dialog.poi-sheet') as HTMLDialogElement;
		expect(el.open).toBe(true);
		await expect.element(screen.getByRole('dialog', { name: 'Controls' })).toBeInTheDocument();
	});

	test('defaults to the right side', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Sheet,
			componentProps: { open: true, title: 'T', children: body }
		});
		const el = document.querySelector('.poi-sheet') as HTMLElement;
		expect(el.getAttribute('data-side')).toBe('right');
		// Right sheet is bordered on its left edge.
		expect(getComputedStyle(el).borderLeftWidth).toBe('1px');
	});

	test('a left sheet is bordered on its right edge', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Sheet,
			componentProps: { open: true, side: 'left', title: 'T', children: body }
		});
		const el = document.querySelector('.poi-sheet') as HTMLElement;
		expect(el.getAttribute('data-side')).toBe('left');
		expect(getComputedStyle(el).borderRightWidth).toBe('1px');
	});

	test('close reports onclose and flips open to false', async () => {
		let closed = 0;
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Sheet,
			componentProps: { open: true, title: 'T', onclose: () => (closed += 1), children: body }
		});
		const el = document.querySelector('dialog.poi-sheet') as HTMLDialogElement;
		el.close();
		await expect.poll(() => closed).toBe(1);
		expect(el.open).toBe(false);
	});

	test('clicking the backdrop reports onclose exactly once', async () => {
		let closed = 0;
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Sheet,
			componentProps: { open: true, title: 'T', onclose: () => (closed += 1), children: body }
		});
		const el = document.querySelector('dialog.poi-sheet') as HTMLDialogElement;
		el.dispatchEvent(new MouseEvent('click', { bubbles: true })); // target === dialog
		await expect.poll(() => el.open).toBe(false);
		// Regression guard: backdrop click used to fire onclose twice via the $effect.
		await new Promise((r) => setTimeout(r, 50));
		expect(closed).toBe(1);
	});
});
