import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Loading from './Loading.svelte';

describe('Loading', () => {
	test('announces loading via role=status', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Loading,
			componentProps: { label: 'Acquiring' }
		});
		await expect.element(screen.getByRole('status', { name: 'Acquiring' })).toBeInTheDocument();
	});

	test('the cube uses the accent and rotates (animation present)', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Loading, componentProps: {} });
		const cs = getComputedStyle(document.querySelector('.poi-loading__cube') as HTMLElement);
		expect(cs.borderTopColor).toBe('rgb(255, 0, 0)');
		expect(cs.animationName).not.toBe('none');
	});
});
