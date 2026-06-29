import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Chip from './Chip.svelte';

const label = (text: string) => createRawSnippet(() => ({ render: () => `<span>${text}</span>` }));

describe('Chip', () => {
	test('is a toggle button reflecting pressed state', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Chip,
			componentProps: { pressed: true, children: label('REACT') }
		});
		const btn = screen.getByRole('button', { name: 'REACT' });
		await expect.element(btn).toBeInTheDocument();
		await expect.element(btn).toHaveAttribute('aria-pressed', 'true');
	});

	test('calls onclick when activated', async () => {
		let clicks = 0;
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Chip,
			componentProps: { onclick: () => (clicks += 1), children: label('GO') }
		});
		await screen.getByRole('button', { name: 'GO' }).click();
		expect(clicks).toBe(1);
	});

	test('pressed fills with the accent, inverting text to the page ink (The Machine)', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Chip,
			componentProps: { pressed: true, children: label('ON') }
		});
		const el = document.querySelector('.pn-chip') as HTMLElement;
		expect(getComputedStyle(el).backgroundColor).toBe('rgb(255, 0, 0)');
		// surface-base (black on Machine) keeps AA contrast on full red — see component note.
		expect(getComputedStyle(el).color).toBe('rgb(0, 0, 0)');
	});

	test('pressed fill uses the desaturated red in Samaritan', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Chip,
			componentProps: { pressed: true, children: label('ON') }
		});
		expect(
			getComputedStyle(document.querySelector('.pn-chip') as HTMLElement).backgroundColor
		).toBe('rgb(232, 0, 13)');
	});

	test('renders a link with aria-current when href + current', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Chip,
			componentProps: { href: '/registry', current: true, children: label('ALL') }
		});
		const link = screen.getByRole('link', { name: 'ALL' });
		await expect.element(link).toHaveAttribute('href', '/registry');
		await expect.element(link).toHaveAttribute('aria-current', 'page');
	});

	test('menu-trigger mode uses haspopup/expanded instead of aria-pressed', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Chip,
			componentProps: { hasPopup: 'menu', expanded: true, pressed: true, children: label('SORT') }
		});
		const btn = document.querySelector('.pn-chip') as HTMLElement;
		expect(btn.getAttribute('aria-haspopup')).toBe('menu');
		expect(btn.getAttribute('aria-expanded')).toBe('true');
		expect(btn.getAttribute('aria-pressed')).toBeNull();
		// still visually active because a value is held
		expect(btn.getAttribute('data-active')).toBe('true');
	});

	test('expanded alone makes an honest disclosure trigger (no aria-haspopup)', () => {
		// A popup of plain buttons is a disclosure, not an ARIA menu — `expanded`
		// without `hasPopup` must not imply menu semantics, and the trigger is not
		// an aria-pressed toggle while it is a disclosure.
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Chip,
			componentProps: { expanded: false, pressed: true, children: label('FILTER') }
		});
		const btn = document.querySelector('.pn-chip') as HTMLElement;
		expect(btn.getAttribute('aria-expanded')).toBe('false');
		expect(btn.getAttribute('aria-haspopup')).toBeNull();
		expect(btn.getAttribute('aria-pressed')).toBeNull();
		expect(btn.getAttribute('data-active')).toBe('true');
	});

	test('ariaControls links the trigger to its popup', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Chip,
			componentProps: { expanded: true, ariaControls: 'popup-1', children: label('FILTER') }
		});
		expect((document.querySelector('.pn-chip') as HTMLElement).getAttribute('aria-controls')).toBe(
			'popup-1'
		);
	});
});
