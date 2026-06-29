import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import SortControl from './SortControl.svelte';

const fields = [
	{ value: 'name', label: 'Name' },
	{ value: 'date', label: 'Date', defaultDir: 'desc' as const }
];

const props = (overrides: Record<string, unknown> = {}) => ({
	field: 'name',
	dir: 'asc',
	fields,
	ariaLabel: 'Sort subjects',
	...overrides
});

describe('SortControl', () => {
	test('renders a labelled group with one pressed chip per active field', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: SortControl,
			componentProps: props({ label: 'Sort' })
		});
		await expect.element(screen.getByRole('group', { name: 'Sort subjects' })).toBeInTheDocument();
		const chips = document.querySelectorAll('.pn-sort .pn-chip');
		expect(chips.length).toBe(2);
		expect(chips[0].getAttribute('aria-pressed')).toBe('true');
		expect(chips[1].getAttribute('aria-pressed')).toBe('false');
	});

	test('the active field announces its direction and shows the matching arrow', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: SortControl,
			componentProps: props()
		});
		const active = screen.getByRole('button', { name: 'Sort by Name, ascending' });
		await expect.element(active).toBeInTheDocument();
		expect(document.querySelector('.pn-sort__arrow')!.textContent).toBe('↑');
	});

	test('clicking the active field flips the direction', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: SortControl,
			componentProps: props()
		});
		await screen.getByRole('button', { name: 'Sort by Name, ascending' }).click();
		await expect
			.element(screen.getByRole('button', { name: 'Sort by Name, descending' }))
			.toBeInTheDocument();
		expect(document.querySelector('.pn-sort__arrow')!.textContent).toBe('↓');
	});

	test("switching fields applies the new field's default direction", async () => {
		// Each field has a natural reading order (Date → newest first); switching
		// must apply it rather than carry over the previous field's direction.
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: SortControl,
			componentProps: props()
		});
		await screen.getByRole('button', { name: 'Sort by Date' }).click();
		await expect
			.element(screen.getByRole('button', { name: 'Sort by Date, descending' }))
			.toBeInTheDocument();
	});

	test('a field without defaultDir falls back to ascending', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: SortControl,
			componentProps: props({ field: 'date', dir: 'desc' })
		});
		await screen.getByRole('button', { name: 'Sort by Name' }).click();
		await expect
			.element(screen.getByRole('button', { name: 'Sort by Name, ascending' }))
			.toBeInTheDocument();
	});
});
