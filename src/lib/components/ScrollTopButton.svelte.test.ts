import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import ScrollTopButton from './ScrollTopButton.svelte';

function btn(): HTMLButtonElement {
	const el = document.querySelector<HTMLButtonElement>('.pn-scrolltop');
	if (!el) throw new Error('.pn-scrolltop not found');
	return el;
}

describe('ScrollTopButton', () => {
	test('renders a button with the "Back to top" accessible label', () => {
		render(ThemedHarness, { theme: 'machine', Comp: ScrollTopButton, componentProps: {} });
		const button = btn();
		expect(button.tagName).toBe('BUTTON');
		expect(button.getAttribute('aria-label')).toBe('Back to top');
	});

	test('is hidden and out of the tab order at rest (no scroll)', () => {
		// No <main> and no scroll, so it must stay in its hidden initial state.
		render(ThemedHarness, { theme: 'machine', Comp: ScrollTopButton, componentProps: {} });
		const button = btn();
		expect(button.getAttribute('aria-hidden')).toBe('true');
		expect(button.getAttribute('tabindex')).toBe('-1');
		expect(button.classList.contains('visible')).toBe(false);
	});

	test('rests on the line border in The Machine', () => {
		render(ThemedHarness, { theme: 'machine', Comp: ScrollTopButton, componentProps: {} });
		expect(getComputedStyle(btn()).borderTopColor).toBe('rgb(170, 163, 163)');
	});

	test('rests on the line border in Samaritan', () => {
		render(ThemedHarness, { theme: 'samaritan', Comp: ScrollTopButton, componentProps: {} });
		expect(getComputedStyle(btn()).borderTopColor).toBe('rgba(0, 0, 0, 0.45)');
	});

	test('reveals and re-enters the tab order once scrolled past the threshold', async () => {
		// Drive the reveal deterministically without a real scroll: a negative threshold
		// means the resting scrollTop (0) already exceeds it, so the on-mount scroll check
		// flips visible. Paired with the hidden-at-rest test (default 600 → hidden at 0),
		// this proves the threshold prop gates visibility in both directions.
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: ScrollTopButton,
			componentProps: { threshold: -1 }
		});
		// aria-hidden is dropped when revealed, so the button rejoins the a11y tree.
		await expect.element(screen.getByRole('button', { name: 'Back to top' })).toBeInTheDocument();
		const button = btn();
		expect(button.classList.contains('visible')).toBe(true);
		expect(button.getAttribute('tabindex')).toBe('0');
		expect(button.getAttribute('aria-hidden')).not.toBe('true');
	});

	test('clicking scrolls to the top and moves focus to the scroller (focus management)', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: ScrollTopButton,
			componentProps: { threshold: -1 }
		});
		// No <main> in the harness, so toTop() falls back to the document scroller.
		const scroller = (document.scrollingElement ?? document.documentElement) as HTMLElement;
		await screen.getByRole('button', { name: 'Back to top' }).click();
		// Focus is moved off the (about-to-hide) button onto the scroller so keyboard/AT
		// users resume from the top instead of being stranded on an aria-hidden control.
		expect(scroller.getAttribute('tabindex')).toBe('-1');
		expect(document.activeElement).toBe(scroller);
		// Don't leak a tabindex onto the shared <html> element across tests.
		scroller.removeAttribute('tabindex');
	});
});
