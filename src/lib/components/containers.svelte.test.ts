import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Block from './Block.svelte';
import Card from './Card.svelte';
import Box from './Box.svelte';

const body = createRawSnippet(() => ({ render: () => `<p data-testid="c-body">CONTENTS</p>` }));

function panelBodyPadding(): string {
	const el = document.querySelector<HTMLElement>('.pn-panel__body');
	if (!el) throw new Error('.pn-panel__body not found');
	return getComputedStyle(el).paddingTop;
}

describe('Block / Card / Box', () => {
	test('Block renders a title bar and its body', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Block,
			componentProps: { title: 'Dossier', children: body }
		});
		await expect.element(screen.getByText('Dossier')).toBeInTheDocument();
		await expect.element(screen.getByTestId('c-body')).toBeInTheDocument();
	});

	// Density ladder: Box is tightest, Block is roomiest.
	test('Box is the densest container', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Box, componentProps: { children: body } });
		expect(panelBodyPadding()).toBe('8px');
	});

	test('Card is the medium density', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Card, componentProps: { children: body } });
		expect(panelBodyPadding()).toBe('12px');
	});

	test('Block is the roomiest', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Block, componentProps: { children: body } });
		expect(panelBodyPadding()).toBe('16px');
	});

	test('threat tone glows the border in The Machine', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Block,
			componentProps: { title: 'T', tone: 'threat', children: body }
		});
		const cs = getComputedStyle(document.querySelector('.pn-panel') as HTMLElement);
		expect(cs.borderTopColor).toBe('rgb(255, 0, 0)');
		expect(cs.boxShadow).not.toBe('none');
	});

	test('threat tone is crisp (no glow) in Samaritan', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Block,
			componentProps: { title: 'T', tone: 'threat', children: body }
		});
		const cs = getComputedStyle(document.querySelector('.pn-panel') as HTMLElement);
		expect(cs.borderTopColor).toBe('rgb(232, 0, 13)');
		expect(cs.boxShadow).toBe('none');
	});
});
