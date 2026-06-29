import { render } from 'vitest-browser-svelte';
import { describe, expect, test, vi } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import SectionNav from './SectionNav.svelte';

const items = [
	{ href: '/docs', label: 'Overview' },
	{ href: '/docs/start', label: 'Start' },
	{ href: '/docs/api', label: 'API' }
];

function links(): HTMLAnchorElement[] {
	return [...document.querySelectorAll<HTMLAnchorElement>('.pn-section-nav a')];
}
function active(): HTMLAnchorElement[] {
	return links().filter((a) => a.getAttribute('aria-current') === 'page');
}

describe('SectionNav', () => {
	test('renders every item as a link inside a labelled nav landmark', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: SectionNav,
			componentProps: { items, current: '/docs', label: 'Docs sections' }
		});
		const nav = document.querySelector('.pn-section-nav');
		expect(nav?.getAttribute('aria-label')).toBe('Docs sections');
		expect(links().map((a) => a.getAttribute('href'))).toEqual([
			'/docs',
			'/docs/start',
			'/docs/api'
		]);
		expect(links().map((a) => a.textContent?.trim())).toEqual(['Overview', 'Start', 'API']);
	});

	test('default matcher is EXACT — a child path does not light up the parent', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: SectionNav,
			componentProps: { items, current: '/docs/start', label: 'Docs' }
		});
		// Only "/docs/start" is current; the "/docs" parent must NOT be active (exact, not prefix).
		expect(active().map((a) => a.getAttribute('href'))).toEqual(['/docs/start']);
		const startLink = links().find((a) => a.getAttribute('href') === '/docs/start')!;
		expect(startLink.classList.contains('on')).toBe(true);
	});

	test('no item is active when nothing matches', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: SectionNav,
			componentProps: { items, current: '/elsewhere', label: 'Docs' }
		});
		expect(active()).toHaveLength(0);
	});

	test('an isActive predicate overrides the default (e.g. prefix match)', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: SectionNav,
			componentProps: {
				items,
				current: '/docs/api/reference',
				label: 'Docs',
				// Prefix matcher: deepest matching href wins via the component's index lookup, but both
				// "/docs" and "/docs/api" prefix-match — assert the predicate is honoured for "/docs/api".
				isActive: (item: { href: string }, current: string) => current.startsWith(item.href)
			}
		});
		const hrefs = active().map((a) => a.getAttribute('href'));
		expect(hrefs).toContain('/docs/api');
		expect(hrefs).toContain('/docs');
		expect(hrefs).not.toContain('/docs/start');
	});

	test('scrolls the active item into view (mobile scroll-row)', async () => {
		const spy = vi.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(() => {});
		render(ThemedHarness, {
			theme: 'machine',
			Comp: SectionNav,
			componentProps: { items, current: '/docs/api', label: 'Docs' }
		});
		// The $effect runs after a tick; give it a microtask turn.
		await Promise.resolve();
		await vi.waitFor(() => expect(spy).toHaveBeenCalled());
		spy.mockRestore();
	});

	test('active item reads as ink, inactive as dim — The Machine', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: SectionNav,
			componentProps: { items, current: '/docs/start', label: 'Docs' }
		});
		const on = links().find((a) => a.classList.contains('on'))!;
		const off = links().find((a) => !a.classList.contains('on'))!;
		expect(getComputedStyle(on).color).toBe('rgb(255, 255, 255)');
		expect(getComputedStyle(off).color).toBe('rgba(255, 255, 255, 0.6)');
	});

	test('active item reads as ink in Samaritan (theme reactivity)', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: SectionNav,
			componentProps: { items, current: '/docs/start', label: 'Docs' }
		});
		const on = links().find((a) => a.classList.contains('on'))!;
		expect(getComputedStyle(on).color).toBe('rgb(0, 0, 0)');
	});
});
