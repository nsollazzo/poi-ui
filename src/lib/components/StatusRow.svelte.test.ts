import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import StatusRow from './StatusRow.svelte';

function valueEl(): HTMLElement {
	const el = document.querySelector<HTMLElement>('.poi-status-row__value');
	if (!el) throw new Error('.poi-status-row__value not found');
	return el;
}

describe('StatusRow', () => {
	test('renders its label and value', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: StatusRow,
			componentProps: { label: 'Status', value: 'ONLINE' }
		});
		await expect.element(screen.getByText('Status')).toBeInTheDocument();
		await expect.element(screen.getByText('ONLINE')).toBeInTheDocument();
	});

	test('has a hairline divider (1px solid, from the line token)', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: StatusRow,
			componentProps: { label: 'A', value: 'B' }
		});
		const cs = getComputedStyle(document.querySelector('.poi-status-row') as HTMLElement);
		expect(cs.borderBottomStyle).toBe('solid');
		expect(cs.borderBottomWidth).toBe('1px');
	});

	// Why: emphasis is theme-relative. The Machine glows; Samaritan must stay crisp.
	test('accent value glows red in The Machine', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: StatusRow,
			componentProps: { label: 'Threat', value: 'DETECTED', accent: true }
		});
		const cs = getComputedStyle(valueEl());
		expect(cs.color).toBe('rgb(255, 0, 0)');
		expect(cs.textShadow).not.toBe('none');
	});

	test('accent value is crisp red with no glow in Samaritan', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: StatusRow,
			componentProps: { label: 'Threat', value: 'DETECTED', accent: true }
		});
		const cs = getComputedStyle(valueEl());
		expect(cs.color).toBe('rgb(232, 0, 13)');
		expect(cs.textShadow).toBe('none');
	});
});
