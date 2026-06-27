import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import DesignationTag from './DesignationTag.svelte';

function tagEl(): HTMLElement {
	const el = document.querySelector<HTMLElement>('.pn-designation');
	if (!el) throw new Error('.pn-designation not found');
	return el;
}

describe('DesignationTag', () => {
	test('renders its label', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: DesignationTag,
			componentProps: { label: 'PRIMARY ASSET' }
		});
		await expect.element(screen.getByText('PRIMARY ASSET')).toBeInTheDocument();
	});

	test('neutral tone uses the ink color (white in The Machine)', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: DesignationTag,
			componentProps: { label: 'IRRELEVANT' }
		});
		expect(getComputedStyle(tagEl()).color).toBe('rgb(255, 255, 255)');
	});

	test('threat tone uses the accent — full red in The Machine', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: DesignationTag,
			componentProps: { label: 'THREAT', tone: 'threat' }
		});
		expect(getComputedStyle(tagEl()).color).toBe('rgb(255, 0, 0)');
	});

	test('threat tone is crisp red in Samaritan', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: DesignationTag,
			componentProps: { label: 'THREAT', tone: 'threat' }
		});
		expect(getComputedStyle(tagEl()).color).toBe('rgb(232, 0, 13)');
	});

	// `solid` covers the Backdrop grid with the theme's base surface.
	test('solid paints a white fill in Samaritan', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: DesignationTag,
			componentProps: { label: 'SOLID', solid: true }
		});
		expect(getComputedStyle(tagEl()).backgroundColor).toBe('rgb(255, 255, 255)');
	});
});
