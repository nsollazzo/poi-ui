import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import StatusRow from './StatusRow.svelte';
import Terminal from './Terminal.svelte';
import Window from './Window.svelte';

const rich = createRawSnippet(() => ({ render: () => `<em data-testid="rich">CLASSIFIED</em>` }));
const body = createRawSnippet(() => ({ render: () => `<p data-testid="b">B</p>` }));

// Covers the conditional paths that the per-component tests don't exercise.
describe('component branch coverage', () => {
	test('StatusRow renders rich children instead of a value string', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: StatusRow,
			componentProps: { label: 'Intel', children: rich }
		});
		await expect.element(screen.getByTestId('rich')).toBeInTheDocument();
	});

	test('Terminal renders with no body content', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Terminal, componentProps: {} });
		expect(document.querySelector('.poi-terminal__body')).toBeNull();
		expect(document.querySelector('.poi-terminal__prompt')).not.toBeNull();
	});

	test('Window can start collapsed', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Window,
			componentProps: { title: 'T', collapsed: true, children: body }
		});
		expect((document.querySelector('details.poi-window') as HTMLDetailsElement).open).toBe(false);
	});
});
