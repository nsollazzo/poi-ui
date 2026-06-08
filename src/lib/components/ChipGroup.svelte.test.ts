import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import ChipGroup from './ChipGroup.svelte';

const options = [
	{ value: 'a', label: 'Alpha' },
	{ value: 'b', label: 'Beta' }
];

describe('ChipGroup', () => {
	test('is a labelled group with an "All" chip plus one per option', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: ChipGroup,
			componentProps: { value: null, options, allLabel: 'All', ariaLabel: 'Filter by letter' }
		});
		await expect
			.element(screen.getByRole('group', { name: 'Filter by letter' }))
			.toBeInTheDocument();
		expect(document.querySelectorAll('.poi-chip')).toHaveLength(3); // All + Alpha + Beta
	});

	test('selecting an option presses it and clears the others', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: ChipGroup,
			componentProps: { value: null, options, allLabel: 'All', ariaLabel: 'Filter' }
		});
		await screen.getByRole('button', { name: 'Alpha' }).click();
		await expect
			.element(screen.getByRole('button', { name: 'Alpha' }))
			.toHaveAttribute('aria-pressed', 'true');
		await expect
			.element(screen.getByRole('button', { name: 'All' }))
			.toHaveAttribute('aria-pressed', 'false');
	});

	test('clicking the active option toggles it back off', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: ChipGroup,
			componentProps: { value: 'a', options, allLabel: 'All', ariaLabel: 'Filter' }
		});
		// 'a' starts active; clicking it clears back to All.
		await screen.getByRole('button', { name: 'Alpha' }).click();
		await expect
			.element(screen.getByRole('button', { name: 'All' }))
			.toHaveAttribute('aria-pressed', 'true');
		await expect
			.element(screen.getByRole('button', { name: 'Alpha' }))
			.toHaveAttribute('aria-pressed', 'false');
	});
});
