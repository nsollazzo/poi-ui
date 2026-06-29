import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		// The showcase app is a static, prerendered site (GitHub Pages / any static host).
		adapter: adapter(),
		// BASE_PATH lets CI serve the demo under a repo subpath, e.g. /ui on GitHub Pages.
		paths: {
			base: process.env.BASE_PATH ?? ''
		}
	}
};

export default config;
