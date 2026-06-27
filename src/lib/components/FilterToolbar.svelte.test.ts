import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import FilterToolbar from './FilterToolbar.svelte';

const baseProps = (overrides: Record<string, unknown> = {}) => ({
	placeholder: 'Search subjects',
	...overrides
});

const input = () => document.querySelector('.pn-toolbar__search') as HTMLInputElement;

describe('FilterToolbar', () => {
	test('renders a search input named by its placeholder', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: FilterToolbar,
			componentProps: baseProps()
		});
		await expect
			.element(screen.getByRole('searchbox', { name: 'Search subjects' }))
			.toBeInTheDocument();
	});

	test('Escape clears the search text', async () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: FilterToolbar,
			componentProps: baseProps({ value: 'reese' })
		});
		expect(input().value).toBe('reese');
		input().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		await expect.poll(() => input().value).toBe('');
	});

	test('"/" pressed anywhere focuses the search input', async () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: FilterToolbar,
			componentProps: baseProps()
		});
		window.dispatchEvent(new KeyboardEvent('keydown', { key: '/', bubbles: true }));
		await expect.poll(() => document.activeElement).toBe(input());
	});

	test('"/" while typing in another field does not steal focus', async () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: FilterToolbar,
			componentProps: baseProps()
		});
		const other = document.createElement('input');
		document.body.appendChild(other);
		other.focus();
		other.dispatchEvent(new KeyboardEvent('keydown', { key: '/', bubbles: true }));
		// Give any (incorrect) handler a tick to run before asserting.
		await new Promise((r) => setTimeout(r, 20));
		expect(document.activeElement).toBe(other);
		other.remove();
	});

	test('shortcutKey={null} disables the global shortcut', async () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: FilterToolbar,
			componentProps: baseProps({ shortcutKey: null })
		});
		window.dispatchEvent(new KeyboardEvent('keydown', { key: '/', bubbles: true }));
		await new Promise((r) => setTimeout(r, 20));
		expect(document.activeElement).not.toBe(input());
	});

	test('the status readout is a live region', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: FilterToolbar,
			componentProps: baseProps({ status: '12 / 87' })
		});
		const status = screen.getByRole('status');
		await expect.element(status).toBeInTheDocument();
		await expect.element(status).toHaveTextContent('12 / 87');
	});

	test('the token row is hidden when no filters are active', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: FilterToolbar,
			componentProps: baseProps({ filters: [] })
		});
		expect(document.querySelector('.pn-toolbar__tokens')).toBeNull();
	});

	test('clicking a token removes that filter and refocuses the search input', async () => {
		let removed = 0;
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: FilterToolbar,
			componentProps: baseProps({
				filters: [{ label: 'Status: deviant', remove: () => (removed += 1) }]
			})
		});
		await screen.getByRole('button', { name: 'Remove filter: Status: deviant' }).click();
		expect(removed).toBe(1);
		// Focus lands back in the command field so refining the search is immediate.
		await expect.poll(() => document.activeElement).toBe(input());
	});

	test('the clear button clears everything via onclear', async () => {
		let cleared = 0;
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: FilterToolbar,
			componentProps: baseProps({
				filters: [{ label: 'F', remove: () => {} }],
				onclear: () => (cleared += 1)
			})
		});
		await screen.getByRole('button', { name: 'Clear' }).click();
		expect(cleared).toBe(1);
	});

	test('no clear button without an onclear handler', async () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: FilterToolbar,
			componentProps: baseProps({ filters: [{ label: 'F', remove: () => {} }] })
		});
		await expect.poll(() => document.querySelector('.pn-toolbar__tokens')).not.toBeNull();
		expect(document.querySelector('.pn-toolbar__clear')).toBeNull();
	});
});
