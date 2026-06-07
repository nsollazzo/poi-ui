import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import SubjectFrame from './SubjectFrame.svelte';

const body = createRawSnippet(() => ({
	render: () => `<p data-testid="subject">JOHN REESE</p>`
}));

function corner(): HTMLElement {
	const el = document.querySelector<HTMLElement>('.poi-frame__corner');
	if (!el) throw new Error('.poi-frame__corner not found');
	return el;
}
function reticle(): HTMLElement {
	const el = document.querySelector<HTMLElement>('.poi-frame__reticle');
	if (!el) throw new Error('.poi-frame__reticle not found');
	return el;
}

describe('SubjectFrame', () => {
	test('frames its content and shows the designation', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: SubjectFrame,
			componentProps: { designation: 'PRIMARY ASSET', children: body }
		});
		await expect.element(screen.getByTestId('subject')).toBeInTheDocument();
		await expect.element(screen.getByText('PRIMARY ASSET')).toBeInTheDocument();
	});

	test('renders four corner brackets', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: SubjectFrame,
			componentProps: { children: body }
		});
		expect(document.querySelectorAll('.poi-frame__corner')).toHaveLength(4);
	});

	// The motif is theme-driven: The Machine glows its brackets and hides the
	// reticle; Samaritan is crisp (no glow) and shows the crosshair.
	test('The Machine: glowing brackets, hidden reticle', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: SubjectFrame,
			componentProps: { children: body }
		});
		expect(getComputedStyle(corner()).boxShadow).not.toBe('none');
		expect(getComputedStyle(reticle()).display).toBe('none');
	});

	test('Samaritan: crisp brackets (no glow), visible reticle', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: SubjectFrame,
			componentProps: { children: body }
		});
		expect(getComputedStyle(corner()).boxShadow).toBe('none');
		expect(getComputedStyle(reticle()).display).toBe('block');
	});

	test('threat tone tints the brackets with the accent', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: SubjectFrame,
			componentProps: { tone: 'threat', children: body }
		});
		expect(getComputedStyle(corner()).borderTopColor).toBe('rgb(255, 0, 0)');
	});

	// `solid` covers the Backdrop grid with the theme's base surface.
	test('solid paints a white fill in Samaritan', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: SubjectFrame,
			componentProps: { solid: true, children: body }
		});
		expect(
			getComputedStyle(document.querySelector('.poi-frame') as HTMLElement).backgroundColor
		).toBe('rgb(255, 255, 255)');
	});
});
