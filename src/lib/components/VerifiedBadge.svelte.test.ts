import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import VerifiedBadge from './VerifiedBadge.svelte';

function sealBg(): SVGElement {
	const el = document.querySelector<SVGElement>('.pn-seal .bg');
	if (!el) throw new Error('.pn-seal .bg not found');
	return el;
}

describe('VerifiedBadge', () => {
	test('official seal fills with the accent red in The Machine', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: VerifiedBadge,
			componentProps: { tier: 'official' }
		});
		expect(getComputedStyle(sealBg()).fill).toBe('rgb(255, 0, 0)');
	});

	test('official seal is crisp red in Samaritan', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: VerifiedBadge,
			componentProps: { tier: 'official' }
		});
		expect(getComputedStyle(sealBg()).fill).toBe('rgb(232, 0, 13)');
	});

	test('verified seal fills with ink (white) in The Machine', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: VerifiedBadge,
			componentProps: { tier: 'verified' }
		});
		expect(getComputedStyle(sealBg()).fill).toBe('rgb(255, 255, 255)');
	});

	test('verified seal fills with ink (black) in Samaritan', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: VerifiedBadge,
			componentProps: { tier: 'verified' }
		});
		expect(getComputedStyle(sealBg()).fill).toBe('rgb(0, 0, 0)');
	});

	test('defaults the accessible label to the tier name', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: VerifiedBadge,
			componentProps: { tier: 'official' }
		});
		await expect.element(screen.getByRole('img', { name: 'Official' })).toBeInTheDocument();
	});

	test('uses "Verified" as the default label for the verified tier', async () => {
		const screen = render(ThemedHarness, {
			theme: 'samaritan',
			Comp: VerifiedBadge,
			componentProps: { tier: 'verified' }
		});
		await expect.element(screen.getByRole('img', { name: 'Verified' })).toBeInTheDocument();
	});

	test('a custom label overrides the default', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: VerifiedBadge,
			componentProps: { tier: 'official', label: 'First-party author' }
		});
		await expect
			.element(screen.getByRole('img', { name: 'First-party author' }))
			.toBeInTheDocument();
	});
});
