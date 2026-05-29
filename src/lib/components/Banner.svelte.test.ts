import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Banner from './Banner.svelte';

describe('Banner', () => {
	// The word-by-word reveal is decorative; assistive tech must get the whole
	// line at once, not letter by letter.
	test('exposes the full text to screen readers and hides the animation', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Banner,
			componentProps: { text: 'THE MACHINE IS WATCHING' }
		});
		expect(document.querySelector('.poi-sr-only')?.textContent).toBe('THE MACHINE IS WATCHING');
		expect(document.querySelector('.poi-banner > span[aria-hidden="true"]')).not.toBeNull();
	});

	test('renders one span per word', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Banner, componentProps: { text: 'A B C D' } });
		expect(document.querySelectorAll('.poi-banner__word')).toHaveLength(4);
	});
});
