import { vi } from 'vitest';

// Force the reduced-motion branch: reveal everything at once, no timers.
vi.mock('../actions/reducedMotion.js', () => ({ reducedMotion: { current: true } }));

import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Banner from './Banner.svelte';

describe('Banner (reduced motion)', () => {
	test('reveals all words immediately when reduced motion is preferred', async () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Banner,
			componentProps: { text: 'THE MACHINE WATCHES' }
		});
		await expect
			.poll(() =>
				[...document.querySelectorAll('.pn-banner__word')].every((w) =>
					w.classList.contains('visible')
				)
			)
			.toBe(true);
		expect(document.querySelectorAll('.pn-banner__word')).toHaveLength(3);
	});
});
