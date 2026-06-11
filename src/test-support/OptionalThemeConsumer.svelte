<script lang="ts">
	// Test-only consumer that exercises useThemeOptional (must not throw outside
	// a ThemeProvider, unlike useTheme).
	import { useThemeOptional } from '$lib/theme/context.js';

	const ctx = useThemeOptional();
</script>

<span>theme:{ctx?.theme ?? 'none'}</span>
