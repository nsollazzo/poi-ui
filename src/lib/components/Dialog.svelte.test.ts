import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Dialog from './Dialog.svelte';

const body = createRawSnippet(() => ({ render: () => `<p>Designation: POI-2187</p>` }));

describe('Dialog', () => {
	test('opens modally and is labelled by its title', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Dialog,
			componentProps: { open: true, title: 'Subject dossier', children: body }
		});
		const el = document.querySelector('dialog.poi-dialog') as HTMLDialogElement;
		expect(el.open).toBe(true);
		await expect
			.element(screen.getByRole('dialog', { name: 'Subject dossier' }))
			.toBeInTheDocument();
	});

	test('Escape/close reports onclose and flips open to false', async () => {
		let closed = 0;
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Dialog,
			componentProps: { open: true, title: 'T', onclose: () => (closed += 1), children: body }
		});
		const el = document.querySelector('dialog.poi-dialog') as HTMLDialogElement;
		el.close(); // native close — same path Escape takes
		await expect.poll(() => closed).toBe(1);
		expect(el.open).toBe(false);
	});

	test('clicking the backdrop closes it', async () => {
		let closed = 0;
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Dialog,
			componentProps: { open: true, title: 'T', onclose: () => (closed += 1), children: body }
		});
		const el = document.querySelector('dialog.poi-dialog') as HTMLDialogElement;
		el.dispatchEvent(new MouseEvent('click', { bubbles: true })); // target === dialog
		await expect.poll(() => closed).toBe(1);
	});

	test('exposes the overlay token on the theme root', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Dialog,
			componentProps: { open: true, title: 'T', children: body }
		});
		const root = document.querySelector('.poi-root') as HTMLElement;
		expect(getComputedStyle(root).getPropertyValue('--poi-overlay-bg').trim()).toBe(
			'rgba(0, 0, 0, 0.7)'
		);
	});

	test('emphasis glow in The Machine', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Dialog,
			componentProps: { open: true, title: 'T', children: body }
		});
		expect(
			getComputedStyle(document.querySelector('.poi-dialog') as HTMLElement).boxShadow
		).toContain('rgb(255, 0, 0)');
	});

	test('no glow in Samaritan', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Dialog,
			componentProps: { open: true, title: 'T', children: body }
		});
		expect(getComputedStyle(document.querySelector('.poi-dialog') as HTMLElement).boxShadow).toBe(
			'none'
		);
	});
});
