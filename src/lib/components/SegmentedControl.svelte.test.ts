import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import SegmentedControl from './SegmentedControl.svelte';

const options = [
	{ value: 'name', label: 'A–Z' },
	{ value: 'newest', label: 'Newest' },
	{ value: 'downloads', label: 'Popular' }
];

describe('SegmentedControl', () => {
	test('is a labelled group with exactly one active segment', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: SegmentedControl,
			componentProps: { value: 'name', options, label: 'Sort', ariaLabel: 'Sort order' }
		});
		await expect.element(screen.getByRole('group', { name: 'Sort order' })).toBeInTheDocument();
		expect(document.querySelectorAll('.pn-chip[data-active]')).toHaveLength(1);
		await expect
			.element(screen.getByRole('button', { name: 'A–Z' }))
			.toHaveAttribute('aria-pressed', 'true');
	});

	test('selecting another segment moves the active state (no toggle-off)', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: SegmentedControl,
			componentProps: { value: 'name', options, ariaLabel: 'Sort order' }
		});
		await screen.getByRole('button', { name: 'Newest' }).click();
		await expect
			.element(screen.getByRole('button', { name: 'Newest' }))
			.toHaveAttribute('aria-pressed', 'true');
		// clicking it again keeps it selected (no toggle-off)
		await screen.getByRole('button', { name: 'Newest' }).click();
		await expect
			.element(screen.getByRole('button', { name: 'Newest' }))
			.toHaveAttribute('aria-pressed', 'true');
		expect(document.querySelectorAll('.pn-chip[data-active]')).toHaveLength(1);
	});
});
