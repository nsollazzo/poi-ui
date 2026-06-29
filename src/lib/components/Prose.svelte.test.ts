import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Prose from './Prose.svelte';

// Real, nested long-form markup — the component styles whatever it is given as children; it never
// renders HTML itself. A single root node, as createRawSnippet requires.
const article = createRawSnippet(() => ({
	render: () => `
		<div>
			<h1 data-testid="h1">Directive</h1>
			<p data-testid="p">Body copy with <a href="#ref" data-testid="a">a link</a> and
				<code data-testid="code">inline()</code>.</p>
			<blockquote data-testid="bq">Observed.</blockquote>
		</div>`
}));

function el(sel: string): HTMLElement {
	const node = document.querySelector<HTMLElement>(`.pn-prose ${sel}`);
	if (!node) throw new Error(`.pn-prose ${sel} not found`);
	return node;
}

describe('Prose', () => {
	test('renders the children verbatim (no internal {@html})', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Prose,
			componentProps: { children: article }
		});
		await expect.element(screen.getByTestId('h1')).toBeInTheDocument();
		await expect.element(screen.getByTestId('p')).toBeInTheDocument();
		await expect.element(screen.getByTestId('bq')).toBeInTheDocument();
	});

	test('forwards an extra class onto the root', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Prose,
			componentProps: { children: article, class: 'my-prose' }
		});
		expect(document.querySelector('.pn-prose.my-prose')).not.toBeNull();
	});

	test('h1 uses the display font and the accent colour in The Machine', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Prose, componentProps: { children: article } });
		const cs = getComputedStyle(el('h1'));
		// Accent red (machine) — this is the typographic signal the component exists to apply.
		expect(cs.color).toBe('rgb(255, 0, 0)');
		expect(cs.fontFamily).toContain('Barlow Semi Condensed');
		expect(cs.textTransform).toBe('uppercase');
	});

	test('blockquote carries an accent left-rule and code uses the mono font (The Machine)', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Prose, componentProps: { children: article } });
		expect(getComputedStyle(el('blockquote')).borderLeftColor).toBe('rgb(255, 0, 0)');
		expect(getComputedStyle(el('code')).fontFamily).toContain('JetBrains Mono');
	});

	test('h1 picks up the Samaritan accent (crisp red), proving theme reactivity', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Prose,
			componentProps: { children: article }
		});
		expect(getComputedStyle(el('h1')).color).toBe('rgb(232, 0, 13)');
	});
});
