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

	test('clicking the backdrop closes it and reports onclose exactly once', async () => {
		let closed = 0;
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Dialog,
			componentProps: { open: true, title: 'T', onclose: () => (closed += 1), children: body }
		});
		const el = document.querySelector('dialog.poi-dialog') as HTMLDialogElement;
		el.dispatchEvent(new MouseEvent('click', { bubbles: true })); // target === dialog
		await expect.poll(() => el.open).toBe(false);
		// Wait for any queued $effect to flush, then assert onclose did NOT re-fire
		// (regression guard: backdrop click used to fire onclose twice).
		await new Promise((r) => setTimeout(r, 50));
		expect(closed).toBe(1);
	});

	test('a titleless dialog is named by aria-label', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Dialog,
			componentProps: { open: true, 'aria-label': 'Subject dossier', children: body }
		});
		await expect
			.element(screen.getByRole('dialog', { name: 'Subject dossier' }))
			.toBeInTheDocument();
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

	test('inverts to the opposite theme polarity by default', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Dialog,
			componentProps: { open: true, title: 'T', children: body }
		});
		expect(document.querySelector('dialog.poi-dialog')!.getAttribute('data-theme')).toBe(
			'samaritan'
		);
	});

	test('invert={false} keeps the surrounding theme', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Dialog,
			componentProps: { open: true, invert: false, title: 'T', children: body }
		});
		expect(document.querySelector('dialog.poi-dialog')!.getAttribute('data-theme')).toBeNull();
	});

	test('outside a ThemeProvider it mounts with no inversion (no crash)', () => {
		render(Dialog, { open: true, title: 'T', children: body });
		expect(document.querySelector('dialog.poi-dialog')!.getAttribute('data-theme')).toBeNull();
	});

	// Inversion flips the emphasis treatment: the dialog renders in the OPPOSITE
	// theme of the page, so the Machine glow now appears on a Samaritan page.
	test('an inverted dialog on a Samaritan page carries the Machine glow', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Dialog,
			componentProps: { open: true, title: 'T', children: body }
		});
		expect(
			getComputedStyle(document.querySelector('.poi-dialog') as HTMLElement).boxShadow
		).toContain('rgb(255, 0, 0)');
	});

	test('an inverted dialog on a Machine page is crisp Samaritan (no glow)', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Dialog,
			componentProps: { open: true, title: 'T', children: body }
		});
		expect(getComputedStyle(document.querySelector('.poi-dialog') as HTMLElement).boxShadow).toBe(
			'none'
		);
	});
});
