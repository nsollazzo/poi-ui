import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import RecDot from './RecDot.svelte';

function dot(): HTMLElement {
	const el = document.querySelector<HTMLElement>('.pn-rec');
	if (!el) throw new Error('.pn-rec not found');
	return el;
}

describe('RecDot', () => {
	test('exposes an accessible label', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: RecDot,
			componentProps: { label: 'Recording' }
		});
		await expect.element(screen.getByRole('img', { name: 'Recording' })).toBeInTheDocument();
	});

	test('is the accent color and pulses (animation present) in The Machine', () => {
		render(ThemedHarness, { theme: 'machine', Comp: RecDot, componentProps: {} });
		const cs = getComputedStyle(dot());
		expect(cs.backgroundColor).toBe('rgb(255, 0, 0)');
		// Motion gating itself is handled by @media (prefers-reduced-motion).
		expect(cs.animationName).not.toBe('none');
	});

	test('is crisp red in Samaritan', () => {
		render(ThemedHarness, { theme: 'samaritan', Comp: RecDot, componentProps: {} });
		expect(getComputedStyle(dot()).backgroundColor).toBe('rgb(232, 0, 13)');
	});
});
