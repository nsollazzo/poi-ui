// Tests for the 0.4 → 0.5 codemod (`migrate-0.4-to-0.5.mjs`).
//
// The codemod is regex-driven source mutation, so these tests lock in the exact
// rename behavior: every rename class applies, the documented safety boundaries
// hold (`my-poi-x` and `--poi-` ordering), the pass is idempotent, the skip-list
// is honored, and — per the guide's CAUTION — a consumer's own leading `poi-`
// token IS rewritten (the known, intentional limitation).

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { applyRules, collectFiles } from './migrate-0.4-to-0.5.mjs';

describe('applyRules — rename classes', () => {
	it('rewrites the package name and subpath imports', () => {
		const { next, counts } = applyRules(
			`import { Theme } from '@nsollazzo/poi-ui';\nimport tokens from '@nsollazzo/poi-ui/tokens.css';`
		);
		expect(next).toContain(`'@positronick/ui'`);
		expect(next).toContain(`'@positronick/ui/tokens.css'`);
		expect(next).not.toContain('@nsollazzo/poi-ui');
		expect(counts['package name + imports']).toBe(2);
	});

	it('rewrites the PoiTheme type as a whole word only', () => {
		const { next } = applyRules(`let t: PoiTheme;\nlet u: MyPoiThemeWrapper;`);
		expect(next).toContain('let t: PositronickTheme;');
		// Not a whole-word match — must be left untouched.
		expect(next).toContain('MyPoiThemeWrapper');
	});

	it('rewrites --poi-* CSS custom properties, including inside var()', () => {
		const { next, counts } = applyRules(
			`:root { --poi-bg: black; }\n.x { color: var(--poi-accent, red); }`
		);
		expect(next).toContain('--pn-bg: black;');
		expect(next).toContain('var(--pn-accent, red)');
		expect(next).not.toContain('--poi-');
		expect(counts['--poi-* CSS custom properties']).toBe(2);
	});

	it('rewrites .poi-* / class="poi-*" / classList.add() BEM classes', () => {
		const { next } = applyRules(
			`.poi-card { color: red; }\n<div class="poi-button">x</div>\nel.classList.add('poi-active');`
		);
		expect(next).toContain('.pn-card');
		expect(next).toContain('class="pn-button"');
		expect(next).toContain(`'pn-active'`);
	});
});

describe('applyRules — safety boundaries', () => {
	it('preserves a consumer mid-token poi (my-poi-x and --poi ordering)', () => {
		const { next } = applyRules(`.my-poi-widget { color: red; }\n:root { --poi-x: 1px; }`);
		// mid-token poi (preceded by `-`) is left alone...
		expect(next).toContain('.my-poi-widget');
		// ...while the custom property is handled by rule 3, not double-rewritten.
		expect(next).toContain('--pn-x');
		expect(next).not.toContain('--pn-pn-');
	});

	it('is case-sensitive — uppercase POI- tokens are left untouched', () => {
		const { next, changed } = applyRules(`const lore = 'POI-2187';`);
		expect(next).toBe(`const lore = 'POI-2187';`);
		expect(changed).toBe(false);
	});

	// Documented limitation (see MIGRATION.md CAUTION): rule 4 is purely lexical,
	// so a consumer's own LEADING `poi-` token — URLs, string literals, prose — IS
	// rewritten. This test encodes that as intended behavior so the docs and code
	// agree; if rule 4 ever gains class-vs-string detection, this test must change.
	it('rewrites any leading poi- token, including non-library URLs/strings', () => {
		const { next } = applyRules(
			`const url = '/api/poi-list';\nfetch('https://x.test/poi-search');`
		);
		expect(next).toContain('/api/pn-list');
		expect(next).toContain('x.test/pn-search');
	});
});

describe('applyRules — idempotency', () => {
	it('reports no change on a second pass', () => {
		const source = [
			`import { Theme } from '@nsollazzo/poi-ui';`,
			`let t: PoiTheme;`,
			`:root { --poi-bg: black; }`,
			`.poi-card { color: var(--poi-accent, red); }`,
			`<div class="poi-button">x</div>`
		].join('\n');
		const first = applyRules(source);
		expect(first.changed).toBe(true);
		const second = applyRules(first.next);
		expect(second.changed).toBe(false);
		expect(second.next).toBe(first.next);
	});
});

describe('collectFiles — skip-list', () => {
	let root: string;

	beforeEach(() => {
		root = mkdtempSync(join(tmpdir(), 'poi-codemod-'));
	});

	afterEach(() => {
		rmSync(root, { recursive: true, force: true });
	});

	it('collects source files but skips deps, build output, lockfiles, and binaries', () => {
		writeFileSync(join(root, 'App.svelte'), '<div class="poi-x" />');
		writeFileSync(join(root, 'util.ts'), `import '@nsollazzo/poi-ui';`);

		mkdirSync(join(root, 'node_modules'));
		writeFileSync(join(root, 'node_modules', 'dep.js'), 'poi-nope');
		mkdirSync(join(root, '.svelte-kit'));
		writeFileSync(join(root, '.svelte-kit', 'gen.ts'), 'poi-nope');
		writeFileSync(join(root, 'pnpm-lock.yaml'), 'poi-nope');
		writeFileSync(join(root, 'logo.png'), 'poi-nope');

		const out: string[] = [];
		collectFiles(root, out);
		const names = out.map((p) => p.slice(root.length + 1)).sort();

		expect(names).toEqual(['App.svelte', 'util.ts']);
	});
});
