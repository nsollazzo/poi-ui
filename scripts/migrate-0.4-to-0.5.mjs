#!/usr/bin/env node
// @positronick/ui — codemod for the 0.4 → 0.5 identifier renames.
//
// 0.5.0 renamed identifiers, not just the package. Most renames break SILENTLY
// for consumers: you can swap the package + imports and still pass lint/check/
// build while theming is quietly dead (CSS custom-property overrides no-op, BEM
// selectors miss). This script applies all of the renames across your source so
// nothing slips through.
//
// Renames applied:
//   1. @nsollazzo/poi-ui  → @positronick/ui   (package name + all subpath imports)
//   2. PoiTheme           → PositronickTheme   (exported type)
//   3. --poi-<name>       → --pn-<name>        (CSS custom properties)
//   4. poi-<name>         → pn-<name>          (.poi-* / bare poi-* BEM classes
//                                               in markup, CSS selectors, and
//                                               class strings)
//
// Usage:
//   node scripts/migrate-0.4-to-0.5.mjs [paths...] [--dry-run]
//
//   paths      One or more files/dirs to process. Default: src
//   --dry-run  Report what would change without writing any files.
//
// Safe to re-run: idempotent (a second run finds nothing left to rename) and it
// skips node_modules, lockfiles, VCS metadata, build output, and binary files.

import { readFileSync, writeFileSync, statSync, readdirSync } from 'node:fs';
import { join, basename, extname } from 'node:path';

// --- rename rules -----------------------------------------------------------
// Order matters: rewrite the package specifier first so its `poi-ui` segment is
// gone before the generic `poi-` rules run. `PoiTheme` is anchored so it never
// matches a longer consumer identifier.
//
// The two `poi-` shapes need separate rules because a single left-boundary can't
// tell them apart:
//   --poi-x  (CSS custom property, ours) — preceded by `-`, MUST convert.
//   my-poi-x (a consumer's own class)    — also preceded by `-`, must NOT.
// So the custom-property rule keys on the unambiguous `--` prefix, while the
// class rule matches `poi-` only at a real token boundary (start, whitespace,
// `.`, quote, `(`, `>`, …) and explicitly excludes a preceding `-`/word char —
// leaving both `--poi-` (handled above) and `my-poi-` (not ours) untouched.
const RULES = [
	{ name: 'package name + imports', re: /@nsollazzo\/poi-ui/g, to: '@positronick/ui' },
	{ name: 'PoiTheme type', re: /\bPoiTheme\b/g, to: 'PositronickTheme' },
	{ name: '--poi-* CSS custom properties', re: /--poi-/g, to: '--pn-' },
	{ name: 'poi-* BEM classes', re: /(^|[^\w-])poi-/g, to: '$1pn-' }
];

// Directories never worth descending into.
const SKIP_DIRS = new Set([
	'node_modules',
	'.git',
	'.svelte-kit',
	'dist',
	'build',
	'.next',
	'.turbo',
	'coverage',
	'storybook-static'
]);

// Files we must not touch (lockfiles regenerate; renaming them corrupts them).
const SKIP_FILES = new Set(['pnpm-lock.yaml', 'package-lock.json', 'yarn.lock', 'bun.lockb']);

// Extensions we treat as binary and skip outright.
const BINARY_EXT = new Set([
	'.png',
	'.jpg',
	'.jpeg',
	'.gif',
	'.webp',
	'.avif',
	'.ico',
	'.icns',
	'.woff',
	'.woff2',
	'.ttf',
	'.otf',
	'.eot',
	'.pdf',
	'.zip',
	'.gz',
	'.tgz',
	'.br',
	'.mp4',
	'.webm',
	'.mov',
	'.lockb',
	'.wasm'
]);

function collectFiles(target, out) {
	let st;
	try {
		st = statSync(target);
	} catch {
		console.error(`skip (not found): ${target}`);
		return;
	}
	if (st.isDirectory()) {
		if (SKIP_DIRS.has(basename(target))) return;
		for (const entry of readdirSync(target)) collectFiles(join(target, entry), out);
		return;
	}
	if (!st.isFile()) return;
	if (SKIP_FILES.has(basename(target))) return;
	if (BINARY_EXT.has(extname(target).toLowerCase())) return;
	out.push(target);
}

function applyRules(text) {
	let next = text;
	const counts = {};
	for (const rule of RULES) {
		let n = 0;
		next = next.replace(rule.re, (...args) => {
			n++;
			// Use the rule's replacement, supporting the $1 capture in the poi- rule.
			return rule.to.replace('$1', args[1] ?? '');
		});
		if (n) counts[rule.name] = n;
	}
	return { next, counts, changed: next !== text };
}

function main() {
	const args = process.argv.slice(2);
	const dryRun = args.includes('--dry-run');
	const paths = args.filter((a) => a !== '--dry-run');
	const targets = paths.length ? paths : ['src'];

	const files = [];
	for (const t of targets) collectFiles(t, files);

	let changedCount = 0;
	const totals = {};
	for (const file of files) {
		let text;
		try {
			text = readFileSync(file, 'utf8');
		} catch {
			continue; // unreadable / not utf8 — skip quietly
		}
		const { next, counts, changed } = applyRules(text);
		if (!changed) continue;
		changedCount++;
		for (const [k, v] of Object.entries(counts)) totals[k] = (totals[k] ?? 0) + v;
		const summary = Object.entries(counts)
			.map(([k, v]) => `${v}× ${k}`)
			.join(', ');
		console.log(`${dryRun ? 'would update' : 'updated'}: ${file}  (${summary})`);
		if (!dryRun) writeFileSync(file, next);
	}

	console.log('');
	console.log(`Scanned ${files.length} file(s) across: ${targets.join(', ')}`);
	if (changedCount === 0) {
		console.log('Nothing to rename — already on 0.5 identifiers. ✓');
	} else {
		const totalsLine = Object.entries(totals)
			.map(([k, v]) => `${v}× ${k}`)
			.join(', ');
		console.log(`${dryRun ? 'Would update' : 'Updated'} ${changedCount} file(s): ${totalsLine}`);
		if (dryRun) console.log('Dry run — no files written. Re-run without --dry-run to apply.');
		else console.log('Done. Re-run with `grep -rn "poi-" src` to confirm a clean tree.');
	}
}

main();
