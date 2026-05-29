<script lang="ts">
	// Test-only consumer that exercises the theme context (useTheme + setTheme).
	import { useTheme } from '$lib/index.js';

	const ctx = useTheme();
</script>

<button
	type="button"
	onclick={() => ctx.setTheme(ctx.theme === 'machine' ? 'samaritan' : 'machine')}
>
	theme:{ctx.theme}
</button>
