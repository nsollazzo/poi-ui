import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import UserAvatar from './UserAvatar.svelte';

function fallback(): HTMLElement {
	const el = document.querySelector<HTMLElement>('.pn-avatar--fallback');
	if (!el) throw new Error('.pn-avatar--fallback not found');
	return el;
}

describe('UserAvatar', () => {
	test('renders the profile image at the requested size', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: UserAvatar,
			componentProps: {
				user: { name: 'Harold Finch', image: 'https://example.com/finch.png' },
				size: 36
			}
		});
		const img = document.querySelector<HTMLImageElement>('img.pn-avatar');
		// With an image we render the <img>, never the monogram.
		expect(img).not.toBeNull();
		expect(document.querySelector('.pn-avatar--fallback')).toBeNull();
		expect(img!.getAttribute('src')).toBe('https://example.com/finch.png');
		expect(img!.getAttribute('width')).toBe('36');
		expect(img!.getAttribute('height')).toBe('36');
	});

	test('falls back to the uppercased first initial when there is no image', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: UserAvatar,
			componentProps: { user: { name: 'root' }, size: 44 }
		});
		// No image source means no <img>, only the monogram.
		expect(document.querySelector('img')).toBeNull();
		expect(fallback().textContent?.trim()).toBe('R');
	});

	test('shows "?" when there is neither image nor name', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: UserAvatar,
			componentProps: { user: {}, size: 32 }
		});
		expect(fallback().textContent?.trim()).toBe('?');
	});

	test('monogram surface is white-translucent in The Machine (dark theme)', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: UserAvatar,
			componentProps: { user: { name: 'Sameen Shaw' }, size: 36 }
		});
		// Machine is dark: --pn-surface-2 is a translucent white wash.
		expect(getComputedStyle(fallback()).backgroundColor).toContain('255, 255, 255');
	});

	test('monogram surface is black-translucent in Samaritan (light theme)', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: UserAvatar,
			componentProps: { user: { name: 'Sameen Shaw' }, size: 36 }
		});
		// Samaritan is light: --pn-surface-2 inverts to a translucent black wash.
		expect(getComputedStyle(fallback()).backgroundColor).toContain('0, 0, 0');
	});
});
